export const AYURVEDA_REMEDIES = [
  {
    id: "rem_cough_tulsi",
    title: "Tulsi & Ginger Kadha",
    category: "Cold & Cough",
    description: "A traditional herbal decoction that boosts respiratory health and clears congestion.",
    ingredients: "Fresh Tulsi (Holy Basil) leaves, Grated Ginger, Black Pepper, Honey, Water.",
    instructions: "Boil Tulsi leaves, ginger, and crushed black pepper in 2 cups of water until it reduces to 1 cup. Strain, let it cool slightly, mix in honey, and drink warm.",
    dosha: "Balances Kapha and Vata; can increase Pitta if taken in excess.",
    icon: "🌱"
  },
  {
    id: "rem_golden_milk",
    title: "Golden Turmeric Milk",
    category: "Immunity",
    description: "An ancient anti-inflammatory elixir taken at bedtime to boost overall vitality and immunity.",
    ingredients: "1 cup Milk (or almond milk), 1/2 tsp Turmeric powder, pinch of Black Pepper, Cardamom, Honey.",
    instructions: "Warm the milk, whisk in turmeric, black pepper, and cardamom. Simmer gently for 5 minutes. Remove from heat, stir in honey once warm (not boiling), and drink.",
    dosha: "Tridoshic (Balances Vata, Pitta, and Kapha).",
    icon: "🥛"
  },
  {
    id: "rem_sleep_ashwa",
    title: "Ashwagandha Moon Milk",
    category: "Sleep & Mind",
    description: "An adaptogenic evening drink that calms the nervous system and promotes deep restful sleep.",
    ingredients: "1/2 tsp Ashwagandha powder, 1 cup warm Milk, pinch of Nutmeg, Coconut oil or Ghee.",
    instructions: "Mix ashwagandha powder, nutmeg, and a tiny drop of ghee into warm milk. Drink 30 minutes before bed.",
    dosha: "Particularly calms Vata and Kapha.",
    icon: "✨"
  },
  {
    id: "rem_digest_ccf",
    title: "CCF Digestive Tea",
    category: "Digestion",
    description: "Cumin-Coriander-Fennel tea designed to kindle digestive fire (Agni) without overheating.",
    ingredients: "1/2 tsp Cumin seeds, 1/2 tsp Coriander seeds, 1/2 tsp Fennel seeds, 3 cups Water.",
    instructions: "Add all seeds to water. Boil for 5-10 minutes. Strain and sip warm throughout the day, especially after meals.",
    dosha: "Highly Tridoshic (highly balancing for Pitta, Vata, and Kapha).",
    icon: "☕"
  },
  {
    id: "rem_hair_amla",
    title: "Amla & Aloe Hair Mask",
    category: "Skin & Hair",
    description: "A nourishing scalp treatment that strengthens hair follicles and prevents premature graying.",
    ingredients: "2 tbsp Amla (Gooseberry) powder, 3 tbsp fresh Aloe Vera gel, 1 tbsp Coconut oil.",
    instructions: "Blend all ingredients into a smooth paste. Massage onto scalp and hair roots. Leave on for 30 minutes, then rinse with lukewarm water.",
    dosha: "Cools Pitta; revitalizes hair roots.",
    icon: "🌿"
  },
  {
    id: "rem_cold_honey",
    title: "Ginger & Honey Cough Syrup",
    category: "Cold & Cough",
    description: "A simple, fast-acting remedy for soothing throat tickles and wet coughs.",
    ingredients: "1 tbsp fresh Ginger juice, 1 tbsp Organic Honey.",
    instructions: "Extract ginger juice by grating fresh ginger and squeezing it through a clean cloth. Mix thoroughly with honey. Consume 1-2 teaspoons twice a day.",
    dosha: "Excellent for Kapha.",
    icon: "🍯"
  },
  {
    id: "rem_mind_brahmi",
    title: "Brahmi Memory Elixir",
    category: "Sleep & Mind",
    description: "A cognitive tonic that enhances concentration, focus, and reduces mental fatigue.",
    ingredients: "1/2 tsp Brahmi powder, 1 tsp warm Ghee or warm Water.",
    instructions: "Take brahmi powder mixed with warm ghee or water on an empty stomach in the morning.",
    dosha: "Balances Pitta and Sadhaka Pitta (emotions and intellect).",
    icon: "🧠"
  },
  {
    id: "rem_digest_triphala",
    title: "Triphala Night Cleanser",
    category: "Digestion",
    description: "A classic daily cleansing formula.",
    ingredients: "1/2 tsp Triphala powder, 1 cup warm Water.",
    instructions: "Stir triphala powder into a cup of warm water. Let it sit for 5 minutes, then drink just before sleep.",
    dosha: "Perfect Tridoshic regulator.",
    icon: "🍂"
  }
];

