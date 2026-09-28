<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ScheduleGroup extends Model
{
    protected $fillable = ['name','course','specialty','is_active'];
    protected $casts = ['is_active'=>'boolean'];

    public function entries()
    {
        return $this->hasMany(ScheduleEntry::class, 'group_id');
    }
}
