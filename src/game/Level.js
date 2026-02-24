import { Pet } from '../entities/Pet.js';
import { EnemySpawner } from '../entities/Enemy.js';
import { Platform } from '../entities/Platform.js';
import { Hazard } from '../entities/Hazard.js';

/**
 * Level loader - creates entities from level data JSON.
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
    const petBody = this.pets.length > 0 ? this.pets[0].body : null;
    for (const s of this.spawners) {
      s.start();
    }
  }

  update(now, delta) {
    const petBody = this.pets.length > 0 ? this.pets[0].body : null;

    // Update spawners
    for (const s of this.spawners) {
      s.update(now, petBody);
    }

    // Update hazards
    for (const h of this.hazards) {
      h.update(delta);
    }

    // Check pet expression - scare if enemies close
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

  /** Check if pet is touching any enemy */
  checkEnemyCollision(bodyA, bodyB) {
    const isPetA = bodyA.label === 'pet';
    const isPetB = bodyB.label === 'pet';
    const isEnemyA = bodyA.label === 'enemy';
    const isEnemyB = bodyB.label === 'enemy';

    if ((isPetA && isEnemyB) || (isPetB && isEnemyA)) {
      return true;
    }
    return false;
  }

  /** Check if pet fell into a hazard */
  checkHazardCollision(bodyA, bodyB) {
    const isPetA = bodyA.label === 'pet';
    const isPetB = bodyB.label === 'pet';
    const isHazardA = bodyA.label?.startsWith('hazard_');
    const isHazardB = bodyB.label?.startsWith('hazard_');

    if ((isPetA && isHazardB) || (isPetB && isHazardA)) {
      return true;
    }
    return false;
  }

  /** Check if pet fell off screen */
  isPetOffScreen(canvasHeight) {
    for (const pet of this.pets) {
      if (pet.y > canvasHeight + 100) return true;
    }
    return false;
  }

  destroy() {
    for (const p of this.pets) p.destroy();
    for (const s of this.spawners) s.destroyAll();
    for (const p of this.platforms) p.destroy();
    for (const h of this.hazards) h.destroy();
  }
}
