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

function initRichEditors(){
  const esc=value=>String(value??'')
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#039;');

  document.querySelectorAll('[data-rich-editor]').forEach(editor=>{
    const surface=editor.querySelector('[data-rich-surface]');
    const source=editor.querySelector('[data-rich-source]');
    const output=editor.querySelector('[data-rich-output]');
    const toolbar=editor.querySelector('[data-rich-toolbar]');
    const mediaPanel=editor.querySelector('[data-rich-media-panel]');
    if(!surface||!source||!output) return;

    let mode='visual';
    let savedRange=null;

    const syncOutput=()=>{
      output.value=mode==='html' ? source.value : surface.innerHTML;
    };

    const saveSelection=()=>{
      if(mode!=='visual') return;
      const selection=window.getSelection();
      if(!selection||!selection.rangeCount) return;
      const range=selection.getRangeAt(0);
      if(surface.contains(range.commonAncestorContainer)){
        savedRange=range.cloneRange();
      }
    };

    const restoreSelection=()=>{
      if(!savedRange) return;
      const selection=window.getSelection();
      if(!selection) return;
      selection.removeAllRanges();
      selection.addRange(savedRange);
    };

    const insertHtml=html=>{
      if(mode==='html'){
        const start=source.selectionStart ?? source.value.length;
        const end=source.selectionEnd ?? start;
        source.setRangeText(html,start,end,'end');
        source.dispatchEvent(new Event('input',{bubbles:true}));
        source.focus();
        return;
      }

      surface.focus();
      restoreSelection();
      document.execCommand('insertHTML',false,html);
      saveSelection();
      syncOutput();
    };

    const exec=(command,value=null)=>{
      if(mode!=='visual') return;
      surface.focus();
      restoreSelection();
      document.execCommand(command,false,value);
      saveSelection();
      syncOutput();
    };

    surface.addEventListener('mouseup',saveSelection);
    surface.addEventListener('keyup',saveSelection);
    surface.addEventListener('focus',saveSelection);
    surface.addEventListener('input',syncOutput);
    source.addEventListener('input',syncOutput);

    toolbar?.querySelectorAll('button').forEach(button=>{
      button.addEventListener('mousedown',event=>event.preventDefault());
    });

    editor.querySelectorAll('[data-rich-command]').forEach(button=>{
      button.addEventListener('click',()=>exec(button.dataset.richCommand));
    });

    editor.querySelector('[data-rich-format]')?.addEventListener('change',event=>{
      if(mode!=='visual') return;
      exec('formatBlock','<'+event.target.value+'>');
      event.target.value='p';
    });

    editor.querySelector('[data-rich-blockquote]')?.addEventListener('click',()=>{
      exec('formatBlock','<blockquote>');
    });

    editor.querySelector('[data-rich-link]')?.addEventListener('click',()=>{
      const url=window.prompt('Адрес ссылки (https://...)');
      if(!url) return;

      if(mode==='html'){
        const text=window.prompt('Текст ссылки',url) || url;
        insertHtml('<a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(text)+'</a>');
        return;
      }

      restoreSelection();
      const selection=window.getSelection();
      const selected=selection?.toString()?.trim();
      if(selected){
        exec('createLink',url);
        surface.querySelectorAll('a[href="'+CSS.escape(url)+'"]').forEach(a=>{
          a.target='_blank';
          a.rel='noopener';
        });
        syncOutput();
      }else{
        const text=window.prompt('Текст ссылки',url) || url;
        insertHtml('<a href="'+esc(url)+'" target="_blank" rel="noopener">'+esc(text)+'</a>');
      }
    });

    editor.querySelector('[data-rich-table]')?.addEventListener('click',()=>{
      const rows=Math.max(1,Math.min(10,parseInt(window.prompt('Количество строк','3')||'0',10)));
      const cols=Math.max(1,Math.min(8,parseInt(window.prompt('Количество столбцов','3')||'0',10)));
      if(!rows||!cols) return;

      let html='<div class="content-table-wrap"><table class="content-table"><tbody>';
      for(let r=0;r<rows;r++){
        html+='<tr>';
        for(let col=0;col<cols;col++){
          const tag=r===0?'th':'td';
          html+='<'+tag+'>'+(r===0?'Заголовок':'Ячейка')+'</'+tag+'>';
        }
        html+='</tr>';
      }
      html+='</tbody></table></div><p><br></p>';
      insertHtml(html);
    });

    editor.querySelector('[data-rich-rule]')?.addEventListener('click',()=>{
      insertHtml('<hr><p><br></p>');
    });

    editor.querySelector('[data-rich-undo]')?.addEventListener('click',()=>exec('undo'));
    editor.querySelector('[data-rich-redo]')?.addEventListener('click',()=>exec('redo'));

    const setMode=nextMode=>{
      if(nextMode===mode) return;

      if(nextMode==='html'){
        source.value=surface.innerHTML;
        surface.hidden=true;
        source.hidden=false;
        toolbar?.classList.add('is-source-mode');
      }else{
        surface.innerHTML=source.value;
        source.hidden=true;
        surface.hidden=false;
        toolbar?.classList.remove('is-source-mode');
      }

      mode=nextMode;
      editor.querySelectorAll('[data-rich-mode]').forEach(button=>{
        button.classList.toggle('active',button.dataset.richMode===mode);
      });
      syncOutput();
    };

    editor.querySelectorAll('[data-rich-mode]').forEach(button=>{
      button.addEventListener('click',()=>setMode(button.dataset.richMode));
    });

    const closeMedia=()=>{
      if(mediaPanel) mediaPanel.hidden=true;
    };

    editor.querySelector('[data-rich-media-open]')?.addEventListener('click',()=>{
      saveSelection();
      if(mediaPanel) mediaPanel.hidden=false;
    });
    editor.querySelector('[data-rich-media-close]')?.addEventListener('click',closeMedia);

    editor.querySelector('[data-rich-media-search]')?.addEventListener('input',event=>{
      const q=event.target.value.trim().toLowerCase();
      editor.querySelectorAll('[data-rich-media-item]').forEach(item=>{
        item.hidden=!!q && !(item.dataset.mediaSearch||'').includes(q);
      });
    });

    editor.querySelectorAll('[data-rich-media-item]').forEach(item=>{
      item.addEventListener('click',()=>{
        const type=item.dataset.mediaType;
        const url=item.dataset.mediaUrl||'';
        const title=item.dataset.mediaTitle||'';
        const alt=item.dataset.mediaAlt||title;

        if(type==='image'){
          insertHtml(
            '<figure class="content-inline-media">'+
            '<img src="'+esc(url)+'" alt="'+esc(alt)+'" loading="lazy">'+
            (title?'<figcaption>'+esc(title)+'</figcaption>':'')+
            '</figure><p><br></p>'
          );
        }else{
          const label=type==='model_3d' ? 'Открыть 3D-модель' : 'Открыть документ';
          insertHtml(
            '<p class="content-file-link"><a href="'+esc(url)+'" target="_blank" rel="noopener">'+
            esc(title||label)+' ↗</a></p>'
          );
        }

        closeMedia();
      });
    });

    editor.closest('form')?.addEventListener('submit',()=>{
      syncOutput();
    });

    source.hidden=true;
    syncOutput();
  });
}

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
    document.querySelectorAll('[data-a11y-toggle]').forEach(control=>{
      const active=!!a11yState[control.dataset.a11yToggle];
      control.setAttribute('aria-checked',String(active));
      control.classList.toggle('active',active);
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
  initRichEditors();
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

  document.querySelectorAll('[data-a11y-toggle]').forEach(control=>{
    control.addEventListener('click',event=>{
      event.preventDefault();
      const key=control.dataset.a11yToggle;
      if(!key) return;
      a11yState[key]=!a11yState[key];
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
