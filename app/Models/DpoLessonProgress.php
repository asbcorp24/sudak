<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoLessonProgress extends Model{
 protected $fillable=['lesson_id','group_id','user_id','status','started_at','completed_at','last_seen_at'];
 protected $casts=['started_at'=>'datetime','completed_at'=>'datetime','last_seen_at'=>'datetime'];
 public function lesson(){return $this->belongsTo(DpoLesson::class,'lesson_id');}
 public function group(){return $this->belongsTo(DpoGroup::class,'group_id');}
 public function user(){return $this->belongsTo(User::class);}
}