import { MaterialCommunityIcons, FontAwesome5, Entypo, Ionicons, Feather } from '@expo/vector-icons';

export const SliderOPtions = [
  {
    id: 1,
    title: 'Latest',
    Icon: (props) => <Ionicons name="globe-outline" {...props} />,
  },
  {
    id: 2,
    title: 'Hotels',
    Icon: (props) => <Ionicons name="bed-outline" {...props} />,
  },
  {
    id: 3,
    title: 'Resorts',
    Icon: (props) => <MaterialCommunityIcons name="beach" {...props} />,
  },
  {
    id: 4,
    title: 'Villas',
    Icon: (props) => <MaterialCommunityIcons name="home-city-outline" {...props} />,
  },
  {
    id: 5,
    title: 'Islands',
    Icon: (props) => <MaterialCommunityIcons name="island" {...props} />,
  },
  {
    id: 6,
    title: 'Farms',
    Icon: (props) => <MaterialCommunityIcons name="home-flood" {...props} />,
  },
  {
    id: 7,
    title: 'Hubs',
    Icon: (props) => <MaterialCommunityIcons name="office-building" {...props} />,
  },
];


export const fullFlights = [
  {
    id: 'AI2975',
    airline: {
      name: 'Air India',
      logo: 'https://nextgentrip.com/images/AI.gif',
    },
    flightNumber: '2975',
    from: {
      city: 'Delhi',
      code: 'DEL',
      time: '2025-05-31T05:55:00',
      terminal: '3',
    },
    to: {
      city: 'Mumbai',
      code: 'BOM',
      time: '2025-05-31T08:20:00',
      terminal: '2',
    },
    duration: '2h 25m',
    price: 5757,
    baggage: 'Adult',
    checkIn: '15 KG',
    cabin: 'Included',
    seatLayout: '3-3-3 Layout',
    meals: 'Complimentary Meals',
    amenities: ['Standard Recliner (31" Legroom)', 'Power and USB Available'],
    date: '2025-05-31',
  },
  {
    id: '6E101',
    airline: {
      name: 'IndiGo',
      logo: 'https://nextgentrip.com/images/6E.gif',
    },
    flightNumber: '6E101',
    from: {
      city: 'Delhi',
      code: 'DEL',
      time: '2025-05-31T06:30:00',
      terminal: '2',
    },
    to: {
      city: 'Mumbai',
      code: 'BOM',
      time: '2025-05-31T08:50:00',
      terminal: '1',
    },
    duration: '2h 20m',
    price: 5641,
    baggage: 'Adult',
    checkIn: '15 KG',
    cabin: 'Included',
    seatLayout: '3-3 Layout',
    meals: 'Buy on Board',
    amenities: ['Power Outlet'],
    date: '2025-05-31',
  },
  {
    id: 'SG421',
    airline: {
      name: 'SpiceJet',
      logo: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_square/QP',
    },
    flightNumber: 'SG421',
    from: {
      city: 'Delhi',
      code: 'DEL',
      time: '2025-05-31T07:15:00',
      terminal: '1D',
    },
    to: {
      city: 'Mumbai',
      code: 'BOM',
      time: '2025-05-31T09:35:00',
      terminal: '2',
    },
    duration: '2h 20m',
    price: 5599,
    baggage: 'Adult',
    checkIn: '20 KG',
    cabin: 'Included',
    seatLayout: '3-3 Layout',
    meals: 'Buy on Board',
    amenities: ['USB Charging', 'Recliner Seats'],
    date: '2025-05-31',
  },
  {
    id: 'UK933',
    airline: {
      name: 'Vistara',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Vistara_Logo.svg/1200px-Vistara_Logo.svg.png',
    },
    flightNumber: 'UK933',
    from: {
      city: 'Delhi',
      code: 'DEL',
      time: '2025-05-31T09:00:00',
      terminal: '3',
    },
    to: {
      city: 'Mumbai',
      code: 'BOM',
      time: '2025-05-31T11:25:00',
      terminal: '2',
    },
    duration: '2h 25m',
    price: 5999,
    baggage: 'Adult',
    checkIn: '15 KG',
    cabin: 'Included',
    seatLayout: '3-3 Layout',
    meals: 'Complimentary Meals',
    amenities: ['Power and USB', 'Wi-Fi Enabled'],
    date: '2025-05-31',
  },
  {
    id: 'QP135',
    airline: {
      name: 'Akasa Air',
      logo: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_square/QP',
    },
    flightNumber: 'QP135',
    from: {
      city: 'Delhi',
      code: 'DEL',
      time: '2025-05-31T10:20:00',
      terminal: '2',
    },
    to: {
      city: 'Mumbai',
      code: 'BOM',
      time: '2025-05-31T12:50:00',
      terminal: '1',
    },
    duration: '2h 30m',
    price: 5480,
    baggage: 'Adult',
    checkIn: '15 KG',
    cabin: 'Included',
    seatLayout: '3-3 Layout',
    meals: 'Buy on Board',
    amenities: ['USB Charging'],
    date: '2025-05-31',
  },
  {
    id: 'AI850',
    airline: {
      name: 'Air India',
      logo: 'https://nextgentrip.com/images/AI.gif',
    },
    flightNumber: '850',
    from: {
      city: 'Delhi',
      code: 'DEL',
      time: '2025-05-31T12:00:00',
      terminal: '3',
    },
    to: {
      city: 'Mumbai',
      code: 'BOM',
      time: '2025-05-31T14:25:00',
      terminal: '2',
    },
    duration: '2h 25m',
    price: 5890,
    baggage: 'Adult',
    checkIn: '15 KG',
    cabin: 'Included',
    seatLayout: '3-3-3 Layout',
    meals: 'Complimentary Meals',
    amenities: ['Power and USB Available'],
    date: '2025-05-31',
  },
  {
    id: '6E205',
    airline: {
      name: 'IndiGo',
      logo: 'https://nextgentrip.com/images/6E.gif',
    },
    flightNumber: '6E205',
    from: {
      city: 'Delhi',
      code: 'DEL',
      time: '2025-05-31T13:45:00',
      terminal: '1',
    },
    to: {
      city: 'Mumbai',
      code: 'BOM',
      time: '2025-05-31T16:10:00',
      terminal: '1',
    },
    duration: '2h 25m',
    price: 5720,
    baggage: 'Adult',
    checkIn: '15 KG',
    cabin: 'Included',
    seatLayout: '3-3 Layout',
    meals: 'Buy on Board',
    amenities: ['Wi-Fi Available'],
    date: '2025-05-31',
  },
  {
    id: 'SG889',
    airline: {
      name: 'SpiceJet',
      logo: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_square/QP',
    },
    flightNumber: '889',
    from: {
      city: 'Delhi',
      code: 'DEL',
      time: '2025-05-31T15:30:00',
      terminal: '1D',
    },
    to: {
      city: 'Mumbai',
      code: 'BOM',
      time: '2025-05-31T17:55:00',
      terminal: '2',
    },
    duration: '2h 25m',
    price: 5620,
    baggage: 'Adult',
    checkIn: '20 KG',
    cabin: 'Included',
    seatLayout: '3-3 Layout',
    meals: 'Buy on Board',
    amenities: ['USB Charging'],
    date: '2025-05-31',
  },
  {
    id: 'UK981',
    airline: {
      name: 'Vistara',
      logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Vistara_Logo.svg/1200px-Vistara_Logo.svg.png',
    },
    flightNumber: 'UK981',
    from: {
      city: 'Delhi',
      code: 'DEL',
      time: '2025-05-31T17:10:00',
      terminal: '3',
    },
    to: {
      city: 'Mumbai',
      code: 'BOM',
      time: '2025-05-31T19:35:00',
      terminal: '2',
    },
    duration: '2h 25m',
    price: 6070,
    baggage: 'Adult',
    checkIn: '15 KG',
    cabin: 'Included',
    seatLayout: '3-3 Layout',
    meals: 'Complimentary Meals',
    amenities: ['Power Outlet', 'USB', 'Wi-Fi'],
    date: '2025-05-31',
  },
  {
    id: 'QP221',
    airline: {
      name: 'Akasa Air',
      logo: 'https://res.cloudinary.com/wego/f_auto,fl_lossy,w_1000,q_auto/v1480072078/flights/airlines_square/QP',
    },
    flightNumber: '221',
    from: {
      city: 'Delhi',
      code: 'DEL',
      time: '2025-05-31T20:00:00',
      terminal: '2',
    },
    to: {
      city: 'Mumbai',
      code: 'BOM',
      time: '2025-05-31T22:25:00',
      terminal: '1',
    },
    duration: '2h 25m',
    price: 5530,
    baggage: 'Adult',
    checkIn: '15 KG',
    cabin: 'Included',
    seatLayout: '3-3 Layout',
    meals: 'Buy on Board',
    amenities: ['USB Charging'],
    date: '2025-05-31',
  }
];
export const packagess =[
  {
    "name": "Romantic Europe Getaway",
    "location": "Paris, Venice, Lucerne",
    "duration": "9 Nights / 10 Days",
    "type": "Honeymoon Package",
    "price": "₹1,00,000",
    "description": "Explore the romance of Europe with candlelight dinners, Eiffel Tower visit, gondola ride in Venice, and scenic Swiss Alps.",
    "image": "https://www.wapititravel.com/blog/wp-content/uploads/2020/06/Venice_Italy.jpg",
    "activities": ["Eiffel Tower", "Gondola Ride", "Swiss Alps Tour", "Wine Tasting"]
  },
  {
    "name": "Spiritual Varanasi Retreat",
    "location": "Varanasi, India",
    "duration": "3 Nights / 4 Days",
    "type": "Pilgrimage Package",
    "price": "₹8,500",
    "description": "Immerse yourself in the spirituality of Varanasi with guided temple visits, Ganga aarti, and boat rides at dawn.",
    "image": "https://www.travelzonevaranasi.com/sites/default/files/imagenodes/large/Varansi.jpg",
    "activities": ["Kashi Vishwanath Temple", "Ganga Aarti", "Boat Ride", "Sarnath Tour"]
  },
  {
    "name": "Kerala Ayurveda Rejuvenation",
    "location": "Munnar, Alleppey, Kovalam",
    "duration": "6 Nights / 7 Days",
    "type": "Ayurveda Package",
    "price": "₹22,000",
    "description": "Relax with traditional Ayurvedic therapies, backwater houseboat stays, and wellness cuisine.",
    "image": "https://media1.thrillophilia.com/filestore/330j1qdk2shkzvymsagpujnwk97d_shutterstock_377921479.jpg?ar=16%3A9&w=400&dpr=2",
    "activities": ["Ayurvedic Massage", "Backwater Cruise", "Yoga", "Tea Plantation Tour"]
  },
  {
    "name": "Manali Adventure Thrill",
    "location": "Manali, India",
    "duration": "5 Nights / 6 Days",
    "type": "Adventure Package",
    "price": "₹14,000",
    "description": "Experience snow activities, trekking, and river rafting in the scenic hills of Himachal.",
    "image": "https://media.assettype.com/outlooktraveller%2F2023-11%2Fcadcbaf8-a8c0-413c-b896-ae56724d3c1d%2Fshutterstock_1653595066.jpg",
    "activities": ["Paragliding", "Trekking", "River Rafting", "Snowboarding"]
  },
  {
    "name": "Goa Leisure Escape",
    "location": "Goa, India",
    "duration": "4 Nights / 5 Days",
    "type": "Leisure Package",
    "price": "₹9,999",
    "description": "Relax on sun-kissed beaches, enjoy vibrant nightlife, and explore Goan cuisine.",
    "image": "https://3.imimg.com/data3/RU/MX/MY-7516435/goa-beachs.jpg",
    "activities": ["Beach Hopping", "Casino Night", "Sunset Cruise", "Fort Aguada Visit"]
  },
  {
    "name": "Thailand Group Fiesta",
    "location": "Bangkok, Pattaya",
    "duration": "6 Nights / 7 Days",
    "type": "Group Departure Package",
    "price": "₹32,500",
    "description": "Enjoy buzzing city life, coral islands, and shopping with a group of fellow travelers.",
    "image": "https://www.flamingotravels.co.in/_next/image?url=https%3A%2F%2Fimgcdn.flamingotravels.co.in%2FImages%2FCity%2FBangkok-City-tour-With-Lunch-2.jpg&w=3840&q=90",
    "activities": ["Coral Island Tour", "Alcazar Show", "Floating Market", "Street Food Tour"]
  },
  {
    "name": "Mystical Leh-Ladakh Expedition",
    "location": "Leh, Nubra, Pangong",
    "duration": "7 Nights / 8 Days",
    "type": "Adventure Package",
    "price": "₹26,000",
    "description": "Conquer high-altitude passes, explore monasteries, and camp by the Pangong Lake.",
    "image": "https://www.lehladakhtourism.com/ladakh-packages/images/nubra-pangong/ladakh1.jpg",
    "activities": ["Khardung La Pass", "Camel Safari", "Lake Camping", "Monastery Tour"]
  },
  {
    "name": "Rajasthan Royal Heritage Tour",
    "location": "Jaipur, Jodhpur, Udaipur",
    "duration": "5 Nights / 6 Days",
    "type": "Family Package",
    "price": "₹17,500",
    "description": "Explore majestic palaces, forts, cultural shows, and local markets of royal Rajasthan.",
    "image": "https://pmlholidays.com/admin/production/images/blogs/Best-Places-to-visit-in-Rajasthan%20compress.jpg",
    "activities": ["City Palace", "Desert Safari", "Light & Sound Show", "Shopping Bazaar"]
  },
  {
    "name": "South India Temple Circuit",
    "location": "Madurai, Rameshwaram, Kanyakumari",
    "duration": "6 Nights / 7 Days",
    "type": "Pilgrimage Package",
    "price": "₹15,500",
    "description": "Visit famous temples and spiritual landmarks in Tamil Nadu and Kerala.",
    "image": "https://www.epicyatra.com/wp-content/uploads/2023/05/main-qimg-5565f3379d32605e33f0994ef95c2c68-lq.webp",
    "activities": ["Meenakshi Temple", "Vivekananda Rock", "Ramanathaswamy Temple", "Sunrise View"]
  },
  {
    "name": "Andaman Island Escape",
    "location": "Port Blair, Havelock Island",
    "duration": "5 Nights / 6 Days",
    "type": "Leisure Package",
    "price": "₹20,000",
    "description": "Dive into pristine beaches, crystal clear waters, and underwater adventures.",
    "image": "https://www.india.com/wp-content/uploads/2019/10/Andaman-Nicobar.jpg",
    "activities": ["Snorkeling", "Scuba Diving", "Beach Relaxation", "Cellular Jail Visit"]
  }
]


