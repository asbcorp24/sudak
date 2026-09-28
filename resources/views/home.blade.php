@extends('layouts.app')
@section('title',$homeSettings['seo_title'] ?? 'Зеленодольский судостроительный колледж — технологии будущего')
@section('content')
<section class="hero">
 <div id="three-hero" class="three-layer hero-scene" data-scene="shipyard"></div>
 <div class="hero-grid"></div>

 <div class="hero-hud">
  <div><span>SHIPYARD / 01</span><b>DIGITAL TWIN</b></div>
  <div><span>ENGINEERING CORE</span><b>ONLINE</b></div>
  <div><span>REALTIME 3D</span><b>THREE.JS</b></div>
 </div>

 <div class="hero-axis axis-x">X / 128.42</div>
 <div class="hero-axis axis-y">Y / 056.17</div>

 <div class="container-xxl hero-content">
  <div class="hero-kicker reveal">{{ $homeSettings['home_eyebrow'] ?? 'ГАПОУ • Республика Татарстан • Зеленодольск' }}</div>
  <h1 class="reveal">{{ $homeSettings['home_title_line1'] ?? 'Строим корабли.' }}<br><span>{{ $homeSettings['home_title_line2'] ?? 'Проектируем будущее.' }}</span></h1>
  <p class="hero-lead reveal">{{ $homeSettings['home_intro'] ?? 'Колледж, где судостроение, машиностроение, электротехника и IT соединяются в единую инженерную среду.' }}</p>
  <div class="d-flex flex-wrap gap-3 reveal">
   <a class="btn-tech" href="{{ route('specialties.index') }}">{{ $homeSettings['home_primary_button'] ?? 'Выбрать специальность' }} <span>↗</span></a>
   <a class="btn-ghost" href="{{ route('admission.create') }}">{{ $homeSettings['home_secondary_button'] ?? 'Поступление 2026' }}</a>
  </div>
  <div class="hero-interact reveal"><i></i> Перетаскивай цифровую верфь мышью</div>
 </div>

 <div class="hero-stats">
  <div><b>{{ $students }}</b><span>студентов</span></div>
  <div><b>{{ $teachers }}</b><span>преподавателя</span></div>
  <div><b>{{ $specialties->count() }}</b><span>направлений подготовки</span></div>
 </div>
</section>

@foreach($homeSections as $section)
 @includeIf('home-sections.'.$section)
@endforeach
@endsection