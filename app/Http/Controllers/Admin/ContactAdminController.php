<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;

class ContactAdminController extends Controller
{
    public function edit()
    {
        return view('admin.contacts', [
            'settings' => Setting::pluck('value','key')->all(),
        ]);
    }

    public function update(Request $request)
    {
        $data = $request->validate([
            'contact_title' => ['nullable','string','max:255'],
            'contact_intro' => ['nullable','string','max:2000'],
            'contact_org_name' => ['nullable','string','max:500'],
            'contact_address' => ['nullable','string','max:500'],
            'contact_phone' => ['nullable','string','max:120'],
            'contact_phone_extra' => ['nullable','string','max:120'],
            'contact_email' => ['nullable','email','max:255'],
            'contact_work_hours' => ['nullable','string','max:500'],
            'contact_vk' => ['nullable','url','max:1000'],
            'contact_telegram' => ['nullable','url','max:1000'],
            'contact_lat' => ['nullable','numeric','between:-90,90'],
            'contact_lng' => ['nullable','numeric','between:-180,180'],
            'contact_map_zoom' => ['nullable','integer','min:5','max:19'],
            'contact_requisites' => ['nullable','string','max:5000'],
        ]);

        foreach ($data as $key => $value) {
            Setting::updateOrCreate(['key'=>$key], ['value'=>$value, 'group'=>'contacts']);
        }

        return back()->with('ok','Контактные данные сохранены');
    }
}
