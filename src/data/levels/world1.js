/**
 * Dünya 1: Yeşil Orman - Eğitim bölümleri
 * Punch'ın macerası başlıyor!
 * Level 1-5: Temel mekanikler
 * Level 6-10: Yeni mekanikler tanıtım
 * Level 11-15: Kombolar + Boss
 */
export const world1 = [
  // ═══════════════════════════════════════════════
  // BÖLÜM 1: TEMEL MEKANİKLER (Level 1-5)
  // ═══════════════════════════════════════════════

  // Level 1: Basit çizgi çek, Punch'ı koru
  {
    id: 1,
    world: 1,
    name: 'İlk Kurtarma',
    inkLimit: 600,
    pets: [{ type: 'punch', x: 300, y: 200 }],
    platforms: [
      { x: 300, y: 260, width: 120, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'fire', x: 300, y: 520, width: 200, height: 30 },
    ],
    spawners: [
      { x: 300, y: 50, count: 3, interval: 2000, delay: 1000, speed: 1.5 },
    ],
    safeZone: null,
    surviveTime: 8,
    hints: ['Punch\'in ustune bir cati ciz!'],
    stars: { one: 600, two: 350, three: 180 },
  },

  // Level 2: İki taraftan gelen düşmanlar
  {
    id: 2,
    world: 1,
    name: 'İki Cephe',
    inkLimit: 700,
    pets: [{ type: 'punch', x: 300, y: 300 }],
    platforms: [
      { x: 300, y: 360, width: 100, height: 20, angle: 0 },
    ],
    hazards: [],
    spawners: [
      { x: 50, y: 200, count: 3, interval: 2000, delay: 500, speed: 1.5 },
      { x: 550, y: 200, count: 3, interval: 2000, delay: 1500, speed: 1.5 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Punch\'in etrafini sarmalayan bir kalkan ciz!'],
    stars: { one: 700, two: 400, three: 200 },
  },

  // Level 3: Ateş + düşman combo
  {
    id: 3,
    world: 1,
    name: 'Ateş ve Arılar',
    inkLimit: 650,
    pets: [{ type: 'punch', x: 300, y: 200 }],
    platforms: [
      { x: 300, y: 260, width: 80, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'fire', x: 200, y: 520, width: 100, height: 30 },
      { type: 'fire', x: 400, y: 520, width: 100, height: 30 },
    ],
    spawners: [
      { x: 300, y: 30, count: 5, interval: 1500, delay: 800, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Kalkanin saglam olsun, cok dusman gelecek!'],
    stars: { one: 650, two: 380, three: 190 },
  },

  // Level 4: Dar platform
  {
    id: 4,
    world: 1,
    name: 'Dar Köprü',
    inkLimit: 550,
    pets: [{ type: 'punch', x: 300, y: 280 }],
    platforms: [
      { x: 300, y: 340, width: 60, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
    spawners: [
      { x: 100, y: 80, count: 4, interval: 1200, delay: 500, speed: 2.5 },
      { x: 500, y: 80, count: 4, interval: 1200, delay: 1000, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Punch\'i lavdan dusurme!'],
    stars: { one: 550, two: 320, three: 160 },
  },

  // Level 5: Üç yönden saldırı
  {
    id: 5,
    world: 1,
    name: 'Kuşatma',
    inkLimit: 800,
    pets: [{ type: 'punch', x: 300, y: 250 }],
    platforms: [
      { x: 300, y: 310, width: 100, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'fire', x: 100, y: 500, width: 80, height: 30 },
      { type: 'fire', x: 500, y: 500, width: 80, height: 30 },
    ],
    spawners: [
      { x: 50, y: 50, count: 4, interval: 1500, delay: 500, speed: 2 },
      { x: 550, y: 50, count: 4, interval: 1500, delay: 1000, speed: 2 },
      { x: 300, y: 30, count: 3, interval: 2000, delay: 2000, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Uc yonden saldiri geliyor! Kalkanini buyuk ciz.'],
    stars: { one: 800, two: 500, three: 280 },
  },

  // ═══════════════════════════════════════════════
  // BÖLÜM 2: YENİ MEKANİKLER (Level 6-10)
  // ═══════════════════════════════════════════════

  // Level 6: Trambolin tanıtım
  {
    id: 6,
    world: 1,
    name: 'Zip Zip',
    inkLimit: 550,
    pets: [{ type: 'mini', x: 300, y: 220 }],
    platforms: [
      { x: 300, y: 270, width: 90, height: 20, angle: 0 },
    ],
    trampolines: [
      { x: 150, y: 480, width: 80, force: 0.06 },
      { x: 450, y: 480, width: 80, force: 0.06 },
    ],
    hazards: [
      { type: 'fire', x: 300, y: 520, width: 150, height: 30 },
    ],
    spawners: [
      { x: 150, y: 60, count: 3, interval: 1800, delay: 800, speed: 1.8 },
      { x: 450, y: 60, count: 3, interval: 1800, delay: 1200, speed: 1.8 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Mini cok kaygan! Dusmemesi icin kenarlari kapat.'],
    stars: { one: 550, two: 300, three: 150 },
  },

  // Level 7: Portal tanıtım
  {
    id: 7,
    world: 1,
    name: 'Portal Kapısı',
    inkLimit: 600,
    pets: [{ type: 'punch', x: 300, y: 250 }],
    platforms: [
      { x: 300, y: 310, width: 100, height: 20, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 200, bx: 520, by: 200, color: '#9B59B6' },
    ],
    hazards: [],
    spawners: [
      { x: 80, y: 60, count: 4, interval: 1500, delay: 800, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Dusmanlar portaldan gecebilir! Her iki tarafi da koru.'],
    stars: { one: 600, two: 350, three: 180 },
  },

  // Level 8: Rüzgar tanıtım
  {
    id: 8,
    world: 1,
    name: 'Rüzgar Tüneli',
    inkLimit: 650,
    pets: [{ type: 'punch', x: 300, y: 230 }],
    platforms: [
      { x: 300, y: 290, width: 100, height: 20, angle: 0 },
    ],
    fans: [
      { x: 80, y: 300, width: 60, height: 200, direction: 'right', strength: 0.0015 },
    ],
    hazards: [
      { type: 'spikes', x: 520, y: 300, width: 30, height: 200 },
    ],
    spawners: [
      { x: 300, y: 50, count: 4, interval: 1500, delay: 600, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Ruzgar saga itiyor! Punch\'i saga dusmekten koru.'],
    stars: { one: 650, two: 380, three: 200 },
  },

  // Level 9: Hareketli platform
  {
    id: 9,
    world: 1,
    name: 'Kayar Platform',
    inkLimit: 700,
    pets: [{ type: 'punch', x: 300, y: 150 }],
    platforms: [
      { x: 300, y: 210, width: 70, height: 16, angle: 0 },
    ],
    movingPlatforms: [
      { x1: 150, y1: 350, x2: 450, y2: 350, width: 90, speed: 0.0008 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
    spawners: [
      { x: 50, y: 50, count: 3, interval: 2000, delay: 1000, speed: 1.8 },
      { x: 550, y: 50, count: 3, interval: 2000, delay: 1500, speed: 1.8 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Platform hareket ediyor! Punch dusmemeli.'],
    stars: { one: 700, two: 420, three: 220 },
  },

  // Level 10: Yerçekimi bölgesi
  {
    id: 10,
    world: 1,
    name: 'Ters Dünya',
    inkLimit: 700,
    pets: [
      { type: 'punch', x: 200, y: 250 },
      { type: 'mini', x: 400, y: 250 },
    ],
    platforms: [
      { x: 200, y: 310, width: 80, height: 16, angle: 0 },
      { x: 400, y: 310, width: 80, height: 16, angle: 0 },
    ],
    gravityZones: [
      { x: 300, y: 200, width: 200, height: 150, type: 'reverse' },
    ],
    hazards: [
      { type: 'fire', x: 300, y: 520, width: 200, height: 30 },
    ],
    spawners: [
      { x: 300, y: 40, count: 5, interval: 1500, delay: 600, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Ters yercekimi bolgesi var! Dusmanlar yukari ucabilir.'],
    stars: { one: 700, two: 400, three: 200 },
  },

  // ═══════════════════════════════════════════════
  // BÖLÜM 3: MEKANİK COMBO (Level 11-15)
  // ═══════════════════════════════════════════════

  // Level 11: Portal + Trambolin
  {
    id: 11,
    world: 1,
    name: 'Portal Pinball',
    inkLimit: 750,
    pets: [{ type: 'mini', x: 300, y: 200 }],
    platforms: [
      { x: 300, y: 260, width: 80, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 450, bx: 520, by: 100, color: '#E74C3C' },
    ],
    trampolines: [
      { x: 300, y: 480, width: 100, force: 0.07 },
    ],
    hazards: [
      { type: 'fire', x: 100, y: 520, width: 80, height: 30 },
      { type: 'fire', x: 500, y: 520, width: 80, height: 30 },
    ],
    spawners: [
      { x: 50, y: 50, count: 4, interval: 1300, delay: 500, speed: 2.2 },
      { x: 550, y: 50, count: 4, interval: 1300, delay: 800, speed: 2.2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Dusmanlar portaldan gecip trambolinde ziplayabilir!'],
    stars: { one: 750, two: 420, three: 220 },
  },

  // Level 12: Rüzgar + Hareketli platform
  {
    id: 12,
    world: 1,
    name: 'Fırtına',
    inkLimit: 800,
    pets: [
      { type: 'punch', x: 200, y: 200 },
      { type: 'punch', x: 400, y: 200 },
    ],
    platforms: [
      { x: 200, y: 260, width: 80, height: 16, angle: 0 },
      { x: 400, y: 260, width: 80, height: 16, angle: 0 },
    ],
    movingPlatforms: [
      { x1: 150, y1: 400, x2: 450, y2: 400, width: 70, speed: 0.001 },
    ],
    fans: [
      { x: 300, y: 150, width: 200, height: 80, direction: 'down', strength: 0.002 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
    spawners: [
      { x: 50, y: 60, count: 4, interval: 1400, delay: 500, speed: 2 },
      { x: 550, y: 60, count: 4, interval: 1400, delay: 800, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Ruzgar yukden esiyor! Cizimlerin buna dayanmali.'],
    stars: { one: 800, two: 480, three: 260 },
  },

  // Level 13: Çift portal + yerçekimi
  {
    id: 13,
    world: 1,
    name: 'Boyut Kapısı',
    inkLimit: 800,
    pets: [
      { type: 'punch', x: 300, y: 250 },
      { type: 'mini', x: 300, y: 380 },
    ],
    platforms: [
      { x: 300, y: 310, width: 70, height: 16, angle: 0 },
      { x: 300, y: 440, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 150, bx: 520, by: 350, color: '#9B59B6' },
      { ax: 520, ay: 150, bx: 80, by: 350, color: '#E67E22' },
    ],
    gravityZones: [
      { x: 300, y: 380, width: 150, height: 100, type: 'zero' },
    ],
    spawners: [
      { x: 50, y: 50, count: 5, interval: 1200, delay: 400, speed: 2.5 },
      { x: 550, y: 50, count: 5, interval: 1200, delay: 700, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Iki portal, sifir yercekimi! Strateji onemli.'],
    stars: { one: 800, two: 480, three: 260 },
  },

  // Level 14: Tüm mekanikler
  {
    id: 14,
    world: 1,
    name: 'Kaos Fabrikası',
    inkLimit: 1100,
    pets: [
      { type: 'punch', x: 150, y: 200 },
      { type: 'punch', x: 300, y: 180 },
      { type: 'mini', x: 450, y: 220 },
    ],
    platforms: [
      { x: 150, y: 260, width: 70, height: 16, angle: 0 },
      { x: 300, y: 250, width: 80, height: 16, angle: 0 },
      { x: 450, y: 280, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 50, ay: 400, bx: 550, by: 150, color: '#E74C3C' },
    ],
    trampolines: [
      { x: 150, y: 470, width: 60, force: 0.06 },
      { x: 450, y: 470, width: 60, force: 0.06 },
    ],
    fans: [
      { x: 550, y: 300, width: 50, height: 150, direction: 'left', strength: 0.001 },
    ],
    movingPlatforms: [
      { x1: 200, y1: 380, x2: 400, y2: 380, width: 70, speed: 0.0007 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
    spawners: [
      { x: 50, y: 50, count: 5, interval: 1100, delay: 300, speed: 2.5 },
      { x: 550, y: 50, count: 5, interval: 1100, delay: 600, speed: 2.5 },
      { x: 300, y: 30, count: 4, interval: 1300, delay: 1000, speed: 3 },
    ],
    safeZone: null,
    surviveTime: 14,
    hints: ['Portal, trambolin, ruzgar, hepsi var! Akilli ol.'],
    stars: { one: 1100, two: 700, three: 400 },
  },

  // Level 15: BOSS
  {
    id: 15,
    world: 1,
    name: 'ORMAN PATRONU',
    inkLimit: 1200,
    pets: [
      { type: 'punch', x: 150, y: 220 },
      { type: 'jumbo', x: 300, y: 160 },
      { type: 'mini', x: 450, y: 220 },
    ],
    platforms: [
      { x: 150, y: 280, width: 70, height: 16, angle: 0 },
      { x: 300, y: 220, width: 60, height: 16, angle: 0 },
      { x: 450, y: 280, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 50, ay: 200, bx: 550, by: 200, color: '#9B59B6' },
      { ax: 50, ay: 400, bx: 550, by: 400, color: '#E74C3C' },
    ],
    trampolines: [
      { x: 300, y: 480, width: 80, force: 0.08 },
    ],
    fans: [
      { x: 50, y: 300, width: 50, height: 150, direction: 'right', strength: 0.0012 },
      { x: 550, y: 300, width: 50, height: 150, direction: 'left', strength: 0.0012 },
    ],
    gravityZones: [
      { x: 300, y: 130, width: 120, height: 80, type: 'reverse' },
    ],
    movingPlatforms: [
      { x1: 150, y1: 400, x2: 450, y2: 400, width: 80, speed: 0.001 },
    ],
    hazards: [
      { type: 'lava', x: 150, y: 520, width: 100, height: 35 },
      { type: 'fire', x: 300, y: 510, width: 80, height: 30 },
      { type: 'spikes', x: 450, y: 520, width: 100, height: 25 },
    ],
    spawners: [
      { x: 50, y: 40, count: 6, interval: 1000, delay: 300, speed: 3 },
      { x: 550, y: 40, count: 6, interval: 1000, delay: 500, speed: 3 },
      { x: 300, y: 20, count: 5, interval: 900, delay: 800, speed: 3.5 },
      { x: 50, y: 450, count: 3, interval: 1200, delay: 2000, speed: 2.5 },
      { x: 550, y: 450, count: 3, interval: 1200, delay: 2500, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 15,
    hints: ['Son savas! Portal, trambolin, ruzgar, yercekimi... HER SEY!'],
    stars: { one: 1200, two: 700, three: 400 },
  },
];
