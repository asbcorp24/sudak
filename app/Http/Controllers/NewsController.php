<?php
namespace App\Http\Controllers;
use App\Models\NewsPost;
class NewsController extends Controller{
 public function index(){return view('news.index',['posts'=>NewsPost::with('media')->published()->latest('published_at')->paginate(9)]);}
 public function show($slug){$post=NewsPost::with('media')->published()->where('slug',$slug)->firstOrFail(); return view('news.show',compact('post'));}
}