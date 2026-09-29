<?php

namespace App\Models;

use App\Models\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Model;

class Specialty extends Model
{
    use HasMedia;

    protected $fillable = [
        'code','title','slug','duration','qualification','admission_basis','description','details',
        'learning_outcomes','disciplines','practice','professions','partners','student_projects',
        'scene_key','accent','scene_config','is_published','sort',
    ];

    protected $casts = [
        'learning_outcomes'=>'array',
        'disciplines'=>'array',
        'professions'=>'array',
        'partners'=>'array',
        'student_projects'=>'array',
        'scene_config'=>'array',
        'is_published'=>'boolean',
    ];

    public function teachers()
    {
        return $this->belongsToMany(Employee::class, 'employee_specialty')
            ->withTimestamps()
            ->orderBy('sort')
            ->orderBy('full_name');
    }

    public function scopePublished($q)
    {
        return $q->where('is_published',1);
    }
}
