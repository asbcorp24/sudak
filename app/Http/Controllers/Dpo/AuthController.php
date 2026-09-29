<?php
namespace App\Http\Controllers\Dpo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function show()
    {
        if (Auth::check()) return redirect()->route('dpo.dashboard');
        return view('dpo.login');
    }

    public function login(Request $request)
    {
        $credentials=$request->validate([
            'email'=>['required','email'],
            'password'=>['required','string'],
        ]);

        if (!Auth::attempt($credentials,$request->boolean('remember'))) {
            return back()->withErrors(['email'=>'Неверный логин или пароль'])->onlyInput('email');
        }

        $request->session()->regenerate();
        $user=Auth::user();

        if (!$user->is_admin && (!$user->dpoProfile || !$user->dpoProfile->is_active)) {
            Auth::logout();
            return back()->withErrors(['email'=>'Для этой учётной записи доступ к ДПО не активирован.']);
        }

        return redirect()->intended(route('dpo.dashboard'));
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('dpo.login');
    }
}
