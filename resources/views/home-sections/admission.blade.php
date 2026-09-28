<section class="home-admission-section">
 <div class="container-xxl">
  <div class="home-admission-panel">
   <div>
    <span class="eyebrow">ADMISSION / 2026–2027</span>
    <h2>{{ $homeSettings['home_admission_title'] ?? 'Поступай в инженерный колледж' }}</h2>
    <p>{{ $homeSettings['home_admission_text'] ?? 'Выбери специальность, оставь заявку и получи консультацию приёмной комиссии по документам, срокам и условиям поступления.' }}</p>
   </div>
   <div class="home-admission-actions">
    <a class="btn-tech" href="{{ route('admission.create') }}">Подать заявку</a>
    <a class="btn-ghost" href="{{ route('pages.show','applicant') }}">Абитуриенту</a>
   </div>
  </div>
 </div>
</section>