const CACHE='china-2026-v6';
const ASSETS=['./','./index.html','./manifest.webmanifest','./spectacle.css','./dynamic.js','./instagramspots.js'];
self.addEventListener('install',e=>self.skipWaiting()||e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS))));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET')return;
 if(e.request.mode==='navigate'){
  e.respondWith(fetch(e.request).then(async r=>{let html=await r.text();if(!html.includes('dynamic.js'))html=html.replace('</body>','<script src="./dynamic.js?v=6"></script></body>');if(!html.includes('instagramspots.js'))html=html.replace('</body>','<script src="./instagramspots.js?v=6"></script></body>');return new Response(html,{status:r.status,statusText:r.statusText,headers:{'Content-Type':'text/html; charset=utf-8','Cache-Control':'no-cache'}})}).catch(async()=>{const cached=await caches.match('./index.html');if(!cached)return new Response('Offline',{status:503});let html=await cached.text();if(!html.includes('dynamic.js'))html=html.replace('</body>','<script src="./dynamic.js?v=6"></script></body>');if(!html.includes('instagramspots.js'))html=html.replace('</body>','<script src="./instagramspots.js?v=6"></script></body>');return new Response(html,{headers:{'Content-Type':'text/html; charset=utf-8'}})}));return;
 }
 e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE).then(c=>c.put(e.request,copy));return r}).catch(()=>caches.match(e.request)));
});