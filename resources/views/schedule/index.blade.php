@extends('layouts.app')
@section('title','Расписание — Зеленодольский судостроительный колледж')
@section('description','Расписание занятий Зеленодольского судостроительного колледжа с фильтрами по дате, группе и преподавателю.')
@section('content')
<section class="page-hero compact schedule-hero">
 <div id="three-hero" class="three-layer" data-scene="network"></div>
 <div class="container-xxl position-relative">
  <span class="eyebrow">ACADEMIC SCHEDULE</span>
  <h1>Расписание</h1>
  <p>Актуальное расписание занятий. Выберите дату, учебную группу или преподавателя.</p>
 </div>
</section>

<section class="schedule-section">
 <div class="container-xxl">
  <form class="schedule-filters" method="get" action="{{ route('schedule.index') }}">
   <div class="schedule-filter-field">
    <label>Дата</label>
    <input class="form-control" type="date" name="date" value="{{ $date }}">
   </div>
   <div class="schedule-filter-field">
    <label>Группа</label>
    <select class="form-select" name="group_id">
     <option value="">Все группы</option>
     @foreach($groups as $group)
      <option value="{{ $group->id }}" @selected($groupId===$group->id)>{{ $group->name }}@if($group->course) · {{ $group->course }} курс@endif</option>
     @endforeach
    </select>
   </div>
   <div class="schedule-filter-field">
    <label>Преподаватель</label>
    <select class="form-select" name="teacher_id">
     <option value="">Все преподаватели</option>
     @foreach($teachers as $teacher)
      <option value="{{ $teacher->id }}" @selected($teacherId===$teacher->id)>{{ $teacher->full_name }}</option>
     @endforeach
    </select>
   </div>
   <div class="schedule-filter-actions">
    <button class="btn-tech">Показать</button>
    <a class="btn-ghost" href="{{ route('schedule.index',['date'=>$date]) }}">Сбросить</a>
   </div>
  </form>

  <div class="schedule-date-nav">
   <a href="{{ route('schedule.index',array_filter(['date'=>$previousDate,'group_id'=>$groupId,'teacher_id'=>$teacherId])) }}">← Предыдущий день</a>
   <strong>{{ CarbonCarbon::parse($date)->format('d.m.Y') }}</strong>
   <a href="{{ route('schedule.index',array_filter(['date'=>$nextDate,'group_id'=>$groupId,'teacher_id'=>$teacherId])) }}">Следующий день →</a>
  </div>

  <div class="schedule-table-wrap">
   <table class="schedule-table">
    <thead>
     <tr>
      <th>№</th>
      <th>Время</th>
      <th>Группа</th>
      <th>Дисциплина</th>
      <th>Преподаватель</th>
      <th>Кабинет</th>
      <th>Тип</th>
     </tr>
    </thead>
    <tbody>
     @forelse($entries as $entry)
      <tr>
       <td class="schedule-number">{{ $entry->lesson_number ?: '—' }}</td>
       <td class="schedule-time"><b>{{ substr($entry->starts_at,0,5) }}</b><span>{{ substr($entry->ends_at,0,5) }}</span></td>
       <td><b>{{ $entry->group->name }}</b>@if($entry->subgroup)<small>{{ $entry->subgroup }}</small>@endif</td>
       <td><b>{{ $entry->subject }}</b>@if($entry->notes)<small>{{ $entry->notes }}</small>@endif</td>
       <td>{{ $entry->teacher?->full_name ?: '—' }}</td>
       <td>{{ $entry->room ?: '—' }}</td>
       <td>{{ $entry->lesson_type ?: '—' }}</td>
      </tr>
     @empty
      <tr><td colspan="7" class="schedule-empty">На выбранную дату занятий по этим фильтрам нет.</td></tr>
     @endforelse
    </tbody>
   </table>
  </div>
 </div>
</section>
@endsection