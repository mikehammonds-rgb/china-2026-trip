export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS');
  if(req.method==='OPTIONS')return res.status(204).end();
  if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});

  const lat=Number(req.query.lat),lng=Number(req.query.lng);
  if(!Number.isFinite(lat)||!Number.isFinite(lng)||Math.abs(lat)>90||Math.abs(lng)>180){
    return res.status(400).json({error:'Valid lat/lng required'});
  }

  const key=process.env.GOOGLE_PLACES_API_KEY;
  if(!key)return res.status(503).json({error:'Spa service is not configured yet'});

  try{
    const response=await fetch('https://places.googleapis.com/v1/places:searchNearby',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':key,
        'X-Goog-FieldMask':'places.id,places.displayName,places.rating,places.userRatingCount,places.primaryTypeDisplayName,places.location,places.formattedAddress,places.googleMapsUri,places.currentOpeningHours,places.regularOpeningHours'
      },
      body:JSON.stringify({
        includedTypes:['spa'],
        maxResultCount:20,
        rankPreference:'DISTANCE',
        locationRestriction:{circle:{center:{latitude:lat,longitude:lng},radius:8000}}
      })
    });

    if(!response.ok){
      const detail=await response.text();
      return res.status(502).json({error:'Places lookup failed',detail:detail.slice(0,400)});
    }

    const data=await response.json();
    const rad=x=>x*Math.PI/180;
    const distance=(a,b,c,d)=>{
      const R=6371e3,da=rad(c-a),db=rad(d-b),q=Math.sin(da/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(db/2)**2;
      return 2*R*Math.atan2(Math.sqrt(q),Math.sqrt(1-q));
    };
    const is24Hours=hours=>{
      const desc=hours?.weekdayDescriptions||[];
      if(desc.length&&desc.every(x=>/open 24 hours/i.test(x)))return true;
      const periods=hours?.periods||[];
      return periods.length===1&&periods[0]?.open?.day===0&&periods[0]?.open?.hour===0&&!periods[0]?.close;
    };
    const todayHours=hours=>{
      const desc=hours?.weekdayDescriptions||[];
      if(!desc.length)return 'Hours not listed';
      const jsDay=new Date().getDay();
      const names=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
      const match=desc.find(x=>x.toLowerCase().startsWith(names[jsDay].toLowerCase()+':'));
      return match?match.replace(/^[^:]+:\s*/,''):desc[jsDay]||'Hours not listed';
    };

    const spas=(data.places||[]).map(p=>{
      const hours=p.currentOpeningHours||p.regularOpeningHours||null;
      const distanceMeters=p.location?Math.round(distance(lat,lng,p.location.latitude,p.location.longitude)):null;
      return{
        id:p.id,
        name:p.displayName?.text||'Spa',
        rating:p.rating||0,
        reviews:p.userRatingCount||0,
        type:p.primaryTypeDisplayName?.text||'Spa',
        address:p.formattedAddress||'',
        distanceMeters,
        openNow:typeof hours?.openNow==='boolean'?hours.openNow:null,
        todayHours:todayHours(hours),
        is24Hours:is24Hours(p.regularOpeningHours||hours),
        weeklyHours:p.regularOpeningHours?.weekdayDescriptions||hours?.weekdayDescriptions||[],
        maps:p.googleMapsUri||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.displayName?.text||'spa')}`
      };
    }).sort((a,b)=>(a.distanceMeters||1e9)-(b.distanceMeters||1e9)).slice(0,10);

    return res.status(200).json({center:{lat,lng},radiusMeters:8000,spas});
  }catch(error){
    return res.status(500).json({error:'Spa lookup failed'});
  }
}
