import Matter from 'matter-js';

const { Body } = Matter;

/**
 * Fan / Rüzgar bölgesi - içindeki cisimlere sürekli kuvvet uygular.
 * Yön: 'up', 'down', 'left', 'right'
 */
export class Fan {
  constructor(physics, x, y, config = {}) {
    this.physics = physics;
    this.x = x;
    this.y = y;
    this.width = config.width || 60;
    this.height = config.height || 120;
    this.direction = config.direction || 'up'; // up, down, left, right
    this.strength = config.strength || 0.002;
    this.color = config.color || '#3498DB';

    // Yön vektörü
    this.forceDir = { x: 0, y: 0 };
    switch (this.direction) {
      case 'up':    this.forceDir = { x: 0, y: -this.strength }; break;
      case 'down':  this.forceDir = { x: 0, y: this.strength }; break;
      case 'left':  this.forceDir = { x: -this.strength, y: 0 }; break;
      case 'right': this.forceDir = { x: this.strength, y: 0 }; break;
    }

    // Animation
    this._anim = 0;
    this._particles = [];
  }

  /** Check if a body is within the fan zone and apply force */
  applyForce(body) {
    if (body.isStatic) return;

    const bx = body.position.x;
    const by = body.position.y;
    const halfW = this.width / 2;
    const halfH = this.height / 2;

    if (bx >= this.x - halfW && bx <= this.x + halfW &&
        by >= this.y - halfH && by <= this.y + halfH) {
      Body.applyForce(body, body.position, this.forceDir);
    }
  }

  update(delta) {
    this._anim += delta * 0.005;

    // Particle oluştur
    if (Math.random() < 0.3) {
      const halfW = this.width / 2;
      const halfH = this.height / 2;
      let px, py;

      // Rüzgarın başlangıç noktasından particle çıkar
      switch (this.direction) {
        case 'up':
          px = this.x + (Math.random() - 0.5) * this.width;
          py = this.y + halfH;
          break;
        case 'down':
          px = this.x + (Math.random() - 0.5) * this.width;
          py = this.y - halfH;
          break;
        case 'left':
          px = this.x + halfW;
          py = this.y + (Math.random() - 0.5) * this.height;
          break;
        case 'right':
          px = this.x - halfW;
          py = this.y + (Math.random() - 0.5) * this.height;
          break;
      }

      this._particles.push({ x: px, y: py, life: 1 });
    }

    // Particles güncelle
    const speed = 2;
    for (const p of this._particles) {
      p.x += this.forceDir.x * speed * delta;
      p.y += this.forceDir.y * speed * delta;
      p.life -= delta * 0.003;
    }
    this._particles = this._particles.filter(p => p.life > 0);
  }

  render(ctx) {
    const halfW = this.width / 2;
    const halfH = this.height / 2;

    // Bölge arka planı
    ctx.fillStyle = this.color + '22';
    ctx.fillRect(this.x - halfW, this.y - halfH, this.width, this.height);

    // Sınır çizgisi (kesikli)
    ctx.strokeStyle = this.color + '66';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(this.x - halfW, this.y - halfH, this.width, this.height);
    ctx.setLineDash([]);

    // Particles (rüzgar çizgileri)
    for (const p of this._particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255,255,255,${p.life * 0.6})`;
      ctx.fill();
    }

    // Rüzgar yön oku
    ctx.fillStyle = this.color + 'AA';
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    const arrows = { up: '↑', down: '↓', left: '←', right: '→' };
    const arrowBounce = Math.sin(this._anim * 3) * 3;
    let ax = this.x, ay = this.y;
    if (this.direction === 'up' || this.direction === 'down') ay += arrowBounce;
    else ax += arrowBounce;
    ctx.fillText(arrows[this.direction], ax, ay);
  }

  destroy() {
    // Fan has no physics body, just cleanup
    this._particles = [];
  }
}
