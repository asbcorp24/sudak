@extends('admin.layout')
@section('heading','ДПО / Реестр документов')
@section('content')
<div class="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-4">
 <a class="btn-ghost" href="{{ route('admin.dpo.index') }}">← ДПО</a>
 <form class="d-flex gap-2"><input class="form-control" name="q" value="{{ request('q') }}" placeholder="ФИО, номер или код"><button class="btn-tech">Найти</button></form>
</div>
<div class="glass-panel">
 <div class="table-responsive">
  <table class="table tech-table align-middle">
   <thead><tr><th>Дата</th><th>Слушатель</th><th>Программа</th><th>Документ</th><th>Код проверки</th><th></th></tr></thead>
   <tbody>
    @forelse($documents as $document)
     <tr>
      <td>{{ $document->issued_at->format('d.m.Y') }}</td>
      <td><b>{{ $document->user->name }}</b><br><small>{{ $document->user->email }}</small></td>
      <td>{{ $document->program->title }}<br><small>{{ $document->hours }} ч. · {{ $document->group->name }}</small></td>
      <td>{{ $document->document_type }}<br><b>{{ trim(($document->series ?: '').' '.$document->number) }}</b></td>
      <td><code>{{ $document->verification_code }}</code></td>
      <td><a class="btn-ghost" target="_blank" href="{{ route('dpo.document.verify',$document->verification_code) }}">Проверить ↗</a></td>
     </tr>
    @empty
     <tr><td colspan="6">Выданных документов пока нет.</td></tr>
    @endforelse
   </tbody>
  </table>
 </div>
</div>
<div class="mt-4">{{ $documents->links() }}</div>
@endsection
