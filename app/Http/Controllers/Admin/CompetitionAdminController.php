<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\Competition;
use App\Models\MediaAsset;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CompetitionAdminController extends Controller
{
    public function index()
    {
        return view('admin.competitions.index',[
            'competitions'=>Competition::with('media')->orderByDesc('starts_on')->orderByDesc('id')->get(),
            'achievements'=>Achievement::with(['competition','media'])->orderByDesc('awarded_at')->orderByDesc('id')->get(),
            'images'=>MediaAsset::where('type','image')->latest()->get(),
        ]);
    }

    public function storeCompetition(Request $request){return $this->saveCompetition($request,new Competition());}
    public function updateCompetition(Request $request,Competition $competition){return $this->saveCompetition($request,$competition);}

    public function destroyCompetition(Competition $competition)
    {
        $competition->syncMediaCollection('cover',[]);
        $competition->delete();
        return back()->with('ok','Конкурс удалён');
    }

    public function storeAchievement(Request $request){return $this->saveAchievement($request,new Achievement());}
    public function updateAchievement(Request $request,Achievement $achievement){return $this->saveAchievement($request,$achievement);}

    public function destroyAchievement(Achievement $achievement)
    {
        $achievement->syncMediaCollection('cover',[]);
        $achievement->delete();
        return back()->with('ok','Достижение удалено');
    }

    private function saveCompetition(Request $request,Competition $competition)
    {
        $data=$request->validate([
            'title'=>['required','string','max:220'],
            'organizer'=>['nullable','string','max:220'],
            'starts_on'=>['nullable','date'],
            'ends_on'=>['nullable','date','after_or_equal:starts_on'],
            'location'=>['nullable','string','max:255'],
            'description'=>['nullable','string','max:5000'],
            'url'=>['nullable','url','max:2000'],
            'is_published'=>['nullable','boolean'],
            'media_id'=>['nullable','integer','exists:media_assets,id'],
        ]);
        $mediaId=$this->imageId($data['media_id']??null);
        unset($data['media_id']);
        $data['is_published']=$request->boolean('is_published');
        $competition->fill($data)->save();
        $competition->syncMediaCollection('cover',$mediaId?[$mediaId]:[]);
        return back()->with('ok','Конкурс сохранён');
    }

    private function saveAchievement(Request $request,Achievement $achievement)
    {
        $data=$request->validate([
            'competition_id'=>['nullable','exists:competitions,id'],
            'student_name'=>['nullable','string','max:255'],
            'title'=>['required','string','max:220'],
            'result'=>['nullable','string','max:220'],
            'level'=>['nullable','string','max:120'],
            'awarded_at'=>['nullable','date'],
            'description'=>['nullable','string','max:5000'],
            'is_public'=>['nullable','boolean'],
            'media_id'=>['nullable','integer','exists:media_assets,id'],
        ]);
        $mediaId=$this->imageId($data['media_id']??null);
        unset($data['media_id']);
        $data['is_public']=$request->boolean('is_public');
        $achievement->fill($data)->save();
        $achievement->syncMediaCollection('cover',$mediaId?[$mediaId]:[]);
        return back()->with('ok','Достижение сохранено');
    }

    private function imageId($id): ?int
    {
        if(!$id)return null;
        $id=(int)$id;
        if(!MediaAsset::whereKey($id)->where('type','image')->exists()){
            throw ValidationException::withMessages(['media_id'=>'Можно выбрать только изображение из медиатеки.']);
        }
        return $id;
    }
}
