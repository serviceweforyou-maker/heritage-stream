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
    "id": "shirdi_sai",
    "name": "Shirdi Sai Baba Samadhi Mandir",
    "hindiName": "श्री साईं बाबा समाधि मंदिर शिर्डी (लाइव आरती व दर्शन)",
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
    "devoteesOnline": 12450,
    "speciality": "Official 24/7 Live Darshana & Aarti from the sacred Samadhi Mandir of Sai Baba in Shirdi",
    "mantra": "ॐ श्री साईंनाथाय नमः | सब का मालिक एक | ॐ साईं राम",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "04:30 AM",
        "desc": "Dawn auspicious awakening ritual"
      },
      {
        "name": "Madhyahna Aarti",
        "time": "12:00 PM",
        "desc": "Midday Rajbhog offering & Shringara"
      },
      {
        "name": "Dhoop Aarti",
        "time": "06:30 PM",
        "desc": "Sunset Deeparadhana with camphor & incense"
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
    "hindiName": "श्री वेंकटेश्वर स्वामी तिरुपति बालाजी (कल्याणोत्सवम् व दर्शन)",
    "deity": "Lord Venkateswara (Balaji / Maha Vishnu)",
    "category": "major",
    "location": "Tirumala Hills, Tirupati, Andhra Pradesh, India",
    "state": "Andhra Pradesh",
    "country": "India",
    "videoId": "XxdarKTmJ8c",
    "officialTrust": "Tirumala Tirupati Devasthanams (TTD / SVBC Official)",
    "liveStreamUrl": "https://www.youtube.com/embed/XxdarKTmJ8c?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=XxdarKTmJ8c",
    "imageUrl": "/images/venkateswara_tirumala.jpg",
    "icon": "🛕",
    "coords": {
      "lat": 13.6833,
      "lng": 79.35
    },
    "rating": "5.0 ★",
    "devoteesOnline": 18900,
    "speciality": "Official 24/7 Live Suprabhatam, Kalyanotsavam & Srivari Darshana from Tirumala",
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
        "name": "Srivari Kalyanotsavam",
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
    "name": "Shree Kashi Vishwanath Jyotirlinga",
    "hindiName": "श्री काशी विश्वनाथ ज्योतिर्लिंग धाम वाराणसी (लाइव दर्शन)",
    "deity": "Lord Shiva (Vishwanatha)",
    "category": "jyotirlinga",
    "location": "Varanasi, Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "uRUP4M_5vSo",
    "officialTrust": "Shree Kashi Vishwanath Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/uRUP4M_5vSo?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uRUP4M_5vSo",
    "imageUrl": "/images/shiva_neelkanth.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 25.3109,
      "lng": 83.0107
    },
    "rating": "5.0 ★",
    "devoteesOnline": 14200,
    "speciality": "Official Sanctum-Sanctorum Live Darshan from Kashi Vishwanath Dham on Ganga Ghats",
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
    "id": "somnath_jyotirlinga",
    "name": "Shree Somnath Jyotirlinga (1st Jyotirlinga)",
    "hindiName": "श्री सोमनाथ ज्योतिर्लिंग (प्रथम ज्योतिर्लिंग लाइव दर्शन)",
    "deity": "Lord Shiva (Someshwara)",
    "category": "jyotirlinga",
    "location": "Prabhas Patan, Veraval, Gujarat, India",
    "state": "Gujarat",
    "country": "India",
    "videoId": "uY5YwokiIsY",
    "officialTrust": "Shree Somnath Trust (Official Channel)",
    "liveStreamUrl": "https://www.youtube.com/embed/uY5YwokiIsY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uY5YwokiIsY",
    "imageUrl": "/images/ellora_kailasa.jpg",
    "icon": "🌊",
    "coords": {
      "lat": 20.888,
      "lng": 70.4012
    },
    "rating": "5.0 ★",
    "devoteesOnline": 9800,
    "speciality": "First of the 12 Jyotirlingas with continuous Arabian Sea shoreline Aarti & Abhishek",
    "mantra": "सौराष्ट्रदेशे विशदेऽतिरम्ये ज्योतिर्मयं चन्द्रकलावतंसम् | नमामि सोमनाथम्",
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
    "id": "mahakal_ujjain",
    "name": "Mahakaleshwar Jyotirlinga Ujjain",
    "hindiName": "श्री महाकालेश्वर ज्योतिर्लिंग उज्जैन (लाइव भस्म आरती व दर्शन)",
    "deity": "Lord Shiva (Dakshinamurti Mahakala)",
    "category": "jyotirlinga",
    "location": "Ujjain, Madhya Pradesh, India",
    "state": "Madhya Pradesh",
    "country": "India",
    "videoId": "H6D_IGx5xOI",
    "officialTrust": "Shri Mahakaleshwar Temple Management Committee",
    "liveStreamUrl": "https://www.youtube.com/embed/H6D_IGx5xOI?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=H6D_IGx5xOI",
    "imageUrl": "/images/shiva.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 23.1827,
      "lng": 75.7682
    },
    "rating": "5.0 ★",
    "devoteesOnline": 16500,
    "speciality": "World-renowned live Bhasma Aarti and Shipra river sacred Darshan",
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
    "id": "ayodhya_ram_lalla",
    "name": "Shri Ram Janmbhoomi Mandir Ayodhya",
    "hindiName": "श्री राम जन्मभूमि मंदिर अयोध्या (प्रभु श्री राम लला शृंगार आरती)",
    "deity": "Bhagwan Shri Ram Lalla Virajman",
    "category": "major",
    "location": "Ayodhya Dham, Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "W8qEqGulnPg",
    "officialTrust": "Shri Ram Janmbhoomi Teerth Kshetra (DD National Official)",
    "liveStreamUrl": "https://www.youtube.com/embed/W8qEqGulnPg?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=W8qEqGulnPg",
    "imageUrl": "/images/hampi.jpg",
    "icon": "🏹",
    "coords": {
      "lat": 26.7956,
      "lng": 82.1943
    },
    "rating": "5.0 ★",
    "devoteesOnline": 24600,
    "speciality": "Official Live Sringaar Aarti & Darshana of Prabhu Shri Ram Lalla from the Grand Temple",
    "mantra": "श्री राम जय राम जय जय राम | ॐ रां रामाय नमः | रघुपति राघव राजा राम",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Dawn awakening of Balak Ram"
      },
      {
        "name": "Sringaar Aarti",
        "time": "06:30 AM",
        "desc": "Morning royal dress & flower ornament offering"
      },
      {
        "name": "Bhog Aarti",
        "time": "12:00 PM",
        "desc": "Rajbhog offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening golden Deeparadhana"
      }
    ]
  },
  {
    "id": "iskcon_bangalore",
    "name": "ISKCON Sri Radha Krishna Temple",
    "hindiName": "इस्कॉन श्री राधा कृष्ण मंदिर बेंगलुरु (वैकुंठ हिल लाइव दर्शन)",
    "deity": "Sri Radha Krishnachandra",
    "category": "karnataka",
    "location": "Hare Krishna Hill / Vaikuntha Hill, Bengaluru, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "pq1fSKRlbc8",
    "officialTrust": "ISKCON Bangalore Society",
    "liveStreamUrl": "https://www.youtube.com/embed/pq1fSKRlbc8?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=pq1fSKRlbc8",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 13.0098,
      "lng": 77.5511
    },
    "rating": "5.0 ★",
    "devoteesOnline": 7800,
    "speciality": "Official 24/7 Live Darshana, Mangala Aarti & Mahamantra Kirtan from Vaikuntha Hill",
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
    "id": "iskcon_vrindavan",
    "name": "ISKCON Sri Sri Krishna Balaram Mandir",
    "hindiName": "इस्कॉन श्री श्री कृष्ण बलराम मंदिर वृन्दावन (लाइव कीर्तन व दर्शन)",
    "deity": "Sri Sri Krishna Balaram & Radhashyamasundara",
    "category": "major",
    "location": "Raman Reti, Vrindavan, Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "O2ojNbbB8Iw",
    "officialTrust": "ISKCON Vrindavan Official",
    "liveStreamUrl": "https://www.youtube.com/embed/O2ojNbbB8Iw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=O2ojNbbB8Iw",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 27.5706,
      "lng": 77.6749
    },
    "rating": "5.0 ★",
    "devoteesOnline": 11200,
    "speciality": "Continuous Live 24/7 Akhanda Kirtan and Darshana from holy Raman Reti, Vrindavan",
    "mantra": "जय श्री राधे | राधे कृष्ण राधे श्याम | हरे कृष्ण महामंत्र",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Auspicious 24-hour kirtan awakening"
      },
      {
        "name": "Darshan Aarti",
        "time": "07:15 AM",
        "desc": "Grand deity darshan reveal"
      },
      {
        "name": "Sandhya Aarti",
        "time": "06:30 PM",
        "desc": "Evening Gaura Aarti"
      }
    ]
  },
  {
    "id": "vaishno_devi",
    "name": "Shri Mata Vaishno Devi Shrine",
    "hindiName": "श्री माता वैष्णो देवी धाम कटरा (पवित्र भवन लाइव आरती)",
    "deity": "Maa Vaishno Devi (Maha Kali, Maha Lakshmi, Maha Saraswati)",
    "category": "major",
    "location": "Trikuta Hills, Katra, Jammu & Kashmir, India",
    "state": "Jammu & Kashmir",
    "country": "India",
    "videoId": "jD-THm4dJz0",
    "officialTrust": "Shri Mata Vaishno Devi Shrine Board (Shraddha MH ONE)",
    "liveStreamUrl": "https://www.youtube.com/embed/jD-THm4dJz0?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=jD-THm4dJz0",
    "imageUrl": "/images/lakshmibai.jpg",
    "icon": "🏔️",
    "coords": {
      "lat": 33.0308,
      "lng": 74.949
    },
    "rating": "5.0 ★",
    "devoteesOnline": 15300,
    "speciality": "Live Pavitra Bhawan Aarti and Darshan from the Holy Cave atop Trikuta Mountains",
    "mantra": "जय माता दी | ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे | सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके",
    "aartis": [
      {
        "name": "Pratah Aarti",
        "time": "05:00 AM",
        "desc": "Dawn cave awakening and Pindi Darshan"
      },
      {
        "name": "Sandhya Aarti",
        "time": "06:30 PM",
        "desc": "Evening golden lamp recitation"
      }
    ]
  },
  {
    "id": "rishikesh_ganga_aarti",
    "name": "Parmarth Niketan Rishikesh (Ganga Aarti)",
    "hindiName": "परमार्थ निकेतन ऋषिकेश (भव्य गंगा आरती व यज्ञ)",
    "deity": "Maa Ganga & Lord Shiva",
    "category": "major",
    "location": "Parmarth Niketan Ashram, Rishikesh, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "videoId": "usvU6ox_NQU",
    "officialTrust": "Parmarth Niketan Ashram Official",
    "liveStreamUrl": "https://www.youtube.com/embed/usvU6ox_NQU?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=usvU6ox_NQU",
    "imageUrl": "/images/shiva.jpg",
    "icon": "🔥",
    "coords": {
      "lat": 30.1197,
      "lng": 78.3117
    },
    "rating": "5.0 ★",
    "devoteesOnline": 8700,
    "speciality": "World-famous Live Sunset Ganga Aarti and Havan on the holy banks of Mother Ganga in Rishikesh",
    "mantra": "ॐ जय गंगे माता | ॐ हर हर गंगे | नमामि गंगे तव पादपंकजम्",
    "aartis": [
      {
        "name": "Pratah Yajna",
        "time": "07:00 AM",
        "desc": "Morning Vedic fire oblations"
      },
      {
        "name": "Maha Ganga Aarti",
        "time": "06:00 PM",
        "desc": "Sunset multi-tiered bronze lamp Aarti"
      }
    ]
  },
  {
    "id": "siddhivinayak_mumbai",
    "name": "Shree Siddhivinayak Ganapati Temple",
    "hindiName": "श्री सिद्धिविनायक गणपति मंदिर मुंबई (लाइव आरती व दर्शन)",
    "deity": "Lord Ganesha (Siddhivinayaka)",
    "category": "major",
    "location": "Prabhadevi, Mumbai, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "V2FnGzYYux8",
    "officialTrust": "Shree Siddhivinayak Ganapati Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/V2FnGzYYux8?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=V2FnGzYYux8",
    "imageUrl": "/images/ganesha.jpg",
    "icon": "🐘",
    "coords": {
      "lat": 19.0169,
      "lng": 72.8304
    },
    "rating": "5.0 ★",
    "devoteesOnline": 13400,
    "speciality": "Official Live Ganapati Darshana, Modak Prasad & Camphor Aarti from Mumbai",
    "mantra": "ॐ गं गणपतये सर्व कार्य सिद्धि कुरु कुरु स्वाहा | वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ",
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
    "id": "jagannath_puri",
    "name": "Shree Jagannath Temple Puri",
    "hindiName": "श्री जगन्नाथ मंदिर पुरी (नीलाचल लाइव आरती व दर्शन)",
    "deity": "Lord Jagannath, Balabhadra & Subhadra",
    "category": "chardham",
    "location": "Puri, Odisha, India",
    "state": "Odisha",
    "country": "India",
    "videoId": "WD5kyQ4laVs",
    "officialTrust": "Shree Jagannath Temple Administration (Jay Jagannath TV)",
    "liveStreamUrl": "https://www.youtube.com/embed/WD5kyQ4laVs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=WD5kyQ4laVs",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🛕",
    "coords": {
      "lat": 19.8049,
      "lng": 85.8179
    },
    "rating": "5.0 ★",
    "devoteesOnline": 17200,
    "speciality": "Official 24/7 Live Darshana from the sacred Nilachala Dham and Mahaprasada Sanctum",
    "mantra": "नीलाचलनिवासाय नित्याय परमात्मने | बलभद्रसुभद्राभ्यां जगन्नाथाय ते नमः",
    "aartis": [
      {
        "name": "Mangala Alati",
        "time": "05:00 AM",
        "desc": "First auspicious awakening"
      },
      {
        "name": "Madhyahna Dhupa",
        "time": "01:00 PM",
        "desc": "Grand 56 Bhog Mahaprasad offering"
      },
      {
        "name": "Sandhya Alati",
        "time": "07:00 PM",
        "desc": "Evening oil lamp offering"
      }
    ]
  },
  {
    "id": "tulja_bhavani",
    "name": "Shri Tulja Bhavani Temple",
    "hindiName": "श्री तुळजाभवानी माता मंदिर तुळजापूर (लाइव दर्शन)",
    "deity": "Goddess Tulja Bhavani (Kulswamini)",
    "category": "major",
    "location": "Tuljapur, Osmanabad, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "B3r-kt5dK_M",
    "officialTrust": "Shri Tuljabhavani Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/B3r-kt5dK_M?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=B3r-kt5dK_M",
    "imageUrl": "/images/meenakshi.jpg",
    "icon": "🌺",
    "coords": {
      "lat": 18.0069,
      "lng": 76.0792
    },
    "rating": "4.9 ★",
    "devoteesOnline": 6700,
    "speciality": "Swayambhu Shakti Peetha and patron deity of Chhatrapati Shivaji Maharaj",
    "mantra": "ॐ श्री तुळजाभवानी देव्यै नमः | आई राजा उदे उदे",
    "aartis": [
      {
        "name": "Charnamrit Aarti",
        "time": "05:00 AM",
        "desc": "Sacred dawn panchamrit abhisheka"
      },
      {
        "name": "Dhoop Aarti",
        "time": "07:00 PM",
        "desc": "Evening grand floral deeparadhana"
      }
    ]
  },
  {
    "id": "khatu_shyam",
    "name": "Shree Khatu Shyam Ji Temple",
    "hindiName": "श्री खाटू श्याम जी मंदिर राजस्थान (लाइव आरती व दर्शन)",
    "deity": "Barbarika (Khatu Shyam Ji / Haare Ka Sahara)",
    "category": "major",
    "location": "Khatu, Sikar, Rajasthan, India",
    "state": "Rajasthan",
    "country": "India",
    "videoId": "aHp8nnOwcpc",
    "officialTrust": "Shri Shyam Mandir Committee Khatu Dham",
    "liveStreamUrl": "https://www.youtube.com/embed/aHp8nnOwcpc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=aHp8nnOwcpc",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🚩",
    "coords": {
      "lat": 27.4297,
      "lng": 75.3117
    },
    "rating": "5.0 ★",
    "devoteesOnline": 10400,
    "speciality": "Live Pratah Aarti & Shringara Darshan of Haare Ka Sahara Khatu Naresh",
    "mantra": "ॐ श्री श्याम देवाय नमः | हारे का सहारा बाबा श्याम हमारा",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Morning awakening prayers"
      },
      {
        "name": "Shringara Aarti",
        "time": "07:00 AM",
        "desc": "Floral crown decoration"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening camphor offering"
      }
    ]
  },
  {
    "id": "salasar_balaji",
    "name": "Shree Salasar Balaji Mandir",
    "hindiName": "श्री सालासर बालाजी मंदिर राजस्थान (लाइव मंगला आरती)",
    "deity": "Lord Hanuman (Salasar Balaji)",
    "category": "major",
    "location": "Salasar, Churu, Rajasthan, India",
    "state": "Rajasthan",
    "country": "India",
    "videoId": "q58Wan19vns",
    "officialTrust": "Shree Salasar Balaji Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/q58Wan19vns?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=q58Wan19vns",
    "imageUrl": "/images/dharma.jpg",
    "icon": "🚩",
    "coords": {
      "lat": 27.7126,
      "lng": 74.7214
    },
    "rating": "5.0 ★",
    "devoteesOnline": 8900,
    "speciality": "Unique bearded Hanumanji idol with continuous live Mangala Aarti and Savamani offerings",
    "mantra": "ॐ श्री सालासर बालाजी नमः | मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम्",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:00 AM",
        "desc": "Dawn awakening with Hanuman Chalisa"
      },
      {
        "name": "Bhog Aarti",
        "time": "11:30 AM",
        "desc": "Churma Prasad offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening lamp illumination"
      }
    ]
  },
  {
    "id": "kedarnath_dham",
    "name": "Kedarnath & Badrinath Himalayan Dham",
    "hindiName": "श्री केदारनाथ - बद्रीनाथ धाम (हिमालय लाइव दर्शन)",
    "deity": "Lord Shiva & Lord Badri Vishal",
    "category": "chardham",
    "location": "Garhwal Himalayas, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "videoId": "fURwn8kbRBc",
    "officialTrust": "Shri Badrinath-Kedarnath Temple Committee (BKTC)",
    "liveStreamUrl": "https://www.youtube.com/embed/fURwn8kbRBc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=fURwn8kbRBc",
    "imageUrl": "/images/hampi.jpg",
    "icon": "🏔️",
    "coords": {
      "lat": 30.7352,
      "lng": 79.0669
    },
    "rating": "5.0 ★",
    "devoteesOnline": 9500,
    "speciality": "Himalayan Snow-Peak Darshana of the Supreme Shiva Sanctum at 3,583 meters",
    "mantra": "ॐ नमो भगवते वासुदेवाय | ॐ नमः शिवाय शुभं कुरु कुरु शिवाय नमः ॐ",
    "aartis": [
      {
        "name": "Maha Abhishek",
        "time": "04:30 AM",
        "desc": "Dawn snowmelt water bath"
      },
      {
        "name": "Sandhya Aarti",
        "time": "06:30 PM",
        "desc": "Evening mountain lamp prayer"
      }
    ]
  },
  {
    "id": "udupi_krishna",
    "name": "Sri Krishna Matha Udupi",
    "hindiName": "श्री कृष्ण मठ उडुपी (कनकन किंडी व महापूजा लाइव)",
    "deity": "Lord Krishna (Bala Krishna)",
    "category": "karnataka",
    "location": "Udupi, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "8JsL-H7fJy4",
    "officialTrust": "Paryaya Sri Krishna Matha Udupi",
    "liveStreamUrl": "https://www.youtube.com/embed/8JsL-H7fJy4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=8JsL-H7fJy4",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🐚",
    "coords": {
      "lat": 13.3409,
      "lng": 74.7473
    },
    "rating": "5.0 ★",
    "devoteesOnline": 5600,
    "speciality": "Darshana through Kanakana Kindi window & Paryaya Swamiji Mahapooja with golden chariot",
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
    "id": "meenakshi_madurai",
    "name": "Meenakshi Sundareswarar Temple",
    "hindiName": "श्री मीनाक्षी सुंदरेश्वरर मंदिर मदुरै (लाइव दर्शन)",
    "deity": "Goddess Meenakshi & Lord Sundareswarar",
    "category": "major",
    "location": "Madurai, Tamil Nadu, India",
    "state": "Tamil Nadu",
    "country": "India",
    "videoId": "Aicrlohuuug",
    "officialTrust": "Arulmigu Meenakshi Sundareswarar Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/Aicrlohuuug?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=Aicrlohuuug",
    "imageUrl": "/images/meenakshi.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 9.9195,
      "lng": 78.1193
    },
    "rating": "5.0 ★",
    "devoteesOnline": 6200,
    "speciality": "14 Towering Gopurams with 33,000 sculpted deities & Golden Lotus Tank live ceremonies",
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
  },
  {
    "id": "chamundeshwari_mysuru",
    "name": "Chamundeshwari Temple Mysuru",
    "hindiName": "श्री चामुंडेश्वरी देवी मंदिर मैसूर (शृंगार व लाइव दर्शन)",
    "deity": "Goddess Chamundeshwari",
    "category": "karnataka",
    "location": "Chamundi Hills, Mysuru, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "9SBpnTrrXlw",
    "officialTrust": "Chamundeshwari Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/9SBpnTrrXlw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=9SBpnTrrXlw",
    "imageUrl": "/images/lakshmibai.jpg",
    "icon": "🦁",
    "coords": {
      "lat": 12.2748,
      "lng": 76.6785
    },
    "rating": "5.0 ★",
    "devoteesOnline": 4900,
    "speciality": "Crowning Shakti Peetha atop Chamundi Hills overlooking Mysuru palace city",
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
    "id": "pashupatinath_temple",
    "name": "Pashupatinath Temple Kathmandu",
    "hindiName": "श्री पशुपतिनाथ मंदिर काठमांडू (बागमती महा आरती व दर्शन)",
    "deity": "Lord Shiva (Pashupatinatha)",
    "category": "major",
    "location": "Kathmandu, Nepal",
    "state": "Bagmati Province",
    "country": "Nepal",
    "videoId": "bi1PDhKGUd4",
    "officialTrust": "Pashupati Area Development Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/bi1PDhKGUd4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=bi1PDhKGUd4",
    "imageUrl": "/images/shiva_neelkanth.jpg",
    "icon": "🛕",
    "coords": {
      "lat": 27.7104,
      "lng": 85.3487
    },
    "rating": "5.0 ★",
    "devoteesOnline": 7100,
    "speciality": "UNESCO World Heritage Pagoda shrine & Bagmati River Evening Maha Aarti",
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
  }
];
