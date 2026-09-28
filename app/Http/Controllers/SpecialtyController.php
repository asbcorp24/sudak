<?php
namespace App\Http\Controllers;
use App\Models\Specialty;
class SpecialtyController extends Controller{
 public function index(){return view('specialties.index',['specialties'=>Specialty::published()->orderBy('sort')->get()]);}
 public function show($slug){$specialty=Specialty::published()->where('slug',$slug)->firstOrFail(); return view('specialties.show',compact('specialty'));}
}