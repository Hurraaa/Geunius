/**
 * Dünya 4: Uzay İstasyonu - Yerçekimi manipülasyonu
 * Sıfır yerçekimi, ters yerçekimi, portallar ve uzay mekaniği
 * Level 1-3: Sıfır yerçekimi tanıtım
 * Level 4-6: Ters yerçekimi + portallar
 * Level 7-9: Çoklu yerçekimi bölgeleri + portallar
 * Level 10-12: Çoklu Punch + fanlar (iticiler) + yerçekimi
 * Level 13-14: Tüm uzay mekanikleri kombine
 * Level 15: BOSS - Maksimum kaos
 */
export const world4 = [
  // ═══════════════════════════════════════════════
  // BOLUM 1: SIFIR YERCEKIMI TANITIM (Level 1-3)
  // ═══════════════════════════════════════════════

  // Level 1: Basit sıfır yerçekimi, Punch yüzüyor
  {
    id: 1,
    world: 4,
    name: 'Sifir G',
    inkLimit: 500,
    pets: [{ type: 'punch', x: 300, y: 280 }],
    platforms: [
      { x: 300, y: 340, width: 100, height: 20, angle: 0 },
    ],
    gravityZones: [
      { x: 300, y: 280, width: 250, height: 200, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 545, width: 200, height: 20 },
    ],
    spawners: [
      { x: 300, y: 40, count: 3, interval: 2200, delay: 1500, speed: 1.5 },
    ],
    safeZone: null,
    surviveTime: 8,
    hints: ['Sifir yercekimi! Punch havada suzuyor, onu koru!'],
    stars: { one: 500, two: 300, three: 150 },
  },

  // Level 2: Geniş sıfır yerçekimi, iki spawner
  {
    id: 2,
    world: 4,
    name: 'Suzenler',
    inkLimit: 550,
    pets: [{ type: 'punch', x: 300, y: 250 }],
    platforms: [
      { x: 150, y: 320, width: 80, height: 16, angle: 0 },
      { x: 450, y: 320, width: 80, height: 16, angle: 0 },
    ],
    gravityZones: [
      { x: 300, y: 250, width: 400, height: 250, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 50, y: 280, width: 20, height: 150 },
      { type: 'spikes', x: 550, y: 280, width: 20, height: 150 },
    ],
    spawners: [
      { x: 150, y: 40, count: 3, interval: 2000, delay: 800, speed: 1.8 },
      { x: 450, y: 40, count: 3, interval: 2000, delay: 1500, speed: 1.8 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Punch sifir G de suzer! Duvarlardaki diken asteroidlere dikkat.'],
    stars: { one: 550, two: 320, three: 160 },
  },

  // Level 3: Sıfır yerçekimi + uzay dikenleri
  {
    id: 3,
    world: 4,
    name: 'Asteroid Alani',
    inkLimit: 600,
    pets: [{ type: 'punch', x: 300, y: 200 }],
    platforms: [
      { x: 300, y: 260, width: 90, height: 16, angle: 0 },
    ],
    gravityZones: [
      { x: 300, y: 280, width: 500, height: 300, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 100, y: 400, width: 80, height: 20 },
      { type: 'spikes', x: 500, y: 400, width: 80, height: 20 },
      { type: 'spikes', x: 300, y: 540, width: 300, height: 20 },
    ],
    spawners: [
      { x: 100, y: 50, count: 4, interval: 1800, delay: 600, speed: 2 },
      { x: 500, y: 50, count: 4, interval: 1800, delay: 1200, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Asteroidler her yerde! Punch\'i sifir G de korumak zor.'],
    stars: { one: 600, two: 350, three: 180 },
  },

  // ═══════════════════════════════════════════════
  // BOLUM 2: TERS YERCEKIMI + PORTALLAR (Level 4-6)
  // ═══════════════════════════════════════════════

  // Level 4: Ters yerçekimi tanıtım
  {
    id: 4,
    world: 4,
    name: 'Ters Istasyon',
    inkLimit: 550,
    pets: [{ type: 'punch', x: 300, y: 350 }],
    platforms: [
      { x: 300, y: 310, width: 100, height: 20, angle: 0 },
    ],
    gravityZones: [
      { x: 300, y: 250, width: 300, height: 200, type: 'reverse' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 15, width: 250, height: 20 },
    ],
    spawners: [
      { x: 100, y: 500, count: 4, interval: 1800, delay: 800, speed: 2 },
      { x: 500, y: 500, count: 4, interval: 1800, delay: 1200, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Ters yercekimi Punch\'i yukari celiyor! Tavana carpmamali.'],
    stars: { one: 550, two: 320, three: 160 },
  },

  // Level 5: Ters yerçekimi + portal
  {
    id: 5,
    world: 4,
    name: 'Solucan Deligi',
    inkLimit: 650,
    pets: [{ type: 'punch', x: 200, y: 300 }],
    platforms: [
      { x: 200, y: 360, width: 80, height: 16, angle: 0 },
      { x: 450, y: 200, width: 80, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 300, bx: 520, by: 200, color: '#8E44AD' },
    ],
    gravityZones: [
      { x: 450, y: 150, width: 200, height: 150, type: 'reverse' },
    ],
    hazards: [
      { type: 'spikes', x: 450, y: 15, width: 150, height: 20 },
      { type: 'spikes', x: 300, y: 540, width: 200, height: 20 },
    ],
    spawners: [
      { x: 80, y: 50, count: 4, interval: 1600, delay: 600, speed: 2 },
      { x: 520, y: 500, count: 3, interval: 2000, delay: 1200, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Portal solucan deligi gibi! Dusmanlar gecip ters G bolgesine gider.'],
    stars: { one: 650, two: 380, three: 200 },
  },

  // Level 6: Çift portal + ters yerçekimi
  {
    id: 6,
    world: 4,
    name: 'Cift Solucan',
    inkLimit: 700,
    pets: [{ type: 'punch', x: 300, y: 280 }],
    platforms: [
      { x: 300, y: 340, width: 80, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 60, ay: 150, bx: 540, by: 400, color: '#8E44AD' },
      { ax: 540, ay: 150, bx: 60, by: 400, color: '#3498DB' },
    ],
    gravityZones: [
      { x: 300, y: 150, width: 200, height: 120, type: 'reverse' },
      { x: 300, y: 430, width: 200, height: 100, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 15, width: 180, height: 20 },
    ],
    spawners: [
      { x: 60, y: 50, count: 4, interval: 1500, delay: 500, speed: 2.2 },
      { x: 540, y: 50, count: 4, interval: 1500, delay: 1000, speed: 2.2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Iki solucan deligi ve iki farkli yercekimi! Her yonu koru.'],
    stars: { one: 700, two: 420, three: 220 },
  },

  // ═══════════════════════════════════════════════
  // BOLUM 3: COKLU YERCEKIMI + PORTALLAR (Level 7-9)
  // ═══════════════════════════════════════════════

  // Level 7: Üç yerçekimi bölgesi
  {
    id: 7,
    world: 4,
    name: 'G Mozaik',
    inkLimit: 750,
    pets: [{ type: 'punch', x: 300, y: 280 }],
    platforms: [
      { x: 300, y: 340, width: 80, height: 16, angle: 0 },
      { x: 150, y: 200, width: 60, height: 16, angle: 0 },
    ],
    gravityZones: [
      { x: 150, y: 150, width: 180, height: 150, type: 'zero' },
      { x: 450, y: 150, width: 180, height: 150, type: 'reverse' },
      { x: 300, y: 450, width: 250, height: 100, type: 'strong' },
    ],
    portals: [
      { ax: 80, ay: 350, bx: 520, by: 150, color: '#9B59B6' },
    ],
    hazards: [
      { type: 'spikes', x: 450, y: 15, width: 150, height: 20 },
      { type: 'spikes', x: 300, y: 540, width: 250, height: 20 },
    ],
    spawners: [
      { x: 80, y: 50, count: 5, interval: 1500, delay: 500, speed: 2.2 },
      { x: 520, y: 50, count: 5, interval: 1500, delay: 900, speed: 2.2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Uc farkli yercekimi bolgesi! Sifir, ters ve guclu G bir arada.'],
    stars: { one: 750, two: 440, three: 230 },
  },

  // Level 8: Yatay yerçekimi + portallar
  {
    id: 8,
    world: 4,
    name: 'Yatay Kaydirma',
    inkLimit: 750,
    pets: [{ type: 'punch', x: 300, y: 200 }],
    platforms: [
      { x: 300, y: 260, width: 90, height: 16, angle: 0 },
    ],
    gravityZones: [
      { x: 150, y: 280, width: 160, height: 200, type: 'left' },
      { x: 450, y: 280, width: 160, height: 200, type: 'right' },
    ],
    portals: [
      { ax: 30, ay: 280, bx: 570, by: 280, color: '#E74C3C' },
    ],
    hazards: [
      { type: 'spikes', x: 15, y: 280, width: 20, height: 200 },
      { type: 'spikes', x: 585, y: 280, width: 20, height: 200 },
    ],
    spawners: [
      { x: 300, y: 30, count: 5, interval: 1400, delay: 500, speed: 2.5 },
      { x: 150, y: 50, count: 3, interval: 1800, delay: 1000, speed: 2 },
      { x: 450, y: 50, count: 3, interval: 1800, delay: 1500, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Yatay yercekimi! Punch sola ve saga cekilir. Dikenlerden uzak tut!'],
    stars: { one: 750, two: 440, three: 230 },
  },

  // Level 9: Tüm yerçekimi tipleri + çift portal
  {
    id: 9,
    world: 4,
    name: 'G Labirenti',
    inkLimit: 800,
    pets: [
      { type: 'punch', x: 300, y: 280 },
      { type: 'mini', x: 150, y: 150 },
    ],
    platforms: [
      { x: 300, y: 340, width: 80, height: 16, angle: 0 },
      { x: 150, y: 210, width: 70, height: 16, angle: 0 },
    ],
    gravityZones: [
      { x: 150, y: 130, width: 150, height: 120, type: 'zero' },
      { x: 450, y: 130, width: 150, height: 120, type: 'reverse' },
      { x: 150, y: 430, width: 150, height: 100, type: 'right' },
      { x: 450, y: 430, width: 150, height: 100, type: 'strong' },
    ],
    portals: [
      { ax: 60, ay: 400, bx: 540, by: 130, color: '#8E44AD' },
      { ax: 540, ay: 400, bx: 60, by: 130, color: '#2ECC71' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 540, width: 300, height: 20 },
      { type: 'spikes', x: 300, y: 15, width: 200, height: 20 },
    ],
    spawners: [
      { x: 100, y: 50, count: 5, interval: 1300, delay: 400, speed: 2.5 },
      { x: 500, y: 50, count: 5, interval: 1300, delay: 800, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Dort farkli G bolgesi ve iki portal! Strateji cok onemli.'],
    stars: { one: 800, two: 480, three: 260 },
  },

  // ═══════════════════════════════════════════════
  // BOLUM 4: COKLU PUNCH + FANLAR + YERCEKIMI (Level 10-12)
  // ═══════════════════════════════════════════════

  // Level 10: İki Punch sıfır G'de, fanlar
  {
    id: 10,
    world: 4,
    name: 'Uzay Yuruyusu',
    inkLimit: 850,
    pets: [
      { type: 'punch', x: 180, y: 250 },
      { type: 'punch', x: 420, y: 250 },
    ],
    platforms: [
      { x: 180, y: 310, width: 70, height: 16, angle: 0 },
      { x: 420, y: 310, width: 70, height: 16, angle: 0 },
    ],
    gravityZones: [
      { x: 300, y: 280, width: 500, height: 200, type: 'zero' },
    ],
    fans: [
      { x: 50, y: 280, width: 40, height: 150, direction: 'right', strength: 0.0015 },
      { x: 550, y: 280, width: 40, height: 150, direction: 'left', strength: 0.0015 },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 540, width: 400, height: 20 },
    ],
    spawners: [
      { x: 300, y: 30, count: 5, interval: 1400, delay: 600, speed: 2.2 },
      { x: 100, y: 50, count: 3, interval: 1800, delay: 1200, speed: 2 },
      { x: 500, y: 50, count: 3, interval: 1800, delay: 1600, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 14,
    hints: ['Iki Punch sifir G de suzuyor! Iticiler onlari saga sola iter.'],
    stars: { one: 850, two: 500, three: 280 },
  },

  // Level 11: Üç Punch, fan + ters G
  {
    id: 11,
    world: 4,
    name: 'Itici Ruzgar',
    inkLimit: 900,
    pets: [
      { type: 'punch', x: 150, y: 200 },
      { type: 'mini', x: 300, y: 350 },
      { type: 'punch', x: 450, y: 200 },
    ],
    platforms: [
      { x: 150, y: 260, width: 70, height: 16, angle: 0 },
      { x: 300, y: 410, width: 70, height: 16, angle: 0 },
      { x: 450, y: 260, width: 70, height: 16, angle: 0 },
    ],
    fans: [
      { x: 300, y: 100, width: 150, height: 50, direction: 'down', strength: 0.002 },
      { x: 50, y: 400, width: 40, height: 120, direction: 'right', strength: 0.0012 },
    ],
    gravityZones: [
      { x: 300, y: 180, width: 200, height: 120, type: 'reverse' },
      { x: 300, y: 400, width: 200, height: 120, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 15, width: 200, height: 20 },
      { type: 'spikes', x: 300, y: 540, width: 300, height: 20 },
    ],
    spawners: [
      { x: 50, y: 60, count: 5, interval: 1300, delay: 400, speed: 2.5 },
      { x: 550, y: 60, count: 5, interval: 1300, delay: 800, speed: 2.5 },
      { x: 300, y: 500, count: 3, interval: 1800, delay: 1500, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 14,
    hints: ['Iticiler ve ters G beraber! Mini sifir G de kaybolmasin.'],
    stars: { one: 900, two: 540, three: 300 },
  },

  // Level 12: Hareketli platform + fan + yerçekimi
  {
    id: 12,
    world: 4,
    name: 'Kayan Uzay',
    inkLimit: 950,
    pets: [
      { type: 'punch', x: 200, y: 200 },
      { type: 'punch', x: 400, y: 380 },
    ],
    platforms: [
      { x: 200, y: 260, width: 80, height: 16, angle: 0 },
      { x: 400, y: 440, width: 80, height: 16, angle: 0 },
    ],
    movingPlatforms: [
      { x1: 100, y1: 340, x2: 500, y2: 340, width: 80, speed: 0.0008 },
    ],
    fans: [
      { x: 300, y: 480, width: 200, height: 50, direction: 'up', strength: 0.002 },
    ],
    gravityZones: [
      { x: 200, y: 170, width: 180, height: 130, type: 'zero' },
      { x: 400, y: 380, width: 180, height: 130, type: 'reverse' },
    ],
    portals: [
      { ax: 60, ay: 200, bx: 540, by: 380, color: '#9B59B6' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 540, width: 200, height: 20 },
      { type: 'spikes', x: 300, y: 15, width: 200, height: 20 },
    ],
    spawners: [
      { x: 100, y: 40, count: 5, interval: 1200, delay: 400, speed: 2.5 },
      { x: 500, y: 40, count: 5, interval: 1200, delay: 800, speed: 2.5 },
      { x: 300, y: 30, count: 4, interval: 1500, delay: 1200, speed: 2.8 },
    ],
    safeZone: null,
    surviveTime: 14,
    hints: ['Portal, itici, hareketli platform ve G bolgeleri! Her seye dikkat.'],
    stars: { one: 950, two: 560, three: 310 },
  },

  // ═══════════════════════════════════════════════
  // BOLUM 5: TUM UZAY MEKANIKLERI (Level 13-15)
  // ═══════════════════════════════════════════════

  // Level 13: Karmaşık portal ağı + tüm G tipleri
  {
    id: 13,
    world: 4,
    name: 'Portal Agi',
    inkLimit: 1000,
    pets: [
      { type: 'punch', x: 150, y: 200 },
      { type: 'mini', x: 450, y: 350 },
      { type: 'punch', x: 300, y: 280 },
    ],
    platforms: [
      { x: 150, y: 260, width: 70, height: 16, angle: 0 },
      { x: 300, y: 340, width: 70, height: 16, angle: 0 },
      { x: 450, y: 410, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 50, ay: 150, bx: 550, by: 350, color: '#8E44AD' },
      { ax: 550, ay: 150, bx: 50, by: 450, color: '#E74C3C' },
      { ax: 300, ay: 480, bx: 300, by: 100, color: '#3498DB' },
    ],
    gravityZones: [
      { x: 150, y: 150, width: 150, height: 120, type: 'zero' },
      { x: 450, y: 350, width: 150, height: 120, type: 'reverse' },
      { x: 300, y: 450, width: 200, height: 80, type: 'strong' },
    ],
    fans: [
      { x: 50, y: 300, width: 40, height: 120, direction: 'right', strength: 0.001 },
    ],
    hazards: [
      { type: 'spikes', x: 150, y: 540, width: 120, height: 20 },
      { type: 'spikes', x: 450, y: 540, width: 120, height: 20 },
      { type: 'spikes', x: 300, y: 15, width: 200, height: 20 },
    ],
    spawners: [
      { x: 50, y: 40, count: 6, interval: 1100, delay: 300, speed: 2.8 },
      { x: 550, y: 40, count: 6, interval: 1100, delay: 600, speed: 2.8 },
      { x: 300, y: 520, count: 4, interval: 1500, delay: 1000, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 15,
    hints: ['Uc portal ve uc G bolgesi! Dusmanlar her yerde belirir.'],
    stars: { one: 1000, two: 600, three: 340 },
  },

  // Level 14: Tüm mekanikler maximum
  {
    id: 14,
    world: 4,
    name: 'Uzay Kabusu',
    inkLimit: 1100,
    pets: [
      { type: 'punch', x: 150, y: 180 },
      { type: 'punch', x: 450, y: 180 },
      { type: 'mini', x: 300, y: 400 },
    ],
    platforms: [
      { x: 150, y: 240, width: 70, height: 16, angle: 0 },
      { x: 450, y: 240, width: 70, height: 16, angle: 0 },
      { x: 300, y: 460, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 50, ay: 200, bx: 550, by: 400, color: '#8E44AD' },
      { ax: 550, ay: 200, bx: 50, by: 400, color: '#E67E22' },
    ],
    movingPlatforms: [
      { x1: 150, y1: 350, x2: 450, y2: 350, width: 70, speed: 0.001 },
    ],
    trampolines: [
      { x: 300, y: 520, width: 80, force: 0.07 },
    ],
    fans: [
      { x: 300, y: 80, width: 200, height: 50, direction: 'down', strength: 0.0018 },
      { x: 550, y: 300, width: 40, height: 150, direction: 'left', strength: 0.0012 },
    ],
    gravityZones: [
      { x: 150, y: 160, width: 160, height: 120, type: 'reverse' },
      { x: 450, y: 160, width: 160, height: 120, type: 'zero' },
      { x: 300, y: 420, width: 200, height: 100, type: 'left' },
    ],
    hazards: [
      { type: 'spikes', x: 15, y: 300, width: 20, height: 200 },
      { type: 'spikes', x: 300, y: 15, width: 300, height: 20 },
      { type: 'spikes', x: 150, y: 540, width: 100, height: 20 },
      { type: 'spikes', x: 450, y: 540, width: 100, height: 20 },
    ],
    spawners: [
      { x: 50, y: 40, count: 6, interval: 1000, delay: 300, speed: 3 },
      { x: 550, y: 40, count: 6, interval: 1000, delay: 600, speed: 3 },
      { x: 300, y: 30, count: 5, interval: 1200, delay: 900, speed: 3 },
      { x: 300, y: 530, count: 3, interval: 1500, delay: 2000, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 16,
    hints: ['Ters G, sifir G, yatay G, portal, itici... Uzay kabusu!'],
    stars: { one: 1100, two: 650, three: 380 },
  },

  // Level 15: BOSS - Uzay İstasyonu Patron
  {
    id: 15,
    world: 4,
    name: 'UZAY PATRONU',
    inkLimit: 1200,
    pets: [
      { type: 'punch', x: 150, y: 180 },
      { type: 'jumbo', x: 300, y: 140 },
      { type: 'mini', x: 450, y: 200 },
    ],
    platforms: [
      { x: 150, y: 240, width: 70, height: 16, angle: 0 },
      { x: 300, y: 200, width: 60, height: 16, angle: 0 },
      { x: 450, y: 260, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 50, ay: 150, bx: 550, by: 400, color: '#8E44AD' },
      { ax: 550, ay: 150, bx: 50, by: 400, color: '#E74C3C' },
      { ax: 300, ay: 500, bx: 300, by: 80, color: '#3498DB' },
      { ax: 150, ay: 480, bx: 450, by: 100, color: '#2ECC71' },
    ],
    trampolines: [
      { x: 200, y: 500, width: 60, force: 0.07 },
      { x: 400, y: 500, width: 60, force: 0.07 },
    ],
    fans: [
      { x: 50, y: 280, width: 40, height: 140, direction: 'right', strength: 0.0015 },
      { x: 550, y: 280, width: 40, height: 140, direction: 'left', strength: 0.0015 },
      { x: 300, y: 60, width: 150, height: 40, direction: 'down', strength: 0.002 },
    ],
    gravityZones: [
      { x: 150, y: 160, width: 130, height: 100, type: 'reverse' },
      { x: 450, y: 160, width: 130, height: 100, type: 'zero' },
      { x: 300, y: 350, width: 180, height: 100, type: 'strong' },
      { x: 100, y: 420, width: 120, height: 100, type: 'right' },
      { x: 500, y: 420, width: 120, height: 100, type: 'left' },
    ],
    movingPlatforms: [
      { x1: 120, y1: 380, x2: 480, y2: 380, width: 80, speed: 0.001 },
    ],
    hazards: [
      { type: 'spikes', x: 100, y: 540, width: 100, height: 20 },
      { type: 'spikes', x: 300, y: 540, width: 80, height: 20 },
      { type: 'spikes', x: 500, y: 540, width: 100, height: 20 },
      { type: 'spikes', x: 15, y: 200, width: 20, height: 120 },
      { type: 'spikes', x: 585, y: 200, width: 20, height: 120 },
      { type: 'spikes', x: 300, y: 15, width: 250, height: 20 },
    ],
    spawners: [
      { x: 50, y: 40, count: 7, interval: 900, delay: 200, speed: 3.5 },
      { x: 550, y: 40, count: 7, interval: 900, delay: 400, speed: 3.5 },
      { x: 300, y: 20, count: 6, interval: 800, delay: 600, speed: 3.5 },
      { x: 50, y: 480, count: 4, interval: 1200, delay: 1500, speed: 3 },
      { x: 550, y: 480, count: 4, interval: 1200, delay: 2000, speed: 3 },
    ],
    safeZone: null,
    surviveTime: 18,
    hints: ['Son patron savasi! Dort portal, bes G bolgesi, iticiler... HER SEY!'],
    stars: { one: 1200, two: 700, three: 400 },
  },
];
