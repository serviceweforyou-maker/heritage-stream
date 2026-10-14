const fs = require('fs');
const path = require('path');

const newFreeVideos = [
  {
    id: "free_kukke_subrahmanya_naga",
    title: "Why Devotees Visit Kukke Subrahmanya for Naga Dosha",
    category: "Unknown Knowledge",
    tagline: "Kukke Subrahmanya Secrets, Sarpa Samskara & Cosmic Naga Healing",
    description: "Uncover the profound spiritual and cosmic reasons why millions journey to Kukke Subrahmanya in Karnataka. Discover the ancient history of Sarpa Samskara, Ashlesha Bali, and how sacred Naga mantras heal karmic ancestral burdens.",
    duration: "10 Mins",
    rating: "9.9 ★",
    year: "2026",
    isPremium: false,
    imageUrl: "/images/thumb_kukke_subrahmanya_naga.jpg",
    videoUrl: "https://www.youtube.com/embed/YYoyN70R4wM",
    narrator: "Spiritual Stories Scholars",
    content: [
      { title: "Episode 1: The Divine Haven of Kumara & Vasuki", text: "Lord Subrahmanya blessed Vasuki, the king of serpents, granting eternal refuge and sanctuary in the sacred Sahyadri mountain ranges.", visual: "🔱", duration: "03:20" },
      { title: "Episode 2: The Cosmic Science of Naga Dosha", text: "Understanding the astrological alignments and karmic implications of Sarpa Dosha according to Vedic Jyotisha texts.", visual: "🐍", duration: "03:40" },
      { title: "Episode 3: Rituals of Healing & Liberation", text: "How Ashlesha Bali and Sarpa Samskara ceremonies performed on the Kumaradhara river banks liberate lineages from affliction.", visual: "✨", duration: "03:00" }
    ]
  },
  {
    id: "free_krishna_kamsa_divine_power",
    title: "Kamsa Never Expected This! Krishna's Divine Power",
    category: "God Series",
    tagline: "The Fall of Mathura’s Tyrant & The Roar of Divine Justice",
    description: "Relive the climactic cosmic confrontation in Mathura where King Kamsa attempted every dark illusion, only to witness the supreme avataric majesty of Bhagavan Sree Krishna breaking demonic tyranny forever.",
    duration: "12 Mins",
    rating: "9.9 ★",
    year: "2026",
    isPremium: false,
    imageUrl: "/images/thumb_krishna_kamsa_power.jpg",
    videoUrl: "https://www.youtube.com/embed/Q6swyqerUDY",
    narrator: "Spiritual Stories Scholars",
    content: [
      { title: "Episode 1: The Gathering Storm in Mathura", text: "King Kamsa lays his deadly arena traps, unsuspecting of the cosmic divinity stepping into his court.", visual: "⚡", duration: "04:10" },
      { title: "Episode 2: The Shattering of Dhanush & Champions", text: "Kuvalayapida elephant and Chanura fall before the effortless grace of young Krishna and Balarama.", visual: "🐘", duration: "04:00" },
      { title: "Episode 3: The Liberation of King Kamsa", text: "Krishna pulls Kamsa from his high throne, freeing the realm from tyranny and fulfilling the cosmic prophecy.", visual: "👑", duration: "03:50" }
    ]
  },
  {
    id: "free_veerabhadra_birth_shiva",
    title: "How Veerabhadra Was Born! The Terrifying Power of Shiva",
    category: "God Series",
    tagline: "Rudra Tandava, Sati’s Sacrifice & The Unleashing of Shiva’s Wrath",
    description: "When Goddess Sati self-immolated at King Daksha’s arrogant sacrifice, Mahadeva tore a lock of his matted hair and slammed it upon Mount Kailasa. Witness the birth of Veerabhadra, the fiercest personification of cosmic justice.",
    duration: "15 Mins",
    rating: "9.9 ★",
    year: "2026",
    isPremium: false,
    imageUrl: "/images/thumb_veerabhadra_birth_shiva.jpg",
    videoUrl: "https://www.youtube.com/embed/v-MMqeuvzy0",
    narrator: "Spiritual Stories Scholars",
    content: [
      { title: "Episode 1: The Arrogance of King Daksha", text: "Daksha excludes Lord Shiva from the grand sacrificial arena, provoking the heartbreaking sacrifice of Goddess Sati.", visual: "🔥", duration: "05:00" },
      { title: "Episode 2: The Cosmic Fury on Mount Kailasa", text: "Mahadeva strikes the mountain peaks with his fiery matted hair, manifesting the thousand-armed warrior Veerabhadra.", visual: "🔱", duration: "05:15" },
      { title: "Episode 3: Destruction of Yajna & Restoration", text: "Veerabhadra dissolves the false ego of the assembly, followed by Shiva bestowing the goat-head upon repentant Daksha.", visual: "✨", duration: "04:45" }
    ]
  },
  {
    id: "free_krishna_breaks_ego_garuda_sudarshana",
    title: "Krishna Breaks the Ego of Sudarshana, Garuda & Sathyabhama",
    category: "Audiobooks & Legends",
    tagline: "The Divine Lesson of Humility Masterminded by Sree Krishna & Hanuman",
    description: "When pride crept into the minds of celestial eagle Garuda, the invincible Sudarshana Chakra, and Queen Sathyabhama, Lord Krishna orchestrated an ingenious divine play invoking Lord Hanuman to teach eternal humility.",
    duration: "18 Mins",
    rating: "9.8 ★",
    year: "2026",
    isPremium: false,
    imageUrl: "/images/thumb_krishna_sudarshana_garuda.jpg",
    videoUrl: "https://www.youtube.com/embed/T_PTFzz_cPI",
    narrator: "Spiritual Stories Scholars",
    content: [
      { title: "Episode 1: The Threefold Pride in Dwarka", text: "Garuda’s pride in speed, Sudarshana’s pride in power, and Sathyabhama’s pride in beauty attract the subtle remedy of Krishna.", visual: "🦚", duration: "06:00" },
      { title: "Episode 2: The Messenger Summoning Mahavira Hanuman", text: "Garuda is humbled by Hanuman’s effortless flight, and Sudarshana is caught like a child's toy under Hanuman’s tongue.", visual: "🦅", duration: "06:10" },
      { title: "Episode 3: The True Darshana of Sita-Rama", text: "Hanuman bows only before Sita and Rama, revealing that external glamour fades before pure selfless devotion.", visual: "🕉️", duration: "05:50" }
    ]
  },
  {
    id: "free_krishna_ranchor_war_wisdom",
    title: "Why Lord Krishna Ran Away from Battlefield: Mystery of Ranchor",
    category: "Unknown Knowledge",
    tagline: "Strategic Retreat vs Cowardice: The Timeless Military Genius of Krishna",
    description: "Why did the master of the universe flee from Jarasandha to earn the epithet Ranchor Rai? Discover the profound psychological and geopolitical strategy of tactical retreat that laid the foundation for the golden city of Dwarka.",
    duration: "14 Mins",
    rating: "9.9 ★",
    year: "2026",
    isPremium: false,
    imageUrl: "/images/thumb_krishna_ranchor_wisdom.jpg",
    videoUrl: "https://www.youtube.com/embed/c_mkFIrgUEU",
    narrator: "Spiritual Stories Scholars",
    content: [
      { title: "Episode 1: Jarasandha’s Seventeen Invasions", text: "Krishna spared Jarasandha repeatedly to systematically eliminate the tyrannical kings of the earth who gathered in his armies.", visual: "⚔️", duration: "04:30" },
      { title: "Episode 2: The Strategic Withdrawal from Mathura", text: "Choosing peace and preservation for the citizens of Mathura over personal martial ego and vanity.", visual: "🏃", duration: "05:00" },
      { title: "Episode 3: The Golden Fortress of Dwarka", text: "Building an impregnable island empire in Gujarat that transformed the economic and spiritual destiny of ancient India.", visual: "🏛️", duration: "04:30" }
    ]
  },
  {
    id: "free_shiva_sharabha_narasimha",
    title: "Sharabha Avatar of Shiva: Restoring Cosmic Peace",
    category: "God Series",
    tagline: "The Eight-Legged Beast-Bird Avatar Restoring Universal Equilibrium",
    description: "After slaying Hiranyakashipu, the divine fury of Lord Narasimha threatened to burn the three worlds. Discover how Mahadeva manifested as Sharabha, an awe-inspiring entity harmonizing Vaishnava and Shaiva cosmic forces.",
    duration: "16 Mins",
    rating: "9.8 ★",
    year: "2026",
    isPremium: false,
    imageUrl: "/images/thumb_shiva_sharabha_avatar.jpg",
    videoUrl: "https://www.youtube.com/embed/cIbVzdguHfw",
    narrator: "Spiritual Stories Scholars",
    content: [
      { title: "Episode 1: The Unquenched Fury of Narasimha", text: "The universe trembles as the man-lion avatar continues his cosmic roar after the defeat of demon Hiranyakashipu.", visual: "🦁", duration: "05:15" },
      { title: "Episode 2: Manifestation of the Eight-Legged Sharabha", text: "Lord Shiva assumes the magnificent avian-feline form with wings of lightning to embrace and pacify Narasimha.", visual: "🦅", duration: "05:30" },
      { title: "Episode 3: The Synthesis of Supreme Divine Energies", text: "Narasimha sheds his ferocious body and honors Sharabha, proving that Vishnu and Shiva are two facets of one supreme reality.", visual: "✨", duration: "05:15" }
    ]
  },
  {
    id: "free_hanuman_saturday_blessings",
    title: "Why Saturdays Belong to Lord Hanuman: Shielding from Shani's Gaze",
    category: "Unknown Knowledge",
    tagline: "The Ancient Puranic Pact Between Lord Hanuman and Shani Dev",
    description: "Discover why Saturday devotion to Lord Hanuman dissolves the harshest planetary influences of Sade Sati and Shani Dosha. Understand the sacred vow made by Lord Shani when Hanuman rescued him from Ravana’s Lanka.",
    duration: "12 Mins",
    rating: "9.9 ★",
    year: "2026",
    isPremium: false,
    imageUrl: "/images/thumb_hanuman_saturday_blessings.jpg",
    videoUrl: "https://www.youtube.com/embed/fsE2aPGsphs",
    narrator: "Spiritual Stories Scholars",
    content: [
      { title: "Episode 1: Ravana's Imprisonment of the Navagrahas", text: "In Lanka, the proud demon king imprisoned the nine planetary deities face-down under his throne.", visual: "🪐", duration: "04:00" },
      { title: "Episode 2: The Rescue by Mahavira Hanuman", text: "During the burning of Lanka, Hanuman breaks the shackles holding Shani Dev and the planets in captivity.", visual: "🔥", duration: "04:15" },
      { title: "Episode 3: The Eternal Saturday Protection Pledge", text: "Shani Dev vows never to harm or torment any devotee who sincerely chants the Hanuman Chalisa on Saturdays.", visual: "📿", duration: "03:45" }
    ]
  },
  {
    id: "free_abhimanyu_chakravyuha_defeat",
    title: "5 Secrets About Why Abhimanyu Was Defeated in Chakravyuha",
    category: "Docu-Series",
    tagline: "The Incomplete Secret Heard in Subhadra’s Womb & Kaurava Betrayal",
    description: "The 16-year-old warrior son of Arjuna breached the impenetrable Chakravyuha alone. Analyze the five hidden factors, planetary curses, and warrior code violations that sealed Abhimanyu’s immortal martyrdom on Kurukshetra.",
    duration: "20 Mins",
    rating: "9.9 ★",
    year: "2026",
    isPremium: false,
    imageUrl: "/images/thumb_abhimanyu_chakravyuha_mystery.jpg",
    videoUrl: "https://www.youtube.com/embed/weiIRMU0mws",
    narrator: "Spiritual Stories Scholars",
    content: [
      { title: "Episode 1: The Womb Knowledge of Subhadra", text: "Arjuna described the formation to pregnant Subhadra, but she fell asleep before the technique of exit was revealed.", visual: "🌀", duration: "06:30" },
      { title: "Episode 2: Jayadratha’s Boon Blocking the Pandavas", text: "Lord Shiva’s single-day boon granted Jayadratha the power to hold back Bheema, Nakula, and Sahadeva at the entrance.", visual: "🛡️", duration: "07:00" },
      { title: "Episode 3: The Violation of Kurukshetra War Code", text: "Six maharathis simultaneously assault the weaponless youth, triggering Krishna’s pledge to bring swift divine retribution.", visual: "⚔️", duration: "06:30" }
    ]
  },
  {
    id: "free_hanuman_bheema_kadali_vana",
    title: "How Hanuman Taught a Lesson of Humility to Bheema in Kadali Vana",
    category: "Audiobooks & Legends",
    tagline: "The Encounter of Two Sons of Vayu: Strength Transcended by Devotion",
    description: "While searching for celestial Saugandhika flowers, Bheema encountered an aged monkey blocking his forest path who couldn’t move his tail. Witness the unforgettable moment Bheema realized the monkey was his own elder brother, Mahavira Hanuman.",
    duration: "15 Mins",
    rating: "9.9 ★",
    year: "2026",
    isPremium: false,
    imageUrl: "/images/thumb_hanuman_bheema_humility.jpg",
    videoUrl: "https://www.youtube.com/embed/OVyne2z2uUA",
    narrator: "Spiritual Stories Scholars",
    content: [
      { title: "Episode 1: The Quest for the Saugandhika Flower", text: "Draupadi’s longing sends the proud warrior Bheema on a solo expedition deep into the mystical Gandhamadana mountain range.", visual: "🌸", duration: "05:00" },
      { title: "Episode 2: The Obstacle of the Aged Monkey’s Tail", text: "Bheema commands the frail monkey to move, but finds himself completely unable to budge even the tip of its tail.", visual: "🐒", duration: "05:15" },
      { title: "Episode 3: The Embrace of the Sons of Wind", text: "Hanuman reveals his colossal Vishwaroopa form, blessing Bheema with invincible strength and victory in the impending war.", visual: "✨", duration: "04:45" }
    ]
  }
];

