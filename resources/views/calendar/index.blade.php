@extends('layouts.app')
@section('title','Календарь колледжа — Зеленодольский судостроительный колледж')
@section('description','Олимпиады, дни открытых дверей, конкурсы, экзамены, мероприятия и важные дедлайны колледжа.')
@section('content')
<section class="page-hero compact calendar-hero">
 <div id="three-hero" class="three-layer" data-scene="network"></div>
 <div class="container-xxl position-relative"><span class="eyebrow">COLLEGE / CALENDAR</span><h1>Календарь колледжа</h1><p>Все важные даты учебного года в одном месте.</p></div>
</section>

<section class="college-calendar-section">
 <div class="container-xxl">
  <div class="calendar-toolbar">
   <div class="calendar-month-nav">
    <a href="{{ route('calendar.index',['month'=>$cursor->copy()->subMonth()->format('Y-m'),'type'=>$activeType]) }}">←</a>
    <div><small>{{ $cursor->format('Y') }}</small><b>{{ mb_strtoupper($cursor->translatedFormat('F')) }}</b></div>
    <a href="{{ route('calendar.index',['month'=>$cursor->copy()->addMonth()->format('Y-m'),'type'=>$activeType]) }}">→</a>
   </div>
   <div class="calendar-filters">
    <a class="{{ !$activeType?'active':'' }}" href="{{ route('calendar.index',['month'=>$cursor->format('Y-m')]) }}">Все</a>
    @foreach($types as $key=>$label)<a class="{{ $activeType===$key?'active':'' }}" href="{{ route('calendar.index',['month'=>$cursor->format('Y-m'),'type'=>$key]) }}">{{ $label }}</a>@endforeach
   </div>
  </div>

  <div class="calendar-grid">
   @foreach(['ПН','ВТ','СР','ЧТ','ПТ','СБ','ВС'] as $weekday)<div class="calendar-weekday">{{ $weekday }}</div>@endforeach
   @foreach($days as $day)
    @php($dayEvents=$eventsByDate->get($day->format('Y-m-d'),collect()))
    <div class="calendar-day {{ $day->month!==$cursor->month?'outside':'' }} {{ $day->isToday()?'today':'' }}">
     <div class="calendar-day-number"><span>{{ $day->day }}</span>@if($day->isToday())<small>СЕГОДНЯ</small>@endif</div>
     <div class="calendar-day-events">
      @foreach($dayEvents as $event)
       <a class="calendar-mini-event type-{{ $event->type }}" href="{{ route('calendar.show',$event->slug) }}"><small>{{ $event->all_day?'Весь день':$event->starts_at->format('H:i') }}</small><b>{{ $event->title }}</b></a>
      @endforeach
     </div>
    </div>
   @endforeach
  </div>

  <div class="calendar-list-head"><span class="eyebrow">EVENTS / {{ $cursor->format('m.Y') }}</span><h2>События месяца</h2></div>
  <div class="calendar-event-list">
   @forelse($events as $event)
    <a class="calendar-event-card" href="{{ route('calendar.show',$event->slug) }}">
     <div class="calendar-event-date"><b>{{ $event->starts_at->format('d') }}</b><span>{{ mb_strtoupper($event->starts_at->translatedFormat('M')) }}</span></div>
     <div class="calendar-event-main"><span class="calendar-type type-{{ $event->type }}">{{ $event->type_label }}</span><h3>{{ $event->title }}</h3><p>{{ $event->excerpt }}</p></div>
     <div class="calendar-event-meta">@if(!$event->all_day)<b>{{ $event->starts_at->format('H:i') }}</b>@else<b>Весь день</b>@endif @if($event->location)<small>{{ $event->location }}</small>@endif</div>
     <span class="calendar-event-arrow">↗</span>
    </a>
   @empty
    <div class="calendar-empty">В этом месяце опубликованных событий пока нет.</div>
   @endforelse
  </div>
 </div>
</section>
@endsection
