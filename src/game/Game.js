import { Physics } from './Physics.js';
import { Drawing } from './Drawing.js';
import { Level } from './Level.js';
import { Scoring } from './Scoring.js';
import { WORLDS, getTotalStars, isWorldUnlocked } from '../data/worlds.js';
import { world1 } from '../data/levels/world1.js';
import { world2 } from '../data/levels/world2.js';
import { world3 } from '../data/levels/world3.js';
import { world4 } from '../data/levels/world4.js';

const VERSION = '0.12.4';
const GAME_WIDTH = 600;
const GAME_HEIGHT = 560;

// All world levels - worlds 5-20 will be added later (yavaş yavaş)
const ALL_WORLDS = [world1, world2, world3, world4];

const STATE = {
  MENU: 'menu',
  WORLD_SELECT: 'world_select',
  LEVEL_SELECT: 'level_select',
  DRAWING: 'drawing',
  SIMULATING: 'simulating',
  WIN: 'win',
  LOSE: 'lose',
};

// Save/load progress
const SAVE_KEY = 'petdraw_save_v2';

function loadProgress() {
  try {
    const data = JSON.parse(localStorage.getItem(SAVE_KEY));
    if (data && data.worlds) return data;
    return { worlds: { 0: { unlockedLevel: 0, stars: {} } } };
  } catch {
    return { worlds: { 0: { unlockedLevel: 0, stars: {} } } };
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

    this._resize();
    window.addEventListener('resize', () => this._resize());

    // Game state
    this.state = STATE.MENU;
    this.currentWorldIndex = 0;
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
    this._menuAnim = 0;

    // World select page
    this._worldPage = 0;
    this._worldsPerPage = 8;

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

  get _currentWorldLevels() {
    return ALL_WORLDS[this.currentWorldIndex] || [];
  }

  get _currentWorldMeta() {
    return WORLDS[this.currentWorldIndex] || WORLDS[0];
  }

  _getWorldProgress(worldIndex) {
    if (!this.progress.worlds[worldIndex]) {
      this.progress.worlds[worldIndex] = { unlockedLevel: 0, stars: {} };
    }
    return this.progress.worlds[worldIndex];
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

      this.surviveTimer += delta / 1000;

      if (this.surviveTimer >= this.surviveTarget) {
        if (this.level.allPetsAlive) {
          this._win();
        } else {
          this._lose();
        }
      }

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

    switch (this.state) {
      case STATE.MENU:
        this._renderMenu();
        break;
      case STATE.WORLD_SELECT:
        this._renderWorldSelect();
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

    // Background
    ctx.fillStyle = '#F5F0E8';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Floating particles
    ctx.fillStyle = '#EDE8DB';
    for (let i = 0; i < 8; i++) {
      const bx = 80 + i * 70 + Math.sin(this._menuAnim + i) * 12;
      const by = 60 + Math.cos(this._menuAnim * 0.7 + i * 1.5) * 25;
      ctx.beginPath();
      ctx.arc(bx, by, 3 + Math.sin(i) * 2, 0, Math.PI * 2);
      ctx.fill();
    }

    // Title
    const titleY = 90 + Math.sin(this._menuAnim * 2) * 4;
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Save Punch!', cx, titleY);

    // Subtitle
    ctx.fillStyle = '#7F8C8D';
    ctx.font = '15px Arial';
    ctx.fillText('Ciz. Koru. Kurtar.', cx, titleY + 35);

    // Dedication text
    ctx.fillStyle = '#BDC3C7';
    ctx.font = 'italic 11px Arial';
    ctx.fillText('Hayvanat bahcesinde zorbalanan Punch\'a ithaf edilmistir', cx, titleY + 55);

    // Animated Punch (monkey character in menu)
    this._renderMenuMonkey(cx, 230);

    // Play button (continues from last world/level)
    this._drawButton(cx - 90, 310, 180, 54, 'OYNA', '#4CAF50', '#fff', 20);

    // World select button
    this._drawButton(cx - 80, 380, 160, 42, 'Dunyalar', '#3498DB', '#fff', 16);

    // Progress info
    const totalStars = getTotalStars(this.progress);
    const availableWorlds = ALL_WORLDS.length;
    ctx.fillStyle = '#BDC3C7';
    ctx.font = '13px Arial';
    ctx.fillText(`Toplam Yildiz: ${totalStars}`, cx, 455);
    ctx.fillText(`Dunya: ${availableWorlds} / 20`, cx, 475);

    // Controls info
    ctx.fillStyle = '#D5D0C5';
    ctx.font = '12px Arial';
    ctx.fillText('Parmaginla ciz, Punch\'i koru!', cx, 510);

    // Version
    ctx.fillStyle = '#CCC';
    ctx.font = '11px Arial';
    ctx.fillText(`v${VERSION}`, cx, 545);

    this._buttons = [
      {
        x: cx - 90, y: 310, w: 180, h: 54,
        action: () => this._continueGame(),
      },
      {
        x: cx - 80, y: 380, w: 160, h: 42,
        action: () => { this.state = STATE.WORLD_SELECT; },
      },
    ];
  }

  _renderMenuMonkey(cx, cy) {
    const ctx = this.ctx;
    const t = this._menuAnim;
    const bounce = Math.sin(t * 3) * 5;

    ctx.save();
    ctx.translate(cx, cy + bounce);

    // Body
    const r = 32;
    ctx.fillStyle = '#8B6914';
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#6B4F10';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Ears
    for (const side of [-1, 1]) {
      ctx.fillStyle = '#8B6914';
      ctx.beginPath();
      ctx.arc(side * r * 0.88, -r * 0.5, r * 0.28, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = '#FDDBB0';
      ctx.beginPath();
      ctx.arc(side * r * 0.88, -r * 0.5, r * 0.15, 0, Math.PI * 2);
      ctx.fill();
    }

    // Face
    ctx.fillStyle = '#FDDBB0';
    ctx.beginPath();
    ctx.ellipse(0, r * 0.12, r * 0.62, r * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Eyes (animated)
    const blinkPhase = Math.sin(t * 4) > 0.95;
    for (const side of [-1, 1]) {
      const ex = side * r * 0.28;
      const ey = -r * 0.12;
      if (blinkPhase) {
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(ex - 5, ey);
        ctx.lineTo(ex + 5, ey);
        ctx.stroke();
      } else {
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ex, ey, 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#555';
        ctx.lineWidth = 0.8;
        ctx.stroke();
        ctx.fillStyle = '#222';
        ctx.beginPath();
        ctx.arc(ex + Math.sin(t * 2) * 2, ey, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ex + 2, ey - 2, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Nose
    ctx.fillStyle = '#B07050';
    ctx.beginPath();
    ctx.ellipse(0, r * 0.08, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, r * 0.22, r * 0.2, 0.15, Math.PI - 0.15);
    ctx.stroke();

    // Tail
    ctx.strokeStyle = '#8B6914';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(r * 0.7, r * 0.3);
    ctx.bezierCurveTo(r * 1.5, r * 0.5, r * 1.5, -r * 0.5, r * 1.0, -r * 0.8);
    ctx.stroke();

    ctx.restore();
  }

  _continueGame() {
    // Find the last world/level the player was on
    for (let w = ALL_WORLDS.length - 1; w >= 0; w--) {
      const wp = this._getWorldProgress(w);
      if (wp.unlockedLevel > 0 || w === 0) {
        this.currentWorldIndex = w;
        this._loadLevel(Math.min(wp.unlockedLevel, ALL_WORLDS[w].length - 1));
        return;
      }
    }
    this.currentWorldIndex = 0;
    this._loadLevel(0);
  }

  // ── WORLD SELECT ──────────────────────────────────

  _renderWorldSelect() {
    const ctx = this.ctx;
    const cx = GAME_WIDTH / 2;

    // Background with subtle gradient
    ctx.fillStyle = '#2C3E50';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Stars background
    for (let i = 0; i < 30; i++) {
      const sx = (i * 97 + Math.sin(i * 3.7) * 50) % GAME_WIDTH;
      const sy = (i * 61 + Math.cos(i * 2.3) * 40) % GAME_HEIGHT;
      ctx.fillStyle = `rgba(255,255,255,${0.1 + Math.sin(this._menuAnim + i) * 0.1})`;
      ctx.beginPath();
      ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Title bar
    ctx.fillStyle = 'rgba(0,0,0,0.4)';
    ctx.fillRect(0, 0, GAME_WIDTH, 55);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Dunyalar', cx, 36);

    // Back button
    this._drawButton(10, 10, 60, 34, '< Geri', '#E74C3C', '#fff', 13);

    // Total stars
    const totalStars = getTotalStars(this.progress);
    ctx.fillStyle = '#F1C40F';
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(`★ ${totalStars}`, GAME_WIDTH - 15, 36);

    this._buttons = [
      { x: 10, y: 10, w: 60, h: 34, action: () => { this.state = STATE.MENU; } },
    ];

    // World cards (2 columns, scrollable pages)
    const cols = 2;
    const cardW = 260;
    const cardH = 100;
    const gap = 16;
    const startX = (GAME_WIDTH - (cols * cardW + gap)) / 2;
    const startY = 70;
    const perPage = this._worldsPerPage;
    const pageStart = this._worldPage * perPage;

    for (let i = 0; i < perPage && pageStart + i < WORLDS.length; i++) {
      const wi = pageStart + i;
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cardW + gap);
      const y = startY + row * (cardH + gap);
      const unlocked = isWorldUnlocked(wi, this.progress);
      const hasLevels = wi < ALL_WORLDS.length;
      const world = WORLDS[wi];
      const wp = this._getWorldProgress(wi);

      // Card background
      if (unlocked && hasLevels) {
        const grad = ctx.createLinearGradient(x, y, x + cardW, y + cardH);
        grad.addColorStop(0, world.bgGradient[0]);
        grad.addColorStop(1, world.bgGradient[1]);
        ctx.fillStyle = grad;
      } else {
        ctx.fillStyle = 'rgba(100,100,100,0.3)';
      }
      this._roundRect(x, y, cardW, cardH, 12);

      // Border
      ctx.strokeStyle = unlocked && hasLevels ? world.accentColor : '#555';
      ctx.lineWidth = 2;
      ctx.beginPath();
      this._roundRectPath(x, y, cardW, cardH, 12);
      ctx.stroke();

      // World icon
      ctx.font = '28px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#fff';
      ctx.fillText(world.icon, x + 12, y + 42);

      // World name
      ctx.fillStyle = unlocked ? '#fff' : '#888';
      ctx.font = 'bold 15px Arial';
      ctx.textAlign = 'left';
      ctx.fillText(`${world.id}. ${world.name}`, x + 50, y + 28);

      // Subtitle
      ctx.fillStyle = unlocked ? 'rgba(255,255,255,0.7)' : '#666';
      ctx.font = '11px Arial';
      ctx.fillText(world.subtitle, x + 50, y + 44);

      // Progress or lock
      if (!unlocked) {
        ctx.fillStyle = '#888';
        ctx.font = '11px Arial';
        ctx.fillText(`★ ${world.unlockRequirement} gerekli`, x + 50, y + 62);
      } else if (!hasLevels) {
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.font = '11px Arial';
        ctx.fillText('Yakinda...', x + 50, y + 62);
      } else {
        // Stars earned
        const worldStars = Object.values(wp.stars || {}).reduce((s, v) => s + v, 0);
        const maxStars = ALL_WORLDS[wi].length * 3;
        ctx.fillStyle = '#F1C40F';
        ctx.font = '12px Arial';
        ctx.fillText(`★ ${worldStars}/${maxStars}`, x + 50, y + 62);

        // Level progress
        const levelsComplete = wp.unlockedLevel || 0;
        ctx.fillStyle = 'rgba(255,255,255,0.5)';
        ctx.fillText(`  |  Bolum ${Math.min(levelsComplete + 1, ALL_WORLDS[wi].length)}/${ALL_WORLDS[wi].length}`, x + 110, y + 62);

        // Progress bar
        const barX = x + 50;
        const barY = y + 72;
        const barW = cardW - 65;
        const barH = 6;
        ctx.fillStyle = 'rgba(0,0,0,0.2)';
        ctx.fillRect(barX, barY, barW, barH);
        ctx.fillStyle = world.accentColor;
        ctx.fillRect(barX, barY, barW * (worldStars / maxStars), barH);
      }

      // Mechanics tags
      if (unlocked && hasLevels && world.mechanics) {
        ctx.font = '9px Arial';
        ctx.fillStyle = 'rgba(255,255,255,0.4)';
        ctx.fillText(world.mechanics.join(' · '), x + 50, y + 90);
      }

      if (unlocked && hasLevels) {
        this._buttons.push({
          x, y, w: cardW, h: cardH,
          action: () => {
            this.currentWorldIndex = wi;
            this.state = STATE.LEVEL_SELECT;
          },
        });
      }
    }

    // Page navigation
    const totalPages = Math.ceil(WORLDS.length / perPage);
    if (totalPages > 1) {
      // Page indicator
      ctx.fillStyle = '#fff';
      ctx.font = '13px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${this._worldPage + 1} / ${totalPages}`, cx, GAME_HEIGHT - 15);

      if (this._worldPage > 0) {
        this._drawButton(cx - 120, GAME_HEIGHT - 45, 80, 30, '< Onceki', '#546E7A', '#fff', 12);
        this._buttons.push({
          x: cx - 120, y: GAME_HEIGHT - 45, w: 80, h: 30,
          action: () => { this._worldPage--; },
        });
      }
      if (this._worldPage < totalPages - 1) {
        this._drawButton(cx + 40, GAME_HEIGHT - 45, 80, 30, 'Sonraki >', '#546E7A', '#fff', 12);
        this._buttons.push({
          x: cx + 40, y: GAME_HEIGHT - 45, w: 80, h: 30,
          action: () => { this._worldPage++; },
        });
      }
    }
  }

  // ── LEVEL SELECT ──────────────────────────────────

  _renderLevelSelect() {
    const ctx = this.ctx;
    const cx = GAME_WIDTH / 2;
    const world = this._currentWorldMeta;
    const levels = this._currentWorldLevels;
    const wp = this._getWorldProgress(this.currentWorldIndex);

    // Themed background
    const grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    grad.addColorStop(0, world.bgGradient[0]);
    grad.addColorStop(1, world.bgGradient[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Title bar
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, GAME_WIDTH, 55);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`${world.icon} ${world.name}`, cx, 24);
    ctx.fillStyle = 'rgba(255,255,255,0.6)';
    ctx.font = '12px Arial';
    ctx.fillText(world.subtitle, cx, 44);

    // Back button
    this._drawButton(10, 10, 60, 34, '< Geri', '#E74C3C', '#fff', 13);

    this._buttons = [
      { x: 10, y: 10, w: 60, h: 34, action: () => { this.state = STATE.WORLD_SELECT; } },
    ];

    // Level grid
    const cols = 5;
    const cellSize = 75;
    const gap = 14;
    const startX = (GAME_WIDTH - (cols * cellSize + (cols - 1) * gap)) / 2;
    const startY = 72;

    for (let i = 0; i < levels.length; i++) {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const x = startX + col * (cellSize + gap);
      const y = startY + row * (cellSize + gap + 18);
      const unlocked = i <= (wp.unlockedLevel || 0);
      const levelStars = wp.stars[i] || 0;

      // Cell background
      if (unlocked) {
        ctx.fillStyle = 'rgba(255,255,255,0.9)';
      } else {
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
      }
      this._roundRect(x, y, cellSize, cellSize, 10);

      // Border
      ctx.strokeStyle = unlocked ? world.accentColor : 'rgba(255,255,255,0.2)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      this._roundRectPath(x, y, cellSize, cellSize, 10);
      ctx.stroke();

      // Level number
      ctx.fillStyle = unlocked ? '#2C3E50' : 'rgba(255,255,255,0.3)';
      ctx.font = 'bold 22px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(`${i + 1}`, x + cellSize / 2, y + 32);

      // Lock icon
      if (!unlocked) {
        ctx.fillStyle = 'rgba(255,255,255,0.3)';
        ctx.font = '16px Arial';
        ctx.fillText('🔒', x + cellSize / 2, y + 56);
      }

      // Stars
      if (levelStars > 0) {
        const starStr = '★'.repeat(levelStars) + '☆'.repeat(3 - levelStars);
        ctx.fillStyle = '#F1C40F';
        ctx.font = '13px Arial';
        ctx.fillText(starStr, x + cellSize / 2, y + cellSize - 6);
      }

      // Level name
      ctx.fillStyle = unlocked ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.2)';
      ctx.font = '9px Arial';
      const name = levels[i].name;
      ctx.fillText(name.length > 12 ? name.slice(0, 11) + '..' : name, x + cellSize / 2, y + cellSize + 13);

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
    const world = this._currentWorldMeta;

    // Themed background
    const grad = ctx.createLinearGradient(0, 0, 0, GAME_HEIGHT);
    grad.addColorStop(0, world.bgGradient[0]);
    grad.addColorStop(1, world.bgGradient[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Level entities
    if (this.level) {
      this.level.render(ctx);
    }

    // Drawing
    this.drawing.render(ctx);

    // UI overlay
    this._renderGameUI();
  }

  _renderGameUI() {
    const ctx = this.ctx;
    const world = this._currentWorldMeta;
    const levels = this._currentWorldLevels;
    const levelData = levels[this.currentLevelIndex];

    // Top bar
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, GAME_WIDTH, 44);

    // World & level info
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 13px Arial';
    ctx.textAlign = 'left';
    ctx.fillText(`${world.icon} ${levelData.id}: ${levelData.name}`, 12, 28);

    // Pet count
    if (this.level && this.level.pets.length > 1) {
      const alive = this.level.alivePetCount;
      const total = this.level.pets.length;
      ctx.fillStyle = alive === total ? '#4CAF50' : '#E74C3C';
      ctx.font = '11px Arial';
      ctx.fillText(`🐵 ${alive}/${total}`, 12, 15);
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

    // Timer
    if (this.state === STATE.SIMULATING) {
      const timeLeft = Math.max(0, this.surviveTarget - this.surviveTimer);
      const timerColor = timeLeft > 5 ? '#fff' : timeLeft > 2 ? '#FF9800' : '#E74C3C';
      ctx.fillStyle = timerColor;
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`${timeLeft.toFixed(1)}s`, GAME_WIDTH - 12, 28);

      const progress = this.surviveTimer / this.surviveTarget;
      const tbX = GAME_WIDTH - 100;
      const tbW = 80;
      ctx.fillStyle = 'rgba(255,255,255,0.2)';
      ctx.fillRect(tbX, 33, tbW, 5);
      ctx.fillStyle = '#4CAF50';
      ctx.fillRect(tbX, 33, tbW * Math.min(1, progress), 5);
    }

    // Buttons
    if (this.state === STATE.DRAWING) {
      if (this.drawing.canUndo) {
        this._drawButton(GAME_WIDTH - 110, 50, 45, 30, 'Geri', '#FF9800', '#fff', 12);
      }
      this._drawButton(GAME_WIDTH - 55, 50, 45, 30, 'Sil', '#E74C3C', '#fff', 12);

      const btnW = 140;
      const btnX = GAME_WIDTH / 2 - btnW / 2;
      this._drawButton(btnX, GAME_HEIGHT - 55, btnW, 42, 'BASLAT', '#4CAF50', '#fff', 18);

      if (levelData.hints && levelData.hints.length > 0) {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        ctx.font = '12px Arial';
        ctx.textAlign = 'center';
        ctx.fillText(levelData.hints[0], GAME_WIDTH / 2, GAME_HEIGHT - 65);
      }
    }

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

      if (this.drawing.canUndo) {
        this._buttons.push({
          x: GAME_WIDTH - 110, y: 50, w: 45, h: 30,
          action: () => this.drawing.undo(),
        });
      }

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
    const world = this._currentWorldMeta;
    const levels = this._currentWorldLevels;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Panel
    ctx.fillStyle = '#fff';
    this._roundRect(cx - 150, 120, 300, 320, 16);

    // Title
    ctx.fillStyle = '#4CAF50';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Tebrikler!', cx, 168);

    // Stars
    const starY = 205;
    for (let i = 0; i < 3; i++) {
      const filled = i < this.stars;
      const bounce = Math.sin(this._menuAnim * 4 + i * 0.5) * 3;
      ctx.font = `${filled ? 36 : 28}px Arial`;
      ctx.fillStyle = filled ? '#F1C40F' : '#DDD';
      ctx.fillText(filled ? '★' : '☆', cx - 50 + i * 50, starY + (filled ? bounce : 0));
    }

    // Level info
    const levelData = levels[this.currentLevelIndex];
    ctx.fillStyle = '#7F8C8D';
    ctx.font = '14px Arial';
    ctx.fillText(`${world.icon} ${levelData.id}: ${levelData.name}`, cx, 245);

    // Ink info
    ctx.fillStyle = '#95A5A6';
    ctx.font = '13px Arial';
    ctx.fillText(`Murekkep: ${Math.round((1 - this.drawing.inkRatio) * 100)}% kaldi`, cx, 270);

    // Pet count
    if (this.level && this.level.pets.length > 1) {
      ctx.fillText(`${this.level.pets.length} maymun kurtarildi!`, cx, 290);
    }

    // Buttons
    this._drawButton(cx - 135, 320, 125, 42, 'Tekrar', '#95A5A6', '#fff', 15);

    const isLastLevel = this.currentLevelIndex >= levels.length - 1;
    if (isLastLevel) {
      this._drawButton(cx + 10, 320, 125, 42, 'Dunyalar', '#3498DB', '#fff', 15);
    } else {
      this._drawButton(cx + 10, 320, 125, 42, 'Sonraki', '#4CAF50', '#fff', 15);
    }

    this._drawButton(cx - 60, 375, 120, 32, 'Bolumler', '#3498DB', '#fff', 12);

    this._buttons = [
      {
        x: cx - 135, y: 320, w: 125, h: 42,
        action: () => this._loadLevel(this.currentLevelIndex),
      },
      {
        x: cx + 10, y: 320, w: 125, h: 42,
        action: () => {
          if (isLastLevel) {
            this.state = STATE.WORLD_SELECT;
          } else {
            this._loadLevel(this.currentLevelIndex + 1);
          }
        },
      },
      {
        x: cx - 60, y: 375, w: 120, h: 32,
        action: () => { this.state = STATE.LEVEL_SELECT; },
      },
    ];
  }

  _renderLoseOverlay() {
    const ctx = this.ctx;
    const cx = GAME_WIDTH / 2;
    const levels = this._currentWorldLevels;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Panel
    ctx.fillStyle = '#fff';
    this._roundRect(cx - 150, 150, 300, 260, 16);

    ctx.fillStyle = '#E74C3C';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Kaybettin!', cx, 200);

    // Sad monkey
    ctx.font = '48px Arial';
    ctx.fillText('🙈', cx, 260);

    // Hint
    const levelData = levels[this.currentLevelIndex];
    if (levelData.hints && levelData.hints.length > 0) {
      ctx.fillStyle = '#7F8C8D';
      ctx.font = '12px Arial';
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
    const levels = this._currentWorldLevels;
    const data = levels[index];

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

    const levels = this._currentWorldLevels;
    const data = levels[this.currentLevelIndex];
    this.stars = Scoring.calculate(this.drawing.usedInk, data.stars);

    for (const pet of this.level.pets) {
      if (pet.alive) pet.rescue();
    }

    // Save progress
    const wp = this._getWorldProgress(this.currentWorldIndex);
    const idx = this.currentLevelIndex;
    const prev = wp.stars[idx] || 0;
    if (this.stars > prev) {
      wp.stars[idx] = this.stars;
    }
    if (idx + 1 > (wp.unlockedLevel || 0)) {
      wp.unlockedLevel = Math.min(idx + 1, levels.length - 1);
    }
    saveProgress(this.progress);
  }

  _lose() {
    if (this.state === STATE.LOSE) return;
    this.state = STATE.LOSE;
    this.drawing.enabled = false;

    for (const pet of this.level.pets) {
      if (pet.alive) pet.kill();
    }
  }

  _onCollision(bodyA, bodyB) {
    if (this.state !== STATE.SIMULATING) return;

    if (this.level.checkEnemyCollision(bodyA, bodyB)) {
      this._lose();
      return;
    }

    if (this.level.checkHazardCollision(bodyA, bodyB)) {
      this._lose();
      return;
    }

    this.level.checkTrampolineCollision(bodyA, bodyB);
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
    ctx.textBaseline = 'alphabetic';
  }

  _roundRect(x, y, w, h, r) {
    const ctx = this.ctx;
    ctx.beginPath();
    this._roundRectPath(x, y, w, h, r);
    ctx.fill();
  }

  _roundRectPath(x, y, w, h, r) {
    const ctx = this.ctx;
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
  }
}
