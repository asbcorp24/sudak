<?php
namespace App\Http\Middleware;

use Closure;

class DpoMiddleware
{
    public function handle($request, Closure $next)
    {
        if (!auth()->check()) {
            return redirect()->route('dpo.login');
        }

        $user=auth()->user();
        if (!$user->is_admin && (!$user->dpoProfile || !$user->dpoProfile->is_active)) {
            abort(403, 'Доступ к ДПО не активирован.');
        }

        return $next($request);
    }
}
