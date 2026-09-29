<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory,Notifiable;

    protected $fillable=['name','email','password','is_admin'];
    protected $hidden=['password','remember_token'];
    protected $casts=['email_verified_at'=>'datetime','is_admin'=>'boolean'];

    public function dpoProfile(){return $this->hasOne(DpoProfile::class);}
    public function dpoEnrollments(){return $this->hasMany(DpoEnrollment::class);}
    public function dpoGroups(){return $this->belongsToMany(DpoGroup::class,'dpo_enrollments','user_id','group_id')->withPivot(['role','status','enrolled_at','completed_at'])->withTimestamps();}
    public function dpoScheduleEntries(){return $this->hasMany(DpoScheduleEntry::class,'teacher_user_id');}
}
