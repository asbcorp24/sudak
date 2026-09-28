<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\CooperationApplication;
use App\Models\CooperationItem;
use App\Models\MediaAsset;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CooperationAdminController extends Controller
{
    public function index()
    {
        return view('admin.cooperation.index',[
            'items'=>CooperationItem::with('media')->orderBy('type')->orderBy('sort_order')->orderBy('id')->get(),
            'applications'=>CooperationApplication::latest()->take(250)->get(),
            'images'=>MediaAsset::where('type','image')->latest()->get(),
        ]);
    }

    public function storeItem(Request $request)
    {
        $item=new CooperationItem();
        return $this->saveItemData($request,$item);
    }

    public function updateItem(Request $request, CooperationItem $item)
    {
        return $this->saveItemData($request,$item);
    }

    public function destroyItem(CooperationItem $item)
    {
        $item->syncMediaCollection('cover',[]);
        $item->delete();
        return back()->with('ok','Материал удалён');
    }

    public function updateApplication(Request $request, CooperationApplication $application)
    {
        $data=$request->validate(['status'=>['required','in:new,processing,accepted,rejected']]);
        $application->update($data);
        return back()->with('ok','Статус заявки обновлён');
    }

    public function destroyApplication(CooperationApplication $application)
    {
        $application->delete();
        return back()->with('ok','Заявка удалена');
    }

    private function saveItemData(Request $request, CooperationItem $item)
    {
        $data=$request->validate([
            'type'=>['required','in:proposal,partner,project'],
            'title'=>['required','string','max:255'],
            'description'=>['nullable','string','max:5000'],
            'url'=>['nullable','url','max:2000'],
            'sort_order'=>['nullable','integer','min:0','max:999999'],
            'is_published'=>['nullable','boolean'],
            'media_id'=>['nullable','integer','exists:media_assets,id'],
        ]);

        $mediaId=!empty($data['media_id'])?(int)$data['media_id']:null;
        if ($mediaId && !MediaAsset::whereKey($mediaId)->where('type','image')->exists()) {
            throw ValidationException::withMessages(['media_id'=>'Для карточки можно выбрать только изображение.']);
        }

        unset($data['media_id']);
        $data['sort_order']=$data['sort_order'] ?? 0;
        $data['is_published']=$request->boolean('is_published');

        $item->fill($data)->save();
        $item->syncMediaCollection('cover',$mediaId?[$mediaId]:[]);

        return back()->with('ok','Материал сотрудничества сохранён');
    }
}
