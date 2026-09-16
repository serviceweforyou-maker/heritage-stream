import { AYURVEDA_REMEDIES, GUIDED_PRANAYAMA, MONTHS_LUNAR, TITHIS, NAKSHATRAS, DEITIES, KARNATAKA_TEMPLES } from "./divya-data-prod.js?v=81";
import heritageData from "./data.js?v=81";
import { TriviaGame, ChronologyGame, MemoryGame } from "./games.js?v=81";

// Base URL pointing to the backend. Automatically uses relative path on localhost.
// Replace the Render URL with your live deployed Render backend service URL.
export const API_BASE = '';

// ==========================================
// BACKEND & DATABASE INTEGRATION SERVICE
// ==========================================
export class DatabaseService {
    static async fetchContent() {
    let raw = null;
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 800);
      const res = await fetch((API_BASE || '') + '/api/content', { signal: controller.signal });
      clearTimeout(timeoutId);
      const contentType = res.headers.get('content-type') || '';
      if (res.ok && contentType.includes('application/json')) {
        raw = await res.json();
      }
    } catch (err) {
      // Backend not running or static host, perfectly normal
    }

    if (!raw || !raw.content || !Array.isArray(raw.content) || raw.content.length === 0) {
      raw = heritageData || (typeof window !== "undefined" ? window.COURSES_DATA : null);
    }

    // Normalize schema to support both flat fallback array and split backend tables
    const categories = raw.categories || [];
    let content = [];
    let docuSeries = [];
    let audioStories = [];

    if (raw.content) {
      content = raw.content;
    } else {
      docuSeries = raw.docuSeries || [];
      audioStories = raw.audioStories || [];
      content = [...docuSeries, ...audioStories];
    }

    // Dynamic Normalization: Assign fallbacks so all 200+ content items work 100% without "Coming Soon" ribbons!
    content = content.map(item => {
      const isAudio = !!item.audioUrl || item.category === "Audiobooks & Legends" || item.category === "Ebook & Audio Series";
      
      // Fallback images
      if (!item.imageUrl) {
        if (item.category === "God Series" || item.id.includes("shiva") || item.id.includes("vishnu") || item.id.includes("ganesha")) {
          item.imageUrl = "/images/ganesha.jpg";
        } else if (item.category === "Kids Stories" || item.id.includes("birbal") || item.id.includes("tenali")) {
          item.imageUrl = "/images/birbal.jpg";
        } else {
          item.imageUrl = "/images/hampi.jpg";
        }
      }
      
      if (isAudio) {
        if (!item.audioUrl) {
          // Provide clean pre-loaded nature ambient stream
          item.audioUrl = "https://actions.google.com/sounds/v1/ambient/morning_birds.ogg";
        }
        if (!item.narrator) {
          item.narrator = "Voice of Wisdom: Acharya";
        }
      } else {
        if (!item.videoUrl) {
          // Fallback high-quality YouTube documentary links
          if (item.category === "God Series" || item.id.includes("shiva") || item.id.includes("vishnu") || item.id.includes("ganesha")) {
            item.videoUrl = "https://www.youtube.com/embed/5D3CeeZ6X1s";
          } else {
            item.videoUrl = "https://www.youtube.com/embed/S_B7y1G84k8";
          }
        }
      }
      
      // Ensure Ebook Page Content is populated
      if (!item.content || !item.content.length) {
        item.content = [
          {
            title: "Chapter I: Historical Prologue",
            text: `${item.description || item.tagline || 'Explore the deep roots and historical significance of this heritage masterpiece.'} Passed down through generations, this chronicle captures the essence of Indian art, science, and consciousness.`,
            visual: isAudio ? "🪕" : "🏛️"
          },
          {
            title: "Chapter II: Astronomical & Philosophical Marvels",
            text: "Detailed archaeological telemetry reveals deep structural and mathematical alignments. The layout and iconography represent a high level of ancient engineering and deep spiritual devotion.",
            visual: "⚜️"
          },
          {
            title: "Chapter III: The Living Legacy",
            text: "Today, this heritage stands as a monument to human creativity and spiritual resilience. By preserving these chronicles, we maintain the eternal connection between past wisdom and future evolution.",
            visual: "✨"
          }
        ];
      }
      
      if (!item.duration) item.duration = "30 Mins";
      if (!item.rating) item.rating = "9.8 ★";
      if (!item.year) item.year = "2026";
      
      return item;
    });

    // Re-split normalized arrays
    docuSeries = content.filter(x => x.category === "Video Series" || x.category === "Docu-Series" || !!x.videoUrl);
    audioStories = content.filter(x => x.category === "Audiobooks & Legends" || x.category === "Ebook & Audio Series" || (!x.videoUrl && !!x.audioUrl));

    return {
      categories,
      content,
      docuSeries,
      audioStories
    };
  }

  static getDaysRemaining() {
    if (localStorage.getItem('hs_subscribed') !== 'true') return 0;
    const now = Date.now();
    let subTimestamp = parseInt(localStorage.getItem('hs_sub_timestamp') || '');
    if (!subTimestamp) {
      subTimestamp = now;
      localStorage.setItem('hs_sub_timestamp', String(now));
    }
    const expiryTime = subTimestamp + (365 * 24 * 60 * 60 * 1000);
    const msLeft = expiryTime - now;
    return Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
  }

  static isSubscribed() {
    if (localStorage.getItem('hs_subscribed') !== 'true') return false;
    
    // Automatic Expiration Fallback Check (365 Days Validity)
    const subTimestamp = parseInt(localStorage.getItem('hs_sub_timestamp') || '');
    if (subTimestamp) {
      const expiryTime = subTimestamp + (365 * 24 * 60 * 60 * 1000);
      if (Date.now() >= expiryTime) {
        console.warn("⚠️ Subscription has expired. Automatically downgraded to Free Explorer group.");
        localStorage.removeItem('hs_subscribed');
        localStorage.setItem('hs_sub_expired', 'true');
        return false;
      }
    }
    return true;
  }

  static async setSubscribed(status, name = "Anonymous Member", paymentMethod = "Mock Card/UPI") {
    localStorage.setItem('hs_subscribed', String(status));
    if (status && !localStorage.getItem('hs_sub_timestamp')) {
      localStorage.setItem('hs_sub_timestamp', String(Date.now()));
      localStorage.setItem('hs_sub_date', new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }));
    }
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
    try {
      const val = localStorage.getItem('hs_scores');
      return val ? JSON.parse(val) : { trivia: 0, chronology: 0, memory: 0 };
    } catch (err) {
      console.warn("Failed to parse hs_scores, resetting scores", err);
      return { trivia: 0, chronology: 0, memory: 0 };
    }
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
    
    const safeParse = (key, fallback) => {
      try {
        const val = localStorage.getItem(key);
        return val ? JSON.parse(val) : fallback;
      } catch (err) {
        console.warn(`Error parsing localStorage key "${key}":`, err);
        return fallback;
      }
    };

    this.gyanCoins = parseInt(localStorage.getItem('hs_gyan_coins')) || 0;
    this.unlockedRewards = safeParse('hs_unlocked_rewards', []);
    
    // Players
    this.activeAudio = null;
    this.audioProgressInterval = null;
    
    // OTT premium stats
    this.watchlist = safeParse('hs_watchlist', []);
    this.progress = safeParse('hs_progress', {});
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
    try {
      this.contentData = await DatabaseService.fetchContent();
    } catch (e) {
      console.error("Failed to load content data:", e);
    }

    const safeInit = (name, fn) => {
      try {
        fn.call(this);
      } catch (e) {
        console.error(`Error during ${name} initialization:`, e);
      }
    };

    safeInit("renderHeader", this.renderHeader);
    safeInit("initMapExplorer", this.initMapExplorer);
    safeInit("renderSpotlight", this.renderSpotlight);
    safeInit("renderContentRows", this.renderContentRows);
    safeInit("setupSubscriptionUI", this.setupSubscriptionUI);
    safeInit("setupGameToggles", this.setupGameToggles);
    safeInit("renderScoresDashboard", this.renderScoresDashboard);
    safeInit("bindRewardsShop", this.bindRewardsShop);
    safeInit("setupAmbientMusic", this.setupAmbientMusic);
    safeInit("setupPersonaFilters", this.setupPersonaFilters);
    safeInit("setupSearch", this.setupSearch);
    safeInit("initDivyaDarshana", this.initDivyaDarshana);
    safeInit("setupProfileSelector", this.setupProfileSelector);
    safeInit("checkPaymentStatus", this.checkPaymentStatus);
    safeInit("initVirtualDarshana", this.initVirtualDarshana);
    safeInit("initGitaCompass", this.initGitaCompass);
    safeInit("initDoshaAnalyzer", this.initDoshaAnalyzer);
    safeInit("initRagaTherapy", this.initRagaTherapy);
    safeInit("initMudraStudio", this.initMudraStudio);
    safeInit("initVedicMathCalculator", this.initVedicMathCalculator);
    safeInit("initGurukulaKits", this.initGurukulaKits);
    safeInit("initMysteryVault", this.initMysteryVault);
    safeInit("initAskRishiAI", this.initAskRishiAI);
    safeInit("initArchetypeCertificate", this.initArchetypeCertificate);
    safeInit("initViralReferral", this.initViralReferral);
    safeInit("initKidsModeToggle", this.initKidsModeToggle);
    safeInit("initPWA", this.initPWA);
    safeInit("initSocialProofTicker", this.initSocialProofTicker);
    safeInit("initDynamicSEO", this.initDynamicSEO);
    safeInit("initGrandGranthalaya", this.initGrandGranthalaya);
    
    // Listen to hash changes for catalog navigation explorer
    try {
      window.addEventListener('hashchange', () => this.handleHashChange());
      // Initial check on load
      this.handleHashChange();
    } catch (e) {
      console.error("Error in hash routing initialization:", e);
    }

    try {
      this.setupEyeMovements();
    } catch (e) {
      console.error("Error in eye movement initialization:", e);
    }

    // ── Mobile hamburger menu & drawer ──
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    if (mobileMenuBtn && mobileNavMenu) {
      mobileMenuBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = !mobileNavMenu.classList.contains('hidden');
        mobileNavMenu.classList.toggle('hidden', isOpen);
        mobileMenuBtn.classList.toggle('open', !isOpen);
      });
      // Close on any button or link click inside drawer
      mobileNavMenu.querySelectorAll('.mobile-nav-link, button').forEach(el => {
        el.addEventListener('click', () => {
          mobileNavMenu.classList.add('hidden');
          mobileMenuBtn.classList.remove('open');
        });
      });
      // Close when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileNavMenu.classList.contains('hidden') && !mobileNavMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
          mobileNavMenu.classList.add('hidden');
          mobileMenuBtn.classList.remove('open');
        }
      });
    }

    // ── Floating Back-to-Top Button ──
    const backToTopBtn = document.getElementById('back-to-top-btn');
    if (backToTopBtn) {
      window.addEventListener('scroll', () => {
        if (window.scrollY > 320) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      }, { passive: true });

      backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // ── Mobile Bottom Quick-Dock Active Route Highlighting ──
    const updateMobileDockActive = () => {
      const currentHash = window.location.hash || '#library';
      const dockBtns = document.querySelectorAll('.mobile-bottom-dock .mobile-dock-btn');
      dockBtns.forEach(btn => {
        const href = btn.getAttribute('href');
        if (href && href === currentHash) {
          btn.classList.add('active');
        } else {
          btn.classList.remove('active');
        }
      });
    };
    window.addEventListener('hashchange', updateMobileDockActive);
    updateMobileDockActive();

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
    if (!this.contentData) return;
    const allContent = this.contentData.content || this.contentData.docuSeries || [];
    if (!allContent.length) return;

    const heroSection = document.getElementById('hero-spotlight');
    if (!heroSection) return;

    // Terminate any pre-existing spotlight slideshow timers
    if (this.spotlightInterval) {
      clearInterval(this.spotlightInterval);
      this.spotlightInterval = null;
    }

    // Select premier highlights with rich imagery
    const premierIds = ['hampi', 'shiva_tandava', 'ajanta_ellora', 'brihadisvara', 'konark_sun', 'varanasi'];
    let slides = allContent.filter(x => premierIds.includes(x.id));
    if (slides.length < 4) {
      slides = allContent.slice(0, 5);
    }
    if (!slides.length) return;
    let currentIdx = 0;

    heroSection.innerHTML = `
      <div class="relative w-full h-full overflow-hidden select-none">
        <!-- Slide items -->
        <div id="spotlight-slides-container" class="relative w-full h-full">
          ${slides.map((item, idx) => `
            <div class="spotlight-slide absolute inset-0 w-full h-full transition-all duration-1000 ease-in-out ${idx === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}" data-index="${idx}">
              <img src="${item.imageUrl || '/images/hampi.jpg'}" ${idx > 0 ? 'loading="lazy"' : ''} class="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 ease-out ${idx === 0 ? 'scale-100' : 'scale-105'}" style="object-position: center 25%;" alt="${item.title}">
              
              <!-- Cinematic Vignette Gradient Overlays -->
              <div class="absolute inset-0 bg-gradient-to-r from-[#07080c] via-[#07080c]/90 md:via-[#07080c]/50 to-transparent z-10 pointer-events-none"></div>
              <div class="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/40 to-transparent z-10 pointer-events-none"></div>
              <div class="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-transparent z-10 pointer-events-none"></div>
              
              <!-- Content Details Container -->
              <div class="max-w-4xl pt-24 sm:pt-28 md:pt-36 lg:pt-40 pb-10 sm:pb-14 px-4 sm:px-8 md:px-14 lg:px-16 h-full flex flex-col justify-center sm:justify-end relative z-20">
                
                <!-- Badge & Metadata -->
                <div class="flex items-center gap-2 mb-2 sm:mb-2.5 flex-wrap">
                  <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gold/20 text-gold text-[10px] sm:text-[11px] font-mono font-bold uppercase tracking-wider border border-gold/30 shadow-sm backdrop-blur-md">
                    <span class="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
                    🏆 FEATURED SAGA
                  </span>
                  <span class="text-[10px] sm:text-[11px] font-mono text-white/60 bg-white/10 px-2 py-0.5 rounded-full border border-white/10 backdrop-blur-sm">
                    ${item.category || 'Docu-Series'}
                  </span>
                  <span class="text-[10px] sm:text-[11px] font-mono text-amber-300 font-bold bg-amber-500/10 px-2 py-0.5 rounded-full border border-amber-500/20">
                    ${item.rating || '9.8 ★'}
                  </span>
                </div>

                <!-- Title -->
                <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black text-white font-serif mb-1.5 sm:mb-2 leading-tight tracking-wide drop-shadow-2xl break-words">
                  ${item.title}
                </h1>

                <!-- Tagline -->
                <p class="text-xs sm:text-sm md:text-base text-gold font-medium mb-2 italic font-serif line-clamp-1 drop-shadow">
                  "${item.tagline}"
                </p>

                <!-- Description -->
                <p class="text-xs sm:text-sm text-white/85 max-w-2xl mb-4 sm:mb-6 leading-relaxed line-clamp-2 sm:line-clamp-3 md:line-clamp-4 font-sans drop-shadow">
                  ${item.description}
                </p>

                <!-- Action Buttons -->
                <div class="hero-actions flex flex-wrap gap-2.5 sm:gap-3 items-center">
                  <button class="hero-play-slide-btn px-6 sm:px-7 py-2.5 sm:py-3 bg-gradient-to-r from-gold via-amber-400 to-amber-500 hover:from-gold/90 hover:to-amber-600 text-black font-extrabold rounded-full text-xs sm:text-sm tracking-wider uppercase transition-all duration-300 shadow-xl shadow-gold/25 flex items-center gap-2 hover:scale-105 cursor-pointer" data-id="${item.id}">
                    <span>▶ Play Episode</span>
                    <span class="text-[11px] opacity-75 font-mono">(${item.duration})</span>
                  </button>
                  <button class="hero-info-slide-btn px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-gold/50 font-bold rounded-full text-xs sm:text-sm transition-all duration-300 flex items-center gap-2 backdrop-blur-md hover:scale-105 cursor-pointer" data-id="${item.id}">
                    <span>ℹ More Details</span>
                  </button>
                  <button class="hero-read-slide-btn px-4 sm:px-5 py-2.5 sm:py-3 bg-gold/10 hover:bg-gold/20 text-gold border border-gold/30 hover:border-gold font-bold rounded-full text-xs sm:text-sm transition-all duration-300 hidden sm:flex items-center gap-1.5 backdrop-blur-md cursor-pointer" data-id="${item.id}">
                    <span>📖 3D Reader</span>
                  </button>
                </div>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Left/Right Arrows with OTT Glassmorphism -->
        <button id="spotlight-prev-btn" class="spotlight-arrow-btn hidden sm:flex absolute left-3 md:left-6 top-1/2 -translate-y-1/2" aria-label="Previous Slide">◀</button>
        <button id="spotlight-next-btn" class="spotlight-arrow-btn hidden sm:flex absolute right-3 md:right-6 top-1/2 -translate-y-1/2" aria-label="Next Slide">▶</button>

        <!-- Bullet Indicators -->
        <div class="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex gap-2">
          ${slides.map((_, idx) => `
            <span class="spotlight-dot h-2 sm:h-2.5 rounded-full cursor-pointer transition-all duration-300 ${idx === 0 ? 'bg-gold w-6 sm:w-8' : 'w-2 sm:w-2.5 bg-white/30 hover:bg-white/50'}" data-index="${idx}"></span>
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
        const img = slide.querySelector('img');
        if (idx === currentIdx) {
          slide.classList.remove('opacity-0', 'z-0');
          slide.classList.add('opacity-100', 'z-10');
          if (img) img.classList.replace('scale-105', 'scale-100');
        } else {
          slide.classList.remove('opacity-100', 'z-10');
          slide.classList.add('opacity-0', 'z-0');
          if (img) img.classList.replace('scale-100', 'scale-105');
        }
      });

      // Update dot styles
      dotEls.forEach((dot, idx) => {
        if (idx === currentIdx) {
          dot.className = "spotlight-dot h-2 sm:h-2.5 rounded-full cursor-pointer transition-all duration-300 bg-gold w-6 sm:w-8";
        } else {
          dot.className = "spotlight-dot w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full cursor-pointer transition-all duration-300 bg-white/30 hover:bg-white/50";
        }
      });
    };

    const advanceSlide = () => {
      const nextIdx = (currentIdx + 1) % slides.length;
      showSlide(nextIdx);
    };

    const resetInterval = () => {
      clearInterval(this.spotlightInterval);
      this.spotlightInterval = setInterval(advanceSlide, 6500);
    };

    // Bind navigation buttons
    const prevBtn = heroSection.querySelector('#spotlight-prev-btn');
    const nextBtn = heroSection.querySelector('#spotlight-next-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const prevIdx = (currentIdx - 1 + slides.length) % slides.length;
        showSlide(prevIdx);
        resetInterval();
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const nextIdx = (currentIdx + 1) % slides.length;
        showSlide(nextIdx);
        resetInterval();
      });
    }

    dotEls.forEach(dot => {
      dot.addEventListener('click', () => {
        const target = parseInt(dot.getAttribute('data-index'));
        showSlide(target);
        resetInterval();
      });
    });

    // Touch Swipe Support for Mobile & Tablet Gesture Momentum
    let touchStartX = 0;
    let touchEndX = 0;
    heroSection.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    heroSection.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchEndX - touchStartX;
      if (diff > 50) {
        // Swipe Right -> Prev
        const prevIdx = (currentIdx - 1 + slides.length) % slides.length;
        showSlide(prevIdx);
        resetInterval();
      } else if (diff < -50) {
        // Swipe Left -> Next
        const nextIdx = (currentIdx + 1) % slides.length;
        showSlide(nextIdx);
        resetInterval();
      }
    }, { passive: true });

    // Bind action buttons for each slide
    slides.forEach((item, idx) => {
      const cardEl = heroSection.querySelector(`.spotlight-slide[data-index="${idx}"]`);
      if (cardEl) {
        const playBtn = cardEl.querySelector('.hero-play-slide-btn');
        const infoBtn = cardEl.querySelector('.hero-info-slide-btn');
        const readBtn = cardEl.querySelector('.hero-read-slide-btn');
        if (playBtn) {
          playBtn.addEventListener('click', () => this.playContent(item, false));
        }
        if (infoBtn) {
          infoBtn.addEventListener('click', () => this.playContent(item, false));
        }
        if (readBtn) {
          readBtn.addEventListener('click', () => this.openReader(item));
        }
      }
    });

    // Launch auto-slideshow
    this.spotlightInterval = setInterval(advanceSlide, 6500);
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
          items: all.filter(x => x.category === "Video Series" || x.category === "Docu-Series" || (!!x.videoUrl && x.category !== "Audiobooks & Legends")),
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

      // Progressive chunked rendering: Render first 2 primary rows immediately, defer remaining for zero TBT
      const primaryRows = standardRows.slice(0, 2);
      const secondaryRows = standardRows.slice(2);

      let primaryHTML = '';
      primaryRows.forEach(row => {
        primaryHTML += this.createRowHTML(
          row.parentId,
          row.id,
          row.subheading,
          row.title,
          row.items,
          row.isAudio
        );
      });
      standardContainer.innerHTML = primaryHTML;
      this.bindCardInteractions();
      this.bindRowSliders();

      // Defer remaining rows to idle frame for ultra-fast initial paint
      const renderSecondary = () => {
        let secondaryHTML = '';
        secondaryRows.forEach(row => {
          secondaryHTML += this.createRowHTML(
            row.parentId,
            row.id,
            row.subheading,
            row.title,
            row.items,
            row.isAudio
          );
        });
        standardContainer.insertAdjacentHTML('beforeend', secondaryHTML);
        this.bindCardInteractions();
        this.bindRowSliders();
        this.isStandardRowsRendered = true;
      };

      if (typeof requestIdleCallback !== 'undefined') {
        requestIdleCallback(renderSecondary, { timeout: 150 });
      } else {
        setTimeout(renderSecondary, 50);
      }
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
            <button class="row-prev-btn carousel-nav-btn" data-row="${rowId}" aria-label="Previous">◀</button>
            <button class="row-next-btn carousel-nav-btn" data-row="${rowId}" aria-label="Next">▶</button>
          </div>
        </div>
        <div id="${rowId}" class="flex gap-3 sm:gap-5 overflow-x-auto pb-4 pt-1 no-scrollbar scroll-smooth scroll-snap-x">
          ${cardsHTML}
        </div>
      </div>
    `;
  }

    setupProfileSelector() {
    const modal = document.getElementById('profile-modal');
    const accountModal = document.getElementById('user-account-modal');

    const renderHeaderProfile = () => {
      const avatarEl = document.getElementById('active-profile-avatar');
      const nameEl = document.getElementById('active-profile-name');
      const greetingEl = document.getElementById('hero-sub-prompt');
      const subBadge = document.getElementById('header-sub-badge');
      const dropdownSubCard = document.getElementById('dropdown-sub-status-card');
      const dropdownSubDays = document.getElementById('dropdown-sub-days');
      const dropdownSubPill = document.getElementById('dropdown-sub-pill');
      const dropdownSubPercent = document.getElementById('dropdown-sub-percent');
      const dropdownSubExpiry = document.getElementById('dropdown-sub-expiry');

      const savedName = localStorage.getItem('hs_user_name') || this.currentProfile || 'Scholar';
      const savedAvatar = localStorage.getItem('hs_avatar') || this.currentProfileAvatar || '📜';

      if (avatarEl) avatarEl.textContent = savedAvatar;
      if (nameEl) nameEl.textContent = savedName;

      // Re-evaluate subscription status & live days remaining
      this.isSubscribed = DatabaseService.isSubscribed();
      const daysLeft = DatabaseService.getDaysRemaining();

      if (subBadge) {
        if (this.isSubscribed) {
          subBadge.classList.remove('hidden');
          subBadge.innerHTML = '👑 PRO <span class="opacity-90 font-mono text-[7px] ml-0.5">• ' + daysLeft + 'd</span>';
          subBadge.title = 'PRO Pass Active • ' + daysLeft + ' Days Left';
        } else {
          subBadge.classList.add('hidden');
        }
      }

      if (dropdownSubCard) {
        if (this.isSubscribed) {
          dropdownSubCard.className = "p-2.5 rounded-xl bg-gradient-to-r from-gold/15 to-emerald-500/15 border border-gold/30 mb-1";
          if (dropdownSubPill) {
            dropdownSubPill.className = "text-[8px] font-mono font-bold text-emerald-400 bg-emerald-500/20 px-1.5 py-0.5 rounded uppercase";
            dropdownSubPill.textContent = "PRO ACTIVE";
          }
          if (dropdownSubDays) {
            dropdownSubDays.className = "text-emerald-300 font-mono font-bold";
            dropdownSubDays.textContent = daysLeft + " Days Left";
          }
          if (dropdownSubPercent) {
            const pct = Math.round((daysLeft / 365) * 100);
            dropdownSubPercent.textContent = pct + "% left";
          }
          if (dropdownSubExpiry) {
            const subTimestamp = parseInt(localStorage.getItem('hs_sub_timestamp') || String(Date.now()));
            const expiryDate = new Date(subTimestamp + (365 * 24 * 60 * 60 * 1000));
            dropdownSubExpiry.textContent = "Expires: " + expiryDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' });
          }
        } else {
          dropdownSubCard.className = "p-2.5 rounded-xl bg-white/5 border border-white/10 mb-1";
          if (dropdownSubPill) {
            dropdownSubPill.className = "text-[8px] font-mono font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.5 rounded uppercase";
            dropdownSubPill.textContent = "FREE EXPLORER";
          }
          if (dropdownSubDays) {
            dropdownSubDays.className = "text-white/80 font-sans font-bold";
            dropdownSubDays.textContent = "Free Access";
          }
          if (dropdownSubPercent) dropdownSubPercent.textContent = "₹399/yr";
          if (dropdownSubExpiry) dropdownSubExpiry.textContent = "Upgrade to unlock 200+ sagas";
        }
      }

      if (greetingEl) {
        if (this.isSubscribed) {
          greetingEl.textContent = 'Pranam, ' + savedName + '! Your Premium Pass has ' + daysLeft + ' days left.';
        } else if (savedName === "Yogi") {
          greetingEl.textContent = "Pranam, Yogi! Cultivate inner peace and balance.";
        } else if (savedName === "Kids") {
          greetingEl.textContent = "Hey there! Ready to explore awesome animations and fables?";
        } else if (savedName === "Warrior") {
          greetingEl.textContent = "Salutations, Warrior! Explore royal dynastic chronicles.";
        } else {
          greetingEl.textContent = 'Welcome, ' + savedName + '! Unveil the secrets of antiquity.';
        }
      }
    };

    renderHeaderProfile();

    // ── Open Account Modal Helper ──
    const openAccountModal = (initialTab = 'profile') => {
      if (!accountModal) return;

      // Populate current values
      const currentName = localStorage.getItem('hs_user_name') || this.currentProfile || 'Scholar';
      const currentAvatar = localStorage.getItem('hs_avatar') || this.currentProfileAvatar || '📜';
      const currentPwd = localStorage.getItem('hs_user_pwd') || '';
      const orderId = localStorage.getItem('hs_order_id') || '';
      const subDate = localStorage.getItem('hs_sub_date') || 'Active';

      const nameInput = document.getElementById('acc-name-input');
      const pwdInput = document.getElementById('acc-password-input');
      const avatarPreview = document.getElementById('account-modal-avatar-preview');
      const displayName = document.getElementById('account-modal-display-name');
      const subBadgeModal = document.getElementById('account-modal-sub-badge');

      if (nameInput) nameInput.value = currentName === 'Guest' ? '' : currentName;
      if (pwdInput) pwdInput.value = currentPwd;
      if (avatarPreview) avatarPreview.textContent = currentAvatar;
      if (displayName) displayName.textContent = currentName;

      if (subBadgeModal) {
        if (this.isSubscribed) {
          const daysLeft = DatabaseService.getDaysRemaining();
          subBadgeModal.innerHTML = '<span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span><span class="text-emerald-400 font-bold">✨ Premium Pass Active • ' + daysLeft + ' Days Left</span>';
        } else {
          subBadgeModal.innerHTML = '<span class="w-2 h-2 rounded-full bg-gold/60"></span><span class="text-gold/80">Free Explorer Access</span>';
        }
      }

      // Populate Plan Details Card with Live Remaining Days Countdown, Start Date & End Date
      const planCard = document.getElementById('plan-details-card');
      if (planCard) {
        // Re-evaluate subscription status including expiration
        this.isSubscribed = DatabaseService.isSubscribed();

        if (this.isSubscribed) {
          const now = Date.now();
          let subTimestamp = parseInt(localStorage.getItem('hs_sub_timestamp') || '');
          if (!subTimestamp) {
            subTimestamp = now;
            localStorage.setItem('hs_sub_timestamp', String(now));
          }

          const expiryTime = subTimestamp + (365 * 24 * 60 * 60 * 1000);
          const msLeft = expiryTime - now;
          const daysLeft = Math.max(0, Math.ceil(msLeft / (1000 * 60 * 60 * 24)));
          const daysPassed = Math.min(365, Math.max(0, 365 - daysLeft));
          const progressPercent = Math.round((daysLeft / 365) * 100);
          const startDateStr = new Date(subTimestamp).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
          const endDateStr = new Date(expiryTime).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });

          planCard.innerHTML = `
            <div class="flex items-center justify-between border-b border-gold/20 pb-3">
              <div>
                <span class="text-[9px] uppercase tracking-widest text-gold font-mono font-bold block">Current Active Plan</span>
                <h4 class="text-base font-bold text-white font-serif">HeritageStream Annual Pass</h4>
              </div>
              <span class="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">✓ ACTIVE</span>
            </div>

            <!-- Live Days Countdown Badge -->
            <div class="bg-gradient-to-r from-amber-500/15 via-gold/15 to-emerald-500/15 border border-gold/40 rounded-2xl p-4 space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-xl bg-gold/20 border border-gold/40 flex items-center justify-center text-xl flex-shrink-0">
                    ⏳
                  </div>
                  <div>
                    <span class="text-[10px] uppercase tracking-widest text-gold font-mono font-bold block">Live Pass Validity</span>
                    <span class="text-base font-extrabold text-white font-mono">${daysLeft} Days Left</span>
                  </div>
                </div>
                <div class="text-right">
                  <span class="text-[9px] text-emerald-400 uppercase font-mono font-bold block">Status</span>
                  <span class="text-xs font-bold text-white/90 font-mono">365 Days Pass</span>
                </div>
              </div>

              <!-- Start Date & End Date Grid -->
              <div class="grid grid-cols-2 gap-2 pt-1 border-t border-white/10">
                <div class="bg-black/30 p-2 rounded-xl border border-white/5">
                  <span class="text-[9px] text-white/40 uppercase tracking-wider font-mono block">📅 Start Date</span>
                  <span class="text-xs font-bold text-white font-mono">${startDateStr}</span>
                </div>
                <div class="bg-black/30 p-2 rounded-xl border border-white/5">
                  <span class="text-[9px] text-gold/60 uppercase tracking-wider font-mono block">🏁 End Date (Expiry)</span>
                  <span class="text-xs font-bold text-gold font-mono">${endDateStr}</span>
                </div>
              </div>

              <!-- Animated Validity Progress Bar -->
              <div class="space-y-1 pt-1">
                <div class="flex justify-between text-[9px] font-mono text-white/50">
                  <span>Day ${daysPassed} of 365 elapsed</span>
                  <span class="text-emerald-400 font-bold">${progressPercent}% validity remaining</span>
                </div>
                <div class="w-full h-2 bg-black/40 rounded-full overflow-hidden border border-white/10 p-0.5">
                  <div class="h-full bg-gradient-to-r from-gold via-amber-400 to-emerald-400 rounded-full transition-all duration-500" style="width: ${Math.max(3, progressPercent)}%;"></div>
                </div>
              </div>
            </div>
            
            <!-- Activation Order Details -->
            <div class="space-y-2 text-xs text-white/80">
              <div class="flex items-center justify-between bg-black/30 p-2.5 rounded-xl border border-white/5 font-mono">
                <span class="text-white/50 text-[11px]">Activation Order ID:</span>
                <div class="flex items-center gap-2">
                  <span class="text-gold font-bold text-[11px] select-all">${orderId || 'sub_heritage_pass'}</span>
                  <button id="copy-order-id-btn" class="px-2 py-0.5 bg-white/10 hover:bg-gold hover:text-black rounded text-[10px] uppercase tracking-wider font-bold transition-all" title="Copy ID">Copy</button>
                </div>
              </div>

              <div class="flex justify-between py-1 border-b border-white/5 text-[11px]">
                <span class="text-white/50">Billing Fee:</span>
                <span class="font-bold text-gold font-mono">₹399 / Year (All Sagas Included)</span>
              </div>
            </div>

            <div class="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-[11px] text-emerald-300/90 leading-relaxed">
              🎉 <strong>All 200+ Sagas Unlocked:</strong> Full access to docu-series, audiobooks, 3D interactive flipbooks, and learning scoreboards.
            </div>
          `;

          const copyBtn = planCard.querySelector('#copy-order-id-btn');
          if (copyBtn) {
            copyBtn.addEventListener('click', () => {
              navigator.clipboard.writeText(orderId || 'sub_heritage_pass');
              copyBtn.textContent = 'Copied!';
              setTimeout(() => { copyBtn.textContent = 'Copy'; }, 2000);
            });
          }
        } else {
          planCard.innerHTML = `
            <div class="text-center py-2 space-y-3">
              <span class="text-3xl block">🏛️</span>
              <h4 class="text-base font-bold text-white font-serif">Upgrade to Premium Heritage Pass</h4>
              <p class="text-xs text-white/60 max-w-xs mx-auto">Get unrestricted access to all 200+ documentaries, audiobooks, and illustrated 3D FlipBooks for ₹399/year.</p>
              <button id="modal-upgrade-btn" class="w-full py-3 bg-gradient-to-r from-gold to-amber-500 hover:from-gold/90 hover:to-amber-600 text-black font-extrabold rounded-xl text-xs uppercase tracking-wider transition-all shadow-lg shadow-gold/20">
                Unlock Annual Pass (₹399)
              </button>
            </div>
          `;

          const upBtn = planCard.querySelector('#modal-upgrade-btn');
          if (upBtn) {
            upBtn.addEventListener('click', () => {
              accountModal.classList.add('hidden');
              accountModal.classList.remove('flex');
              this.openPaymentModal();
            });
          }
        }
      }

      // Switch Tab Handler
      const switchAccTab = (tab) => {
        ['profile', 'plan', 'restore'].forEach(t => {
          const btn = document.getElementById(`acc-tab-${t}`);
          const panel = document.getElementById(`acc-panel-${t}`);
          if (btn && panel) {
            if (t === tab) {
              btn.className = "acc-nav-tab flex-1 py-2 rounded-xl bg-gold text-black transition-all font-bold";
              panel.classList.remove('hidden');
            } else {
              btn.className = "acc-nav-tab flex-1 py-2 rounded-xl text-white/60 hover:text-white transition-all";
              panel.classList.add('hidden');
            }
          }
        });
      };

      switchAccTab(initialTab);

      // Bind Tab Buttons
      const tabProf = document.getElementById('acc-tab-profile');
      const tabPlan = document.getElementById('acc-tab-plan');
      const tabRest = document.getElementById('acc-tab-restore');

      if (tabProf) tabProf.onclick = () => switchAccTab('profile');
      if (tabPlan) tabPlan.onclick = () => switchAccTab('plan');
      if (tabRest) tabRest.onclick = () => switchAccTab('restore');

      // Bind Avatar Options inside modal
      accountModal.querySelectorAll('.avatar-opt').forEach(btn => {
        btn.onclick = () => {
          const av = btn.getAttribute('data-avatar');
          this.currentProfileAvatar = av;
          localStorage.setItem('hs_avatar', av);
          if (avatarPreview) avatarPreview.textContent = av;
          renderHeaderProfile();
        };
      });

      // Show Modal
      accountModal.classList.remove('hidden');
      accountModal.classList.add('flex');
    };

    // ── Bind Header Dropdown & Profile Clicks ──
    const openProfBtn = document.getElementById('open-profile-btn');
    if (openProfBtn) {
      openProfBtn.addEventListener('click', () => openAccountModal('profile'));
    }

    const menuAccBtn = document.getElementById('menu-account-btn');
    if (menuAccBtn) {
      menuAccBtn.addEventListener('click', () => openAccountModal('profile'));
    }

    const mobileProfBtn = document.getElementById('mobile-profile-btn');
    const mobileKidsBtn = document.getElementById('mobile-kids-btn');
    if (mobileKidsBtn) {
      mobileKidsBtn.onclick = () => {
        const headerKidsBtn = document.getElementById('header-kids-mode-btn');
        if (headerKidsBtn) headerKidsBtn.click();
        const mobMenu = document.getElementById('mobile-nav-menu');
        if (mobMenu) mobMenu.classList.add('hidden');
      };
    }
    const mobileRishiBtn = document.getElementById('mobile-rishi-btn');
    if (mobileRishiBtn) {
      mobileRishiBtn.onclick = () => {
        const headerRishiBtn = document.getElementById('header-rishi-btn');
        if (headerRishiBtn) headerRishiBtn.click();
        const mobMenu = document.getElementById('mobile-nav-menu');
        if (mobMenu) mobMenu.classList.add('hidden');
      };
    }
    const mobileArchBtn = document.getElementById('mobile-archetype-btn');
    if (mobileArchBtn) {
      mobileArchBtn.onclick = () => {
        const headerArchBtn = document.getElementById('header-archetype-btn');
        if (headerArchBtn) headerArchBtn.click();
        const mobMenu = document.getElementById('mobile-nav-menu');
        if (mobMenu) mobMenu.classList.add('hidden');
      };
    }
    const mobileRefBtn = document.getElementById('mobile-referral-btn');
    if (mobileRefBtn) {
      mobileRefBtn.onclick = () => {
        const headerRefBtn = document.getElementById('header-referral-btn');
        if (headerRefBtn) headerRefBtn.click();
        const mobMenu = document.getElementById('mobile-nav-menu');
        if (mobMenu) mobMenu.classList.add('hidden');
      };
    }
    if (mobileProfBtn) {
      mobileProfBtn.addEventListener('click', () => openAccountModal('profile'));
    }

    // ── Bind Save Profile Button ──
    const saveProfBtn = document.getElementById('save-account-profile-btn');
    if (saveProfBtn) {
      saveProfBtn.onclick = () => {
        const nameInput = document.getElementById('acc-name-input');
        const pwdInput = document.getElementById('acc-password-input');
        const toast = document.getElementById('account-toast-msg');

        const newName = (nameInput?.value || '').trim() || 'Scholar';
        const newPwd = (pwdInput?.value || '').trim();

        this.currentProfile = newName;
        localStorage.setItem('hs_user_name', newName);
        localStorage.setItem('hs_profile', newName);
        if (newPwd) {
          localStorage.setItem('hs_user_pwd', newPwd);
        }

        renderHeaderProfile();

        if (toast) {
          toast.textContent = "Profile Saved ✓";
          toast.classList.remove('opacity-0');
          setTimeout(() => toast.classList.add('opacity-0'), 2500);
        }
      };
    }

    // ── Bind Sign In / Restore Pass Button ──
    const restoreBtn = document.getElementById('submit-restore-btn');
    if (restoreBtn) {
      restoreBtn.onclick = () => {
        const userInput = (document.getElementById('restore-user-input')?.value || '').trim();
        const pwdInput = (document.getElementById('restore-pwd-input')?.value || '').trim();
        const orderInput = (document.getElementById('restore-order-input')?.value || '').trim();
        const toast = document.getElementById('account-toast-msg');

        if (orderInput || userInput) {
          this.isSubscribed = true;
          localStorage.setItem('hs_subscribed', 'true');
          if (orderInput) localStorage.setItem('hs_order_id', orderInput);
          if (userInput) {
            localStorage.setItem('hs_user_name', userInput);
            this.currentProfile = userInput;
          }
          if (pwdInput) localStorage.setItem('hs_user_pwd', pwdInput);
          localStorage.setItem('hs_sub_timestamp', String(Date.now()));
        localStorage.setItem('hs_sub_date', new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }));
        localStorage.removeItem('hs_sub_expired');

          renderHeaderProfile();
          this.renderSpotlight();
          this.renderContentRows();
          this.setupSubscriptionUI();

          if (toast) {
            toast.textContent = "Pass Restored ✓";
            toast.classList.remove('opacity-0');
            setTimeout(() => {
              toast.classList.add('opacity-0');
              if (accountModal) {
                accountModal.classList.add('hidden');
                accountModal.classList.remove('flex');
              }
            }, 1200);
          }
        }
      };
    }

    // ── Bind Sign Out Button ──
    const logoutBtn = document.getElementById('account-logout-btn');
    const menuLogoutBtn = document.getElementById('menu-logout-btn');

    const handleLogout = () => {
      localStorage.removeItem('hs_subscribed');
      localStorage.removeItem('hs_subscribed_name');
      localStorage.removeItem('hs_user_name');
      localStorage.removeItem('hs_order_id');
      localStorage.removeItem('hs_sub_timestamp');
      localStorage.removeItem('hs_sub_date');
      localStorage.removeItem('hs_sub_expired');

      this.isSubscribed = false;
      this.currentProfile = 'Guest';
      this.currentProfileAvatar = '👤';

      localStorage.setItem('hs_profile', 'Guest');
      localStorage.setItem('hs_avatar', '👤');

      renderHeaderProfile();
      this.renderSpotlight();
      this.renderContentRows();
      this.setupSubscriptionUI();

      if (accountModal) {
        accountModal.classList.add('hidden');
        accountModal.classList.remove('flex');
      }
    };

    if (logoutBtn) logoutBtn.onclick = handleLogout;
    if (menuLogoutBtn) menuLogoutBtn.onclick = handleLogout;

    // ── Close Account Modal ──
    const closeAccBtn = document.getElementById('close-account-modal-btn');
    if (closeAccBtn && accountModal) {
      closeAccBtn.onclick = () => {
        accountModal.classList.add('hidden');
        accountModal.classList.remove('flex');
      };
    }

    // ── Persona Switcher Modal ──
    const switchBtn = document.getElementById('switch-profile-btn');
    if (switchBtn && modal) {
      switchBtn.addEventListener('click', () => {
        if (accountModal) {
          accountModal.classList.add('hidden');
          accountModal.classList.remove('flex');
        }
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      });
    }

    if (modal) {
      modal.querySelectorAll('.profile-card').forEach(card => {
        card.addEventListener('click', () => {
          const name = card.getAttribute('data-profile');
          const avatar = card.getAttribute('data-avatar');
          
          this.currentProfile = name;
          this.currentProfileAvatar = avatar;
          
          localStorage.setItem('hs_profile', name);
          localStorage.setItem('hs_user_name', name);
          localStorage.setItem('hs_avatar', avatar);
          sessionStorage.setItem('hs_profile_prompted', 'true');
          
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          
          this.isStandardRowsRendered = false;
          renderHeaderProfile();
          this.renderContentRows();
        });
      });

      const skipBtn = document.getElementById('skip-profile-btn');
      if (skipBtn) {
        skipBtn.addEventListener('click', () => {
          sessionStorage.setItem('hs_profile_prompted', 'true');
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          renderHeaderProfile();
        });
      }
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
        
        const allList = (this.contentData && this.contentData.content) ? this.contentData.content : [];
        let item = allList.find(x => x.id === id) || 
                   (this.contentData?.docuSeries?.find(x => x.id === id)) || 
                   (this.contentData?.audioStories?.find(x => x.id === id));
        
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

  createContentCardHTML(item, isAudio = false, widthClass = 'w-[185px] xs:w-[215px] sm:w-64 md:w-72 flex-shrink-0') {
    const itemIsAudio = isAudio || !!item.audioUrl || item.category === "Audiobooks & Legends" || item.category === "Ebook & Audio Series";
    const isLocked = item.isPremium && !this.isSubscribed;
    const comingSoon = !itemIsAudio && !item.videoUrl;
    const badgeText = isAudio ? 'AUDIO STORY' : 'DOCU-SERIES';
    const detailText = isAudio ? item.narrator : `${item.duration} • ${item.rating}`;
    
    // Check if item is in watchlist
    const isOnWatchlist = this.watchlist.includes(item.id);
    // Check if item has saved progress
    const progressVal = this.progress[item.id] ? this.progress[item.id].progress : 0;
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
      <div class="content-card ${widthClass} rounded-2xl overflow-hidden bg-[#0e1017] border border-white/[0.08] cursor-pointer relative group transition-all duration-300 hover:border-gold/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold/10" data-id="${item.id}" data-type="${isAudio ? 'audio' : 'video'}">
        <!-- Watchlist Overlay Toggle Button -->
        <button class="watchlist-toggle-btn absolute top-3 left-3 w-7 h-7 rounded-full bg-black/60 border border-white/10 hover:border-gold hover:scale-105 text-white flex items-center justify-center text-xs backdrop-blur-md transition-all z-20" data-id="${item.id}" title="${isOnWatchlist ? 'Remove from My List' : 'Add to My List'}">
          ${isOnWatchlist ? '✓' : '＋'}
        </button>

        <!-- Thumbnail Cover with beautiful Gradient & lazy-loaded image -->
        <div class="h-40 w-full relative flex flex-col justify-between p-4 overflow-hidden">
          ${item.imageUrl ? `
            <img src="${item.imageUrl}" loading="lazy" decoding="async" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" alt="${item.title}">
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

    if (isAudio && !item.videoUrl) {
      this.openAudioPlayer(item);
    } else {
      this.openDocuReader(item);
    }
  }

  // Docu-Series slide player modal (supports video player & slides)
  openDocuReader(item) {
    if (!item) {
      console.warn("openDocuReader called with empty item");
      return;
    }

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
    if (!modal || !modalTitle || !modalBody) return;

    modalTitle.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="bg-red-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">${item.videoUrl ? 'VIDEO & MANUSCRIPT' : 'SACRED MANUSCRIPT'}</span>
        <h2 class="text-base md:text-xl font-bold font-serif text-white line-clamp-1">${item.title}</h2>
      </div>
    `;

    const hasVideo = !!item.videoUrl;

    const renderVideoTabHTML = () => {
      if (!item.videoUrl) {
        return `
          <div class="p-6">
            <div class="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 shadow-lg shadow-black/40 relative flex flex-col items-center justify-center"
              style="background: radial-gradient(ellipse at 60% 30%, rgba(212,175,55,0.08) 0%, rgba(5,6,10,0.95) 70%), url('${item.imageUrl || '/images/hampi.jpg'}') center/cover no-repeat;">
              <div class="absolute inset-0 bg-black/70 backdrop-blur-sm rounded-2xl"></div>
              <div class="relative z-10 text-center px-8 space-y-4">
                <div class="w-16 h-16 mx-auto rounded-full border border-gold/40 flex items-center justify-center bg-gold/10">
                  <span class="text-3xl">🎬</span>
                </div>
                <div>
                  <span class="inline-block bg-gold/10 border border-gold/30 text-gold text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-2">Video In Production</span>
                  <h3 class="text-lg font-bold font-serif text-white mb-1">${item.title}</h3>
                  <p class="text-xs text-white/60 leading-relaxed max-w-sm mx-auto">${item.description ? item.description.substring(0, 120) + '…' : 'Explore the full illustrated sacred manuscript.'}</p>
                </div>
              </div>
            </div>
            <div class="mt-4 p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between gap-3">
              <div class="text-[10px] text-white/60 leading-normal">
                <strong>Read Manuscript</strong> — explore full illustrated chapters in the 3D FlipBook reader!
              </div>
              <button id="docu-open-flipbook-btn" class="flex-shrink-0 text-[10px] font-black uppercase tracking-wider bg-gold text-black px-4 py-2 rounded-lg hover:bg-gold/80 transition-all whitespace-nowrap shadow-md">
                📖 Open FlipBook
              </button>
            </div>
          </div>
        `;
      }

      // Normal video player
      return `
        <div class="p-4 md:p-6 space-y-4">
          <div class="aspect-video w-full rounded-2xl overflow-hidden bg-black border border-white/10 shadow-lg shadow-black/40">
            <iframe id="video-iframe-player" src="${item.videoUrl}?autoplay=1&enablejsapi=1" class="w-full h-full" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
          </div>
          
          <div class="flex items-center justify-between px-3 py-2.5 bg-white/5 border border-white/5 rounded-xl text-xs text-white/70 font-sans">
            <div class="flex items-center gap-3 font-mono text-[9px]">
              <span class="text-gold font-bold">🎬 HD DOCUMENTARY</span>
              <span class="text-white/40">|</span>
              <span class="text-white/60">${item.duration || 'Full Feature'}</span>
            </div>
            <div class="flex items-center gap-3">
              <button id="theatre-mode-btn" class="hover:text-gold transition-colors font-bold text-[9px] bg-white/5 border border-white/10 rounded px-2.5 py-1 uppercase tracking-wider">📺 Theatre Mode</button>
              <button id="docu-switch-flipbook-btn" class="hover:text-gold transition-colors font-bold text-[9px] bg-gold/10 border border-gold/30 text-gold rounded px-2.5 py-1 uppercase tracking-wider">📖 Read Granth</button>
            </div>
          </div>

          <div class="space-y-2 px-1">
            <h3 class="text-base md:text-lg font-bold text-gold font-serif">${item.tagline || item.title}</h3>
            <p class="text-xs text-white/70 leading-relaxed max-h-24 overflow-y-auto no-scrollbar">${item.description || item.desc || ''}</p>
          </div>
        </div>
      `;
    };

    const renderSlidesTabHTML = () => `
      <div class="flex flex-col items-center justify-center p-6 text-center min-h-[320px]" id="docu-slide-container">
      </div>
    `;

    modalBody.innerHTML = `
      <div class="space-y-2">
        <div class="px-4 md:px-6 pt-3">
          <div class="flex border border-white/10 rounded-xl p-1 bg-white/5">
            <button id="tab-mode-video" class="flex-1 py-2 text-xs font-extrabold rounded-lg ${hasVideo ? 'bg-gold text-black' : 'text-white/60 hover:text-white'} transition-all">📺 Watch Documentary</button>
            <button id="tab-mode-slides" class="flex-1 py-2 text-xs font-bold ${!hasVideo ? 'bg-gold text-black' : 'text-white/60 hover:text-white'} transition-all">📖 Read FlipBook</button>
          </div>
        </div>

        <div id="docu-reader-content-area">
          ${renderVideoTabHTML()}
        </div>
      </div>
    `;

    // Bind controls
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

      const switchFlipbookBtn = document.getElementById('docu-switch-flipbook-btn');
      if (switchFlipbookBtn) {
        switchFlipbookBtn.addEventListener('click', () => {
          this.closeAllModals();
          setTimeout(() => {
            if (window.flipBook) window.flipBook.open(item);
          }, 100);
        });
      }

      const openFlipbookBtn = document.getElementById('docu-open-flipbook-btn');
      if (openFlipbookBtn) {
        openFlipbookBtn.addEventListener('click', () => {
          this.closeAllModals();
          setTimeout(() => {
            if (window.flipBook) window.flipBook.open(item);
          }, 100);
        });
      }

      const tabVideo = document.getElementById('tab-mode-video');
      const tabSlides = document.getElementById('tab-mode-slides');
      const contentArea = document.getElementById('docu-reader-content-area');

      if (tabVideo && tabSlides && contentArea) {
        tabVideo.addEventListener('click', () => {
          tabVideo.className = "flex-1 py-2 text-xs font-extrabold rounded-lg bg-gold text-black transition-all";
          tabSlides.className = "flex-1 py-2 text-xs font-bold text-white/60 hover:text-white transition-all";
          contentArea.innerHTML = renderVideoTabHTML();
        });

        tabSlides.addEventListener('click', () => {
          tabSlides.className = "flex-1 py-2 text-xs font-extrabold rounded-lg bg-gold text-black transition-all";
          tabVideo.className = "flex-1 py-2 text-xs font-bold text-white/60 hover:text-white transition-all";
          this.closeAllModals();
          setTimeout(() => {
            if (window.flipBook) window.flipBook.open(item);
          }, 100);
        });
      }
    }, 50);

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    // Close button
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
    if (!item) return;

    // Playtime details for saving progress
    this.activePlayItemId = item.id;
    this.activePlayStartTime = Date.now();

    // Dynamic Apple TV ambient backdrop glow
    const container = document.getElementById('media-modal-container');
    if (container) {
      let glowColor = 'rgba(59,130,246,0.22)';
      if (item.category === 'God Series') glowColor = 'rgba(249,115,22,0.22)';
      else if (item.category === 'Kids Stories') glowColor = 'rgba(16,185,129,0.22)';
      container.style.boxShadow = `0 25px 50px -12px rgba(0,0,0,0.5), 0 0 100px 10px ${glowColor}`;
    }

    const modal = document.getElementById('media-modal');
    const modalTitle = document.getElementById('media-modal-title');
    const modalBody = document.getElementById('media-modal-body');
    if (!modal || !modalTitle || !modalBody) return;

    modalTitle.innerHTML = `
      <div class="flex items-center gap-3">
        <span class="bg-blue-600 text-white text-[10px] font-bold px-2.5 py-0.5 rounded uppercase tracking-wider">AUDIOBOOK & KARAOKE</span>
        <h2 class="text-base md:text-xl font-bold font-serif text-white line-clamp-1">${item.title}</h2>
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
    this.activeAudio = new Audio(item.audioUrl || "https://actions.google.com/sounds/v1/ambient/morning_birds.ogg");
    this.activeAudio.loop = true;
    this.activeAudio.volume = 0.2;

    // Chapters & Text handling
    const chapters = (item.content && item.content.length) ? item.content : [
      {
        title: item.title,
        text: item.desc || item.description || "Welcome to Sanatana360 sacred audio chronicles."
      }
    ];

    let currentChapterIdx = 0;
    let selectedLang = 'en-IN';
    let isTranslating = false;
    let isPlaying = false;
    let autoScrollEnabled = true;
    let teleprompterFontSize = 15; // default px
    let wordTokens = [];
    let currentTextToSpeak = chapters[0].text;
    let elapsedSeconds = 0;
    let currentWordIdx = -1;

    // Translation cache helper
    const getTranslation = async (text, langCode) => {
      const target = langCode.split('-')[0];
      if (target === 'en') return text;
      
      const cacheKey = `${item.id}_${currentChapterIdx}_${target}`;
      if (window.translationCache && window.translationCache[cacheKey]) {
        return window.translationCache[cacheKey];
      }
      if (!window.translationCache) window.translationCache = {};

      try {
        const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text.substring(0, 500))}&langpair=en|${target}`);
        if (!res.ok) throw new Error("Translation API failed");
        const data = await res.json();
        const translated = data.responseData.translatedText;
        if (translated) {
          window.translationCache[cacheKey] = translated;
          return translated;
        }
      } catch (err) {
        console.warn("Translation fallback to English", err);
      }
      return text;
    };

    // Calculate total duration based on text words
    const calculateDuration = (text) => {
      const words = text.split(/\s+/).filter(Boolean).length;
      return Math.max(15, Math.ceil(words / (2.2 * (this.audioRateMultiplier || 1.0))));
    };

    let totalDuration = calculateDuration(currentTextToSpeak);

    // ── Build Karaoke HTML & Token Mapping ──
    const buildKaraokeHTML = (text) => {
      wordTokens = [];
      const sentenceRegex = /[^.!?]+[.!?]+|[^.!?]+$/g;
      const sentences = text.match(sentenceRegex) || [text];

      let globalWordIdx = 0;
      let runningCharOffset = 0;

      let html = '';
      sentences.forEach((sentence, sIdx) => {
        const trimmedSentence = sentence.trim();
        if (!trimmedSentence) return;

        const words = trimmedSentence.split(/(\s+)/);
        let sentenceWordsHTML = '';

        words.forEach(token => {
          if (/^\s+$/.test(token)) {
            sentenceWordsHTML += token;
            runningCharOffset += token.length;
          } else {
            const charStart = runningCharOffset;
            const charEnd = charStart + token.length;
            wordTokens.push({
              idx: globalWordIdx,
              word: token,
              charStart,
              charEnd,
              sentenceIdx: sIdx
            });

            sentenceWordsHTML += `<span class="karaoke-word karaoke-word-upcoming" id="kw-${globalWordIdx}" data-idx="${globalWordIdx}" data-start="${charStart}" data-end="${charEnd}">${token}</span>`;
            globalWordIdx++;
            runningCharOffset += token.length;
          }
        });

        html += `<span class="karaoke-sentence" id="ks-${sIdx}" data-sentence-idx="${sIdx}">${sentenceWordsHTML}</span> `;
      });

      return html;
    };

    // Indian Voice settings
    const getIndianVoice = (lang) => {
      const voices = window.speechSynthesis.getVoices();
      const priorities = {
        'en-IN': ['en-IN', 'en_IN'],
        'kn-IN': ['kn-IN', 'kn_IN'],
        'hi-IN': ['hi-IN', 'hi_IN'],
        'ta-IN': ['ta-IN', 'ta_IN'],
        'te-IN': ['te-IN', 'te_IN'],
      };
      const codes = priorities[lang] || ['en-IN'];
      for (const code of codes) {
        const v = voices.find(v => v.lang === code || v.lang.replace('_','-') === code);
        if (v) return v;
      }
      const googleIN = voices.find(v => v.lang.startsWith('en') && v.name.toLowerCase().includes('india'));
      if (googleIN) return googleIN;
      return voices.find(v => v.lang.startsWith('en')) || null;
    };

    const getIndianSpeechSettings = (lang) => {
      const settings = {
        'en-IN': { rate: 0.88 * (this.audioRateMultiplier || 1.0), pitch: 0.94 },
        'kn-IN': { rate: 0.85 * (this.audioRateMultiplier || 1.0), pitch: 0.94 },
        'hi-IN': { rate: 0.85 * (this.audioRateMultiplier || 1.0), pitch: 0.91 },
        'ta-IN': { rate: 0.84 * (this.audioRateMultiplier || 1.0), pitch: 0.92 },
        'te-IN': { rate: 0.85 * (this.audioRateMultiplier || 1.0), pitch: 0.91 },
      };
      return settings[lang] || { rate: 0.88 * (this.audioRateMultiplier || 1.0), pitch: 0.94 };
    };

    // ── Live Karaoke Word & Sentence Synchronizer ──
    const syncKaraokeToCharIndex = (charIndex) => {
      if (!wordTokens.length) return;

      let activeWord = wordTokens.find(w => charIndex >= w.charStart && charIndex <= w.charEnd);
      if (!activeWord) {
        for (let i = 0; i < wordTokens.length; i++) {
          if (wordTokens[i].charStart > charIndex) {
            activeWord = wordTokens[Math.max(0, i - 1)];
            break;
          }
        }
        if (!activeWord && wordTokens.length) activeWord = wordTokens[wordTokens.length - 1];
      }

      if (!activeWord) return;

      const activeIdx = activeWord.idx;
      if (activeIdx === currentWordIdx) return;
      currentWordIdx = activeIdx;

      // Update words
      wordTokens.forEach(w => {
        const el = document.getElementById('kw-' + w.idx);
        if (!el) return;
        if (w.idx < activeIdx) {
          el.className = 'karaoke-word karaoke-word-passed';
        } else if (w.idx === activeIdx) {
          el.className = 'karaoke-word karaoke-word-active';
        } else {
          el.className = 'karaoke-word karaoke-word-upcoming';
        }
      });

      // Update sentences
      document.querySelectorAll('.karaoke-sentence').forEach(s => {
        const sIdx = parseInt(s.getAttribute('data-sentence-idx') || '-1');
        if (sIdx === activeWord.sentenceIdx) {
          s.classList.add('karaoke-sentence-active');
        } else {
          s.classList.remove('karaoke-sentence-active');
        }
      });

      // Auto scroll if enabled
      if (autoScrollEnabled) {
        const activeEl = document.getElementById('kw-' + activeIdx);
        const containerBox = document.getElementById('karaoke-scroll-container');
        if (activeEl && containerBox) {
          const containerRect = containerBox.getBoundingClientRect();
          const elRect = activeEl.getBoundingClientRect();
          const relativeTop = elRect.top - containerRect.top;
          if (relativeTop < 40 || relativeTop > containerRect.height - 80) {
            activeEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        }
      }
    };

    // ── Speech Narration Engine ──
    const speakWith = (text, startChar = 0) => {
      window.speechSynthesis.cancel();
      const textToSpeakNow = startChar > 0 ? text.substring(startChar) : text;
      const utterance = new SpeechSynthesisUtterance(textToSpeakNow);
      const { rate, pitch } = getIndianSpeechSettings(selectedLang);
      utterance.rate = rate;
      utterance.pitch = pitch;
      utterance.lang = selectedLang;
      const voice = getIndianVoice(selectedLang);
      if (voice) utterance.voice = voice;

      utterance.onboundary = (event) => {
        if (event.name === 'word' || event.name === 'sentence') {
          const actualChar = startChar + event.charIndex;
          syncKaraokeToCharIndex(actualChar);
        }
      };

      utterance.onend = () => {
        isPlaying = false;
        if (this.activeAudio) this.activeAudio.pause();
        if (this.audioProgressInterval) {
          clearInterval(this.audioProgressInterval);
          this.audioProgressInterval = null;
        }
        drawPlayerUI();
      };

      utterance.onerror = (err) => {
        console.warn("Speech synthesis notice:", err);
      };

      window.speechSynthesis.speak(utterance);
    };

    const tickProgress = () => {
      if (!isPlaying) return;
      elapsedSeconds++;

      // Teleprompter fallback sync if onboundary is delayed
      const approxChar = Math.floor((elapsedSeconds / totalDuration) * currentTextToSpeak.length);
      syncKaraokeToCharIndex(approxChar);

      // Save progress dynamically
      this.progress[item.id] = { progress: elapsedSeconds / totalDuration, timestamp: Date.now() };
      localStorage.setItem('hs_progress', JSON.stringify(this.progress));

      if (elapsedSeconds >= totalDuration) {
        if (this.audioProgressInterval) {
          clearInterval(this.audioProgressInterval);
          this.audioProgressInterval = null;
        }
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
      const currentChapter = chapters[currentChapterIdx] || chapters[0];

      modalBody.innerHTML = `
        <div class="flex flex-col items-center justify-center p-4 md:p-6 text-center max-w-2xl mx-auto">
          <!-- Top Soundwave visualizer & title -->
          <div class="flex items-center justify-between w-full mb-3 px-1">
            <div class="flex items-center gap-2">
              <span class="w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-white/30'}"></span>
              <span class="text-[10px] font-mono uppercase tracking-wider text-white/70 font-bold">${isPlaying ? 'LIVE AUDIO & KARAOKE SYNC' : 'PAUSED'}</span>
            </div>
            <!-- Audio visualizer animation -->
            <div class="audio-visualizer-container flex items-end justify-center gap-1 h-6">
              ${Array.from({ length: 8 }).map((_, idx) => `
                <span class="visualizer-bar w-1 rounded-full bg-gradient-to-t from-blue-500 to-indigo-400 block transition-all" style="height: 15%; animation: soundwave 1s ease-in-out infinite alternate; animation-delay: ${idx * 0.12}s; animation-play-state: ${isPlaying ? 'running' : 'paused'}"></span>
              `).join('')}
            </div>
          </div>

          <!-- Chapter Selector (if multi-chapter) -->
          ${chapters.length > 1 ? `
            <div class="flex items-center gap-1.5 mb-3 overflow-x-auto w-full no-scrollbar py-1">
              ${chapters.map((ch, idx) => `
                <button class="audio-chapter-tab-btn flex-shrink-0 text-[10px] font-bold px-3 py-1 rounded-lg border transition-all ${idx === currentChapterIdx ? 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30' : 'bg-white/5 border-white/10 text-white/60 hover:text-white'}" data-ch-idx="${idx}">
                  ${ch.title ? ch.title.substring(0, 22) : `Chapter ${idx + 1}`}
                </button>
              `).join('')}
            </div>
          ` : ''}

          <!-- Language / Voice Selector -->
          <div class="flex items-center justify-between w-full mb-3 flex-wrap gap-2 px-1">
            <div class="flex items-center gap-1.5 flex-wrap">
              <span class="text-[9px] text-white/40 uppercase tracking-wider font-bold">Voice:</span>
              ${[
                { code: 'en-IN', label: '🇮🇳 English' },
                { code: 'kn-IN', label: '✨ ಕನ್ನಡ' },
                { code: 'hi-IN', label: '🕉 हिन्दी' },
                { code: 'ta-IN', label: '🌺 தமிழ்' },
                { code: 'te-IN', label: '🌸 తెలుగు' },
              ].map(lang => `
                <button class="voice-lang-btn text-[9px] font-bold px-2 py-0.8 rounded-full border transition-all
                  ${selectedLang === lang.code
                    ? 'bg-gold text-black border-gold shadow-sm shadow-gold/30'
                    : 'bg-white/5 text-white/50 border-white/10 hover:border-white/30'}"
                  data-lang="${lang.code}">${lang.label}</button>
              `).join('')}
            </div>

            <!-- Accessibility Font Size & Auto-scroll controls -->
            <div class="flex items-center gap-2 text-xs">
              <button id="karaoke-font-dec" class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 hover:text-white text-[10px] font-bold" title="Decrease font size">A-</button>
              <button id="karaoke-font-inc" class="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60 hover:text-white text-[10px] font-bold" title="Increase font size">A+</button>
              <button id="karaoke-autoscroll-toggle" class="px-2 py-0.5 rounded border text-[10px] font-bold ${autoScrollEnabled ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40' : 'bg-white/5 text-white/40 border-white/10'}" title="Auto-scroll follow narrator">
                📜 Auto-Scroll ${autoScrollEnabled ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>

          <!-- ── REAL-TIME KARAOKE SYNCHRONIZED TELEPROMPTER VIEWPORT ── -->
          <div class="w-full relative rounded-2xl overflow-hidden mb-4 border border-white/10 bg-[#0a0c12]/90 shadow-2xl">
            <div class="px-4 py-2 bg-white/5 border-b border-white/5 flex items-center justify-between text-[10px] text-white/50">
              <span class="flex items-center gap-1.5 font-mono">
                <span class="text-gold">📖</span>
                <span>Click any sentence to listen from there</span>
              </span>
              <span class="text-white/40">${item.narrator || 'Acharya Narration'}</span>
            </div>
            
            <div id="karaoke-scroll-container" class="karaoke-teleprompter-box p-5 md:p-6 text-left max-h-[220px] md:max-h-[260px] overflow-y-auto leading-relaxed select-text font-serif transition-all" style="font-size: ${teleprompterFontSize}px; line-height: 1.8;">
              ${isTranslating ? `
                <div class="flex items-center justify-center gap-3 py-12">
                  <span class="w-4 h-4 border-2 border-gold border-t-transparent rounded-full animate-spin"></span>
                  <span class="text-xs text-gold font-bold uppercase tracking-wider font-sans">Translating lyrics...</span>
                </div>
              ` : buildKaraokeHTML(currentTextToSpeak)}
            </div>
          </div>

          <!-- Playback Speed and Ambient Audio Bar -->
          <div class="flex items-center justify-between w-full mb-3 px-1 text-[10px] text-white/60 font-sans">
            <div class="flex items-center gap-2">
              <span>Speed:</span>
              <select id="audio-speed-select" class="bg-[#14161f] border border-white/10 rounded px-2 py-0.5 text-white text-[10px] focus:outline-none">
                <option value="0.75" ${(this.audioRateMultiplier || 1.0) === 0.75 ? 'selected' : ''}>0.75x</option>
                <option value="1.0" ${(this.audioRateMultiplier || 1.0) === 1.0 ? 'selected' : ''}>1.0x</option>
                <option value="1.25" ${(this.audioRateMultiplier || 1.0) === 1.25 ? 'selected' : ''}>1.25x</option>
                <option value="1.5" ${(this.audioRateMultiplier || 1.0) === 1.5 ? 'selected' : ''}>1.5x</option>
              </select>
            </div>

            <div class="flex items-center gap-2">
              <span>🌿 Ambient Score:</span>
              <input type="range" id="audio-ambient-vol" min="0" max="1" step="0.05" value="${this.activeAudio ? this.activeAudio.volume : 0.2}" class="w-16 accent-blue-500 cursor-pointer">
            </div>
          </div>

          <!-- Audio Progress Bar -->
          <div class="w-full mb-5">
            <div class="w-full bg-white/10 rounded-full h-2 relative cursor-pointer group" id="audio-progress-track">
              <div class="bg-gradient-to-r from-blue-500 via-indigo-500 to-amber-400 h-2 rounded-full transition-all" id="audio-progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="flex justify-between items-center mt-1.5 text-[10px] text-white/40 font-mono">
              <span id="audio-timer-elapsed">${this.formatTime(elapsedSeconds)}</span>
              <span>${this.formatTime(totalDuration)}</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-6">
            <button id="audio-rewind" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all text-white flex items-center justify-center text-xs" title="Rewind 10s">⏮ 10s</button>
            <button id="audio-play-toggle" class="w-16 h-16 rounded-full bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-500 hover:to-indigo-400 hover:scale-105 active:scale-95 transition-all text-white flex items-center justify-center text-2xl shadow-xl shadow-blue-500/30">
              ${isPlaying ? '⏸' : '▶'}
            </button>
            <button id="audio-forward" class="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:scale-105 transition-all text-white flex items-center justify-center text-xs" title="Forward 10s">10s ⏭</button>
          </div>
        </div>
      `;

      // Chapter switches
      modalBody.querySelectorAll('.audio-chapter-tab-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          const idx = parseInt(btn.getAttribute('data-ch-idx') || '0');
          currentChapterIdx = idx;
          currentTextToSpeak = chapters[currentChapterIdx].text;
          totalDuration = calculateDuration(currentTextToSpeak);
          elapsedSeconds = 0;
          currentWordIdx = -1;

          if (selectedLang !== 'en-IN') {
            isTranslating = true;
            drawPlayerUI();
            currentTextToSpeak = await getTranslation(chapters[currentChapterIdx].text, selectedLang);
            isTranslating = false;
          }

          if (isPlaying) {
            window.speechSynthesis.cancel();
            speakWith(currentTextToSpeak, 0);
          }
          drawPlayerUI();
        });
      });

      // Language switcher
      modalBody.querySelectorAll('.voice-lang-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          selectedLang = btn.getAttribute('data-lang');
          isTranslating = true;
          drawPlayerUI();

          currentTextToSpeak = await getTranslation(chapters[currentChapterIdx].text, selectedLang);
          totalDuration = calculateDuration(currentTextToSpeak);
          elapsedSeconds = 0;
          currentWordIdx = -1;
          isTranslating = false;

          if (isPlaying) {
            window.speechSynthesis.cancel();
            speakWith(currentTextToSpeak, 0);
          }
          drawPlayerUI();
        });
      });

      // Font size buttons
      const fontDec = document.getElementById('karaoke-font-dec');
      const fontInc = document.getElementById('karaoke-font-inc');
      const autoScrollToggle = document.getElementById('karaoke-autoscroll-toggle');

      if (fontDec) {
        fontDec.addEventListener('click', () => {
          teleprompterFontSize = Math.max(12, teleprompterFontSize - 2);
          const box = document.getElementById('karaoke-scroll-container');
          if (box) box.style.fontSize = teleprompterFontSize + 'px';
        });
      }

      if (fontInc) {
        fontInc.addEventListener('click', () => {
          teleprompterFontSize = Math.min(24, teleprompterFontSize + 2);
          const box = document.getElementById('karaoke-scroll-container');
          if (box) box.style.fontSize = teleprompterFontSize + 'px';
        });
      }

      if (autoScrollToggle) {
        autoScrollToggle.addEventListener('click', () => {
          autoScrollEnabled = !autoScrollEnabled;
          drawPlayerUI();
        });
      }

      // Sentence jump click
      modalBody.querySelectorAll('.karaoke-sentence').forEach(sentEl => {
        sentEl.addEventListener('click', () => {
          const firstWord = sentEl.querySelector('.karaoke-word');
          if (firstWord) {
            const charStart = parseInt(firstWord.getAttribute('data-start') || '0');
            const ratio = charStart / currentTextToSpeak.length;
            elapsedSeconds = Math.floor(ratio * totalDuration);

            isPlaying = true;
            if (this.activeAudio) this.activeAudio.play().catch(() => {});
            speakWith(currentTextToSpeak, charStart);

            if (!this.audioProgressInterval) {
              this.audioProgressInterval = setInterval(tickProgress, 1000);
            }
            drawPlayerUI();
          }
        });
      });

      // Speed selector
      const speedSelect = document.getElementById('audio-speed-select');
      if (speedSelect) {
        speedSelect.addEventListener('change', (e) => {
          this.audioRateMultiplier = parseFloat(e.target.value);
          localStorage.setItem('hs_audio_rate', String(this.audioRateMultiplier));
          totalDuration = calculateDuration(currentTextToSpeak);
          if (isPlaying) {
            const charStart = Math.floor((elapsedSeconds / totalDuration) * currentTextToSpeak.length);
            speakWith(currentTextToSpeak, charStart);
          }
        });
      }

      // Ambient slider
      const ambientSlider = document.getElementById('audio-ambient-vol');
      if (ambientSlider) {
        ambientSlider.addEventListener('input', (e) => {
          if (this.activeAudio) {
            this.activeAudio.volume = parseFloat(e.target.value);
          }
        });
      }

      // Progress bar click
      const progressTrack = document.getElementById('audio-progress-track');
      if (progressTrack) {
        progressTrack.addEventListener('click', (e) => {
          const rect = progressTrack.getBoundingClientRect();
          const clickX = e.clientX - rect.left;
          const ratio = Math.max(0, Math.min(1, clickX / rect.width));
          elapsedSeconds = Math.floor(ratio * totalDuration);
          const charStart = Math.floor(ratio * currentTextToSpeak.length);

          if (isPlaying) {
            speakWith(currentTextToSpeak, charStart);
          } else {
            syncKaraokeToCharIndex(charStart);
          }
          drawPlayerUI();
        });
      }

      // Play toggle
      const playToggle = document.getElementById('audio-play-toggle');
      const rewindBtn = document.getElementById('audio-rewind');
      const forwardBtn = document.getElementById('audio-forward');

      if (playToggle) {
        playToggle.addEventListener('click', () => {
          isPlaying = !isPlaying;
          if (isPlaying) {
            if (this.activeAudio) {
              this.activeAudio.play().catch(err => console.log("Ambient score notice:", err));
            }
            const charStart = Math.floor((elapsedSeconds / totalDuration) * currentTextToSpeak.length);
            speakWith(currentTextToSpeak, charStart);

            if (!this.audioProgressInterval) {
              this.audioProgressInterval = setInterval(tickProgress, 1000);
            }
          } else {
            if (this.activeAudio) this.activeAudio.pause();
            window.speechSynthesis.pause();
            if (this.audioProgressInterval) {
              clearInterval(this.audioProgressInterval);
              this.audioProgressInterval = null;
            }
          }
          drawPlayerUI();
        });
      }

      if (rewindBtn) {
        rewindBtn.addEventListener('click', () => {
          elapsedSeconds = Math.max(0, elapsedSeconds - 10);
          const charStart = Math.floor((elapsedSeconds / totalDuration) * currentTextToSpeak.length);
          if (isPlaying) {
            speakWith(currentTextToSpeak, charStart);
          } else {
            syncKaraokeToCharIndex(charStart);
          }
          drawPlayerUI();
        });
      }

      if (forwardBtn) {
        forwardBtn.addEventListener('click', () => {
          elapsedSeconds = Math.min(totalDuration, elapsedSeconds + 10);
          const charStart = Math.floor((elapsedSeconds / totalDuration) * currentTextToSpeak.length);
          if (isPlaying && elapsedSeconds < totalDuration) {
            speakWith(currentTextToSpeak, charStart);
          } else {
            syncKaraokeToCharIndex(charStart);
          }
          drawPlayerUI();
        });
      }
    };

    drawPlayerUI();

    modal.classList.remove('hidden');
    modal.classList.add('flex');

    const closeBtn = modal.querySelector('.modal-close');
    if (closeBtn) {
      closeBtn.onclick = (e) => {
        e.stopPropagation();
        this.closeAllModals();
      };
    }
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
            <input type="text" id="pay-name" placeholder="e.g. Rahul Sharma" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-gold/50 focus:outline-none transition-colors" required>
          </div>
          <div>
            <label class="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1.5">Email Address</label>
            <input type="email" id="pay-email" placeholder="e.g. rahul.sharma@example.com" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-gold/50 focus:outline-none transition-colors" required>
          </div>
          <div>
            <label class="text-[10px] font-bold text-white/50 uppercase tracking-widest block mb-1.5">Phone Number</label>
            <input type="tel" id="pay-phone" placeholder="e.g. 9876543210" pattern="[0-9]{10}" title="Please enter a valid 10-digit mobile number" class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:border-gold/50 focus:outline-none transition-colors" required>
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

      const resData = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(resData.error || resData.message || "Unable to create checkout order on the server.");
      }

      if (!resData.payment_session_id) {
        throw new Error(resData.error || "Failed to retrieve session ID from Cashfree.");
      }

      // Initialize Cashfree in production mode
      if (typeof window.Cashfree === 'undefined') {
        throw new Error("Cashfree payment gateway SDK is loading or blocked by your browser. Please disable ad-blockers and try again.");
      }

      const cashfreeInstance = window.Cashfree({ mode: "production" });
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
        localStorage.setItem('hs_order_id', orderId || ('order_' + Date.now()));
        if (!localStorage.getItem('hs_sub_timestamp')) {
            localStorage.setItem('hs_sub_timestamp', String(Date.now()));
          }
          localStorage.setItem('hs_sub_date', new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' }));
          localStorage.removeItem('hs_sub_expired');
        localStorage.setItem('hs_sub_plan', 'Heritage Knowledge Annual Pass (₹399/yr)');
        
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
  // Handle premium locked prompts & dynamic buy button visibility
  setupSubscriptionUI() {
    const promoCard = document.getElementById('premium-promo-card');
    const headerGetPassBtn = document.getElementById('header-get-pass-btn');
    const floatingPromoBar = document.getElementById('floating-promo-bar');
    const subBadge = document.getElementById('header-sub-badge');

    if (this.isSubscribed) {
      // HIDE BUY OPTIONS FOR SUBSCRIBED USERS
      if (headerGetPassBtn) headerGetPassBtn.style.display = 'none';
      if (floatingPromoBar) floatingPromoBar.style.display = 'none';
      if (subBadge) subBadge.classList.remove('hidden');

      if (promoCard) {
        promoCard.innerHTML = `
          <div class="bg-gradient-to-r from-emerald-600/10 to-teal-600/10 border border-emerald-500/30 rounded-2xl p-6 text-center">
            <h4 class="text-lg font-bold text-emerald-400 mb-1 font-serif">✨ Premium Pass Active</h4>
            <p class="text-xs text-white/70">Thank you for supporting the preservation and education of our cultural heritage.</p>
          </div>
        `;
      }
    } else {
      // SHOW BUY OPTIONS FOR FREE USERS
      if (headerGetPassBtn) headerGetPassBtn.style.display = 'inline-flex';
      if (floatingPromoBar) floatingPromoBar.style.display = 'flex';
      if (subBadge) subBadge.classList.add('hidden');

      if (promoCard) {
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
        promoCard.querySelector('.trigger-checkout')?.addEventListener('click', () => {
          this.openPaymentModal();
        });
      }
    }
  }

  setupAmbientMusic() {
    const btn = document.getElementById('ambient-music-btn');
    if (!btn) return;

    let isPlaying = false;
    let audioCtx = null;
    let tanpuraTimer = null;
    let fallbackAudio = null;

    // Web Audio Indian Classical Tanpura Drone Generator (136.1 Hz Cosmic Om Tuning)
    const startTanpuraEngine = () => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) throw new Error("Web Audio not supported");
        audioCtx = new AudioContext();
        if (audioCtx.state === 'suspended') audioCtx.resume();

        // 4 Tanpura Strings in C# (Sa-Pa-Sa-Kharja Sa):
        // 1st String: Pa (204.15 Hz)
        // 2nd String: Madhya Sa (272.2 Hz)
        // 3rd String: Madhya Sa (272.2 Hz)
        // 4th String: Kharja Sa (136.1 Hz)
        const stringPitches = [204.15, 272.2, 272.2, 136.1];
        let strIdx = 0;

        const pluckString = () => {
          if (!isPlaying || !audioCtx) return;
          const freq = stringPitches[strIdx];
          const now = audioCtx.currentTime;

          // Main Oscillator with Rich Harmonics
          const osc = audioCtx.createOscillator();
          const gain = audioCtx.createGain();
          const filter = audioCtx.createBiquadFilter();

          osc.type = strIdx === 3 ? 'sawtooth' : 'triangle';
          osc.frequency.setValueAtTime(freq, now);

          // Warm Acoustic Resonance Filter
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(freq * 3.5, now);
          filter.Q.setValueAtTime(4.0, now);

          // Pluck Envelope with gentle decay
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 3.2);

          osc.connect(filter);
          filter.connect(gain);
          gain.connect(audioCtx.destination);

          osc.start(now);
          osc.stop(now + 3.3);

          strIdx = (strIdx + 1) % stringPitches.length;
        };

        // Pluck strings sequentially every 800ms
        pluckString();
        tanpuraTimer = setInterval(pluckString, 850);
      } catch (err) {
        console.warn("Using fallback ambient track:", err);
        if (!fallbackAudio) {
          fallbackAudio = new Audio("https://actions.google.com/sounds/v1/ambiences/wind_chimes_short.ogg");
          fallbackAudio.loop = true;
          fallbackAudio.volume = 0.25;
        }
        fallbackAudio.play().catch(() => {});
      }
    };

    const stopTanpuraEngine = () => {
      if (tanpuraTimer) {
        clearInterval(tanpuraTimer);
        tanpuraTimer = null;
      }
      if (audioCtx) {
        audioCtx.close().catch(() => {});
        audioCtx = null;
      }
      if (fallbackAudio) {
        fallbackAudio.pause();
      }
    };

    btn.addEventListener('click', (e) => {
      e.preventDefault();
      isPlaying = !isPlaying;
      if (isPlaying) {
        startTanpuraEngine();
        btn.classList.add('border-gold', 'text-gold', 'bg-gold/20');
        btn.innerHTML = '<span class="animate-bounce text-sm">🪕</span> <span class="hidden lg:inline text-gold font-bold">Playing Tanpura</span>';
      } else {
        stopTanpuraEngine();
        btn.classList.remove('border-gold', 'text-gold', 'bg-gold/20');
        btn.innerHTML = '<span>🪕</span> <span class="hidden lg:inline">Ambience</span>';
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
          // Filter matching content from all catalog items
          const allItems = this.contentData.content || [];
          const matching = allItems.filter(x => x.personas && x.personas.includes(persona));
          const combinedHTML = matching.map(item => this.createContentCardHTML(item, !item.videoUrl && (item.category === 'Audiobooks & Legends' || item.category === 'Ebook & Audio Series'), 'w-full')).join('');

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

      const allItems = this.contentData.content || [];
      const matching = allItems.filter(x => 
        (x.title && x.title.toLowerCase().includes(query)) ||
        (x.tagline && x.tagline.toLowerCase().includes(query)) ||
        (x.description && x.description.toLowerCase().includes(query)) ||
        (x.desc && x.desc.toLowerCase().includes(query)) ||
        (x.category && x.category.toLowerCase().includes(query))
      );
      const combinedHTML = matching.map(item => this.createContentCardHTML(item, !item.videoUrl && (item.category === 'Audiobooks & Legends' || item.category === 'Ebook & Audio Series'), 'w-full')).join('');

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
      grid.innerHTML = `<div class="text-white/40 py-8 text-xs pl-4">No remedies found. Try a different search/filter!</div>`;
      return;
    }

    grid.innerHTML = filtered.map(rem => `
      <div class="ayur-card flex-shrink-0 w-72 rounded-2xl overflow-hidden bg-white/5 border border-white/5 cursor-pointer relative group transition-all duration-500 hover:border-gold/30 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gold/5 p-5 flex flex-col justify-between" data-rem-id="${rem.id}">
        <div>
          <div class="flex justify-between items-start mb-3">
            <span class="text-3xl">${rem.icon}</span>
            <span class="text-[9px] font-bold text-gold bg-gold/10 border border-gold/25 px-2.5 py-0.5 rounded-full uppercase tracking-wider">${rem.category}</span>
          </div>
          <h4 class="font-bold text-white text-base font-serif mb-1 leading-snug">${rem.title}</h4>
          <p class="text-xs text-white/60 line-clamp-3 leading-relaxed mb-4">${rem.description}</p>
        </div>
        <div class="pt-4 border-t border-white/5 flex items-center justify-between">
          <span class="text-[10px] text-white/40 uppercase font-mono">${rem.dosha.split(';')[0]}</span>
          <span class="text-xs text-gold font-bold flex items-center gap-1 hover:underline">
            <span>📖 View Recipe</span> &rarr;
          </span>
        </div>
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
      const matchesCategory = !this.selectedTempleCategory || this.selectedTempleCategory === 'all' || 
                              temp.categories.includes(this.selectedTempleCategory);
      
      const matchesSearch = temp.title.toLowerCase().includes(this.templeSearchQuery) ||
                            temp.location.toLowerCase().includes(this.templeSearchQuery) ||
                            temp.deityTag.toLowerCase().includes(this.templeSearchQuery) ||
                            temp.description.toLowerCase().includes(this.templeSearchQuery);
      return matchesCategory && matchesSearch;
    });

    if (this.sortByDistanceActive) {
      filtered.sort((a, b) => (a.distance || 9999) - (b.distance || 9999));
    }

    if (!filtered.length) {
      grid.innerHTML = `<div class="text-white/40 py-8 text-xs pl-4">No temples found. Try a different search/filter!</div>`;
      return;
    }

    grid.innerHTML = filtered.map(temp => {
      const distanceBadge = temp.distance !== undefined
        ? `<span class="text-[9px] font-bold text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-2 py-0.5 rounded-full">📍 ${temp.distance.toFixed(1)} km</span>`
        : '';
        
      return `
        <div class="ayur-card flex-shrink-0 w-80 rounded-2xl overflow-hidden bg-white/5 border border-white/5 cursor-pointer relative group transition-all duration-500 hover:border-gold/30 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-gold/5 flex flex-col justify-between" data-temp-id="${temp.id}">
          <!-- Thumbnail cover -->
          <div class="h-40 w-full relative flex flex-col justify-between p-4 overflow-hidden">
            <img src="${temp.image}" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]" alt="${temp.title}">
            <div class="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/30 to-transparent z-15 pointer-events-none"></div>
            
            <div class="flex justify-between items-start w-full relative z-20">
              <span class="text-[9px] font-bold text-white/90 bg-black/40 px-2 py-0.8 rounded-md uppercase tracking-wider border border-white/5 backdrop-blur-md ml-auto">
                ${temp.deityTag}
              </span>
            </div>

            <div class="text-white z-20 relative">
              <h4 class="font-bold text-base font-serif line-clamp-1 leading-snug drop-shadow-md text-white/95">${temp.title}</h4>
              <p class="text-[10px] text-white/70 line-clamp-1">${temp.location} • ${temp.era}</p>
            </div>
            
            <!-- Hover Overlay Maps Button -->
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <button class="open-maps-btn px-4 py-2 bg-gold text-black font-black rounded-lg text-[10px] uppercase tracking-wider transform scale-75 group-hover:scale-100 transition-transform duration-300 shadow-md flex items-center gap-1">
                🗺️ Directions
              </button>
            </div>
          </div>

          <!-- Description and info -->
          <div class="p-4 flex-grow flex flex-col justify-between">
            <p class="text-xs text-white/60 line-clamp-2 leading-relaxed mb-4">
              ${temp.description}
            </p>
            
            <div class="pt-3 border-t border-white/5 flex items-center justify-between">
              <span class="text-xs font-bold text-gold flex items-center gap-1">⭐ ${temp.rating}</span>
              ${distanceBadge}
            </div>
          </div>
        </div>
      `;
    }).join('');

    // Bind card clicks
    grid.querySelectorAll('.ayur-card').forEach(card => {
      card.addEventListener('click', (e) => {
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
        const card = btn.closest('.ayur-card');
        const id = card.getAttribute('data-temp-id');
        const temple = KARNATAKA_TEMPLES.find(t => t.id === id);
        if (temple) {
          const mapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${temple.coords.lat},${temple.coords.lng}`;
          window.open(mapsUrl, '_blank');
        }
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

        <!-- Dynamic Map embed container -->
        <div class="space-y-2">
          <h4 class="text-sm font-bold text-white font-serif flex items-center gap-1.5">
            <span>🗺️</span> Interactive Location Map
          </h4>
          <iframe 
            class="w-full h-48 rounded-2xl border border-white/10 shadow-md" 
            src="https://maps.google.com/maps?q=${temple.coords.lat},${temple.coords.lng}&z=15&output=embed" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0"
            allowfullscreen>
          </iframe>
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
      innerCircle.style.transform = "scale(1.0)";    }
  }

  handleHashChange() {
    const page = document.getElementById('catalog-explorer-page');
    if (!page) return;

    if (window.location.hash === '#catalog-explorer') {
      page.classList.remove('hidden');
      page.classList.add('flex');
      document.body.classList.add('overflow-hidden');
      this.initCatalogExplorer();
    } else {
      page.classList.add('hidden');
      page.classList.remove('flex');
      document.body.classList.remove('overflow-hidden');
    }
  }

  initCatalogExplorer() {
    if (this.isCatalogExplorerInitialized) {
      this.renderCatalogGrid();
      return;
    }
    
    // Bind search input
    const searchInput = document.getElementById('catalog-search');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        this.catalogSearchQuery = e.target.value.toLowerCase().trim();
        this.renderCatalogGrid();
      });
    }

    // Bind category checkboxes
    const catContainer = document.getElementById('catalog-filter-category');
    if (catContainer) {
      catContainer.querySelectorAll('input').forEach(chk => {
        chk.addEventListener('change', () => this.renderCatalogGrid());
      });
    }

    // Bind access select
    const accessSelect = document.getElementById('catalog-filter-access');
    if (accessSelect) {
      accessSelect.addEventListener('change', () => this.renderCatalogGrid());
    }

    // Bind sort select
    const sortSelect = document.getElementById('catalog-sort');
    if (sortSelect) {
      sortSelect.addEventListener('change', () => this.renderCatalogGrid());
    }

    // Bind Reset button
    const resetBtn = document.getElementById('reset-catalog-filters');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (searchInput) searchInput.value = '';
        this.catalogSearchQuery = '';
        if (accessSelect) accessSelect.value = 'all';
        if (sortSelect) sortSelect.value = 'rating';
        if (catContainer) {
          catContainer.querySelectorAll('input').forEach(chk => chk.checked = true);
        }
        this.renderCatalogGrid();
      });
    }

    // Bind close button
    const closeBtn = document.getElementById('close-catalog-btn');
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        window.location.hash = '#library';
      });
    }

    this.isCatalogExplorerInitialized = true;
    this.catalogSearchQuery = '';
    this.renderCatalogGrid();
  }

  renderCatalogGrid() {
    const grid = document.getElementById('catalog-grid');
    if (!grid) return;

    const all = this.contentData ? this.contentData.content || [] : [];
    
    // Get checked categories
    const checkedCats = [];
    const catContainer = document.getElementById('catalog-filter-category');
    if (catContainer) {
      catContainer.querySelectorAll('input:checked').forEach(chk => {
        checkedCats.push(chk.value);
      });
    }

    // Get access filter
    const accessSelect = document.getElementById('catalog-filter-access');
    const accessFilter = accessSelect ? accessSelect.value : 'all';

    // Get sort filter
    const sortSelect = document.getElementById('catalog-sort');
    const sortVal = sortSelect ? sortSelect.value : 'rating';

    // Filter
    let filtered = all.filter(item => {
      // Category match
      let matchesCat = checkedCats.includes(item.category);
      if (item.category === 'Video Series' && checkedCats.includes('Docu-Series')) {
        matchesCat = true;
      }
      
      // Access match
      let matchesAccess = true;
      if (accessFilter === 'free') matchesAccess = !item.isPremium;
      if (accessFilter === 'premium') matchesAccess = item.isPremium;

      // Keyword match
      let matchesSearch = true;
      if (this.catalogSearchQuery) {
        matchesSearch = item.title.toLowerCase().includes(this.catalogSearchQuery) ||
                        (item.tagline && item.tagline.toLowerCase().includes(this.catalogSearchQuery)) ||
                        (item.desc && item.desc.toLowerCase().includes(this.catalogSearchQuery)) ||
                        (item.description && item.description.toLowerCase().includes(this.catalogSearchQuery));
      }

      return matchesCat && matchesAccess && matchesSearch;
    });

    // Sort
    if (sortVal === 'rating') {
      filtered.sort((a, b) => parseFloat(b.rating || 0) - parseFloat(a.rating || 0));
    } else if (sortVal === 'newest') {
      filtered.sort((a, b) => parseInt(b.year || 0) - parseInt(a.year || 0));
    } else if (sortVal === 'az') {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortVal === 'za') {
      filtered.sort((a, b) => b.title.localeCompare(a.title));
    }

    // Update count badge
    const countBadge = document.getElementById('catalog-count-badge');
    if (countBadge) {
      countBadge.textContent = `Showing ${filtered.length} of ${all.length} items`;
    }

    if (!filtered.length) {
      grid.innerHTML = `<div class="col-span-3 text-center text-white/40 py-16 text-sm font-sans">No items match your filters. Try resetting!</div>`;
      return;
    }

    grid.innerHTML = filtered.map(item => this.createContentCardHTML(item, item.category === 'Audiobooks & Legends' || item.category === 'Ebook & Audio Series', 'w-full')).join('');

    // Bind card clicks in grid
    grid.querySelectorAll('.content-card').forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.watchlist-toggle-btn')) return;
        const id = card.getAttribute('data-id');
        const type = card.getAttribute('data-type');
        const item = all.find(x => x.id === id);
        if (item) {
          this.playContent(item, type === 'audio');
        }
      });
    });

    // Bind watchlist toggle buttons in grid
    grid.querySelectorAll('.watchlist-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        e.preventDefault();
        const id = btn.getAttribute('data-id');
        this.toggleWatchlist(id);
        this.renderCatalogGrid();
      });
    });
  }


  // Helper methods for watchlist, readers, and video/audio story triggers
  toggleWatchlist(id) {
    if (this.watchlist.includes(id)) {
      this.watchlist = this.watchlist.filter(x => x !== id);
    } else {
      this.watchlist.push(id);
    }
    localStorage.setItem('hs_watchlist', JSON.stringify(this.watchlist));
    SoundEffects.playClick();
    this.renderContentRows();
  }

  playVideoStory(item) {
    this.playContent(item, false);
  }

  playAudioStory(item) {
    this.playContent(item, true);
  }

  updateDynamicSEO(title, description, image, path) {
    if (title) document.title = `${title} | Sanatana360`;
    if (description) {
      const descMeta = document.querySelector('meta[name="description"]');
      if (descMeta) descMeta.setAttribute('content', description);
      const ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) ogDesc.setAttribute('content', description);
    }
    if (title) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      if (ogTitle) ogTitle.setAttribute('content', `${title} | Sanatana360`);
      const twTitle = document.querySelector('meta[name="twitter:title"]');
      if (twTitle) twTitle.setAttribute('content', `${title} | Sanatana360`);
    }
    if (image) {
      const fullImg = image.startsWith('http') ? image : `https://www.sanatana360.com${image.startsWith('/') ? '' : '/'}${image}`;
      const ogImg = document.querySelector('meta[property="og:image"]');
      if (ogImg) ogImg.setAttribute('content', fullImg);
      const twImg = document.querySelector('meta[name="twitter:image"]');
      if (twImg) twImg.setAttribute('content', fullImg);
    }
    if (path) {
      const fullUrl = path.startsWith('http') ? path : `https://www.sanatana360.com/${path.replace(/^\/?/, '')}`;
      const ogUrl = document.querySelector('meta[property="og:url"]');
      if (ogUrl) ogUrl.setAttribute('content', fullUrl);
      const canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', fullUrl);
    }
  }

  openReader(item) {
    if (item) {
      this.updateDynamicSEO(item.title, item.description || item.tagline, item.imageUrl, `#course-${item.id}`);
    }
    if (window.flipBook) {
      window.flipBook.open(item);
    } else {
      this.openDocuReader(item);
    }
  }

  getUserScores() {
    return DatabaseService.getUserScores();
  }

  setupEyeMovements() {
    const pupilGroups = document.querySelectorAll('#eye-pupil-group');
    const pupils = document.querySelectorAll('#eye-pupil');
    const eyeSvgs = document.querySelectorAll('#human-eye');

    if (!pupilGroups.length) return;

    window.addEventListener('mousemove', (e) => {
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      pupilGroups.forEach((pupilGroup, idx) => {
        const eyeSvg = eyeSvgs[idx];
        const pupil = pupils[idx];
        if (!eyeSvg) return;

        const rect = eyeSvg.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;

        // Calculate delta
        const dx = mouseX - eyeCenterX;
        const dy = mouseY - eyeCenterY;
        const dist = Math.hypot(dx, dy);

        // Sense mouse direction
        const angle = Math.atan2(dy, dx);

        // Limit maximum eyeball deflection radius to 8px so it stays inside masked sclera bounds
        const maxDeflection = 8;
        const deflection = Math.min(maxDeflection, dist / 35);

        const tx = Math.cos(angle) * deflection;
        const ty = Math.sin(angle) * deflection;

        // Apply transformation to eyeball pupil-group
        pupilGroup.style.transform = `translate(${tx}px, ${ty}px)`;

        // Interactive Sensing:
        // Dilate pupil when mouse is far (relaxed eye), constrict when mouse is hovering close (focused eye)
        if (pupil) {
          if (dist < 120) {
            // Focus response (constrict pupil)
            pupil.setAttribute('r', '6.5');
            // Squinting response (narrow eyelids slightly)
            eyeSvg.style.transform = 'scaleY(0.82) scaleX(1.02)';
          } else {
            // Relax response (dilate pupil to normal)
            pupil.setAttribute('r', '9');
            eyeSvg.style.transform = 'scaleY(1.0) scaleX(1.0)';
          }
        }
      });
    });

    // Natural blink simulation cycle
    setInterval(() => {
      eyeSvgs.forEach(eyeSvg => {
        const originalTransform = eyeSvg.style.transform;
        // Close eyelids briefly
        eyeSvg.style.transform = 'scaleY(0.05) scaleX(1.0)';
        setTimeout(() => {
          // Restore eyelids
          eyeSvg.style.transform = originalTransform;
        }, 130);
      });
    }, 4500 + Math.random() * 3000);
  }


  // ─────────────────────────────────────────────────────────────
  // ── ALL MASTER INTERACTIVE ENGINES & FEATURES ────────────────
  // ─────────────────────────────────────────────────────────────

  // 1. 360 Virtual Darshana & Daily Digital Aarti
  initVirtualDarshana() {
    const modal = document.getElementById('virtual-darshana-modal');
    const openBtn = document.getElementById('header-darshana-btn');
    const closeBtn = document.getElementById('close-darshana-modal-btn');

    if (openBtn && modal) {
      openBtn.onclick = (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      };
    }
    if (closeBtn && modal) {
      closeBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        if (this.darshanaAudio) {
          this.darshanaAudio.pause();
          this.darshanaAudio = null;
        }
      };
    }

    const temples = {
      kashi: {
        name: "Kashi Vishwanath Jyotirlinga",
        loc: "Varanasi, Uttar Pradesh",
        img: "/images/shiva.jpg",
        shloka: "कर्पूरगौरं करुणावतारं संसारसारम् भुजगेन्द्रहारम् । सदावसन्तं हृदयारविन्दे भवं भवानीसहितं नमामि ॥"
      },
      kedarnath: {
        name: "Kedarnath Himalayan Sanctum",
        loc: "Rudraprayag, Uttarakhand",
        img: "/images/shiva_neelkanth.jpg",
        shloka: "महादेवं महात्मानं महाध्यानं परायणम् । महापाप हरं देवं मकाराय नमो नमः ॥"
      },
      tirupati: {
        name: "Tirumala Sri Venkateswara Swamy",
        loc: "Tirupati, Andhra Pradesh",
        img: "/images/vishnu.jpg",
        shloka: "कौसल्या सुप्रजा राम पूर्वा संध्या प्रवर्तते । उत्तिष्ठ नरशार्दूल कर्तव्यं दैवनिह्निकम् ॥"
      },
      udupi: {
        name: "Udupi Sri Krishna Matha",
        loc: "Udupi, Karnataka",
        img: "/images/krishna_cover.jpg",
        shloka: "वसुदेवसुतं देवं कंसचाणूरमर्दनम् । देवकीपरमानन्दं कृष्णं वन्दे जगद्गुरुम् ॥"
      },
      meenakshi: {
        name: "Arulmigu Meenakshi Sundareswarar",
        loc: "Madurai, Tamil Nadu",
        img: "/images/meenakshi.jpg",
        shloka: "सर्वमङ्गलमाङ्गल्ये शिवे सर्वार्थसाधिके । शरण्ये त्र्यम्बके गौरि नारायणि नमोऽस्तु ते ॥"
      }
    };

    // Temple Switcher
    document.querySelectorAll('.darshana-tab-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.darshana-tab-btn').forEach(b => {
          b.className = "darshana-tab-btn flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border border-white/10 bg-white/5 text-white/70 hover:border-gold/50 transition-all cursor-pointer";
        });
        btn.className = "darshana-tab-btn flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border border-gold bg-gold text-black transition-all cursor-pointer";

        const tKey = btn.getAttribute('data-temple');
        const t = temples[tKey] || temples.kashi;

        const bgImg = document.getElementById('darshana-bg-img');
        const tName = document.getElementById('darshana-temple-name');
        const tLoc = document.getElementById('darshana-temple-loc');
        const tShloka = document.getElementById('darshana-shloka-text');

        if (bgImg) bgImg.src = t.img;
        if (tName) tName.textContent = t.name;
        if (tLoc) tLoc.textContent = t.loc;
        if (tShloka) tShloka.textContent = '"' + t.shloka + '"';
      };
    });

    // Ring Bell Action
    const bellBtn = document.getElementById('darshana-ring-bell-btn');
    if (bellBtn) {
      bellBtn.onclick = () => {
        bellBtn.classList.add('scale-125');
        setTimeout(() => bellBtn.classList.remove('scale-125'), 300);

        try {
          const ctx = new (window.AudioContext || window.webkitAudioContext)();
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(880, ctx.currentTime);
          osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 1.2);
          gain.gain.setValueAtTime(0.6, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start();
          osc.stop(ctx.currentTime + 1.2);
        } catch (e) {}

        if (window.awardKarmaPoints) window.awardKarmaPoints(5, "Morning Bell Ring");
      };
    }

    // Light Diya Action
    const diyaBtn = document.getElementById('darshana-light-diya-btn');
    const diyaFlame = document.getElementById('darshana-diya-flame');
    if (diyaBtn && diyaFlame) {
      diyaBtn.onclick = () => {
        diyaFlame.classList.remove('hidden');
        diyaFlame.classList.add('flex');
        diyaBtn.classList.add('border-gold', 'bg-gold/20');
        if (window.awardKarmaPoints) window.awardKarmaPoints(5, "Diya Lighting");
      };
    }

    // Offer Flowers Action
    const flowerBtn = document.getElementById('darshana-offer-flowers-btn');
    const petalsCont = document.getElementById('darshana-petals-container');
    if (flowerBtn && petalsCont) {
      flowerBtn.onclick = () => {
        petalsCont.innerHTML = '';
        petalsCont.classList.remove('hidden');

        const flowerEmojis = ['🌸', '🌺', '🌼', '🪷', '✨'];
        for (let i = 0; i < 16; i++) {
          const petal = document.createElement('span');
          petal.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
          petal.className = "absolute text-lg sm:text-2xl transition-all duration-1000 ease-out";
          petal.style.left = (Math.random() * 85 + 5) + '%';
          petal.style.top = '-20px';
          petal.style.opacity = '1';
          petalsCont.appendChild(petal);

          setTimeout(() => {
            petal.style.top = (Math.random() * 60 + 35) + '%';
            petal.style.transform = 'rotate(' + (Math.random() * 360) + 'deg) scale(' + (Math.random() * 0.5 + 0.8) + ')';
          }, 50);
        }

        if (window.awardKarmaPoints) window.awardKarmaPoints(5, "Flower Offering");
      };
    }

    // Aarti Chants Action
    const chantBtn = document.getElementById('darshana-chant-btn');
    const chantLabel = document.getElementById('darshana-chant-label');
    if (chantBtn) {
      chantBtn.onclick = () => {
        if (!this.darshanaAudio) {
          this.darshanaAudio = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=meditation-flute-112197.mp3');
          this.darshanaAudio.loop = true;
          this.darshanaAudio.volume = 0.4;
          this.darshanaAudio.play().catch(() => {});
          if (chantLabel) chantLabel.textContent = "Chants Playing ⏸";
          chantBtn.classList.add('border-gold', 'bg-gold/20');
        } else {
          this.darshanaAudio.pause();
          this.darshanaAudio = null;
          if (chantLabel) chantLabel.textContent = "Aarti Chants";
          chantBtn.classList.remove('border-gold', 'bg-gold/20');
        }
      };
    }
  }

  // 2. Gita Life Compass & Shloka of the Day
  initGitaCompass() {
    const modal = document.getElementById('gita-compass-modal');
    const openBtn = document.getElementById('header-gita-btn');
    const closeBtn = document.getElementById('close-gita-modal-btn');
    const shareBtn = document.getElementById('whatsapp-share-gita-btn');

    if (openBtn && modal) {
      openBtn.onclick = (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      };
    }
    if (closeBtn && modal) {
      closeBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      };
    }

    const gitaVerses = {
      anxiety: {
        ref: "BHAGAVAD GITA 2.14",
        sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः ।<br>आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥",
        translit: '"Matra-sparshas tu kaunteya sheetoshna-sukha-duhkha-dah..."',
        meaning: "O son of Kunti, the contact between senses and sensory objects gives rise to fleeting perceptions of cold and heat, pleasure and pain. They come and go; learn to endure them without losing your equilibrium.",
        action: "⚡ Practical Action: Realize that this phase of stress is temporary like passing weather. Ground your mind in stillness and continue your duty with calm courage."
      },
      confusion: {
        ref: "BHAGAVAD GITA 2.47",
        sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।<br>मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
        translit: '"Karmanye vadhikaraste ma phaleshu kadachana..."',
        meaning: "You have a right solely to perform your righteous duty, but never to the fruits of action. Never consider yourself the cause of results, nor let your mind attach to inaction.",
        action: "⚡ Practical Action: Stop over-analyzing 10 different futures. Pick the single most righteous, productive step you can take today and execute it with 100% devotion."
      },
      anger: {
        ref: "BHAGAVAD GITA 2.62-63",
        sanskrit: "क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः ।<br>स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥",
        translit: '"Krodhad bhavati sammohah sammohat smriti-vibhramah..."',
        meaning: "From anger arises delusion; from delusion comes loss of memory; from loss of memory, the intellect is destroyed; and when intellect is destroyed, a person is ruined.",
        action: "⚡ Practical Action: Pause before reacting. Take 5 deep belly breaths. Anger clouds strategic intellect—respond with calculated wisdom rather than impulsive emotion."
      },
      career: {
        ref: "BHAGAVAD GITA 3.19",
        sanskrit: "तस्मादसक्तः सततं कार्यं कर्म समाचर ।<br>असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥",
        translit: '"Tasmad asaktah satatam karyam karma samachara..."',
        meaning: "Therefore, without being attached to the fruits of activities, constantly perform your duty with excellence, for by working without attachment one attains the highest state.",
        action: "⚡ Practical Action: Focus on mastering your craftsmanship and delivering immense value. Recognition and wealth naturally follow supreme competence."
      },
      grief: {
        ref: "BHAGAVAD GITA 2.20",
        sanskrit: "न जायते म्रियते वा कदाचिन् नायं भूत्वा भविता वा न भूयः ।<br>अजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥",
        translit: '"Na jayate mriyate va kadachin..."',
        meaning: "The soul is never born, nor does it die at any time. It is unborn, eternal, ever-existing, and primeval. It is not destroyed when the body is slain.",
        action: "⚡ Practical Action: Honor the memories of loved ones by embodying their noble qualities. True love and the immortal spirit transcend physical form."
      },
      focus: {
        ref: "BHAGAVAD GITA 6.5",
        sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् ।<br>आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥",
        translit: '"Uddhared atmanatmanam natmanam avasadayet..."',
        meaning: "Elevate yourself through your own mind; do not degrade yourself. For the mind alone is the greatest friend of the self, and the mind alone can be the greatest enemy.",
        action: "⚡ Practical Action: Eliminate phone distractions for the next 45 minutes. Take command of your own focus—your mind is your instrument of greatness."
      }
    };

    const updateGitaDisplay = (moodKey) => {
      const v = gitaVerses[moodKey] || gitaVerses.confusion;
      const refEl = document.getElementById('gita-verse-ref');
      const sanskritEl = document.getElementById('gita-shloka-sanskrit');
      const translitEl = document.getElementById('gita-shloka-translit');
      const meaningEl = document.getElementById('gita-shloka-meaning');
      const actionEl = document.getElementById('gita-shloka-action');

      if (refEl) refEl.textContent = v.ref;
      if (sanskritEl) sanskritEl.innerHTML = v.sanskrit;
      if (translitEl) translitEl.textContent = v.translit;
      if (meaningEl) meaningEl.innerHTML = '<strong>Meaning:</strong> ' + v.meaning;
      if (actionEl) actionEl.innerHTML = v.action;

      if (shareBtn) {
        const cleanSanskrit = v.sanskrit.replace(/<br>/g, ' ');
        const shareMsg = encodeURIComponent('⚜️ *Gita Wisdom of the Day* (' + v.ref + ')\n\n"' + cleanSanskrit + '"\n\n📖 *Meaning:* ' + v.meaning + '\n\n✨ Explore 200+ ancient Indian sagas on Sanatana360: https://www.sanatana360.com');
        shareBtn.onclick = () => {
          window.open('https://api.whatsapp.com/send?text=' + shareMsg, '_blank');
        };
      }
    };

    document.querySelectorAll('.gita-emotion-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.gita-emotion-btn').forEach(b => {
          b.className = "gita-emotion-btn p-2 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:border-gold/50 text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer";
        });
        btn.className = "gita-emotion-btn p-2 rounded-xl border border-gold bg-gold/15 text-gold text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer";

        const mood = btn.getAttribute('data-mood');
        updateGitaDisplay(mood);
      };
    });

    updateGitaDisplay('confusion');
  }

  // 3. Ayurvedic Prakriti (Dosha) Body-Type Analyzer
  initDoshaAnalyzer() {
    const modal = document.getElementById('dosha-analyzer-modal');
    const openBtn = document.getElementById('header-dosha-btn');
    const closeBtn = document.getElementById('close-dosha-modal-btn');
    const quizCont = document.getElementById('dosha-quiz-container');
    const resCont = document.getElementById('dosha-result-container');
    const qCard = document.getElementById('dosha-question-card');
    const retakeBtn = document.getElementById('retake-dosha-btn');

    let currentStep = 0;
    let scores = { vata: 0, pitta: 0, kapha: 0 };

    const questions = [
      {
        q: "What best describes your natural body frame & weight tendency?",
        options: [
          { text: "Lean, slim, prominent joints, finds it hard to gain weight.", type: "vata" },
          { text: "Medium, athletic build, maintains steady balanced weight.", type: "pitta" },
          { text: "Solid, broad shoulders, strong build, gains weight easily.", type: "kapha" },
        ]
      },
      {
        q: "How is your typical digestion and hunger pattern?",
        options: [
          { text: "Irregular: Sometimes very hungry, other times forgets to eat.", type: "vata" },
          { text: "Sharp & Strong: Gets irritable if meals are delayed, fast digestion.", type: "pitta" },
          { text: "Slow & Steady: Can easily skip meals without feeling irritated.", type: "kapha" },
        ]
      },
      {
        q: "When under pressure or stress, your first emotional response is:",
        options: [
          { text: "Anxiety, overthinking, restlessness, and worry.", type: "vata" },
          { text: "Impatience, irritability, or fiery frustration.", type: "pitta" },
          { text: "Calm resistance, withdrawing quietly, or seeking comfort food.", type: "kapha" },
        ]
      },
      {
        q: "How would you describe your sleep quality?",
        options: [
          { text: "Light, easily awakened by small noises, active dreams.", type: "vata" },
          { text: "Moderate (6-7 hrs), falls asleep fast, wakes up energized.", type: "pitta" },
          { text: "Deep, heavy (8+ hrs), loves sleeping in and morning warmth.", type: "kapha" },
        ]
      },
      {
        q: "Which climate and weather makes you feel most comfortable?",
        options: [
          { text: "Warm, sunny, humid weather (dislikes dry cold winds).", type: "vata" },
          { text: "Cool, breezy, shade (dislikes intense humid summer heat).", type: "pitta" },
          { text: "Warm, dry, sunny weather (dislikes cold damp monsoon).", type: "kapha" },
        ]
      }
    ];

    const renderStep = () => {
      if (!qCard) return;
      const q = questions[currentStep];

      let optsHtml = '';
      q.options.forEach(opt => {
        optsHtml += '<button class="dosha-option-btn w-full p-3 rounded-xl bg-white/5 border border-white/10 hover:border-emerald-500/60 text-left text-xs text-white/80 hover:text-white flex items-center gap-3 transition-all cursor-pointer" data-type="' + opt.type + '"><span class="w-5 h-5 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-[10px] text-emerald-300 font-bold flex-shrink-0">&bull;</span><span class="flex-grow font-sans">' + opt.text + '</span></button>';
      });

      qCard.innerHTML = '<div class="flex justify-between items-center text-[10px] font-mono text-emerald-400 font-bold mb-2"><span>STEP ' + (currentStep + 1) + ' OF ' + questions.length + '</span><span>PRAKRITI ASSESSMENT</span></div><h4 class="text-sm sm:text-base font-bold font-serif text-white">' + q.q + '</h4><div class="space-y-2 pt-2">' + optsHtml + '</div>';

      qCard.querySelectorAll('.dosha-option-btn').forEach(btn => {
        btn.onclick = () => {
          const type = btn.getAttribute('data-type');
          scores[type] = (scores[type] || 0) + 1;
          currentStep++;

          if (currentStep < questions.length) {
            renderStep();
          } else {
            showDoshaResult();
          }
        };
      });
    };

    const showDoshaResult = () => {
      quizCont?.classList.add('hidden');
      resCont?.classList.remove('hidden');

      let winner = 'pitta';
      let maxScore = -1;
      for (const [k, v] of Object.entries(scores)) {
        if (v > maxScore) {
          maxScore = v;
          winner = k;
        }
      }

      const doshaData = {
        vata: {
          title: "💨 Vata Constitution (Air & Space)",
          desc: "You are creative, quick-thinking, and enthusiastic. Your energy operates in bursts and thrives on warmth, grounding routines, and nourishing warm foods.",
          favor: "Warm soups, cooked grains, ghee, nuts, ginger tea, sweet ripe fruits.",
          reduce: "Cold salads, iced drinks, raw dry snacks, irregular late meals."
        },
        pitta: {
          title: "🔥 Pitta Constitution (Fire & Water)",
          desc: "You are purposeful, articulate, and have strong digestion and sharp intellect. Your energy thrives on cooling foods, moderation, and peaceful nature walks.",
          favor: "Cooling coconut water, cucumbers, sweet fruits, coriander, mint, ghee.",
          reduce: "Excess spicy chilies, fermented sour foods, deep-fried snacks, skipping meals."
        },
        kapha: {
          title: "🌿 Kapha Constitution (Earth & Water)",
          desc: "You are calm, loyal, strong, and enduring with high immunity. Your energy thrives on active morning exercise, light warm spices, and invigorating routines.",
          favor: "Light warm soups, black pepper, turmeric, honey, steamed veggies, legumes.",
          reduce: "Heavy dairy creams, excess cold sweets, oily snacks, daytime naps."
        }
      };

      const res = doshaData[winner] || doshaData.pitta;
      const wTitle = document.getElementById('dosha-winner-title');
      const wDesc = document.getElementById('dosha-winner-desc');
      const wFavor = document.getElementById('dosha-foods-favor');
      const wReduce = document.getElementById('dosha-foods-reduce');

      if (wTitle) wTitle.textContent = res.title;
      if (wDesc) wDesc.textContent = res.desc;
      if (wFavor) wFavor.textContent = res.favor;
      if (wReduce) wReduce.textContent = res.reduce;
    };

    if (openBtn && modal) {
      openBtn.onclick = (e) => {
        e.preventDefault();
        currentStep = 0;
        scores = { vata: 0, pitta: 0, kapha: 0 };
        quizCont?.classList.remove('hidden');
        resCont?.classList.add('hidden');
        renderStep();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      };
    }
    if (closeBtn && modal) {
      closeBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      };
    }
    if (retakeBtn) {
      retakeBtn.onclick = () => {
        currentStep = 0;
        scores = { vata: 0, pitta: 0, kapha: 0 };
        quizCont?.classList.remove('hidden');
        resCont?.classList.add('hidden');
        renderStep();
      };
    }
  }

  // 4. Vedic Raga Sound Therapy & Meditation Harmonizer

  openMudraModal(symptomKey) {
    const modal = document.getElementById('mudra-studio-modal');
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    if (symptomKey && this.setMudraSymptom) {
      this.setMudraSymptom(symptomKey);
    }
  }

  initMudraStudio() {
    const modal = document.getElementById('mudra-studio-modal');
    const openBtn = document.getElementById('header-mudra-btn');
    const mobileBtn = document.getElementById('mobile-mudra-btn');
    const closeBtn = document.getElementById('close-mudra-modal-btn');
    const symptomBtns = document.querySelectorAll('.mudra-sym-btn');
    const cardImg = document.getElementById('mudra-card-img');
    const elementBadge = document.getElementById('mudra-element-badge');
    const sanskritName = document.getElementById('mudra-sanskrit-name');
    const displayTitle = document.getElementById('mudra-display-title');
    const fingerSteps = document.getElementById('mudra-finger-steps');
    const benefitsDesc = document.getElementById('mudra-benefits-desc');
    const timerText = document.getElementById('mudra-timer-text');
    const timerCircle = document.getElementById('mudra-timer-circle');
    const timerStartBtn = document.getElementById('mudra-timer-start-btn');
    const timerResetBtn = document.getElementById('mudra-timer-reset-btn');
    const startIcon = document.getElementById('mudra-start-icon');
    const startLabel = document.getElementById('mudra-start-label');
    const breathPhase = document.getElementById('mudra-breath-phase');
    const breathSub = document.getElementById('mudra-breath-sub');
    const openCourseBtn = document.getElementById('open-mudra-course-btn');
    if (!modal) return;

    const mudras = {
      apana_vayu: {
        title: "Apana Vayu Mudra (Emergency Heart & Panic Calmer)",
        sanskrit: "Mrit-Sanjeevani Hastamudra",
        elements: "🔥 Fire + 💨 Air + 🌿 Earth",
        img: "/images/mudra_apana_vayu.jpg",
        steps: "1. Fold index finger touching the root (mount) of the thumb.<br>2. Touch tips of middle and ring fingers to the thumb tip.<br>3. Keep little finger extended straight and relaxed.",
        benefits: "Stimulates the vagus nerve, lowers acute blood pressure spikes, regulates erratic heart rhythm, and halts panic attacks in 3–5 minutes.",
        courseId: "course_mudra_vigyan_stress"
      },
      gyan: {
        title: "Gyan & Chin Mudra (Gesture of Cosmic Consciousness & Focus)",
        sanskrit: "Jnana / Chin Hastamudra",
        elements: "🔥 Fire + 💨 Air (Consciousness)",
        img: "/images/mudra_gyan_chin.jpg",
        steps: "1. Join the tip of your index finger with the tip of your thumb.<br>2. Keep the other three fingers (middle, ring, little) relaxed and extended.<br>3. Rest palms facing upward on your knees.",
        benefits: "Stimulates the pituitary and pineal glands, dispels racing overthinking, enhances memory retention, and melts chronic workday burnout.",
        courseId: "course_mudra_vigyan_stress"
      },
      prana: {
        title: "Prana Mudra (Gesture of Vital Life Force & Anti-Fatigue)",
        sanskrit: "Prana Hastamudra",
        elements: "🔥 Fire + 🌿 Earth + 💧 Water",
        img: "/images/mudra_prana_vitality.jpg",
        steps: "1. Join tips of ring finger and little finger to the tip of your thumb.<br>2. Keep index and middle fingers pointing straight upwards.<br>3. Rest hands comfortably on knees.",
        benefits: "Activates Root Chakra (Muladhara), restores depleted Ojas, cures chronic fatigue, and builds an energetic shield against stress.",
        courseId: "course_mudra_vigyan_stress"
      },
      shunya: {
        title: "Shunya & Vayu Mudra (Gesture of Stillness & Insomnia Relief)",
        sanskrit: "Shunya / Vayu Hastamudra",
        elements: "🌌 Space + 💨 Air Neutralizer",
        img: "/images/mudra_shunya_vayu.jpg",
        steps: "1. Bend the middle finger flat against the base of the thumb.<br>2. Press thumb gently over the middle finger knuckle.<br>3. Keep remaining three fingers extended straight.",
        benefits: "Reduces spatial dizziness and restlessness, pacifies erratic Vata dosha, and activates deep restorative delta sleep.",
        courseId: "course_mudra_sleep_clarity"
      },
      hakini: {
        title: "Hakini Mudra (Gesture of Hemispheric Brain Balance & Memory)",
        sanskrit: "Hakini Hastamudra",
        elements: "🧠 All 5 Elements Interconnected",
        img: "/images/mudra_hakini_brain_sync.jpg",
        steps: "1. Bring both hands in front of the solar plexus or heart.<br>2. Press tips of all 5 right fingers against corresponding 5 left fingertips.<br>3. Form a sacred open dome cage with palms apart.",
        benefits: "Synchronizes left and right cerebral hemispheres, maximizes cognitive clarity, and banishes brain fog in 3 minutes.",
        courseId: "course_mudra_sleep_clarity"
      }
    };

    let activeKey = 'apana_vayu';
    let timerInterval = null;
    let breathTimeout = null;
    const totalSeconds = 300;
    let remainingSeconds = 300;
    let isTimerRunning = false;

    const setMudra = (key) => {
      activeKey = key;
      const m = mudras[key] || mudras.apana_vayu;
      
      if (cardImg) cardImg.src = m.img;
      if (elementBadge) elementBadge.textContent = m.elements;
      if (sanskritName) sanskritName.textContent = m.sanskrit;
      if (displayTitle) displayTitle.textContent = m.title;
      if (fingerSteps) fingerSteps.innerHTML = m.steps;
      if (benefitsDesc) benefitsDesc.textContent = m.benefits;

      symptomBtns.forEach(btn => {
        if (btn.getAttribute('data-mudra') === key) {
          btn.className = "mudra-sym-btn flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border border-gold bg-gold text-black transition-all cursor-pointer whitespace-nowrap shadow-md shadow-gold/20";
        } else {
          btn.className = "mudra-sym-btn flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold border border-white/10 bg-white/5 text-white/70 hover:border-gold/40 hover:text-white transition-all cursor-pointer whitespace-nowrap";
        }
      });
    };

    this.setMudraSymptom = setMudra;

    symptomBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const key = btn.getAttribute('data-mudra');
        setMudra(key);
      });
    });

    const updateTimerDisplay = () => {
      const mins = Math.floor(remainingSeconds / 60);
      const secs = remainingSeconds % 60;
      if (timerText) timerText.textContent = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
      if (timerCircle) {
        const pct = (remainingSeconds / totalSeconds) * 100;
        timerCircle.setAttribute('stroke-dasharray', `${pct}, 100`);
      }
    };

    const runBreathAnimation = () => {
      if (!isTimerRunning) return;
      let phase = 0;
      const loop = () => {
        if (!isTimerRunning) return;
        if (phase === 0) {
          if (breathPhase) breathPhase.textContent = "🌬️ Inhale Slowly (4s)";
          if (breathSub) breathSub.textContent = "Draw subtle prana through the nose";
          breathTimeout = setTimeout(() => { phase = 1; loop(); }, 4000);
        } else if (phase === 1) {
          if (breathPhase) breathPhase.textContent = "🧘 Hold with Mudra (7s)";
          if (breathSub) breathSub.textContent = "Channel prana into the heart and fingertips";
          breathTimeout = setTimeout(() => { phase = 2; loop(); }, 7000);
        } else {
          if (breathPhase) breathPhase.textContent = "🍃 Exhale Completely (8s)";
          if (breathSub) breathSub.textContent = "Release all mental tension and cortisol";
          breathTimeout = setTimeout(() => { phase = 0; loop(); }, 8000);
        }
      };
      loop();
    };

    const stopBreathAnimation = () => {
      if (breathTimeout) {
        clearTimeout(breathTimeout);
        breathTimeout = null;
      }
      if (breathPhase) breathPhase.textContent = "4-7-8 Breath Pace: Paused";
      if (breathSub) breathSub.textContent = "Inhale 4s • Hold 7s • Exhale 8s";
    };

    const startTimer = () => {
      if (isTimerRunning) {
        isTimerRunning = false;
        clearInterval(timerInterval);
        stopBreathAnimation();
        if (startIcon) startIcon.textContent = "▶";
        if (startLabel) startLabel.textContent = "Resume Practice";
      } else {
        isTimerRunning = true;
        if (startIcon) startIcon.textContent = "⏸";
        if (startLabel) startLabel.textContent = "Pause Timer";
        runBreathAnimation();
        timerInterval = setInterval(() => {
          if (remainingSeconds > 0) {
            remainingSeconds--;
            updateTimerDisplay();
          } else {
            clearInterval(timerInterval);
            isTimerRunning = false;
            stopBreathAnimation();
            if (startIcon) startIcon.textContent = "✓";
            if (startLabel) startLabel.textContent = "Completed (Namaste)";
            if (breathPhase) breathPhase.textContent = "✨ Session Completed (Shanti)";
          }
        }, 1000);
      }
    };

    const resetTimer = () => {
      clearInterval(timerInterval);
      stopBreathAnimation();
      isTimerRunning = false;
      remainingSeconds = totalSeconds;
      updateTimerDisplay();
      if (startIcon) startIcon.textContent = "▶";
      if (startLabel) startLabel.textContent = "Start Practice";
      if (breathPhase) breathPhase.textContent = "4-7-8 Breath Pace: Ready";
    };

    if (timerStartBtn) timerStartBtn.addEventListener('click', startTimer);
    if (timerResetBtn) timerResetBtn.addEventListener('click', resetTimer);

    if (openCourseBtn) {
      openCourseBtn.addEventListener('click', () => {
        const m = mudras[activeKey];
        if (m && m.courseId) {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          const allCourses = window.COURSES_DATA ? (window.COURSES_DATA.content || window.COURSES_DATA) : [];
          const found = Array.isArray(allCourses) ? allCourses.find(c => c.id === m.courseId) : null;
          if (found && window.appInstance) {
            window.appInstance.openReader(found);
          }
        }
      });
    }

    const openModal = () => {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      setMudra(activeKey);
    };

    const closeModal = () => {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
      if (isTimerRunning) {
        startTimer();
      }
    };

    if (openBtn) openBtn.addEventListener('click', openModal);
    if (mobileBtn) mobileBtn.addEventListener('click', openModal);
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
      });
    }
  }

  initRagaTherapy() {
    const modal = document.getElementById('raga-therapy-modal');
    const openBtn = document.getElementById('header-raga-btn');
    const closeBtn = document.getElementById('close-raga-modal-btn');
    const playBtn = document.getElementById('raga-play-toggle-btn');
    const playIcon = document.getElementById('raga-play-icon');
    const playText = document.getElementById('raga-play-text');
    const breathCircle = document.getElementById('pranayama-circle');
    const breathLabel = document.getElementById('pranayama-breath-label');

    const ragas = {
      bhairav: {
        title: "🌅 Raga Bhairav: Morning Awakening",
        effect: "Alpha Brainwaves • Mental Clarity • Focus",
        audio: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=meditation-flute-112197.mp3"
      },
      sarang: {
        title: "☀️ Raga Sarang: Midday Vitality",
        effect: "Energy Flow • Alertness • Productivity",
        audio: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=meditation-flute-112197.mp3"
      },
      yaman: {
        title: "🌆 Raga Yaman: Sunset Tranquility",
        effect: "Stress Release • Emotional Balance • Peace",
        audio: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=meditation-flute-112197.mp3"
      },
      darbari: {
        title: "🌙 Raga Darbari: Deep Delta Sleep",
        effect: "Soothing Flute • Deep Relaxation • Delta Sleep Waves",
        audio: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=meditation-flute-112197.mp3"
      }
    };

    let selectedRaga = 'bhairav';
    let isRagaPlaying = false;
    let breathInterval = null;

    const startBreathCycle = () => {
      stopBreathCycle();
      let phase = 0;

      const runPhase = () => {
        if (!breathCircle || !breathLabel) return;
        if (phase === 0) {
          breathLabel.textContent = "Inhale (4s)";
          breathCircle.style.transform = "scale(1.4)";
          breathCircle.style.opacity = "1";
          breathInterval = setTimeout(() => { phase = 1; runPhase(); }, 4000);
        } else if (phase === 1) {
          breathLabel.textContent = "Hold (7s)";
          breathCircle.style.transform = "scale(1.4)";
          breathCircle.style.opacity = "0.85";
          breathInterval = setTimeout(() => { phase = 2; runPhase(); }, 7000);
        } else {
          breathLabel.textContent = "Exhale (8s)";
          breathCircle.style.transform = "scale(0.9)";
          breathCircle.style.opacity = "0.5";
          breathInterval = setTimeout(() => { phase = 0; runPhase(); }, 8000);
        }
      };
      runPhase();
    };

    const stopBreathCycle = () => {
      if (breathInterval) {
        clearTimeout(breathInterval);
        breathInterval = null;
      }
    };

    const stopRagaAudio = () => {
      if (this.ragaAudio) {
        this.ragaAudio.pause();
        this.ragaAudio = null;
      }
      isRagaPlaying = false;
      if (playIcon) playIcon.textContent = "▶";
      if (playText) playText.textContent = "Play Therapy Audio";
    };

    const playRagaAudio = () => {
      const r = ragas[selectedRaga] || ragas.bhairav;
      this.ragaAudio = new Audio(r.audio);
      this.ragaAudio.loop = true;
      this.ragaAudio.volume = 0.35;
      this.ragaAudio.play().catch(() => {});
      isRagaPlaying = true;
      if (playIcon) playIcon.textContent = "⏸";
      if (playText) playText.textContent = "Pause Therapy Audio";
    };

    document.querySelectorAll('.raga-track-btn').forEach(btn => {
      btn.onclick = () => {
        document.querySelectorAll('.raga-track-btn').forEach(b => {
          b.className = "raga-track-btn p-3 rounded-2xl border border-white/10 bg-white/5 text-white/70 hover:border-gold/50 text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer";
        });
        btn.className = "raga-track-btn p-3 rounded-2xl border border-gold bg-gold/15 text-gold text-xs font-bold flex flex-col items-center gap-1 transition-all cursor-pointer";

        selectedRaga = btn.getAttribute('data-raga');
        const r = ragas[selectedRaga] || ragas.bhairav;

        const curTitle = document.getElementById('raga-current-title');
        const curEffect = document.getElementById('raga-current-effect');

        if (curTitle) curTitle.textContent = r.title;
        if (curEffect) curEffect.textContent = r.effect;

        if (isRagaPlaying) {
          stopRagaAudio();
          playRagaAudio();
        }
      };
    });

    if (openBtn && modal) {
      openBtn.onclick = (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        startBreathCycle();
      };
    }
    if (closeBtn && modal) {
      closeBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
        stopRagaAudio();
        stopBreathCycle();
      };
    }
    if (playBtn) {
      playBtn.onclick = () => {
        if (!isRagaPlaying) {
          playRagaAudio();
        } else {
          stopRagaAudio();
        }
      };
    }
  }

  // 5. Interactive Vedic Math Speed Calculator
  initVedicMathCalculator() {
    const modal = document.getElementById('vedic-math-modal');
    const openBtn = document.getElementById('try-vedic-math-btn');
    const closeBtn = document.getElementById('close-vedic-math-modal-btn');

    if (openBtn && modal) {
      openBtn.onclick = (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      };
    }

    if (closeBtn && modal) {
      closeBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      };
    }

    // Tabs switching
    const switchTab = (tabNum) => {
      [1, 2, 3].forEach(n => {
        const btn = document.getElementById('vmath-tab-' + n);
        const panel = document.getElementById('vmath-panel-' + n);
        if (btn && panel) {
          if (n === tabNum) {
            btn.className = "vmath-nav-tab flex-1 py-2 rounded-xl bg-gold text-black transition-all font-bold";
            panel.classList.remove('hidden');
          } else {
            btn.className = "vmath-nav-tab flex-1 py-2 rounded-xl text-white/60 hover:text-white transition-all";
            panel.classList.add('hidden');
          }
        }
      });
    };

    [1, 2, 3].forEach(n => {
      const btn = document.getElementById('vmath-tab-' + n);
      if (btn) btn.onclick = () => switchTab(n);
    });

    // Trick 1: Square of 5s
    const calcBtn1 = document.getElementById('vmath-calc-btn-1');
    if (calcBtn1) {
      calcBtn1.onclick = () => {
        const val = parseInt(document.getElementById('vmath-input-1')?.value || '65');
        const resEl = document.getElementById('vmath-result-1');
        if (isNaN(val) || val % 10 !== 5) {
          if (resEl) resEl.textContent = "Please enter a number ending in 5 (e.g. 25, 45, 85)!";
          return;
        }
        const front = Math.floor(val / 10);
        const frontProd = front * (front + 1);
        const ans = frontProd * 100 + 25;
        if (resEl) {
          resEl.innerHTML = '<strong>' + val + '²</strong> = (' + front + ' × ' + (front + 1) + ' = ' + frontProd + ') followed by 25 = <span class="text-gold font-bold text-base">' + ans + '</span> ⚡';
        }
      };
    }

    // Trick 2: Multiply by 11
    const calcBtn2 = document.getElementById('vmath-calc-btn-2');
    if (calcBtn2) {
      calcBtn2.onclick = () => {
        const val = parseInt(document.getElementById('vmath-input-2')?.value || '52');
        const resEl = document.getElementById('vmath-result-2');
        if (isNaN(val) || val < 10 || val > 99) {
          if (resEl) resEl.textContent = "Please enter a 2-digit number (10 to 99)!";
          return;
        }
        const d1 = Math.floor(val / 10);
        const d2 = val % 10;
        const sum = d1 + d2;
        const ans = val * 11;
        if (resEl) {
          resEl.innerHTML = '<strong>' + val + ' × 11</strong> = ' + d1 + ' (' + d1 + '+' + d2 + '=' + sum + ') ' + d2 + ' = <span class="text-gold font-bold text-base">' + ans + '</span> ⚡';
        }
      };
    }

    // Trick 3: Fast Base 100
    const calcBtn3 = document.getElementById('vmath-calc-btn-3');
    if (calcBtn3) {
      calcBtn3.onclick = () => {
        const n1 = parseInt(document.getElementById('vmath-input-3a')?.value || '94');
        const n2 = parseInt(document.getElementById('vmath-input-3b')?.value || '98');
        const resEl = document.getElementById('vmath-result-3');
        if (isNaN(n1) || isNaN(n2)) return;
        const ans = n1 * n2;
        if (resEl) {
          resEl.innerHTML = '<strong>' + n1 + ' × ' + n2 + '</strong> = <span class="text-gold font-bold text-base">' + ans + '</span> ⚡ (Calculated via Nikhilam Sutra)';
        }
      };
    }
  }

  // 6. Gurukula Kids Activity Kit & Printable Sample Sheet
  initGurukulaKits() {
    const printBtn = document.getElementById('open-print-sample-btn');
    if (printBtn) {
      printBtn.onclick = (e) => {
        e.preventDefault();
        const printWindow = window.open('', '_blank');
        if (!printWindow) {
          alert("Please allow popups to print the Gurukula Activity Sheet!");
          return;
        }

        printWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Gurukula Free Heritage Activity Sheet - Sanatana360</title>
            <style>
              body { font-family: 'Georgia', serif; padding: 40px; color: #111; max-width: 800px; margin: 0 auto; line-height: 1.6; }
              .header { text-align: center; border-bottom: 2px solid #d4af37; padding-bottom: 20px; margin-bottom: 30px; }
              .header h1 { margin: 0; color: #8b6508; font-size: 24px; }
              .header p { margin: 5px 0 0 0; font-size: 12px; color: #666; font-family: sans-serif; }
              .section { margin-bottom: 30px; border: 1px solid #e2e8f0; border-radius: 12px; padding: 20px; }
              .section-title { font-size: 16px; font-weight: bold; color: #8b6508; margin-top: 0; border-bottom: 1px solid #f1f5f9; padding-bottom: 8px; }
              .shloka-box { background: #fdfbf7; border: 1px dashed #d4af37; padding: 15px; border-radius: 8px; text-align: center; font-size: 14px; font-weight: bold; }
              .math-challenge { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; font-family: monospace; font-size: 14px; margin-top: 10px; }
              .math-item { border: 1px solid #cbd5e1; padding: 10px; border-radius: 6px; }
              .footer { text-align: center; margin-top: 40px; font-size: 11px; color: #888; border-top: 1px solid #eee; padding-top: 15px; }
              @media print { button { display: none; } }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>🕉️ GURUKULA BAL SANSKARA LEARNING KIT</h1>
              <p>Sanatana360 Heritage Education &bull; Screen-Free Daily Family Practice</p>
            </div>

            <div class="section">
              <h3 class="section-title">🪷 Part 1: Gayatri Shloka Chanting &amp; Memory Practice</h3>
              <div class="shloka-box">
                ॐ भूर्भुवः स्वः तत्सवितुर्वरेण्यं ।<br>
                भर्गो देवस्य धीमहि धियो यो नः प्रचोदयात् ॥
              </div>
              <p style="font-size: 12px; color: #444; margin-top: 10px;">
                <strong>Daily Practice:</strong> Recite 3 times every morning. Enhances focus, memory retention, and pronunciation.
              </p>
            </div>

            <div class="section">
              <h3 class="section-title">🧮 Part 2: Vedic Math 3-Second Mental Calculation</h3>
              <p style="font-size: 12px; color: #555;">Solve these 4 problems in your head using the <em>Ekadhikena Purvena</em> and <em>Antyayoreva</em> Sutras:</p>
              <div class="math-challenge">
                <div class="math-item">1) 25 × 25 = ______</div>
                <div class="math-item">2) 45 × 45 = ______</div>
                <div class="math-item">3) 34 × 11 = ______</div>
                <div class="math-item">4) 62 × 11 = ______</div>
              </div>
            </div>

            <div class="section">
              <h3 class="section-title">🎨 Part 3: Temple Architecture Knowledge Check</h3>
              <p style="font-size: 12px; color: #444;">
                1. Which medieval Indian empire built the iconic Stone Chariot in Hampi?<br>
                <strong>Answer:</strong> ____________________________________________<br><br>
                2. Which temple has 56 pillars that produce musical notes when gently tapped?<br>
                <strong>Answer:</strong> ____________________________________________
              </p>
            </div>

            <div class="footer">
              <p>© 2026 Sanatana360 &bull; Discover 200+ Documentaries, Bedtime Audiobooks &amp; Vedic Math at www.sanatana360.com</p>
            </div>

            <script>
              window.onload = function() { window.print(); };
            </script>
          </body>
          </html>
        `);
        printWindow.document.close();
      };
    }
  }

  // 7. Secret Mystery Vaults 60s Audio Clue Player
  initMysteryVault() {
    const clueBtns = document.querySelectorAll('.play-vault-clue-btn');
    if (!clueBtns.length) return;

    let activeAudioCtx = null;
    let activeChimeInterval = null;
    let activeBtn = null;
    let countdownTimer = null;

    const playMysticalSoundscape = (durationSec = 60, onFinish) => {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        activeAudioCtx = new AudioContext();
        if (activeAudioCtx.state === 'suspended') activeAudioCtx.resume();

        // Chimes chord: 528 Hz (Miracle Tone), 432 Hz, 639 Hz
        const chords = [528, 432, 639, 396, 741];
        let noteIdx = 0;

        const chime = () => {
          if (!activeAudioCtx) return;
          const freq = chords[noteIdx % chords.length];
          const now = activeAudioCtx.currentTime;

          const osc = activeAudioCtx.createOscillator();
          const gain = activeAudioCtx.createGain();
          const panner = activeAudioCtx.createStereoPanner ? activeAudioCtx.createStereoPanner() : null;

          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now);

          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.06, now + 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + 3.8);

          if (panner) {
            panner.pan.setValueAtTime((Math.random() * 2) - 1, now);
            osc.connect(panner);
            panner.connect(gain);
          } else {
            osc.connect(gain);
          }
          gain.connect(activeAudioCtx.destination);

          osc.start(now);
          osc.stop(now + 4.0);
          noteIdx++;
        };

        chime();
        activeChimeInterval = setInterval(chime, 1800);

        countdownTimer = setTimeout(() => {
          stopSoundscape();
          if (onFinish) onFinish();
        }, durationSec * 1000);
      } catch (err) {
        console.warn("Soundscape fallback:", err);
        if (onFinish) onFinish();
      }
    };

    const stopSoundscape = () => {
      if (activeChimeInterval) clearInterval(activeChimeInterval);
      if (countdownTimer) clearTimeout(countdownTimer);
      if (activeAudioCtx) {
        activeAudioCtx.close().catch(() => {});
        activeAudioCtx = null;
      }
      activeChimeInterval = null;
      countdownTimer = null;
    };

    clueBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if (activeBtn === btn) {
          // Toggle Pause
          stopSoundscape();
          btn.innerHTML = '<span>🔊</span> Listen 60s Clue';
          btn.classList.remove('bg-gold', 'text-black');
          activeBtn = null;
          return;
        }

        if (activeBtn) {
          activeBtn.innerHTML = '<span>🔊</span> Listen 60s Clue';
          activeBtn.classList.remove('bg-gold', 'text-black');
        }

        stopSoundscape();
        activeBtn = btn;
        btn.classList.add('bg-gold', 'text-black');

        let remaining = 60;
        btn.innerHTML = '<span class="animate-pulse">⏸</span> Playing Clue (' + remaining + 's)';

        const ticker = setInterval(() => {
          remaining--;
          if (remaining > 0 && activeBtn === btn) {
            btn.innerHTML = '<span class="animate-pulse">⏸</span> Playing Clue (' + remaining + 's)';
          } else {
            clearInterval(ticker);
          }
        }, 1000);

        playMysticalSoundscape(60, () => {
          clearInterval(ticker);
          btn.innerHTML = '<span>🔊</span> Listen 60s Clue';
          btn.classList.remove('bg-gold', 'text-black');
          activeBtn = null;
        });

        if (window.awardKarmaPoints) window.awardKarmaPoints(5, "Secret Clue Declassified");
      };
    });
  }

  // 8. Ask Rishi AI Consultation (Interactive Multi-Persona AI)
  initAskRishiAI() {
    const modal = document.getElementById('ask-rishi-modal');
    const openBtns = [
      document.getElementById('header-rishi-btn'),
      document.getElementById('mobile-rishi-btn'),
      document.getElementById('open-rishi-btn')
    ].filter(Boolean);
    const closeBtn = document.getElementById('close-rishi-modal-btn');
    const chatForm = document.getElementById('rishi-chat-form');
    const chatInput = document.getElementById('rishi-user-input');
    const chatHistory = document.getElementById('rishi-chat-history');
    const personaBtns = document.querySelectorAll('.rishi-persona-btn');
    const quotaBadge = document.getElementById('rishi-quota-badge');

    if (!modal) return;

    let selectedPersona = 'chanakya';
    let userQueriesCount = 0;

    const personaKnowledge = {
      chanakya: {
        name: "Acharya Chanakya",
        title: "Master of Statecraft, Economics & Tactical Strategy",
        avatar: "📜",
        greeting: "Pranam, seeker of strategy. Ask me on building unstoppable discipline, winning negotiations, managing wealth (Artha), or overcoming deceit.",
        responses: [
          "In the Arthashastra, I declare: 'Before you embark on any venture, ask yourself three questions: Why am I doing this? What might the results be? Will I be successful?' When you think deeply and find satisfactory answers, proceed fearlessly without looking back.",
          "A person should not be overly honest. Straight trees are chopped down first, and honest people are exploited first. Cultivate discreet wisdom and strategic patience.",
          "Wealth is the root of all Dharma and purpose. Conserve your energy, build alliances with individuals of virtue, and master your senses before attempting to conquer enemies.",
          "The biggest disease of the human mind is procrastination. What is to be done tomorrow, do today; what is to be done today, do this very moment."
        ]
      },
      patanjali: {
        name: "Maharishi Patanjali",
        title: "Master of Mind Control, Meditation & Yoga Sutras",
        avatar: "🧘",
        greeting: "Om. I am Patanjali. Ask me on quieting mental turbulence, overcoming anxiety, mastering breath (Pranayama), or cultivating razor-sharp focus.",
        responses: [
          "Yoga is 'Chitta Vritti Nirodha'—the conscious stilling of the fluctuations of the mind. When thoughts cease to agitate you, the observer abides in its true luminous nature.",
          "Practice becomes firmly grounded only when it is pursued with reverence, uninterruptedly, for a long period of time (Abhyasa and Vairagya). Detach from the outcome and focus wholly on the present breath.",
          "Undisturbed calmness of mind is attained by cultivating friendliness toward the happy, compassion for the unhappy, delight in the virtuous, and indifference toward the wicked.",
          "Your breath is the physical bridge to your subconscious mind. When breath is slow and rhythmic, the mind becomes tranquil and invincible."
        ]
      },
      charaka: {
        name: "Acharya Charaka",
        title: "Father of Ayurvedic Medicine, Vitality & Dinacharya",
        avatar: "🌿",
        greeting: "Aayushmaan Bhava! Ask me regarding balancing your Doshas (Vata, Pitta, Kapha), natural immunity (Ojas), seasonal diets, or deep restorative sleep.",
        responses: [
          "Food is your first medicine. Eating warm, freshly prepared seasonal meals aligned with your digestive fire (Agni) prevents ninety percent of modern metabolic diseases.",
          "A physician who fails to enter the body of a patient with the lamp of knowledge and compassion cannot treat disease. Maintain a balanced mind, for mental stress directly vitiates physical Ojas (vital immunity).",
          "Align your daily routine (Dinacharya) with the sun. Wake during Brahma Muhurta (pre-dawn), drink warm water, practice moderate movement, and retire to sleep before 10 PM to nourish the nervous system.",
          "Health is not merely the absence of disease, but a state of physiological balance, peaceful senses, and joyous consciousness (Prasanna Atma)."
        ]
      },
      krishna: {
        name: "Yogeshwara Sri Krishna",
        title: "Supreme Teacher of the Bhagavad Gita & Karma Yoga",
        avatar: "🪷",
        greeting: "Jai Sri Krishna. Ask me on resolving moral dilemmas, overcoming fear and attachment, discovering your Swadharma, or finding inner peace in the battlefield of life.",
        responses: [
          "Karmanye Vadhikaraste Ma Phaleshu Kadachana: You have a sacred right to perform your prescribed duty, but never to the fruits of action. Act with supreme excellence without being enslaved by greed or fear of failure.",
          "The mind is indeed restless and difficult to restrain, O Arjuna. But by sustained practice (Abhyasa) and non-attachment (Vairagya), it can be mastered completely.",
          "There is neither this world, nor the world beyond, nor happiness for the one who doubts. Cultivate unshakeable faith in your inner divinity and rise to fulfill your destiny.",
          "Whenever Dharma declines and righteousness is eclipsed, I manifest across every age to protect the good, transform negativity, and re-establish cosmic balance."
        ]
      }
    };

    const updatePersonaUI = (personaKey) => {
      selectedPersona = personaKey;
      personaBtns.forEach(b => {
        if (b.getAttribute('data-persona') === personaKey) {
          b.className = "rishi-persona-btn p-2 rounded-xl border border-gold bg-gold/20 text-gold text-xs font-bold flex flex-col items-center gap-1 transition-all shadow-md shadow-gold/15";
        } else {
          b.className = "rishi-persona-btn p-2 rounded-xl border border-white/10 bg-white/5 text-white/70 hover:border-gold/50 text-xs font-bold flex flex-col items-center gap-1 transition-all";
        }
      });

      const p = personaKnowledge[personaKey];
      if (chatHistory && p) {
        chatHistory.innerHTML = `
          <div class="flex gap-3 items-start p-3 rounded-xl bg-gold/10 border border-gold/25">
            <span class="text-2xl">${p.avatar}</span>
            <div class="space-y-1">
              <span class="text-xs font-bold text-gold font-serif block">${p.name} (${p.title})</span>
              <p class="text-xs text-white/85 leading-relaxed font-sans">${p.greeting}</p>
            </div>
          </div>
        `;
      }
    };

    personaBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        const p = btn.getAttribute('data-persona');
        if (p && personaKnowledge[p]) updatePersonaUI(p);
      };
    });

    openBtns.forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        updatePersonaUI(selectedPersona);
        if (chatInput) setTimeout(() => chatInput.focus(), 100);
      };
    });

    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      };
    }

    if (chatForm && chatInput && chatHistory) {
      chatForm.onsubmit = (e) => {
        e.preventDefault();
        const query = chatInput.value.trim();
        if (!query) return;

        // Render User Message
        const userMsgDiv = document.createElement('div');
        userMsgDiv.className = "flex justify-end";
        userMsgDiv.innerHTML = `
          <div class="bg-white/10 border border-white/20 rounded-2xl px-4 py-2.5 max-w-[85%] text-xs text-white font-sans">
            ${query}
          </div>
        `;
        chatHistory.appendChild(userMsgDiv);
        chatInput.value = '';
        chatHistory.scrollTop = chatHistory.scrollHeight;

        // Render Thinking State
        const thinkingDiv = document.createElement('div');
        thinkingDiv.className = "flex gap-2 items-center text-xs text-gold/70 italic p-2";
        thinkingDiv.innerHTML = `<span>🕉️</span> <span>${personaKnowledge[selectedPersona].name} is meditating on your inquiry...</span>`;
        chatHistory.appendChild(thinkingDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        setTimeout(() => {
          thinkingDiv.remove();
          const p = personaKnowledge[selectedPersona];
          const pool = p.responses;
          const answer = pool[userQueriesCount % pool.length];
          userQueriesCount++;

          const rishiMsgDiv = document.createElement('div');
          rishiMsgDiv.className = "flex gap-3 items-start p-3 rounded-xl bg-gold/15 border border-gold/30";
          rishiMsgDiv.innerHTML = `
            <span class="text-2xl flex-shrink-0">${p.avatar}</span>
            <div class="space-y-1">
              <span class="text-xs font-bold text-gold font-serif block">${p.name}</span>
              <p class="text-xs text-white/90 leading-relaxed font-serif">${answer}</p>
            </div>
          `;
          chatHistory.appendChild(rishiMsgDiv);
          chatHistory.scrollTop = chatHistory.scrollHeight;

          if (quotaBadge) {
            quotaBadge.textContent = "Query Answered ✓ (Unlimited Pass Active)";
          }
          if (window.awardKarmaPoints) window.awardKarmaPoints(10, "Rishi Wisdom Inquiry");
        }, 800);
      };
    }
  }

  // 9. Vedic Heritage Archetype Discovery (Interactive 3-Question Royal Quiz Engine)
  initArchetypeCertificate() {
    const modal = document.getElementById('archetype-modal');
    const openBtn = document.getElementById('header-archetype-btn');
    const mobileBtn = document.getElementById('mobile-archetype-btn');
    const closeBtn = document.getElementById('close-archetype-modal-btn');
    const quizContainer = document.getElementById('archetype-quiz-container');
    const questionCard = document.getElementById('archetype-question-card');
    const resultContainer = document.getElementById('archetype-result-container');
    const certUserName = document.getElementById('cert-user-name');
    const certBadge = document.getElementById('cert-archetype-badge');
    const certDesc = document.getElementById('cert-archetype-desc');
    const retakeBtn = document.getElementById('retake-archetype-btn');
    const shareBtn = document.getElementById('whatsapp-share-cert-btn');

    if (!modal) return;

    const quizData = [
      {
        q: "1. When you explore ancient India, what captivates your spirit most?",
        options: [
          { text: "Architectural engineering, sacred geometry, and musical pillars", archetype: "sage" },
          { text: "Kshatriya valor, righteous kings, and defensive martial arts", archetype: "guardian" },
          { text: "Upanishadic consciousness, meditation, and cosmic Yuga cycles", archetype: "philosopher" },
          { text: "Devotional temple arts, saintly miracles, and universal love", archetype: "visionary" }
        ]
      },
      {
        q: "2. When facing an ethical dilemma, which compass guides your decisions?",
        options: [
          { text: "Objective logic, strategic mastery, and structural clarity", archetype: "sage" },
          { text: "Fearless adherence to righteous duty (Dharma) at any cost", archetype: "guardian" },
          { text: "Stillness, detached witnessing, and inner self-inquiry", archetype: "philosopher" },
          { text: "Boundless empathy, seva (service), and surrender to God", archetype: "visionary" }
        ]
      },
      {
        q: "3. Which timeless Sanskrit aphorism resonates deepest with your soul?",
        options: [
          { text: "'Shilpa Vidya & Vastu Shastra' — The science of cosmic architecture", archetype: "sage" },
          { text: "'Yato Dharmastato Jayah' — Where there is Dharma, there is victory", archetype: "guardian" },
          { text: "'Aham Brahmasmi' — I am the infinite witness consciousness", archetype: "philosopher" },
          { text: "'Vasudhaiva Kutumbakam' — The entire world is one loving family", archetype: "visionary" }
        ]
      }
    ];

    const archetypeResults = {
      sage: {
        badge: "🏛️ The Architectural Sage",
        desc: "Possessing deep discernment for timeless structural beauty, temple acoustics, and civilizational preservation."
      },
      guardian: {
        badge: "⚔️ The Dharmic Guardian",
        desc: "Guided by unshakeable moral courage, tactical leadership, and an indomitable will to defend civilizational truth."
      },
      philosopher: {
        badge: "🧘 The Mystic Philosopher",
        desc: "Endowed with high intellectual curiosity, mastery over mental fluctuations, and profound intuition of cosmic Yugas."
      },
      visionary: {
        badge: "🪷 The Devotional Visionary",
        desc: "Radiating pure empathy, artistic grace, and an unwavering devotion that transforms life's struggles into divine nectar."
      }
    };

    let currentQ = 0;
    let scores = { sage: 0, guardian: 0, philosopher: 0, visionary: 0 };

    const renderQuestion = () => {
      if (!questionCard) return;
      if (currentQ >= quizData.length) {
        // Compute Winner
        let winningKey = 'sage';
        let maxScore = -1;
        for (const k in scores) {
          if (scores[k] > maxScore) {
            maxScore = scores[k];
            winningKey = k;
          }
        }

        const res = archetypeResults[winningKey] || archetypeResults.sage;
        const userName = localStorage.getItem('hs_user_name') || localStorage.getItem('hs_profile') || 'Scholar of Bharat';

        if (certUserName) certUserName.textContent = userName;
        if (certBadge) certBadge.textContent = res.badge;
        if (certDesc) certDesc.textContent = res.desc;

        if (quizContainer) quizContainer.classList.add('hidden');
        if (resultContainer) resultContainer.classList.remove('hidden');

        if (window.awardKarmaPoints) window.awardKarmaPoints(25, "Archetype Discovery Certified");
        return;
      }

      const qObj = quizData[currentQ];
      questionCard.innerHTML = `
        <div class="space-y-1">
          <div class="flex justify-between text-[10px] font-mono text-gold font-bold uppercase tracking-wider">
            <span>Question ${currentQ + 1} of ${quizData.length}</span>
            <span>Vedic Telemetry</span>
          </div>
          <h4 class="text-sm sm:text-base font-bold text-white font-serif">${qObj.q}</h4>
        </div>
        <div class="space-y-2.5 pt-2">
          ${qObj.options.map((opt, idx) => `
            <button class="archetype-opt-btn w-full text-left p-3.5 rounded-xl border border-white/10 bg-white/5 hover:border-gold hover:bg-gold/15 text-xs text-white/90 font-medium transition-all flex items-center justify-between group cursor-pointer" data-arch="${opt.archetype}">
              <span>${opt.text}</span>
              <span class="text-gold opacity-0 group-hover:opacity-100 transition-opacity font-bold">➔</span>
            </button>
          `).join('')}
        </div>
      `;

      questionCard.querySelectorAll('.archetype-opt-btn').forEach(btn => {
        btn.onclick = () => {
          const arch = btn.getAttribute('data-arch');
          if (arch && scores[arch] !== undefined) scores[arch]++;
          currentQ++;
          renderQuestion();
        };
      });
    };

    const openQuiz = (e) => {
      if (e) e.preventDefault();
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      currentQ = 0;
      scores = { sage: 0, guardian: 0, philosopher: 0, visionary: 0 };
      if (quizContainer) quizContainer.classList.remove('hidden');
      if (resultContainer) resultContainer.classList.add('hidden');
      renderQuestion();
    };

    if (openBtn) openBtn.onclick = openQuiz;
    if (mobileBtn) mobileBtn.onclick = openQuiz;

    if (closeBtn) {
      closeBtn.onclick = () => {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      };
    }

    if (retakeBtn) retakeBtn.onclick = openQuiz;

    if (shareBtn) {
      shareBtn.onclick = () => {
        const title = certBadge ? certBadge.textContent : 'Vedic Archetype';
        const text = encodeURIComponent("👑 I just completed the Vedic Heritage Archetype Discovery on Sanatana360 and was certified as: " + title + "! Discover your ancestral mindset: https://www.sanatana360.com");
        window.open('https://api.whatsapp.com/send?text=' + text, '_blank');
      };
    }
  }

  // 10. Interactive Temple & Geo-Spatial Map Explorer
  initMapExplorer() {
    const filterBtns = document.querySelectorAll('.region-filter-btn');
    const mapPins = document.querySelectorAll('.map-pin');
    const radarStatus = document.getElementById('map-radar-status');
    const detailPanel = document.getElementById('map-detail-panel');
    if (!mapPins.length) return;

    const siteData = {
      taj: {
        name: "Taj Mahal & Agra Fort",
        region: "North",
        era: "1632 CE • Yamuna Riverbank",
        img: "/images/hampi.jpg",
        desc: "Masterpiece of symmetrical marble engineering, inlaid pietra dura lapis lazuli, and complex hydraulic waterworks along the sacred Yamuna."
      },
      kedarnath: {
        name: "Kedarnath Jyotirlinga",
        region: "North",
        era: "8th Century CE • 3,583m Himalayas",
        img: "/images/kedarnath.jpg",
        desc: "High-altitude architectural miracle built of massive interlocking stone slabs that survived a 400-year glacial Ice Age and recent catastrophic floods."
      },
      varanasi: {
        name: "Kashi Vishwanath & Ganga Ghats",
        region: "North",
        era: "Ancient Continuous • 5,000+ Years",
        img: "/images/varanasi.jpg",
        desc: "The spiritual heart of Sanatana Dharma. 84 sacred stone ghats, Jyotirlinga sanctum, and eternal solar cosmic alignment."
      },
      hampi: {
        name: "Vijayanagara & Vitthala Temple",
        region: "South",
        era: "1336–1565 CE • Tungabhadra Valley",
        img: "/images/hampi.jpg",
        desc: "World's second-largest medieval city featuring the iconic Stone Chariot and 56 musical acoustic pillars that emit Sa-Re-Ga-Ma notes when struck."
      },
      meenakshi: {
        name: "Madurai Meenakshi Sundareswarar",
        region: "South",
        era: "6th Century BCE / 16th Century CE",
        img: "/images/meenakshi.jpg",
        desc: "Dravidian masterwork featuring 14 soaring Gopurams containing 33,000 sculpted celestial deities in polychrome stone."
      },
      brihad: {
        name: "Brihadeeswarar Temple (Thanjavur)",
        region: "South",
        era: "1010 CE • Chola Empire",
        img: "/images/brihadisvara.jpg",
        desc: "Granite architectural marvel topped with an 80-tonne monolithic stone dome, built entirely without binding cement."
      },
      konark: {
        name: "Konark Sun Temple",
        region: "East",
        era: "1250 CE • Eastern Ganga Dynasty",
        img: "/images/konark_sun.jpg",
        desc: "Massive 24-wheeled colossal stone chariot dedicated to Surya Bhagavan, functioning as a high-precision solar sundial."
      },
      nalanda: {
        name: "Nalanda Mahavihara Ruins",
        region: "East",
        era: "5th Century CE • Ancient University",
        img: "/images/nalanda.jpg",
        desc: "Ancient world's greatest residential university hosting 10,000 scholars and 2,000 professors with a 9-million manuscript library."
      },
      kamakhya: {
        name: "Maa Kamakhya Temple",
        region: "East",
        era: "8th Century CE • Nilachal Hills",
        img: "/images/kamakhya.jpg",
        desc: "One of the 51 sacred Shakti Peethas celebrated for profound Tantric metaphysics and subterranean natural spring shrine."
      },
      ajanta: {
        name: "Ajanta & Ellora Rock Caves",
        region: "West",
        era: "2nd Century BCE – 10th Century CE",
        img: "/images/ajanta.jpg",
        desc: "Monolithic Kailasa Temple carved top-down from a single solid basalt mountain cliff, removing 200,000 tonnes of rock."
      },
      jaisalmer: {
        name: "Jaisalmer Golden Fort",
        region: "West",
        era: "1156 CE • Thar Desert",
        img: "/images/jaisalmer.jpg",
        desc: "The world's only living golden sandstone fort, glowing amber in desert sunlight with ancient water harvesting reservoirs."
      },
      dwarka: {
        name: "Dwarkadhish & Submerged Dwarka",
        region: "West",
        era: "Ancient Marine Archaeology • Arabian Sea",
        img: "/images/dwarka.jpg",
        desc: "The legendary maritime kingdom of Lord Krishna, with underwater marine archaeological structures dating thousands of years."
      },
      khajuraho: {
        name: "Khajuraho Monument Group",
        region: "Central",
        era: "950–1050 CE • Chandela Dynasty",
        img: "/images/khajuraho.jpg",
        desc: "UNESCO World Heritage pinnacle of Nagara temple architecture, celebrating Dharma, Artha, Kama, and Moksha."
      }
    };

    const selectSite = (siteKey) => {
      const site = siteData[siteKey] || siteData.hampi;
      if (radarStatus) {
        radarStatus.textContent = '📡 LOCKED: ' + site.name.toUpperCase();
      }

      if (detailPanel) {
        detailPanel.innerHTML = `
          <div class="h-full flex flex-col justify-between space-y-4">
            <div class="space-y-3">
              <div class="h-44 w-full rounded-2xl overflow-hidden relative border border-white/10">
                <img src="${site.img}" class="w-full h-full object-cover" alt="${site.name}">
                <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
                <span class="absolute bottom-2.5 left-3 text-[9px] font-mono font-bold text-gold bg-black/70 px-2 py-0.5 rounded border border-gold/30 uppercase">
                  ${site.region} Region • ${site.era}
                </span>
              </div>
              <h3 class="text-xl font-bold font-serif text-white">${site.name}</h3>
              <p class="text-xs text-white/70 leading-relaxed font-sans">${site.desc}</p>
            </div>
            <div class="pt-3 border-t border-white/10 flex gap-2.5">
              <a href="#library" class="flex-1 py-2.5 bg-gold text-black hover:bg-gold/90 font-extrabold text-xs uppercase tracking-wider rounded-xl transition-all flex items-center justify-center gap-1.5 shadow-md">
                <span>▶ Watch Saga</span>
              </a>
              <a href="#divya-darshana" class="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase rounded-xl transition-all flex items-center justify-center gap-1">
                <span>🛕 Darshana</span>
              </a>
            </div>
          </div>
        `;
      }
    };

    // Bind map pin clicks
    mapPins.forEach(pin => {
      pin.addEventListener('click', (e) => {
        e.preventDefault();
        const siteKey = pin.getAttribute('data-site');
        if (siteKey) selectSite(siteKey);
      });
    });

    // Bind region filter buttons
    filterBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const reg = btn.getAttribute('data-region');

        filterBtns.forEach(b => {
          b.className = "region-filter-btn px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-white/10 hover:border-gold/30 text-white/70 cursor-pointer transition-all";
        });
        btn.className = "region-filter-btn px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase border border-gold bg-gold text-black shadow-lg cursor-pointer transition-all";

        mapPins.forEach(pin => {
          const pinReg = pin.getAttribute('data-region');
          if (reg === 'all' || pinReg === reg) {
            pin.style.display = 'block';
          } else {
            pin.style.display = 'none';
          }
        });
      });
    });

    // Default select Hampi
    selectSite('hampi');
  }

  // 11. Progressive Web App (PWA) Homescreen Install Engine
  initPWA() {
    let deferredPrompt = null;
    const installBtns = [
      document.getElementById('header-install-app-btn'),
      document.getElementById('mobile-install-app-btn')
    ].filter(Boolean);

    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      installBtns.forEach(b => {
        b.classList.remove('hidden');
        b.classList.add('inline-flex');
      });
    });

    installBtns.forEach(btn => {
      btn.addEventListener('click', async (e) => {
        e.preventDefault();
        if (deferredPrompt) {
          deferredPrompt.prompt();
          const { outcome } = await deferredPrompt.userChoice;
          if (outcome === 'accepted') {
            console.log('User installed Sanatana360 PWA app');
          }
          deferredPrompt = null;
        } else {
          // Show friendly mobile installation tooltip toast
          const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
          const msg = isIOS 
            ? "📲 Install on iOS: Tap 'Share' button in Safari, then select 'Add to Home Screen'."
            : "📲 Install Sanatana360: Tap the 3-dots menu in Chrome and select 'Install app' or 'Add to Home screen'.";
          
          const toast = document.getElementById('account-toast-msg') || document.createElement('div');
          toast.textContent = msg;
          toast.className = "fixed top-20 left-1/2 -translate-x-1/2 z-[100] px-4 py-3 rounded-2xl bg-[#0e1017] border border-gold text-white text-xs font-bold shadow-2xl transition-opacity duration-300";
          document.body.appendChild(toast);
          setTimeout(() => toast.remove(), 5000);
        }
      });
    });

    // Register Service Worker
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js').then(reg => {
          console.log('Sanatana360 ServiceWorker registered:', reg.scope);
        }).catch(err => {
          console.log('ServiceWorker registration skipped:', err);
        });
      });
    }
  }

    // 12. Real-Time Live Social Proof Ticker (Viral Conversions Engine)
  initSocialProofTicker() {
    const ticker = document.getElementById('live-social-proof');
    const avatarEl = document.getElementById('social-proof-avatar');
    const textEl = document.getElementById('social-proof-text');
    const timeEl = document.getElementById('social-proof-time');
    if (!ticker || !textEl) return;

    const events = [
      { avatar: "⚡", user: "Rajesh S.", city: "Bengaluru", action: "unlocked the ₹399 Heritage Family Pass", time: "2m ago" },
      { avatar: "📖", user: "Ananya M.", city: "Mumbai", action: "started reading 'The 14 Lokas & Time Dilation'", time: "4m ago" },
      { avatar: "🕉️", user: "Vikram R.", city: "Delhi NCR", action: "completed Shiva Tandava Saga", time: "7m ago" },
      { avatar: "👑", user: "Kavita D.", city: "Pune", action: "earned 'Dharmic Guardian' Archetype Certificate", time: "9m ago" },
      { avatar: "🎁", user: "Siddharth K.", city: "Hyderabad", action: "claimed ₹50 Discount Voucher", time: "11m ago" },
      { avatar: "🛕", user: "Meenakshi N.", city: "Chennai", action: "performed Virtual Aarti at Kashi Vishwanath", time: "14m ago" },
      { avatar: "🧒", user: "Aarav (Grade 5)", city: "Ahmedabad", action: "scored 100% in Vedic Mental Math Challenge", time: "16m ago" }
    ];

    let currentEventIdx = 0;

    const showTicker = () => {
      const ev = events[currentEventIdx];
      if (avatarEl) avatarEl.textContent = ev.avatar;
      if (textEl) {
        textEl.innerHTML = '<strong>' + ev.user + '</strong> from ' + ev.city + ' ' + ev.action;
      }
      if (timeEl) timeEl.textContent = ev.time;

      ticker.classList.remove('hidden');
      setTimeout(() => {
        ticker.classList.remove('translate-y-12', 'opacity-0');
      }, 50);

      setTimeout(() => {
        ticker.classList.add('translate-y-12', 'opacity-0');
        setTimeout(() => {
          ticker.classList.add('hidden');
        }, 500);
      }, 6000);

      currentEventIdx = (currentEventIdx + 1) % events.length;
    };

    setTimeout(() => {
      showTicker();
      setInterval(showTicker, 18000);
    }, 4000);
  }

  // 13. Dynamic SEO & Real-Time OpenGraph / Social Metadata Engine
  initDynamicSEO() {
    const metaMap = {
      '#library': { title: "Streaming Library & Sagas | Sanatana360", desc: "Watch 200+ 4K docu-series on ancient Indian temple science, kings, astronomy, and Vedic sagas." },
      '#granthalaya-library': { title: "Grand Digital Granthalaya (16 Epics) | Sanatana360", desc: "Read 150+ page illustrated sacred manuscripts: Asura battles, 14 Lokas time dilation, Advaita miracles, and Panchatantra." },
      '#divya-darshana': { title: "Divya Darshana: Virtual Temple Aarti & Panchang | Sanatana360", desc: "Experience 360-degree virtual darshana and daily Hindu panchang for 108 consecrated temples." },
      '#explorer': { title: "Interactive Heritage Map Explorer | Sanatana360", desc: "Explore ancient architectural sites across India on an interactive geo-spatial historical map." },
      '#play-zone': { title: "Vedic Math & Heritage Trivia Play Zone | Sanatana360", desc: "Interactive 3-second mental math games, Ramayana trivia, and cultural knowledge challenges." },
      '#mystery-vault': { title: "Ancient Mystery Vaults & Lost Knowledge | Sanatana360", desc: "Decipher mysterious temple vaults, subterranean tunnels, and unsolved archaeological secrets." }
    };

    const updateMeta = (title, desc) => {
      if (title) document.title = title;
      if (desc) {
        const descMeta = document.querySelector('meta[name="description"]');
        if (descMeta) descMeta.setAttribute('content', desc);
        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) ogDesc.setAttribute('content', desc);
      }
    };

    window.addEventListener('hashchange', () => {
      const h = window.location.hash;
      if (metaMap[h]) {
        updateMeta(metaMap[h].title, metaMap[h].desc);
      }
    });

    if (window.location.hash && metaMap[window.location.hash]) {
      updateMeta(metaMap[window.location.hash].title, metaMap[window.location.hash].desc);
    }
  }

  // ─────────────────────────────────────────────────────────────
  // ── GRAND DIGITAL GRANTHALAYA (16 Epic Books Slider & Reader) ─
  // ─────────────────────────────────────────────────────────────

  initGrandGranthalaya() {
    const sliderRow = document.getElementById('granthalaya-slider-row');
    const prevBtn = document.getElementById('granth-slider-prev-btn');
    const nextBtn = document.getElementById('granth-slider-next-btn');
    const modal = document.getElementById('granth-reader-modal');
    const closeBtn = document.getElementById('close-granth-reader-btn');
    if (!sliderRow) return;

    const self = this;
    this.isSubscribed = (typeof DatabaseService !== 'undefined' && DatabaseService.isSubscribed()) || !!this.isSubscribed;

    const granths = [
  {
    "id": "granth_mahishasura",
    "cat": "asuras",
    "catLabel": "👹 DEVILS & ASURAS",
    "title": "The Blood-Moon Boons of Mahishasura & Durga's 9 Nights",
    "pages": 180,
    "chaptersCount": 6,
    "emoji": "👹",
    "isPremium": false,
    "coverImg": "/images/mahishasura_battle.jpg",
    "desc": "The shape-shifting buffalo Asura who extracted the boon of invincibility against all men and Devas, and the cosmic emergence of Goddess Durga.",
    "videoUrl": "https://www.youtube.com/embed/05P75OPzies",
    "chapters": [
      {
        "title": "Chapter 1: The Ash-Vow of Rambha & Mahisha's Birth",
        "text": "In the subterranean depths of Rasatala, the Asura king Rambha performed thousand-year austerities amidst blazing fires. From the divine buffalo Mahishi was born Mahishasura—destined to shake the foundations of Mount Meru. He possessed the terrifying occult mastery of Trikala Maya, allowing him to shift between monstrous beast, warrior king, and illusory smoke at will."
      },
      {
        "title": "Chapter 2: The Boon of Brahma & The Fall of Amaravati",
        "text": "Standing upon one toe atop the Mandara cliffs, Mahishasura demanded the supreme boon of immortality from Lord Brahma. 'Let no Deva, Yaksha, Gandharva, Naga, or man born of womb be capable of slaying me,' he roared. Armed with this cosmological loophole, his demon armies overran Indraloka, banishing the Devas into exile across mortal forests."
      },
      {
        "title": "Chapter 3: The Gathering of Divine Tejas (Cosmic Fusion)",
        "text": "From the united fury of Brahma, Vishnu, and Shiva erupted a blazing mountain of light. This supreme cosmic energy solidified into the ten-armed Mother of the Universe—Devi Durga. Shiva presented His celestial Trishula; Vishnu bestowed the Sudarshana Chakra; Varuna gifted the Conch of Oceans; and Himavan presented the fierce Golden Lion mount."
      },
      {
        "title": "Chapter 4: The Nine Nights of Apocalyptic War",
        "text": "For nine cosmic nights, Mahishasura unleashed his demonic generals—Chikshura, Chamara, and Udagra. Rivers of celestial weapons clashed as Devi severed millions of demonic illusions. When Mahishasura transformed into a wild lion, she slashed him; when he turned into an elephant, she cut off his trunk; until at last, pinned beneath Her lotus foot, the Trident pierced his chest, liberating the cosmos."
      },
      {
        "title": "Chapter 5: The Secret Metaphysics of Mahishasura Mardini",
        "text": "In the Markandeya Purana, Mahishasura represents 'Ahamkara'—the rigid ego that assumes false permanence. The buffalo signifies tamasic ignorance and stubborn inertia. Devi Durga represents 'Chiti' (pure dynamic cosmic consciousness). The slaying is not merely a mythological victory, but the spiritual dissolution of ignorance through the ten weapons of spiritual discipline."
      },
      {
        "title": "Chapter 6: Navaratri & Living Devotional Rituals",
        "text": "For thousands of years, across every corner of Bharat, the victory of Devi is celebrated through the nine nights of Navaratri. From the Chandi Patha recitation in Bengal to the Garba circular cosmos dance of Gujarat and the royal Mysore Dasara procession of Karnataka, this sacred chronicle remains the beating heart of Indian spiritual resilience."
      }
    ]
  },
  {
    "id": "granth_ravana_tantra",
    "cat": "asuras",
    "catLabel": "👹 DEVILS & ASURAS",
    "title": "The Tantric Empire of Ravana & Kumbhakarna's Slumber",
    "pages": 210,
    "chaptersCount": 6,
    "emoji": "⚔️",
    "isPremium": true,
    "coverImg": "/images/ravana_lanka.jpg",
    "desc": "The 10 heads of unmatched astrological and musical mastery, mystical Pushpaka Vimana aviation, and the tragic 6-month cosmic curse of Kumbhakarna.",
    "videoUrl": "https://www.youtube.com/embed/otVAudER9dU",
    "chapters": [
      {
        "title": "Chapter 1: The Ten Heads of Sangeeta & Astrology",
        "text": "Ravana was no ordinary tyrant; he was the master of the 4 Vedas, 6 Vedangas, and the supreme master of the Rudra Veena. Born of Sage Vishrava and Asura princess Kaikesi, he performed immense penance to Brahma, cutting off nine of his heads as sacrificial offerings. Each head represented profound command over a branch of knowledge, intellect, and occult statecraft."
      },
      {
        "title": "Chapter 2: Shiva Tandava Stotram at Mount Kailash",
        "text": "Intoxicated by his invincible power, Ravana attempted to uproot Mount Kailash, the sacred abode of Shiva. As the mountain shook, Lord Mahadeva pressed down His big toe, trapping Ravana beneath the immense granite massif. In agonizing ecstasy, Ravana tore the sinews from his arm to string his veena and sang the awe-inspiring 14 verses of the Shiva Tandava Stotram, winning the divine sword Chandrahas."
      },
      {
        "title": "Chapter 3: The Sleeping Giant of Lanka",
        "text": "Kumbhakarna, born with mountain-shaking strength, intended to ask Lord Brahma for 'Nirdevatvam' (destruction of Devas). But Goddess Saraswati sat upon his tongue, turning his prayer into 'Nidravatvam' (endless slumber). For six months he slept in subterranean gold vaults, awoken only by marching elephants and blaring trumpet horns when war arrived."
      },
      {
        "title": "Chapter 4: Pushpaka Vimana & The Architecture of Lanka",
        "text": "Designed by the celestial architect Vishwakarma and expanded under Maya Danava, Lanka was a city of pure gold surrounded by triple moats and magnetic gates. The Pushpaka Vimana, an aerodynamic celestial craft powered by mercury vortex and mantric resonance, could travel at the speed of thought, responding directly to the pilot's psychic intent."
      },
      {
        "title": "Chapter 5: Ravana Samhita: Lost Ayurvedic & Astrological Treatises",
        "text": "Beyond war, Ravana authored seminal occult treatises: the Ravana Samhita on predictive astrology, Arka Prakasha on medicinal alchemy, and Nadi Pariksha on pulse diagnostics. His scientific understanding of planetary alignments and botanical extracts influenced medieval Indian medicine and esoteric tantra."
      },
      {
        "title": "Chapter 6: The Fall of Lanka & The Final Liberation",
        "text": "Despite his unmatched brilliance, Ravana's unbridled desire and defiance of Dharma led to his doom. In the final apocalyptic duel on the plains of Lanka, Lord Rama released the Brahmastra weapon, piercing Ravana's navel where the nectar of immortality was stored. As he lay dying, Rama sent Lakshmana to sit at Ravana's feet to learn the ultimate principles of statecraft and kingship."
      }
    ]
  },
  {
    "id": "granth_bhasmasura",
    "cat": "asuras",
    "catLabel": "👹 DEVILS & ASURAS",
    "title": "Bhasmasura & The Illusion Dance of Mohini",
    "pages": 155,
    "chaptersCount": 5,
    "emoji": "🔥",
    "isPremium": true,
    "coverImg": "/images/bhasmasura_mohini.jpg",
    "desc": "The deadly boon that turned anyone touched into ashes, and the divine cosmic dance that saved the Universe.",
    "videoUrl": "https://www.youtube.com/embed/XEQFAcbMkWI",
    "chapters": [
      {
        "title": "Chapter 1: The Touch of Fire Boon",
        "text": "Bhasmasura performed severe tapas until Lord Shiva granted him his wish: 'Whosoever's head I place my right hand upon shall instantly be reduced to a heap of ashes.' Blinded by supreme arrogance, Bhasmasura immediately attempted to test the boon on Shiva Himself, forcing the Lord of Yoga into cosmic retreat."
      },
      {
        "title": "Chapter 2: The Flight of Mahadeva & The Cry for Dharma",
        "text": "Pursued across mountains and celestial realms by the demon whose touch was instant destruction, Shiva entered deep meditative stillness in the dense groves of the Sahyadri mountains. To protect the cosmic fabric and uphold the inviolability of boons without violating universal law, Lord Vishnu stepped forth to manifest divine illusion (Maya)."
      },
      {
        "title": "Chapter 3: The Manifestation of Mohini",
        "text": "To protect the cosmic order, Lord Vishnu manifested as Mohini—the supreme enchantress of divine grace. Fascinated by her beauty, Bhasmasura agreed to match her step-by-step in the intricate Natya dance. Stunned by her celestial grace, Bhasmasura forgot his murderous quest, willing to surrender his pride to win her approval."
      },
      {
        "title": "Chapter 4: The Cosmic Dance of Mirroring",
        "text": "Mohini initiated the intricate Karanas of the Natya Shastra, weaving rhythms of grace and symmetry. Step by step, posture by posture, Bhasmasura mirrored every mudra. When Mohini raised her hand and placed it upon her own crown in the delicate 'Katyavalambita' pose, Bhasmasura placed his own right hand upon his head, instantly reducing his own physical body to a heap of glowing ash."
      },
      {
        "title": "Chapter 5: Metaphysical Meaning: The Fire of Uncontrolled Desire",
        "text": "The allegory of Bhasmasura teaches that power gained without inner wisdom and restraint ultimately destroys the bearer. Uncontrolled ego consumes itself with the very fire it attempts to inflict upon the world. The dance of Mohini represents the subtle laws of nature mirroring our actions back upon ourselves—the immutable law of Karma."
      }
    ]
  },
  {
    "id": "granth_patala_asuras",
    "cat": "asuras",
    "catLabel": "👹 DEVILS & ASURAS",
    "title": "The Subterranean Asuras of Patala & The Naga Kingdom",
    "pages": 170,
    "chaptersCount": 6,
    "emoji": "🐍",
    "isPremium": true,
    "coverImg": "/images/patala_naga_kingdom.jpg",
    "desc": "The 7 subterranean dimensions (Atala, Vitala, Sutala, Talatala, Mahatala, Rasatala, Patala) and architect Maya Danava.",
    "videoUrl": "https://www.youtube.com/embed/yr2OWiEz7VE",
    "chapters": [
      {
        "title": "Chapter 1: The Seven Lower Realms",
        "text": "Below the mortal plane lie the seven subterranean dimensions described in the Vishnu Purana and Bhagavata Purana: Atala, Vitala, Sutala, Talatala, Mahatala, Rasatala, and Patala. Free from the scorching rays of the mortal sun, these realms are illuminated by glowing subterranean crystal geodes and jewel-encrusted serpent crowns."
      },
      {
        "title": "Chapter 2: Architect Maya Danava & The Subterranean Cities",
        "text": "In the lower realm of Talatala resides Maya Danava, the supreme master of illusion, geometry, and mechanical automata. He constructed towering crystal palaces, perpetual waterways, and subterranean fortresses with interlocking basalt walls that could pivot to trap invading armies in optical mazes."
      },
      {
        "title": "Chapter 3: The Naga Kingdom of Ananta Shesha & Vasuki",
        "text": "At the deepest base lies Patala, the domain of the celestial Nagas ruled by King Vasuki, Shankha, and Mahapadma. Beneath all realms rests the primordial serpent Ananta Shesha, whose thousand hoods support the planetary systems, remaining undisturbed during cosmic dissolution (Pralaya)."
      },
      {
        "title": "Chapter 4: Emperor Mahabali & The Golden Age of Sutala",
        "text": "In the realm of Sutala reigns King Mahabali, blessed by Lord Vamana. The Puranas state that Sutala is far more opulent than Svargaloka (heaven), devoid of disease, anxiety, or aging. Lord Vishnu Himself stands guard at Mahabali's golden gate with His Gada (mace) to ensure the Asura king's eternal peace."
      },
      {
        "title": "Chapter 5: The Secret Gems and Alchemy of Rasatala",
        "text": "In Rasatala, powerful Danavas and Daityas harness subterranean geothermal energies and extract 'Rasayana'—elemental mercury, mica, and sulfur alloys capable of transmuting metals and prolonging life for yugas, forming the legendary roots of Indian alchemical Rasashastra."
      },
      {
        "title": "Chapter 6: Inner Subconscious Dimensions",
        "text": "In yogic philosophy, the seven subterranean realms correspond to the subtle neurological layers below the Muladhara chakra—the instinctual, subconscious, and primal reservoirs of life force. Mastering the lower realms is the foundation of spiritual ascent into superconscious light."
      }
    ]
  },
  {
    "id": "granth_14_lokas",
    "cat": "sanatana",
    "catLabel": "🕉️ COSMIC SANATANA",
    "title": "The 14 Lokas & Ancient Time Dilation (Yuga Cycles)",
    "pages": 220,
    "chaptersCount": 6,
    "emoji": "🌌",
    "isPremium": false,
    "coverImg": "/images/fourteen_lokas_cosmos.jpg",
    "desc": "Vedic calculations of the 4.32 billion year Kalpa, Brahma's day, parallel dimensions, and the cosmic journey of the Jiva.",
    "videoUrl": "https://www.youtube.com/embed/0g6gQNukRKA",
    "chapters": [
      {
        "title": "Chapter 1: Time Dilation in Ancient Texts",
        "text": "In the Bhagavata Purana, King Kakudmi travels to Satyaloka with his daughter Revati to meet Lord Brahma. When he returns after what felt like 20 minutes in the celestial plane, millions of mortal years had elapsed on Earth, entire civilizations had risen and turned to dust, and Lord Krishna had descended in Dvapara Yuga—an astonishing ancient intuition of relativistic time dilation."
      },
      {
        "title": "Chapter 2: The Seven Upper & Seven Lower Lokas",
        "text": "Vedic cosmology maps 14 planetary planes arranged in a multi-dimensional torus: the 7 upper worlds (Bhur, Bhuvar, Svar, Mahar, Jana, Tapas, Satyaloka) and the 7 lower worlds (Atala to Patala). Earth (Bhurloka) is the pivotal Karmabhumi—the unique plane where conscious spiritual evolution occurs."
      },
      {
        "title": "Chapter 3: The Four Great Yugas & The Mahayuga",
        "text": "Time flows in cyclic cosmic epochs: Satya Yuga (1,728,000 human years, 100% Dharma), Treta Yuga (1,296,000 years, 75% Dharma), Dvapara Yuga (864,000 years, 50% Dharma), and Kali Yuga (432,000 years, 25% Dharma). Together they form one Mahayuga of 4.32 million years."
      },
      {
        "title": "Chapter 4: The Day of Brahma (Kalpa: 4.32 Billion Years)",
        "text": "One single daytime of Lord Brahma comprises 1,000 Mahayugas—exactly 4.32 billion human solar years, remarkably close to modern astrophysics estimates of the Earth's geological age (4.54 billion years). At the end of Brahma's day, universal dissolution (Naimittika Pralaya) takes place, followed by a night of equal length."
      },
      {
        "title": "Chapter 5: The Cosmic Cycles of Brahma (Srishti, Sthiti, Laya)",
        "text": "Brahma lives for 100 cosmic years (311.04 trillion solar years, known as a Maha Kalpa). At the conclusion of this vast lifespan, Mahapralaya occurs: all elements dissolve back into the unmanifest Prakriti, until the supreme Parabrahman breathes forth the next cycle of infinite universes."
      },
      {
        "title": "Chapter 6: The Journey of the Jiva Through Dimensional Planes",
        "text": "The Jiva (individual soul), bound by the threads of Vasana (subconscious impressions) and Karma, migrates across these 14 dimensions through birth and rebirth. Liberation (Moksha) is the transcendent exit from this cosmic wheel of cyclic time into timeless, non-dual realization."
      }
    ]
  },
  {
    "id": "granth_samudra_manthan",
    "cat": "sanatana",
    "catLabel": "🕉️ COSMIC SANATANA",
    "title": "The Great Samudra Manthan: Churning the Milk Ocean",
    "pages": 195,
    "chaptersCount": 6,
    "emoji": "🌊",
    "isPremium": false,
    "coverImg": "/images/samudra_manthan.jpg",
    "desc": "Mount Mandara, Vasuki the serpent churning cord, the deadly Halahala poison, and the 14 divine jewels of eternity.",
    "videoUrl": "https://www.youtube.com/embed/eE8paZuuigA",
    "chapters": [
      {
        "title": "Chapter 1: The Cosmic Alliance",
        "text": "Weakened by the curse of Sage Durvasa, the Devas formed a rare cosmic pact with the Asuras to churn the Ocean of Milk (Kshira Sagara) in search of Amrita, the elixir of immortality. Mount Mandara was uprooted as the churning rod, and King Vasuki served as the churning rope."
      },
      {
        "title": "Chapter 2: Kurma Avatar: The Cosmic Foundation",
        "text": "As Mount Mandara began sinking into the ocean floor under its colossal weight, Lord Vishnu manifested as the giant tortoise Kurma Avatar, diving to the ocean bed and supporting the entire mountain on His hard carapace, serving as the stable fulcrum for the cosmic churning."
      },
      {
        "title": "Chapter 3: The Blue-Throated Neelakantha",
        "text": "Before the nectar appeared, the ocean churned up Halahala—the lethal poison capable of incinerating all three worlds. Out of boundless compassion, Lord Shiva drank the entire venom, holding it in His throat, which turned blue, earning Him the immortal name Neelakantha."
      },
      {
        "title": "Chapter 4: The 14 Divine Treasures of Eternity",
        "text": "As the churning continued, 14 cosmic treasures emerged: Kamadhenu (the wish-granting cow), Airavata (the multi-tusked white elephant), Uchhaishravas (the seven-headed horse), Kaustubha (the supreme jewel), Parijata (the celestial tree), and Goddess Lakshmi, who chose Lord Vishnu as Her eternal consort."
      },
      {
        "title": "Chapter 5: Dhanvantari & The Golden Urn of Amrita",
        "text": "Finally, Lord Dhanvantari, the primordial father of Ayurveda and divine medicine, emerged holding the golden pot of Amrita. The ensuing struggle between Devas and Asuras led to the manifestation of Mohini, who ensured the nectar was distributed to preserve universal balance."
      },
      {
        "title": "Chapter 6: Rahu-Ketu & The Solar-Lunar Eclipse Cosmology",
        "text": "When the Asura Swarbhanu disguised himself among the Devas to drink the nectar, the Sun and Moon exposed him. Vishnu's Sudarshana Chakra severed his head. Having touched Amrita, his immortal head became Rahu and his serpent torso Ketu, periodically obscuring the sun and moon in cosmic eclipses."
      }
    ]
  },
  {
    "id": "granth_kundalini_science",
    "cat": "sanatana",
    "catLabel": "🕉️ COSMIC SANATANA",
    "title": "Kundalini & The Sacred Neuroscience of 7 Chakras",
    "pages": 160,
    "chaptersCount": 6,
    "emoji": "🧘",
    "isPremium": true,
    "coverImg": "/images/kundalini_chakras.jpg",
    "desc": "Ancient palm-leaf maps of consciousness: Ida, Pingala, Sushumna, and the awakening of the dormant serpentine energy.",
    "videoUrl": "https://www.youtube.com/embed/JA0P7okWXA4",
    "chapters": [
      {
        "title": "Chapter 1: The Bio-Electric Nadis",
        "text": "The ancient Yoga Upanishads document 72,000 subtle energy channels (Nadis) converging along the cerebrospinal axis. The central channel Sushumna is flanked by Ida (lunar, parasympathetic cooling current) and Pingala (solar, sympathetic heating current). Balancing these twin currents is the prerequisite for spiritual awakening."
      },
      {
        "title": "Chapter 2: The Muladhara Root & The Coiled Serpentine Fire",
        "text": "At the perineum base rests the Muladhara chakra, where the primordial evolutionary energy (Kundalini Shakti) lies coiled 3.5 times around the Svayambhu Linga in deep dormancy. Awakened through Pranayama, Mantra, and intense devotion, this dormant bio-electric fire ascends upward through the spinal cord."
      },
      {
        "title": "Chapter 3: The Ascent Through the Seven Chakras",
        "text": "As Kundalini pierces each energetic vortex—Swadhisthana (sacral/creativity), Manipura (navel/vital fire), Anahata (heart/unconditional love), Vishuddha (throat/etheric truth), and Ajna (third eye/intuitive mastery)—she dissolves psychological knots (Granthis: Brahma, Vishnu, Rudra) that bind human perception."
      },
      {
        "title": "Chapter 4: Bandhas, Mudras & Hatha Yoga Pradipika",
        "text": "Yogi Svatmarama's classic treatise details the neuro-muscular locks: Mula Bandha (perineal lift), Uddiyana Bandha (abdominal lift), and Jalandhara Bandha (throat lock). These mechanical bio-valves reverse descending Apana Vayu to fuse with ascending Prana, forcing energy into the central Sushumna cavity."
      },
      {
        "title": "Chapter 5: Modern Neuroscience of Kundalini Awakening",
        "text": "Contemporary neuro-theology studies reveal that Kundalini arousal stimulates the vagus nerve, synchronizes thalamocortical oscillations, activates the pineal gland to release endogenous DMT-like neuro-peptides, and induces sustained Gamma-band (40–100 Hz) brainwave coherence observed in Himalayan masters."
      },
      {
        "title": "Chapter 6: Sahasrara & The Non-Dual Union (Samadhi)",
        "text": "When Kundalini Shakti reaches the thousand-petaled Sahasrara lotus at the crown of the head, she merges with Shiva (pure transcendent consciousness). The illusion of individual separation dissolves completely, resulting in Nirvikalpa Samadhi—unbroken, luminous, blissful realization of the Infinite."
      }
    ]
  },
  {
    "id": "granth_surya_siddhanta",
    "cat": "sanatana",
    "catLabel": "🕉️ COSMIC SANATANA",
    "title": "Surya Siddhanta: Lost Astronomy of Ancient Sages",
    "pages": 175,
    "chaptersCount": 6,
    "emoji": "☀️",
    "isPremium": true,
    "coverImg": "/images/surya_siddhanta_astronomy.jpg",
    "desc": "Ancient mathematical calculations of the speed of light, planetary orbits, lunar nodes, and equinox precessions.",
    "videoUrl": "https://www.youtube.com/embed/J6T7UjSRs0A",
    "chapters": [
      {
        "title": "Chapter 1: Revelation to Maya Danava in Treta Yuga",
        "text": "According to astronomical tradition, the Surya Siddhanta was revealed by the Sun God's envoy to the architect-astronomer Maya Danava at the close of Treta Yuga in Romaka city. It established the foundational trigonometric and computational framework for Indian astronomical calculations (Ganita Jyotisha)."
      },
      {
        "title": "Chapter 2: Sidereal Year & Planetary Orbit Computations",
        "text": "Written thousands of years ago, the Surya Siddhanta calculated the length of the sidereal year as 365 days, 6 hours, 12 minutes, and 36.56 seconds—differing by less than 1.4 seconds from modern atomic clock measurements! It also computed the orbital periods of Mercury, Venus, Mars, Jupiter, and Saturn with stunning accuracy."
      },
      {
        "title": "Chapter 3: Vedic Trigonometry & Earth's Diameter",
        "text": "Centuries before European calculus, the Surya Siddhanta introduced 'Jya' (sine tables in 24 intervals of 3°45'), 'Kojya' (cosine), and 'Utkramajya' (versine). It calculated the diameter of the Earth as 8,000 miles (modern value: 7,917.5 miles) and the circumference as 25,120 miles."
      },
      {
        "title": "Chapter 4: Precision Eclipse Forecasting (Grahana)",
        "text": "The treatise details the mathematical trigonometry of solar and lunar eclipses, calculating parallax (Lambana in longitude, Nati in latitude), the exact diameter of the Earth's shadow cone, and the precise moments of eclipse contact, totality, and clearance down to the 'Nadi' (24 minutes) and 'Vinadi' (24 seconds)."
      },
      {
        "title": "Chapter 5: Precession of Equinoxes (Ayanamsha)",
        "text": "The Surya Siddhanta was among the first planetary treatises to quantify the precession of the equinoxes, documenting the oscillating motion of the celestial sphere at a rate of 54 arcseconds per year, allowing Indian panchangas to maintain exact alignments between the tropical and sidereal zodiacs."
      },
      {
        "title": "Chapter 6: Modern Astrophysical Affirmations",
        "text": "From NASA astrophysicists analyzing ancient Indian astronomical tables to modern mathematicians studying Aryabhata and Bhaskara, the computational formulas in Surya Siddhanta remain a testament to the scientific rigor and astronomical genius of ancient Bharat."
      }
    ]
  },
  {
    "id": "granth_adi_shankara",
    "cat": "gurujis",
    "catLabel": "🧘 MIRACLE GURUJIS",
    "title": "Adi Shankaracharya: Digvijaya & Himalayan Miracles",
    "pages": 240,
    "chaptersCount": 6,
    "emoji": "📜",
    "isPremium": false,
    "coverImg": "/images/adi_shankara.jpg",
    "desc": "Walking barefoot across the 4 corners of India, defeating dogmas through pure logic, and establishing the 4 sacred Peethams at age 32.",
    "videoUrl": "https://www.youtube.com/embed/xgAA5C-niCk",
    "chapters": [
      {
        "title": "Chapter 1: The Wonder Child of Kalady & The Kanakadhara Miracle",
        "text": "Born in Kalady, Kerala, young Shankara mastered the four Vedas by age eight. When an impoverished woman offered him her last withered gooseberry (Amla) with tears of devotion, Shankara recited the Kanakadhara Stotram, causing Goddess Lakshmi to shower golden amlas into the humble hut."
      },
      {
        "title": "Chapter 2: Sanyasa at Narmada & Govinda Bhagavatpada",
        "text": "Taking formal monastic vows after a crocodile grasped his foot in the Purna river, Shankara traveled to the banks of the Narmada to study under Sage Govinda Bhagavatpada. In a famous test, young Shankara contained the raging floodwaters of the Narmada inside his water pot (Kamandalu), earning his guru's blessing."
      },
      {
        "title": "Chapter 3: The Great Commentaries (Prasthana Traya Bhashya)",
        "text": "In the sacred Himalayan caves of Badrinath and Uttarkashi, Shankara wrote monumental commentaries on the Upanishads, the Bhagavad Gita, and Badarayana's Brahma Sutras, rigorously proving that the ultimate truth is Advaita—the non-dual oneness of Atman and Brahman."
      },
      {
        "title": "Chapter 4: The Digvijaya & Debate with Mandana Mishra",
        "text": "Traveling barefoot across Bharat, Shankara engaged in historic philosophical debates with leading scholars of Mimamsa, Nyaya, and Buddhist schools. In Mahishmati, he debated the great ritualist Mandana Mishra, with Ubhaya Bharati as the impartial judge, bringing the entire subcontinent under the banner of Vedantic wisdom."
      },
      {
        "title": "Chapter 5: The Four Amnaya Mathas (Four Cardinal Pillars)",
        "text": "To preserve spiritual unity for generations, Shankara established the four monastic Peethams at the four corners of India: Sringeri Sharada Peetham in the South (Yajur Veda), Dwaraka Kalika Matha in the West (Sama Veda), Puri Govardhana Matha in the East (Rig Veda), and Badrikashrama Jyotirmath in the North (Atharva Veda)."
      },
      {
        "title": "Chapter 6: The Sarvajna Peetha & Timeless Advaita Legacy",
        "text": "Ascending the Throne of Omniscience (Sarvajna Peetha) in Kashmir at the age of thirty-two, Shankara synthesized ritual worship into the Panchayatana system. His philosophical legacy remains the ultimate pinnacle of Indian epistemology: 'Brahma Satyam Jagan Mithya, Jivo Brahmaiva Naparah' (Brahman alone is real, the world is transient, the soul is non-different from Brahman)."
      }
    ]
  },
  {
    "id": "granth_agastya_miracles",
    "cat": "gurujis",
    "catLabel": "🧘 MIRACLE GURUJIS",
    "title": "Maharishi Agastya: Master of Oceans, Stars & Martial Arts",
    "pages": 190,
    "chaptersCount": 6,
    "emoji": "🌴",
    "isPremium": true,
    "coverImg": "/images/maharishi_agastya.jpg",
    "desc": "Drinking the southern ocean, subduing the Vindhya mountain range, and founding Tamil grammar and Kalaripayattu.",
    "videoUrl": "https://www.youtube.com/embed/Z4XLf9w9Bc8",
    "chapters": [
      {
        "title": "Chapter 1: The Sage Who Drank the Ocean",
        "text": "When the demon Kalakeyas hid beneath the ocean depths to wage nocturnal guerrilla attacks against Vedic sages, Maharishi Agastya channeled supreme yogic energy and drank the entire southern ocean in one single draught, exposing the demon armies to the Devas and restoring cosmic order."
      },
      {
        "title": "Chapter 2: Subduing the Vindhya Mountains",
        "text": "When Mount Vindhya grew excessively tall out of pride, blocking the path of the sun, the Devas sought Agastya's aid. As the great sage approached heading south, the mountain bowed in reverence. Agastya commanded: 'Remain bowed until I return from the South.' The sage settled permanently in the South, keeping the mountain humbled forever."
      },
      {
        "title": "Chapter 3: Founding Tamil Grammar & Sangam Literature",
        "text": "In the southern kingdom of the Pandyas, Sage Agastya founded the First Tamil Sangam at Madurai and authored 'Agattiyam'—the primordial grammatical treatise of the Tamil language. He is revered as the eternal Father of Tamil literature and culture."
      },
      {
        "title": "Chapter 4: Siddha Medicine & The 108 Pulse Diagnostics",
        "text": "As head of the 18 Siddha masters (Siddhars), Agastya pioneered Siddha medicine in the herbal-rich Podhigai hills. He formulated alchemical preparations using herbs, minerals, and metals, and documented the 108 subtle pulse variations (Nadi Pariksha) to diagnose illness before physical symptoms appear."
      },
      {
        "title": "Chapter 5: Aditya Hridaya Stotram Bestowed Upon Lord Rama",
        "text": "On the battlefield of Lanka, when Lord Rama was fatigued after long battles against Ravana, Maharishi Agastya appeared on the warfront and initiated Rama into the sacred 'Aditya Hridaya Stotram'—the secret hymn to the Sun God that imparts invincible vitality, clarity, and victory."
      },
      {
        "title": "Chapter 6: The Founder of Marmam & Kalaripayattu",
        "text": "Agastya mapped the 108 lethal pressure points (Marma points) on the human body, establishing the foundation of Southern Kalaripayattu (Adimurai / Varma Kalai)—the world's oldest martial art, designed to disable attackers with minimal touch and heal injuries through energetic manipulation."
      }
    ]
  },
  {
    "id": "granth_vivekananda_awakening",
    "cat": "gurujis",
    "catLabel": "🧘 MIRACLE GURUJIS",
    "title": "Swami Vivekananda: Raja Yoga & The Global Awakening",
    "pages": 200,
    "chaptersCount": 6,
    "emoji": "🦁",
    "isPremium": true,
    "coverImg": "/images/dharma.jpg",
    "desc": "The fiery training under Ramakrishna, the electrifying 1893 Chicago Parliament speech, and master laws of mental focus.",
    "videoUrl": "https://www.youtube.com/embed/ul34M_LQmhg",
    "chapters": [
      {
        "title": "Chapter 1: The Sceptic Narendranath & Sri Ramakrishna",
        "text": "As a sharp intellectual student in Calcutta, young Narendranath Dutta questioned every religious teacher with one blunt challenge: 'Have you seen God?' None could answer until he met the mystic priest Sri Ramakrishna Paramahamsa at Dakshineswar, who smiled and said: 'Yes, I see Him just as I see you here, only in a much deeper sense.'"
      },
      {
        "title": "Chapter 2: The Wandering Monk & Kanyakumari Rock",
        "text": "Following Ramakrishna's Mahasamadhi, Vivekananda wandered barefoot across India for six years, witnessing the deep poverty and spiritual strength of the masses. In 1892, at Kanyakumari, he swam across shark-infested waters to the sacred rock, meditating for three days and nights to formulate his mission: the regeneration of India through spiritual education and selfless service."
      },
      {
        "title": "Chapter 3: The Thunder at Chicago (September 11, 1893)",
        "text": "Standing before 7,000 delegates at the World's Parliament of Religions in Chicago, a young monk in saffron robes began: 'Sisters and Brothers of America!' The hall erupted in a standing ovation that lasted two full minutes. In five speeches, he introduced the profound universality of Vedanta, proclaiming that all religions are paths to the one universal truth."
      },
      {
        "title": "Chapter 4: The Four Master Paths: Raja, Jnana, Bhakti, Karma Yoga",
        "text": "Vivekananda systematically translated and expounded the core yogic sciences for the modern world: Raja Yoga (meditation and mind control), Jnana Yoga (philosophical discernment), Bhakti Yoga (sublimation of emotional love), and Karma Yoga (selfless work without attachment to fruits)."
      },
      {
        "title": "Chapter 5: Founding the Ramakrishna Mission (Daridra Narayana)",
        "text": "In 1897, Vivekananda established the Ramakrishna Math and Mission with the motto 'Atmano Mokshartham Jagat Hitaya Cha' (For one's own liberation and for the welfare of the world). He elevated humanitarian service to the poor, sick, and marginalized into the highest form of spiritual worship."
      },
      {
        "title": "Chapter 6: Awakening the Youth of Bharat",
        "text": "Vivekananda's clarion call to the youth remains immortal: 'Arise, awake, and stop not till the goal is reached! You have to grow from the inside out. None can teach you, none can make you spiritual. There is no other teacher but your own soul.' His life sparked India's freedom movement and modern civilizational resurgence."
      }
    ]
  },
  {
    "id": "granth_bhakti_miracles",
    "cat": "gurujis",
    "catLabel": "🧘 MIRACLE GURUJIS",
    "title": "Mirabai, Sant Kabir & Tulsidas: Miracles of Divine Love",
    "pages": 185,
    "chaptersCount": 6,
    "emoji": "🪷",
    "isPremium": true,
    "coverImg": "/images/shiva_parvati_kalyanam.jpg",
    "desc": "Poison turning to divine nectar, unbreakable devotion, and the mystical composition of the Ramcharitmanas.",
    "videoUrl": "https://www.youtube.com/embed/ftOa_ncLY6Q",
    "chapters": [
      {
        "title": "Chapter 1: Princess Mirabai & The Cup of Poison",
        "text": "When royal persecution sent a cup of lethal snake venom to Princess Mirabai of Mewar because of her unwavering devotion to Lord Krishna (Girdhar Gopal), she drank it with a joyful smile, offering it as prasad. By the grace of supreme love, the deadly poison transformed into sweet divine nectar (Amrita)."
      },
      {
        "title": "Chapter 2: Sant Kabir: The Looms of Truth & Non-Duality",
        "text": "Weaving cloth in Varanasi, Sant Kabir composed immortal 'Dohe' (couplets) that shattered religious hypocrisy, caste rigidity, and dogmatic rituals. He taught that God resides not in stone temples or mosques, but within the clean lotus of the human heart: 'Moko Kahan Dhundhere Bande, Main To Tere Paas Mein.'"
      },
      {
        "title": "Chapter 3: Goswami Tulsidas & The Ramcharitmanas",
        "text": "Guided by a vision of Hanuman in Varanasi, Goswami Tulsidas composed the Ramcharitmanas in the vernacular Awadhi language, making the divine story of Rama accessible to millions of households across India. He also penned the immortal 40 verses of the Hanuman Chalisa while imprisoned in Delhi."
      },
      {
        "title": "Chapter 4: Sant Tukaram & The Floating Abhangas of Pandharpur",
        "text": "In Maharashtra, the grocer-saint Tukaram sang devotional Abhangas to Lord Vitthala of Pandharpur. When orthodox detractors threw his handwritten manuscript manuscripts into the Indrayani River, the sacred texts floated miraculously back to the riverbank dry and untouched after thirteen days of prayer."
      },
      {
        "title": "Chapter 5: Andal & The Tamil Alvars: Thiruppavai Songs",
        "text": "In Srivilliputhur, young Andal composed the 30 verses of the Thiruppavai, awakening the maidens of the village to the divine grace of Lord Ranganatha. Her bridal devotion (Madhurya Bhava) represents the pinnacle of Tamil Vaishnava Bhakti, inspiring temple chanting across South India every Margazhi month."
      },
      {
        "title": "Chapter 6: The Philosophy of Parabhakti: Love Beyond Fear",
        "text": "The Bhakti movement democratized spirituality across India during centuries of foreign invasion. By emphasizing that pure, guileless love transcends intellect, social status, and ritual perfection, these divine saints kept the living spiritual fire of Sanatana Dharma burning brightly."
      }
    ]
  },
  {
    "id": "granth_panchatantra_5_tantras",
    "cat": "morals",
    "catLabel": "🧒 MORAL & HEROIC EPICS",
    "title": "Panchatantra: The 5 Tantras of Strategic Wisdom",
    "pages": 190,
    "chaptersCount": 6,
    "emoji": "🦊",
    "isPremium": false,
    "coverImg": "/images/panchatantra_cover.jpg",
    "desc": "The world's oldest leadership treatise: Mitra Bheda (Losing Friends), Mitra Labha (Gaining Allies), and strategic wildlife fables.",
    "videoUrl": "https://www.youtube.com/embed/CpbiCHF0Jco",
    "chapters": [
      {
        "title": "Chapter 1: The Sage and the Three Foolish Princes",
        "text": "When King Amarasakti sought a master to transform his three foolish sons into wise rulers, Acharya Vishnu Sharma wrote the Panchatantra—interwoven animal allegories designed to teach diplomacy (Niti), psychology, statecraft, and human nature in just six months."
      },
      {
        "title": "Chapter 2: Tantra I: Mitra Bheda (The Separation of Friends)",
        "text": "The epic story of the friendship between Pingalaka the Lion and Sanjivaka the Bull, and how the jealous jackal Damanaka sowed seeds of suspicion and discord between them, teaching rulers the vital importance of verifying intelligence before trusting counselors."
      },
      {
        "title": "Chapter 3: Tantra II: Mitra Labha (The Gaining of Friends)",
        "text": "How four naturally incompatible creatures—Laghu-patanaka the Crow, Hiranyaka the Mouse, Mantharaka the Turtle, and Chitranga the Deer—united in deep loyalty, pooling their unique strengths to escape hunter's traps, demonstrating that cooperative alliance conquers impossible odds."
      },
      {
        "title": "Chapter 4: Tantra III: Kakolukiyam (War & Peace of Crows & Owls)",
        "text": "The ancient warfare between the diurnal Crows and nocturnal Owls, and how the wise minister crow Raktaksha used espionage, deceptive surrender, and tactical arson to defeat the owl fortress, illustrating Chanakya-style realpolitik and psychological warfare."
      },
      {
        "title": "Chapter 5: Tantra IV: Labdhapranasam (Loss of Hard-Earned Gains)",
        "text": "The famous fable of the Monkey and the Crocodile in the Rose-Apple tree: when the crocodile attempted to betray his friend to please his wife, the monkey used lightning wit to save his life, teaching that presence of mind preserves what hard work has built."
      },
      {
        "title": "Chapter 6: Tantra V: Aparikshitakarakam (Ill-Considered Action)",
        "text": "The tragic tale of the Brahmin woman and the loyal Mongoose who saved her infant from a black cobra, only to be struck down in haste. It serves as an eternal warning against impulsive anger and acting on unverified surface appearances without inquiry."
      }
    ]
  },
  {
    "id": "granth_vikram_betal_25",
    "cat": "morals",
    "catLabel": "🧒 MORAL & HEROIC EPICS",
    "title": "Vikram & Betal: 25 Riddles of Justice & Statecraft",
    "pages": 215,
    "chaptersCount": 6,
    "emoji": "👑",
    "isPremium": true,
    "coverImg": "/images/vikram_betal.jpg",
    "desc": "King Vikramaditya carrying the riddle-telling corpse across the cremation ground to test moral intellect.",
    "videoUrl": "https://www.youtube.com/embed/piwghp31zvo",
    "chapters": [
      {
        "title": "Chapter 1: The Vow of King Vikramaditya",
        "text": "To fulfill a promise to a Tantric ascetic, the fearless King Vikramaditya of Ujjain journeyed into the haunted cremation ground on a moonless night to retrieve a corpse possessed by the celestial spirit Betal. But Betal warned him: 'I will tell you a story on our walk; if you know the answer to its riddle and remain silent, your head will burst into a thousand pieces; but if you speak, I will fly back to the banyan tree!'"
      },
      {
        "title": "Chapter 2: Riddle of the Three Noble Suitors",
        "text": "When a beautiful maiden died of snakebite, three suitors responded differently: one cremated himself on her pyre, one preserved her ashes at the riverbank, and the third learned the mantra of revival to bring her back to life. Betal asked: 'Who has the lawful right to marry her?' Vikram answered: 'The one who gave her life is her father; the one who burned is her son; the one who stayed with her ashes is her true husband!'"
      },
      {
        "title": "Chapter 3: Riddle of the Transposed Heads (Body vs Mind)",
        "text": "Two best friends decapitated themselves in a temple of Kali. When the wife was granted a boon to reattach their heads, in her haste she transposed the heads on the wrong bodies. Betal asked: 'Who is her husband?' Vikram replied: 'The head is the master of all senses and consciousness; the body with the husband's head is her husband.'"
      },
      {
        "title": "Chapter 4: Riddle of the King, Thief & The Courtesan",
        "text": "A complex tale of justice where a thief gave up his life to protect an oath, a merchant forgave an unfaithful bride, and a courtesan refused gold out of genuine virtue. Vikram analyzed the psychological motives of each character, judging the merchant as the most noble because he conquered the blinding instinct of possessive jealousy."
      },
      {
        "title": "Chapter 5: Riddle of the Father-Son and Mother-Daughter Marriages",
        "text": "A king married a young daughter while the king's son married the daughter's mother. Both couples had children. Betal posed the intricate genealogical paradox: 'What is the relationship between their children?' Vikram smiled in silence, recognizing an unanswerable logical loop, thus walking the required distance without breaking his vow of silence."
      },
      {
        "title": "Chapter 6: The 25th Silent Riddle & Thwarting the Sorcerer",
        "text": "Pleased with Vikram's fearless wisdom and unshakeable virtue, Betal revealed the evil sorcerer's plot to sacrifice the King during the midnight ritual. Armed with Betal's warning, Vikramaditya outwitted the sorcerer, liberated the spirit Betal from his curse, and received the blessing of universal fame and divine prosperity."
      }
    ]
  },
  {
    "id": "granth_abhimanyu_chakravyuha",
    "cat": "morals",
    "catLabel": "🧒 MORAL & HEROIC EPICS",
    "title": "Abhimanyu: The 16-Year-Old Lion in the Chakravyuha",
    "pages": 165,
    "chaptersCount": 6,
    "emoji": "🏹",
    "isPremium": true,
    "coverImg": "/images/abhimanyu_chakravyuha.jpg",
    "desc": "The sacred labyrinth geometry of Dronacharya and the young prince who knew how to enter but not exit.",
    "videoUrl": "https://www.youtube.com/embed/dgwcRqWK9ps",
    "chapters": [
      {
        "title": "Chapter 1: The Secret Learned in the Womb",
        "text": "While in the womb of his mother Subhadra, young Abhimanyu heard Arjuna explaining the secret mechanics of penetrating the impenetrable seven-tiered Chakravyuha formation. But before Arjuna could explain the method of exit, Subhadra fell asleep, sealing the tragic, heroic fate of the sixteen-year-old warrior."
      },
      {
        "title": "Chapter 2: The 13th Day: Dronacharya's Labyrinth",
        "text": "With Arjuna lured away to the southern battlefield by the Samsaptakas, Guru Dronacharya formed the dreaded Chakravyuha—a rotating multi-tiered wheel of death designed to capture Yudhishthira. Seeing the Pandava army in despair, young Abhimanyu volunteered to breach the formation, supported by Bhima and Satyaki."
      },
      {
        "title": "Chapter 3: Penetrating the Seven Gates",
        "text": "Charging like a golden eagle into the mouth of the formation, Abhimanyu pierced the outer concentric rings, shattering thousands of chariot divisions. However, Jayadratha, blessed by Shiva with a boon to hold back the Pandavas for one day, slammed the outer gate shut, trapping Abhimanyu entirely alone in the core of the labyrinth."
      },
      {
        "title": "Chapter 4: The 16-Year-Old Lion Against Veteran Maharathas",
        "text": "Surrounded by seven legendary veteran warriors—Drona, Kripa, Karna, Ashwatthama, Duryodhana, Dushasana, and Shakuni—Abhimanyu fought with supernatural brilliance, shattering weapons, cutting chariot flags, and single-handedly defeating Duryodhana's son Lakshmana."
      },
      {
        "title": "Chapter 5: The Chariot Wheel & The Broken War Code",
        "text": "When his bowstring was sliced from behind by Karna and his horses and chariot were destroyed, Abhimanyu did not yield. He lifted a massive wooden chariot wheel with his bare hands, whirling it like the Sudarshana Chakra against impossible odds until overwhelmed by the collective attack."
      },
      {
        "title": "Chapter 6: The Immortal Legacy of Courage",
        "text": "Abhimanyu's sacrifice on the 13th day of the Kurukshetra war remains the eternal symbol of unyielding courage and duty in the face of insurmountable odds. His son Parikshit was saved by Lord Krishna to carry forward the Pandava dynasty, ensuring the survival of the Pandava lineage and Dharma."
      }
    ]
  },
  {
    "id": "granth_tenali_birbal_wit",
    "cat": "morals",
    "catLabel": "🧒 MORAL & HEROIC EPICS",
    "title": "Tenali Rama & Birbal: Tales of Wit & Court Logic",
    "pages": 175,
    "chaptersCount": 6,
    "emoji": "🦚",
    "isPremium": false,
    "coverImg": "/images/tenali.jpg",
    "desc": "The brilliant intellectual sparring matches that exposed hypocrisy and guided emperors with wisdom and humor.",
    "videoUrl": "https://www.youtube.com/embed/TnMt8tLfK-o",
    "chapters": [
      {
        "title": "Chapter 1: Tenali Rama & The Thousand-Headed Goddess Kali",
        "text": "When Goddess Kali appeared before Tenali Rama with a thousand heads to test him, Tenali burst out laughing. When the Goddess angrily asked why he laughed, Tenali replied: 'O Mother, with one nose when I catch a cold it is so difficult; how do you manage with a thousand running noses?' Amused by his fearlessness and lightning wit, Kali blessed him to become the greatest court jester of Vijayanagara."
      },
      {
        "title": "Chapter 2: Birbal & Emperor Akbar: Counting Crows in Delhi",
        "text": "When Emperor Akbar tested his court by asking how many crows resided in Delhi, courtiers spent days calculating in confusion. Birbal stepped forward and declared: 'There are exactly 50,589 crows, Your Majesty. If there are more, they have come from neighboring cities to visit relatives; if fewer, they have gone on vacation!'"
      },
      {
        "title": "Chapter 3: Tenali Rama and the King's Impossible Dream Palace",
        "text": "When King Krishnadevaraya dreamed of a floating palace hanging in the sky and demanded his ministers construct it, Tenali dressed as an old farmer and claimed that the King had promised in a dream to give him 10,000 gold coins. The King realized the absurdity of enforcing dream visions in reality."
      },
      {
        "title": "Chapter 4: Birbal & The Pot of Wisdom (Gourds in the Jar)",
        "text": "When a neighboring ruler demanded a 'pot full of wisdom' from Akbar, Birbal placed small growing gourds inside narrow-necked clay pots until they grew to fill the vessel without cutting the gourd. He sent the pot with the message: 'Extract the wisdom without breaking the pot or damaging the gourd.'"
      },
      {
        "title": "Chapter 5: Tenali Rama and the Greedy Astrologers",
        "text": "When arrogant court astrologers convinced Krishnadevaraya that the city faced a grave omen that could only be cured by donating golden elephants, Tenali staged a hilarious public demonstration proving that authentic Dharma lies in moral virtue, truth, and charity to the needy rather than superstition."
      },
      {
        "title": "Chapter 6: The Legacy of Hasya Rasa in Statecraft",
        "text": "The legends of Tenali Rama and Birbal represent the sublime tradition of 'Hasya Rasa' in Indian governance—using humor, logic, and sharp psychological insight to speak truth to power, deflate royal vanity, and guide great emperors toward justice and compassion."
      }
    ]
  },
  {
    "id": "granth_veerabhadra",
    "cat": "sages",
    "catLabel": "⚔️ SAGES & AVATARS",
    "title": "Who is Lord Veerabhadra? The Fierce Destroyer of Daksha's Pride",
    "pages": 185,
    "chaptersCount": 6,
    "emoji": "⚔️",
    "isPremium": false,
    "coverImg": "/images/veerabhadra.jpg",
    "desc": "The colossal warrior born from Shiva's matted lock who decimated the arrogant sacrifice of Daksha and restored cosmic humility.",
    "videoUrl": "https://www.youtube.com/embed/5D3CeeZ6X1s",
    "chapters": [
      {
        "title": "Chapter 1: The Sacrificial Fire & The Insult to Sati",
        "text": "When King Daksha organized the greatest Brihaspatisava Yajna in Kanakhala, his supreme pride blinded him. He invited every Gandharva, Deva, and Rishi across the 14 Lokas, but deliberately excluded Lord Shiva. Devi Sati, unable to bear the public denigration of the Supreme Consciousness by her own father, entered the yogic fire of grief, dissolving her physical sheath in celestial agony."
      },
      {
        "title": "Chapter 2: The Matted Lock & The Cosmic Avenger",
        "text": "Hearing of Sati's dissolution, Lord Shiva performed the terrifying Rudra Tandava atop Mount Kailash. In divine fury, he plucked a single blazing dreadlock (Jata) and hurled it against the cosmic rocks. From the collision of fire and earth arose Lord Veerabhadra—tall as the sky, with a thousand muscular arms, wielding trishulas, flaming battle-axes, and blazing swords, accompanied by Mother Bhadrakali."
      },
      {
        "title": "Chapter 3: The March of the Rudra Ganas upon Kanakhala",
        "text": "With the earth shaking beneath their strides, the billions of Rudra Ganas and Yoginis descended upon Daksha's sacrificial arena. The celestial priests, guardians of the directions, and haughty attendees attempted to defend the sacrificial altar, but the elemental fury of Veerabhadra swept through like a supernova, extinguishing the polluted flames."
      },
      {
        "title": "Chapter 4: The Slaying of Daksha & The Cleansed Fire",
        "text": "Veerabhadra seized King Daksha by the altar and severed his head with a single stroke of his glowing celestial blade, casting it into the Homa fire to consume the root of pride. The arrogant gathering realized that rituals devoid of reverence to the Supreme Source are mere hollow ashes."
      },
      {
        "title": "Chapter 5: The Goat-Headed Redemption & Shiva's Grace",
        "text": "When Brahma and the Devas pleaded for mercy, Lord Shiva appeared upon the ruins. With boundless Karuna (compassion), Shiva placed the head of a sacrificial goat upon Daksha's torso, reviving him to life. Daksha wept in profound remorse, singing the Shiva Ashtakam as divine balance returned to the universe."
      },
      {
        "title": "Chapter 6: The Living Temples: Lepakshi & The Thousand-Pillar Legacy",
        "text": "Today, Lord Veerabhadra is worshipped across India as the supreme protector of dharma, health, and fearless courage. The 16th-century Lepakshi temple with its hanging pillar and giant monolithic Nandi stands as an architectural wonder dedicated to the eternal valor of Veerabhadra."
      }
    ]
  },
  {
    "id": "granth_kalabhairava",
    "cat": "sages",
    "catLabel": "⚔️ SAGES & AVATARS",
    "title": "Who is Lord Kalabhairava? The Lord of Sacred Time & Ruler of Kashi",
    "pages": 190,
    "chaptersCount": 6,
    "emoji": "⌛",
    "isPremium": false,
    "coverImg": "/images/kalabhairava.jpg",
    "desc": "The supreme master of Time (Kala) and ruler of Varanasi who burns away karmic debts and grants immediate spiritual fearlessness.",
    "videoUrl": "https://www.youtube.com/embed/S_B7y1G84k8",
    "chapters": [
      {
        "title": "Chapter 1: The Cosmic Debate of the Creator & The Fifth Head",
        "text": "In the primordial era, Lord Brahma developed an inflated pride regarding his creative powers, causing a fifth head to sprout upon his crown that spoke boastful and divisive words against the formless Absolute. To sever the illusion of intellectual arrogance, Lord Shiva glanced into the void of eternity."
      },
      {
        "title": "Chapter 2: The Emergence of Bhairava & The Kapalika Vow",
        "text": "From Shiva's third eye of cosmic fire stepped forth Lord Kalabhairava—radiant with the glow of midnight sapphires, carrying a golden trident and damaru. With the sharp tip of his fingernail, Kalabhairava severed Brahma's fifth head, taking upon himself the sacred Kapalika vow to wander the universe until the skull found its resting place."
      },
      {
        "title": "Chapter 3: The Holy Soil of Kashi & The Falling Skull",
        "text": "Wandering through the fourteen Lokas, the skull remained firmly adhered to Bhairava's palm until his lotus feet stepped onto the holy ground of Anandavan (Varanasi). The moment he entered Kashi, the skull fell to the earth, marking the sacred site of Kapala Mochana Teertha where all ancestral and cosmic debts are instantly dissolved."
      },
      {
        "title": "Chapter 4: Kotwal of Kashi: The Divine Chief Magistrate",
        "text": "Lord Shiva appointed Kalabhairava as the eternal Kotwal (Chief Magistrate and Guardian) of Kashi. According to tradition, even time itself stops in Kashi, and no soul can enter or attain Moksha at Manikarnika Ghat without the benevolent sign-off and protective grace of Kalabhairava."
      },
      {
        "title": "Chapter 5: The Black Dog Vahana & Yogic Time Transcendence",
        "text": "Kalabhairava rides a divine black dog (Shvana), symbolizing unwavering loyalty, heightened sensory awareness, and the subversion of social dogma. In esoteric Kundalini yoga, Bhairava represents the piercing of Kala (linear time), transporting the meditator into the eternal timeless present (Akala)."
      },
      {
        "title": "Chapter 6: Ashta Bhairava: The 8 Dimensional Guardians",
        "text": "Across Varanasi, eight dimensional shrines guard the eight directions: Asitanga (East), Ruru (Southeast), Chanda (South), Krodha (Southwest), Unmatta (West), Kapala (Northwest), Bhishana (North), and Samhara (Northeast), creating a sacred geometric mandala of total psychic protection."
      }
    ]
  },
  {
    "id": "granth_narasimha_fire",
    "cat": "sages",
    "catLabel": "⚔️ SAGES & AVATARS",
    "title": "Who is Lord Narasimha? The Pillar of Cosmic Fire & The Shield of Faith",
    "pages": 180,
    "chaptersCount": 6,
    "emoji": "🦁",
    "isPremium": false,
    "coverImg": "/images/hiranyakashipu_narasimha.jpg",
    "desc": "The half-man half-lion avatar who shattered the crystal pillar at twilight to fulfill every cosmic law and protect young Prahlad.",
    "videoUrl": "https://www.youtube.com/embed/3hmz995sruE",
    "chapters": [
      {
        "title": "Chapter 1: The Ironclad Boons of Hiranyakashipu",
        "text": "King Hiranyakashipu extracted from Brahma the most intricate boon of immortality: he could not be killed by man or beast, by god or demon, inside a house or outside, by day or by night, on the ground or in the sky, with living weapons or non-living tools. Believing himself invincible, he proclaimed himself the sole god of the cosmos."
      },
      {
        "title": "Chapter 2: The Unyielding Devotion of Young Prahlad",
        "text": "Born in the ashram of Sage Narada, young Prahlad absorbed the unshakeable truth of Narayana. When tortured by his father with deadly snake pits, charging royal tuskers, mountain cliffs, and boiling cauldrons, the boy remained in blissful trance, reciting the sacred Om Namo Narayanaya mantra with absolute calm."
      },
      {
        "title": "Chapter 3: The Shattering of the Crystal Pillar",
        "text": "Enraged, Hiranyakashipu pointed his golden mace at a crystal pillar in the throne hall: 'If your god is everywhere, is he in this stone pillar?' Prahlad replied: 'He is in the pillar, and in the rust of your mace.' With a scornful blow, the king struck the column. The pillar exploded with a roar that made the cosmic galaxies tremble."
      },
      {
        "title": "Chapter 4: The Twilight Slaying upon the Threshold",
        "text": "From the burst pillar stepped Lord Narasimha—with the fierce visage of a lion, glowing golden mane, and the torso of a mighty warrior. He dragged the tyrant to the threshold of the palace doorway, placed him across his lap at the hour of twilight, and with his sharp lion claws, vanquished the demon without violating a single syllable of Brahma's boon."
      },
      {
        "title": "Chapter 5: The Cooling of Ugra Narasimha: Lakshmi's Grace",
        "text": "The gods and Devas trembled before the blazing Ugra Narasimha until little Prahlad walked fearlessly forward and placed a fresh garland at the Lord's feet. The lion-god melted in tender parental love, lifting the boy upon his lap and transforming into the tranquil, smiling Lakshmi Narasimha."
      },
      {
        "title": "Chapter 6: The 9 Sanctuaries of Ahobilam",
        "text": "Deep in the Nallamala forests of Andhra Pradesh lies Ahobilam—the sacred geographical amphitheater where all nine forms (Nava Narasimha) are venerated: Jwala, Ahobila, Malola, Kroda, Pavana, Yogananda, Chatravata, Bhargava, and Karanja."
      }
    ]
  },
  {
    "id": "granth_kartikeya_vel",
    "cat": "sages",
    "catLabel": "⚔️ SAGES & AVATARS",
    "title": "Who is Lord Kartikeya? The Celestial General & Master of the Sacred Vel",
    "pages": 175,
    "chaptersCount": 6,
    "emoji": "⚡",
    "isPremium": false,
    "coverImg": "/images/kartikeya_murugan.jpg",
    "desc": "The commander-in-chief of the celestial hosts who wields the spear of supreme wisdom and vanquishes the three primal impurities.",
    "videoUrl": "https://www.youtube.com/embed/FEFWOTGWLoo",
    "chapters": [
      {
        "title": "Chapter 1: The Six Sparks of Shiva's Third Eye",
        "text": "To liberate the cosmos from the demonic dominance of Tarakasura, Lord Shiva opened his third eye, releasing six incandescent embers of pure consciousness. Agni and Vayu carried these divine sparks to the sacred reed lake Saravana, where the six Krittika sisters nursed the divine children before Mother Parvati embraced them into a single six-headed deity—Shanmukha."
      },
      {
        "title": "Chapter 2: The Bestowal of the Sacred Vel (Spear of Wisdom)",
        "text": "Goddess Parvati forged the invincible spear—the Vel—and handed it to her son. The broad blade represents vast wisdom (Agamya Jnana), the sharp point represents pinpoint intellect (Teekshna Buddhi), and the long shaft represents steadfast moral uprightness."
      },
      {
        "title": "Chapter 3: The Slaying of Soorapadman at Tiruchendur",
        "text": "On the seashore of Tiruchendur, Kartikeya led the Deva army against the shape-shifting titan Soorapadman. When the demon transformed into a giant mango tree in the ocean, Murugan hurled his Vel, splitting the tree into two halves: one became the magnificent peacock mount (Mayil), and the other became the triumphant rooster emblem on his flag."
      },
      {
        "title": "Chapter 4: The Fruit of Wisdom & The Palani Renunciation",
        "text": "When Sage Narada brought a divine mango of ultimate wisdom, Lord Shiva announced that whoever circled the world first would receive it. While Kartikeya flew around the earth on his peacock, Ganesha simply circled his parents, declaring them to be the entire cosmos. Murugan realized that true wisdom lies in detachment, taking up the ascetic staff atop the sacred Palani hill."
      },
      {
        "title": "Chapter 5: The Arupadai Veedu: Six Sacred Abodes",
        "text": "The six pilgrimage citadels of Murugan—Thiruparankundram (marriage), Tiruchendur (victory), Palani (renunciation), Swamimalai (teaching Shiva the Pranava OM), Thiruthani (inner peace), and Pazhamudircholai (grace)—form the spiritual spine of southern India."
      },
      {
        "title": "Chapter 6: Subrahmanya & Kundalini Awakening",
        "text": "In yogic philosophy, Lord Murugan represents the awakened Kundalini Shakti rising through the Sushumna Nadi. The six heads correspond to the six lower Chakras, and the sharp tip of the Vel represents the opening of the thousand-petaled Sahasrara crown of enlightenment."
      }
    ]
  },
  {
    "id": "granth_parashurama_axe",
    "cat": "sages",
    "catLabel": "⚔️ SAGES & AVATARS",
    "title": "Who is Lord Parashurama? The 21 Cosmic Campaigns & The Sacred Western Coast",
    "pages": 180,
    "chaptersCount": 6,
    "emoji": "🪓",
    "isPremium": false,
    "coverImg": "/images/parashurama.jpg",
    "desc": "The immortal warrior sage who eradicated tyrannical monarchs, created the lush Western Ghats, and mentored Bhishma, Drona & Karna.",
    "videoUrl": "https://www.youtube.com/embed/UiWLSqkjEl8",
    "chapters": [
      {
        "title": "Chapter 1: The Hermitage on the Narmada & The Sacred Kamadhenu",
        "text": "Born as the fifth son of Sage Jamadagni and Renuka, Parashurama grew up in a tranquil Vedic hermitage on the banks of the Narmada river. The family guarded the divine wish-fulfilling cow Kamadhenu, which provided sacred oblations for all cosmic sacrifices."
      },
      {
        "title": "Chapter 2: The Tyranny of Kartavirya Arjuna & The Martyrdom",
        "text": "The thousand-armed monarch Kartavirya Arjuna visited the ashram and was fed sumptuously by Kamadhenu. In blind greed, the king stole the calf and ransacked the hermitage. When Jamadagni protested peacefully, the king's sons martyred the sage with twenty-one arrows."
      },
      {
        "title": "Chapter 3: The 21 Earthly Purges of Tyranny",
        "text": "Seeing the collapse of royal duty into brutal oppression, Parashurama took a vow before his father's funeral pyre: he would cleanse the earth of corrupt warlords twenty-one times. Wielding the divine battle-axe given by Lord Shiva, he restored moral equilibrium to the continent."
      },
      {
        "title": "Chapter 4: The Reclamation of the Western Coast",
        "text": "Having donated all conquered lands to Sage Kashyapa, Parashurama stood atop the cliffs of Gokarna with no place to rest. He flung his sacred battle-axe across the Arabian Sea, commanding the ocean waters to retreat back to the horizon. The fertile coastal paradise from Konkan to Kanyakumari emerged as Parashurama Kshetra."
      },
      {
        "title": "Chapter 5: Guru to the Legends: Bhishma, Drona & Karna",
        "text": "As the supreme master of Dhanurveda and Brahmastra warfare, Parashurama trained the greatest heroes of the Mahabharata. He granted the celestial bow Vijaya to Karna, divine missile secrets to Bhishma, and military treatises to Dronacharya."
      },
      {
        "title": "Chapter 6: The Mountain of Eternal Tapas: Mahendragiri",
        "text": "As one of the seven immortal Chiranjivis, Lord Parashurama resides in deep meditation atop the mist-shrouded Mahendragiri peaks in Odisha, awaiting the arrival of Kalki Avatar in the final age to serve as the divine martial preceptor."
      }
    ]
  },
  {
    "id": "granth_10_mahavidyas_tantra",
    "cat": "sages",
    "catLabel": "⚔️ SAGES & AVATARS",
    "title": "Who is Devi Mahakali? The 10 Mahavidyas & The Matrix of Cosmic Wisdom",
    "pages": 195,
    "chaptersCount": 6,
    "emoji": "🌺",
    "isPremium": false,
    "coverImg": "/images/mahakali_mahavidya.jpg",
    "desc": "The 10 cosmic wisdom goddesses of Shakti who govern time, cosmic space, speech, sound, destruction, and transcendental illumination.",
    "videoUrl": "https://www.youtube.com/embed/nEMdPjM0ahU",
    "chapters": [
      {
        "title": "Chapter 1: The Manifestation of the Ten Directions",
        "text": "When Lord Shiva attempted to stop Mother Sati from attending Daksha's sacrifice, the Goddess expanded her cosmic aura into ten radiant directions of space. Surrounding Mahadeva were the Ten Wisdom Goddesses (Dasha Mahavidyas), demonstrating that every aspect of the universe is pervaded by Shakti."
      },
      {
        "title": "Chapter 2: Kali & Tara: Primordial Time & Cosmic Deliverance",
        "text": "Kali represents the formless, all-consuming black fire of Time (Kala) that dissolves all material attachments. Tara represents the compassionate guiding star and sound vibration (Nadha) that ferries seekers across the ocean of worldly delusion."
      },
      {
        "title": "Chapter 3: Tripura Sundari & Bhuvaneshwari: Supreme Beauty & Space",
        "text": "Shodashi (Tripura Sundari) embodies the flawless geometric perfection of the Sri Yantra and cosmic bliss. Bhuvaneshwari represents the infinite curvature of cosmic space within which the 14 planetary spheres dance."
      },
      {
        "title": "Chapter 4: Bhairavi & Chhinnamasta: Radiance & Ego Sacrifice",
        "text": "Tripura Bhairavi is the blazing inner fire of Tapasya that burns impurities. Chhinnamasta, who holds her own severed head while feeding her attendants, symbolizes the radical yogic severance of the ego and mastery over Kundalini life-force."
      },
      {
        "title": "Chapter 5: Dhumavati & Bagalamukhi: The Void & The Stunner",
        "text": "Dhumavati, the smoke-shrouded grandmother goddess, reveals the hidden wisdom in loneliness, poverty, and void. Bagalamukhi possesses the supreme power of Stambhana—paralyzing all negative thoughts, gossip, and destructive forces."
      },
      {
        "title": "Chapter 6: Matangi & Kamala: Sacred Speech & Golden Wealth",
        "text": "Matangi is the master of spoken word, music, arts, and esoteric knowledge outside societal orthodoxies. Kamala, seated upon the blossoming lotus, is the golden Goddess of spiritual and material abundance, completing the 10-fold mandala of reality."
      }
    ]
  },
  {
    "id": "granth_garuda_amrita_heist",
    "cat": "morals",
    "catLabel": "🧒 MORAL & HEROIC EPICS",
    "title": "The Celestial Heist: Garuda's Epic Quest for the Amrita of Immortality",
    "pages": 170,
    "chaptersCount": 6,
    "emoji": "🦅",
    "isPremium": false,
    "coverImg": "/images/garuda_amrita.jpg",
    "desc": "How the king of birds challenged the Devas of Swarga to liberate his mother Vinata, establishing his eternal glory alongside Vishnu.",
    "videoUrl": "https://www.youtube.com/embed/rQf6Fkh-Y70",
    "chapters": [
      {
        "title": "Chapter 1: The Deceit of Kadru & The Bondage of Vinata",
        "text": "In the ancient celestial era, Kadru (mother of serpents) and Vinata (mother of birds) observed the white stallion Uchchaihshravas emerging from the ocean. Kadru wagered that the tail was black, forcing her snake children to cling to the tail to deceive Vinata, plunging her into cruel servitude."
      },
      {
        "title": "Chapter 2: The Price of Liberty: The Pot of Celestial Nectar",
        "text": "Garuda, born with golden wings that spanned mountains, asked the serpents what price would buy his mother's unconditional freedom. The Nagas demanded the sacred pot of Amrita (nectar of immortality) guarded in the impenetrable fortress of Indra's paradise."
      },
      {
        "title": "Chapter 3: The Gathering of Cosmic Power & The Feast",
        "text": "Following his father Kashyapa's guidance, Garuda gathered cosmic energy by devouring the giant fighting elephant and tortoise without touching the sacred branch where the microscopic Valakhilya sages were meditating, displaying immense restraint and reverence."
      },
      {
        "title": "Chapter 4: Breaching the Fire-Walls & The Blade-Wheel",
        "text": "Ascending into Swarga, Garuda extinguished the celestial flames of Agni with waters drawn from 8,100 rivers, smashed through the spinning wheel of razor blades, and blinded the two venomous guardian dragons with dust whipped up by his golden wings."
      },
      {
        "title": "Chapter 5: The Pact with Lord Vishnu",
        "text": "Carrying the glowing pot of nectar, Garuda encountered Lord Vishnu in mid-air. Impressed that Garuda had not tasted a single drop of the immortal elixir despite holding it in his beak, Vishnu granted him immortality without drinking Amrita, making him his supreme vehicle and emblem."
      },
      {
        "title": "Chapter 6: The Kusha Grass & The Split Tongues of Serpents",
        "text": "Garuda placed the Amrita pot on sharp Kusha (Darbha) grass before the Nagas, successfully securing his mother's immediate release. As the serpents rushed to bathe before drinking, Indra snatched the vessel away. The Nagas licked the sharp grass blades, causing their tongues to be split in two forever."
      }
    ]
  },
  {
    "id": "granth_hanuman_rudra_avatar",
    "cat": "morals",
    "catLabel": "🧒 MORAL & HEROIC EPICS",
    "title": "Who is Lord Hanuman? The 11th Rudra Avatar & The 8 Supernatural Siddhis",
    "pages": 185,
    "chaptersCount": 6,
    "emoji": "🔱",
    "isPremium": false,
    "coverImg": "/images/hanuman_cover.jpg",
    "desc": "The embodiment of devotion, strength, and intellect who bridged the ocean, moved mountains, and commands the 8 mystical Siddhis.",
    "videoUrl": "https://www.youtube.com/embed/iaW4C8Laif4",
    "chapters": [
      {
        "title": "Chapter 1: The Child of Anjana & The Leap for the Sun",
        "text": "Born as the 11th Rudra manifestation through the blessings of Vayu, infant Hanuman saw the glowing morning sun and mistook it for a ripe golden fruit. He leaped across the sky, astonishing the celestial realm and out-speeding Rahu on the solar eclipse."
      },
      {
        "title": "Chapter 2: The Thunderbolt of Indra & The Divine Boons",
        "text": "When Indra struck the child's jaw (Hanu) with his Vajra, Vayu stopped all atmospheric breath in the cosmos. To appease the wind god, the Trimurti and all Devas endowed Hanuman with total immunity from fire, water, weapons, aging, and mortality."
      },
      {
        "title": "Chapter 3: The 8 Siddhis: Mastery of Mind and Form",
        "text": "Hanuman mastered the Ashta Siddhis under Surya Bhagavan: Anima (reducing size), Mahima (growing vast), Garima (becoming heavy as a mountain), Laghima (becoming light as air), Prapti (traversing anywhere), Prakamya (unmatched will), Ishitva (divine lordship), and Vashitva (harmonizing all beings)."
      },
      {
        "title": "Chapter 4: The 100-Yojana Ocean Leap & The Rescue of Sita",
        "text": "Expanding into his colossal Viswaroopa, Hanuman leaped across the 800-mile ocean, outsmarting Surasa and slaying Simhika. In the Ashoka Vatika, he delivered Rama's signet ring to Mother Sita, restoring celestial hope across the three worlds."
      },
      {
        "title": "Chapter 5: Lifting the Sanjeevani Mountain (Dronagiri)",
        "text": "When Lakshmana was struck by Indrajit's mystical spear, Hanuman flew across India to the Himalayas before sunrise. Unable to identify the exact herb among the glowing foliage, he lifted the entire Dronagiri peak upon his palm, flying across the night sky to save his beloved prince."
      },
      {
        "title": "Chapter 6: Panchamukha Hanuman: The 5 Faces of Cosmic Shield",
        "text": "To extinguish the 5 lamps of Ahiravana in the netherworld simultaneously, Hanuman revealed his 5-faced form: East (Anjaneya), South (Narasimha), West (Garuda), North (Varaha), and Sky (Hayagriva), creating the ultimate protective shield of Sanatana Dharma."
      }
    ]
  },
  {
    "id": "granth_venkateswara_leela_balaji",
    "cat": "sanatana",
    "catLabel": "🕉️ COSMIC SANATANA",
    "title": "Who is Lord Venkateswara? The Tirumala Descent & The Eternal Debt of Love",
    "pages": 180,
    "chaptersCount": 6,
    "emoji": "✨",
    "isPremium": false,
    "coverImg": "/images/venkateswara_tirumala.jpg",
    "desc": "The Lord of the Seven Hills of Tirumala who descended to earth to protect devotees in the Kali Yuga and repay the golden debt of love.",
    "videoUrl": "https://www.youtube.com/embed/59YYd1rkZRQ",
    "chapters": [
      {
        "title": "Chapter 1: The Test of Sage Bhrigu & Lakshmi's Departure",
        "text": "When the Rishis on the banks of the Ganga sought to dedicate their great sacrifice to the most patient deity, Sage Bhrigu tested Brahma, Shiva, and Vishnu. Vishnu's calm hospitality pacified the sage, but Goddess Lakshmi departed Vaikuntha in righteous anger, descending to Kolhapur."
      },
      {
        "title": "Chapter 2: The Seshachala Hills & The Anthill Tapas",
        "text": "Longing for Lakshmi, Lord Narayana descended to the sacred Seshachala mountain range (the seven hoods of Adisesha) as Srinivasa, sitting in deep meditation inside an anthill under a tamarind tree for thousands of years."
      },
      {
        "title": "Chapter 3: The Cow of Chola & The Blood on the Crown",
        "text": "A divine cow secretly poured milk into the anthill daily to sustain the Lord. When the royal cowherd struck the cow with an axe in frustration, Srinivasa emerged from the anthill to take the blow upon his own forehead, staining his sacred crown."
      },
      {
        "title": "Chapter 4: The Marriage with Princess Padmavati",
        "text": "Princess Padmavati (incarnation of Vedavati and Lakshmi) met Lord Srinivasa in the forest. King Akasa Raja arranged the magnificent wedding in Narayanavanam, bringing harmony between heaven and earth."
      },
      {
        "title": "Chapter 5: The Golden Loan from Lord Kubera",
        "text": "To host the grand wedding for the entire cosmos, Srinivasa borrowed fourteen million golden Ramamudra coins from Kubera. The sacred bond stipulated that the interest would be repaid through the voluntary offerings of devotees throughout the Kali Yuga."
      },
      {
        "title": "Chapter 6: The Ananda Nilayam: Epicenter of Global Devotion",
        "text": "Today, Tirumala stands as the spiritual jewel of India where millions of pilgrims shave their heads in humble surrender, receive the sacred Laddus, and witness the timeless majesty of the Lord of Seven Hills."
      }
    ]
  },
  {
    "id": "granth_kailash_axis_mundi",
    "cat": "sanatana",
    "catLabel": "🕉️ COSMIC SANATANA",
    "title": "The Cosmic Secrets of Mount Kailash: The Axis Mundi of the Universe",
    "pages": 190,
    "chaptersCount": 6,
    "emoji": "🏔️",
    "isPremium": false,
    "coverImg": "/images/ellora_kailasa.jpg",
    "desc": "The unclimbed four-faced pyramid mountain that stands at the magnetic center of the world, housing the eternal abode of Shiva and Parvati.",
    "videoUrl": "https://www.youtube.com/embed/5D3CeeZ6X1s",
    "chapters": [
      {
        "title": "Chapter 1: The Unclimbed Pyramid & Cardinal Geometry",
        "text": "Rising 21,778 feet into the Tibetan sky, Mount Kailash possesses a unique four-sided pyramid shape precisely aligned with the four cardinal directions: North (Gold), South (Lapis Lazuli), East (Crystal), and West (Ruby)."
      },
      {
        "title": "Chapter 2: Lake Mansarovar & Rakshastal: Light & Shadow",
        "text": "At the base of Kailash lie two contrasting lakes: Mansarovar (circular, solar, sweet water representing consciousness and clarity) and Rakshastal (crescent, lunar, salty water representing the subconscious mind and raw elemental force)."
      },
      {
        "title": "Chapter 3: The 4 Great Rivers of Asia",
        "text": "From the four faces of Kailash emerge four life-giving river systems: the Indus (Lion mouth), the Sutlej (Elephant mouth), the Brahmaputra (Horse mouth), and the Karnali-Ganges (Peacock mouth), sustaining over 1.5 billion people across the continent."
      },
      {
        "title": "Chapter 4: The Parikrama: The 52-Kilometer Cosmic Circuit",
        "text": "Pilgrims from around the world perform the 52-kilometer circumambulation (Kora) around the peak, crossing the perilous 18,600-foot Dolma La pass where old karmic baggage is symbolically left behind."
      },
      {
        "title": "Chapter 5: Time Anomalies & Sonic Resonance",
        "text": "Travelers and mountaineers have documented strange electromagnetic and temporal phenomena near the peak, including accelerated growth of nails and hair, and acoustic resonances matching the primordial vibration of OM (AUM)."
      },
      {
        "title": "Chapter 6: The Inner Kailash: Seat of Pure Consciousness",
        "text": "In the highest teachings of Sanatana philosophy, Mount Kailash is not merely a geological mountain—it is the Sahasrara Chakra of planet Earth and the immovable center of inner stillness within every human heart."
      }
    ]
  }
];


    this.granthsData = granths;

    // Render Granth Cards in Horizontal Slider with 6 Free & 10 Premier Badges
    const renderGranthSlider = (category) => {
      self.isSubscribed = (typeof DatabaseService !== 'undefined' && DatabaseService.isSubscribed()) || !!self.isSubscribed;
      const filtered = category === 'all' ? granths : granths.filter(function(g) { return g.cat === category; });
      sliderRow.innerHTML = filtered.map(function(g) {
        const isLocked = g.isPremium && !self.isSubscribed;
        
        let tierBadge = '';
        if (!g.isPremium) {
          tierBadge = '<span class="text-[9px] font-extrabold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.8 rounded-md backdrop-blur-md flex items-center gap-1 shadow-sm">✨ FREE CLASSIC</span>';
        } else if (isLocked) {
          tierBadge = '<span class="text-[9px] font-extrabold text-amber-300 bg-black/85 border border-amber-500/50 px-2 py-0.8 rounded-md backdrop-blur-md flex items-center gap-1 shadow-sm">🔒 PRO PREMIER</span>';
        } else {
          tierBadge = '<span class="text-[9px] font-extrabold text-gold bg-black/85 border border-gold/50 px-2 py-0.8 rounded-md backdrop-blur-md flex items-center gap-1 shadow-sm">👑 PRO UNLOCKED</span>';
        }

        const overlayCta = isLocked 
          ? '<div class="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-black font-extrabold text-xs uppercase tracking-wider shadow-xl shadow-amber-500/30 transform scale-90 group-hover:scale-100 transition-transform flex items-center gap-1.5">🔒 Unlock with ₹399 Pass</div>'
          : '<div class="px-4 py-2 rounded-xl bg-gold text-black font-extrabold text-xs uppercase tracking-wider shadow-lg shadow-gold/30 transform scale-90 group-hover:scale-100 transition-transform flex items-center gap-1.5">📖 Read 150+ Page Book</div>';

        const bottomBtn = isLocked
          ? '<button class="read-granth-btn w-full py-2 rounded-xl bg-amber-500/15 hover:bg-gradient-to-r hover:from-gold hover:to-amber-500 hover:text-black border border-amber-500/40 hover:border-gold text-amber-300 font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm" data-granth-id="' + g.id + '"><span>🔒</span> <span>Unlock Premier Granth (₹399)</span></button>'
          : '<button class="read-granth-btn w-full py-2 rounded-xl bg-white/5 hover:bg-gold hover:text-black border border-white/10 hover:border-gold text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm" data-granth-id="' + g.id + '"><span>📖</span> <span>Read Full Granth (' + g.pages + 'p)</span></button>';

        return '<div class="granth-card flex-shrink-0 w-72 sm:w-80 rounded-2xl overflow-hidden bg-[#0e1017] border border-white/[0.08] cursor-pointer relative group transition-all duration-300 hover:border-gold/50 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-gold/15 flex flex-col justify-between" data-granth-id="' + g.id + '">' +
          '<div class="h-48 w-full relative flex flex-col justify-between p-4 overflow-hidden">' +
            '<img src="' + g.coverImg + '" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" alt="' + g.title + '">' +
            '<div class="absolute inset-0 bg-gradient-to-t from-[#07080c] via-[#07080c]/30 to-transparent z-15 pointer-events-none"></div>' +
            '<div class="flex justify-between items-start w-full relative z-20 gap-1">' +
              tierBadge +
              '<span class="text-[9px] font-extrabold text-gold bg-black/70 border border-gold/40 px-2 py-0.8 rounded-md backdrop-blur-md flex-shrink-0">' +
                '📖 ' + g.pages + 'p' +
              '</span>' +
            '</div>' +
            '<div class="text-white z-20 relative">' +
              '<h4 class="font-bold text-sm sm:text-base font-serif line-clamp-2 leading-snug drop-shadow-md text-white/95">' + g.title + '</h4>' +
              '<p class="text-[10px] text-gold font-mono mt-0.5">' + g.chaptersCount + ' Deep Chapters &bull; Complete Granth</p>' +
            '</div>' +
            '<div class="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20 backdrop-blur-[2px]">' +
              overlayCta +
            '</div>' +
          '</div>' +
          '<div class="p-4 flex-grow flex flex-col justify-between space-y-3 bg-[#0d0f15]">' +
            '<p class="text-xs text-white/70 line-clamp-2 leading-relaxed">' +
              g.desc +
            '</p>' +
            bottomBtn +
          '</div>' +
        '</div>';
      }).join('');

      // Bind Clicks on Granth Cards (Locks vs Free Readers)
      sliderRow.querySelectorAll('.granth-card, .read-granth-btn').forEach(function(el) {
        el.addEventListener('click', function(e) {
          e.stopPropagation();
          const granthId = el.getAttribute('data-granth-id');
          const granth = granths.find(function(g) { return g.id === granthId; });
          if (!granth) return;
          
          self.isSubscribed = (typeof DatabaseService !== 'undefined' && DatabaseService.isSubscribed()) || !!self.isSubscribed;
          const isLocked = granth.isPremium && !self.isSubscribed;
          
          if (isLocked) {
            if (window.appInstance) window.appInstance.openPaymentModal();
          } else {
            if (window.appInstance) window.appInstance.openGranthReader(granth);
          }
        });
      });
    };

    // Initial render of all 26 granths
    renderGranthSlider('all');

    // Slider Previous / Next Arrows
    const SCROLL_STEP = 340;
    if (prevBtn) {
      prevBtn.onclick = function() {
        sliderRow.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' });
      };
    }
    if (nextBtn) {
      nextBtn.onclick = function() {
        sliderRow.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' });
      };
    }

    // Category Filter Buttons
    document.querySelectorAll('.granth-tab-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        document.querySelectorAll('.granth-tab-btn').forEach(function(b) {
          b.className = "granth-tab-btn flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border border-white/10 bg-white/5 text-white/70 hover:border-gold/40 hover:text-white transition-all cursor-pointer whitespace-nowrap";
        });
        btn.className = "granth-tab-btn flex-shrink-0 px-3.5 py-1.5 rounded-full text-xs font-bold border border-gold bg-gold text-black transition-all cursor-pointer whitespace-nowrap shadow-md shadow-gold/20";
        
        const cat = btn.getAttribute('data-cat');
        renderGranthSlider(cat);
      });
    });

    // Close Reader Modal
    if (closeBtn && modal) {
      closeBtn.onclick = function() {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      };
    }
  }

  openGranthReader(granth) {
    if (granth) {
      this.updateDynamicSEO(granth.title, granth.desc, granth.coverImg, `#granth-${granth.id}`);
    }
    this.isSubscribed = (typeof DatabaseService !== 'undefined' && DatabaseService.isSubscribed()) || !!this.isSubscribed;
    if (granth.isPremium && !this.isSubscribed) {
      this.openPaymentModal();
      return;
    }

    const modal = document.getElementById('granth-reader-modal');
    if (!modal) return;

    let currentChapter = 0;
    let isParchment = false;
    let fontSize = 16;

    const titleEl = document.getElementById('reader-book-title');
    const metaEl = document.getElementById('reader-book-meta');
    const emojiEl = document.getElementById('reader-book-emoji');
    const tocList = document.getElementById('reader-toc-list');
    const bodyEl = document.getElementById('reader-manuscript-body');
    const pageInd = document.getElementById('reader-page-indicator');
    const prevChapBtn = document.getElementById('reader-prev-chapter-btn');
    const nextChapBtn = document.getElementById('reader-next-chapter-btn');
    const themeBtn = document.getElementById('reader-theme-toggle-btn');
    const fontDecBtn = document.getElementById('reader-font-dec-btn');
    const fontIncBtn = document.getElementById('reader-font-inc-btn');
    const canvasEl = document.getElementById('reader-content-canvas');
    const videoBtn = document.getElementById('reader-video-toggle-btn');
    const videoTheatre = document.getElementById('reader-video-theatre');
    const videoIframe = document.getElementById('reader-video-iframe');
    const closeVideoBtn = document.getElementById('close-video-theatre-btn');

    if (titleEl) titleEl.textContent = granth.title;
    if (emojiEl) emojiEl.textContent = granth.emoji;

    // Configure Video Theatre (Separate from chapters)
    if (videoBtn) {
      if (granth.videoUrl) {
        videoBtn.classList.remove('hidden');
        videoBtn.onclick = function() {
          if (videoTheatre && videoIframe) {
            const isHidden = videoTheatre.classList.contains('hidden');
            if (isHidden) {
              videoTheatre.classList.remove('hidden');
              videoIframe.src = granth.videoUrl + '?autoplay=1';
              videoBtn.innerHTML = '✕ <span>Hide Video</span>';
            } else {
              videoTheatre.classList.add('hidden');
              videoIframe.src = '';
              videoBtn.innerHTML = '🎬 <span>Watch Video</span>';
            }
          }
        };
      } else {
        videoBtn.classList.add('hidden');
      }
    }

    if (closeVideoBtn && videoTheatre && videoIframe) {
      closeVideoBtn.onclick = function() {
        videoTheatre.classList.add('hidden');
        videoIframe.src = '';
        if (videoBtn) videoBtn.innerHTML = '🎬 <span>Watch Video</span>';
      };
    }

    // Render Pure Sacred Palm-Leaf Granth Chapter
    const renderChapter = function() {
      const ch = granth.chapters[currentChapter] || granth.chapters[0];
      if (metaEl) metaEl.textContent = granth.pages + " Pages • Chapter " + (currentChapter + 1) + " of " + granth.chapters.length;
      if (pageInd) pageInd.textContent = "Granth Chapter " + (currentChapter + 1) + " of " + granth.chapters.length + " (Pages 1–" + granth.pages + ")";

      if (bodyEl) {
        const firstLetter = ch.text ? ch.text.charAt(0) : '';
        const remainingText = ch.text ? ch.text.slice(1) : '';

        bodyEl.innerHTML = '<div class="space-y-6">' +
          // 1. Sacred Invocational Shloka Header
          '<div class="text-center py-2 border-b border-gold/20 flex flex-col items-center justify-center space-y-1">' +
            '<span class="text-[11px] font-mono tracking-widest text-gold uppercase opacity-80">॥ ॐ तत्सत् श्री परमात्मने नमः ॥</span>' +
            '<span class="text-xs font-serif italic text-white/50 tracking-wider">Sacred Palm-Leaf Digital Granthalaya • Grand Manuscript</span>' +
          '</div>' +

          // 2. Granth Chapter Title Plate
          '<div class="text-center py-4 border-y-2 border-double border-gold/40 bg-gradient-to-r from-transparent via-gold/10 to-transparent my-4">' +
            '<span class="text-[10px] font-mono text-gold font-bold uppercase tracking-widest px-3 py-0.5 rounded-full border border-gold/30 bg-black/40">CHAPTER ' + (currentChapter + 1) + ' OF ' + granth.chapters.length + '</span>' +
            '<h2 class="text-xl sm:text-3xl font-bold font-serif text-gold mt-2 tracking-wide drop-shadow">' + ch.title + '</h2>' +
          '</div>' +

          // 3. Ornate Palm-Leaf Manuscript Body with Illuminated Drop-Cap
          '<div class="relative py-2 px-1 sm:px-4">' +
            '<div class="leading-relaxed text-justify font-serif text-[#e4d5b7] tracking-normal transition-all" style="font-size: ' + fontSize + 'px; line-height: 1.85;">' +
              '<span class="float-left text-5xl sm:text-6xl font-serif text-gold font-bold mr-3.5 leading-none drop-shadow-md border-b-2 border-gold/40 pb-1">' + firstLetter + '</span>' +
              remainingText +
            '</div>' +
          '</div>' +

          // 4. Sacred Lotus Divider
          '<div class="flex items-center justify-center gap-3 py-4 text-gold/60 text-sm">' +
            '<span>🪷</span><span class="text-xs font-mono tracking-widest">✦ ॥ शुभमस्तु ॥ ✦</span><span>🪷</span>' +
          '</div>' +

          // 5. Authentic Historical & Philosophical Commentary Parchment Box
          '<div class="p-5 rounded-2xl bg-[#14120c] border border-gold/30 my-6 shadow-xl relative overflow-hidden space-y-2">' +
            '<div class="flex items-center gap-2">' +
              '<span class="text-base">🏛️</span>' +
              '<h4 class="font-bold text-gold font-serif text-xs uppercase tracking-wider">Sacred Granth Pariksha & Epigraphical Commentary</h4>' +
            '</div>' +
            '<p class="text-xs text-white/80 leading-relaxed font-sans">' +
              'This sacred chronicle is verified against classical Sanskrit palm-leaf manuscripts, Puranic commentaries, and ASI archaeological epigraphy. It demonstrates the profound integration of Vedic metaphysics, ethical statecraft, and human liberation.' +
            '</p>' +
          '</div>' +
        '</div>';
      }

      // Update TOC Active State
      if (tocList) {
        tocList.querySelectorAll('.reader-toc-item').forEach(function(b, i) {
          if (i === currentChapter) {
            b.className = "reader-toc-item w-full text-left px-3 py-2.5 rounded-xl text-xs transition-all bg-gold/20 text-gold border border-gold/50 font-bold flex items-center justify-between shadow-sm";
          } else {
            b.className = "reader-toc-item w-full text-left px-3 py-2 rounded-xl text-xs transition-all text-white/70 hover:bg-white/5 hover:text-white flex items-center justify-between";
          }
        });
      }

      // Prev / Next button states
      if (prevChapBtn) {
        prevChapBtn.disabled = currentChapter === 0;
        prevChapBtn.style.opacity = currentChapter === 0 ? "0.4" : "1";
      }
      if (nextChapBtn) {
        nextChapBtn.textContent = currentChapter === granth.chapters.length - 1 ? "Finish Reading ✓" : "Next Chapter ▶";
      }
    };

    // Render TOC List
    if (tocList) {
      tocList.innerHTML = granth.chapters.map(function(ch, idx) {
        return '<button class="reader-toc-item w-full text-left px-3 py-2 rounded-xl text-xs transition-all ' + (idx === currentChapter ? 'bg-gold/20 text-gold border border-gold/50 font-bold' : 'text-white/70 hover:bg-white/5 hover:text-white') + ' flex items-center justify-between cursor-pointer" data-chap-idx="' + idx + '">' +
          '<span class="line-clamp-1">' + ch.title + '</span>' +
          '<span class="text-[9px] font-mono opacity-60 ml-1 flex-shrink-0">Ch ' + (idx + 1) + '</span>' +
        '</button>';
      }).join('');

      tocList.querySelectorAll('.reader-toc-item').forEach(function(btn) {
        btn.onclick = function() {
          currentChapter = parseInt(btn.getAttribute('data-chap-idx'));
          renderChapter();
        };
      });
    }

    // Prev / Next Chapter Click
    if (prevChapBtn) {
      prevChapBtn.onclick = function() {
        if (currentChapter > 0) {
          currentChapter--;
          renderChapter();
        }
      };
    }
    if (nextChapBtn) {
      nextChapBtn.onclick = function() {
        if (currentChapter < granth.chapters.length - 1) {
          currentChapter++;
          renderChapter();
        } else {
          modal.classList.add('hidden');
          modal.classList.remove('flex');
          if (videoIframe) videoIframe.src = '';
        }
      };
    }

    // Theme Toggle (Parchment vs Obsidian Dark)
    if (themeBtn && canvasEl) {
      themeBtn.onclick = function() {
        isParchment = !isParchment;
        if (isParchment) {
          canvasEl.style.backgroundColor = "#f4ebd0";
          canvasEl.style.color = "#2a1e10";
          themeBtn.textContent = "🌑 Dark Mode";
        } else {
          canvasEl.style.backgroundColor = "#090b10";
          canvasEl.style.color = "#f3f4f6";
          themeBtn.textContent = "📜 Parchment";
        }
      };
    }

    // Font Sizing
    if (fontDecBtn) {
      fontDecBtn.onclick = function() {
        if (fontSize > 12) {
          fontSize -= 2;
          renderChapter();
        }
      };
    }
    if (fontIncBtn) {
      fontIncBtn.onclick = function() {
        if (fontSize < 26) {
          fontSize += 2;
          renderChapter();
        }
      };
    }

    renderChapter();

    // Show Modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AppController();
  });
} else {
  new AppController();
}
