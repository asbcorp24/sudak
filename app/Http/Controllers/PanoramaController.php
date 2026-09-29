<?php

namespace App\Http\Controllers;

use App\Models\Panorama;

class PanoramaController extends Controller
{
    public function index()
    {
        $panoramas=Panorama::with(['hotspots.targetPanorama'])
            ->where('is_published',true)
            ->orderBy('sort')
            ->orderByDesc('id')
            ->get();

        $publishedIds=$panoramas->pluck('id')->all();
        $scenes=[];

        foreach($panoramas as $panorama){
            $hotSpots=[];

            foreach($panorama->hotspots as $hotspot){
                $text=$hotspot->title;
                if($hotspot->description){
                    $text.=' — '.$hotspot->description;
                }

                if(
                    $hotspot->type==='scene' &&
                    $hotspot->targetPanorama &&
                    in_array($hotspot->target_panorama_id,$publishedIds,true)
                ){
                    $hotSpots[]=[
                        'id'=>'hs-'.$hotspot->id,
                        'pitch'=>(float)$hotspot->pitch,
                        'yaw'=>(float)$hotspot->yaw,
                        'type'=>'scene',
                        'text'=>$text,
                        'sceneId'=>$hotspot->targetPanorama->slug,
                        'targetPitch'=>(float)$hotspot->targetPanorama->initial_pitch,
                        'targetYaw'=>(float)$hotspot->targetPanorama->initial_yaw,
                        'targetHfov'=>100,
                    ];
                }else{
                    $hotSpots[]=[
                        'id'=>'hs-'.$hotspot->id,
                        'pitch'=>(float)$hotspot->pitch,
                        'yaw'=>(float)$hotspot->yaw,
                        'type'=>'info',
                        'text'=>$text,
                    ];
                }
            }

            $scenes[$panorama->slug]=[
                'type'=>'equirectangular',
                'panorama'=>$panorama->image_url,
                'title'=>$panorama->title,
                'pitch'=>(float)$panorama->initial_pitch,
                'yaw'=>(float)$panorama->initial_yaw,
                'hfov'=>100,
                'hotSpots'=>$hotSpots,
            ];
        }

        return view('panoramas.index',[
            'panoramas'=>$panoramas,
            'pannellumScenes'=>$scenes,
        ]);
    }
}
