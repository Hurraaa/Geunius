import { Pet } from '../entities/Pet.js';
import { EnemySpawner } from '../entities/Enemy.js';
import { Platform } from '../entities/Platform.js';
import { Hazard } from '../entities/Hazard.js';

/**
 * Level loader - creates entities from level data JSON.
 * Supports multiple pets - enemies target the nearest pet.
 */
export class Level {
  constructor(physics, data) {
    this.physics = physics;
    this.data = data;

    this.pets = [];
    this.spawners = [];
    this.platforms = [];
    this.hazards = [];
    this.safeZone = data.safeZone || null;

    this._build();
  }

  _build() {
    const d = this.data;

    // Create pets
    for (const p of d.pets) {
      this.pets.push(new Pet(this.physics, p.x, p.y, p.type));
    }

    // Create platforms
    for (const pl of d.platforms) {
      this.platforms.push(new Platform(this.physics, pl.x, pl.y, pl.width, pl.height, pl.angle));
    }

    // Create hazards
    if (d.hazards) {
      for (const h of d.hazards) {
        this.hazards.push(new Hazard(this.physics, h.x, h.y, h.width, h.height || 30, h.type));
      }
    }

    // Create enemy spawners
    if (d.spawners) {
      for (const s of d.spawners) {
        const spawner = new EnemySpawner(this.physics, s.x, s.y, {
          maxEnemies: s.count || 5,
          spawnInterval: s.interval || 1500,
          spawnDelay: s.delay || 0,
          enemyConfig: {
            speed: s.speed || 2,
            radius: s.radius || 12,
            color: s.color || '#E74C3C',
          },
        });
        this.spawners.push(spawner);
      }
    }
  }

  startSpawners() {
    for (const s of this.spawners) {
      s.start();
    }
  }

  /** Find the nearest alive pet body to a given position */
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
    // Update spawners - each enemy targets nearest alive pet
    for (const s of this.spawners) {
      s.update(now, null); // spawn without auto-target

      // Re-target enemies to nearest pet each frame
      for (const e of s.enemies) {
        if (!e.alive) continue;
        const target = this._nearestPetBody(e.x, e.y);
        if (target) e.setTarget(target);
      }
    }

    // Update hazards
    for (const h of this.hazards) {
      h.update(delta);
    }

    // Check pet expressions - scare if enemies close
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
    // Draw safe zone
    if (this.safeZone) {
      const sz = this.safeZone;
      ctx.fillStyle = 'rgba(76, 175, 80, 0.15)';
      ctx.fillRect(sz.x, sz.y, sz.width, sz.height);
      ctx.strokeStyle = '#4CAF50';
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 4]);
      ctx.strokeRect(sz.x, sz.y, sz.width, sz.height);
      ctx.setLineDash([]);

      ctx.fillStyle = '#4CAF50';
      ctx.font = '12px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('GÜVENLİ', sz.x + sz.width / 2, sz.y + sz.height / 2);
    }

    // Draw hazards
    for (const h of this.hazards) {
      h.render(ctx);
    }

    // Draw platforms
    for (const p of this.platforms) {
      p.render(ctx);
    }

    // Draw spawners + enemies
    for (const s of this.spawners) {
      s.render(ctx);
    }

    // Draw pets (on top)
    for (const p of this.pets) {
      p.render(ctx);
    }
  }

  /** Check if any pet is touching an enemy */
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

  /** Check if any pet fell into a hazard */
  checkHazardCollision(bodyA, bodyB) {
    const isPetA = bodyA.label === 'pet';
    const isPetB = bodyB.label === 'pet';
    const isHazardA = bodyA.label?.startsWith('hazard_');
    const isHazardB = bodyB.label?.startsWith('hazard_');

    if ((isPetA && isHazardB) || (isPetB && isHazardA)) {
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

  /** Check if any alive pet fell off screen */
  isPetOffScreen(canvasHeight) {
    for (const pet of this.pets) {
      if (!pet.alive) continue;
      if (pet.y > canvasHeight + 100 || pet.x < -100 || pet.x > 700) return true;
    }
    return false;
  }

  /** Check if all pets are still alive */
  get allPetsAlive() {
    return this.pets.every(p => p.alive);
  }

  /** Get count of alive pets */
  get alivePetCount() {
    return this.pets.filter(p => p.alive).length;
  }

  destroy() {
    for (const p of this.pets) p.destroy();
    for (const s of this.spawners) s.destroyAll();
    for (const p of this.platforms) p.destroy();
    for (const h of this.hazards) h.destroy();
  }
}
