<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Question extends Model{
 protected $fillable=['name','email','phone','subject','question','status','answer','answered_at'];
 protected $casts=['answered_at'=>'datetime'];
}
