<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\ScheduleEntry;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(Request $request)
    {
        $user=$request->user()->load('scheduleGroup');
        $schedule=collect();

        if($user->schedule_group_id){
            $schedule=ScheduleEntry::with('teacher')
                ->where('group_id',$user->schedule_group_id)
                ->whereDate('lesson_date','>=',now()->toDateString())
                ->orderBy('lesson_date')->orderBy('starts_at')->take(10)->get();
        }

        $registrations=$user->eventRegistrations()
            ->with('event')
            ->where('status','registered')
            ->whereHas('event',fn($q)=>$q->where('starts_at','>=',now()->startOfDay()))
            ->get()->sortBy(fn($r)=>$r->event->starts_at);

        $notifications=$user->userNotifications()->latest()->take(12)->get();
        $unread=$user->userNotifications()->whereNull('read_at')->count();

        return view('student.dashboard',compact('user','schedule','registrations','notifications','unread'));
    }

    public function notifications(Request $request)
    {
        return view('student.notifications',[
            'notifications'=>$request->user()->userNotifications()->latest()->paginate(30),
        ]);
    }

    public function read(Request $request,$notification)
    {
        $item=$request->user()->userNotifications()->findOrFail($notification);
        $item->update(['read_at'=>now()]);
        return $item->url ? redirect($item->url) : back();
    }

    public function readAll(Request $request)
    {
        $request->user()->userNotifications()->whereNull('read_at')->update(['read_at'=>now()]);
        return back()->with('ok','Все уведомления отмечены прочитанными');
    }

    public function preferences(Request $request)
    {
        $request->user()->update([
            'notify_schedule'=>$request->boolean('notify_schedule'),
            'notify_news'=>$request->boolean('notify_news'),
            'notify_events'=>$request->boolean('notify_events'),
        ]);
        return back()->with('ok','Настройки уведомлений сохранены');
    }
}