export const cruiseOfferCard = [
  {
    id: 1,
    title: "Mesmerizing Ocean Views",
    description: "Witness captivating horizons, golden sunsets, and stunning coastal landscapes that will leave you enchanted.",
    price: 40000,
    image: "https://images.pexels.com/photos/813011/pexels-photo-813011.jpeg",
    button: "Explore"
  },
  {
    id: 2,
    title: "Ultimate Luxury on Board",
    description: "Experience world-class amenities, gourmet dining, and unmatched service in the lap of oceanic luxury.",
    price: 55000,
    image: "https://www.cruises.com/images/web/44/1263/shp/ship_sm.jpg",
    button: "Explore"
  },
  {
    id: 3,
    title: "Tropical Island Escape",
    description: "Cruise through turquoise waters to discover secluded beaches and lush tropical islands.",
    price: 48000,
    image: "https://www.cruzely.com/wp-content/uploads/icon-aft-sm.jpg",
    button: "Explore"
  },
  {
    id: 4,
    title: "Mediterranean Marvels",
    description: "Sail along the Mediterranean coast and explore historic cities, azure waters, and ancient wonders.",
    price: 60000,
    image: "https://cdn1.parksmedia.wdprapps.disney.com/resize/mwImage/1/870/420/75/vision-dam/digital/parks-platform/parks-global-assets/disney-cruise-line/ships/destiny/overview/O_sh01_fr1420_x2_v3-Bow-v2-2x1.jpg?2024-07-25T18:09:00+00:00",
    button: "Explore"
  },
  {
    id: 5,
    title: "Arctic Expedition Voyage",
    description: "Embark on an adventurous cruise to witness glaciers, polar wildlife, and the Northern Lights.",
    price: 85000,
    image: "https://t3.ftcdn.net/jpg/01/49/80/00/360_F_149800067_6TzchoMIijIG7y241uQexxzWROibrGuo.jpg",
    button: "Explore"
  },
  {
    id: 6,
    title: "Romantic Sunset Sail",
    description: "Perfect for couples—enjoy candlelit dinners, serene waters, and magical sunset backdrops.",
    price: 38000,
    image: "https://static.toiimg.com/thumb/103573944/cruise.jpg?width=1200&height=900",
    button: "Explore"
  }
];

