import 'bootstrap';
import { gsap } from 'gsap';
import './scenes';

const A11Y_KEY='zsk-a11y';
const A11Y_DEFAULTS={
  font:'normal',
  contrast:false,
  grayscale:false,
  spacing:false,
  images:false,
  motion:false
};

let deferredInstallPrompt=null;
let a11yState=readAccessibility();

function readAccessibility(){
  try{
    return {...A11Y_DEFAULTS,...JSON.parse(localStorage.getItem(A11Y_KEY)||'{}')};
  }catch(e){
    return {...A11Y_DEFAULTS};
  }
}

function saveAccessibility(){
  try{localStorage.setItem(A11Y_KEY,JSON.stringify(a11yState));}catch(e){}
}

function applyAccessibility(sync=true){
  const root=document.documentElement;
  root.dataset.a11yFont=a11yState.font||'normal';
  root.classList.toggle('a11y-high-contrast',!!a11yState.contrast);
  root.classList.toggle('a11y-grayscale',!!a11yState.grayscale);
  root.classList.toggle('a11y-wide-spacing',!!a11yState.spacing);
  root.classList.toggle('a11y-hide-images',!!a11yState.images);
  root.classList.toggle('a11y-no-motion',!!a11yState.motion);

  gsap.globalTimeline.paused(!!a11yState.motion);

  if(sync){
    document.querySelectorAll('[data-a11y-font]').forEach(button=>{
      button.setAttribute('aria-pressed',String(button.dataset.a11yFont===a11yState.font));
    });
    document.querySelectorAll('[data-a11y-toggle]').forEach(input=>{
      input.checked=!!a11yState[input.dataset.a11yToggle];
    });
  }

  window.dispatchEvent(new CustomEvent('zsk:a11y',{detail:{...a11yState}}));
}

applyAccessibility(false);

function setInstallUi(visible){
  document.querySelectorAll('[data-pwa-install]').forEach(el=>{
    el.hidden=!visible;
  });
  const banner=document.querySelector('[data-pwa-banner]');
  if(banner){
    const dismissed=sessionStorage.getItem('zsk-pwa-banner-dismissed')==='1';
    banner.hidden=!visible || dismissed;
  }
}

function updateOnlineState(){
  const offline=!navigator.onLine;
  document.documentElement.classList.toggle('is-offline',offline);
  const status=document.querySelector('[data-offline-status]');
  if(status) status.hidden=!offline;
}

window.addEventListener('beforeinstallprompt',event=>{
  event.preventDefault();
  deferredInstallPrompt=event;
  setInstallUi(true);
});

window.addEventListener('appinstalled',()=>{
  deferredInstallPrompt=null;
  setInstallUi(false);
  document.documentElement.classList.add('pwa-installed');
});

window.addEventListener('online',updateOnlineState);
window.addEventListener('offline',updateOnlineState);

document.addEventListener('DOMContentLoaded',()=>{
  applyAccessibility(true);

  if(!a11yState.motion){
    gsap.from('.reveal',{y:28,opacity:0,duration:.85,stagger:.12,ease:'power3.out'});
  }

  const cards=[...document.querySelectorAll('.spec-card,.news-card,.glass-panel,.home-lesson-card,.home-achievement-card')];
  if('IntersectionObserver' in window && !a11yState.motion){
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){
        gsap.fromTo(e.target,{y:25,opacity:0},{y:0,opacity:1,duration:.65,ease:'power2.out'});
        io.unobserve(e.target);
      }
    }),{threshold:.12});
    cards.forEach(c=>io.observe(c));
  }

  const panel=document.querySelector('[data-a11y-panel]');
  const backdrop=document.querySelector('[data-a11y-backdrop]');
  const launcher=document.querySelector('[data-a11y-open]');

  const openA11y=()=>{
    if(panel) panel.hidden=false;
    if(backdrop) backdrop.hidden=false;
    launcher?.setAttribute('aria-expanded','true');
    document.documentElement.classList.add('a11y-panel-open');
  };
  const closeA11y=()=>{
    if(panel) panel.hidden=true;
    if(backdrop) backdrop.hidden=true;
    launcher?.setAttribute('aria-expanded','false');
    document.documentElement.classList.remove('a11y-panel-open');
  };

  launcher?.addEventListener('click',openA11y);
  document.querySelectorAll('[data-a11y-close]').forEach(button=>button.addEventListener('click',closeA11y));
  backdrop?.addEventListener('click',closeA11y);

  document.querySelectorAll('[data-a11y-font]').forEach(button=>{
    button.addEventListener('click',()=>{
      a11yState.font=button.dataset.a11yFont||'normal';
      saveAccessibility();
      applyAccessibility(true);
    });
  });

  document.querySelectorAll('[data-a11y-toggle]').forEach(input=>{
    input.addEventListener('change',()=>{
      a11yState[input.dataset.a11yToggle]=input.checked;
      saveAccessibility();
      applyAccessibility(true);
    });
  });

  document.querySelectorAll('[data-a11y-reset]').forEach(button=>{
    button.addEventListener('click',()=>{
      a11yState={...A11Y_DEFAULTS};
      try{localStorage.removeItem(A11Y_KEY);}catch(e){}
      applyAccessibility(true);
    });
  });

  document.addEventListener('keydown',event=>{
    if(event.key==='Escape' && panel && !panel.hidden) closeA11y();
  });

  if(window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone===true){
    document.documentElement.classList.add('pwa-standalone');
  }

  updateOnlineState();

  document.querySelectorAll('[data-pwa-install]').forEach(button=>{
    button.addEventListener('click',async()=>{
      if(!deferredInstallPrompt) return;
      deferredInstallPrompt.prompt();
      await deferredInstallPrompt.userChoice;
      deferredInstallPrompt=null;
      setInstallUi(false);
    });
  });

  document.querySelectorAll('[data-pwa-close]').forEach(button=>{
    button.addEventListener('click',()=>{
      sessionStorage.setItem('zsk-pwa-banner-dismissed','1');
      const banner=button.closest('[data-pwa-banner]');
      if(banner) banner.hidden=true;
    });
  });

  const offcanvas=document.getElementById('mobileNav');
  const menuTrigger=document.querySelector('.mobile-menu-trigger');
  if(offcanvas && menuTrigger){
    offcanvas.addEventListener('show.bs.offcanvas',()=>menuTrigger.classList.add('active'));
    offcanvas.addEventListener('hidden.bs.offcanvas',()=>menuTrigger.classList.remove('active'));
  }
});

if('serviceWorker' in navigator && (location.protocol==='https:' || location.hostname==='localhost')){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('/sw.js',{scope:'/'})
      .then(registration=>{
        registration.update().catch(()=>{});
      })
      .catch(error=>{
        console.warn('PWA service worker registration failed:',error);
      });
  });
}
