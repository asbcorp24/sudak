<?php

namespace App\Http\Controllers;

use App\Models\CollegeEvent;
use Carbon\Carbon;
use Illuminate\Http\Request;

class CollegeCalendarController extends Controller
{
    public function index(Request $request)
    {
        $month=$request->input('month',now()->format('Y-m'));
        try{$cursor=Carbon::createFromFormat('Y-m',$month)->startOfMonth();}
        catch(\Throwable $e){$cursor=now()->startOfMonth();}

        $type=$request->input('type');
        if(!array_key_exists($type,CollegeEvent::types())) $type=null;

        $monthStart=$cursor->copy()->startOfMonth();
        $monthEnd=$cursor->copy()->endOfMonth();

        $events=CollegeEvent::published()
            ->whereBetween('starts_at',[$monthStart,$monthEnd])
            ->when($type,fn($q)=>$q->where('type',$type))
            ->orderBy('starts_at')->orderBy('sort')->get();

        $calendarStart=$monthStart->copy()->startOfWeek(Carbon::MONDAY);
        $calendarEnd=$monthEnd->copy()->endOfWeek(Carbon::SUNDAY);
        $days=[];
        for($day=$calendarStart->copy();$day->lte($calendarEnd);$day->addDay()){
            $days[]=$day->copy();
        }

        return view('calendar.index',[
            'events'=>$events,
            'eventsByDate'=>$events->groupBy(fn($event)=>$event->starts_at->format('Y-m-d')),
            'days'=>$days,
            'cursor'=>$cursor,
            'activeType'=>$type,
            'types'=>CollegeEvent::types(),
        ]);
    }

    public function show($slug)
    {
        $event=CollegeEvent::published()->where('slug',$slug)->firstOrFail();
        $registrationCount=$event->registrations()->where('status','registered')->count();
        $registration=null;
        if(auth()->check() && auth()->user()->user_type==='student'){
            $registration=$event->registrations()->where('user_id',auth()->id())->first();
        }
        return view('calendar.show',compact('event','registrationCount','registration'));
    }
}