export const cruiseDestinations = [
  {
    id: 1,
    title: 'UK Cruise',
    flag: '🇬🇧',
    image: 'https://img.etimg.com/thumb/width-1200,height-1200,imgsize-158410,resizemode-75,msid-110265744/magazines/panache/is-anand-mahindra-planning-to-launch-a-luxury-cruise-ship-tycoon-drops-pic-of-worlds-largest-cruise-vessel-triggering-speculations.jpg',
  },
  {
    id: 2,
    title: 'Europe Cruise',
    flag: '🇪🇺',
    image: 'https://static.wixstatic.com/media/2cd8ac_9f3bdaa0e7014bb4aa11bf3ed89bdee7~mv2.jpg/v1/fill/w_640,h_390,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2cd8ac_9f3bdaa0e7014bb4aa11bf3ed89bdee7~mv2.jpg',
  },
  {
    id: 3,
    title: 'Italy Cruise',
    flag: '🇮🇹',
    image: 'https://cruisefever.net/wp-content/uploads/2025/04/wonderoftheseascruiseship.jpg',
  },
  {
    id: 4,
    title: 'Spain Cruise',
    flag: '🇪🇸',
    image: 'https://etimg.etb2bimg.com/photo/117475809.cms',
  },
  {
    id: 5,
    title: 'China Cruise',
    flag: '🇨🇳',
    image: 'https://marinedc.com/media/bilder/referansegalleri/midnatsol1.png',
  },
  {
    id: 6,
    title: 'Korea Cruise',
    flag: '🇰🇷',
    image: 'https://s3.amazonaws.com/cms.ipressroom.com/412/files/202504/67eea6123d6332920e37f52c_Sunsation+Point+Aerial+Rendering/Sunsation+Point+Aerial+Rendering_social.jpg',
  },
];


