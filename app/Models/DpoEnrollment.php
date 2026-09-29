<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoEnrollment extends Model{
 protected $fillable=['group_id','user_id','role','status','enrolled_at','completed_at'];
 protected $casts=['enrolled_at'=>'datetime','completed_at'=>'datetime'];
 public function group(){return $this->belongsTo(DpoGroup::class,'group_id');}
 public function user(){return $this->belongsTo(User::class);}
}