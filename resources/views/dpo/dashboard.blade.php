@extends('dpo.layout')
@section('title','Моё обучение — ДПО')
@section('content')
<section class="dpo-dashboard-hero">
 <div class="container-xxl">
  <span class="eyebrow">PERSONAL LEARNING SPACE</span>
  <h1>Моё обучение</h1>
  <p>{{ auth()->user()->name }}, здесь собраны ваши программы, расписание и текущие результаты.</p>
 </div>
</section>

<section class="section-space">
 <div class="container-xxl">
  <div class="dpo-dashboard-grid">
   <div class="dpo-main-column">
    <div class="section-head"><div><span class="eyebrow">COURSES</span><h2>Программы и группы</h2></div></div>
    <div class="dpo-course-grid">
     @forelse($enrollments as $enrollment)
      @php($p=$progress[$enrollment->group_id] ?? ['done'=>0,'total'=>0,'percent'=>0])
      <a class="dpo-course-card" href="{{ route('dpo.groups.show',$enrollment->group) }}">
       <div class="dpo-course-card-top"><span class="eyebrow">{{ $enrollment->group->program->code ?: 'ДПО' }}</span><span class="dpo-status active">{{ $enrollment->role==='teacher'?'Преподаватель':'Слушатель' }}</span></div>
       <h3>{{ $enrollment->group->program->title }}</h3>
       <p>{{ $enrollment->group->name }} · {{ $enrollment->group->program->hours }} ч.</p>
       @if($enrollment->role==='student')
        <div class="dpo-progress"><div><span style="width:{{ $p['percent'] }}%"></span></div><small>{{ $p['done'] }} из {{ $p['total'] }} уроков · {{ $p['percent'] }}%</small></div>
       @endif
       <strong>Открыть курс →</strong>
      </a>
     @empty
      <div class="feedback-empty">Вы пока не зачислены ни в одну группу ДПО.</div>
     @endforelse
    </div>

    @if($completedEnrollments->count())
     <div class="section-head mt-5"><div><span class="eyebrow">HISTORY</span><h2>Завершённые программы</h2></div></div>
     <div class="dpo-course-grid">
      @foreach($completedEnrollments as $enrollment)
       <div class="dpo-course-card">
        <div class="dpo-course-card-top"><span class="eyebrow">{{ $enrollment->group->program->code ?: 'ДПО' }}</span><span class="dpo-status completed">Завершено</span></div>
        <h3>{{ $enrollment->group->program->title }}</h3>
        <p>{{ $enrollment->group->name }} · {{ $enrollment->group->program->hours }} ч.</p>
        <strong>{{ $enrollment->completed_at?->format('d.m.Y') }}</strong>
       </div>
      @endforeach
     </div>
    @endif
   </div>

   <aside class="dpo-side-column">
    <div class="glass-panel">
     <span class="eyebrow">TODAY</span><h3 class="mt-2">Сегодня</h3>
     <div class="dpo-today-list">
      @forelse($todaySchedule as $entry)
       <article><time>{{ $entry->starts_at->format('H:i') }}</time><div><b>{{ $entry->title }}</b><small>{{ $entry->group->name }}@if($entry->teacher) · {{ $entry->teacher->name }}@endif</small>@if($entry->online_url)<a target="_blank" rel="noopener" href="{{ $entry->online_url }}">Подключиться ↗</a>@endif</div></article>
      @empty
       <p class="text-secondary">Сегодня занятий нет.</p>
      @endforelse
     </div>
     <a class="btn-ghost w-100 justify-content-center mt-3" href="{{ route('dpo.schedule') }}">Полное расписание</a>
    </div>

    @if($pendingSubmissions->count())
    <div class="glass-panel mt-4">
     <span class="eyebrow">HOMEWORK</span><h3 class="mt-2">Домашние работы</h3>
     @foreach($pendingSubmissions as $submission)
      <div class="dpo-mini-result"><b>{{ $submission->assignment->title }}</b><small>{{ $submission->group->name }} · {{ $submission->status==='returned'?'нужна доработка':'на проверке' }}</small></div>
     @endforeach
    </div>
    @endif
   </aside>
  </div>
  @if($issuedDocuments->count())
  <div class="glass-panel mt-4">
   <span class="eyebrow">DOCUMENTS</span><h3 class="mt-2">Мои документы ДПО</h3>
   <div class="dpo-admin-simple-list">
    @foreach($issuedDocuments as $document)
     <a target="_blank" href="{{ route('dpo.document.verify',$document->verification_code) }}">
      <span><b>{{ $document->document_type }} · {{ trim(($document->series ?: '').' '.$document->number) }}</b><small>{{ $document->program->title }} · {{ $document->issued_at->format('d.m.Y') }}</small></span>
      <span>Проверить ↗</span>
     </a>
    @endforeach
   </div>
  </div>
  @endif
 </div>
</section>
@endsection