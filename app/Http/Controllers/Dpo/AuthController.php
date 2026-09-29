<?php
namespace App\Http\Controllers\Dpo;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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

        $adminHasDpoAccess=$user->is_admin && $user->canAdmin('dpo');

        if (!$adminHasDpoAccess && (!$user->dpoProfile || !$user->dpoProfile->is_active)) {
            Auth::logout();
            return back()->withErrors(['email'=>'Для этой учётной записи доступ к ДПО не активирован.']);
        }

        return redirect()->intended(route('dpo.dashboard'));
    }

    public function profile(Request $request)
    {
        return view('dpo.profile',['user'=>$request->user()->load('dpoProfile')]);
    }

    public function updateProfile(Request $request)
    {
        $user=$request->user();

        $data=$request->validate([
            'name'=>['required','string','max:255'],
            'phone'=>['nullable','string','max:80'],
            'organization'=>['nullable','string','max:255'],
            'position'=>['nullable','string','max:255'],
            'current_password'=>['nullable','string'],
            'password'=>['nullable','string','min:6','max:255','confirmed'],
        ]);

        if(!empty($data['password'])){
            if(empty($data['current_password']) || !Hash::check($data['current_password'],$user->password)){
                throw ValidationException::withMessages(['current_password'=>'Текущий пароль указан неверно.']);
            }
            $user->password=Hash::make($data['password']);
        }

        $user->name=$data['name'];
        $user->save();

        if($user->dpoProfile){
            $user->dpoProfile->update([
                'phone'=>$data['phone']??null,
                'organization'=>$data['organization']??null,
                'position'=>$data['position']??null,
            ]);
        }

        return back()->with('ok','Профиль обновлён');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect()->route('dpo.login');
    }
}
