<?php
namespace App\Services;

use App\Models\DpoAssignment;
use App\Models\DpoAttendance;
use App\Models\DpoEnrollment;
use App\Models\DpoLessonProgress;
use App\Models\DpoScormAttempt;
use App\Models\DpoSubmission;

class DpoCompletionService
{
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

        $attempts=DpoScormAttempt::with('package')->where('group_id',$group->id)->where('user_id',$enrollment->user_id)
            ->whereHas('package.lesson.module',fn($q)=>$q->where('program_id',$program->id))
            ->orderBy('attempt_no')->get()->groupBy('package_id')
            ->map(fn($items)=>$items->sortByDesc('attempt_no')->first());
        $scores=$attempts->map(function($attempt){
            if($attempt->score_scaled!==null) return max(0,min(100,(float)$attempt->score_scaled*100));
            if($attempt->score_raw!==null && (float)$attempt->package->max_score>0) return max(0,min(100,(float)$attempt->score_raw/(float)$attempt->package->max_score*100));
            return null;
        })->filter(fn($v)=>$v!==null);
        $scormPercent=$scores->count()?round($scores->avg()):null;

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
