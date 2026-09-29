<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoAssignment extends Model{
 protected $fillable=['lesson_id','title','description','max_score','allow_text','allow_file','is_published'];
 protected $casts=['max_score'=>'decimal:2','allow_text'=>'boolean','allow_file'=>'boolean','is_published'=>'boolean'];
 public function lesson(){return $this->belongsTo(DpoLesson::class,'lesson_id');}
 public function groups(){return $this->belongsToMany(DpoGroup::class,'dpo_group_assignments','assignment_id','group_id')->withPivot(['available_from','due_at'])->withTimestamps();}
 public function submissions(){return $this->hasMany(DpoSubmission::class,'assignment_id');}
}