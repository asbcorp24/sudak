<?php
namespace App\Providers;

use App\Models\MenuItem;
use App\Models\Setting;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\View;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(){}

    public function boot()
    {
        Schema::defaultStringLength(191);
        Paginator::useBootstrapFive();

        View::composer('layouts.app',function($view){
            try{
                $menu=MenuItem::query()
                    ->whereNull('parent_id')
                    ->where('is_active',1)
                    ->with(['page','childrenRecursive'])
                    ->orderBy('sort')
                    ->orderBy('id')
                    ->get();
            }catch(\Throwable $e){
                $menu=collect();
            }

            try{
                $siteSettings=Setting::pluck('value','key')->all();
            }catch(\Throwable $e){
                $siteSettings=[];
            }

            $view->with('mainMenu',$menu)->with('siteSettings',$siteSettings);
        });
    }
}
