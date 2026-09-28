@extends('admin.layout')
@section('heading',$entry->exists?'Редактирование занятия':'Новое занятие')
@section('content')
<form class="admin-form" method="post" action="{{ $entry->exists ? route('admin.schedule.update',$entry) : route('admin.schedule.store') }}">
 @csrf @if($entry->exists) @method('PUT') @endif
 <div class="row g-4">
  <div class="col-lg-8">
   <div class="glass-panel">
    <div class="row g-3">
     <div class="col-md-4 field"><label>Дата</label><input class="form-control" type="date" name="lesson_date" value="{{ old('lesson_date',$entry->lesson_date?->format('Y-m-d') ?: $entry->lesson_date) }}" required></div>
     <div class="col-md-4 field"><label>Номер пары</label><input class="form-control" type="number" min="1" max="20" name="lesson_number" value="{{ old('lesson_number',$entry->lesson_number) }}"></div>
     <div class="col-md-4 field"><label>Кабинет</label><input class="form-control" name="room" value="{{ old('room',$entry->room) }}"></div>
    </div>
    <div class="row g-3">
     <div class="col-md-6 field"><label>Начало</label><input class="form-control" type="time" name="starts_at" value="{{ old('starts_at',$entry->starts_at ? substr($entry->starts_at,0,5) : '') }}" required></div>
     <div class="col-md-6 field"><label>Окончание</label><input class="form-control" type="time" name="ends_at" value="{{ old('ends_at',$entry->ends_at ? substr($entry->ends_at,0,5) : '') }}" required></div>
    </div>
    <div class="field"><label>Дисциплина</label><input class="form-control" name="subject" value="{{ old('subject',$entry->subject) }}" required></div>
    <div class="row g-3">
     <div class="col-md-6 field"><label>Тип занятия</label><input class="form-control" name="lesson_type" value="{{ old('lesson_type',$entry->lesson_type) }}" placeholder="Лекция, практика, лабораторная..."></div>
     <div class="col-md-6 field"><label>Подгруппа</label><input class="form-control" name="subgroup" value="{{ old('subgroup',$entry->subgroup) }}" placeholder="При необходимости"></div>
    </div>
    <div class="field"><label>Примечание</label><textarea class="form-control" rows="3" name="notes">{{ old('notes',$entry->notes) }}</textarea></div>
   </div>
  </div>
  <div class="col-lg-4">
   <div class="glass-panel">
    <div class="field"><label>Группа</label><select class="form-select" name="group_id" required><option value="">Выберите группу</option>@foreach($groups as $group)<option value="{{ $group->id }}" @selected(old('group_id',$entry->group_id)==$group->id)>{{ $group->name }}</option>@endforeach</select></div>
    <div class="field"><label>Преподаватель</label><select class="form-select" name="teacher_id"><option value="">— не указан —</option>@foreach($teachers as $teacher)<option value="{{ $teacher->id }}" @selected(old('teacher_id',$entry->teacher_id)==$teacher->id)>{{ $teacher->full_name }}</option>@endforeach</select></div>
    <button class="btn-tech w-100 justify-content-center">Сохранить</button>
    <a class="btn-ghost w-100 justify-content-center mt-2" href="{{ route('admin.schedule.index',['date'=>$entry->lesson_date?->format('Y-m-d') ?: now()->format('Y-m-d')]) }}">Назад</a>
   </div>
  </div>
 </div>
</form>
@endsection