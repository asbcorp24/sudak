<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\ScheduleGroup;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function showLogin(Request $request)
    {
        $redirect=$request->query('redirect');
        if(is_string($redirect) && str_starts_with($redirect,url('/'))){
            $request->session()->put('url.intended',$redirect);
        }
        if(Auth::check() && Auth::user()->user_type==='student') return redirect()->route('student.dashboard');
        return view('student.login');
    }

    public function showRegister()
    {
        if(Auth::check() && Auth::user()->user_type==='student') return redirect()->route('student.dashboard');
        return view('student.register',['groups'=>ScheduleGroup::where('is_active',true)->orderBy('name')->get()]);
    }

    public function register(Request $request)
    {
        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'email'=>['required','email','max:255','unique:users,email'],
            'schedule_group_id'=>['required','exists:schedule_groups,id'],
            'student_number'=>['nullable','string','max:80'],
            'password'=>['required','string','min:6','max:255','confirmed'],
        ]);

        $user=User::create([
            'name'=>$data['name'],
            'email'=>$data['email'],
            'schedule_group_id'=>$data['schedule_group_id'],
            'student_number'=>$data['student_number']??null,
            'user_type'=>'student',
            'password'=>Hash::make($data['password']),
        ]);

        Auth::login($user);
        $request->session()->regenerate();
        return redirect()->intended(route('student.dashboard'))->with('ok','Личный кабинет создан');
    }

    public function login(Request $request)
    {
        $credentials=$request->validate(['email'=>['required','email'],'password'=>['required','string']]);

        if(!Auth::attempt($credentials,$request->boolean('remember'))){
            return back()->withErrors(['email'=>'Неверный email или пароль'])->onlyInput('email');
        }

        $request->session()->regenerate();
        if(Auth::user()->user_type!=='student'){
            Auth::logout();
            return back()->withErrors(['email'=>'Эта учётная запись не является кабинетом студента.']);
        }

        return redirect()->intended(route('student.dashboard'));
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('student.login');
    }
}
