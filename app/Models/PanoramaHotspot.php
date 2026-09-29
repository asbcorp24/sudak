<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PanoramaHotspot extends Model
{
    protected $fillable=[
        'panorama_id','target_panorama_id','type','title','description','pitch','yaw','sort'
    ];

    protected $casts=[
        'pitch'=>'float',
        'yaw'=>'float',
        'sort'=>'integer',
    ];

    public function panorama(): BelongsTo
    {
        return $this->belongsTo(Panorama::class);
    }

    public function targetPanorama(): BelongsTo
    {
        return $this->belongsTo(Panorama::class,'target_panorama_id');
    }
}
