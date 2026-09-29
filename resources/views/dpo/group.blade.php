@extends('dpo.layout')
@section('title',$group->program->title.' — ДПО')
@section('content')
<section class="dpo-course-hero">
 <div class="container-xxl">
  <a class="dpo-breadcrumb" href="{{ route('dpo.dashboard') }}">← Моё обучение</a>
  <span class="eyebrow">{{ $group->program->code ?: 'ДПО' }} / {{ $group->name }}</span>
  <h1>{{ $group->program->title }}</h1>
  <p>{{ $group->program->description }}</p>
  <div class="dpo-course-meta"><span><b>{{ $group->program->hours }}</b> часов</span><span><b>{{ $group->program->modules->count() }}</b> модулей</span><span><b>{{ $group->teachers->count() }}</b> преподавателей</span></div>
 </div>
</section>

<section class="section-space">
 <div class="container-xxl">
  <div class="dpo-dashboard-grid">
   <div class="dpo-main-column">
    @foreach($group->program->modules as $module)
     <section class="dpo-module">
      <div class="dpo-module-head"><span class="eyebrow">MODULE {{ str_pad($loop->iteration,2,'0',STR_PAD_LEFT) }}</span><h2>{{ $module->title }}</h2>@if($module->description)<p>{{ $module->description }}</p>@endif</div>
      <div class="dpo-lesson-list">
       @foreach($module->lessons as $lesson)
        @php($lp=$progress->get($lesson->id))
        <a class="dpo-lesson-row {{ $lp?->status==='completed'?'completed':'' }}" href="{{ route('dpo.lessons.show',[$group,$lesson]) }}">
         <span class="dpo-lesson-state">{{ $lp?->status==='completed'?'✓':str_pad($loop->iteration,2,'0',STR_PAD_LEFT) }}</span>
         <div><h3>{{ $lesson->title }}</h3><p>{{ $lesson->description }}</p><small>{{ $lesson->duration_minutes }} мин@if($lesson->resources->count()) · {{ $lesson->resources->count() }} материалов@endif @if($lesson->assignments->count()) · домашнее задание@endif @if($lesson->scormPackages->count()) · SCORM@endif</small></div>
         <span>Открыть →</span>
        </a>
       @endforeach
      </div>
     </section>
    @endforeach
   </div>

   <aside class="dpo-side-column">
    @if($group->announcements->count())
     <div class="glass-panel">
      <span class="eyebrow">ANNOUNCEMENTS</span><h3 class="mt-2">Объявления</h3>
      @foreach($group->announcements->take(5) as $announcement)
       <article class="dpo-announcement"><b>{{ $announcement->title }}</b><p>{{ $announcement->body }}</p><small>{{ $announcement->published_at?->format('d.m.Y H:i') }}</small></article>
      @endforeach
     </div>
    @endif

    <div class="glass-panel {{ $group->announcements->count()?'mt-4':'' }}">
     <span class="eyebrow">NEXT</span><h3 class="mt-2">Ближайшие занятия</h3>
     @forelse($nextSchedule as $entry)
      <article class="dpo-next-class"><time>{{ $entry->starts_at->format('d.m H:i') }}</time><b>{{ $entry->title }}</b><small>{{ $entry->teacher?->name }}@if($entry->room) · {{ $entry->room }}@endif</small>@if($entry->online_url)<a target="_blank" rel="noopener" href="{{ $entry->online_url }}">Подключиться ↗</a>@endif</article>
     @empty
      <p class="text-secondary">Будущих занятий пока нет.</p>
     @endforelse
    </div>
   </aside>
  </div>
 </div>
</section>
@endsection