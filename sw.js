const VERSION='20260829-12';
const CACHE_NAME=`china-command-center-${VERSION}`;
const META_URL='/__offline-status__';
const CORE_FILES=[
  '/',
  '/index.html',
  '/app.css',
  '/app.js',
  '/hungry.js',
  '/gay-nightlife.js',
  '/day-adventures.js',
  '/travel-details.js',
  '/overall-timeline.js',
  '/weather.js',
  '/chengdu-spa.js',
  '/translate.js',
  '/spas.js',
  '/suits.js',
  '/trip-config.js',
  '/trip-validator.js',
  '/offline-ui.js',
  '/manifest.webmanifest',
  '/app-icon.svg'
];

async function installCore(){
  const cache=await caches.open(CACHE_NAME);
  await cache.addAll(CORE_FILES.map(path=>new Request(path,{cache:'reload'})));
  const installedAt=new Date().toISOString();
  await cache.put(META_URL,new Response(JSON.stringify({version:VERSION,installedAt}),{headers:{'Content-Type':'application/json'}}));
}

self.addEventListener('install',event=>{
  event.waitUntil(installCore().then(()=>self.skipWaiting()));
});

self.addEventListener('activate',event=>{
  event.waitUntil((async()=>{
    // Keep previous trip caches so a tab still controlled by the prior worker
    // can never lose its offline fallback during an update.
    await self.clients.claim();
  })());
});

const timedFetch=(request,timeoutMs)=>Promise.race([
  fetch(request),
  new Promise((_,reject)=>setTimeout(()=>reject(new Error('Network timeout')),timeoutMs))
]);

async function navigationResponse(request){
  const cache=await caches.open(CACHE_NAME);
  try{
    const response=await timedFetch(request,3500);
    if(response.ok){
      // A normal iPhone pull-to-refresh updates every cached trip module before
      // the page is returned, so the next screen is always a complete release.
      await installCore();
      await cache.put('/index.html',response.clone());
    }
    return response;
  }catch{
    return (await cache.match('/index.html'))||(await cache.match('/'))||new Response('Trip dashboard is not cached yet.',{status:503,headers:{'Content-Type':'text/plain'}});
  }
}

async function apiResponse(request){
  const cache=await caches.open(CACHE_NAME);
  try{
    const response=await timedFetch(request,7000);
    if(response.ok)await cache.put(request,response.clone());
    return response;
  }catch{
    return (await cache.match(request))||new Response(JSON.stringify({error:'Offline and no saved live result is available.'}),{status:503,headers:{'Content-Type':'application/json'}});
  }
}

async function localAssetResponse(request){
  const cache=await caches.open(CACHE_NAME);
  const cached=await cache.match(request,{ignoreSearch:true});
  if(cached)return cached;
  const response=await fetch(request);
  if(response.ok)await cache.put(request,response.clone());
  return response;
}

async function imageResponse(request){
  const cache=await caches.open(CACHE_NAME);
  const cached=await cache.match(request);
  if(cached)return cached;
  try{
    const response=await fetch(request);
    if(response.ok||response.type==='opaque')await cache.put(request,response.clone());
    return response;
  }catch{
    return new Response('',{status:408,statusText:'Image unavailable offline'});
  }
}

self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(request.mode==='navigate'){
    event.respondWith(navigationResponse(request));
    return;
  }
  if(url.origin===self.location.origin&&url.pathname.startsWith('/api/')){
    event.respondWith(apiResponse(request));
    return;
  }
  if(url.origin===self.location.origin){
    event.respondWith(localAssetResponse(request));
    return;
  }
  if(request.destination==='image')event.respondWith(imageResponse(request));
});

self.addEventListener('message',event=>{
  if(event.data?.type!=='GET_OFFLINE_STATUS')return;
  event.waitUntil((async()=>{
    const cache=await caches.open(CACHE_NAME);
    const meta=await cache.match(META_URL);
    const status=meta?await meta.json():{version:VERSION,installedAt:null};
    event.ports?.[0]?.postMessage({...status,ready:Boolean(meta)});
  })());
});
