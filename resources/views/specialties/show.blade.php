@extends('layouts.app')
@section('title',$specialty->code.' '.$specialty->title.' — ЗСК')
@section('description',$specialty->description)
@section('content')
@php
$sceneMeta=[
 'shipbuilding'=>['СУДОСТРОИТЕЛЬНЫЙ КОРПУС','Интерактивная сборка корпуса, шпангоутов, палубы, киля и носовой секции.'],
 'engine'=>['СУДОВОЙ ДВИГАТЕЛЬ','Кривошипно-шатунная схема, цилиндры, поршни, вал и маховик в движении.'],
 'electro'=>['ЭЛЕКТРОЭНЕРГЕТИКА','Потоки энергии, силовые шины, трансформаторные узлы и электрические импульсы.'],
 'network'=>['СЕРВЕРНЫЙ КЛАСТЕР','Стойки, серверные модули, узлы сети и визуализация передачи пакетов.'],
 'cnc'=>['ЦИФРОВОЙ CNC','Портальная система, шпиндель, инструмент, заготовка и имитация обработки.'],
 'quality'=>['ЛАЗЕРНАЯ МЕТРОЛОГИЯ','3D-сканирование детали, облако точек и цифровой контроль геометрии.'],
];
$meta=$sceneMeta[$specialty->scene_key] ?? ['DIGITAL ENGINEERING','Интерактивная инженерная сцена направления.'];
$specialtyCover=$specialty->getMedia('cover')->first();
@endphp

<section class="specialty-hero" style="--accent:{{ $specialty->accent }}">
 <div id="three-hero" class="three-layer specialty-scene" data-scene="{{ $specialty->scene_key }}" data-accent="{{ $specialty->accent }}"></div>
 <div class="scanline"></div>
 <div class="scene-hud">
  <div class="scene-hud-status"><i></i><span>3D SYSTEM ONLINE</span></div>
  <div class="scene-hud-name">{{ $meta[0] }}</div>
  <div class="scene-hud-tip">Перетаскивай модель · колесо — масштаб</div>
 </div>
 <div class="scene-controls" aria-label="Управление 3D-сценой">
  <button type="button" data-scene-action="explode"><b>01</b><span>Разобрать</span></button>
  <button type="button" data-scene-action="pause"><b>02</b><span>Пауза</span></button>
  <button type="button" data-scene-action="reset"><b>03</b><span>Сброс</span></button>
 </div>
 <div class="container-xxl specialty-copy">
  <span class="spec-code big">{{ $specialty->code }}</span>
  <h1>{{ $specialty->title }}</h1>
  <p>{{ $specialty->description }}</p>
  <div class="d-flex flex-wrap gap-3">
   <a class="btn-tech" href="{{ route('admission.create',['specialty'=>$specialty->id]) }}">Подать заявление <span>↗</span></a>
   <a class="btn-ghost" href="#specialty-program">О специальности ↓</a>
  </div>
 </div>
 <div class="specialty-meta">
  <div><small>СРОК ОБУЧЕНИЯ</small><b>{{ $specialty->duration ?: 'Уточняется' }}</b></div>
  <div><small>КВАЛИФИКАЦИЯ</small><b>{{ $specialty->qualification ?: 'Уточняется' }}</b></div>
  <div><small>БАЗА</small><b>{{ $specialty->admission_basis ?: 'Уточняется' }}</b></div>
 </div>
</section>

<section class="specialty-program" id="specialty-program" style="--accent:{{ $specialty->accent }}">
 <div class="container-xxl">
  <div class="specialty-section-head">
   <span class="eyebrow">ОБРАЗОВАТЕЛЬНАЯ ТРАЕКТОРИЯ</span>
   <h2>Что ждёт студента</h2>
   <p>Навыки, дисциплины, практика и реальные профессиональные направления после выпуска.</p>
  </div>
  @if(!empty($specialty->learning_outcomes) || !empty($specialty->disciplines))
  <div class="specialty-info-grid">
   @if(!empty($specialty->learning_outcomes))
   <article class="specialty-info-card specialty-info-card-accent">
    <span class="specialty-card-no">01</span><h3>Чему научишься</h3>
    <ul>@foreach($specialty->learning_outcomes as $item)<li>{{ $item }}</li>@endforeach</ul>
   </article>
   @endif
   @if(!empty($specialty->disciplines))
   <article class="specialty-info-card">
    <span class="specialty-card-no">02</span><h3>Основные дисциплины</h3>
    <div class="specialty-tags">@foreach($specialty->disciplines as $item)<span>{{ $item }}</span>@endforeach</div>
   </article>
   @endif
  </div>
  @endif
  @if($specialty->practice || !empty($specialty->professions))
  <div class="specialty-info-grid specialty-info-grid-secondary">
   @if($specialty->practice)
   <article class="specialty-info-card">
    <span class="specialty-card-no">03</span><h3>Практика</h3><p>{!! nl2br(e($specialty->practice)) !!}</p>
   </article>
   @endif
   @if(!empty($specialty->professions))
   <article class="specialty-info-card specialty-career-card">
    <span class="specialty-card-no">04</span><h3>Кем можно работать</h3>
    <ul>@foreach($specialty->professions as $item)<li>{{ $item }}</li>@endforeach</ul>
   </article>
   @endif
  </div>
  @endif
 </div>
