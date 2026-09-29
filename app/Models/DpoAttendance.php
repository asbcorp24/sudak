<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class DpoAttendance extends Model
{
    protected $table='dpo_attendance';
    protected $fillable=['schedule_entry_id','user_id','status','note','marked_by','marked_at'];
    protected $casts=['marked_at'=>'datetime'];

    public function scheduleEntry(){return $this->belongsTo(DpoScheduleEntry::class,'schedule_entry_id');}
    public function user(){return $this->belongsTo(User::class);}
    public function marker(){return $this->belongsTo(User::class,'marked_by');}
}
