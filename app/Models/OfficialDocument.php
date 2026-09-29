<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfficialDocument extends Model
{
    protected $fillable = [
        'category_id','media_asset_id','title','description','document_date',
        'version','document_number','sort','is_published',
    ];

    protected $casts = [
        'document_date'=>'date',
        'is_published'=>'boolean',
    ];

    public function category()
    {
        return $this->belongsTo(OfficialDocumentCategory::class, 'category_id');
    }

    public function media()
    {
        return $this->belongsTo(MediaAsset::class, 'media_asset_id');
    }

    public function versions()
    {
        return $this->hasMany(OfficialDocumentVersion::class)->orderByDesc('is_current')->orderByDesc('effective_date')->orderByDesc('id');
    }

    public function publishedVersions()
    {
        return $this->versions()->where('is_published',true);
    }

    public function currentVersion()
    {
        return $this->hasOne(OfficialDocumentVersion::class)->where('is_current',true);
    }

    public function scopePublished($query)
    {
        return $query->where('is_published',true);
    }
}
