<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Competition;

class CompetitionController extends Controller
{
    public function index()
    {
        return view('competitions.index',[
            'competitions'=>Competition::with('media')->where('is_published',true)->orderByDesc('starts_on')->orderByDesc('id')->get(),
            'achievements'=>Achievement::with(['competition','media'])->where('is_public',true)->orderByDesc('awarded_at')->orderByDesc('id')->get(),
        ]);
    }
}
