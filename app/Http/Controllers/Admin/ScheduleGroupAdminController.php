<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ScheduleGroup;
use Illuminate\Http\Request;

class ScheduleGroupAdminController extends Controller
{
    public function index()
    {
        return view('admin.schedule.groups', [
            'groups'=>ScheduleGroup::withCount('entries')->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        ScheduleGroup::create($this->data($request));
        return back()->with('ok','Группа добавлена');
    }

    public function update(Request $request, ScheduleGroup $group)
    {
        $group->update($this->data($request, $group->id));
        return back()->with('ok','Группа обновлена');
    }

    public function destroy(ScheduleGroup $group)
    {
        if ($group->entries()->exists()) {
            return back()->withErrors(['group'=>'Нельзя удалить группу, пока у неё есть занятия.']);
        }

        $group->delete();
        return back()->with('ok','Группа удалена');
    }

    private function data(Request $request, ?int $id=null): array
    {
        $data=$request->validate([
            'name'=>['required','string','max:100','unique:schedule_groups,name'.($id?','.$id:'')],
            'course'=>['nullable','integer','min:1','max:6'],
            'specialty'=>['nullable','string','max:255'],
            'is_active'=>['nullable','boolean'],
        ]);
        $data['is_active']=$request->boolean('is_active');
        return $data;
    }
}
