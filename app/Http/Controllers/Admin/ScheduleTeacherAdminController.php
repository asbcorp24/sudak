<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ScheduleTeacher;
use Illuminate\Http\Request;

class ScheduleTeacherAdminController extends Controller
{
    public function index()
    {
        return view('admin.schedule.teachers', [
            'teachers'=>ScheduleTeacher::withCount('entries')->orderBy('full_name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        ScheduleTeacher::create($this->data($request));
        return back()->with('ok','Преподаватель добавлен');
    }

    public function update(Request $request, ScheduleTeacher $teacher)
    {
        $teacher->update($this->data($request));
        return back()->with('ok','Преподаватель обновлён');
    }

    public function destroy(ScheduleTeacher $teacher)
    {
        if ($teacher->entries()->exists()) {
            return back()->withErrors(['teacher'=>'Нельзя удалить преподавателя, пока он используется в расписании. Можно отключить его.']);
        }

        $teacher->delete();
        return back()->with('ok','Преподаватель удалён');
    }

    private function data(Request $request): array
    {
        $data=$request->validate([
            'full_name'=>['required','string','max:255'],
            'position'=>['nullable','string','max:255'],
            'is_active'=>['nullable','boolean'],
        ]);
        $data['is_active']=$request->boolean('is_active');
        return $data;
    }
}
