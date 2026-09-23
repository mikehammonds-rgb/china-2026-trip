// Share-safe future cruise summaries derived from the previously reconciled
// Royal Caribbean receipts. Keep private identifiers and payment data out.
(()=>{
const image='https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=88&w=1600';
const cityImage='https://images.unsplash.com/photo-1688269910608-e3c65eb4ac3a?auto=format&fit=crop&q=86&w=1400';
const support=[{title:'Royal Caribbean',details:'Cruise check-in and reservation support.',phone:'1-866-562-7625',url:'https://www.royalcaribbean.com/account/signin'}];
const january={
 schemaVersion:1,id:'wonder-january-cruise-2027',title:'January Wonder Cruise',headline:'A January escape at sea.',eyebrow:'JAN 15–19, 2027',
 subtitle:'Four nights aboard Wonder of the Seas, sailing from Miami to the Bahamas and Perfect Day at CocoCay.',
 location:'Miami, Bahamas and Perfect Day at CocoCay',destinationLanguage:'English',start:'2027-01-15',end:'2027-01-19',tripIcon:'🚢',travelers:2,currency:'USD',heroImage:image,
 phasesTitle:'Your cruise trip',quickPartsLabel:'Cruise and planning details',
 phases:[{id:'cruise',icon:'🚢',label:'SAILING',title:'Wonder of the Seas',dates:'Jan 15–19',summary:'Four-night Bahamas and Perfect Day cruise, round-trip from Miami.',status:'Booked'}],
 readiness:[
  {tone:'ready',title:'Confirmed',icon:'✓',items:['Four-night Wonder of the Seas sailing','Deluxe/Suite Guarantee category']},
  {tone:'attention',title:'Before departure',icon:'!',items:['Watch for the final suite-guarantee stateroom assignment','Complete online check-in and choose an arrival time','Confirm the 5:00 PM dining waitlist','Arrange travel to and from PortMiami']}
 ],
 days:[
  {date:'2027-01-15',title:'Embark in Miami',summary:'Wonder of the Seas departs at 4:30 PM.',items:['PortMiami','Complete check-in before sailing','Deluxe/Suite Guarantee']},
  {date:'2027-01-19',title:'Return to Miami',summary:'Disembark after the four-night Bahamas and Perfect Day sailing.',items:['Plan onward transportation']}
 ],
 cities:[{id:'cruise',name:'Wonder of the Seas',icon:'🚢',dates:'Jan 15–19',image:cityImage,coordinates:{lat:25.7781,lng:-80.1794},summary:'A four-night Bahamas and Perfect Day cruise from Miami.',
  days:[{date:'JAN 15',title:'Miami embarkation',summary:'Ship departs at 4:30 PM.',items:['Deluxe/Suite Guarantee','Check-in time to confirm']},{date:'JAN 19',title:'Miami return',summary:'End of the four-night sailing.',items:['Onward transportation to arrange']}],
  highlights:[{name:'Stateroom',note:'Deluxe/Suite Guarantee; final stateroom assignment is pending.'},{name:'Dining',note:'5:00 PM traditional dining seating is waitlisted.'},{name:'Itinerary',note:'Bahamas and Perfect Day at CocoCay. Exact port-day schedule was not in the available trip summary.'}]}],
 transport:[{type:'cruise',icon:'🚢',date:'JAN 15–19',title:'Wonder of the Seas',details:'Round-trip Miami; four-night Bahamas and Perfect Day itinerary.',notes:['Deluxe/Suite Guarantee','Stateroom assignment pending']}],
 timeline:[{icon:'🚢',date:'JAN 15 · 4:30 PM',title:'Wonder departs Miami',details:'Begin the four-night Bahamas and Perfect Day cruise.'},{icon:'⚓',date:'JAN 19',title:'Return to Miami',details:'Disembark and continue onward.'}],
 support
};
const february={
 schemaVersion:1,id:'harmony-february-cruise-2027',title:'February Harmony Cruise',headline:'Five nights on Harmony.',eyebrow:'FEB 25–MAR 2, 2027',
 subtitle:'A Bahamas and Perfect Day sailing aboard Harmony of the Seas from Port Canaveral.',
 location:'Port Canaveral, Bahamas and Perfect Day at CocoCay',destinationLanguage:'English',start:'2027-02-25',end:'2027-03-02',tripIcon:'🚢',travelers:2,currency:'USD',heroImage:image,
 phasesTitle:'Your cruise trip',quickPartsLabel:'Cruise and planning details',
 phases:[{id:'cruise',icon:'🚢',label:'SAILING',title:'Harmony of the Seas',dates:'Feb 25–Mar 2',summary:'Five-night Bahamas and Perfect Day cruise, round-trip from Port Canaveral.',status:'Booked'}],
 readiness:[
  {tone:'ready',title:'Confirmed',icon:'✓',items:['Five-night Harmony of the Seas sailing','Ocean View Balcony stateroom','Family traveling on a separate reservation']},
  {tone:'attention',title:'Before departure',icon:'!',items:['Complete online check-in and choose an arrival time','Confirm the 6:45 PM dining waitlist','Coordinate arrival with family on the separate reservation','Arrange travel to and from Port Canaveral']}
 ],
 days:[
  {date:'2027-02-25',title:'Embark at Port Canaveral',summary:'Harmony of the Seas departs at 4:00 PM.',items:['Port Canaveral','Ocean View Balcony','Coordinate with family']},
  {date:'2027-03-02',title:'Return to Port Canaveral',summary:'Disembark after the five-night Bahamas and Perfect Day sailing.',items:['Plan onward transportation']}
 ],
 cities:[{id:'cruise',name:'Harmony of the Seas',icon:'🚢',dates:'Feb 25–Mar 2',image:cityImage,coordinates:{lat:28.4104,lng:-80.6188},summary:'A five-night Bahamas and Perfect Day cruise from Port Canaveral.',
  days:[{date:'FEB 25',title:'Port Canaveral embarkation',summary:'Ship departs at 4:00 PM.',items:['Ocean View Balcony','Check-in time to confirm']},{date:'MAR 2',title:'Port Canaveral return',summary:'End of the five-night sailing.',items:['Onward transportation to arrange']}],
  highlights:[{name:'Stateroom',note:'Ocean View Balcony, category 4D, with 0% obstructed view.'},{name:'Dining',note:'6:45 PM traditional dining seating is waitlisted.'},{name:'Travel party',note:'Family members are booked on their own reservation.'},{name:'Itinerary',note:'Bahamas and Perfect Day at CocoCay. Exact port-day schedule was not in the available trip summary.'}]}],
 transport:[{type:'cruise',icon:'🚢',date:'FEB 25–MAR 2',title:'Harmony of the Seas',details:'Round-trip Port Canaveral; five-night Bahamas and Perfect Day itinerary.',notes:['Ocean View Balcony']}],
 timeline:[{icon:'🚢',date:'FEB 25 · 4:00 PM',title:'Harmony departs Port Canaveral',details:'Begin the five-night Bahamas and Perfect Day cruise.'},{icon:'⚓',date:'MAR 2',title:'Return to Port Canaveral',details:'Disembark and continue onward.'}],
 support
};
window.TRAVEL_COMMAND_CENTER_TRIPS=[...(window.TRAVEL_COMMAND_CENTER_TRIPS||[]),january,february];
})();
