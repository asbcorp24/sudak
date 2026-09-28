<?php

namespace App\Models;

use App\Models\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Model;

class CooperationItem extends Model
{
    use HasMedia;

    protected $fillable = ['type','title','description','url','sort_order','is_published'];
    protected $casts = ['is_published'=>'boolean'];
}
