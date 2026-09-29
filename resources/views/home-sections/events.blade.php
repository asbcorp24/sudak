<section class="home-events-section">
 <div class="container-xxl">
  <div class="section-head">
   <div><span class="eyebrow">CALENDAR / NEXT</span><h2>{{ $homeSettings['home_events_title'] ?? 'Ближайшие события' }}</h2></div>
   <a href="{{ route('calendar.index') }}">Весь календарь →</a>
  </div>
  <div class="home-events-grid">
   @forelse($upcomingEvents as $event)
    <a class="home-event-card {{ $event->is_featured?'featured':'' }}" href="{{ route('calendar.show',$event->slug) }}">
     <div class="home-event-date"><b>{{ $event->starts_at->format('d') }}</b><span>{{ mb_strtoupper($event->starts_at->translatedFormat('M')) }}</span><small>{{ $event->starts_at->format('Y') }}</small></div>
     <div class="home-event-content"><span class="calendar-type type-{{ $event->type }}">{{ $event->type_label }}</span><h3>{{ $event->title }}</h3><p>{{ $event->excerpt }}</p><div>@if(!$event->all_day)<b>{{ $event->starts_at->format('H:i') }}</b>@endif @if($event->location)<small>{{ $event->location }}</small>@endif</div></div>
     <span class="home-event-arrow">↗</span>
    </a>
   @empty
    <div class="calendar-empty">Ближайшие события появятся здесь после публикации в календаре.</div>
   @endforelse
  </div>
 </div>
</section>
