import { AYURVEDA_REMEDIES, GUIDED_PRANAYAMA, MONTHS_LUNAR, TITHIS, NAKSHATRAS, DEITIES, KARNATAKA_TEMPLES } from "./divya-data.js?v=18";
import heritageData from './data.js?v=18';
import { TriviaGame, ChronologyGame, MemoryGame } from './games.js?v=18';

// Base URL pointing to the backend. Automatically uses relative path on localhost.
// Replace the Render URL with your live deployed Render backend service URL.
export const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' ? '' : 'https://heritage-stream.onrender.com';

// ==========================================
// BACKEND & DATABASE INTEGRATION SERVICE
// ==========================================
export class DatabaseService {
  static async fetchContent() {
    let raw;
    try {
      const res = await fetch(API_BASE + '/api/content');
      if (!res.ok) throw new Error("API content fetch error");
      raw = await res.json();
    } catch (err) {
      console.warn("API load failed, using local database backup", err);
      const module = await import('./data.js?v=18');
      raw = module.default;
    }

    // Normalize schema to support both flat fallback array and split backend tables
    const categories = raw.categories || [];
    let content = [];
    let docuSeries = [];
    let audioStories = [];

    if (raw.content) {
      content = raw.content;
      docuSeries = content.filter(x => !x.audioUrl);
      audioStories = content.filter(x => x.audioUrl);
    } else {
      docuSeries = raw.docuSeries || [];
      audioStories = raw.audioStories || [];
      content = [...docuSeries, ...audioStories];
    }

    return {
      categories,
      content,
      docuSeries,
      audioStories
    };
  }

  static isSubscribed() {
    return localStorage.getItem('hs_subscribed') === 'true';
  }

  static async setSubscribed(status, name = "Anonymous Member", paymentMethod = "Mock Card/UPI") {
    localStorage.setItem('hs_subscribed', String(status));
    if (status) {
      try {
        await fetch('/api/subscribe', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, paymentMethod })
        });
      } catch (err) {
        console.error("Failed to post subscription record to backend database", err);
      }
    }
  }

  static getUserScores() {
    return JSON.parse(localStorage.getItem('hs_scores')) || { trivia: 0, chronology: 0, memory: 0 };
  }

  static saveUserScore(gameType, score) {
    const scores = this.getUserScores();
    if (score > scores[gameType]) {
      scores[gameType] = score;
      localStorage.setItem('hs_scores', JSON.stringify(scores));
      return true;
    }
    return false;
  }
}

// ==========================================
// PURE WEB AUDIO SYNTHESIZER SOUND ENGINE
// ==========================================
export class SoundEffects {
  static init() {
    if (this.ctx) return;
    try {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    } catch (err) {
      console.warn("AudioContext initialization blocked/not supported by browser:", err);
      this.ctx = null;
    }
  }

  static playCoin() {
    try {
      this.init();
      if (!this.ctx || this.ctx.state === 'suspended') return;
      const now = this.ctx.currentTime;
      
      const osc1 = this.ctx.createOscillator();
      const gain1 = this.ctx.createGain();
      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(587.33, now);
      gain1.gain.setValueAtTime(0.08, now);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      osc1.connect(gain1);
      gain1.connect(this.ctx.destination);
      osc1.start(now);
      osc1.stop(now + 0.35);

      const osc2 = this.ctx.createOscillator();
      const gain2 = this.ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(880, now + 0.08);
      gain2.gain.setValueAtTime(0.08, now + 0.08);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
      osc2.connect(gain2);
      gain2.connect(this.ctx.destination);
      osc2.start(now + 0.08);
      osc2.stop(now + 0.4);
    } catch (err) {
      console.warn("Sound playCoin error:", err);
    }
  }

