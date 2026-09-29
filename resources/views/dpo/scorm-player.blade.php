<!doctype html>
<html lang="ru"><head>
<meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>{{ $package->title }} — SCORM</title>
<meta name="csrf-token" content="{{ csrf_token() }}">
<style>
*{box-sizing:border-box}html,body{margin:0;width:100%;height:100%;overflow:hidden;font-family:Arial,sans-serif;background:#eef5ff;color:#0b2b55}
.scorm-shell{height:100%;display:grid;grid-template-rows:56px 1fr}.scorm-bar{display:flex;align-items:center;gap:14px;padding:0 16px;background:#fff;border-bottom:1px solid rgba(23,105,210,.18)}.scorm-bar b{font-size:14px}.scorm-bar small{color:#60758f}.scorm-bar a{margin-left:auto;padding:9px 13px;border:1px solid #1769d2;color:#1769d2;text-decoration:none;font-size:12px;font-weight:700}.scorm-frame{width:100%;height:100%;border:0;background:#fff}
</style>
</head><body>
<div class="scorm-shell">
 <header class="scorm-bar"><b>{{ $package->title }}</b><small>SCORM {{ $package->scorm_version }} · попытка {{ $attempt->attempt_no }}</small><a href="{{ route('dpo.lessons.show',[$group,$lesson]) }}">Закрыть</a></header>
 <iframe class="scorm-frame" src="{{ $launchUrl }}" allow="fullscreen; autoplay" referrerpolicy="same-origin"></iframe>
</div>
<script>
(()=>{
 const state=@json($values);
 const endpoint=@json(route('dpo.scorm.runtime',$attempt));
 const token=document.querySelector('meta[name="csrf-token"]').content;
 let lastError='0';
 let initialized=false;

 function post(finish=false){
  try{
   const xhr=new XMLHttpRequest();
   xhr.open('POST',endpoint,false);
   xhr.setRequestHeader('Content-Type','application/json');
   xhr.setRequestHeader('Accept','application/json');
   xhr.setRequestHeader('X-CSRF-TOKEN',token);
   xhr.send(JSON.stringify({values:state,finish}));
   if(xhr.status>=200&&xhr.status<300){lastError='0';return true;}
   lastError='101';return false;
  }catch(e){lastError='101';return false;}
 }
 function getValue(k){return Object.prototype.hasOwnProperty.call(state,k)?String(state[k]??''):'';}
 function setValue(k,v){state[k]=String(v??'');lastError='0';return 'true';}
 function errString(code){return code==='0'?'No error':'General exception';}

 @if($package->scorm_version==='1.2')
 window.API={
  LMSInitialize(){initialized=true;lastError='0';return 'true';},
  LMSFinish(){const ok=post(true);initialized=false;return ok?'true':'false';},
  LMSGetValue(k){lastError='0';return getValue(k);},
  LMSSetValue(k,v){return setValue(k,v);},
  LMSCommit(){return post(false)?'true':'false';},
  LMSGetLastError(){return lastError;},
  LMSGetErrorString(code){return errString(String(code));},
  LMSGetDiagnostic(code){return errString(String(code));}
 };
 @else
 window.API_1484_11={
  Initialize(){initialized=true;lastError='0';return 'true';},
  Terminate(){const ok=post(true);initialized=false;return ok?'true':'false';},
  GetValue(k){lastError='0';return getValue(k);},
  SetValue(k,v){return setValue(k,v);},
  Commit(){return post(false)?'true':'false';},
  GetLastError(){return lastError;},
  GetErrorString(code){return errString(String(code));},
  GetDiagnostic(code){return errString(String(code));}
 };
 @endif

 window.addEventListener('beforeunload',()=>{if(initialized)post(false);});
})();
</script>
</body></html>