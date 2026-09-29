<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfficialDocumentVersion extends Model
{
    protected $fillable=[
        'official_document_id','media_asset_id','version','effective_date',
        'change_note','is_current','is_published',
    ];

    protected $casts=[
        'effective_date'=>'date',
        'is_current'=>'boolean',
        'is_published'=>'boolean',
    ];

    public function document(){return $this->belongsTo(OfficialDocument::class,'official_document_id');}
    public function media(){return $this->belongsTo(MediaAsset::class,'media_asset_id');}
}
