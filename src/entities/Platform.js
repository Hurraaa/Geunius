import Matter from 'matter-js';

const { Bodies } = Matter;

/**
 * Static platform - ground, walls, shelves.
 * In whiteboxing mode: a gray rectangle.
 */
export class Platform {
  constructor(physics, x, y, width, height, angle = 0) {
    this.physics = physics;
    this.width = width;
    this.height = height;
    this.color = '#95A5A6';

    this.body = Bodies.rectangle(x, y, width, height, {
      isStatic: true,
      angle: angle * (Math.PI / 180), // degrees to radians
      friction: 0.8,
      restitution: 0.1,
      collisionFilter: { category: physics.categories.PLATFORM, mask: 0xFFFFFFFF },
      label: 'platform',
    });

    physics.addBody(this.body);
  }

  render(ctx) {
    const verts = this.body.vertices;

    ctx.beginPath();
    ctx.moveTo(verts[0].x, verts[0].y);
    for (let i = 1; i < verts.length; i++) {
      ctx.lineTo(verts[i].x, verts[i].y);
    }
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.strokeStyle = '#7F8C8D';
    ctx.lineWidth = 2;
    ctx.stroke();
  }

  destroy() {
    this.physics.removeBody(this.body);
  }
}
