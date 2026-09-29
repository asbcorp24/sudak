<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoLessonResource extends Model{
 protected $fillable=['lesson_id','type','title','media_asset_id','url','description','sort','is_required'];
 protected $casts=['sort'=>'integer','is_required'=>'boolean'];
 public function lesson(){return $this->belongsTo(DpoLesson::class,'lesson_id');}
 public function media(){return $this->belongsTo(MediaAsset::class,'media_asset_id');}
}