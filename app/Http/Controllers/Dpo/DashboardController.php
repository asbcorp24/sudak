<?php
namespace App\Http\Controllers\Dpo;

use App\Http\Controllers\Controller;
use App\Models\DpoEnrollment;
use App\Models\DpoLesson;
use App\Models\DpoLessonProgress;
use App\Models\DpoScheduleEntry;
use App\Models\DpoSubmission;
use App\Models\DpoIssuedDocument;
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

        return view('dpo.dashboard',compact('enrollments','todaySchedule','pendingSubmissions','progress','issuedDocuments'));
    }
}
