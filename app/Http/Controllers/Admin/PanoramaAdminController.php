<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Panorama;
use App\Models\PanoramaHotspot;
use App\Services\StorageQuota;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PanoramaAdminController extends Controller
{
    public function index()
    {
        return view('admin.panoramas.index',[
            'panoramas'=>Panorama::orderBy('sort')->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data=$this->validateData($request,true);
        $file=$request->file('image');
        $meta=$this->storePanorama($file);

        if($request->boolean('is_home')){
            Panorama::where('is_home',true)->update(['is_home'=>false]);
        }
        Panorama::create(array_merge($this->payload($request,$data),$meta));

        return back()->with('ok','Панорама добавлена');
    }

    public function update(Request $request,Panorama $panorama)
    {
        $data=$this->validateData($request,false);
        $payload=$this->payload($request,$data);

        if($request->hasFile('image')){
            $meta=$this->storePanorama($request->file('image'));
            Storage::disk($panorama->image_disk ?: 'public')->delete($panorama->image_path);
            $payload=array_merge($payload,$meta);
        }

        if($request->boolean('is_home')){
            Panorama::where('id','!=',$panorama->id)->where('is_home',true)->update(['is_home'=>false]);
        }
        $panorama->update($payload);
        return back()->with('ok','Панорама сохранена');
    }

    public function builder(Panorama $panorama)
    {
        $panorama->load(['hotspots.targetPanorama']);

        return view('admin.panoramas.builder',[
            'panorama'=>$panorama,
            'targets'=>Panorama::where('id','!=',$panorama->id)->orderBy('sort')->orderBy('title')->get(),
        ]);
    }

    public function storeHotspot(Request $request,Panorama $panorama)
    {
        $data=$this->validateHotspot($request);

        $panorama->hotspots()->create([
            'type'=>$data['type'],
            'title'=>$data['title'],
            'description'=>$data['description']??null,
            'target_panorama_id'=>$data['type']==='scene' ? ($data['target_panorama_id']??null) : null,
            'pitch'=>$data['pitch'],
            'yaw'=>$data['yaw'],
            'sort'=>(int)($data['sort']??0),
        ]);

        return back()->with('ok','Интерактивная точка добавлена');
    }

    public function updateHotspot(Request $request,PanoramaHotspot $hotspot)
    {
        $data=$this->validateHotspot($request);

        $hotspot->update([
            'type'=>$data['type'],
            'title'=>$data['title'],
            'description'=>$data['description']??null,
            'target_panorama_id'=>$data['type']==='scene' ? ($data['target_panorama_id']??null) : null,
            'pitch'=>$data['pitch'],
            'yaw'=>$data['yaw'],
            'sort'=>(int)($data['sort']??0),
        ]);

        return back()->with('ok','Интерактивная точка сохранена');
    }

    public function destroyHotspot(PanoramaHotspot $hotspot)
    {
        $hotspot->delete();
        return back()->with('ok','Интерактивная точка удалена');
    }

    public function destroy(Panorama $panorama)
    {
        Storage::disk($panorama->image_disk ?: 'public')->delete($panorama->image_path);
        $panorama->delete();

        return back()->with('ok','Панорама удалена');
    }

    private function validateData(Request $request,bool $creating): array
    {
        return $request->validate([
            'title'=>['required','string','max:220'],
            'description'=>['nullable','string','max:5000'],
            'location'=>['nullable','string','max:220'],
            'image'=>[$creating?'required':'nullable','file','mimes:jpg,jpeg,png,webp','max:51200'],
            'sort'=>['nullable','integer','min:0','max:65535'],
            'initial_yaw'=>['nullable','integer','min:-180','max:180'],
            'initial_pitch'=>['nullable','integer','min:-80','max:80'],
            'is_published'=>['nullable','boolean'],
            'is_home'=>['nullable','boolean'],
        ]);
    }

    private function validateHotspot(Request $request): array
    {
        $data=$request->validate([
            'type'=>['required','in:info,scene'],
            'title'=>['required','string','max:220'],
            'description'=>['nullable','string','max:2000'],
            'target_panorama_id'=>['nullable','integer','exists:panoramas,id'],
            'pitch'=>['required','numeric','min:-90','max:90'],
            'yaw'=>['required','numeric','min:-180','max:180'],
            'sort'=>['nullable','integer','min:0','max:65535'],
        ]);

        if($data['type']==='scene' && empty($data['target_panorama_id'])){
            throw ValidationException::withMessages(['target_panorama_id'=>'Для точки-перехода выберите целевую панораму.']);
        }

        return $data;
    }

    private function payload(Request $request,array $data): array
    {
        $slug=Str::slug($data['title']);
        if($slug==='') $slug='panorama';
        $base=$slug;
        $i=2;
        while(Panorama::where('slug',$slug)->when($request->route('panorama'),fn($q,$p)=>$q->where('id','!=',$p->id))->exists()){
            $slug=$base.'-'.$i++;
        }

        return [
            'title'=>$data['title'],
            'slug'=>$slug,
            'description'=>$data['description']??null,
            'location'=>$data['location']??null,
            'sort'=>(int)($data['sort']??0),
            'initial_yaw'=>(int)($data['initial_yaw']??0),
            'initial_pitch'=>(int)($data['initial_pitch']??0),
            'is_published'=>$request->boolean('is_published'),
            'is_home'=>$request->boolean('is_home'),
        ];
    }

    private function storePanorama($file): array
    {
        $bytes=(int)$file->getSize();
        if(!StorageQuota::canStore($bytes)){
            throw ValidationException::withMessages(['image'=>'Недостаточно места в хранилище для этой панорамы.']);
        }

        $size=@getimagesize($file->getRealPath());
        if(!$size){
            throw ValidationException::withMessages(['image'=>'Не удалось прочитать изображение.']);
        }

        [$width,$height]=$size;
        $ratio=$height>0?$width/$height:0;
        if($ratio<1.8 || $ratio>2.2){
            throw ValidationException::withMessages([
                'image'=>'Для сферической панорамы нужно эквидистантное изображение примерно 2:1. Получено '.$width.'×'.$height.'.',
            ]);
        }

        $extension=strtolower($file->getClientOriginalExtension());
        $path=$file->storeAs(
            'panoramas/'.now()->format('Y/m'),
            (string)Str::uuid().'.'.$extension,
            'public'
        );

        return [
            'image_path'=>$path,
            'image_disk'=>'public',
            'image_width'=>$width,
            'image_height'=>$height,
            'image_size'=>Storage::disk('public')->size($path),
        ];
    }
}
