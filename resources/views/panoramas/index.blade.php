@extends('layouts.app')
@section('title','Панорамы 360° — Зеленодольский судостроительный колледж')
@section('description','Виртуальные панорамы 360 градусов Зеленодольского судостроительного колледжа: учебные аудитории, мастерские и пространства колледжа.')

@push('head')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.7/build/pannellum.css">
@endpush

@section('content')
<style>
.pano360{--p-blue:#1769d2;--p-dark:#082f63;--p-line:#dbe8f7;color:#173653}
.pano360 .pano-hero{position:relative;overflow:hidden;background:linear-gradient(125deg,#071f3d 0%,#0b4f9f 60%,#1769d2 100%);color:#fff;padding:72px 0 62px}
.pano360 .pano-hero:before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 75% 50%,rgba(105,184,255,.28),transparent 30%),linear-gradient(rgba(255,255,255,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.04) 1px,transparent 1px);background-size:auto,42px 42px,42px 42px}
.pano360 .pano-hero .container-xxl{position:relative}.pano360 .pano-hero h1{font-size:clamp(36px,5vw,68px);line-height:.98;max-width:850px;margin:10px 0 18px}.pano360 .pano-hero p{max-width:700px;color:#d6e9ff;font-size:18px}
.pano360 .pano-badge{display:inline-flex;align-items:center;gap:8px;padding:7px 11px;border:1px solid rgba(255,255,255,.24);border-radius:999px;background:rgba(255,255,255,.08);font-size:12px;font-weight:800;letter-spacing:.08em}
.pano360 .pano-section{padding:54px 0 80px;background:#f6f9fd}.pano360 .pano-head{display:flex;justify-content:space-between;gap:20px;align-items:end;margin-bottom:22px}.pano360 .pano-head h2{color:var(--p-dark);font-size:30px;margin:0}.pano360 .pano-head p{color:#66809a;max-width:560px;margin:0}
.pano360 .pano-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:18px}
.pano360 .pano-card{border:1px solid var(--p-line);background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 14px 38px rgba(20,64,108,.07);transition:transform .2s ease,box-shadow .2s ease}.pano360 .pano-card:hover{transform:translateY(-3px);box-shadow:0 18px 46px rgba(20,64,108,.12)}
.pano360 .pano-thumb{height:285px;position:relative;overflow:hidden;background:#dce9f6;cursor:pointer}.pano360 .pano-thumb img{width:100%;height:100%;object-fit:cover;transition:transform .7s ease}.pano360 .pano-card:hover .pano-thumb img{transform:scale(1.025)}
.pano360 .pano-thumb:after{content:'';position:absolute;inset:auto 0 0;height:45%;background:linear-gradient(transparent,rgba(3,26,53,.64))}
.pano360 .pano-orbit{position:absolute;left:50%;top:50%;width:86px;height:86px;transform:translate(-50%,-50%);border:1px solid rgba(255,255,255,.8);border-radius:50%;z-index:2;display:grid;place-items:center;color:#fff;font-weight:900;font-size:22px;background:rgba(4,37,75,.25);backdrop-filter:blur(4px)}
.pano360 .pano-orbit:before,.pano360 .pano-orbit:after{content:'';position:absolute;border:1px solid rgba(255,255,255,.42);border-radius:50%}.pano360 .pano-orbit:before{width:116px;height:44px}.pano360 .pano-orbit:after{width:44px;height:116px}
.pano360 .pano-drag{position:absolute;left:16px;bottom:13px;z-index:3;color:#fff;font-size:12px;font-weight:750}.pano360 .pano-card-body{padding:17px 18px 19px}.pano360 .pano-location{font-size:11px;font-weight:850;color:var(--p-blue);text-transform:uppercase;letter-spacing:.08em}.pano360 .pano-card h3{font-size:19px;color:var(--p-dark);margin:5px 0 7px}.pano360 .pano-card p{font-size:14px;color:#69839d;margin:0 0 14px;min-height:40px}
.pano360 .pano-open{border:0;border-radius:11px;background:#edf5ff;color:var(--p-blue);font-weight:800;padding:9px 13px;cursor:pointer}.pano360 .pano-open:hover{background:var(--p-blue);color:#fff}
.pano-empty{grid-column:1/-1;background:#fff;border:1px dashed #bcd3eb;border-radius:18px;padding:36px;text-align:center;color:#6e879f}

.pano-viewer{position:fixed;inset:0;z-index:10050;background:#020914;display:none;color:#fff}.pano-viewer.open{display:block}
.pano-viewer .pannellum-stage{position:absolute;inset:0}
.pano-viewer .pannellum-stage .pnlm-container{width:100%;height:100%;background:#07192d}
.pano-viewer .pv-top{position:absolute;z-index:100;left:0;right:0;top:0;padding:18px 20px 54px;display:flex;justify-content:space-between;gap:15px;align-items:flex-start;background:linear-gradient(rgba(1,12,25,.78),transparent);pointer-events:none}
.pano-viewer .pv-title{pointer-events:auto;text-shadow:0 2px 10px #000}.pano-viewer .pv-title small{display:block;color:#a9c8e8;margin-bottom:3px}.pano-viewer .pv-title b{font-size:20px}
.pano-viewer .pv-close{pointer-events:auto;width:44px;height:44px;border-radius:12px;border:1px solid rgba(255,255,255,.28);background:rgba(3,27,53,.72);color:#fff;display:grid;place-items:center;font-size:24px;cursor:pointer;backdrop-filter:blur(7px)}
.pano-viewer .pv-close:hover{background:#1769d2}
.pano-viewer .pv-engine{position:absolute;z-index:90;right:18px;bottom:16px;background:rgba(3,27,53,.65);border:1px solid rgba(255,255,255,.18);border-radius:999px;padding:6px 10px;font-size:10px;letter-spacing:.08em;color:#b9d7f4;pointer-events:none}
.pano-viewer .pnlm-controls-container{z-index:110}.pano-viewer .pnlm-load-button{border-radius:12px}.pano-viewer .pnlm-about-msg{display:none!important}
@media(max-width:850px){.pano360 .pano-grid{grid-template-columns:1fr}.pano360 .pano-head{align-items:flex-start;flex-direction:column}.pano360 .pano-thumb{height:240px}.pano360 .pano-hero{padding:55px 0 48px}}
@media(max-width:560px){.pano-viewer .pv-top{padding:12px 12px 45px}.pano-viewer .pv-title b{font-size:16px}.pano-viewer .pv-engine{right:10px;bottom:10px}}
html.a11y-no-motion .pano360 .pano-card,html.a11y-no-motion .pano360 .pano-thumb img{transition:none!important}
</style>

<div class="pano360">
 <section class="pano-hero">
  <div class="container-xxl">
   <span class="pano-badge">◉ PANNELLUM / VIRTUAL TOUR / 360°</span>
   <h1>Колледж вокруг вас</h1>
   <p>Осмотрите учебные аудитории, лаборатории и мастерские в интерактивном формате. Перетаскивайте изображение мышью или пальцем и приближайте детали.</p>
  </div>
 </section>
 <section class="pano-section">
  <div class="container-xxl">
   <div class="pano-head"><div><span class="eyebrow">ПРОСТРАНСТВА КОЛЛЕДЖА</span><h2>Панорамы 360°</h2></div><p>Выберите пространство и откройте сферическую панораму на весь экран.</p></div>
   <div class="pano-grid">
    @forelse($panoramas as $panorama)
     <article class="pano-card">
      <div class="pano-thumb js-pano-open" role="button" tabindex="0"
       data-src="{{ $panorama->image_url }}" data-title="{{ $panorama->title }}"
       data-location="{{ $panorama->location }}" data-yaw="{{ $panorama->initial_yaw }}"
       data-pitch="{{ $panorama->initial_pitch }}">
       <img src="{{ $panorama->image_url }}" alt="{{ $panorama->title }}" loading="lazy">
       <span class="pano-orbit">360°</span><span class="pano-drag">↔ Нажмите и осмотритесь</span>
      </div>
      <div class="pano-card-body">
       @if($panorama->location)<span class="pano-location">{{ $panorama->location }}</span>@endif
       <h3>{{ $panorama->title }}</h3>
       <p>{{ $panorama->description ?: 'Интерактивная панорама пространства колледжа.' }}</p>
       <button class="pano-open js-pano-open" type="button"
        data-src="{{ $panorama->image_url }}" data-title="{{ $panorama->title }}"
        data-location="{{ $panorama->location }}" data-yaw="{{ $panorama->initial_yaw }}"
        data-pitch="{{ $panorama->initial_pitch }}">Открыть 360° →</button>
      </div>
     </article>
    @empty
     <div class="pano-empty">Панорамы готовятся к публикации.</div>
    @endforelse
   </div>
  </div>
 </section>
</div>

<div class="pano-viewer" id="panoViewer" aria-hidden="true">
 <div class="pannellum-stage" id="pannellumStage"></div>
 <div class="pv-top">
  <div class="pv-title"><small id="pvLocation"></small><b id="pvTitle">Панорама 360°</b></div>
  <button class="pv-close" type="button" id="pvClose" title="Закрыть" aria-label="Закрыть панораму">×</button>
 </div>
 <div class="pv-engine">PANNELLUM 2.5.7</div>
</div>

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.7/build/pannellum.js"></script>
<script>
(()=>{
 const modal=document.getElementById('panoViewer');
 const stage=document.getElementById('pannellumStage');
 const closeButton=document.getElementById('pvClose');
 if(!modal||!stage||typeof pannellum==='undefined')return;

 let viewer=null;

 function destroyViewer(){
  if(viewer&&typeof viewer.destroy==='function'){
   try{viewer.destroy();}catch(e){}
  }
  viewer=null;
  stage.innerHTML='';
 }

 function openPanorama(button){
  destroyViewer();

  document.getElementById('pvTitle').textContent=button.dataset.title||'Панорама 360°';
  document.getElementById('pvLocation').textContent=button.dataset.location||'';
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow='hidden';

  viewer=pannellum.viewer(stage,{
   type:'equirectangular',
   panorama:button.dataset.src,
   autoLoad:true,
   pitch:Number(button.dataset.pitch)||0,
   yaw:Number(button.dataset.yaw)||0,
   hfov:100,
   minHfov:35,
   maxHfov:120,
   showControls:true,
   showZoomCtrl:true,
   showFullscreenCtrl:true,
   keyboardZoom:true,
   mouseZoom:true,
   draggable:true,
   friction:0.16,
   touchPanSpeedCoeffFactor:1,
   orientationOnByDefault:false,
   escapeHTML:true,
   backgroundColor:[0.02,0.07,0.13]
  });
 }

 function closePanorama(){
  if(document.fullscreenElement){
   document.exitFullscreen().catch(()=>{});
  }
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow='';
  destroyViewer();
 }

 document.querySelectorAll('.js-pano-open').forEach(button=>{
  button.addEventListener('click',()=>openPanorama(button));
  button.addEventListener('keydown',event=>{
   if(event.key==='Enter'||event.key===' '){
    event.preventDefault();
    openPanorama(button);
   }
  });
 });

 closeButton.addEventListener('click',closePanorama);
 document.addEventListener('keydown',event=>{
  if(event.key==='Escape'&&modal.classList.contains('open')&&!document.fullscreenElement){
   closePanorama();
  }
 });
})();
</script>
@endpush
@endsection
