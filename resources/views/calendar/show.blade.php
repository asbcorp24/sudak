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

   @if($event->registration_enabled)
    <div class="event-registration-box">
     <span class="eyebrow">REGISTRATION</span><h2>Участие в мероприятии</h2>
     @if($event->registration_note)<p>{{ $event->registration_note }}</p>@endif
     <div class="event-registration-stats"><span><b>{{ $registrationCount }}</b> зарегистрировано</span>@if($event->capacity)<span><b>{{ max(0,$event->capacity-$registrationCount) }}</b> свободных мест</span>@endif @if($event->registration_deadline)<span>Запись до <b>{{ $event->registration_deadline->format('d.m.Y H:i') }}</b></span>@endif</div>
     @if($errors->has('event'))<div class="alert alert-danger">{{ $errors->first('event') }}</div>@endif
     @if(session('ok'))<div class="alert alert-success">{{ session('ok') }}</div>@endif

     @auth
      @if(auth()->user()->user_type==='student')
       @if($registration && $registration->status==='registered')
        <div class="event-registration-success">✓ Вы зарегистрированы на это мероприятие.</div>
        <form method="post" action="{{ route('student.events.unregister',$event) }}">@csrf @method('DELETE')<button class="btn-ghost">Отменить регистрацию</button></form>
       @elseif($event->registrationOpen())
        <form method="post" action="{{ route('student.events.register',$event) }}">@csrf<button class="btn-tech">Зарегистрироваться</button></form>
       @else
        <div class="event-registration-closed">Регистрация закрыта или свободных мест больше нет.</div>
       @endif
      @else
       <a class="btn-tech" href="{{ route('student.login',['redirect'=>url()->current()]) }}">Войти как студент</a>
      @endif
     @else
      <a class="btn-tech" href="{{ route('student.login',['redirect'=>url()->current()]) }}">Войти и зарегистрироваться</a>
     @endauth
    </div>
   @endif
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
