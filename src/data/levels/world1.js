/**
 * Dünya 1: Ev - Eğitim bölümleri
 * Tehlike: Ateş + Düşmanlar (arılar/kırmızı toplar)
 * Hayvan: Kedi
 */
export const world1 = [
  // Level 1: Basit çizgi çek, kediyi ateşten koru
  {
    id: 1,
    world: 1,
    name: 'İlk Kurtarma',
    inkLimit: 600,
    pets: [{ type: 'cat', x: 300, y: 200 }],
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
    hints: ['Kedinin üstüne bir çatı çiz!'],
    stars: { one: 600, two: 350, three: 180 },
  },

  // Level 2: İki taraftan gelen düşmanlar
  {
    id: 2,
    world: 1,
    name: 'İki Cephe',
    inkLimit: 700,
    pets: [{ type: 'cat', x: 300, y: 300 }],
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
    hints: ['Kedinin etrafını sarmalayan bir kalkan çiz!'],
    stars: { one: 700, two: 400, three: 200 },
  },

  // Level 3: Ateş + düşman combo
  {
    id: 3,
    world: 1,
    name: 'Ateş ve Arılar',
    inkLimit: 650,
    pets: [{ type: 'cat', x: 300, y: 200 }],
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
    hints: ['Kalkanın sağlam olsun, çok düşman gelecek!'],
    stars: { one: 650, two: 380, three: 190 },
  },

  // Level 4: Dar platform, düşman hızlı
  {
    id: 4,
    world: 1,
    name: 'Dar Köprü',
    inkLimit: 550,
    pets: [{ type: 'cat', x: 300, y: 280 }],
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
    hints: ['Kediyi lavın üzerinden düşürmemeye dikkat et!'],
    stars: { one: 550, two: 320, three: 160 },
  },

  // Level 5: İlk "zor" level
  {
    id: 5,
    world: 1,
    name: 'Kuşatma',
    inkLimit: 800,
    pets: [{ type: 'cat', x: 300, y: 250 }],
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
    hints: ['Üç yönden saldırı geliyor! Kalkanını büyük çiz.'],
    stars: { one: 800, two: 500, three: 280 },
  },
];
