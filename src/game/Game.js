import { Physics } from './Physics.js';
import { Drawing } from './Drawing.js';
import { Level } from './Level.js';
import { Scoring } from './Scoring.js';
import { world1 } from '../data/levels/world1.js';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 560;

const STATE = {
  MENU: 'menu',
  LEVEL_SELECT: 'level_select',
  DRAWING: 'drawing',
  SIMULATING: 'simulating',
  WIN: 'win',
  LOSE: 'lose',
};

// Save/load progress
const SAVE_KEY = 'petdraw_save';

function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(SAVE_KEY));
    return data || { unlockedLevel: 0, stars: {} };
  } catch {
    return { unlockedLevel: 0, stars: {} };
  }
}

function saveProgress(progress) {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(progress));
  } catch { /* ignore */ }
}

export class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');

    // Set canvas size
    this._resize();
    window.addEventListener('resize', () => this._resize());

    // Game state
    this.state = STATE.MENU;
    this.levels = world1;
    this.currentLevelIndex = 0;
    this.stars = 0;
    this.surviveTimer = 0;
    this.surviveTarget = 10;

    // Progress
    this.progress = loadProgress();

    // Core systems
    this.physics = new Physics(canvas, GAME_WIDTH, GAME_HEIGHT);
    this.drawing = new Drawing(canvas, this.physics);
    this.level = null;

    // Timing
    this._lastTime = 0;
    this._animFrame = null;

    // Animation
    this._menuAnim = 0;

    // Level select scroll
    this._scrollOffset = 0;

    // Collision handling
    this.physics.onCollision((a, b) => this._onCollision(a, b));

    // UI buttons
    this._buttons = [];

    // Click/touch handling
    this.canvas.addEventListener('click', (e) => this._onClick(e));
    this.canvas.addEventListener('touchend', (e) => {
      if (e.changedTouches.length > 0) {
        this._onClick(e.changedTouches[0]);
      }
    });
  }

  _resize() {
    const ratio = GAME_WIDTH / GAME_HEIGHT;
    let w = window.innerWidth;
    let h = window.innerHeight;

    if (w / h > ratio) {
      w = h * ratio;
    } else {
      h = w / ratio;
    }

    this.canvas.width = GAME_WIDTH;
    this.canvas.height = GAME_HEIGHT;
    this.canvas.style.width = `${w}px`;
    this.canvas.style.height = `${h}px`;
    this.canvas.style.marginTop = `${(window.innerHeight - h) / 2}px`;
  }

  start() {
    this.state = STATE.MENU;
    this._lastTime = performance.now();
    this._loop();
  }

  _loop() {
    const now = performance.now();
    const delta = Math.min(now - this._lastTime, 32);
    this._lastTime = now;

    this._update(now, delta);
    this._render();

    this._animFrame = requestAnimationFrame(() => this._loop());
  }

  _update(now, delta) {
    this._menuAnim += delta * 0.001;

    if (this.state === STATE.SIMULATING) {
      this.physics.update(delta);
      this.level.update(now, delta);

      // Update survive timer
      this.surviveTimer += delta / 1000;

      // Win condition: survived long enough AND all pets alive
      if (this.surviveTimer >= this.surviveTarget) {
        if (this.level.allPetsAlive) {
          this._win();
        } else {
          this._lose();
        }
      }

      // Lose condition: any pet fell off screen or all pets dead
      if (this.level.isPetOffScreen(GAME_HEIGHT)) {
        this._lose();
      }
      if (this.level.alivePetCount === 0) {
        this._lose();
      }
    }
  }

  _render() {
    const ctx = this.ctx;
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Background
    ctx.fillStyle = '#F5F0E8';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    switch (this.state) {
      case STATE.MENU:
        this._renderMenu();
        break;
      case STATE.LEVEL_SELECT:
        this._renderLevelSelect();
        break;
      case STATE.DRAWING:
      case STATE.SIMULATING:
        this._renderGame();
        break;
      case STATE.WIN:
        this._renderGame();
        this._renderWinOverlay();
        break;
      case STATE.LOSE:
        this._renderGame();
        this._renderLoseOverlay();
        break;
    }
  }

  // ── MENU ──────────────────────────────────────────

  _renderMenu() {
    const ctx = this.ctx;
    const cx = GAME_WIDTH / 2;

    // Animated background pattern
    ctx.fillStyle = '#EDE8DB';
    for (let i = 0; i < 6; i++) {
      const bx = 100 + i * 90 + Math.sin(this._menuAnim + i) * 10;
      const by = 80 + Math.cos(this._menuAnim * 0.7 + i * 1.5) * 20;
      ctx.beginPath();
      ctx.arc(bx, by, 4, 0, Math.PI * 2);
      ctx.fill();
    }

    // Title with slight bounce
    const titleY = 110 + Math.sin(this._menuAnim * 2) * 3;
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 38px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PetDraw Rescue', cx, titleY);

    // Subtitle
    ctx.fillStyle = '#7F8C8D';
    ctx.font = '16px Arial';
    ctx.fillText('Ciz. Koru. Kurtar.', cx, titleY + 40);

    // Pet parade (animated)
    const petTypes = [
      { color: '#4CAF50', x: -60 },
      { color: '#2196F3', x: -20 },
      { color: '#FF9800', x: 20 },
      { color: '#E91E63', x: 60 },
    ];
    for (const p of petTypes) {
      const px = cx + p.x;
      const py = 220 + Math.sin(this._menuAnim * 3 + p.x * 0.05) * 5;
      const size = 28;
      ctx.fillStyle = p.color;
      ctx.fillRect(px - size / 2, py - size / 2, size, size);
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.strokeRect(px - size / 2, py - size / 2, size, size);
      // Eyes
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.arc(px - 5, py - 3, 3, 0, Math.PI * 2);
      ctx.arc(px + 5, py - 3, 3, 0, Math.PI * 2);
      ctx.fill();
      // Smile
      ctx.beginPath();
      ctx.arc(px, py + 5, 6, 0, Math.PI);
      ctx.stroke();
    }

    // Play button
    this._drawButton(cx - 90, 290, 180, 54, 'OYNA', '#4CAF50', '#fff', 20);

    // Level select button
    this._drawButton(cx - 80, 360, 160, 42, 'Bolumler', '#3498DB', '#fff', 16);

    // Progress info
    const totalStars = Object.values(this.progress.stars).reduce((sum, s) => sum + s, 0);
    const maxStars = this.levels.length * 3;
    ctx.fillStyle = '#BDC3C7';
    ctx.font = '13px Arial';
    ctx.fillText(`Yildizlar: ${totalStars} / ${maxStars}`, cx, 435);
    ctx.fillText(`Acilan bolum: ${this.progress.unlockedLevel + 1} / ${this.levels.length}`, cx, 455);

    // Controls info
    ctx.fillStyle = '#D5D0C5';
    ctx.font = '12px Arial';
    ctx.fillText('Parmaginla ciz, hayvanlarini koru!', cx, 500);

    this._buttons = [
      {
        x: cx - 90, y: 290, w: 180, h: 54,
        action: () => this._loadLevel(this.progress.unlockedLevel),
      },
      {
        x: cx - 80, y: 360, w: 160, h: 42,
        action: () => { this.state = STATE.LEVEL_SELECT; },
      },
    ];
  }

  // ── LEVEL SELECT ──────────────────────────────────

  _renderLevelSelect() {
    const ctx = this.ctx;
    const cx = GAME_WIDTH / 2;

    // Title bar
    ctx.fillStyle = 'rgba(44, 62, 80, 0.9)';
    ctx.fillRect(0, 0, GAME_WIDTH, 50);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Bolum Sec', cx, 32);

    // Back button
    this._drawButton(10, 8, 60, 34, '< Geri', '#E74C3C', '#fff', 13);

    // Level grid
    const cols = 5;
    const cellSize = 80;
    const gap = 15;
    const startX = (GAME_WIDTH - (cols * cellSize + (cols - 1) * gap)) / 2;
    const startY = 70;

    this._buttons = [
      { x: 10, y: 8, w: 60, h: 34, action: () => { this.state = STATE.MENU; } },
    ];

    for (let i = 0; i < this.levels.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cellSize + gap);
      const y = startY + row * (cellSize + gap + 20);
      const unlocked = i <= this.progress.unlockedLevel;
      const levelStars = this.progress.stars[i] || 0;

      // Cell background
      ctx.fillStyle = unlocked ? '#fff' : '#D5D0C5';
      this._roundRect(x, y, cellSize, cellSize, 10);
      ctx.strokeStyle = unlocked ? '#4CAF50' : '#BDC3C7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(x + 10, y);
      ctx.lineTo(x + cellSize - 10, y);
      ctx.quadraticCurveTo(x + cellSize, y, x + cellSize, y + 10);
      ctx.lineTo(x + cellSize, y + cellSize - 10);
      ctx.quadraticCurveTo(x + cellSize, y + cellSize, x + cellSize - 10, y + cellSize);
      ctx.lineTo(x + 10, y + cellSize);
      ctx.quadraticCurveTo(x, y + cellSize, x, y + cellSize - 10);
      ctx.lineTo(x, y + 10);
      ctx.quadraticCurveTo(x, y, x + 10, y);
      ctx.closePath();
      ctx.stroke();

      // Level number
      ctx.fillStyle = unlocked ? '#2C3E50' : '#AAA';
      ctx.font = 'bold 22px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${i + 1}`, x + cellSize / 2, y + 35);

      // Lock icon for locked levels
      if (!unlocked) {
        ctx.fillStyle = '#AAA';
        ctx.font = '18px Arial';
        ctx.fillText('🔒', x + cellSize / 2, y + 60);
      }

      // Stars
      if (levelStars > 0) {
        const starStr = '★'.repeat(levelStars) + '☆'.repeat(3 - levelStars);
        ctx.fillStyle = '#F1C40F';
        ctx.font = '14px Arial';
        ctx.fillText(starStr, x + cellSize / 2, y + cellSize - 8);
      }

      // Level name (below cell)
      ctx.fillStyle = unlocked ? '#7F8C8D' : '#BDC3C7';
      ctx.font = '10px Arial';
      const name = this.levels[i].name;
      ctx.fillText(name.length > 12 ? name.slice(0, 11) + '..' : name, x + cellSize / 2, y + cellSize + 14);

      if (unlocked) {
        this._buttons.push({
          x, y, w: cellSize, h: cellSize,
          action: () => this._loadLevel(i),
        });
      }
    }
  }

  // ── GAME RENDERING ────────────────────────────────

  _renderGame() {
    const ctx = this.ctx;

    // Level entities
    if (this.level) {
      this.level.render(ctx);
    }

    // Drawing (drawn lines + preview)
    this.drawing.render(ctx);

    // UI overlay
    this._renderGameUI();
  }

  _renderGameUI() {
    const ctx = this.ctx;

    // Top bar background
    ctx.fillStyle = 'rgba(44, 62, 80, 0.85)';
    ctx.fillRect(0, 0, GAME_WIDTH, 44);

    // Level number
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'left';
    const levelData = this.levels[this.currentLevelIndex];
    ctx.fillText(`${levelData.id}: ${levelData.name}`, 12, 28);

    // Pet count indicator (for multi-pet levels)
    if (this.level && this.level.pets.length > 1) {
      const alive = this.level.alivePetCount;
      const total = this.level.pets.length;
      ctx.fillStyle = alive === total ? '#4CAF50' : '#E74C3C';
      ctx.font = '12px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`Pet: ${alive}/${total}`, 12, 16);
    }

    // Ink bar
    const barX = 260;
    const barW = 140;
    const barH = 14;
    const barY = 15;

    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(barX, barY, barW, barH);

    const inkLeft = 1 - this.drawing.inkRatio;
    const barColor = inkLeft > 0.5 ? '#4CAF50' : inkLeft > 0.25 ? '#FF9800' : '#E74C3C';
    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, barW * inkLeft, barH);

    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, barH);

    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Murekkep: ${Math.round(inkLeft * 100)}%`, barX + barW / 2, barY + 11);

    // Timer (during simulation)
    if (this.state === STATE.SIMULATING) {
      const timeLeft = Math.max(0, this.surviveTarget - this.surviveTimer);
      const timerColor = timeLeft > 5 ? '#fff' : timeLeft > 2 ? '#FF9800' : '#E74C3C';
      ctx.fillStyle = timerColor;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`${timeLeft.toFixed(1)}s`, GAME_WIDTH - 12, 28);

      // Progress bar for timer
      const progress = this.surviveTimer / this.surviveTarget;
      const tbX = GAME_WIDTH - 100;
      const tbW = 80;
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillRect(tbX, 33, tbW, 5);
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(tbX, 33, tbW * Math.min(1, progress), 5);
    }

    // Buttons during drawing phase
    if (this.state === STATE.DRAWING) {
      // Undo button
      if (this.drawing.canUndo) {
        this._drawButton(GAME_WIDTH - 110, 50, 45, 30, 'Geri', '#FF9800', '#fff', 12);
      }

      // Restart button
      this._drawButton(GAME_WIDTH - 55, 50, 45, 30, 'Sil', '#E74C3C', '#fff', 12);

      // Start button
      const btnW = 140;
      const btnX = GAME_WIDTH / 2 - btnW / 2;
      this._drawButton(btnX, GAME_HEIGHT - 55, btnW, 42, 'BASLAT', '#4CAF50', '#fff', 18);

      // Hint text
      if (levelData.hints && levelData.hints.length > 0) {
        ctx.fillStyle = 'rgba(44, 62, 80, 0.6)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(levelData.hints[0], GAME_WIDTH / 2, GAME_HEIGHT - 65);
      }
    }

    // Restart during simulation
    if (this.state === STATE.SIMULATING) {
      this._drawButton(GAME_WIDTH - 55, 50, 45, 30, 'Sil', '#E74C3C', '#fff', 12);
    }

    this._setupGameButtons();
  }

  _setupGameButtons() {
    this._buttons = [];

    if (this.state === STATE.DRAWING) {
      const btnW = 140;
      const btnX = GAME_WIDTH / 2 - btnW / 2;
      this._buttons.push({
        x: btnX, y: GAME_HEIGHT - 55, w: btnW, h: 42,
        action: () => this._startSimulation(),
      });

      // Undo button
      if (this.drawing.canUndo) {
        this._buttons.push({
          x: GAME_WIDTH - 110, y: 50, w: 45, h: 30,
          action: () => this.drawing.undo(),
        });
      }

      // Restart
      this._buttons.push({
        x: GAME_WIDTH - 55, y: 50, w: 45, h: 30,
        action: () => this._loadLevel(this.currentLevelIndex),
      });
    }

    if (this.state === STATE.SIMULATING) {
      this._buttons.push({
        x: GAME_WIDTH - 55, y: 50, w: 45, h: 30,
        action: () => this._loadLevel(this.currentLevelIndex),
      });
    }
  }

  // ── WIN / LOSE OVERLAYS ───────────────────────────

  _renderWinOverlay() {
    const ctx = this.ctx;
    const cx = GAME_WIDTH / 2;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Panel
    ctx.fillStyle = '#fff';
    this._roundRect(cx - 150, 130, 300, 300, 16);

    // Title
    ctx.fillStyle = '#4CAF50';
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Tebrikler!', cx, 180);

    // Stars (animated)
    const starY = 220;
    for (let i = 0; i < 3; i++) {
      const filled = i < this.stars;
      const bounce = Math.sin(this._menuAnim * 4 + i * 0.5) * 3;
      ctx.font = `${filled ? 36 : 28}px Arial`;
      ctx.fillStyle = filled ? '#F1C40F' : '#DDD';
      ctx.fillText(filled ? '★' : '☆', cx - 50 + i * 50, starY + (filled ? bounce : 0));
    }

    // Level info
    const levelData = this.levels[this.currentLevelIndex];
    ctx.fillStyle = '#7F8C8D';
    ctx.font = '14px Arial';
    ctx.fillText(`Bolum ${levelData.id}: ${levelData.name}`, cx, 260);

    // Ink info
    ctx.fillStyle = '#95A5A6';
    ctx.font = '13px Arial';
    ctx.fillText(`Murekkep: ${Math.round((1 - this.drawing.inkRatio) * 100)}% kaldi`, cx, 285);

    // Pet info for multi-pet
    if (this.level && this.level.pets.length > 1) {
      ctx.fillText(`${this.level.pets.length} hayvan kurtarildi!`, cx, 305);
    }

    // Buttons
    this._drawButton(cx - 135, 340, 125, 42, 'Tekrar', '#95A5A6', '#fff', 15);

    const isLastLevel = this.currentLevelIndex >= this.levels.length - 1;
    if (isLastLevel) {
      this._drawButton(cx + 10, 340, 125, 42, 'Menu', '#3498DB', '#fff', 15);
    } else {
      this._drawButton(cx + 10, 340, 125, 42, 'Sonraki', '#4CAF50', '#fff', 15);
    }

    // Level select
    this._drawButton(cx - 60, 395, 120, 32, 'Bolumler', '#3498DB', '#fff', 12);

    this._buttons = [
      {
        x: cx - 135, y: 340, w: 125, h: 42,
        action: () => this._loadLevel(this.currentLevelIndex),
      },
      {
        x: cx + 10, y: 340, w: 125, h: 42,
        action: () => {
          if (isLastLevel) {
            this.state = STATE.MENU;
          } else {
            this._loadLevel(this.currentLevelIndex + 1);
          }
        },
      },
      {
        x: cx - 60, y: 395, w: 120, h: 32,
        action: () => { this.state = STATE.LEVEL_SELECT; },
      },
    ];
  }

  _renderLoseOverlay() {
    const ctx = this.ctx;
    const cx = GAME_WIDTH / 2;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Panel
    ctx.fillStyle = '#fff';
    this._roundRect(cx - 150, 150, 300, 260, 16);

    // Title
    ctx.fillStyle = '#E74C3C';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Kaybettin!', cx, 200);

    // Dead pet icon
    ctx.font = '48px Arial';
    ctx.fillText(':(', cx, 260);

    // Hint
    const levelData = this.levels[this.currentLevelIndex];
    if (levelData.hints && levelData.hints.length > 0) {
      ctx.fillStyle = '#7F8C8D';
      ctx.font = '12px Arial';
      // Wrap long hints
      const hint = levelData.hints[0];
      if (hint.length > 35) {
        const mid = hint.lastIndexOf(' ', 35);
        ctx.fillText(hint.slice(0, mid), cx, 300);
        ctx.fillText(hint.slice(mid + 1), cx, 316);
      } else {
        ctx.fillText(hint, cx, 308);
      }
    }

    // Buttons
    this._drawButton(cx - 75, 340, 150, 42, 'Tekrar Dene', '#E74C3C', '#fff', 15);
    this._drawButton(cx - 55, 395, 110, 32, 'Bolumler', '#3498DB', '#fff', 12);

    this._buttons = [
      {
        x: cx - 75, y: 340, w: 150, h: 42,
        action: () => this._loadLevel(this.currentLevelIndex),
      },
      {
        x: cx - 55, y: 395, w: 110, h: 32,
        action: () => { this.state = STATE.LEVEL_SELECT; },
      },
    ];
  }

  // ── GAME LOGIC ────────────────────────────────────

  _loadLevel(index) {
    if (this.level) {
      this.level.destroy();
    }

    this.physics.reset();

    this.currentLevelIndex = index;
    const data = this.levels[index];

    this.level = new Level(this.physics, data);
    this.drawing.reset(data.inkLimit);
    this.drawing.enabled = true;
    this.surviveTarget = data.surviveTime || 10;
    this.surviveTimer = 0;
    this.stars = 0;
    this.state = STATE.DRAWING;
  }

  _startSimulation() {
    if (this.state !== STATE.DRAWING) return;
    this.drawing.enabled = false;
    this.state = STATE.SIMULATING;
    this.surviveTimer = 0;
    this.level.startSpawners();
  }

  _win() {
    this.state = STATE.WIN;
    this.drawing.enabled = false;

    // Calculate stars
    const data = this.levels[this.currentLevelIndex];
    this.stars = Scoring.calculate(this.drawing.usedInk, data.stars);

    // Happy pets
    for (const pet of this.level.pets) {
      if (pet.alive) pet.rescue();
    }

    // Save progress
    const idx = this.currentLevelIndex;
    const prev = this.progress.stars[idx] || 0;
    if (this.stars > prev) {
      this.progress.stars[idx] = this.stars;
    }
    if (idx + 1 > this.progress.unlockedLevel) {
      this.progress.unlockedLevel = Math.min(idx + 1, this.levels.length - 1);
    }
    saveProgress(this.progress);
  }

  _lose() {
    if (this.state === STATE.LOSE) return; // prevent double-trigger
    this.state = STATE.LOSE;
    this.drawing.enabled = false;

    for (const pet of this.level.pets) {
      if (pet.alive) pet.kill();
    }
  }

  _onCollision(bodyA, bodyB) {
    if (this.state !== STATE.SIMULATING) return;

    // Any pet hit by enemy or hazard = immediate lose
    if (this.level.checkEnemyCollision(bodyA, bodyB)) {
      this._lose();
      return;
    }

    if (this.level.checkHazardCollision(bodyA, bodyB)) {
      this._lose();
      return;
    }
  }

  // ── INPUT HANDLING ─────────────────────────────────

  _onClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;
    const mx = (e.clientX - rect.left) * scaleX;
    const my = (e.clientY - rect.top) * scaleY;

    for (const btn of this._buttons) {
      if (mx >= btn.x && mx <= btn.x + btn.w && my >= btn.y && my <= btn.y + btn.h) {
        btn.action();
        return;
      }
    }
  }

  // ── UI HELPERS ────────────────────────────────────

  _drawButton(x, y, w, h, text, bgColor, textColor, fontSize = 16) {
    const ctx = this.ctx;
    ctx.fillStyle = bgColor;
    this._roundRect(x, y, w, h, 8);
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + w / 2, y + h / 2);
  }

  _roundRect(x, y, w, h, r) {
    const ctx = this.ctx;
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
    ctx.fill();
  }
}
