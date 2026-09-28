<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; use App\Models\Specialty; use Illuminate\Http\Request; use Illuminate\Support\Str;
class SpecialtyAdminController extends Controller{
 public function index(){return view('admin.specialties.index',['specialties'=>Specialty::orderBy('sort')->paginate(30)]);}
 public function create(){return view('admin.specialties.form',['specialty'=>new Specialty]);}
 public function store(Request $r){$d=$this->data($r);$d['slug']=$d['slug']?:Str::slug($d['title']);Specialty::create($d);return redirect()->route('admin.specialties.index')->with('ok','Специальность создана');}
 public function edit(Specialty $specialty){return view('admin.specialties.form',compact('specialty'));}
 public function update(Request $r,Specialty $specialty){$d=$this->data($r,$specialty->id);$d['slug']=$d['slug']?:Str::slug($d['title']);$specialty->update($d);return redirect()->route('admin.specialties.index')->with('ok','Специальность обновлена');}
 public function destroy(Specialty $specialty){$specialty->delete();return back()->with('ok','Специальность удалена');}
 private function data(Request $r,$id=null){
  $d=$r->validate(['code'=>'required|max:40','title'=>'required|max:255','slug'=>'nullable|max:191|unique:specialties,slug,'.($id??'NULL'),'duration'=>'nullable|max:120','qualification'=>'nullable|max:120','admission_basis'=>'nullable|max:255','description'=>'nullable','details'=>'nullable','scene_key'=>'required|max:80','accent'=>'nullable|max:30','scene_config'=>'nullable|string','sort'=>'nullable|integer','is_published'=>'nullable|boolean']);
  $d['is_published']=$r->boolean('is_published'); $d['sort']=(int)$r->input('sort',0);
  $raw=$r->input('scene_config'); if($raw){$json=json_decode($raw,true);$d['scene_config']=json_last_error()===JSON_ERROR_NONE?$json:null;}else{$d['scene_config']=null;}
  return $d;
 }
}