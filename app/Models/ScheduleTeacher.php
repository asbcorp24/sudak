<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleTeacher extends Model
{
    protected $fillable = ['full_name','position','is_active'];
    protected $casts = ['is_active'=>'boolean'];

    public function entries()
    {
        return $this->hasMany(ScheduleEntry::class, 'teacher_id');
    }
}
