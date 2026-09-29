<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoIssuedDocument extends Model{
 protected $fillable=['attestation_id','enrollment_id','user_id','program_id','group_id','document_type','series','number','issued_at','hours','qualification','verification_code','status','revoked_at','note'];
 protected $casts=['issued_at'=>'date','revoked_at'=>'datetime'];
 public function attestation(){return $this->belongsTo(DpoAttestation::class);}
 public function enrollment(){return $this->belongsTo(DpoEnrollment::class);}
 public function user(){return $this->belongsTo(User::class);}
 public function program(){return $this->belongsTo(DpoProgram::class);}
 public function group(){return $this->belongsTo(DpoGroup::class);}
}
