@extends('admin.layout')
@section('heading',$employee->exists?'Редактирование сотрудника':'Новый сотрудник')
@section('content')
@php($scheduleOnly=auth()->user()->adminScope()==='schedule')
<form method="post" class="admin-form" action="{{ $employee->exists ? route('admin.employees.update',$employee) : route('admin.employees.store') }}">
 @csrf @if($employee->exists) @method('PUT') @endif
 <div class="row g-4">
  <div class="col-lg-8">
   <div class="glass-panel">
    <div class="row g-3">
     <div class="col-md-4 field"><label>Тип</label>
      @if($scheduleOnly)
       <input type="hidden" name="employee_type" value="teacher">
       <input class="form-control" value="Преподаватель" disabled>
      @else
       <select class="form-select" name="employee_type"><option value="leadership" @selected(old('employee_type',$employee->employee_type)==='leadership')>Руководство</option><option value="teacher" @selected(old('employee_type',$employee->employee_type)==='teacher')>Преподаватель</option><option value="staff" @selected(old('employee_type',$employee->employee_type)==='staff')>Сотрудник</option></select>
      @endif
     </div>
     <div class="col-md-8 field"><label>ФИО</label><input class="form-control" name="full_name" value="{{ old('full_name',$employee->full_name) }}" required></div>
     <div class="col-12 field"><label>Должность</label><input class="form-control" name="position" value="{{ old('position',$employee->position) }}"></div>
     <div class="col-12 field"><label>Дисциплины</label><textarea class="form-control" rows="3" name="disciplines">{{ old('disciplines',$employee->disciplines) }}</textarea></div>
     <div class="col-md-6 field"><label>Образование</label><textarea class="form-control" rows="5" name="education">{{ old('education',$employee->education) }}</textarea></div>
     <div class="col-md-6 field"><label>Квалификация / повышение квалификации</label><textarea class="form-control" rows="5" name="qualification">{{ old('qualification',$employee->qualification) }}</textarea></div>
     <div class="col-12 field"><label>Достижения</label><textarea class="form-control" rows="5" name="achievements">{{ old('achievements',$employee->achievements) }}</textarea></div>
     <div class="col-12 field"><label>О сотруднике</label><textarea class="form-control" rows="5" name="bio">{{ old('bio',$employee->bio) }}</textarea></div>
    </div>
   </div>
  </div>
  <div class="col-lg-4">
   <div class="glass-panel">
    <div class="field"><label>Фото из медиатеки</label><select class="form-select" name="photo_media_id"><option value="">— без фото —</option>@foreach($images as $image)<option value="{{ $image->id }}" @selected(old('photo_media_id',$selectedPhoto)===$image->id)>{{ $image->title ?: $image->original_name }}</option>@endforeach</select></div>
    <div class="field"><label>Email</label><input type="email" class="form-control" name="email" value="{{ old('email',$employee->email) }}"></div>
    <div class="field"><label>Телефон</label><input class="form-control" name="phone" value="{{ old('phone',$employee->phone) }}"></div>
    <div class="field"><label>Порядок</label><input type="number" min="0" class="form-control" name="sort" value="{{ old('sort',$employee->sort??0) }}"></div>
    <label class="check"><input type="checkbox" name="is_published" value="1" @checked(old('is_published',$employee->exists?$employee->is_published:true))> Показывать на сайте</label>
    <button class="btn-tech w-100 justify-content-center mt-3">Сохранить</button>
    <a class="btn-ghost w-100 justify-content-center mt-2" href="{{ route('admin.employees.index') }}">Назад</a>
   </div>
  </div>
 </div>
</form>
@endsection