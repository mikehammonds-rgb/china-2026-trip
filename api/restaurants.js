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
  if(!key)return res.status(503).json({error:'Restaurant service is not configured yet'});

  try{
    const response=await fetch('https://places.googleapis.com/v1/places:searchNearby',{
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'X-Goog-Api-Key':key,
        'X-Goog-FieldMask':'places.id,places.displayName,places.rating,places.userRatingCount,places.priceLevel,places.primaryType,places.primaryTypeDisplayName,places.types,places.location,places.formattedAddress,places.googleMapsUri'
      },
      body:JSON.stringify({
        includedTypes:['restaurant'],
        excludedTypes:['shopping_mall','dessert_shop','ice_cream_shop','bakery','cafe','coffee_shop','bar','night_club','store','food_store'],
        maxResultCount:20,
        rankPreference:'POPULARITY',
        locationRestriction:{circle:{center:{latitude:lat,longitude:lng},radius:2500}}
      })
    });

    if(!response.ok){
      const detail=await response.text();
      return res.status(502).json({error:'Places lookup failed',detail:detail.slice(0,300)});
    }

    const data=await response.json();
    const rad=x=>x*Math.PI/180;
    const distance=(a,b,c,d)=>{
      const R=6371e3,da=rad(c-a),db=rad(d-b),q=Math.sin(da/2)**2+Math.cos(rad(a))*Math.cos(rad(c))*Math.sin(db/2)**2;
      return 2*R*Math.atan2(Math.sqrt(q),Math.sqrt(1-q));
    };
    const dollars=p=>({
      PRICE_LEVEL_FREE:'$',
      PRICE_LEVEL_INEXPENSIVE:'$',
      PRICE_LEVEL_MODERATE:'$$',
      PRICE_LEVEL_EXPENSIVE:'$$$',
      PRICE_LEVEL_VERY_EXPENSIVE:'$$$$'
    }[p]||'—');

    const blockedTypes=new Set(['shopping_mall','dessert_shop','ice_cream_shop','bakery','cafe','coffee_shop','bar','night_club','store','food_store']);
    const restaurants=(data.places||[])
      .filter(p=>{
        const types=p.types||[];
        const isRestaurant=types.includes('restaurant')||String(p.primaryType||'').includes('restaurant');
        const blocked=types.some(t=>blockedTypes.has(t))||blockedTypes.has(p.primaryType);
        return isRestaurant&&!blocked&&(p.rating||0)>=4.2&&(p.userRatingCount||0)>=50;
      })
      .map(p=>{
        const distanceMeters=p.location?Math.round(distance(lat,lng,p.location.latitude,p.location.longitude)):null;
        const rating=p.rating||0,reviews=p.userRatingCount||0;
        const proximity=Math.max(0,1-((distanceMeters||2500)/2500));
        const reviewStrength=Math.min(1,Math.log10(Math.max(10,reviews))/4.3);
        const quality=(rating-4)/1;
        const score=(quality*0.5)+(reviewStrength*0.3)+(proximity*0.2);
        return{
          id:p.id,
          name:p.displayName?.text||'Restaurant',
          rating,
          reviews,
          price:dollars(p.priceLevel),
          cuisine:p.primaryTypeDisplayName?.text||'Restaurant',
          address:p.formattedAddress||'',
          distanceMeters,
          score,
          maps:p.googleMapsUri||`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.displayName?.text||'restaurant')}`
        };
      })
      .sort((a,b)=>b.score-a.score||b.rating-a.rating||b.reviews-a.reviews||((a.distanceMeters||1e9)-(b.distanceMeters||1e9)))
      .slice(0,10)
      .map(({score,...r})=>r);

    return res.status(200).json({center:{lat,lng},radiusMeters:2500,restaurants});
  }catch(error){
    return res.status(500).json({error:'Restaurant lookup failed'});
  }
}
