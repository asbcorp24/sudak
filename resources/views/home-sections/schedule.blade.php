<section class="section-space home-schedule-section">
 <div class="container-xxl">
  <div class="section-head">
   <div><span class="eyebrow">TODAY / SCHEDULE</span><h2>{{ $homeSettings['home_schedule_title'] ?? 'Расписание на сегодня' }}</h2></div>
   <a href="{{ route('schedule.index') }}">Полное расписание →</a>
  </div>

  <div class="home-schedule-grid">
   @forelse($todaySchedule as $entry)
    <article class="home-lesson-card">
     <div class="home-lesson-time"><b>{{ substr($entry->starts_at,0,5) }}</b><span>{{ substr($entry->ends_at,0,5) }}</span></div>
     <div class="home-lesson-main">
      <small>{{ $entry->group->name }}@if($entry->room) · каб. {{ $entry->room }}@endif</small>
      <h3>{{ $entry->subject }}</h3>
      <p>{{ $entry->teacher?->full_name ?: 'Преподаватель не указан' }}</p>
     </div>
    </article>
   @empty
    <div class="home-empty-state">
     <span class="eyebrow">NO LESSONS</span>
     <h3>На сегодня занятий в опубликованном расписании нет</h3>
     <a class="btn-ghost" href="{{ route('schedule.index') }}">Открыть расписание</a>
    </div>
   @endforelse
  </div>
 </div>
</section>