import Matter from 'matter-js';

const { Engine, Render, World, Bodies, Body, Events, Composite, Vertices, Constraint } = Matter;

export class Physics {
  constructor(canvas, width, height) {
    this.canvas = canvas;
    this.width = width;
    this.height = height;

    // Matter.js engine
    this.engine = Engine.create({
      gravity: { x: 0, y: 1 },
      positionIterations: 10,
      velocityIterations: 8,
    });
    this.world = this.engine.world;

    // Collision categories
    this.categories = {
      PET: 0x0001,
      DRAWING: 0x0002,
      ENEMY: 0x0004,
      PLATFORM: 0x0008,
      WALL: 0x0010,
      HAZARD: 0x0020,
    };

    this._createWalls();
    this._setupCollisionEvents();
  }

  _createWalls() {
    const t = 50;
    const w = this.width;
    const h = this.height;

    const wallOptions = {
      isStatic: true,
      friction: 0.5,
      restitution: 0.3,
      collisionFilter: { category: this.categories.WALL, mask: 0xFFFFFFFF },
      label: 'wall',
    };

    this.walls = [
      Bodies.rectangle(w / 2, h + t / 2, w + t * 2, t, wallOptions),
      Bodies.rectangle(-t / 2, h / 2, t, h, wallOptions),
      Bodies.rectangle(w + t / 2, h / 2, t, h, wallOptions),
    ];

    World.add(this.world, this.walls);
  }

  _setupCollisionEvents() {
    this.collisionCallbacks = [];

    Events.on(this.engine, 'collisionStart', (event) => {
      for (const pair of event.pairs) {
        for (const cb of this.collisionCallbacks) {
          cb(pair.bodyA, pair.bodyB);
        }
      }
    });
  }

  onCollision(callback) {
    this.collisionCallbacks.push(callback);
  }

  addBody(body) {
    World.add(this.world, body);
  }

  removeBody(body) {
    World.remove(this.world, body);
  }

  update(delta) {
    Engine.update(this.engine, delta);
  }

  createStaticRect(x, y, w, h, options = {}) {
    return Bodies.rectangle(x, y, w, h, {
      isStatic: true,
      ...options,
    });
  }

  /**
   * Creates a compound physics body from drawn points.
   * Segments are joined into a single rigid body.
   * Parent convex hull collision is disabled to prevent ghost collisions.
   */
  createDrawnBody(points, thickness = 8) {
    if (points.length < 2) return null;

    const bodies = [];
    const physicsThickness = Math.max(thickness * 2, 16);

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];
      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const len = Math.sqrt(dx * dx + dy * dy);
      if (len < 1) continue;

      const angle = Math.atan2(dy, dx);
      const cx = (p1.x + p2.x) / 2;
      const cy = (p1.y + p2.y) / 2;

      const segment = Bodies.rectangle(cx, cy, len + 2, physicsThickness, {
        angle,
        collisionFilter: { category: this.categories.DRAWING, mask: 0xFFFFFFFF },
        friction: 0.8,
        restitution: 0.1,
        label: 'drawing',
      });
      bodies.push(segment);
    }

    if (bodies.length === 0) return null;

    const compound = Body.create({
      parts: bodies,
      friction: 0.8,
      restitution: 0.1,
      density: 0.002,
      label: 'drawing',
      collisionFilter: { category: this.categories.DRAWING, mask: 0xFFFFFFFF },
    });

    // Disable collision on the parent convex hull (parts[0] = parent).
    // Only actual segment parts will collide - no invisible ghost area.
    compound.parts[0].collisionFilter = { category: 0, mask: 0 };

    return compound;
  }

  reset() {
    // Constraint'leri de temizle
    const allConstraints = Composite.allConstraints(this.world);
    for (const c of [...allConstraints]) {
      World.remove(this.world, c);
    }
    const allBodies = Composite.allBodies(this.world);
    for (const body of [...allBodies]) {
      if (body.label !== 'wall') {
        World.remove(this.world, body);
      }
    }
  }

  clear() {
    World.clear(this.world);
    Engine.clear(this.engine);
  }
}
