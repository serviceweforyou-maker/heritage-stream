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
    image: "/images/dharma.jpg",
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
    image: "/images/chola.jpg",
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
    image: "/images/warrior_cover.jpg",
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
    image: "/images/shiva.jpg",
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
    image: "/images/shiva.jpg",
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
    image: "/images/shiva.jpg",
    era: "8th Century CE",
    architect: "Adi Shankaracharya"
  }
];