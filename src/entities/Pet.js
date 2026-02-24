import Matter from 'matter-js';

const { Bodies } = Matter;

/**
 * Pet entity - the animal that needs to be protected.
 * In whiteboxing mode: a green rectangle.
 */
export class Pet {
  constructor(physics, x, y, type = 'cat') {
    this.physics = physics;
    this.type = type;
    this.alive = true;
    this.rescued = false;

    // Pet properties by type
    const props = Pet.TYPES[type] || Pet.TYPES.cat;
    this.size = props.size;
    this.color = props.color;
    this.label = props.label;

    // Create physics body
    this.body = Bodies.rectangle(x, y, this.size, this.size, {
      density: props.density,
      friction: props.friction,
      restitution: props.restitution,
      collisionFilter: { category: physics.categories.PET },
      label: 'pet',
    });

    // Expression state for animation
    this.expression = 'idle'; // idle, scared, happy, dead

    physics.addBody(this.body);
  }

  get x() { return this.body.position.x; }
  get y() { return this.body.position.y; }

  kill() {
    this.alive = false;
    this.expression = 'dead';
  }

  rescue() {
    this.rescued = true;
    this.expression = 'happy';
  }

  scare() {
    this.expression = 'scared';
  }

  render(ctx) {
    const { x, y } = this.body.position;
    const half = this.size / 2;

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.body.angle);

    // Body (whiteboxing: colored rectangle)
    ctx.fillStyle = this.alive ? this.color : '#888';
    ctx.fillRect(-half, -half, this.size, this.size);

    // Border
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.strokeRect(-half, -half, this.size, this.size);

    // Face
    this._drawFace(ctx, half);

    ctx.restore();
  }

  _drawFace(ctx, half) {
    const eyeY = -half * 0.3;
    const eyeSpacing = half * 0.4;
    const eyeSize = half * 0.18;

    // Eyes
    ctx.fillStyle = '#333';
    if (this.expression === 'dead') {
      // X eyes
      const s = eyeSize;
      for (const ex of [-eyeSpacing, eyeSpacing]) {
        ctx.beginPath();
        ctx.moveTo(ex - s, eyeY - s);
        ctx.lineTo(ex + s, eyeY + s);
        ctx.moveTo(ex + s, eyeY - s);
        ctx.lineTo(ex - s, eyeY + s);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    } else if (this.expression === 'happy') {
      // Happy closed eyes (arcs)
      for (const ex of [-eyeSpacing, eyeSpacing]) {
        ctx.beginPath();
        ctx.arc(ex, eyeY, eyeSize, Math.PI, 0);
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    } else {
      // Normal / scared eyes
      const scale = this.expression === 'scared' ? 1.4 : 1;
      for (const ex of [-eyeSpacing, eyeSpacing]) {
        ctx.beginPath();
        ctx.arc(ex, eyeY, eyeSize * scale, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Mouth
    const mouthY = half * 0.25;
    ctx.beginPath();
    if (this.expression === 'happy') {
      ctx.arc(0, mouthY - 2, half * 0.25, 0, Math.PI);
    } else if (this.expression === 'scared') {
      ctx.arc(0, mouthY, half * 0.15, 0, Math.PI * 2);
    } else if (this.expression === 'dead') {
      ctx.arc(0, mouthY + 2, half * 0.25, Math.PI, 0);
    } else {
      ctx.moveTo(-half * 0.15, mouthY);
      ctx.lineTo(half * 0.15, mouthY);
    }
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  destroy() {
    this.physics.removeBody(this.body);
  }
}

Pet.TYPES = {
  cat: {
    size: 36,
    color: '#4CAF50',
    label: 'Kedi',
    density: 0.002,
    friction: 0.6,
    restitution: 0.1,
  },
  dog: {
    size: 40,
    color: '#2196F3',
    label: 'Köpek',
    density: 0.003,
    friction: 0.7,
    restitution: 0.05,
  },
  hamster: {
    size: 28,
    color: '#FF9800',
    label: 'Hamster',
    density: 0.001,
    friction: 0.4,
    restitution: 0.2,
  },
  rabbit: {
    size: 32,
    color: '#E91E63',
    label: 'Tavşan',
    density: 0.0015,
    friction: 0.5,
    restitution: 0.4,
  },
};
