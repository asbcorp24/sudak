<?php
namespace App\Http\Controllers\Dpo;

use App\Http\Controllers\Controller;
use App\Models\DpoGroup;
use App\Models\DpoLesson;
use App\Models\DpoLessonProgress;
use App\Models\DpoScheduleEntry;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function group(Request $request,DpoGroup $group)
    {
        $this->authorizeGroup($request,$group);

        $group->load([
            'program.modules'=>fn($q)=>$q->where('is_published',true)->orderBy('sort'),
            'program.modules.lessons'=>fn($q)=>$q->where('is_published',true)->orderBy('sort'),
            'program.modules.lessons.resources.media',
            'program.modules.lessons.assignments'=>fn($q)=>$q->where('is_published',true),
            'program.modules.lessons.scormPackages'=>fn($q)=>$q->where('is_active',true),
            'teachers.dpoProfile',
            'announcements'=>fn($q)=>$q->whereNotNull('published_at')->orderByDesc('published_at'),
        ]);

        $progress=DpoLessonProgress::where('group_id',$group->id)
            ->where('user_id',$request->user()->id)
            ->get()->keyBy('lesson_id');

        $currentEnrollment=$group->enrollments()
            ->where('user_id',$request->user()->id)
            ->where('status','active')
            ->first();

        $teacherSubmissions=collect();
        if($request->user()->is_admin || $currentEnrollment?->role==='teacher'){
            $teacherSubmissions=\App\Models\DpoSubmission::with(['assignment.lesson','user','media'])
                ->where('group_id',$group->id)
                ->whereIn('status',['submitted','reviewed','returned'])
                ->latest('submitted_at')
                ->get();
        }

        $nextSchedule=DpoScheduleEntry::with(['lesson','teacher'])
            ->where('group_id',$group->id)
            ->where('starts_at','>=',now())
            ->orderBy('starts_at')
            ->take(10)
            ->get();

        return view('dpo.group',compact('group','progress','nextSchedule','currentEnrollment','teacherSubmissions'));
    }

    public function lesson(Request $request,DpoGroup $group,DpoLesson $lesson)
    {
        $this->authorizeGroup($request,$group);
        abort_unless($lesson->module()->where('program_id',$group->program_id)->exists(),404);

        $lesson->load(['module.program','resources.media','assignments.groups','scormPackages'=>fn($q)=>$q->where('is_active',true)]);

        $progress=DpoLessonProgress::firstOrCreate(
            ['lesson_id'=>$lesson->id,'group_id'=>$group->id,'user_id'=>$request->user()->id],
            ['status'=>'not_started']
        );

        if($progress->status==='not_started'){
            $progress->update(['status'=>'in_progress','started_at'=>now(),'last_seen_at'=>now()]);
        }else{
            $progress->update(['last_seen_at'=>now()]);
        }

        $submissions=\App\Models\DpoSubmission::where('group_id',$group->id)
            ->where('user_id',$request->user()->id)
            ->whereIn('assignment_id',$lesson->assignments->pluck('id'))
            ->get()->keyBy('assignment_id');

        $scormAttempts=\App\Models\DpoScormAttempt::where('group_id',$group->id)
            ->where('user_id',$request->user()->id)
            ->whereIn('package_id',$lesson->scormPackages->pluck('id'))
            ->orderByDesc('attempt_no')
            ->get()
            ->groupBy('package_id');

        return view('dpo.lesson',compact('group','lesson','progress','submissions','scormAttempts'));
    }

    public function complete(Request $request,DpoGroup $group,DpoLesson $lesson)
    {
        $this->authorizeGroup($request,$group);
        abort_unless($lesson->module()->where('program_id',$group->program_id)->exists(),404);

        DpoLessonProgress::updateOrCreate(
            ['lesson_id'=>$lesson->id,'group_id'=>$group->id,'user_id'=>$request->user()->id],
            ['status'=>'completed','started_at'=>now(),'completed_at'=>now(),'last_seen_at'=>now()]
        );

        return back()->with('ok','Урок отмечен как завершённый');
    }

    public function schedule(Request $request)
    {
        $user=$request->user();
        $groupIds=$user->dpoEnrollments()->where('status','active')->pluck('group_id');

        $entries=DpoScheduleEntry::with(['group.program','lesson','teacher'])
            ->whereIn('group_id',$groupIds)
            ->where('ends_at','>=',now()->subDay())
            ->orderBy('starts_at')
            ->get()
            ->groupBy(fn($entry)=>$entry->starts_at->format('Y-m-d'));

        return view('dpo.schedule',compact('entries'));
    }

    private function authorizeGroup(Request $request,DpoGroup $group): void
    {
        $user=$request->user();
        if($user->is_admin) return;

        abort_unless(
            $group->enrollments()->where('user_id',$user->id)->where('status','active')->exists(),
            403
        );
    }
}
