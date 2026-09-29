<?php

namespace App\Http\Controllers;

use App\Models\Panorama;

class PanoramaController extends Controller
{
    public function index()
    {
        return view('panoramas.index',[
            'panoramas'=>Panorama::where('is_published',true)->orderBy('sort')->orderByDesc('id')->get(),
        ]);
    }
}
