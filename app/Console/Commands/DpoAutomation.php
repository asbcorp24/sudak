<?php
namespace App\Console\Commands;

use App\Models\DpoAssignment;
use App\Models\DpoEnrollment;
use App\Models\DpoScheduleEntry;
use App\Models\User;
use App\Services\DpoCompletionService;
use App\Services\StudentNotificationService;
use Illuminate\Console\Command;

class DpoAutomation extends Command
{
    protected $signature='dpo:automation';
    protected $description='Проверка завершения ДПО и отправка напоминаний';

    public function handle(DpoCompletionService $completion,StudentNotificationService $notifications): int
    {
        DpoEnrollment::with('group.program')
            ->where('role','student')->where('status','active')
            ->chunkById(100,function($items) use($completion){
                foreach($items as $enrollment) $completion->sync($enrollment);
            });

        $tomorrow=now()->addDay();
        $entries=DpoScheduleEntry::with('group')
            ->whereBetween('starts_at',[$tomorrow->copy()->startOfDay(),$tomorrow->copy()->endOfDay()])
            ->get();

        foreach($entries as $entry){
            $users=User::whereIn('id',$entry->group->enrollments()->where('role','student')->where('status','active')->pluck('user_id'))->get();
            $notifications->notifyUsers(
                $users,'dpo_schedule','Занятие завтра',
                $entry->title.' · '.$entry->starts_at->format('d.m.Y H:i'),
                route('dpo.calendar'),'dpo-tomorrow-'.$entry->id
            );
        }

        $assignments=DpoAssignment::with(['groups','lesson'])
            ->where('is_published',true)
            ->whereHas('groups',fn($q)=>$q->whereBetween('dpo_group_assignments.due_at',[now(),now()->addDay()]))
            ->get();

        foreach($assignments as $assignment){
            foreach($assignment->groups as $group){
                $due=$group->pivot->due_at ? \Illuminate\Support\Carbon::parse($group->pivot->due_at) : null;
                if(!$due || $due->lt(now()) || $due->gt(now()->addDay())) continue;
                $users=User::whereIn('id',$group->enrollments()->where('role','student')->where('status','active')->pluck('user_id'))->get();
                $notifications->notifyUsers(
                    $users,'dpo_deadline','Дедлайн задания',
                    $assignment->title.' · до '.$due->format('d.m.Y H:i'),
                    route('dpo.calendar'),'dpo-deadline-'.$assignment->id.'-'.$group->id
                );
            }
        }

        $this->info('DPO automation completed');
        return self::SUCCESS;
    }
}
