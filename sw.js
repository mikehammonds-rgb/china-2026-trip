const VERSION='20260918-2';
const CACHE=`travel-command-center-${VERSION}`;
const ARCHIVE='/archived-trips/china-2026-08-30-to-2026-09-13/';
const CORE=[
  '/',
  '/index.html',
  '/app.css',
  '/app.js',
  '/app-icon.svg',
  '/app-icon-180.png',
  '/manifest.webmanifest',
  '/data/active-trip.js',
  '/data/november-cruise.js',
  '/data/archive-index.js',
  ARCHIVE,
  `${ARCHIVE}index.html`,
  `${ARCHIVE}app.css`,
  `${ARCHIVE}app.js`,
  `${ARCHIVE}hungry.js`,
  `${ARCHIVE}gay-nightlife.js`,
  `${ARCHIVE}day-adventures.js`,
  `${ARCHIVE}travel-details.js`,
  `${ARCHIVE}overall-timeline.js`,
  `${ARCHIVE}weather.js`,
  `${ARCHIVE}chengdu-spa.js`,
  `${ARCHIVE}translate.js`,
  `${ARCHIVE}spas.js`,
  `${ARCHIVE}suits.js`,
  `${ARCHIVE}trip-config.js`,
  `${ARCHIVE}trip-validator.js`,
  `${ARCHIVE}offline-ui.js`,
  `${ARCHIVE}manifest.webmanifest`,
  `${ARCHIVE}app-icon.svg`
];

const timedFetch=(request,timeout=4500)=>Promise.race([
  fetch(request),
  new Promise((_,reject)=>setTimeout(()=>reject(new Error('Network timeout')),timeout))
]);

async function installCore(){
  const cache=await caches.open(CACHE);
  await Promise.all(CORE.map(async path=>{
    try{const response=await fetch(new Request(path,{cache:'reload'}));if(response.ok)await cache.put(path,response)}catch{}
  }));
  await cache.put('/__offline-status__',new Response(JSON.stringify({version:VERSION,installedAt:new Date().toISOString()}),{headers:{'Content-Type':'application/json'}}));
}

self.addEventListener('install',event=>event.waitUntil(installCore().then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil((async()=>{const names=await caches.keys();await Promise.all(names.filter(name=>name.startsWith('travel-command-center-')&&name!==CACHE).map(name=>caches.delete(name)));await self.clients.claim()})()));

async function networkFirst(request,timeout=4500){
  const cache=await caches.open(CACHE);
  try{const response=await timedFetch(request,timeout);if(response.ok)await cache.put(request,response.clone());return response}catch{return(await cache.match(request,{ignoreSearch:true}))||(request.mode==='navigate'?await cache.match('/'):null)||new Response('This item has not been saved for offline use yet.',{status:503})}
}
async function cacheFirst(request){
  const cache=await caches.open(CACHE),saved=await cache.match(request,{ignoreSearch:true});
  if(saved)return saved;
  try{const response=await fetch(request);if(response.ok||response.type==='opaque')await cache.put(request,response.clone());return response}catch{return new Response('',{status:408})}
}

self.addEventListener('fetch',event=>{
  const request=event.request;if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin===self.location.origin&&url.pathname==='/__offline-status__'){event.respondWith(caches.open(CACHE).then(cache=>cache.match('/__offline-status__')));return}
  if(request.mode==='navigate'||(url.origin===self.location.origin&&url.pathname.startsWith('/api/'))){event.respondWith(networkFirst(request,request.mode==='navigate'?4500:8000));return}
  if(url.origin===self.location.origin){event.respondWith(networkFirst(request));return}
  if(request.destination==='image')event.respondWith(cacheFirst(request));
});
