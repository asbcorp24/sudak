@extends('admin.layout')
@section('heading','Конкурсы и достижения')
@section('content')
<div class="admin-actions">
 <div><p>Публикация конкурсов, олимпиад, чемпионатов и достижений студентов.</p><small class="text-secondary">Обложки выбираются из общей медиатеки.</small></div>
 <a class="btn-ghost" target="_blank" href="{{ route('competitions.index') }}">Открыть раздел ↗</a>
</div>

<div class="row g-4">
 <div class="col-xl-6">
  <form method="post" action="{{ route('admin.competitions.store') }}" class="glass-panel admin-form">@csrf
   <span class="eyebrow">NEW COMPETITION</span><h3 class="mt-2">Добавить конкурс</h3>
   <div class="field"><label>Название</label><input class="form-control" name="title" required></div>
   <div class="row g-3">
    <div class="col-md-6 field"><label>Организатор</label><input class="form-control" name="organizer"></div>
    <div class="col-md-6 field"><label>Место</label><input class="form-control" name="location"></div>
    <div class="col-md-6 field"><label>Начало</label><input type="date" class="form-control" name="starts_on"></div>
    <div class="col-md-6 field"><label>Окончание</label><input type="date" class="form-control" name="ends_on"></div>
   </div>
   <div class="field"><label>Описание</label><textarea class="form-control" rows="5" name="description"></textarea></div>
   <div class="field"><label>Ссылка</label><input type="url" class="form-control" name="url"></div>
   <div class="field"><label>Обложка из медиатеки</label><select class="form-select" name="media_id"><option value="">— без обложки —</option>@foreach($images as $image)<option value="{{ $image->id }}">{{ $image->title ?: $image->original_name }}</option>@endforeach</select></div>
   <label class="check"><input type="checkbox" name="is_published" value="1" checked> Опубликован</label>
   <button class="btn-tech w-100 justify-content-center">Добавить конкурс</button>
  </form>
 </div>

 <div class="col-xl-6">
  <form method="post" action="{{ route('admin.achievements.store') }}" class="glass-panel admin-form">@csrf
   <span class="eyebrow">NEW ACHIEVEMENT</span><h3 class="mt-2">Добавить достижение</h3>
   <div class="field"><label>Студент / команда</label><input class="form-control" name="student_name" placeholder="ФИО или название команды"></div>
   <div class="field"><label>Конкурс</label><select class="form-select" name="competition_id"><option value="">— без конкурса —</option>@foreach($competitions as $competition)<option value="{{ $competition->id }}">{{ $competition->title }}</option>@endforeach</select></div>
   <div class="field"><label>Название достижения</label><input class="form-control" name="title" required></div>
   <div class="row g-3">
    <div class="col-md-6 field"><label>Результат</label><input class="form-control" name="result" placeholder="1 место / лауреат"></div>
    <div class="col-md-6 field"><label>Уровень</label><input class="form-control" name="level" placeholder="региональный / всероссийский"></div>
    <div class="col-md-6 field"><label>Дата</label><input type="date" class="form-control" name="awarded_at"></div>
    <div class="col-md-6 field"><label>Фото из медиатеки</label><select class="form-select" name="media_id"><option value="">— без изображения —</option>@foreach($images as $image)<option value="{{ $image->id }}">{{ $image->title ?: $image->original_name }}</option>@endforeach</select></div>
   </div>
   <div class="field"><label>Описание</label><textarea class="form-control" rows="4" name="description"></textarea></div>
   <label class="check"><input type="checkbox" name="is_public" value="1" checked> Публично</label>
   <button class="btn-tech w-100 justify-content-center">Добавить достижение</button>
  </form>
 </div>
</div>

