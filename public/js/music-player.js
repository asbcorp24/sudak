(()=>{
 const KEY='zsk-music-player';
 const fmt=s=>{
  if(!Number.isFinite(s))return '00:00';
  const m=Math.floor(s/60),sec=Math.floor(s%60);
  return String(m).padStart(2,'0')+':'+String(sec).padStart(2,'0');
 };
 const readState=()=>{
  try{return JSON.parse(localStorage.getItem(KEY)||'{}')||{};}catch(e){return {};}
 };
 const saveState=(data)=>{
  try{localStorage.setItem(KEY,JSON.stringify(data));}catch(e){}
 };

 document.addEventListener('DOMContentLoaded',()=>{
  const root=document.querySelector('[data-music-player]');
  if(!root)return;
  let playlist=[];
  try{playlist=JSON.parse(root.querySelector('[data-music-playlist]')?.textContent||'[]');}catch(e){}
  if(!Array.isArray(playlist)||!playlist.length){root.remove();return;}

  const audio=root.querySelector('[data-music-audio]');
  const title=root.querySelector('[data-music-title]');
  const artist=root.querySelector('[data-music-artist]');
  const play=root.querySelector('[data-music-play]');
  const prev=root.querySelector('[data-music-prev]');
  const next=root.querySelector('[data-music-next]');
  const progress=root.querySelector('[data-music-progress]');
  const fill=root.querySelector('[data-music-progress-fill]');
  const current=root.querySelector('[data-music-current]');
  const duration=root.querySelector('[data-music-duration]');
  const volume=root.querySelector('[data-music-volume]');
  const collapse=root.querySelector('[data-music-collapse]');

  const stored=readState();
  let index=Math.max(0,playlist.findIndex(t=>String(t.id)===String(stored.trackId)));
  if(index<0)index=0;
  let resumeTime=Number(stored.currentTime||0);
  let shouldResume=stored.playing===true;

  const persist=()=>{
   saveState({
    trackId:playlist[index]?.id,
    currentTime:Number(audio.currentTime||0),
    volume:Number(audio.volume||0.65),
    playing:!audio.paused,
    collapsed:root.classList.contains('is-collapsed')
   });
  };

  const renderTrack=()=>{
   const track=playlist[index];
   title.textContent=track.title||'Музыка колледжа';
   artist.textContent=track.artist||'ЗСК';
   if(audio.src!==new URL(track.url,location.href).href){
    audio.src=track.url;
    audio.load();
   }
  };

  const setPlaying=playing=>{
   root.classList.toggle('is-playing',playing);
   play.textContent=playing?'❚❚':'▶';
   play.setAttribute('aria-label',playing?'Пауза':'Воспроизвести');
  };

  const playCurrent=async()=>{
   try{
    await audio.play();
    setPlaying(true);
    persist();
   }catch(e){
    setPlaying(false);
    shouldResume=false;
   }
  };

  const change=delta=>{
   persist();
   index=(index+delta+playlist.length)%playlist.length;
   resumeTime=0;
   renderTrack();
   if(!audio.paused||shouldResume) playCurrent();
   else persist();
  };

  audio.volume=Math.max(0,Math.min(1,Number(stored.volume??0.65)));
  volume.value=audio.volume;
  root.classList.toggle('is-collapsed',stored.collapsed===true);
  renderTrack();

  audio.addEventListener('loadedmetadata',()=>{
   duration.textContent=fmt(audio.duration);
   if(resumeTime>0&&Number.isFinite(audio.duration)){
    audio.currentTime=Math.min(resumeTime,Math.max(0,audio.duration-.25));
    resumeTime=0;
   }
   if(shouldResume){
    shouldResume=false;
    playCurrent();
   }
  });
  audio.addEventListener('timeupdate',()=>{
   current.textContent=fmt(audio.currentTime);
   duration.textContent=fmt(audio.duration);
   if(audio.duration)fill.style.width=((audio.currentTime/audio.duration)*100)+'%';
  });
  audio.addEventListener('play',()=>setPlaying(true));
  audio.addEventListener('pause',()=>{setPlaying(false);persist();});
  audio.addEventListener('ended',()=>{index=(index+1)%playlist.length;resumeTime=0;renderTrack();playCurrent();});
  audio.addEventListener('error',()=>setPlaying(false));

  play.addEventListener('click',()=>audio.paused?playCurrent():audio.pause());
  prev.addEventListener('click',()=>change(-1));
  next.addEventListener('click',()=>change(1));
  progress.addEventListener('click',e=>{
   if(!audio.duration)return;
   const r=progress.getBoundingClientRect();
   audio.currentTime=Math.max(0,Math.min(audio.duration,((e.clientX-r.left)/r.width)*audio.duration));
   persist();
  });
  volume.addEventListener('input',()=>{audio.volume=Number(volume.value);persist();});
  collapse.addEventListener('click',()=>{
   root.classList.toggle('is-collapsed');
   collapse.textContent=root.classList.contains('is-collapsed')?'⌃':'⌄';
   persist();
  });

  window.addEventListener('pagehide',persist);
  window.addEventListener('beforeunload',persist);
  document.addEventListener('visibilitychange',()=>{if(document.hidden)persist();});
 }) ;
})();