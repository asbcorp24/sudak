<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use App\Models\Specialty;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class SpecialtyAdminController extends Controller
{
    public function index(){return view('admin.specialties.index',['specialties'=>Specialty::orderBy('sort')->paginate(30)]);}

    public function create(){return view('admin.specialties.form',$this->formData(new Specialty));}

    public function store(Request $r)
    {
        [$d,$cover,$content]=$this->data($r);
        $d['slug']=$d['slug']?:Str::slug($d['title']);
        $specialty=Specialty::create($d);
        $specialty->syncMediaCollection('cover',$cover?[$cover]:[]);
        $specialty->syncMediaCollection('content',$content);
        return redirect()->route('admin.specialties.index')->with('ok','Специальность создана');
    }

    public function edit(Specialty $specialty)
    {
        $specialty->load('media');
        return view('admin.specialties.form',$this->formData($specialty));
    }

    public function update(Request $r,Specialty $specialty)
    {
        [$d,$cover,$content]=$this->data($r,$specialty->id);
        $d['slug']=$d['slug']?:Str::slug($d['title']);
        $specialty->update($d);
        $specialty->syncMediaCollection('cover',$cover?[$cover]:[]);
        $specialty->syncMediaCollection('content',$content);
        return redirect()->route('admin.specialties.index')->with('ok','Специальность обновлена');
    }

    public function destroy(Specialty $specialty)
    {
        $specialty->syncMediaCollection('cover',[]);
        $specialty->syncMediaCollection('content',[]);
        $specialty->delete();
        return back()->with('ok','Специальность удалена');
    }

    private function formData(Specialty $specialty): array
    {
        return [
            'specialty'=>$specialty,
            'media'=>MediaAsset::latest()->get(),
            'selectedCover'=>$specialty->exists?optional($specialty->getMedia('cover')->first())->id:null,
            'selectedContent'=>$specialty->exists?$specialty->getMedia('content')->pluck('id')->all():[],
        ];
    }

    private function data(Request $r,$id=null): array
    {
        $d=$r->validate([
            'code'=>'required|max:40',
            'title'=>'required|max:255',
            'slug'=>'nullable|max:191|unique:specialties,slug,'.($id??'NULL'),
            'duration'=>'nullable|max:120',
            'qualification'=>'nullable|max:120',
            'admission_basis'=>'nullable|max:255',
            'description'=>'nullable',
            'details'=>'nullable',
            'scene_key'=>'required|max:80',
            'accent'=>'nullable|max:30',
            'scene_config'=>'nullable|string',
            'sort'=>'nullable|integer',
            'is_published'=>'nullable|boolean',
            'main_media_id'=>'nullable|integer|exists:media_assets,id',
            'content_media_ids'=>'nullable|array',
            'content_media_ids.*'=>'integer|distinct|exists:media_assets,id',
        ]);

        $cover=isset($d['main_media_id'])&&$d['main_media_id']!==''?(int)$d['main_media_id']:null;
        if($cover&&!MediaAsset::whereKey($cover)->where('type','image')->exists()){
            throw ValidationException::withMessages(['main_media_id'=>'Главным медиа может быть только изображение.']);
        }
        $content=array_map('intval',$d['content_media_ids']??[]);
        unset($d['main_media_id'],$d['content_media_ids']);
        $d['is_published']=$r->boolean('is_published');
        $d['sort']=(int)$r->input('sort',0);
        $raw=$r->input('scene_config');
        $d['scene_config']=$raw&&json_last_error()===JSON_ERROR_NONE?json_decode($raw,true):($raw?json_decode($raw,true):null);

        return [$d,$cover,$content];
    }
}
