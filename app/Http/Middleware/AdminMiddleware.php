<?php
namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Str;

class AdminMiddleware
{
    public function handle($request,Closure $next)
    {
        $user=auth()->user();
        if(!$user || !$user->is_admin) abort(403);

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
