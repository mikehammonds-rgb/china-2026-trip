(()=>{
const gayNightlife={
 shanghai:{note:'Shanghai has a discreet but active queer scene. Verify the night on WeChat/Dianping before heading out.',venues:[
  {name:'Culture Club · INS',tag:'GAY-LEANING DANCE FLOOR',desc:'Fourth floor of the INS complex in Fuxing Park; one of Shanghai’s strongest queer/queer-friendly dance options.',q:'Culture Club INS Fuxing Park Shanghai'},
  {name:'HUNT',tag:'GAY BAR + DRAG',desc:'Long-running gay meeting spot with DJs, dancing and Saturday drag shows.',q:'HUNT 42 Xingfu Road Shanghai'},
  {name:'Moon Bar',tag:'RELAXED GAY BAR',desc:'Lower-key neighborhood gay bar in the former French Concession; a good first drink before clubbing.',q:'Moon Bar Lane 1950 Huaihai Zhong Road Shanghai'}]},
 zhangjiajie:{note:'No reliable dedicated gay bar is currently verifiable in Zhangjiajie. The better move is queer-friendly mainstream nightlife and checking local apps/WeChat for pop-up gatherings.',venues:[
  {name:'S·π PLUS',tag:'QUEER-FRIENDLY MAINSTREAM',desc:'Your existing late-night dance pick; best practical option when the group wants a club atmosphere.',q:'S PI PLUS Zhangjiajie'},
  {name:'72 Strange Buildings nightlife',tag:'SOCIAL / MIXED CROWD',desc:'Busy evening destination with bars, performances and younger mixed crowds rather than a dedicated LGBTQ venue.',q:'72 Strange Buildings Zhangjiajie'}]},
 furong:{note:'Furong is a tiny heritage town and I could not verify a dedicated gay bar. Treat this as a photography-and-drinks night rather than a gay-club destination.',venues:[
  {name:'Waterfall-view bars & cafés',tag:'QUEER-FRIENDLY / MIXED',desc:'Choose a busy terrace around the illuminated waterfall for drinks and people-watching.',q:'Furong Ancient Town waterfall bar'},
  {name:'Ancient-town late-night lanes',tag:'SOCIAL / MIXED',desc:'Lantern streets and casual bars are the realistic after-dark option here; save the big gay night for Chengdu.',q:'Furong Ancient Town nightlife'}]},
 chengdu:{note:'This is the trip’s strongest dedicated gay-nightlife city — worth prioritizing.',venues:[
  {name:'The Butterfly · 蝴蝶',tag:'TOP GAY CLUB',desc:'Chengdu’s legendary gay club: drag, stage shows and multiple rooms. A destination in its own right.',q:'The Butterfly gay club Chengdu Dongdajie'},
  {name:'Pose Club',tag:'GAY CLUB · FRIENDLY CROWD',desc:'Music-forward gay club at Future Center with K-pop nights, drag and a social local crowd.',q:'Pose Club Future Center Chengdu'},
  {name:'Hunk',tag:'GAY BAR · CONVERSATION',desc:'Smaller, more relaxed gay bar near Pose for drinks before or after the louder rooms.',q:'Hunk gay bar Chengdu'}]},
 xian:{note:'Xi’an’s dedicated gay scene is very small. One venue is consistently verifiable; the rest of queer nightlife is mostly app/WeChat organized or mixed mainstream rooms.',venues:[
  {name:'In.D',tag:'GAY CABARET / CLUB',desc:'Xi’an’s main verifiable gay venue: cabaret-style tables, drag/go-go shows and dancing later at night. Confirm it is open that evening.',q:'In.D gay club Zhuque Gate Xian'},
  {name:'South Gate / Xiaozhai mixed clubs',tag:'QUEER-FRIENDLY BACKUP',desc:'Not dedicated gay bars, but these nightlife districts are the practical backup for a younger mixed crowd.',q:'Xiaozhai nightlife Xian'}]},
 beijing:{note:'Beijing’s queer nightlife is discreet and centered around the Workers’ Stadium / Sanlitun area.',venues:[
  {name:'Destination · 目的地',tag:'MAIN GAY CLUB',desc:'Beijing’s established multi-room gay club near Workers’ Stadium, with dancing, themed parties and go-go shows.',q:'Destination Club Workers Stadium Beijing'},
  {name:'Tube Bar · 管子',tag:'CASUAL GAY BAR',desc:'Smaller LGBTQ-friendly local bar near Workers’ Stadium for a more relaxed drink before Destination.',q:'Tube Bar Workers Stadium Beijing'}]}
};
function addStyles(){if(document.getElementById('gayNightStyles'))return;const s=document.createElement('style');s.id='gayNightStyles';s.textContent=`
.gay-night{margin-top:14px;padding:13px;border-radius:18px;background:radial-gradient(circle at 85% 0,rgba(236,72,153,.18),transparent 35%),linear-gradient(145deg,#17152b,#111a2b);border:1px solid rgba(244,114,182,.26);box-shadow:0 14px 35px rgba(0,0,0,.18)}
.gay-night-head{display:flex;gap:10px;align-items:center;margin-bottom:8px}.gay-night-icon{width:38px;height:38px;border-radius:12px;display:grid;place-items:center;font-size:20px;background:linear-gradient(135deg,#ec4899,#8b5cf6);box-shadow:0 0 20px rgba(236,72,153,.25)}
.gay-night-title{font-size:12px;font-weight:950;letter-spacing:.1em;color:#fff}.gay-night-sub{font-size:9px;color:#c4b5fd;margin-top:2px}.gay-night-note{font-size:9px;line-height:1.45;color:#aebcd0;margin:5px 0 9px}
.gay-venue{padding:10px 0;border-top:1px solid rgba(255,255,255,.08)}.gay-venue:first-of-type{border-top:0}.gay-venue-top{display:flex;justify-content:space-between;gap:8px;align-items:flex-start}.gay-venue b{font-size:13px}.gay-tag{flex:0 0 auto;padding:4px 7px;border-radius:999px;background:rgba(236,72,153,.14);border:1px solid rgba(244,114,182,.22);color:#f9a8d4;font-size:7px;font-weight:950;letter-spacing:.06em}.gay-venue p{font-size:9px;line-height:1.45;color:#aebcd0;margin:5px 0}.gay-actions{display:flex;gap:6px;flex-wrap:wrap}.gay-actions a{display:inline-flex;text-decoration:none;padding:5px 8px;border-radius:999px;background:#ffffff0a;border:1px solid #ffffff14;color:#ddd6fe;font-size:8px;font-weight:900}
`;
document.head.appendChild(s)}
function inject(){addStyles();Object.entries(gayNightlife).forEach(([id,data])=>{const city=document.getElementById(id);const night=city?.querySelector('.night-shell');if(!night||night.querySelector('.gay-night'))return;const box=document.createElement('div');box.className='gay-night';box.innerHTML=`<div class="gay-night-head"><div class="gay-night-icon">🏳️‍🌈</div><div><div class="gay-night-title">LGBTQ+ NIGHTLIFE</div><div class="gay-night-sub">Gay bars, clubs & queer-friendly options</div></div></div><div class="gay-night-note">${data.note}</div>${data.venues.map(v=>`<div class="gay-venue"><div class="gay-venue-top"><b>${v.name}</b><span class="gay-tag">${v.tag}</span></div><p>${v.desc}</p><div class="gay-actions"><a target="_blank" rel="noopener" href="https://maps.apple.com/?q=${encodeURIComponent(v.q)}">📍 Map</a><a target="_blank" rel="noopener" href="https://www.google.com/search?q=${encodeURIComponent(v.q+' 2026')}">🔎 Check current info</a></div></div>`).join('')}`;night.appendChild(box)})}
if(document.readyState==='loading')window.addEventListener('DOMContentLoaded',inject);else inject();
})();
