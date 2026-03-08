/**
 * Dunya 3: Buz Dagi (Ice Mountain)
 * Soguk ruzgarlar ve buzlu tehlikeler!
 * Level 1-3: Ruzgar (fan) tanitim, buz sivrileri
 * Level 4-6: Coklu fan + yercekimi bolgeleri (kaygan buz)
 * Level 7-9: Hareketli buz platformlar, portal + ruzgar kombolari
 * Level 10-12: Coklu Punch, yercekimi + fan + trambolin (buz ziplamasi)
 * Level 13-14: Tum buz mekanikleri, karmasik ruzgar tunelleri
 * Level 15: BOSS - Maksimum ruzgar, maksimum dusman
 */
export const world3 = [
  // ═══════════════════════════════════════════════
  // BOLUM 1: RUZGAR TANITIM (Level 1-3)
  // ═══════════════════════════════════════════════

  // Level 1: Tek fan, basit ruzgar
  {
    id: 1,
    world: 3,
    name: 'Soguk Esinti',
    inkLimit: 550,
    pets: [{ type: 'punch', x: 300, y: 200 }],
    platforms: [
      { x: 300, y: 260, width: 120, height: 20, angle: 0 },
    ],
    fans: [
      { x: 50, y: 280, width: 60, height: 180, direction: 'right', strength: 0.0012 },
    ],
    hazards: [
      { type: 'spikes', x: 530, y: 300, width: 30, height: 180 },
    ],
    spawners: [
      { x: 300, y: 50, count: 3, interval: 2000, delay: 1000, speed: 1.5 },
    ],
    safeZone: null,
    surviveTime: 8,
    hints: ['Ruzgar saga itiyor! Punch\'i buzlu dikenlerden koru.'],
    stars: { one: 550, two: 320, three: 160 },
  },

  // Level 2: Yukari esen ruzgar + buz sivrileri
  {
    id: 2,
    world: 3,
    name: 'Buz Ruzgari',
    inkLimit: 600,
    pets: [{ type: 'punch', x: 300, y: 280 }],
    platforms: [
      { x: 300, y: 340, width: 100, height: 20, angle: 0 },
    ],
    fans: [
      { x: 300, y: 490, width: 200, height: 60, direction: 'up', strength: 0.0015 },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 60, width: 250, height: 25 },
    ],
    spawners: [
      { x: 80, y: 180, count: 3, interval: 1800, delay: 800, speed: 1.8 },
      { x: 520, y: 180, count: 3, interval: 1800, delay: 1200, speed: 1.8 },
    ],
    safeZone: null,
    surviveTime: 9,
    hints: ['Ruzgar yukari esiyor! Punch\'i tavandaki buzlara carptirma.'],
    stars: { one: 600, two: 350, three: 180 },
  },

  // Level 3: Iki fan karsi yonlu + buz tehlike
  {
    id: 3,
    world: 3,
    name: 'Capraz Esinti',
    inkLimit: 650,
    pets: [{ type: 'punch', x: 300, y: 220 }],
    platforms: [
      { x: 300, y: 280, width: 90, height: 20, angle: 0 },
    ],
    fans: [
      { x: 50, y: 200, width: 60, height: 150, direction: 'right', strength: 0.0012 },
      { x: 550, y: 350, width: 60, height: 150, direction: 'left', strength: 0.0012 },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 525, width: 300, height: 25 },
      { type: 'spikes', x: 300, y: 50, width: 200, height: 20 },
    ],
    spawners: [
      { x: 300, y: 30, count: 4, interval: 1600, delay: 600, speed: 2 },
      { x: 50, y: 400, count: 3, interval: 2000, delay: 1500, speed: 1.8 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Ruzgar iki yonden esiyor! Dengeyi koru.'],
    stars: { one: 650, two: 380, three: 190 },
  },

  // ═══════════════════════════════════════════════
  // BOLUM 2: COKLU FAN + YERCEKIMI (Level 4-6)
  // ═══════════════════════════════════════════════

  // Level 4: Uc fan + sifir yercekimi (buzda kayma)
  {
    id: 4,
    world: 3,
    name: 'Buzlu Vadi',
    inkLimit: 650,
    pets: [{ type: 'punch', x: 300, y: 250 }],
    platforms: [
      { x: 200, y: 310, width: 80, height: 18, angle: 0 },
      { x: 400, y: 310, width: 80, height: 18, angle: 0 },
    ],
    fans: [
      { x: 50, y: 250, width: 50, height: 120, direction: 'right', strength: 0.001 },
      { x: 550, y: 250, width: 50, height: 120, direction: 'left', strength: 0.001 },
      { x: 300, y: 490, width: 150, height: 50, direction: 'up', strength: 0.001 },
    ],
    gravityZones: [
      { x: 300, y: 300, width: 250, height: 100, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 530, width: 400, height: 25 },
    ],
    spawners: [
      { x: 300, y: 40, count: 5, interval: 1500, delay: 500, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Sifir yercekimi bolgesi buzda kayma etkisi yapiyor!'],
    stars: { one: 650, two: 380, three: 200 },
  },

  // Level 5: Fan tuneli + yercekimi bolgeleri
  {
    id: 5,
    world: 3,
    name: 'Buz Tuneli',
    inkLimit: 700,
    pets: [{ type: 'punch', x: 150, y: 250 }],
    platforms: [
      { x: 150, y: 310, width: 80, height: 18, angle: 0 },
    ],
    fans: [
      { x: 50, y: 150, width: 50, height: 100, direction: 'right', strength: 0.0015 },
      { x: 550, y: 320, width: 50, height: 100, direction: 'left', strength: 0.0015 },
      { x: 300, y: 50, width: 150, height: 50, direction: 'down', strength: 0.001 },
    ],
    gravityZones: [
      { x: 400, y: 200, width: 150, height: 120, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 530, y: 200, width: 30, height: 160 },
      { type: 'spikes', x: 300, y: 530, width: 300, height: 25 },
    ],
    spawners: [
      { x: 80, y: 60, count: 4, interval: 1400, delay: 500, speed: 2.2 },
      { x: 520, y: 60, count: 3, interval: 1600, delay: 1200, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 11,
    hints: ['Ruzgar tuneli dusmanlar icin de gecerli! Yonu kullan.'],
    stars: { one: 700, two: 420, three: 220 },
  },

  // Level 6: Guclu fan + sol/sag yercekimi
  {
    id: 6,
    world: 3,
    name: 'Kar Firtinasi',
    inkLimit: 750,
    pets: [{ type: 'mini', x: 300, y: 200 }],
    platforms: [
      { x: 300, y: 260, width: 70, height: 18, angle: 0 },
    ],
    fans: [
      { x: 50, y: 200, width: 50, height: 200, direction: 'right', strength: 0.002 },
      { x: 300, y: 490, width: 200, height: 50, direction: 'up', strength: 0.0012 },
    ],
    gravityZones: [
      { x: 450, y: 280, width: 120, height: 150, type: 'left' },
      { x: 150, y: 150, width: 100, height: 100, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 550, y: 280, width: 30, height: 200 },
      { type: 'spikes', x: 300, y: 530, width: 250, height: 25 },
    ],
    spawners: [
      { x: 300, y: 40, count: 5, interval: 1300, delay: 400, speed: 2.2 },
      { x: 550, y: 100, count: 3, interval: 1800, delay: 1000, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 11,
    hints: ['Kar firtinasi cok guclu! Mini\'yi ruzgardan koru.'],
    stars: { one: 750, two: 440, three: 230 },
  },

  // ═══════════════════════════════════════════════
  // BOLUM 3: HAREKETLI BUZ PLATFORMLAR + PORTAL (Level 7-9)
  // ═══════════════════════════════════════════════

  // Level 7: Hareketli buz platformu + fan
  {
    id: 7,
    world: 3,
    name: 'Kayan Buzul',
    inkLimit: 700,
    pets: [{ type: 'punch', x: 300, y: 170 }],
    platforms: [
      { x: 300, y: 230, width: 80, height: 16, angle: 0 },
    ],
    movingPlatforms: [
      { x1: 120, y1: 370, x2: 480, y2: 370, width: 100, speed: 0.0009 },
    ],
    fans: [
      { x: 50, y: 300, width: 50, height: 180, direction: 'right', strength: 0.0012 },
      { x: 300, y: 50, width: 180, height: 50, direction: 'down', strength: 0.001 },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 530, width: 600, height: 30 },
    ],
    spawners: [
      { x: 50, y: 80, count: 4, interval: 1500, delay: 500, speed: 2 },
      { x: 550, y: 80, count: 4, interval: 1500, delay: 1000, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 11,
    hints: ['Buz platform kayiyor! Ruzgar itmeye devam ediyor.'],
    stars: { one: 700, two: 400, three: 210 },
  },

  // Level 8: Portal + ruzgar - dusmanlar portala suruklensin
  {
    id: 8,
    world: 3,
    name: 'Buz Portali',
    inkLimit: 750,
    pets: [{ type: 'punch', x: 300, y: 250 }],
    platforms: [
      { x: 300, y: 310, width: 90, height: 18, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 300, bx: 520, by: 150, color: '#3498DB' },
    ],
    fans: [
      { x: 50, y: 120, width: 50, height: 120, direction: 'right', strength: 0.0015 },
      { x: 550, y: 350, width: 50, height: 120, direction: 'left', strength: 0.0012 },
    ],
    hazards: [
      { type: 'spikes', x: 520, y: 250, width: 30, height: 120 },
      { type: 'spikes', x: 80, y: 420, width: 30, height: 100 },
    ],
    spawners: [
      { x: 50, y: 50, count: 4, interval: 1400, delay: 600, speed: 2.2 },
      { x: 550, y: 50, count: 4, interval: 1400, delay: 1000, speed: 2.2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Dusmanlar ruzgarla portala suruklenebilir! Dikkat et.'],
    stars: { one: 750, two: 430, three: 230 },
  },

  // Level 9: Cift portal + hareketli platform + fan
  {
    id: 9,
    world: 3,
    name: 'Donmus Gecit',
    inkLimit: 800,
    pets: [{ type: 'punch', x: 200, y: 200 }],
    platforms: [
      { x: 200, y: 260, width: 80, height: 16, angle: 0 },
      { x: 450, y: 180, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 180, bx: 520, by: 400, color: '#3498DB' },
      { ax: 520, ay: 180, bx: 80, by: 400, color: '#9B59B6' },
    ],
    movingPlatforms: [
      { x1: 180, y1: 400, x2: 420, y2: 400, width: 80, speed: 0.0008 },
    ],
    fans: [
      { x: 300, y: 490, width: 200, height: 50, direction: 'up', strength: 0.0015 },
    ],
    gravityZones: [
      { x: 300, y: 400, width: 200, height: 80, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 60, width: 200, height: 20 },
    ],
    spawners: [
      { x: 50, y: 60, count: 5, interval: 1300, delay: 400, speed: 2.3 },
      { x: 550, y: 60, count: 4, interval: 1500, delay: 900, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Portallar ve ruzgar beraber kaos yaratiyor! Dikkatli ciz.'],
    stars: { one: 800, two: 480, three: 260 },
  },

  // ═══════════════════════════════════════════════
  // BOLUM 4: COKLU PUNCH + KOMBO (Level 10-12)
  // ═══════════════════════════════════════════════

  // Level 10: Iki Punch + fan + trambolin
  {
    id: 10,
    world: 3,
    name: 'Buz Ikizleri',
    inkLimit: 850,
    pets: [
      { type: 'punch', x: 180, y: 200 },
      { type: 'punch', x: 420, y: 200 },
    ],
    platforms: [
      { x: 180, y: 260, width: 80, height: 18, angle: 0 },
      { x: 420, y: 260, width: 80, height: 18, angle: 0 },
    ],
    fans: [
      { x: 300, y: 50, width: 180, height: 50, direction: 'down', strength: 0.0015 },
      { x: 50, y: 350, width: 50, height: 120, direction: 'right', strength: 0.001 },
    ],
    trampolines: [
      { x: 300, y: 480, width: 100, force: 0.07 },
    ],
    gravityZones: [
      { x: 300, y: 380, width: 200, height: 80, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 150, y: 530, width: 120, height: 25 },
      { type: 'spikes', x: 450, y: 530, width: 120, height: 25 },
    ],
    spawners: [
      { x: 50, y: 60, count: 5, interval: 1300, delay: 400, speed: 2.2 },
      { x: 550, y: 60, count: 5, interval: 1300, delay: 700, speed: 2.2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Iki Punch\'i birden korumalisin! Ruzgar asagi itiyor.'],
    stars: { one: 850, two: 500, three: 270 },
  },

  // Level 11: Punch + Mini + fan + yercekimi
  {
    id: 11,
    world: 3,
    name: 'Buz Kasirga',
    inkLimit: 900,
    pets: [
      { type: 'punch', x: 200, y: 180 },
      { type: 'mini', x: 400, y: 280 },
    ],
    platforms: [
      { x: 200, y: 240, width: 80, height: 16, angle: 0 },
      { x: 400, y: 340, width: 70, height: 16, angle: 0 },
    ],
    fans: [
      { x: 50, y: 200, width: 50, height: 150, direction: 'right', strength: 0.0018 },
      { x: 550, y: 350, width: 50, height: 150, direction: 'left', strength: 0.0015 },
    ],
    trampolines: [
      { x: 150, y: 470, width: 80, force: 0.065 },
      { x: 450, y: 470, width: 80, force: 0.065 },
    ],
    gravityZones: [
      { x: 300, y: 250, width: 160, height: 100, type: 'zero' },
      { x: 300, y: 430, width: 200, height: 60, type: 'strong' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 530, width: 350, height: 25 },
    ],
    spawners: [
      { x: 300, y: 40, count: 5, interval: 1200, delay: 400, speed: 2.5 },
      { x: 50, y: 400, count: 3, interval: 1600, delay: 1200, speed: 2 },
      { x: 550, y: 100, count: 3, interval: 1800, delay: 1500, speed: 2.2 },
    ],
    safeZone: null,
    surviveTime: 13,
    hints: ['Mini cok hafif, ruzgar onu kolayca savurur! Ekstra koruma sart.'],
    stars: { one: 900, two: 520, three: 280 },
  },

  // Level 12: Uc hayvan + fan + trambolin + hareketli platform
  {
    id: 12,
    world: 3,
    name: 'Buz Sirki',
    inkLimit: 950,
    pets: [
      { type: 'punch', x: 150, y: 200 },
      { type: 'punch', x: 300, y: 150 },
      { type: 'mini', x: 450, y: 200 },
    ],
    platforms: [
      { x: 150, y: 260, width: 70, height: 16, angle: 0 },
      { x: 300, y: 210, width: 60, height: 16, angle: 0 },
      { x: 450, y: 260, width: 70, height: 16, angle: 0 },
    ],
    movingPlatforms: [
      { x1: 150, y1: 390, x2: 450, y2: 390, width: 80, speed: 0.0009 },
    ],
    fans: [
      { x: 50, y: 280, width: 50, height: 150, direction: 'right', strength: 0.0015 },
      { x: 550, y: 180, width: 50, height: 150, direction: 'left', strength: 0.0015 },
    ],
    trampolines: [
      { x: 300, y: 480, width: 90, force: 0.07 },
    ],
    gravityZones: [
      { x: 300, y: 350, width: 200, height: 60, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 150, y: 530, width: 100, height: 25 },
      { type: 'spikes', x: 450, y: 530, width: 100, height: 25 },
    ],
    spawners: [
      { x: 50, y: 50, count: 5, interval: 1200, delay: 300, speed: 2.5 },
      { x: 550, y: 50, count: 5, interval: 1200, delay: 600, speed: 2.5 },
      { x: 300, y: 30, count: 3, interval: 1500, delay: 1200, speed: 2.8 },
    ],
    safeZone: null,
    surviveTime: 13,
    hints: ['Uc hayvani koru! Ruzgar ve trambolin dusmanlar icin de gecerli.'],
    stars: { one: 950, two: 560, three: 300 },
  },

  // ═══════════════════════════════════════════════
  // BOLUM 5: TUM MEKANIKLER + BOSS (Level 13-15)
  // ═══════════════════════════════════════════════

  // Level 13: Karmasik ruzgar tuneli + portal + yercekimi
  {
    id: 13,
    world: 3,
    name: 'Buz Tuneli',
    inkLimit: 1000,
    pets: [
      { type: 'punch', x: 200, y: 200 },
      { type: 'mini', x: 400, y: 300 },
    ],
    platforms: [
      { x: 200, y: 260, width: 70, height: 16, angle: 0 },
      { x: 400, y: 360, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 350, bx: 520, by: 150, color: '#3498DB' },
    ],
    fans: [
      { x: 50, y: 150, width: 50, height: 120, direction: 'right', strength: 0.002 },
      { x: 550, y: 300, width: 50, height: 120, direction: 'left', strength: 0.002 },
      { x: 300, y: 490, width: 200, height: 50, direction: 'up', strength: 0.0012 },
    ],
    gravityZones: [
      { x: 300, y: 200, width: 180, height: 80, type: 'zero' },
      { x: 300, y: 420, width: 150, height: 60, type: 'reverse' },
    ],
    movingPlatforms: [
      { x1: 120, y1: 450, x2: 480, y2: 450, width: 70, speed: 0.001 },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 530, width: 400, height: 25 },
      { type: 'spikes', x: 300, y: 50, width: 250, height: 20 },
    ],
    spawners: [
      { x: 50, y: 50, count: 6, interval: 1100, delay: 300, speed: 2.5 },
      { x: 550, y: 50, count: 5, interval: 1200, delay: 600, speed: 2.5 },
      { x: 300, y: 30, count: 4, interval: 1400, delay: 1000, speed: 2.8 },
    ],
    safeZone: null,
    surviveTime: 14,
    hints: ['Ruzgar tuneli her yonden esiyor! Portal surpriz yapabilir.'],
    stars: { one: 1000, two: 600, three: 330 },
  },

  // Level 14: Tum buz mekanikleri tam gaz
  {
    id: 14,
    world: 3,
    name: 'Buzul Cagi',
    inkLimit: 1100,
    pets: [
      { type: 'punch', x: 150, y: 200 },
      { type: 'punch', x: 300, y: 160 },
      { type: 'mini', x: 450, y: 220 },
    ],
    platforms: [
      { x: 150, y: 260, width: 70, height: 16, angle: 0 },
      { x: 300, y: 220, width: 60, height: 16, angle: 0 },
      { x: 450, y: 280, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 180, bx: 520, by: 400, color: '#3498DB' },
      { ax: 520, ay: 180, bx: 80, by: 400, color: '#9B59B6' },
    ],
    fans: [
      { x: 50, y: 300, width: 50, height: 160, direction: 'right', strength: 0.0018 },
      { x: 550, y: 200, width: 50, height: 160, direction: 'left', strength: 0.0018 },
      { x: 300, y: 490, width: 180, height: 50, direction: 'up', strength: 0.0015 },
    ],
    trampolines: [
      { x: 180, y: 470, width: 70, force: 0.065 },
      { x: 420, y: 470, width: 70, force: 0.065 },
    ],
    movingPlatforms: [
      { x1: 150, y1: 400, x2: 450, y2: 400, width: 70, speed: 0.001 },
    ],
    gravityZones: [
      { x: 300, y: 300, width: 200, height: 80, type: 'zero' },
      { x: 150, y: 150, width: 100, height: 80, type: 'right' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 530, width: 500, height: 25 },
      { type: 'spikes', x: 300, y: 50, width: 200, height: 20 },
    ],
    spawners: [
      { x: 50, y: 40, count: 6, interval: 1000, delay: 300, speed: 2.8 },
      { x: 550, y: 40, count: 6, interval: 1000, delay: 500, speed: 2.8 },
      { x: 300, y: 20, count: 4, interval: 1200, delay: 900, speed: 3 },
    ],
    safeZone: null,
    surviveTime: 15,
    hints: ['Buzul caginda her sey var! Portal, fan, trambolin, yercekimi...'],
    stars: { one: 1100, two: 660, three: 370 },
  },

  // Level 15: BOSS - Buz Dagi Patronu
  {
    id: 15,
    world: 3,
    name: 'BUZ DAGI PATRONU',
    inkLimit: 1200,
    pets: [
      { type: 'punch', x: 150, y: 200 },
      { type: 'jumbo', x: 300, y: 140 },
      { type: 'mini', x: 450, y: 220 },
    ],
    platforms: [
      { x: 150, y: 260, width: 70, height: 16, angle: 0 },
      { x: 300, y: 200, width: 60, height: 16, angle: 0 },
      { x: 450, y: 280, width: 70, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 50, ay: 200, bx: 550, by: 350, color: '#3498DB' },
      { ax: 550, ay: 200, bx: 50, by: 350, color: '#9B59B6' },
    ],
    fans: [
      { x: 50, y: 300, width: 50, height: 180, direction: 'right', strength: 0.002 },
      { x: 550, y: 150, width: 50, height: 180, direction: 'left', strength: 0.002 },
      { x: 200, y: 490, width: 120, height: 50, direction: 'up', strength: 0.0018 },
      { x: 400, y: 490, width: 120, height: 50, direction: 'up', strength: 0.0018 },
    ],
    trampolines: [
      { x: 300, y: 475, width: 80, force: 0.08 },
    ],
    movingPlatforms: [
      { x1: 120, y1: 390, x2: 480, y2: 390, width: 80, speed: 0.0012 },
    ],
    gravityZones: [
      { x: 300, y: 130, width: 150, height: 80, type: 'reverse' },
      { x: 150, y: 380, width: 120, height: 80, type: 'zero' },
      { x: 450, y: 380, width: 120, height: 80, type: 'zero' },
    ],
    hazards: [
      { type: 'spikes', x: 150, y: 530, width: 120, height: 30 },
      { type: 'spikes', x: 300, y: 50, width: 150, height: 25 },
      { type: 'spikes', x: 450, y: 530, width: 120, height: 30 },
    ],
    spawners: [
      { x: 50, y: 40, count: 7, interval: 900, delay: 200, speed: 3 },
      { x: 550, y: 40, count: 7, interval: 900, delay: 400, speed: 3 },
      { x: 300, y: 20, count: 5, interval: 1000, delay: 700, speed: 3.5 },
      { x: 50, y: 450, count: 4, interval: 1200, delay: 1500, speed: 2.5 },
      { x: 550, y: 450, count: 4, interval: 1200, delay: 2000, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 18,
    hints: ['Son savas! Buz Dagi\'nin tum gucu uzerinde. HER SEY BUZ!'],
    stars: { one: 1200, two: 720, three: 400 },
  },
];