export const GUIDED_PRANAYAMA = {
  title: "Nadi Shodhana & Box Breathing",
  description: "Alternate nostril breathing to balance life-force energy (Prana) and calm the mind.",
  cycles: [
    { name: "Inhale", duration: 4, instruction: "Breathe in deeply through the left nostril...", circleScale: 1.5 },
    { name: "Hold", duration: 4, instruction: "Close both nostrils and hold the breath...", circleScale: 1.5 },
    { name: "Exhale", duration: 4, instruction: "Release the right nostril and breathe out...", circleScale: 1.0 },
    { name: "Hold", duration: 4, instruction: "Keep empty and wait...", circleScale: 1.0 }
  ]
};

// Auspicious days & Panchang references
export const MONTHS_LUNAR = [
  "Chaitra", "Vaishakha", "Jyeshtha", "Ashadha", "Shravana", "Bhadrapada", 
  "Ashvina", "Kartika", "Margashirsha", "Pausha", "Magha", "Phalguna"
];

export const TITHIS = [
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami",
  "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Purnima",
  "Pratipada", "Dwitiya", "Tritiya", "Chaturthi", "Panchami", "Shasthi", "Saptami", "Ashtami",
  "Navami", "Dashami", "Ekadashi", "Dwadashi", "Trayodashi", "Chaturdashi", "Amavasya"
];

export const NAKSHATRAS = [
  "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra", "Punarvasu", "Pushya", "Ashlesha",
  "Magha", "Purva Phalguni", "Uttara Phalguni", "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshtha",
  "Mula", "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanishta", "Shatabhisha", "Purva Bhadrapada", "Uttara Bhadrapada", "Revati"
];

export const DEITIES = [
  { name: "Lord Ganesha", mantra: "Om Gam Ganapataye Namaha", benefit: "Removes obstacles, brings success and wisdom." },
  { name: "Lord Shiva", mantra: "Om Namah Shivaya", benefit: "Purifies mind, brings inner peace and stability." },
  { name: "Goddess Lakshmi", mantra: "Om Shreem Mahalakshmaye Namaha", benefit: "Attracts wealth, abundance, and prosperity." },
  { name: "Lord Krishna", mantra: "Hare Krishna Hare Krishna Krishna Krishna Hare Hare", benefit: "Brings joy, love, and spiritual liberation." }
];

