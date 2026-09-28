@extends('layouts.app')
@section('title','Зеленодольский судостроительный колледж — технологии будущего')
@section('content')
<section class="hero">
 <div id="three-hero" class="three-layer" data-scene="shipyard"></div>
 <div class="hero-grid"></div>
 <div class="container-xxl hero-content">
  <div class="hero-kicker reveal">ГАПОУ • Республика Татарстан</div>
  <h1 class="reveal">Строим корабли.<br><span>Проектируем будущее.</span></h1>
  <p class="hero-lead reveal">Колледж, где судостроение, машиностроение, электротехника и IT соединяются в единую инженерную среду.</p>
  <div class="d-flex flex-wrap gap-3 reveal"><a class="btn-tech" href="{{ route('specialties.index') }}">Выбрать специальность <span>↗</span></a><a class="btn-ghost" href="{{ route('pages.show','applicant') }}">Поступление 2026</a></div>
 </div>
 <div class="hero-stats"><div><b>{{ $students }}</b><span>студентов</span></div><div><b>{{ $teachers }}</b><span>преподавателя</span></div><div><b>6</b><span>направлений подготовки</span></div></div>
</section>
<section class="section-space"><div class="container-xxl">
 <div class="section-head"><div><span class="eyebrow">01 / ПРОФЕССИИ БУДУЩЕГО</span><h2>Выбери свою инженерную траекторию</h2></div><p>Каждая специальность — отдельная интерактивная 3D-среда и свой технологический маршрут.</p></div>
 <div class="spec-grid">@foreach($specialties as $s)<a href="{{ route('specialties.show',$s->slug) }}" class="spec-card" style="--accent:{{ $s->accent }}"><span class="spec-code">{{ $s->code }}</span><h3>{{ $s->title }}</h3><p>{{ $s->description }}</p><span class="spec-go">Исследовать направление →</span></a>@endforeach</div>
</div></section>
<section class="tech-band"><div class="container-xxl"><div class="row g-4 align-items-center"><div class="col-lg-7"><span class="eyebrow">02 / DIGITAL SHIPYARD</span><h2>Колледж как цифровая верфь</h2><p>Учебные лаборатории, промышленная практика, инженерное проектирование, сетевые технологии и контроль качества — в одной системе подготовки.</p></div><div class="col-lg-5"><div class="radar-panel"><div class="radar"></div><span>ENGINEERING SYSTEM / ONLINE</span></div></div></div></div></section>
<section class="section-space"><div class="container-xxl"><div class="section-head"><div><span class="eyebrow">03 / НОВОСТИ</span><h2>Жизнь колледжа</h2></div><a href="{{ route('news.index') }}">Все новости →</a></div><div class="row g-4">@foreach($news as $post)<div class="col-md-6 col-xl-4"><a class="news-card" href="{{ route('news.show',$post->slug) }}"><span>{{ optional($post->published_at)->format('d.m.Y') }}</span><h3>{{ $post->title }}</h3><p>{{ $post->excerpt }}</p></a></div>@endforeach</div></div></section>
@endsection