const rootDir = path.resolve(__dirname, '..');

// 1. UPDATE db.json and public/db.json
['db.json', 'public/db.json'].forEach(relPath => {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  const db = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  let content = db.content || [];
  const newIds = new Set(newFreeVideos.map(v => v.id));
  content = content.filter(item => !newIds.has(item.id));
  content.unshift(...newFreeVideos);
  db.content = content;
  fs.writeFileSync(filePath, JSON.stringify(db, null, 2), 'utf8');
  console.log(`[DB] Updated ${relPath}: Total items = ${content.length}`);
});

// 2. UPDATE data.js and public/data.js
['data.js', 'public/data.js'].forEach(relPath => {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) {
    console.warn(`File not found: ${filePath}`);
    return;
  }
  let code = fs.readFileSync(filePath, 'utf8');
  const marker = '"content": [';
  const pos = code.indexOf(marker);
  if (pos !== -1) {
    const itemsStr = newFreeVideos.map(v => JSON.stringify(v, null, 4)).join(',\n    ');
    const insertPos = pos + marker.length;
    code = code.slice(0, insertPos) + '\n    ' + itemsStr + ',' + code.slice(insertPos);
    fs.writeFileSync(filePath, code, 'utf8');
    console.log(`[DATA] Updated ${relPath} successfully.`);
  } else {
    console.error(`Marker not found in ${relPath}`);
  }
});

console.log('Done injecting 9 free showcase videos!');
