import heritageData from './data.js?v=21';

export class TriviaGame {
  constructor(containerId, onGameOver) {
    this.container = document.getElementById(containerId);
    this.onGameOver = onGameOver;
    this.questions = [...heritageData.games.trivia];
    this.currentIndex = 0;
    this.score = 0;
    this.timer = 15;
    this.timerInterval = null;
    this.selectedAnswer = null;
  }

  start() {
    this.currentIndex = 0;
    this.score = 0;
    this.shuffleQuestions();
    this.loadQuestion();
  }

  shuffleQuestions() {
    this.questions.sort(() => Math.random() - 0.5);
  }

  loadQuestion() {
    this.selectedAnswer = null;
    clearInterval(this.timerInterval);
    this.timer = 15;

    const q = this.questions[this.currentIndex];
    
    this.container.innerHTML = `
      <div class="game-card p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl relative overflow-hidden">
        <!-- Progress & Timer -->
        <div class="flex justify-between items-center mb-6">
          <span class="text-sm text-gold/80 font-semibold tracking-wider uppercase">Question ${this.currentIndex + 1} of ${this.questions.length}</span>
          <div class="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full border border-white/5">
            <span class="text-xs text-white/60">⏳</span>
            <span id="trivia-timer" class="text-sm font-bold text-crimson font-mono">15s</span>
          </div>
        </div>

        <!-- Question -->
        <h3 class="text-xl font-bold text-white mb-6 leading-relaxed font-serif">${q.question}</h3>

        <!-- Options -->
        <div class="grid gap-3 mb-6" id="trivia-options">
          ${q.options.map((option, idx) => `
            <button class="trivia-option-btn w-full p-4 rounded-xl text-left bg-white/5 border border-white/5 text-white/90 hover:bg-white/10 transition-all duration-300 flex items-center justify-between group" data-idx="${idx}">
              <span>${option}</span>
              <span class="opacity-0 group-hover:opacity-100 transition-opacity text-gold">⚡</span>
            </button>
          `).join('')}
        </div>

        <!-- Feedback & Explanation (Hidden initially) -->
        <div id="trivia-feedback" class="hidden mt-4 p-4 rounded-xl bg-white/5 border border-white/5">
          <p id="feedback-text" class="font-bold text-sm mb-1"></p>
          <p id="feedback-explanation" class="text-xs text-white/70 leading-relaxed"></p>
          <button id="trivia-next-btn" class="mt-4 px-6 py-2.5 bg-gold text-black hover:bg-gold/90 transition-all font-bold rounded-lg text-xs tracking-wider uppercase shadow-lg shadow-gold/20">Next Question</button>
        </div>
      </div>
    `;

    // Start timer countdown
    const timerEl = this.container.querySelector('#trivia-timer');
    this.timerInterval = setInterval(() => {
      this.timer--;
      timerEl.textContent = `${this.timer}s`;
      if (this.timer <= 0) {
        clearInterval(this.timerInterval);
        this.revealAnswer(-1); // Timeout
      }
    }, 1000);

    // Bind option click handlers
    this.container.querySelectorAll('.trivia-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (this.selectedAnswer !== null) return; // Prevent double clicking
        const selectedIdx = parseInt(btn.getAttribute('data-idx'));
        clearInterval(this.timerInterval);
        this.revealAnswer(selectedIdx);
      });
    });
  }

  revealAnswer(selectedIdx) {
    this.selectedAnswer = selectedIdx;
    const q = this.questions[this.currentIndex];
    const optionBtns = this.container.querySelectorAll('.trivia-option-btn');
    const feedbackEl = this.container.querySelector('#trivia-feedback');
    const feedbackText = this.container.querySelector('#feedback-text');
    const explanationEl = this.container.querySelector('#feedback-explanation');
    const nextBtn = this.container.querySelector('#trivia-next-btn');

    // Highlight correct & incorrect options
    optionBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.answer) {
        btn.classList.remove('bg-white/5', 'border-white/5');
        btn.classList.add('bg-emerald-500/20', 'border-emerald-500/50', 'text-emerald-400');
        btn.innerHTML += `<span class="text-emerald-400">✓</span>`;
      } else if (idx === selectedIdx) {
        btn.classList.remove('bg-white/5', 'border-white/5');
        btn.classList.add('bg-red-500/20', 'border-red-500/50', 'text-red-400');
        btn.innerHTML += `<span class="text-red-400">✗</span>`;
      }
    });

    // Generate feedback text
    if (selectedIdx === q.answer) {
      this.score += 20; // 20 points per correct answer (total 100)
      feedbackText.textContent = "Correct Answer! 🎉";
      feedbackText.className = "font-bold text-sm mb-1 text-emerald-400";
      if (window.SoundEffects) window.SoundEffects.playSuccess();
    } else if (selectedIdx === -1) {
      feedbackText.textContent = "Time's Up! ⏳";
      feedbackText.className = "font-bold text-sm mb-1 text-crimson";
      if (window.SoundEffects) window.SoundEffects.playFailure();
    } else {
      feedbackText.textContent = "Incorrect Answer 😔";
      feedbackText.className = "font-bold text-sm mb-1 text-red-400";
      if (window.SoundEffects) window.SoundEffects.playFailure();
    }

    explanationEl.textContent = q.explanation;
    feedbackEl.classList.remove('hidden');

    nextBtn.addEventListener('click', () => {
      this.currentIndex++;
      if (this.currentIndex < this.questions.length) {
        this.loadQuestion();
      } else {
        this.showResults();
      }
    });
  }

  showResults() {
    this.container.innerHTML = `
      <div class="game-card p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center">
        <h3 class="text-3xl font-bold font-serif text-gold mb-4">Challenge Completed!</h3>
        <p class="text-lg text-white/80 mb-6">You scored <span class="text-gold font-bold font-mono text-2xl">${this.score}</span> / 100 points</p>
        
        <div class="flex justify-center gap-2 mb-8">
          ${this.score >= 80 ? '👑 Great Historian Badge' : this.score >= 40 ? '📜 Apprentice Historian Badge' : '🧭 Heritage Seeker Badge'} Unlocked!
        </div>

        <button id="trivia-restart-btn" class="px-8 py-3 bg-gradient-to-r from-gold to-amber-500 hover:from-gold/90 hover:to-amber-600 text-black font-extrabold rounded-xl tracking-wider uppercase transition-all shadow-lg shadow-gold/20">Play Again</button>
      </div>
    `;

    this.container.querySelector('#trivia-restart-btn').addEventListener('click', () => {
      this.start();
    });

    if (this.onGameOver) {
      this.onGameOver(this.score, 'trivia');
    }
  }
}

