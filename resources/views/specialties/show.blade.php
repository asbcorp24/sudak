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
   <a class="btn-tech" href="{{ route('pages.show','applicant') }}">Как поступить <span>↗</span></a>
   <a class="btn-ghost" href="#specialty-tech">Изучить технологию ↓</a>
  </div>
 </div>

 <div class="specialty-meta">
  <div><small>СРОК ОБУЧЕНИЯ</small><b>{{ $specialty->duration }}</b></div>
  <div><small>КВАЛИФИКАЦИЯ</small><b>{{ $specialty->qualification }}</b></div>
  <div><small>БАЗА</small><b>{{ $specialty->admission_basis }}</b></div>
 </div>
</section>

<section class="specialty-tech-section" id="specialty-tech" style="--accent:{{ $specialty->accent }}">
 <div class="container-xxl">
  <div class="row g-5 align-items-start">
   <div class="col-lg-7">
    <span class="eyebrow">DIGITAL LAB / {{ strtoupper($specialty->scene_key) }}</span>
    <h2>{{ $meta[0] }}</h2>
    <p class="tech-intro">{{ $meta[1] }}</p>
    <div class="content-prose">{!! $specialty->details !!}</div>
    @include('partials.media-block',['items'=>$specialty->getMedia('content')])
   </div>
   <div class="col-lg-5">
    <div class="system-card">
     <div class="system-card-head"><span>INTERACTIVE MODEL</span><i></i></div>
     <div class="system-diagram">
      <div class="system-ring r1"></div>
      <div class="system-ring r2"></div>
      <div class="system-ring r3"></div>
      <strong>{{ strtoupper($specialty->scene_key) }}</strong>
     </div>
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
@endsection