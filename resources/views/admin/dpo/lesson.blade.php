@extends('admin.layout')
@section('heading','ДПО / Урок / '.$lesson->title)
@section('content')
<div class="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
 <a class="btn-ghost" href="{{ route('admin.dpo.programs.show',$lesson->module->program) }}">← {{ $lesson->module->program->title }}</a>
 <span class="eyebrow">{{ $lesson->module->title }}</span>
</div>

<div class="row g-4">
 <div class="col-xl-8">
  <form method="post" action="{{ route('admin.dpo.lessons.update',$lesson) }}" class="admin-form">@csrf @method('PUT')
   <div class="glass-panel">
    <div class="field"><label>Название урока</label><input class="form-control" name="title" value="{{ $lesson->title }}" required></div>
    <div class="field"><label>Краткое описание</label><textarea class="form-control" rows="3" name="description">{{ $lesson->description }}</textarea></div>
    <div class="row g-3">
     <div class="col-md-4 field"><label>Длительность, мин</label><input type="number" min="0" class="form-control" name="duration_minutes" value="{{ $lesson->duration_minutes }}"></div>
     <div class="col-md-4 field"><label>Завершение</label><select class="form-select" name="completion_mode">@foreach(['view'=>'По просмотру','manual'=>'Вручную','resources'=>'По материалам','scorm'=>'По SCORM'] as $v=>$t)<option value="{{ $v }}" @selected($lesson->completion_mode===$v)>{{ $t }}</option>@endforeach</select></div>
     <div class="col-md-4 field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="{{ $lesson->sort }}"></div>
    </div>
    <label class="check"><input type="checkbox" name="is_published" value="1" @checked($lesson->is_published)> Урок опубликован</label>
   </div>

   <div class="field mt-4">
    <label>Содержание урока</label>
    @include('admin.partials.rich-editor',['editorId'=>'dpo-lesson-editor','name'=>'content','value'=>$lesson->content,'media'=>$media])
   </div>
   <button class="btn-tech mt-3">Сохранить урок</button>
  </form>

  <div class="glass-panel mt-4">
   <span class="eyebrow">MATERIALS</span><h3 class="mt-2">PDF, документы и видеоссылки</h3>
   <div class="inline-media-upload mb-3"
        data-media-inline-upload
        data-upload-url="{{ route('admin.media.store') }}"
        data-csrf="{{ csrf_token() }}">
    <div class="inline-media-upload-main">
     <input type="file" class="form-control" data-media-upload-input multiple>
     <button type="button" class="btn-tech" data-media-upload-button>Загрузить файл</button>
    </div>
    <small data-media-upload-status>Новый файл сразу появится в списке ниже.</small>
   </div>
   <form method="post" action="{{ route('admin.dpo.resources.store',$lesson) }}" class="admin-form">@csrf
    <div class="row g-2">
     <div class="col-md-3"><select class="form-select" name="type" data-dpo-resource-type><option value="file">Файл / PDF</option><option value="video">Видео</option><option value="link">Ссылка</option></select></div>
     <div class="col-md-5"><input class="form-control" name="title" placeholder="Название материала" required></div>
     <div class="col-md-4"><input type="number" min="0" class="form-control" name="sort" value="0" placeholder="Порядок"></div>
    </div>
    <div class="row g-2 mt-1">
     <div class="col-md-6"><select class="form-select" name="media_asset_id" data-media-select><option value="">Файл из медиатеки</option>@foreach($media as $asset)<option value="{{ $asset->id }}">{{ $asset->title ?: $asset->original_name }} · {{ strtoupper($asset->extension) }}</option>@endforeach</select></div>
     <div class="col-md-6"><input class="form-control" name="url" placeholder="https://... для видео или ссылки"></div>
    </div>
    <div class="field mt-2"><textarea class="form-control" rows="2" name="description" placeholder="Описание"></textarea></div>
    <label class="check"><input type="checkbox" name="is_required" value="1"> Обязательный материал</label>
    <button class="btn-ghost">Добавить материал</button>
   </form>
   <div class="dpo-admin-simple-list mt-3">
    @foreach($lesson->resources as $resource)
     <div><span><b>{{ $resource->title }}</b><small>{{ ['file'=>'Файл','video'=>'Видео','link'=>'Ссылка'][$resource->type] }}@if($resource->media) · {{ strtoupper($resource->media->extension) }}@endif</small></span><form method="post" action="{{ route('admin.dpo.resources.destroy',$resource) }}">@csrf @method('DELETE')<button class="link-danger">×</button></form></div>
    @endforeach
   </div>
  </div>
 </div>

 <div class="col-xl-4">
  <div class="glass-panel">
   <span class="eyebrow">SCORM / iSPRING</span><h3 class="mt-2">SCORM-тест / курс</h3>
   <p class="text-secondary">Загрузите ZIP, опубликованный из iSpring как SCORM 1.2 или SCORM 2004.</p>
   <form method="post" enctype="multipart/form-data" action="{{ route('admin.dpo.scorm.store',$lesson) }}" class="admin-form">@csrf
    <div class="field"><label>Название</label><input class="form-control" name="title" value="{{ $lesson->title }} — тест" required></div>
    <div class="field"><label>SCORM ZIP</label><input type="file" class="form-control" name="package" accept=".zip,application/zip" required></div>
    <div class="row g-2">
     <div class="col-6 field"><label>Макс. балл</label><input type="number" min="0" class="form-control" name="max_score" value="100"></div>
     <div class="col-6 field"><label>Попыток</label><input type="number" min="1" class="form-control" name="max_attempts" placeholder="без лимита"></div>
    </div>
    <button class="btn-tech w-100 justify-content-center">Загрузить SCORM</button>
   </form>
   <div class="dpo-scorm-admin-list mt-3">
    @foreach($lesson->scormPackages as $package)
     <div class="dpo-scorm-admin-item"><div><b>{{ $package->title }}</b><small>SCORM {{ $package->scorm_version }} · попыток: {{ $package->attempts_count }}</small></div><form method="post" action="{{ route('admin.dpo.scorm.destroy',$package) }}" onsubmit="return confirm('Удалить пакет и все результаты попыток?')">@csrf @method('DELETE')<button class="link-danger">×</button></form></div>
    @endforeach
   </div>
  </div>

  <div class="glass-panel mt-4">
   <span class="eyebrow">HOMEWORK</span><h3 class="mt-2">Домашнее задание</h3>
   <form method="post" action="{{ route('admin.dpo.assignments.store',$lesson) }}" class="admin-form">@csrf
    <div class="field"><label>Название</label><input class="form-control" name="title" required></div>
    <div class="field"><label>Задание</label><textarea class="form-control" rows="5" name="description"></textarea></div>
    <div class="field"><label>Максимальный балл</label><input type="number" step="0.01" min="0" class="form-control" name="max_score" value="100"></div>
    <label class="check"><input type="checkbox" name="allow_text" value="1" checked> Разрешить текстовый ответ</label>
    <label class="check"><input type="checkbox" name="allow_file" value="1" checked> Разрешить файл</label>
    <button class="btn-ghost w-100 justify-content-center">Добавить задание</button>
   </form>
   @foreach($lesson->assignments as $assignment)
    <div class="dpo-assignment-admin mt-3">
     <b>{{ $assignment->title }}</b><small>до {{ $assignment->max_score }} баллов · ответов {{ $assignment->submissions->count() }}</small>
     @foreach($lesson->module->program->groups as $group)
      @php($pivot=$assignment->groups->firstWhere('id',$group->id)?->pivot)
      <form method="post" action="{{ route('admin.dpo.assignments.group',[$assignment,$group]) }}" class="mt-2">@csrf
       <small>{{ $group->name }}</small>
       <div class="row g-1"><div class="col-6"><input type="datetime-local" class="form-control form-control-sm" name="available_from" value="{{ $pivot?->available_from ? \Illuminate\Support\Carbon::parse($pivot->available_from)->format('Y-m-d\TH:i') : '' }}"></div><div class="col-6"><input type="datetime-local" class="form-control form-control-sm" name="due_at" value="{{ $pivot?->due_at ? \Illuminate\Support\Carbon::parse($pivot->due_at)->format('Y-m-d\TH:i') : '' }}"></div></div>
       <button class="btn-ghost mt-1">Сроки</button>
      </form>
     @endforeach
    </div>
   @endforeach
  </div>

  <form method="post" action="{{ route('admin.dpo.lessons.destroy',$lesson) }}" class="mt-4 text-end" onsubmit="return confirm('Удалить урок со всеми материалами, заданиями и SCORM?')">@csrf @method('DELETE')<button class="link-danger">Удалить урок ×</button></form>
 </div>
</div>
@endsection