export class ChronologyGame {
  constructor(containerId, onGameOver) {
    this.container = document.getElementById(containerId);
    this.onGameOver = onGameOver;
    this.events = [];
    this.userOrder = [];
  }

  start() {
    // Select 4 random events from database
    const pool = [...heritageData.games.chronology];
    this.events = pool.sort(() => Math.random() - 0.5).slice(0, 4);
    // Shuffle user order initially
    this.userOrder = [...this.events].sort(() => Math.random() - 0.5);
    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="game-card p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
        <h3 class="text-xl font-bold text-white mb-2 font-serif text-center">Chronology Quest</h3>
        <p class="text-xs text-white/60 mb-6 text-center">Sort these major historical events in chronological order, from oldest (top) to newest (bottom).</p>

        <!-- Timeline vertical list -->
        <div class="space-y-3 mb-6" id="chronology-list">
          ${this.userOrder.map((ev, index) => `
            <div class="chrono-item p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between group transition-all duration-300 hover:border-gold/30 hover:bg-white/10 cursor-pointer" data-id="${ev.id}">
              <div class="flex items-start gap-3">
                <span class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-sm text-gold">${index + 1}</span>
                <div>
                  <h4 class="font-bold text-white text-sm">${ev.title}</h4>
                  <p class="text-xs text-white/60">${ev.desc}</p>
                </div>
              </div>
              
              <!-- Move Buttons -->
              <div class="flex flex-col gap-1 opacity-60 group-hover:opacity-100 transition-opacity">
                <button class="chrono-move-up hover:text-gold text-xs px-1.5 py-0.5 bg-white/5 rounded border border-white/5" data-idx="${index}" ${index === 0 ? 'disabled style="opacity: 0.3;"' : ''}>▲</button>
                <button class="chrono-move-down hover:text-gold text-xs px-1.5 py-0.5 bg-white/5 rounded border border-white/5" data-idx="${index}" ${index === this.userOrder.length - 1 ? 'disabled style="opacity: 0.3;"' : ''}>▼</button>
              </div>
            </div>
          `).join('')}
        </div>

        <div class="flex gap-4">
          <button id="chrono-verify-btn" class="flex-1 py-3 bg-gold text-black hover:bg-gold/90 transition-all font-bold rounded-xl text-sm tracking-wider uppercase shadow-lg shadow-gold/20">Verify Timeline</button>
          <button id="chrono-reset-btn" class="px-5 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl text-sm transition-all border border-white/15">Shuffle</button>
        </div>

        <div id="chrono-feedback" class="hidden mt-6 p-4 rounded-xl text-center"></div>
      </div>
    `;

    // Bind event listeners
    this.container.querySelectorAll('.chrono-move-up').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        this.swap(idx, idx - 1);
      });
    });

    this.container.querySelectorAll('.chrono-move-down').forEach(btn => {
      btn.addEventListener('click', () => {
        const idx = parseInt(btn.getAttribute('data-idx'));
        this.swap(idx, idx + 1);
      });
    });

    this.container.querySelector('#chrono-reset-btn').addEventListener('click', () => {
      this.start();
    });

    this.container.querySelector('#chrono-verify-btn').addEventListener('click', () => {
      this.verify();
    });
  }

  swap(i, j) {
    const temp = this.userOrder[i];
    this.userOrder[i] = this.userOrder[j];
    this.userOrder[j] = temp;
    this.render();
  }

  verify() {
    // Correct chronological order is sorted by timestamp asc
    const correctOrder = [...this.events].sort((a, b) => a.timestamp - b.timestamp);
    let correctCount = 0;
    
    const items = this.container.querySelectorAll('.chrono-item');
    const feedbackEl = this.container.querySelector('#chrono-feedback');

    items.forEach((item, index) => {
      const evId = item.getAttribute('data-id');
      const correctEv = correctOrder[index];
      
      item.classList.remove('border-white/5', 'hover:border-gold/30', 'bg-white/5');
      
      if (evId === correctEv.id) {
        correctCount++;
        item.classList.add('bg-emerald-500/10', 'border-emerald-500/40');
        // Inject correct date badge
        const badge = document.createElement('span');
        badge.className = "text-xs font-mono font-bold text-emerald-400 bg-emerald-500/20 px-2 py-1 rounded border border-emerald-500/20 ml-2";
        badge.textContent = correctEv.period;
        item.querySelector('h4').appendChild(badge);
      } else {
        item.classList.add('bg-red-500/10', 'border-red-500/40');
        // Inject correct date badge in red
        const badge = document.createElement('span');
        badge.className = "text-xs font-mono font-bold text-red-400 bg-red-500/20 px-2 py-1 rounded border border-red-500/20 ml-2";
        badge.textContent = correctOrder.find(e => e.id === evId).period;
        item.querySelector('h4').appendChild(badge);
      }
    });

    const isAllCorrect = correctCount === this.events.length;
    const finalScore = Math.round((correctCount / this.events.length) * 100);

    if (isAllCorrect) {
      if (window.SoundEffects) window.SoundEffects.playSuccess();
    } else {
      if (window.SoundEffects) window.SoundEffects.playFailure();
    }

    feedbackEl.className = `mt-6 p-4 rounded-xl text-center border ${
      isAllCorrect ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-amber-500/10 border-amber-500/30 text-amber-400'
    }`;
    
    feedbackEl.innerHTML = `
      <h4 class="font-bold text-lg mb-1">${isAllCorrect ? 'Absolute Master of Time! 🏆' : 'Decent Timeline Reconstruction! 📜'}</h4>
      <p class="text-sm opacity-80 mb-4">${correctCount} out of ${this.events.length} correct. Score: ${finalScore}%</p>
      <button id="chrono-next-btn" class="px-6 py-2.5 bg-white text-black font-extrabold rounded-lg text-xs uppercase tracking-wider transition-all hover:bg-white/90">Play New Timeline</button>
    `;
    feedbackEl.classList.remove('hidden');

    // Disable sorting arrows
    this.container.querySelectorAll('.chrono-move-up, .chrono-move-down, #chrono-verify-btn').forEach(b => b.disabled = true);

    this.container.querySelector('#chrono-next-btn').addEventListener('click', () => {
      this.start();
    });

    if (this.onGameOver) {
      this.onGameOver(finalScore, 'chronology');
    }
  }
}

export class MemoryGame {
  constructor(containerId, onGameOver) {
    this.container = document.getElementById(containerId);
    this.onGameOver = onGameOver;
    this.cards = [];
    this.flippedCards = [];
    this.matchedPairs = 0;
    this.moves = 0;
    this.locked = false;
  }

  start() {
    this.matchedPairs = 0;
    this.moves = 0;
    this.flippedCards = [];
    this.locked = false;

    // Deep clone and shuffle memory cards from database
    const pool = JSON.parse(JSON.stringify(heritageData.games.memory));
    this.cards = pool.sort(() => Math.random() - 0.5);

    this.render();
  }

  render() {
    this.container.innerHTML = `
      <div class="game-card p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl">
        <h3 class="text-xl font-bold text-white mb-2 font-serif text-center">Monument Match</h3>
        <p class="text-xs text-white/60 mb-6 text-center">Flip and match cards representing the same monument to unlock their fascinating heritage facts.</p>

        <!-- Stats Bar -->
        <div class="flex justify-between items-center mb-6 text-xs text-white/80 bg-white/5 px-4 py-2.5 rounded-lg border border-white/5">
          <span>Moves: <strong id="memory-moves" class="font-mono text-gold">${this.moves}</strong></span>
          <span>Matches: <strong id="memory-matches" class="font-mono text-gold">${this.matchedPairs} / 4</strong></span>
        </div>

        <!-- 3D Card Grid -->
        <div class="grid grid-cols-4 gap-3 mb-6" style="perspective: 1000px;">
          ${this.cards.map((card, idx) => `
            <div class="memory-card relative cursor-pointer" style="height: 100px; transform-style: preserve-3d; transition: transform 0.6s;" data-idx="${idx}">
              <!-- Front of Card (Hidden) -->
              <div class="absolute inset-0 bg-gradient-to-br from-gold/20 to-amber-700/20 border border-gold/40 rounded-xl flex flex-col items-center justify-center p-2 text-center" style="backface-visibility: hidden; transform: rotateY(180deg);">
                <span class="text-2xl mb-1">${card.icon}</span>
                <span class="text-[10px] font-bold text-white/95 leading-tight">${card.name}</span>
              </div>
              <!-- Back of Card (Pattern) -->
              <div class="absolute inset-0 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-gold/30 hover:border-gold/40 hover:bg-white/10 transition-all" style="backface-visibility: hidden;">
                <span class="text-2xl font-serif">⚜️</span>
              </div>
            </div>
          `).join('')}
        </div>

        <!-- Fact Reveal Panel -->
        <div id="memory-fact-panel" class="hidden p-4 rounded-xl bg-gold/10 border border-gold/30 text-gold-200 text-xs leading-relaxed text-center min-h-[60px] flex items-center justify-center">
        </div>
      </div>
    `;

    // Bind card click event handlers
    const cardElements = this.container.querySelectorAll('.memory-card');
    cardElements.forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-idx'));
        this.flipCard(card, idx);
      });
    });
  }

  flipCard(cardEl, idx) {
    if (this.locked) return;
    const card = this.cards[idx];
    if (card.isFlipped || card.isMatched) return;

    // Flip card animation
    cardEl.style.transform = 'rotateY(180deg)';
    card.isFlipped = true;
    this.flippedCards.push({ el: cardEl, data: card });

    if (this.flippedCards.length === 2) {
      this.moves++;
      this.container.querySelector('#memory-moves').textContent = this.moves;
      this.checkMatch();
    }
  }

  checkMatch() {
    this.locked = true;
    const [card1, card2] = this.flippedCards;

    if (card1.data.matchId === card2.data.matchId) {
      // It's a match!
      card1.data.isMatched = true;
      card2.data.isMatched = true;
      this.matchedPairs++;
      this.container.querySelector('#memory-matches').textContent = `${this.matchedPairs} / 4`;

      if (window.SoundEffects) window.SoundEffects.playSuccess();

      // Show fact in panel
      const factPanel = this.container.querySelector('#memory-fact-panel');
      factPanel.textContent = `💡 Fact: ${card1.data.fact} ${card2.data.fact}`;
      factPanel.classList.remove('hidden');

      // Style cards as completed matches
      card1.el.querySelector('.absolute').classList.add('border-emerald-500/80', 'bg-emerald-500/10');
      card2.el.querySelector('.absolute').classList.add('border-emerald-500/80', 'bg-emerald-500/10');

      this.flippedCards = [];
      this.locked = false;

      if (this.matchedPairs === 4) {
        this.endGame();
      }
    } else {
      // No match - flip back
      if (window.SoundEffects) window.SoundEffects.playFailure();
      setTimeout(() => {
        card1.el.style.transform = 'rotateY(0deg)';
        card2.el.style.transform = 'rotateY(0deg)';
        card1.data.isFlipped = false;
        card2.data.isFlipped = false;
        this.flippedCards = [];
        this.locked = false;
      }, 1500);
    }
  }

  endGame() {
    setTimeout(() => {
      // Calculate final score based on moves (minimum 4 moves)
      // Max score 100 for perfect 4 moves. Subtract 8 pts per extra move, cap at 30 score.
      const finalScore = Math.max(30, 100 - (this.moves - 4) * 8);
      
      this.container.innerHTML = `
        <div class="game-card p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center">
          <h3 class="text-3xl font-bold font-serif text-gold mb-4">You Matched All Monuments!</h3>
          <p class="text-sm text-white/80 mb-6">Completed in <span class="text-gold font-bold font-mono text-xl">${this.moves}</span> moves. Performance rating: <strong class="text-gold">${finalScore}%</strong></p>
          
          <button id="memory-restart-btn" class="px-8 py-3 bg-gradient-to-r from-gold to-amber-500 hover:from-gold/90 hover:to-amber-600 text-black font-extrabold rounded-xl tracking-wider uppercase transition-all shadow-lg shadow-gold/20">Play Again</button>
        </div>
      `;

      this.container.querySelector('#memory-restart-btn').addEventListener('click', () => {
        this.start();
      });

      if (this.onGameOver) {
        this.onGameOver(finalScore, 'memory');
      }
    }, 1500);
  }
}
