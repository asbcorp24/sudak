<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function show()
    {
        if(Auth::check() && Auth::user()->is_admin){
            return redirect()->route(Auth::user()->adminHomeRouteName());
        }

        return view('admin.login',['currentUser'=>Auth::user()]);
    }

    public function login(Request $request)
    {
        $credentials=$request->validate([
            'email'=>'required|email',
            'password'=>'required',
        ]);

        $user=User::where('email',$credentials['email'])->first();

        if(!$user || !Hash::check($credentials['password'],$user->password)){
            return back()->withErrors(['email'=>'Неверный логин или пароль'])->onlyInput('email');
        }

        if(!$user->is_admin){
            return back()->withErrors([
                'email'=>'У этой учётной записи нет доступа к административной панели.',
            ])->onlyInput('email');
        }

        Auth::login($user,$request->boolean('remember'));
        $request->session()->regenerate();

        return redirect()->route($user->adminHomeRouteName());
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect()->route('admin.login');
    }
}
