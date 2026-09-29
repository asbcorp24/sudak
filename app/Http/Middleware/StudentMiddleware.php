<?php

namespace App\Http\Middleware;

use Closure;

class StudentMiddleware
{
    public function handle($request, Closure $next)
    {
        if(!auth()->check()) return redirect()->route('student.login');
        if(auth()->user()->user_type!=='student') abort(403,'Этот раздел доступен студентам колледжа.');
        if(auth()->user()->student_approval_status!=='approved'){
            auth()->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect()->route('student.login')->withErrors([
                'email'=>'Доступ к личному кабинету возможен только после подтверждения регистрации администратором.'
            ]);
        }
        return $next($request);
    }
}
