<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EventRegistration extends Model
{
    protected $fillable=['college_event_id','user_id','status','registered_at','attended_at'];
    protected $casts=['registered_at'=>'datetime','attended_at'=>'datetime'];

    public function event(){return $this->belongsTo(CollegeEvent::class,'college_event_id');}
    public function user(){return $this->belongsTo(User::class);}
}
