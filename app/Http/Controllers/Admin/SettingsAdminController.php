<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Services\StorageQuota;
use Illuminate\Http\Request;

class SettingsAdminController extends Controller
{
    private const HOME_SECTIONS = [
        'quick_actions'=>10,
        'schedule'=>20,
        'open_day'=>30,
        'events'=>35,
        'specialties'=>40,
        'admission'=>50,
        'achievements'=>60,
        'tech'=>70,
        'news'=>80,
    ];

    public function edit()
    {
        $settings=Setting::pluck('value','key')->all();
        $stats=StorageQuota::stats();
        $stats['quota_human']=$stats['quota']>0?StorageQuota::formatBytes($stats['quota']):'Без лимита';
        $stats['used_human']=StorageQuota::formatBytes($stats['used']);
        $stats['remaining_human']=$stats['remaining']===null?'Без лимита':StorageQuota::formatBytes($stats['remaining']);

        return view('admin.settings',[
            'settings'=>$settings,
            'stats'=>$stats,
            'homeSectionDefaults'=>self::HOME_SECTIONS,
        ]);
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
            'home_events_title'=>['nullable','string','max:255'],
            'home_schedule_title'=>['nullable','string','max:255'],
            'home_open_day_title'=>['nullable','string','max:255'],
            'home_open_day_date'=>['nullable','date'],
            'home_open_day_time'=>['nullable','string','max:120'],
            'home_open_day_text'=>['nullable','string','max:2000'],
            'home_admission_title'=>['nullable','string','max:255'],
            'home_admission_text'=>['nullable','string','max:2000'],
            'home_achievements_title'=>['nullable','string','max:255'],

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

        foreach(self::HOME_SECTIONS as $key=>$defaultOrder){
            $request->validate([
                'home_section_'.$key.'_order'=>['nullable','integer','min:1','max:999'],
            ]);

            $data['home_section_'.$key.'_enabled']=$request->boolean('home_section_'.$key.'_enabled')?'1':'0';
            $data['home_section_'.$key.'_order']=(string)$request->integer('home_section_'.$key.'_order',$defaultOrder);
        }

        foreach($data as $key=>$value){
            $group='storage';
            if(str_starts_with($key,'seo_'))$group='seo';
            elseif(str_starts_with($key,'home_'))$group='home';

            Setting::updateOrCreate(
                ['key'=>$key],
                ['value'=>$value,'group'=>$group]
            );
        }

        return back()->with('ok','Настройки сайта сохранены');
    }
}
