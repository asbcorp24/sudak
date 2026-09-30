<?php
namespace App\Providers;

use App\Models\MenuItem;
use App\Models\MusicTrack;
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

            try{
                $musicTracks=Schema::hasTable('music_tracks')
                    ? MusicTrack::where('is_active',1)->orderBy('sort_order')->orderBy('id')->get()
                    : collect();
            }catch(\Throwable $e){
                $musicTracks=collect();
            }

            $view->with('mainMenu',$menu)
                ->with('siteSettings',$siteSettings)
                ->with('musicTracks',$musicTracks);
        });
    }
}
