<?php

namespace App\Http\Controllers;

use App\Models\Setting;

class ContactController extends Controller
{
    public function index()
    {
        return view('contacts.index', [
            'settings' => Setting::pluck('value','key')->all(),
        ]);
    }
}
