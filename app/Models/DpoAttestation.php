<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoAttestation extends Model{
 protected $fillable=['enrollment_id','status','progress_percent','attendance_percent','homework_percent','scorm_percent','final_score','result_text','notes','assessed_by','assessed_at'];
 protected $casts=['assessed_at'=>'datetime','final_score'=>'decimal:2'];
 public function enrollment(){return $this->belongsTo(DpoEnrollment::class);}
 public function assessor(){return $this->belongsTo(User::class,'assessed_by');}
 public function document(){return $this->hasOne(DpoIssuedDocument::class,'attestation_id');}
}
