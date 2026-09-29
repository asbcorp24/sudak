<?php
namespace App\Services;

use App\Models\DpoApplication;
use App\Models\DpoAssignment;
use App\Models\DpoAttestation;
use App\Models\DpoAttendance;
use App\Models\DpoEnrollment;
use App\Models\DpoLessonProgress;
use App\Models\DpoScormAttempt;
use App\Models\DpoScormPackage;
use App\Models\DpoSubmission;
use App\Models\User;

class DpoCompletionService
{
    public function sync(DpoEnrollment $enrollment): bool
    {
        if($enrollment->role!=='student' || $enrollment->status!=='active') return false;

        $metrics=$this->metrics($enrollment);
        if(!$metrics['ready']) return false;

        DpoAttestation::updateOrCreate(
            ['enrollment_id'=>$enrollment->id],
            [
                'status'=>'passed',
                'progress_percent'=>$metrics['progress_percent'],
                'attendance_percent'=>$metrics['attendance_percent'],
                'homework_percent'=>$metrics['homework_percent'],
                'scorm_percent'=>$metrics['scorm_percent'],
                'final_score'=>$metrics['final_score'],
                'result_text'=>'Зачтено автоматически',
                'notes'=>'Все установленные условия завершения программы выполнены.',
                'assessed_by'=>null,
                'assessed_at'=>now(),
            ]
        );

        $enrollment->update(['status'=>'completed','completed_at'=>now()]);
        DpoApplication::where('user_id',$enrollment->user_id)
            ->where('program_id',$enrollment->group->program_id)
            ->whereIn('status',['approved','enrolled'])
            ->update(['status'=>'completed']);

        if(!$enrollment->group->enrollments()->where('role','student')->where('status','active')->exists()){
            $enrollment->group->update(['status'=>'completed']);
        }

        app(StudentNotificationService::class)->notifyUsers(
            User::whereKey($enrollment->user_id)->get(),
            'dpo_completed',
            'Курс завершён',
            $enrollment->group->program->title.' — все условия программы выполнены.',
            route('dpo.dashboard'),
            'dpo-completed-'.$enrollment->id
        );

        return true;
    }

    public function metrics(DpoEnrollment $enrollment): array
    {
        $enrollment->loadMissing('group.program.modules.lessons');
        $group=$enrollment->group;
        $program=$group->program;
        $lessonIds=$program->modules->flatMap->lessons->where('is_published',true)->pluck('id');
        $totalLessons=$lessonIds->count();
        $completed=DpoLessonProgress::where('group_id',$group->id)->where('user_id',$enrollment->user_id)->whereIn('lesson_id',$lessonIds)->where('status','completed')->count();
        $progress=$totalLessons?round($completed/$totalLessons*100):100;

        $attendance=DpoAttendance::whereHas('scheduleEntry',fn($q)=>$q->where('group_id',$group->id))->where('user_id',$enrollment->user_id)->get();
        $marked=$attendance->count();
        $attended=$attendance->whereIn('status',['present','late'])->count();
        $attendancePercent=$marked?round($attended/$marked*100):0;

        $assignmentIds=DpoAssignment::whereHas('groups',fn($q)=>$q->where('dpo_groups.id',$group->id))->where('is_published',true)->pluck('id');
        $assignmentMax=(float)DpoAssignment::whereIn('id',$assignmentIds)->sum('max_score');
        $homeworkScore=(float)DpoSubmission::where('group_id',$group->id)->where('user_id',$enrollment->user_id)->whereIn('assignment_id',$assignmentIds)->where('status','reviewed')->sum('score');
        $homeworkPercent=$assignmentMax>0?round($homeworkScore/$assignmentMax*100):null;

        $packages=DpoScormPackage::with('lesson')
            ->where('is_active',true)
            ->whereHas('lesson.module',fn($q)=>$q->where('program_id',$program->id))
            ->get();
        $latestAttempts=DpoScormAttempt::with('package')
            ->where('group_id',$group->id)
            ->where('user_id',$enrollment->user_id)
            ->whereIn('package_id',$packages->pluck('id'))
            ->orderBy('attempt_no')->get()->groupBy('package_id')
            ->map(fn($items)=>$items->sortByDesc('attempt_no')->first());
        $scores=$packages->map(function($package) use($latestAttempts){
            $attempt=$latestAttempts->get($package->id);
            if(!$attempt) return 0;
            if($attempt->score_scaled!==null) return max(0,min(100,(float)$attempt->score_scaled*100));
            if($attempt->score_raw!==null && (float)$package->max_score>0) return max(0,min(100,(float)$attempt->score_raw/(float)$package->max_score*100));
            return 0;
        });
        $scormPercent=$packages->count()?round($scores->avg()):null;

        $checks=[
            'progress'=>$progress >= $program->min_progress_percent,
            'attendance'=>$program->min_attendance_percent===0 || ($marked>0 && $attendancePercent >= $program->min_attendance_percent),
            'homework'=>$program->min_homework_percent===0 || ($homeworkPercent!==null && $homeworkPercent >= $program->min_homework_percent),
            'scorm'=>$program->min_scorm_percent===0 || ($scormPercent!==null && $scormPercent >= $program->min_scorm_percent),
        ];
        $values=collect([$progress,$marked?$attendancePercent:null,$homeworkPercent,$scormPercent])->filter(fn($v)=>$v!==null);

        return [
            'progress_percent'=>$progress,
            'attendance_percent'=>$attendancePercent,
            'homework_percent'=>$homeworkPercent,
            'scorm_percent'=>$scormPercent,
            'final_score'=>$values->count()?round($values->avg(),2):null,
            'checks'=>$checks,
            'ready'=>!in_array(false,$checks,true),
        ];
    }
}
