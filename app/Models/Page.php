<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Page extends Model{
 protected $fillable=['parent_id','title','menu_title','slug','excerpt','content','page_type','icon','cover','meta_title','meta_description','show_in_menu','is_published','sort'];
 protected $casts=['show_in_menu'=>'boolean','is_published'=>'boolean'];
 public function parent(){return $this->belongsTo(self::class,'parent_id');}
 public function children(){return $this->hasMany(self::class,'parent_id')->orderBy('sort');}
 public function childrenRecursive(){return $this->children()->where('is_published',1)->with('childrenRecursive');}
 public function scopePublished($q){return $q->where('is_published',1);}
}