@extends('admin.layout')
@section('heading','ДПО / Посещаемость / '.$entry->group->name)
@section('content')
@if($entry->lesson?->lesson_type==='offline_practice')
<div class="alert alert-primary"><b>Офлайн-практика.</b> Статусы «Присутствовал» и «Опоздал» автоматически засчитывают этот урок слушателю как завершённый. При смене на «Отсутствовал» или «Уважительная причина» зачёт урока снимается.</div>
@endif
<div class="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
 <a class="btn-ghost" href="{{ route('admin.dpo.groups.show',$entry->group) }}">← К группе</a>
 <span class="dpo-status active">{{ $entry->starts_at->format('d.m.Y H:i') }}–{{ $entry->ends_at->format('H:i') }}</span>
</div>

<div class="glass-panel mb-4">
 <span class="eyebrow">ATTENDANCE</span>
 <h2 class="mt-2 mb-1">{{ $entry->title }}</h2>
 <p class="text-secondary mb-0">
  {{ $entry->group->program->title }} · {{ $entry->group->name }}
  @if($entry->teacher) · {{ $entry->teacher->name }} @endif
  @if($entry->room) · кабинет {{ $entry->room }} @endif
 </p>
</div>

<form method="post" action="{{ route('admin.dpo.attendance.update',$entry) }}" class="glass-panel admin-form">
 @csrf
 <div class="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-3">
  <div>
   <span class="eyebrow">GROUP JOURNAL</span>
   <h3 class="mt-2 mb-0">Журнал посещаемости</h3>
  </div>
  <button class="btn-tech">Сохранить посещаемость</button>
 </div>

 <div class="table-responsive">
  <table class="table tech-table align-middle dpo-attendance-table">
   <thead><tr><th>#</th><th>Слушатель</th><th>Статус</th><th>Примечание</th><th>Отмечено</th></tr></thead>
   <tbody>
    @forelse($students as $enrollment)
     @php($record=$attendance->get($enrollment->user_id))
     <tr>
      <td>{{ $loop->iteration }}</td>
      <td><b>{{ $enrollment->user->name }}</b><br><small>{{ $enrollment->user->email }}</small></td>
      <td style="min-width:190px">
       <select class="form-select" name="status[{{ $enrollment->user_id }}]">
        @foreach(['present'=>'Присутствовал','late'=>'Опоздал','absent'=>'Отсутствовал','excused'=>'Уважительная причина'] as $value=>$label)
         <option value="{{ $value }}" @selected(($record?->status ?? 'present')===$value)>{{ $label }}</option>
        @endforeach
       </select>
      </td>
      <td style="min-width:240px"><input class="form-control" name="note[{{ $enrollment->user_id }}]" value="{{ $record?->note }}" placeholder="Необязательно"></td>
      <td><small>@if($record?->marked_at){{ $record->marked_at->format('d.m.Y H:i') }}@if($record->marker)<br>{{ $record->marker->name }}@endif @else — @endif</small></td>
     </tr>
    @empty
     <tr><td colspan="5">В группе пока нет активных слушателей.</td></tr>
    @endforelse
   </tbody>
  </table>
 </div>

 @if($students->count())
  <div class="d-flex justify-content-end mt-3"><button class="btn-tech">Сохранить посещаемость</button></div>
 @endif
</form>
@endsection
