@extends('admin.layout')
@section('heading',$specialty->exists?'Редактирование специальности':'Новая специальность')
@section('content')
<form class="admin-form" method="post" action="{{ $specialty->exists ? route('admin.specialties.update',$specialty) : route('admin.specialties.store') }}">
 @csrf @if($specialty->exists) @method('PUT') @endif
 <div class="row g-4">
  <div class="col-lg-8">
   <div class="row g-3">
    <div class="col-md-3 field"><label>Код</label><input class="form-control" name="code" value="{{ old('code',$specialty->code) }}" required></div>
    <div class="col-md-9 field"><label>Название</label><input class="form-control" name="title" value="{{ old('title',$specialty->title) }}" required></div>
   </div>
   <div class="field"><label>Slug</label><input class="form-control" name="slug" value="{{ old('slug',$specialty->slug) }}"></div>
   <div class="field"><label>Краткое описание</label><textarea class="form-control" rows="4" name="description">{{ old('description',$specialty->description) }}</textarea></div>
   <div class="field"><label>Подробности (HTML)</label><textarea class="form-control code-area" rows="14" name="details">{{ old('details',$specialty->details) }}</textarea></div>
  </div>
  <div class="col-lg-4">
   <div class="glass-panel">
    <div class="field"><label>3D-пресет</label><select class="form-select" name="scene_key">@foreach(['shipbuilding'=>'Судостроение / корпус','engine'=>'Судовые машины / двигатель','electro'=>'Электро / импульсы','network'=>'IT / сеть узлов','cnc'=>'Машиностроение / CNC','quality'=>'Контроль качества / сканер','shipyard'=>'Цифровая верфь','blueprint'=>'Чертёжная сетка'] as $v=>$t)<option value="{{ $v }}" @selected(old('scene_key',$specialty->scene_key?:'shipbuilding')==$v)>{{ $t }}</option>@endforeach</select></div>
    <div class="field"><label>Акцентный цвет</label><input class="form-control form-control-color w-100" type="color" name="accent" value="{{ old('accent',$specialty->accent?:'#45e7ff') }}"></div>
    <div class="field"><label>Срок</label><input class="form-control" name="duration" value="{{ old('duration',$specialty->duration) }}"></div>
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