<div class="glass-panel mt-4">
 <h3>Конкурсы</h3>
 @forelse($competitions as $competition)
  @php($cover=$competition->getMedia('cover')->first())
  <form method="post" action="{{ route('admin.competitions.update',$competition) }}" class="competition-admin-row admin-form">@csrf @method('PUT')
   <div class="cooperation-admin-thumb">@if($cover)<img src="{{ $cover->url }}" alt="">@else<span>CP</span>@endif</div>
   <div class="competition-admin-fields">
    <div class="row g-2">
     <div class="col-md-8"><input class="form-control" name="title" value="{{ $competition->title }}" required></div>
     <div class="col-md-4"><input class="form-control" name="organizer" value="{{ $competition->organizer }}" placeholder="Организатор"></div>
     <div class="col-md-3"><input type="date" class="form-control" name="starts_on" value="{{ $competition->starts_on?->format('Y-m-d') }}"></div>
     <div class="col-md-3"><input type="date" class="form-control" name="ends_on" value="{{ $competition->ends_on?->format('Y-m-d') }}"></div>
     <div class="col-md-3"><input class="form-control" name="location" value="{{ $competition->location }}" placeholder="Место"></div>
     <div class="col-md-3"><select class="form-select" name="media_id"><option value="">— обложка —</option>@foreach($images as $image)<option value="{{ $image->id }}" @selected($cover?->id===$image->id)>{{ $image->title ?: $image->original_name }}</option>@endforeach</select></div>
     <div class="col-12"><textarea class="form-control" rows="3" name="description">{{ $competition->description }}</textarea></div>
     <div class="col-md-8"><input type="url" class="form-control" name="url" value="{{ $competition->url }}" placeholder="Ссылка"></div>
     <div class="col-md-2"><label class="check"><input type="checkbox" name="is_published" value="1" @checked($competition->is_published)> Публичен</label></div>
     <div class="col-md-2 text-end"><button class="btn-ghost">Сохранить</button></div>
    </div>
   </div>
  </form>
  <form method="post" action="{{ route('admin.competitions.destroy',$competition) }}" class="text-end mb-3" onsubmit="return confirm('Удалить конкурс?')">@csrf @method('DELETE')<button class="link-danger">Удалить конкурс ×</button></form>
 @empty
  <p class="text-secondary">Конкурсов пока нет.</p>
 @endforelse
</div>

<div class="glass-panel mt-4">
 <h3>Достижения</h3>
 @forelse($achievements as $achievement)
  @php($cover=$achievement->getMedia('cover')->first())
  <form method="post" action="{{ route('admin.achievements.update',$achievement) }}" class="competition-admin-row admin-form">@csrf @method('PUT')
   <div class="cooperation-admin-thumb">@if($cover)<img src="{{ $cover->url }}" alt="">@else<span>★</span>@endif</div>
   <div class="competition-admin-fields">
    <div class="row g-2">
     <div class="col-md-5"><input class="form-control" name="student_name" value="{{ $achievement->student_name }}" placeholder="Студент / команда"></div>
     <div class="col-md-7"><input class="form-control" name="title" value="{{ $achievement->title }}" required></div>
     <div class="col-md-4"><select class="form-select" name="competition_id"><option value="">— без конкурса —</option>@foreach($competitions as $competition)<option value="{{ $competition->id }}" @selected($achievement->competition_id===$competition->id)>{{ $competition->title }}</option>@endforeach</select></div>
     <div class="col-md-2"><input class="form-control" name="result" value="{{ $achievement->result }}" placeholder="Результат"></div>
     <div class="col-md-2"><input class="form-control" name="level" value="{{ $achievement->level }}" placeholder="Уровень"></div>
     <div class="col-md-2"><input type="date" class="form-control" name="awarded_at" value="{{ $achievement->awarded_at?->format('Y-m-d') }}"></div>
     <div class="col-md-2"><select class="form-select" name="media_id"><option value="">— фото —</option>@foreach($images as $image)<option value="{{ $image->id }}" @selected($cover?->id===$image->id)>{{ $image->title ?: $image->original_name }}</option>@endforeach</select></div>
     <div class="col-12"><textarea class="form-control" rows="2" name="description">{{ $achievement->description }}</textarea></div>
     <div class="col-md-6"><label class="check"><input type="checkbox" name="is_public" value="1" @checked($achievement->is_public)> Публично</label></div>
     <div class="col-md-6 text-end"><button class="btn-ghost">Сохранить</button></div>
    </div>
   </div>
  </form>
  <form method="post" action="{{ route('admin.achievements.destroy',$achievement) }}" class="text-end mb-3" onsubmit="return confirm('Удалить достижение?')">@csrf @method('DELETE')<button class="link-danger">Удалить достижение ×</button></form>
 @empty
  <p class="text-secondary">Достижений пока нет.</p>
 @endforelse
</div>
@endsection