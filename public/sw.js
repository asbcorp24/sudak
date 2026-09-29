const VERSION='zsk-pwa-v2';
const STATIC_CACHE=VERSION+'-static';
const RUNTIME_CACHE=VERSION+'-runtime';
const OFFLINE_URL='/offline.html';

const PRECACHE=[
  OFFLINE_URL,
  '/manifest.webmanifest',
  '/pwa/icon.svg',
  '/pwa/icon-maskable.svg'
];

self.addEventListener('install',event=>{
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache=>cache.addAll(PRECACHE))
      .then(()=>self.skipWaiting())
  );
});

self.addEventListener('activate',event=>{
  event.waitUntil(
    caches.keys()
      .then(keys=>Promise.all(keys.filter(key=>!key.startsWith(VERSION)).map(key=>caches.delete(key))))
      .then(()=>self.clients.claim())
  );
});

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET') return;

  const url=new URL(request.url);
  if(url.origin!==self.location.origin) return;
  if(url.pathname.startsWith('/admin')) return;

  if(request.mode==='navigate'){
    event.respondWith(
      fetch(request)
        .then(response=>{
          const copy=response.clone();
          if(response.ok){
            caches.open(RUNTIME_CACHE).then(cache=>cache.put(request,copy));
          }
          return response;
        })
        .catch(async()=>{
          const cached=await caches.match(request);
          return cached || caches.match(OFFLINE_URL);
        })
    );
    return;
  }

  const staticAsset=
    url.pathname.startsWith('/build/') ||
    url.pathname.startsWith('/storage/') ||
    url.pathname.startsWith('/pwa/') ||
    /\.(?:css|js|svg|png|jpg|jpeg|webp|gif|woff2?|glb|gltf)$/i.test(url.pathname);

  if(staticAsset){
    event.respondWith(
      caches.match(request).then(cached=>{
        const network=fetch(request).then(response=>{
          if(response.ok){
            const copy=response.clone();
            caches.open(RUNTIME_CACHE).then(cache=>cache.put(request,copy));
          }
          return response;
        }).catch(()=>cached);
        return cached || network;
      })
    );
  }
});

self.addEventListener('message',event=>{
  if(event.data==='SKIP_WAITING') self.skipWaiting();
});


self.addEventListener('push',event=>{
  let data={};
  try{ data=event.data ? event.data.json() : {}; }catch(e){ data={body:event.data?.text()||''}; }
  const title=data.title||'ЗСК';
  const options={
    body:data.body||'',
    icon:data.icon||'/pwa/icon.svg',
    badge:data.badge||'/pwa/icon.svg',
    data:{url:data.url||'/student/notifications'},
    tag:data.tag||undefined,
    renotify:false
  };
  event.waitUntil(self.registration.showNotification(title,options));
});

self.addEventListener('notificationclick',event=>{
  event.notification.close();
  const target=event.notification.data?.url||'/student/notifications';
  event.waitUntil(
    self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients=>{
      for(const client of clients){
        if('focus' in client){
          client.navigate(target).catch(()=>{});
          return client.focus();
        }
      }
      return self.clients.openWindow ? self.clients.openWindow(target) : null;
    })
  );
});
