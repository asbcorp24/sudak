@extends('admin.layout')
@section('heading','Расписание')
@section('content')
<div class="admin-actions">
 <div><p>Занятия по датам, группам и преподавателям.</p>
  <div class="d-flex flex-wrap gap-2 mt-2">
   <a href="{{ route('admin.schedule.groups') }}">Группы</a>
   <span class="text-secondary">·</span>
   <a href="{{ route('admin.employees.index',['type'=>'teacher']) }}">Преподаватели</a>
   <span class="text-secondary">·</span>
   <a target="_blank" href="{{ route('schedule.index') }}">Открыть расписание ↗</a>
  </div>
 </div>
 <a class="btn-tech" href="{{ route('admin.schedule.create',['date'=>$date,'group_id'=>$groupId,'teacher_id'=>$teacherId]) }}">+ Добавить занятие</a>
</div>

@if(session('schedule_import_report'))
 @php($r=session('schedule_import_report'))
 <div class="glass-panel mb-4 schedule-import-report">
  <span class="eyebrow">IMPORT COMPLETE</span>
  <h3 class="mt-2">Расписание импортировано</h3>
  <div class="schedule-import-stats">
   <div><small>Формат</small><b>{{ $r['format'] ?: 'Ректор' }} {{ $r['format_version'] }}</b></div>
   <div><small>Период</small><b>{{ $r['period_from'] }} — {{ $r['period_to'] }}</b></div>
   <div><small>Группы</small><b>{{ $r['groups'] }}</b></div>
   <div><small>Преподаватели</small><b>{{ $r['teachers'] }}</b></div>
   <div><small>Создано занятий</small><b>{{ $r['created'] }}</b></div>
   <div><small>Обновлено</small><b>{{ $r['updated'] }}</b></div>
   <div><small>Пропущено</small><b>{{ $r['skipped'] }}</b></div>
  </div>
 </div>
@endif

<div class="glass-panel mb-4 schedule-import-panel">
 <div class="d-flex justify-content-between align-items-start gap-3 flex-wrap">
  <div>
   <span class="eyebrow">RECTOR XML</span>
   <h3 class="mt-2 mb-1">Импорт расписания</h3>
   <p class="text-secondary mb-0">Загрузите XML из «Ректор-Колледж» или «Ректор-ВУЗ». Формат определяется автоматически. Для колледжа 45-минутные часы при необходимости объединяются в пары, а для Rector-University используются готовые интервалы занятий из файла.</p>
  </div>
  <span class="schedule-import-badge">XML / WINDOWS-1251</span>
 </div>

 <form method="post" enctype="multipart/form-data" action="{{ route('admin.schedule.import-xml') }}" class="schedule-import-form mt-4">
  @csrf
  <div class="field">
   <label>XML-файл расписания</label>
   <input class="form-control" type="file" name="xml_file" accept=".xml,text/xml,application/xml" required>
   <small class="text-secondary">Поддерживаются Rector-College и Rector-University (Ректор-ВУЗ). Максимум 50 МБ.</small>
  </div>
  <div class="field">
   <label>Режим импорта</label>
   <select class="form-select" name="import_mode">
    <option value="merge">Обновить / добавить, не удаляя другие занятия</option>
    <option value="replace">Полностью заменить расписание импортируемых групп за период XML</option>
   </select>
  </div>
  <div class="schedule-import-action">
   <button class="btn-tech">Импортировать XML</button>
  </div>
 </form>
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