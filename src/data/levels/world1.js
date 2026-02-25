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
  // Fizik: Düşman yukarıdan düşer, pet platformda. Ateş altta - pet düşerse yanar.
  // Çözüm: Pet'in üstüne yatay çatı çiz. Düşman çatıya çarpar, pet'e ulaşamaz.
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
  // Fizik: Düşmanlar soldan ve sağdan gelir. Pet itilirse lavaya düşer.
  // Çözüm: Pet'in iki yanına duvar çiz - düşmanları engelle + pet'i platformda tut.
  {
    id: 2,
    world: 1,
    name: 'İki Cephe',
    inkLimit: 700,
    pets: [{ type: 'punch', x: 300, y: 300 }],
    platforms: [
      { x: 300, y: 360, width: 100, height: 20, angle: 0 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
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
  // Fizik: Platform dar (80px), altında ateş. Düşmanlar yukarıdan yağar.
  // Çözüm: Üstüne çatı çiz (düşman engeli) + kenarlarına duvar (ateşe düşmeyi önle).
  // İnk kısıtlı - her çizgi önemli.
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
      { type: 'fire', x: 300, y: 320, width: 250, height: 25 },
    ],
    spawners: [
      { x: 300, y: 30, count: 5, interval: 1500, delay: 800, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Platform cok dar, altinda ates var! Hem ustu hem yanlari korumalisin.'],
    stars: { one: 650, two: 380, three: 190 },
  },

  // Level 4: Dar platform
  // Fizik: Platform sadece 60px (pet 36px). Lav tüm zemini kaplar. 8 düşman iki yandan.
  // Çözüm: Pet'in iki yanına kısa duvarlar çiz (düşme engeli) + üst çatı (düşman engeli).
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
  // Fizik: 3 spawner (sol-üst, sağ-üst, tam üst). Zemin tamamen lavla kaplı.
  // Çözüm: Geniş bir kalkan çiz. Düşmanların itme kuvveti pet'i kaydırır,
  // platform 100px - kenardan düşerse lav. İnk çok ama verimli kullan.
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
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
    spawners: [
      { x: 50, y: 50, count: 4, interval: 1500, delay: 500, speed: 2 },
      { x: 550, y: 50, count: 4, interval: 1500, delay: 1000, speed: 2 },
      { x: 300, y: 30, count: 3, interval: 2000, delay: 2000, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Uc yonden saldiri geliyor! Dusersen lav var. Kalkanini buyuk ciz.'],
    stars: { one: 800, two: 500, three: 280 },
  },

  // ═══════════════════════════════════════════════
  // BÖLÜM 2: YENİ MEKANİKLER (Level 6-10)
  // ═══════════════════════════════════════════════

  // Level 6: Trambolin tanıtım
  // Fizik: Platform yok. Mini düşer → tramboline çarpar → yukarı zıplar → tekrar düşer (döngü).
  // Ateşler trambolinin yanında - zıplama yana saparsa ateşe düşer.
  // Çözüm: Trambolinin iki yanına dikey duvarlar çiz → Mini hep merkeze düşsün.
  {
    id: 6,
    world: 1,
    name: 'Zip Zip',
    inkLimit: 350,
    pets: [{ type: 'mini', x: 300, y: 100 }],
    platforms: [],  // Platform yok! Pet düşecek
    trampolines: [
      { x: 300, y: 480, width: 120, force: 0.07 },
    ],
    hazards: [
      { type: 'fire', x: 100, y: 520, width: 120, height: 30 },
      { type: 'fire', x: 500, y: 520, width: 120, height: 30 },
    ],
    spawners: [
      { x: 150, y: 60, count: 3, interval: 2000, delay: 2000, speed: 1.5 },
      { x: 450, y: 60, count: 3, interval: 2000, delay: 2500, speed: 1.5 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Mini dusecek ve trambolinde ziplayacak! Ziplama yolunu duvarlarla yonlendir.'],
    stars: { one: 350, two: 200, three: 100 },
  },

  // Level 7: Portal tanıtım
  // Fizik: Portal (80,120)→(520,280). Düşmanlar sol-üstten gelir, portaldan sağ-ortaya çıkar.
  // Sonuç: Düşman hem soldan hem sağdan (portaldan) gelir. İnk az (350).
  // Çözüm: Az ink'le iki yönü de kapatacak stratejik çizim. Sol duvar + sağ duvar.
  {
    id: 7,
    world: 1,
    name: 'Portal Kapısı',
    inkLimit: 350,
    pets: [{ type: 'punch', x: 300, y: 250 }],
    platforms: [
      { x: 300, y: 310, width: 70, height: 20, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 120, bx: 520, by: 280, color: '#9B59B6' },
    ],
    hazards: [],
    spawners: [
      { x: 80, y: 50, count: 5, interval: 1200, delay: 600, speed: 2.2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Dusmanlar soldan gelip portaldan sagin yanina cikar! Az murekkepte iki tarafi da koru.'],
    stars: { one: 350, two: 200, three: 100 },
  },

  // Level 8: Rüzgar tanıtım
  // Fizik: Fan soldan sağa 0.003 kuvvetle iter. Sağda dikenler (duvar boyunca).
  // Pet platformda ama rüzgar iter → platformdan kayar → dikenlere çarpar.
  // Çözüm: Pet'in sağına dikey duvar çiz (rüzgar kalkanı). Üstten gelen düşmanlara çatı.
  {
    id: 8,
    world: 1,
    name: 'Rüzgar Tüneli',
    inkLimit: 400,
    pets: [{ type: 'punch', x: 250, y: 230 }],
    platforms: [
      { x: 250, y: 290, width: 60, height: 20, angle: 0 },
    ],
    fans: [
      { x: 80, y: 250, width: 60, height: 250, direction: 'right', strength: 0.003 },
    ],
    hazards: [
      { type: 'spikes', x: 560, y: 300, width: 30, height: 300 },
    ],
    spawners: [
      { x: 300, y: 40, count: 4, interval: 1500, delay: 800, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Ruzgar cok guclu! Punch ucacak. Sag tarafa ruzgar duvari ciz.'],
    stars: { one: 400, two: 240, three: 120 },
  },

  // Level 9: Hareketli platform
  // Fizik: Statik platform yok. Hareketli platform x:150↔450 arası kayar. Altta lav.
  // Pet platformla birlikte hareket etmez (sürtünmeye bağlı), kayıp düşebilir.
  // Çözüm: Pet'in etrafına koruma çiz - hem düşmanları engelle hem platformdan kaymasını önle.
  {
    id: 9,
    world: 1,
    name: 'Kayar Platform',
    inkLimit: 400,
    pets: [{ type: 'punch', x: 150, y: 300 }],
    platforms: [],  // Statik platform yok!
    movingPlatforms: [
      { x1: 150, y1: 380, x2: 450, y2: 380, width: 90, speed: 0.0008 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
    spawners: [
      { x: 50, y: 50, count: 3, interval: 2000, delay: 1500, speed: 1.8 },
      { x: 550, y: 50, count: 3, interval: 2000, delay: 2000, speed: 1.8 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Sabit platform yok! Punch hareketli platformda. Kenarlardan dusmesin!'],
    stars: { one: 400, two: 240, three: 130 },
  },

  // Level 10: Yerçekimi bölgesi (ilk 2-pet level)
  // Fizik: Ters yerçekimi bölgesi pet'lerin olduğu alanı kaplıyor. Pet'ler yukarı uçar.
  // Tavanda dikenler var → uçan pet dikenlere çarpar = ölüm.
  // Çözüm: Pet'lerin üstüne yatay tavan çiz → yukarı uçmayı engelle. Düşmanlar alttan gelir.
  {
    id: 10,
    world: 1,
    name: 'Ters Dünya',
    inkLimit: 450,
    pets: [
      { type: 'punch', x: 200, y: 350 },
      { type: 'mini', x: 400, y: 350 },
    ],
    platforms: [
      { x: 200, y: 410, width: 70, height: 16, angle: 0 },
      { x: 400, y: 410, width: 70, height: 16, angle: 0 },
    ],
    gravityZones: [
      { x: 300, y: 300, width: 400, height: 250, type: 'reverse' },
    ],
    hazards: [
      { type: 'spikes', x: 300, y: 50, width: 400, height: 20 },
    ],
    spawners: [
      { x: 100, y: 500, count: 4, interval: 1500, delay: 800, speed: 2 },
      { x: 500, y: 500, count: 4, interval: 1500, delay: 1200, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 10,
    hints: ['Ters yercekimi! Petler yukari ucacak, tavandaki dikenlere carpiyor. Tavan ciz!'],
    stars: { one: 450, two: 260, three: 140 },
  },

  // ═══════════════════════════════════════════════
  // BÖLÜM 3: MEKANİK COMBO (Level 11-15)
  // ═══════════════════════════════════════════════

  // Level 11: Portal + Trambolin combo
  // Fizik: Mini düşer → tramboline zıplar. Portal (80,480)→(300,150) düşmanları yukarı taşır.
  // Ateşler trambolinin yanlarında - Mini yana saparsa yanar.
  // Çözüm: Zıplama koridoru çiz (dikey duvarlar) + portaldan çıkan düşmanları engelleyici çatı.
  {
    id: 11,
    world: 1,
    name: 'Portal Pinball',
    inkLimit: 400,
    pets: [{ type: 'mini', x: 300, y: 80 }],
    platforms: [],  // Platform yok - pet tramboline düşecek
    portals: [
      { ax: 80, ay: 480, bx: 300, by: 150, color: '#E74C3C' },
    ],
    trampolines: [
      { x: 300, y: 480, width: 100, force: 0.07 },
    ],
    hazards: [
      { type: 'fire', x: 100, y: 520, width: 80, height: 30 },
      { type: 'fire', x: 500, y: 520, width: 80, height: 30 },
    ],
    spawners: [
      { x: 80, y: 450, count: 5, interval: 1300, delay: 1000, speed: 2.2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Mini trambolinde ziplayacak! Dusmanlar portaldan yukari cikiyor. Yolunu ciz!'],
    stars: { one: 400, two: 240, three: 130 },
  },

  // Level 12: Rüzgar + Hareketli platform
  // Fizik: 2 pet dar hareketli platformda. Rüzgar sağa iter. Sağda dikenler, altta lav.
  // Rüzgar pet'i sağa iter → dikenlere. Platform sola kayınca pet boşluğa düşer → lava.
  // Çözüm: Rüzgar duvarı çiz (sağa itilmeyi önle) + platformun üstünde koruma.
  {
    id: 12,
    world: 1,
    name: 'Fırtına',
    inkLimit: 500,
    pets: [
      { type: 'punch', x: 280, y: 320 },
      { type: 'punch', x: 340, y: 320 },
    ],
    platforms: [],
    movingPlatforms: [
      { x1: 150, y1: 400, x2: 450, y2: 400, width: 160, speed: 0.001 },
    ],
    fans: [
      { x: 50, y: 200, width: 50, height: 300, direction: 'right', strength: 0.0025 },
    ],
    hazards: [
      { type: 'spikes', x: 560, y: 300, width: 30, height: 300 },
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
    spawners: [
      { x: 300, y: 50, count: 4, interval: 1500, delay: 1000, speed: 2 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Ruzgar saga itiyor, platform kayiyor! Petleri hem ruzgardan hem lavdan koru.'],
    stars: { one: 500, two: 300, three: 160 },
  },

  // Level 13: Çift portal + sıfır yerçekimi
  // Fizik: Sıfır yerçekimi → pet'ler süzülüyor (ne yukarı ne aşağı). Üstte dikenler, altta ateş.
  // 2 portal karşılıklı: sol-üst↔sağ-alt ve sağ-üst↔sol-alt. Düşmanlar portallarla dolaşır.
  // Çözüm: Pet'leri ortada tutan kutu/kafes çiz. Portaldan gelen düşmanları kafes engeller.
  {
    id: 13,
    world: 1,
    name: 'Boyut Kapısı',
    inkLimit: 500,
    pets: [
      { type: 'punch', x: 300, y: 300 },
      { type: 'mini', x: 300, y: 250 },
    ],
    platforms: [],  // Platform yok - sıfır yerçekiminde süzülüyorlar
    portals: [
      { ax: 80, ay: 150, bx: 520, by: 350, color: '#9B59B6' },
      { ax: 520, ay: 150, bx: 80, by: 350, color: '#E67E22' },
    ],
    gravityZones: [
      { x: 300, y: 280, width: 300, height: 200, type: 'zero' },
    ],
    hazards: [
      { type: 'fire', x: 300, y: 520, width: 400, height: 30 },
      { type: 'spikes', x: 300, y: 50, width: 400, height: 20 },
    ],
    spawners: [
      { x: 50, y: 50, count: 5, interval: 1200, delay: 500, speed: 2.5 },
      { x: 550, y: 50, count: 5, interval: 1200, delay: 800, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 12,
    hints: ['Sifir yercekimi! Petler suzuluyor. Portallardan gelen dusmanlari engelle.'],
    stars: { one: 500, two: 300, three: 160 },
  },

  // Level 14: Tüm mekanikler
  // Fizik: Punch (sol) tramboline düşecek, Mini (sağ) platformda. Fan sağdan sola iter.
  // Portal (80,450)→(450,150) düşmanları Mini'nin üstüne çıkarır. Hareketli platform ortada.
  // Çözüm: Punch için zıplama koridoru + Mini için rüzgar duvarı + portal çıkışını engelle.
  {
    id: 14,
    world: 1,
    name: 'Kaos Fabrikası',
    inkLimit: 600,
    pets: [
      { type: 'punch', x: 150, y: 100 },
      { type: 'mini', x: 450, y: 320 },
    ],
    platforms: [
      { x: 450, y: 380, width: 50, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 80, ay: 450, bx: 450, by: 150, color: '#E74C3C' },
    ],
    trampolines: [
      { x: 150, y: 480, width: 80, force: 0.07 },
    ],
    fans: [
      { x: 550, y: 250, width: 50, height: 200, direction: 'left', strength: 0.002 },
    ],
    movingPlatforms: [
      { x1: 200, y1: 250, x2: 400, y2: 250, width: 70, speed: 0.0008 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
    ],
    spawners: [
      { x: 80, y: 420, count: 4, interval: 1200, delay: 500, speed: 2.5 },
      { x: 300, y: 30, count: 4, interval: 1300, delay: 800, speed: 2.5 },
    ],
    safeZone: null,
    surviveTime: 14,
    hints: ['Punch tramboline dusecek! Mini ruzgardan korunmali! Portal dusmanları yukari tasiyor!'],
    stars: { one: 600, two: 360, three: 200 },
  },

  // Level 15: BOSS
  // Fizik: 3 pet farklı yerlerde. Punch+Mini tramboline düşecek, Jumbo dar platformda.
  // 2 fan karşılıklı (sağa+sola iter), 2 portal düşmanları yukarı taşır.
  // Ters yerçekimi bölgesi ortada - pet oraya girerse tavandaki dikenlere uçar.
  // Çözüm: Her pet için ayrı koruma. Ink yetişmez hepsine → önceliklendirme gerek.
  {
    id: 15,
    world: 1,
    name: 'ORMAN PATRONU',
    inkLimit: 700,
    pets: [
      { type: 'punch', x: 150, y: 80 },
      { type: 'jumbo', x: 300, y: 320 },
      { type: 'mini', x: 450, y: 80 },
    ],
    platforms: [
      { x: 300, y: 380, width: 60, height: 16, angle: 0 },
    ],
    portals: [
      { ax: 50, ay: 450, bx: 300, by: 100, color: '#9B59B6' },
      { ax: 550, ay: 450, bx: 300, by: 200, color: '#E74C3C' },
    ],
    trampolines: [
      { x: 150, y: 480, width: 70, force: 0.08 },
      { x: 450, y: 480, width: 70, force: 0.08 },
    ],
    fans: [
      { x: 50, y: 200, width: 50, height: 200, direction: 'right', strength: 0.002 },
      { x: 550, y: 200, width: 50, height: 200, direction: 'left', strength: 0.002 },
    ],
    gravityZones: [
      { x: 300, y: 150, width: 150, height: 100, type: 'reverse' },
    ],
    movingPlatforms: [
      { x1: 150, y1: 300, x2: 450, y2: 300, width: 80, speed: 0.001 },
    ],
    hazards: [
      { type: 'lava', x: 300, y: 530, width: 600, height: 40 },
      { type: 'spikes', x: 300, y: 30, width: 300, height: 20 },
    ],
    spawners: [
      { x: 50, y: 420, count: 5, interval: 1000, delay: 500, speed: 3 },
      { x: 550, y: 420, count: 5, interval: 1000, delay: 700, speed: 3 },
      { x: 300, y: 20, count: 4, interval: 1100, delay: 1000, speed: 3 },
    ],
    safeZone: null,
    surviveTime: 15,
    hints: ['BOSS! Punch ve Mini tramboline dusecek, Jumbo platformda. Ruzgar, portal, ters yercekimi - HER SEY!'],
    stars: { one: 700, two: 420, three: 230 },
  },
];
