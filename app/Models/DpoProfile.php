<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class DpoProfile extends Model{
 protected $fillable=['user_id','role','employee_id','phone','organization','position','is_active'];
 protected $casts=['is_active'=>'boolean'];
 public function user(){return $this->belongsTo(User::class);}
 public function employee(){return $this->belongsTo(Employee::class);}
}