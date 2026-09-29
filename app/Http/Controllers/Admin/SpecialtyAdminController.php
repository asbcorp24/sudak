<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Employee;
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
        [$d,$cover,$content,$teachers]=$this->data($r);
        $d['slug']=$d['slug']?:Str::slug($d['title']);
        $specialty=Specialty::create($d);
        $specialty->teachers()->sync($teachers);
        $specialty->syncMediaCollection('cover',$cover?[$cover]:[]);
        $specialty->syncMediaCollection('content',$content);
        return redirect()->route('admin.specialties.index')->with('ok','Специальность создана');
    }

    public function edit(Specialty $specialty)
    {
        $specialty->load(['media','teachers']);
        return view('admin.specialties.form',$this->formData($specialty));
    }

    public function update(Request $r,Specialty $specialty)
    {
        [$d,$cover,$content,$teachers]=$this->data($r,$specialty->id);
        $d['slug']=$d['slug']?:Str::slug($d['title']);
        $specialty->update($d);
        $specialty->teachers()->sync($teachers);
        $specialty->syncMediaCollection('cover',$cover?[$cover]:[]);
        $specialty->syncMediaCollection('content',$content);
        return redirect()->route('admin.specialties.index')->with('ok','Специальность обновлена');
    }

    public function destroy(Specialty $specialty)
    {
        $specialty->teachers()->detach();
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
            'teachers'=>Employee::where('employee_type','teacher')->orderBy('sort')->orderBy('full_name')->get(),
            'selectedTeachers'=>$specialty->exists?$specialty->teachers->pluck('id')->all():[],
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
            'learning_outcomes_text'=>'nullable|string',
            'disciplines_text'=>'nullable|string',
            'practice'=>'nullable|string',
            'professions_text'=>'nullable|string',
            'partners_text'=>'nullable|string',
            'student_projects_text'=>'nullable|string',
            'teacher_ids'=>'nullable|array',
            'teacher_ids.*'=>'integer|distinct|exists:employees,id',
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
        $teachers=array_map('intval',$d['teacher_ids']??[]);

        $d['learning_outcomes']=$this->lines($d['learning_outcomes_text']??'');
        $d['disciplines']=$this->lines($d['disciplines_text']??'');
        $d['professions']=$this->lines($d['professions_text']??'');
        $d['partners']=$this->lines($d['partners_text']??'');
        $d['student_projects']=$this->projects($d['student_projects_text']??'');

        unset(
            $d['learning_outcomes_text'],$d['disciplines_text'],$d['professions_text'],$d['partners_text'],
            $d['student_projects_text'],$d['teacher_ids'],$d['main_media_id'],$d['content_media_ids']
        );

        $d['is_published']=$r->boolean('is_published');
        $d['sort']=(int)$r->input('sort',0);
        $raw=$r->input('scene_config');
        if ($raw) {
            $json=json_decode($raw,true);
            if (json_last_error() !== JSON_ERROR_NONE) {
                throw ValidationException::withMessages(['scene_config'=>'Некорректный JSON параметров 3D-сцены.']);
            }
            $d['scene_config']=$json;
        } else {
            $d['scene_config']=null;
        }

        return [$d,$cover,$content,$teachers];
    }

    private function lines(?string $value): array
    {
        return array_values(array_filter(array_map('trim',preg_split('/\r\n|\r|\n/',(string)$value))));
    }

    private function projects(?string $value): array
    {
        $items=[];
        foreach($this->lines($value) as $line){
            $parts=array_map('trim',explode('|',$line,3));
            if(($parts[0]??'')==='') continue;
            $url=$parts[2]??'';
            if($url!==''&&!preg_match('#^https?://#i',$url)) $url='';
            $items[]=['title'=>$parts[0],'description'=>$parts[1]??'','url'=>$url];
        }
        return $items;
    }
}
