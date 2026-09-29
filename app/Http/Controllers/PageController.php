<?php
namespace App\Http\Controllers;

use App\Models\Page;

class PageController extends Controller
{
    public function show($slug)
    {
        $page=Page::published()
            ->where('slug',$slug)
            ->with(['media','parent'])
            ->firstOrFail();

        $children=$page->children()
            ->published()
            ->orderBy('sort')
            ->orderBy('title')
            ->paginate(10)
            ->withQueryString();

        return view('pages.show',compact('page','children'));
    }
}
