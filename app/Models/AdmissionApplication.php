<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class AdmissionApplication extends Model
{
    protected $fillable = ['name','birth_date','phone','email','specialty_id','message','status'];
    protected $casts = ['birth_date'=>'date'];

    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }
}
