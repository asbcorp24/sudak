<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleEntry extends Model
{
    protected $fillable = [
        'lesson_date','group_id','teacher_id','lesson_number','starts_at','ends_at',
        'subject','room','lesson_type','subgroup','notes'
    ];

    protected $casts = [
        'lesson_date'=>'date',
        'lesson_number'=>'integer',
    ];

    public function group()
    {
        return $this->belongsTo(ScheduleGroup::class, 'group_id');
    }

    public function teacher()
    {
        return $this->belongsTo(ScheduleTeacher::class, 'teacher_id');
    }
}
