import Matter from 'matter-js';

const { Bodies, Body } = Matter;

/**
 * Trampoline - üstüne düşen cisimleri yukarı fırlatır.
 * Görsel: renkli yay platformu, zıplama animasyonu.
 */
export class Trampoline {
  constructor(physics, x, y, config = {}) {
    this.physics = physics;
    this.x = x;
    this.y = y;
    this.width = config.width || 80;
    this.height = config.height || 14;
    this.force = config.force || 0.08; // fırlatma gücü
    this.color = config.color || '#E67E22';

    this.body = Bodies.rectangle(x, y, this.width, this.height, {
      isStatic: true,
      restitution: 1.5, // çok zıplayıcı
      friction: 0.3,
      collisionFilter: { category: physics.categories.PLATFORM },
      label: 'trampoline',
    });

    physics.addBody(this.body);

    // Animation
    this._bounceAnim = 0;
    this._lastBounce = 0;
  }

  /** Bir cisim trambolinde zıpladığında çağır */
  bounce(body, now) {
    if (body.isStatic) return;
    // Yukarı fırlat
    Body.setVelocity(body, {
      x: body.velocity.x * 0.5,
      y: -this.force * 100,
    });
    this._lastBounce = now || performance.now();
    this._bounceAnim = 1;
  }

  update(delta) {
    if (this._bounceAnim > 0) {
      this._bounceAnim -= delta * 0.004;
      if (this._bounceAnim < 0) this._bounceAnim = 0;
    }
  }

  render(ctx) {
    const x = this.x;
    const y = this.y;
    const w = this.width;
    const h = this.height;
    const squash = this._bounceAnim * 4;

    // Yay bacakları
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 3;
    const legW = w * 0.35;
    // Sol bacak
    ctx.beginPath();
    ctx.moveTo(x - legW, y + h / 2);
    ctx.lineTo(x - legW, y + h / 2 + 12 + squash);
    ctx.stroke();
    // Sağ bacak
    ctx.beginPath();
    ctx.moveTo(x + legW, y + h / 2);
    ctx.lineTo(x + legW, y + h / 2 + 12 + squash);
    ctx.stroke();

    // Yay (zigzag)
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.beginPath();
    const zigCount = 5;
    const zigH = 10 + squash;
    for (let i = 0; i <= zigCount; i++) {
      const zx = x - legW + (legW * 2) * (i / zigCount);
      const zy = y + h / 2 + (i % 2 === 0 ? 2 : zigH);
      if (i === 0) ctx.moveTo(zx, zy);
      else ctx.lineTo(zx, zy);
    }
    ctx.stroke();

    // Platform üst yüzeyi
    ctx.fillStyle = this.color;
    ctx.fillRect(x - w / 2, y - h / 2 - squash, w, h);
    ctx.strokeStyle = '#D35400';
    ctx.lineWidth = 2;
    ctx.strokeRect(x - w / 2, y - h / 2 - squash, w, h);

    // Oklari göster
    if (this._bounceAnim > 0.3) {
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('^', x, y - h / 2 - squash - 5);
    }
  }

  destroy() {
    this.physics.removeBody(this.body);
  }
}
