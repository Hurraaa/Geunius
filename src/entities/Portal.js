import Matter from 'matter-js';

const { Bodies, Body } = Matter;

/**
 * Portal - iki portal birbirine bağlı, giren cisim diğerinden çıkar.
 * Her portal çifti aynı renkte gösterilir.
 */
export class Portal {
  constructor(physics, ax, ay, bx, by, config = {}) {
    this.physics = physics;
    this.radius = config.radius || 22;
    this.color = config.color || '#9B59B6';
    this.colorB = config.colorB || this.color;
    this.label = config.label || 'portal';

    // Portal A
    this.ax = ax;
    this.ay = ay;
    this.sensorA = Bodies.circle(ax, ay, this.radius, {
      isStatic: true,
      isSensor: true,
      collisionFilter: { category: physics.categories.HAZARD },
      label: 'portal_a',
    });

    // Portal B
    this.bx = bx;
    this.by = by;
    this.sensorB = Bodies.circle(bx, by, this.radius, {
      isStatic: true,
      isSensor: true,
      collisionFilter: { category: physics.categories.HAZARD },
      label: 'portal_b',
    });

    physics.addBody(this.sensorA);
    physics.addBody(this.sensorB);

    // Teleport cooldown - aynı cismi sürekli teleport etmeyi önler
    this._cooldowns = new Map(); // bodyId -> timestamp
    this._cooldownTime = 500; // ms

    // Animation
    this._anim = 0;
  }

  /** Check and teleport a body if it overlaps with either portal */
  checkTeleport(body, now) {
    if (body.isStatic) return;
    if (body.label === 'wall' || body.label === 'platform') return;

    // Cooldown check
    const lastTp = this._cooldowns.get(body.id) || 0;
    if (now - lastTp < this._cooldownTime) return;

    const bx = body.position.x;
    const by = body.position.y;

    // Check portal A
    const dxA = bx - this.ax;
    const dyA = by - this.ay;
    const distA = Math.sqrt(dxA * dxA + dyA * dyA);

    if (distA < this.radius) {
      Body.setPosition(body, { x: this.bx, y: this.by });
      this._cooldowns.set(body.id, now);
      return;
    }

    // Check portal B
    const dxB = bx - this.bx;
    const dyB = by - this.by;
    const distB = Math.sqrt(dxB * dxB + dyB * dyB);

    if (distB < this.radius) {
      Body.setPosition(body, { x: this.ax, y: this.ay });
      this._cooldowns.set(body.id, now);
      return;
    }
  }

  update(delta) {
    this._anim += delta * 0.003;
  }

  render(ctx) {
    this._renderPortal(ctx, this.ax, this.ay, this.color, 1);
    this._renderPortal(ctx, this.bx, this.by, this.colorB || this.color, -1);
  }

  _renderPortal(ctx, x, y, color, dir) {
    const r = this.radius;

    // Outer glow
    ctx.beginPath();
    ctx.arc(x, y, r + 4, 0, Math.PI * 2);
    ctx.fillStyle = color + '33';
    ctx.fill();

    // Main circle
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.fillStyle = color + '88';
    ctx.fill();
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Swirl animation
    const a = this._anim * dir;
    for (let i = 0; i < 3; i++) {
      const angle = a + (i * Math.PI * 2) / 3;
      const sr = r * 0.6;
      ctx.beginPath();
      ctx.arc(x, y, sr, angle, angle + 1.2);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    // Center dot
    ctx.beginPath();
    ctx.arc(x, y, 4, 0, Math.PI * 2);
    ctx.fillStyle = '#fff';
    ctx.fill();
  }

  destroy() {
    this.physics.removeBody(this.sensorA);
    this.physics.removeBody(this.sensorB);
  }
}
