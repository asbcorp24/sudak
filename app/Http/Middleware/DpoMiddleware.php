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
        $adminHasDpoAccess=$user->is_admin && $user->canAdmin('dpo');

        if (!$adminHasDpoAccess && (!$user->dpoProfile || !$user->dpoProfile->is_active)) {
            return redirect()
                ->route('dpo.login')
                ->with('dpo_access_error','Текущая учётная запись не имеет доступа к ДПО. Войдите под учётной записью слушателя ДПО.');
        }

        return $next($request);
    }
}
