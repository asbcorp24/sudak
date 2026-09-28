<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; use App\Models\NewsPost; use Illuminate\Http\Request; use Illuminate\Support\Str;
class NewsAdminController extends Controller{
 public function index(){return view('admin.news.index',['posts'=>NewsPost::latest('published_at')->paginate(30)]);}
 public function create(){return view('admin.news.form',['post'=>new NewsPost]);}
 public function store(Request $r){$d=$this->data($r);$d['slug']=$d['slug']?:Str::slug($d['title']);NewsPost::create($d);return redirect()->route('admin.news.index')->with('ok','Новость создана');}
 public function edit(NewsPost $news){return view('admin.news.form',['post'=>$news]);}
 public function update(Request $r,NewsPost $news){$d=$this->data($r,$news->id);$d['slug']=$d['slug']?:Str::slug($d['title']);$news->update($d);return redirect()->route('admin.news.index')->with('ok','Новость обновлена');}
 public function destroy(NewsPost $news){$news->delete();return back()->with('ok','Новость удалена');}
 private function data(Request $r,$id=null){return $r->validate(['title'=>'required|max:255','slug'=>'nullable|max:191|unique:news_posts,slug,'.($id??'NULL'),'excerpt'=>'nullable','content'=>'nullable','cover'=>'nullable|max:255','published_at'=>'nullable|date','is_published'=>'nullable|boolean'])+['is_published'=>$r->boolean('is_published')];}
}