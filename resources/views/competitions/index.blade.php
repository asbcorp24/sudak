@extends('layouts.app')
@section('title','Конкурсы и достижения — Зеленодольский судостроительный колледж')
@section('description','Конкурсы, олимпиады, профессиональные соревнования и достижения студентов Зеленодольского судостроительного колледжа.')
@section('content')
<section class="page-hero compact activity-hero">
 <div id="three-hero" class="three-layer" data-scene="quality"></div>
 <div class="container-xxl position-relative">
  <span class="eyebrow">COMPETITIONS / ACHIEVEMENTS</span>
  <h1>Конкурсы и достижения</h1>
  <p>Профессиональные соревнования, олимпиады, чемпионаты, отраслевые проекты и результаты студентов колледжа.</p>
 </div>
</section>

<section class="section-space competition-public-section">
 <div class="container-xxl">
  <div class="section-head"><div><span class="eyebrow">OPEN CALLS</span><h2>Конкурсы</h2></div><p>Актуальные конкурсы и мероприятия, опубликованные администрацией колледжа.</p></div>
  <div class="competition-grid">
   @forelse($competitions as $competition)
    @php($cover=$competition->getMedia('cover')->first())
    <article class="competition-public-card">
     @if($cover)<div class="competition-cover"><img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $competition->title }}"></div>@endif
     <div class="competition-card-top">
      <span>{{ str_pad($loop->iteration,2,'0',STR_PAD_LEFT) }}</span>
      <small>{{ optional($competition->starts_on)->format('d.m.Y') }}@if($competition->ends_on) → {{ $competition->ends_on->format('d.m.Y') }}@endif</small>
     </div>
     <div class="competition-card-body">
      <span class="eyebrow">{{ $competition->organizer ?: 'Конкурс' }}</span>
      <h3>{{ $competition->title }}</h3>
      <p>{{ $competition->description }}</p>
      <div class="competition-meta">
       @if($competition->location)<span>⌖ {{ $competition->location }}</span>@endif
      </div>
      @if($competition->url)<a class="btn-ghost" target="_blank" rel="noopener" href="{{ $competition->url }}">Подробнее ↗</a>@endif
     </div>
    </article>
   @empty
    <div class="feedback-empty">Открытых конкурсов пока нет.</div>
   @endforelse
  </div>
 </div>
</section>

<section class="section-space achievements-public-section">
 <div class="container-xxl">
  <div class="section-head"><div><span class="eyebrow">HALL OF FAME</span><h2>Наши достижения</h2></div><p>Победы, дипломы, финалы и профессиональные результаты студентов колледжа.</p></div>
  <div class="achievement-grid">
   @forelse($achievements as $achievement)
    @php($cover=$achievement->getMedia('cover')->first())
    <article class="achievement-card">
     <div class="achievement-medal">★</div>
     @if($cover)<div class="achievement-cover"><img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $achievement->title }}"></div>@endif
     <div>
      <small>{{ optional($achievement->awarded_at)->format('d.m.Y') }}</small>
      <h3>{{ $achievement->student_name ?: $achievement->title }}</h3>
      <strong>{{ $achievement->result ?: $achievement->title }}</strong>
      <p>{{ $achievement->competition?->title ?: $achievement->level }}</p>
      @if($achievement->description)<div class="text-secondary">{{ $achievement->description }}</div>@endif
     </div>
    </article>
   @empty
    <div class="feedback-empty">Опубликованных достижений пока нет.</div>
   @endforelse
  </div>
 </div>
</section>
@endsection