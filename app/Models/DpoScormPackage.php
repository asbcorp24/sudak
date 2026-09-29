<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoScormPackage extends Model{
 protected $fillable=['lesson_id','title','scorm_version','manifest_identifier','launch_path','storage_path','package_hash','max_score','max_attempts','is_active','settings'];
 protected $casts=['max_score'=>'decimal:2','max_attempts'=>'integer','is_active'=>'boolean','settings'=>'array'];
 public function lesson(){return $this->belongsTo(DpoLesson::class,'lesson_id');}
 public function attempts(){return $this->hasMany(DpoScormAttempt::class,'package_id');}
}