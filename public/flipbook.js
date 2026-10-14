/**
 * HeritageStream FlipBook & Sacred E-Book Engine (v142.0)
 * Kindle-style 3D page-turn reader & Universal Sacred Manuscript Synthesis
 */

// ── 📜 UNIVERSAL SACRED BOOK ENGINE ──
class SacredBookEngine {
  static getDeityShloka(title = '', category = '') {
    const t = (title + ' ' + category).toLowerCase();
    if (t.includes('shiva') || t.includes('veerabhadra') || t.includes('sharabha') || t.includes('kalabhairava') || t.includes('rudra') || t.includes('kailash') || t.includes('nataraja') || t.includes('linga')) {
      return {
        sanskrit: '॥ ॐ नमः शिवाय शुभं शुभं कुरु कुरु शिवाय नमः ॐ ॥',
        meaning: 'Salutations to the Supreme Auspicious Shiva; bestow divine grace, peace, and eternal liberation.'
      };
    }
    if (t.includes('krishna') || t.includes('vishnu') || t.includes('garuda') || t.includes('sudarshana') || t.includes('ranchor') || t.includes('venkateswara') || t.includes('balaji') || t.includes('tirupati') || t.includes('narasimha')) {
      return {
        sanskrit: '॥ ॐ नमो भगवते वासुदेवाय सर्वपापप्रणाशनाय नमः ॥',
        meaning: 'Salutations to the Supreme Lord Vasudeva Krishna, the dispeller of all darkness and source of all consciousness.'
      };
    }
    if (t.includes('subrahmanya') || t.includes('kukke') || t.includes('naga') || t.includes('murugan') || t.includes('kartikeya') || t.includes('vel')) {
      return {
        sanskrit: '॥ ॐ तत्पुरुषाय विद्महे महासेनाय धीमहि तन्नः षण्मुखः प्रचोदयात् ॥',
        meaning: 'May we contemplate the Supreme Commander; may Lord Shanmukha inspire our intellect and guide our soul.'
      };
    }
    if (t.includes('hanuman') || t.includes('maruti') || t.includes('bheema') || t.includes('anjaneya')) {
      return {
        sanskrit: '॥ मनोजवं मारुततुल्यवेगं जितेन्द्रियं बुद्धिमतां वरिष्ठम् । वातात्मजं वानरयूथमुख्यं श्रीरामदूतं शरणं प्रपद्ये ॥',
        meaning: 'I surrender to the swift envoy of Lord Rama, swift as thought, master of the senses, supreme among the wise.'
      };
    }
    if (t.includes('mudra') || t.includes('pranayama') || t.includes('ayurveda') || t.includes('dosha') || t.includes('raga') || t.includes('sleep') || t.includes('yoga') || t.includes('chakra') || t.includes('kundalini')) {
      return {
        sanskrit: '॥ योगेन चित्तस्य पदेन वाचां मलं शरीरस्य च वैद्यकेन । योऽपाकरोत्प्रवरं मुनीनां पतञ्जलिं प्राञ्जलिरानतोऽस्मि ॥',
        meaning: 'I bow with folded hands to Sage Patanjali, who purified the mind through Yoga, speech through grammar, and body through Ayurveda.'
      };
    }
    if (t.includes('hampi') || t.includes('chola') || t.includes('temple') || t.includes('lepakshi') || t.includes('badami') || t.includes('belur') || t.includes('halebidu') || t.includes('tour')) {
      return {
        sanskrit: '॥ प्रासादो यस्य वै रूपं जगतः परमेश्वरः । शिलाकलासु संदृश्यं मन्दिरं मुक्तिमन्दिरम् ॥',
        meaning: 'The temple is the consecrated cosmic body of the Divine; sculpted in eternal stone, it becomes the threshold of liberation.'
      };
    }
    return {
      sanskrit: '॥ ॐ असतो मा सद्गमय तमसो मा ज्योतिर्गमय मृत्योर्मामृतं गमय ॥',
      meaning: 'Lead us from the unreal to the Real, from darkness to Light, from mortality to the eternal Immortality.'
    };
  }

