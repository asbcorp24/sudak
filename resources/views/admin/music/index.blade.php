@extends('admin.layout')
@section('title','Музыка сайта')
@section('heading','Музыка сайта')
@section('content')
<div class="row g-4">
 <div class="col-xl-5">
  <form method="post" enctype="multipart/form-data" action="{{ $editing ? route('admin.music.update',$editing) : route('admin.music.store') }}" class="glass-panel admin-form p-4">
   @csrf
   @if($editing) @method('PUT') @endif
   <div class="d-flex justify-content-between align-items-start gap-3 mb-4">
    <div><span class="eyebrow">АУДИО / ПЛЕЙЛИСТ</span><h2 class="h4 mt-2 mb-0">{{ $editing ? 'Редактировать трек' : 'Добавить трек' }}</h2></div>
    @if($editing)<a class="btn-ghost" href="{{ route('admin.music.index') }}">Отмена</a>@endif
   </div>
   <div class="field"><label>Название</label><input class="form-control" name="title" value="{{ old('title',$editing->title ?? '') }}" required></div>
   <div class="field"><label>Исполнитель / подпись</label><input class="form-control" name="artist" value="{{ old('artist',$editing->artist ?? '') }}" placeholder="Зеленодольский судостроительный колледж"></div>
   <div class="field">
    <label>Аудиофайл</label>
    <input type="file" class="form-control" name="audio_file" accept=".mp3,.wav,.ogg,.m4a,.aac,audio/*" {{ $editing ? '' : 'required' }}>
    <small class="d-block mt-2 text-secondary">MP3, WAV, OGG, M4A, AAC · до 50 МБ.</small>
    @if($editing)<small class="d-block mt-1">Сейчас: {{ $editing->file_name }} · {{ $editing->human_file_size ?: '—' }}</small>@endif
   </div>
   <div class="row g-3">
    <div class="col-md-6 field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort_order" value="{{ old('sort_order',$editing->sort_order ?? 0) }}"></div>
    <div class="col-md-6 d-flex align-items-center pt-md-4"><label class="check mb-0"><input type="checkbox" name="is_active" value="1" {{ old('is_active',$editing->is_active ?? true) ? 'checked' : '' }}> Показывать в плеере</label></div>
   </div>
   <button class="btn-tech mt-2">{{ $editing ? 'Сохранить изменения' : 'Добавить в плейлист' }}</button>
  </form>
 </div>
 <div class="col-xl-7">
  <div class="glass-panel p-4">
   <div class="d-flex justify-content-between align-items-end gap-3 mb-3">
    <div><span class="eyebrow">PLAYLIST</span><h2 class="h4 mt-2 mb-0">Треки сайта</h2></div>
    <small class="text-secondary">{{ $tracks->count() }} шт.</small>
   </div>
   <div class="table-responsive"><table class="table tech-table align-middle mb-0">
    <thead><tr><th>Трек</th><th>Размер</th><th>Статус</th><th></th></tr></thead>
    <tbody>
     @forelse($tracks as $track)
      <tr>
       <td><strong>{{ $track->title }}</strong><small class="d-block text-secondary">{{ $track->artist ?: 'Без подписи' }}</small></td>
       <td>{{ $track->human_file_size ?: '—' }}</td>
       <td>{{ $track->is_active ? 'В плеере' : 'Скрыт' }}</td>
       <td class="text-end">
        <div class="d-flex justify-content-end gap-2 flex-wrap">
         <a class="btn-ghost" href="{{ $track->file_url }}" target="_blank" rel="noopener">Слушать</a>
         <a class="btn-ghost" href="{{ route('admin.music.edit',$track) }}">Изменить</a>
         <form method="post" action="{{ route('admin.music.destroy',$track) }}" onsubmit="return confirm('Удалить этот трек?')">@csrf @method('DELETE')<button class="link-danger" type="submit">×</button></form>
        </div>
       </td>
      </tr>
     @empty
      <tr><td colspan="4" class="text-secondary">Музыка ещё не загружена.</td></tr>
     @endforelse
    </tbody>
   </table></div>
  </div>
 </div>
</div>
@endsection
