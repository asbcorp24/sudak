import 'bootstrap';
import { gsap } from 'gsap';
import './scenes';

let deferredInstallPrompt=null;

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
  gsap.from('.reveal',{y:28,opacity:0,duration:.85,stagger:.12,ease:'power3.out'});

  const cards=[...document.querySelectorAll('.spec-card,.news-card,.glass-panel')];
  if('IntersectionObserver' in window){
    const io=new IntersectionObserver(es=>es.forEach(e=>{
      if(e.isIntersecting){
        gsap.fromTo(e.target,{y:25,opacity:0},{y:0,opacity:1,duration:.65,ease:'power2.out'});
        io.unobserve(e.target);
      }
    }),{threshold:.12});
    cards.forEach(c=>io.observe(c));
  }

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