</section>

<section class="specialty-tech-section" id="specialty-tech" style="--accent:{{ $specialty->accent }}">
 <div class="container-xxl">
  <div class="row g-5 align-items-start">
   <div class="col-lg-7">
    <span class="eyebrow">DIGITAL LAB / {{ strtoupper($specialty->scene_key) }}</span>
    <h2>{{ $meta[0] }}</h2>
    <p class="tech-intro">{{ $meta[1] }}</p>
    @if($specialtyCover)<div class="specialty-cover"><img src="{{ $specialtyCover->url }}" alt="{{ $specialtyCover->alt ?: $specialty->title }}"></div>@endif
    <div class="content-prose">{!! $specialty->details !!}</div>
    @include('partials.media-block',['items'=>$specialty->getMedia('content')])
   </div>
   <div class="col-lg-5">
    <div class="system-card">
     <div class="system-card-head"><span>INTERACTIVE MODEL</span><i></i></div>
     <div class="system-diagram"><div class="system-ring r1"></div><div class="system-ring r2"></div><div class="system-ring r3"></div><strong>{{ strtoupper($specialty->scene_key) }}</strong></div>
     <div class="system-list">
      <div><span>01</span><b>Вращение</b><small>мышь / touch</small></div>
      <div><span>02</span><b>Масштаб</b><small>колесо мыши</small></div>
      <div><span>03</span><b>Разборка</b><small>интерактивный режим</small></div>
     </div>
    </div>
   </div>
  </div>
 </div>
</section>

@if($specialty->teachers->isNotEmpty())
<section class="specialty-people-section" style="--accent:{{ $specialty->accent }}">
 <div class="container-xxl">
  <div class="specialty-section-head"><span class="eyebrow">ПРЕПОДАВАТЕЛИ</span><h2>Кто будет учить</h2><p>Преподаватели, связанные с этой специальностью.</p></div>
  <div class="specialty-teachers-grid">
   @foreach($specialty->teachers as $teacher)
    @php($photo=$teacher->getMedia('photo')->first())
    <article class="specialty-teacher-card">
     <div class="specialty-teacher-photo">@if($photo)<img src="{{ $photo->url }}" alt="{{ $photo->alt ?: $teacher->full_name }}">@else<span>{{ mb_substr($teacher->full_name,0,1) }}</span>@endif</div>
     <div><span class="eyebrow">ПРЕПОДАВАТЕЛЬ</span><h3>{{ $teacher->full_name }}</h3>@if($teacher->position)<p>{{ $teacher->position }}</p>@endif @if($teacher->disciplines)<small>{{ $teacher->disciplines }}</small>@endif</div>
    </article>
   @endforeach
  </div>
 </div>
</section>
@endif

@if(!empty($specialty->student_projects))
<section class="specialty-projects-section" style="--accent:{{ $specialty->accent }}">
 <div class="container-xxl">
  <div class="specialty-section-head"><span class="eyebrow">СТУДЕНЧЕСКОЕ ПОРТФОЛИО</span><h2>Проекты студентов</h2><p>Работы, в которых знания превращаются в реальные инженерные и цифровые решения.</p></div>
  <div class="specialty-projects-grid">
   @foreach($specialty->student_projects as $project)
    <article class="specialty-project-card">
     <span>{{ str_pad($loop->iteration,2,'0',STR_PAD_LEFT) }}</span>
     <h3>{{ $project['title'] ?? '' }}</h3>
     @if(!empty($project['description']))<p>{{ $project['description'] }}</p>@endif
     @if(!empty($project['url']))<a href="{{ $project['url'] }}" target="_blank" rel="noopener">Открыть проект ↗</a>@endif
    </article>
   @endforeach
  </div>
 </div>
</section>
@endif

@if(!empty($specialty->partners))
<section class="specialty-partners-section" style="--accent:{{ $specialty->accent }}">
 <div class="container-xxl">
  <div class="specialty-section-head"><span class="eyebrow">ИНДУСТРИЯ</span><h2>Предприятия-партнёры</h2><p>Организации, связанные с практикой, производством и профессиональной подготовкой направления.</p></div>
  <div class="specialty-partners-grid">@foreach($specialty->partners as $partner)<div><span>{{ str_pad($loop->iteration,2,'0',STR_PAD_LEFT) }}</span><b>{{ $partner }}</b></div>@endforeach</div>
 </div>
</section>
@endif

<section class="specialty-apply-section" style="--accent:{{ $specialty->accent }}">
 <div class="container-xxl">
  <div class="specialty-apply-card">
   <div><span class="eyebrow">ПРИЁМНАЯ КАМПАНИЯ</span><h2>Хочешь учиться по этой специальности?</h2><p>Оставь короткую заявку — выбранное направление уже будет отмечено в форме поступления.</p></div>
   <a class="btn-tech" href="{{ route('admission.create',['specialty'=>$specialty->id]) }}">Подать заявление <span>↗</span></a>
  </div>
 </div>
</section>
@endsection