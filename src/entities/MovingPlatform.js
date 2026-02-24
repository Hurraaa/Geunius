import Matter from 'matter-js';

const { Bodies, Body } = Matter;

/**
 * Moving Platform - iki nokta arasında hareket eden platform.
 * Üstündeki cisimler sürtünme sayesinde birlikte hareket eder.
 */
export class MovingPlatform {
  constructor(physics, x1, y1, x2, y2, config = {}) {
    this.physics = physics;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
    this.width = config.width || 80;
    this.height = config.height || 16;
    this.speed = config.speed || 0.001; // 0-1 arasında hareket hızı
    this.color = config.color || '#1ABC9C';
    this.pauseTime = config.pauseTime || 500; // uçlarda bekleme süresi (ms)

    this.body = Bodies.rectangle(x1, y1, this.width, this.height, {
      isStatic: true,
      friction: 0.9,
      restitution: 0.05,
      collisionFilter: { category: physics.categories.PLATFORM, mask: 0xFFFFFFFF },
      label: 'moving_platform',
    });

    physics.addBody(this.body);

    // Hareket durumu
    this._progress = 0; // 0 = nokta A, 1 = nokta B
    this._direction = 1; // 1 = A→B, -1 = B→A
    this._paused = false;
    this._pauseTimer = 0;
  }

  update(delta) {
    if (this._paused) {
      this._pauseTimer -= delta;
      if (this._pauseTimer <= 0) {
        this._paused = false;
        this._direction *= -1;
      }
      return;
    }

    this._progress += this._direction * this.speed * delta;

    // Uç noktalara ulaştığında dur
    if (this._progress >= 1) {
      this._progress = 1;
      this._paused = true;
      this._pauseTimer = this.pauseTime;
    } else if (this._progress <= 0) {
      this._progress = 0;
      this._paused = true;
      this._pauseTimer = this.pauseTime;
    }

    // Pozisyonu güncelle
    const x = this.x1 + (this.x2 - this.x1) * this._progress;
    const y = this.y1 + (this.y2 - this.y1) * this._progress;
    Body.setPosition(this.body, { x, y });
  }

  render(ctx) {
    const verts = this.body.vertices;

    // Gölge
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.beginPath();
    ctx.moveTo(verts[0].x + 2, verts[0].y + 2);
    for (let i = 1; i < verts.length; i++) {
      ctx.lineTo(verts[i].x + 2, verts[i].y + 2);
    }
    ctx.closePath();
    ctx.fill();

    // Platform
    ctx.beginPath();
    ctx.moveTo(verts[0].x, verts[0].y);
    for (let i = 1; i < verts.length; i++) {
      ctx.lineTo(verts[i].x, verts[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#16A085';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Hareket çizgileri (raylar)
    ctx.strokeStyle = this.color + '44';
    ctx.lineWidth = 1;
    ctx.setLineDash([3, 5]);
    ctx.beginPath();
    ctx.moveTo(this.x1, this.y1);
    ctx.lineTo(this.x2, this.y2);
    ctx.stroke();
    ctx.setLineDash([]);

    // Ok göstergesi
    const cx = this.body.position.x;
    const cy = this.body.position.y;
    ctx.fillStyle = '#fff';
    ctx.font = '10px Arial';
    ctx.textAlign = 'center';
    const arrow = this._direction > 0 ? '→' : '←';
    ctx.fillText(arrow, cx, cy + 4);
  }

  destroy() {
    this.physics.removeBody(this.body);
  }
}