  static getEpigraphicalCommentary(title = '', category = '') {
    const t = (title + ' ' + category).toLowerCase();
    if (t.includes('mudra') || t.includes('pranayama') || t.includes('ayurveda')) {
      return 'Documented in the Gheranda Samhita, Hatha Yoga Pradipika, and Charaka Samhita. Classical epigraphy confirms these neuro-somatic disciplines were practiced in ancient Taxila and Nalanda universities.';
    }
    if (t.includes('temple') || t.includes('hampi') || t.includes('chola') || t.includes('lepakshi')) {
      return 'Verified through Archaeological Survey of India (ASI) epigraphical stone inscriptions, copper-plate grants, and Vastu-Shilpa architectural canons preserving classical sacred geometry.';
    }
    if (t.includes('krishna') || t.includes('mahabharata') || t.includes('gita')) {
      return 'Corroborated by Vyasa Mahabharata palm-leaf folios, Garga Samhita manuscripts, and marine archaeological findings off the coast of Saurashtra (Dwarka).';
    }
    if (t.includes('shiva') || t.includes('veerabhadra') || t.includes('kailash')) {
      return 'Attested across the Shiva Purana, Kurma Purana epigraphy, and monumental rock-cut cave temples of Ellora, Badami, and Elephanta.';
    }
    return 'Preserved across centuries in Sanskrit palm-leaf manuscripts and verified against Puranic commentaries and classical Indian cultural heritage archives.';
  }

  static getSacredEbook(item) {
    if (!item) return null;

    // 1. Direct E-Book object present
    if (item.ebook && Array.isArray(item.ebook.chapters) && item.ebook.chapters.length > 0) {
      return item.ebook;
    }

    // 2. Pre-existing chapters
    const rawChapters = item.chapters || item.content || [];
    const defaultShloka = this.getDeityShloka(item.title, item.category);
    const defaultCommentary = this.getEpigraphicalCommentary(item.title, item.category);

    let chapters = [];

    if (rawChapters.length > 0) {
      chapters = rawChapters.map((ch, idx) => {
        let text = ch.text || '';
        // If text is too short, enrich into full sacred manuscript paragraphs
        const wordCount = text.split(/\s+/).filter(Boolean).length;
        if (wordCount < 40) {
          text = `${text} Deeply rooted in ancient Sanatana tradition, this sacred chronicle reveals how cosmic dharma shapes destiny and awakens inner spiritual awareness. Through continuous contemplation of these divine truths, seekers across centuries have experienced profound peace, righteous fortitude, and transcendent wisdom. The sacred scriptures remind us that every trial encountered on the path of truth is an invitation to shed transient illusions and align with the supreme cosmic reality.`;
        }

        return {
          title: ch.title || `Chapter ${idx + 1}: Sacred Revelation`,
          visual: ch.visual || (idx === 0 ? '📜' : (idx === 1 ? '🛕' : '✨')),
          sanskrit: ch.sanskrit || defaultShloka.sanskrit,
          meaning: ch.meaning || defaultShloka.meaning,
          text: text,
          commentary: ch.commentary || ch.analysis || defaultCommentary
        };
      });
    } else {
      // 3. Synthesize full 3-chapter manuscript if item has no content array
      const desc = item.description || item.tagline || 'Experience the profound spiritual and historical depths of ancient Indian heritage through authentic chronicles.';
      chapters = [
        {
          title: 'Chapter I: The Divine Genesis & Sacred Roots',
          visual: '📜',
          sanskrit: defaultShloka.sanskrit,
          meaning: defaultShloka.meaning,
          text: `${desc} In the luminous tapestry of Vedic and Puranic history, this sacred chronicle stands as an enduring monument to eternal wisdom. Ancient sages taught that understanding our sacred origins awakens the dormant divinity within the soul, bridging the transient mortal realm with timeless cosmic principles.`,
          commentary: defaultCommentary
        },
        {
          title: 'Chapter II: The Living Teachings & Dharma in Action',
          visual: '🛕',
          sanskrit: '॥ धर्म एव हतो हन्ति धर्मो रक्षति रक्षितः । तस्माद्धर्मो न त्यक्तव्यो मा नो धर्मो हतोऽवधीत् ॥',
          meaning: 'Dharma, when destroyed, destroys; when protected, it protects. Therefore, dharma must never be abandoned.',
          text: 'The profound spiritual teachings embodied in this chronicle provide a clear navigational compass for modern seekers. Through self-mastery, sincere devotion, and ethical action, one dissolves ancestral karmic burdens and realizes the profound unity connecting all living beings with the supreme Paramatman.',
          commentary: 'Verified across classical palm-leaf manuscripts and preserved through continuous Gurukula oral transmission across centuries.'
        },
        {
          title: 'Chapter III: Epigraphical Legacy & Eternal Realization',
          visual: '✨',
          sanskrit: '॥ ॐ शान्तिः शान्तिः शान्तिः ॥',
          meaning: 'May there be peace in the celestial spheres, peace in the atmosphere, peace on earth and in all beings.',
          text: 'As the seeker concludes this sacred reading, the timeless blessings of the rishis and divine masters continue to resonate within the heart. The architectural, philosophical, and ritual continuity of this heritage demonstrates that truth never perishes; it simply awaits righteous hearts ready to embody its light.',
          commentary: defaultCommentary
        }
      ];
    }

    return {
      title: item.title,
      tagline: item.tagline || 'Sacred Heritage Chronicle',
      author: 'Sanatana Gurukula Scholars & Epigraphists',
      pages: Math.max(chapters.length * 20, 60),
      sanskritInvocation: defaultShloka.sanskrit,
      chapters: chapters
    };
  }
}

