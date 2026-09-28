<?php
namespace App\Models;
use App\Models\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Model;
class Specialty extends Model{
 use HasMedia;
 protected $fillable=['code','title','slug','duration','qualification','admission_basis','description','details','scene_key','accent','scene_config','is_published','sort'];
 protected $casts=['scene_config'=>'array','is_published'=>'boolean'];
 public function scopePublished($q){return $q->where('is_published',1);}
}