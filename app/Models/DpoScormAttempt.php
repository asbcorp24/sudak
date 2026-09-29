<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoScormAttempt extends Model{
 protected $fillable=['package_id','group_id','user_id','attempt_no','lesson_status','completion_status','success_status','score_raw','score_scaled','location','suspend_data','session_time','total_time','started_at','completed_at','last_accessed_at'];
 protected $casts=['score_raw'=>'decimal:3','score_scaled'=>'decimal:5','started_at'=>'datetime','completed_at'=>'datetime','last_accessed_at'=>'datetime'];
 public function package(){return $this->belongsTo(DpoScormPackage::class,'package_id');}
 public function group(){return $this->belongsTo(DpoGroup::class,'group_id');}
 public function user(){return $this->belongsTo(User::class);}
 public function values(){return $this->hasMany(DpoScormValue::class,'attempt_id');}
}