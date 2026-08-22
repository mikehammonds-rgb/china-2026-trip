(()=>{const start=new Date('2026-08-30T00:00:00-04:00'),end=new Date('2026-09-13T23:59:59-04:00'),today=new Date();const days={
'2026-08-30':['Travel Day','Tampa → Los Angeles → Shanghai · China begins now ✈️','travel'],
'2026-08-31':['Shanghai','Arrive PVG 4:05 PM → Pullman Jing An → easy first evening','shanghai'],
'2026-09-01':['Shanghai','Yuyuan → Oriental Pearl → Nanjing Road → Bund → FLAIR sunset → INS','shanghai'],
'2026-09-02':['Zhangjiajie','Fly to Zhangjiajie → 72 Strange Buildings → optional dancing','zhangjiajie'],
'2026-09-03':['Zhangjiajie','National Forest Park → Yuanjiajie → Bailong → Wowza sunset','zhangjiajie'],
'2026-09-04':['Furong','Tianmen + Glass Bridge → Furong waterfall after dark','furong'],
'2026-09-05':['Chengdu','Furong morning → Business Class HSR → hotpot → rooftop → dancing','chengdu'],
'2026-09-06':['Chengdu','Pandas → Jinli → People’s Park tea → skyline drinks','chengdu'],
'2026-09-07':['Xi’an','Business Class HSR → Muslim Quarter → Great Tang lights','xian'],
'2026-09-08':['Xi’an','Terracotta Warriors → City Wall → Siren rooftop → Psyche','xian'],
'2026-09-09':['Xi’an','Mount Huashan full-day adventure','xian'],
'2026-09-10':['Beijing','Business Class HSR → free afternoon → MO Bar sunset','beijing'],
'2026-09-11':['Beijing','Tiananmen → Forbidden City → Summer Palace → Friday club night','beijing'],
'2026-09-12':['Beijing → Shanghai','Mutianyu Great Wall → Temple of Heaven → fly Shanghai','beijing'],
'2026-09-13':['Shanghai → Home','PVG 10:15 AM → Detroit → Tampa','travel']};
const pad=n=>String(n).padStart(2,'0'),key=`${today.getFullYear()}-${pad(today.getMonth()+1)}-${pad(today.getDate())}`,d=days[key],hero=document.querySelector('.hero'),kicker=document.querySelector('#todayKicker'),title=document.querySelector('#todayTitle'),text=document.querySelector('#todayText'),link=document.querySelector('#todayLink'),progress=document.querySelector('#tripProgress');if(d){kicker.textContent='LIVE TRIP · TODAY';title.textContent=d[0];text.textContent=d[1];link.href='#'+d[2];link.textContent='Open today’s details ↓';document.getElementById(d[2])?.setAttribute('open','');document.querySelectorAll('.route a').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+d[2]));const pct=Math.min(100,Math.max(0,((today-start)/(end-start))*100));progress.style.width=pct+'%'}else if(today<start){const diff=Math.ceil((start-today)/86400000);kicker.textContent='TRIP COUNTDOWN';title.textContent=diff+' days to China 🇨🇳';text.textContent='Your pocket command center is ready. Flights, trains, hotels, tours, nightlife, photos and support are all in one place.';progress.style.width='0%'}else{kicker.textContent='CHINA 2026';title.textContent='What a trip. 🇨🇳';text.textContent='The dashboard remains your trip archive, photo guide and shared memory hub.';progress.style.width='100%'}
const unregister=()=>{if('serviceWorker'in navigator)navigator.serviceWorker.getRegistrations().then(rs=>rs.forEach(r=>r.unregister()));if('caches'in window)caches.keys().then(ks=>ks.forEach(k=>caches.delete(k)))};unregister();
window.addEventListener('DOMContentLoaded',()=>{document.querySelectorAll('img').forEach(img=>img.addEventListener('error',()=>{img.closest('.club-photos')?.classList.add('image-error')}));});})();