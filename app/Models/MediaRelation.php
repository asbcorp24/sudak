<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MediaRelation extends Model
{
    protected $fillable = ['media_asset_id','mediable_type','mediable_id','collection','sort'];

    public function asset()
    {
        return $this->belongsTo(MediaAsset::class, 'media_asset_id');
    }

    public function mediable()
    {
        return $this->morphTo();
    }
}
