<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoSubmission extends Model{
 protected $fillable=['assignment_id','group_id','user_id','answer_text','media_asset_id','status','score','feedback','reviewed_by','submitted_at','reviewed_at'];
 protected $casts=['score'=>'decimal:2','submitted_at'=>'datetime','reviewed_at'=>'datetime'];
 public function assignment(){return $this->belongsTo(DpoAssignment::class,'assignment_id');}
 public function group(){return $this->belongsTo(DpoGroup::class,'group_id');}
 public function user(){return $this->belongsTo(User::class);}
 public function media(){return $this->belongsTo(MediaAsset::class,'media_asset_id');}
 public function reviewer(){return $this->belongsTo(User::class,'reviewed_by');}
}