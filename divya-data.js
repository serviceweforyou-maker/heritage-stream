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
    "fallbackVideoId": "mCqRuQigwFU",
    "officialTrust": "Shri Saibaba Sansthan Trust (SSST), Shirdi",
    "liveStreamUrl": "https://www.youtube.com/embed/mCqRuQigwFU?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=mCqRuQigwFU",
    "imageUrl": "https://img.youtube.com/vi/mCqRuQigwFU/hqdefault.jpg",
    "icon": "✨",
    "coords": {
      "lat": 19.7667,
      "lng": 74.4767
    },
    "rating": "5.0 ★",
    "devoteesOnline": 14250,
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
    "fallbackVideoId": "XxdarKTmJ8c",
    "officialTrust": "Tirumala Tirupati Devasthanams (TTD / SVBC Official)",
    "liveStreamUrl": "https://www.youtube.com/embed/XxdarKTmJ8c?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=XxdarKTmJ8c",
    "imageUrl": "https://img.youtube.com/vi/XxdarKTmJ8c/hqdefault.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 13.6833,
      "lng": 79.35
    },
    "rating": "5.0 ★",
    "devoteesOnline": 24800,
    "speciality": "Official Kalyanotsavam, Suprabhatam & Live Darshanam of Kaliyuga Vaikuntha Lord Balaji",
    "mantra": "ॐ नमो वेङ्कटेशाय | ॐ श्रीनिवासाय नमः | गोविन्दा गोविन्दा",
    "aartis": [
      {
        "name": "Suprabhatam",
        "time": "03:00 AM",
        "desc": "Sacred Vedic awakening hymn"
      },
      {
        "name": "Thomala Seva",
        "time": "05:00 AM",
        "desc": "Garlanding Lord with fresh fragrant flowers"
      },
      {
        "name": "Kalyanotsavam",
        "time": "11:30 AM",
        "desc": "Celestial wedding seva of Lord Balaji"
      },
      {
        "name": "Ekanta Seva",
        "time": "11:00 PM",
        "desc": "Night repose ritual for the deity"
      }
    ]
  },
  {
    "id": "kashi_vishwanath",
    "name": "Shree Kashi Vishwanath Jyotirlinga",
    "hindiName": "श्री काशी विश्वनाथ ज्योतिर्लिंग धाम वाराणसी (लाइव दर्शन व मंगला आरती)",
    "deity": "Lord Shiva (Vishveshwara / Mahadeva)",
    "category": "jyotirlinga",
    "location": "Varanasi (Kashi), Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "uRUP4M_5vSo",
    "fallbackVideoId": "uRUP4M_5vSo",
    "officialTrust": "Shree Kashi Vishwanath Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/uRUP4M_5vSo?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uRUP4M_5vSo",
    "imageUrl": "https://img.youtube.com/vi/uRUP4M_5vSo/hqdefault.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 25.3109,
      "lng": 83.0107
    },
    "rating": "5.0 ★",
    "devoteesOnline": 18700,
    "speciality": "Eternal Moksha Kshetra and Golden Spire Jyotirlinga on the banks of sacred Holy Ganga",
    "mantra": "कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् | ॐ नमः शिवाय",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "03:00 AM",
        "desc": "Sacred pre-dawn holy bath and Shringara"
      },
      {
        "name": "Bhog Aarti",
        "time": "11:15 AM",
        "desc": "Midday pure Prasad offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Ganga water ablution & Damaru chanting"
      },
      {
        "name": "Shayan Aarti",
        "time": "10:30 PM",
        "desc": "Night resting ritual of Vishwanath Baba"
      }
    ]
  },
  {
    "id": "somnath_jyotirlinga",
    "name": "Shree Somnath Jyotirlinga (1st Jyotirlinga)",
    "hindiName": "श्री सोमनाथ ज्योतिर्लिंग प्रभास पाटन (लाइव दर्शन व आरती)",
    "deity": "Lord Shiva (Someshwara / Chandra Shekhara)",
    "category": "jyotirlinga",
    "location": "Prabhas Patan, Veraval, Gujarat, India",
    "state": "Gujarat",
    "country": "India",
    "videoId": "uY5YwokiIsY",
    "fallbackVideoId": "uY5YwokiIsY",
    "officialTrust": "Shree Somnath Trust (Official Channel)",
    "liveStreamUrl": "https://www.youtube.com/embed/uY5YwokiIsY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uY5YwokiIsY",
    "imageUrl": "https://img.youtube.com/vi/uY5YwokiIsY/hqdefault.jpg",
    "icon": "🌊",
    "coords": {
      "lat": 20.888,
      "lng": 70.4013
    },
    "rating": "5.0 ★",
    "devoteesOnline": 9800,
    "speciality": "The First among the Twelve Sacred Jyotirlingas, overlooking the vast Arabian Sea",
    "mantra": "सौराष्ट्रदेशे विशदेऽतिरम्ये ज्योतिर्मयं चन्द्रकलावतंसम् | ॐ नमः शिवाय",
    "aartis": [
      {
        "name": "Pratah Aarti",
        "time": "07:00 AM",
        "desc": "Morning divine ocean-side aarti"
      },
      {
        "name": "Madhyahna Aarti",
        "time": "12:00 PM",
        "desc": "Noon sacred offering to Someshwara"
      },
      {
        "name": "Sandhya Deeparadhana",
        "time": "07:00 PM",
        "desc": "Evening ocean breeze lamp ceremony"
      }
    ]
  },
  {
    "id": "mahakal_ujjain",
    "name": "Mahakaleshwar Jyotirlinga Ujjain",
    "hindiName": "श्री महाकालेश्वर ज्योतिर्लिंग उज्जैन (भस्म आरती व लाइव दर्शन)",
    "deity": "Lord Shiva (Dakshinamurti Mahakal)",
    "category": "jyotirlinga",
    "location": "Ujjain, Madhya Pradesh, India",
    "state": "Madhya Pradesh",
    "country": "India",
    "videoId": "H6D_IGx5xOI",
    "fallbackVideoId": "H6D_IGx5xOI",
    "officialTrust": "Shri Mahakaleshwar Temple Management Committee",
    "liveStreamUrl": "https://www.youtube.com/embed/H6D_IGx5xOI?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=H6D_IGx5xOI",
    "imageUrl": "https://img.youtube.com/vi/H6D_IGx5xOI/hqdefault.jpg",
    "icon": "🔥",
    "coords": {
      "lat": 23.1827,
      "lng": 75.7682
    },
    "rating": "5.0 ★",
    "devoteesOnline": 21500,
    "speciality": "South-facing Dakshinamurti Jyotirlinga world-renowned for the sacred daily Bhasma Aarti",
    "mantra": "अकालमृत्युहरणं सर्वव्याधिविनाशनम् । महाकाल नमस्तुभ्यं मया दत्तं गृहाण भो ॥",
    "aartis": [
      {
        "name": "Bhasma Aarti",
        "time": "04:00 AM",
        "desc": "Consecrated sacred ash offering ritual"
      },
      {
        "name": "Naivedya Aarti",
        "time": "10:30 AM",
        "desc": "Mid-morning Prasad & Shringara"
      },
      {
        "name": "Sandhya Aarti",
        "time": "05:00 PM",
        "desc": "Evening royal darshana & dhvaj puja"
      },
      {
        "name": "Shayan Aarti",
        "time": "10:30 PM",
        "desc": "Bedtime closure ritual"
      }
    ]
  },
  {
    "id": "ayodhya_ram_lalla",
    "name": "Shri Ram Janmbhoomi Mandir Ayodhya",
    "hindiName": "श्री राम जन्मभूमि मंदिर अयोध्या (श्री रामलला सरकार लाइव दर्शन व आरती)",
    "deity": "Bhagwan Shri Ram Lalla Virajman",
    "category": "major",
    "location": "Ayodhya Dham, Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "W8qEqGulnPg",
    "fallbackVideoId": "W8qEqGulnPg",
    "officialTrust": "Shri Ram Janmbhoomi Teerth Kshetra (DD National Official)",
    "liveStreamUrl": "https://www.youtube.com/embed/W8qEqGulnPg?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=W8qEqGulnPg",
    "imageUrl": "https://img.youtube.com/vi/W8qEqGulnPg/hqdefault.jpg",
    "icon": "🏹",
    "coords": {
      "lat": 26.7956,
      "lng": 82.1943
    },
    "rating": "5.0 ★",
    "devoteesOnline": 32000,
    "speciality": "The Divine Birthplace Sanctum of Maryada Purushottam Prabhu Shri Ram in Ayodhya",
    "mantra": "श्री राम जय राम जय जय राम | ॐ रामाय नमः | मंगल भवन अमंगल हारी",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Awakening of child Ram Lalla"
      },
      {
        "name": "Shringaar Aarti",
        "time": "06:30 AM",
        "desc": "Royal golden crown and jewelry adornment"
      },
      {
        "name": "Bhog Aarti",
        "time": "12:00 PM",
        "desc": "Midday royal feast & Rajbhog"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:30 PM",
        "desc": "Evening deeparadhana with Vedic hymns"
      },
      {
        "name": "Shayan Aarti",
        "time": "10:00 PM",
        "desc": "Night lullaby (Lori) & resting ceremony"
      }
    ]
  },
  {
    "id": "iskcon_bangalore",
    "name": "ISKCON Sri Radha Krishna Temple",
    "hindiName": "इस्कॉन श्री राधा कृष्ण मंदिर बेंगलुरु (लाइव कीर्तन व दर्शन)",
    "deity": "Sri Sri Radha Krishnachandra",
    "category": "krishna",
    "location": "Hare Krishna Hill, Rajajinagar, Bengaluru, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "pq1fSKRlbc8",
    "fallbackVideoId": "pq1fSKRlbc8",
    "officialTrust": "ISKCON Bangalore Society",
    "liveStreamUrl": "https://www.youtube.com/embed/pq1fSKRlbc8?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=pq1fSKRlbc8",
    "imageUrl": "https://img.youtube.com/vi/pq1fSKRlbc8/hqdefault.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 13.0098,
      "lng": 77.5511
    },
    "rating": "5.0 ★",
    "devoteesOnline": 8600,
    "speciality": "One of the world's largest Radha Krishna cultural complexes, renowned for uplifting Harinama Kirtan",
    "mantra": "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे | हरे राम हरे राम राम राम हरे हरे ॥",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Morning auspicious Tulasi & Radha Krishna aarti"
      },
      {
        "name": "Darshan Aarti",
        "time": "07:15 AM",
        "desc": "Full daylight Shringara darshana"
      },
      {
        "name": "Rajbhog Aarti",
        "time": "12:30 PM",
        "desc": "Noon feast offering"
      },
      {
        "name": "Gaura Aarti",
        "time": "07:00 PM",
        "desc": "Grand evening musical kirtan"
      }
    ]
  },
  {
    "id": "iskcon_vrindavan",
    "name": "ISKCON Sri Sri Krishna Balaram Mandir",
    "hindiName": "इस्कॉन कृष्ण बलराम मंदिर श्री धाम वृन्दावन (लाइव महा आरती)",
    "deity": "Sri Sri Krishna Balaram & Radha Shyamasundar",
    "category": "krishna",
    "location": "Raman Reti, Vrindavan, Mathura, UP, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "O2ojNbbB8Iw",
    "fallbackVideoId": "O2ojNbbB8Iw",
    "officialTrust": "ISKCON Vrindavan Official",
    "liveStreamUrl": "https://www.youtube.com/embed/O2ojNbbB8Iw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=O2ojNbbB8Iw",
    "imageUrl": "https://img.youtube.com/vi/O2ojNbbB8Iw/hqdefault.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 27.5706,
      "lng": 77.681
    },
    "rating": "5.0 ★",
    "devoteesOnline": 16500,
    "speciality": "24-Hour Continuous Akhanda Maha-Mantra Kirtan in the holy land of Braj Bhumi",
    "mantra": "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे । हरे राम हरे राम राम राम हरे हरे ॥",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Dawn opening chanting"
      },
      {
        "name": "Tulasi Puja",
        "time": "05:00 AM",
        "desc": "Sacred Basil circumambulation"
      },
      {
        "name": "Sandhya Gaura Aarti",
        "time": "07:00 PM",
        "desc": "Evening kirtan dance"
      }
    ]
  },
  {
    "id": "vaishno_devi",
    "name": "Shri Mata Vaishno Devi Shrine",
    "hindiName": "श्री माता वैष्णो देवी धाम कटरा (लाइव भवन आरती व दर्शन)",
    "deity": "Mata Vaishno Devi (Maha Kali, Maha Lakshmi, Maha Saraswati)",
    "category": "shakti",
    "location": "Trikuta Hills, Katra, Jammu & Kashmir, India",
    "state": "Jammu & Kashmir",
    "country": "India",
    "videoId": "jD-THm4dJz0",
    "fallbackVideoId": "jD-THm4dJz0",
    "officialTrust": "Shri Mata Vaishno Devi Shrine Board (Shraddha MH ONE)",
    "liveStreamUrl": "https://www.youtube.com/embed/jD-THm4dJz0?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=jD-THm4dJz0",
    "imageUrl": "https://img.youtube.com/vi/jD-THm4dJz0/hqdefault.jpg",
    "icon": "🌺",
    "coords": {
      "lat": 33.0308,
      "lng": 74.949
    },
    "rating": "5.0 ★",
    "devoteesOnline": 19400,
    "speciality": "Sacred Holy Cave Shrine in the Trikuta Mountains housing the holy natural Pindis",
    "mantra": "ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे | जय माता दी",
    "aartis": [
      {
        "name": "Pratah Kaalin Aarti",
        "time": "05:00 AM",
        "desc": "Dawn cave sanctum puja"
      },
      {
        "name": "Sandhya Kaalin Aarti",
        "time": "06:30 PM",
        "desc": "Sunset lamp illumination"
      }
    ]
  },
  {
    "id": "rishikesh_ganga_aarti",
    "name": "Parmarth Niketan Rishikesh (Ganga Aarti)",
    "hindiName": "परमार्थ निकेतन ऋषिकेश (दैनिक दिव्य माँ गंगा आरती)",
    "deity": "Maa Ganga & Lord Shiva",
    "category": "ganga",
    "location": "Parmarth Niketan Ghat, Rishikesh, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "videoId": "usvU6ox_NQU",
    "fallbackVideoId": "usvU6ox_NQU",
    "officialTrust": "Parmarth Niketan Ashram Official",
    "liveStreamUrl": "https://www.youtube.com/embed/usvU6ox_NQU?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=usvU6ox_NQU",
    "imageUrl": "https://img.youtube.com/vi/usvU6ox_NQU/hqdefault.jpg",
    "icon": "🌊",
    "coords": {
      "lat": 30.1215,
      "lng": 78.314
    },
    "rating": "5.0 ★",
    "devoteesOnline": 11200,
    "speciality": "Soul-stirring sunset Maha Aarti with Vedic chanting on the pristine Himalayan banks of river Ganga",
    "mantra": "ॐ जय गंगे माता, मैया जय गंगे माता | हर हर गंगे, जय माँ गंगे",
    "aartis": [
      {
        "name": "Havan & Veda Path",
        "time": "05:00 PM",
        "desc": "Sunset fire offering by Rishikumars"
      },
      {
        "name": "Maha Ganga Aarti",
        "time": "06:00 PM",
        "desc": "Grand multi-tiered brass lamp aarti"
      }
    ]
  },
  {
    "id": "siddhivinayak_mumbai",
    "name": "Shree Siddhivinayak Ganapati Temple",
    "hindiName": "श्री सिद्धिविनायक गणपति मंदिर प्रभादेवी मुम्बई (लाइव दर्शन)",
    "deity": "Lord Ganesha (Siddhivinayak)",
    "category": "ganesh",
    "location": "Prabhadevi, Mumbai, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "V2FnGzYYux8",
    "fallbackVideoId": "V2FnGzYYux8",
    "officialTrust": "Shree Siddhivinayak Ganapati Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/V2FnGzYYux8?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=V2FnGzYYux8",
    "imageUrl": "https://img.youtube.com/vi/V2FnGzYYux8/hqdefault.jpg",
    "icon": "🐘",
    "coords": {
      "lat": 19.0169,
      "lng": 72.8304
    },
    "rating": "5.0 ★",
    "devoteesOnline": 15300,
    "speciality": "Fulfiller of desires with right-tilted trunk (Navasacha Ganapati) enshrined in 200+ year old sanctum",
    "mantra": "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ । निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा ॥",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "05:30 AM",
        "desc": "Morning awakening prayers"
      },
      {
        "name": "Madhyahna Aarti",
        "time": "12:05 PM",
        "desc": "Afternoon Naivedya"
      },
      {
        "name": "Dhoop Aarti",
        "time": "07:00 PM",
        "desc": "Evening Aarti"
      },
      {
        "name": "Shej Aarti",
        "time": "09:50 PM",
        "desc": "Night rest ceremony"
      }
    ]
  },
  {
    "id": "jagannath_puri",
    "name": "Shree Jagannath Temple Puri",
    "hindiName": "श्री जगन्नाथ मंदिर पुरी (श्री जगन्नाथ, बलभद्र, सुभद्रा महा दर्शन)",
    "deity": "Lord Jagannath, Balabhadra & Devi Subhadra",
    "category": "major",
    "location": "Puri, Odisha, India",
    "state": "Odisha",
    "country": "India",
    "videoId": "WD5kyQ4laVs",
    "fallbackVideoId": "WD5kyQ4laVs",
    "officialTrust": "Shree Jagannath Temple Administration (Jay Jagannath TV)",
    "liveStreamUrl": "https://www.youtube.com/embed/WD5kyQ4laVs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=WD5kyQ4laVs",
    "imageUrl": "https://img.youtube.com/vi/WD5kyQ4laVs/hqdefault.jpg",
    "icon": "🚩",
    "coords": {
      "lat": 19.8049,
      "lng": 85.8179
    },
    "rating": "5.0 ★",
    "devoteesOnline": 22000,
    "speciality": "Eastern Char Dham Sanctum renowned for Mahaprasad, Nilachakra and Ratha Yatra",
    "mantra": "नीलाचलनिवासाय नित्याय परमात्मने । बलभद्रसुभद्राभ्यां जगन्नाथाय ते नमः ॥",
    "aartis": [
      {
        "name": "Mangala Alati",
        "time": "05:00 AM",
        "desc": "Early morning first darshan"
      },
      {
        "name": "Mailam & Abakash",
        "time": "06:00 AM",
        "desc": "Sacred morning bath & dress change"
      },
      {
        "name": "Sandhya Alati",
        "time": "07:00 PM",
        "desc": "Evening lamp offering"
      },
      {
        "name": "Badasinghara",
        "time": "10:30 PM",
        "desc": "Floral attire bedtime ritual"
      }
    ]
  },
  {
    "id": "tulja_bhavani",
    "name": "Shri Tulja Bhavani Temple",
    "hindiName": "श्री क्षेत्र तुलजाभवानी मंदिर (कुलस्वामिनी लाइव दर्शन व आरती)",
    "deity": "Maa Tulja Bhavani (Swaroopa of Durga)",
    "category": "shakti",
    "location": "Tuljapur, Dharashiv, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "B3r-kt5dK_M",
    "fallbackVideoId": "B3r-kt5dK_M",
    "officialTrust": "Shri Tuljabhavani Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/B3r-kt5dK_M?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=B3r-kt5dK_M",
    "imageUrl": "https://img.youtube.com/vi/B3r-kt5dK_M/hqdefault.jpg",
    "icon": "🌺",
    "coords": {
      "lat": 18.0089,
      "lng": 76.0703
    },
    "rating": "5.0 ★",
    "devoteesOnline": 7800,
    "speciality": "Kulswamini of Maharashtra and divine patron deity of Chhatrapati Shivaji Maharaj",
    "mantra": "ॐ सर्वमङ्गलमङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "05:00 AM",
        "desc": "Dawn awakening ritual"
      },
      {
        "name": "Panchamrut Abhishek",
        "time": "09:00 AM",
        "desc": "Sacred holy ablution"
      },
      {
        "name": "Dhuparti",
        "time": "07:30 PM",
        "desc": "Evening camphor offering"
      }
    ]
  },
  {
    "id": "khatu_shyam",
    "name": "Shree Khatu Shyam Ji Temple",
    "hindiName": "श्री खाटू श्याम जी मंदिर सीकर राजस्थान (हारे का सहारा लाइव दर्शन)",
    "deity": "Shri Shyam Baba (Barbarika / Krishna Swaroop)",
    "category": "krishna",
    "location": "Khatu, Sikar, Rajasthan, India",
    "state": "Rajasthan",
    "country": "India",
    "videoId": "aHp8nnOwcpc",
    "fallbackVideoId": "aHp8nnOwcpc",
    "officialTrust": "Shri Shyam Mandir Committee Khatu Dham",
    "liveStreamUrl": "https://www.youtube.com/embed/aHp8nnOwcpc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=aHp8nnOwcpc",
    "imageUrl": "https://img.youtube.com/vi/aHp8nnOwcpc/hqdefault.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 27.429,
      "lng": 75.306
    },
    "rating": "5.0 ★",
    "devoteesOnline": 18300,
    "speciality": "Revered as 'Haare Ka Sahara' (Saviour of the Defeated) with glorious flower adornments",
    "mantra": "ॐ श्री श्याम देवाय नमः | शीश के दानी की जय | हारे का सहारा बाबा श्याम हमारा",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Dawn first darshan"
      },
      {
        "name": "Shringaar Aarti",
        "time": "07:00 AM",
        "desc": "Grand floral dressing"
      },
      {
        "name": "Bhog Aarti",
        "time": "12:30 PM",
        "desc": "Midday sweet offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:30 PM",
        "desc": "Evening lamp prayer"
      },
      {
        "name": "Shayan Aarti",
        "time": "09:30 PM",
        "desc": "Night repose"
      }
    ]
  },
  {
    "id": "salasar_balaji",
    "name": "Shree Salasar Balaji Mandir",
    "hindiName": "श्री सालासर बालाजी धाम चूरू (दाढ़ी मूंछ वाले हनुमान जी लाइव दर्शन)",
    "deity": "Lord Hanuman (Salasar Balaji)",
    "category": "hanuman",
    "location": "Salasar, Churu, Rajasthan, India",
    "state": "Rajasthan",
    "country": "India",
    "videoId": "q58Wan19vns",
    "fallbackVideoId": "q58Wan19vns",
    "officialTrust": "Shree Salasar Balaji Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/q58Wan19vns?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=q58Wan19vns",
    "imageUrl": "https://img.youtube.com/vi/q58Wan19vns/hqdefault.jpg",
    "icon": "🚩",
    "coords": {
      "lat": 27.7126,
      "lng": 74.7238
    },
    "rating": "5.0 ★",
    "devoteesOnline": 11400,
    "speciality": "Unique and consecrated idol of Lord Hanuman with beard and moustache (Dadhi-Mooch Wale Balaji)",
    "mantra": "मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् । वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये ॥",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:00 AM",
        "desc": "Morning awakening"
      },
      {
        "name": "Rajbhog Aarti",
        "time": "11:30 AM",
        "desc": "Noon Choorna Prasad"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening lamp prayer"
      }
    ]
  },
  {
    "id": "kedarnath_dham",
    "name": "Kedarnath & Badrinath Himalayan Dham",
    "hindiName": "श्री केदारनाथ ज्योतिर्लिंग व बद्रीनाथ धाम (हिमालयन लाइव दर्शन)",
    "deity": "Lord Shiva (Kedarnath) & Lord Badri Vishal",
    "category": "jyotirlinga",
    "location": "Rudraprayag & Chamoli, Garhwal Himalayas, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "videoId": "fURwn8kbRBc",
    "fallbackVideoId": "fURwn8kbRBc",
    "officialTrust": "Shri Badrinath-Kedarnath Temple Committee (BKTC)",
    "liveStreamUrl": "https://www.youtube.com/embed/fURwn8kbRBc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=fURwn8kbRBc",
    "imageUrl": "https://img.youtube.com/vi/fURwn8kbRBc/hqdefault.jpg",
    "icon": "🏔️",
    "coords": {
      "lat": 30.7352,
      "lng": 79.0669
    },
    "rating": "5.0 ★",
    "devoteesOnline": 26500,
    "speciality": "Highest of the 12 Jyotirlingas at 3,583m altitude surrounded by snow-clad Himalayan peaks",
    "mantra": "महाहिमकूटे तु केदारनाथं नमामि । ॐ नमः शिवाय । जय बद्री विशाल",
    "aartis": [
      {
        "name": "Maha Abhishek",
        "time": "04:00 AM",
        "desc": "Sacred Himalayan butter & milk offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "06:30 PM",
        "desc": "Grand mountain sunset aarti"
      }
    ]
  },
  {
    "id": "udupi_krishna",
    "name": "Sri Krishna Matha Udupi",
    "hindiName": "ಶ್ರೀ ಕೃಷ್ಣ ಮಠ ಉಡುಪಿ (ಕನಕನ ಕಿಂಡಿ ಲೈವ್ ದರ್ಶನ)",
    "deity": "Lord Sri Krishna (Bala Krishna)",
    "category": "south",
    "location": "Udupi, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "8JsL-H7fJy4",
    "fallbackVideoId": "8JsL-H7fJy4",
    "officialTrust": "Paryaya Sri Krishna Matha Udupi",
    "liveStreamUrl": "https://www.youtube.com/embed/8JsL-H7fJy4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=8JsL-H7fJy4",
    "imageUrl": "https://img.youtube.com/vi/8JsL-H7fJy4/hqdefault.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 13.3409,
      "lng": 74.7562
    },
    "rating": "5.0 ★",
    "devoteesOnline": 12100,
    "speciality": "Consecrated by Sri Madhvacharya; darshan viewed through the sacred Kanakana Kindi window",
    "mantra": "ಕೃಷ್ಣಂ ವಂದೇ ಜಗದ್ಗುರುಂ | ಶ್ರೀ ಕೃಷ್ಣಾರ್ಪಣಮಸ್ತು",
    "aartis": [
      {
        "name": "Nirmalya Visarjana",
        "time": "05:30 AM",
        "desc": "First morning ritual"
      },
      {
        "name": "Mahapooja",
        "time": "10:30 AM",
        "desc": "Grand daily Paryaya worship"
      },
      {
        "name": "Chamara Seva",
        "time": "07:00 PM",
        "desc": "Evening golden chariot seva"
      }
    ]
  },
  {
    "id": "meenakshi_madurai",
    "name": "Meenakshi Sundareswarar Temple",
    "hindiName": "மீனாட்சி சுந்தரேஸ்வரர் கோவில் மதுரை (லைவ் தரிசனம்)",
    "deity": "Goddess Meenakshi (Parvati) & Sundareswarar (Shiva)",
    "category": "south",
    "location": "Madurai, Tamil Nadu, India",
    "state": "Tamil Nadu",
    "country": "India",
    "videoId": "Aicrlohuuug",
    "fallbackVideoId": "Aicrlohuuug",
    "officialTrust": "Arulmigu Meenakshi Sundareswarar Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/Aicrlohuuug?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=Aicrlohuuug",
    "imageUrl": "https://img.youtube.com/vi/Aicrlohuuug/hqdefault.jpg",
    "icon": "🛕",
    "coords": {
      "lat": 9.9195,
      "lng": 78.1193
    },
    "rating": "5.0 ★",
    "devoteesOnline": 9400,
    "speciality": "Historic 14 soaring Gopurams and sacred Golden Lotus Pond (Potramarai Kulam)",
    "mantra": "ஓம் மீனாட்சி சுந்தரேஸ்வராய நமஹ | ஓம் சக்தி",
    "aartis": [
      {
        "name": "Thiruvanandal",
        "time": "05:00 AM",
        "desc": "Morning awakening ceremony"
      },
      {
        "name": "Uchikalam",
        "time": "11:30 AM",
        "desc": "Midday pooja"
      },
      {
        "name": "Sayarakshai",
        "time": "06:30 PM",
        "desc": "Sunset deepa offering"
      },
      {
        "name": "Palliyarai Seva",
        "time": "09:30 PM",
        "desc": "Procession of Sundareswarar to sanctum"
      }
    ]
  },
  {
    "id": "chamundeshwari_mysuru",
    "name": "Chamundeshwari Temple Mysuru",
    "hindiName": "ಶ್ರೀ ಚಾಮುಂಡೇಶ್ವರಿ ದೇವಾಲಯ ಮೈಸೂರು (ಲೈವ್ ದರ್ಶನ)",
    "deity": "Goddess Chamundeshwari (Durga / Mahishasuramardini)",
    "category": "south",
    "location": "Chamundi Hills, Mysuru, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "9SBpnTrrXlw",
    "fallbackVideoId": "9SBpnTrrXlw",
    "officialTrust": "Chamundeshwari Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/9SBpnTrrXlw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=9SBpnTrrXlw",
    "imageUrl": "https://img.youtube.com/vi/9SBpnTrrXlw/hqdefault.jpg",
    "icon": "🦁",
    "coords": {
      "lat": 12.2741,
      "lng": 76.6713
    },
    "rating": "5.0 ★",
    "devoteesOnline": 7600,
    "speciality": "Sacred Shakti Peetha atop Chamundi Hill overlooking the royal city of Mysuru",
    "mantra": "ಓಂ ಶ್ರೀ ಚಾಮುಂಡೇಶ್ವರ್ಯೈ ನಮಃ | ಐಂ ಹ್ರೀಂ ಕ್ಲೀಂ ಚಾಮುಂಡಾಯೈ ವಿಚ್ಚೇ",
    "aartis": [
      {
        "name": "Pratahkala Pooja",
        "time": "07:30 AM",
        "desc": "Morning Kumkumarchana"
      },
      {
        "name": "Madhyahna Pooja",
        "time": "12:30 PM",
        "desc": "Afternoon Mahamangalarathi"
      },
      {
        "name": "Sandhya Deeparadhane",
        "time": "07:00 PM",
        "desc": "Evening camphor offering"
      }
    ]
  },
  {
    "id": "pashupatinath_temple",
    "name": "Pashupatinath Temple Kathmandu",
    "hindiName": "श्री पशुपतिनाथ मन्दिर काठमाडौं (लाइव बागमती आरती व दर्शन)",
    "deity": "Lord Shiva (Pashupatinath / Lord of All Beings)",
    "category": "jyotirlinga",
    "location": "Kathmandu, Bagmati Province, Nepal",
    "state": "Bagmati Province",
    "country": "Nepal",
    "videoId": "bi1PDhKGUd4",
    "fallbackVideoId": "bi1PDhKGUd4",
    "officialTrust": "Pashupati Area Development Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/bi1PDhKGUd4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=bi1PDhKGUd4",
    "imageUrl": "https://img.youtube.com/vi/bi1PDhKGUd4/hqdefault.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 27.7104,
      "lng": 85.3487
    },
    "rating": "5.0 ★",
    "devoteesOnline": 13800,
    "speciality": "Holy UNESCO World Heritage shrine on Bagmati River with 5-faced golden Shivalinga",
    "mantra": "ॐ पशुपतये नमः | ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्",
    "aartis": [
      {
        "name": "Bal Bhog",
        "time": "09:30 AM",
        "desc": "Morning sanctum worship"
      },
      {
        "name": "Bagmati Ganga Sandhya Aarti",
        "time": "06:30 PM",
        "desc": "Grand riverside multi-lamp musical aarti"
      }
    ]
  },
  {
    "id": "dwarkadhish_temple",
    "name": "Shree Dwarkadhish Mandir (Jagat Mandir)",
    "hindiName": "श्री द्वारकाधीश मंदिर द्वारका (जगत मंदिर लाइव दर्शन व शृंगार)",
    "deity": "Lord Krishna (Dwarkadhish / King of Dwarka)",
    "category": "major",
    "location": "Dwarka, Devbhumi Dwarka, Gujarat, India",
    "state": "Gujarat",
    "country": "India",
    "videoId": "mCqRuQigwFU",
    "fallbackVideoId": "mCqRuQigwFU",
    "officialTrust": "Shri Dwarkadhish Mandir Vahivatdar Committee",
    "liveStreamUrl": "https://www.youtube.com/embed/mCqRuQigwFU?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/@shridwarkadhishmandirofficial",
    "imageUrl": "/images/temple_dwarkadhish.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 22.2376,
      "lng": 68.9678
    },
    "rating": "5.0 ★",
    "devoteesOnline": 17800,
    "speciality": "Western Char Dham Moksha Puri where Lord Krishna ruled as King with sacred 52-yard flag (Dhwaja)",
    "mantra": "ॐ नमो भगवते वासुदेवाय | द्वारकाधीश की जय | राधे कृष्णा",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "06:30 AM",
        "desc": "Dawn awakening of Dwarkadhish"
      },
      {
        "name": "Shringaar Aarti",
        "time": "08:00 AM",
        "desc": "Royal attire & golden ornamentation"
      },
      {
        "name": "Gwal Bhog",
        "time": "11:30 AM",
        "desc": "Butter & sweets offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:30 PM",
        "desc": "Evening royal lamp offering"
      }
    ]
  },
  {
    "id": "badrinath_dham",
    "name": "Shree Badrinath Temple (Badri Vishal)",
    "hindiName": "श्री बद्रीनाथ धाम (बद्री विशाल महाभिषेक व लाइव दर्शन)",
    "deity": "Lord Badri Vishal (Maha Vishnu in Padmasana)",
    "category": "major",
    "location": "Badrinath, Chamoli, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "videoId": "fURwn8kbRBc",
    "fallbackVideoId": "fURwn8kbRBc",
    "officialTrust": "Shri Badrinath-Kedarnath Temple Committee (BKTC)",
    "liveStreamUrl": "https://www.youtube.com/embed/fURwn8kbRBc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=fURwn8kbRBc",
    "imageUrl": "/images/temple_badrinath.jpg",
    "icon": "🏔️",
    "coords": {
      "lat": 30.7447,
      "lng": 79.4912
    },
    "rating": "5.0 ★",
    "devoteesOnline": 23100,
    "speciality": "Northern Char Dham nestled between Nar and Narayana mountain ranges beside Alaknanda River",
    "mantra": "ॐ नमो नारायणाय | जय बद्री विशाल | श्रीमन्नारायण नारायण हरि हरि",
    "aartis": [
      {
        "name": "Maha Abhishek",
        "time": "04:30 AM",
        "desc": "Morning holy bath with sandalwood and saffron"
      },
      {
        "name": "Geeta Path",
        "time": "06:00 AM",
        "desc": "Sacred Bhagavad Gita recitation"
      },
      {
        "name": "Sandhya Aarti",
        "time": "06:30 PM",
        "desc": "Evening Kapoor Aarti"
      }
    ]
  },
  {
    "id": "haridwar_ganga_aarti",
    "name": "Har Ki Pauri Maha Ganga Aarti",
    "hindiName": "हर की पौड़ी हरिद्वार (दैनिक महा गंगा आरती व दीपदान)",
    "deity": "Maa Ganga (Brahmakund)",
    "category": "ganga",
    "location": "Har Ki Pauri, Haridwar, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "videoId": "usvU6ox_NQU",
    "fallbackVideoId": "usvU6ox_NQU",
    "officialTrust": "Shri Ganga Sabha (Regd.), Haridwar",
    "liveStreamUrl": "https://www.youtube.com/embed/usvU6ox_NQU?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/@ShriGangaSabhaRegHaridwar",
    "imageUrl": "/images/temple_haridwar.jpg",
    "icon": "🌊",
    "coords": {
      "lat": 29.9576,
      "lng": 78.1718
    },
    "rating": "5.0 ★",
    "devoteesOnline": 28900,
    "speciality": "World-renowned sacred Brahmakund where Amrita fell; magnificent multi-lamp floating Ganga Aarti",
    "mantra": "गंगे च यमुने चैव गोदावरि सरस्वति । नर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु ॥",
    "aartis": [
      {
        "name": "Pratah Ganga Aarti",
        "time": "05:30 AM",
        "desc": "Sunrise cleansing prayers"
      },
      {
        "name": "Maha Sandhya Aarti",
        "time": "06:45 PM",
        "desc": "Grand evening 108-lamp Ganga Aarti & Deepdan"
      }
    ]
  },
  {
    "id": "srisailam_mallikarjuna",
    "name": "Sri Bhramaramba Mallikarjuna Jyotirlinga",
    "hindiName": "श्री शैलम मल्लिकार्जुन ज्योतिर्लिंग व भ्रमराम्बा शक्तिपीठ",
    "deity": "Lord Shiva (Mallikarjuna) & Devi Bhramaramba",
    "category": "jyotirlinga",
    "location": "Srisailam, Nandyal, Andhra Pradesh, India",
    "state": "Andhra Pradesh",
    "country": "India",
    "videoId": "XxdarKTmJ8c",
    "fallbackVideoId": "XxdarKTmJ8c",
    "officialTrust": "Srisailam Devasthanam (Srisaila TV)",
    "liveStreamUrl": "https://www.youtube.com/embed/XxdarKTmJ8c?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/@SrisailaTv",
    "imageUrl": "https://img.youtube.com/vi/XxdarKTmJ8c/hqdefault.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 16.0741,
      "lng": 78.8687
    },
    "rating": "5.0 ★",
    "devoteesOnline": 11900,
    "speciality": "Rare consecrated confluence of both a 12-Jyotirlinga and an 18-Maha Shakti Peetha on Nallamala Hills",
    "mantra": "श्रीशैलशृङ्गे विबुधातिसङ्गे तुलाद्रितुङ्गेऽपि मुदा वसन्तम् । तमर्जुनं मल्लिकपूर्वमेकं नमामि संसारसमुद्रसेतुम् ॥",
    "aartis": [
      {
        "name": "Suprabhata Seva",
        "time": "04:30 AM",
        "desc": "Dawn awakening of Mallikarjuna Swamy"
      },
      {
        "name": "Mahamangala Harathi",
        "time": "06:00 AM",
        "desc": "Sacred morning light offering"
      },
      {
        "name": "Sayana Utsavam",
        "time": "10:00 PM",
        "desc": "Night repose ceremony"
      }
    ]
  },
  {
    "id": "rameswaram_ramanatha",
    "name": "Sri Ramanathaswamy Temple Rameswaram",
    "hindiName": "श्री रामनाथस्वामी ज्योतिर्लिंग रामेश्वरम् (22 तीर्थ व लाइव दर्शन)",
    "deity": "Lord Shiva (Ramanathaswamy - Consecrated by Lord Rama)",
    "category": "jyotirlinga",
    "location": "Rameswaram Island, Ramanathapuram, Tamil Nadu, India",
    "state": "Tamil Nadu",
    "country": "India",
    "videoId": "Aicrlohuuug",
    "fallbackVideoId": "Aicrlohuuug",
    "officialTrust": "Arulmigu Ramanathaswamy Temple Administration",
    "liveStreamUrl": "https://www.youtube.com/embed/Aicrlohuuug?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=Aicrlohuuug",
    "imageUrl": "https://img.youtube.com/vi/Aicrlohuuug/hqdefault.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 9.2881,
      "lng": 79.3174
    },
    "rating": "5.0 ★",
    "devoteesOnline": 13500,
    "speciality": "Southern Char Dham & Jyotirlinga sanctum built by Lord Rama; longest temple corridor in the world",
    "mantra": "सुताम्रपर्णीजलराशियोगे निबध्य सेतुं विशिखैरसंख्यैः । श्रीरामचन्द्रेण समर्पितं तं रामेश्वराख्यं नियतं नमामि ॥",
    "aartis": [
      {
        "name": "Palliyarai Pooja",
        "time": "05:00 AM",
        "desc": "Dawn opening of sanctum"
      },
      {
        "name": "Spadiga Linga Deeparadhana",
        "time": "06:00 AM",
        "desc": "Sacred crystal linga morning worship"
      },
      {
        "name": "Sayarakshai",
        "time": "06:00 PM",
        "desc": "Evening ocean lamp offering"
      }
    ]
  },
  {
    "id": "trimbakeshwar_nashik",
    "name": "Shree Trimbakeshwar Jyotirlinga",
    "hindiName": "श्री त्र्यंबकेश्वर ज्योतिर्लिंग नासिक (ब्रह्मा-विष्णु-महेश त्रिमुख लिंग)",
    "deity": "Lord Shiva, Vishnu & Brahma (Trimurti Jyotirlinga)",
    "category": "jyotirlinga",
    "location": "Trimbak, Nashik, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "uRUP4M_5vSo",
    "fallbackVideoId": "uRUP4M_5vSo",
    "officialTrust": "Shree Trimbakeshwar Devasthan Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/uRUP4M_5vSo?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uRUP4M_5vSo",
    "imageUrl": "https://img.youtube.com/vi/uRUP4M_5vSo/hqdefault.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 19.9324,
      "lng": 73.5307
    },
    "rating": "5.0 ★",
    "devoteesOnline": 10800,
    "speciality": "Source of sacred Godavari river; unique Jyotirlinga embodying Brahma, Vishnu and Shiva",
    "mantra": "सह्याद्रिशीर्षे विमले वसन्तं गोदावरीतीरपवित्रदेशे । यद्दर्शनात्पातकमाशु नाशं प्रयाति तं त्र्यम्बकमीशमीडे ॥",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "05:30 AM",
        "desc": "Morning awakening"
      },
      {
        "name": "Madhyahna Pooja",
        "time": "12:30 PM",
        "desc": "Noon golden crown adornment"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening Deeparadhana"
      }
    ]
  },
  {
    "id": "omkareshwar_jyotirlinga",
    "name": "Shree Omkareshwar Jyotirlinga",
    "hindiName": "श्री ओंकारेश्वर ज्योतिर्लिंग (नर्मदा द्वीप लाइव दर्शन व आरती)",
    "deity": "Lord Shiva (Omkareshwara / Amaleshwara)",
    "category": "jyotirlinga",
    "location": "Mandhata Island, Khandwa, Madhya Pradesh, India",
    "state": "Madhya Pradesh",
    "country": "India",
    "videoId": "H6D_IGx5xOI",
    "fallbackVideoId": "H6D_IGx5xOI",
    "officialTrust": "Shree Omkareshwar Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/H6D_IGx5xOI?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=H6D_IGx5xOI",
    "imageUrl": "https://img.youtube.com/vi/H6D_IGx5xOI/hqdefault.jpg",
    "icon": "🕉️",
    "coords": {
      "lat": 22.2464,
      "lng": 76.1517
    },
    "rating": "5.0 ★",
    "devoteesOnline": 9200,
    "speciality": "Situated on the Om-shaped Mandhata island in the holy Narmada River",
    "mantra": "कावेरिकानर्मदयोः पवित्रे समागमे सज्जनतारणाय । सदैव मान्धातृपुरे वसन्तमोङ्कारमीशं शिवमेकमीडे ॥",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:00 AM",
        "desc": "Morning Narmada water abhishek"
      },
      {
        "name": "Bhog Aarti",
        "time": "12:00 PM",
        "desc": "Midday Rajbhog"
      },
      {
        "name": "Shayan Aarti",
        "time": "08:30 PM",
        "desc": "Night chaupad board game offering"
      }
    ]
  },
  {
    "id": "kolhapur_mahalakshmi",
    "name": "Shree Karveer Niwasini Ambabai (Mahalakshmi)",
    "hindiName": "श्री करवीर निवासिनी अंबाबाई महालक्ष्मी कोल्हापूर (लाइव दर्शन)",
    "deity": "Goddess Mahalakshmi (Ambabai)",
    "category": "shakti",
    "location": "Kolhapur, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "B3r-kt5dK_M",
    "fallbackVideoId": "B3r-kt5dK_M",
    "officialTrust": "Shree Karveer Niwasini Ambabai Mahalaxmi Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/B3r-kt5dK_M?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=B3r-kt5dK_M",
    "imageUrl": "https://img.youtube.com/vi/B3r-kt5dK_M/hqdefault.jpg",
    "icon": "🌺",
    "coords": {
      "lat": 16.6946,
      "lng": 74.2238
    },
    "rating": "5.0 ★",
    "devoteesOnline": 14700,
    "speciality": "Supreme Shaktipeetha of Wealth & Prosperity where Sun rays illuminate the deity twice a year (Kiranotsav)",
    "mantra": "नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते । शङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते ॥",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "05:00 AM",
        "desc": "Dawn holy wake-up ceremony"
      },
      {
        "name": "Panchamrut Abhishek",
        "time": "08:30 AM",
        "desc": "Sacred morning bath"
      },
      {
        "name": "Alankar & Dhoop Aarti",
        "time": "07:30 PM",
        "desc": "Evening golden jewellery aarti"
      }
    ]
  },
  {
    "id": "bhimashankar_jyotirlinga",
    "name": "Shree Bhimashankar Jyotirlinga",
    "hindiName": "श्री भीमाशंकर ज्योतिर्लिंग पुणे (सह्याद्रि लाइव दर्शन)",
    "deity": "Lord Shiva (Bhimashankara)",
    "category": "jyotirlinga",
    "location": "Bhorgiri, Pune, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "uRUP4M_5vSo",
    "fallbackVideoId": "uRUP4M_5vSo",
    "officialTrust": "Shree Bhimashankar Sansthan",
    "liveStreamUrl": "https://www.youtube.com/embed/uRUP4M_5vSo?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uRUP4M_5vSo",
    "imageUrl": "https://img.youtube.com/vi/uRUP4M_5vSo/hqdefault.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 19.0722,
      "lng": 73.5358
    },
    "rating": "5.0 ★",
    "devoteesOnline": 8100,
    "speciality": "Deep in the Sahyadri wildlife sanctum; origin of the holy Bhima River",
    "mantra": "यं डाकिनीशाकिनिकासमाजे निषेव्यमाणं पिशिताशनैश्च । सदैव भीमादिपदप्रसिद्धं तं शङ्करं भक्तहितं नमामि ॥",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "04:30 AM",
        "desc": "Early morning ritual"
      },
      {
        "name": "Mahapooja",
        "time": "12:00 PM",
        "desc": "Afternoon milk abhishek"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:30 PM",
        "desc": "Evening sacred lamp"
      }
    ]
  },
  {
    "id": "grishneshwar_jyotirlinga",
    "name": "Shree Grishneshwar Jyotirlinga (12th Jyotirlinga)",
    "hindiName": "श्री घृष्णेश्वर ज्योतिर्लिंग वेरूल एलोरा (१२वां ज्योतिर्लिंग)",
    "deity": "Lord Shiva (Ghushmeshwara / Grishneshwar)",
    "category": "jyotirlinga",
    "location": "Verul (Ellora), Chhatrapati Sambhajinagar, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "uY5YwokiIsY",
    "fallbackVideoId": "uY5YwokiIsY",
    "officialTrust": "Shree Grishneshwar Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/uY5YwokiIsY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uY5YwokiIsY",
    "imageUrl": "/images/ellora_kailasa.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 20.0245,
      "lng": 75.1718
    },
    "rating": "5.0 ★",
    "devoteesOnline": 7400,
    "speciality": "The 12th and final Jyotirlinga of the Dvadasha Jyotirlinga Stotram, near ancient Ellora Caves",
    "mantra": "इलापुरे रम्यविशालकेऽस्मिन् समुल्लसन्तं च जगद्वरेण्यम् । वन्दे महोदारतरस्वभावं घृष्णेश्वराख्यं शरणं प्रपद्ये ॥",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:30 AM",
        "desc": "Morning bath"
      },
      {
        "name": "Madhyahna Aarti",
        "time": "12:00 PM",
        "desc": "Noon offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening aarti"
      }
    ]
  },
  {
    "id": "baidyanath_deoghar",
    "name": "Shree Baidyanath Jyotirlinga Dham",
    "hindiName": "श्री वैद्यनाथ ज्योतिर्लिंग धाम देवघर (बाबा बैद्यनाथ लाइव दर्शन)",
    "deity": "Lord Shiva (Baidyanath / Kamana Linga)",
    "category": "jyotirlinga",
    "location": "Deoghar, Santhal Pargana, Jharkhand, India",
    "state": "Jharkhand",
    "country": "India",
    "videoId": "uRUP4M_5vSo",
    "fallbackVideoId": "uRUP4M_5vSo",
    "officialTrust": "Baba Baidyanath Dham Temple Management Committee",
    "liveStreamUrl": "https://www.youtube.com/embed/uRUP4M_5vSo?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uRUP4M_5vSo",
    "imageUrl": "https://img.youtube.com/vi/uRUP4M_5vSo/hqdefault.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 24.4925,
      "lng": 86.7001
    },
    "rating": "5.0 ★",
    "devoteesOnline": 15600,
    "speciality": "Kamana Linga worshipped by Ravana; famous worldwide for the Shravani Mela Kanwar Yatra",
    "mantra": "पूर्वोत्तरे प्रज्वलिकानिधाने सदा वसन्तं गिरिजासमेतम् । सुरासुराराधितपादपद्मं श्रीवैद्यनाथं सततं नमामि ॥",
    "aartis": [
      {
        "name": "Kacha Jal Puja",
        "time": "04:00 AM",
        "desc": "Early morning first water offering"
      },
      {
        "name": "Shringaar Aarti",
        "time": "07:30 PM",
        "desc": "Evening floral decoration and sandalwood paste"
      }
    ]
  },
  {
    "id": "nageshwar_jyotirlinga",
    "name": "Shree Nageshwar Jyotirlinga",
    "hindiName": "श्री नागेश्वर ज्योतिर्लिंग दारुकावन द्वारका (लाइव दर्शन)",
    "deity": "Lord Shiva (Nageshwara / Lord of Serpents)",
    "category": "jyotirlinga",
    "location": "Darukavanam, Dwarka, Gujarat, India",
    "state": "Gujarat",
    "country": "India",
    "videoId": "uY5YwokiIsY",
    "fallbackVideoId": "uY5YwokiIsY",
    "officialTrust": "Shree Nageshwar Jyotirlinga Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/uY5YwokiIsY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uY5YwokiIsY",
    "imageUrl": "https://img.youtube.com/vi/uY5YwokiIsY/hqdefault.jpg",
    "icon": "🐍",
    "coords": {
      "lat": 22.3347,
      "lng": 69.0544
    },
    "rating": "5.0 ★",
    "devoteesOnline": 6800,
    "speciality": "Ancient Jyotirlinga enshrined with an imposing 85-foot seated Lord Shiva statue in Darukavana",
    "mantra": "याम्ये सदङ्गे नगरेऽतिBadge रम्ये विभूषिताङ्गं विविधैश्च भोगैः । सद्भक्तिमुक्तिप्रदमीशमेकं श्रीनागनाथं शरणं प्रपद्ये ॥",
    "aartis": [
      {
        "name": "Pratah Aarti",
        "time": "06:00 AM",
        "desc": "Morning prayers"
      },
      {
        "name": "Madhyahna Abhishek",
        "time": "12:00 PM",
        "desc": "Noon puja"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening aarti"
      }
    ]
  },
  {
    "id": "banke_bihari_vrindavan",
    "name": "Shree Banke Bihari Mandir Vrindavan",
    "hindiName": "श्री बांके बिहारी मंदिर वृन्दावन (ठाकुर जी लाइव शृंगार दर्शन)",
    "deity": "Lord Krishna (Banke Bihari - Tribhanga Posture)",
    "category": "krishna",
    "location": "Vrindavan, Mathura, Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "O2ojNbbB8Iw",
    "fallbackVideoId": "O2ojNbbB8Iw",
    "officialTrust": "Shri Bankey Bihari Ji Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/O2ojNbbB8Iw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=O2ojNbbB8Iw",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 27.5815,
      "lng": 77.6974
    },
    "rating": "5.0 ★",
    "devoteesOnline": 24500,
    "speciality": "Manifested by Swami Haridas; curtains opened and closed periodically (Jhalak Darshan)",
    "mantra": "श्री बांके बिहारी लाल की जय | राधे राधे | कुंज बिहारी श्री हरिदास",
    "aartis": [
      {
        "name": "Shringaar Darshan",
        "time": "07:45 AM",
        "desc": "Morning divine eye-contact darshana"
      },
      {
        "name": "Rajbhog Aarti",
        "time": "12:00 PM",
        "desc": "Midday sweet offering"
      },
      {
        "name": "Shayan Aarti",
        "time": "09:30 PM",
        "desc": "Night darshana closure"
      }
    ]
  },
  {
    "id": "radha_rani_barsana",
    "name": "Shree Radha Rani Mandir (Shriji Mandir Barsana)",
    "hindiName": "श्री राधा रानी मंदिर बरसाना (लाडली जी महल लाइव दर्शन)",
    "deity": "Shri Radha Rani (Shriji / Vrishabhanu Nandini)",
    "category": "krishna",
    "location": "Bhanugarh Hill, Barsana, Mathura, UP, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "O2ojNbbB8Iw",
    "fallbackVideoId": "O2ojNbbB8Iw",
    "officialTrust": "Shri Radha Rani Temple Trust Barsana",
    "liveStreamUrl": "https://www.youtube.com/embed/O2ojNbbB8Iw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=O2ojNbbB8Iw",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 27.6475,
      "lng": 77.3752
    },
    "rating": "5.0 ★",
    "devoteesOnline": 11200,
    "speciality": "Crown palace temple atop Bhanugarh peak; epicentre of World Lathmar Holi and Radha Ashtami",
    "mantra": "राधे राधे जपो चले आएंगे बिहारी | श्री किशोरी जी की जय",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:00 AM",
        "desc": "Morning awakening"
      },
      {
        "name": "Rajbhog",
        "time": "11:30 AM",
        "desc": "Midday feast"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening lamp offering"
      }
    ]
  },
  {
    "id": "govind_devji_jaipur",
    "name": "Shree Govind Dev Ji Temple Jaipur",
    "hindiName": "श्री गोविंद देव जी मंदिर जयपुर (गुलाबी नगरी लाइव मंगला दर्शन)",
    "deity": "Lord Krishna (Govind Dev Ji)",
    "category": "krishna",
    "location": "City Palace Complex, Jaipur, Rajasthan, India",
    "state": "Rajasthan",
    "country": "India",
    "videoId": "aHp8nnOwcpc",
    "fallbackVideoId": "aHp8nnOwcpc",
    "officialTrust": "Shree Govind Dev Ji Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/aHp8nnOwcpc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=aHp8nnOwcpc",
    "imageUrl": "/images/krishna_cover.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 26.9268,
      "lng": 75.8235
    },
    "rating": "5.0 ★",
    "devoteesOnline": 12900,
    "speciality": "Heart of Jaipur royalty; idol's face is identical to the true physical form of Lord Krishna",
    "mantra": "ॐ नमो भगवते गोविन्दाय | जय श्री गोविंद देव जी महाराज",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:00 AM",
        "desc": "Famous pre-dawn awakening"
      },
      {
        "name": "Dhoop Aarti",
        "time": "08:00 AM",
        "desc": "Morning incense"
      },
      {
        "name": "Sandhya Aarti",
        "time": "06:30 PM",
        "desc": "Evening lamp darshan"
      }
    ]
  },
  {
    "id": "kukke_subramanya",
    "name": "Sri Kukke Subramanya Temple",
    "hindiName": "ಶ್ರೀ ಕುಕ್ಕೆ ಸುಬ್ರಹ್ಮಣ್ಯ ಸ್ವಾಮಿ ದೇವಾಲಯ (ಸರ್ಪ ಸಂಸ್ಕಾರ ಕ್ಷೇತ್ರ ಲೈವ್ ದರ್ಶನ)",
    "deity": "Lord Subramanya (Kartikeya / Shanmukha / King of Serpents)",
    "category": "south",
    "location": "Subramanya, Dakshina Kannada, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "8JsL-H7fJy4",
    "fallbackVideoId": "8JsL-H7fJy4",
    "officialTrust": "Sri Kukke Subramanya Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/8JsL-H7fJy4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=8JsL-H7fJy4",
    "imageUrl": "/images/kartikeya_murugan.jpg",
    "icon": "🐍",
    "coords": {
      "lat": 12.6631,
      "lng": 75.615
    },
    "rating": "5.0 ★",
    "devoteesOnline": 11800,
    "speciality": "Foremost Naga Dosha and Sarpa Samskara sacred Kshetra nestled at the foot of Western Ghats Kumara Parvatha",
    "mantra": "ಓಂ ಶ್ರೀ ಸುಬ್ರಹ್ಮಣ್ಯಾಯ ನಮಃ | ಷಣ್ಮುಖಾಯ ನಮೋ ನಮಃ",
    "aartis": [
      {
        "name": "Ushakala Pooja",
        "time": "06:30 AM",
        "desc": "Dawn abhisheka"
      },
      {
        "name": "Mahapooja",
        "time": "11:30 AM",
        "desc": "Midday main Mangalarathi"
      },
      {
        "name": "Nisha Pooja",
        "time": "07:30 PM",
        "desc": "Night closing aarti"
      }
    ]
  },
  {
    "id": "dharmasthala_manjunatha",
    "name": "Sri Kshetra Dharmasthala Manjunatha Swamy",
    "hindiName": "ಶ್ರೀ ಕ್ಷೇತ್ರ ಧರ್ಮಸ್ಥಳ ಮಂಜುನಾಥ ಸ್ವಾಮಿ (ಅನ್ನದಾನ ಕ್ಷೇತ್ರ ಲೈವ್ ದರ್ಶನ)",
    "deity": "Lord Manjunatha (Shiva) & Dharma Daivas",
    "category": "south",
    "location": "Dharmasthala, Belthangady, Dakshina Kannada, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "8JsL-H7fJy4",
    "fallbackVideoId": "8JsL-H7fJy4",
    "officialTrust": "Sri Kshetra Dharmasthala Administration",
    "liveStreamUrl": "https://www.youtube.com/embed/8JsL-H7fJy4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=8JsL-H7fJy4",
    "imageUrl": "https://img.youtube.com/vi/8JsL-H7fJy4/hqdefault.jpg",
    "icon": "🛕",
    "coords": {
      "lat": 12.9515,
      "lng": 75.3789
    },
    "rating": "5.0 ★",
    "devoteesOnline": 16800,
    "speciality": "Sacred land of Dharma, Anna Daana, Abhaya Daana, and Nyaya Daana presided by the Heggade family",
    "mantra": "ಓಂ ಶ್ರೀ ಮಂಜುನಾಥಾಯ ನಮಃ | ಧರ್ಮೋ ರಕ್ಷತಿ ರಕ್ಷಿತಃ",
    "aartis": [
      {
        "name": "Pratah Pooja",
        "time": "06:30 AM",
        "desc": "Morning Netravati water abhishek"
      },
      {
        "name": "Mahapooja",
        "time": "12:30 PM",
        "desc": "Grand Annadaana Mahapooja"
      },
      {
        "name": "Ratri Pooja",
        "time": "07:30 PM",
        "desc": "Night Deeparadhane"
      }
    ]
  },
  {
    "id": "sringeri_sharada",
    "name": "Sri Sringeri Sharada Peetham",
    "hindiName": "ಶ್ರೀ ಶೃಂಗೇರಿ ಶಾರದಾ ಪೀಠ (ಆದಿ ಶಂಕರಾಚಾರ್ಯ ದಕ್ಷಿಣಾಮ್ನಾಯ ಲೈವ್ ದರ್ಶನ)",
    "deity": "Goddess Sharadamba & Sri Chandramouleshwara",
    "category": "south",
    "location": "Sringeri, Chikkamagaluru, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "9SBpnTrrXlw",
    "fallbackVideoId": "9SBpnTrrXlw",
    "officialTrust": "Dakshinamnaya Sri Sharada Peetham Sringeri",
    "liveStreamUrl": "https://www.youtube.com/embed/9SBpnTrrXlw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=9SBpnTrrXlw",
    "imageUrl": "/images/adi_shankara.jpg",
    "icon": "🪕",
    "coords": {
      "lat": 13.4187,
      "lng": 75.2575
    },
    "rating": "5.0 ★",
    "devoteesOnline": 9100,
    "speciality": "First of the 4 sacred Peethas established by Jagadguru Adi Shankaracharya on Tunga river banks",
    "mantra": "ನಮಸ್ತೇ ಶಾರದೇ ದೇವಿ ಕಾಶ್ಮೀರಪುರವಾಸಿನಿ । ತ್ವಾಮಹಂ ಪ್ರಾರ್ಥಯೇ ನಿತ್ಯಂ ವಿದ್ಯಾಂ ದಾನಂ ಚ ದೇಹಿ ಮೇ ॥",
    "aartis": [
      {
        "name": "Ushakala Pooja",
        "time": "06:00 AM",
        "desc": "Morning Vidyaranya pooja"
      },
      {
        "name": "Mahamangalarathi",
        "time": "12:00 PM",
        "desc": "Sharadamba noon worship"
      },
      {
        "name": "Chandramouleshwara Puja",
        "time": "08:30 PM",
        "desc": "Night Sphatika Linga puja by Jagadguru Shankaracharya"
      }
    ]
  },
  {
    "id": "murudeshwar_temple",
    "name": "Murudeshwara Coastal Temple & Shiva Statue",
    "hindiName": "ಮುರುಡೇಶ್ವರ ಕರಾವಳಿ ಶಿವ ದೇವಾಲಯ (ಅರಬ್ಬಿ ಸಮುದ್ರ ಲೈವ್ ದರ್ಶನ)",
    "deity": "Lord Shiva (Murudeshwara - Atma Linga Kshetra)",
    "category": "south",
    "location": "Murudeshwar, Bhatkal, Uttara Kannada, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "8JsL-H7fJy4",
    "fallbackVideoId": "8JsL-H7fJy4",
    "officialTrust": "R.N. Shetty Murudeshwar Temple Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/8JsL-H7fJy4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=8JsL-H7fJy4",
    "imageUrl": "/images/shiva_neelkanth.jpg",
    "icon": "🌊",
    "coords": {
      "lat": 14.0944,
      "lng": 74.4849
    },
    "rating": "5.0 ★",
    "devoteesOnline": 10400,
    "speciality": "World's second tallest Shiva statue (123 ft) and 20-storied Raja Gopura jutting into the Arabian Sea",
    "mantra": "ಓಂ ನಮಃ ಶಿವಾಯ | ಮುರುಡೇಶ್ವರಾಯ ನಮೋ ನಮಃ",
    "aartis": [
      {
        "name": "Pratah Pooja",
        "time": "06:00 AM",
        "desc": "Morning sea breeze abhishek"
      },
      {
        "name": "Mahapooja",
        "time": "12:00 PM",
        "desc": "Noon offering"
      },
      {
        "name": "Ratri Deeparadhane",
        "time": "07:30 PM",
        "desc": "Evening illuminating lamps"
      }
    ]
  },
  {
    "id": "guruvayur_temple",
    "name": "Guruvayur Sri Krishna Temple",
    "hindiName": "ഗുരുവായൂർ ശ്രീകൃഷ്ണ ക്ഷേത്രം (ഭൂലോക വൈകുണ്ഠം ലൈവ് ദർശനം)",
    "deity": "Lord Guruvayurappan (Unnikrishnan / Bala Vishnu)",
    "category": "south",
    "location": "Guruvayur, Thrissur, Kerala, India",
    "state": "Kerala",
    "country": "India",
    "videoId": "XxdarKTmJ8c",
    "fallbackVideoId": "XxdarKTmJ8c",
    "officialTrust": "Guruvayur Devaswom Board",
    "liveStreamUrl": "https://www.youtube.com/embed/XxdarKTmJ8c?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=XxdarKTmJ8c",
    "imageUrl": "/images/vishnu.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 10.5947,
      "lng": 76.0384
    },
    "rating": "5.0 ★",
    "devoteesOnline": 18400,
    "speciality": "Revered as 'Bhuloka Vaikuntha' where Lord Krishna idol was installed by Guru and Vayu",
    "mantra": "ഓം നമോ ഭഗവതേ വാസുദേവായ | ഗുരുവായൂരപ്പാ ശരണം",
    "aartis": [
      {
        "name": "Nirmalya Darshanam",
        "time": "03:00 AM",
        "desc": "Auspicious first morning darshan"
      },
      {
        "name": "Ucha Pooja",
        "time": "12:00 PM",
        "desc": "Noon Rajbhog"
      },
      {
        "name": "Deeparadhana",
        "time": "06:30 PM",
        "desc": "Grand thousands oil lamps lighting"
      },
      {
        "name": "Trippuka",
        "time": "09:00 PM",
        "desc": "Night incense sanctum closure"
      }
    ]
  }
];
