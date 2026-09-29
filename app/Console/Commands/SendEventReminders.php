<?php

namespace App\Console\Commands;

use App\Models\CollegeEvent;
use App\Services\StudentNotificationService;
use Illuminate\Console\Command;

class SendEventReminders extends Command
{
    protected $signature='events:send-reminders';
    protected $description='Отправить студентам напоминания о мероприятиях на завтра';

    public function handle(StudentNotificationService $notifications): int
    {
        $from=now()->addDay()->startOfDay();
        $to=now()->addDay()->endOfDay();

        $events=CollegeEvent::published()->whereBetween('starts_at',[$from,$to])
            ->with(['registrations'=>fn($q)=>$q->where('status','registered')->with('user')])->get();

        foreach($events as $event){
            $users=$event->registrations->pluck('user')->filter()->values();
            if($users->isEmpty()) continue;

            $notifications->notifyUsers(
                $users,'event','Завтра мероприятие',
                $event->title.' · '.($event->all_day?'весь день':$event->starts_at->format('H:i')).($event->location?' · '.$event->location:''),
                route('calendar.show',$event->slug),
                'event-reminder:'.$event->id.':'.$event->starts_at->format('Y-m-d')
            );
        }

        $this->info('Напоминания обработаны: '.$events->count());
        return self::SUCCESS;
    }
}