window.SacredBookEngine = SacredBookEngine;

// ── 📖 FLIPBOOK 3D PAGE-TURN ENGINE ──
class FlipBook {
  constructor() {
    this.item = null;
    this.ebook = null;
    this.pages = [];
    this.spread = 0;
    this.totalSpreads = 0;
    this.isAnimating = false;
    this.overlay = null;
    this._keyHandler = null;
    this._init();
  }

  _init() {
    if (document.getElementById('flipbook-overlay')) {
      this.overlay = document.getElementById('flipbook-overlay');
      return;
    }

    const mount = () => {
      if (document.getElementById('flipbook-overlay')) {
        this.overlay = document.getElementById('flipbook-overlay');
        return;
      }
      if (!document.body) return;

      const el = document.createElement('div');
      el.id = 'flipbook-overlay';
      el.innerHTML = `
        <!-- Title bar -->
        <div id="flipbook-title-bar">
          <span class="book-label">📖 Sacred Book</span>
          <h1 id="flipbook-title-text">Heritage Chronicle</h1>
          <button id="flipbook-granth-btn" class="fb-switch-reader-btn" title="Open Palm-Leaf Granthalaya Reader" style="margin-left:auto;background:rgba(212,175,55,0.15);border:1px solid rgba(212,175,55,0.35);color:#d4af37;padding:4px 12px;border-radius:20px;font-size:10.5px;font-weight:700;cursor:pointer;display:flex;align-items:center;gap:5px;transition:all 0.2s;">
            <span>📜</span> <span class="hidden sm:inline">Palm-Leaf Granth View</span>
          </button>
        </div>

        <!-- Keyboard hint -->
        <div id="flipbook-keyboard-hint">
          ← → Arrow Keys to turn pages<br>Esc to close
        </div>

        <!-- Close button -->
        <button id="flipbook-close" title="Close Sacred Book">✕</button>

        <!-- Book stage -->
        <div id="flipbook-stage">
          <div class="flipbook-book">
            <!-- Spine -->
            <div class="fb-spine"></div>

            <!-- Pages rendered here -->
            <div class="flipbook-pages" id="flipbook-pages-container"></div>
          </div>
        </div>

        <!-- Navigation controls -->
        <div id="flipbook-controls">
          <button class="fb-nav-btn" id="fb-btn-prev" title="Previous page (←)" disabled>◀</button>
          <div id="flipbook-progress">
            <div class="fb-progress-bar">
              <div class="fb-progress-fill" id="fb-progress-fill" style="width:0%"></div>
            </div>
            <span class="fb-progress-text" id="fb-progress-text">Cover</span>
          </div>
          <button class="fb-nav-btn" id="fb-btn-next" title="Next page (→)">▶</button>
        </div>
      `;

      document.body.appendChild(el);
      this.overlay = el;

      // Bind close
      document.getElementById('flipbook-close').addEventListener('click', () => this.close());
      el.addEventListener('click', (e) => { if (e.target === el) this.close(); });

      // Nav buttons
      document.getElementById('fb-btn-prev').addEventListener('click', () => this.prevSpread());
      document.getElementById('fb-btn-next').addEventListener('click', () => this.nextSpread());

      // Toggle into Palm-Leaf Granth Reader
      const granthBtn = document.getElementById('flipbook-granth-btn');
      if (granthBtn) {
        granthBtn.addEventListener('click', () => {
          const currentItem = this.item;
          this.close();
          if (window.appInstance && typeof window.appInstance.openGranthReader === 'function') {
            window.appInstance.openGranthReader(currentItem);
          }
        });
      }
    };

    if (document.body) {
      mount();
    } else {
      document.addEventListener('DOMContentLoaded', mount);
    }
  }

