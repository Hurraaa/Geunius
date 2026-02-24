import { Physics } from './Physics.js';
import { Drawing } from './Drawing.js';
import { Level } from './Level.js';
import { Scoring } from './Scoring.js';
import { world1 } from '../data/levels/world1.js';

const GAME_WIDTH = 600;
const GAME_HEIGHT = 560;

const STATE = {
  MENU: 'menu',
  DRAWING: 'drawing',     // player is drawing the shield
  SIMULATING: 'simulating', // physics running, enemies attacking
  WIN: 'win',
  LOSE: 'lose',
};

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
    this.surviveTarget = 10; // seconds

    // Core systems
    this.physics = new Physics(canvas, GAME_WIDTH, GAME_HEIGHT);
    this.drawing = new Drawing(canvas, this.physics);
    this.level = null;

    // Timing
    this._lastTime = 0;
    this._animFrame = null;

    // Collision handling
    this.physics.onCollision((a, b) => this._onCollision(a, b));

    // UI buttons (simple rectangles for now)
    this._buttons = [];

    // Click/touch handling for buttons
    this.canvas.addEventListener('click', (e) => this._onClick(e));
    this.canvas.addEventListener('touchend', (e) => {
      // Only handle button taps - drawing is handled separately
      if (e.changedTouches.length > 0) {
        this._onClick(e.changedTouches[0]);
      }
    });
  }

  _resize() {
    // Maintain aspect ratio, fill screen
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
    const delta = Math.min(now - this._lastTime, 32); // cap at ~30fps min
    this._lastTime = now;

    this._update(now, delta);
    this._render();

    this._animFrame = requestAnimationFrame(() => this._loop());
  }

  _update(now, delta) {
    if (this.state === STATE.SIMULATING) {
      this.physics.update(delta);
      this.level.update(now, delta);

      // Update survive timer
      this.surviveTimer += delta / 1000;

      // Win condition: survived long enough
      if (this.surviveTimer >= this.surviveTarget) {
        this._win();
      }

      // Lose condition: pet fell off screen
      if (this.level.isPetOffScreen(GAME_HEIGHT)) {
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

    // Title
    ctx.fillStyle = '#2C3E50';
    ctx.font = 'bold 36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('PetDraw Rescue', cx, 120);

    // Subtitle
    ctx.fillStyle = '#7F8C8D';
    ctx.font = '16px Arial';
    ctx.fillText('Çiz. Koru. Kurtar.', cx, 160);

    // Pet icon (big green square with face)
    ctx.fillStyle = '#4CAF50';
    ctx.fillRect(cx - 30, 200, 60, 60);
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(cx - 30, 200, 60, 60);
    // Eyes
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.arc(cx - 10, 222, 4, 0, Math.PI * 2);
    ctx.arc(cx + 10, 222, 4, 0, Math.PI * 2);
    ctx.fill();
    // Smile
    ctx.beginPath();
    ctx.arc(cx, 240, 10, 0, Math.PI);
    ctx.stroke();

    // Play button
    this._drawButton(cx - 80, 310, 160, 50, 'OYNA', '#4CAF50', '#fff');

    // Level info
    ctx.fillStyle = '#95A5A6';
    ctx.font = '14px Arial';
    ctx.fillText(`Bölüm ${this.currentLevelIndex + 1} / ${this.levels.length}`, cx, 400);

    // Controls info
    ctx.fillStyle = '#BDC3C7';
    ctx.font = '13px Arial';
    ctx.fillText('Fare ile çiz, kalkana dönüşsün!', cx, 450);
    ctx.fillText('Düşmanlardan hayvanı koru.', cx, 470);

    // Handle click
    this._buttons = [
      {
        x: cx - 80, y: 310, w: 160, h: 50,
        action: () => this._loadLevel(this.currentLevelIndex),
      },
    ];
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
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    const levelData = this.levels[this.currentLevelIndex];
    ctx.fillText(`Bölüm ${levelData.id}: ${levelData.name}`, 12, 28);

    // Ink bar
    const barX = 320;
    const barW = 160;
    const barH = 14;
    const barY = 15;

    // Bar background
    ctx.fillStyle = 'rgba(255,255,255,0.2)';
    ctx.fillRect(barX, barY, barW, barH);

    // Bar fill
    const inkLeft = 1 - this.drawing.inkRatio;
    const barColor = inkLeft > 0.5 ? '#4CAF50' : inkLeft > 0.25 ? '#FF9800' : '#E74C3C';
    ctx.fillStyle = barColor;
    ctx.fillRect(barX, barY, barW * inkLeft, barH);

    // Bar border
    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1;
    ctx.strokeRect(barX, barY, barW, barH);

    // Ink label
    ctx.fillStyle = '#fff';
    ctx.font = '11px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(`Mürekkep: ${Math.round(inkLeft * 100)}%`, barX + barW / 2, barY + 11);

    // Timer (during simulation)
    if (this.state === STATE.SIMULATING) {
      const timeLeft = Math.max(0, this.surviveTarget - this.surviveTimer);
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'right';
      ctx.fillText(`⏱ ${timeLeft.toFixed(1)}s`, GAME_WIDTH - 12, 28);
    }

    // Restart button
    if (this.state === STATE.DRAWING || this.state === STATE.SIMULATING) {
      this._drawButton(GAME_WIDTH - 55, 50, 45, 30, '↩', '#E74C3C', '#fff', 14);
    }

    // Start button (only during drawing phase)
    if (this.state === STATE.DRAWING) {
      const btnW = 140;
      const btnX = GAME_WIDTH / 2 - btnW / 2;
      this._drawButton(btnX, GAME_HEIGHT - 55, btnW, 42, '▶ BAŞLAT', '#4CAF50', '#fff');
    }

    this._setupGameButtons();
  }

  _setupGameButtons() {
    this._buttons = [];

    if (this.state === STATE.DRAWING) {
      // Start button
      const btnW = 140;
      const btnX = GAME_WIDTH / 2 - btnW / 2;
      this._buttons.push({
        x: btnX, y: GAME_HEIGHT - 55, w: btnW, h: 42,
        action: () => this._startSimulation(),
      });
    }

    // Restart button
    if (this.state === STATE.DRAWING || this.state === STATE.SIMULATING) {
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

    // Dim background
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Panel
    ctx.fillStyle = '#fff';
    this._roundRect(cx - 140, 150, 280, 260, 16);

    // Title
    ctx.fillStyle = '#4CAF50';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Tebrikler!', cx, 200);

    // Stars
    const starY = 240;
    const starSize = 30;
    for (let i = 0; i < 3; i++) {
      ctx.font = `${starSize}px Arial`;
      ctx.fillText(i < this.stars ? '⭐' : '☆', cx - 40 + i * 40, starY);
    }

    // Ink info
    ctx.fillStyle = '#7F8C8D';
    ctx.font = '14px Arial';
    ctx.fillText(`Mürekkep: ${Math.round((1 - this.drawing.inkRatio) * 100)}% kaldı`, cx, 280);

    // Buttons
    this._drawButton(cx - 120, 310, 110, 40, '↩ Tekrar', '#95A5A6', '#fff');
    this._drawButton(cx + 10, 310, 110, 40, 'Sonraki ▶', '#4CAF50', '#fff');

    this._buttons = [
      {
        x: cx - 120, y: 310, w: 110, h: 40,
        action: () => this._loadLevel(this.currentLevelIndex),
      },
      {
        x: cx + 10, y: 310, w: 110, h: 40,
        action: () => {
          if (this.currentLevelIndex < this.levels.length - 1) {
            this.currentLevelIndex++;
          }
          this._loadLevel(this.currentLevelIndex);
        },
      },
    ];
  }

  _renderLoseOverlay() {
    const ctx = this.ctx;
    const cx = GAME_WIDTH / 2;

    // Dim background
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Panel
    ctx.fillStyle = '#fff';
    this._roundRect(cx - 140, 170, 280, 220, 16);

    // Title
    ctx.fillStyle = '#E74C3C';
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Kaybettin!', cx, 220);

    // Sad pet
    ctx.font = '48px Arial';
    ctx.fillText('😢', cx, 280);

    // Hint
    const levelData = this.levels[this.currentLevelIndex];
    if (levelData.hints && levelData.hints.length > 0) {
      ctx.fillStyle = '#7F8C8D';
      ctx.font = '13px Arial';
      ctx.fillText(levelData.hints[0], cx, 320);
    }

    // Retry button
    this._drawButton(cx - 70, 340, 140, 40, '↩ Tekrar Dene', '#E74C3C', '#fff');

    this._buttons = [
      {
        x: cx - 70, y: 340, w: 140, h: 40,
        action: () => this._loadLevel(this.currentLevelIndex),
      },
    ];
  }

  // ── GAME LOGIC ────────────────────────────────────

  _loadLevel(index) {
    // Clean up previous level
    if (this.level) {
      this.level.destroy();
    }

    // Reset physics (keep walls)
    this.physics.engine.world.bodies = [];
    this.physics._createWalls();

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
      pet.rescue();
    }
  }

  _lose() {
    this.state = STATE.LOSE;
    this.drawing.enabled = false;

    // Kill pets
    for (const pet of this.level.pets) {
      pet.kill();
    }
  }

  _onCollision(bodyA, bodyB) {
    if (this.state !== STATE.SIMULATING) return;

    // Pet hit by enemy
    if (this.level.checkEnemyCollision(bodyA, bodyB)) {
      this._lose();
    }

    // Pet fell into hazard
    if (this.level.checkHazardCollision(bodyA, bodyB)) {
      this._lose();
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
