<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function show()
    {
        if(Auth::check() && Auth::user()->is_admin){
            return redirect()->route(Auth::user()->adminHomeRouteName());
        }

        if(Auth::check()){
            Auth::logout();
        }

        return view('admin.login');
    }

    public function login(Request $request)
    {
        $credentials=$request->validate([
            'email'=>'required|email',
            'password'=>'required',
        ]);

        if(!Auth::attempt($credentials,$request->boolean('remember'))){
            return back()->withErrors(['email'=>'Неверный логин или пароль'])->onlyInput('email');
        }

        $request->session()->regenerate();
        $user=Auth::user();

        if(!$user->is_admin){
            Auth::logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();

            return back()->withErrors([
                'email'=>'У этой учётной записи нет доступа к административной панели.',
            ])->onlyInput('email');
        }

        return redirect()->intended(route($user->adminHomeRouteName()));
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
