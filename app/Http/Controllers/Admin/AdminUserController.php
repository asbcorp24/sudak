<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;

class AdminUserController extends Controller
{
    public function index()
    {
        return view('admin.admins.index',[
            'admins'=>User::where('is_admin',true)->orderBy('name')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'email'=>['required','email','max:255','unique:users,email'],
            'password'=>['required','string','min:6','max:255'],
            'admin_scope'=>['required',Rule::in(['full','site','schedule','dpo'])],
        ]);

        User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'password'=>Hash::make($data['password']),
            'is_admin'=>true,
            'admin_scope'=>$data['admin_scope'],
        ]);

        return back()->with('ok','Администратор создан');
    }

    public function update(Request $request,User $user)
    {
        abort_unless($user->is_admin,404);

        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'email'=>['required','email','max:255',Rule::unique('users','email')->ignore($user->id)],
            'admin_scope'=>['required',Rule::in(['full','site','schedule','dpo'])],
            'password'=>['nullable','string','min:6','max:255'],
        ]);

        if($user->is($request->user()) && $data['admin_scope']!=='full'){
            throw ValidationException::withMessages([
                'admin_scope'=>'Нельзя ограничить собственный полный доступ из текущей сессии.',
            ]);
        }

        $user->name=$data['name'];
        $user->email=$data['email'];
        $user->admin_scope=$data['admin_scope'];

        if(!empty($data['password'])){
            $user->password=Hash::make($data['password']);
        }

        $user->save();

        return back()->with('ok','Права администратора обновлены');
    }

    public function destroy(Request $request,User $user)
    {
        abort_unless($user->is_admin,404);

        if($user->is($request->user())){
            return back()->withErrors(['admin'=>'Нельзя снять права администратора у собственной учётной записи.']);
        }

        $user->update([
            'is_admin'=>false,
            'admin_scope'=>null,
        ]);

        return back()->with('ok','Административные права отключены');
    }
}
