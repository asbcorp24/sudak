@extends('layouts.app')
@section('title','Расписание — Зеленодольский судостроительный колледж')
@section('description','Расписание занятий Зеленодольского судостроительного колледжа с фильтрами по периоду, группе и преподавателю.')
@section('content')
<section class="page-hero compact schedule-hero">
 <div id="three-hero" class="three-layer" data-scene="network"></div>
 <div class="container-xxl position-relative">
  <span class="eyebrow">ACADEMIC SCHEDULE</span>
  <h1>Расписание</h1>
  <p>Выберите период, учебную группу или преподавателя. Расписание разделено по дням недели.</p>
 </div>
</section>

<section class="schedule-section">
 <div class="container-xxl">
  <form class="schedule-filters schedule-range-filters" method="get" action="{{ route('schedule.index') }}">
   <div class="schedule-filter-field">
    <label>Дата от</label>
    <input class="form-control" type="date" name="date_from" value="{{ $dateFrom }}">
   </div>
   <div class="schedule-filter-field">
    <label>Дата до</label>
    <input class="form-control" type="date" name="date_to" value="{{ $dateTo }}">
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
    <a class="btn-ghost" href="{{ route('schedule.index') }}">Сбросить</a>
   </div>
  </form>

  @if($errors->any())
   <div class="schedule-filter-error mt-3">{{ $errors->first() }}</div>
  @endif

  <div class="schedule-date-nav schedule-period-nav">
   <a href="{{ route('schedule.index',array_filter(['date_from'=>$previousFrom,'date_to'=>$previousTo,'group_id'=>$groupId,'teacher_id'=>$teacherId])) }}">← Предыдущий период</a>
   <strong>{{ $displayRange }}</strong>
   <a href="{{ route('schedule.index',array_filter(['date_from'=>$nextFrom,'date_to'=>$nextTo,'group_id'=>$groupId,'teacher_id'=>$teacherId])) }}">Следующий период →</a>
  </div>

  <div class="schedule-range-summary">
   <span>Период: <b>{{ $displayRange }}</b></span>
   <span>Занятий: <b>{{ $entries->count() }}</b></span>
  </div>

  <div class="schedule-day-list">
   @foreach($dayBlocks as $block)
    <section class="schedule-day-block {{ $block['entries']->isEmpty() ? 'is-empty' : '' }} {{ $block['is_today'] ? 'is-today' : '' }}">
     <header class="schedule-day-head">
      <div>
       <span>{{ $block['day_name'] }}</span>
       <h2>{{ $block['display_date'] }}</h2>
      </div>
      <small>{{ $block['entries']->count() }} {{ $block['entries']->count()===1 ? 'занятие' : 'занятий' }}</small>
     </header>

     @if($block['groups']->count())
      <div class="schedule-group-list">
       @foreach($block['groups'] as $groupBlock)
        <section class="schedule-group-block">
         <header class="schedule-group-head">
          <div>
           <span>Группа</span>
           <h3>{{ $groupBlock['group']->name }}</h3>
          </div>
          <div class="schedule-group-meta">
           @if($groupBlock['group']->course)<span>{{ $groupBlock['group']->course }} курс</span>@endif
           @if($groupBlock['group']->specialty)<span>{{ $groupBlock['group']->specialty }}</span>@endif
           <b>{{ $groupBlock['entries']->count() }} {{ $groupBlock['entries']->count()===1 ? 'занятие' : 'занятий' }}</b>
          </div>
         </header>

         <div class="schedule-table-wrap">
          <table class="schedule-table schedule-group-table">
           <thead>
            <tr>
             <th>№</th>
             <th>Время</th>
             <th>Дисциплина</th>
             <th>Преподаватель</th>
             <th>Кабинет</th>
             <th>Тип</th>
            </tr>
           </thead>
           <tbody>
            @foreach($groupBlock['entries'] as $entry)
             <tr>
              <td class="schedule-number">{{ $entry->lesson_number ?: '—' }}</td>
              <td class="schedule-time"><b>{{ substr($entry->starts_at,0,5) }}</b><span>{{ substr($entry->ends_at,0,5) }}</span></td>
              <td>
               <b>{{ $entry->subject }}</b>
               @if($entry->subgroup)<small>{{ $entry->subgroup }}</small>@endif
               @if($entry->notes)<small>{{ $entry->notes }}</small>@endif
              </td>
              <td>{{ $entry->teacher?->full_name ?: '—' }}</td>
              <td>{{ $entry->room ?: '—' }}</td>
              <td>{{ $entry->lesson_type ?: '—' }}</td>
             </tr>
            @endforeach
           </tbody>
          </table>
         </div>
        </section>
       @endforeach
      </div>
     @else
      <div class="schedule-day-empty">На этот день занятий по выбранным фильтрам нет.</div>
     @endif
    </section>
   @endforeach
  </div>
 </div>
</section>
@endsection
