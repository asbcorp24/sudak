<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoModule extends Model{
 protected $fillable=['program_id','title','description','sort','is_published'];
 protected $casts=['sort'=>'integer','is_published'=>'boolean'];
 public function program(){return $this->belongsTo(DpoProgram::class,'program_id');}
 public function lessons(){return $this->hasMany(DpoLesson::class,'module_id')->orderBy('sort')->orderBy('id');}
}