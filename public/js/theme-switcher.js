(()=>{
 const KEY='zsk-theme';
 const THEMES=['standard','light','dark','hitech','glamour','urban'];
 const read=()=>{
  try{
   const value=localStorage.getItem(KEY)||'standard';
   return THEMES.includes(value)?value:'standard';
  }catch(e){return 'standard';}
 };
 const apply=(theme,save=false)=>{
  const next=THEMES.includes(theme)?theme:'standard';
  document.documentElement.dataset.theme=next;
  if(save){try{localStorage.setItem(KEY,next);}catch(e){}}
  document.querySelectorAll('[data-theme-choice]').forEach(button=>{
   const active=button.dataset.themeChoice===next;
   button.setAttribute('aria-checked',String(active));
   button.classList.toggle('active',active);
  });
  const meta=document.querySelector('meta[name="theme-color"]');
  if(meta) meta.content={
   standard:'#1769d2',light:'#ffffff',dark:'#07131f',
   hitech:'#04141b',glamour:'#160d18',urban:'#202326'
  }[next]||'#1769d2';
  window.dispatchEvent(new CustomEvent('zsk:theme',{detail:{theme:next}}));
 };

 document.addEventListener('DOMContentLoaded',()=>{
  const panel=document.querySelector('[data-theme-panel]');
  const backdrop=document.querySelector('[data-theme-backdrop]');
  const launcher=document.querySelector('[data-theme-open]');
  if(!panel||!launcher) return;

  const open=()=>{
   panel.hidden=false;
   if(backdrop) backdrop.hidden=false;
   launcher.setAttribute('aria-expanded','true');
   document.documentElement.classList.add('theme-panel-open');
  };
  const close=()=>{
   panel.hidden=true;
   if(backdrop) backdrop.hidden=true;
   launcher.setAttribute('aria-expanded','false');
   document.documentElement.classList.remove('theme-panel-open');
  };

  apply(read(),false);
  launcher.addEventListener('click',open);
  document.querySelectorAll('[data-theme-close]').forEach(button=>button.addEventListener('click',close));
  backdrop?.addEventListener('click',close);
  document.querySelectorAll('[data-theme-choice]').forEach(button=>{
   button.addEventListener('click',()=>apply(button.dataset.themeChoice||'standard',true));
  });
  document.querySelectorAll('[data-theme-reset]').forEach(button=>{
   button.addEventListener('click',()=>{
    try{localStorage.removeItem(KEY);}catch(e){}
    apply('standard',false);
   });
  });
  document.addEventListener('keydown',event=>{
   if(event.key==='Escape'&&!panel.hidden) close();
  });
 });
})();