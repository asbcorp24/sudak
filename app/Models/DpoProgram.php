<?php
namespace App\Models;
use App\Models\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Model;
class DpoProgram extends Model{
 use HasMedia;
 protected $fillable=['code','title','slug','hours','description','learning_outcomes','sort','is_published'];
 protected $casts=['hours'=>'integer','sort'=>'integer','is_published'=>'boolean'];
 public function groups(){return $this->hasMany(DpoGroup::class,'program_id');}
 public function modules(){return $this->hasMany(DpoModule::class,'program_id')->orderBy('sort')->orderBy('id');}
 public function announcements(){return $this->hasMany(DpoAnnouncement::class,'program_id');}
 public function scopePublished($q){return $q->where('is_published',true);}
}