export const KARNATAKA_TEMPLES = [
  {
    id: "temp_chamundi",
    title: "Chamundeshwari",
    location: "Mysore",
    rating: "4.9",
    categories: ["Shakti Peetha", "Major Pilgrimage"],
    deityTag: "Chamundeshwari",
    description: "One of 18 Maha Shakti Peethas atop Chamundi Hills. 1000+ steps climb.",
    timings: "6:00–14:00, 15:30–18:00, 19:30–21:00",
    phone: "+91-821-2525231",
    coords: { lat: 12.2748, lng: 76.6785 },
    icon: "🏔️",
    image: "/images/mahishasura_battle.jpg",
    era: "12th Century CE",
    architect: "Hoysala & Vijayanagara Dynasties"
  },
  {
    id: "temp_virupaksha",
    title: "Virupaksha",
    location: "Hampi",
    rating: "4.8",
    categories: ["UNESCO Heritage"],
    deityTag: "Shiva",
    description: "7th century Shiva temple. UNESCO World Heritage Site.",
    timings: "6:00–12:30, 17:00–20:30",
    phone: "+91-8394-241235",
    coords: { lat: 15.3350, lng: 76.4562 },
    icon: "🏛️",
    image: "/images/hampi.jpg",
    era: "7th Century CE",
    architect: "Vijayanagara Empire"
  },
  {
    id: "temp_dharmasthala",
    title: "Dharmasthala",
    location: "Dharmasthala",
    rating: "4.9",
    categories: ["Major Pilgrimage"],
    deityTag: "Manjunatha",
    description: "Free meals to 10,000+ pilgrims daily. Unique inter-faith administration.",
    timings: "6:30–14:00, 17:00–20:30",
    phone: "+91-8256-277221",
    coords: { lat: 12.9525, lng: 75.3852 },
    icon: "🌊",
    image: "/images/dharma.jpg",
    era: "16th Century CE",
    architect: "Hegde Family (patrons)"
  },
  {
    id: "temp_belur",
    title: "Chennakeshava",
    location: "Belur",
    rating: "4.8",
    categories: ["Hoysala Heritage", "UNESCO Heritage"],
    deityTag: "Vishnu",
    description: "Star-shaped soapstone marvel with intricate bracket dancers (Madanikas).",
    timings: "7:30–20:00",
    phone: "+91-8177-222218",
    coords: { lat: 13.1623, lng: 75.8624 },
    icon: "🏛️",
    image: "/images/ellora_kailasa.jpg",
    era: "1117 CE",
    architect: "Hoysala Dynasty"
  },
  {
    id: "temp_halebidu",
    title: "Hoysaleswara",
    location: "Halebidu",
    rating: "4.7",
    categories: ["Hoysala Heritage", "UNESCO Heritage"],
    deityTag: "Shiva",
    description: "Splendid twin temples adorned with massive soapstone relief carving panels.",
    timings: "6:30–18:30",
    phone: "+91-8177-220025",
    coords: { lat: 13.2141, lng: 75.9926 },
    icon: "🏛️",
    image: "/images/ajanta.jpg",
    era: "1121 CE",
    architect: "Hoysala Dynasty"
  },
  {
    id: "temp_kollur",
    title: "Mookambika",
    location: "Kollur",
    rating: "4.8",
    categories: ["Shakti Peetha", "Major Pilgrimage"],
    deityTag: "Mookambika",
    description: "Sacred shrine housing Sri Chakra consecrated by Adi Shankaracharya.",
    timings: "5:00–13:30, 15:00–21:00",
    phone: "+91-8254-273202",
    coords: { lat: 13.8647, lng: 74.8143 },
    icon: "🌺",
    image: "/images/meenakshi.jpg",
    era: "8th Century CE",
    architect: "Haleri Kings (patrons)"
  },
  {
    id: "temp_udupi",
    title: "Sri Krishna Matha",
    location: "Udupi",
    rating: "4.9",
    categories: ["Dvaita Matha", "Major Pilgrimage"],
    deityTag: "Krishna",
    description: "Coastal monastery where Bala Krishna is viewed through Kanakana Kindi.",
    timings: "5:00–21:30",
    phone: "+91-820-2520598",
    coords: { lat: 13.3409, lng: 74.7473 },
    icon: "🐚",
    image: "/images/krishna_cover.jpg",
    era: "13th Century CE",
    architect: "Sri Madhvacharya (founder)"
  },
  {
    id: "temp_gokarna",
    title: "Mahabaleshwar",
    location: "Gokarna",
    rating: "4.7",
    categories: ["Major Pilgrimage", "Adi Shankara Peetha"],
    deityTag: "Shiva",
    description: "Houses the sacred Atmalinga given to Ravana by Shiva on the west coast.",
    timings: "6:00–12:30, 17:00–20:00",
    phone: "+91-8386-256241",
    coords: { lat: 14.5413, lng: 74.3168 },
    icon: "🐚",
    image: "/images/shiva_neelkanth.jpg",
    era: "4th Century CE",
    architect: "Kadamba Dynasty"
  },
  {
    id: "temp_sringeri",
    title: "Sharada Peetham",
    location: "Sringeri",
    rating: "4.9",
    categories: ["Adi Shankara Peetha", "Major Pilgrimage"],
    deityTag: "Sharada",
    description: "First matha established by Adi Shankara on the banks of Tunga river.",
    timings: "6:00–14:00, 16:00–21:00",
    phone: "+91-8265-250123",
    coords: { lat: 13.4192, lng: 75.2536 },
    icon: "🏛️",
    image: "/images/adi_shankara.jpg",
    era: "8th Century CE",
    architect: "Adi Shankaracharya"
  }
];

