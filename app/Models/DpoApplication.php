<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoApplication extends Model{
 protected $fillable=['program_id','group_id','user_id','public_token','name','email','phone','birth_date','education','organization','comment','status','admin_note','processed_by','processed_at','enrolled_at'];
 protected $casts=['birth_date'=>'date','processed_at'=>'datetime','enrolled_at'=>'datetime'];
 public function program(){return $this->belongsTo(DpoProgram::class);}
 public function group(){return $this->belongsTo(DpoGroup::class);}
 public function user(){return $this->belongsTo(User::class);}
 public function processor(){return $this->belongsTo(User::class,'processed_by');}
}
