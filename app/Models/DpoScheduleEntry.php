<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoScheduleEntry extends Model{
 protected $fillable=['group_id','lesson_id','teacher_user_id','title','starts_at','ends_at','room','online_url','notes'];
 protected $casts=['starts_at'=>'datetime','ends_at'=>'datetime'];
 public function group(){return $this->belongsTo(DpoGroup::class,'group_id');}
 public function lesson(){return $this->belongsTo(DpoLesson::class,'lesson_id');}
 public function teacher(){return $this->belongsTo(User::class,'teacher_user_id');}
 public function attendance(){return $this->hasMany(DpoAttendance::class,'schedule_entry_id');}
}