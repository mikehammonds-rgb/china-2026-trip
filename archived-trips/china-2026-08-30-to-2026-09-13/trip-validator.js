(()=>{
function validateTripConfig(config){
  const errors=[],warnings=[];
  const req=(value,path)=>{if(value===undefined||value===null||value==='')errors.push(`Missing ${path}`)};
  if(!config||typeof config!=='object')return{valid:false,errors:['TRIP_CONFIG is missing'],warnings};
  req(config.trip?.id,'trip.id');req(config.trip?.title,'trip.title');req(config.trip?.start,'trip.start');req(config.trip?.end,'trip.end');
  if(config.trip?.start&&Number.isNaN(Date.parse(config.trip.start)))errors.push('trip.start is not a valid date');
  if(config.trip?.end&&Number.isNaN(Date.parse(config.trip.end)))errors.push('trip.end is not a valid date');
  if(Date.parse(config.trip?.end)<Date.parse(config.trip?.start))errors.push('trip.end is before trip.start');
  if(!Array.isArray(config.route)||!config.route.length)errors.push('route must contain at least one destination');
  const ids=new Set();
  (config.route||[]).forEach((stop,i)=>{req(stop.id,`route[${i}].id`);req(stop.name,`route[${i}].name`);if(ids.has(stop.id))errors.push(`Duplicate route id: ${stop.id}`);ids.add(stop.id)});
  Object.entries(config.days||{}).forEach(([date,day])=>{if(!/^\d{4}-\d{2}-\d{2}$/.test(date))errors.push(`Invalid day key: ${date}`);if(day.cityId&&day.cityId!=='travel'&&!ids.has(day.cityId))errors.push(`${date} references unknown cityId: ${day.cityId}`)});
  Object.keys(config.hotels||{}).forEach(id=>{if(!ids.has(id))warnings.push(`Hotel references route id not present: ${id}`)});
  if(config.trip?.sharedPhotosUrl&&!/^https:\/\//i.test(config.trip.sharedPhotosUrl))warnings.push('sharedPhotosUrl should use HTTPS');
  return{valid:errors.length===0,errors,warnings};
}
window.TripDashboard=window.TripDashboard||{};
window.TripDashboard.validate=()=>validateTripConfig(window.TRIP_CONFIG);
window.TripDashboard.validateConfig=validateTripConfig;
})();