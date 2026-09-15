// Share-safe trip data assembled from the December cruise and ski-trip Gmail labels.
// Private confirmation numbers, ticket numbers, loyalty IDs and payment details are omitted.
window.TRAVEL_COMMAND_CENTER_ACTIVE_TRIP={
  schemaVersion:1,
  id:'holiday-cruise-tahoe-2026',
  title:'Holiday Cruise + Tahoe',
  headline:'Sea to snow.',
  eyebrow:'DEC 24, 2026 - JAN 2, 2027',
  subtitle:'Four nights in the Bahamas, then a New Year ski escape in Lake Tahoe.',
  location:'Bahamas and Lake Tahoe',
  destinationLanguage:'English',
  start:'2026-12-24',
  end:'2027-01-02',
  heroImage:'https://images.unsplash.com/photo-1767688300025-987b2af2e57f?auto=format&fit=crop&q=88&w=1600',
  travelers:2,
  currency:'USD',
  phases:[
    {
      id:'cruise',
      icon:'🚢',
      label:'PART 1',
      title:'Holiday cruise',
      dates:'Dec 24-28',
      summary:'Wonder of the Seas - Miami, Nassau, a sea day and Perfect Day at CocoCay.',
      status:'Booked and paid'
    },
    {
      id:'tahoe',
      icon:'⛷️',
      label:'PART 2',
      title:'Tahoe ski trip',
      dates:'Dec 28-Jan 2',
      summary:'Fly Miami to Reno, ski over New Year, then return overnight to Tampa.',
      status:'Flights booked - plans to finish'
    }
  ],
  readiness:[
    {
      tone:'ready',
      title:'Already booked',
      icon:'✓',
      items:['Cruise fare is paid','Beverage package for two is paid','Miami to Reno flights','Reno hotel for Dec 28','Reno to Tampa return flights']
    },
    {
      tone:'attention',
      title:'Still to arrange',
      icon:'!',
      items:['Travel to the Miami cruise terminal','Reno to Lake Tahoe transportation','Tahoe lodging for Dec 29-Jan 1','Ski mountain, lift tickets and rentals']
    }
  ],
  days:[
    {date:'2026-12-24',title:'Embark in Miami',summary:'Cruise check-in window is noon-3:00 PM; Wonder of the Seas departs at 4:30 PM.',items:['Miami cruise terminal','Board by 3:00 PM','Interior stateroom']},
    {date:'2026-12-25',title:'Christmas in Nassau',summary:'Arrive 7:30 AM and depart 5:30 PM.',items:['Nassau','Back aboard before departure']},
    {date:'2026-12-26',title:'Sea day',summary:'A full day aboard Wonder of the Seas.',items:['Beverage package active','5:00 PM dining waitlist']},
    {date:'2026-12-27',title:'Perfect Day at CocoCay',summary:'Arrive 7:00 AM and depart 5:00 PM.',items:['CocoCay','Back aboard before departure']},
    {date:'2026-12-28',title:'Ship to slopes',summary:'Arrive Miami at 6:00 AM, fly to Reno that evening and check in late.',items:['MIA-SLC-RNO','Reno arrival 11:34 PM','Silver Legacy overnight']},
    {date:'2026-12-29',title:'Reno to Lake Tahoe',summary:'Check out by noon and continue to the Tahoe ski stay.',items:['Ground transfer to arrange','Tahoe lodging to add']},
    {date:'2026-12-30',title:'Tahoe ski day',summary:'Mountain and lift plan still to be added.',items:['Lift ticket','Rental or gear plan']},
    {date:'2026-12-31',title:'New Year\'s Eve in Tahoe',summary:'Ski day and New Year celebration; plans still open.',items:['Ski plan','New Year dinner or event']},
    {date:'2027-01-01',title:'Final ski day and fly home',summary:'Leave enough time to return to Reno airport for the 6:49 PM flight.',items:['RNO-LAX-TPA','Overnight flight']},
    {date:'2027-01-02',title:'Arrive home',summary:'Land in Tampa at 6:58 AM.',items:['Tampa arrival']}
  ],
  cities:[
    {
      id:'cruise',name:'Wonder of the Seas',icon:'🚢',dates:'Dec 24-28',
      image:'https://images.unsplash.com/photo-1688269910608-e3c65eb4ac3a?auto=format&fit=crop&q=86&w=1400',
      coordinates:{lat:25.7781,lng:-80.1794},
      summary:'A four-night Bahamas and Perfect Day holiday sailing from Miami.',
      days:[
        {date:'DEC 24',title:'Miami embarkation',summary:'Check in noon-3:00 PM; depart 4:30 PM.',items:['Wonder of the Seas','Interior stateroom']},
        {date:'DEC 25',title:'Nassau',summary:'7:30 AM-5:30 PM port call.',items:['Christmas Day']},
        {date:'DEC 26',title:'Cruising',summary:'Full sea day.',items:['Beverage package for two']},
        {date:'DEC 27',title:'Perfect Day at CocoCay',summary:'7:00 AM-5:00 PM port call.',items:['Private island day']},
        {date:'DEC 28',title:'Miami arrival',summary:'Dock at 6:00 AM, then transition to the ski trip.',items:['Evening flight to Reno']}
      ],
      highlights:[
        {name:'Dining',note:'5:00 PM seating is currently waitlisted.'},
        {name:'Beverage package',note:'Deluxe Beverage Package for two is confirmed and paid.'},
        {name:'Royal app check-in',note:'Complete check-in and choose an arrival time before sailing.'}
      ]
    },
    {
      id:'tahoe',name:'Reno + Lake Tahoe',icon:'⛷️',dates:'Dec 28-Jan 2',
      image:'https://images.unsplash.com/photo-1767688300025-987b2af2e57f?auto=format&fit=crop&q=86&w=1400',
      coordinates:{lat:39.0968,lng:-120.0324},
      summary:'A fast New Year ski chapter, using Reno as the air gateway to Lake Tahoe.',
      days:[
        {date:'DEC 28',title:'Late Reno arrival',summary:'Land at 11:34 PM and head to Silver Legacy.',items:['Call hotel about late arrival','Airport shuttle included']},
        {date:'DEC 29',title:'Move to Tahoe',summary:'Check out by noon; mountain transfer and Tahoe lodging are not yet in the folder.',items:['Ground transport needed','Lodging needed']},
        {date:'DEC 30-31',title:'Ski and celebrate',summary:'Two full Tahoe days, including New Year\'s Eve.',items:['Choose mountain','Lift tickets','Rentals']},
        {date:'JAN 1',title:'Ski, then return to Reno',summary:'Reno flight departs at 6:49 PM.',items:['Build in winter road time','Airport bag cutoff']}
      ],
      hotel:{
        name:'Silver Legacy Resort Casino',
        address:'407 N Virginia St., Reno, NV 89503',
        mapQuery:'Silver Legacy Resort Casino Reno Nevada',
        amenities:['Dec 28-29','Premium king, non-smoking','3:00 PM check-in','Noon check-out','Airport shuttle','Self parking','Wi-Fi','$36.95 resort fee + tax','$3 tourism surcharge']
      },
      highlights:[
        {name:'Late-arrival check',note:'The inbound flight lands at 11:34 PM. Call the hotel ahead so the room is held.'},
        {name:'Winter transfer buffer',note:'Allow extra time between Lake Tahoe and Reno airport on Jan 1.'}
      ]
    }
  ],
  transport:[
    {type:'cruise',icon:'🚢',date:'DEC 24-28',title:'Wonder of the Seas',details:'Miami - Nassau - sea day - Perfect Day at CocoCay - Miami',notes:['4 nights','Check-in noon-3:00 PM','Paid in full']},
    {type:'flight',date:'DEC 28',title:'Miami to Reno',details:'Delta 973: MIA 6:25 PM - SLC 9:46 PM; Delta 1607: SLC 10:59 PM - RNO 11:34 PM',notes:['One stop in Salt Lake City','Two checked bags shown as included']},
    {type:'hotel',date:'DEC 28-29',title:'Silver Legacy Resort Casino',details:'One-night premium king stay in downtown Reno.',notes:['Late arrival','Airport shuttle','Check-out by noon']},
    {type:'transfer',date:'DEC 29',title:'Reno to Lake Tahoe',details:'Ground transportation is not yet in the Gmail folder.',notes:['Needs booking','Plan for winter conditions']},
    {type:'hotel',date:'DEC 29-JAN 1',title:'Lake Tahoe lodging',details:'No Tahoe hotel or vacation rental was found in the Gmail folder.',notes:['Needs booking']},
    {type:'flight',date:'JAN 1-2',title:'Reno to Tampa',details:'United 2397: RNO 6:49 PM - LAX 8:22 PM; United 2372: LAX 11:15 PM - TPA 6:58 AM next day',notes:['One stop in Los Angeles','Overnight arrival']}
  ],
  timeline:[
    {icon:'🚢',date:'DEC 24 · 12:00-3:00 PM',title:'Cruise check-in',details:'Board Wonder of the Seas in Miami before the 4:30 PM departure.'},
    {icon:'🏝️',date:'DEC 25 · 7:30 AM-5:30 PM',title:'Nassau',details:'Christmas Day port call.'},
    {icon:'🌊',date:'DEC 26',title:'Sea day',details:'Full day aboard.'},
    {icon:'🏖️',date:'DEC 27 · 7:00 AM-5:00 PM',title:'Perfect Day at CocoCay',details:'Private island port day.'},
    {icon:'✈️',date:'DEC 28 · 6:25 PM',title:'Fly Miami to Reno',details:'Connect in Salt Lake City and land in Reno at 11:34 PM.'},
    {icon:'🏨',date:'DEC 28 · LATE',title:'Silver Legacy check-in',details:'One night in Reno; call ahead because arrival is after 11:30 PM.'},
    {icon:'🏔️',date:'DEC 29',title:'Transfer to Lake Tahoe',details:'Check out by noon and begin the ski chapter.'},
    {icon:'⛷️',date:'DEC 30-31',title:'Tahoe ski days',details:'Mountain, tickets and rentals still to be selected.'},
    {icon:'✈️',date:'JAN 1 · 6:49 PM',title:'Fly Reno to Tampa',details:'Connect in Los Angeles and arrive in Tampa Jan 2 at 6:58 AM.'}
  ],
  support:[
    {title:'Royal Caribbean',details:'Cruise support and app check-in.',phone:'1-866-562-7625',url:'https://www.royalcaribbean.com/account/signin'},
    {title:'Silver Legacy',details:'Call about the late Dec 28 arrival and airport shuttle.',phone:'1-800-687-8733',url:'https://www.caesars.com/silver-legacy-reno'}
  ]
};
