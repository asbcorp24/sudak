@extends('layouts.app')
@section('title',$homeSettings['seo_title'] ?? 'Зеленодольский судостроительный колледж — технологии будущего')
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