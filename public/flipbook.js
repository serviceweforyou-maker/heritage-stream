/**
 * HeritageStream FlipBook Engine
 * Kindle-style 3D page-turn reader
 */

class FlipBook {
  constructor() {
    this.item = null;
    this.pages = [];      // Array of page objects { visual, title, text, pageNum }
    this.spread = 0;      // Current spread index (a spread = left + right page)
    this.totalSpreads = 0;
    this.isAnimating = false;
    this.overlay = null;
    this._keyHandler = null;
    this._init();
  }

  _init() {
    // Inject overlay HTML once
    if (document.getElementById('flipbook-overlay')) return;

    const el = document.createElement('div');
    el.id = 'flipbook-overlay';
    el.innerHTML = `
      <!-- Title bar -->
      <div id="flipbook-title-bar">
        <span class="book-label">📖 Reading</span>
        <h1 id="flipbook-title-text">Heritage Chronicle</h1>
      </div>

      <!-- Keyboard hint -->
      <div id="flipbook-keyboard-hint">
        ← → Arrow Keys to turn pages<br>Esc to close
      </div>

      <!-- Close button -->
      <button id="flipbook-close" title="Close">✕</button>

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
  }

  // Build page array from content item
  _buildPages(item) {
    const pages = [];

    // Page 0 — Cover (rendered as a special spread)
    // Page 1 — Table of Contents
    // Pages 2+ — Content chapters

    const chapters = item.content || [];

    // Cover spread (spread 0)
    pages.push({ type: 'cover', item });

    // TOC spread (spread 1)
    if (chapters.length > 1) {
      pages.push({ type: 'toc', chapters, item });
    }

    // Chapter spreads
    chapters.forEach((ch, i) => {
      pages.push({
        type: 'chapter',
        chapterIndex: i,
        total: chapters.length,
        visual: ch.visual || '📜',
        title: ch.title || `Chapter ${i + 1}`,
        text: ch.text || '',
        pageNum: i + 1,
      });
    });

    return pages;
  }

  open(item) {
    this.item = item;
    this.pages = this._buildPages(item);
    this.totalSpreads = this.pages.length;
    this.spread = 0;
    this.isAnimating = false;

    // Set title
    document.getElementById('flipbook-title-text').textContent = item.title;

    // Render first spread
    this._renderSpread();

    // Show overlay
    this.overlay.classList.add('active');

    // Keyboard nav
    this._keyHandler = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') this.nextSpread();
      if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   this.prevSpread();
      if (e.key === 'Escape') this.close();
    };
    window.addEventListener('keydown', this._keyHandler);
  }

  close() {
    this.overlay.classList.remove('active');
    if (this._keyHandler) {
      window.removeEventListener('keydown', this._keyHandler);
      this._keyHandler = null;
    }
    // Clear pages
    setTimeout(() => {
      document.getElementById('flipbook-pages-container').innerHTML = '';
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
    // Animate current right page flipping to left
    const container = document.getElementById('flipbook-pages-container');
    const currentRight = container.querySelector('.fb-current-right');

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
    const page = this.pages[this.spread];

    // Update progress
    const pct = this.totalSpreads <= 1 ? 100 : Math.round((this.spread / (this.totalSpreads - 1)) * 100);
    document.getElementById('fb-progress-fill').style.width = pct + '%';

    const isFirst = this.spread === 0;
    const isLast  = this.spread === this.totalSpreads - 1;

    if (isFirst) {
      document.getElementById('fb-progress-text').textContent = 'Cover';
    } else if (this.spread === 1 && this.pages[1]?.type === 'toc') {
      document.getElementById('fb-progress-text').textContent = 'Contents';
    } else {
      document.getElementById('fb-progress-text').textContent =
        `Pg ${this.spread} / ${this.totalSpreads - 1}`;
    }

    document.getElementById('fb-btn-prev').disabled = isFirst;
    document.getElementById('fb-btn-next').disabled = isLast;

    // Build HTML
    if (page.type === 'cover') {
      container.innerHTML = this._coverHTML(page.item);
    } else if (page.type === 'toc') {
      container.innerHTML = this._tocHTML(page.chapters, page.item);
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

  _coverHTML(item) {
    const visual = (item.content && item.content[0]?.visual) || '📜';
    return `
      <!-- LEFT: Back cover (blank decorative) -->
      <div style="position:absolute;left:0;top:0;width:50%;height:100%;background:linear-gradient(160deg,#0d0702,#180e04);border-radius:8px 2px 2px 8px;display:flex;align-items:center;justify-content:center;">
        <div style="text-align:center;opacity:0.25;">
          <div style="font-size:48px;margin-bottom:12px;">⚜️</div>
          <div style="font-size:9px;letter-spacing:0.3em;text-transform:uppercase;color:#d4af37;font-weight:700;">HeritageStream</div>
        </div>
      </div>
      <!-- RIGHT: Front cover -->
      <div class="fb-cover" style="position:absolute;right:0;top:0;width:50%;height:100%;">
        <div class="fb-cover-inner">
          <div class="fb-cover-ornament">${visual}</div>
          <div class="fb-cover-divider"></div>
          <div class="fb-cover-title">${item.title}</div>
          <div class="fb-cover-divider"></div>
          <div class="fb-cover-subtitle">${item.tagline || 'Heritage Chronicle'}</div>
          <div style="margin-top:20px;font-size:9px;color:rgba(212,175,55,0.35);letter-spacing:0.15em;font-weight:600;">HERITAGESTREAM</div>
        </div>
      </div>
    `;
  }

  _tocHTML(chapters, item) {
    const listItems = chapters.map((ch, i) => `
      <li data-goto="${i + 2}">
        <span class="toc-num">${i + 1}</span>
        <span class="toc-title">${ch.title}</span>
        <span class="toc-dots"></span>
        <span class="toc-page">${i + 2}</span>
      </li>
    `).join('');

    return `
      <!-- LEFT: Title page -->
      <div style="position:absolute;left:0;top:0;width:50%;height:100%;">
        <div class="paper-light fb-page-content left-side" style="height:100%;box-sizing:border-box;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;">
          <div style="font-size:32px;margin-bottom:16px;">${(item.content && item.content[0]?.visual) || '📜'}</div>
          <div style="font-size:9px;letter-spacing:0.2em;text-transform:uppercase;color:#8b6e3c;font-weight:700;margin-bottom:8px;">Heritage Chronicle</div>
          <div style="width:40px;height:1px;background:linear-gradient(to right,transparent,#d4af37,transparent);margin:8px auto;"></div>
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:700;color:#2c1a08;line-height:1.4;margin-bottom:6px;">${item.title}</div>
          <div style="width:40px;height:1px;background:linear-gradient(to right,transparent,#d4af37,transparent);margin:8px auto;"></div>
          <div style="font-size:10px;color:#8b6e3c;font-style:italic;">${item.tagline || ''}</div>
          <div style="margin-top:auto;font-size:9px;color:rgba(139,110,60,0.4);letter-spacing:0.1em;">HERITAGESTREAM</div>
        </div>
      </div>
      <!-- RIGHT: Table of Contents -->
      <div style="position:absolute;right:0;top:0;width:50%;height:100%;">
        <div class="paper-light fb-page-content right-side" style="height:100%;box-sizing:border-box;">
          <div class="fb-chapter-num">Contents</div>
          <div style="font-family:'Playfair Display',Georgia,serif;font-size:14px;font-weight:700;color:#2c1a08;margin-bottom:12px;padding-bottom:8px;border-bottom:1px solid rgba(139,110,60,0.2);">Table of Contents</div>
          <ul class="fb-toc-list">${listItems}</ul>
          <div class="fb-page-num"><span>ii</span><span class="book-mark">⚜</span></div>
        </div>
      </div>
    `;
  }

  _chapterHTML(page) {
    // Split long text across left and right pages
    const words = page.text.split(' ');
    const half = Math.ceil(words.length / 2);
    const leftText = words.slice(0, half).join(' ');
    const rightText = words.slice(half).join(' ');
    const isShort = words.length < 60;

    const leftPageNum  = page.pageNum * 2;
    const rightPageNum = page.pageNum * 2 + 1;

    return `
      <!-- LEFT page -->
      <div style="position:absolute;left:0;top:0;width:50%;height:100%;">
        <div class="paper-light fb-page-content left-side" style="height:100%;box-sizing:border-box;">
          <div class="fb-chapter-num">Chapter ${page.pageNum} of ${page.total}</div>
          <div class="fb-chapter-visual">${page.visual}</div>
          <div class="fb-chapter-title">${page.title}</div>
          <div class="fb-chapter-body">${isShort ? page.text : leftText}</div>
          <div class="fb-page-num">
            <span>${leftPageNum}</span>
            <span class="book-mark">⚜</span>
          </div>
        </div>
      </div>
      <!-- RIGHT page -->
      <div style="position:absolute;right:0;top:0;width:50%;height:100%;">
        <div class="paper-light fb-page-content right-side" style="height:100%;box-sizing:border-box;">
          <div class="fb-chapter-num" style="color:transparent;">·</div>
          <div class="fb-chapter-body" style="padding-top:8px;">
            ${isShort ? `
              <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;text-align:center;opacity:0.4;gap:8px;">
                <div style="font-size:28px;">✦</div>
                <div style="font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#8b6e3c;">End of Chapter</div>
              </div>
            ` : rightText}
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

// Singleton
window.flipBook = new FlipBook();
