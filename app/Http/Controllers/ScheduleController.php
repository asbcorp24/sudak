<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\ScheduleEntry;
use App\Models\ScheduleGroup;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $data=$request->validate([
            'date'=>['nullable','date'],
            'date_from'=>['nullable','date'],
            'date_to'=>['nullable','date','after_or_equal:date_from'],
            'group_id'=>['nullable','integer'],
            'teacher_id'=>['nullable','integer'],
        ]);

        $legacyDate=empty($data['date_from']) && empty($data['date_to'])
            ? ($data['date'] ?? null)
            : null;

        $base=Carbon::parse($data['date_from'] ?? $data['date_to'] ?? $legacyDate ?? now());

        if(!empty($data['date_from'])){
            $dateFrom=Carbon::parse($data['date_from'])->startOfDay();
        }elseif($legacyDate){
            $dateFrom=Carbon::parse($legacyDate)->startOfDay();
        }else{
            $dateFrom=$base->copy()->startOfWeek(Carbon::MONDAY)->startOfDay();
        }

        if(!empty($data['date_to'])){
            $dateTo=Carbon::parse($data['date_to'])->endOfDay();
        }elseif($legacyDate){
            $dateTo=Carbon::parse($legacyDate)->endOfDay();
        }else{
            $dateTo=$dateFrom->copy()->addDays(6)->endOfDay();
        }

        if($dateTo->lt($dateFrom)){
            $dateFrom=$dateTo->copy()->startOfWeek(Carbon::MONDAY)->startOfDay();
        }

        $groupId=$request->integer('group_id') ?: null;
        $teacherId=$request->integer('teacher_id') ?: null;

        $entries=ScheduleEntry::query()
            ->with(['group','teacher'])
            ->whereBetween('lesson_date',[$dateFrom->toDateString(),$dateTo->toDateString()])
            ->when($groupId,fn($q)=>$q->where('group_id',$groupId))
            ->when($teacherId,fn($q)=>$q->where('employee_id',$teacherId))
            ->orderBy('lesson_date')
            ->orderBy('starts_at')
            ->orderBy('group_id')
            ->get();

        $entriesByDate=$entries->groupBy(fn($entry)=>$entry->lesson_date->format('Y-m-d'));
        $dayNames=[
            1=>'Понедельник',
            2=>'Вторник',
            3=>'Среда',
            4=>'Четверг',
            5=>'Пятница',
            6=>'Суббота',
            7=>'Воскресенье',
        ];

        $dayBlocks=collect();
        for($day=$dateFrom->copy()->startOfDay();$day->lte($dateTo);$day->addDay()){
            $key=$day->format('Y-m-d');
            $dayBlocks->push([
                'date'=>$key,
                'display_date'=>$day->format('d.m.Y'),
                'day_name'=>$dayNames[$day->isoWeekday()],
                'is_today'=>$day->isToday(),
                'entries'=>$entriesByDate->get($key,collect()),
            ]);
        }

        $periodDays=$dateFrom->copy()->startOfDay()->diffInDays($dateTo->copy()->startOfDay())+1;
        $previousFrom=$dateFrom->copy()->subDays($periodDays);
        $previousTo=$dateTo->copy()->subDays($periodDays);
        $nextFrom=$dateFrom->copy()->addDays($periodDays);
        $nextTo=$dateTo->copy()->addDays($periodDays);

        return view('schedule.index',[
            'dateFrom'=>$dateFrom->format('Y-m-d'),
            'dateTo'=>$dateTo->format('Y-m-d'),
            'displayRange'=>$dateFrom->isSameDay($dateTo)
                ? $dateFrom->format('d.m.Y')
                : $dateFrom->format('d.m.Y').' — '.$dateTo->format('d.m.Y'),
            'previousFrom'=>$previousFrom->format('Y-m-d'),
            'previousTo'=>$previousTo->format('Y-m-d'),
            'nextFrom'=>$nextFrom->format('Y-m-d'),
            'nextTo'=>$nextTo->format('Y-m-d'),
            'groupId'=>$groupId,
            'teacherId'=>$teacherId,
            'entries'=>$entries,
            'dayBlocks'=>$dayBlocks,
            'groups'=>ScheduleGroup::where('is_active',true)->orderBy('name')->get(),
            'teachers'=>Employee::published()->where('employee_type','teacher')->orderBy('full_name')->get(),
        ]);
    }
}
