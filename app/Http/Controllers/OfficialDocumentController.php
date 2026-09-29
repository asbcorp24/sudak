<?php

namespace App\Http\Controllers;

use App\Models\OfficialDocument;
use App\Models\OfficialDocumentCategory;
use Illuminate\Http\Request;

class OfficialDocumentController extends Controller
{
    public function index(Request $request)
    {
        $data=$request->validate([
            'q'=>['nullable','string','max:200'],
            'category'=>['nullable','string','max:191'],
            'date_from'=>['nullable','date'],
            'date_to'=>['nullable','date','after_or_equal:date_from'],
        ]);

        $query=OfficialDocument::query()
            ->published()
            ->whereHas('category',fn($q)=>$q->where('is_published',true))
            ->with(['category','media','publishedVersions.media']);

        if($category=$data['category']??null){
            $query->whereHas('category',fn($q)=>$q->where('slug',$category));
        }

        if($search=trim($data['q']??'')){
            $query->where(function($q) use($search){
                $like='%'.$search.'%';
                $q->where('title','like',$like)
                    ->orWhere('description','like',$like)
                    ->orWhere('document_number','like',$like)
                    ->orWhere('version','like',$like)
                    ->orWhereHas('category',fn($category)=>$category->where('title','like',$like))
                    ->orWhereHas('versions',fn($version)=>$version
                        ->where('version','like',$like)
                        ->orWhere('change_note','like',$like));
            });
        }

        if(!empty($data['date_from'])) $query->whereDate('document_date','>=',$data['date_from']);
        if(!empty($data['date_to'])) $query->whereDate('document_date','<=',$data['date_to']);

        $categories=OfficialDocumentCategory::published()
            ->withCount(['publishedDocuments'])
            ->orderBy('sort')->orderBy('title')->get();

        $documents=$query->orderByDesc('document_date')->orderBy('sort')->orderBy('title')
            ->paginate(20)->withQueryString();

        return view('official-documents.index',compact('categories','documents'));
    }
}
