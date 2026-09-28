<?php

namespace App\Http\Controllers;

use App\Models\AdmissionApplication;
use App\Models\Specialty;
use Illuminate\Http\Request;

class AdmissionController extends Controller
{
    public function create()
    {
        return view('admission.apply', [
            'specialties'=>Specialty::published()->orderBy('sort')->get(),
        ]);
    }

    public function store(Request $request)
    {
        $data=$request->validate([
            'name'=>['required','string','max:180'],
            'birth_date'=>['nullable','date'],
            'phone'=>['required','string','max:80'],
            'email'=>['nullable','email','max:255'],
            'specialty_id'=>['nullable','exists:specialties,id'],
            'message'=>['nullable','string','max:5000'],
        ]);

        AdmissionApplication::create($data);

        return back()->with('ok','Заявка отправлена. Приёмная комиссия свяжется с вами.');
    }
}
