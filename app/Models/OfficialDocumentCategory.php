<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OfficialDocumentCategory extends Model
{
    protected $fillable = ['title','slug','description','sort','is_published'];
    protected $casts = ['is_published'=>'boolean'];

    public function documents()
    {
        return $this->hasMany(OfficialDocument::class, 'category_id')->orderBy('sort')->orderByDesc('document_date');
    }

    public function publishedDocuments()
    {
        return $this->documents()->where('is_published', true);
    }
}
