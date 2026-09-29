<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoLesson extends Model{
 protected $fillable=['module_id','title','description','content','duration_minutes','lesson_type','completion_mode','sort','is_published'];
 protected $casts=['duration_minutes'=>'integer','sort'=>'integer','is_published'=>'boolean'];
 public function module(){return $this->belongsTo(DpoModule::class,'module_id');}
 public function resources(){return $this->hasMany(DpoLessonResource::class,'lesson_id')->orderBy('sort')->orderBy('id');}
 public function assignments(){return $this->hasMany(DpoAssignment::class,'lesson_id');}
 public function scormPackages(){return $this->hasMany(DpoScormPackage::class,'lesson_id');}
}