<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory,Notifiable;

    protected $fillable=['name','email','password','is_admin','admin_scope','user_type','schedule_group_id','student_number','student_approval_status','student_approved_at','student_approved_by','notify_schedule','notify_news','notify_events'];
    protected $hidden=['password','remember_token'];
    protected $casts=['email_verified_at'=>'datetime','student_approved_at'=>'datetime','is_admin'=>'boolean','notify_schedule'=>'boolean','notify_news'=>'boolean','notify_events'=>'boolean'];

    public function scheduleGroup(){return $this->belongsTo(ScheduleGroup::class,'schedule_group_id');}
    public function studentApprovedBy(){return $this->belongsTo(User::class,'student_approved_by');}
    public function eventRegistrations(){return $this->hasMany(EventRegistration::class);}
    public function userNotifications(){return $this->hasMany(UserNotification::class);}
    public function pushSubscriptions(){return $this->hasMany(PushSubscription::class);}

    public function dpoProfile(){return $this->hasOne(DpoProfile::class);}
    public function dpoEnrollments(){return $this->hasMany(DpoEnrollment::class);}
    public function dpoGroups(){return $this->belongsToMany(DpoGroup::class,'dpo_enrollments','user_id','group_id')->withPivot(['role','status','enrolled_at','completed_at'])->withTimestamps();}
    public function dpoScheduleEntries(){return $this->hasMany(DpoScheduleEntry::class,'teacher_user_id');}

    public function adminScope(): string
    {
        return $this->is_admin ? ($this->admin_scope ?: 'full') : 'none';
    }

    public function canAdmin(string $area): bool
    {
        if (!$this->is_admin) return false;

        $scope=$this->adminScope();
        if ($scope==='full') return true;

        return $scope===$area;
    }

    public function adminHomeRouteName(): string
    {
        return match($this->adminScope()){
            'dpo'=>'admin.dpo.index',
            'schedule'=>'admin.schedule.index',
            'site'=>'admin.dashboard',
            default=>'admin.dashboard',
        };
    }
}
