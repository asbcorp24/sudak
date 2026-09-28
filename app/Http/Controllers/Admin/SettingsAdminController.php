<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\StorageQuota;
use Illuminate\Http\Request;

class SettingsAdminController extends Controller
{
    public function edit()
    {
        $settings=Setting::pluck('value','key')->all();
        $stats=StorageQuota::stats();
        $stats['quota_human']=$stats['quota']>0?StorageQuota::formatBytes($stats['quota']):'Без лимита';
        $stats['used_human']=StorageQuota::formatBytes($stats['used']);
        $stats['remaining_human']=$stats['remaining']===null?'Без лимита':StorageQuota::formatBytes($stats['remaining']);

        return view('admin.settings',compact('settings','stats'));
    }

    public function update(Request $request)
    {
        $data=$request->validate([
            'home_eyebrow'=>['nullable','string','max:255'],
            'home_title_line1'=>['nullable','string','max:255'],
            'home_title_line2'=>['nullable','string','max:255'],
            'home_intro'=>['nullable','string','max:2000'],
            'home_primary_button'=>['nullable','string','max:120'],
            'home_secondary_button'=>['nullable','string','max:120'],
            'home_specialties_eyebrow'=>['nullable','string','max:255'],
            'home_specialties_title'=>['nullable','string','max:255'],
            'home_specialties_text'=>['nullable','string','max:2000'],
            'home_tech_title'=>['nullable','string','max:255'],
            'home_tech_text'=>['nullable','string','max:2000'],
            'home_news_title'=>['nullable','string','max:255'],

            'seo_title'=>['nullable','string','max:255'],
            'seo_description'=>['nullable','string','max:500'],
            'seo_keywords'=>['nullable','string','max:1000'],
            'seo_robots'=>['nullable','string','max:120'],
            'seo_canonical'=>['nullable','url','max:1000'],
            'seo_og_title'=>['nullable','string','max:255'],
            'seo_og_description'=>['nullable','string','max:500'],
            'seo_og_image'=>['nullable','url','max:2000'],
            'seo_twitter_card'=>['nullable','string','max:120'],

            'storage_quota_mb'=>['required','integer','min:0','max:10485760'],
        ]);

        foreach($data as $key=>$value){
            Setting::updateOrCreate(['key'=>$key],['value'=>$value,'group'=>str_starts_with($key,'seo_')?'seo':(str_starts_with($key,'home_')?'home':'storage')]);
        }

        return back()->with('ok','Настройки сайта сохранены');
    }
}
