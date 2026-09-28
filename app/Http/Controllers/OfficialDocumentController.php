<?php

namespace App\Http\Controllers;

use App\Models\OfficialDocumentCategory;

class OfficialDocumentController extends Controller
{
    public function index()
    {
        $categories=OfficialDocumentCategory::query()
            ->where('is_published',true)
            ->whereHas('publishedDocuments')
            ->with(['publishedDocuments.media'])
            ->orderBy('sort')
            ->orderBy('title')
            ->get();

        return view('official-documents.index',compact('categories'));
    }
}
