@extends('admin.layout')
@section('heading',$event->exists?'Редактирование события':'Новое событие')
@section('content')
<form class="admin-form" method="post" action="{{ $event->exists?route('admin.calendar.update',$event):route('admin.calendar.store') }}">
 @csrf @if($event->exists) @method('PUT') @endif
 <div class="row g-4">
  <div class="col-lg-8">
   <div class="glass-panel">
    <div class="field"><label>Название</label><input class="form-control" name="title" value="{{ old('title',$event->title) }}" required></div>
    <div class="row g-3">
     <div class="col-md-6 field"><label>Тип события</label><select class="form-select" name="type">@foreach($types as $key=>$label)<option value="{{ $key }}" @selected(old('type',$event->type?:'event')===$key)>{{ $label }}</option>@endforeach</select></div>
     <div class="col-md-6 field"><label>Место</label><input class="form-control" name="location" value="{{ old('location',$event->location) }}" placeholder="Актовый зал / корпус / онлайн"></div>
    </div>
    <div class="field"><label>Короткое описание</label><textarea class="form-control" rows="3" name="excerpt">{{ old('excerpt',$event->excerpt) }}</textarea></div>
    <div class="field"><label>Подробное описание</label><textarea class="form-control" rows="12" name="description">{{ old('description',$event->description) }}</textarea></div>
    <div class="field"><label>Внешняя ссылка</label><input class="form-control" type="url" name="external_url" value="{{ old('external_url',$event->external_url) }}" placeholder="https://..."></div>
   </div>
  </div>
  <div class="col-lg-4">
   <div class="glass-panel sticky-lg-top" style="top:90px">
    <div class="field"><label>Начало</label><input class="form-control" type="datetime-local" name="starts_at" value="{{ old('starts_at',$event->starts_at?->format('Y-m-d\TH:i')) }}" required></div>
    <div class="field"><label>Окончание</label><input class="form-control" type="datetime-local" name="ends_at" value="{{ old('ends_at',$event->ends_at?->format('Y-m-d\TH:i')) }}"></div>
    <label class="check"><input type="checkbox" name="all_day" value="1" @checked(old('all_day',$event->all_day))> Событие на весь день</label>
    <label class="check"><input type="checkbox" name="is_featured" value="1" @checked(old('is_featured',$event->is_featured))> Важное событие</label>
    <label class="check"><input type="checkbox" name="is_published" value="1" @checked(old('is_published',$event->exists?$event->is_published:true))> Опубликовано</label>
    <div class="field"><label>Slug</label><input class="form-control" name="slug" value="{{ old('slug',$event->slug) }}"></div>
    <div class="field"><label>Порядок</label><input class="form-control" type="number" min="0" name="sort" value="{{ old('sort',$event->sort??0) }}"></div>
    <button class="btn-tech w-100 justify-content-center">Сохранить</button>
   </div>
  </div>
 </div>
</form>
@endsection
