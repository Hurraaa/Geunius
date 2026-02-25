import { Pet } from '../entities/Pet.js';
import { EnemySpawner } from '../entities/Enemy.js';
import { Platform } from '../entities/Platform.js';
import { Hazard } from '../entities/Hazard.js';
import { Portal } from '../entities/Portal.js';
import { Trampoline } from '../entities/Trampoline.js';
import { Fan } from '../entities/Fan.js';
import { MovingPlatform } from '../entities/MovingPlatform.js';
import { GravityZone } from '../entities/GravityZone.js';
import Matter from 'matter-js';

const { Composite, Body } = Matter;

const MAX_SPEED = 12;

/**
 * Level loader - creates all entities from level data.
 * Supports: pets, platforms, hazards, spawners, portals,
 * trampolines, fans, moving platforms, gravity zones.
 */
export class Level {
  constructor(physics, data) {
    this.physics = physics;
    this.data = data;

    this.pets = [];
    this.spawners = [];
    this.platforms = [];
    this.hazards = [];
    this.portals = [];
    this.trampolines = [];
    this.fans = [];
    this.movingPlatforms = [];
    this.gravityZones = [];
    this.safeZone = data.safeZone || null;

    this._build();
  }

  _build() {
    const d = this.data;

    // Pets
    for (const p of d.pets) {
      this.pets.push(new Pet(this.physics, p.x, p.y, p.type));
    }

    // Static platforms
    for (const pl of (d.platforms || [])) {
      this.platforms.push(new Platform(this.physics, pl.x, pl.y, pl.width, pl.height, pl.angle));
    }

    // Hazards
    for (const h of (d.hazards || [])) {
      this.hazards.push(new Hazard(this.physics, h.x, h.y, h.width, h.height || 30, h.type));
    }

    // Enemy spawners
    for (const s of (d.spawners || [])) {
      this.spawners.push(new EnemySpawner(this.physics, s.x, s.y, {
        maxEnemies: s.count || 5,
        spawnInterval: s.interval || 1500,
        spawnDelay: s.delay || 0,
        enemyConfig: {
          speed: s.speed || 2,
          radius: s.radius || 12,
          color: s.color || '#E74C3C',
        },
      }));
    }

    // Portals
    for (const p of (d.portals || [])) {
      this.portals.push(new Portal(this.physics, p.ax, p.ay, p.bx, p.by, {
        color: p.color,
        colorB: p.colorB,
        radius: p.radius,
      }));
    }

    // Trampolines
    for (const t of (d.trampolines || [])) {
      this.trampolines.push(new Trampoline(this.physics, t.x, t.y, {
        width: t.width,
        height: t.height,
        force: t.force,
        color: t.color,
      }));
    }

    // Fans
    for (const f of (d.fans || [])) {
      this.fans.push(new Fan(this.physics, f.x, f.y, {
        width: f.width,
        height: f.height,
        direction: f.direction,
        strength: f.strength,
        color: f.color,
      }));
    }

    // Moving platforms
    for (const mp of (d.movingPlatforms || [])) {
      this.movingPlatforms.push(new MovingPlatform(this.physics, mp.x1, mp.y1, mp.x2, mp.y2, {
        width: mp.width,
        height: mp.height,
        speed: mp.speed,
        color: mp.color,
        pauseTime: mp.pauseTime,
      }));
    }

    // Gravity zones
    for (const gz of (d.gravityZones || [])) {
      this.gravityZones.push(new GravityZone(this.physics, gz.x, gz.y, {
        width: gz.width,
        height: gz.height,
        type: gz.type,
      }));
    }
  }

  startSpawners() {
    for (const s of this.spawners) {
      s.start();
    }
  }

