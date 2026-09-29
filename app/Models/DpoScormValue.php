<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoScormValue extends Model{
 protected $fillable=['attempt_id','key','value'];
 public function attempt(){return $this->belongsTo(DpoScormAttempt::class,'attempt_id');}
}