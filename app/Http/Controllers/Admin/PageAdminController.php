<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class PageAdminController extends Controller
{
    public function index(){return view('admin.pages.index',['pages'=>Page::with('parent')->orderBy('sort')->orderBy('title')->paginate(30)]);}

    public function create()
    {
        return view('admin.pages.form', $this->formData(new Page));
    }

    public function store(Request $request)
    {
        [$data,$cover,$content] = $this->data($request);
        $data['slug']=$data['slug']?:Str::slug($data['title']);
        $page=Page::create($data);
        $page->syncMediaCollection('cover',$cover?[$cover]:[]);
        $page->syncMediaCollection('content',$content);
        return redirect()->route('admin.pages.index')->with('ok','Страница создана');
    }

    public function edit(Page $page)
    {
        $page->load('media');
        return view('admin.pages.form',$this->formData($page));
    }

    public function update(Request $request,Page $page)
    {
        [$data,$cover,$content]=$this->data($request,$page->id);
        $data['slug']=$data['slug']?:Str::slug($data['title']);
        $page->update($data);
        $page->syncMediaCollection('cover',$cover?[$cover]:[]);
        $page->syncMediaCollection('content',$content);
        return redirect()->route('admin.pages.index')->with('ok','Страница обновлена');
    }

    public function destroy(Page $page)
    {
        $page->syncMediaCollection('cover',[]);
        $page->syncMediaCollection('content',[]);
        $page->delete();
        return back()->with('ok','Страница удалена');
    }

    private function formData(Page $page): array
    {
        return [
            'page'=>$page,
            'parents'=>Page::when($page->exists,fn($q)=>$q->where('id','!=',$page->id))->orderBy('title')->get(),
            'media'=>MediaAsset::latest()->get(),
            'selectedCover'=>$page->exists?optional($page->getMedia('cover')->first())->id:null,
            'selectedContent'=>$page->exists?$page->getMedia('content')->pluck('id')->all():[],
        ];
    }

    private function data(Request $r,$id=null): array
    {
        $d=$r->validate([
            'parent_id'=>'nullable|exists:pages,id',
            'title'=>'required|max:255',
            'menu_title'=>'nullable|max:255',
            'slug'=>'nullable|max:191|unique:pages,slug,'.($id??'NULL'),
            'excerpt'=>'nullable',
            'content'=>'nullable',
            'page_type'=>'required|in:section,subsection,page',
            'icon'=>'nullable|max:80',
            'meta_title'=>'nullable|max:255',
            'meta_description'=>'nullable|max:500',
            'sort'=>'nullable|integer',
            'show_in_menu'=>'nullable|boolean',
            'is_published'=>'nullable|boolean',
            'main_media_id'=>'nullable|integer|exists:media_assets,id',
            'content_media_ids'=>'nullable|array',
            'content_media_ids.*'=>'integer|distinct|exists:media_assets,id',
        ]);

        $cover=isset($d['main_media_id'])&&$d['main_media_id']!==''?(int)$d['main_media_id']:null;
        if($cover&&!MediaAsset::whereKey($cover)->where('type','image')->exists()){
            throw ValidationException::withMessages(['main_media_id'=>'Главным медиа может быть только изображение.']);
        }
        $content=array_map('intval',$d['content_media_ids']??[]);
        unset($d['main_media_id'],$d['content_media_ids']);
        $d['show_in_menu']=$r->boolean('show_in_menu');
        $d['is_published']=$r->boolean('is_published');
        $d['sort']=(int)$r->input('sort',0);

        return [$d,$cover,$content];
    }
}