export const busTrips = [
  {
    id: 'bus1',
    name: 'Volvo Deluxe AC',
    price: 1500,
    from: 'Delhi',
    to: 'Agra',
    durationHours: 4,
    busType: 'Semi-Sleeper',
    seatsAvailable: 12,
    amenities: ['Water Bottle', 'Charging Port', 'Blanket', 'Pillow', 'CCTV'],
    routes: [
      { stop: 'Delhi', time: '06:00 AM' },
      { stop: 'Ghaziabad', time: '06:30 AM' },
      { stop: 'Bulandshahr', time: '07:30 AM' },
      { stop: 'Hathras', time: '08:30 AM' },
      { stop: 'Mathura', time: '09:00 AM' },
      { stop: 'Agra', time: '10:00 AM' },
    ],
    rating: 4.5,
  },
  {
    id: 'bus2',
    name: 'Mercedes AC Sleeper',
    price: 2200,
    from: 'Mumbai',
    to: 'Pune',
    durationHours: 6,
    busType: 'Sleeper',
    seatsAvailable: 8,
    amenities: ['Water Bottle', 'Blanket', 'Charging Port', 'Bed Sheet', 'Pillow'],
    routes: [
      { stop: 'Mumbai', time: '09:00 PM' },
      { stop: 'Thane', time: '09:30 PM' },
      { stop: 'Kalyan', time: '10:00 PM' },
      { stop: 'Lonavala', time: '11:30 PM' },
      { stop: 'Pune', time: '01:00 AM' },
    ],
    rating: 4.7,
  },
  {
    id: 'bus3',
    name: 'Non-AC Deluxe Seater',
    price: 800,
    from: 'Chennai',
    to: 'Bangalore',
    durationHours: 7,
    busType: 'Seater',
    seatsAvailable: 20,
    amenities: ['Water Bottle', 'Charging Port', 'CCTV'],
    routes: [
      { stop: 'Chennai', time: '07:00 AM' },
      { stop: 'Kanchipuram', time: '07:45 AM' },
      { stop: 'Vellore', time: '08:30 AM' },
      { stop: 'Krishnagiri', time: '10:00 AM' },
      { stop: 'Hosur', time: '11:15 AM' },
      { stop: 'Bangalore', time: '02:00 PM' },
    ],
    rating: 4.1,
  },
  {
    id: 'bus4',
    name: 'Volvo AC Seater',
    price: 1300,
    from: 'Hyderabad',
    to: 'Vijayawada',
    durationHours: 5,
    busType: 'Seater',
    seatsAvailable: 15,
    amenities: ['Water Bottle', 'Charging Port', 'Blanket', 'Pillow'],
    routes: [
      { stop: 'Hyderabad', time: '08:00 AM' },
      { stop: 'Nalgonda', time: '09:00 AM' },
      { stop: 'Suryapet', time: '10:30 AM' },
      { stop: 'Kodad', time: '11:15 AM' },
      { stop: 'Vijayawada', time: '01:00 PM' },
    ],
    rating: 4.3,
  },
  {
    id: 'bus5',
    name: 'Scania AC Sleeper',
    price: 1800,
    from: 'Kolkata',
    to: 'Durgapur',
    durationHours: 6,
    busType: 'Sleeper',
    seatsAvailable: 10,
    amenities: ['Water Bottle', 'Charging Port', 'Blanket', 'CCTV', 'Bed Sheet', 'Pillow'],
    routes: [
      { stop: 'Kolkata', time: '07:30 AM' },
      { stop: 'Howrah', time: '07:45 AM' },
      { stop: 'Burdwan', time: '09:30 AM' },
      { stop: 'Durgapur', time: '01:00 PM' },
    ],
    rating: 4.6,
  },
  {
    id: 'bus6',
    name: 'Tata AC Semi-Sleeper',
    price: 1100,
    from: 'Jaipur',
    to: 'Udaipur',
    durationHours: 6,
    busType: 'Semi-Sleeper',
    seatsAvailable: 14,
    amenities: ['Water Bottle', 'Charging Port', 'Blanket', 'Pillow'],
    routes: [
      { stop: 'Jaipur', time: '06:00 AM' },
      { stop: 'Ajmer', time: '07:30 AM' },
      { stop: 'Nathdwara', time: '09:30 AM' },
      { stop: 'Udaipur', time: '12:00 PM' },
    ],
    rating: 4.2,
  },
];


