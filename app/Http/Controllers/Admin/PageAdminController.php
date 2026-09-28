<?php
namespace App\Http\Controllers\Admin;
use App\Http\Controllers\Controller; use App\Models\Page; use Illuminate\Http\Request; use Illuminate\Support\Str;
class PageAdminController extends Controller{
 public function index(){return view('admin.pages.index',['pages'=>Page::with('parent')->orderBy('sort')->orderBy('title')->paginate(30)]);}
 public function create(){return view('admin.pages.form',['page'=>new Page,'parents'=>Page::orderBy('title')->get()]);}
 public function store(Request $r){$d=$this->data($r);$d['slug']=$d['slug']?:Str::slug($d['title']);Page::create($d);return redirect()->route('admin.pages.index')->with('ok','Страница создана');}
 public function edit(Page $page){return view('admin.pages.form',['page'=>$page,'parents'=>Page::where('id','!=',$page->id)->orderBy('title')->get()]);}
 public function update(Request $r,Page $page){$d=$this->data($r,$page->id);$d['slug']=$d['slug']?:Str::slug($d['title']);$page->update($d);return redirect()->route('admin.pages.index')->with('ok','Страница обновлена');}
 public function destroy(Page $page){$page->delete();return back()->with('ok','Страница удалена');}
 private function data(Request $r,$id=null){return $r->validate(['parent_id'=>'nullable|exists:pages,id','title'=>'required|max:255','menu_title'=>'nullable|max:255','slug'=>'nullable|max:191|unique:pages,slug,'.($id??'NULL'),'excerpt'=>'nullable','content'=>'nullable','page_type'=>'required|in:section,subsection,page','icon'=>'nullable|max:80','cover'=>'nullable|max:255','meta_title'=>'nullable|max:255','meta_description'=>'nullable|max:500','sort'=>'nullable|integer','show_in_menu'=>'nullable|boolean','is_published'=>'nullable|boolean'])+['show_in_menu'=>$r->boolean('show_in_menu'),'is_published'=>$r->boolean('is_published'),'sort'=>(int)$r->input('sort',0)];}
}