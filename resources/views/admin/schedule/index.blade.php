@extends('admin.layout')
@section('heading','Расписание')
@section('content')
<div class="admin-actions">
 <div><p>Занятия по датам, группам и преподавателям.</p>
  <div class="d-flex flex-wrap gap-2 mt-2">
   <a href="{{ route('admin.schedule.groups') }}">Группы</a>
   <span class="text-secondary">·</span>
   <a href="{{ route('admin.schedule.teachers') }}">Преподаватели</a>
   <span class="text-secondary">·</span>
   <a target="_blank" href="{{ route('schedule.index') }}">Открыть расписание ↗</a>
  </div>
 </div>
 <a class="btn-tech" href="{{ route('admin.schedule.create',['date'=>$date,'group_id'=>$groupId,'teacher_id'=>$teacherId]) }}">+ Добавить занятие</a>
</div>

<form class="schedule-admin-filter mb-4" method="get">
 <input class="form-control" type="date" name="date" value="{{ $date }}">
 <select class="form-select" name="group_id"><option value="">Все группы</option>@foreach($groups as $group)<option value="{{ $group->id }}" @selected($groupId===$group->id)>{{ $group->name }}</option>@endforeach</select>
 <select class="form-select" name="teacher_id"><option value="">Все преподаватели</option>@foreach($teachers as $teacher)<option value="{{ $teacher->id }}" @selected($teacherId===$teacher->id)>{{ $teacher->full_name }}</option>@endforeach</select>
 <button class="btn-ghost">Фильтр</button>
</form>

<div class="table-responsive">
 <table class="table tech-table align-middle">
  <thead><tr><th>№ / время</th><th>Группа</th><th>Дисциплина</th><th>Преподаватель</th><th>Каб.</th><th></th></tr></thead>
  <tbody>
   @forelse($entries as $entry)
    <tr>
     <td><b>{{ $entry->lesson_number ?: '—' }}</b><br><small>{{ substr($entry->starts_at,0,5) }}–{{ substr($entry->ends_at,0,5) }}</small></td>
     <td>{{ $entry->group->name }}@if($entry->subgroup)<br><small>{{ $entry->subgroup }}</small>@endif</td>
     <td><b>{{ $entry->subject }}</b>@if($entry->lesson_type)<br><small>{{ $entry->lesson_type }}</small>@endif</td>
     <td>{{ $entry->teacher?->full_name ?: '—' }}</td>
     <td>{{ $entry->room ?: '—' }}</td>
     <td class="text-end">
      <a href="{{ route('admin.schedule.edit',$entry) }}">Изменить</a>
      <form class="d-inline" method="post" action="{{ route('admin.schedule.destroy',$entry) }}" onsubmit="return confirm('Удалить занятие?')">@csrf @method('DELETE')<button class="link-danger ms-2">×</button></form>
     </td>
    </tr>
   @empty
    <tr><td colspan="6">На эту дату занятий нет.</td></tr>
   @endforelse
  </tbody>
 </table>
</div>
@endsection