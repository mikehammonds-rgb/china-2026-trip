// Copy this file to data/active-trip.js and replace the sample values.
// Never include confirmation numbers, ticket numbers, passport data,
// payment details, traveler legal names, or private document links.
window.TRAVEL_COMMAND_CENTER_ACTIVE_TRIP={
  schemaVersion:1,
  id:'destination-yyyy',
  title:'Destination YYYY',
  headline:'Destination Command Center',
  eyebrow:'MY NEXT TRIP · JAN 1 – JAN 7',
  subtitle:'One pocket guide for the entire adventure.',
  location:'Destination',
  destinationLanguage:'Local language',
  start:'2027-01-01',
  end:'2027-01-07',
  heroImage:'https://example.com/share-safe-cover-image.jpg',
  travelers:1,
  currency:'USD',
  sharedPhotosUrl:'',
  days:[
    {date:'2027-01-01',title:'Arrival',summary:'Airport → hotel → easy first evening'}
  ],
  cities:[
    {
      id:'city-name',name:'City Name',icon:'🌆',dates:'Jan 1–7',image:'https://example.com/city-image.jpg',coordinates:{lat:0,lng:0},
      summary:'What makes this stop special.',
      days:[{date:'JAN 1',title:'Arrival day',summary:'Check in and explore nearby',items:['Airport transfer','Hotel check-in']}],
      hotel:{name:'Hotel Name',address:'Public address',mapQuery:'Hotel Name City',amenities:['Pool','Gym']},
      highlights:[{name:'Must-see place',note:'Why it belongs in the plan.'}],
      nightlife:[{name:'Evening option',note:'Best night and atmosphere.'}],
      photoSpots:[{name:'Photo location',note:'Best time for the shot.'}]
    }
  ],
  transport:[
    {type:'flight',date:'JAN 1',title:'Home → Destination',details:'Airline · flight · departure → arrival',notes:['Cabin','Baggage']}
  ],
  timeline:[
    {icon:'✈️',date:'JAN 1 · 9:00 AM',title:'Depart home',details:'Flight details'}
  ],
  support:[
    {title:'Local support',details:'Share-safe contact details',phone:'',url:''}
  ]
};
