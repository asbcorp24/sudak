<?php
namespace App\Models;
use App\Models\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Model;
class Competition extends Model{
 use HasMedia;
 protected $fillable=['title','organizer','starts_on','ends_on','location','description','url','is_published'];
 protected $casts=['starts_on'=>'date','ends_on'=>'date','is_published'=>'boolean'];
 public function achievements(){return $this->hasMany(Achievement::class);}
}
