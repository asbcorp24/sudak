<?php

namespace App\Models;

use App\Models\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasMedia;

    protected $fillable = [
        'employee_type','full_name','position','disciplines','education',
        'qualification','email','phone','achievements','bio','sort','is_published',
    ];

    protected $casts = ['is_published'=>'boolean'];

    public function scheduleEntries()
    {
        return $this->hasMany(ScheduleEntry::class, 'employee_id');
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }
}
