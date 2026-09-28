<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Storage;

class MediaAsset extends Model
{
    protected $fillable = [
        'name','original_name','disk','path','mime_type','extension','type',
        'size','width','height','title','alt','meta',
    ];

    protected $casts = [
        'meta' => 'array',
        'size' => 'integer',
        'width' => 'integer',
        'height' => 'integer',
    ];

    public function links()
    {
        return $this->hasMany(MediaRelation::class);
    }

    public function getUrlAttribute(): string
    {
        if ($this->disk === 'public') {
            return '/storage/' . ltrim($this->path, '/');
        }

        return Storage::disk($this->disk)->url($this->path);
    }

    public function getHumanSizeAttribute(): string
    {
        $bytes = max(0, (int) $this->size);
        $units = ['Б','КБ','МБ','ГБ'];
        $i = 0;
        while ($bytes >= 1024 && $i < count($units) - 1) {
            $bytes /= 1024;
            $i++;
        }
        return ($i === 0 ? (string) round($bytes) : number_format($bytes, 1, ',', ' ')) . ' ' . $units[$i];
    }

    public function isImage(): bool
    {
        return $this->type === 'image';
    }
}
