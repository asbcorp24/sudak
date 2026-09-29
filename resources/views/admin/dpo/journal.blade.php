@extends('admin.layout')
@section('heading','ДПО / Ведомость / '.$group->name)
@section('content')
<div class="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4 dpo-journal-actions">
 <a class="btn-ghost" href="{{ route('admin.dpo.groups.show',$group) }}">← К группе</a>
 <button type="button" class="btn-tech" onclick="window.print()">Печать ведомости</button>
</div>

<div class="glass-panel dpo-journal-sheet">
 <div class="dpo-journal-head">
  <span class="eyebrow">GROUP JOURNAL</span>
  <h2 class="mt-2 mb-1">Ведомость группы {{ $group->name }}</h2>
  <p class="text-secondary mb-0">{{ $group->program->title }} · {{ $group->program->hours }} ч.</p>
  <small>
   @if($group->starts_on){{ $group->starts_on->format('d.m.Y') }}@endif
   @if($group->ends_on) — {{ $group->ends_on->format('d.m.Y') }}@endif
   · уроков в программе: {{ $totalLessons }}
   · занятий в расписании: {{ $group->scheduleEntries->count() }}
  </small>
 </div>

 <div class="table-responsive mt-4">
  <table class="table tech-table align-middle dpo-journal-table">
   <thead>
    <tr>
     <th>#</th>
     <th>Слушатель</th>
     <th>Посещаемость</th>
     <th>Прогресс</th>
     <th>Домашние работы</th>
     <th>SCORM / iSpring</th>
    </tr>
   </thead>
   <tbody>
    @forelse($rows as $row)
     <tr>
      <td>{{ $loop->iteration }}</td>
      <td><b>{{ $row['enrollment']->user->name }}</b><br><small>{{ $row['enrollment']->user->email }}</small></td>
      <td>
       <b>{{ $row['attendance_percent'] }}%</b><br>
       <small>{{ $row['attended'] }}/{{ $row['marked'] }} посещено · {{ $row['absent'] }} пропусков@if($row['excused']) · {{ $row['excused'] }} уваж.@endif</small>
      </td>
      <td><b>{{ $row['progress_percent'] }}%</b><br><small>{{ $row['completed_lessons'] }} / {{ $row['total_lessons'] }} уроков</small></td>
      <td>
       @if($row['homework_percent']!==null)<b>{{ $row['homework_percent'] }}%</b><br><small>проверено: {{ $row['homework_count'] }}</small>
       @else <span>—</span><br><small>проверенных работ нет</small>@endif
      </td>
      <td>
       @if($row['scorm_percent']!==null)<b>{{ $row['scorm_percent'] }}%</b><br><small>пакетов: {{ $row['scorm_count'] }}</small>
       @else <span>—</span><br><small>результатов нет</small>@endif
      </td>
     </tr>
    @empty
     <tr><td colspan="6">В группе пока нет активных слушателей.</td></tr>
    @endforelse
   </tbody>
  </table>
 </div>
</div>
@endsection
