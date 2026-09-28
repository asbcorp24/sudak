<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    public function index(Request $request)
    {
        $type=$request->string('type')->toString();

        $employees=Employee::with('media')
            ->published()
            ->when(in_array($type,['leadership','teacher','staff'],true), fn($q)=>$q->where('employee_type',$type))
            ->orderBy('sort')
            ->orderBy('full_name')
            ->get();

        return view('employees.index',[
            'employees'=>$employees,
            'activeType'=>in_array($type,['leadership','teacher','staff'],true)?$type:null,
        ]);
    }
}
