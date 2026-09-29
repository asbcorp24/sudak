<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoGroup extends Model{
 protected $fillable=['program_id','name','starts_on','ends_on','status','description'];
 protected $casts=['starts_on'=>'date','ends_on'=>'date'];
 public function program(){return $this->belongsTo(DpoProgram::class,'program_id');}
 public function enrollments(){return $this->hasMany(DpoEnrollment::class,'group_id');}
 public function students(){return $this->belongsToMany(User::class,'dpo_enrollments','group_id','user_id')->wherePivot('role','student')->withPivot(['status','enrolled_at','completed_at'])->withTimestamps();}
 public function teachers(){return $this->belongsToMany(User::class,'dpo_enrollments','group_id','user_id')->wherePivot('role','teacher')->withPivot(['status','enrolled_at','completed_at'])->withTimestamps();}
 public function scheduleEntries(){return $this->hasMany(DpoScheduleEntry::class,'group_id');}
}