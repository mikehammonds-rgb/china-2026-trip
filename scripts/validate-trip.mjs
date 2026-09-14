import fs from 'node:fs';
import vm from 'node:vm';

const file=process.argv[2]||'data/active-trip.js';
const source=fs.readFileSync(file,'utf8');
const sandbox={window:{}};
vm.runInNewContext(source,sandbox,{filename:file});
const trip=sandbox.window.TRAVEL_COMMAND_CENTER_ACTIVE_TRIP;

if(trip===null){console.log('OK: no active trip');process.exit(0)}

const errors=[];
const iso=value=>/^\d{4}-\d{2}-\d{2}$/.test(value||'');
if(!trip?.id||!/^[a-z0-9-]+$/.test(trip.id))errors.push('id must be a lowercase slug');
if(!trip?.title)errors.push('title is required');
if(!iso(trip?.start)||!iso(trip?.end))errors.push('start and end must use YYYY-MM-DD');
if(iso(trip?.start)&&iso(trip?.end)&&trip.start>trip.end)errors.push('start must be before end');
if(!Array.isArray(trip?.cities)||trip.cities.length===0)errors.push('at least one city is required');
const cityIds=(trip?.cities||[]).map(city=>city.id);
if(cityIds.some(id=>!id))errors.push('every city needs an id');
if(new Set(cityIds).size!==cityIds.length)errors.push('city ids must be unique');
for(const day of trip?.days||[]){if(!iso(day.date))errors.push(`invalid day date: ${day.date||'(missing)'}`);if(iso(day.date)&&(day.date<trip.start||day.date>trip.end))errors.push(`day outside trip range: ${day.date}`)}

const forbidden=/(confirmation|passport|ticket.?number|loyalty|payment|credit.?card|legal.?name|booking.?reference|record.?locator|pnr)/i;
const scan=(value,path='trip')=>{if(Array.isArray(value))return value.forEach((item,index)=>scan(item,`${path}[${index}]`));if(!value||typeof value!=='object')return;for(const [key,item] of Object.entries(value)){if(forbidden.test(key))errors.push(`private field is not allowed in public data: ${path}.${key}`);scan(item,`${path}.${key}`)}};
scan(trip);

if(errors.length){console.error(`Trip validation failed (${errors.length}):\n- ${errors.join('\n- ')}`);process.exit(1)}
console.log(`OK: ${trip.title} · ${trip.start} to ${trip.end} · ${trip.cities.length} cities`);
