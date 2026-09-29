@extends('layouts.app')
@section('title',$homeSettings['seo_title'] ?? 'Зеленодольский судостроительный колледж — технологии будущего')
@if($homePanorama)
@push('head')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.7/build/pannellum.css">
@endpush
@endif
@section('content')
<section class="hero">
 <div id="three-hero" class="three-layer hero-scene" data-scene="shipyard"></div>
 <div class="hero-grid"></div>

 <div class="hero-hud">
  <div><span>КОРАБЛЬ / STL</span><b>3D MODEL</b></div>
  <div><span>ДЛИНА × ШИРИНА</span><b>37,19 × 5,32 М</b></div>
  <div><span>ВЫСОТА</span><b>12,96 М</b></div>
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
  <div class="hero-interact reveal"><i></i> Перетаскивай 3D-корабль мышью · Ctrl + колесо — масштаб</div>
 </div>

 <div class="hero-stats">
  <div><b>{{ $students }}</b><span>студентов</span></div>
  <div><b>{{ $teachers }}</b><span>преподавателя</span></div>
  <div><b>{{ $specialties->count() }}</b><span>направлений подготовки</span></div>
 </div>
</section>

@include('home-persona')

<div class="home-personalized-sections" data-home-sections>
@foreach($homeSections as $section)
 <div class="home-section-slot" data-home-section="{{ $section }}">
  @includeIf('home-sections.'.$section)
 </div>
@endforeach
</div>

