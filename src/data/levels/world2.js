/**
 * Dunya 2: Yanardag (Volkan) - Lav ve Ates bolumleri
 * Sicak, tehlikeli, turuncu/kirmizi tema
 * Level 1-3: Agir lav/ates, temel dusmanlar
 * Level 4-6: Hareketli platformlar, coklu ates bolgesi
 * Level 7-9: Hareketli platform + fan + portal
 * Level 10-12: Coklu Punch, karmasik lav, trambolin
 * Level 13-14: Tum volkan mekanikleri
 * Level 15: BOSS - maksimum lav, maksimum dusman
 */
export const world2 = [
  // ===============================================
  // BOLUM 1: LAV VE ATES TANITIM (Level 1-3)
  // ===============================================

  // Level 1: Lav zemini, yukaridan dusman - volkan giris
  {
    id: 1,
    world: 2,
    name: 'Lav Denizi',
    inkLimit: 550,
    pets: [{ type: 'punch', x: 300, y: 200 }],
    platforms: [
      { x: 300, y: 260, width: 100, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
    spawners: [
      { x: 300, y: 50, count: 4, interval: 1800, delay: 1000, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 8,
    hints: ['Lav her yerde! Punch\'i dusurme, kalkan ciz.'],
    stars: { one: 550, two: 320, three: 160 },
  },

  // Level 2: Iki ates bolgesi + yanlardan dusmanlar
  {
    id: 2,
    world: 2,
    name: 'Ates Yolu',
    inkLimit: 600,
    pets: [{ type: 'punch', x: 300, y: 220 }],
    platforms: [
      { x: 300, y: 280, width: 90, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'fire', x: 150, y: 520, width: 150, height: 30 },
      { type: 'fire', x: 450, y: 520, width: 150, height: 30 },
      { type: 'lava', x: 300, y: 530, width: 200, height: 40 },
    ],
    spawners: [
      { x: 80, y: 150, count: 3, interval: 1700, delay: 800, speed: 2.2 },
      { x: 520, y: 150, count: 3, interval: 1700, delay: 1400, speed: 2.2 },
    ],
    safeZone: null,
    surviveTime: 9,
    hints: ['Ates ve lav birlikte! Her tarafi koru.'],
    stars: { one: 600, two: 350, three: 180 },
  },

  // Level 3: Lav + ates + uc yonden saldiri
  {
    id: 3,
    world: 2,
    name: 'Volkan Agzi',
    inkLimit: 650,
    pets: [{ type: 'punch', x: 300, y: 180 }],
    platforms: [
      { x: 300, y: 240, width: 80, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 100, y: 400, width: 60, height: 80 },
      { type: 'fire', x: 500, y: 400, width: 60, height: 80 },
    ],
    spawners: [
      { x: 50, y: 60, count: 4, interval: 1500, delay: 500, speed: 2.5 },
      { x: 550, y: 60, count: 4, interval: 1500, delay: 1000, speed: 2.5 },
      { x: 300, y: 30, count: 3, interval: 2000, delay: 1800, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Uc yonden dusman geliyor, ates duvarlari var!'],
    stars: { one: 650, two: 380, three: 200 },
  },

  // ===============================================
  // BOLUM 2: HAREKETLI PLATFORMLAR (Level 4-6)
  // ===============================================

  // Level 4: Hareketli platform lav uzerinde
  {
    id: 4,
    world: 2,
    name: 'Kayan Kaya',
    inkLimit: 650,
    pets: [{ type: 'punch', x: 300, y: 150 }],
    platforms: [
      { x: 300, y: 210, width: 70, height: 16, angle: 0 },
    ],
    movingPlatforms: [
      { x1: 150, y1: 370, x2: 450, y2: 370, width: 80, speed: 0.001 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 300, y: 460, width: 120, height: 30 },
    ],
    spawners: [
      { x: 80, y: 80, count: 4, interval: 1400, delay: 600, speed: 2.5 },
      { x: 520, y: 80, count: 4, interval: 1400, delay: 1200, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Platform kayiyor! Punch lavda dusmesin.'],
    stars: { one: 650, two: 380, three: 200 },
  },

  // Level 5: Iki hareketli platform, coklu ates
  {
    id: 5,
    world: 2,
    name: 'Lav Koprusu',
    inkLimit: 700,
    pets: [{ type: 'punch', x: 200, y: 180 }],
    platforms: [
      { x: 200, y: 240, width: 70, height: 16, angle: 0 },
    ],
    movingPlatforms: [
      { x1: 100, y1: 350, x2: 300, y2: 350, width: 70, speed: 0.0009 },
      { x1: 300, y1: 420, x2: 500, y2: 420, width: 70, speed: 0.0012 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 100, y: 470, width: 80, height: 30 },
      { type: 'fire', x: 500, y: 470, width: 80, height: 30 },
      { type: 'fire', x: 300, y: 490, width: 100, height: 25 },
    ],
    spawners: [
      { x: 500, y: 60, count: 5, interval: 1300, delay: 500, speed: 2.5 },
      { x: 300, y: 40, count: 3, interval: 1800, delay: 1500, speed: 2.8 },
    ],
    safeZone: null,
    surviveTime: 11,
    hints: ['Iki platform da hareket ediyor! Dusurme Punch\'i.'],
    stars: { one: 700, two: 420, three: 220 },
  },

  // Level 6: Hareketli platform + mini pet + dar alan
  {
    id: 6,
    world: 2,
    name: 'Eriyen Zemin',
    inkLimit: 700,
    pets: [
      { type: 'punch', x: 200, y: 200 },
      { type: 'mini', x: 400, y: 200 },
    ],
    platforms: [
      { x: 200, y: 260, width: 70, height: 16, angle: 0 },
      { x: 400, y: 260, width: 70, height: 16, angle: 0 },
    ],
    movingPlatforms: [
      { x1: 200, y1: 400, x2: 400, y2: 400, width: 80, speed: 0.001 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 300, y: 470, width: 160, height: 30 },
    ],
    spawners: [
      { x: 50, y: 70, count: 5, interval: 1300, delay: 400, speed: 2.5 },
      { x: 550, y: 70, count: 5, interval: 1300, delay: 900, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 11,
    hints: ['Mini cok hafif! Lavdan uzak tut.'],
    stars: { one: 700, two: 400, three: 210 },
  },

  // ===============================================
  // BOLUM 3: FAN + PORTAL + HAREKETLI (Level 7-9)
  // ===============================================

  // Level 7: Sicak hava fani + lav
  {
    id: 7,
    world: 2,
    name: 'Sicak Ruzgar',
    inkLimit: 700,
    pets: [{ type: 'punch', x: 300, y: 200 }],
    platforms: [
      { x: 300, y: 260, width: 80, height: 16, angle: 0 },
    ],
    fans: [
      { x: 80, y: 350, width: 60, height: 180, direction: 'right', strength: 0.002 },
    ],
    movingPlatforms: [
      { x1: 200, y1: 380, x2: 450, y2: 380, width: 70, speed: 0.0009 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 520, y: 350, width: 50, height: 100 },
    ],
    spawners: [
      { x: 300, y: 40, count: 5, interval: 1300, delay: 500, speed: 2.5 },
      { x: 550, y: 100, count: 3, interval: 1600, delay: 1200, speed: 2.8 },
    ],
    safeZone: null,
    surviveTime: 11,
    hints: ['Sicak ruzgar saga itiyor! Atese itilmekten koru.'],
    stars: { one: 700, two: 400, three: 210 },
  },

  // Level 8: Portal lav yakininda
  {
    id: 8,
    world: 2,
    name: 'Lav Portali',
    inkLimit: 750,
    pets: [{ type: 'punch', x: 300, y: 180 }],
    platforms: [
      { x: 300, y: 240, width: 80, height: 16, angle: 0 },
      { x: 150, y: 380, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 200, bx: 520, by: 420, color: '#FF5722' },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 520, y: 480, width: 80, height: 40 },
      { type: 'fire', x: 300, y: 480, width: 100, height: 30 },
    ],
    spawners: [
      { x: 80, y: 60, count: 5, interval: 1200, delay: 500, speed: 2.5 },
      { x: 520, y: 60, count: 3, interval: 1500, delay: 1000, speed: 2.8 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Portal dusmanlar lava yakin cikiyor! Her iki tarafi koru.'],
    stars: { one: 750, two: 440, three: 230 },
  },

  // Level 9: Portal + fan + hareketli platform
  {
    id: 9,
    world: 2,
    name: 'Volkan Tuneli',
    inkLimit: 800,
    pets: [{ type: 'punch', x: 300, y: 160 }],
    platforms: [
      { x: 300, y: 220, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 300, bx: 520, by: 150, color: '#E74C3C' },
    ],
    fans: [
      { x: 300, y: 100, width: 150, height: 50, direction: 'down', strength: 0.0015 },
    ],
    movingPlatforms: [
      { x1: 130, y1: 380, x2: 470, y2: 380, width: 80, speed: 0.001 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 80, y: 430, width: 60, height: 60 },
      { type: 'fire', x: 520, y: 430, width: 60, height: 60 },
    ],
    spawners: [
      { x: 80, y: 50, count: 5, interval: 1200, delay: 400, speed: 2.8 },
      { x: 520, y: 50, count: 5, interval: 1200, delay: 800, speed: 2.8 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Portal, ruzgar ve kaygan platform! Dikkatli ol.'],
    stars: { one: 800, two: 480, three: 260 },
  },

  // ===============================================
  // BOLUM 4: COKLU PUNCH + KARMASIK LAV (Level 10-12)
  // ===============================================

  // Level 10: Iki Punch + trambolin + lav
  {
    id: 10,
    world: 2,
    name: 'Ikiz Alevler',
    inkLimit: 800,
    pets: [
      { type: 'punch', x: 180, y: 200 },
      { type: 'punch', x: 420, y: 200 },
    ],
    platforms: [
      { x: 180, y: 260, width: 70, height: 16, angle: 0 },
      { x: 420, y: 260, width: 70, height: 16, angle: 0 },
    ],
    trampolines: [
      { x: 300, y: 470, width: 80, force: 0.07 },
    ],
    hazards: [
      { type: 'lava', x: 130, y: 530, width: 200, height: 40 },
      { type: 'lava', x: 470, y: 530, width: 200, height: 40 },
      { type: 'fire', x: 300, y: 370, width: 80, height: 30 },
    ],
    spawners: [
      { x: 50, y: 50, count: 5, interval: 1200, delay: 400, speed: 2.8 },
      { x: 550, y: 50, count: 5, interval: 1200, delay: 700, speed: 2.8 },
      { x: 300, y: 30, count: 3, interval: 1500, delay: 1500, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Iki Punch\'i birden koru! Trambolin dusmanlar icin tehlikeli.'],
    stars: { one: 800, two: 480, three: 250 },
  },

  // Level 11: Uc pet + karmasik lav duzen
  {
    id: 11,
    world: 2,
    name: 'Lav Labirenti',
    inkLimit: 900,
    pets: [
      { type: 'punch', x: 150, y: 180 },
      { type: 'mini', x: 300, y: 160 },
      { type: 'punch', x: 450, y: 180 },
    ],
    platforms: [
      { x: 150, y: 240, width: 70, height: 16, angle: 0 },
      { x: 300, y: 220, width: 60, height: 16, angle: 0 },
      { x: 450, y: 240, width: 70, height: 16, angle: 0 },
    ],
    trampolines: [
      { x: 150, y: 460, width: 60, force: 0.06 },
      { x: 450, y: 460, width: 60, force: 0.06 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 230, y: 340, width: 50, height: 60 },
      { type: 'fire', x: 370, y: 340, width: 50, height: 60 },
      { type: 'fire', x: 300, y: 430, width: 80, height: 30 },
    ],
    spawners: [
      { x: 50, y: 50, count: 5, interval: 1100, delay: 400, speed: 3 },
      { x: 550, y: 50, count: 5, interval: 1100, delay: 700, speed: 3 },
      { x: 300, y: 30, count: 4, interval: 1300, delay: 1200, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 13,
    hints: ['Uc pet, ates duvarlari! Hepsini koru.'],
    stars: { one: 900, two: 550, three: 300 },
  },

  // Level 12: Trambolin + hareketli platform + coklu ates
  {
    id: 12,
    world: 2,
    name: 'Patlama Zamani',
    inkLimit: 900,
    pets: [
      { type: 'punch', x: 200, y: 180 },
      { type: 'punch', x: 400, y: 180 },
    ],
    platforms: [
      { x: 200, y: 240, width: 70, height: 16, angle: 0 },
      { x: 400, y: 240, width: 70, height: 16, angle: 0 },
    ],
    movingPlatforms: [
      { x1: 120, y1: 370, x2: 300, y2: 370, width: 70, speed: 0.001 },
      { x1: 300, y1: 400, x2: 480, y2: 400, width: 70, speed: 0.0012 },
    ],
    trampolines: [
      { x: 300, y: 470, width: 70, force: 0.07 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 80, y: 350, width: 50, height: 80 },
      { type: 'fire', x: 520, y: 350, width: 50, height: 80 },
      { type: 'fire', x: 300, y: 310, width: 60, height: 40 },
    ],
    spawners: [
      { x: 50, y: 60, count: 5, interval: 1100, delay: 300, speed: 3 },
      { x: 550, y: 60, count: 5, interval: 1100, delay: 600, speed: 3 },
      { x: 300, y: 30, count: 4, interval: 1200, delay: 1000, speed: 3.2 },
    ],
    safeZone: null,
    surviveTime: 13,
    hints: ['Hareketli platformlar, trambolin ve ates! Dikkatli ciz.'],
    stars: { one: 900, two: 540, three: 290 },
  },

  // ===============================================
  // BOLUM 5: TUM VOLKAN MEKANIKLERI (Level 13-14)
  // ===============================================

  // Level 13: Portal + fan + trambolin + hareketli platform + lav
  {
    id: 13,
    world: 2,
    name: 'Magma Kalesi',
    inkLimit: 1000,
    pets: [
      { type: 'punch', x: 150, y: 200 },
      { type: 'mini', x: 450, y: 200 },
    ],
    platforms: [
      { x: 150, y: 260, width: 70, height: 16, angle: 0 },
      { x: 450, y: 260, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 400, bx: 520, by: 150, color: '#FF5722' },
    ],
    fans: [
      { x: 550, y: 320, width: 50, height: 150, direction: 'left', strength: 0.0018 },
    ],
    trampolines: [
      { x: 300, y: 460, width: 70, force: 0.07 },
    ],
    movingPlatforms: [
      { x1: 180, y1: 380, x2: 420, y2: 380, width: 70, speed: 0.001 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 80, y: 320, width: 50, height: 80 },
      { type: 'fire', x: 300, y: 440, width: 80, height: 25 },
      { type: 'fire', x: 300, y: 300, width: 60, height: 40 },
    ],
    spawners: [
      { x: 50, y: 50, count: 6, interval: 1000, delay: 300, speed: 3 },
      { x: 550, y: 50, count: 6, interval: 1000, delay: 600, speed: 3 },
      { x: 300, y: 30, count: 4, interval: 1100, delay: 1000, speed: 3.2 },
    ],
    safeZone: null,
    surviveTime: 14,
    hints: ['Portal, ruzgar, trambolin, ates... Strateji sart!'],
    stars: { one: 1000, two: 620, three: 340 },
  },

  // Level 14: Tum mekanikler + yercekimi bolgesi
  {
    id: 14,
    world: 2,
    name: 'Volkan Cekirdegi',
    inkLimit: 1100,
    pets: [
      { type: 'punch', x: 150, y: 200 },
      { type: 'punch', x: 300, y: 160 },
      { type: 'mini', x: 450, y: 200 },
    ],
    platforms: [
      { x: 150, y: 260, width: 70, height: 16, angle: 0 },
      { x: 300, y: 220, width: 60, height: 16, angle: 0 },
      { x: 450, y: 260, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 50, ay: 400, bx: 550, by: 160, color: '#E74C3C' },
    ],
    fans: [
      { x: 80, y: 280, width: 50, height: 120, direction: 'right', strength: 0.0015 },
      { x: 520, y: 280, width: 50, height: 120, direction: 'left', strength: 0.0015 },
    ],
    trampolines: [
      { x: 200, y: 460, width: 60, force: 0.065 },
      { x: 400, y: 460, width: 60, force: 0.065 },
    ],
    movingPlatforms: [
      { x1: 200, y1: 370, x2: 400, y2: 370, width: 70, speed: 0.0011 },
    ],
    gravityZones: [
      { x: 300, y: 160, width: 120, height: 80, type: 'reverse' },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'fire', x: 150, y: 420, width: 60, height: 40 },
      { type: 'fire', x: 450, y: 420, width: 60, height: 40 },
      { type: 'fire', x: 300, y: 310, width: 80, height: 30 },
      { type: 'spikes', x: 300, y: 480, width: 100, height: 20 },
    ],
    spawners: [
      { x: 50, y: 50, count: 6, interval: 1000, delay: 300, speed: 3.2 },
      { x: 550, y: 50, count: 6, interval: 1000, delay: 500, speed: 3.2 },
      { x: 300, y: 30, count: 5, interval: 1100, delay: 900, speed: 3 },
    ],
    safeZone: null,
    surviveTime: 15,
    hints: ['Portal, ruzgar, trambolin, yercekimi, ates... Akilli ol!'],
    stars: { one: 1100, two: 680, three: 380 },
  },

  // ===============================================
  // BOSS SEVIYESI (Level 15)
  // ===============================================

  // Level 15: BOSS - tum mekanikler, maksimum zorluk
  {
    id: 15,
    world: 2,
    name: 'YANARDAG PATRONU',
    inkLimit: 1200,
    pets: [
      { type: 'punch', x: 150, y: 200 },
      { type: 'jumbo', x: 300, y: 140 },
      { type: 'mini', x: 450, y: 200 },
    ],
    platforms: [
      { x: 150, y: 260, width: 65, height: 16, angle: 0 },
      { x: 300, y: 200, width: 60, height: 16, angle: 0 },
      { x: 450, y: 260, width: 65, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 50, ay: 200, bx: 550, by: 200, color: '#FF5722' },
      { ax: 50, ay: 420, bx: 550, by: 420, color: '#E74C3C' },
    ],
    fans: [
      { x: 50, y: 300, width: 50, height: 120, direction: 'right', strength: 0.0015 },
      { x: 550, y: 300, width: 50, height: 120, direction: 'left', strength: 0.0015 },
    ],
    trampolines: [
      { x: 300, y: 470, width: 70, force: 0.08 },
    ],
    movingPlatforms: [
      { x1: 130, y1: 380, x2: 470, y2: 380, width: 70, speed: 0.0012 },
    ],
    gravityZones: [
      { x: 300, y: 130, width: 100, height: 70, type: 'reverse' },
    ],
    hazards: [
      { type: 'lava', x: 150, y: 530, width: 200, height: 40 },
      { type: 'lava', x: 450, y: 530, width: 200, height: 40 },
      { type: 'fire', x: 80, y: 350, width: 50, height: 80 },
      { type: 'fire', x: 520, y: 350, width: 50, height: 80 },
      { type: 'fire', x: 300, y: 440, width: 100, height: 30 },
      { type: 'spikes', x: 300, y: 520, width: 80, height: 20 },
    ],
    spawners: [
      { x: 50, y: 40, count: 7, interval: 900, delay: 300, speed: 3.5 },
      { x: 550, y: 40, count: 7, interval: 900, delay: 500, speed: 3.5 },
      { x: 300, y: 20, count: 5, interval: 800, delay: 800, speed: 3.8 },
      { x: 50, y: 450, count: 3, interval: 1100, delay: 2000, speed: 3 },
      { x: 550, y: 450, count: 3, interval: 1100, delay: 2500, speed: 3 },
    ],
    safeZone: null,
    surviveTime: 18,
    hints: ['Son savas! Lav, ates, portal, ruzgar, trambolin... HER SEY YANARDAG!'],
    stars: { one: 1200, two: 720, three: 420 },
  },
];
