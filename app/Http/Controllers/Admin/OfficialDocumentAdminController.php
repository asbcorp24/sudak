<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use App\Models\OfficialDocument;
use App\Models\OfficialDocumentCategory;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class OfficialDocumentAdminController extends Controller
{
    public function index()
    {
        return view('admin.official-documents.index',[
            'categories'=>OfficialDocumentCategory::with(['documents.media'])->orderBy('sort')->orderBy('title')->get(),
            'documentMedia'=>MediaAsset::where('type','document')->latest()->get(),
        ]);
    }

    public function storeCategory(Request $request)
    {
        $data=$this->categoryData($request);
        $data['slug']=$data['slug']?:Str::slug($data['title']);
        OfficialDocumentCategory::create($data);
        return back()->with('ok','Категория документов добавлена');
    }

    public function updateCategory(Request $request,OfficialDocumentCategory $category)
    {
        $data=$this->categoryData($request,$category->id);
        $data['slug']=$data['slug']?:Str::slug($data['title']);
        $category->update($data);
        return back()->with('ok','Категория обновлена');
    }

    public function destroyCategory(OfficialDocumentCategory $category)
    {
        $category->delete();
        return back()->with('ok','Категория и её записи удалены');
    }

    public function storeDocument(Request $request)
    {
        OfficialDocument::create($this->documentData($request));
        return back()->with('ok','Документ добавлен');
    }

    public function updateDocument(Request $request,OfficialDocument $document)
    {
        $document->update($this->documentData($request));
        return back()->with('ok','Документ обновлён');
    }

    public function destroyDocument(OfficialDocument $document)
    {
        $document->delete();
        return back()->with('ok','Документ удалён из раздела. Файл остался в медиатеке.');
    }

    private function categoryData(Request $request,?int $id=null): array
    {
        $data=$request->validate([
            'title'=>['required','string','max:255'],
            'slug'=>['nullable','string','max:191','unique:official_document_categories,slug'.($id?','.$id:'')],
            'description'=>['nullable','string','max:5000'],
            'sort'=>['nullable','integer','min:0','max:99999'],
            'is_published'=>['nullable','boolean'],
        ]);

        $data['sort']=(int)($data['sort']??0);
        $data['is_published']=$request->boolean('is_published');
        return $data;
    }

    private function documentData(Request $request): array
    {
        $data=$request->validate([
            'category_id'=>['required','exists:official_document_categories,id'],
            'media_asset_id'=>['required','exists:media_assets,id'],
            'title'=>['required','string','max:500'],
            'description'=>['nullable','string','max:5000'],
            'document_date'=>['nullable','date'],
            'version'=>['nullable','string','max:80'],
            'document_number'=>['nullable','string','max:120'],
            'sort'=>['nullable','integer','min:0','max:99999'],
            'is_published'=>['nullable','boolean'],
        ]);

        if(!MediaAsset::whereKey($data['media_asset_id'])->where('type','document')->exists()){
            throw ValidationException::withMessages(['media_asset_id'=>'Для официального документа выберите файл из раздела «Документы» медиатеки.']);
        }

        $data['sort']=(int)($data['sort']??0);
        $data['is_published']=$request->boolean('is_published');
        return $data;
    }
}
