@extends('admin.layout')
@section('heading',$specialty->exists?'Редактирование специальности':'Новая специальность')
@section('content')
@php
$projectLines=collect($specialty->student_projects??[])->map(fn($p)=>implode(' | ',array_filter([$p['title']??'',$p['description']??'',$p['url']??''],fn($v)=>$v!=='')))->implode(PHP_EOL);
@endphp
<form class="admin-form" method="post" action="{{ $specialty->exists ? route('admin.specialties.update',$specialty) : route('admin.specialties.store') }}">
 @csrf @if($specialty->exists) @method('PUT') @endif
 <div class="row g-4">
  <div class="col-lg-8">
   <div class="glass-panel mb-4">
    <div class="row g-3">
     <div class="col-md-3 field"><label>Код</label><input class="form-control" name="code" value="{{ old('code',$specialty->code) }}" required></div>
     <div class="col-md-9 field"><label>Название</label><input class="form-control" name="title" value="{{ old('title',$specialty->title) }}" required></div>
    </div>
    <div class="field"><label>Slug</label><input class="form-control" name="slug" value="{{ old('slug',$specialty->slug) }}"></div>
    <div class="field"><label>Краткое описание</label><textarea class="form-control" rows="4" name="description">{{ old('description',$specialty->description) }}</textarea></div>
    <div class="field"><label>Подробности (HTML)</label><textarea class="form-control code-area" rows="10" name="details">{{ old('details',$specialty->details) }}</textarea></div>
   </div>

   <div class="glass-panel mb-4">
    <div class="d-flex justify-content-between gap-3 align-items-start mb-3">
     <div><span class="eyebrow">СОДЕРЖАНИЕ ПРОГРАММЫ</span><h3 class="mb-1">Что увидит абитуриент</h3></div>
     <small class="text-secondary">Один пункт — одна строка</small>
    </div>
    <div class="field"><label>Чему научится студент</label><textarea class="form-control" rows="6" name="learning_outcomes_text" placeholder="Проектировать элементы судовых конструкций&#10;Работать с CAD-системами&#10;Читать техническую документацию">{{ old('learning_outcomes_text',implode(PHP_EOL,$specialty->learning_outcomes??[])) }}</textarea></div>
    <div class="field"><label>Основные дисциплины</label><textarea class="form-control" rows="6" name="disciplines_text" placeholder="Инженерная графика&#10;Материаловедение&#10;Технология производства">{{ old('disciplines_text',implode(PHP_EOL,$specialty->disciplines??[])) }}</textarea></div>
    <div class="field"><label>Практика</label><textarea class="form-control" rows="5" name="practice" placeholder="Где и как проходит учебная и производственная практика">{{ old('practice',$specialty->practice) }}</textarea></div>
    <div class="field"><label>Кем можно работать</label><textarea class="form-control" rows="5" name="professions_text" placeholder="Техник-судостроитель&#10;Конструктор&#10;Технолог">{{ old('professions_text',implode(PHP_EOL,$specialty->professions??[])) }}</textarea></div>
    <div class="field"><label>Предприятия-партнёры</label><textarea class="form-control" rows="5" name="partners_text" placeholder="Название предприятия — направление сотрудничества">{{ old('partners_text',implode(PHP_EOL,$specialty->partners??[])) }}</textarea></div>
   </div>

   <div class="glass-panel mb-4">
    <span class="eyebrow">КОМАНДА</span>
    <h3>Преподаватели специальности</h3>
    <p class="text-secondary">Отметьте преподавателей из общего справочника сотрудников. Фото, должность и дисциплины будут взяты автоматически.</p>
    <div class="specialty-teacher-picker">
     @forelse($teachers as $teacher)
      <label class="specialty-teacher-check">
       <input type="checkbox" name="teacher_ids[]" value="{{ $teacher->id }}" @checked(in_array($teacher->id,old('teacher_ids',$selectedTeachers)))>
       <span><b>{{ $teacher->full_name }}</b><small>{{ $teacher->position ?: $teacher->disciplines }}</small></span>
      </label>
     @empty
      <div class="alert alert-secondary mb-0">Сначала добавьте преподавателей в разделе «Сотрудники».</div>
     @endforelse
    </div>
   </div>

   <div class="glass-panel">
    <span class="eyebrow">ПОРТФОЛИО</span>
    <h3>Проекты студентов</h3>
    <p class="text-secondary">Каждый проект с новой строки в формате: <b>Название | описание | ссылка</b>. Описание и ссылка необязательны.</p>
    <div class="field"><textarea class="form-control" rows="8" name="student_projects_text" placeholder="Проект буксира | 3D-модель корпуса и расчёт конструкции | https://example.ru/project">{{ old('student_projects_text',$projectLines) }}</textarea></div>
   </div>
  </div>

  <div class="col-lg-4">
   <div class="glass-panel sticky-lg-top" style="top:90px">
    <div class="field"><label>3D-пресет</label><select class="form-select" name="scene_key">@foreach(['shipbuilding'=>'Судостроение / корпус','engine'=>'Судовые машины / двигатель','electro'=>'Электро / импульсы','network'=>'IT / сеть узлов','cnc'=>'Машиностроение / CNC','quality'=>'Контроль качества / сканер','shipyard'=>'Цифровая верфь','blueprint'=>'Чертёжная сетка'] as $v=>$t)<option value="{{ $v }}" @selected(old('scene_key',$specialty->scene_key?:'shipbuilding')==$v)>{{ $t }}</option>@endforeach</select></div>
    <div class="field"><label>Акцентный цвет</label><input class="form-control form-control-color w-100" type="color" name="accent" value="{{ old('accent',$specialty->accent?:'#45e7ff') }}"></div>
    <div class="field"><label>Срок обучения</label><input class="form-control" name="duration" value="{{ old('duration',$specialty->duration) }}"></div>
    <div class="field"><label>Квалификация</label><input class="form-control" name="qualification" value="{{ old('qualification',$specialty->qualification) }}"></div>
    <div class="field"><label>База поступления</label><input class="form-control" name="admission_basis" value="{{ old('admission_basis',$specialty->admission_basis) }}"></div>
    <div class="field"><label>Параметры сцены JSON</label><textarea class="form-control code-area" name="scene_config" rows="4">{{ old('scene_config',$specialty->scene_config?json_encode($specialty->scene_config,JSON_UNESCAPED_UNICODE|JSON_PRETTY_PRINT):'') }}</textarea></div>
    <div class="field"><label>Порядок</label><input class="form-control" type="number" name="sort" value="{{ old('sort',$specialty->sort??0) }}"></div>
    <label class="check"><input type="checkbox" name="is_published" value="1" @checked(old('is_published',$specialty->exists?$specialty->is_published:true))> Опубликовано</label>
    <button class="btn-tech w-100 justify-content-center mt-3">Сохранить</button>
   </div>
  </div>
 </div>

 @include('admin.partials.media-picker',['pickerId'=>'specialty-media'])
 <div class="mt-4"><button class="btn-tech">Сохранить специальность</button></div>
</form>
@endsection