  static playSuccess() {
    try {
      this.init();
      if (!this.ctx || this.ctx.state === 'suspended') return;
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50];
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);
        gain.gain.setValueAtTime(0.08, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.3);
      });
    } catch (err) {
      console.warn("Sound playSuccess error:", err);
    }
  }

  static playFailure() {
    try {
      this.init();
      if (!this.ctx || this.ctx.state === 'suspended') return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(160, now);
      osc.frequency.linearRampToValueAtTime(70, now + 0.35);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } catch (err) {
      console.warn("Sound playFailure error:", err);
    }
  }

  static playClick() {
    try {
      this.init();
      if (!this.ctx || this.ctx.state === 'suspended') return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(700, now);
      gain.gain.setValueAtTime(0.03, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch (err) {
      console.warn("Sound playClick error:", err);
    }
  }
}
window.SoundEffects = SoundEffects;

class AppController {
  constructor() {
    window.appInstance = this; // global reference for script tags
    this.isSubscribed = DatabaseService.isSubscribed();
    this.userScores = DatabaseService.getUserScores();
    this.gyanCoins = parseInt(localStorage.getItem('hs_gyan_coins')) || 0;
    this.unlockedRewards = JSON.parse(localStorage.getItem('hs_unlocked_rewards')) || [];
    
    // Players
    this.activeAudio = null;
    this.audioProgressInterval = null;
    
    // OTT premium stats
    this.watchlist = JSON.parse(localStorage.getItem('hs_watchlist') || '[]');
    this.progress = JSON.parse(localStorage.getItem('hs_progress') || '{}');
    this.currentProfile = localStorage.getItem('hs_profile') || null;
    this.currentProfileAvatar = localStorage.getItem('hs_avatar') || '📜';
    this.audioRateMultiplier = parseFloat(localStorage.getItem('hs_audio_rate') || '1.0');
    this.isStandardRowsRendered = false;
    
    this.contentData = null;
    this.selectedAyurvedaCategory = 'all';
    this.ayurvedaSearchQuery = '';
    this.pranayamaInterval = null;
    this.pranayamaSeconds = 0;
    
    this.init();
  }

  async init() {
    // Load live contents
    this.contentData = await DatabaseService.fetchContent();

    this.renderHeader();
    this.renderSpotlight();
    this.renderContentRows();
    this.setupSubscriptionUI();
    this.setupGameToggles();
    this.renderScoresDashboard();
    this.bindRewardsShop();
    this.setupAmbientMusic();
    this.setupPersonaFilters();
    this.setupSearch();
    this.initDivyaDarshana();
    this.setupProfileSelector();
    this.checkPaymentStatus();
    
    // ── Mobile hamburger menu ──
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    if (mobileMenuBtn && mobileNavMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        const isOpen = !mobileNavMenu.classList.contains('hidden');
        mobileNavMenu.classList.toggle('hidden', isOpen);
        mobileMenuBtn.classList.toggle('open', !isOpen);
      });
      // Close on nav link click
      mobileNavMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
        link.addEventListener('click', () => {
          mobileNavMenu.classList.add('hidden');
          mobileMenuBtn.classList.remove('open');
        });
      });
    }

    // Scroll event for header background shift (top 36px utility bar + 64px nav = 100px total)
    const header = document.querySelector('header');
    if (header) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
          header.style.background = 'rgba(7, 8, 12, 0.92)';
          header.style.borderBottomColor = 'rgba(255, 255, 255, 0.12)';
          header.style.boxShadow = '0 8px 32px rgba(0,0,0,0.6)';
        } else {
          header.style.background = 'rgba(7, 8, 12, 0.3)';
          header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
          header.style.boxShadow = 'none';
        }
      });
    }
    
    // Bind click sound effects (wrapped safely)
    document.addEventListener('click', (e) => {
      try {
        if (e.target.closest('button, a, .content-card, .map-pin')) {
          SoundEffects.playClick();
        }
      } catch (err) {
        console.warn("Global click sound handler exception:", err);
      }
    });
    
    // Bind subscription buttons
    document.querySelectorAll('.trigger-checkout').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        this.openPaymentModal();
      });
    });

    // Close Modals via Robust Event Delegation
    document.addEventListener('click', (e) => {
      if (e.target.closest('.modal-close')) {
        this.closeAllModals();
      }
    });
  }

  // Header / Navigation Updates
  renderHeader() {
    const subBadge = document.getElementById('navbar-sub-badge');
    const heroSubPrompt = document.getElementById('hero-sub-prompt');
    
    if (this.isSubscribed) {
      subBadge.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-[11px] text-gold bg-gold/10 border border-gold/25 px-3.5 py-1.5 rounded-full font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg shadow-gold/5">
            <span>✨ Premium Pass Active</span>
          </span>
        </div>`;
      if (heroSubPrompt) heroSubPrompt.classList.add('hidden');
    } else {
      subBadge.innerHTML = `
        <div class="flex items-center gap-3">
          <span class="text-xs text-white/50 bg-white/5 border border-white/5 px-3 py-1.5 rounded-full font-medium hidden md:inline-block">Active Plan: <strong>Free Tier</strong></span>
          <button class="trigger-checkout bg-white/10 hover:bg-white/15 text-gold border border-gold/40 text-[11px] font-bold px-4 py-1.5 rounded-full transition-all flex items-center gap-1.5">
            <span>✨ Get Premium</span>
            <span class="bg-gold text-black rounded px-1.5 py-0.2 font-mono text-[9px]">₹399</span>
          </button>
        </div>`;
      if (heroSubPrompt) heroSubPrompt.classList.remove('hidden');
    }
  }

  // Showcase highlighted items in an auto-playing slideshow Hero Spotlight
  renderSpotlight() {
    if (!this.contentData || !this.contentData.docuSeries || !this.contentData.docuSeries.length) return;
    const heroSection = document.getElementById('hero-spotlight');
    if (!heroSection) return;

    // Terminate any pre-existing spotlight slideshow timers
    if (this.spotlightInterval) {
      clearInterval(this.spotlightInterval);
      this.spotlightInterval = null;
    }

    // Select top video items to cycle in spotlight
    const slides = (this.contentData.docuSeries || []).slice(0, 4);
    if (!slides.length) return;
    let currentIdx = 0;

    heroSection.innerHTML = `
      <div class="relative w-full h-full overflow-hidden">
        <!-- Slide items -->
        <div id="spotlight-slides-container" class="relative w-full h-full">
          ${slides.map((item, idx) => `
            <div class="spotlight-slide absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}" data-index="${idx}">
              <img src="${item.imageUrl || '/images/hampi.jpg'}" ${idx > 0 ? 'loading="lazy"' : ''} class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000" alt="${item.title}">
              <div class="absolute inset-0 bg-gradient-to-t from-[#0a0b10] via-transparent to-[#0a0b10]/60 z-10 pointer-events-none"></div>
              <div class="max-w-4xl pt-24 pb-8 px-6 md:px-12 h-full flex flex-col justify-end relative z-20">
                <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gold/15 text-gold text-xs font-bold uppercase tracking-wider mb-3 border border-gold/20 self-start">
                  🏆 FEATURED MASTERPIECE
                </span>
                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white font-serif mb-2 leading-tight tracking-wide drop-shadow-md">
                  ${item.title}
                </h1>
                <p class="text-sm md:text-base text-gold/90 font-medium mb-2.5 italic font-serif">
                  "${item.tagline}"
                </p>
                <p class="text-xs sm:text-sm text-white/70 max-w-2xl mb-5 leading-relaxed line-clamp-2 md:line-clamp-3">
                  ${item.description}
                </p>
                <div class="hero-actions flex flex-wrap gap-3 items-center mb-5">
                  <button class="hero-play-slide-btn px-8 py-3.5 bg-gradient-to-r from-gold to-amber-500 hover:from-gold/90 hover:to-amber-600 text-black font-extrabold rounded-xl text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-gold/20 flex items-center gap-2" data-id="${item.id}">
                    <span>▶ Play Episode</span>
                    <span class="text-xs opacity-75">(${item.duration})</span>
                  </button>
                  <button class="hero-info-slide-btn px-6 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/10 font-bold rounded-xl text-sm transition-all flex items-center gap-2" data-id="${item.id}">
                    <span>ℹ More Info</span>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Left/Right Arrows -->
        <button id="spotlight-prev-btn" class="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-gold hover:text-black border border-white/10 hover:border-gold flex items-center justify-center text-white text-base transition-all select-none">◀</button>
        <button id="spotlight-next-btn" class="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-black/40 hover:bg-gold hover:text-black border border-white/10 hover:border-gold flex items-center justify-center text-white text-base transition-all select-none">▶</button>

        <!-- Bullet Indicators -->
        <div class="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2.5">
          ${slides.map((_, idx) => `
            <span class="spotlight-dot w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 ${idx === 0 ? 'bg-gold w-6' : 'bg-white/30 hover:bg-white/50'}" data-index="${idx}"></span>
          `).join('')}
        </div>
      </div>
    `;

    const slideEls = heroSection.querySelectorAll('.spotlight-slide');
    const dotEls = heroSection.querySelectorAll('.spotlight-dot');

    const showSlide = (targetIdx) => {
      currentIdx = targetIdx;
      
      // Update slides transition
      slideEls.forEach((slide, idx) => {
        if (idx === currentIdx) {
          slide.classList.remove('opacity-0', 'z-0');
          slide.classList.add('opacity-100', 'z-10');
        } else {
          slide.classList.remove('opacity-100', 'z-10');
          slide.classList.add('opacity-0', 'z-0');
        }
      });

      // Update dot styles
      dotEls.forEach((dot, idx) => {
        if (idx === currentIdx) {
          dot.className = "spotlight-dot h-2.5 rounded-full cursor-pointer transition-all duration-300 bg-gold w-6";
        } else {
          dot.className = "spotlight-dot w-2.5 h-2.5 rounded-full cursor-pointer transition-all duration-300 bg-white/30 hover:bg-white/50";
        }
      });
    };

    const advanceSlide = () => {
      const nextIdx = (currentIdx + 1) % slides.length;
      showSlide(nextIdx);
    };

    const resetInterval = () => {
      clearInterval(this.spotlightInterval);
      this.spotlightInterval = setInterval(advanceSlide, 6000);
    };

    // Bind manually triggered buttons
    heroSection.querySelector('#spotlight-prev-btn').addEventListener('click', () => {
      const prevIdx = (currentIdx - 1 + slides.length) % slides.length;
      showSlide(prevIdx);
      resetInterval();
    });

    heroSection.querySelector('#spotlight-next-btn').addEventListener('click', () => {
      const nextIdx = (currentIdx + 1) % slides.length;
      showSlide(nextIdx);
      resetInterval();
    });

    dotEls.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.getAttribute('data-index'));
        showSlide(target);
        resetInterval();
      });
    });

    // Bind internal play/info actions for slide items
    slides.forEach((item, idx) => {
      const cardEl = heroSection.querySelector(`.spotlight-slide[data-index="${idx}"]`);
      if (cardEl) {
        const playBtn = cardEl.querySelector(`.hero-play-slide-btn`);
        const infoBtn = cardEl.querySelector(`.hero-info-slide-btn`);
        if (playBtn) {
          playBtn.addEventListener(`click`, () => this.playContent(item, false));
        }
        if (infoBtn) {
          infoBtn.addEventListener(`click`, () => this.playContent(item, false));
        }
      }
    });

    // Launch auto-slideshow
    this.spotlightInterval = setInterval(advanceSlide, 6000);
  }

  // Render Horizontal Carousel Lists
  renderContentRows() {
    if (!this.contentData) return;
    
    // Core Fix: Use flat content array instead of missing docuSeries/audioStories keys
    const all = this.contentData.content || [];
    
    // 1. RENDER DYNAMIC ROWS ONLY (Continue Watching & My List)
    const dynamicContainer = document.getElementById('dynamic-library-rows');
    if (dynamicContainer) {
      let dynamicHTML = '';

      // Continue Watching
      const continueItems = all.filter(x => {
        const p = this.progress[x.id];
        return p && p.progress > 0.05 && p.progress < 0.95;
      });
      if (continueItems.length) {
        dynamicHTML += this.createRowHTML(
          "continue-row-parent",
          "continue-stories-row",
          "Resume Exploring",
          "Continue Watching",
          continueItems,
          true
        );
      }

      // My List
      const watchlistItems = all.filter(x => this.watchlist.includes(x.id));
      if (watchlistItems.length) {
        dynamicHTML += this.createRowHTML(
          "watchlist-row-parent",
          "watchlist-stories-row",
          "Your Saved Chronicles",
          "My List",
          watchlistItems,
          true
        );
      }

      dynamicContainer.innerHTML = dynamicHTML;
    }

    // 2. RENDER STANDARD ROWS ONCE (CACHED FOR MAXIMUM PERFORMANCE)
    const standardContainer = document.getElementById('standard-library-rows');
    if (standardContainer && !this.isStandardRowsRendered) {
      let standardHTML = '';

      const standardRows = [
        {
          id: "docu-series-row",
          parentId: "docu-parent",
          subheading: "Heritage Video Catalogue",
          title: "Video Series",
          items: all.filter(x => (x.category === "Video Series" || x.category === "Docu-Series") && !x.audioUrl),
          isAudio: false,
          weight: 0
        },
        {
          id: "audio-stories-row",
          parentId: "audio-parent",
          subheading: "Heritage Audio Library",
          title: "Ebook & Audio Series",
          items: all.filter(x => x.category === "Ebook & Audio Series" || x.category === "Audiobooks & Legends"),
          isAudio: true,
          weight: 1
        },
        {
          id: "god-series-row",
          parentId: "god-parent",
          subheading: "Divine Chronicles",
          title: "The God Series",
          items: all.filter(x => x.isGodSeries || x.category === "God Series"),
          isAudio: true,
          weight: 2
        },
        {
          id: "kids-stories-row",
          parentId: "kids-parent",
          subheading: "Young Mind Explorers",
          title: "Animation Series",
          items: all.filter(x => x.category === "Animation Series" || x.category === "Kids Stories"),
          isAudio: true,
          weight: 3
        },
        {
          id: "unknown-knowledge-row",
          parentId: "unknown-parent",
          subheading: "Untold Historical Riddles",
          title: "Unknown Knowledge",
          items: all.filter(x => x.category === "Unknown Knowledge"),
          isAudio: false,
          weight: 4
        }
      ];

      // Sort rows by active profile weight
      if (this.currentProfile === "Kids") {
        standardRows.forEach(r => { if (r.weight === 3) r.weight = -1; });
      } else if (this.currentProfile === "Yogi") {
        standardRows.forEach(r => { if (r.weight === 2) r.weight = -1; });
      } else if (this.currentProfile === "Warrior") {
        standardRows.forEach(r => { if (r.weight === 0) r.weight = -1; });
      } else if (this.currentProfile === "Scholar") {
        standardRows.forEach(r => { if (r.weight === 4) r.weight = -1; });
      }

      standardRows.sort((a, b) => a.weight - b.weight);

      standardRows.forEach(row => {
        standardHTML += this.createRowHTML(
          row.parentId,
          row.id,
          row.subheading,
          row.title,
          row.items,
          row.isAudio || !!row.items.some(x => x.audioUrl)
        );
      });

      standardContainer.innerHTML = standardHTML;
      this.isStandardRowsRendered = true;
    }

    // Bind card click triggers & 3D tilt effects
    this.bindCardInteractions();
    this.bindRowSliders();
  }

  createRowHTML(parentId, rowId, subheading, title, items, isAudio) {
    const cardsHTML = items.length
      ? items.map(item => this.createContentCardHTML(item, isAudio || !!item.audioUrl)).join('')
      : `<p class="text-white/30 text-sm py-8 pl-4">No content yet in this row.</p>`;

    return `
      <div id="${parentId}" class="netflix-row border-b border-white/5 pb-10">
        <div class="flex items-end justify-between mb-4">
          <div>
            <span class="text-[10px] font-bold text-gold uppercase tracking-widest block mb-1">${subheading}</span>
            <h2 class="text-2xl md:text-3xl font-bold font-serif text-white">${title}</h2>
          </div>
          <div class="flex gap-2">
            <button class="row-prev-btn w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-gold hover:border-gold hover:text-black text-white flex items-center justify-center text-sm transition-all" data-row="${rowId}">◀</button>
            <button class="row-next-btn w-9 h-9 rounded-full border border-white/10 bg-white/5 hover:bg-gold hover:border-gold hover:text-black text-white flex items-center justify-center text-sm transition-all" data-row="${rowId}">▶</button>
          </div>
        </div>
        <div id="${rowId}" class="flex gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth">
          ${cardsHTML}
        </div>
      </div>
    `;
  }

  setupProfileSelector() {
    const modal = document.getElementById('profile-modal');
    if (!modal) return;

    const renderHeaderProfile = () => {
      const avatarEl = document.getElementById('active-profile-avatar');
      const nameEl = document.getElementById('active-profile-name');
      const greetingEl = document.getElementById('hero-sub-prompt');

      if (this.currentProfile) {
        if (avatarEl) avatarEl.textContent = this.currentProfileAvatar;
        if (nameEl) nameEl.textContent = this.currentProfile;

        if (greetingEl) {
          if (this.currentProfile === "Yogi") {
            greetingEl.textContent = "Pranam, Yogi! Cultivate inner peace and balance.";
          } else if (this.currentProfile === "Kids") {
            greetingEl.textContent = "Hey there! Ready to explore awesome animations and fables?";
          } else if (this.currentProfile === "Warrior") {
            greetingEl.textContent = "Salutations, Warrior! Explore royal dynastic chronicles.";
          } else {
            greetingEl.textContent = "Welcome back, Scholar! Unveil the secrets of antiquity.";
          }
        }
      } else {
        if (avatarEl) avatarEl.textContent = '👤';
        if (nameEl) nameEl.textContent = 'Guest';
        if (greetingEl) {
          greetingEl.textContent = "Welcome, Guest! Unveil the secrets of Indian heritage and antiquity.";
        }
      }
    };

    // If profile is set, load it immediately. Otherwise, show guest header and delay popup
    if (this.currentProfile) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      renderHeaderProfile();
    } else {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      renderHeaderProfile();

      // Trigger pop-up after 12 seconds only if they haven't bypassed it yet
      const alreadyPrompted = sessionStorage.getItem('hs_profile_prompted') === 'true';
      if (!alreadyPrompted) {
        setTimeout(() => {
          if (!this.currentProfile && sessionStorage.getItem('hs_profile_prompted') !== 'true') {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
          }
        }, 12000); // 12-second delay
      }
    }

    // Bind profile card clicks
    modal.querySelectorAll('.profile-card').forEach(card => {
      card.addEventListener('click', () => {
        const name = card.getAttribute('data-profile');
        const avatar = card.getAttribute('data-avatar');
        
        this.currentProfile = name;
        this.currentProfileAvatar = avatar;
        
        localStorage.setItem('hs_profile', name);
        localStorage.setItem('hs_avatar', avatar);
        sessionStorage.setItem('hs_profile_prompted', 'true');
        
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        
        this.isStandardRowsRendered = false; // Reset standard rows caching to re-sort
        renderHeaderProfile();
        this.renderContentRows();
      });
    });

    // Bind Skip/Guest button click
    const skipBtn = document.getElementById('skip-profile-btn');
    if (skipBtn) {
      skipBtn.addEventListener('click', () => {
        sessionStorage.setItem('hs_profile_prompted', 'true');
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        renderHeaderProfile();
      });
    }

    // Switch profile handler in navbar
    const switchBtn = document.getElementById('switch-profile-btn');
    if (switchBtn) {
      switchBtn.addEventListener('click', () => {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      });
    }
  }

  bindRowSliders() {
    const SCROLL_AMOUNT = 320;
    document.querySelectorAll('.row-prev-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rowId = btn.getAttribute('data-row');
        const row = document.getElementById(rowId);
        if (row) row.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
      });
    });
    document.querySelectorAll('.row-next-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rowId = btn.getAttribute('data-row');
        const row = document.getElementById(rowId);
        if (row) row.scrollBy({ left: SCROLL_AMOUNT, behavior: 'smooth' });
      });
    });
  }

  bindCardInteractions(parent = document) {
    // Bind My List (Watchlist) overlays
    parent.querySelectorAll('.watchlist-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        if (this.watchlist.includes(id)) {
          this.watchlist = this.watchlist.filter(x => x !== id);
        } else {
          this.watchlist.push(id);
        }
        localStorage.setItem('hs_watchlist', JSON.stringify(this.watchlist));
        SoundEffects.playClick();
        this.renderContentRows();
      });
    });

    parent.querySelectorAll('.content-card').forEach(card => {
      if (card.dataset.bound) return;
      card.dataset.bound = "true";

      card.addEventListener('click', () => {
        const id = card.getAttribute('data-id');
        const isAudio = card.getAttribute('data-type') === 'audio';
        
        let item;
        if (isAudio) {
          item = this.contentData.audioStories.find(x => x.id === id);
        } else {
          item = this.contentData.docuSeries.find(x => x.id === id);
        }
        
        if (item) {
          this.playContent(item, isAudio);
        }
      });

      // 3D holographic hover tilt
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const xc = rect.width / 2;
        const yc = rect.height / 2;
        const dx = x - xc;
        const dy = y - yc;
        const tiltX = -(dy / yc) * 6; // max 6 deg
        const tiltY = (dx / xc) * 6;
        
        card.style.transform = `perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        card.style.boxShadow = `0 12px 28px rgba(0,0,0,0.6), 0 0 20px rgba(212, 175, 55, 0.12)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = `perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        card.style.boxShadow = `none`;
      });
    });
  }

  createContentCardHTML(item, isAudio = false) {
    const isLocked = item.isPremium && !this.isSubscribed;
    const comingSoon = !isAudio && !item.videoUrl;
    const badgeText = isAudio ? 'AUDIO STORY' : 'DOCU-SERIES';
    const detailText = isAudio ? item.narrator : `${item.duration} • ${item.rating}`;
    
    // Check if item is in watchlist
    const isOnWatchlist = this.watchlist.includes(item.id);
    // Generate a unique thematic overlay color wash based on the item ID to make shared covers look distinct
    const overlayColors = [
      'rgba(212, 175, 55, 0.22)',   // Gold
      'rgba(16, 185, 129, 0.22)',   // Emerald
      'rgba(59, 130, 246, 0.22)',   // Blue
      'rgba(168, 85, 247, 0.22)',   // Purple
      'rgba(249, 115, 22, 0.22)',   // Orange
      'rgba(6, 182, 212, 0.22)',    // Cyan
      'rgba(236, 72, 153, 0.22)',   // Pink
      'rgba(239, 68, 68, 0.22)'     // Red
    ];
    let sum = 0;
    const idStr = item.id || '';
    for (let i = 0; i < idStr.length; i++) {
      sum += idStr.charCodeAt(i);
    }
    const tintColor = overlayColors[sum % overlayColors.length];

    return `
      <div class="content-card flex-shrink-0 w-72 rounded-2xl overflow-hidden bg-white/5 border border-white/5 cursor-pointer relative group transition-all duration-500 hover:border-gold/30 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gold/5" data-id="${item.id}" data-type="${isAudio ? 'audio' : 'video'}">
        <!-- Watchlist Overlay Toggle Button -->
        <button class="watchlist-toggle-btn absolute top-3 left-3 w-7 h-7 rounded-full bg-black/60 border border-white/10 hover:border-gold hover:scale-105 text-white flex items-center justify-center text-xs backdrop-blur-md transition-all z-20" data-id="${item.id}" title="${isOnWatchlist ? 'Remove from My List' : 'Add to My List'}">
          ${isOnWatchlist ? '✓' : '＋'}
        </button>

        <!-- Thumbnail Cover with beautiful Gradient & lazy-loaded image -->
        <div class="h-40 w-full relative flex flex-col justify-between p-4 overflow-hidden">
          ${item.imageUrl ? `
            <img src="${item.imageUrl}" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" alt="${item.title}">
            <div class="absolute inset-0 z-10 pointer-events-none" style="background-color: ${tintColor}; mix-blend-mode: overlay; opacity: 0.85;"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/30 to-transparent z-15 pointer-events-none"></div>
          ` : `
            <div class="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-950 transition-transform duration-500 group-hover:scale-[1.05]"></div>
            <div class="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/30 to-transparent z-15 pointer-events-none"></div>
          `}

          <div class="flex justify-between items-start w-full relative z-20">
            <span class="text-[9px] font-bold text-white/90 bg-black/40 px-2 py-0.8 rounded-md uppercase tracking-wider border border-white/5 backdrop-blur-md ml-auto">
              ${badgeText}
            </span>
            ${item.isPremium ? `
              <span class="w-6 h-6 rounded-full ${isLocked ? 'bg-crimson/20 border-crimson/40 text-crimson' : 'bg-gold/20 border-gold/40 text-gold'} border flex items-center justify-center text-xs backdrop-blur-md ml-2 text-[10px]">
                ${isLocked ? '🔒' : '🔑'}
              </span>
            ` : `
              <span class="text-[9px] font-extrabold text-emerald-400 bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.8 rounded-md backdrop-blur-md ml-2">
                FREE
              </span>
            `}
          </div>

          <div class="text-white z-20 relative">
            <h4 class="font-bold text-base font-serif line-clamp-1 leading-snug drop-shadow-md text-white/95">${item.title}</h4>
            <p class="text-[10px] text-white/70 line-clamp-1">${detailText}</p>
          </div>
          
          <!-- Hover Overlay Play Button -->
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <div class="w-12 h-12 rounded-full ${comingSoon ? 'bg-white/10 border border-gold/40' : 'bg-gold/90'} flex items-center justify-center text-black font-bold text-lg shadow-lg shadow-gold/20 transform scale-75 group-hover:scale-100 transition-transform duration-300">
              ${isLocked ? '🔒' : comingSoon ? '🎬' : '▶'}
            </div>
          </div>
          <!-- Coming Soon ribbon -->
          ${comingSoon ? `
            <div class="absolute top-3 right-0 z-20">
              <div class="bg-gold text-black text-[8px] font-black uppercase tracking-widest px-2.5 py-1 shadow-lg" style="clip-path: polygon(6px 0%, 100% 0%, 100% 100%, 0% 100%); letter-spacing:0.12em;">Coming Soon</div>
            </div>
          ` : ''}

          <!-- Continue watching progress bar overlay -->
          ${progressVal > 0 ? `
            <div class="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20 overflow-hidden">
              <div class="bg-gold h-full" style="width: ${progressVal * 100}%"></div>
            </div>
          ` : ''}
        </div>

        <!-- Description Info block -->
        <div class="p-4">
          <p class="text-xs text-white/60 line-clamp-2 leading-relaxed">
            ${item.desc || item.description}
          </p>
        </div>
      </div>
    `;
  }

  // Access check & routing
  playContent(item, isAudio = false) {
    if (item.isPremium && !this.isSubscribed) {
      this.openPaymentModal();
      return;
    }

    if (isAudio) {
      this.openAudioPlayer(item);
    } else {
      this.openDocuReader(item);
    }
  }

  // Docu-Series slide player modal (supports video player & slides)
  openDocuReader(item) {
    // Save playtime tracking details
    this.activePlayItemId = item.id;
    this.activePlayStartTime = Date.now();
    this.activePlayDuration = parseInt(item.duration) * 60 || 900;

    // Apply Apple TV dynamic ambient backdrop glow
    const container = document.getElementById('media-modal-container');
    if (container) {
      let glowColor = 'rgba(212,175,55,0.22)';
      if (item.category === 'God Series') glowColor = 'rgba(249,115,22,0.22)';
      else if (item.category === 'Kids Stories') glowColor = 'rgba(16,185,129,0.22)';
      else if (item.category === 'Unknown Knowledge') glowColor = 'rgba(99,102,241,0.22)';
      container.style.boxShadow = `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 100px 10px ${glowColor}`;
    }

    const modal = document.getElementById('media-modal');
    const modalTitle = document.getElementById('media-modal-title');
    const modalBody = document.getElementById('media-modal-body');

    modalTitle.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">VIDEO & MANUSCRIPT</span>
        <h2 class="text-lg md:text-xl font-bold font-serif text-white">${item.title}</h2>
      </div>
    `;

    const hasVideo = !!item.videoUrl;

    const renderVideoTabHTML = () => {
      if (!item.videoUrl) {
        // ── Coming Soon Overlay ──
        return `
          <div class="p-6">
            <div class="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/40 relative flex flex-col items-center justify-center"
              style="background: radial-gradient(ellipse at 60% 30%, rgba(212,175,55,0.08) 0%, rgba(5,6,10,0.95) 70%), url('${item.imageUrl}') center/cover no-repeat;">
              <!-- Dark overlay -->
              <div class="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl"></div>
              <!-- Content -->
              <div class="relative z-10 text-center px-8 space-y-5">
                <div class="w-20 h-20 mx-auto rounded-full border-2 border-gold/40 flex items-center justify-center" style="background: rgba(212,175,55,0.08);">
                  <span class="text-4xl">🎬</span>
                </div>
                <div>
                  <span class="inline-block bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">Video Coming Soon</span>
                  <h3 class="text-xl font-bold font-serif text-white mb-2">${item.title}</h3>
                  <p class="text-xs text-white/50 leading-relaxed max-w-sm mx-auto">${item.description ? item.description.substring(0, 120) + '…' : 'This documentary is currently in production.'}</p>
                </div>
                <div class="flex items-center justify-center gap-3">
                  <div class="w-2 h-2 rounded-full bg-gold animate-pulse"></div>
                  <span class="text-[10px] text-white/40 font-semibold uppercase tracking-widest">In Production</span>
                  <div class="w-2 h-2 rounded-full bg-gold animate-pulse" style="animation-delay:0.4s"></div>
                </div>
              </div>
            </div>
            <div class="mt-4 p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between gap-3">
              <div class="text-[10px] text-white/60 leading-normal">
                <strong>While you wait</strong> — read the full illustrated manuscript in the FlipBook reader!
              </div>
              <button onclick="document.getElementById('media-modal').classList.add('hidden'); document.getElementById('media-modal').classList.remove('flex'); setTimeout(()=>window.flipBook&&window.flipBook.open(${JSON.stringify(item).replace(/</g,'\\u003c')}),100);"
                class="flex-shrink-0 text-[10px] font-black uppercase tracking-wider bg-gold text-black px-3 py-1.5 rounded-lg hover:bg-gold/80 transition-all whitespace-nowrap">
                📖 Open FlipBook
              </button>
            </div>
          </div>
        `;
      }
      // ── Normal video player ──
      return `
        <div class="p-6 space-y-4">
          <div class="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-lg shadow-black/40">
            <iframe id="video-iframe-player" src="${item.videoUrl}?autoplay=1" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          
          <!-- Cinema video speed and theatre controls -->
          <div class="flex items-center justify-between px-2 py-3 bg-white/5 border border-white/5 rounded-xl text-xs text-white/70 font-sans">
            <div class="flex items-center gap-3 font-mono text-[9px]">
              <span>🎛️ SYSTEM CONTROLS</span>
            </div>
            <div class="flex items-center gap-4">
              <button id="theatre-mode-btn" class="hover:text-gold transition-colors font-bold text-[9px] bg-white/5 border border-white/10 rounded px-2.5 py-1 uppercase tracking-wider">📺 Theatre Mode</button>
            </div>
          </div>

          <div class="space-y-2 px-1">
            <h3 class="text-lg font-bold text-gold font-serif">${item.tagline || 'Visual Documentary'}</h3>
            <p class="text-xs text-white/70 leading-relaxed">${item.description}</p>
          </div>
          <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
            <span class="text-lg">📖</span>
            <div class="text-[10px] text-white/60 leading-normal">
              <strong>Video unavailable?</strong> If YouTube is blocked or fails to load, toggle the <strong>📖 Read Manuscript</strong> tab at the top to read the illustrated chapters directly!
            </div>
          </div>
        </div>
      `;
    };

    const renderSlidesTabHTML = () => `
      <div class="flex flex-col items-center justify-center p-6 text-center min-h-[350px]" id="docu-slide-container">
        <!-- Rendered dynamically by renderSlide() -->
      </div>
    `;

    modalBody.innerHTML = `
      <div class="space-y-4">
        ${hasVideo ? `
          <div class="px-6 pt-6">
            <div class="flex border border-white/10 rounded-xl p-1 bg-white/5">
              <button id="tab-mode-video" class="flex-1 py-2 text-xs font-extrabold rounded-lg bg-gold text-black transition-all">📺 Watch Documentary</button>
              <button id="tab-mode-slides" class="flex-1 py-2 text-xs font-bold text-white/60 hover:text-white transition-all">📖 Read FlipBook</button>
            </div>
          </div>
        ` : ''}

        <div id="docu-reader-content-area">
          ${hasVideo ? renderVideoTabHTML() : renderSlidesTabHTML()}
        </div>
      </div>
    `;

    
    // Bind Theatre Mode click
    setTimeout(() => {
      const theatreBtn = document.getElementById('theatre-mode-btn');
      const modalContainer = document.getElementById('media-modal-container');
      if (theatreBtn && modalContainer) {
        theatreBtn.addEventListener('click', () => {
          const isLarge = modalContainer.classList.contains('max-w-5xl');
          if (isLarge) {
            modalContainer.classList.remove('max-w-5xl');
            modalContainer.classList.add('max-w-2xl');
            theatreBtn.textContent = '📺 Theatre Mode';
          } else {
            modalContainer.classList.remove('max-w-2xl');
            modalContainer.classList.add('max-w-5xl');
            theatreBtn.textContent = '📺 Normal Mode';
          }
        });
      }
    }, 100);

const bindSlideNavigation = () => {
      let currentSlide = 0;
      const container = document.getElementById('docu-slide-container') || document.getElementById('docu-reader-content-area');
      if (!container) return;

      const renderSlide = () => {
        const slide = item.content[currentSlide];
        container.innerHTML = `
          <div class="flex flex-col items-center justify-center text-center p-4 min-h-[300px]">
            <div class="text-7xl mb-6 select-none">${slide.visual || '📜'}</div>
            <h3 class="text-2xl font-bold text-gold font-serif mb-3">${slide.title}</h3>
            <p class="text-xs text-white/80 max-w-xl leading-relaxed mb-6 font-sans">${slide.text}</p>
            
            <div class="flex items-center gap-6 mt-auto">
              <button id="prev-slide" class="w-10 h-10 rounded-full border border-white/10 hover:bg-white/5 transition-all text-white flex items-center justify-center text-sm disabled:opacity-30 disabled:pointer-events-none" ${currentSlide === 0 ? 'disabled' : ''}>◀</button>
              <span class="text-xs font-bold text-white/50 tracking-widest font-mono">${currentSlide + 1} / ${item.content.length}</span>
              <button id="next-slide" class="px-6 py-2 bg-gold hover:bg-gold/90 text-black font-extrabold rounded-lg text-xs uppercase tracking-wider transition-all">${currentSlide === item.content.length - 1 ? 'Finish' : 'Next'}</button>
            </div>
          </div>
        `;

        document.getElementById('prev-slide').addEventListener('click', () => {
          if (currentSlide > 0) {
            currentSlide--;
            renderSlide();
          }
        });

        document.getElementById('next-slide').addEventListener('click', () => {
          if (currentSlide < item.content.length - 1) {
            currentSlide++;
            renderSlide();
          } else {
            this.closeAllModals();
          }
        });
      };

      renderSlide();
    };

    if (hasVideo) {
      const tabVideo = document.getElementById('tab-mode-video');
      const tabSlides = document.getElementById('tab-mode-slides');
      const contentArea = document.getElementById('docu-reader-content-area');

      tabVideo.addEventListener('click', () => {
        tabVideo.className = "flex-1 py-2 text-xs font-extrabold rounded-lg bg-gold text-black transition-all";
        tabSlides.className = "flex-1 py-2 text-xs font-bold text-white/60 hover:text-white transition-all";
        contentArea.innerHTML = renderVideoTabHTML();
      });

      tabSlides.addEventListener('click', () => {
        tabSlides.className = "flex-1 py-2 text-xs font-extrabold rounded-lg bg-gold text-black transition-all";
        tabVideo.className = "flex-1 py-2 text-xs font-bold text-white/60 hover:text-white transition-all";
        // Close the parent modal and open the immersive flipbook
        this.closeAllModals();
        setTimeout(() => window.flipBook && window.flipBook.open(item), 150);
      });
    } else {
      // No video — open flipbook directly (or show coming soon + flipbook button)
      if (item.content && item.content.length) {
        this.closeAllModals();
        setTimeout(() => window.flipBook && window.flipBook.open(item), 50);
      } else {
        // No content at all — just show coming-soon screen
        bindSlideNavigation();
      }
    }

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Bulletproof close binder
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        this.closeAllModals();
      };
    }
  }

  // Audio Podcast player modal (with real HTML5 Ambient Loops & TTS Voice Narration)
  openAudioPlayer(item) {
    // Playtime details for saving progress
    this.activePlayItemId = item.id;
    this.activePlayStartTime = Date.now();

    // Apply Apple TV dynamic ambient backdrop glow
    const container = document.getElementById('media-modal-container');
    if (container) {
      let glowColor = 'rgba(59,130,246,0.22)'; // Blue glow for audiobooks
      if (item.category === 'God Series') glowColor = 'rgba(249,115,22,0.22)';
      else if (item.category === 'Kids Stories') glowColor = 'rgba(16,185,129,0.22)';
      container.style.boxShadow = `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 100px 10px ${glowColor}`;
    }

    const modal = document.getElementById('media-modal');
    const modalTitle = document.getElementById('media-modal-title');
    const modalBody = document.getElementById('media-modal-body');

    modalTitle.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">AUDIO BOOK</span>
        <h2 class="text-lg md:text-xl font-bold font-serif text-white">${item.title}</h2>
      </div>
    `;

    // Terminate existing playbacks & speech synthesis
    if (this.activeAudio) {
      this.activeAudio.pause();
      this.activeAudio = null;
    }
    window.speechSynthesis.cancel();
    if (this.audioProgressInterval) {
      clearInterval(this.audioProgressInterval);
      this.audioProgressInterval = null;
    }

    // Instantiate background ambient sound
    this.activeAudio = new Audio(item.audioUrl);
    this.activeAudio.loop = true;
    this.activeAudio.volume = 0.2; // Low background volume

    const textToSpeak = item.desc || item.description || "Welcome to HeritageStream audio chronicles.";
    const totalWords = textToSpeak.split(/\s+/).length;
    // Estimate speaking time: average speaking rate is ~140 words per minute (~2.3 words per second)
    const totalDuration = Math.max(15, Math.ceil(totalWords / (2.3 * this.audioRateMultiplier))); 
    let elapsedSeconds = 0;
    let isPlaying = false;
    let isSpeechInitiated = false;
    let selectedLang = 'en-IN'; // Default: Indian English
    
    // Restore playback position if previously started
    const savedAudioProgress = this.progress[item.id];
    if (savedAudioProgress && savedAudioProgress.progress > 0.05 && savedAudioProgress.progress < 0.95) {
      elapsedSeconds = Math.floor(savedAudioProgress.progress * totalDuration);
    }

    // ── Indian Voice Helper ──
    // Picks the best available voice for the selected Indian language.
    // Falls back gracefully: hi-IN → en-IN → any en voice.
    const getIndianVoice = (lang) => {
      const voices = window.speechSynthesis.getVoices();
      // Priority order for each language
      const priorities = {
        'en-IN': ['en-IN', 'en_IN'],
        'kn-IN': ['kn-IN', 'kn_IN'],
        'hi-IN': ['hi-IN', 'hi_IN'],
        'ta-IN': ['ta-IN', 'ta_IN'],
        'te-IN': ['te-IN', 'te_IN'],
      };
      const codes = priorities[lang] || ['en-IN'];
      // 1. Exact locale match
      for (const code of codes) {
        const v = voices.find(v => v.lang === code || v.lang.replace('_','-') === code);
        if (v) return v;
      }
      // 2. Google Indian English fallback
      const googleIN = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('india'));
      if (googleIN) return googleIN;
      // 3. Any en-IN
      const anyIN = voices.find(v => v.lang === 'en-IN');
      if (anyIN) return anyIN;
      // 4. Google English (closest natural)
      return voices.find(v => v.lang.startsWith('en') && v.name.includes('Google')) || null;
    };

    // ── Indian Speech Cadence Settings ──
    // Slower rate & slightly lower pitch gives the warm, measured
    // storytelling pace common in Indian narration.
    const getIndianSpeechSettings = (lang) => {
      const settings = {
        'en-IN': { rate: 0.88, pitch: 0.93 }, // measured Indian English pace
        'kn-IN': { rate: 0.86, pitch: 0.94 }, // measured Kannada cadence
        'hi-IN': { rate: 0.85, pitch: 0.90 }, // slightly slower for Hindi
        'ta-IN': { rate: 0.84, pitch: 0.92 }, // Tamil cadence
        'te-IN': { rate: 0.85, pitch: 0.91 }, // Telugu cadence
      };
      return settings[lang] || { rate: 0.88, pitch: 0.93 };
    };

    // ── Unified speak helper ──
    const speakWith = (text, onEnd) => {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      const { rate, pitch } = getIndianSpeechSettings(selectedLang);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.lang = selectedLang;
      const voice = getIndianVoice(selectedLang);
      if (voice) utterance.voice = voice;
      utterance.onend = onEnd || (() => {
        isPlaying = false;
        if (this.activeAudio) this.activeAudio.pause();
        clearInterval(this.audioProgressInterval);
        this.audioProgressInterval = null;
        drawPlayerUI();
      });
      window.speechSynthesis.speak(utterance);
    };

    const tickProgress = () => {
      if (!isPlaying) return;
      
      elapsedSeconds++;
      
      // Save progress dynamically
      this.progress[item.id] = { progress: elapsedSeconds / totalDuration, timestamp: Date.now() };
      localStorage.setItem('hs_progress', JSON.stringify(this.progress));

      if (elapsedSeconds >= totalDuration) {
        clearInterval(this.audioProgressInterval);
        this.audioProgressInterval = null;
        isPlaying = false;
        elapsedSeconds = totalDuration;
        if (this.activeAudio) this.activeAudio.pause();
        drawPlayerUI();
        return;
      }
      
      const progressPercent = (elapsedSeconds / totalDuration) * 100;
      const progressFill = document.getElementById('audio-progress-fill');
      const elapsedEl = document.getElementById('audio-timer-elapsed');
      
      if (progressFill) progressFill.style.width = `${progressPercent}%`;
      if (elapsedEl) elapsedEl.textContent = this.formatTime(elapsedSeconds);
    };

    const drawPlayerUI = () => {
      const progressPercent = (elapsedSeconds / totalDuration) * 100;

      modalBody.innerHTML = `
        <div class="flex flex-col items-center justify-center p-6 text-center min-h-[350px]">
          <!-- Audio visualizer animation -->
          <div class="audio-visualizer-container flex items-end justify-center gap-1.5 h-16 mb-8 w-48">
            ${Array.from({ length: 12 }).map((_, idx) => `
              <span class="visualizer-bar w-1.5 rounded-full bg-gradient-to-t from-blue-500 to-indigo-400 block transition-all" style="height: 10%; animation: soundwave 1.2s ease-in-out infinite alternate; animation-delay: ${idx * 0.1}s; animation-play-state: ${isPlaying ? 'running' : 'paused'}"></span>
            `).join('')}
          </div>

          <h3 class="text-xl font-bold text-white mb-1 font-serif">${item.title}</h3>
          <p class="text-xs text-white/50 mb-3">${item.narrator || 'AI Voice Narration · Indian English'}</p>

          <!-- Language / Voice Selector -->
          <div class="flex items-center gap-2 mb-4 flex-wrap justify-center">
            <span class="text-[9px] text-white/30 uppercase tracking-wider font-bold">Voice:</span>
            ${[
              { code: 'en-IN', label: '🇮🇳 English' },
              { code: 'kn-IN', label: '✨ ಕನ್ನಡ' },
              { code: 'hi-IN', label: '🕉 हिन्दी' },
              { code: 'ta-IN', label: '🌺 தமிழ்' },
              { code: 'te-IN', label: '🌸 తెలుగు' },
            ].map(lang => `
              <button class="voice-lang-btn text-[10px] font-bold px-2.5 py-1 rounded-full border transition-all
                ${selectedLang === lang.code
                  ? 'bg-gold text-black border-gold'
                  : 'bg-white/5 text-white/50 border-white/10 hover:border-white/30'}"
                data-lang="${lang.code}">${lang.label}</button>
            `).join('')}
          </div>

          <div class="max-w-md bg-white/5 border border-white/5 rounded-xl p-3 mb-4">
            <p class="text-[10px] text-white/70 italic leading-relaxed text-left line-clamp-3 font-sans">"${textToSpeak}"</p>
          </div>

          <!-- Playback Speed dropdown -->
          <div class="flex items-center gap-1.5 mb-4 text-[10px] text-white/50 font-sans">
            <span>Narration Speed:</span>
            <select id="audio-speed-select" class="bg-[#101116] border border-white/10 rounded px-2.5 py-1 text-white text-[10px] focus:outline-none">
              <option value="0.75" ${this.audioRateMultiplier === 0.75 ? 'selected' : ''}>0.75x (Slower)</option>
              <option value="1.0" ${this.audioRateMultiplier === 1.0 ? 'selected' : ''}>1.0x (Normal)</option>
              <option value="1.25" ${this.audioRateMultiplier === 1.25 ? 'selected' : ''}>1.25x (Faster)</option>
              <option value="1.5" ${this.audioRateMultiplier === 1.5 ? 'selected' : ''}>1.5x (Very Fast)</option>
            </select>
          </div>

          <!-- Audio Progress Bar -->
          <div class="w-full max-w-md mb-6">
            <div class="w-full bg-white/10 rounded-full h-1.5 relative cursor-pointer" id="audio-progress-track">
              <div class="bg-gradient-to-r from-blue-500 to-indigo-500 h-1.5 rounded-full" id="audio-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="flex justify-between items-center mt-2 text-[10px] text-white/40 font-mono">
              <span id="audio-timer-elapsed">${this.formatTime(elapsedSeconds)}</span>
              <span>${this.formatTime(totalDuration)}</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-6">
            <button id="audio-rewind" class="w-10 h-10 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xs">⏮ 10s</button>
            <button id="audio-play-toggle" class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 text-white flex items-center justify-center text-2xl shadow-lg shadow-blue-500/20">
              ${isPlaying ? '⏸' : '▶'}
            </button>
            <button id="audio-forward" class="w-10 h-10 rounded-full bg-white/5 border border-white/5 hover:bg-white/10 text-white flex items-center justify-center text-xs">10s ⏭</button>
          </div>
        </div>
      `;

      // Bind language switcher buttons
      container.querySelectorAll('.voice-lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          selectedLang = btn.getAttribute('data-lang');
          if (isPlaying) {
            window.speechSynthesis.cancel();
            speakWith(textToSpeak);
          }
          drawPlayerUI();
        });
      });

      const speedSelect = document.getElementById('audio-speed-select');
      if (speedSelect) {
        speedSelect.addEventListener('change', (e) => {
          this.audioRateMultiplier = parseFloat(e.target.value);
          localStorage.setItem('hs_audio_rate', String(this.audioRateMultiplier));
          if (isPlaying) {
            window.speechSynthesis.cancel();
            speakWith(textToSpeak);
          }
        });
      }

      const playToggle = document.getElementById('audio-play-toggle');
      const rewindBtn = document.getElementById('audio-rewind');
      const forwardBtn = document.getElementById('audio-forward');

      playToggle.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
          // 1. Play background ambient loop
          if (this.activeAudio) {
            this.activeAudio.play().catch(err => console.log("Ambient score pending user interaction:", err));
          }

          // 2. Play or resume Text-to-Speech narration
          if (window.speechSynthesis.paused) {
            window.speechSynthesis.resume();
          } else {
            speakWith(textToSpeak);
          }

          // 3. Start progress interval timer
          if (!this.audioProgressInterval) {
            this.audioProgressInterval = setInterval(tickProgress, 1000);
          }
        } else {
          // Pause ambient audio and TTS
          if (this.activeAudio) this.activeAudio.pause();
          window.speechSynthesis.pause();
          clearInterval(this.audioProgressInterval);
          this.audioProgressInterval = null;
        }
        drawPlayerUI();
      });

      rewindBtn.addEventListener('click', () => {
        elapsedSeconds = Math.max(0, elapsedSeconds - 10);
        // Sync Speech by restarting at appropriate approximate offset
        window.speechSynthesis.cancel();
        if (isPlaying) {
          const approxCharIndex = Math.floor((elapsedSeconds / totalDuration) * textToSpeak.length);
          speakWith(textToSpeak.substring(approxCharIndex));
        }
        drawPlayerUI();
      });

      forwardBtn.addEventListener('click', () => {
        elapsedSeconds = Math.min(totalDuration, elapsedSeconds + 10);
        window.speechSynthesis.cancel();
        if (isPlaying && elapsedSeconds < totalDuration) {
          const approxCharIndex = Math.floor((elapsedSeconds / totalDuration) * textToSpeak.length);
          speakWith(textToSpeak.substring(approxCharIndex));
        }
        drawPlayerUI();
      });
    };

    drawPlayerUI();
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    
    // Stop and cleanup audio and speech when closing modal
    const originalClose = modal.querySelector('.modal-close');
    const cleanup = () => {
      window.speechSynthesis.cancel();
      if (this.activeAudio) {
        this.activeAudio.pause();
        this.activeAudio = null;
      }
      if (this.audioProgressInterval) {
        clearInterval(this.audioProgressInterval);
        this.audioProgressInterval = null;
      }
      originalClose.removeEventListener('click', cleanup);
    };
    originalClose.addEventListener('click', cleanup);
  }

  // Help functions for Simulated Player
  parseDurationToSeconds(durationStr) {
    const parts = durationStr.split(':');
    if (parts.length === 2) {
      return parseInt(parts[0]) * 60 + parseInt(parts[1]);
    }
    return 300; // default 5 mins
  }

  formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  // Modal handlers
  closeAllModals() {
    try {
      // Save playtime progress before clearing innerHTML
      if (this.activePlayItemId) {
        const elapsed = (Date.now() - this.activePlayStartTime) / 1000;
        const total = this.activePlayDuration;
        if (total && !isNaN(elapsed)) {
          let ratio = elapsed / total;
          if (ratio > 0.05) {
            if (ratio > 0.92) ratio = 0.95;
            this.progress[this.activePlayItemId] = { progress: ratio, timestamp: Date.now() };
            localStorage.setItem('hs_progress', JSON.stringify(this.progress));
            this.renderContentRows(); // Super fast render now
          }
        }
        this.activePlayItemId = null;
      }
    } catch (err) {
      console.warn("Error saving playtime progress:", err);
    }

    // ALWAYS close modals under all conditions
    document.querySelectorAll('.modal-overlay').forEach(modal => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
    
    // Reset modal container layout parameters
    const container = document.getElementById('media-modal-container');
    if (container) {
      container.classList.remove('max-w-5xl');
      container.classList.add('max-w-2xl');
      container.style.boxShadow = '';
    }

    // Stop playing active video or audio when closing
    const mediaBody = document.getElementById('media-modal-body');
    if (mediaBody) mediaBody.innerHTML = "";
    
    try {
      if (this.activeAudio) {
        this.activeAudio.pause();
        this.activeAudio = null;
        clearInterval(this.audioProgressInterval);
        this.audioProgressInterval = null;
      }
    } catch (err) {
      console.warn("Error pausing active audio:", err);
    }

    try {
      window.speechSynthesis.cancel();
    } catch (err) {}
  }

  // Checkout modal implementation (₹399 billing mock)
  // Checkout modal implementation (₹399 billing using Cashfree PG)
  openPaymentModal() {
    const modal = document.getElementById('payment-modal');
    if (!modal) return;
    
    const body = modal.querySelector('#payment-modal-body');
    body.innerHTML = `
      <div class="text-center p-4">
        <div class="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 text-gold flex items-center justify-center text-3xl mx-auto mb-4 animate-pulse">✨</div>
        <h3 class="text-2xl font-extrabold text-white font-serif mb-2">Heritage Stream Pass</h3>
        <p class="text-sm text-white/60 mb-6">Unlock all premium videos, audio lectures, interactive history map, and full game awards.</p>
        
        <!-- Pricing Card -->
        <div class="bg-gradient-to-r from-gold/10 to-amber-500/10 border border-gold/40 rounded-2xl p-6 mb-6 max-w-sm mx-auto relative overflow-hidden">
          <div class="absolute top-0 right-0 bg-gold text-black text-[9px] font-extrabold px-3 py-1 rounded-bl-lg uppercase tracking-wider">ANNUAL ACCESS</div>
          <span class="text-xs text-white/50 block mb-1">One-time payment</span>
          <span class="text-4xl font-black text-gold font-mono">₹399</span>
          <span class="text-sm text-white/60"> / Year</span>
        </div>

        <!-- Payment Fields -->
        <form id="payment-form" class="max-w-sm mx-auto text-left grid gap-4 mb-6">
          <div>
            <label class="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1.5">Your Full Name</label>
            <input type="text" id="pay-name" placeholder="e.g. Manjunatha Prasanna" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-gold/50 focus:outline-none transition-colors" required>
          </div>
          <div>
            <label class="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1.5">Email Address</label>
            <input type="email" id="pay-email" placeholder="e.g. service.weforyou@gmail.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-gold/50 focus:outline-none transition-colors" required>
          </div>
          <div>
            <label class="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1.5">Phone Number</label>
            <input type="tel" id="pay-phone" placeholder="e.g. 9035442904" pattern="[0-9]{10}" title="Please enter a valid 10-digit mobile number" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-gold/50 focus:outline-none transition-colors" required>
          </div>
          
          <button type="submit" class="w-full py-4 mt-2 bg-gradient-to-r from-gold to-amber-500 hover:from-gold/90 hover:to-amber-600 text-black font-extrabold rounded-xl text-sm tracking-wider uppercase transition-all shadow-lg shadow-gold/20 flex items-center justify-center gap-2">
            <span>Proceed to Payment</span>
            <span class="text-xs opacity-75">via Cashfree</span>
          </button>
        </form>
      </div>
    `;

    const form = body.querySelector('#payment-form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.processCashfreePayment();
    });

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Bulletproof close binder
    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        this.closeAllModals();
      };
    }
  }

  async processCashfreePayment() {
    const name = document.getElementById('pay-name')?.value || "";
    const email = document.getElementById('pay-email')?.value || "";
    const phone = document.getElementById('pay-phone')?.value || "";

    const body = document.querySelector('#payment-modal-body');
    body.innerHTML = `
      <div class="text-center p-8 flex flex-col items-center justify-center min-h-[300px]">
        <div class="payment-spinner w-12 h-12 rounded-full border-4 border-gold/30 border-t-gold animate-spin mb-6"></div>
        <h4 class="text-lg font-bold text-white mb-2">Connecting to Cashfree Gateway...</h4>
        <p class="text-xs text-white/50">Creating your secure billing session. Please do not close or refresh.</p>
      </div>
    `;

    try {
      const response = await fetch(API_BASE + '/api/create-cashfree-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, frontendOrigin: window.location.origin })
      });

      if (!response.ok) {
        throw new Error("Unable to create checkout order on the server.");
      }

      const resData = await response.json();
      if (!resData.payment_session_id) {
        throw new Error(resData.error || "Failed to retrieve session ID from Cashfree.");
      }

      // Initialize Cashfree in production mode
      const cashfreeInstance = window.Cashfree ? window.Cashfree({ mode: "production" }) : null;
      if (!cashfreeInstance) {
        throw new Error("Cashfree SDK failed to initialize in your browser.");
      }

      await cashfreeInstance.checkout({
        paymentSessionId: resData.payment_session_id,
        redirectTarget: "_self"
      });

    } catch (err) {
      console.warn("Cashfree PG Error:", err);
      body.innerHTML = `
        <div class="text-center p-6 flex flex-col items-center justify-center min-h-[300px]">
          <div class="w-12 h-12 rounded-full bg-red-500/10 border border-red-500/40 text-red-500 flex items-center justify-center text-2xl mb-4">❌</div>
          <h4 class="text-base font-bold text-white mb-2">Payment Gateway Error</h4>
          <p class="text-xs text-white/60 mb-6 max-w-xs">${err.message || 'Unable to connect to checkout server. Please try again.'}</p>
          <button id="fallback-retry-btn" class="w-full py-3.5 bg-gradient-to-r from-gold to-amber-500 hover:from-gold/90 hover:to-amber-600 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all">Retry Payment</button>
        </div>
      `;
      const retryBtn = document.getElementById('fallback-retry-btn');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          this.openPaymentModal();
        });
      }
    }
  }

  checkPaymentStatus() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('payment')) {
      const status = urlParams.get('payment');
      const orderId = urlParams.get('order_id') || "";
      
      // Clean query parameters from URL without reloading
      const cleanUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
      window.history.replaceState({ path: cleanUrl }, '', cleanUrl);

      if (status === 'success') {
        this.isSubscribed = true;
        localStorage.setItem('hs_subscribed', 'true');
        localStorage.setItem('hs_subscribed_name', 'Premium Pass Member');
        
        this.renderHeader();
        this.renderSpotlight();
        this.renderContentRows();
        this.setupSubscriptionUI();

        // Show Success Dialog
        const modal = document.getElementById('payment-modal');
        if (modal) {
          const body = modal.querySelector('#payment-modal-body');
          body.innerHTML = `
            <div class="text-center p-8 flex flex-col items-center justify-center min-h-[300px]">
              <div class="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/40 text-emerald-400 flex items-center justify-center text-3xl mb-6">✓</div>
              <h4 class="text-2xl font-bold text-white mb-2 font-serif">Payment Verified!</h4>
              <p class="text-sm text-emerald-400/90 font-medium mb-4">Your subscription is now active.</p>
              <p class="text-xs text-white/50 mb-3">Order ID: <code class="font-mono text-gold bg-white/5 px-2 py-0.5 rounded">${orderId}</code></p>
              <p class="text-xs text-white/60 mb-8 max-w-xs">Thank you! Your Premium Pass is fully active. Explore the entire heritage catalog unrestricted.</p>
              <button id="payment-continue-btn" class="px-8 py-3 bg-white text-black hover:bg-white/90 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all">Start Exploring</button>
            </div>
          `;
          
          const continueBtn = modal.querySelector('#payment-continue-btn');
          if (continueBtn) {
            continueBtn.onclick = () => {
              this.closeAllModals();
            };
          }
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
      } else if (status === 'failed') {
        // Show Failed Dialog
        const modal = document.getElementById('payment-modal');
        if (modal) {
          const body = modal.querySelector('#payment-modal-body');
          body.innerHTML = `
            <div class="text-center p-8 flex flex-col items-center justify-center min-h-[300px]">
              <div class="w-16 h-16 rounded-full bg-crimson/10 border border-crimson/40 text-crimson flex items-center justify-center text-3xl mb-6">✗</div>
              <h4 class="text-2xl font-bold text-white mb-2 font-serif">Payment Failed</h4>
              <p class="text-sm text-crimson/90 font-medium mb-4">Transaction could not be completed.</p>
              <p class="text-xs text-white/60 mb-8 max-w-xs">Your payment was cancelled or declined. Please try again or choose another payment method.</p>
              <button id="payment-retry-btn" class="px-8 py-3 bg-white text-black hover:bg-white/90 font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all">Try Again</button>
            </div>
          `;
          const retryBtn = modal.querySelector('#payment-retry-btn');
          if (retryBtn) {
            retryBtn.onclick = () => {
              this.openPaymentModal();
            };
          }
          modal.classList.remove('hidden');
          modal.classList.add('flex');
        }
      }
    }
  }

  // Handle premium locked prompts inside games/features
  setupSubscriptionUI() {
    const promoCard = document.getElementById('premium-promo-card');
    if (!promoCard) return;

    if (this.isSubscribed) {
      promoCard.innerHTML = `
        <div class="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6 text-center">
          <h4 class="text-lg font-bold text-emerald-400 mb-1 font-serif">✨ Premium Pass Active</h4>
          <p class="text-xs text-white/70">Thank you for supporting the preservation and education of our cultural heritage.</p>
        </div>
      `;
    } else {
      promoCard.innerHTML = `
        <div class="bg-gradient-to-br from-gold/10 to-amber-700/15 border border-gold/30 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
          <div class="absolute -right-16 -bottom-16 w-48 h-48 rounded-full bg-gold/5 blur-3xl"></div>
          <div>
            <h4 class="text-xl font-bold text-gold mb-2 font-serif">Unlock Unlimited Heritage Knowledge</h4>
            <p class="text-sm text-white/70 max-w-xl">Support our research and unlock access to all premium documentaries, exclusive historical audiobooks, and score tracking dashboards for ₹399/year.</p>
          </div>
          <button class="trigger-checkout px-8 py-4 bg-gradient-to-r from-gold to-amber-500 hover:from-gold/90 hover:to-amber-600 text-black font-extrabold rounded-xl text-sm tracking-wider uppercase whitespace-nowrap transition-all shadow-lg shadow-gold/20 flex items-center gap-2">
            <span>Get Pass (₹399)</span>
          </button>
        </div>
      `;
      // Re-bind click event to checkout trigger
      promoCard.querySelector('.trigger-checkout').addEventListener('click', () => {
        this.openPaymentModal();
      });
    }
  }

  setupAmbientMusic() {
    const btn = document.getElementById('ambient-music-btn');
    if (!btn) return;
    
    // Serene nature ambient loop track
    const trackUrl = "https://actions.google.com/sounds/v1/ambiences/wind_chimes_short.ogg";
    this.ambientMusic = new Audio(trackUrl);
    this.ambientMusic.loop = true;
    this.ambientMusic.volume = 0.15; // low ambient background volume
    
    let isAmbientPlaying = false;
    
    btn.addEventListener('click', () => {
      isAmbientPlaying = !isAmbientPlaying;
      if (isAmbientPlaying) {
        this.ambientMusic.play().catch(err => console.log("Ambient music delayed by gesture:", err));
        btn.classList.add('border-gold', 'text-gold');
        btn.innerHTML = `<span class="animate-bounce">🪕</span> <span>Playing Ambient</span>`;
      } else {
        this.ambientMusic.pause();
        btn.classList.remove('border-gold', 'text-gold');
        btn.innerHTML = `<span>🪕</span> <span>Ambient Music</span>`;
      }
    });
  }

  setupPersonaFilters() {
    const tabBtns = document.querySelectorAll('.persona-tab-btn');
    const standardContainer = document.getElementById('standard-library-rows');
    const gridContainer = document.getElementById('persona-filtered-grid');
    if (!tabBtns.length || !standardContainer || !gridContainer) return;

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle Active Styles
        tabBtns.forEach(b => {
          b.className = "persona-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all border border-white/10 hover:border-gold/30 text-white/70";
        });
        btn.className = "persona-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all border border-gold bg-gold text-black shadow-lg shadow-gold/15";

        const persona = btn.getAttribute('data-persona');
        if (persona === 'all') {
          gridContainer.classList.add('hidden');
          standardContainer.classList.remove('hidden');
        } else {
          // Filter matching content from docuSeries & audioStories
          const matchingDocs = this.contentData.docuSeries.filter(x => x.personas && x.personas.includes(persona));
          const matchingAudios = this.contentData.audioStories.filter(x => x.personas && x.personas.includes(persona));

          // Combine and map to HTML cards
          const docHTML = matchingDocs.map(item => this.createContentCardHTML(item, false));
          const audioHTML = matchingAudios.map(item => this.createContentCardHTML(item, true));
          const combinedHTML = [...docHTML, ...audioHTML].join('');

          if (combinedHTML.length > 0) {
            gridContainer.innerHTML = combinedHTML;
          } else {
            gridContainer.innerHTML = `
              <div class="col-span-full text-center py-12 text-white/40 text-sm">
                No items matching this interest area yet. Check back soon!
              </div>
            `;
          }

          standardContainer.classList.add('hidden');
          gridContainer.classList.remove('hidden');
          
          // Re-bind interactions for newly injected cards
          this.bindCardInteractions(gridContainer);
        }
      });
    });
  }

  setupSearch() {
    const searchInput = document.getElementById('search-input');
    const standardContainer = document.getElementById('standard-library-rows');
    const gridContainer = document.getElementById('persona-filtered-grid');
    if (!searchInput || !standardContainer || !gridContainer) return;

    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      
      if (query.length === 0) {
        const tabBtns = document.querySelectorAll('.persona-tab-btn');
        tabBtns.forEach((b, idx) => {
          if (idx === 0) {
            b.className = "persona-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all border border-gold bg-gold text-black shadow-lg shadow-gold/15";
          } else {
            b.className = "persona-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all border border-white/10 hover:border-gold/30 text-white/70";
          }
        });
        
        gridContainer.classList.add('hidden');
        standardContainer.classList.remove('hidden');
        return;
      }

      const tabBtns = document.querySelectorAll('.persona-tab-btn');
      tabBtns.forEach(b => {
        b.className = "persona-tab-btn px-4 py-2 rounded-xl text-xs font-bold transition-all border border-white/10 hover:border-gold/30 text-white/70";
      });

      const matchingDocs = this.contentData.docuSeries.filter(x => 
        (x.title && x.title.toLowerCase().includes(query)) ||
        (x.tagline && x.tagline.toLowerCase().includes(query)) ||
        (x.description && x.description.toLowerCase().includes(query)) ||
        (x.category && x.category.toLowerCase().includes(query))
      );
      
      const matchingAudios = this.contentData.audioStories.filter(x => 
        (x.title && x.title.toLowerCase().includes(query)) ||
        (x.tagline && x.tagline.toLowerCase().includes(query)) ||
        (x.description && x.description.toLowerCase().includes(query)) ||
        (x.category && x.category.toLowerCase().includes(query))
      );

      const docHTML = matchingDocs.map(item => this.createContentCardHTML(item, false));
      const audioHTML = matchingAudios.map(item => this.createContentCardHTML(item, true));
      const combinedHTML = [...docHTML, ...audioHTML].join('');

      if (combinedHTML.length > 0) {
        gridContainer.innerHTML = combinedHTML;
      } else {
        gridContainer.innerHTML = `
          <div class="col-span-full text-center py-16 text-white/40 text-sm">
            <span class="text-3xl block mb-3">🔍</span>
            No heritage records match "<span class="text-gold font-bold">${e.target.value}</span>". Try another search query!
          </div>
        `;
      }

      standardContainer.classList.add('hidden');
      gridContainer.classList.remove('hidden');
      
      this.bindCardInteractions(gridContainer);
    });
  }

  // Game tabs setup
  setupGameToggles() {
    const tabBtns = document.querySelectorAll('.game-tab-btn');
    
    // Initialize games
    const initGame = (gameType) => {
      if (gameType === 'trivia') {
        const game = new TriviaGame('game-arena-body', (score) => this.saveScore('trivia', score));
        game.start();
      } else if (gameType === 'chronology') {
        const game = new ChronologyGame('game-arena-body', (score) => this.saveScore('chronology', score));
        game.start();
      } else if (gameType === 'memory') {
        const game = new MemoryGame('game-arena-body', (score) => this.saveScore('memory', score));
        game.start();
      }
    };

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        tabBtns.forEach(b => b.classList.remove('active-game-tab', 'text-gold', 'border-gold'));
        tabBtns.forEach(b => b.classList.add('text-white/60', 'border-transparent'));
        
        btn.classList.add('active-game-tab', 'text-gold', 'border-gold');
        btn.classList.remove('text-white/60', 'border-transparent');
        
        const gameType = btn.getAttribute('data-game');
        initGame(gameType);
      });
    });

    // Start default trivia game
    initGame('trivia');
  }

  saveScore(gameType, score) {
    // Save highscore locally
    DatabaseService.saveUserScore(gameType, score);
    this.userScores = DatabaseService.getUserScores();
    
    // Award Gyan Coins based on game completion percentage
    const coinsEarned = Math.floor(score / 2);
    if (coinsEarned > 0) {
      this.awardGyanCoins(coinsEarned, gameType);
    } else {
      this.renderScoresDashboard();
    }
  }

  awardGyanCoins(amount, gameType) {
    this.gyanCoins += amount;
    localStorage.setItem('hs_gyan_coins', String(this.gyanCoins));
    
    SoundEffects.playSuccess(); // Play victory synthesizer chime!
    this.showToast(`🪙 +${amount} Gyan Coins Awarded for playing ${gameType}!`);
    this.renderScoresDashboard();
  }

  showToast(message) {
    let toast = document.getElementById('gyan-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'gyan-toast';
      toast.className = 'fixed top-6 left-1/2 -translate-x-1/2 z-[200] bg-gold text-black font-extrabold text-xs px-6 py-3.5 rounded-full shadow-2xl flex items-center gap-2 border border-white/20 transform -translate-y-20 transition-all duration-500 opacity-0';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<span>✨</span> <span>${message}</span>`;
    
    // Trigger animation
    toast.classList.remove('-translate-y-20', 'opacity-0');
    toast.classList.add('translate-y-0', 'opacity-100');
    
    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('-translate-y-20', 'opacity-0');
    }, 4000);
  }

  bindRewardsShop() {
    const shopGrid = document.getElementById('gyan-shop-grid');
    if (!shopGrid) return;

    // Render initial rewards states
    this.unlockedRewards.forEach(rewardId => {
      const rewardCard = document.getElementById(`reward-${rewardId}`);
      if (rewardCard) {
        const btn = rewardCard.querySelector('.redeem-reward-btn');
        if (btn) {
          btn.textContent = "Unlocked";
          btn.disabled = true;
          btn.className = "px-4 py-2 bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] uppercase rounded-lg tracking-wider border border-emerald-500/30 cursor-not-allowed";
        }
      }
    });

    // Bind click handlers
    shopGrid.querySelectorAll('.redeem-reward-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const rewardId = btn.getAttribute('data-id');
        const cost = parseInt(btn.getAttribute('data-cost'));

        if (this.unlockedRewards.includes(rewardId)) {
          this.showToast("You have already unlocked this reward!");
          return;
        }

        if (this.gyanCoins >= cost) {
          // Deduct coins & unlock
          this.gyanCoins -= cost;
          localStorage.setItem('hs_gyan_coins', String(this.gyanCoins));
          
          this.unlockedRewards.push(rewardId);
          localStorage.setItem('hs_unlocked_rewards', JSON.stringify(this.unlockedRewards));

          SoundEffects.playCoin(); // Play coin chime sound!
          this.showToast(`🎉 Successfully Unlocked Reward! 🪙 -${cost} Coins.`);
          
          // Update button styling
          btn.textContent = "Unlocked";
          btn.disabled = true;
          btn.className = "px-4 py-2 bg-emerald-500/20 text-emerald-400 font-extrabold text-[10px] uppercase rounded-lg tracking-wider border border-emerald-500/30 cursor-not-allowed";

          this.renderScoresDashboard();
        } else {
          this.showToast(`❌ Insufficient Gyan Coins! You need ${cost - this.gyanCoins} more coins.`);
        }
      });
    });
  }

  // 360 Degree Panorama Viewer Simulation inside Media Modal
  openVRPan(siteKey) {
    const modal = document.getElementById('media-modal');
    const modalTitle = document.getElementById('media-modal-title');
    const modalBody = document.getElementById('media-modal-body');

    const siteImages = {
      taj: '/images/ajanta.jpg', // fallback or placeholder
      ajanta: '/images/ajanta.jpg',
      hampi: '/images/hampi.jpg',
      konark: '/images/chola.jpg' // fallback or placeholder
    };

    const siteTitles = {
      taj: 'Taj Mahal Marble Dome',
      ajanta: 'Ajanta Cave Murals',
      hampi: 'Hampi Vitthala Stone Chariot',
      konark: 'Konark Sun Temple Wheels'
    };

    const imgPath = siteImages[siteKey] || '/images/hampi.jpg';
    const siteTitle = siteTitles[siteKey] || 'Historical Site Panorama';

    modalTitle.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="bg-gold text-black text-[10px] font-bold px-2 py-0.5 rounded">🕶️ 360° VR TOUR</span>
        <h2 class="text-lg md:text-xl font-bold font-serif text-white">${siteTitle}</h2>
      </div>
    `;

    modalBody.innerHTML = `
      <div class="p-6 space-y-6 text-center">
        <!-- Interactive Viewport -->
        <div class="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-inner shadow-black">
          <div id="pano-view" class="w-[200%] h-full absolute top-0 left-0 bg-center" style="background-image: url('${imgPath}'); background-size: cover; transform: translateX(-25%); transition: transform 0.1s ease-out;"></div>
          <!-- Compass Overlay -->
          <div class="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15 text-[10px] font-bold text-gold uppercase tracking-widest flex items-center gap-1.5 pointer-events-none select-none">
            <span class="text-sm font-sans" id="pano-compass">🧭</span> <span id="pano-bearing">N 0°</span>
          </div>
        </div>

        <!-- Pan control slider -->
        <div class="space-y-2 max-w-md mx-auto">
          <label class="text-[10px] font-bold text-white/50 uppercase tracking-widest block font-sans">Slide to look around the temple grounds</label>
          <input type="range" id="pano-slider" min="0" max="100" value="50" class="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none">
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const slider = document.getElementById('pano-slider');
    const pano = document.getElementById('pano-view');
    const bearingEl = document.getElementById('pano-bearing');
    const compassEl = document.getElementById('pano-compass');

    if (slider && pano) {
      slider.addEventListener('input', (e) => {
        const val = parseInt(e.target.value);
        // Translate from 0% to -50% (moves background panorama left/right)
        pano.style.transform = `translateX(-${val / 2}%)`;

        // Calculate custom bearings (degrees 0 to 360)
        const degrees = Math.floor((val / 100) * 360);
        let direction = 'N';
        if (degrees >= 45 && degrees < 135) direction = 'E';
        else if (degrees >= 135 && degrees < 225) direction = 'S';
        else if (degrees >= 225 && degrees < 315) direction = 'W';

        if (bearingEl) bearingEl.textContent = `${direction} ${degrees}°`;
        if (compassEl) compassEl.style.transform = `rotate(${degrees}deg)`;
      });
    }
  }

  renderScoresDashboard() {
    const triviaScore = document.getElementById('dash-score-trivia');
    const chronoScore = document.getElementById('dash-score-chrono');
    const memoryScore = document.getElementById('dash-score-memory');
    const coinsEl = document.getElementById('profile-coins');

    if (triviaScore) triviaScore.textContent = `${this.userScores.trivia}%`;
    if (chronoScore) chronoScore.textContent = `${this.userScores.chronology}%`;
    if (memoryScore) memoryScore.textContent = `${this.userScores.memory}%`;
    if (coinsEl) coinsEl.textContent = this.gyanCoins;

    // Update level and badge rank dynamically based on total coins
    const levelEl = document.getElementById('profile-level');
    const rankEl = document.getElementById('profile-name');
    const descEl = document.getElementById('profile-rank-desc');

    if (levelEl && rankEl) {
      if (this.gyanCoins >= 150) {
        levelEl.textContent = "Level 3";
        rankEl.textContent = "Heritage Master 🏛️";
        if (descEl) descEl.textContent = "Ultimate preserver of archaeological timeline secrets.";
      } else if (this.gyanCoins >= 50) {
        levelEl.textContent = "Level 2";
        rankEl.textContent = "Vedic Scholar 📜";
        if (descEl) descEl.textContent = "Deep cultural exploration and chronicles unlocked.";
      } else {
        levelEl.textContent = "Level 1";
        rankEl.textContent = "Temple Explorer 🧭";
        if (descEl) descEl.textContent = "Start solving history quests to gain wisdom points.";
      }
    }
  }
  // ── DIVYA DARSHANA (SPIRITUAL COMPANION) METHODS ──
  initDivyaDarshana() {
    this.renderPanchang();
    this.renderAyurvedaGrid();
    this.setupAyurvedaListeners();
    this.setupPranayamaListeners();
    
    // Karnataka Temple Guide initializations
    this.selectedTempleDeity = 'all';
    this.templeSearchQuery = '';
    this.renderKarnatakaTemplesGrid();
    this.setupTempleListeners();
    this.setupDivyaSubTabs();
  }

  renderPanchang() {
    const today = new Date();
    const day = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();
    const dayOfWeek = today.getDay();

    // Deterministic offset calculations based on current date
    const monthIdx = (month + (year % 3)) % MONTHS_LUNAR.length;
    const tithiIdx = (day + month * 2 + (year % 5)) % TITHIS.length;
    const naksIdx = (day + month * 3 + (year % 7)) % NAKSHATRAS.length;

    // Rahu Kala / Yamaganda table
    const rahuTable = [
      "4:30 PM - 6:00 PM", // Sun
      "7:30 AM - 9:00 AM", // Mon
      "3:00 PM - 4:30 PM", // Tue
      "12:00 PM - 1:30 PM",// Wed
      "1:30 PM - 3:00 PM", // Thu
      "10:30 AM - 12:00 PM",// Fri
      "9:00 AM - 10:30 AM" // Sat
    ];

    const yamaTable = [
      "12:00 PM - 1:30 PM", // Sun
      "10:30 AM - 12:00 PM",// Mon
      "9:00 AM - 10:30 AM",  // Tue
      "7:30 AM - 9:00 AM",  // Wed
      "6:00 AM - 7:30 AM",  // Thu
      "3:00 PM - 4:30 PM",  // Fri
      "1:30 PM - 3:00 PM"   // Sat
    ];

    const todayDateStr = today.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
    const dateBadge = document.getElementById('panchang-today-date');
    if (dateBadge) dateBadge.textContent = todayDateStr;

    // Ticker Update - Prepend Panchang info
    const tickerText = document.getElementById('ticker-text');
    if (tickerText) {
      const panchangTicker = ` Tithi: ${TITHIS[tithiIdx]} | Nakshatra: ${NAKSHATRAS[naksIdx]} | Month: ${MONTHS_LUNAR[monthIdx]} &bull; `;
      tickerText.innerHTML = panchangTicker + tickerText.innerHTML;
    }

    const monthEl = document.getElementById('panchang-month');
    const tithiEl = document.getElementById('panchang-tithi');
    const naksEl = document.getElementById('panchang-nakshatra');
    const abhiEl = document.getElementById('panchang-abhijit');
    const rahuEl = document.getElementById('panchang-rahu');

    if (monthEl) monthEl.textContent = MONTHS_LUNAR[monthIdx] + " Masa";
    if (tithiEl) tithiEl.textContent = TITHIS[tithiIdx];
    if (naksEl) naksEl.textContent = NAKSHATRAS[naksIdx];
    if (abhiEl) abhiEl.textContent = "11:46 AM - 12:38 PM";
    if (rahuEl) rahuEl.textContent = rahuTable[dayOfWeek];
  }

  renderAyurvedaGrid() {
    const grid = document.getElementById('ayurveda-remedies-grid');
    if (!grid) return;

    // Filter remedies
    const filtered = AYURVEDA_REMEDIES.filter(rem => {
      const matchesCat = this.selectedAyurvedaCategory === 'all' || rem.category === this.selectedAyurvedaCategory;
      const matchesSearch = rem.title.toLowerCase().includes(this.ayurvedaSearchQuery) ||
                            rem.description.toLowerCase().includes(this.ayurvedaSearchQuery) ||
                            rem.ingredients.toLowerCase().includes(this.ayurvedaSearchQuery);
      return matchesCat && matchesSearch;
    });

    if (!filtered.length) {
      grid.innerHTML = `<div class="col-span-2 text-center text-white/40 py-8 text-xs">No remedies found. Try a different search!</div>`;
      return;
    }

    grid.innerHTML = filtered.map(rem => `
      <div class="ayur-card relative overflow-hidden" data-rem-id="${rem.id}">
        <span class="text-3xl mb-3 block">${rem.icon}</span>
        <span class="text-[9px] font-bold text-gold uppercase tracking-wider bg-gold/10 border border-gold/25 px-2 py-0.5 rounded-full mb-2 inline-block">${rem.category}</span>
        <h4 class="font-bold text-white text-sm font-serif mb-1">${rem.title}</h4>
        <p class="text-[11px] text-white/60 line-clamp-2 leading-relaxed mb-3">${rem.description}</p>
        <span class="text-[10px] text-gold font-bold flex items-center gap-1 hover:underline">
          <span>📖 View Recipe</span> &rarr;
        </span>
      </div>
    `).join('');

    // Bind card clicks
    grid.querySelectorAll('.ayur-card').forEach(card => {
      card.addEventListener('click', () => {
        const id = card.getAttribute('data-rem-id');
        const remedy = AYURVEDA_REMEDIES.find(r => r.id === id);
        if (remedy) this.openAyurvedaRemedyModal(remedy);
      });
    });
  }

  setupAyurvedaListeners() {
    const searchInput = document.getElementById('ayurveda-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.ayurvedaSearchQuery = e.target.value.toLowerCase().trim();
        this.renderAyurvedaGrid();
      });
    }

    document.querySelectorAll('.ayur-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active styling
        document.querySelectorAll('.ayur-tab-btn').forEach(b => {
          b.className = "ayur-tab-btn flex-shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-white/10 hover:border-gold/30 text-white/70";
        });
        btn.className = "ayur-tab-btn flex-shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold tracking-wider uppercase border border-gold bg-gold text-black shadow-lg";

        this.selectedAyurvedaCategory = btn.getAttribute('data-category');
        this.renderAyurvedaGrid();
      });
    });
  }

  renderKarnatakaTemplesGrid() {
    const grid = document.getElementById('karnataka-temples-grid');
    if (!grid) return;

    // Filter temples
    let filtered = KARNATAKA_TEMPLES.filter(temp => {
      // Filter by category selection (e.g. Hoysala, Shakti Peetha, Dvaita Matha)
      const matchesCategory = !this.selectedTempleCategory || this.selectedTempleCategory === 'all' || 
                              temp.categories.includes(this.selectedTempleCategory);
      
      const matchesSearch = temp.title.toLowerCase().includes(this.templeSearchQuery) ||
                            temp.location.toLowerCase().includes(this.templeSearchQuery) ||
                            temp.deityTag.toLowerCase().includes(this.templeSearchQuery) ||
                            temp.description.toLowerCase().includes(this.templeSearchQuery);
      return matchesCategory && matchesSearch;
    });

    // If Nearby sorting is active, sort by distance ascending
    if (this.sortByDistanceActive) {
      filtered.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
    }

    if (!filtered.length) {
      grid.innerHTML = `<div class="col-span-2 text-center text-white/40 py-12 text-xs font-sans">No temples found. Try a different search/filter!</div>`;
      return;
    }

    grid.innerHTML = filtered.map(temp => {
      // Dynamic rendering matching user screenshot details
      const distanceBadge = temp.distance !== undefined
        ? `<span class="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-2 py-0.5 rounded-full">📍 ${temp.distance.toFixed(1)} km away</span>`
        : '';
        
      return `
        <div class="ayur-card relative overflow-hidden flex flex-col justify-between border border-white/5 bg-[#16171d] hover:border-gold/30 transition-all p-5 rounded-2xl" data-temp-id="${temp.id}">
          <div>
            <!-- Header: Title, rating, icon, and location -->
            <div class="flex items-start justify-between mb-3.5">
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-lg select-none">
                  ${temp.icon || '🛕'}
                </div>
                <div>
                  <h4 class="font-bold text-white text-base font-serif leading-tight">${temp.title}</h4>
                  <span class="text-xs text-gold/80 font-sans">${temp.location}</span>
                </div>
              </div>
              
              <div class="flex flex-col items-end gap-1.5">
                <span class="text-xs font-bold text-gold flex items-center gap-1">
                  ⭐ ${temp.rating}
                </span>
                ${distanceBadge}
              </div>
            </div>

            <!-- Pill Badges -->
            <div class="flex items-center gap-2 mb-3.5 flex-wrap">
              ${temp.categories.map(c => `
                <span class="text-[9px] font-bold text-white/60 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded-full uppercase tracking-wider">${c}</span>
              `).join('')}
              <span class="text-[9px] font-bold text-gold bg-gold/10 border border-gold/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">🙏 ${temp.deityTag}</span>
            </div>

            <!-- Short description -->
            <p class="text-xs text-white/60 leading-relaxed mb-4 font-sans pr-1">
              ${temp.description}
            </p>

            <!-- Timings & Phone -->
            <div class="space-y-1.5 text-[10px] text-white/40 font-mono mb-5 border-t border-white/5 pt-3">
              <div class="flex items-center gap-1.5">
                <span>⏰</span>
                <span>${temp.timings}</span>
              </div>
              <div class="flex items-center gap-1.5">
                <span>📞</span>
                <span>${temp.phone}</span>
              </div>
            </div>
          </div>

          <!-- Open in Maps Button (high priority maps link) -->
          <button class="open-maps-btn w-full py-2.5 bg-gold hover:bg-gold/90 text-black font-black rounded-xl text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5" data-lat="${temp.coords.lat}" data-lng="${temp.coords.lng}" data-title="${temp.title}">
            🗺️ Open in Maps
          </button>
        </div>
      `;
    }).join('');

    // Bind card clicks
    grid.querySelectorAll('.ayur-card').forEach(card => {
      card.addEventListener('click', (e) => {
        // Prevent click trigger if they clicked maps button
        if (e.target.closest('.open-maps-btn')) return;
        const id = card.getAttribute('data-temp-id');
        const temple = KARNATAKA_TEMPLES.find(t => t.id === id);
        if (temple) this.openKarnatakaTempleModal(temple);
      });
    });

    // Bind Maps Button clicks
    grid.querySelectorAll('.open-maps-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const lat = btn.getAttribute('data-lat');
        const lng = btn.getAttribute('data-lng');
        const title = btn.getAttribute('data-title');
        // Open google maps directions
        const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
        window.open(mapsUrl, '_blank');
      });
    });
  }

  openKarnatakaTempleModal(temple) {
    const modal = document.getElementById('media-modal');
    const modalTitle = document.getElementById('media-modal-title');
    const modalBody = document.getElementById('media-modal-body');

    modalTitle.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="bg-gold text-black text-[10px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wider">SACRED DARSHANA</span>
        <h2 class="text-lg md:text-xl font-bold font-serif text-white">${temple.title}</h2>
      </div>
    `;

    modalBody.innerHTML = `
      <div class="p-6 space-y-6">
        <div class="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-lg shadow-black/40 relative"
          style="background: linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.85)), url('${temple.image}') center/cover no-repeat;">
          <div class="absolute bottom-4 left-4 text-white">
            <span class="text-xs bg-gold/20 border border-gold text-gold font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">${temple.deityTag}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-4 text-xs font-sans">
          <div class="bg-white/5 border border-white/5 rounded-xl p-3">
            <span class="text-white/40 block mb-1">DISTRICT & LOCATION</span>
            <span class="text-white font-bold text-sm">${temple.location}</span>
          </div>
          <div class="bg-white/5 border border-white/5 rounded-xl p-3">
            <span class="text-white/40 block mb-1">TELEPHONE CONTACT</span>
            <span class="text-white font-bold text-xs font-mono">${temple.phone}</span>
          </div>
          <div class="bg-white/5 border border-white/5 rounded-xl p-3">
            <span class="text-white/40 block mb-1">CONSTRUCTION ERA</span>
            <span class="text-white font-bold text-sm">${temple.era}</span>
          </div>
          <div class="bg-white/5 border border-white/5 rounded-xl p-3">
            <span class="text-white/40 block mb-1">BUILDER / PATRON</span>
            <span class="text-white font-bold text-sm">${temple.architect}</span>
          </div>
        </div>

        <div class="space-y-2">
          <h4 class="text-sm font-bold text-white font-serif">Historical & Spiritual Significance</h4>
          <p class="text-xs text-white/70 leading-relaxed font-sans">${temple.description}</p>
        </div>

        <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
          <span class="text-lg">🕉️</span>
          <div class="text-[10px] text-white/60 leading-normal font-sans">
            <strong>Pilgrimage Guide</strong>: For special seva bookings, temple timings, or route details, refer to the Sanatana360 spiritual companion portal.
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  haversine(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  setupTempleListeners() {
    const searchInput = document.getElementById('temple-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.templeSearchQuery = e.target.value.toLowerCase().trim();
        this.renderKarnatakaTemplesGrid();
      });
    }

    // Category selection tabs matching screenshot
    document.querySelectorAll('.temple-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.temple-tab-btn').forEach(b => {
          b.className = "temple-tab-btn flex-shrink-0 px-3.5 py-1.5 rounded-full font-bold tracking-wider uppercase border border-white/10 hover:border-gold/30 text-white/70";
        });
        btn.className = "temple-tab-btn flex-shrink-0 px-3.5 py-1.5 rounded-full font-bold tracking-wider uppercase border border-gold bg-gold text-black shadow-lg";

        this.selectedTempleCategory = btn.getAttribute('data-category');
        this.renderKarnatakaTemplesGrid();
      });
    });

    // Nearby Temples Geolocation trigger
    const nearbyBtn = document.getElementById('nearby-temples-btn');
    if (nearbyBtn) {
      nearbyBtn.addEventListener('click', () => {
        nearbyBtn.innerHTML = '⚡ Scanning GPS...';
        nearbyBtn.classList.add('animate-pulse');
        
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const userLat = pos.coords.latitude;
            const userLng = pos.coords.longitude;
            
            KARNATAKA_TEMPLES.forEach(temp => {
              temp.distance = this.haversine(userLat, userLng, temp.coords.lat, temp.coords.lng);
            });
            
            this.sortByDistanceActive = true;
            nearbyBtn.innerHTML = '📍 GPS Active';
            nearbyBtn.classList.remove('animate-pulse');
            
            this.renderKarnatakaTemplesGrid();
          },
          (err) => {
            console.warn("GPS access blocked, falling back to Bengaluru coordinates", err);
            // Default Bengalur coords
            const userLat = 12.9716;
            const userLng = 77.5946;
            
            KARNATAKA_TEMPLES.forEach(temp => {
              temp.distance = this.haversine(userLat, userLng, temp.coords.lat, temp.coords.lng);
            });
            
            this.sortByDistanceActive = true;
            nearbyBtn.innerHTML = '📍 Bangalore Base';
            nearbyBtn.classList.remove('animate-pulse');
            
            alert("Location access denied. Displaying nearest temples from Bengaluru.");
            this.renderKarnatakaTemplesGrid();
          }
        );
      });
    }
  }

  setupDivyaSubTabs() {
    const tabAyur = document.getElementById('divya-tab-ayur');
    const tabTemple = document.getElementById('divya-tab-temple');
    const panelAyur = document.getElementById('divya-panel-ayur');
    const panelTemple = document.getElementById('divya-panel-temple');

    if (tabAyur && tabTemple && panelAyur && panelTemple) {
      tabAyur.addEventListener('click', () => {
        tabAyur.className = "flex-1 py-2 text-xs font-extrabold rounded-lg bg-gold text-black transition-all";
        tabTemple.className = "flex-1 py-2 text-xs font-bold text-white/60 hover:text-white transition-all";
        panelAyur.classList.remove('hidden');
        panelTemple.classList.add('hidden');
      });

      tabTemple.addEventListener('click', () => {
        tabTemple.className = "flex-1 py-2 text-xs font-extrabold rounded-lg bg-gold text-black transition-all";
        tabAyur.className = "flex-1 py-2 text-xs font-bold text-white/60 hover:text-white transition-all";
        panelTemple.classList.remove('hidden');
        panelAyur.classList.add('hidden');
        
        // Ensure variables are instantiated
        if (this.sortByDistanceActive === undefined) {
          this.sortByDistanceActive = false;
        }
        if (this.selectedTempleCategory === undefined) {
          this.selectedTempleCategory = 'all';
        }
        if (this.templeSearchQuery === undefined) {
          this.templeSearchQuery = '';
        }
        
        this.renderKarnatakaTemplesGrid();
      });
    }
  }

  openAyurvedaRemedyModal(remedy) {
    const modal = document.getElementById('media-modal');
    const modalTitle = document.getElementById('media-modal-title');
    const modalBody = document.getElementById('media-modal-body');

    modalTitle.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded">AYURVEDA RECIPE</span>
        <h2 class="text-lg md:text-xl font-bold font-serif text-white">${remedy.title}</h2>
      </div>
    `;

    modalBody.innerHTML = `
      <div class="p-6 space-y-6">
        <div class="flex items-center gap-4 border-b border-white/10 pb-4">
          <span class="text-5xl">${remedy.icon}</span>
          <div>
            <span class="text-[10px] bg-gold/15 text-gold border border-gold/25 px-2.5 py-1 rounded-full font-bold uppercase tracking-wider">${remedy.category}</span>
            <p class="text-xs text-white/50 mt-2 font-mono">${remedy.dosha}</p>
          </div>
        </div>

        <div class="space-y-4">
          <div>
            <h4 class="text-xs font-bold text-gold uppercase tracking-wider mb-2">🌿 Ingredients</h4>
            <p class="text-xs text-white/80 leading-relaxed font-sans bg-white/5 border border-white/5 p-3 rounded-xl">${remedy.ingredients}</p>
          </div>

          <div>
            <h4 class="text-xs font-bold text-gold uppercase tracking-wider mb-2">🥣 Preparation Instructions</h4>
            <p class="text-xs text-white/80 leading-relaxed font-sans bg-white/5 border border-white/5 p-4 rounded-xl whitespace-pre-line">${remedy.instructions}</p>
          </div>
        </div>

        <div class="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center gap-3">
          <span class="text-lg">⚖️</span>
          <div class="text-[10px] text-white/60 leading-normal">
            <strong>Disclaimer:</strong> Ayurveda remedies are traditional home solutions. Consult an Ayurvedic Vaidya or physician for chronic health concerns.
          </div>
        </div>
      </div>
    `;

    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }

  setupPranayamaListeners() {
    const btn = document.getElementById('pranayama-toggle-btn');
    if (btn) {
      btn.addEventListener('click', () => {
        if (this.pranayamaInterval) {
          this.stopPranayama();
        } else {
          this.startPranayama();
        }
      });
    }
  }

  startPranayama() {
    const btn = document.getElementById('pranayama-toggle-btn');
    const timerEl = document.getElementById('pranayama-timer');
    const textEl = document.getElementById('pranayama-state-text');
    const instEl = document.getElementById('pranayama-instruction');
    const innerCircle = document.getElementById('pranayama-circle-inner');
    const outerCircle = document.getElementById('pranayama-circle-outer');

    if (btn) btn.textContent = "Stop Sadhana";

    this.pranayamaSeconds = 0;
    let cycleTime = 0;
    let currentCycleIdx = 0;

    const runBreathingCycle = () => {
      const cycle = GUIDED_PRANAYAMA.cycles[currentCycleIdx];
      
      // Update circle animation classes & text
      if (textEl) textEl.textContent = cycle.name;
      if (instEl) instEl.textContent = cycle.instruction;

      // Reset outer & inner circle transition styling classes
      if (outerCircle && innerCircle) {
        outerCircle.className = "w-40 h-40 rounded-full border border-gold/25 flex flex-col items-center justify-center relative mb-6";
        innerCircle.className = "w-24 h-24 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-black font-extrabold text-sm transition-all duration-1000 shadow-lg shadow-gold/10";
        
        const className = cycle.name.toLowerCase();
        outerCircle.classList.add(className);
        innerCircle.classList.add(className);

        // Scale inner circle
        innerCircle.style.transform = `scale(${cycle.circleScale})`;
      }

      cycleTime++;
      this.pranayamaSeconds++;

      // Update timer display
      if (timerEl) {
        const mins = Math.floor(this.pranayamaSeconds / 60).toString().padStart(2, '0');
        const secs = (this.pranayamaSeconds % 60).toString().padStart(2, '0');
        timerEl.textContent = `${mins}:${secs}`;
      }

      // Transition to next cycle phase
      if (cycleTime >= cycle.duration) {
        cycleTime = 0;
        currentCycleIdx = (currentCycleIdx + 1) % GUIDED_PRANAYAMA.cycles.length;
      }
    };

    // Trigger instantly, then interval
    runBreathingCycle();
    this.pranayamaInterval = setInterval(runBreathingCycle, 1000);
  }

  stopPranayama() {
    clearInterval(this.pranayamaInterval);
    this.pranayamaInterval = null;

    const btn = document.getElementById('pranayama-toggle-btn');
    const timerEl = document.getElementById('pranayama-timer');
    const textEl = document.getElementById('pranayama-state-text');
    const instEl = document.getElementById('pranayama-instruction');
    const innerCircle = document.getElementById('pranayama-circle-inner');
    const outerCircle = document.getElementById('pranayama-circle-outer');

    if (btn) btn.textContent = "Start Sadhana";
    if (timerEl) timerEl.textContent = "00:00";
    if (textEl) textEl.textContent = "Ready";
    if (instEl) instEl.textContent = "Click Start to begin alternate nostril box breathing. Balance your vital energy (Prana).";

    if (outerCircle && innerCircle) {
      outerCircle.className = "w-40 h-40 rounded-full border border-gold/25 flex flex-col items-center justify-center relative mb-6";
      innerCircle.className = "w-24 h-24 rounded-full bg-gold/10 border border-gold flex items-center justify-center text-black font-extrabold text-sm transition-all duration-1000 shadow-lg shadow-gold/10";
      innerCircle.style.transform = "scale(1.0)";
    }
  }
}


// Instantiate core application controller
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AppController();
  });
} else {
  new AppController();
}