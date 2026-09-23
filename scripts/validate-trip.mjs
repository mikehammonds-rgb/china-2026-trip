import fs from 'node:fs';
import {createHash} from 'node:crypto';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const config=JSON.parse(fs.readFileSync(path.join(root,'site.config.json'),'utf8'));
const privacyBaseline=new Set(JSON.parse(fs.readFileSync(path.join(root,'privacy-baseline.json'),'utf8')).map(item=>`${item.tripId}|${item.path}|${item.sha256}`));
const sandbox={window:{}};
for(const file of config.tripModules){
  if(!/^data\/[a-z0-9-]+\.js$/.test(file))throw new Error(`Invalid trip module: ${file}`);
  vm.runInNewContext(fs.readFileSync(path.join(root,file),'utf8'),sandbox,{filename:file});
}

const trips=sandbox.window.TRAVEL_COMMAND_CENTER_TRIPS;
const errors=[];
const warnings=[];
const iso=value=>{
  if(typeof value!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;
  const date=new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.valueOf())&&date.toISOString().slice(0,10)===value;
};
const forbiddenKey=/(confirmation|reservation|passport|ticket.?number|loyalty|payment|credit.?card|legal.?name|booking.?reference|record.?locator|pnr)/i;
const approvedPublicReservation=/^publicTravelParty\.(?:reservation|companions\[\d+\]\.reservation)$/;
const privateReference=/(?:confirmation|reservation|booking|ticket|passport|loyalty|crown\s*&\s*anchor)\s*(?:number|no\.?|#|code|id|:)\s*[:#-]?\s*[a-z0-9-]{5,}/i;
const cardNumber=/\b(?:\d[ -]*?){13,19}\b/;
function inspect(value,where,tripId,field=''){
  if(Array.isArray(value)){value.forEach((item,index)=>inspect(item,`${where}[${index}]`,tripId,`${field}[${index}]`));return}
  if(value&&typeof value==='object'){
    for(const [key,item] of Object.entries(value)){
      const nextField=field?`${field}.${key}`:key;
      if(forbiddenKey.test(key)&&!approvedPublicReservation.test(nextField))errors.push(`${where}.${key}: private field name`);
      inspect(item,`${where}.${key}`,tripId,nextField);
    }
    return;
  }
  if(typeof value!=='string'||/^https?:\/\//.test(value))return;
  if(privateReference.test(value)||cardNumber.test(value))errors.push(`${where}: possible private identifier in text`);
  if(/\$\s?\d|\b(?:paid|prepaid|unpaid|collected by|payment due)\b/i.test(value)){
    const fingerprint=`${tripId}|${field}|${createHash('sha256').update(value).digest('hex')}`;
    if(privacyBaseline.has(fingerprint))warnings.push(`${where}: existing price or payment wording`);
    else errors.push(`${where}: new price or payment wording needs review`);
  }
}

if(!Array.isArray(trips)||!trips.length)errors.push('trip registry is empty');
const ids=new Set();
for(const [index,trip] of (trips||[]).entries()){
  const where=`trips[${index}]${trip?.id?` (${trip.id})`:''}`;
  if(!trip||typeof trip!=='object'){errors.push(`${where}: trip data is missing`);continue}
  if(!/^[a-z0-9-]+$/.test(trip.id||''))errors.push(`${where}: id must be a lowercase slug`);
  if(ids.has(trip.id))errors.push(`${where}: duplicate trip id`);
  ids.add(trip.id);
  if(!trip.title)errors.push(`${where}: title is required`);
  if(!iso(trip.start)||!iso(trip.end))errors.push(`${where}: invalid start or end date`);
  else if(trip.start>trip.end)errors.push(`${where}: start must be before end`);
  if(!Array.isArray(trip.cities)||!trip.cities.length)errors.push(`${where}: at least one city is required`);
  const cityIds=new Set();
  for(const city of Array.isArray(trip.cities)?trip.cities:[]){
    if(!city||typeof city!=='object'){errors.push(`${where}: invalid city entry`);continue}
    if(!city.id||!city.name)errors.push(`${where}: each city needs an id and name`);
    if(cityIds.has(city.id))errors.push(`${where}: duplicate city id ${city.id}`);
    cityIds.add(city.id);
  }
  if(trip.days!=null&&!Array.isArray(trip.days))errors.push(`${where}: days must be a list`);
  for(const day of Array.isArray(trip.days)?trip.days:[]){
    if(!day||typeof day!=='object'){errors.push(`${where}: invalid day entry`);continue}
    if(!iso(day.date))errors.push(`${where}: invalid day date ${day.date||'(missing)'}`);
    else if(iso(trip.start)&&iso(trip.end)&&(day.date<trip.start||day.date>trip.end))errors.push(`${where}: day outside trip range ${day.date}`);
  }
  inspect(trip,where,trip.id);
}
if(sandbox.window.TRAVEL_COMMAND_CENTER_ACTIVE_TRIP&&!ids.has(sandbox.window.TRAVEL_COMMAND_CENTER_ACTIVE_TRIP.id))errors.push('active trip is missing from trip registry');

for(const issue of warnings)console.warn(`WARN ${issue}`);
if(errors.length){for(const issue of errors)console.error(`ERROR ${issue}`);process.exitCode=1}
else console.log(`OK: ${trips.length} distinct trips validated; ${warnings.length} privacy review warning(s)`);
