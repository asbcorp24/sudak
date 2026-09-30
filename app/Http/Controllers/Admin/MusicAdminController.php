<?php
namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\MusicTrack;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class MusicAdminController extends Controller
{
    public function index(?MusicTrack $track=null)
    {
        return view('admin.music.index',[
            'tracks'=>MusicTrack::orderBy('sort_order')->orderBy('id')->get(),
            'editing'=>$track,
        ]);
    }

    public function edit(MusicTrack $track)
    {
        return $this->index($track);
    }

    public function store(Request $request)
    {
        return $this->save($request,new MusicTrack());
    }

    public function update(Request $request, MusicTrack $track)
    {
        return $this->save($request,$track);
    }

    private function save(Request $request, MusicTrack $track)
    {
        $isNew=!$track->exists;
        $data=$request->validate([
            'title'=>'required|string|max:255',
            'artist'=>'nullable|string|max:255',
            'audio_file'=>[$isNew?'required':'nullable','file','max:51200','mimes:mp3,wav,ogg,m4a,aac'],
            'sort_order'=>'nullable|integer|min:0|max:999999',
        ],[
            'audio_file.required'=>'Выберите аудиофайл.',
            'audio_file.max'=>'Максимальный размер аудиофайла — 50 МБ.',
            'audio_file.mimes'=>'Разрешены MP3, WAV, OGG, M4A и AAC.',
        ]);

        if($request->hasFile('audio_file')){
            if($track->file_path) Storage::disk('public')->delete($track->file_path);
            $file=$request->file('audio_file');
            $data['file_path']=$file->store('music','public');
            $data['file_name']=$file->getClientOriginalName();
            $data['mime_type']=$file->getMimeType();
            $data['file_size']=$file->getSize();
        }

        unset($data['audio_file']);
        $data['sort_order']=$data['sort_order'] ?? 0;
        $data['is_active']=$request->boolean('is_active');
        $track->fill($data)->save();

        return redirect()->route('admin.music.index')->with('ok','Музыкальный трек сохранён.');
    }

    public function destroy(MusicTrack $track)
    {
        if($track->file_path) Storage::disk('public')->delete($track->file_path);
        $track->delete();
        return back()->with('ok','Трек удалён.');
    }
}
