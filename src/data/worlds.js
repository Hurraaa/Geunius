/**
 * 20 Dünya tanımları - her dünya kendi teması, mekaniği ve renkleriyle.
 * Dünya 21+ karma mekanikler olacak.
 *
 * Her dünya 15 bölüm içerir:
 *   1-5:  Temel mekanikler tanıtım
 *   6-10: Mekanik kombinasyonları
 *   11-14: Zor bölümler
 *   15: BOSS seviyesi
 */
export const WORLDS = [
  // ═══════════════════════════════════════════════════════
  // DÜNYA 1: YEŞİL ORMAN - Eğitim
  // ═══════════════════════════════════════════════════════
  {
    id: 1,
    name: 'Yeşil Orman',
    subtitle: 'Punch\'ın Macerası Başlıyor!',
    icon: '🌳',
    bgColor: '#F5F0E8',
    bgGradient: ['#E8F5E9', '#F5F0E8'],
    platformColor: '#8D6E63',
    accentColor: '#4CAF50',
    description: 'Temel çizim ve koruma mekanikleri',
    mechanics: ['Çizim', 'Ateş', 'Düşman'],
    unlockRequirement: 0, // İlk dünya, hep açık
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 2: YANARDAĞ - Lav ve Ateş
  // ═══════════════════════════════════════════════════════
  {
    id: 2,
    name: 'Yanardağ',
    subtitle: 'Lavların Arasında',
    icon: '🌋',
    bgColor: '#3E2723',
    bgGradient: ['#4E342E', '#BF360C'],
    platformColor: '#6D4C41',
    accentColor: '#FF5722',
    description: 'Lav, ateş ve hareketli platformlar',
    mechanics: ['Lav', 'Hareketli Platform', 'Hızlı Düşman'],
    unlockRequirement: 8, // 8 yıldız gerekli
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 3: BUZ DAĞI - Buz ve Rüzgar
  // ═══════════════════════════════════════════════════════
  {
    id: 3,
    name: 'Buz Dağı',
    subtitle: 'Dondurucu Rüzgarlar',
    icon: '🏔️',
    bgColor: '#E3F2FD',
    bgGradient: ['#BBDEFB', '#E1F5FE'],
    platformColor: '#90CAF9',
    accentColor: '#2196F3',
    description: 'Rüzgar, kaygan zemin ve buz tehlikeleri',
    mechanics: ['Rüzgar', 'Kaygan Zemin', 'Buz'],
    unlockRequirement: 20,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 4: UZAY İSTASYONU - Yerçekimsiz
  // ═══════════════════════════════════════════════════════
  {
    id: 4,
    name: 'Uzay İstasyonu',
    subtitle: 'Yerçekimi Sıfır!',
    icon: '🚀',
    bgColor: '#1A1A2E',
    bgGradient: ['#16213E', '#0F3460'],
    platformColor: '#546E7A',
    accentColor: '#7C4DFF',
    description: 'Sıfır yerçekimi ve portal mekaniği',
    mechanics: ['Sıfır Yerçekimi', 'Portal', 'Ters Yerçekimi'],
    unlockRequirement: 35,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 5: DERİN DENİZ - Su Akıntıları
  // ═══════════════════════════════════════════════════════
  {
    id: 5,
    name: 'Derin Deniz',
    subtitle: 'Dalgaların Altında',
    icon: '🌊',
    bgColor: '#0D47A1',
    bgGradient: ['#1565C0', '#0D47A1'],
    platformColor: '#4FC3F7',
    accentColor: '#00BCD4',
    description: 'Akıntılar ve derin su tehlikeleri',
    mechanics: ['Akıntı', 'Kabarcık', 'Derin Su'],
    unlockRequirement: 50,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 6: FABRİKA - Makineler
  // ═══════════════════════════════════════════════════════
  {
    id: 6,
    name: 'Fabrika',
    subtitle: 'Çarkların Arasında',
    icon: '⚙️',
    bgColor: '#37474F',
    bgGradient: ['#455A64', '#263238'],
    platformColor: '#78909C',
    accentColor: '#FFC107',
    description: 'Hareketli platformlar ve mekanik tuzaklar',
    mechanics: ['Konveyör', 'Piston', 'Dişli'],
    unlockRequirement: 65,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 7: PORTAL BOYUTU - Teleportasyon
  // ═══════════════════════════════════════════════════════
  {
    id: 7,
    name: 'Portal Boyutu',
    subtitle: 'Boyutlar Arası Yolculuk',
    icon: '🌀',
    bgColor: '#4A148C',
    bgGradient: ['#6A1B9A', '#4A148C'],
    platformColor: '#CE93D8',
    accentColor: '#E040FB',
    description: 'Çoklu portal zinciri ve teleportasyon bulmacaları',
    mechanics: ['Çoklu Portal', 'Portal Zinciri', 'Boyut Geçidi'],
    unlockRequirement: 80,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 8: RÜZGAR VADİSİ - Hava Akımları
  // ═══════════════════════════════════════════════════════
  {
    id: 8,
    name: 'Rüzgar Vadisi',
    subtitle: 'Fırtınanın Gözü',
    icon: '🌪️',
    bgColor: '#E0E0E0',
    bgGradient: ['#F5F5F5', '#CFD8DC'],
    platformColor: '#90A4AE',
    accentColor: '#607D8B',
    description: 'Güçlü rüzgarlar ve hava tünelleri',
    mechanics: ['Güçlü Rüzgar', 'Kasırga', 'Hava Tüneli'],
    unlockRequirement: 95,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 9: KARANLIK MAĞARA - Sınırlı Görüş
  // ═══════════════════════════════════════════════════════
  {
    id: 9,
    name: 'Karanlık Mağara',
    subtitle: 'Gölgelerin İçinde',
    icon: '🦇',
    bgColor: '#1B1B1B',
    bgGradient: ['#212121', '#0D0D0D'],
    platformColor: '#424242',
    accentColor: '#FF9800',
    description: 'Karanlıkta hayatta kal',
    mechanics: ['Karanlık', 'Yarasa', 'Işık'],
    unlockRequirement: 110,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 10: BULUT KRALLIĞI - Gökyüzü
  // ═══════════════════════════════════════════════════════
  {
    id: 10,
    name: 'Bulut Krallığı',
    subtitle: 'Gökyüzünün Üstünde',
    icon: '☁️',
    bgColor: '#E3F2FD',
    bgGradient: ['#BBDEFB', '#E1F5FE'],
    platformColor: '#FFFFFF',
    accentColor: '#03A9F4',
    description: 'Trambolinler ve zıplayan bulutlar',
    mechanics: ['Trambolin', 'Bulut', 'Yükseklik'],
    unlockRequirement: 125,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 11: ELEKTRİK ŞEHRİ - Zamanlama
  // ═══════════════════════════════════════════════════════
  {
    id: 11,
    name: 'Elektrik Şehri',
    subtitle: 'Voltajın Dansı',
    icon: '⚡',
    bgColor: '#212121',
    bgGradient: ['#1A1A1A', '#2E2E2E'],
    platformColor: '#616161',
    accentColor: '#FFEB3B',
    description: 'Zamanlamalı elektrik tuzakları',
    mechanics: ['Elektrik', 'Zamanlama', 'Açma/Kapama'],
    unlockRequirement: 140,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 12: MANYETİK VADİ - Çekim Kuvveti
  // ═══════════════════════════════════════════════════════
  {
    id: 12,
    name: 'Manyetik Vadi',
    subtitle: 'Çekim ve İtme',
    icon: '🧲',
    bgColor: '#E8EAF6',
    bgGradient: ['#C5CAE9', '#E8EAF6'],
    platformColor: '#7986CB',
    accentColor: '#3F51B5',
    description: 'Manyetik çekim ve itme kuvvetleri',
    mechanics: ['Mıknatıs', 'Çekim Alanı', 'İtme Alanı'],
    unlockRequirement: 155,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 13: ZAMAN TÜNELİ - Hız Değişimi
  // ═══════════════════════════════════════════════════════
  {
    id: 13,
    name: 'Zaman Tüneli',
    subtitle: 'Zamanın Ötesinde',
    icon: '⏳',
    bgColor: '#3E2723',
    bgGradient: ['#4E342E', '#1B0000'],
    platformColor: '#8D6E63',
    accentColor: '#FFD54F',
    description: 'Hız bölgeleri ve zaman manipülasyonu',
    mechanics: ['Yavaşlama', 'Hızlanma', 'Durdurma'],
    unlockRequirement: 170,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 14: TROPİKAL ORMAN - Yoğun Bitki
  // ═══════════════════════════════════════════════════════
  {
    id: 14,
    name: 'Tropikal Orman',
    subtitle: 'Vahşi Doğanın İçinde',
    icon: '🌴',
    bgColor: '#1B5E20',
    bgGradient: ['#2E7D32', '#1B5E20'],
    platformColor: '#795548',
    accentColor: '#76FF03',
    description: 'Yoğun bitki örtüsü ve sarmaşıklar',
    mechanics: ['Sarmaşık', 'Yoğun Bitki', 'Zehir'],
    unlockRequirement: 185,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 15: KUM FIRTINASI - Çöl
  // ═══════════════════════════════════════════════════════
  {
    id: 15,
    name: 'Kum Fırtınası',
    subtitle: 'Çölün Ortasında',
    icon: '🏜️',
    bgColor: '#FFF8E1',
    bgGradient: ['#FFECB3', '#FFE082'],
    platformColor: '#D7CCC8',
    accentColor: '#FF8F00',
    description: 'Kum fırtınaları ve batan kumlar',
    mechanics: ['Kum', 'Batan Kum', 'Fırtına'],
    unlockRequirement: 200,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 16: NEON ŞEHİR - Cyberpunk
  // ═══════════════════════════════════════════════════════
  {
    id: 16,
    name: 'Neon Şehir',
    subtitle: 'Işıkların Dansı',
    icon: '🌃',
    bgColor: '#0D0D0D',
    bgGradient: ['#1A0A2E', '#0D0D0D'],
    platformColor: '#333',
    accentColor: '#FF00FF',
    description: 'Neon ışıklar ve elektronik tuzaklar',
    mechanics: ['Lazer', 'Neon', 'Elektronik'],
    unlockRequirement: 215,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 17: ŞEKER DİYARI - Tatlı Dünya
  // ═══════════════════════════════════════════════════════
  {
    id: 17,
    name: 'Şeker Diyarı',
    subtitle: 'Tatlı ama Tehlikeli',
    icon: '🍭',
    bgColor: '#FCE4EC',
    bgGradient: ['#F8BBD0', '#FCE4EC'],
    platformColor: '#F48FB1',
    accentColor: '#E91E63',
    description: 'Yapışkan zeminler ve zıplayan şekerler',
    mechanics: ['Yapışkan', 'Zıplayan', 'Eriyen'],
    unlockRequirement: 230,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 18: HAYALET KÖYÜ - Korku
  // ═══════════════════════════════════════════════════════
  {
    id: 18,
    name: 'Hayalet Köyü',
    subtitle: 'Perili Labirent',
    icon: '👻',
    bgColor: '#263238',
    bgGradient: ['#37474F', '#1B262C'],
    platformColor: '#455A64',
    accentColor: '#B2FF59',
    description: 'Görünmez düşmanlar ve geçirgen duvarlar',
    mechanics: ['Hayalet', 'Görünmezlik', 'Geçirgen'],
    unlockRequirement: 245,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 19: ANTİK TAPINAK - Bulmaca
  // ═══════════════════════════════════════════════════════
  {
    id: 19,
    name: 'Antik Tapınak',
    subtitle: 'Kadim Tuzaklar',
    icon: '🏛️',
    bgColor: '#FFF3E0',
    bgGradient: ['#FFE0B2', '#FFCC80'],
    platformColor: '#A1887F',
    accentColor: '#FF6F00',
    description: 'Antik tuzaklar ve bulmaca mekaniği',
    mechanics: ['Tuzak', 'Bulmaca', 'Basınç Plakası'],
    unlockRequirement: 260,
  },

  // ═══════════════════════════════════════════════════════
  // DÜNYA 20: KAOS BOYUTU - Son Savaş
  // ═══════════════════════════════════════════════════════
  {
    id: 20,
    name: 'Kaos Boyutu',
    subtitle: 'Her Şey Var!',
    icon: '💥',
    bgColor: '#1A1A1A',
    bgGradient: ['#2C003E', '#1A1A1A'],
    platformColor: '#666',
    accentColor: '#FF1744',
    description: 'Tüm mekanikler, maksimum zorluk',
    mechanics: ['HER ŞEY', 'Kaos', 'Son Boss'],
    unlockRequirement: 275,
  },
];

/**
 * Total star count to check unlock
 */
export function getTotalStars(progress) {
  let total = 0;
  if (!progress || !progress.worlds) return 0;
  for (const w of Object.values(progress.worlds)) {
    if (w.stars) {
      for (const s of Object.values(w.stars)) {
        total += s;
      }
    }
  }
  return total;
}

/**
 * Check if a world is unlocked
 */
export function isWorldUnlocked(worldIndex, progress) {
  if (worldIndex === 0) return true;
  const totalStars = getTotalStars(progress);
  return totalStars >= WORLDS[worldIndex].unlockRequirement;
}
