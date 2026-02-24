/**
 * Dünya 1: Ev - Eğitim bölümleri
 * Level 1-5: Kedi ile temel mekanikler
 * Level 6-10: Yeni hayvanlar + çoklu pet
 * Level 11-15: Tüm tehlikeler + Boss
 */
export const world1 = [
  // ═══════════════════════════════════════════════
  // BÖLÜM 1: TEMEL MEKANİKLER (Level 1-5)
  // ═══════════════════════════════════════════════

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

  // Level 5: İlk "zor" level - üç yönden saldırı
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

  // ═══════════════════════════════════════════════
  // BÖLÜM 2: YENİ HAYVANLAR (Level 6-10)
  // ═══════════════════════════════════════════════

  // Level 6: Hamster tanıtım - küçük ve kaygan
  {
    id: 6,
    world: 1,
    name: 'Küçük Kahraman',
    inkLimit: 550,
    pets: [{ type: 'hamster', x: 300, y: 220 }],
    platforms: [
      { x: 300, y: 270, width: 90, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'fire', x: 300, y: 520, width: 180, height: 30 },
    ],
    spawners: [
      { x: 150, y: 60, count: 3, interval: 1800, delay: 800, speed: 1.8 },
      { x: 450, y: 60, count: 3, interval: 1800, delay: 1200, speed: 1.8 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Hamster çok kaygan! Düşmemesi için kenarları kapat.'],
    stars: { one: 550, two: 300, three: 150 },
  },

  // Level 7: İlk çoklu pet - kedi + hamster
  {
    id: 7,
    world: 1,
    name: 'İkili Kurtarma',
    inkLimit: 800,
    pets: [
      { type: 'cat', x: 200, y: 230 },
      { type: 'hamster', x: 400, y: 230 },
    ],
    platforms: [
      { x: 200, y: 290, width: 80, height: 20, angle: 0 },
      { x: 400, y: 290, width: 80, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'fire', x: 300, y: 520, width: 250, height: 30 },
    ],
    spawners: [
      { x: 300, y: 40, count: 5, interval: 1500, delay: 600, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['İki hayvanı da korumalısın! Her birine kalkan çiz.'],
    stars: { one: 800, two: 500, three: 300 },
  },

  // Level 8: Köpek tanıtım - ağır ve güçlü
  {
    id: 8,
    world: 1,
    name: 'Sadık Dost',
    inkLimit: 600,
    pets: [{ type: 'dog', x: 300, y: 200 }],
    platforms: [
      { x: 300, y: 270, width: 100, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'water', x: 150, y: 520, width: 120, height: 40 },
      { type: 'water', x: 450, y: 520, width: 120, height: 40 },
    ],
    spawners: [
      { x: 80, y: 100, count: 4, interval: 1400, delay: 500, speed: 2.2 },
      { x: 520, y: 100, count: 4, interval: 1400, delay: 800, speed: 2.2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Köpek ağırdır, çizimin güçlü olmalı!'],
    stars: { one: 600, two: 350, three: 180 },
  },

  // Level 9: Tavşan tanıtım - zıplayan
  {
    id: 9,
    world: 1,
    name: 'Zıp Zıp',
    inkLimit: 700,
    pets: [{ type: 'rabbit', x: 300, y: 150 }],
    platforms: [
      { x: 200, y: 250, width: 70, height: 20, angle: 0 },
      { x: 400, y: 350, width: 70, height: 20, angle: 0 },
      { x: 300, y: 450, width: 90, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 530, width: 400, height: 25 },
    ],
    spawners: [
      { x: 50, y: 50, count: 3, interval: 2000, delay: 1000, speed: 1.8 },
      { x: 550, y: 200, count: 3, interval: 2000, delay: 1500, speed: 1.8 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Tavşan zıplar! Üstünü örtmeyi unutma.'],
    stars: { one: 700, two: 420, three: 220 },
  },

  // Level 10: Üç pet birden - kaotik
  {
    id: 10,
    world: 1,
    name: 'Kalabalık Aile',
    inkLimit: 1000,
    pets: [
      { type: 'cat', x: 150, y: 250 },
      { type: 'hamster', x: 300, y: 200 },
      { type: 'dog', x: 450, y: 250 },
    ],
    platforms: [
      { x: 150, y: 310, width: 80, height: 20, angle: 0 },
      { x: 300, y: 270, width: 70, height: 20, angle: 0 },
      { x: 450, y: 310, width: 80, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'fire', x: 300, y: 520, width: 300, height: 30 },
    ],
    spawners: [
      { x: 50, y: 50, count: 4, interval: 1500, delay: 500, speed: 2 },
      { x: 550, y: 50, count: 4, interval: 1500, delay: 1000, speed: 2 },
      { x: 300, y: 30, count: 3, interval: 1800, delay: 1500, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Üç hayvanı da koru! Geniş bir kalkan çiz.'],
    stars: { one: 1000, two: 650, three: 400 },
  },

  // ═══════════════════════════════════════════════
  // BÖLÜM 3: UZMAN SEVİYE (Level 11-15)
  // ═══════════════════════════════════════════════

  // Level 11: Eğik platformlar + lav
  {
    id: 11,
    world: 1,
    name: 'Eğik Yol',
    inkLimit: 650,
    pets: [{ type: 'cat', x: 200, y: 180 }],
    platforms: [
      { x: 200, y: 240, width: 100, height: 16, angle: -10 },
      { x: 400, y: 340, width: 80, height: 16, angle: 15 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
    spawners: [
      { x: 500, y: 60, count: 5, interval: 1200, delay: 500, speed: 2.5 },
      { x: 100, y: 400, count: 3, interval: 1500, delay: 1000, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Eğik platformdan kayabilir! Altını da kapat.'],
    stars: { one: 650, two: 380, three: 200 },
  },

  // Level 12: Diken tarlası - dar geçiş
  {
    id: 12,
    world: 1,
    name: 'Diken Tarlası',
    inkLimit: 700,
    pets: [
      { type: 'rabbit', x: 300, y: 150 },
      { type: 'cat', x: 300, y: 320 },
    ],
    platforms: [
      { x: 300, y: 210, width: 60, height: 16, angle: 0 },
      { x: 300, y: 380, width: 80, height: 16, angle: 0 },
    ],
    hazards: [
      { type: 'spikes', x: 100, y: 480, width: 100, height: 25 },
      { type: 'spikes', x: 300, y: 500, width: 100, height: 25 },
      { type: 'spikes', x: 500, y: 480, width: 100, height: 25 },
    ],
    spawners: [
      { x: 80, y: 60, count: 4, interval: 1300, delay: 600, speed: 2.3 },
      { x: 520, y: 60, count: 4, interval: 1300, delay: 900, speed: 2.3 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Tavşan zıplıyor! Dikenlere düşmesin.'],
    stars: { one: 700, two: 400, three: 210 },
  },

  // Level 13: Karışık tehlikeler
  {
    id: 13,
    world: 1,
    name: 'Karışık Tehlike',
    inkLimit: 750,
    pets: [
      { type: 'dog', x: 200, y: 200 },
      { type: 'hamster', x: 420, y: 250 },
    ],
    platforms: [
      { x: 200, y: 270, width: 90, height: 20, angle: 0 },
      { x: 420, y: 310, width: 70, height: 16, angle: 5 },
    ],
    hazards: [
      { type: 'fire', x: 100, y: 500, width: 80, height: 30 },
      { type: 'water', x: 300, y: 520, width: 100, height: 35 },
      { type: 'spikes', x: 500, y: 490, width: 80, height: 25 },
    ],
    spawners: [
      { x: 50, y: 80, count: 4, interval: 1200, delay: 400, speed: 2.5 },
      { x: 550, y: 80, count: 4, interval: 1200, delay: 700, speed: 2.5 },
      { x: 300, y: 30, count: 3, interval: 1500, delay: 1500, speed: 3 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Tüm tehlikeler burada! Her hayvanı ayrı koru.'],
    stars: { one: 750, two: 450, three: 250 },
  },

  // Level 14: Dört pet - son savunma
  {
    id: 14,
    world: 1,
    name: 'Son Savunma',
    inkLimit: 1200,
    pets: [
      { type: 'cat', x: 150, y: 200 },
      { type: 'dog', x: 300, y: 180 },
      { type: 'hamster', x: 450, y: 220 },
      { type: 'rabbit', x: 300, y: 340 },
    ],
    platforms: [
      { x: 150, y: 260, width: 70, height: 16, angle: 0 },
      { x: 300, y: 250, width: 80, height: 16, angle: 0 },
      { x: 450, y: 280, width: 70, height: 16, angle: 0 },
      { x: 300, y: 400, width: 90, height: 16, angle: 0 },
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
    hints: ['Dört hayvan! Hepsini koruyacak büyük bir kale çiz.'],
    stars: { one: 1200, two: 750, three: 450 },
  },

  // Level 15: PATRON - Final
  {
    id: 15,
    world: 1,
    name: 'PATRON',
    inkLimit: 1000,
    pets: [
      { type: 'cat', x: 200, y: 220 },
      { type: 'dog', x: 400, y: 220 },
      { type: 'rabbit', x: 300, y: 140 },
    ],
    platforms: [
      { x: 200, y: 280, width: 80, height: 16, angle: 0 },
      { x: 400, y: 280, width: 80, height: 16, angle: 0 },
      { x: 300, y: 200, width: 60, height: 16, angle: 0 },
    ],
    hazards: [
      { type: 'lava', x: 150, y: 520, width: 120, height: 35 },
      { type: 'fire', x: 300, y: 510, width: 80, height: 30 },
      { type: 'spikes', x: 450, y: 520, width: 120, height: 25 },
    ],
    spawners: [
      { x: 50, y: 40, count: 6, interval: 1000, delay: 300, speed: 3 },
      { x: 550, y: 40, count: 6, interval: 1000, delay: 500, speed: 3 },
      { x: 300, y: 20, count: 5, interval: 900, delay: 800, speed: 3.5 },
      { x: 50, y: 400, count: 3, interval: 1200, delay: 2000, speed: 2.5 },
      { x: 550, y: 400, count: 3, interval: 1200, delay: 2500, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 15,
    hints: ['Bu son savaş! Her şeyini ver, mürekkebi akıllıca kullan!'],
    stars: { one: 1000, two: 600, three: 350 },
  },
];
