<section class="section-space home-achievements-section">
 <div class="container-xxl">
  <div class="section-head">
   <div><span class="eyebrow">ACHIEVEMENTS</span><h2>{{ $homeSettings['home_achievements_title'] ?? 'Последние достижения' }}</h2></div>
   <a href="{{ route('competitions.index') }}">Все достижения →</a>
  </div>
  <div class="home-achievement-grid">
   @forelse($achievements as $achievement)
    @php($cover=$achievement->getMedia('cover')->first())
    <article class="home-achievement-card">
     @if($cover)<div class="home-achievement-cover"><img src="{{ $cover->url }}" alt="{{ $cover->alt ?: $achievement->title }}"></div>@endif
     <div class="home-achievement-content">
      <span class="eyebrow">{{ optional($achievement->awarded_at)->format('d.m.Y') }}</span>
      <h3>{{ $achievement->student_name ?: $achievement->title }}</h3>
      <strong>{{ $achievement->result ?: $achievement->title }}</strong>
      <p>{{ $achievement->competition?->title ?: $achievement->level }}</p>
     </div>
    </article>
   @empty
    <div class="home-empty-state"><h3>Достижения скоро появятся</h3><p>Раздел наполняется администрацией колледжа.</p></div>
   @endforelse
  </div>
 </div>
</section>