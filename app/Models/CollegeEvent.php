<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CollegeEvent extends Model
{
    protected $fillable=[
        'title','slug','type','starts_at','ends_at','all_day','location','excerpt',
        'description','external_url','is_featured','is_published','registration_enabled','capacity','registration_deadline','registration_note','sort',
    ];

    protected $casts=[
        'starts_at'=>'datetime',
        'ends_at'=>'datetime',
        'all_day'=>'boolean',
        'is_featured'=>'boolean',
        'is_published'=>'boolean',
        'registration_enabled'=>'boolean',
        'capacity'=>'integer',
        'registration_deadline'=>'datetime',
    ];

    public function registrations(){return $this->hasMany(EventRegistration::class);}
    public function registeredParticipants(){return $this->registrations()->where('status','registered');}

    public function scopePublished($q){return $q->where('is_published',true);}

    public function registrationOpen(): bool
    {
        if(!$this->registration_enabled || !$this->is_published || $this->starts_at->isPast()) return false;
        if($this->registration_deadline && $this->registration_deadline->isPast()) return false;
        if($this->capacity && $this->registeredParticipants()->count() >= $this->capacity) return false;
        return true;
    }

    public static function types(): array
    {
        return [
            'olympiad'=>'Олимпиада',
            'open_day'=>'День открытых дверей',
            'competition'=>'Конкурс',
            'exam'=>'Экзамен',
            'event'=>'Мероприятие',
            'deadline'=>'Дедлайн',
        ];
    }

    public function getTypeLabelAttribute(): string
    {
        return self::types()[$this->type] ?? 'Событие';
    }
}
