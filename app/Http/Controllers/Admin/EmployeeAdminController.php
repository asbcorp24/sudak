<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
use App\Models\MediaAsset;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class EmployeeAdminController extends Controller
{
    public function index(Request $request)
    {
        $type=$request->string('type')->toString();

        $query=Employee::with('media')->withCount('scheduleEntries')->orderBy('sort')->orderBy('full_name');
        if(in_array($type,['leadership','teacher','staff'],true)){
            $query->where('employee_type',$type);
        }

        return view('admin.employees.index',[
            'employees'=>$query->paginate(40)->withQueryString(),
            'activeType'=>$type,
        ]);
    }

    public function create()
    {
        return view('admin.employees.form',[
            'employee'=>new Employee(['employee_type'=>'teacher','is_published'=>true]),
            'images'=>MediaAsset::where('type','image')->latest()->get(),
            'selectedPhoto'=>null,
        ]);
    }

    public function store(Request $request)
    {
        [$data,$photo]=$this->data($request);
        $employee=Employee::create($data);
        $employee->syncMediaCollection('photo',$photo?[$photo]:[]);

        return redirect()->route('admin.employees.index')->with('ok','Сотрудник добавлен');
    }

    public function edit(Employee $employee)
    {
        $employee->load('media');

        return view('admin.employees.form',[
            'employee'=>$employee,
            'images'=>MediaAsset::where('type','image')->latest()->get(),
            'selectedPhoto'=>optional($employee->getMedia('photo')->first())->id,
        ]);
    }

    public function update(Request $request,Employee $employee)
    {
        [$data,$photo]=$this->data($request);
        $employee->update($data);
        $employee->syncMediaCollection('photo',$photo?[$photo]:[]);

        return redirect()->route('admin.employees.index')->with('ok','Сотрудник обновлён');
    }

    public function destroy(Employee $employee)
    {
        if($employee->scheduleEntries()->exists()){
            return back()->withErrors(['employee'=>'Нельзя удалить сотрудника, пока он используется в расписании. Можно снять публикацию.']);
        }

        $employee->syncMediaCollection('photo',[]);
        $employee->delete();

        return back()->with('ok','Сотрудник удалён');
    }

    private function data(Request $request): array
    {
        $data=$request->validate([
            'employee_type'=>['required','in:leadership,teacher,staff'],
            'full_name'=>['required','string','max:255'],
            'position'=>['nullable','string','max:255'],
            'disciplines'=>['nullable','string','max:5000'],
            'education'=>['nullable','string','max:5000'],
            'qualification'=>['nullable','string','max:5000'],
            'email'=>['nullable','email','max:255'],
            'phone'=>['nullable','string','max:80'],
            'achievements'=>['nullable','string','max:10000'],
            'bio'=>['nullable','string','max:10000'],
            'sort'=>['nullable','integer','min:0','max:99999'],
            'is_published'=>['nullable','boolean'],
            'photo_media_id'=>['nullable','integer','exists:media_assets,id'],
        ]);

        $photo=!empty($data['photo_media_id'])?(int)$data['photo_media_id']:null;
        if($photo&&!MediaAsset::whereKey($photo)->where('type','image')->exists()){
            throw ValidationException::withMessages(['photo_media_id'=>'Для фотографии можно выбрать только изображение.']);
        }

        unset($data['photo_media_id']);
        $data['sort']=(int)($data['sort']??0);
        $data['is_published']=$request->boolean('is_published');

        return [$data,$photo];
    }
}
