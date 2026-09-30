<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MenuItem;
use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MenuAdminController extends Controller
{
    public function index()
    {
        return view('admin.menu.index',[
            'items'=>MenuItem::with(['page','parent'])->orderByRaw('parent_id is not null')->orderBy('parent_id')->orderBy('sort')->orderBy('id')->get(),
            'parents'=>MenuItem::with('parent')->orderByRaw('parent_id is not null')->orderBy('parent_id')->orderBy('sort')->get(),
            'pages'=>Page::published()->orderBy('title')->get(),
        ]);
    }

    public function store(Request $request)
    {
        MenuItem::create($this->data($request));
        return back()->with('ok','Пункт меню добавлен');
    }

    public function update(Request $request, MenuItem $menuItem)
    {
        $data=$this->data($request,$menuItem);
        if (($data['parent_id'] ?? null)===$menuItem->id || $this->createsCycle($menuItem, $data['parent_id'] ?? null)) {
            return back()->withErrors(['parent_id'=>'Нельзя поместить пункт внутрь самого себя или своего дочернего пункта.']);
        }
        $menuItem->update($data);
        return back()->with('ok','Пункт меню сохранён');
    }

    public function destroy(MenuItem $menuItem)
    {
        MenuItem::where('parent_id',$menuItem->id)->update(['parent_id'=>$menuItem->parent_id]);
        $menuItem->delete();
        return back()->with('ok','Пункт меню удалён');
    }

    public function move(MenuItem $menuItem, string $direction)
    {
        abort_unless(in_array($direction,['up','down'],true),404);
        $q=MenuItem::where('parent_id',$menuItem->parent_id);
        $other=$direction==='up'
            ? $q->where('sort','<',$menuItem->sort)->orderByDesc('sort')->first()
            : $q->where('sort','>',$menuItem->sort)->orderBy('sort')->first();
        if ($other) {
            $sort=$menuItem->sort;
            $menuItem->update(['sort'=>$other->sort]);
            $other->update(['sort'=>$sort]);
        }
        return back();
    }

    private function createsCycle(MenuItem $item, ?int $parentId): bool
    {
        while ($parentId) {
            if ($parentId===$item->id) return true;
            $parentId=MenuItem::whereKey($parentId)->value('parent_id');
        }
        return false;
    }

    private function data(Request $r, ?MenuItem $item=null): array
    {
        $d=$r->validate([
            'title'=>'required|string|max:255',
            'parent_id'=>['nullable','integer',Rule::exists('menu_items','id')],
            'link_type'=>['required',Rule::in(['route','page','url','none'])],
            'page_id'=>'nullable|required_if:link_type,page|integer|exists:pages,id',
            'route_name'=>'nullable|required_if:link_type,route|string|max:191',
            'url'=>'nullable|required_if:link_type,url|string|max:1000',
            'sort'=>'nullable|integer|min:0|max:999999',
        ]);
        $d['parent_id']=$d['parent_id'] ?? null;
        $d['page_id']=$d['link_type']==='page' ? ($d['page_id'] ?? null) : null;
        $d['route_name']=$d['link_type']==='route' ? trim((string)($d['route_name'] ?? '')) : null;
        $d['url']=$d['link_type']==='url' ? trim((string)($d['url'] ?? '')) : null;
        $d['sort']=(int)($d['sort'] ?? 0);
        $d['is_active']=$r->boolean('is_active');
        $d['show_desktop']=$r->boolean('show_desktop');
        $d['show_mobile']=$r->boolean('show_mobile');
        $d['open_in_new_tab']=$r->boolean('open_in_new_tab');
        return $d;
    }
}