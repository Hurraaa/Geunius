import Matter from 'matter-js';

const { Bodies } = Matter;

/**
 * Hazard - static environmental danger (fire, water, spikes).
 * In whiteboxing mode: colored rectangles.
 */
export class Hazard {
  constructor(physics, x, y, width, height, type = 'fire') {
    this.physics = physics;
    this.type = type;
    this.width = width;
    this.height = height;

    const props = Hazard.TYPES[type] || Hazard.TYPES.fire;
    this.color = props.color;
    this.label = props.label;

    this.body = Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      isSensor: true, // doesn't physically block, just detects collision
      collisionFilter: { category: physics.categories.HAZARD, mask: 0xFFFFFFFF },
      label: `hazard_${type}`,
    });

    physics.addBody(this.body);

    // Animation state
    this._animTime = Math.random() * Math.PI * 2;
    this._particles = [];
    this._initParticles();
  }

  _initParticles() {
    const count = Math.max(4, Math.floor(this.width / 15));
    for (let i = 0; i < count; i++) {
      this._particles.push(this._newParticle());
    }
  }

  _newParticle() {
    return {
      x: (Math.random() - 0.5) * this.width,
      y: 0,
      vx: (Math.random() - 0.5) * 0.5,
      vy: -Math.random() * 1.5 - 0.5,
      life: Math.random(),
      maxLife: 0.6 + Math.random() * 0.6,
      size: 3 + Math.random() * 5,
    };
  }

  update(delta) {
    const dt = delta * 0.001;
    this._animTime += dt;

    // Update particles for fire/lava
    if (this.type === 'fire' || this.type === 'lava') {
      for (const p of this._particles) {
        p.life += dt;
        p.x += p.vx;
        p.y += p.vy * (this.type === 'lava' ? 0.5 : 1);
        p.vy -= dt * 0.3; // rise faster over time

        if (p.life >= p.maxLife) {
          Object.assign(p, this._newParticle());
        }
      }
    }
  }

  render(ctx) {
    const { x, y } = this.body.position;
    const halfW = this.width / 2;
    const halfH = this.height / 2;

    ctx.save();
    ctx.translate(x, y);

    if (this.type === 'fire') this._renderFire(ctx, halfW, halfH);
    else if (this.type === 'lava') this._renderLava(ctx, halfW, halfH);
    else if (this.type === 'spikes') this._renderSpikes(ctx, halfW, halfH);
    else if (this.type === 'water') this._renderWater(ctx, halfW, halfH);
    else this._renderGeneric(ctx, halfW, halfH);

    ctx.restore();
  }

  _renderFire(ctx, halfW, halfH) {
    // Dark ember base
    ctx.fillStyle = '#4A1A0A';
    ctx.fillRect(-halfW, -halfH, this.width, this.height);

    // Glowing gradient overlay
    const glow = ctx.createLinearGradient(0, halfH, 0, -halfH);
    glow.addColorStop(0, 'rgba(255, 80, 0, 0.9)');
    glow.addColorStop(0.4, 'rgba(255, 160, 20, 0.6)');
    glow.addColorStop(1, 'rgba(255, 200, 50, 0.1)');
    ctx.fillStyle = glow;
    ctx.fillRect(-halfW, -halfH, this.width, this.height);

    // Animated flame tongues
    const flameCount = Math.max(3, Math.floor(this.width / 20));
    for (let i = 0; i < flameCount; i++) {
      const fx = -halfW + (i + 0.5) * (this.width / flameCount);
      const phase = this._animTime * 3 + i * 1.7;
      const flameH = halfH * (0.6 + Math.sin(phase) * 0.3);
      const flameW = this.width / flameCount * 0.6;

      // Outer flame (orange-red)
      ctx.beginPath();
      ctx.moveTo(fx - flameW, halfH);
      ctx.quadraticCurveTo(fx - flameW * 0.3, -halfH + halfH - flameH * 0.5, fx, -halfH - flameH * 0.7);
      ctx.quadraticCurveTo(fx + flameW * 0.3, -halfH + halfH - flameH * 0.5, fx + flameW, halfH);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, ${80 + Math.sin(phase + 1) * 40}, 0, 0.7)`;
      ctx.fill();

      // Inner flame (yellow-white)
      const innerW = flameW * 0.4;
      const innerH = flameH * 0.5;
      ctx.beginPath();
      ctx.moveTo(fx - innerW, halfH);
      ctx.quadraticCurveTo(fx, -halfH + halfH - innerH, fx + innerW, halfH);
      ctx.closePath();
      ctx.fillStyle = `rgba(255, 240, 100, ${0.5 + Math.sin(phase * 2) * 0.2})`;
      ctx.fill();
    }

    // Rising ember particles
    for (const p of this._particles) {
      const alpha = 1 - (p.life / p.maxLife);
      const r = 255;
      const g = Math.floor(100 + 155 * (1 - p.life / p.maxLife));
      ctx.beginPath();
      ctx.arc(p.x, -halfH + p.y, p.size * alpha, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r}, ${g}, 0, ${alpha * 0.8})`;
      ctx.fill();
    }
  }

  _renderLava(ctx, halfW, halfH) {
    // Dark rock base
    ctx.fillStyle = '#2C0A0A';
    ctx.fillRect(-halfW, -halfH, this.width, this.height);

    // Lava gradient
    const lavaGrad = ctx.createLinearGradient(0, halfH, 0, -halfH);
    lavaGrad.addColorStop(0, 'rgba(180, 30, 0, 0.9)');
    lavaGrad.addColorStop(0.5, 'rgba(220, 80, 0, 0.8)');
    lavaGrad.addColorStop(1, 'rgba(255, 120, 0, 0.6)');
    ctx.fillStyle = lavaGrad;
    ctx.fillRect(-halfW, -halfH, this.width, this.height);

    // Bubbling surface - wavy top
    ctx.beginPath();
    ctx.moveTo(-halfW, -halfH);
    for (let lx = -halfW; lx <= halfW; lx += 4) {
      const waveY = Math.sin(this._animTime * 2 + lx * 0.05) * 3 +
                    Math.sin(this._animTime * 3.5 + lx * 0.08) * 2;
      ctx.lineTo(lx, -halfH + waveY);
    }
    ctx.lineTo(halfW, -halfH - 10);
    ctx.lineTo(-halfW, -halfH - 10);
    ctx.closePath();
    ctx.fillStyle = '#1a0505';
    ctx.fill();

    // Lava bubbles
    const bubbleCount = Math.max(2, Math.floor(this.width / 30));
    for (let i = 0; i < bubbleCount; i++) {
      const phase = this._animTime * 1.5 + i * 2.3;
      const bubbleX = -halfW + ((i * 37 + Math.floor(phase) * 13) % this.width);
      const bubbleProg = (phase % 1);
      const bubbleY = halfH - bubbleProg * this.height * 0.6;
      const bubbleR = (3 + Math.sin(i * 7) * 2) * (1 - bubbleProg * 0.5);

      ctx.beginPath();
      ctx.arc(bubbleX, bubbleY, bubbleR, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 200, 50, ${0.6 * (1 - bubbleProg)})`;
      ctx.fill();
    }

    // Glow effect at top
    const glowGrad = ctx.createLinearGradient(0, -halfH - 8, 0, -halfH + 5);
    glowGrad.addColorStop(0, 'rgba(255, 100, 0, 0)');
    glowGrad.addColorStop(1, 'rgba(255, 100, 0, 0.3)');
    ctx.fillStyle = glowGrad;
    ctx.fillRect(-halfW, -halfH - 8, this.width, 13);
  }

  _renderSpikes(ctx, halfW, halfH) {
    // Base
    ctx.fillStyle = '#5D4037';
    ctx.fillRect(-halfW, 0, this.width, halfH);

    // Spike triangles
    const spikeW = Math.min(16, this.width / 3);
    const spikeCount = Math.max(2, Math.floor(this.width / spikeW));
    const actualW = this.width / spikeCount;

    for (let i = 0; i < spikeCount; i++) {
      const sx = -halfW + i * actualW;
      const spikeH = this.height * 0.7 + Math.sin(i * 1.3) * this.height * 0.15;

      // Shadow spike
      ctx.beginPath();
      ctx.moveTo(sx + 2, halfH);
      ctx.lineTo(sx + actualW / 2 + 2, halfH - spikeH + 2);
      ctx.lineTo(sx + actualW + 2, halfH);
      ctx.closePath();
      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.fill();

      // Main spike
      const grad = ctx.createLinearGradient(0, halfH, 0, halfH - spikeH);
      grad.addColorStop(0, '#8D6E63');
      grad.addColorStop(0.7, '#BDBDBD');
      grad.addColorStop(1, '#E0E0E0');
      ctx.beginPath();
      ctx.moveTo(sx, halfH);
      ctx.lineTo(sx + actualW / 2, halfH - spikeH);
      ctx.lineTo(sx + actualW, halfH);
      ctx.closePath();
      ctx.fillStyle = grad;
      ctx.fill();

      // Metallic edge highlight
      ctx.beginPath();
      ctx.moveTo(sx + actualW * 0.3, halfH);
      ctx.lineTo(sx + actualW / 2, halfH - spikeH);
      ctx.strokeStyle = 'rgba(255,255,255,0.4)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }
  }

  _renderWater(ctx, halfW, halfH) {
    // Deep water base
    ctx.fillStyle = '#1A5276';
    ctx.fillRect(-halfW, -halfH, this.width, this.height);

    // Lighter gradient
    const wGrad = ctx.createLinearGradient(0, -halfH, 0, halfH);
    wGrad.addColorStop(0, 'rgba(52, 152, 219, 0.8)');
    wGrad.addColorStop(0.5, 'rgba(41, 128, 185, 0.6)');
    wGrad.addColorStop(1, 'rgba(26, 82, 118, 0.9)');
    ctx.fillStyle = wGrad;
    ctx.fillRect(-halfW, -halfH, this.width, this.height);

    // Animated wave surface
    ctx.beginPath();
    ctx.moveTo(-halfW, -halfH);
    for (let wx = -halfW; wx <= halfW; wx += 3) {
      const wy = Math.sin(this._animTime * 2.5 + wx * 0.06) * 4 +
                 Math.sin(this._animTime * 1.8 + wx * 0.1) * 2;
      ctx.lineTo(wx, -halfH + wy);
    }
    ctx.lineTo(halfW, -halfH - 15);
    ctx.lineTo(-halfW, -halfH - 15);
    ctx.closePath();
    ctx.fillStyle = '#0a1a2a';
    ctx.fill();

    // Surface shine
    const shineX = -halfW + ((this._animTime * 30) % (this.width + 40)) - 20;
    const shineGrad = ctx.createLinearGradient(shineX, 0, shineX + 40, 0);
    shineGrad.addColorStop(0, 'rgba(255,255,255,0)');
    shineGrad.addColorStop(0.5, 'rgba(255,255,255,0.15)');
    shineGrad.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shineGrad;
    ctx.fillRect(-halfW, -halfH, this.width, this.height * 0.3);

    // Light caustics
    for (let i = 0; i < 3; i++) {
      const cx = Math.sin(this._animTime + i * 2.1) * halfW * 0.6;
      const cy = Math.cos(this._animTime * 0.8 + i * 1.5) * halfH * 0.3;
      ctx.beginPath();
      ctx.arc(cx, cy, 8 + Math.sin(this._animTime * 3 + i) * 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      ctx.fill();
    }
  }

  _renderGeneric(ctx, halfW, halfH) {
    ctx.fillStyle = this.color;
    ctx.fillRect(-halfW, -halfH, this.width, this.height);
    ctx.fillStyle = '#fff';
    ctx.font = `${Math.min(this.width, this.height) * 0.5}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Hazard.TYPES[this.type]?.icon || '!', 0, 0);
  }

  destroy() {
    this.physics.removeBody(this.body);
  }
}

Hazard.TYPES = {
  fire: { color: '#FF6B6B', label: 'Ateş', icon: '🔥' },
  water: { color: '#3498DB', label: 'Su', icon: '💧' },
  spikes: { color: '#E67E22', label: 'Diken', icon: '▲' },
  lava: { color: '#E74C3C', label: 'Lav', icon: '🌋' },
};
