<?php
namespace App\Http\Controllers\Dpo;

use App\Http\Controllers\Controller;
use App\Models\DpoEnrollment;
use App\Models\DpoLesson;
use App\Models\DpoLessonProgress;
use App\Models\DpoScheduleEntry;
use App\Models\DpoSubmission;
use App\Models\DpoIssuedDocument;
use App\Models\DpoAssignment;
use App\Models\CollegeEvent;
use App\Models\UserNotification;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user=$request->user();

        $enrollments=DpoEnrollment::with(['group.program'])
            ->where('user_id',$user->id)
            ->where('status','active')
            ->orderByDesc('id')
            ->get();

        $completedEnrollments=DpoEnrollment::with(['group.program'])
            ->where('user_id',$user->id)
            ->where('status','completed')
            ->orderByDesc('completed_at')
            ->get();

        $groupIds=$enrollments->pluck('group_id');

        $todaySchedule=DpoScheduleEntry::with(['group','lesson','teacher'])
            ->whereIn('group_id',$groupIds)
            ->whereDate('starts_at',now()->toDateString())
            ->orderBy('starts_at')
            ->get();

        $pendingSubmissions=DpoSubmission::with(['assignment.lesson','group'])
            ->where('user_id',$user->id)
            ->whereIn('status',['submitted','returned'])
            ->latest('submitted_at')
            ->take(8)
            ->get();

        $progress=[];
        foreach($enrollments as $enrollment){
            if($enrollment->role!=='student') continue;
            $lessonIds=DpoLesson::whereHas('module',fn($q)=>$q->where('program_id',$enrollment->group->program_id))
                ->where('is_published',true)->pluck('id');
            $total=$lessonIds->count();
            $done=DpoLessonProgress::where('user_id',$user->id)
                ->where('group_id',$enrollment->group_id)
                ->whereIn('lesson_id',$lessonIds)
                ->where('status','completed')->count();
            $progress[$enrollment->group_id]=[
                'done'=>$done,
                'total'=>$total,
                'percent'=>$total?round($done/$total*100):0,
            ];
        }

        $issuedDocuments=DpoIssuedDocument::with(['program','group'])
            ->where('user_id',$user->id)
            ->where('status','issued')
            ->latest('issued_at')
            ->get();

        $notifications=UserNotification::where('user_id',$user->id)
            ->where('type','like','dpo_%')
            ->latest()->take(8)->get();

        return view('dpo.dashboard',compact('enrollments','completedEnrollments','todaySchedule','pendingSubmissions','progress','issuedDocuments','notifications'));
    }
    public function calendar(Request $request)
    {
        $user=$request->user();
        $groupIds=$user->dpoEnrollments()->where('status','active')->pluck('group_id');

        $schedule=DpoScheduleEntry::with(['group.program','lesson','teacher'])
            ->whereIn('group_id',$groupIds)
            ->whereBetween('starts_at',[now()->subDays(7),now()->addMonths(3)])
            ->orderBy('starts_at')->get();

        $assignments=DpoAssignment::with(['lesson.module.program','groups'=>fn($q)=>$q->whereIn('dpo_groups.id',$groupIds)])
            ->where('is_published',true)
            ->whereHas('groups',fn($q)=>$q->whereIn('dpo_groups.id',$groupIds)->whereNotNull('dpo_group_assignments.due_at'))
            ->get();

        $events=CollegeEvent::published()
            ->whereBetween('starts_at',[now()->subDays(7),now()->addMonths(3)])
            ->orderBy('starts_at')->get();

        $items=collect();
        foreach($schedule as $entry) $items->push([
            'at'=>$entry->starts_at,'type'=>'lesson','title'=>$entry->title,
            'meta'=>$entry->group->name.($entry->room?' · '.$entry->room:''),
            'url'=>$entry->online_url,
        ]);
        foreach($assignments as $assignment){
            foreach($assignment->groups as $group){
                if(!$group->pivot->due_at) continue;
                $at=\Illuminate\Support\Carbon::parse($group->pivot->due_at);
                if($at->lt(now()->subDays(7)) || $at->gt(now()->addMonths(3))) continue;
                $items->push([
                    'at'=>$at,'type'=>'deadline','title'=>'Дедлайн: '.$assignment->title,
                    'meta'=>$group->name.' · '.$assignment->lesson->title,
                    'url'=>route('dpo.groups.show',$group),
                ]);
            }
        }
        foreach($events as $event) $items->push([
            'at'=>$event->starts_at,'type'=>'event','title'=>$event->title,
            'meta'=>$event->type_label.($event->location?' · '.$event->location:''),
            'url'=>route('calendar.show',$event->slug),
        ]);

        $calendar=$items->sortBy('at')->groupBy(fn($item)=>$item['at']->format('Y-m-d'));
        return view('dpo.calendar',compact('calendar'));
    }

}
