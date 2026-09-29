<?php

namespace App\Http\Middleware;

use Closure;

class StudentMiddleware
{
    public function handle($request, Closure $next)
    {
        if(!auth()->check()) return redirect()->route('student.login');
        if(auth()->user()->user_type!=='student') abort(403,'Этот раздел доступен студентам колледжа.');
        return $next($request);
    }
}
