<?php

namespace App\Http\Controllers;

use App\Models\ScheduleEntry;
use App\Models\ScheduleGroup;
use App\Models\ScheduleTeacher;
use Carbon\Carbon;
use Illuminate\Http\Request;

class ScheduleController extends Controller
{
    public function index(Request $request)
    {
        $date = $request->date('date')?->format('Y-m-d') ?: now()->format('Y-m-d');
        $groupId = $request->integer('group_id') ?: null;
        $teacherId = $request->integer('teacher_id') ?: null;

        $entries = ScheduleEntry::query()
            ->with(['group','teacher'])
            ->whereDate('lesson_date', $date)
            ->when($groupId, fn($q) => $q->where('group_id', $groupId))
            ->when($teacherId, fn($q) => $q->where('teacher_id', $teacherId))
            ->orderBy('starts_at')
            ->orderBy('group_id')
            ->get();

        return view('schedule.index', [
            'date' => $date,
            'previousDate' => Carbon::parse($date)->subDay()->format('Y-m-d'),
            'nextDate' => Carbon::parse($date)->addDay()->format('Y-m-d'),
            'groupId' => $groupId,
            'teacherId' => $teacherId,
            'entries' => $entries,
            'groups' => ScheduleGroup::where('is_active', true)->orderBy('name')->get(),
            'teachers' => ScheduleTeacher::where('is_active', true)->orderBy('full_name')->get(),
        ]);
    }
}
