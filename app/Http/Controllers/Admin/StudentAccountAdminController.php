<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ScheduleGroup;
use App\Models\User;
use Illuminate\Http\Request;

class StudentAccountAdminController extends Controller
{
    public function index(Request $request)
    {
        $status=$request->string('status')->toString() ?: 'pending';
        if(!in_array($status,['pending','approved','rejected','all'],true)) $status='pending';

        $query=User::query()->where('user_type','student')->with(['scheduleGroup']);

        if($status!=='all') $query->where('student_approval_status',$status);

        if($search=trim($request->string('q')->toString())){
            $query->where(function($q) use($search){
                $like='%'.$search.'%';
                $q->where('name','like',$like)
                    ->orWhere('email','like',$like)
                    ->orWhere('student_number','like',$like)
                    ->orWhereHas('scheduleGroup',fn($group)=>$group->where('name','like',$like));
            });
        }

        return view('admin.students.index',[
            'students'=>$query->latest()->paginate(30)->withQueryString(),
            'status'=>$status,
            'counts'=>[
                'pending'=>User::where('user_type','student')->where('student_approval_status','pending')->count(),
                'approved'=>User::where('user_type','student')->where('student_approval_status','approved')->count(),
                'rejected'=>User::where('user_type','student')->where('student_approval_status','rejected')->count(),
                'all'=>User::where('user_type','student')->count(),
            ],
            'groups'=>ScheduleGroup::where('is_active',true)->orderBy('name')->get(),
        ]);
    }

    public function approve(User $student)
    {
        $this->assertStudent($student);
        $student->update([
            'student_approval_status'=>'approved',
            'student_approved_at'=>now(),
            'student_approved_by'=>auth()->id(),
        ]);

        return back()->with('ok','Студент подтверждён и теперь может войти в личный кабинет.');
    }

    public function reject(User $student)
    {
        $this->assertStudent($student);
        $student->update([
            'student_approval_status'=>'rejected',
            'student_approved_at'=>null,
            'student_approved_by'=>null,
        ]);

        return back()->with('ok','Регистрация отклонена. Вход для этой учётной записи закрыт.');
    }

    public function update(Request $request,User $student)
    {
        $this->assertStudent($student);
        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'schedule_group_id'=>['required','exists:schedule_groups,id'],
            'student_number'=>['nullable','string','max:80'],
        ]);
        $student->update($data);

        return back()->with('ok','Данные студента обновлены.');
    }

    private function assertStudent(User $student): void
    {
        abort_unless($student->user_type==='student',404);
    }
}
