<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MediaAsset;
use App\Models\OfficialDocument;
use App\Models\OfficialDocumentCategory;
use App\Models\OfficialDocumentVersion;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class OfficialDocumentAdminController extends Controller
{
    public function index(Request $request)
    {
        $query=OfficialDocument::with(['category','media','versions.media']);

        if($search=trim($request->string('q')->toString())){
            $query->where(function($q) use($search){
                $like='%'.$search.'%';
                $q->where('title','like',$like)
                    ->orWhere('description','like',$like)
                    ->orWhere('document_number','like',$like)
                    ->orWhere('version','like',$like)
                    ->orWhereHas('category',fn($category)=>$category->where('title','like',$like))
                    ->orWhereHas('versions',fn($version)=>$version->where('version','like',$like)->orWhere('change_note','like',$like));
            });
        }

        if($categoryId=$request->integer('category_id')){
            $query->where('category_id',$categoryId);
        }

        return view('admin.official-documents.index',[
            'categories'=>OfficialDocumentCategory::withCount('documents')->orderBy('sort')->orderBy('title')->get(),
            'documents'=>$query->orderByDesc('document_date')->orderBy('title')->paginate(20)->withQueryString(),
            'documentMedia'=>MediaAsset::where('type','document')->latest()->limit(500)->get(),
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
        if($category->documents()->exists()){
            throw ValidationException::withMessages(['category'=>'Сначала перенесите или удалите документы этой категории.']);
        }
        $category->delete();
        return back()->with('ok','Категория удалена');
    }

    public function storeDocument(Request $request)
    {
        $data=$this->documentData($request,true);

        DB::transaction(function() use($data,$request){
            $document=OfficialDocument::create($data);
            OfficialDocumentVersion::create([
                'official_document_id'=>$document->id,
                'media_asset_id'=>$data['media_asset_id'],
                'version'=>$data['version'] ?: '1.0',
                'effective_date'=>$data['document_date'],
                'change_note'=>$request->input('change_note') ?: 'Первая опубликованная редакция',
                'is_current'=>true,
                'is_published'=>$data['is_published'],
            ]);
        });

        return back()->with('ok','Документ добавлен в центр документов');
    }

    public function updateDocument(Request $request,OfficialDocument $document)
    {
        $document->update($this->documentData($request,false));
        return back()->with('ok','Карточка документа обновлена');
    }

    public function destroyDocument(OfficialDocument $document)
    {
        $document->delete();
        return back()->with('ok','Документ удалён из каталога. Файлы остались в медиатеке.');
    }

    public function storeVersion(Request $request,OfficialDocument $document)
    {
        $data=$this->versionData($request);
        $makeCurrent=$request->boolean('make_current');

        DB::transaction(function() use($document,$data,$makeCurrent){
            if($makeCurrent) $document->versions()->update(['is_current'=>false]);

            $version=$document->versions()->create($data+['is_current'=>$makeCurrent]);

            if($makeCurrent){
                $this->syncCurrentVersion($document,$version);
            }
        });

        return back()->with('ok','Новая версия документа добавлена');
    }

    public function updateVersion(Request $request,OfficialDocument $document,OfficialDocumentVersion $version)
    {
        $this->assertVersion($document,$version);
        $data=$this->versionData($request);
        $version->update($data);

        if($version->is_current) $this->syncCurrentVersion($document,$version);

        return back()->with('ok','Данные версии обновлены');
    }

    public function makeVersionCurrent(OfficialDocument $document,OfficialDocumentVersion $version)
    {
        $this->assertVersion($document,$version);

        DB::transaction(function() use($document,$version){
            $document->versions()->update(['is_current'=>false]);
            $version->update(['is_current'=>true,'is_published'=>true]);
            $this->syncCurrentVersion($document,$version);
        });

        return back()->with('ok','Текущая версия документа изменена');
    }

    public function destroyVersion(OfficialDocument $document,OfficialDocumentVersion $version)
    {
        $this->assertVersion($document,$version);

        if($document->versions()->count()<=1){
            throw ValidationException::withMessages(['version'=>'Нельзя удалить единственную версию документа.']);
        }

        DB::transaction(function() use($document,$version){
            $wasCurrent=$version->is_current;
            $version->delete();

            if($wasCurrent){
                $replacement=$document->versions()->where('is_published',true)
                    ->orderByDesc('effective_date')->orderByDesc('id')->first()
                    ?: $document->versions()->orderByDesc('id')->first();

                $document->versions()->update(['is_current'=>false]);
                $replacement->update(['is_current'=>true]);
                $this->syncCurrentVersion($document,$replacement);
            }
        });

        return back()->with('ok','Версия удалена из истории. Файл остался в медиатеке.');
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

    private function documentData(Request $request,bool $creating): array
    {
        $rules=[
            'category_id'=>['required','exists:official_document_categories,id'],
            'title'=>['required','string','max:500'],
            'description'=>['nullable','string','max:5000'],
            'document_date'=>['nullable','date'],
            'document_number'=>['nullable','string','max:120'],
            'sort'=>['nullable','integer','min:0','max:99999'],
            'is_published'=>['nullable','boolean'],
        ];

        if($creating){
            $rules['media_asset_id']=['required','exists:media_assets,id'];
            $rules['version']=['nullable','string','max:80'];
            $rules['change_note']=['nullable','string','max:1000'];
        }

        $data=$request->validate($rules);

        if($creating) $this->assertDocumentMedia((int)$data['media_asset_id']);

        $data['sort']=(int)($data['sort']??0);
        $data['is_published']=$request->boolean('is_published');

        if(!$creating){
            unset($data['media_asset_id'],$data['version'],$data['change_note']);
        }

        return $data;
    }

    private function versionData(Request $request): array
    {
        $data=$request->validate([
            'media_asset_id'=>['required','exists:media_assets,id'],
            'version'=>['nullable','string','max:80'],
            'effective_date'=>['nullable','date'],
            'change_note'=>['nullable','string','max:1000'],
            'is_published'=>['nullable','boolean'],
        ]);
        $this->assertDocumentMedia((int)$data['media_asset_id']);
        $data['is_published']=$request->boolean('is_published');
        return $data;
    }

    private function assertDocumentMedia(int $mediaId): void
    {
        if(!MediaAsset::whereKey($mediaId)->where('type','document')->exists()){
            throw ValidationException::withMessages(['media_asset_id'=>'Выберите файл типа «Документ» из медиатеки.']);
        }
    }

    private function assertVersion(OfficialDocument $document,OfficialDocumentVersion $version): void
    {
        abort_unless($version->official_document_id===$document->id,404);
    }

    private function syncCurrentVersion(OfficialDocument $document,OfficialDocumentVersion $version): void
    {
        $document->update([
            'media_asset_id'=>$version->media_asset_id,
            'version'=>$version->version,
        ]);
    }
}
