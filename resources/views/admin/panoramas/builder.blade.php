@extends('admin.layout')
@section('heading','Точки и переходы 360°')
@section('content')
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/pannellum@2.5.7/build/pannellum.css">
<style>
.hs-builder{--b:#1769d2;--d:#0b3f86;--line:#dbe8f7;color:#173653}
.hs-builder .hs-top{display:flex;justify-content:space-between;gap:14px;align-items:center;margin-bottom:16px}
.hs-builder .hs-top h2{font-size:20px;color:var(--d);margin:0}.hs-builder .hs-top p{margin:4px 0 0;color:#6b849c}
.hs-builder .hs-shell{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(330px,.65fr);gap:16px;align-items:start}
.hs-builder .hs-panel{background:#fff;border:1px solid var(--line);border-radius:18px;overflow:hidden;box-shadow:0 12px 32px rgba(23,72,120,.06)}
.hs-builder .hs-view{height:620px;position:relative;background:#07192d}.hs-builder #hotspotPanorama{width:100%;height:100%}
.hs-builder .hs-mode{position:absolute;z-index:30;left:16px;top:16px;background:rgba(5,36,72,.88);color:#fff;border:1px solid rgba(255,255,255,.25);border-radius:12px;padding:10px 13px;font-size:12px;pointer-events:none;display:none}.hs-builder .hs-mode.on{display:block}
.hs-builder .hs-side{padding:17px}.hs-builder .hs-side h3{font-size:16px;color:var(--d);margin:0 0 12px}.hs-builder label{font-size:11px;font-weight:850;color:#617c97;text-transform:uppercase;letter-spacing:.04em;margin-bottom:5px}
.hs-builder .form-control,.hs-builder .form-select{background:#fff!important;color:#173653!important;border:1px solid #cbdff3!important;border-radius:10px!important}
.hs-builder .hs-coords{display:grid;grid-template-columns:1fr 1fr 80px;gap:8px}.hs-builder .hs-help{background:#eef6ff;border:1px solid #d4e8ff;border-radius:12px;padding:11px 12px;font-size:12px;color:#526f8d;margin-bottom:14px}
.hs-builder .hs-place{width:100%;border:1px dashed #79aee8;background:#f3f8ff;color:var(--b);border-radius:11px;padding:10px;font-weight:800;margin:10px 0}.hs-builder .hs-place.active{background:#1769d2;color:#fff;border-style:solid}
.hs-builder .hs-list{margin-top:16px}.hs-item{background:#fff;border:1px solid var(--line);border-radius:15px;padding:14px;margin-bottom:10px}.hs-item-head{display:flex;justify-content:space-between;gap:10px;align-items:flex-start;margin-bottom:10px}.hs-kind{font-size:10px;font-weight:900;border-radius:999px;padding:4px 7px;background:#eaf3ff;color:#1769d2}.hs-kind.info{background:#eef8f2;color:#237a43}
.hs-item .hs-mini{font-size:11px;color:#7890a8}.hs-item-actions{display:flex;justify-content:space-between;gap:7px;align-items:center;margin-top:9px}.hs-delete{border:0;background:transparent;color:#b42318;font-weight:750}
.hs-builder .pnlm-about-msg{display:none!important}
@media(max-width:1050px){.hs-builder .hs-shell{grid-template-columns:1fr}.hs-builder .hs-view{height:500px}}
@media(max-width:600px){.hs-builder .hs-view{height:62vh;min-height:420px}.hs-builder .hs-coords{grid-template-columns:1fr 1fr}.hs-builder .hs-coords>div:last-child{grid-column:1/-1}}
</style>

<div class="hs-builder">
 <div class="hs-top">
  <div><a href="{{ route('admin.panoramas.index') }}" class="text-decoration-none">← Панорамы</a><h2>{{ $panorama->title }}</h2><p>Расставляйте информационные точки и переходы между помещениями прямо на сфере.</p></div>
  <a class="btn-ghost" target="_blank" href="{{ route('panoramas.index') }}">Проверить на сайте ↗</a>
 </div>

 <div class="hs-shell">
  <section class="hs-panel">
   <div class="hs-view">
    <div id="hotspotPanorama"></div>
    <div class="hs-mode" id="placementHint">◎ Нажмите на нужное место панорамы</div>
   </div>
  </section>

  <aside>
   <section class="hs-panel hs-side">
    <h3>Новая интерактивная точка</h3>
    <div class="hs-help">Сначала поверните панораму как нужно. Затем нажмите <b>«Указать место»</b> и кликните по объекту на панораме — координаты заполнятся автоматически. Pannellum использует pitch / yaw для точного размещения.</div>
    <form method="post" id="newHotspotForm" action="{{ route('admin.panoramas.hotspots.store',$panorama) }}">@csrf
     <div class="row g-2">
      <div class="col-12"><label>Тип точки</label><select class="form-select js-type" name="type"><option value="scene">Переход в другую панораму</option><option value="info">Информационная точка</option></select></div>
      <div class="col-12"><label>Название</label><input class="form-control" name="title" required placeholder="Например: Перейти в лабораторию"></div>
      <div class="col-12 js-target-wrap"><label>Куда перейти</label><select class="form-select" name="target_panorama_id"><option value="">Выберите панораму</option>@foreach($targets as $target)<option value="{{ $target->id }}">{{ $target->title }}{{ $target->is_published?'':' — не опубликована' }}</option>@endforeach</select></div>
      <div class="col-12"><label>Описание / подсказка</label><textarea class="form-control" rows="2" name="description" placeholder="Необязательно"></textarea></div>
     </div>
     <button class="hs-place js-place" type="button" data-form="newHotspotForm">◎ Указать место на панораме</button>
     <div class="hs-coords">
      <div><label>Pitch</label><input class="form-control js-pitch" type="number" step="0.001" min="-90" max="90" name="pitch" value="0" required></div>
      <div><label>Yaw</label><input class="form-control js-yaw" type="number" step="0.001" min="-180" max="180" name="yaw" value="0" required></div>
      <div><label>Порядок</label><input class="form-control" type="number" min="0" name="sort" value="0"></div>
     </div>
     <button class="btn-tech w-100 mt-3">Добавить точку</button>
    </form>
   </section>

   <div class="hs-list">
    @forelse($panorama->hotspots as $hotspot)
     <article class="hs-item">
      <div class="hs-item-head">
       <div><b>{{ $hotspot->title }}</b><div class="hs-mini">pitch {{ number_format($hotspot->pitch,2,'.','') }}° · yaw {{ number_format($hotspot->yaw,2,'.','') }}°</div></div>
       <span class="hs-kind {{ $hotspot->type==='info'?'info':'' }}">{{ $hotspot->type==='scene'?'ПЕРЕХОД':'ИНФО' }}</span>
      </div>
      <form method="post" id="hotspotForm{{ $hotspot->id }}" action="{{ route('admin.panoramas.hotspots.update',$hotspot) }}">@csrf @method('PUT')
       <div class="row g-2">
        <div class="col-5"><select class="form-select js-type" name="type"><option value="scene" @selected($hotspot->type==='scene')>Переход</option><option value="info" @selected($hotspot->type==='info')>Инфо</option></select></div>
        <div class="col-7"><input class="form-control" name="title" value="{{ $hotspot->title }}" required></div>
        <div class="col-12 js-target-wrap" @if($hotspot->type==='info') style="display:none" @endif><select class="form-select" name="target_panorama_id"><option value="">Куда перейти?</option>@foreach($targets as $target)<option value="{{ $target->id }}" @selected($hotspot->target_panorama_id===$target->id)>{{ $target->title }}{{ $target->is_published?'':' — не опубликована' }}</option>@endforeach</select></div>
        <div class="col-12"><textarea class="form-control" rows="2" name="description" placeholder="Описание">{{ $hotspot->description }}</textarea></div>
        <div class="col-4"><input class="form-control js-pitch" type="number" step="0.001" min="-90" max="90" name="pitch" value="{{ $hotspot->pitch }}" required></div>
        <div class="col-4"><input class="form-control js-yaw" type="number" step="0.001" min="-180" max="180" name="yaw" value="{{ $hotspot->yaw }}" required></div>
        <div class="col-4"><input class="form-control" type="number" min="0" name="sort" value="{{ $hotspot->sort }}"></div>
       </div>
       <div class="hs-item-actions">
        <button class="btn-ghost js-place" type="button" data-form="hotspotForm{{ $hotspot->id }}" data-hotspot="{{ $hotspot->id }}">◎ Переместить</button>
        <button class="btn-tech">Сохранить</button>
       </div>
      </form>
      <form method="post" class="text-end mt-1" action="{{ route('admin.panoramas.hotspots.destroy',$hotspot) }}" onsubmit="return confirm('Удалить эту точку?')">@csrf @method('DELETE')<button class="hs-delete">Удалить ×</button></form>
     </article>
    @empty
     <div class="hs-item text-secondary">Точек пока нет. Добавьте первую справа от панорамы.</div>
    @endforelse
   </div>
  </aside>
 </div>
</div>

@push('scripts')
<script src="https://cdn.jsdelivr.net/npm/pannellum@2.5.7/build/pannellum.js"></script>
<script>
(()=>{
 if(typeof pannellum==='undefined')return;
 const existing=@json($panorama->hotspots->map(fn($h)=>[
  'id'=>'hs-'.$h->id,
  'pitch'=>(float)$h->pitch,
  'yaw'=>(float)$h->yaw,
  'type'=>'info',
  'text'=>($h->type==='scene'?'Переход → ':'').$h->title,
 ]));
 const viewer=pannellum.viewer('hotspotPanorama',{
  type:'equirectangular',
  panorama:@json($panorama->image_url),
  autoLoad:true,
  pitch:{{ (float)$panorama->initial_pitch }},
  yaw:{{ (float)$panorama->initial_yaw }},
  hfov:100,
  minHfov:35,
  maxHfov:120,
  showControls:true,
  showFullscreenCtrl:true,
  mouseZoom:true,
  draggable:true,
  friction:.16,
  escapeHTML:true,
  hotSpots:existing
 });
 let placingForm=null,previewId='hs-preview';
 const hint=document.getElementById('placementHint');

 function setType(form){
  const type=form.querySelector('.js-type')?.value;
  const wrap=form.querySelector('.js-target-wrap');
  if(wrap)wrap.style.display=type==='scene'?'':'none';
 }
 document.querySelectorAll('form').forEach(form=>{
  const type=form.querySelector('.js-type');
  if(type){setType(form);type.addEventListener('change',()=>setType(form));}
 });
 document.querySelectorAll('.js-place').forEach(button=>button.addEventListener('click',()=>{
  placingForm=document.getElementById(button.dataset.form);
  document.querySelectorAll('.js-place').forEach(b=>b.classList.remove('active'));
  button.classList.add('active');
  hint.classList.add('on');
 }));
 viewer.on('mousedown',event=>{
  if(!placingForm)return;
  const coords=viewer.mouseEventToCoords(event);
  const pitch=Math.round(coords[0]*1000)/1000,yaw=Math.round(coords[1]*1000)/1000;
  placingForm.querySelector('.js-pitch').value=pitch;
  placingForm.querySelector('.js-yaw').value=yaw;
  try{viewer.removeHotSpot(previewId);}catch(e){}
  viewer.addHotSpot({id:previewId,pitch,yaw,type:'info',text:'Новая позиция'});
  document.querySelectorAll('.js-place').forEach(b=>b.classList.remove('active'));
  hint.classList.remove('on');
  placingForm=null;
 });
})();
</script>
@endpush
@endsection
