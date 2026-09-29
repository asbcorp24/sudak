<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\CollegeEvent;
use App\Models\NewsPost;
use App\Models\Panorama;
use App\Models\ScheduleEntry;
use App\Models\Setting;
use App\Models\Specialty;
use Carbon\Carbon;

class HomeController extends Controller
{
    public function __invoke()
    {
        $settings=Setting::pluck('value','key')->all();

        $sectionDefaults=[
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

        $homeSections=collect($sectionDefaults)
            ->map(function($defaultOrder,$key) use ($settings){
                return [
                    'key'=>$key,
                    'enabled'=>($settings['home_section_'.$key.'_enabled'] ?? '1') !== '0',
                    'order'=>(int)($settings['home_section_'.$key.'_order'] ?? $defaultOrder),
                ];
            })
            ->filter(fn($item)=>$item['enabled'])
            ->sortBy('order')
            ->pluck('key')
            ->values();

        $todaySchedule=ScheduleEntry::with(['group','teacher'])
            ->whereDate('lesson_date',now()->toDateString())
            ->orderBy('starts_at')
            ->orderBy('group_id')
            ->take(8)
            ->get();

        $upcomingEvents=CollegeEvent::published()
            ->where('starts_at','>=',now()->startOfDay())
            ->orderBy('starts_at')
            ->orderByDesc('is_featured')
            ->orderBy('sort')
            ->take(5)
            ->get();

        $achievements=Achievement::with(['competition','media'])
            ->where('is_public',true)
            ->orderByDesc('awarded_at')
            ->orderByDesc('id')
            ->take(3)
            ->get();

        $openDayEvent=CollegeEvent::published()
            ->where('type','open_day')
            ->where('starts_at','>=',now()->startOfDay())
            ->orderBy('starts_at')
            ->first();

        $openDayDate=null;
        $openDayDateRaw=$openDayEvent?->starts_at ?: ($settings['home_open_day_date'] ?? null);
        if($openDayDateRaw){
            try{
                $date=Carbon::parse($openDayDateRaw);
                $openDayDate=[
                    'day'=>$date->format('d'),
                    'month'=>mb_strtoupper($date->translatedFormat('F')),
                    'year'=>$date->format('Y'),
                    'full'=>$date->translatedFormat('d F Y'),
                ];
            }catch(\Throwable $e){
                $openDayDate=null;
            }
        }

        $homePanorama=Panorama::with(['hotspots.targetPanorama'])
            ->where('is_published',true)
            ->orderByDesc('is_home')
            ->orderBy('sort')
            ->orderByDesc('id')
            ->first();

        $homePanoramaHotspots=$homePanorama
            ? $homePanorama->hotspots->map(function($hotspot){
                $text=$hotspot->title.($hotspot->description ? ' — '.$hotspot->description : '');
                $item=[
                    'id'=>'home-hs-'.$hotspot->id,
                    'pitch'=>(float)$hotspot->pitch,
                    'yaw'=>(float)$hotspot->yaw,
                    'type'=>'info',
                    'text'=>$text,
                ];

                if($hotspot->type==='scene' && $hotspot->targetPanorama && $hotspot->targetPanorama->is_published){
                    $item['URL']=route('panoramas.index').'#panorama-'.$hotspot->targetPanorama->slug;
                    $item['attributes']=['target'=>'_self'];
                }

                return $item;
            })->values()->all()
            : [];

        return view('home',[
            'specialties'=>Specialty::published()->orderBy('sort')->get(),
            'news'=>NewsPost::with('media')->published()->latest('published_at')->take(6)->get(),
            'students'=>Setting::valueOf('students','519'),
            'teachers'=>Setting::valueOf('teachers','34'),
            'homeSettings'=>$settings,
            'homeSections'=>$homeSections,
            'todaySchedule'=>$todaySchedule,
            'upcomingEvents'=>$upcomingEvents,
            'achievements'=>$achievements,
            'openDayDate'=>$openDayDate,
            'openDayEvent'=>$openDayEvent,
            'homePanorama'=>$homePanorama,
            'homePanoramaHotspots'=>$homePanoramaHotspots,
        ]);
    }
}
