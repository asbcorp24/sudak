@extends('admin.layout')
@section('heading','ДПО / '.$program->title)
@section('content')
<div class="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
 <div class="d-flex gap-2 flex-wrap"><a class="btn-ghost" href="{{ route('admin.dpo.index') }}">← Все программы</a><a class="btn-tech" href="{{ route('admin.dpo.builder',$program) }}">Конструктор курса →</a></div>
 <span class="dpo-status {{ $program->is_published?'active':'draft' }}">{{ $program->is_published?'Опубликована':'Черновик' }}</span>
</div>

<div class="row g-4">
 <div class="col-xl-5">
  <form method="post" action="{{ route('admin.dpo.programs.update',$program) }}" class="glass-panel admin-form">@csrf @method('PUT')
   <span class="eyebrow">PROGRAM SETTINGS</span><h3 class="mt-2">Параметры программы</h3>
   <div class="row g-3">
    <div class="col-md-4 field"><label>Код</label><input class="form-control" name="code" value="{{ $program->code }}"></div>
    <div class="col-md-8 field"><label>Часы</label><input type="number" min="0" class="form-control" name="hours" value="{{ $program->hours }}" required></div>
   </div>
   <div class="field"><label>Название</label><input class="form-control" name="title" value="{{ $program->title }}" required></div>
   <div class="field"><label>Slug</label><input class="form-control" name="slug" value="{{ $program->slug }}"></div>
   <div class="field"><label>Квалификация</label><input class="form-control" name="qualification" value="{{ $program->qualification }}"></div>
   <div class="field"><label>Вид выдаваемого документа</label><input class="form-control" name="document_type" value="{{ $program->document_type }}"></div>
   <div class="field"><label>Описание</label><textarea class="form-control" rows="5" name="description">{{ $program->description }}</textarea></div>
   <div class="field"><label>Результаты обучения</label><textarea class="form-control" rows="5" name="learning_outcomes">{{ $program->learning_outcomes }}</textarea></div>
   <div class="field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="{{ $program->sort }}"></div>
   <label class="check"><input type="checkbox" name="is_published" value="1" @checked($program->is_published)> Опубликовать программу</label>
   <label class="check"><input type="checkbox" name="applications_open" value="1" @checked($program->applications_open)> Принимать заявки с сайта</label>
   <div class="mt-3"><span class="eyebrow">КРИТЕРИИ АТТЕСТАЦИИ</span></div>
   <div class="row g-2">
    <div class="col-6 field"><label>Уроки, минимум %</label><input type="number" min="0" max="100" class="form-control" name="min_progress_percent" value="{{ $program->min_progress_percent }}"></div>
    <div class="col-6 field"><label>Посещаемость, минимум %</label><input type="number" min="0" max="100" class="form-control" name="min_attendance_percent" value="{{ $program->min_attendance_percent }}"></div>
    <div class="col-6 field"><label>Домашние работы, минимум %</label><input type="number" min="0" max="100" class="form-control" name="min_homework_percent" value="{{ $program->min_homework_percent }}"></div>
    <div class="col-6 field"><label>SCORM / тест, минимум %</label><input type="number" min="0" max="100" class="form-control" name="min_scorm_percent" value="{{ $program->min_scorm_percent }}"></div>
   </div>
   <button class="btn-tech w-100 justify-content-center">Сохранить программу</button>
  </form>
 </div>

 <div class="col-xl-7">
  <div class="glass-panel mb-4">
   <span class="eyebrow">GROUPS</span><h3 class="mt-2">Учебные группы</h3>
   <form method="post" action="{{ route('admin.dpo.groups.store',$program) }}" class="admin-form">@csrf
    <div class="row g-2">
     <div class="col-md-5"><input class="form-control" name="name" placeholder="ДПО-26/01" required></div>
     <div class="col-md-3"><input type="date" class="form-control" name="starts_on"></div>
     <div class="col-md-3"><input type="date" class="form-control" name="ends_on"></div>
     <div class="col-md-1"><input type="hidden" name="status" value="draft"><button class="btn-tech w-100 justify-content-center">+</button></div>
    </div>
   </form>
   <div class="dpo-admin-simple-list mt-3">
    @foreach($program->groups as $group)
     <a href="{{ route('admin.dpo.groups.show',$group) }}"><span><b>{{ $group->name }}</b><small>{{ $group->starts_on?->format('d.m.Y') }} — {{ $group->ends_on?->format('d.m.Y') }}</small></span><span class="dpo-status {{ $group->status }}">{{ ['draft'=>'Черновик','active'=>'Идёт обучение','completed'=>'Завершена','archived'=>'Архив'][$group->status] }}</span></a>
    @endforeach
   </div>
  </div>

  <div class="glass-panel">
   <div class="d-flex justify-content-between align-items-center gap-2 flex-wrap"><div><span class="eyebrow">CURRICULUM</span><h3 class="mt-2">Учебная структура</h3></div><a class="btn-tech" href="{{ route('admin.dpo.builder',$program) }}">Открыть конструктор</a></div>
   <form method="post" action="{{ route('admin.dpo.modules.store',$program) }}" class="admin-form mb-4">@csrf
    <div class="row g-2"><div class="col-md-8"><input class="form-control" name="title" placeholder="Название модуля" required></div><div class="col-md-2"><input class="form-control" type="number" min="0" name="sort" value="0"></div><div class="col-md-2"><button class="btn-tech w-100 justify-content-center">Добавить</button></div></div>
   </form>

   <div class="dpo-module-admin-list">
    @foreach($program->modules as $module)
     <section class="dpo-module-admin">
      <div class="dpo-module-admin-head"><div><span class="eyebrow">MODULE {{ str_pad($loop->iteration,2,'0',STR_PAD_LEFT) }}</span><h4>{{ $module->title }}</h4></div></div>
      <div class="dpo-admin-simple-list">
       @foreach($module->lessons as $lesson)
        <a href="{{ route('admin.dpo.lessons.edit',$lesson) }}"><span><b>{{ $lesson->title }}</b><small>{{ $lesson->duration_minutes }} мин · {{ ['manual'=>'ручное завершение','view'=>'просмотр','resources'=>'материалы','scorm'=>'SCORM'][$lesson->completion_mode] }}</small></span><span>Редактировать →</span></a>
       @endforeach
      </div>
      <form method="post" action="{{ route('admin.dpo.lessons.store',$module) }}" class="admin-form mt-3">@csrf
       <div class="row g-2">
        <div class="col-md-5"><input class="form-control" name="title" placeholder="Новый урок" required></div>
        <div class="col-md-2"><input type="number" class="form-control" name="duration_minutes" value="45" min="0"></div>
        <div class="col-md-3"><select class="form-select" name="completion_mode"><option value="view">По просмотру</option><option value="manual">Вручную</option><option value="resources">По материалам</option><option value="scorm">SCORM</option></select></div>
        <div class="col-md-2"><input type="hidden" name="sort" value="{{ $module->lessons->count()*10+10 }}"><button class="btn-ghost w-100 justify-content-center">+ Урок</button></div>
       </div>
      </form>
     </section>
    @endforeach
   </div>
  </div>
 </div>
</div>

<div class="d-flex justify-content-end gap-3 mt-4"><form method="post" action="{{ route('admin.dpo.programs.archive',$program) }}">@csrf<button class="btn-ghost">{{ $program->is_archived?'Восстановить из архива':'Архивировать программу' }}</button></form><form method="post" action="{{ route('admin.dpo.programs.destroy',$program) }}" onsubmit="return confirm('Удалить программу со всеми группами, уроками и результатами?')">@csrf @method('DELETE')<button class="link-danger">Удалить программу ×</button></form></div>
@endsection