@if($homePanorama)
<section class="home-panorama-section" id="home-panorama">
 <style>
 .home-panorama-section{padding:78px 0 88px;background:linear-gradient(180deg,#f5f9fd 0%,#eaf3fb 100%);border-top:1px solid #dbe8f7}
 .home-panorama-section .hp-head{display:flex;justify-content:space-between;align-items:end;gap:24px;margin-bottom:22px}
 .home-panorama-section .hp-kicker{font-size:11px;font-weight:900;letter-spacing:.13em;color:#1769d2;margin-bottom:8px}
 .home-panorama-section h2{font-size:clamp(28px,4vw,46px);line-height:1.04;color:#082f63;margin:0}
 .home-panorama-section .hp-copy{max-width:520px;color:#647f99;margin:0}
 .home-panorama-section .hp-shell{position:relative;height:min(64vh,620px);min-height:430px;border-radius:24px;overflow:hidden;background:#07192d;box-shadow:0 22px 55px rgba(18,62,105,.16);border:1px solid #cbdff3}
 .home-panorama-section #homePannellum{width:100%;height:100%}
 .home-panorama-section .hp-label{position:absolute;z-index:20;left:18px;bottom:18px;max-width:min(520px,calc(100% - 36px));background:rgba(4,34,67,.76);border:1px solid rgba(255,255,255,.2);border-radius:15px;padding:11px 14px;color:#fff;backdrop-filter:blur(9px);pointer-events:none}
 .home-panorama-section .hp-label small{display:block;color:#acd0f3;font-size:10px;font-weight:850;letter-spacing:.08em;text-transform:uppercase}.home-panorama-section .hp-label b{display:block;font-size:16px;margin-top:2px}
 .home-panorama-section .hp-actions{display:flex;justify-content:center;margin-top:20px}.home-panorama-section .hp-all{display:inline-flex;align-items:center;gap:9px;padding:12px 17px;border-radius:12px;background:#1769d2;color:#fff;text-decoration:none;font-weight:800}.home-panorama-section .hp-all:hover{background:#0b4f9f;color:#fff}
 .home-panorama-section .pnlm-about-msg{display:none!important}
 @media(max-width:760px){.home-panorama-section{padding:54px 0 64px}.home-panorama-section .hp-head{align-items:flex-start;flex-direction:column}.home-panorama-section .hp-shell{height:58vh;min-height:390px;border-radius:18px}}
 </style>
 <div class="container-xxl">
  <div class="hp-head">
   <div><div class="hp-kicker">ВИРТУАЛЬНАЯ ЭКСКУРСИЯ / 360°</div><h2>Оглянитесь вокруг колледжа</h2></div>
   <p class="hp-copy">Откройте пространство в 360°. Перетаскивайте панораму мышью или пальцем, приближайте детали и используйте интерактивные точки.</p>
  </div>
  <div class="hp-shell">
   <div id="homePannellum"></div>
   <div class="hp-label">@if($homePanorama->location)<small>{{ $homePanorama->location }}</small>@endif<b>{{ $homePanorama->title }}</b></div>
  </div>
  <div class="hp-actions"><a class="hp-all" href="{{ route('panoramas.index') }}">Все панорамы 360° <span>→</span></a></div>
 </div>
</section>

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.7/build/pannellum.js"></script>
<script>
(()=>{
 const element=document.getElementById('homePannellum');
 if(!element||typeof pannellum==='undefined')return;
 let started=false;
 const start=()=>{
  if(started)return;started=true;
  pannellum.viewer(element,{
   type:'equirectangular',
   panorama:@json($homePanorama->image_url),
   autoLoad:true,
   pitch:{{ (float)$homePanorama->initial_pitch }},
   yaw:{{ (float)$homePanorama->initial_yaw }},
   hfov:105,
   minHfov:40,
   maxHfov:120,
   showControls:true,
   showZoomCtrl:true,
   showFullscreenCtrl:true,
   mouseZoom:true,
   draggable:true,
   friction:.16,
   escapeHTML:true,
   hotSpots:@json($homePanoramaHotspots)
  });
 };
 if('IntersectionObserver' in window){
  const observer=new IntersectionObserver(entries=>{
   if(entries.some(entry=>entry.isIntersecting)){start();observer.disconnect();}
  },{rootMargin:'500px 0px'});
  observer.observe(element);
 }else start();
})();
</script>
@endpush
@endif

<script>
(function(){
 const root=document.querySelector('[data-home-persona]');
 const sections=document.querySelector('[data-home-sections]');
 if(!root||!sections) return;

 const key='zsk-home-persona';
 const allowed=['applicant','student','parent','employee','dpo'];
 const meta={
  applicant:{
   eyebrow:'АБИТУРИЕНТ / ПОСТУПЛЕНИЕ',
   title:'Всё для поступления — в начале страницы',
   text:'Сначала покажем специальности, поступление, дни открытых дверей и ближайшие события.',
   order:['specialties','admission','open_day','events','news','achievements','tech','schedule','quick_actions']
  },
  student:{
   eyebrow:'СТУДЕНТ / УЧЁБА',
   title:'Учебный день без лишних поисков',
   text:'Сначала — расписание, события, новости и всё, что нужно действующему студенту.',
   order:['schedule','events','news','achievements','tech','specialties','quick_actions','open_day','admission']
  },
  parent:{
   eyebrow:'РОДИТЕЛЬ / ИНФОРМАЦИЯ',
   title:'Главное об учёбе и жизни колледжа',
   text:'В приоритете расписание, новости, события, достижения и информация о направлениях подготовки.',
   order:['schedule','news','events','achievements','specialties','tech','quick_actions','open_day','admission']
  },
  employee:{
   eyebrow:'СОТРУДНИК / РАБОТА',
   title:'Рабочая информация — первой',
   text:'Сначала покажем расписание, календарь, новости и текущие события колледжа.',
   order:['schedule','events','news','achievements','tech','specialties','quick_actions','open_day','admission']
  },
  dpo:{
   eyebrow:'ДПО / ОБУЧЕНИЕ',
   title:'Маршрут слушателя дополнительного образования',
   text:'Сначала — актуальные события, новости, расписание и полезная информация колледжа.',
   order:['events','news','schedule','tech','achievements','specialties','quick_actions','open_day','admission']
  }
 };
 const original=[...sections.querySelectorAll('[data-home-section]')];

 function reorder(order){
  const map=new Map(original.map(el=>[el.dataset.homeSection,el]));
  order.forEach(name=>{const el=map.get(name);if(el)sections.appendChild(el);});
  original.forEach(el=>{if(!order.includes(el.dataset.homeSection))sections.appendChild(el);});
 }

 function resetOrder(){
  original.forEach(el=>sections.appendChild(el));
 }

 function apply(persona,save){
  const valid=allowed.includes(persona);
  root.querySelectorAll('[data-persona]').forEach(btn=>{
   const active=valid&&btn.dataset.persona===persona;
   btn.classList.toggle('active',active);
   btn.setAttribute('aria-pressed',active?'true':'false');
  });
  root.querySelectorAll('[data-persona-panel]').forEach(panel=>{
   panel.hidden=!valid||panel.dataset.personaPanel!==persona;
  });
  const result=root.querySelector('[data-persona-result]');
  const reset=root.querySelector('[data-persona-reset]');
  if(!valid){
   if(result)result.hidden=true;
   if(reset)reset.hidden=true;
   resetOrder();
   if(save)try{localStorage.removeItem(key);}catch(e){}
   return;
  }
  const data=meta[persona];
  root.querySelector('[data-persona-eyebrow]').textContent=data.eyebrow;
  root.querySelector('[data-persona-title]').textContent=data.title;
  root.querySelector('[data-persona-text]').textContent=data.text;
  result.hidden=false;
  reset.hidden=false;
  reorder(data.order);
  document.documentElement.dataset.homePersona=persona;
  if(save)try{localStorage.setItem(key,persona);}catch(e){}
 }

 root.querySelectorAll('[data-persona]').forEach(btn=>btn.addEventListener('click',()=>{
  apply(btn.dataset.persona,true);
  root.querySelector('[data-persona-result]')?.scrollIntoView({behavior:'smooth',block:'nearest'});
 }));
 root.querySelector('[data-persona-reset]')?.addEventListener('click',()=>{
  delete document.documentElement.dataset.homePersona;
  apply('',true);
 });

 let saved='';
 try{saved=localStorage.getItem(key)||'';}catch(e){}
 const initial=allowed.includes(saved)?saved:(root.dataset.defaultPersona||'');
 if(initial)apply(initial,false);
})();
</script>
@endsection