export const GLOBAL_TEMPLES_LIVE = [
  {
    "id": "shirdi_sai_mandir",
    "name": "Shirdi Sai Baba Samadhi Mandir",
    "hindiName": "श्री साईं बाबा समाधि मंदिर शिर्डी (24/7 लाइव)",
    "deity": "Shri Sai Baba of Shirdi",
    "category": "major",
    "location": "Shirdi, Ahmednagar, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "channelId": "UCKGvJDh7g_Kzocbwy7aKicA",
    "channelHandle": "@saibabasansthantrust",
    "officialTrust": "Shri Saibaba Sansthan Trust (SSST), Shirdi",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UCKGvJDh7g_Kzocbwy7aKicA&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@saibabasansthantrust/live",
    "backupVideoUrl": "https://www.youtube.com/embed/5D3CeeZ6X1s",
    "imageUrl": "/images/dharma.jpg",
    "icon": "✨",
    "coords": {
      "lat": 19.7667,
      "lng": 74.4767
    },
    "rating": "5.0 ★",
    "devoteesOnline": 6420,
    "speciality": "Official 24/7 Live Darshana from the Samadhi Mandir of Sai Baba",
    "mantra": "ॐ श्री साईंनाथाय नमः | ॐ साईं राम | सब का मालिक एक",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "04:30 AM",
        "desc": "Morning auspicious awakening ritual"
      },
      {
        "name": "Madhyahna Aarti",
        "time": "12:00 PM",
        "desc": "Midday Rajbhog offering & Aarti"
      },
      {
        "name": "Dhoop Aarti",
        "time": "06:30 PM",
        "desc": "Sunset Deeparadhana & incense"
      },
      {
        "name": "Shej Aarti",
        "time": "10:30 PM",
        "desc": "Night lullaby and resting ceremony"
      }
    ]
  },
  {
    "id": "tirupati_balaji",
    "name": "Tirumala Sri Venkateswara Swamy",
    "hindiName": "श्री वेंकटेश्वर स्वामी तिरुपति बालाजी (SVBC TTD लाइव)",
    "deity": "Lord Venkateswara (Balaji / Maha Vishnu)",
    "category": "major",
    "location": "Tirumala Hills, Tirupati, Andhra Pradesh, India",
    "state": "Andhra Pradesh",
    "country": "India",
    "channelId": "UCS2Y83GD-fc7qqgNW5uj41g",
    "channelHandle": "@svbcttd",
    "officialTrust": "Tirumala Tirupati Devasthanams (TTD / SVBC)",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UCS2Y83GD-fc7qqgNW5uj41g&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@svbcttd/live",
    "backupVideoUrl": "https://www.youtube.com/embed/59YYd1rkZRQ",
    "imageUrl": "/images/venkateswara_tirumala.jpg",
    "icon": "🛕",
    "coords": {
      "lat": 13.6833,
      "lng": 79.35
    },
    "rating": "5.0 ★",
    "devoteesOnline": 8150,
    "speciality": "Official 24/7 Live Broadcast of Sri Venkateswara Bhakthi Channel (SVBC)",
    "mantra": "ॐ नमो वेङ्कटेशाय | गोविन्दा गोविन्दा | श्रीनिवास गोविन्दा",
    "aartis": [
      {
        "name": "Suprabhata Seva",
        "time": "03:00 AM",
        "desc": "Vedic dawn awakening of Lord Balaji"
      },
      {
        "name": "Thomala Seva",
        "time": "06:30 AM",
        "desc": "Golden flower and garland decoration"
      },
      {
        "name": "Kalyanotsavam",
        "time": "11:30 AM",
        "desc": "Divine celestial wedding ceremony"
      },
      {
        "name": "Ekanta Seva",
        "time": "11:00 PM",
        "desc": "Night lullaby & gold cradle ritual"
      }
    ]
  },
  {
    "id": "kashi_vishwanath",
    "name": "Kashi Vishwanath Jyotirlinga",
    "hindiName": "श्री काशी विश्वनाथ ज्योतिर्लिंग (वाराणसी लाइव)",
    "deity": "Lord Shiva (Vishwanatha)",
    "category": "jyotirlinga",
    "location": "Varanasi, Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "channelId": "UCdMj2twWfMHXrWgX5oVdoyA",
    "channelHandle": "@ShreeKashiVishwanathMandir",
    "officialTrust": "Shree Kashi Vishwanath Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UCdMj2twWfMHXrWgX5oVdoyA&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@ShreeKashiVishwanathMandir/live",
    "backupVideoUrl": "https://www.youtube.com/embed/5D3CeeZ6X1s",
    "imageUrl": "/images/shiva_neelkanth.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 25.3109,
      "lng": 83.0107
    },
    "rating": "5.0 ★",
    "devoteesOnline": 5320,
    "speciality": "Official Mandir Trust Live Darshana & Ganga Maha Aarti from Varanasi",
    "mantra": "ॐ नमः शिवाय | कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम्",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "03:00 AM",
        "desc": "First sacred awakening of Vishwanatha"
      },
      {
        "name": "Bhog Aarti",
        "time": "11:30 AM",
        "desc": "Midday Rajbhog offering & Shringara"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Grand evening Deeparadhana with Damaru"
      },
      {
        "name": "Shayan Aarti",
        "time": "10:30 PM",
        "desc": "Night rest ritual & Vedic chanting"
      }
    ]
  },
  {
    "id": "mahakaleshwar_ujjain",
    "name": "Mahakaleshwar Jyotirlinga Ujjain",
    "hindiName": "श्री महाकालेश्वर ज्योतिर्लिंग उज्जैन (भस्म आरती लाइव)",
    "deity": "Lord Shiva (Dakshinamurti Mahakala)",
    "category": "jyotirlinga",
    "location": "Ujjain, Madhya Pradesh, India",
    "state": "Madhya Pradesh",
    "country": "India",
    "channelId": "UCgpjB-csRj6rDwKQsLLZasg",
    "channelHandle": "@MahakaleshwarJyotirlingaUjjain",
    "officialTrust": "Shri Mahakaleshwar Temple Management Committee",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UCgpjB-csRj6rDwKQsLLZasg&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@MahakaleshwarJyotirlingaUjjain/live",
    "backupVideoUrl": "https://www.youtube.com/embed/QvwWU2iDxkQ",
    "imageUrl": "/images/shiva.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 23.1827,
      "lng": 75.7682
    },
    "rating": "5.0 ★",
    "devoteesOnline": 4940,
    "speciality": "World-renowned live Bhasma Aarti and Shipra river sanctum",
    "mantra": "ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम् | उर्वारुकमिव बन्धनान्मृत्य pushiya",
    "aartis": [
      {
        "name": "Bhasma Aarti",
        "time": "04:00 AM",
        "desc": "Sacred holy ash offering with resonant chants"
      },
      {
        "name": "Bhog Aarti",
        "time": "10:30 AM",
        "desc": "Midday Prasad & milk offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:30 PM",
        "desc": "Grand evening musical Deeparadhana"
      },
      {
        "name": "Shayan Aarti",
        "time": "10:30 PM",
        "desc": "Bedtime prayers & Bilva Patra darshana"
      }
    ]
  },
  {
    "id": "somnath_jyotirlinga",
    "name": "Shree Somnath Jyotirlinga",
    "hindiName": "श्री सोमनाथ ज्योतिर्लिंग (24/7 सागर तट लाइव)",
    "deity": "Lord Shiva (Someshwara)",
    "category": "jyotirlinga",
    "location": "Prabhas Patan, Veraval, Gujarat, India",
    "state": "Gujarat",
    "country": "India",
    "channelId": "UCIPhuppWW3cLu57lAd9Xlpg",
    "channelHandle": "@ShreeSomnathTemple",
    "officialTrust": "Shree Somnath Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UCIPhuppWW3cLu57lAd9Xlpg&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@ShreeSomnathTemple/live",
    "backupVideoUrl": "https://www.youtube.com/embed/Vg3XIfzoN6w",
    "imageUrl": "/images/ellora_kailasa.jpg",
    "icon": "🌊",
    "coords": {
      "lat": 20.888,
      "lng": 70.4012
    },
    "rating": "4.9 ★",
    "devoteesOnline": 3150,
    "speciality": "First of 12 Jyotirlingas with 24/7 Arabian Sea audio-visual stream",
    "mantra": "सौराष्ट्रदेशे विशदेऽतिरम्ये ज्योतिर्मयं चन्द्रकलावतंसम्",
    "aartis": [
      {
        "name": "Pratah Aarti",
        "time": "07:00 AM",
        "desc": "Morning ocean breeze Deeparadhana"
      },
      {
        "name": "Madhyahna Aarti",
        "time": "12:00 PM",
        "desc": "Noon sacred offering & Shringara"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening Aarti with ocean resonance"
      }
    ]
  },
  {
    "id": "siddhivinayak_mumbai",
    "name": "Shree Siddhivinayak Temple Mumbai",
    "hindiName": "श्री सिद्धिविनायक गणपति मंदिर मुंबई (लाइव)",
    "deity": "Lord Ganesha (Siddhivinayaka)",
    "category": "major",
    "location": "Prabhadevi, Mumbai, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "channelId": "UCEH8uzUHZ0V6H5p2C7ai5dA",
    "channelHandle": "@siddhivinayaktemple",
    "officialTrust": "Shree Siddhivinayak Ganapati Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UCEH8uzUHZ0V6H5p2C7ai5dA&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@siddhivinayaktemple/live",
    "backupVideoUrl": "https://www.youtube.com/embed/GdU7vdSe6aU",
    "imageUrl": "/images/ganesha.jpg",
    "icon": "🐘",
    "coords": {
      "lat": 19.0169,
      "lng": 72.8304
    },
    "rating": "4.9 ★",
    "devoteesOnline": 3900,
    "speciality": "Official Live Ganapati Darshana from Prabhadevi, Mumbai",
    "mantra": "ॐ गं गणपतये सर्व कार्य सिद्धि कुरु कुरु स्वाहा",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "05:30 AM",
        "desc": "Early morning Ganapati prayers"
      },
      {
        "name": "Maha Abhishek",
        "time": "07:30 AM",
        "desc": "Panchamrit bath with Modak"
      },
      {
        "name": "Dhoop Aarti",
        "time": "07:00 PM",
        "desc": "Evening camphor Deeparadhana"
      }
    ]
  },
  {
    "id": "iskcon_bangalore",
    "name": "ISKCON Sri Radha Krishna Temple",
    "hindiName": "इस्कॉन श्री राधा कृष्ण मंदिर बेंगलुरु (24/7 लाइव)",
    "deity": "Sri Radha Krishnachandra",
    "category": "karnataka",
    "location": "Hare Krishna Hill, Rajajinagar, Bengaluru, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "channelId": "UCba8cP-Kdlm00_YSoXk467w",
    "channelHandle": "@iskconbangalore",
    "officialTrust": "ISKCON Bangalore Society",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UCba8cP-Kdlm00_YSoXk467w&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@iskconbangalore/live",
    "backupVideoUrl": "https://www.youtube.com/embed/o48PvG182gk",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 13.0098,
      "lng": 77.5511
    },
    "rating": "5.0 ★",
    "devoteesOnline": 4200,
    "speciality": "Official 24/7 Live Broadcast of Mangala Aarti, Kirtan & Darshana",
    "mantra": "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे | हरे राम हरे राम राम राम हरे हरे",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Morning awakening with sweet kirtan"
      },
      {
        "name": "Tulasi Aarti",
        "time": "05:00 AM",
        "desc": "Sacred Tulasi worship"
      },
      {
        "name": "Shringara Darshan",
        "time": "07:15 AM",
        "desc": "Deity daily new costume reveal"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Grand Gaura Aarti & chanting"
      }
    ]
  },
  {
    "id": "baps_akshardham",
    "name": "BAPS Shri Swaminarayan Akshardham",
    "hindiName": "बीएपीएस स्वामीनारायण अक्षरधाम (वैश्विक लाइव)",
    "deity": "Bhagwan Swaminarayan",
    "category": "global",
    "location": "Global Broadcast (New Delhi & USA)",
    "state": "Global",
    "country": "Global",
    "channelId": "UCutvkeF3tVgItCX31QhJ2Dw",
    "channelHandle": "@baps",
    "officialTrust": "BAPS Swaminarayan Sanstha",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UCutvkeF3tVgItCX31QhJ2Dw&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@baps/live",
    "backupVideoUrl": "https://www.youtube.com/embed/59YYd1rkZRQ",
    "imageUrl": "/images/hampi.jpg",
    "icon": "🏛️",
    "coords": {
      "lat": 28.6127,
      "lng": 77.2773
    },
    "rating": "5.0 ★",
    "devoteesOnline": 3100,
    "speciality": "Official live broadcasts of Daily Aarti & Vedic cultural events",
    "mantra": "ॐ स्वामिनारायणाय नमः | ॐ अक्षरपुरुषोत्तमाय नमः",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "06:00 AM",
        "desc": "Morning peace and harmony prayers"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Musical singing of Thaal and Deeparadhana"
      }
    ]
  },
  {
    "id": "badrinath_kedarnath",
    "name": "Kedarnath & Badrinath Dham (BKTC)",
    "hindiName": "श्री बद्रीनाथ - केदारनाथ धाम (उत्तराखंड लाइव)",
    "deity": "Lord Shiva & Lord Badrinarayan",
    "category": "chardham",
    "location": "Garhwal Himalayas, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "channelId": "UC4sqfXTHIXfLiGE0Snx_ohA",
    "channelHandle": "@badrikedar",
    "officialTrust": "Shri Badrinath-Kedarnath Temple Committee (BKTC)",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UC4sqfXTHIXfLiGE0Snx_ohA&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@badrikedar/live",
    "backupVideoUrl": "https://www.youtube.com/embed/iaW4C8Laif4",
    "imageUrl": "/images/hampi.jpg",
    "icon": "🏔️",
    "coords": {
      "lat": 30.7352,
      "lng": 79.0669
    },
    "rating": "5.0 ★",
    "devoteesOnline": 4800,
    "speciality": "Official live broadcasts from the high Himalayan shrines",
    "mantra": "ॐ नमो भगवते वासुदेवाय | ॐ नमः शिवाय शुभं कुरु कुरु शिवाय नमः ॐ",
    "aartis": [
      {
        "name": "Maha Abhishek",
        "time": "04:30 AM",
        "desc": "Holy snowmelt water abhishek"
      },
      {
        "name": "Sandhya Aarti",
        "time": "06:30 PM",
        "desc": "Evening Aarti amidst Garhwal snow peaks"
      }
    ]
  },
  {
    "id": "pashupatinath_nepal",
    "name": "Pashupatinath Temple Kathmandu",
    "hindiName": "श्री पशुपतिनाथ मंदिर काठमांडू (बागमती महा आरती लाइव)",
    "deity": "Lord Shiva (Pashupatinatha)",
    "category": "global",
    "location": "Kathmandu, Nepal",
    "state": "Bagmati Province",
    "country": "Nepal",
    "channelId": "UCWGgdcaxoMhnSy7Z7hWqpwg",
    "channelHandle": "@NepalTelevisionOfficial",
    "officialTrust": "Pashupati Area Development Trust / Nepal Television",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UCWGgdcaxoMhnSy7Z7hWqpwg&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@NepalTelevisionOfficial/live",
    "backupVideoUrl": "https://www.youtube.com/embed/5D3CeeZ6X1s",
    "imageUrl": "/images/shiva_neelkanth.jpg",
    "icon": "🛕",
    "coords": {
      "lat": 27.7104,
      "lng": 85.3487
    },
    "rating": "4.9 ★",
    "devoteesOnline": 2900,
    "speciality": "UNESCO World Heritage Pagoda shrine on the sacred Bagmati River",
    "mantra": "ॐ पशुपतये नमः | ईशानः सर्वविद्यानामीश्वरः सर्वभूतानाम्",
    "aartis": [
      {
        "name": "Morning Rudrabhishek",
        "time": "05:00 AM",
        "desc": "Panchamrit bath by Bhatt priests"
      },
      {
        "name": "Bagmati Sandhya Aarti",
        "time": "06:00 PM",
        "desc": "Resonant riverbank bell and lamp aarti"
      }
    ]
  },
  {
    "id": "dhyanalinga_isha",
    "name": "Dhyanalinga & Adiyogi Coimbatore",
    "hindiName": "ध्यानालिंग व आदियोगी ईशा योग कोयंबटूर (लाइव)",
    "deity": "Lord Shiva (Adiyogi)",
    "category": "major",
    "location": "Velliangiri Foothills, Coimbatore, Tamil Nadu, India",
    "state": "Tamil Nadu",
    "country": "India",
    "channelId": "UCcYzLCs3zrQIBVHYA1sK2sw",
    "channelHandle": "@sadhguru",
    "officialTrust": "Isha Foundation",
    "liveStreamUrl": "https://www.youtube.com/embed/live_stream?channel=UCcYzLCs3zrQIBVHYA1sK2sw&autoplay=1&mute=0&rel=0",
    "directYoutubeUrl": "https://www.youtube.com/@sadhguru/live",
    "backupVideoUrl": "https://www.youtube.com/embed/5D3CeeZ6X1s",
    "imageUrl": "/images/shiva.jpg",
    "icon": "🧘",
    "coords": {
      "lat": 10.9725,
      "lng": 76.7408
    },
    "rating": "4.9 ★",
    "devoteesOnline": 3500,
    "speciality": "Official 24/7 Meditative Energy Center & Adiyogi Divya Darshana",
    "mantra": "योगेश्वर लिंगेश्वर महादेवाय नमः | ॐ नमः शिवाय",
    "aartis": [
      {
        "name": "AUM Chanting",
        "time": "06:00 AM",
        "desc": "Morning meditative sound resonance"
      },
      {
        "name": "Nada Aradhana",
        "time": "11:50 AM",
        "desc": "Acoustic offering with bells and singing bowls"
      },
      {
        "name": "Evening Aradhana",
        "time": "05:50 PM",
        "desc": "Sunset lamp offering"
      }
    ]
  }
];
