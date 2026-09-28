<?php
namespace App\Http\Controllers;
use App\Models\NewsPost; use App\Models\Specialty; use App\Models\Setting;
class HomeController extends Controller{
 public function __invoke(){
  return view('home',['specialties'=>Specialty::published()->orderBy('sort')->get(),'news'=>NewsPost::with('media')->published()->latest('published_at')->take(6)->get(),'students'=>Setting::valueOf('students','519'),'teachers'=>Setting::valueOf('teachers','34')]);
 }
}