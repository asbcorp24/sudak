<?php
namespace App\Models;
use App\Models\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Model;
class DpoProgram extends Model{
 use HasMedia;
 protected $fillable=['code','title','slug','hours','qualification','document_type','description','learning_outcomes','sort','is_published','is_archived','applications_open','min_progress_percent','min_attendance_percent','min_homework_percent','min_scorm_percent'];
 protected $casts=['hours'=>'integer','sort'=>'integer','is_published'=>'boolean','is_archived'=>'boolean','applications_open'=>'boolean','min_progress_percent'=>'integer','min_attendance_percent'=>'integer','min_homework_percent'=>'integer','min_scorm_percent'=>'integer'];
 public function groups(){return $this->hasMany(DpoGroup::class,'program_id');}
 public function modules(){return $this->hasMany(DpoModule::class,'program_id')->orderBy('sort')->orderBy('id');}
 public function announcements(){return $this->hasMany(DpoAnnouncement::class,'program_id');}
 public function applications(){return $this->hasMany(DpoApplication::class,'program_id');}
 public function issuedDocuments(){return $this->hasMany(DpoIssuedDocument::class,'program_id');}
 public function scopePublished($q){return $q->where('is_published',true)->where('is_archived',false);}
}