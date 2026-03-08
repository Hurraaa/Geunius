import Matter from 'matter-js';

const { Bodies } = Matter;

/**
 * Punch the Monkey - Main character.
 * Dedicated to Punch, the monkey bullied at the zoo.
 * Types: punch (main), mini (small friend), jumbo (big friend)
 */
export class Pet {
  constructor(physics, x, y, type = 'punch') {
    this.physics = physics;
    this.type = type;
    this.alive = true;
    this.rescued = false;

    const props = Pet.TYPES[type] || Pet.TYPES.punch;
    this.size = props.size;
    this.bodyColor = props.bodyColor;
    this.faceColor = props.faceColor;
    this.label = props.label;

    this.body = Bodies.rectangle(x, y, this.size, this.size, {
      density: props.density,
      friction: props.friction,
      restitution: props.restitution,
      chamfer: { radius: 4 },
      collisionFilter: { category: physics.categories.PET, mask: 0xFFFFFFFF },
      label: 'pet',
    });

    this.expression = 'idle'; // idle, scared, happy, dead
    this._blinkTimer = Math.random() * 3;
    this._isBlinking = false;

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

    // Blink timer
    this._blinkTimer -= 0.016;
    if (this._blinkTimer <= 0) {
      this._isBlinking = !this._isBlinking;
      this._blinkTimer = this._isBlinking ? 0.15 : (2 + Math.random() * 3);
    }

    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(this.body.angle);

    // Dead overlay
    if (!this.alive) {
      ctx.globalAlpha = 0.6;
    }

    // Tail (behind body)
    this._drawTail(ctx, half);

    // Body (circle)
    ctx.fillStyle = this.bodyColor;
    ctx.beginPath();
    ctx.arc(0, 0, half, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = this._darken(this.bodyColor, 30);
    ctx.lineWidth = 1.5;
    ctx.stroke();

    // Ears
    this._drawEars(ctx, half);

    // Face area (lighter oval)
    ctx.fillStyle = this.faceColor;
    ctx.beginPath();
    ctx.ellipse(0, half * 0.12, half * 0.62, half * 0.55, 0, 0, Math.PI * 2);
    ctx.fill();

    // Face expression
    this._drawFace(ctx, half);

    // Rescued sparkle
    if (this.rescued) {
      this._drawSparkle(ctx, half);
    }

    ctx.restore();
  }

  _drawTail(ctx, half) {
    ctx.strokeStyle = this.bodyColor;
    ctx.lineWidth = half * 0.2;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(half * 0.6, half * 0.4);
    ctx.bezierCurveTo(
      half * 1.3, half * 0.6,
      half * 1.4, -half * 0.4,
      half * 0.9, -half * 0.9,
    );
    ctx.stroke();
    // Tail tip
    ctx.strokeStyle = this._darken(this.bodyColor, 20);
    ctx.lineWidth = half * 0.12;
    ctx.beginPath();
    ctx.arc(half * 0.9, -half * 0.9, half * 0.08, 0, Math.PI * 1.5);
    ctx.stroke();
  }

  _drawEars(ctx, half) {
    for (const side of [-1, 1]) {
      const ex = side * half * 0.85;
      const ey = -half * 0.55;
      // Outer ear
      ctx.fillStyle = this.bodyColor;
      ctx.beginPath();
      ctx.arc(ex, ey, half * 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = this._darken(this.bodyColor, 30);
      ctx.lineWidth = 1;
      ctx.stroke();
      // Inner ear
      ctx.fillStyle = this.faceColor;
      ctx.beginPath();
      ctx.arc(ex, ey, half * 0.16, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _drawFace(ctx, half) {
    const eyeY = -half * 0.15;
    const eyeSpacing = half * 0.28;
    const eyeSize = half * 0.16;

    if (this.expression === 'dead') {
      // X eyes
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      for (const side of [-1, 1]) {
        const ex = side * eyeSpacing;
        const s = eyeSize * 0.8;
        ctx.beginPath();
        ctx.moveTo(ex - s, eyeY - s);
        ctx.lineTo(ex + s, eyeY + s);
        ctx.moveTo(ex + s, eyeY - s);
        ctx.lineTo(ex - s, eyeY + s);
        ctx.stroke();
      }
      // Sad mouth
      ctx.beginPath();
      ctx.arc(0, half * 0.35, half * 0.2, Math.PI, 0);
      ctx.stroke();
    } else if (this.expression === 'happy') {
      // Happy squinting eyes
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 2;
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.arc(side * eyeSpacing, eyeY, eyeSize, Math.PI, 0);
        ctx.stroke();
      }
      // Big smile
      ctx.beginPath();
      ctx.arc(0, half * 0.2, half * 0.25, 0, Math.PI);
      ctx.stroke();
      // Blush
      ctx.fillStyle = 'rgba(255, 150, 150, 0.3)';
      for (const side of [-1, 1]) {
        ctx.beginPath();
        ctx.arc(side * half * 0.4, half * 0.15, half * 0.12, 0, Math.PI * 2);
        ctx.fill();
      }
    } else if (this.expression === 'scared') {
      // Wide scared eyes
      for (const side of [-1, 1]) {
        const ex = side * eyeSpacing;
        // White sclera (bigger)
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(ex, eyeY, eyeSize * 1.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#333';
        ctx.lineWidth = 1;
        ctx.stroke();
        // Small pupil (scared = dilated)
        ctx.fillStyle = '#333';
        ctx.beginPath();
        ctx.arc(ex, eyeY, eyeSize * 0.6, 0, Math.PI * 2);
        ctx.fill();
      }
      // O mouth
      ctx.strokeStyle = '#333';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(0, half * 0.3, half * 0.12, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // Normal idle eyes (with blinking)
      for (const side of [-1, 1]) {
        const ex = side * eyeSpacing;
        if (this._isBlinking) {
          // Closed eye (line)
          ctx.strokeStyle = '#333';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(ex - eyeSize, eyeY);
          ctx.lineTo(ex + eyeSize, eyeY);
          ctx.stroke();
        } else {
          // White sclera
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(ex, eyeY, eyeSize * 1.2, 0, Math.PI * 2);
          ctx.fill();
          ctx.strokeStyle = '#555';
          ctx.lineWidth = 0.8;
          ctx.stroke();
          // Pupil
          ctx.fillStyle = '#222';
          ctx.beginPath();
          ctx.arc(ex + half * 0.02, eyeY, eyeSize * 0.55, 0, Math.PI * 2);
          ctx.fill();
          // Eye shine
          ctx.fillStyle = '#fff';
          ctx.beginPath();
          ctx.arc(ex + half * 0.06, eyeY - eyeSize * 0.3, eyeSize * 0.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      // Small nose
      ctx.fillStyle = '#B07050';
      ctx.beginPath();
      ctx.ellipse(0, half * 0.08, half * 0.08, half * 0.05, 0, 0, Math.PI * 2);
      ctx.fill();
      // Gentle smile
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(0, half * 0.2, half * 0.15, 0.2, Math.PI - 0.2);
      ctx.stroke();
    }
  }

  _drawSparkle(ctx, half) {
    const t = performance.now() * 0.003;
    ctx.fillStyle = '#FFD700';
    for (let i = 0; i < 4; i++) {
      const angle = t + i * Math.PI * 0.5;
      const dist = half * 1.3 + Math.sin(t * 2 + i) * half * 0.2;
      const sx = Math.cos(angle) * dist;
      const sy = Math.sin(angle) * dist;
      const starSize = 3 + Math.sin(t * 3 + i) * 1.5;
      ctx.beginPath();
      ctx.arc(sx, sy, starSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  _darken(hex, amount) {
    const r = Math.max(0, parseInt(hex.slice(1, 3), 16) - amount);
    const g = Math.max(0, parseInt(hex.slice(3, 5), 16) - amount);
    const b = Math.max(0, parseInt(hex.slice(5, 7), 16) - amount);
    return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
  }

  destroy() {
    this.physics.removeBody(this.body);
  }
}

Pet.TYPES = {
  punch: {
    size: 36,
    bodyColor: '#8B6914',
    faceColor: '#FDDBB0',
    label: 'Punch',
    density: 0.002,
    friction: 0.6,
    restitution: 0.1,
  },
  mini: {
    size: 28,
    bodyColor: '#D4912A',
    faceColor: '#FDE8C8',
    label: 'Mini',
    density: 0.001,
    friction: 0.4,
    restitution: 0.2,
  },
  jumbo: {
    size: 42,
    bodyColor: '#5C3D1A',
    faceColor: '#E8C99B',
    label: 'Jumbo',
    density: 0.003,
    friction: 0.7,
    restitution: 0.05,
  },
  // Legacy support (maps old types to punch)
  cat: { size: 36, bodyColor: '#8B6914', faceColor: '#FDDBB0', label: 'Punch', density: 0.002, friction: 0.6, restitution: 0.1 },
  dog: { size: 40, bodyColor: '#5C3D1A', faceColor: '#E8C99B', label: 'Jumbo', density: 0.003, friction: 0.7, restitution: 0.05 },
  hamster: { size: 28, bodyColor: '#D4912A', faceColor: '#FDE8C8', label: 'Mini', density: 0.001, friction: 0.4, restitution: 0.2 },
  rabbit: { size: 32, bodyColor: '#A67B3D', faceColor: '#F5DEB3', label: 'Punch', density: 0.0015, friction: 0.5, restitution: 0.15 },
};
