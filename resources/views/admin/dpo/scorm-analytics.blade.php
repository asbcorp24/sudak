@extends('admin.layout')
@section('heading','ДПО / SCORM аналитика / '.$group->name)
@section('content')
<div class="d-flex justify-content-between gap-2 flex-wrap mb-4"><a class="btn-ghost" href="{{ route('admin.dpo.groups.show',$group) }}">← {{ $group->name }}</a><span class="eyebrow">{{ $group->program->title }}</span></div>
<div class="glass-panel">
 <div class="table-responsive"><table class="table tech-table align-middle">
  <thead><tr><th>Слушатель</th><th>SCORM / урок</th><th>Попытка</th><th>Статусы</th><th>Балл</th><th>Время</th><th>Начало / завершение</th><th>Детали</th></tr></thead>
  <tbody>
  @forelse($attempts as $attempt)
   <tr>
    <td><b>{{ $attempt->user->name }}</b><br><small>{{ $attempt->user->email }}</small></td>
    <td><b>{{ $attempt->package->title }}</b><br><small>{{ $attempt->package->lesson->title }}</small></td>
    <td>#{{ $attempt->attempt_no }}</td>
    <td><small>lesson: {{ $attempt->lesson_status ?: '—' }}<br>completion: {{ $attempt->completion_status ?: '—' }}<br>success: {{ $attempt->success_status ?: '—' }}</small></td>
    <td>{{ $attempt->score_raw!==null?$attempt->score_raw:'—' }}@if($attempt->score_scaled!==null)<br><small>{{ round($attempt->score_scaled*100,1) }}%</small>@endif</td>
    <td><small>сессия: {{ $attempt->session_time ?: '—' }}<br>всего: {{ $attempt->total_time ?: '—' }}</small></td>
    <td><small>{{ $attempt->started_at?->format('d.m.Y H:i') ?: '—' }}<br>{{ $attempt->completed_at?->format('d.m.Y H:i') ?: '—' }}</small></td>
    <td><details><summary>CMI</summary><div style="max-width:360px;max-height:260px;overflow:auto">@foreach($attempt->values as $value)<div class="border-bottom py-1"><code>{{ $value->key }}</code><br><small>{{ IlluminateSupportStr::limit($value->value,180) }}</small></div>@endforeach</div></details></td>
   </tr>
  @empty <tr><td colspan="8">Попыток пока нет.</td></tr> @endforelse
  </tbody>
 </table></div>
</div>
<div class="mt-4">{{ $attempts->links() }}</div>
@endsection