<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\ScheduleEntry;
use App\Models\ScheduleGroup;
use Illuminate\Http\Request;
use App\Services\RectorCollegeScheduleImporter;

class ScheduleAdminController extends Controller
{
    public function index(Request $request)
    {
        $date=$request->input('date',now()->format('Y-m-d'));
        $groupId=$request->integer('group_id') ?: null;
        $teacherId=$request->integer('teacher_id') ?: null;

        $entries=ScheduleEntry::with(['group','teacher'])
            ->whereDate('lesson_date',$date)
            ->when($groupId,fn($q)=>$q->where('group_id',$groupId))
            ->when($teacherId,fn($q)=>$q->where('employee_id',$teacherId))
            ->orderBy('starts_at')
            ->orderBy('group_id')
            ->get();

        return view('admin.schedule.index',[
            'entries'=>$entries,
            'groups'=>ScheduleGroup::orderBy('name')->get(),
            'teachers'=>Employee::where('employee_type','teacher')->orderBy('full_name')->get(),
            'date'=>$date,
            'groupId'=>$groupId,
            'teacherId'=>$teacherId,
        ]);
    }

    public function importXml(Request $request, RectorCollegeScheduleImporter $importer)
    {
        $data=$request->validate([
            'xml_file'=>['required','file','max:51200'],
            'import_mode'=>['required','in:merge,replace'],
        ]);

        try {
            $report=$importer->import(
                $data['xml_file']->getRealPath(),
                $data['import_mode']
            );
        } catch (\Throwable $e) {
            return back()->withErrors([
                'xml_file'=>'Не удалось импортировать расписание: '.$e->getMessage(),
            ]);
        }

        return redirect()
            ->route('admin.schedule.index')
            ->with('ok','Расписание Rector-College импортировано')
            ->with('schedule_import_report',$report);
    }

    public function create(Request $request)
    {
        return view('admin.schedule.form',[
            'entry'=>new ScheduleEntry([
                'lesson_date'=>$request->input('date',now()->format('Y-m-d')),
                'group_id'=>$request->input('group_id'),
                'employee_id'=>$request->input('teacher_id'),
            ]),
            'groups'=>ScheduleGroup::where('is_active',true)->orderBy('name')->get(),
            'teachers'=>Employee::where('employee_type','teacher')->where('is_published',true)->orderBy('full_name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        ScheduleEntry::create($this->data($request));
        return redirect()->route('admin.schedule.index',['date'=>$request->input('lesson_date')])->with('ok','Занятие добавлено');
    }

    public function edit(ScheduleEntry $schedule)
    {
        return view('admin.schedule.form',[
            'entry'=>$schedule,
            'groups'=>ScheduleGroup::orderBy('name')->get(),
            'teachers'=>Employee::where('employee_type','teacher')->orderBy('full_name')->get(),
        ]);
    }

    public function update(Request $request,ScheduleEntry $schedule)
    {
        $schedule->update($this->data($request));
        return redirect()->route('admin.schedule.index',['date'=>$schedule->lesson_date->format('Y-m-d')])->with('ok','Занятие обновлено');
    }

    public function destroy(ScheduleEntry $schedule)
    {
        $date=$schedule->lesson_date->format('Y-m-d');
        $schedule->delete();
        return redirect()->route('admin.schedule.index',['date'=>$date])->with('ok','Занятие удалено');
    }

    private function data(Request $request): array
    {
        return $request->validate([
            'lesson_date'=>['required','date'],
            'group_id'=>['required','exists:schedule_groups,id'],
            'employee_id'=>['nullable','exists:employees,id'],
            'lesson_number'=>['nullable','integer','min:1','max:20'],
            'starts_at'=>['required','date_format:H:i'],
            'ends_at'=>['required','date_format:H:i','after:starts_at'],
            'subject'=>['required','string','max:255'],
            'room'=>['nullable','string','max:80'],
            'lesson_type'=>['nullable','string','max:100'],
            'subgroup'=>['nullable','string','max:100'],
            'notes'=>['nullable','string','max:1000'],
        ]);
    }
}
