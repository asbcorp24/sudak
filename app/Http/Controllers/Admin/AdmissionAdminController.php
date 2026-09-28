<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\AdmissionApplication;
use Illuminate\Http\Request;

class AdmissionAdminController extends Controller
{
    public function index(Request $request)
    {
        $query=AdmissionApplication::with('specialty')->latest();

        if ($status=$request->string('status')->toString()) {
            if (in_array($status,['new','processing','accepted','rejected'],true)) {
                $query->where('status',$status);
            }
        }

        if ($search=trim($request->string('q')->toString())) {
            $query->where(function($q) use ($search) {
                $q->where('name','like','%'.$search.'%')
                  ->orWhere('phone','like','%'.$search.'%')
                  ->orWhere('email','like','%'.$search.'%');
            });
        }

        return view('admin.applications.index',[
            'applications'=>$query->paginate(50)->withQueryString(),
        ]);
    }

    public function update(Request $request, AdmissionApplication $application)
    {
        $data=$request->validate([
            'status'=>['required','in:new,processing,accepted,rejected'],
        ]);

        $application->update($data);
        return back()->with('ok','Статус заявки изменён');
    }

    public function destroy(AdmissionApplication $application)
    {
        $application->delete();
        return back()->with('ok','Заявка удалена');
    }
}
