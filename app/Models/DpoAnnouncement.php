<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoAnnouncement extends Model{
 protected $fillable=['group_id','program_id','title','body','published_at'];
 protected $casts=['published_at'=>'datetime'];
 public function group(){return $this->belongsTo(DpoGroup::class,'group_id');}
 public function program(){return $this->belongsTo(DpoProgram::class,'program_id');}
}