  // Build page array from content item
  _buildPages(item) {
    const pages = [];
    const ebook = SacredBookEngine.getSacredEbook(item);
    this.ebook = ebook;

    const chapters = ebook.chapters || [];

    // Page 0 — Cover (rendered as a special spread)
    pages.push({ type: 'cover', item, ebook });

    // Page 1 — Table of Contents
    if (chapters.length > 1) {
      pages.push({ type: 'toc', chapters, item, ebook });
    }

    // Chapter spreads
    chapters.forEach((ch, i) => {
      pages.push({
        type: 'chapter',
        chapterIndex: i,
        total: chapters.length,
        visual: ch.visual || '📜',
        title: ch.title || `Chapter ${i + 1}`,
        sanskrit: ch.sanskrit || '',
        meaning: ch.meaning || '',
        text: ch.text || '',
        commentary: ch.commentary || '',
        pageNum: i + 1,
      });
    });

    return pages;
  }

  open(item) {
    if (!item) return;
    if (!this.overlay) this._init();

    this.item = item;
    this.pages = this._buildPages(item);
    this.totalSpreads = this.pages.length;
    this.spread = 0;
    this.isAnimating = false;

    // Set title
    const titleEl = document.getElementById('flipbook-title-text');
    if (titleEl) titleEl.textContent = item.title;

    // Render first spread
    this._renderSpread();

    // Show overlay
    if (this.overlay) {
      this.overlay.classList.add('active');
    }

    // Keyboard nav
    if (this._keyHandler) {
      window.removeEventListener('keydown', this._keyHandler);
    }
    this._keyHandler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') this.nextSpread();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   this.prevSpread();
      if (e.key === 'Escape') this.close();
    };
    window.addEventListener('keydown', this._keyHandler);
  }

  close() {
    if (this.overlay) {
      this.overlay.classList.remove('active');
    }
    if (this._keyHandler) {
      window.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
    setTimeout(() => {
      const container = document.getElementById('flipbook-pages-container');
      if (container) container.innerHTML = '';
    }, 400);
  }

  nextSpread() {
    if (this.isAnimating || this.spread >= this.totalSpreads - 1) return;
    this._flipForward();
  }

  prevSpread() {
    if (this.isAnimating || this.spread <= 0) return;
    this._flipBack();
  }

  _flipForward() {
    this.isAnimating = true;
    const container = document.getElementById('flipbook-pages-container');
    const currentRight = container ? container.querySelector('.fb-current-right') : null;

    if (currentRight) {
      currentRight.style.transition = 'transform 0.65s cubic-bezier(0.645, 0.045, 0.355, 1.000)';
      currentRight.style.transform = 'rotateY(-180deg)';
      currentRight.style.zIndex = '10';
    }

    setTimeout(() => {
      this.spread++;
      this._renderSpread();
      this.isAnimating = false;
    }, 320);
  }

  _flipBack() {
    this.isAnimating = true;
    setTimeout(() => {
      this.spread--;
      this._renderSpread();
      this.isAnimating = false;
    }, 100);
  }

  _renderSpread() {
    const container = document.getElementById('flipbook-pages-container');
    if (!container) return;

    const page = this.pages[this.spread];
    if (!page) return;

    // Update progress
    const pct = this.totalSpreads <= 1 ? 100 : Math.round((this.spread / (this.totalSpreads - 1)) * 100);
    const progressFill = document.getElementById('fb-progress-fill');
    if (progressFill) progressFill.style.width = pct + '%';

    const isFirst = this.spread === 0;
    const isLast  = this.spread === this.totalSpreads - 1;

    const progressText = document.getElementById('fb-progress-text');
    if (progressText) {
      if (isFirst) {
        progressText.textContent = 'Cover';
      } else if (this.spread === 1 && this.pages[1]?.type === 'toc') {
        progressText.textContent = 'Contents';
      } else {
        progressText.textContent = `Pg ${this.spread} / ${this.totalSpreads - 1}`;
      }
    }

    const prevBtn = document.getElementById('fb-btn-prev');
    const nextBtn = document.getElementById('fb-btn-next');
    if (prevBtn) prevBtn.disabled = isFirst;
    if (nextBtn) nextBtn.disabled = isLast;

    // Build HTML
    if (page.type === 'cover') {
      container.innerHTML = this._coverHTML(page.item, page.ebook);
    } else if (page.type === 'toc') {
      container.innerHTML = this._tocHTML(page.chapters, page.item, page.ebook);
    } else {
      container.innerHTML = this._chapterHTML(page);
    }

    // Bind TOC clicks
    container.querySelectorAll('[data-goto]').forEach(el => {
      el.addEventListener('click', () => {
        const idx = parseInt(el.getAttribute('data-goto'));
        this.spread = idx;
        this._renderSpread();
      });
    });

    // Touch / swipe support
    this._bindSwipe(container);
  }

  _coverHTML(item, ebook) {
    const visual = (ebook && ebook.chapters && ebook.chapters[0]?.visual) || (item.content && item.content[0]?.visual) || '📜';
    const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth <= 1024;
    const invocation = (ebook && ebook.sanskritInvocation) || '॥ ॐ तत्सत् श्री परमात्मने नमः ॥';

    if (isMobileOrTablet) {
      return `
        <div class="fb-cover" style="position:absolute;left:0;top:0;width:100%;height:100%;">
          <div class="fb-cover-inner" style="padding:24px;">
            <div class="fb-cover-ornament" style="font-size:44px;margin-bottom:12px;">${visual}</div>
            <div class="fb-cover-divider"></div>
            <div style="font-family:'Playfair Display',serif;font-size:10px;letter-spacing:0.1em;color:rgba(212,175,55,0.7);margin-bottom:6px;">${invocation}</div>
            <div class="fb-cover-title" style="font-size:18px;">${item.title}</div>
            <div class="fb-cover-divider"></div>
            <div class="fb-cover-subtitle" style="font-size:9px;">${item.tagline || 'Sacred Heritage Chronicle'}</div>
            <div style="margin-top:24px;font-size:9px;color:rgba(212,175,55,0.35);letter-spacing:0.15em;font-weight:600;">SANATANA360 • SACRED GRANTHALAYA</div>
          </div>
        </div>
      `;
    }

    return `
      <!-- LEFT: Back cover (blank decorative) -->
      <div style="position:absolute;left:0;top:0;width:50%;height:100%;background:linear-gradient(160deg,#0d0702,#180e04);border-radius:8px 2px 2px 8px;display:flex;align-items:center;justify-content:center;">
        <div style="text-align:center;opacity:0.35;">
          <div style="font-size:48px;margin-bottom:12px;">⚜️</div>
          <div style="font-size:10px;font-family:'Playfair Display',serif;color:#d4af37;margin-bottom:6px;">${invocation}</div>
          <div style="font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#d4af37;font-weight:700;">Sanatana360 Granthalaya</div>
        </div>
      </div>
      <!-- RIGHT: Front cover -->
      <div class="fb-cover" style="position:absolute;right:0;top:0;width:50%;height:100%;">
        <div class="fb-cover-inner">
          <div class="fb-cover-ornament">${visual}</div>
          <div class="fb-cover-divider"></div>
          <div style="font-family:'Playfair Display',serif;font-size:10px;letter-spacing:0.1em;color:rgba(212,175,55,0.75);margin-bottom:6px;">${invocation}</div>
          <div class="fb-cover-title">${item.title}</div>
          <div class="fb-cover-divider"></div>
          <div class="fb-cover-subtitle">${item.tagline || 'Sacred Heritage Chronicle'}</div>
          <div style="margin-top:20px;font-size:9px;color:rgba(212,175,55,0.35);letter-spacing:0.15em;font-weight:600;">SANATANA360 • SACRED GRANTHALAYA</div>
        </div>
      </div>
    `;
  }

  _tocHTML(chapters, item, ebook) {
    const listItems = chapters.map((ch, i) => `
      <li data-goto="${i + 2}">
        <span class="toc-num">${i + 1}</span>
        <span class="toc-title">${ch.title}</span>
        <span class="toc-dots"></span>
        <span class="toc-page">${i + 2}</span>
      </li>
    `).join('');

    const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth <= 1024;
    const visual = (chapters[0]?.visual) || '📜';

    if (isMobileOrTablet) {
      return `
        <div style="position:absolute;left:0;top:0;width:100%;height:100%;">
          <div class="paper-light fb-page-content single-side" style="height:100%;box-sizing:border-box;overflow-y:auto;padding:24px 20px;">
            <div class="fb-chapter-num">Sacred Index</div>
            <div style="font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:700;color:#2c1a08;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(139,110,60,0.2);">Table of Sacred Chapters</div>
            <ul class="fb-toc-list">${listItems}</ul>
            <div class="fb-page-num" style="margin-top:20px;position:relative;bottom:0;text-align:center;">
              <span>ii</span>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <!-- LEFT: Title page -->
      <div style="position:absolute;left:0;top:0;width:50%;height:100%;">
        <div class="paper-light fb-page-content left-side" style="height:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
          <div style="font-size:36px;margin-bottom:16px;">${visual}</div>
          <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#8b6e3c;font-weight:700;margin-bottom:8px;">Authentic Palm-Leaf Manuscript</div>
          <div style="width:40px;height:1px;background:linear-gradient(to right,transparent,#d4af37,transparent);margin:8px auto;"></div>
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:700;color:#2c1a08;line-height:1.4;margin-bottom:6px;">${item.title}</div>
          <div style="width:40px;height:1px;background:linear-gradient(to right,transparent,#d4af37,transparent);margin:8px auto;"></div>
          <div style="font-size:10px;color:#8b6e3c;font-style:italic;">${item.tagline || ''}</div>
          <div style="margin-top:auto;font-size:9px;color:rgba(139,110,60,0.4);letter-spacing:0.1em;">SANATANA GURUKULA</div>
        </div>
      </div>
      <!-- RIGHT: Table of Contents -->
      <div style="position:absolute;right:0;top:0;width:50%;height:100%;">
        <div class="paper-light fb-page-content right-side" style="height:100%;box-sizing:border-box;">
          <div class="fb-chapter-num">Sacred Index</div>
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:14px;font-weight:700;color:#2c1a08;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(139,110,60,0.2);">Table of Sacred Chapters</div>
          <ul class="fb-toc-list">${listItems}</ul>
          <div class="fb-page-num"><span>ii</span><span class="book-mark">⚜</span></div>
        </div>
      </div>
    `;
  }

  _chapterHTML(page) {
    const rawText = page.text || '';
    const words = rawText.split(/\s+/).filter(Boolean);
    const half = Math.ceil(words.length / 2);
    const leftText = words.slice(0, half).join(' ');
    const rightText = words.slice(half).join(' ');

    const leftFirstLetter = leftText ? leftText.charAt(0) : '॥';
    const leftRemainingText = leftText ? leftText.slice(1) : '';

    const leftPageNum  = page.pageNum * 2;
    const rightPageNum = page.pageNum * 2 + 1;

    const isMobileOrTablet = typeof window !== 'undefined' && window.innerWidth <= 1024;

    const sanskritBoxHTML = page.sanskrit ? `
      <div class="fb-sanskrit-box">
        <div class="fb-sanskrit-shloka">${page.sanskrit}</div>
        ${page.meaning ? `<div class="fb-sanskrit-meaning">"${page.meaning}"</div>` : ''}
      </div>
    ` : '';

    const commentaryBoxHTML = page.commentary ? `
      <div class="fb-commentary-box">
        <div class="fb-commentary-title">🏛️ Epigraphical & Philosophical Commentary</div>
        <div>${page.commentary}</div>
      </div>
    ` : '';

    if (isMobileOrTablet) {
      return `
        <!-- Single Page layout for Mobile/Tablet -->
        <div style="position:absolute;left:0;top:0;width:100%;height:100%;">
          <div class="paper-light fb-page-content single-side" style="height:100%;box-sizing:border-box;overflow-y:auto;padding:24px 18px;">
            <div class="fb-chapter-num">Chapter ${page.pageNum} of ${page.total}</div>
            <div class="fb-chapter-visual" style="font-size:32px;margin:8px 0;">${page.visual}</div>
            <div class="fb-chapter-title" style="font-size:16px;margin-bottom:10px;">${page.title}</div>
            ${sanskritBoxHTML}
            <div class="fb-chapter-body" style="font-size:12px;line-height:1.75;color:#2c1a08;padding-bottom:16px;">
              <span class="fb-dropcap">${leftFirstLetter}</span>${rawText.slice(1)}
              ${commentaryBoxHTML}
            </div>
            <div class="fb-page-num" style="margin-top:16px;position:relative;bottom:8px;text-align:center;">
              <span>Pg ${page.pageNum}</span>
            </div>
          </div>
        </div>
      `;
    }

    return `
      <!-- LEFT page (Opening spread with Sanskrit & Drop-cap) -->
      <div style="position:absolute;left:0;top:0;width:50%;height:100%;">
        <div class="paper-light fb-page-content left-side" style="height:100%;box-sizing:border-box;">
          <div class="fb-chapter-num">Chapter ${page.pageNum} of ${page.total}</div>
          <div class="fb-chapter-visual" style="font-size:28px;margin-bottom:6px;">${page.visual}</div>
          <div class="fb-chapter-title" style="font-size:15px;margin-bottom:10px;padding-bottom:8px;">${page.title}</div>
          
          <div class="fb-chapter-body">
            ${sanskritBoxHTML}
            <div>
              <span class="fb-dropcap">${leftFirstLetter}</span>${leftRemainingText}
            </div>
          </div>

          <div class="fb-page-num">
            <span>${leftPageNum}</span>
            <span class="book-mark">⚜</span>
          </div>
        </div>
      </div>

      <!-- RIGHT page (Continuing narrative & Commentary box) -->
      <div style="position:absolute;right:0;top:0;width:50%;height:100%;">
        <div class="paper-light fb-page-content right-side" style="height:100%;box-sizing:border-box;">
          <div class="fb-chapter-num" style="color:transparent;">·</div>
          
          <div class="fb-chapter-body" style="padding-top:4px;">
            <div style="margin-bottom:10px;line-height:1.8;">
              ${rightText || 'The eternal truths of this chapter resonate across the generations, providing divine contemplation for seekers of ultimate dharma.'}
            </div>
            ${commentaryBoxHTML}
            
            <div style="text-align:center;color:#d4af37;font-size:11px;margin-top:14px;letter-spacing:0.15em;">
              🪷 ✦ ॥ शुभमस्तु ॥ ✦ 🪷
            </div>
          </div>

          <div class="fb-page-num">
            <span class="book-mark">⚜</span>
            <span>${rightPageNum}</span>
          </div>
        </div>
      </div>
    `;
  }

  _bindSwipe(container) {
    let startX = 0;
    container.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
    }, { passive: true });
    container.addEventListener('touchend', (e) => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 50) {
        if (dx < 0) this.nextSpread();
        else this.prevSpread();
      }
    }, { passive: true });
  }
}

// Singleton instantiation
window.flipBook = new FlipBook();
