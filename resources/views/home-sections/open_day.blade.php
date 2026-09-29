<section class="home-open-day-section">
 <div class="container-xxl">
  <div class="home-open-day-card">
   <div class="home-open-day-date">
    @if($openDayDate)
     <b>{{ $openDayDate['day'] }}</b><span>{{ $openDayDate['month'] }}</span><small>{{ $openDayDate['year'] }}</small>
    @else
     <b>—</b><span>ДАТА</span><small>УТОЧНЯЕТСЯ</small>
    @endif
   </div>
   <div class="home-open-day-copy">
    <span class="eyebrow">OPEN DAY</span>
    <h2>{{ $openDayEvent?->title ?: ($homeSettings['home_open_day_title'] ?? 'Ближайший день открытых дверей') }}</h2>
    <p>{{ $openDayEvent?->excerpt ?: ($homeSettings['home_open_day_text'] ?? 'Познакомьтесь со специальностями, лабораториями, преподавателями и условиями поступления.') }}</p>
    @if($openDayEvent && !$openDayEvent->all_day)<strong>{{ $openDayEvent->starts_at->format('H:i') }}</strong>
    @elseif(!empty($homeSettings['home_open_day_time']))<strong>{{ $homeSettings['home_open_day_time'] }}</strong>@endif
   </div>
   <div class="home-open-day-actions">
    <a class="btn-tech" href="{{ route('admission.create') }}">Подать заявку</a>
    @if($openDayEvent)<a class="btn-ghost" href="{{ route('calendar.show',$openDayEvent->slug) }}">Подробнее</a>
    @else<a class="btn-ghost" href="{{ route('contacts.index') }}">Как добраться</a>@endif
   </div>
  </div>
 </div>
</section>