  _nearestPetBody(x, y) {
    let nearest = null;
    let minDist = Infinity;
    for (const pet of this.pets) {
      if (!pet.alive) continue;
      const dx = pet.x - x;
      const dy = pet.y - y;
      const dist = dx * dx + dy * dy;
      if (dist < minDist) {
        minDist = dist;
        nearest = pet.body;
      }
    }
    return nearest;
  }

  update(now, delta) {
    // Enemy spawners
    for (const s of this.spawners) {
      s.update(now, null);
      for (const e of s.enemies) {
        if (!e.alive) continue;
        const target = this._nearestPetBody(e.x, e.y);
        if (target) e.setTarget(target);
      }
    }

    // Hazards
    for (const h of this.hazards) {
      h.update(delta);
    }

    // Portals - teleport tüm dinamik body'ler
    if (this.portals.length > 0) {
      const allBodies = Composite.allBodies(this.physics.world);
      for (const portal of this.portals) {
        portal.update(delta);
        for (const body of allBodies) {
          portal.checkTeleport(body, now);
        }
      }
    }

    // Trampolines
    for (const t of this.trampolines) {
      t.update(delta);
    }

    // Moving platforms
    for (const mp of this.movingPlatforms) {
      mp.update(delta);
    }

    // Fans - tüm dinamik body'lere kuvvet uygula
    if (this.fans.length > 0) {
      const allBodies = Composite.allBodies(this.physics.world);
      for (const fan of this.fans) {
        fan.update(delta);
        for (const body of allBodies) {
          fan.applyForce(body);
        }
      }
    }

    // Gravity zones
    if (this.gravityZones.length > 0) {
      const allBodies = Composite.allBodies(this.physics.world);
      for (const gz of this.gravityZones) {
        gz.update(delta);
        for (const body of allBodies) {
          gz.applyEffect(body);
        }
      }
    }

    // Clamp pet velocity to prevent tunneling through platforms
    for (const pet of this.pets) {
      if (!pet.alive) continue;
      const vel = pet.body.velocity;
      const speed = Math.sqrt(vel.x * vel.x + vel.y * vel.y);
      if (speed > MAX_SPEED) {
        const scale = MAX_SPEED / speed;
        Body.setVelocity(pet.body, { x: vel.x * scale, y: vel.y * scale });
      }
    }

    // Push pet out if it sinks into a platform
    for (const pet of this.pets) {
      if (!pet.alive) continue;
      const petPos = pet.body.position;
      const half = pet.size / 2;
      for (const plat of this.platforms) {
        const pb = plat.body;
        const px = pb.position.x;
        const py = pb.position.y;
        const pw = plat.width / 2;
        const ph = plat.height / 2;
        // AABB overlap check (only for non-rotated platforms)
        if (
          petPos.x > px - pw && petPos.x < px + pw &&
          petPos.y + half > py - ph && petPos.y - half < py + ph
        ) {
          // Pet center is overlapping platform - push up above it
          Body.setPosition(pet.body, { x: petPos.x, y: py - ph - half });
          Body.setVelocity(pet.body, { x: pet.body.velocity.x, y: 0 });
        }
      }
    }

    // Pet expressions
    for (const pet of this.pets) {
      if (!pet.alive) continue;
      let closestDist = Infinity;
      for (const s of this.spawners) {
        for (const e of s.enemies) {
          if (!e.alive) continue;
          const dx = e.x - pet.x;
          const dy = e.y - pet.y;
          closestDist = Math.min(closestDist, Math.sqrt(dx * dx + dy * dy));
        }
      }
      if (closestDist < 100) {
        pet.scare();
      } else if (pet.expression === 'scared') {
        pet.expression = 'idle';
      }
    }
  }

