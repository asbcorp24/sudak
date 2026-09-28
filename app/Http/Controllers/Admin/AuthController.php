<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; use Illuminate\Http\Request; use Illuminate\Support\Facades\Auth;
class AuthController extends Controller{
 public function show(){if(Auth::check()) return redirect()->route('admin.dashboard'); return view('admin.login');}
 public function login(Request $request){$c=$request->validate(['email'=>'required|email','password'=>'required']); if(Auth::attempt($c,$request->boolean('remember'))){$request->session()->regenerate(); return redirect()->intended(route('admin.dashboard'));} return back()->withErrors(['email'=>'Неверный логин или пароль'])->onlyInput('email');}
 public function logout(Request $request){Auth::logout();$request->session()->invalidate();$request->session()->regenerateToken();return redirect()->route('admin.login');}
}