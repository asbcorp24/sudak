<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CollegeEvent extends Model
{
    protected $fillable=[
        'title','slug','type','starts_at','ends_at','all_day','location','excerpt',
        'description','external_url','is_featured','is_published','sort',
    ];

    protected $casts=[
        'starts_at'=>'datetime',
        'ends_at'=>'datetime',
        'all_day'=>'boolean',
        'is_featured'=>'boolean',
        'is_published'=>'boolean',
    ];

    public function scopePublished($q){return $q->where('is_published',true);}

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
