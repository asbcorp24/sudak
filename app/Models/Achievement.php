<?php
namespace App\Models;
use App\Models\Concerns\HasMedia;
use Illuminate\Database\Eloquent\Model;
class Achievement extends Model{
 use HasMedia;
 protected $fillable=['competition_id','student_name','title','result','level','awarded_at','description','is_public'];
 protected $casts=['awarded_at'=>'date','is_public'=>'boolean'];
 public function competition(){return $this->belongsTo(Competition::class);}
}
