<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Panorama extends Model
{
    protected $fillable=[
        'title','slug','description','image_path','image_disk','image_width','image_height',
        'image_size','location','initial_yaw','initial_pitch','sort','is_published','is_home'
    ];

    protected $casts=[
        'is_published'=>'boolean','is_home'=>'boolean',
        'image_width'=>'integer','image_height'=>'integer','image_size'=>'integer',
        'initial_yaw'=>'integer','initial_pitch'=>'integer','sort'=>'integer',
    ];

    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    public function hotspots(): HasMany
    {
        return $this->hasMany(PanoramaHotspot::class)->orderBy('sort')->orderBy('id');
    }

    public function getImageUrlAttribute(): string
    {
        return Storage::disk($this->image_disk ?: 'public')->url($this->image_path);
    }
}
