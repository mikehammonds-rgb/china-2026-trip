const CITIES={
  shanghai:{name:'Shanghai',lat:31.2304,lng:121.4737},
  zhangjiajie:{name:'Zhangjiajie · Wulingyuan',lat:29.3457,lng:110.5503},
  furong:{name:'Furong Ancient Town',lat:28.7452,lng:109.9406},
  chengdu:{name:'Chengdu',lat:30.5728,lng:104.0668},
  xian:{name:'Xi’an',lat:34.3416,lng:108.9398},
  beijing:{name:'Beijing',lat:39.9042,lng:116.4074}
};

export default async function handler(req,res){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','GET,OPTIONS');
  if(req.method==='OPTIONS')return res.status(204).end();
  if(req.method!=='GET')return res.status(405).json({error:'Method not allowed'});

  const requested=String(req.query.city||'').trim();
  const id=requested.toLowerCase().replace(/[^a-z0-9]+/g,'');
  let city=CITIES[id];
  const suppliedLat=Number(req.query.lat),suppliedLng=Number(req.query.lng);
  if(Number.isFinite(suppliedLat)&&Number.isFinite(suppliedLng)&&Math.abs(suppliedLat)<=90&&Math.abs(suppliedLng)<=180){
    city={name:requested||'Current destination',lat:suppliedLat,lng:suppliedLng};
  }

  if(!city&&requested){
    try{
      const lookup=await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(requested)}&count=1&language=en&format=json`);
      const match=(await lookup.json())?.results?.[0];
      if(match)city={name:[match.name,match.country].filter(Boolean).join(', '),lat:match.latitude,lng:match.longitude};
    }catch{}
  }
  if(!city)return res.status(400).json({error:'City name or valid coordinates required'});

  const params=new URLSearchParams({
    latitude:String(city.lat),
    longitude:String(city.lng),
    daily:'weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,wind_speed_10m_max',
    temperature_unit:'fahrenheit',
    wind_speed_unit:'mph',
    precipitation_unit:'inch',
    timezone:'auto',
    forecast_days:'7'
  });

  try{
    const response=await fetch(`https://api.open-meteo.com/v1/forecast?${params}`);
    if(!response.ok)return res.status(502).json({error:'Weather provider unavailable'});
    const data=await response.json(),d=data.daily;
    if(!d?.time?.length)return res.status(502).json({error:'Forecast data unavailable'});
    const forecast=d.time.slice(0,7).map((date,i)=>({
      date,
      code:d.weather_code?.[i],
      high:d.temperature_2m_max?.[i],
      low:d.temperature_2m_min?.[i],
      rainChance:d.precipitation_probability_max?.[i],
      wind:d.wind_speed_10m_max?.[i]
    }));
    res.setHeader('Cache-Control','s-maxage=1800, stale-while-revalidate=3600');
    return res.status(200).json({city:{id,name:city.name},timezone:data.timezone,forecast,source:'Open-Meteo'});
  }catch(error){
    return res.status(500).json({error:'Weather lookup failed'});
  }
}
