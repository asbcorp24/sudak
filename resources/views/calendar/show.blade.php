@extends('layouts.app')
@section('title',$event->title.' — Календарь ЗСК')
@section('description',$event->excerpt)
@section('content')
<section class="page-hero compact calendar-event-hero">
 <div id="three-hero" class="three-layer" data-scene="blueprint"></div>
 <div class="container-xxl position-relative">
  <span class="calendar-type type-{{ $event->type }}">{{ $event->type_label }}</span>
  <h1>{{ $event->title }}</h1>
  <p>{{ $event->excerpt }}</p>
 </div>
</section>
<section class="calendar-detail-section"><div class="container-xxl">
 <div class="calendar-detail-grid">
  <article class="calendar-detail-content">
   <span class="eyebrow">О СОБЫТИИ</span>
   <div class="content-prose">{!! nl2br(e($event->description)) !!}</div>
   @if($event->external_url)<a class="btn-tech mt-4" href="{{ $event->external_url }}" target="_blank" rel="noopener">Перейти к материалам ↗</a>@endif
  </article>
  <aside class="calendar-detail-aside">
   <div><small>ДАТА</small><b>{{ $event->starts_at->translatedFormat('d F Y') }}</b></div>
   <div><small>ВРЕМЯ</small><b>{{ $event->all_day?'Весь день':$event->starts_at->format('H:i') }}</b>@if($event->ends_at)<span>до {{ $event->ends_at->translatedFormat('d.m.Y H:i') }}</span>@endif</div>
   @if($event->location)<div><small>МЕСТО</small><b>{{ $event->location }}</b></div>@endif
   <a class="btn-ghost" href="{{ route('calendar.index',['month'=>$event->starts_at->format('Y-m')]) }}">← В календарь</a>
  </aside>
 </div>
</div></section>
@endsection
