import Matter from 'matter-js';

const { Bodies, Body } = Matter;

/**
 * Enemy base class - moves toward the pet and pushes the shield.
 * In whiteboxing mode: a red circle.
 */
export class Enemy {
  constructor(physics, x, y, config = {}) {
    this.physics = physics;
    this.alive = true;
    this.radius = config.radius || 12;
    this.speed = config.speed || 2;
    this.color = config.color || '#E74C3C';
    this.label = config.label || 'enemy';
    this.target = null; // Will be set to pet's body

    this.body = Bodies.circle(x, y, this.radius, {
      density: 0.001,
      friction: 0.1,
      restitution: 0.6,
      chamfer: { radius: 2 },
      collisionFilter: { category: physics.categories.ENEMY, mask: 0xFFFFFFFF },
      label: 'enemy',
    });

    physics.addBody(this.body);
  }

  get x() { return this.body.position.x; }
  get y() { return this.body.position.y; }

  setTarget(targetBody) {
    this.target = targetBody;
  }

  update() {
    if (!this.alive || !this.target) return;

    // Cap velocity to prevent tunneling through thin walls
    const vx = this.body.velocity.x;
    const vy = this.body.velocity.y;
    const vel = Math.sqrt(vx * vx + vy * vy);
    const maxVel = 5;
    if (vel > maxVel) {
      const scale = maxVel / vel;
      Body.setVelocity(this.body, { x: vx * scale, y: vy * scale });
    }

    // Move toward target
    const dx = this.target.position.x - this.body.position.x;
    const dy = this.target.position.y - this.body.position.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 1) {
      const fx = (dx / dist) * this.speed * 0.001;
      const fy = (dy / dist) * this.speed * 0.001;
      Body.applyForce(this.body, this.body.position, { x: fx, y: fy });
    }
  }

  kill() {
    this.alive = false;
  }

  render(ctx) {
    const { x, y } = this.body.position;

    ctx.save();
    ctx.translate(x, y);

    // Body (whiteboxing: colored circle)
    ctx.beginPath();
    ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.alive ? this.color : '#888';
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Angry eyes
    if (this.alive) {
      const eyeY = -this.radius * 0.2;
      const eyeSpacing = this.radius * 0.35;
      ctx.fillStyle = '#fff';
      for (const ex of [-eyeSpacing, eyeSpacing]) {
        ctx.beginPath();
        ctx.arc(ex, eyeY, this.radius * 0.2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.fillStyle = '#333';
      for (const ex of [-eyeSpacing, eyeSpacing]) {
        ctx.beginPath();
        ctx.arc(ex, eyeY, this.radius * 0.1, 0, Math.PI * 2);
        ctx.fill();
      }
      // Angry eyebrows
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-eyeSpacing - 4, eyeY - 6);
      ctx.lineTo(-eyeSpacing + 4, eyeY - 3);
      ctx.moveTo(eyeSpacing + 4, eyeY - 6);
      ctx.lineTo(eyeSpacing - 4, eyeY - 3);
      ctx.stroke();
    }

    ctx.restore();
  }

  destroy() {
    this.physics.removeBody(this.body);
  }
}

/**
 * EnemySpawner - spawns enemies from a hive/source point
 * In whiteboxing mode: a dark red hexagon
 */
export class EnemySpawner {
  constructor(physics, x, y, config = {}) {
    this.physics = physics;
    this.x = x;
    this.y = y;
    this.enemies = [];
    this.maxEnemies = config.maxEnemies || 5;
    this.spawnInterval = config.spawnInterval || 1500; // ms
    this.spawnDelay = config.spawnDelay || 0; // delay before first spawn
    this.enemyConfig = config.enemyConfig || {};
    this.color = config.color || '#922B21';
    this.size = config.size || 20;

    this._lastSpawn = -this.spawnDelay;
    this._spawned = 0;
    this._started = false;
  }

  start() {
    this._started = true;
    this._lastSpawn = performance.now() - this.spawnInterval + this.spawnDelay;
  }

  update(now, petBody) {
    if (!this._started) return;

    // Spawn new enemies
    if (this._spawned < this.maxEnemies && now - this._lastSpawn >= this.spawnInterval) {
      const offsetX = (Math.random() - 0.5) * 20;
      const offsetY = (Math.random() - 0.5) * 20;
      const enemy = new Enemy(this.physics, this.x + offsetX, this.y + offsetY, this.enemyConfig);
      if (petBody) enemy.setTarget(petBody);
      this.enemies.push(enemy);
      this._spawned++;
      this._lastSpawn = now;
    }

    // Update all enemies
    for (const enemy of this.enemies) {
      enemy.update();
    }
  }

  render(ctx) {
    // Draw hive/spawner (hexagon)
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const angle = (Math.PI / 3) * i - Math.PI / 6;
      const px = Math.cos(angle) * this.size;
      const py = Math.sin(angle) * this.size;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Hive label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 14px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('!', 0, 0);

    ctx.restore();

    // Draw all spawned enemies
    for (const enemy of this.enemies) {
      enemy.render(ctx);
    }
  }

  destroyAll() {
    for (const enemy of this.enemies) {
      enemy.destroy();
    }
    this.enemies = [];
  }
}
