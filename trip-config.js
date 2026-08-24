window.TRIP_CONFIG={
  app:{
    name:'Trip Command Center',
    version:1,
    theme:{accent:'#9b6cff',accent2:'#ff61c7',heroImage:'https://images.unsplash.com/photo-1609153755058-a7cbbf264e9c?auto=format&fit=crop&q=88&w=1600'},
    features:{hungry:true,instagram:true,nightlife:true,photoSharing:true,dayAtGlance:true,hotelAmenities:true,support:true}
  },
  trip:{
    id:'china-2026',
    title:'China 2026',
    eyebrow:"MIKE'S CHINA 2026 · AUG 30 — SEP 13",
    headline:'China Command Center 🇨🇳',
    subtitle:'Four travelers. Six incredible stops. One pocket guide for the entire adventure.',
    start:'2026-08-30T00:00:00-04:00',
    end:'2026-09-13T23:59:59-04:00',
    homeTimeZone:'America/New_York',
    destinationCountry:'China',
    currency:'CNY',
    travelers:4,
    sharedPhotosUrl:'https://join.photocircleapp.com/541C88E52A'
  },
  route:[
    {id:'shanghai',name:'Shanghai',icon:'🌃',dates:'Aug 31–Sep 2 · return Sep 12'},
    {id:'zhangjiajie',name:'Zhangjiajie',icon:'⛰️',dates:'Sep 2–4 · Avatar mountains'},
    {id:'furong',name:'Furong Ancient Town',icon:'💦',dates:'Sep 4–5 · waterfall village'},
    {id:'chengdu',name:'Chengdu',icon:'🐼',dates:'Sep 5–7 · pandas + hotpot'},
    {id:'xian',name:'Xi’an',icon:'🏯',dates:'Sep 7–10 · walls + warriors'},
    {id:'beijing',name:'Beijing',icon:'🏛️',dates:'Sep 10–12 · imperial finale'}
  ],
  days:{
    '2026-08-30':{title:'Travel Day',cityId:'travel',summary:'Tampa → Los Angeles → Shanghai · China begins now ✈️'},
    '2026-08-31':{title:'Shanghai',cityId:'shanghai',summary:'Arrive PVG 4:05 PM → Pullman Jing An → easy first evening'},
    '2026-09-01':{title:'Shanghai',cityId:'shanghai',summary:'Yuyuan → Oriental Pearl → Nanjing Road → Bund → FLAIR sunset → INS'},
    '2026-09-02':{title:'Zhangjiajie',cityId:'zhangjiajie',summary:'Fly to Zhangjiajie → 72 Strange Buildings → optional dancing'},
    '2026-09-03':{title:'Zhangjiajie',cityId:'zhangjiajie',summary:'National Forest Park → Yuanjiajie → Bailong → Wowza sunset'},
    '2026-09-04':{title:'Furong',cityId:'furong',summary:'Tianmen + Glass Bridge → Furong waterfall after dark'},
    '2026-09-05':{title:'Chengdu',cityId:'chengdu',summary:'G2418 First Class · Zhangjiajie West 11:50 AM → Chengdu East 4:48 PM'},
    '2026-09-06':{title:'Chengdu',cityId:'chengdu',summary:'Pandas → Jinli → People’s Park tea → skyline drinks'},
    '2026-09-07':{title:'Xi’an',cityId:'xian',summary:'G3880 Business Class · Chengdu East 10:32 AM → Xi’an North 2:21 PM'},
    '2026-09-08':{title:'Xi’an',cityId:'xian',summary:'Terracotta Warriors → City Wall → Siren rooftop → Psyche'},
    '2026-09-09':{title:'Xi’an',cityId:'xian',summary:'Mount Huashan full-day adventure'},
    '2026-09-10':{title:'Beijing',cityId:'beijing',summary:'Xi’an North → Beijing West · estimated 12:04–4:32 PM · ticket pending'},
    '2026-09-11':{title:'Beijing',cityId:'beijing',summary:'Tiananmen → Forbidden City → Summer Palace → Friday club night'},
    '2026-09-12':{title:'Beijing → Shanghai',cityId:'beijing',summary:'Mutianyu Great Wall → Temple of Heaven → fly Shanghai'},
    '2026-09-13':{title:'Shanghai → Home',cityId:'travel',summary:'PVG 10:15 AM → Detroit → Tampa'}
  },
  hotels:{
    shanghai:{name:'Pullman Shanghai Jing An',rating:'5-Star',dates:'Aug 31, Sep 1 & Sep 12',address:"No. 330 Meiyuan Road, Jing’an District, Shanghai, 200070, China",mapQuery:'Pullman Shanghai Jing An',amenities:[['🏊','Pool'],['🏋️','24h Gym'],['🧖','Spa'],['♨️','Steam rooms'],['🍽️','Restaurant'],['🍸','Bar'],['🚇','Metro 50m']],note:'Downtown Jing’an; same property again for final Shanghai night.'},
    zhangjiajie:{name:'Zhangjiajie Jingwu Pullman Hotel',rating:'5-Star',dates:'Sep 2–3',address:'No. 188 Gaoyun Road, Wulingyuan National Scenic Spot District, Zhangjiajie',mapQuery:'Zhangjiajie Jingwu Pullman Hotel',amenities:[['🏊','Outdoor pool'],['🏋️','Fitness'],['🍽️','Restaurants'],['🍸','Lobby bar'],['🥐','Breakfast'],['🅿️','Parking'],['🌿','Garden pool']],note:'Wulingyuan location with easy access to the National Forest Park.'},
    furong:{name:'Tea Xitai Holiday Hotel in Furong Town',rating:'5-Star',dates:'Sep 4',address:'Bridge in Furong Town, Henan Village, Hongshilin Town, Guzhang',mapQuery:'Tea Xitai Holiday Hotel Furong Town',amenities:[['🥐','Breakfast'],['🌊','Waterfall town'],['📸','Night views']],note:'One-night Furong Ancient Town stay.'},
    chengdu:{name:'Crowne Plaza Chengdu',rating:'5-Star',dates:'Sep 5–6',address:'No. 31 Zongfu Street, Jinjiang District, Chengdu',mapQuery:'Crowne Plaza Chengdu 31 Zongfu Street',amenities:[['🏊','Indoor pool'],['🏋️','Fitness'],['🧖','Spa'],['🍽️','Restaurant'],['🛜','Wi‑Fi']],note:'Central Jinjiang District base.'},
    xian:{name:'Wyndham Grand Xi’an',rating:'5-Star',dates:'Sep 7–9',address:"208 Ci’en East Road, Yanta District, Xi’an",mapQuery:'Wyndham Grand Xian 208 Cien East Road',amenities:[['🏊','Indoor pool*'],['🏋️','Gym*'],['🧖','Spa'],['♨️','Hot tub'],['🍽️','Restaurant'],['🍸','Bar'],['🧺','Laundry']],note:'Near Great Tang All Day Mall. Verify pool/gym operating status at check-in.'},
    beijing:{name:'Shangri-La Beijing',rating:'5-Star',dates:'Sep 10–11',address:'No. 29 Zizhuyuan Road, Haidian District, Beijing, 100089, China',mapQuery:'Shangri-La Beijing Zizhuyuan Road',amenities:[['🏊','25m indoor pool'],['🏋️','Fitness'],['🧖','CHI Spa'],['♨️','Whirlpool'],['🧘','Yoga / Pilates'],['☀️','Sun deck']],note:'Two-night Beijing base before the flight back to Shanghai.'}
  },
  support:{
    title:'Chengdu Into International Travel Service Co., Ltd',
    representative:'Su Huaiqiong',
    phones:[{label:'Mobile',number:'+86150008461577',display:'+86 150 00846 1577'},{label:'Office 1',number:'+862861812315',display:'+86 28 6181 2315'},{label:'Office 2',number:'+862885577169',display:'+86 28 8557 7169'}],
    certificate:'L-SC-301961',
    address:'No.1205, 16/F, Unit 2, Building 1, No.13 Changyi Road, Wuhou District, Chengdu, China',
    documentUrl:'https://drive.google.com/file/d/1WSu_bpepsbWZoUjLtA2aAqyJG87YvaQf/view'
  }
};
