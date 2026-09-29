<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class AdminMiddleware
{
    public function handle($request,Closure $next)
    {
        $user=auth()->user();

        if(!$user){
            return redirect()->route('admin.login');
        }

        if(!$user->is_admin){
            return redirect()
                ->route('admin.login')
                ->with('admin_access_error','Текущая учётная запись не является администратором. Войдите под учётной записью администратора.');
        }

        $scope=$user->adminScope();
        if($scope==='full') return $next($request);

        $routeName=(string)optional($request->route())->getName();

        if($routeName==='admin.dashboard'){
            return $next($request);
        }

        $allowed=false;

        if($scope==='dpo'){
            $allowed=Str::startsWith($routeName,'admin.dpo.')
                || $routeName==='admin.media.store';
        }elseif($scope==='schedule'){
            $allowed=Str::startsWith($routeName,'admin.schedule.')
                || Str::startsWith($routeName,'admin.employees.')
                || $routeName==='admin.media.store';
        }elseif($scope==='site'){
            $allowed=!Str::startsWith($routeName,'admin.dpo.')
                && !Str::startsWith($routeName,'admin.schedule.')
                && !Str::startsWith($routeName,'admin.admins.');
        }

        if(!$allowed) abort(403,'Недостаточно прав для этого раздела.');

        return $next($request);
    }
}
