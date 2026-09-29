@extends('dpo.layout')
@section('title','Расписание — ДПО')
@section('content')
<section class="dpo-dashboard-hero"><div class="container-xxl"><span class="eyebrow">ONLINE SCHEDULE</span><h1>Расписание</h1><p>Очные и онлайн-занятия по вашим группам ДПО.</p></div></section>
<section class="section-space"><div class="container-xxl">
 @forelse($entries as $date=>$dayEntries)
  <section class="dpo-schedule-day">
   <div class="dpo-schedule-date"><b>{{ IlluminateSupportCarbon::parse($date)->format('d') }}</b><span>{{ mb_strtoupper(IlluminateSupportCarbon::parse($date)->translatedFormat('F')) }}</span><small>{{ IlluminateSupportCarbon::parse($date)->translatedFormat('l') }}</small></div>
   <div class="dpo-schedule-list">
    @foreach($dayEntries as $entry)
     <article class="dpo-schedule-card">
      <time>{{ $entry->starts_at->format('H:i') }}–{{ $entry->ends_at->format('H:i') }}</time>
      <div><span class="eyebrow">{{ $entry->group->name }}</span><h3>{{ $entry->title }}</h3><p>{{ $entry->teacher?->name }}@if($entry->room) · {{ $entry->room }}@endif</p>@if($entry->notes)<small>{{ $entry->notes }}</small>@endif</div>
      <div class="dpo-schedule-actions">@if($entry->lesson)<a class="btn-ghost" href="{{ route('dpo.lessons.show',[$entry->group,$entry->lesson]) }}">Урок</a>@endif @if($entry->online_url)<a class="btn-tech" target="_blank" rel="noopener" href="{{ $entry->online_url }}">Подключиться ↗</a>@endif</div>
     </article>
    @endforeach
   </div>
  </section>
 @empty
  <div class="feedback-empty">В расписании пока нет предстоящих занятий.</div>
 @endforelse
</div></section>
@endsection