<?php
namespace App\Http\Middleware;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
class Authenticate extends Middleware{
 protected function redirectTo($request){
  if($request->expectsJson()) return null;
  if($request->is('dpo') || $request->is('dpo/*')) return route('dpo.login');
  return route('admin.login');
 }
}