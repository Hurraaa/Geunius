import Matter from 'matter-js';

const { Body } = Matter;

/**
 * GravityZone - Yerçekimini değiştiren bölge.
 * type: 'reverse' (ters), 'zero' (sıfır), 'strong' (güçlü), 'left', 'right'
 */
export class GravityZone {
  constructor(physics, x, y, config = {}) {
    this.physics = physics;
    this.x = x;
    this.y = y;
    this.width = config.width || 100;
    this.height = config.height || 100;
    this.type = config.type || 'reverse'; // reverse, zero, strong, left, right

    // Kuvvet vektörü
    this.force = { x: 0, y: 0 };
    switch (this.type) {
      case 'reverse': this.force = { x: 0, y: -0.003 }; break;
      case 'zero':    this.force = { x: 0, y: -0.001 }; break; // yerçekimini dengeliyor
      case 'strong':  this.force = { x: 0, y: 0.002 }; break;
      case 'left':    this.force = { x: -0.002, y: 0 }; break;
      case 'right':   this.force = { x: 0.002, y: 0 }; break;
    }

    // Renk
    this.colors = {
      reverse: '#9B59B6',
      zero: '#F39C12',
      strong: '#E74C3C',
      left: '#3498DB',
      right: '#3498DB',
    };
    this.color = this.colors[this.type] || '#9B59B6';

    // Animation
    this._anim = 0;
  }

  /** Apply gravity effect to bodies inside this zone */
  applyEffect(body) {
    if (body.isStatic) return;

    const bx = body.position.x;
    const by = body.position.y;
    const halfW = this.width / 2;
    const halfH = this.height / 2;

    if (bx >= this.x - halfW && bx <= this.x + halfW &&
        by >= this.y - halfH && by <= this.y + halfH) {
      Body.applyForce(body, body.position, this.force);
    }
  }

  update(delta) {
    this._anim += delta * 0.002;
  }

  render(ctx) {
    const halfW = this.width / 2;
    const halfH = this.height / 2;

    // Bölge arka planı
    ctx.fillStyle = this.color + '18';
    ctx.fillRect(this.x - halfW, this.y - halfH, this.width, this.height);

    // Sınır
    ctx.strokeStyle = this.color + '55';
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(this.x - halfW, this.y - halfH, this.width, this.height);
    ctx.setLineDash([]);

    // İkon ve ok
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    const icons = {
      reverse: '↑↑',
      zero: '~',
      strong: '↓↓',
      left: '←←',
      right: '→→',
    };
    const labels = {
      reverse: 'TERS',
      zero: 'SIFIR-G',
      strong: 'AGIR',
      left: 'SOL',
      right: 'SAG',
    };

    // Floating arrows
    const bounce = Math.sin(this._anim * 3) * 4;
    ctx.fillStyle = this.color + 'AA';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(icons[this.type], this.x, this.y + bounce);

    // Label
    ctx.fillStyle = this.color + '88';
    ctx.font = '9px Arial';
    ctx.fillText(labels[this.type], this.x, this.y - halfH + 12);
  }

  destroy() {
    // No physics body, just cleanup
  }
}
