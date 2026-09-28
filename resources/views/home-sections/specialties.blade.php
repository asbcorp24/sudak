<section class="section-space"><div class="container-xxl">
 <div class="section-head">
  <div><span class="eyebrow">{{ $homeSettings['home_specialties_eyebrow'] ?? '01 / ПРОФЕССИИ БУДУЩЕГО' }}</span><h2>{{ $homeSettings['home_specialties_title'] ?? 'Выбери свою инженерную траекторию' }}</h2></div>
  <p>{{ $homeSettings['home_specialties_text'] ?? 'Каждая специальность — отдельная интерактивная 3D-среда и свой технологический маршрут.' }}</p>
 </div>
 <div class="spec-grid">
 @foreach($specialties as $s)
  <a href="{{ route('specialties.show',$s->slug) }}" class="spec-card" style="--accent:{{ $s->accent }}">
   <span class="spec-code">{{ $s->code }}</span>
   <h3>{{ $s->title }}</h3>
   <p>{{ $s->description }}</p>
   <span class="spec-go">Исследовать 3D-направление →</span>
  </a>
 @endforeach
 </div>
</div></section>