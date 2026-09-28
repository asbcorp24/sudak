<?php
namespace App\Providers;
use App\Models\Page; use Illuminate\Pagination\Paginator; use Illuminate\Support\Facades\Schema; use Illuminate\Support\Facades\View; use Illuminate\Support\ServiceProvider;
class AppServiceProvider extends ServiceProvider{
 public function register(){}
 public function boot(){
  Schema::defaultStringLength(191); Paginator::useBootstrapFive();
  View::composer('layouts.app',function($view){
   try{$menu=Page::query()->whereNull('parent_id')->where('show_in_menu',1)->where('is_published',1)->with('childrenRecursive')->orderBy('sort')->get();}
   catch(\Throwable $e){$menu=collect();}
   $view->with('mainMenu',$menu);
  });
 }
}