@extends('layouts.app')
@section('title','Панорамы 360° — Зеленодольский судостроительный колледж')
@section('description','Виртуальные панорамы 360 градусов Зеленодольского судостроительного колледжа: учебные аудитории, мастерские и пространства колледжа.')
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
.pano-viewer{position:fixed;inset:0;z-index:10050;background:#020914;display:none;color:#fff}.pano-viewer.open{display:block}.pano-viewer canvas{width:100%;height:100%;display:block;touch-action:none;cursor:grab}.pano-viewer canvas.dragging{cursor:grabbing}
.pano-viewer .pv-top{position:absolute;z-index:3;left:0;right:0;top:0;padding:18px 20px 44px;display:flex;justify-content:space-between;gap:15px;align-items:flex-start;background:linear-gradient(rgba(1,12,25,.82),transparent);pointer-events:none}.pano-viewer .pv-title{pointer-events:auto;text-shadow:0 2px 10px #000}.pano-viewer .pv-title small{display:block;color:#a9c8e8;margin-bottom:3px}.pano-viewer .pv-title b{font-size:20px}
.pano-viewer .pv-actions{display:flex;gap:7px;pointer-events:auto}.pano-viewer .pv-btn{width:42px;height:42px;border-radius:12px;border:1px solid rgba(255,255,255,.25);background:rgba(3,27,53,.65);color:#fff;display:grid;place-items:center;font-size:19px;cursor:pointer;backdrop-filter:blur(7px)}.pano-viewer .pv-btn:hover{background:#1769d2}
.pano-viewer .pv-bottom{position:absolute;z-index:3;bottom:20px;left:50%;transform:translateX(-50%);display:flex;gap:7px;background:rgba(3,27,53,.62);padding:7px;border:1px solid rgba(255,255,255,.2);border-radius:15px;backdrop-filter:blur(8px)}.pano-viewer .pv-bottom .pv-btn{background:transparent;border:0}
.pano-viewer .pv-loading{position:absolute;inset:0;display:grid;place-items:center;background:#07192d;z-index:2;font-weight:750;color:#bcd8f5}.pano-viewer.ready .pv-loading{display:none}
.pano-viewer .pv-hint{position:absolute;z-index:3;left:50%;top:50%;transform:translate(-50%,-50%);background:rgba(3,27,53,.7);border:1px solid rgba(255,255,255,.2);border-radius:14px;padding:10px 14px;font-size:13px;pointer-events:none;transition:opacity .5s}.pano-viewer.interacted .pv-hint{opacity:0}
@media(max-width:850px){.pano360 .pano-grid{grid-template-columns:1fr}.pano360 .pano-head{align-items:flex-start;flex-direction:column}.pano360 .pano-thumb{height:240px}.pano360 .pano-hero{padding:55px 0 48px}}
@media(max-width:560px){.pano-viewer .pv-top{padding:12px}.pano-viewer .pv-title b{font-size:16px}.pano-viewer .pv-actions .pv-btn:not(.pv-close){display:none}}
html.a11y-no-motion .pano360 .pano-card,html.a11y-no-motion .pano360 .pano-thumb img{transition:none!important}
</style>

<div class="pano360">
 <section class="pano-hero">
  <div class="container-xxl">
   <span class="pano-badge">◉ VIRTUAL TOUR / 360°</span>
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
 <canvas id="panoCanvas"></canvas>
 <div class="pv-loading">Загрузка панорамы…</div>
 <div class="pv-top">
  <div class="pv-title"><small id="pvLocation"></small><b id="pvTitle">Панорама 360°</b></div>
  <div class="pv-actions">
   <button class="pv-btn" type="button" id="pvReset" title="Исходный вид">⌂</button>
   <button class="pv-btn" type="button" id="pvFullscreen" title="На весь экран">⛶</button>
   <button class="pv-btn pv-close" type="button" id="pvClose" title="Закрыть">×</button>
  </div>
 </div>
 <div class="pv-hint">↔ Перетаскивайте для обзора · колесо — масштаб</div>
 <div class="pv-bottom"><button class="pv-btn" id="pvMinus" type="button" title="Отдалить">−</button><button class="pv-btn" id="pvPlus" type="button" title="Приблизить">＋</button></div>
</div>

@push('scripts')
<script>
(()=>{
 const viewer=document.getElementById('panoViewer'),canvas=document.getElementById('panoCanvas');
 if(!viewer||!canvas)return;
 const gl=canvas.getContext('webgl',{antialias:true,alpha:false});
 if(!gl){document.querySelectorAll('.js-pano-open').forEach(b=>b.disabled=true);return;}

 const vs=`attribute vec2 p;varying vec2 uv;void main(){uv=p*.5+.5;gl_Position=vec4(p,0.,1.);}`;
 const fs=`precision highp float;varying vec2 uv;uniform sampler2D tex;uniform float yaw,pitch,fov,aspect;
 const float PI=3.141592653589793;
 void main(){
  vec2 q=uv*2.-1.;q.y=-q.y;
  float t=tan(fov*.5);
  vec3 r=normalize(vec3(q.x*aspect*t,q.y*t,-1.));
  float cp=cos(pitch),sp=sin(pitch);r=vec3(r.x,r.y*cp-r.z*sp,r.y*sp+r.z*cp);
  float cy=cos(yaw),sy=sin(yaw);r=vec3(r.x*cy+r.z*sy,r.y,-r.x*sy+r.z*cy);
  float u=atan(r.x,-r.z)/(2.*PI)+.5;
  float v=asin(clamp(r.y,-1.,1.))/PI+.5;
  gl_FragColor=texture2D(tex,vec2(fract(u),v));
 }`;
 function shader(type,src){const s=gl.createShader(type);gl.shaderSource(s,src);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw new Error(gl.getShaderInfoLog(s));return s;}
 const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vs));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fs));gl.linkProgram(program);gl.useProgram(program);
 const buf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]),gl.STATIC_DRAW);
 const pos=gl.getAttribLocation(program,'p');gl.enableVertexAttribArray(pos);gl.vertexAttribPointer(pos,2,gl.FLOAT,false,0,0);
 const loc={yaw:gl.getUniformLocation(program,'yaw'),pitch:gl.getUniformLocation(program,'pitch'),fov:gl.getUniformLocation(program,'fov'),aspect:gl.getUniformLocation(program,'aspect')};
 const texture=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,texture);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL,true);

 let yaw=0,pitch=0,fov=75*Math.PI/180,startYaw=0,startPitch=0,drag=false,lastX=0,lastY=0,open=false,raf=0;
 const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
 function resize(){const dpr=Math.min(devicePixelRatio||1,2),w=Math.max(1,canvas.clientWidth),h=Math.max(1,canvas.clientHeight);const rw=Math.round(w*dpr),rh=Math.round(h*dpr);if(canvas.width!==rw||canvas.height!==rh){canvas.width=rw;canvas.height=rh;gl.viewport(0,0,rw,rh);}}
 function render(){if(!open)return;resize();gl.uniform1f(loc.yaw,yaw);gl.uniform1f(loc.pitch,pitch);gl.uniform1f(loc.fov,fov);gl.uniform1f(loc.aspect,canvas.width/canvas.height);gl.drawArrays(gl.TRIANGLES,0,6);raf=requestAnimationFrame(render);}
 function load(btn){
  viewer.classList.add('open');viewer.classList.remove('ready','interacted');viewer.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
  document.getElementById('pvTitle').textContent=btn.dataset.title||'Панорама 360°';document.getElementById('pvLocation').textContent=btn.dataset.location||'';
  startYaw=(Number(btn.dataset.yaw)||0)*Math.PI/180;startPitch=(Number(btn.dataset.pitch)||0)*Math.PI/180;yaw=startYaw;pitch=startPitch;fov=75*Math.PI/180;
  const img=new Image();img.onload=()=>{
   let source=img;
   const maxTexture=gl.getParameter(gl.MAX_TEXTURE_SIZE)||4096;
   if(img.width>maxTexture||img.height>maxTexture){
    const scale=Math.min(maxTexture/img.width,maxTexture/img.height),tmp=document.createElement('canvas');
    tmp.width=Math.max(1,Math.floor(img.width*scale));tmp.height=Math.max(1,Math.floor(img.height*scale));
    tmp.getContext('2d').drawImage(img,0,0,tmp.width,tmp.height);source=tmp;
   }
   gl.bindTexture(gl.TEXTURE_2D,texture);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,source);
   viewer.classList.add('ready');open=true;cancelAnimationFrame(raf);render();
  };img.onerror=()=>{viewer.querySelector('.pv-loading').textContent='Не удалось загрузить панораму';};img.src=btn.dataset.src;
 }
 function close(){open=false;cancelAnimationFrame(raf);viewer.classList.remove('open','ready','interacted');viewer.setAttribute('aria-hidden','true');document.body.style.overflow='';if(document.fullscreenElement)document.exitFullscreen().catch(()=>{});}
 function interact(){viewer.classList.add('interacted');}
 function down(x,y){drag=true;lastX=x;lastY=y;canvas.classList.add('dragging');interact();}
 function move(x,y){if(!drag)return;const sens=.004*(fov/(75*Math.PI/180));yaw-=(x-lastX)*sens;pitch=clamp(pitch+(y-lastY)*sens,-1.45,1.45);lastX=x;lastY=y;}
 function up(){drag=false;canvas.classList.remove('dragging');}
 canvas.addEventListener('pointerdown',e=>{canvas.setPointerCapture(e.pointerId);down(e.clientX,e.clientY);});
 canvas.addEventListener('pointermove',e=>move(e.clientX,e.clientY));canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);
 canvas.addEventListener('wheel',e=>{e.preventDefault();interact();fov=clamp(fov+e.deltaY*.0008,.45,1.65);},{passive:false});
 document.querySelectorAll('.js-pano-open').forEach(btn=>{btn.addEventListener('click',()=>load(btn));btn.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();load(btn);}});});
 document.getElementById('pvClose').addEventListener('click',close);
 document.getElementById('pvReset').addEventListener('click',()=>{yaw=startYaw;pitch=startPitch;fov=75*Math.PI/180;interact();});
 document.getElementById('pvPlus').addEventListener('click',()=>{fov=clamp(fov-.18,.45,1.65);interact();});
 document.getElementById('pvMinus').addEventListener('click',()=>{fov=clamp(fov+.18,.45,1.65);interact();});
 document.getElementById('pvFullscreen').addEventListener('click',()=>{if(!document.fullscreenElement)viewer.requestFullscreen?.();else document.exitFullscreen?.();interact();});
 document.addEventListener('keydown',e=>{if(!viewer.classList.contains('open'))return;if(e.key==='Escape')close();if(e.key==='ArrowLeft'){yaw+=.08;interact();}if(e.key==='ArrowRight'){yaw-=.08;interact();}if(e.key==='ArrowUp'){pitch=clamp(pitch+.06,-1.45,1.45);interact();}if(e.key==='ArrowDown'){pitch=clamp(pitch-.06,-1.45,1.45);interact();}});
})();
</script>
@endpush
@endsection
