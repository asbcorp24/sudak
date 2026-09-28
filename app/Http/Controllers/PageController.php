<?php
namespace App\Http\Controllers;
use App\Models\Page;
class PageController extends Controller{
 public function show($slug){$page=Page::published()->where('slug',$slug)->with(['parent','children'=>fn($q)=>$q->published()])->firstOrFail(); return view('pages.show',compact('page'));}
}