export const staysData = [
  // ----------- Villas -----------
  {
    type: "villas",
    name: "Seaside Bliss Villa",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/625956715.jpg?k=84123a79347e4387f177989cb194239d9ebd9a510d2a45ee363694d7794b6cbc&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/625957100.jpg?k=36d9a7bde57f0178b151cfe177ded959991d594a454857b37f1a8b12c1e030ee&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/625956579.jpg?k=1bd9d54f49eec62b03342a38110989090f99b3b4d5964659e3f5485af84f4e30&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/625956632.jpg?k=ba49052e1c82209f88770d19caa9098826c739618329fd78d784b54279cc6984&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/633443237.jpg?k=a16337648ff7d6f9f0a0f062e3c89315aeb7ac78ce24f48e0e6fa089f14e233b&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/625957062.jpg?k=f30b356a1901c4793398056d441547b02ec05a35716afe293e501b9f185ccff5&o=&hp=1"
    ],
    rating: 4.8,
    reviews: 97,
    stars: 5,
    sleeps: 4,
    oldPrice: 18000,
    newPrice: 14500,
    breakfast: "Included",
    features: [
      "Stunning ocean views",
      "Private infinity pool",
      "Spacious garden",
      "Luxurious jacuzzi"
    ]
  },
  {
    type: "villas",
    name: "Himalayan Luxe Retreat",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/633083115.jpg?k=2afea38d5eac222bd3998d93b19cb095b54d12b37406238bc5f6495445143929&o=&hp=1",
      "https://img.vistarooms.com/gallery/compressed/retreat-cottages-4b2921.jpg",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/400530472.jpg?k=d1d4307c6ed6adb66643076499a3a9109376520ec471101820c5d572b7601661&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1024x768/633083076.jpg?k=a44b99da663e00bf50bb28347b5a373cfbebef85d7ffbb43c63f50d180494083&o=&hp=1"
    ],
    rating: 4.6,
    reviews: 120,
    stars: 4,
    sleeps: 6,
    oldPrice: 16000,
    newPrice: 12800,
    breakfast: "Available at extra charge",
    features: [
      "Stunning mountain views",
      "Delicious food options",
      "Cozy rooms with jacuzzi",
      "Terrace with fireplace"
    ]
  },
  {
    type: "villas",
    name: "The Palm Serenity",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/532349845.jpg?k=5b10120f0fff2aee6b23f86b7b653b5f7e0d52078bdc2913a1f2ec0245766115&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/532349827.jpg?k=3fdede62760fc3293c574ef08671061cd3c402a1747fbf8182b405ae7bacff56&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/532349844.jpg?k=3169aebc36af784bc0ae7d70003517612c839a55112c4f4334b6a93f4dfcea3a&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/532349822.jpg?k=0f9f80d594a502d7e33b9713dea13cbd132251fd8af9620ee7a03f75d7ae4ee5&o=&hp=1"
    ],
    rating: 4.7,
    reviews: 85,
    stars: 5,
    sleeps: 8,
    oldPrice: 22000,
    newPrice: 19000,
    breakfast: "Included",
    features: [
      "Private beach access",
      "Chef on request",
      "Poolside bar",
      "Spacious interiors"
    ]
  },
  {
    type: "villas",
    name: "Hilltop Harmony Villa",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/567779942.jpg?k=eaf300552e8ccce216c4955e7a3aee40a6771ce5a89e0277461c644424b9293d&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/568839756.jpg?k=02c6414c427379f638cd797bdd060c6f9a1ccc325afeb14af14644a1316c6d51&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/568852636.jpg?k=b8d5c1e645394b917d1e7bb40b89b5735c0ee8dcda8d641bb49212e5c236d40e&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/568839746.jpg?k=477bd79b529ed8b55b22118f5ac755d13e4b9da616286c908cfd2de99c971c39&o=&hp=1"
    ],
    rating: 4.5,
    reviews: 110,
    stars: 4,
    sleeps: 5,
    oldPrice: 15000,
    newPrice: 12500,
    breakfast: "Available at extra charge",
    features: [
      "360° hill views",
      "Indoor fireplace",
      "Jacuzzi & sauna",
      "Nature trail nearby"
    ]
  },

  // ----------- Homes -----------
  {
    type: "Hotel",
    name: "The Urban Nest",
    images: [
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/595363876.jpg?k=bd7995e28b81700bf33c64a5974d92c1dcffbce243b2e756cd40b8c5efca2621&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/596243676.jpg?k=5358cb7388f6912597a29cd57fc789e3489f96ffe351ac8c64361afa139c6a10&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/596243645.jpg?k=fa2d9382d6179b835c30c8fe255b5483db09d1ab08c4bd892f9c9e471457b9fe&o=&hp=1",
      "https://cf.bstatic.com/xdata/images/hotel/max1280x900/331796436.jpg?k=3e0e0167818f7b4048403d3fb463c015deb4ed4e2a7d57e9bee529dfb31a3819&o=&hp=1"
    ],
    rating: 4.3,
    reviews: 62,
    stars: 3,
    sleeps: 3,
    oldPrice: 7500,
    newPrice: 6200,
    breakfast: "Included",
    features: [
      "Smart appliances",
      "Fast Wi-Fi",
      "Fully equipped kitchen",
      "Minimalist decor"
    ]
  },
  {
    type: "Hotel",
    name: "Rustic Riverside Home",
    images: [
      "https://i0.wp.com/ashercustomhomes.com/wp-content/uploads/2020/09/exterior-1_rustic-riverside.jpg?fit=1920%2C1280&ssl=1",
      "https://jainc.com/wp-content/uploads/2024/01/08_Riverside-Cabins-formatted.jpg",
      "https://jainc.com/wp-content/uploads/2024/01/02_Riverside-Cabins-formatted.jpg",
      "https://jainc.com/wp-content/uploads/2024/01/07_Riverside-Cabins-formatted.jpg"
    ],
    rating: 4.6,
    reviews: 88,
    stars: 4,
    sleeps: 4,
    oldPrice: 9000,
    newPrice: 7900,
    breakfast: "Available at extra charge",
    features: [
      "Riverside deck",
      "Barbecue grill",
      "Pet-friendly",
      "Firewood included"
    ]
  },
  {
    type: "Hotel",
    name: "Modern Midtown Haven",
    images: [
      "https://placehold.co/400x300?text=Home+3A",
      "https://placehold.co/400x300?text=Home+3B",
      "https://placehold.co/400x300?text=Home+3C",
      "https://placehold.co/400x300?text=Home+3D"
    ],
    rating: 4.2,
    reviews: 54,
    stars: 3,
    sleeps: 2,
    oldPrice: 7000,
    newPrice: 5900,
    breakfast: "Included",
    features: [
      "Easy metro access",
      "Balcony with city view",
      "Workspace setup",
      "Private parking"
    ]
  },
  {
    type: "Hotel",
    name: "Countryside Green Escape",
    images: [
      "https://placehold.co/400x300?text=Home+4A",
      "https://placehold.co/400x300?text=Home+4B",
      "https://placehold.co/400x300?text=Home+4C",
      "https://placehold.co/400x300?text=Home+4D"
    ],
    rating: 4.4,
    reviews: 71,
    stars: 4,
    sleeps: 6,
    oldPrice: 9800,
    newPrice: 8500,
    breakfast: "Available at extra charge",
    features: [
      "Farm view patio",
      "Large backyard",
      "Organic breakfast option",
      "Bike rental available"
    ]
  },

  // ----------- Homestays -----------
  {
    type: "Homestay",
    name: "Misty Meadows Homestay",
    images: [
      "https://r1imghtlak.mmtcdn.com/fcdddf6a90b111ec92940a58a9feac02.jpeg?downsize=540:*",
      "https://r1imghtlak.mmtcdn.com/0677ec2890b211ecaef20a58a9feac02.jpg?downsize=540:*",
      "https://r1imghtlak.mmtcdn.com/0677ec2890b211ecaef20a58a9feac02.jpg?downsize=540:*",
      "https://r1imghtlak.mmtcdn.com/0677ec2890b211ecaef20a58a9feac02.jpg?downsize=540:*"
    ],
    rating: 4.9,
    reviews: 143,
    stars: 5,
    sleeps: 4,
    oldPrice: 10000,
    newPrice: 8700,
    breakfast: "Included",
    features: [
      "Hosted by local family",
      "Freshly cooked meals",
      "Tea garden walk",
      "Cozy fireplace lounge"
    ]
  },
  {
    type: "Homestay",
    name: "Lakeview Retreat Homestay",
    images: [
      "https://www.resortsneardelhi.co.in/backendres/images/banner/15516861471.jpg",
      "https://placehold.co/400x300?text=Homestay+2B",
      "https://placehold.co/400x300?text=Homestay+2C",
      "https://placehold.co/400x300?text=Homestay+2D"
    ],
    rating: 4.5,
    reviews: 98,
    stars: 4,
    sleeps: 3,
    oldPrice: 8200,
    newPrice: 7100,
    breakfast: "Available at extra charge",
    features: [
      "Lake view balcony",
      "Authentic local cuisine",
      "Boat ride access",
      "Hammock garden"
    ]
  },
  {
    type: "Homestay",
    name: "Sunset Valley Stay",
    images: [
      "https://placehold.co/400x300?text=Homestay+3A",
      "https://placehold.co/400x300?text=Homestay+3B",
      "https://placehold.co/400x300?text=Homestay+3C",
      "https://placehold.co/400x300?text=Homestay+3D"
    ],
    rating: 4.6,
    reviews: 85,
    stars: 4,
    sleeps: 2,
    oldPrice: 6800,
    newPrice: 5900,
    breakfast: "Included",
    features: [
      "Mountain sunset view",
      "Organic garden",
      "Board games and library",
      "Outdoor bonfire setup"
    ]
  },
  {
    type: "Homestay",
    name: "Jungle Nook Homestay",
    images: [
      "https://placehold.co/400x300?text=Homestay+4A",
      "https://placehold.co/400x300?text=Homestay+4B",
      "https://placehold.co/400x300?text=Homestay+4C",
      "https://placehold.co/400x300?text=Homestay+4D"
    ],
    rating: 4.4,
    reviews: 67,
    stars: 3,
    sleeps: 5,
    oldPrice: 9200,
    newPrice: 7700,
    breakfast: "Available at extra charge",
    features: [
      "Surrounded by forest",
      "Nature walk with guide",
      "Eco-friendly rooms",
      "Cultural dinner nights"
    ]
  }
];
