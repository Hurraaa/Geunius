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

    // Animation timer
    this._animTime = Math.random() * Math.PI * 2;
  }

  update(delta) {
    this._animTime += delta * 0.003;
  }

  render(ctx) {
    const { x, y } = this.body.position;
    const halfW = this.width / 2;
    const halfH = this.height / 2;

    ctx.save();
    ctx.translate(x, y);

    // Flickering effect for fire-like hazards
    const flicker = Math.sin(this._animTime * 5) * 0.1;
    ctx.globalAlpha = 0.8 + flicker;

    // Main body
    ctx.fillStyle = this.color;
    ctx.fillRect(-halfW, -halfH, this.width, this.height);

    // Danger stripes
    ctx.strokeStyle = 'rgba(0,0,0,0.3)';
    ctx.lineWidth = 2;
    ctx.setLineDash([4, 4]);
    ctx.strokeRect(-halfW, -halfH, this.width, this.height);
    ctx.setLineDash([]);

    // Type icon
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fff';
    ctx.font = `${Math.min(this.width, this.height) * 0.5}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(Hazard.TYPES[this.type]?.icon || '!', 0, 0);

    ctx.restore();
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
