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
    "id": "temp_iskcon_blr",
    "title": "ISKCON Sri Radha Krishna-chandra",
    "location": "Rajajinagar, Bengaluru",
    "district": "Bengaluru",
    "rating": "4.9",
    "categories": [
      "Major Pilgrimage",
      "Dvaita Matha"
    ],
    "deityTag": "Krishna",
    "description": "One of the largest ISKCON temple complexes in the world, featuring grand gopurams, gold-plated dhwaja sthamba, and spiritual Vedic cultural centers.",
    "timings": "04:15–05:00, 07:15–13:00, 16:15–20:30",
    "phone": "+91-80-23471956",
    "coords": {
      "lat": 13.0098,
      "lng": 77.5511
    },
    "icon": "🛕",
    "image": "/images/krishna_cover.jpg",
    "era": "1997 CE",
    "architect": "Sri Madhu Pandit Dasa (Patron)"
  },
  {
    "id": "temp_bull_temple",
    "title": "Dodda Basavana Gudi (Bull Temple)",
    "location": "Basavanagudi, Bengaluru",
    "district": "Bengaluru",
    "rating": "4.8",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Nandi / Shiva",
    "description": "Famous monolithic Nandi statue carved out of a single granite rock, measuring 4.5m in height and 6.5m in length, built by Kempe Gowda I.",
    "timings": "06:00–20:00",
    "phone": "+91-80-22442220",
    "coords": {
      "lat": 12.9421,
      "lng": 77.5681
    },
    "icon": "🐂",
    "image": "/images/shiva.jpg",
    "era": "1537 CE",
    "architect": "Kempe Gowda I (Founder of Bengaluru)"
  },
  {
    "id": "temp_halasuru_someshwara",
    "title": "Halasuru Someshwara Temple",
    "location": "Ulsoor, Bengaluru",
    "district": "Bengaluru",
    "rating": "4.7",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Shiva",
    "description": "Ancient Chola-era temple dedicated to Lord Someshwara, upgraded during the Vijayanagara period with magnificent Navagraha sculptures and Rajagopuram.",
    "timings": "06:00–12:00, 17:30–20:30",
    "phone": "+91-80-25586617",
    "coords": {
      "lat": 12.9774,
      "lng": 77.6256
    },
    "icon": "🕉️",
    "image": "/images/shiva_neelkanth.jpg",
    "era": "12th Century CE",
    "architect": "Chola Dynasty & Kempe Gowda II"
  },
  {
    "id": "temp_gavi_gangadhareshwara",
    "title": "Gavi Gangadhareshwara Cave Temple",
    "location": "Gavipuram, Bengaluru",
    "district": "Bengaluru",
    "rating": "4.8",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Shiva",
    "description": "Monolithic rock-cut cave temple where on Makara Sankranti day, sunlight passes through the horns of Nandi and illuminates the Shiva Lingam inside the sanctum.",
    "timings": "06:00–12:30, 17:00–20:00",
    "phone": "+91-80-22421313",
    "coords": {
      "lat": 12.9511,
      "lng": 77.5607
    },
    "icon": "☀️",
    "image": "/images/surya_siddhanta_astronomy.jpg",
    "era": "9th–16th Century CE",
    "architect": "Ganga Dynasty & Kempe Gowda I"
  },
  {
    "id": "temp_banashankari",
    "title": "Banashankari Amma Temple",
    "location": "Banashankari, Bengaluru",
    "district": "Bengaluru",
    "rating": "4.8",
    "categories": [
      "Shakti Peetha",
      "Major Pilgrimage"
    ],
    "deityTag": "Banashankari",
    "description": "Highly revered Shakti shrine where Rahukala pooja on Tuesdays and Fridays is believed to eliminate all life obstacles and doshas.",
    "timings": "06:00–13:00, 16:30–20:30",
    "phone": "+91-80-26714422",
    "coords": {
      "lat": 12.9155,
      "lng": 77.5736
    },
    "icon": "🌺",
    "image": "/images/mahakali_mahavidya.jpg",
    "era": "1915 CE (Rooted in Badami Tradition)",
    "architect": "Somanna Shastri (Patron)"
  },
  {
    "id": "temp_kote_venkataramana",
    "title": "Sri Kote Venkataramana Temple",
    "location": "KR Market / Fort, Bengaluru",
    "district": "Bengaluru",
    "rating": "4.7",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Venkateswara",
    "description": "17th-century Dravidian and Vijayanagara architectural masterpiece standing beside the historic Bangalore Fort with intricate carvings of Vishnu avatars.",
    "timings": "08:00–12:00, 18:00–20:30",
    "phone": "+91-80-26701100",
    "coords": {
      "lat": 12.9602,
      "lng": 77.575
    },
    "icon": "🛕",
    "image": "/images/venkateswara_tirumala.jpg",
    "era": "1689 CE",
    "architect": "Chikka Devaraja Wodeyar"
  },
  {
    "id": "temp_ghati_subramanya",
    "title": "Ghati Subramanya Swamy",
    "location": "Doddaballapura, Bengaluru Rural",
    "district": "Bengaluru Rural",
    "rating": "4.8",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Subramanya / Narasimha",
    "description": "Unique single idol displaying Lord Subramanya facing east and Lord Lakshmi Narasimha facing west, visible through a mirror arrangement.",
    "timings": "06:00–20:30",
    "phone": "+91-80-27657141",
    "coords": {
      "lat": 13.3283,
      "lng": 77.5147
    },
    "icon": "🐍",
    "image": "/images/kartikeya_murugan.jpg",
    "era": "600+ Years Ancient",
    "architect": "Ghorpade Dynasty of Sandur"
  },
  {
    "id": "temp_shivagange",
    "title": "Shivagange Cave & Hill Temple",
    "location": "Nelamangala / Dobbaspet",
    "district": "Bengaluru Rural",
    "rating": "4.7",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Shiva",
    "description": "Sacred hill shaped like a Shiva Lingam with historic Gavi Gangadhareshwara spring, Patala Ganga, and Olakal Theertha holy waters.",
    "timings": "06:00–18:00",
    "phone": "+91-80-27734120",
    "coords": {
      "lat": 13.1706,
      "lng": 77.2281
    },
    "icon": "🏔️",
    "image": "/images/ganga_descent.jpg",
    "era": "12th Century CE",
    "architect": "Hoysala King Vishnuvardhana"
  },
  {
    "id": "temp_chamundi",
    "title": "Sri Chamundeshwari Temple",
    "location": "Chamundi Hills, Mysuru",
    "district": "Mysuru",
    "rating": "4.9",
    "categories": [
      "Shakti Peetha",
      "Major Pilgrimage"
    ],
    "deityTag": "Chamundeshwari",
    "description": "One of the 18 Maha Shakti Peethas (Krouncha Peetha) where Goddess Durga vanquished demon Mahishasura atop the sacred Chamundi Hills.",
    "timings": "07:30–14:00, 15:30–18:00, 19:30–21:00",
    "phone": "+91-821-2525231",
    "coords": {
      "lat": 12.2748,
      "lng": 76.6785
    },
    "icon": "🏔️",
    "image": "/images/mahishasura_battle.jpg",
    "era": "12th Century CE",
    "architect": "Hoysala & Vijayanagara Dynasties / Wodeyars"
  },
  {
    "id": "temp_nanjangud",
    "title": "Nanjangud Srikanteshwara Temple",
    "location": "Nanjangud, Mysuru",
    "district": "Mysuru",
    "rating": "4.8",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Nanjundeshwara / Shiva",
    "description": "Known as 'Dakshina Kashi' on the banks of Kapila river; Lord Shiva is worshipped as the healer of all ailments (Hakim Nanjunda).",
    "timings": "06:00–13:00, 16:00–20:30",
    "phone": "+91-8221-226241",
    "coords": {
      "lat": 12.1189,
      "lng": 76.6835
    },
    "icon": "🕉️",
    "image": "/images/shiva_parvati_kalyanam.jpg",
    "era": "9th–11th Century CE",
    "architect": "Ganga Dynasty, Cholas & Hoysalas"
  },
  {
    "id": "temp_melukote",
    "title": "Melukote Cheluvanarayana Swamy",
    "location": "Melukote, Mandya",
    "district": "Mandya",
    "rating": "4.9",
    "categories": [
      "Major Pilgrimage",
      "Dvaita Matha"
    ],
    "deityTag": "Cheluvanarayana / Vishnu",
    "description": "Sacred Srivaishnava kshetra where Sri Ramanujacharya lived for 12 years; famous for the Vairamudi Brahmotsava diamond crown festival.",
    "timings": "07:30–13:30, 16:00–20:30",
    "phone": "+91-8236-299743",
    "coords": {
      "lat": 12.6639,
      "lng": 76.6569
    },
    "icon": "👑",
    "image": "/images/vishnu.jpg",
    "era": "12th Century CE",
    "architect": "Sri Ramanujacharya & Hoysala Vishnuvardhana"
  },
  {
    "id": "temp_udupi",
    "title": "Sri Krishna Matha & Kanakana Kindi",
    "location": "Car Street, Udupi",
    "district": "Udupi",
    "rating": "4.9",
    "categories": [
      "Dvaita Matha",
      "Major Pilgrimage"
    ],
    "deityTag": "Krishna",
    "description": "World-renowned Dvaita monastery founded by Sri Madhvacharya. Bala Krishna is worshipped through the sacred 9-hole silver Kanakana Kindi window.",
    "timings": "05:00–21:30",
    "phone": "+91-820-2520598",
    "coords": {
      "lat": 13.3409,
      "lng": 74.7473
    },
    "icon": "🐚",
    "image": "/images/krishna_govardhan.jpg",
    "era": "13th Century CE",
    "architect": "Jagadguru Sri Madhvacharya"
  },
  {
    "id": "temp_kollur",
    "title": "Kollur Sri Mookambika Temple",
    "location": "Kollur, Udupi",
    "district": "Udupi",
    "rating": "4.9",
    "categories": [
      "Shakti Peetha",
      "Major Pilgrimage"
    ],
    "deityTag": "Mookambika",
    "description": "Sacred shrine on the foothills of Kudajadri where Sri Adi Shankaracharya consecrated the golden Sri Chakra and installed the Jyotirlingam.",
    "timings": "05:00–13:30, 15:00–21:00",
    "phone": "+91-8254-273202",
    "coords": {
      "lat": 13.8647,
      "lng": 74.8143
    },
    "icon": "🌺",
    "image": "/images/meenakshi.jpg",
    "era": "8th Century CE",
    "architect": "Sri Adi Shankaracharya & Haleri Kings"
  },
  {
    "id": "temp_dharmasthala",
    "title": "Sri Manjunatha Swamy Temple",
    "location": "Dharmasthala, Dakshina Kannada",
    "district": "Dakshina Kannada",
    "rating": "4.9",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Manjunatha / Shiva",
    "description": "Sanctuary of Dharma providing Annadana to 10,000+ devotees daily, blending Shaivism, Vaishnavite Madhva priests, and Jain Heggade administration.",
    "timings": "06:30–14:00, 17:00–20:30",
    "phone": "+91-8256-277221",
    "coords": {
      "lat": 12.9525,
      "lng": 75.3852
    },
    "icon": "🌊",
    "image": "/images/dharma.jpg",
    "era": "16th Century CE",
    "architect": "Peramade & Heggade Dynasty"
  },
  {
    "id": "temp_kukke",
    "title": "Kukke Sri Subramanya Temple",
    "location": "Subrahmanya, Sullia",
    "district": "Dakshina Kannada",
    "rating": "4.9",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Subramanya",
    "description": "Nestled in Western Ghats, Kukke is the supreme pilgrimage site for Sarpa Dosha Nivarana and Ashlesha Bali, where Vasuki took refuge under Kartikeya.",
    "timings": "06:00–13:00, 15:30–20:00",
    "phone": "+91-8257-281224",
    "coords": {
      "lat": 12.6631,
      "lng": 75.6153
    },
    "icon": "🐍",
    "image": "/images/kartikeya_murugan.jpg",
    "era": "Ancient Vedic Era",
    "architect": "Ballal Dynasties & Tuluva Kings"
  },
  {
    "id": "temp_kateel",
    "title": "Kateel Sri Durgaparameshwari Temple",
    "location": "Kateel, Mangaluru",
    "district": "Dakshina Kannada",
    "rating": "4.8",
    "categories": [
      "Shakti Peetha",
      "Major Pilgrimage"
    ],
    "deityTag": "Durgaparameshwari",
    "description": "Enchanting island temple situated on the sacred Nandini river where Goddess Durga incarnated as a bee (Bhramari) to defeat demon Arunasura.",
    "timings": "06:00–13:30, 16:30–21:30",
    "phone": "+91-824-2200361",
    "coords": {
      "lat": 13.0186,
      "lng": 74.8519
    },
    "icon": "🌺",
    "image": "/images/mahakali_mahavidya.jpg",
    "era": "10th Century CE",
    "architect": "Alupa Dynasty"
  },
  {
    "id": "temp_mangaladevi",
    "title": "Mangaladevi Temple",
    "location": "Bolar, Mangaluru",
    "district": "Dakshina Kannada",
    "rating": "4.7",
    "categories": [
      "Shakti Peetha",
      "Major Pilgrimage"
    ],
    "deityTag": "Mangaladevi",
    "description": "The city of Mangaluru is named after this historic 9th-century temple built by King Kundavarma of the Alupa dynasty under Guru Gorakhnath's guidance.",
    "timings": "06:00–13:00, 16:00–20:30",
    "phone": "+91-824-2415476",
    "coords": {
      "lat": 12.853,
      "lng": 74.8427
    },
    "icon": "🛕",
    "image": "/images/queen_abbakka.jpg",
    "era": "9th Century CE",
    "architect": "King Kundavarma (Alupa Dynasty)"
  },
  {
    "id": "temp_kadri",
    "title": "Kadri Manjunatha Temple",
    "location": "Kadri, Mangaluru",
    "district": "Dakshina Kannada",
    "rating": "4.8",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Manjunatha / Shiva",
    "description": "Famous for its 10th-century Lokeshwara bronze statue, natural Gomukha springs, and ancient Buddhist-Shaiva syncretic rock architecture.",
    "timings": "06:00–13:00, 16:00–20:30",
    "phone": "+91-824-2214176",
    "coords": {
      "lat": 12.8837,
      "lng": 74.8576
    },
    "icon": "🕉️",
    "image": "/images/shiva_tandava.jpg",
    "era": "10th Century CE",
    "architect": "Alupa & Vijayanagara Dynasties"
  },
  {
    "id": "temp_murudeshwar",
    "title": "Murudeshwar Shiva & Beach Temple",
    "location": "Murudeshwar, Bhatkal",
    "district": "Uttara Kannada",
    "rating": "4.9",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Shiva",
    "description": "Iconic coastal temple featuring the world's 2nd tallest Shiva statue (123 ft) and the monumental 20-storied Raja Gopuram overlooking the Arabian Sea.",
    "timings": "03:00–13:00, 15:00–20:00",
    "phone": "+91-8385-268524",
    "coords": {
      "lat": 14.094,
      "lng": 74.4849
    },
    "icon": "🌊",
    "image": "/images/shiva_neelkanth.jpg",
    "era": "Ancient (Modern Gopuram 2008)",
    "architect": "R. N. Shetty (Patron)"
  },
  {
    "id": "temp_gokarna",
    "title": "Mahabaleshwar Atmalinga Temple",
    "location": "Gokarna Beach",
    "district": "Uttara Kannada",
    "rating": "4.8",
    "categories": [
      "Major Pilgrimage",
      "Adi Shankara Peetha"
    ],
    "deityTag": "Shiva Atmalinga",
    "description": "One of the seven Muktistalas of Karnataka housing the legendary Atmalinga given to Ravana by Shiva, consecrated along the pristine Gokarna coast.",
    "timings": "06:00–12:30, 17:00–20:00",
    "phone": "+91-8386-256241",
    "coords": {
      "lat": 14.5413,
      "lng": 74.3168
    },
    "icon": "🐚",
    "image": "/images/ravana_lanka.jpg",
    "era": "4th Century CE",
    "architect": "Kadamba Dynasty King Mayurasharma"
  },
  {
    "id": "temp_idagunji",
    "title": "Idagunji Maha Ganapathi",
    "location": "Honnavar, Idagunji",
    "district": "Uttara Kannada",
    "rating": "4.8",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Ganesha",
    "description": "Famous Dvibhuja (two-handed) standing Ganesha holding Modaka and Padma, attracting over 1 million pilgrims seeking wish fulfillment every year.",
    "timings": "06:00–13:00, 15:00–20:30",
    "phone": "+91-8387-224422",
    "coords": {
      "lat": 14.3014,
      "lng": 74.4789
    },
    "icon": "🐘",
    "image": "/images/ganesha.jpg",
    "era": "4th–5th Century CE",
    "architect": "Valakhilya Rishi Tradition"
  },
  {
    "id": "temp_belur",
    "title": "Chennakeshava Temple (Hoysala)",
    "location": "Belur, Hassan",
    "district": "Hassan",
    "rating": "4.9",
    "categories": [
      "UNESCO Heritage",
      "Hoysala Heritage"
    ],
    "deityTag": "Vishnu",
    "description": "UNESCO World Heritage Site with star-shaped soapstone architecture, 42 bracket Madanika dancers, and celestial carvings of the Ramayana and Mahabharata.",
    "timings": "07:30–20:00",
    "phone": "+91-8177-222218",
    "coords": {
      "lat": 13.1623,
      "lng": 75.8624
    },
    "icon": "🏛️",
    "image": "/images/ellora_kailasa.jpg",
    "era": "1117 CE",
    "architect": "Hoysala King Vishnuvardhana & Sculptor Jakanachari"
  },
  {
    "id": "temp_halebidu",
    "title": "Hoysaleswara & Shantaleswara",
    "location": "Halebidu, Hassan",
    "district": "Hassan",
    "rating": "4.8",
    "categories": [
      "UNESCO Heritage",
      "Hoysala Heritage"
    ],
    "deityTag": "Shiva",
    "description": "UNESCO World Heritage twin temples with 240+ exquisite wall relief friezes of elephants, lions, makaras, and celestial deities in dark chloritic schist.",
    "timings": "06:30–18:30",
    "phone": "+91-8177-220025",
    "coords": {
      "lat": 13.2141,
      "lng": 75.9926
    },
    "icon": "🏛️",
    "image": "/images/ajanta.jpg",
    "era": "1121 CE",
    "architect": "Kedarojam & Hoysala Dynasty"
  },
  {
    "id": "temp_sringeri",
    "title": "Sri Sringeri Sharada Peetham",
    "location": "Sringeri, Chikkamagaluru",
    "district": "Chikkamagaluru",
    "rating": "4.9",
    "categories": [
      "Adi Shankara Peetha",
      "Major Pilgrimage"
    ],
    "deityTag": "Sharadamba",
    "description": "The Southern Amnaya Matha established by Sri Adi Shankaracharya on the serene Tunga river bank, featuring the 12 zodiac pillar Vidyashankara temple.",
    "timings": "06:00–14:00, 16:00–21:00",
    "phone": "+91-8265-250123",
    "coords": {
      "lat": 13.4192,
      "lng": 75.2536
    },
    "icon": "🏛️",
    "image": "/images/adi_shankara.jpg",
    "era": "8th Century CE",
    "architect": "Jagadguru Sri Adi Shankaracharya"
  },
  {
    "id": "temp_horanadu",
    "title": "Horanadu Sri Annapoorneshwari",
    "location": "Horanadu, Chikkamagaluru",
    "district": "Chikkamagaluru",
    "rating": "4.9",
    "categories": [
      "Major Pilgrimage",
      "Shakti Peetha"
    ],
    "deityTag": "Annapoorneshwari",
    "description": "Ancient sanctuary in lush Western Ghats offering golden darshana of Mother Annapoorneshwari and three sumptuous vegetarian meals daily to all visitors.",
    "timings": "06:30–14:00, 19:00–21:30",
    "phone": "+91-8263-269623",
    "coords": {
      "lat": 13.2721,
      "lng": 75.3444
    },
    "icon": "🌾",
    "image": "/images/dharma.jpg",
    "era": "8th Century CE",
    "architect": "Maharishi Agastya Consecration"
  },
  {
    "id": "temp_sigandur",
    "title": "Sigandur Chowdeshwari Temple",
    "location": "Sharavathi Backwaters, Sigandur",
    "district": "Shivamogga",
    "rating": "4.8",
    "categories": [
      "Shakti Peetha",
      "Major Pilgrimage"
    ],
    "deityTag": "Chowdeshwari",
    "description": "Scenic backwater island temple reached by ferry barge across the Sharavathi river, where Goddess Chowdeshwari protects truth and vows.",
    "timings": "06:30–14:30, 17:00–19:30",
    "phone": "+91-8183-278144",
    "coords": {
      "lat": 14.0722,
      "lng": 74.9083
    },
    "icon": "⛴️",
    "image": "/images/mahakali_mahavidya.jpg",
    "era": "300+ Years Ancient",
    "architect": "Sheshappa Gowda (Founder)"
  },
  {
    "id": "temp_virupaksha",
    "title": "Virupaksha Temple (Hampi)",
    "location": "Hampi Bazaar, Vijayanagara",
    "district": "Vijayanagara",
    "rating": "4.9",
    "categories": [
      "UNESCO Heritage",
      "Major Pilgrimage"
    ],
    "deityTag": "Shiva",
    "description": "Continuous worship since the 7th century CE. UNESCO World Heritage monument with a 50m Rajagopuram, inverted pinhole camera shadow effect, and Tungabhadra riverfront.",
    "timings": "06:00–12:30, 17:00–20:30",
    "phone": "+91-8394-241235",
    "coords": {
      "lat": 15.335,
      "lng": 76.4562
    },
    "icon": "🏛️",
    "image": "/images/hampi.jpg",
    "era": "7th Century CE",
    "architect": "Vijayanagara Empire (Krishnadevaraya)"
  },
  {
    "id": "temp_badami",
    "title": "Badami Cave Temples & Bhutanatha",
    "location": "Badami, Bagalkot",
    "district": "Bagalkot",
    "rating": "4.9",
    "categories": [
      "UNESCO Heritage",
      "Major Pilgrimage"
    ],
    "deityTag": "Nataraja / Vishnu / Jina",
    "description": "Spectacular 6th-century rock-cut cave shrines overlooking Agastya Lake, showcasing 18-armed dancing Nataraja and Varaha avatars in red sandstone.",
    "timings": "06:00–18:00",
    "phone": "+91-8357-220138",
    "coords": {
      "lat": 15.9189,
      "lng": 75.6766
    },
    "icon": "🧗",
    "image": "/images/shiva_tandava.jpg",
    "era": "6th Century CE",
    "architect": "Early Chalukya Dynasty (Pulakeshin I)"
  },
  {
    "id": "temp_pattadakal",
    "title": "Pattadakal Virupaksha & Mallikarjuna",
    "location": "Pattadakal, Bagalkot",
    "district": "Bagalkot",
    "rating": "4.9",
    "categories": [
      "UNESCO Heritage"
    ],
    "deityTag": "Shiva",
    "description": "UNESCO World Heritage coronation site of the Badami Chalukyas demonstrating harmonious union of North Indian Rekha-Nagara and South Indian Dravida styles.",
    "timings": "06:00–18:00",
    "phone": "+91-8357-220030",
    "coords": {
      "lat": 15.9485,
      "lng": 75.8164
    },
    "icon": "🏛️",
    "image": "/images/ellora_kailasa.jpg",
    "era": "740 CE",
    "architect": "Queen Lokamahadevi (Badami Chalukyas)"
  },
  {
    "id": "temp_aihole",
    "title": "Aihole Durga & Lad Khan Temples",
    "location": "Aihole, Bagalkot",
    "district": "Bagalkot",
    "rating": "4.8",
    "categories": [
      "UNESCO Heritage"
    ],
    "deityTag": "Durga / Surya / Shiva",
    "description": "The 'Cradle of Hindu Rock Temple Architecture' with 120+ early temples; the apsidal Durga temple features unique horse-shoe sanctum geometry.",
    "timings": "06:00–18:00",
    "phone": "+91-8357-220050",
    "coords": {
      "lat": 16.021,
      "lng": 75.8821
    },
    "icon": "🏛️",
    "image": "/images/surya_siddhanta_astronomy.jpg",
    "era": "5th–8th Century CE",
    "architect": "Badami Chalukya Architects Guild"
  },
  {
    "id": "temp_savadatti",
    "title": "Savadatti Renuka Yellamma Temple",
    "location": "Savadatti, Belagavi",
    "district": "Belagavi",
    "rating": "4.8",
    "categories": [
      "Shakti Peetha",
      "Major Pilgrimage"
    ],
    "deityTag": "Renuka Yellamma",
    "description": "Famous hill temple of Goddess Renuka (mother of Lord Parashurama) atop Yellammagudda, drawing millions during Banada Hunnime festival.",
    "timings": "05:00–21:00",
    "phone": "+91-8330-222340",
    "coords": {
      "lat": 15.7725,
      "lng": 75.1235
    },
    "icon": "🪓",
    "image": "/images/parashurama.jpg",
    "era": "11th Century CE",
    "architect": "Ratta Dynasty & Jamkhandi Rulers"
  },
  {
    "id": "temp_hubli_siddharoodha",
    "title": "Hubballi Sri Siddharoodha Matha",
    "location": "Hubballi, Dharwad",
    "district": "Dharwad",
    "rating": "4.8",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Sri Siddharoodha Swamy",
    "description": "Spiritual headquarters of Advaita Vedanta and selfless service visited by Lokmanya Tilak and Mahatma Gandhi, offering continuous Annadana.",
    "timings": "05:00–21:00",
    "phone": "+91-836-2283020",
    "coords": {
      "lat": 15.3533,
      "lng": 75.1487
    },
    "icon": "🕉️",
    "image": "/images/adi_shankara.jpg",
    "era": "1890 CE",
    "architect": "Jagadguru Siddharoodha Swamiji"
  },
  {
    "id": "temp_ganagapur",
    "title": "Ganagapura Dattatreya Temple",
    "location": "Ganagapur, Kalaburagi",
    "district": "Kalaburagi",
    "rating": "4.9",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Narasimha Saraswati / Dattatreya",
    "description": "Holistic Datta Kshetra on the holy confluence of Bhima and Amarja rivers, where Sri Narasimha Saraswati Swamy's Nirguna Padukas are worshipped.",
    "timings": "04:30–21:30",
    "phone": "+91-8470-274335",
    "coords": {
      "lat": 17.1856,
      "lng": 76.4497
    },
    "icon": "🕉️",
    "image": "/images/dashavatara.jpg",
    "era": "15th Century CE",
    "architect": "Sri Narasimha Saraswati Parampara"
  },
  {
    "id": "temp_kotilingeshwara",
    "title": "Kotilingeshwara Temple",
    "location": "KGF, Kammasandra",
    "district": "Kolar",
    "rating": "4.7",
    "categories": [
      "Major Pilgrimage"
    ],
    "deityTag": "Shiva",
    "description": "Famous for housing over 10 million Shiva Lingas spread across sprawling grounds with a colossal 108 ft Maha Shiva Linga and 35 ft Nandi idol.",
    "timings": "06:00–21:00",
    "phone": "+91-8153-277555",
    "coords": {
      "lat": 12.9818,
      "lng": 78.2917
    },
    "icon": "🕉️",
    "image": "/images/shiva.jpg",
    "era": "1980 CE",
    "architect": "Swami Sambha Shiva Murthy"
  },
  {
    "id": "temp_goravanahalli",
    "title": "Goravanahalli Sri Mahalakshmi",
    "location": "Goravanahalli, Koratagere",
    "district": "Tumakuru",
    "rating": "4.8",
    "categories": [
      "Shakti Peetha",
      "Major Pilgrimage"
    ],
    "deityTag": "Mahalakshmi",
    "description": "Self-manifested (Swayambhu) Mahalakshmi idol discovered by Kamalamma, revered for granting abundance, wealth, and prosperity to devotees.",
    "timings": "06:00–14:00, 16:00–20:30",
    "phone": "+91-8138-232145",
    "coords": {
      "lat": 13.4891,
      "lng": 77.2661
    },
    "icon": "🪷",
    "image": "/images/dharma.jpg",
    "era": "20th Century CE",
    "architect": "Kamalamma & Devotees Trust"
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
    "category": "jyotirlinga",
    "location": "Tirumala Hills, Tirupati, Andhra Pradesh, India",
    "state": "Andhra Pradesh",
    "country": "India",
    "videoId": "XxdarKTmJ8c",
    "fallbackVideoId": "XxdarKTmJ8c",
    "officialTrust": "Tirumala Tirupati Devasthanams (TTD / SVBC)",
    "liveStreamUrl": "https://www.youtube.com/embed/XxdarKTmJ8c?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=XxdarKTmJ8c",
    "imageUrl": "https://img.youtube.com/vi/XxdarKTmJ8c/hqdefault.jpg",
    "icon": "🪷",
    "coords": {
      "lat": 13.6833,
      "lng": 79.3472
    },
    "rating": "5.0 ★",
    "devoteesOnline": 28400,
    "speciality": "Official 24/7 SVBC Live Darshana, Kalyanotsavam & Sahasra Deepalankara Seva of Lord Balaji",
    "mantra": "ॐ नमो वेङ्कटेशाय | गोविन्दा गोविन्दा | ॐ श्रीनिवासाय नमः",
    "aartis": [
      {
        "name": "Suprabhatam",
        "time": "03:00 AM",
        "desc": "Awakening stotram by Sayana Mandapam"
      },
      {
        "name": "Thomala Seva",
        "time": "04:30 AM",
        "desc": "Garland adoration to Moolavirat"
      },
      {
        "name": "Sahasra Deepalankarana",
        "time": "05:30 PM",
        "desc": "Thousand-lamp evening darshana"
      },
      {
        "name": "Ekanta Seva",
        "time": "01:30 AM",
        "desc": "Night divine lullaby and repose"
      }
    ]
  },
  {
    "id": "kashi_vishwanath",
    "name": "Shree Kashi Vishwanath Jyotirlinga",
    "hindiName": "श्री काशी विश्वनाथ ज्योतिर्लिंग वाराणसी (मंगला व शृंगार आरती)",
    "deity": "Lord Shiva (Vishveshwara / Lord of the Universe)",
    "category": "jyotirlinga",
    "location": "Varanasi (Kashi), Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "uRUP4M_5vSo",
    "fallbackVideoId": "uRUP4M_5vSo",
    "officialTrust": "Shri Kashi Vishwanath Temple Trust (SKVT)",
    "liveStreamUrl": "https://www.youtube.com/embed/uRUP4M_5vSo?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uRUP4M_5vSo",
    "imageUrl": "https://img.youtube.com/vi/uRUP4M_5vSo/hqdefault.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 25.3109,
      "lng": 83.0107
    },
    "rating": "5.0 ★",
    "devoteesOnline": 18900,
    "speciality": "Avimukta Moksha Kshetra • Real-time Mangala & Shringara Aarti directly on the banks of Holy Ganga",
    "mantra": "ॐ नमः शिवाय | हर हर महादेव | ॐ त्र्यम्बकं यजामहे सुगन्धिं पुष्टिवर्धनम्",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "03:00 AM",
        "desc": "Brahma Muhurta awakening and Panchamrit snana"
      },
      {
        "name": "Bhog Aarti",
        "time": "11:15 AM",
        "desc": "Midday Rajbhog feast and floral shringara"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening Vedic stotra chanting & camphor deepam"
      },
      {
        "name": "Shayan Aarti",
        "time": "10:30 PM",
        "desc": "Damaru naad and night rest ritual"
      }
    ]
  },
  {
    "id": "somnath_jyotirlinga",
    "name": "Shree Somnath Jyotirlinga (1st Jyotirlinga)",
    "hindiName": "श्री सोमनाथ ज्योतिर्लिंग (प्रथम ज्योतिर्लिंग • प्रभास पाटन)",
    "deity": "Lord Shiva (Someshwara / Lord of the Moon)",
    "category": "jyotirlinga",
    "location": "Prabhas Patan, Veraval, Saurashtra, Gujarat, India",
    "state": "Gujarat",
    "country": "India",
    "videoId": "uY5YwokiIsY",
    "fallbackVideoId": "uY5YwokiIsY",
    "officialTrust": "Shree Somnath Trust, Prabhas Patan",
    "liveStreamUrl": "https://www.youtube.com/embed/uY5YwokiIsY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=uY5YwokiIsY",
    "imageUrl": "https://img.youtube.com/vi/uY5YwokiIsY/hqdefault.jpg",
    "icon": "🌊",
    "coords": {
      "lat": 20.888,
      "lng": 70.401
    },
    "rating": "5.0 ★",
    "devoteesOnline": 11200,
    "speciality": "First of the 12 Sacred Jyotirlingas, situated at the confluence of 3 sacred rivers and the Arabian Sea",
    "mantra": "सौराष्ट्रदेशे विशदेऽति रम्ये ज्योतिर्मयं चन्द्रकलावतंसम् | नमामि सोमनाथम्",
    "aartis": [
      {
        "name": "Pratah Aarti",
        "time": "07:00 AM",
        "desc": "Morning divine ocean-side abhishekam"
      },
      {
        "name": "Madhyahna Aarti",
        "time": "12:00 PM",
        "desc": "Noon offering and royal decoration"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Sunset Maha Deeparadhana with conch resonates"
      }
    ]
  },
  {
    "id": "mahakaleshwar_ujjain",
    "name": "Mahakaleshwar Jyotirlinga Ujjain",
    "hindiName": "श्री महाकालेश्वर ज्योतिर्लिंग उज्जैन (भस्म आरती व दर्शन)",
    "deity": "Lord Shiva (Dakshinamurti Mahakal / Kaal Ka Mahakaal)",
    "category": "jyotirlinga",
    "location": "Ujjain, Madhya Pradesh, India",
    "state": "Madhya Pradesh",
    "country": "India",
    "videoId": "H6D_IGx5xOI",
    "fallbackVideoId": "H6D_IGx5xOI",
    "officialTrust": "Shri Mahakaleshwar Temple Management Committee, Ujjain",
    "liveStreamUrl": "https://www.youtube.com/embed/H6D_IGx5xOI?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=H6D_IGx5xOI",
    "imageUrl": "https://img.youtube.com/vi/H6D_IGx5xOI/hqdefault.jpg",
    "icon": "🔥",
    "coords": {
      "lat": 23.1827,
      "lng": 75.7682
    },
    "rating": "5.0 ★",
    "devoteesOnline": 24600,
    "speciality": "Only South-Facing (Dakshinamurti) Jyotirlinga, famous for the world-renowned daily Bhasma Aarti",
    "mantra": "अवन्तिकायां विहितावतारं मुक्तिप्रदानाय च सज्जनानाम् | वन्दे महाकालम्",
    "aartis": [
      {
        "name": "Bhasma Aarti",
        "time": "04:00 AM",
        "desc": "Sacred fresh sacred ash bath & Maha Rudrabhisheka"
      },
      {
        "name": "Naivedya Aarti",
        "time": "10:30 AM",
        "desc": "Mid-morning food offering to Baba Mahakal"
      },
      {
        "name": "Sandhya Aarti",
        "time": "05:00 PM",
        "desc": "Evening Shringara and royal ornaments adorning"
      },
      {
        "name": "Shayan Aarti",
        "time": "10:30 PM",
        "desc": "Night resting ritual accompanied by damaru beats"
      }
    ]
  },
  {
    "id": "ayodhya_ram_mandir",
    "name": "Shri Ram Janmabhoomi Mandir Ayodhya",
    "hindiName": "श्री राम जन्मभूमि मंदिर अयोध्या (रामलला दिव्य दर्शन व आरती)",
    "deity": "Lord Rama (Bhagwan Shri Ram Lalla Virajman)",
    "category": "major",
    "location": "Ayodhya Dham, Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "W8qEqGulnPg",
    "fallbackVideoId": "W8qEqGulnPg",
    "officialTrust": "Shri Ram Janmbhoomi Teerth Kshetra Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/W8qEqGulnPg?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=W8qEqGulnPg",
    "imageUrl": "https://img.youtube.com/vi/W8qEqGulnPg/hqdefault.jpg",
    "icon": "🏹",
    "coords": {
      "lat": 26.7956,
      "lng": 82.1943
    },
    "rating": "5.0 ★",
    "devoteesOnline": 31500,
    "speciality": "Sacred 5-year-old child form of Maryada Purushottam Shri Ram in the grand Nagara architectural sanctum",
    "mantra": "श्री राम जय राम जय जय राम | मंगल भवन अमंगल हारी | सियावर रामचंद्र की जय",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Brahma Muhurta awakening of Balak Ram"
      },
      {
        "name": "Shringara Aarti",
        "time": "06:30 AM",
        "desc": "Adorning silk pitambara & gold crown"
      },
      {
        "name": "Bhog Aarti",
        "time": "12:00 PM",
        "desc": "Midday 56-bhog offering to Ram Lalla"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:30 PM",
        "desc": "Evening Deepotsav and Ramcharitmanas recital"
      },
      {
        "name": "Shayan Aarti",
        "time": "10:00 PM",
        "desc": "Bedtime lullaby and temple closure"
      }
    ]
  },
  {
    "id": "iskcon_bangalore",
    "name": "ISKCON Sri Radha Krishnachandra Bangalore",
    "hindiName": "इस्कॉन श्री राधा कृष्णचंद्र मंदिर बेंगलुरु (कीर्तन व आरती)",
    "deity": "Sri Sri Radha Krishnachandra & Sri Narasimha",
    "category": "major",
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
    "devoteesOnline": 9800,
    "speciality": "Ecstatic 24/7 Maha-Mantra Kirtan, opulent deity shringara, and uninterrupted divine stream",
    "mantra": "हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे | हरे राम हरे राम राम राम हरे हरे",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Samsara Davanala Lidha Loka Stotram & Tulasi Puja"
      },
      {
        "name": "Darshan Aarti",
        "time": "07:15 AM",
        "desc": "Govindam Adi Purusham unveiling darshana"
      },
      {
        "name": "Sandhya Aarti (Gaura Aarti)",
        "time": "07:00 PM",
        "desc": "Jai Sacinandana Gaura Hari Kirtan"
      }
    ]
  },
  {
    "id": "iskcon_vrindavan",
    "name": "ISKCON Sri Sri Krishna Balaram Mandir",
    "hindiName": "श्री श्री कृष्ण बलराम मंदिर इस्कॉन वृंदावन (24-घंटे अखंड कीर्तन)",
    "deity": "Sri Krishna & Balarama, Sri Radha Shyamasundar",
    "category": "major",
    "location": "Raman Reti, Vrindavan, Mathura, Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "O2ojNbbB8Iw",
    "fallbackVideoId": "O2ojNbbB8Iw",
    "officialTrust": "ISKCON Vrindavan Krishna Balaram Temple",
    "liveStreamUrl": "https://www.youtube.com/embed/O2ojNbbB8Iw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=O2ojNbbB8Iw",
    "imageUrl": "https://img.youtube.com/vi/O2ojNbbB8Iw/hqdefault.jpg",
    "icon": "🪈",
    "coords": {
      "lat": 27.573,
      "lng": 77.6743
    },
    "rating": "5.0 ★",
    "devoteesOnline": 16500,
    "speciality": "Heart of Braj Dham, famous for uninterrupted 24-Hour Akhanda Harinama Kirtan since 1975",
    "mantra": "राधे राधे | ॐ नमो भगवते वासुदेवाय | वृन्दावन चंद्राय नमः",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Vrindavan early morning wake-up song"
      },
      {
        "name": "Shringar Aarti",
        "time": "07:15 AM",
        "desc": "Flute decoration and Braj Gopi Bhava darshan"
      },
      {
        "name": "Sandhya Gaura Aarti",
        "time": "07:00 PM",
        "desc": "Evening kirtan dance in the central courtyard"
      }
    ]
  },
  {
    "id": "vaishno_devi_katra",
    "name": "Shri Mata Vaishno Devi Bhawan Katra",
    "hindiName": "श्री माता वैष्णो देवी भवन कटरा (पवित्र गुफा व दिव्य आरती)",
    "deity": "Maa Vaishno Devi (Maha Kali, Maha Lakshmi, Maha Saraswati Pindis)",
    "category": "shaktipeeth",
    "location": "Trikuta Hills, Katra, Jammu & Kashmir, India",
    "state": "Jammu & Kashmir",
    "country": "India",
    "videoId": "jD-THm4dJz0",
    "fallbackVideoId": "jD-THm4dJz0",
    "officialTrust": "Shri Mata Vaishno Devi Shrine Board (SMVDSB)",
    "liveStreamUrl": "https://www.youtube.com/embed/jD-THm4dJz0?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=jD-THm4dJz0",
    "imageUrl": "https://img.youtube.com/vi/jD-THm4dJz0/hqdefault.jpg",
    "icon": "🌺",
    "coords": {
      "lat": 33.0308,
      "lng": 74.949
    },
    "rating": "5.0 ★",
    "devoteesOnline": 22100,
    "speciality": "Holy Cave Shrine in Trikuta Mountains housing the 3 natural Pindis of Mahakali, Mahalakshmi & Mahasaraswati",
    "mantra": "जय माता दी | ॐ ऐं ह्रीं क्लीं चामुण्डायै विच्चे | सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके",
    "aartis": [
      {
        "name": "Morning Divine Aarti",
        "time": "06:00 AM",
        "desc": "Dawn Hawan & Chandi Path inside Holy Cave"
      },
      {
        "name": "Evening Divine Aarti",
        "time": "07:00 PM",
        "desc": "Dusk Shringara and floral Chhatra offerings"
      }
    ]
  },
  {
    "id": "parmarth_niketan_ganga",
    "name": "Parmarth Niketan Rishikesh (Ganga Aarti)",
    "hindiName": "परमार्थ निकेतन ऋषिकेश (विश्वप्रसिद्ध संध्या गंगा आरती)",
    "deity": "Maa Ganga & Lord Shiva",
    "category": "aarti",
    "location": "Swargashram, Rishikesh, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "videoId": "usvU6ox_NQU",
    "fallbackVideoId": "usvU6ox_NQU",
    "officialTrust": "Parmarth Niketan Ashram, Rishikesh",
    "liveStreamUrl": "https://www.youtube.com/embed/usvU6ox_NQU?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=usvU6ox_NQU",
    "imageUrl": "https://img.youtube.com/vi/usvU6ox_NQU/hqdefault.jpg",
    "icon": "🕯️",
    "coords": {
      "lat": 30.1217,
      "lng": 78.3149
    },
    "rating": "5.0 ★",
    "devoteesOnline": 13400,
    "speciality": "World-renowned sunset Ganga Aarti with Vedic chanting, lamps, and bhajans on the holy banks in Rishikesh",
    "mantra": "ॐ गंगे च यमुने चैव गोदावरि सरस्वति | नर्मदे सिन्धु कावेरि जलेऽस्मिन् संनिधिं कुरु",
    "aartis": [
      {
        "name": "Ganga Hawan & Puja",
        "time": "05:00 PM",
        "desc": "Vedic yajna on the river ghats"
      },
      {
        "name": "Maha Ganga Aarti",
        "time": "06:00 PM",
        "desc": "Deeparadhana with hundreds of brass oil lamps"
      }
    ]
  },
  {
    "id": "siddhivinayak_mumbai",
    "name": "Shree Siddhivinayak Temple Mumbai",
    "hindiName": "श्री सिद्धिविनायक मंदिर प्रभादेवी मुंबई (लाइव दर्शन व काकड आरती)",
    "deity": "Lord Ganesha (Siddhivinayak Ganapati)",
    "category": "major",
    "location": "Prabhadevi, Mumbai, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "V2FnGzYYux8",
    "fallbackVideoId": "V2FnGzYYux8",
    "officialTrust": "Shree Siddhivinayak Ganapati Temple Trust (SSGTB)",
    "liveStreamUrl": "https://www.youtube.com/embed/V2FnGzYYux8?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=V2FnGzYYux8",
    "imageUrl": "https://img.youtube.com/vi/V2FnGzYYux8/hqdefault.jpg",
    "icon": "🐘",
    "coords": {
      "lat": 19.0169,
      "lng": 72.8303
    },
    "rating": "5.0 ★",
    "devoteesOnline": 17800,
    "speciality": "Wish-fulfilling right-trunked Ganesha sculpted from a single black stone with gold sanctum",
    "mantra": "वक्रतुण्ड महाकाय सूर्यकोटि समप्रभ | निर्विघ्नं कुरु मे देव सर्वकार्येषु सर्वदा",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "05:30 AM",
        "desc": "Morning awakening and Modak offering"
      },
      {
        "name": "Shree Darshan",
        "time": "06:00 AM - 12:15 PM",
        "desc": "Continuous devotee darshana"
      },
      {
        "name": "Dhoop Aarti",
        "time": "07:30 PM",
        "desc": "Evening camphor illumination"
      },
      {
        "name": "Shej Aarti",
        "time": "09:50 PM",
        "desc": "Bedtime prayers and closing of doors"
      }
    ]
  },
  {
    "id": "jagannath_puri",
    "name": "Shree Jagannath Temple Puri",
    "hindiName": "श्री जगन्नाथ मंदिर पुरी (महाप्रसाद, मंगला व संध्या आरती)",
    "deity": "Lord Jagannath, Balabhadra, Subhadra & Sudarshana",
    "category": "major",
    "location": "Puri Dham, Odisha, India",
    "state": "Odisha",
    "country": "India",
    "videoId": "WD5kyQ4laVs",
    "fallbackVideoId": "WD5kyQ4laVs",
    "officialTrust": "Shree Jagannath Temple Administration (SJTA)",
    "liveStreamUrl": "https://www.youtube.com/embed/WD5kyQ4laVs?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=WD5kyQ4laVs",
    "imageUrl": "https://img.youtube.com/vi/WD5kyQ4laVs/hqdefault.jpg",
    "icon": "🎡",
    "coords": {
      "lat": 19.8049,
      "lng": 85.8179
    },
    "rating": "5.0 ★",
    "devoteesOnline": 15300,
    "speciality": "Maha Char Dham shrine of the Supreme Lord of the Cosmos, famous for Ratha Yatra and 56-Bhog Mahaprasad",
    "mantra": "नीलाचलनिवासाय नित्याय परमात्मने | बलभद्रसुभद्राभ्यां जगन्नाथाय ते नमः",
    "aartis": [
      {
        "name": "Mangala Alati",
        "time": "05:00 AM",
        "desc": "Early morning unveiling of holy faces"
      },
      {
        "name": "Mailam & Abakash",
        "time": "06:00 AM",
        "desc": "Changing robes and sacred teeth-cleaning ritual"
      },
      {
        "name": "Sandhya Alati",
        "time": "07:00 PM",
        "desc": "Sunset deepam offering in sanctum"
      },
      {
        "name": "Pahuda Alati",
        "time": "11:30 PM",
        "desc": "Night repose ceremony with Gitagovinda recital"
      }
    ]
  },
  {
    "id": "tulja_bhavani",
    "name": "Shri Tulja Bhavani Temple",
    "hindiName": "श्री तुलजा भवानी मंदिर तुलजापुर (कुलस्वामिनी दर्शन)",
    "deity": "Goddess Tulja Bhavani (Kulswamini of Chhatrapati Shivaji Maharaj)",
    "category": "shaktipeeth",
    "location": "Tuljapur, Dharashiv, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "B3r-kt5dK_M",
    "fallbackVideoId": "B3r-kt5dK_M",
    "officialTrust": "Shri Tuljabhavani Temple Sansthan",
    "liveStreamUrl": "https://www.youtube.com/embed/B3r-kt5dK_M?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=B3r-kt5dK_M",
    "imageUrl": "https://img.youtube.com/vi/B3r-kt5dK_M/hqdefault.jpg",
    "icon": "🗡️",
    "coords": {
      "lat": 18.0125,
      "lng": 76.1264
    },
    "rating": "5.0 ★",
    "devoteesOnline": 8700,
    "speciality": "Swayambhu Shaktipeeth who blessed Chhatrapati Shivaji Maharaj with the historic Bhavani Talwar",
    "mantra": "आई राजा उदे उदे | ॐ श्री तुलजाभवानी देव्यै नमः | सर्वशक्तिकरी दुर्गे",
    "aartis": [
      {
        "name": "Charan Tirtha Puja",
        "time": "05:00 AM",
        "desc": "Holy water bath of Mother's Lotus Feet"
      },
      {
        "name": "Abhisheka & Shringara",
        "time": "08:00 AM",
        "desc": "Kumkumarchana and Choli adornment"
      },
      {
        "name": "Dhoop Aarti",
        "time": "07:00 PM",
        "desc": "Grand gondhal and deepam ceremony"
      }
    ]
  },
  {
    "id": "khatu_shyam_ji",
    "name": "Shree Khatu Shyam Ji Temple",
    "hindiName": "श्री खाटू श्याम जी मंदिर सीकर राजस्थान (हारे का सहारा दर्शन)",
    "deity": "Barbarika (Khatu Shyam Ji / Haare Ka Sahara)",
    "category": "major",
    "location": "Khatu Dham, Sikar, Rajasthan, India",
    "state": "Rajasthan",
    "country": "India",
    "videoId": "aHp8nnOwcpc",
    "fallbackVideoId": "aHp8nnOwcpc",
    "officialTrust": "Shri Shyam Mandir Committee, Khatushyamji",
    "liveStreamUrl": "https://www.youtube.com/embed/aHp8nnOwcpc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=aHp8nnOwcpc",
    "imageUrl": "https://img.youtube.com/vi/aHp8nnOwcpc/hqdefault.jpg",
    "icon": "👑",
    "coords": {
      "lat": 27.3598,
      "lng": 75.2974
    },
    "rating": "5.0 ★",
    "devoteesOnline": 19400,
    "speciality": "Sheesh Ke Daani (Giver of the Head), deity who relieves suffering for millions of humble seekers",
    "mantra": "ॐ श्री श्याम देवाय नमः | हारे का सहारा बाबा श्याम हमारा | शीश के दानी की जय",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "04:30 AM",
        "desc": "Morning shringara with rose and jasmine petals"
      },
      {
        "name": "Shringara Aarti",
        "time": "07:00 AM",
        "desc": "Adorning fragrant floral attar and crown"
      },
      {
        "name": "Bhog Aarti",
        "time": "12:30 PM",
        "desc": "Kheer-Churma Prasad offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:30 PM",
        "desc": "Evening conch blowing and deepam"
      }
    ]
  },
  {
    "id": "salasar_balaji",
    "name": "Shri Salasar Balaji Mandir",
    "hindiName": "श्री सालासर बालाजी मंदिर (दाढ़ी-मूंछ वाले चमत्कारी हनुमान जी)",
    "deity": "Lord Hanuman (Salasar Balaji with Beard & Mustache)",
    "category": "major",
    "location": "Salasar, Churu District, Rajasthan, India",
    "state": "Rajasthan",
    "country": "India",
    "videoId": "q58Wan19vns",
    "fallbackVideoId": "q58Wan19vns",
    "officialTrust": "Shree Hanuman Seva Samiti, Salasar",
    "liveStreamUrl": "https://www.youtube.com/embed/q58Wan19vns?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=q58Wan19vns",
    "imageUrl": "https://img.youtube.com/vi/q58Wan19vns/hqdefault.jpg",
    "icon": "🚩",
    "coords": {
      "lat": 27.7225,
      "lng": 74.7212
    },
    "rating": "5.0 ★",
    "devoteesOnline": 12800,
    "speciality": "Unique Swayambhu idol of Lord Hanuman with a divine beard and mustache, renowned for miraculous grace",
    "mantra": "मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् | सालासर बालाजी की जय",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:00 AM",
        "desc": "Dawn awakening and sindoor offering"
      },
      {
        "name": "Dhoop Aarti",
        "time": "10:30 AM",
        "desc": "Morning incense and modak bhog"
      },
      {
        "name": "Sandhya Aarti",
        "time": "08:00 PM",
        "desc": "Night Maha Aarti and Hanuman Chalisa chanting"
      }
    ]
  },
  {
    "id": "kedarnath_dham",
    "name": "Kedarnath Himalayan Dham",
    "hindiName": "श्री केदारनाथ ज्योतिर्लिंग (हिमालयन धाम दर्शन)",
    "deity": "Lord Shiva (Kedareshwara / Lord of the Glacial Peak)",
    "category": "jyotirlinga",
    "location": "Garhwal Himalayas, Rudraprayag, Uttarakhand, India",
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
    "devoteesOnline": 26700,
    "speciality": "Highest Jyotirlinga at 3,584m altitude surrounded by snow-clad Himalayan peaks and Mandakini River",
    "mantra": "महाद्रिपार्श्वे च तटे रमन्तं सम्पूज्यमानं सततं मुनीन्द्रैः | नमामि केदारम्",
    "aartis": [
      {
        "name": "Maha Abhishekam",
        "time": "04:00 AM",
        "desc": "Brahma Muhurta mountain water and ghee bath"
      },
      {
        "name": "Shringara Aarti",
        "time": "07:00 AM",
        "desc": "Morning floral darshana"
      },
      {
        "name": "Sandhya Aarti",
        "time": "06:30 PM",
        "desc": "Evening bell chimes echoing in the Himalayas"
      }
    ]
  },
  {
    "id": "udupi_krishna_matha",
    "name": "Sri Krishna Matha Udupi",
    "hindiName": "श्री कृष्ण मठ उडुपी (कनकन किंडी व नित्य महापूजा)",
    "deity": "Lord Balakrishna (Installed by Sri Madhvacharya through Kanakana Kindi)",
    "category": "major",
    "location": "Car Street, Udupi, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "8JsL-H7fJy4",
    "fallbackVideoId": "8JsL-H7fJy4",
    "officialTrust": "Ashta Mathas of Udupi (Paryaya Sri Krishna Matha)",
    "liveStreamUrl": "https://www.youtube.com/embed/8JsL-H7fJy4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=8JsL-H7fJy4",
    "imageUrl": "https://img.youtube.com/vi/8JsL-H7fJy4/hqdefault.jpg",
    "icon": "🪟",
    "coords": {
      "lat": 13.3409,
      "lng": 74.7525
    },
    "rating": "5.0 ★",
    "devoteesOnline": 9400,
    "speciality": "Lord Krishna viewed through the sacred silver 9-holed window (Kanakana Kindi), following 800-yr Dwaita rituals",
    "mantra": "श्री कृष्णाय नमः | वसुदेवसुतं देवं कंसचाणूरमर्दनम् | देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम्",
    "aartis": [
      {
        "name": "Nirmalya Visarjana",
        "time": "05:30 AM",
        "desc": "Removal of yesterday flowers and sacred bath"
      },
      {
        "name": "Mahapooja",
        "time": "10:30 AM",
        "desc": "Paryaya Swamiji royal Tulasi worship and naivedyam"
      },
      {
        "name": "Chamara Seva",
        "time": "07:00 PM",
        "desc": "Night silver chariot and lamp illumination"
      }
    ]
  },
  {
    "id": "meenakshi_madurai",
    "name": "Meenakshi Sundareswarar Temple",
    "hindiName": "श्री मीनाक्षी सुंदरेश्वरर मंदिर मदुरै (गोपुरम व संध्या पूजा)",
    "deity": "Goddess Meenakshi (Parvati) & Sundareswarar (Shiva)",
    "category": "major",
    "location": "Madurai, Tamil Nadu, India",
    "state": "Tamil Nadu",
    "country": "India",
    "videoId": "Aicrlohuuug",
    "fallbackVideoId": "Aicrlohuuug",
    "officialTrust": "Arulmigu Meenakshi Sundareswarar Thirukoil (HR&CE)",
    "liveStreamUrl": "https://www.youtube.com/embed/Aicrlohuuug?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=Aicrlohuuug",
    "imageUrl": "https://img.youtube.com/vi/Aicrlohuuug/hqdefault.jpg",
    "icon": "🏛️",
    "coords": {
      "lat": 9.9195,
      "lng": 78.1193
    },
    "rating": "5.0 ★",
    "devoteesOnline": 11600,
    "speciality": "Architectural masterpiece of Dravidian heritage with 14 iconic Rajagopurams and Hall of 1000 Pillars",
    "mantra": "सर्वमंगल मांगल्ये शिवे सर्वार्थ साधिके | ॐ श्री मीनाक्षी देव्यै नमः",
    "aartis": [
      {
        "name": "Thiruvanandal Pooja",
        "time": "05:00 AM",
        "desc": "Early morning waking ritual"
      },
      {
        "name": "Uchikala Pooja",
        "time": "12:00 PM",
        "desc": "Midday abhishekam and garland decoration"
      },
      {
        "name": "Palliyarai Pooja",
        "time": "09:30 PM",
        "desc": "Divine night resting procession of Sundareswarar"
      }
    ]
  },
  {
    "id": "chamundeshwari_mysuru",
    "name": "Chamundeshwari Temple Mysuru",
    "hindiName": "श्री चामुंडेश्वरी देवी मंदिर मैसूर (नाडा हब्बा दर्शन)",
    "deity": "Goddess Chamundeshwari (Mahishasuramardini)",
    "category": "shaktipeeth",
    "location": "Chamundi Hills, Mysuru, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "9SBpnTrrXlw",
    "fallbackVideoId": "9SBpnTrrXlw",
    "officialTrust": "Sri Chamundeshwari Temple Management Committee",
    "liveStreamUrl": "https://www.youtube.com/embed/9SBpnTrrXlw?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=9SBpnTrrXlw",
    "imageUrl": "https://img.youtube.com/vi/9SBpnTrrXlw/hqdefault.jpg",
    "icon": "🦁",
    "coords": {
      "lat": 12.2753,
      "lng": 76.6703
    },
    "rating": "5.0 ★",
    "devoteesOnline": 8100,
    "speciality": "Presiding deity of Mysuru perched atop the picturesque Chamundi Hills, vanquisher of Mahishasura",
    "mantra": "अयि गिरिनन्दिनि नन्दितमेदिनि विश्वविनोदिनि नन्दसुते | ॐ चामुण्डायै नमः",
    "aartis": [
      {
        "name": "Pratah Pooja",
        "time": "07:30 AM",
        "desc": "Morning Panchamrutha Abhisheka"
      },
      {
        "name": "Mahamangalarathi",
        "time": "12:30 PM",
        "desc": "Midday Rajopachara Deeparadhana"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:30 PM",
        "desc": "Evening golden lamp worship"
      }
    ]
  },
  {
    "id": "pashupatinath_nepal",
    "name": "Pashupatinath Temple Kathmandu Nepal",
    "hindiName": "श्री पशुपतिनाथ मंदिर काठमांडू नेपाल (बागमती महाआरती)",
    "deity": "Lord Shiva (Pashupatinath - Lord of All Beings)",
    "category": "jyotirlinga",
    "location": "Bagmati River, Kathmandu Valley, Nepal",
    "state": "Bagmati Province",
    "country": "Nepal",
    "videoId": "bi1PDhKGUd4",
    "fallbackVideoId": "bi1PDhKGUd4",
    "officialTrust": "Pashupati Area Development Trust (PADT), Nepal",
    "liveStreamUrl": "https://www.youtube.com/embed/bi1PDhKGUd4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=bi1PDhKGUd4",
    "imageUrl": "https://img.youtube.com/vi/bi1PDhKGUd4/hqdefault.jpg",
    "icon": "🇳🇵",
    "coords": {
      "lat": 27.7104,
      "lng": 85.3487
    },
    "rating": "5.0 ★",
    "devoteesOnline": 13900,
    "speciality": "Sacred 5-faced Shiva Lingam on the sacred Bagmati river, UNESCO World Heritage site and crown jewel of Nepal",
    "mantra": "ॐ पशुपतये नमः | हर हर महादेव | नमामीशमीशान निर्वाणरूपं विभुं व्यापकं ब्रह्म वेदस्वरूपम्",
    "aartis": [
      {
        "name": "Morning Rudrabhishek",
        "time": "09:30 AM",
        "desc": "Four Bhatta priests performing sacred four-directional bath"
      },
      {
        "name": "Bagmati Ganga Maha Aarti",
        "time": "06:00 PM",
        "desc": "Evening riverbank musical deeparadhana with Vedic fire dance"
      }
    ]
  },
  {
    "id": "dwarkadhish_mandir",
    "name": "Shree Dwarkadhish Mandir (Jagat Mandir)",
    "hindiName": "श्री द्वारकाधीश मंदिर (जगत मंदिर द्वारका गुजरात)",
    "deity": "Lord Krishna (Dwarkadhish / King of Dwarka)",
    "category": "major",
    "location": "Dwarka, Devbhumi Dwarka, Gujarat, India",
    "state": "Gujarat",
    "country": "India",
    "videoId": "EuMt9vtsQSY",
    "fallbackVideoId": "EuMt9vtsQSY",
    "officialTrust": "Shree Dwarkadhish Mandir Vahivatdar Committee",
    "liveStreamUrl": "https://www.youtube.com/embed/EuMt9vtsQSY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=EuMt9vtsQSY",
    "imageUrl": "/images/temple_dwarkadhish.jpg",
    "icon": "👑",
    "coords": {
      "lat": 22.2376,
      "lng": 68.9678
    },
    "rating": "5.0 ★",
    "devoteesOnline": 16400,
    "speciality": "Sacred Char Dham Moksha Kshetra where Lord Krishna ruled his ancient Golden Kingdom of Dwarka",
    "mantra": "ॐ नमो भगवते वासुदेवाय | द्वारकाधीश की जय | कृष्णं वन्दे जगद्गुरुम्",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "06:30 AM",
        "desc": "Dawn opening of sanctum doors"
      },
      {
        "name": "Shringara Aarti",
        "time": "08:00 AM",
        "desc": "Adorning golden crown and peacock feather"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:30 PM",
        "desc": "Evening Deepotsav and flag (Dhwaja) ceremony"
      },
      {
        "name": "Shayan Aarti",
        "time": "09:30 PM",
        "desc": "Night resting ritual and closure"
      }
    ]
  },
  {
    "id": "badrinath_temple",
    "name": "Shree Badrinath Temple (Badri Vishal)",
    "hindiName": "श्री बद्रीनाथ मंदिर (श्री बद्री विशाल धाम गढ़वाल हिमालय)",
    "deity": "Lord Badrinarayan (Maha Vishnu in Meditative Posture)",
    "category": "major",
    "location": "Chamoli, Garhwal Himalayas, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "videoId": "8JgURH8-EUA",
    "fallbackVideoId": "8JgURH8-EUA",
    "officialTrust": "Shri Badrinath-Kedarnath Temple Committee (BKTC)",
    "liveStreamUrl": "https://www.youtube.com/embed/8JgURH8-EUA?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=8JgURH8-EUA",
    "imageUrl": "/images/temple_badrinath.jpg",
    "icon": "🏔️",
    "coords": {
      "lat": 30.7433,
      "lng": 79.4938
    },
    "rating": "5.0 ★",
    "devoteesOnline": 18700,
    "speciality": "Crown Char Dham sanctuary on the banks of Alaknanda River where Lord Vishnu meditated beneath the Badri tree",
    "mantra": "ॐ नमो नारायणाय | बद्री विशाल लाल की जय | शान्ताकारं भुजगशयनं पद्मनाभं सुरेशम्",
    "aartis": [
      {
        "name": "Maha Abhishek",
        "time": "04:30 AM",
        "desc": "Early morning Brahma Muhurta holy bath with Tapt Kund waters"
      },
      {
        "name": "Gitagovinda Recital",
        "time": "12:00 PM",
        "desc": "Midday Rajbhog offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "06:00 PM",
        "desc": "Evening golden lamp worship and Kapoor aarti"
      }
    ]
  },
  {
    "id": "har_ki_pauri_haridwar",
    "name": "Har Ki Pauri Maha Ganga Aarti",
    "hindiName": "हर की पौड़ी हरिद्वार (दैनिक भव्य गंगा आरती व ब्रह्मकुंड)",
    "deity": "Maa Ganga & Lord Shiva (Brahmakund Haridwar)",
    "category": "aarti",
    "location": "Haridwar, Uttarakhand, India",
    "state": "Uttarakhand",
    "country": "India",
    "videoId": "v01q0I4qSqE",
    "fallbackVideoId": "v01q0I4qSqE",
    "officialTrust": "Ganga Sabha, Har Ki Pauri, Haridwar",
    "liveStreamUrl": "https://www.youtube.com/embed/v01q0I4qSqE?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=v01q0I4qSqE",
    "imageUrl": "/images/temple_haridwar.jpg",
    "icon": "🪔",
    "coords": {
      "lat": 29.9577,
      "lng": 78.1726
    },
    "rating": "5.0 ★",
    "devoteesOnline": 21500,
    "speciality": "The historic Brahmakund at Haridwar where nectar drops (Amrit) fell during the churning of cosmic ocean",
    "mantra": "जय गंगे माता, श्री जय गंगे माता | जो नर तुमको ध्याता, मनवांछित फल पाता",
    "aartis": [
      {
        "name": "Pratah Ganga Aarti",
        "time": "06:00 AM",
        "desc": "Morning sunrise prayer on Brahmakund steps"
      },
      {
        "name": "Maha Sandhya Ganga Aarti",
        "time": "06:30 PM",
        "desc": "World-famous sunset aarti with giant flaming brass lamps"
      }
    ]
  },
  {
    "id": "srisailam_mallikarjuna",
    "name": "Sri Bhramaramba Mallikarjuna Jyotirlinga",
    "hindiName": "श्री भ्रमराम्बा मल्लिकार्जुन स्वामी (श्रीशैलम ज्योतिर्लिंग)",
    "deity": "Lord Shiva (Mallikarjuna) & Devi Bhramaramba",
    "category": "jyotirlinga",
    "location": "Srisailam, Nandyal, Andhra Pradesh, India",
    "state": "Andhra Pradesh",
    "country": "India",
    "videoId": "cE0gGQG5XnY",
    "fallbackVideoId": "cE0gGQG5XnY",
    "officialTrust": "Sri Bhramaramba Mallikarjuna Swamy Varla Devasthanam",
    "liveStreamUrl": "https://www.youtube.com/embed/cE0gGQG5XnY?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=cE0gGQG5XnY",
    "imageUrl": "https://img.youtube.com/vi/cE0gGQG5XnY/hqdefault.jpg",
    "icon": "🕉️",
    "coords": {
      "lat": 16.074,
      "lng": 78.868
    },
    "rating": "5.0 ★",
    "devoteesOnline": 11400,
    "speciality": "Sacred confluence of a Maha Jyotirlinga and an ancient Shakti Peeth on the Krishna river in Nallamala forests",
    "mantra": "श्रीशैलशृङ्गे विबुधातिसङ्गे तुङ्गाङ्गपुङ्गे मुदितासङ्गम् | नमामि मल्लिकार्जुनम्",
    "aartis": [
      {
        "name": "Suprabhata Seva",
        "time": "05:00 AM",
        "desc": "Awakening stotras of Lord Mallikarjuna"
      },
      {
        "name": "Maha Mangala Harathi",
        "time": "12:30 PM",
        "desc": "Noon floral and camphor adoration"
      },
      {
        "name": "Ekanta Seva",
        "time": "09:30 PM",
        "desc": "Night repose ceremony"
      }
    ]
  },
  {
    "id": "rameswaram_ramanatha",
    "name": "Sri Ramanathaswamy Temple Rameswaram",
    "hindiName": "श्री रामनाथस्वामी ज्योतिर्लिंग रामेश्वरम (२२ पवित्र तीर्थ)",
    "deity": "Lord Shiva (Ramanathaswamy - Consecrated by Lord Rama)",
    "category": "jyotirlinga",
    "location": "Rameswaram Island, Ramanathapuram, Tamil Nadu, India",
    "state": "Tamil Nadu",
    "country": "India",
    "videoId": "dMMNKnJzjCc",
    "fallbackVideoId": "dMMNKnJzjCc",
    "officialTrust": "Arulmigu Ramanathaswamy Temple (HR&CE)",
    "liveStreamUrl": "https://www.youtube.com/embed/dMMNKnJzjCc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=dMMNKnJzjCc",
    "imageUrl": "https://img.youtube.com/vi/dMMNKnJzjCc/hqdefault.jpg",
    "icon": "🐚",
    "coords": {
      "lat": 9.2881,
      "lng": 79.3174
    },
    "rating": "5.0 ★",
    "devoteesOnline": 13800,
    "speciality": "Southern Char Dham Jyotirlinga consecrated by Shri Rama himself, famed for the longest temple corridor in the world",
    "mantra": "सुताम्रपर्णीजलराशियोगे निबध्य सेतुं विशिखैरसंख्यैः | नमामि रामेश्वरम्",
    "aartis": [
      {
        "name": "Palliyarai Deeparadhana",
        "time": "05:00 AM",
        "desc": "Morning sanctum opening"
      },
      {
        "name": "Sayaratchai Pooja",
        "time": "06:00 PM",
        "desc": "Evening lamp worship"
      },
      {
        "name": "Arthajama Pooja",
        "time": "08:30 PM",
        "desc": "Night divine repose ritual"
      }
    ]
  },
  {
    "id": "trimbakeshwar_nashik",
    "name": "Shree Trimbakeshwar Jyotirlinga",
    "hindiName": "श्री त्र्यंबकेश्वर ज्योतिर्लिंग नासिक (गोदावरी उद्गम स्थल)",
    "deity": "Lord Shiva, Vishnu & Brahma (Trimurti Jyotirlinga)",
    "category": "jyotirlinga",
    "location": "Trimbak, Nashik, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "OdcdnGb1MzM",
    "fallbackVideoId": "OdcdnGb1MzM",
    "officialTrust": "Shree Trimbakeshwar Sansthan Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/OdcdnGb1MzM?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=OdcdnGb1MzM",
    "imageUrl": "https://img.youtube.com/vi/OdcdnGb1MzM/hqdefault.jpg",
    "icon": "⛰️",
    "coords": {
      "lat": 19.9324,
      "lng": 73.5307
    },
    "rating": "5.0 ★",
    "devoteesOnline": 15100,
    "speciality": "Unique Jyotirlinga with three faces representing Brahma, Vishnu, and Rudra, and source of Holy Godavari river",
    "mantra": "सह्याद्रिशीर्षे विमले वसन्तं गोदावरीतीरपवित्रदेशे | नमामि त्र्यम्बकेश्वरम्",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "05:30 AM",
        "desc": "Brahma Muhurta awakening and Godavari water snana"
      },
      {
        "name": "Madhyahna Pooja",
        "time": "01:00 PM",
        "desc": "Golden crown (Mukut) darshana"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening musical deepam"
      }
    ]
  },
  {
    "id": "omkareshwar_jyotirlinga",
    "name": "Shree Omkareshwar Jyotirlinga",
    "hindiName": "श्री ओंकारेश्वर ज्योतिर्लिंग (नर्मदा द्वीप • ॐ आकार पर्वत)",
    "deity": "Lord Shiva (Omkareshwara / Amaleshwara)",
    "category": "jyotirlinga",
    "location": "Mandhata Island, Khandwa, Madhya Pradesh, India",
    "state": "Madhya Pradesh",
    "country": "India",
    "videoId": "gpBomD7BoTE",
    "fallbackVideoId": "gpBomD7BoTE",
    "officialTrust": "Shri Omkareshwar Mandir Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/gpBomD7BoTE?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=gpBomD7BoTE",
    "imageUrl": "https://img.youtube.com/vi/gpBomD7BoTE/hqdefault.jpg",
    "icon": "🕉️",
    "coords": {
      "lat": 22.2464,
      "lng": 76.1517
    },
    "rating": "5.0 ★",
    "devoteesOnline": 12400,
    "speciality": "Situated on the Om-shaped island of Mandhata in holy Narmada River, revered for timeless peace and mukti",
    "mantra": "कावेरिकानर्मदयोः पवित्रे समागमे सज्जनतारणाय | नमामि ओङ्कारमधीशमीशम्",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:00 AM",
        "desc": "Early morning Narmada water abhisheka"
      },
      {
        "name": "Bhog Aarti",
        "time": "12:20 PM",
        "desc": "Midday Rajbhog offering"
      },
      {
        "name": "Shayan Aarti",
        "time": "08:30 PM",
        "desc": "Evening Chaupar game played for Lord Shiva & Parvati"
      }
    ]
  },
  {
    "id": "kolhapur_mahalakshmi",
    "name": "Shree Karveer Niwasini Ambabai (Mahalakshmi)",
    "hindiName": "श्री करवीर निवासिनी महालक्ष्मी अंबाबाई मंदिर कोल्हापुर",
    "deity": "Goddess Mahalakshmi (Ambabai)",
    "category": "shaktipeeth",
    "location": "Kolhapur, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "Moj6qIUtzR0",
    "fallbackVideoId": "Moj6qIUtzR0",
    "officialTrust": "Paschim Maharashtra Devasthan Samiti (PMDS)",
    "liveStreamUrl": "https://www.youtube.com/embed/Moj6qIUtzR0?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=Moj6qIUtzR0",
    "imageUrl": "https://img.youtube.com/vi/Moj6qIUtzR0/hqdefault.jpg",
    "icon": "🪷",
    "coords": {
      "lat": 16.6946,
      "lng": 74.2238
    },
    "rating": "5.0 ★",
    "devoteesOnline": 14700,
    "speciality": "Supreme Shaktipeeth of Mahalakshmi Ambabai where Kiranotsav (sun rays bathing the idol) occurs twice yearly",
    "mantra": "नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते | शङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "05:00 AM",
        "desc": "Dawn awakening and Milk Abhishek"
      },
      {
        "name": "Mahapooja & Alankar",
        "time": "11:30 AM",
        "desc": "Royal golden crown and jewelry adornment"
      },
      {
        "name": "Dhoop Aarti",
        "time": "08:00 PM",
        "desc": "Evening torchlight illumination"
      }
    ]
  },
  {
    "id": "bhimashankar_jyotirlinga",
    "name": "Shree Bhimashankar Jyotirlinga",
    "hindiName": "श्री भीमाशंकर ज्योतिर्लिंग (भीमा नदी उद्गम • सह्याद्रि)",
    "deity": "Lord Shiva (Bhimashankara)",
    "category": "jyotirlinga",
    "location": "Bhorgiri, Pune, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "Dl7oOCQB8Io",
    "fallbackVideoId": "Dl7oOCQB8Io",
    "officialTrust": "Shree Bhimashankar Sansthan Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/Dl7oOCQB8Io?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=Dl7oOCQB8Io",
    "imageUrl": "https://img.youtube.com/vi/Dl7oOCQB8Io/hqdefault.jpg",
    "icon": "🌿",
    "coords": {
      "lat": 19.0722,
      "lng": 73.5358
    },
    "rating": "5.0 ★",
    "devoteesOnline": 10800,
    "speciality": "Ancient Nagara shrine situated in the verdant Sahyadri wildlife sanctuary where the Bhima river originates",
    "mantra": "यं डाकिनीशाकिनिकासमाजे निषेव्यमाणं पिशिताशनैश्च | नमामि भीमेश्वरमीशरूपम्",
    "aartis": [
      {
        "name": "Kakad Aarti",
        "time": "04:30 AM",
        "desc": "Morning mountain mist awakening"
      },
      {
        "name": "Maha Rudrabhishekam",
        "time": "07:30 AM",
        "desc": "Vedic chants and bilva leaf offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:30 PM",
        "desc": "Evening lamp ceremony"
      }
    ]
  },
  {
    "id": "grishneshwar_jyotirlinga",
    "name": "Shree Grishneshwar Jyotirlinga (12th Jyotirlinga)",
    "hindiName": "श्री घृष्णेश्वर ज्योतिर्लिंग (द्वादश ज्योतिर्लिंग • एलोरा)",
    "deity": "Lord Shiva (Ghushmeshwara / Grishneshwar)",
    "category": "jyotirlinga",
    "location": "Verul (Ellora), Chhatrapati Sambhajinagar, Maharashtra, India",
    "state": "Maharashtra",
    "country": "India",
    "videoId": "PTCrORkDhdc",
    "fallbackVideoId": "PTCrORkDhdc",
    "officialTrust": "Shree Grishneshwar Temple Trust, Verul",
    "liveStreamUrl": "https://www.youtube.com/embed/PTCrORkDhdc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=PTCrORkDhdc",
    "imageUrl": "https://img.youtube.com/vi/PTCrORkDhdc/hqdefault.jpg",
    "icon": "🛕",
    "coords": {
      "lat": 20.0249,
      "lng": 75.171
    },
    "rating": "5.0 ★",
    "devoteesOnline": 9900,
    "speciality": "The 12th and final Jyotirlinga of Bharat, rebuilt by Queen Ahilyabai Holkar in red basalt stone beside Ellora Caves",
    "mantra": "इलापुरे रम्यविशालकेऽस्मिन् समुल्लसन्तं च जगद्वरेण्यम् | नमामि घृष्णेश्वरमाशुतोषम्",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:30 AM",
        "desc": "Morning red stone sanctum worship"
      },
      {
        "name": "Bhog Aarti",
        "time": "12:00 PM",
        "desc": "Noon naivedyam offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "08:00 PM",
        "desc": "Night deeparadhana"
      }
    ]
  },
  {
    "id": "baidyanath_deoghar",
    "name": "Shree Baidyanath Jyotirlinga Dham",
    "hindiName": "श्री बैद्यनाथ ज्योतिर्लिंग धाम देवघर (मनोकामना लिंग)",
    "deity": "Lord Shiva (Baidyanath / Kamana Linga)",
    "category": "jyotirlinga",
    "location": "Deoghar, Santhal Pargana, Jharkhand, India",
    "state": "Jharkhand",
    "country": "India",
    "videoId": "QJLJDfJPQsA",
    "fallbackVideoId": "QJLJDfJPQsA",
    "officialTrust": "Baba Baidyanath Dham Temple Trust, Deoghar",
    "liveStreamUrl": "https://www.youtube.com/embed/QJLJDfJPQsA?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=QJLJDfJPQsA",
    "imageUrl": "https://img.youtube.com/vi/QJLJDfJPQsA/hqdefault.jpg",
    "icon": "🐍",
    "coords": {
      "lat": 24.4927,
      "lng": 86.7001
    },
    "rating": "5.0 ★",
    "devoteesOnline": 17200,
    "speciality": "Wish-fulfilling Jyotirlinga where Ravana sacrificed ten heads to Shiva; world-famous for Shravani Mela Kanwar Yatra",
    "mantra": "पूर्वोत्तरे प्रज्वलिकानिधाने सदा वसन्तं गिरिजासमेतम् | नमामि वैद्यनाथम्",
    "aartis": [
      {
        "name": "Kacha Jal Abhishekam",
        "time": "04:00 AM",
        "desc": "Dawn raw Ganga water offerings by pandas"
      },
      {
        "name": "Shringara Aarti",
        "time": "07:30 PM",
        "desc": "Evening floral snake and sandalwood shringara"
      }
    ]
  },
  {
    "id": "nageshwar_jyotirlinga",
    "name": "Shree Nageshwar Jyotirlinga",
    "hindiName": "श्री नागेश्वर ज्योतिर्लिंग (दारुकावन • गुजरात)",
    "deity": "Lord Shiva (Nageshwara / Lord of Serpents)",
    "category": "jyotirlinga",
    "location": "Darukavanam, Dwarka, Gujarat, India",
    "state": "Gujarat",
    "country": "India",
    "videoId": "SaoR3RAtKbk",
    "fallbackVideoId": "SaoR3RAtKbk",
    "officialTrust": "Shree Nageshwar Jyotirlinga Trust",
    "liveStreamUrl": "https://www.youtube.com/embed/SaoR3RAtKbk?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=SaoR3RAtKbk",
    "imageUrl": "https://img.youtube.com/vi/SaoR3RAtKbk/hqdefault.jpg",
    "icon": "🔱",
    "coords": {
      "lat": 22.3344,
      "lng": 69.0558
    },
    "rating": "5.0 ★",
    "devoteesOnline": 8900,
    "speciality": "Ancient Darukavanam shrine featuring an awe-inspiring 85-foot giant meditative statue of Lord Shiva",
    "mantra": "याम्ये सदङ्गे नगरेऽतिरम्ये विभूषिताङ्गं विविधैश्च भोगैः | नमामि नागेश्वरमेकनाथम्",
    "aartis": [
      {
        "name": "Pratah Aarti",
        "time": "06:00 AM",
        "desc": "Morning Panchamrutha worship"
      },
      {
        "name": "Madhyahna Aarti",
        "time": "12:30 PM",
        "desc": "Midday Rajbhog"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening camphor aarti"
      }
    ]
  },
  {
    "id": "banke_bihari_vrindavan",
    "name": "Shree Banke Bihari Mandir Vrindavan",
    "hindiName": "श्री बांके बिहारी मंदिर वृन्दावन (दिव्य झांकी व चरण दर्शन)",
    "deity": "Lord Krishna (Banke Bihari - Tribhanga Posture)",
    "category": "major",
    "location": "Vrindavan, Mathura, Uttar Pradesh, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "GOXlKz5tySg",
    "fallbackVideoId": "GOXlKz5tySg",
    "officialTrust": "Shree Banke Bihari Ji Mandir Trust, Vrindavan",
    "liveStreamUrl": "https://www.youtube.com/embed/GOXlKz5tySg?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=GOXlKz5tySg",
    "imageUrl": "https://img.youtube.com/vi/GOXlKz5tySg/hqdefault.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 27.5815,
      "lng": 77.7011
    },
    "rating": "5.0 ★",
    "devoteesOnline": 23400,
    "speciality": "Manifested by Swami Haridas in Nidhivan; revered for curtain-pulling Jhaanki darshan so devotees are not enchanted away",
    "mantra": "श्री बांके बिहारी लाल की जय | राधे राधे | निकुंज नायक बांके बिहारी",
    "aartis": [
      {
        "name": "Shringar Jhaanki",
        "time": "07:45 AM",
        "desc": "Morning curtain opening"
      },
      {
        "name": "Rajbhog Aarti",
        "time": "11:55 AM",
        "desc": "Midday sweet butter offering"
      },
      {
        "name": "Sandhya Aarti",
        "time": "09:25 PM",
        "desc": "Night final blessing"
      }
    ]
  },
  {
    "id": "radha_rani_barsana",
    "name": "Shree Radha Rani Mandir (Shriji Mandir Barsana)",
    "hindiName": "श्री राधा रानी मंदिर बरसाना (श्रीजी मंदिर भानुगढ़ पर्वत)",
    "deity": "Shri Radha Rani (Shriji / Vrishabhanu Nandini)",
    "category": "major",
    "location": "Bhanugarh Hill, Barsana, Mathura, UP, India",
    "state": "Uttar Pradesh",
    "country": "India",
    "videoId": "mK2k8d2-ctM",
    "fallbackVideoId": "mK2k8d2-ctM",
    "officialTrust": "Shriji Mandir Management Committee, Barsana",
    "liveStreamUrl": "https://www.youtube.com/embed/mK2k8d2-ctM?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=mK2k8d2-ctM",
    "imageUrl": "https://img.youtube.com/vi/mK2k8d2-ctM/hqdefault.jpg",
    "icon": "🌸",
    "coords": {
      "lat": 27.6477,
      "lng": 77.3756
    },
    "rating": "5.0 ★",
    "devoteesOnline": 12900,
    "speciality": "Birthplace palace of Shri Radha Rani atop Bhanugarh peak, center of world-famous Lathmar Holi",
    "mantra": "राधे राधे जपो चले आएंगे बिहारी | श्री वृषभानु नंदिनी की जय",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:00 AM",
        "desc": "Dawn waking of Shriji"
      },
      {
        "name": "Shringar Aarti",
        "time": "08:30 AM",
        "desc": "Floral ornament adornment"
      },
      {
        "name": "Sandhya Aarti",
        "time": "07:00 PM",
        "desc": "Evening golden lamp worship"
      }
    ]
  },
  {
    "id": "govind_devji_jaipur",
    "name": "Shree Govind Dev Ji Temple Jaipur",
    "hindiName": "श्री गोविंद देव जी मंदिर जयपुर (राजसी झांकी व आरती)",
    "deity": "Lord Krishna (Govind Dev Ji)",
    "category": "major",
    "location": "City Palace Complex, Jaipur, Rajasthan, India",
    "state": "Rajasthan",
    "country": "India",
    "videoId": "lvQT0WGp5Lk",
    "fallbackVideoId": "lvQT0WGp5Lk",
    "officialTrust": "Shree Govind Dev Ji Temple Trust, Jaipur",
    "liveStreamUrl": "https://www.youtube.com/embed/lvQT0WGp5Lk?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=lvQT0WGp5Lk",
    "imageUrl": "https://img.youtube.com/vi/lvQT0WGp5Lk/hqdefault.jpg",
    "icon": "🪷",
    "coords": {
      "lat": 26.9268,
      "lng": 75.8267
    },
    "rating": "5.0 ★",
    "devoteesOnline": 16100,
    "speciality": "Original idol sculpted by Krishna grandson Bajranabh depicting the exact facial likeness of Lord Krishna",
    "mantra": "जय जय श्री गोविन्द देव जी | ॐ क्लीं कृष्णाय गोविंदाय गोपीजनवल्लभाय नमः",
    "aartis": [
      {
        "name": "Mangala Aarti",
        "time": "05:00 AM",
        "desc": "Dawn opening of royal gates"
      },
      {
        "name": "Dhoop Aarti",
        "time": "07:30 AM",
        "desc": "Morning fragrant incense worship"
      },
      {
        "name": "Rajbhog Aarti",
        "time": "11:15 AM",
        "desc": "Royal 56-bhog feast"
      },
      {
        "name": "Sandhya Aarti",
        "time": "06:30 PM",
        "desc": "Evening courtly deepam"
      }
    ]
  },
  {
    "id": "kukke_subramanya",
    "name": "Sri Kukke Subramanya Temple",
    "hindiName": "श्री कुक्के सुब्रह्मण्य स्वामी मंदिर (सर्प दोष निवारण तीर्थ)",
    "deity": "Lord Subramanya (Kartikeya / Shanmukha / King of Serpents)",
    "category": "major",
    "location": "Subramanya, Dakshina Kannada, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "hvdWNsZ7nlU",
    "fallbackVideoId": "hvdWNsZ7nlU",
    "officialTrust": "Sri Kukke Subramanya Temple (HR&CE Karnataka)",
    "liveStreamUrl": "https://www.youtube.com/embed/hvdWNsZ7nlU?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=hvdWNsZ7nlU",
    "imageUrl": "https://img.youtube.com/vi/hvdWNsZ7nlU/hqdefault.jpg",
    "icon": "🦚",
    "coords": {
      "lat": 12.6631,
      "lng": 75.615
    },
    "rating": "5.0 ★",
    "devoteesOnline": 11100,
    "speciality": "Sacred foothills of Kumara Parvatha where Lord Kartikeya gave sanctuary to King Vasuki and all serpents",
    "mantra": "ॐ षण्मुखाय नमः | ॐ स्कन्दाय नमः | सुब्रह्मण्याय नमः",
    "aartis": [
      {
        "name": "Ushakala Pooja",
        "time": "06:00 AM",
        "desc": "Dawn abhishekam with holy Kumaradhara river water"
      },
      {
        "name": "Madhyahna Mahapooja",
        "time": "12:00 PM",
        "desc": "Noon Sarpa Samskara and Maha Mangalarathi"
      },
      {
        "name": "Nisha Pooja",
        "time": "07:30 PM",
        "desc": "Night floral illumination"
      }
    ]
  },
  {
    "id": "dharmasthala_manjunatha",
    "name": "Sri Kshetra Dharmasthala Manjunatha Swamy",
    "hindiName": "श्री क्षेत्र धर्मस्थल मंजुनाथ स्वामी (धर्म व अन्नदान क्षेत्र)",
    "deity": "Lord Manjunatha (Shiva) & Dharma Daivas",
    "category": "major",
    "location": "Dharmasthala, Belthangady, Dakshina Kannada, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "yK6PJU8qBU4",
    "fallbackVideoId": "yK6PJU8qBU4",
    "officialTrust": "Sri Kshetra Dharmasthala Rural Development Project (SKDRDP)",
    "liveStreamUrl": "https://www.youtube.com/embed/yK6PJU8qBU4?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=yK6PJU8qBU4",
    "imageUrl": "https://img.youtube.com/vi/yK6PJU8qBU4/hqdefault.jpg",
    "icon": "🕯️",
    "coords": {
      "lat": 12.9554,
      "lng": 75.3789
    },
    "rating": "5.0 ★",
    "devoteesOnline": 14500,
    "speciality": "Unrivaled 800-year seat of righteous Dharma, Abhayadana (protection), and daily Annadana feeding over 30,000 pilgrims",
    "mantra": "ॐ नमः शिवाय | श्री मंजुनाथाय नमः | सत्यं शिवं सुन्दरम्",
    "aartis": [
      {
        "name": "Pratah Kaala Pooja",
        "time": "06:30 AM",
        "desc": "Morning holy bathing and Bilvarchana"
      },
      {
        "name": "Mahapooja",
        "time": "12:30 PM",
        "desc": "Noon Grand Annadana blessing & Deeparadhana"
      },
      {
        "name": "Rathotsava & Maha Aarti",
        "time": "07:30 PM",
        "desc": "Evening temple lamp lighting"
      }
    ]
  },
  {
    "id": "sringeri_sharada",
    "name": "Sri Sringeri Sharada Peetham",
    "hindiName": "श्री शृंगेरी शारदा पीठम (आदि शंकराचार्य दक्षिणाम्नाय पीठ)",
    "deity": "Goddess Sharadamba & Sri Chandramouleshwara",
    "category": "major",
    "location": "Sringeri, Chikkamagaluru, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "DjvDwf97Wzc",
    "fallbackVideoId": "DjvDwf97Wzc",
    "officialTrust": "Dakshinamnaya Sri Sharada Peetham, Sringeri",
    "liveStreamUrl": "https://www.youtube.com/embed/DjvDwf97Wzc?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=DjvDwf97Wzc",
    "imageUrl": "https://img.youtube.com/vi/DjvDwf97Wzc/hqdefault.jpg",
    "icon": "📖",
    "coords": {
      "lat": 13.4192,
      "lng": 75.2536
    },
    "rating": "5.0 ★",
    "devoteesOnline": 9200,
    "speciality": "First Amnaya Peetham founded by Adi Shankaracharya in the 8th century CE on the tranquil banks of Tunga River",
    "mantra": "नमस्ते शारदे देवि काश्मीरपुरवासिनि | त्वामहं प्रार्थये नित्यं विद्यादानं च देहि मे",
    "aartis": [
      {
        "name": "Pratah Pooja",
        "time": "08:00 AM",
        "desc": "Morning Tunga river water abhishekam"
      },
      {
        "name": "Maha Mangalarathi",
        "time": "12:00 PM",
        "desc": "Noon Sharadamba floral adorning"
      },
      {
        "name": "Chandramouleshwara Pooja",
        "time": "08:30 PM",
        "desc": "Night Sphatika Linga puja by Jagadguru Shankaracharya"
      }
    ]
  },
  {
    "id": "murudeshwar_temple",
    "name": "Murudeshwara Coastal Temple & Shiva Statue",
    "hindiName": "श्री मुरुडेश्वर मंदिर व विशाल शिव प्रतिमा (कंदुका गिरि)",
    "deity": "Lord Shiva (Murudeshwara - Atma Linga Kshetra)",
    "category": "major",
    "location": "Murudeshwar, Bhatkal, Uttara Kannada, Karnataka, India",
    "state": "Karnataka",
    "country": "India",
    "videoId": "ad1I46Ct648",
    "fallbackVideoId": "ad1I46Ct648",
    "officialTrust": "Murudeshwar Temple Trust (R.N. Shetty Trust)",
    "liveStreamUrl": "https://www.youtube.com/embed/ad1I46Ct648?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=ad1I46Ct648",
    "imageUrl": "https://img.youtube.com/vi/ad1I46Ct648/hqdefault.jpg",
    "icon": "🌊",
    "coords": {
      "lat": 14.0944,
      "lng": 74.4847
    },
    "rating": "5.0 ★",
    "devoteesOnline": 13100,
    "speciality": "Colossal 123-foot world-famous statue of Lord Shiva on Kanduka Hill surrounded on 3 sides by the Arabian Sea",
    "mantra": "ॐ नमः शिवाय | ॐ मुरुडेश्वराय नमः | कर्पूरगौरं करुणावतारं संसारसारम्",
    "aartis": [
      {
        "name": "Morning Abhisheka",
        "time": "06:30 AM",
        "desc": "Atma Linga sacred water bath"
      },
      {
        "name": "Maha Mangalarathi",
        "time": "12:15 PM",
        "desc": "Midday Rajopachara Deeparadhana"
      },
      {
        "name": "Sunset Sea Aarti",
        "time": "07:00 PM",
        "desc": "Evening ocean-side camphor deepam"
      }
    ]
  },
  {
    "id": "guruvayur_temple",
    "name": "Guruvayur Sri Krishna Temple",
    "hindiName": "गुरुवायूर श्री कृष्ण मंदिर केरल (भूलोक वैकुंठ दर्शन)",
    "deity": "Lord Guruvayurappan (Unnikrishnan / Bala Vishnu)",
    "category": "major",
    "location": "Guruvayur, Thrissur, Kerala, India",
    "state": "Kerala",
    "country": "India",
    "videoId": "5oHwdfJC2wk",
    "fallbackVideoId": "5oHwdfJC2wk",
    "officialTrust": "Guruvayur Devaswom Board, Kerala",
    "liveStreamUrl": "https://www.youtube.com/embed/5oHwdfJC2wk?autoplay=1&mute=0&controls=1&rel=0&modestbranding=1",
    "directYoutubeUrl": "https://www.youtube.com/watch?v=5oHwdfJC2wk",
    "imageUrl": "https://img.youtube.com/vi/5oHwdfJC2wk/hqdefault.jpg",
    "icon": "🪷",
    "coords": {
      "lat": 10.5947,
      "lng": 76.0384
    },
    "rating": "5.0 ★",
    "devoteesOnline": 18400,
    "speciality": "Bhuloka Vaikuntha where Lord Krishna worshipped by Brahma himself was consecrated by Guru & Vayu in pure Kerala style",
    "mantra": "ॐ नमो भगवते वासुदेवाय | गुरुवायूरप्पा शरणम् | हरे कृष्ण हरे कृष्ण कृष्ण कृष्ण हरे हरे",
    "aartis": [
      {
        "name": "Nirmalya Darshanam",
        "time": "03:00 AM",
        "desc": "First auspicious viewing with yesterday sandalwood paste"
      },
      {
        "name": "Ucha Pooja",
        "time": "12:00 PM",
        "desc": "Midday royal feast & elephant procession"
      },
      {
        "name": "Deeparadhana",
        "time": "06:30 PM",
        "desc": "Illumination of thousands of oil lamps on Vilakkumadam"
      },
      {
        "name": "Thrippuka",
        "time": "09:00 PM",
        "desc": "Night fragrant herbal incense smoke offering"
      }
    ]
  }
];

if (typeof window !== "undefined") { window.GLOBAL_TEMPLES_LIVE = GLOBAL_TEMPLES_LIVE; }