  render(ctx) {
    // Safe zone
    if (this.safeZone) {
      const sz = this.safeZone;
      ctx.fillStyle = 'rgba(76, 175, 80, 0.15)';
      ctx.fillRect(sz.x, sz.y, sz.width, sz.height);
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(sz.x, sz.y, sz.width, sz.height);
      ctx.setLineDash([]);
    }

    // Gravity zones (arka planda)
    for (const gz of this.gravityZones) {
      gz.render(ctx);
    }

    // Fan zones
    for (const f of this.fans) {
      f.render(ctx);
    }

    // Portals
    for (const p of this.portals) {
      p.render(ctx);
    }

    // Hazards
    for (const h of this.hazards) {
      h.render(ctx);
    }

    // Static platforms
    for (const p of this.platforms) {
      p.render(ctx);
    }

    // Moving platforms
    for (const mp of this.movingPlatforms) {
      mp.render(ctx);
    }

    // Trampolines
    for (const t of this.trampolines) {
      t.render(ctx);
    }

    // Spawners + enemies
    for (const s of this.spawners) {
      s.render(ctx);
    }

    // Pets (on top)
    for (const p of this.pets) {
      p.render(ctx);
    }
  }

  checkEnemyCollision(bodyA, bodyB) {
    const isPetA = bodyA.label === 'pet';
    const isPetB = bodyB.label === 'pet';
    const isEnemyA = bodyA.label === 'enemy';
    const isEnemyB = bodyB.label === 'enemy';

    if ((isPetA && isEnemyB) || (isPetB && isEnemyA)) {
      const petBody = isPetA ? bodyA : bodyB;
      for (const pet of this.pets) {
        if (pet.body === petBody) {
          pet.kill();
          break;
        }
      }
      return true;
    }
    return false;
  }

  checkHazardCollision(bodyA, bodyB) {
    const isPetA = bodyA.label === 'pet';
    const isPetB = bodyB.label === 'pet';
    const isHazardA = bodyA.label?.startsWith('hazard_');
    const isHazardB = bodyB.label?.startsWith('hazard_');

    if ((isPetA && isHazardB) || (isPetB && isHazardA)) {
      const petBody = isPetA ? bodyA : bodyB;
      const hazardLabel = isPetA ? bodyB.label : bodyA.label;
      for (const pet of this.pets) {
        if (pet.body === petBody) {
          pet.kill();
          break;
        }
      }
      const hazardNames = {
        hazard_fire: 'Atese dustu!',
        hazard_lava: 'Lava dustu!',
        hazard_spikes: 'Dikenlere carpti!',
        hazard_water: 'Suya dustu!',
      };
      return hazardNames[hazardLabel] || 'Tehlikeye carpti!';
    }
    return null;
  }

  /** Trampoline bounce check */
  checkTrampolineCollision(bodyA, bodyB) {
    const isTramA = bodyA.label === 'trampoline';
    const isTramB = bodyB.label === 'trampoline';

    if (isTramA || isTramB) {
      const otherBody = isTramA ? bodyB : bodyA;
      const tramBody = isTramA ? bodyA : bodyB;
      // Find the trampoline and bounce
      for (const t of this.trampolines) {
        if (t.body === tramBody) {
          t.bounce(otherBody, performance.now());
          break;
        }
      }
      return true;
    }
    return false;
  }

  isPetOffScreen(canvasHeight) {
    for (const pet of this.pets) {
      if (!pet.alive) continue;
      if (pet.y > canvasHeight + 100 || pet.x < -100 || pet.x > 700) return true;
    }
    return false;
  }

  get allPetsAlive() {
    return this.pets.every(p => p.alive);
  }

  get alivePetCount() {
    return this.pets.filter(p => p.alive).length;
  }

  destroy() {
    for (const p of this.pets) p.destroy();
    for (const s of this.spawners) s.destroyAll();
    for (const p of this.platforms) p.destroy();
    for (const h of this.hazards) h.destroy();
    for (const p of this.portals) p.destroy();
    for (const t of this.trampolines) t.destroy();
    for (const f of this.fans) f.destroy();
    for (const mp of this.movingPlatforms) mp.destroy();
    for (const gz of this.gravityZones) gz.destroy();
  }
}
