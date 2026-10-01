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
    "hindiName": "श्री साईं बाबा समाधि मंदिर शिर्डी (लाइव आरती)",
    "deity": "Shri Sai Baba of Shirdi",
    "category": "major",
    "location": "Shirdi, Ahmednagar, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "mCqRuQigwFU",
    "officialTrust": "Shri Saibaba Sansthan Trust (SSST), Shirdi",
    "liveStreamUrl": "https://www.youtube.com/embed/mCqRuQigwFU?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=mCqRuQigwFU",
    "imageUrl": "/images/dharma.jpg",
    "icon": "✨",
    "coords": {
      "lat": 19.7667,
      "lng": 74.4767
    },
    "rating": "5.0 ★",
    "devoteesOnline": 6420,
    "speciality": "Live Darshana & Aarti from the Samadhi Mandir of Sai Baba in Shirdi",
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
    "hindiName": "श्री वेंकटेश्वर स्वामी तिरुपति बालाजी (सुप्रभातम् व दर्शन)",
    "deity": "Lord Venkateswara (Balaji / Maha Vishnu)",
    "category": "major",
    "location": "Tirumala Hills, Tirupati, Andhra Pradesh, India",
    "state": "Andhra Pradesh",
    "country": "India",
    "videoId": "WBD_ktj_6KU",
    "officialTrust": "Tirumala Tirupati Devasthanams (TTD / SVBC)",
    "liveStreamUrl": "https://www.youtube.com/embed/WBD_ktj_6KU?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=WBD_ktj_6KU",
    "imageUrl": "/images/venkateswara_tirumala.jpg",
    "icon": "🛕",
    "coords": {
      "lat": 13.6833,
      "lng": 79.35
    },
    "rating": "5.0 ★",
    "devoteesOnline": 8150,
    "speciality": "Official Live Suprabhatam, Kalyanotsavam & Darshana from Tirumala",
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
    "hindiName": "श्री काशी विश्वनाथ ज्योतिर्लिंग (मंगला व गंगा आरती)",
    "deity": "Lord Shiva (Vishwanatha)",
    "category": "jyotirlinga",
    "location": "Varanasi, Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "k5Lz3m9s03M",
    "officialTrust": "Shree Kashi Vishwanath Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/k5Lz3m9s03M?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=k5Lz3m9s03M",
    "imageUrl": "/images/shiva_neelkanth.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 25.3109,
      "lng": 83.0107
    },
    "rating": "5.0 ★",
    "devoteesOnline": 5320,
    "speciality": "Live Mangala Aarti and Grand Ganga Aarti from Varanasi Ghats",
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
    "hindiName": "श्री महाकालेश्वर ज्योतिर्लिंग उज्जैन (भस्म आरती)",
    "deity": "Lord Shiva (Dakshinamurti Mahakala)",
    "category": "jyotirlinga",
    "location": "Ujjain, Madhya Pradesh, India",
    "state": "Madhya Pradesh",
    "country": "India",
    "videoId": "yuO3IWGpagI",
    "officialTrust": "Shri Mahakaleshwar Temple Management Committee",
    "liveStreamUrl": "https://www.youtube.com/embed/yuO3IWGpagI?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=yuO3IWGpagI",
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
    "hindiName": "श्री सोमनाथ ज्योतिर्लिंग (सागर आरती)",
    "deity": "Lord Shiva (Someshwara)",
    "category": "jyotirlinga",
    "location": "Prabhas Patan, Veraval, Gujarat, India",
    "state": "Gujarat",
    "country": "India",
    "videoId": "XG-8f_6FPco",
    "officialTrust": "Shree Somnath Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/XG-8f_6FPco?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=XG-8f_6FPco",
    "imageUrl": "/images/ellora_kailasa.jpg",
    "icon": "🌊",
    "coords": {
      "lat": 20.888,
      "lng": 70.4012
    },
    "rating": "4.9 ★",
    "devoteesOnline": 3150,
    "speciality": "First of 12 Jyotirlingas with Arabian Sea shoreline Aarti",
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
    "hindiName": "श्री सिद्धिविनायक गणपति मंदिर मुंबई (लाइव दर्शन)",
    "deity": "Lord Ganesha (Siddhivinayaka)",
    "category": "major",
    "location": "Prabhadevi, Mumbai, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "GdU7vdSe6aU",
    "officialTrust": "Shree Siddhivinayak Ganapati Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/GdU7vdSe6aU?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=GdU7vdSe6aU",
    "imageUrl": "/images/ganesha.jpg",
    "icon": "🐘",
    "coords": {
      "lat": 19.0169,
      "lng": 72.8304
    },
    "rating": "4.9 ★",
    "devoteesOnline": 3900,
    "speciality": "Live Ganapati Darshana and Modak offering from Prabhadevi, Mumbai",
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
    "hindiName": "इस्कॉन श्री राधा कृष्ण मंदिर बेंगलुरु (आरती व दर्शन)",
    "deity": "Sri Radha Krishnachandra",
    "category": "karnataka",
    "location": "Hare Krishna Hill, Rajajinagar, Bengaluru, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "tAm3NfRkcbw",
    "officialTrust": "ISKCON Bangalore Society",
    "liveStreamUrl": "https://www.youtube.com/embed/tAm3NfRkcbw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=tAm3NfRkcbw",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 13.0098,
      "lng": 77.5511
    },
    "rating": "5.0 ★",
    "devoteesOnline": 4200,
    "speciality": "Live Mangala Aarti, Kirtan & Darshana from Bangalore hilltop sanctum",
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
    "hindiName": "बीएपीएस स्वामीनारायण अक्षरधाम (भव्य आरती)",
    "deity": "Bhagwan Swaminarayan",
    "category": "global",
    "location": "New Delhi & Robbinsville, USA",
    "state": "Global",
    "country": "Global",
    "videoId": "w-TLCMlLh1Y",
    "officialTrust": "BAPS Swaminarayan Sanstha",
    "liveStreamUrl": "https://www.youtube.com/embed/w-TLCMlLh1Y?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=w-TLCMlLh1Y",
    "imageUrl": "/images/hampi.jpg",
    "icon": "🏛️",
    "coords": {
      "lat": 28.6127,
      "lng": 77.2773
    },
    "rating": "5.0 ★",
    "devoteesOnline": 3100,
    "speciality": "Grand Stone-Carved Temple Darshana & Daily Musical Aarti",
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
    "name": "Kedarnath & Badrinath Dham (Himalayas)",
    "hindiName": "श्री बद्रीनाथ - केदारनाथ धाम (हिमालय दर्शन)",
    "deity": "Lord Shiva & Lord Badrinarayan",
    "category": "chardham",
    "location": "Garhwal Himalayas, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "videoId": "yYrc-RG_5bI",
    "officialTrust": "Shri Badrinath-Kedarnath Temple Committee (BKTC)",
    "liveStreamUrl": "https://www.youtube.com/embed/yYrc-RG_5bI?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=yYrc-RG_5bI",
    "imageUrl": "/images/hampi.jpg",
    "icon": "🏔️",
    "coords": {
      "lat": 30.7352,
      "lng": 79.0669
    },
    "rating": "5.0 ★",
    "devoteesOnline": 4800,
    "speciality": "Sacred Himalayan Darshana of Kedarnath & Badrinath shrines",
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
    "hindiName": "श्री पशुपतिनाथ मंदिर काठमांडू (बागमती महा आरती)",
    "deity": "Lord Shiva (Pashupatinatha)",
    "category": "global",
    "location": "Kathmandu, Nepal",
    "state": "Bagmati Province",
    "country": "Nepal",
    "videoId": "k51UufYI3fg",
    "officialTrust": "Pashupati Area Development Trust / Nepal Television",
    "liveStreamUrl": "https://www.youtube.com/embed/k51UufYI3fg?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=k51UufYI3fg",
    "imageUrl": "/images/shiva_neelkanth.jpg",
    "icon": "🛕",
    "coords": {
      "lat": 27.7104,
      "lng": 85.3487
    },
    "rating": "4.9 ★",
    "devoteesOnline": 2900,
    "speciality": "UNESCO World Heritage Pagoda shrine & Bagmati River Maha Aarti",
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
    "id": "udupi_krishna_matha",
    "name": "Sri Krishna Matha Udupi",
    "hindiName": "श्री कृष्ण मठ उडुपी (कनकन किंडी व महापूजा)",
    "deity": "Lord Krishna (Bala Krishna)",
    "category": "karnataka",
    "location": "Udupi, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "o48PvG182gk",
    "officialTrust": "Paryaya Sri Krishna Matha Udupi",
    "liveStreamUrl": "https://www.youtube.com/embed/o48PvG182gk?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=o48PvG182gk",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🐚",
    "coords": {
      "lat": 13.3409,
      "lng": 74.7473
    },
    "rating": "4.9 ★",
    "devoteesOnline": 3430,
    "speciality": "Darshana through Kanakana Kindi window & Paryaya Swamiji Mahapooja",
    "mantra": "कृष्णाय वासुदेवाय हरये परमात्मने | प्रणत क्लेशनाशाय गोविंदाय नमो नमः",
    "aartis": [
      {
        "name": "Nirmalya Visarjana",
        "time": "05:00 AM",
        "desc": "Morning clearing & holy bath"
      },
      {
        "name": "Mahapooja",
        "time": "10:30 AM",
        "desc": "Paryaya Swamiji supreme offering"
      },
      {
        "name": "Chamara Seva",
        "time": "07:00 PM",
        "desc": "Golden chariot & fan ceremony"
      }
    ]
  },
  {
    "id": "chamundeshwari_mysore",
    "name": "Chamundeshwari Temple Mysuru",
    "hindiName": "श्री चामुंडेश्वरी देवी मंदिर मैसूर (शृंगार व आरती)",
    "deity": "Goddess Chamundeshwari",
    "category": "karnataka",
    "location": "Chamundi Hills, Mysuru, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "0s0Ef_9AOVg",
    "officialTrust": "Chamundeshwari Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/0s0Ef_9AOVg?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=0s0Ef_9AOVg",
    "imageUrl": "/images/lakshmibai.jpg",
    "icon": "🦁",
    "coords": {
      "lat": 12.2748,
      "lng": 76.6785
    },
    "rating": "4.9 ★",
    "devoteesOnline": 2650,
    "speciality": "Crowning Shakti Peetha atop Chamundi Hills overlooking Mysuru",
    "mantra": "ऐं ह्रीं क्लीं चामुण्डायै विच्चे",
    "aartis": [
      {
        "name": "Pratah Pooja",
        "time": "06:00 AM",
        "desc": "Abhisheka with sacred panchamrita"
      },
      {
        "name": "Mahamangalarathi",
        "time": "12:00 PM",
        "desc": "Noon golden crown deeparadhana"
      },
      {
        "name": "Rathri Pooja",
        "time": "07:30 PM",
        "desc": "Evening floral shringara"
      }
    ]
  },
  {
    "id": "dharmasthala_manjunatha",
    "name": "Shri Kshetra Dharmasthala",
    "hindiName": "श्री क्षेत्र धर्मस्थल मंजुनाथ स्वामी (पूजा व अन्नदान)",
    "deity": "Lord Manjunatha (Shiva)",
    "category": "karnataka",
    "location": "Dharmasthala, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "Vg3XIfzoN6w",
    "officialTrust": "Shri Kshetra Dharmasthala Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/Vg3XIfzoN6w?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=Vg3XIfzoN6w",
    "imageUrl": "/images/dharma.jpg",
    "icon": "🌾",
    "coords": {
      "lat": 12.9525,
      "lng": 75.3852
    },
    "rating": "5.0 ★",
    "devoteesOnline": 3890,
    "speciality": "Sacred Annadana feeding thousands of pilgrims daily on Netravati river",
    "mantra": "ॐ श्री मंजुनाथाय नमः | सत्यं धर्मं दया शांति",
    "aartis": [
      {
        "name": "Usha Kala Pooja",
        "time": "06:30 AM",
        "desc": "Dawn abhisheka and archana"
      },
      {
        "name": "Mahapooja",
        "time": "12:30 PM",
        "desc": "Noon grand aarti & Annadana blessings"
      },
      {
        "name": "Rathri Deeparadhana",
        "time": "07:30 PM",
        "desc": "Night lamp illuminations"
      }
    ]
  },
  {
    "id": "murudeshwar_shiva",
    "name": "Murudeshwar Shiva Mandir",
    "hindiName": "मुरुडेश्वर शिव मंदिर कर्नाटक (समुद्र तट दर्शन)",
    "deity": "Lord Shiva (Atmalinga)",
    "category": "karnataka",
    "location": "Murudeshwar, Coastal Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "5D3CeeZ6X1s",
    "officialTrust": "Murudeshwar Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/5D3CeeZ6X1s?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=5D3CeeZ6X1s",
    "imageUrl": "/images/ellora_kailasa.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 14.0942,
      "lng": 74.4849
    },
    "rating": "4.9 ★",
    "devoteesOnline": 2980,
    "speciality": "World's 2nd Tallest Shiva Statue (123 ft) on the Arabian Sea",
    "mantra": "ॐ तत्पुरुषाय विद्महे महादेवाय धीमहि तन्नो रुद्रः प्रचोदयात्",
    "aartis": [
      {
        "name": "Morning Darshana",
        "time": "06:00 AM",
        "desc": "Sea-side sunrise aarti"
      },
      {
        "name": "Madhyahna Pooja",
        "time": "12:30 PM",
        "desc": "Noon Bilva archana"
      },
      {
        "name": "Sunset Deeparadhana",
        "time": "07:00 PM",
        "desc": "Evening ocean illumination"
      }
    ]
  },
  {
    "id": "meenakshi_madurai",
    "name": "Meenakshi Sundareswarar Temple",
    "hindiName": "श्री मीनाक्षी सुंदरेश्वरर मंदिर मदुरै (दीपारधना)",
    "deity": "Goddess Meenakshi & Lord Sundareswarar",
    "category": "major",
    "location": "Madurai, Tamil Nadu, India",
    "state": "Tamil Nadu",
    "country": "India",
    "videoId": "r1PQXBUjpqM",
    "officialTrust": "Arulmigu Meenakshi Sundareswarar Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/r1PQXBUjpqM?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=r1PQXBUjpqM",
    "imageUrl": "/images/meenakshi.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 9.9195,
      "lng": 78.1193
    },
    "rating": "4.9 ★",
    "devoteesOnline": 2750,
    "speciality": "14 Towering Gopurams with 33,000 sculpted deities & Golden Lotus Tank",
    "mantra": "ॐ श्री मीनाक्षी देव्यै नमः | मातङ्गी जय माँ",
    "aartis": [
      {
        "name": "Thiruvanandal",
        "time": "05:00 AM",
        "desc": "Morning awakening with nadaswaram"
      },
      {
        "name": "Uchikalam",
        "time": "11:30 AM",
        "desc": "Midday pooja at Golden Lotus Tank"
      },
      {
        "name": "Sayaratchai",
        "time": "06:30 PM",
        "desc": "Grand evening camphor Deeparadhana"
      }
    ]
  }
];
