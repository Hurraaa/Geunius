# PetDraw Rescue - Game Design Document (GDD)

## 1. OYUN KONSEPTİ

### 1.1 Özet
**PetDraw Rescue**, oyuncunun ekrana çizgi çizerek sevimli hayvanları tehlikelerden (ateş, su, arılar, taşlar vb.) koruduğu fizik tabanlı bir bulmaca oyunudur. Çizilen çizgiler fiziksel nesnelere dönüşür - kalkan, rampa, köprü veya duvar olarak hayvanları kurtarır.

### 1.2 Temel Konsept
- **Tür:** Fizik tabanlı çizim bulmaca oyunu
- **Platform:** Web (HTML5 Canvas) - Mobil uyumlu, dokunmatik destekli
- **Hedef Kitle:** 8+ yaş, casual oyuncular
- **Oyun Süresi:** Bölüm başına 15-45 saniye, toplam 100+ level
- **İlham:** Save the Pets, Happy Glass, Love Balls

### 1.3 Temel Döngü
```
Seviye başlar → Tehlike görünür → Oyuncu çizgi çizer →
Fizik simülasyonu başlar → Hayvan kurtulur/kurtulmaz →
Yıldız puanı → Sonraki seviye
```

---

## 2. OYNANIŞI (GAMEPLAY)

### 2.1 Çizim Mekaniği
- Oyuncu parmağıyla/mouse ile ekrana **serbest çizgi** çizer
- Çizilen çizgi fizik motorunda **katı bir nesneye** dönüşür (yer çekimine tabi)
- Her seviyede **sınırlı mürekkep** var (çizgi uzunluğu sınırlı)
- Çizgi çizildikten sonra "BAŞLAT" butonuna basılır veya otomatik başlar
- Çizgi kalınlığı sabittir (~8px)

### 2.2 Fizik Sistemi
- **Yerçekimi:** Çizilen nesneler ve hayvanlar yerçekiminden etkilenir
- **Çarpışma:** Çizgiler, tehlikeler ve hayvanlar birbirleriyle çarpışır
- **Sürtünme:** Yüzeylerde kayma/tutunma
- **Sıçrama:** Nesneler hafifçe sekebilir

### 2.3 Temel Tehlike Türleri
| Tehlike | Davranış | İlk Görüldüğü Bölüm |
|---------|----------|---------------------|
| 🔥 Ateş | Sabit durur, hayvan dokunursa yanar | Bölüm 1 |
| 💧 Su | Yukarıdan akar/damlar | Bölüm 2 |
| 🐝 Arı | Yatay hareket eder | Bölüm 3 |
| 🪨 Kaya | Yukarıdan düşer | Bölüm 4 |
| ⚡ Lazer | Zamanlı açılır/kapanır | Bölüm 5 |
| 💣 Bomba | Zamanlayıcı ile patlar | Bölüm 6 |
| 🌪️ Rüzgar | Nesneleri iter | Bölüm 7 |
| 🧲 Mıknatıs | Çizgileri çeker | Bölüm 8 |

### 2.3.1 Doğa Olayları ve Devasa Çevresel Tehditler
Tüm haritayı etkileyen devasa felaketler. İleri seviye bölümlerde ve boss fight'larda kullanılır.

| Doğa Olayı | Davranış | Oyuncu Stratejisi |
|-------------|----------|-------------------|
| 🌊 Tsunami / Su Baskını | Su aşağıdan veya yandan aniden yükselir | Petin içine alan ve su yüzeyinde yüzen (buoyancy/kaldırma kuvveti) bir balon/bot çizmek. Şekil su almamalı |
| 🌪️ Kasırga / Kara Delik | Ekrandaki her şeyi içine çeken hortum | Kalkanı yere kancalamak (zemindeki çıkıntılara dolamak), yoksa kalkan da pet de uçar |
| 🫨 Deprem | Zemin şiddetle sarsılır | Ağırlık merkezi iyi ayarlanmış "A çadırı" veya "Piramit" tarzı dengeli yapılar çizmek |
| 🌋 Volkanik Yağmur | Gökyüzünden devasa lav kayaları düşer | Kalkanı çok kalın çizmek gerekir çünkü lav kayaları kalkanı eritir |

### 2.3.2 Akıllı ve Elementel Düşmanlar
Fizik kurallarıyla oynayan, oyuncuyu doğru stratejiyi kurmaya zorlayan düşmanlar.

| Düşman | Davranış | Özel Mekanik |
|--------|----------|--------------|
| 🧊 Buz Yaratıkları (Frostbites) | Kalkana çarptığında dondurur | İlk çarpışmada kalkan cam gibi kırılgan olur. İkinci çarpışmada tuzla buz olur |
| 🟢 Asit / Balçık Canavarları (Slimes) | Çarptıklarında kalkana yapışır | Giderek çoğalıp kalkanın bir tarafına aşırı ağırlık yaparak devirir |
| 🕳️ Kazıcılar (Köstebekler/Solucanlar) | Yerin altından toprağı delerek gelir | Oyuncu peti tamamen (altı dahil) bir kapsül içine almak zorunda |
| 🐜 Karıncalar (İşbirlikçi Zeka) | Birbirlerinin üstüne çıkarak kule kurar | Kalkanın en üstünden aşıp içeri sızarlar, kalkan yeterince yüksek olmalı |
| 🦇 Yarasalar | Karanlık mağara deliğinden sürü halinde çıkar | Mağara/cadılar bayramı temalı bölümlerde kullanılır |
| 🛸 Mini UFO'lar | Peti kaçırmak için çekim gücü/lazer uygular | Kalkan çekim gücünü ve lazerleri engellemelidir |

### 2.3.3 Fiziksel Obje Düşmanlar (Mermi Tabanlı)
Cansız ama etkili tehditler. Kalkanın dayanıklılığını test eder.

| Obje | Davranış | Zorluk |
|------|----------|--------|
| 💣 Top Gülleleri | Kenardan kaleye doğru fırlatılır | Kalkanı çok sert iter, kilitleyecek şekilde çizmek gerekir |
| ☄️ Meteorlar / Ateş Topları | Yukarıdan veya çaprazdan sürekli yağar | Büyük ve sağlam çatı gerekir |
| 🌧️ Asit Yağmuru / Dolu | Bulutlardan damlayan ve pete değince zarar veren damlalar | Şemsiye/çatı tarzı yapı çizmek gerekir |
| 🚀 Güdümlü Füzeler | Pete kilitlenmiş, havada kavis çizerek gelen roketler | Patlama kuvveti kalkanı savurabilir, ağır ve sabit kalkan gerekir |

### 2.4 Hayvan Türleri
| Hayvan | Özellik |
|--------|---------|
| 🐱 Kedi | Standart - normal fizik |
| 🐶 Köpek | Biraz daha ağır |
| 🐹 Hamster | Hafif, kolay savrulur |
| 🐰 Tavşan | Zıplar (küçük bounce) |
| 🐢 Kaplumbağa | Çok ağır, yavaş kayar |
| 🐦 Kuş | Çok hafif, rüzgardan çok etkilenir |

### 2.5 Mürekkep Sistemi
- Her seviyede belirli miktarda **mürekkep** var
- Mürekkep = çizebileceğin toplam çizgi uzunluğu (piksel cinsinden)
- Ekranın üstünde mürekkep çubuğu gösterilir
- Az mürekkep kullanmak → daha fazla yıldız

### 2.6 Yıldız Puanlama (Her Seviye)
- ⭐ 1 Yıldız: Hayvan kurtarıldı
- ⭐⭐ 2 Yıldız: Hayvan kurtarıldı + mürekkebin %50'sinden azı kullanıldı
- ⭐⭐⭐ 3 Yıldız: Hayvan kurtarıldı + mürekkebin %25'inden azı kullanıldı

---

## 3. LEVEL TASARIMI

### 3.1 Bölüm Yapısı (8 Dünya x 12-15 Level)

**Dünya 1: Ev (Levels 1-15)** - Eğitim bölümü
- Tehlike: Sadece ateş
- Hayvan: Kedi
- Amaç: Çizim mekaniğini öğretme
- Level 1: Basit düz çizgi çek, kediyi ateşten koru
- Level 2: Rampa çiz, kedi kayarak güvenli bölgeye gitsin
- Level 3: Çatı çiz, ateş üstüne düşmesin
- Level 5: İlk "zor" level - iki ateş arası köprü

**Dünya 2: Bahçe (Levels 16-30)** - Su tanıtılır
- Tehlike: Ateş + Su
- Hayvan: Kedi + Köpek
- Su yukarıdan akar, şemsiye/çatı çizilmeli

**Dünya 3: Park (Levels 31-45)** - Arılar tanıtılır
- Tehlike: Ateş + Su + Arı
- Hayvan: Hamster eklenir
- Arılar yatay hareket eder, duvar çizilmeli

**Dünya 4: Dağ (Levels 46-60)** - Kayalar tanıtılır
- Tehlike: Kaya + Ateş
- Hayvan: Tavşan eklenir
- Düşen kayalar, sağlam tavan çizilmeli

**Dünya 5: Fabrika (Levels 61-75)** - Lazer tanıtılır
- Tehlike: Lazer + Ateş + Su
- Hayvan: Kaplumbağa eklenir
- Zamanlama önemli, lazer açıkken çizim, kapanınca hareket

**Dünya 6: Laboratuvar (Levels 76-90)** - Bomba tanıtılır
- Tehlike: Bomba + Lazer + Kaya
- Karmaşık bulmacalar, birden fazla çizim gerekir

**Dünya 7: Kasırga Bölgesi (Levels 91-100)** - Rüzgar tanıtılır
- Tehlike: Rüzgar + tüm öncekiler
- Hayvan: Kuş eklenir
- Rüzgar çizgileri ve hayvanları iter

**Dünya 8: Mıknatıs Mağarası (Levels 101-115)** - Mıknatıs tanıtılır
- Tehlike: Mıknatıs + tüm öncekiler
- Çizilen çizgiler mıknatısa doğru çekilir, strateji gerektirir

### 3.2 Level Tasarım Prensipleri
1. **Her level tek bir "aha!" anı** içerir - oyuncu çözümü bulduğunda tatmin olur
2. **Birden fazla çözüm** mümkün - yaratıcılığı ödüllendir
3. **Kademeli zorluk artışı** - her 3 levelde bir zorluk artar, her 5'te bir mini mola
4. **Yeni mekanik tanıtımı** - her dünyada yeni tehlike, önce kolay level ile tanıt
5. **Mürekkep azaltma** - ilerledikçe daha az mürekkep, daha akıllı çözüm

### 3.3 Özel Level Türleri
- **Boss Level:** Her dünyanın son leveli. Birden fazla hayvan, birden fazla tehlike
- **Bonus Level:** 3 yıldızla geçilen her 5 level sonrası açılır. Ekstra zor ama ödüllü
- **Günlük Challenge:** Her gün yeni bir level (ileri aşama için)

### 3.4 Boss Savaşları
Oyunun her 15 bölümde bir (her dünyanın son leveli) devasa ve ekranı kaplayan bir "Boss" düşman gelir. Boss savaşları oyunu "hyper-casual"dan "mid-core" seviyesine taşıyan destansı anlardır.

**Boss Savaş Mekaniği:**
- Boss'lar sadece 10 saniye boyunca saldırmaz - çok aşamalı savaşlardır
- Oyuncu art arda kalkanlar çizmeli
- Savunmadan saldırıya geçiş mekanizması: Boss'un kendi saldırısını ona geri yansıtma

| Dünya | Boss | Saldırı Biçimi | Yenme Stratejisi |
|-------|------|----------------|------------------|
| 1 - Ev | Dev Yangın Canavarı | Ateş topları fırlatır, alevlerle yürür | Alevleri yansıtacak eğimli kalkanlar çizerek ateşi geri gönder |
| 2 - Bahçe | Tsunami Yılanı | Su dalgaları gönderir, selin yükselmesini sağlar | Petin etrafına su geçirmez kapalı yapı çiz, yılanın başına dalga yansıt |
| 3 - Park | Dev Arı Kraliçesi | Arı sürüleri gönderir, zehirli iğne fırlatır | İğneleri geri yansıtacak açılı aynalar çiz |
| 4 - Dağ | Kaya Golemi | Devasa kayalar fırlatır, yere vurarak deprem yaratır | Kayaları rampa ile geri yuvarlat |
| 5 - Fabrika | Mekanik Örümcek | Lazer sıkar, devasa bacaklarıyla kalkanı ezmeye çalışır | Lazeri ayna gibi açılı şekillerle boss'a geri yansıt |
| 6 - Laboratuvar | Deney Canavarı (Slime Boss) | Asit fırlatır, bölünüp çoğalır | Asidi toplamak için havuz çiz, küçük parçaları birbirine çarptır |
| 7 - Kasırga | Fırtına Şeytanı | Hortumlar yaratır, yıldırım düşürür | Yıldırımları çekecek paratoner çiz, hortuma karşı kancalı yapı |
| 8 - Mağara | Mıknatıs Lordu | Çizilen kalkanları kendine çeker, manyetik dalgalar yayar | Mıknatıs gücünü kullanarak boss'un kendi silahını kendine çevir |

**Boss Savaşı Akışı:**
```
Boss belirme animasyonu → Faz 1 (kolay saldırılar) → Oyuncu kalkan çizer →
Boss hasar alır → Faz 2 (yoğun saldırılar) → Oyuncu strateji değiştirir →
Boss hasar alır → Faz 3 (çılgın saldırılar) → Son darbe → Boss yenilir →
Epik zafer animasyonu + Özel ödül
```

### 3.5 Çizim Materyalleri (Kalem Türleri)
Her bölümde aynı siyah çizgiyi çizmek yerine, bölüme göre farklı özelliklerde kalemler verilir. Bu sistem oyuna strateji derinliği katar.

| Kalem Türü | Özellik | Avantaj | Dezavantaj |
|------------|---------|---------|------------|
| ✏️ Normal Kalem | Standart çizgi, orta ağırlık | Dengeli, her duruma uyar | Özel bir yeteneği yok |
| 🪨 Taş Kalem | Çizilen şekil inanılmaz ağır | Düşmanlar asla itemez | Çok kısa çizilebilir (mürekkep çabuk biter) |
| 🔵 Trambolin (Yaylı) Kalem | Çizilen şekil çok esnek | Çarpan düşmanları 2x hızla geri fırlatır | Petin üstüne düşerse onu da fırlatır |
| 🕸️ Örümcek Ağı (Yapışkan) Kalem | Çizilen çizgi değdiği yere yapışır | Peti havaya asabilir, uçurumda tutabilir | Düşmanlar da yapışıp tırmanabilir |
| 🎈 Balon (Helyum) Kalem | Çizdiğin şekil havaya yükselmek ister | Peti gökyüzüne uçurarak yerdeki tehlikelerden kaçır | Kontrol etmesi zor, tavana çarpma riski |
| 🔥 Ateş Kalem | Çizilen çizgi yanar ve düşmanlara hasar verir | Temas eden düşmanları yok eder | Belirli süre sonra kendi kendini de yakar |
| ❄️ Buz Kalem | Çizilen çizgi kaygan yüzey oluşturur | Düşmanları kaydırır | Pet de kayabilir, dikkatli yerleştirmek gerekir |

**Kalem Seçim Mekaniği:**
- Bazı bölümlerde tek kalem verilir (bulmaca odaklı)
- Bazı bölümlerde 2-3 kalem arasından seçim yapılır (strateji odaklı)
- Boss savaşlarında bölüm sırasında kalem değiştirme imkanı

### 3.6 Oyun Modları
Sadece sabit hayvanı korumak bir süre sonra tekdüzeleşir. Farklı modlar oyunu taze tutar.

**Mod 1: Klasik Koruma (Standart)**
- Hayvan sabit durur, tehlikeler gelir, kalkan çiz ve koru
- Ana oyun modu, tüm bölümlerde varsayılan

**Mod 2: Escort (Koruma/Refakat)**
- Pet sabit durmaz! Kaykay, paten veya yürüyerek sağa doğru ilerler
- Oyuncu, pet ilerlerken hızla önüne köprüler, rampalar ve şemsiyeler çizer
- Pet'in bitiş çizgisine sağ salim ulaşması gerekir
- Dünya 3+ bölümlerinde açılır

**Mod 3: Karanlık / Sis Modu**
- Harita zifiri karanlıktır
- Sadece petin ve kovanın/tehlikenin etrafında ufak bir ışık halkası
- Oyuncu tehlikenin nereden geleceğini sese veya ufak parıltılara göre tahmin eder
- Körlemesine kalkan çizmek zorundadır
- Dünya 5+ bölümlerinde açılır

**Mod 4: Çoklu Hedef (Multi-Tasking)**
- Ekranda 2-3 farklı pet vardır ve aralarında tehlikeli engeller bulunur
- Tek bir uzun çizgiyle (parmağı hiç kaldırmadan) hepsini birden koruyacak devasa bir yapı çizmek gerekir
- Dünya 4+ bölümlerinde açılır

**Mod 5: Zamana Karşı (Time Attack)**
- Normal bölümler ama geri sayım var
- Hızlı düşünme ve hızlı çizim gerektirir
- Bonus bölümlerde ve günlük challenge'larda kullanılır

---

## 4. GRAFİK VE GÖRSEL STİL

### 4.1 Sanat Stili
- **Stil:** Flat design, yumuşak köşeler, parlak renkler
- **İlham:** Cut the Rope + Angry Birds casual tarzı
- **Çizim hissi:** El yapımı / doodle (çizilen çizgiler kalem efekti)
- **Çözünürlük:** 1920x1080 referans, responsive ölçekleme

### 4.2 Renk Paleti
```
Ana Renkler:
- Arka plan:    #F5F0E8 (sıcak krem)
- Birincil:     #FF6B6B (mercan kırmızı - tehlikeler)
- İkincil:      #4ECDC4 (turkuaz - güvenli alan)
- Vurgu:        #FFE66D (sarı - yıldızlar/puan)
- Çizgi rengi:  #2C3E50 (koyu lacivert - oyuncu çizgisi)

Dünya Temaları:
- Ev:           #FFE4C4 (bej) + #8B4513 (kahverengi)
- Bahçe:        #90EE90 (açık yeşil) + #228B22 (koyu yeşil)
- Park:         #87CEEB (gökyüzü mavi) + #32CD32 (çimen yeşili)
- Dağ:          #B0C4DE (gri mavi) + #696969 (gri)
- Fabrika:      #C0C0C0 (gümüş) + #FF8C00 (turuncu)
- Laboratuvar:  #E6E6FA (lavanta) + #9370DB (mor)
- Kasırga:      #4682B4 (çelik mavi) + #2F4F4F (koyu gri)
- Mağara:       #1a1a2e (gece mavisi) + #e94560 (neon kırmızı)
```

### 4.3 Karakter Tasarımı
- Hayvanlar **büyük gözlü**, **tatlı**, **basit** tasarım
- 2-3 kare animasyon (idle, mutlu, korkmuş)
- Her hayvanın **boş**, **korkmuş** ve **mutlu** yüz ifadesi var
- Hayvanlar küçük (ekranın ~%8'i boyut)

### 4.4 Animasyonlar
| Animasyon | Kare Sayısı | Açıklama |
|-----------|-------------|----------|
| Hayvan idle | 2 kare | Hafif sallanma/nefes alma |
| Hayvan korkmuş | 2 kare | Titreme, büyük gözler |
| Hayvan mutlu | 3 kare | Zıplama, kalpler |
| Hayvan ölüm | 3 kare | Duman efekti + üzgün yüz |
| Ateş yanma | 3 kare | Titreşen alevler |
| Su akış | 3 kare | Damla animasyonu |
| Arı uçuş | 2 kare | Kanat çırpma |
| Yıldız kazanma | 4 kare | Parlama + büyüme |
| Çizgi çizme | Sürekli | Çizgi arkasından parçacık efekti |

### 4.5 Parçacık Efektleri (Particles)
- Çizgi çizilirken: Küçük parlak noktalar
- Hayvan kurtulunca: Konfeti patlaması
- Ateş: Kıvılcım parçacıkları
- Su: Damla sıçraması
- Yıldız kazanma: Yıldız patlaması

---

## 5. UI / MENÜ TASARIMI

### 5.1 Ekran Akışı
```
[Splash Screen] → [Ana Menü] → [Dünya Seçimi] → [Level Seçimi] → [Oyun Ekranı]
                       ↓              ↕                  ↕              ↓
                  [Ayarlar]     [Geri/İleri]        [Geri/İleri]   [Pause Menü]
                       ↓                                               ↓
                  [Ses/Müzik]                                   [Devam/Çık/Tekrar]
                  [Dil]                                                ↓
                                                              [Seviye Sonu Popup]
                                                                       ↓
                                                              [Sonraki Level / Tekrar]
```

### 5.2 Splash Screen
- Oyun logosu ortada
- Sevimli hayvan animasyonu (kedi el sallıyor)
- "Dokunarak Başla" / "Click to Start" yazısı yanıp söner
- Süre: 2 saniye otomatik veya dokunma ile geç

### 5.3 Ana Menü
```
┌──────────────────────────────┐
│                              │
│      🐾 PetDraw Rescue 🐾    │
│        [Logo/Başlık]         │
│                              │
│     ┌──────────────────┐     │
│     │   ▶ OYNA         │     │
│     └──────────────────┘     │
│     ┌──────────────────┐     │
│     │   ⚙ AYARLAR      │     │
│     └──────────────────┘     │
│     ┌──────────────────┐     │
│     │   🏆 BAŞARIMLAR   │     │
│     └──────────────────┘     │
│                              │
│   🔊 Ses   🎵 Müzik         │
│                              │
│     Toplam ⭐: 234/345       │
│                              │
└──────────────────────────────┘
```

### 5.4 Dünya Seçim Ekranı
```
┌──────────────────────────────┐
│  ← Geri        DÜNYALAR      │
│                              │
│  ┌─────┐ ┌─────┐ ┌─────┐    │
│  │ 🏠  │ │ 🌿  │ │ 🌳  │    │
│  │ Ev  │ │Bahçe│ │Park │    │
│  │⭐42 │ │⭐31 │ │⭐12 │    │
│  └─────┘ └─────┘ └─────┘    │
│  ┌─────┐ ┌─────┐ ┌─────┐    │
│  │ ⛰️  │ │ 🏭  │ │ 🔬  │    │
│  │ Dağ │ │Fabr.│ │ Lab │    │
│  │ 🔒  │ │ 🔒  │ │ 🔒  │    │
│  └─────┘ └─────┘ └─────┘    │
│  ┌─────┐ ┌─────┐            │
│  │ 🌪️  │ │ 🧲  │            │
│  │Kasır│ │Mağar│            │
│  │ 🔒  │ │ 🔒  │            │
│  └─────┘ └─────┘            │
└──────────────────────────────┘
```
- Kilitli dünyalar gri/karanlık
- Açma koşulu: Önceki dünyanın %60'ını yıldızlı geçmek

### 5.5 Level Seçim Ekranı
```
┌──────────────────────────────┐
│  ← Geri    🏠 EV (1-15)      │
│                              │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐    │
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │    │
│  │⭐⭐⭐│ │⭐⭐☆│ │⭐☆☆│ │ 5 │    │
│  └───┘ └───┘ └───┘ └───┘    │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐    │
│  │ 6 │ │ 7 │ │ 8 │ │ 9 │    │
│  │ 🔒 │ │ 🔒 │ │ 🔒 │ │ 🔒 │    │
│  └───┘ └───┘ └───┘ └───┘    │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐    │
│  │10 │ │11 │ │12 │ │13 │    │
│  │ 🔒 │ │ 🔒 │ │ 🔒 │ │ 🔒 │    │
│  └───┘ └───┘ └───┘ └───┘    │
│       ┌───┐ ┌───┐            │
│       │14 │ │15 │            │
│       │ 🔒 │ │🔒⭐│            │
│       └───┘ └───┘            │
└──────────────────────────────┘
```

### 5.6 Oyun Ekranı (In-Game UI)
```
┌──────────────────────────────┐
│ ⏸️  Level 3    🖊️████████░░  │  ← Üst bar: Pause, level no, mürekkep
│                              │
│                              │
│         🔥    🔥             │  ← Tehlikeler
│                              │
│              🐱              │  ← Hayvan
│         ───────────          │  ← Platform
│                              │
│                              │
│     ✅ Güvenli Alan          │  ← Hedef
│                              │
│            [▶ BAŞLAT]        │  ← Başlat butonu
│  [↩️ Geri Al]  [🗑️ Temizle]  │  ← Çizim kontrolleri
└──────────────────────────────┘
```

### 5.7 Seviye Sonu Popup
```
┌────────────────────────┐
│                        │
│    Tebrikler! 🎉       │  → Başarılı
│    ⭐ ⭐ ☆              │  → Yıldız sayısı
│                        │
│  Mürekkep: %35 kaldı   │
│  Süre: 12 saniye       │
│                        │
│  ┌────┐ ┌────┐ ┌────┐ │
│  │ ↩️  │ │ ▶  │ │ 🏠  │ │
│  │Tekr│ │Snrk│ │Menü│ │
│  └────┘ └────┘ └────┘ │
└────────────────────────┘
```

Başarısız durumda:
```
┌────────────────────────┐
│                        │
│    Üzgünüm! 😢         │
│    Hayvan kurtarılamadı │
│                        │
│  İpucu: Üstüne çatı    │
│  çizmeyi dene!         │
│                        │
│  ┌────────┐ ┌────────┐ │
│  │↩️ Tekrar│ │🏠 Menü │ │
│  └────────┘ └────────┘ │
└────────────────────────┘
```

### 5.8 Ayarlar Menüsü
```
┌────────────────────────┐
│  ← Geri    AYARLAR     │
│                        │
│  🔊 Ses Efektleri      │
│  ━━━━━━━●━━━  %70     │
│                        │
│  🎵 Müzik              │
│  ━━━━━━━━━●━  %90     │
│                        │
│  🌐 Dil: Türkçe  ▼    │
│                        │
│  📳 Titreşim: ✅       │
│                        │
│  🗑️ İlerlemeyi Sıfırla │
│                        │
└────────────────────────┘
```

### 5.9 Başarımlar Ekranı
```
┌──────────────────────────────┐
│  ← Geri      BAŞARIMLAR      │
│                              │
│  ✅ İlk Kurtarma            │
│     İlk hayvanını kurtar     │
│                              │
│  ✅ Mürekkep Cimrisi         │
│     Bir leveli %10 mürekkep  │
│     ile bitir                │
│                              │
│  🔒 Tam Yıldız              │
│     Bir dünyayı 3 yıldızla  │
│     tamamla                  │
│                              │
│  🔒 Hız Şeytanı             │
│     5 saniye içinde bitir    │
│                              │
└──────────────────────────────┘
```

---

## 6. SES VE MÜZİK

### 6.1 Müzik
| Ekran | Tarz | Tempo |
|-------|------|-------|
| Ana Menü | Neşeli, hafif ukulele | Yavaş-orta |
| Dünya Seçimi | Keşif hissi, hafif perküsyon | Orta |
| Oyun içi (genel) | Hafif, dikkat dağıtmayan ambient | Yavaş |
| Boss Level | Gerilimli ama eğlenceli | Hızlı |
| Seviye başarılı | Zafer fanfar (kısa, 3sn) | - |
| Seviye başarısız | Üzgün melodisi (kısa, 2sn) | - |

### 6.2 Ses Efektleri
| Aksiyon | Ses |
|---------|-----|
| Çizgi çizme | Yumuşak kalem sesi |
| Çizgi silme | "Whoosh" sesi |
| Başlat butonu | "Pop" sesi |
| Hayvan kurtuldu | Mutlu hayvan sesi + konfeti |
| Hayvan kurtulmadı | Üzgün "aww" sesi |
| Ateşe değme | "Tsss" sesi |
| Suya değme | "Splash" sesi |
| Arı vızıltısı | "Bzzzz" (arı yakınken) |
| Kaya düşme | "Boom" sesi |
| Yıldız kazanma | "Bling" sesi (her yıldız için) |
| Buton tıklama | Yumuşak "click" |
| Level açılma | "Unlock" sesi |

---

## 7. TEKNİK MİMARİ

### 7.1 Teknoloji Seçimi
- **Motor:** Vanilla JavaScript + HTML5 Canvas (hafif, hızlı)
- **Fizik:** Matter.js (2D fizik motoru - yerçekimi, çarpışma)
- **Ses:** Howler.js (çapraz platform ses)
- **Build:** Vite (hızlı geliştirme)
- **Dil:** JavaScript (ES6+)

### 7.2 Proje Yapısı
```
Geunius/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── main.js              # Giriş noktası
│   ├── game/
│   │   ├── Game.js           # Ana oyun sınıfı
│   │   ├── Physics.js        # Matter.js fizik yönetimi
│   │   ├── Drawing.js        # Çizim mekaniği
│   │   ├── PenSystem.js      # Kalem türleri sistemi (Taş, Trambolin, Yapışkan vb.)
│   │   ├── GameModes.js      # Oyun modları (Klasik, Escort, Karanlık, Çoklu Hedef)
│   │   ├── BossManager.js    # Boss savaşı yönetimi (fazlar, hasar, yansıtma)
│   │   ├── EventSystem.js    # Doğa olayları sistemi (tsunami, deprem vb.)
│   │   ├── Level.js          # Level yükleyici
│   │   └── Scoring.js        # Puanlama sistemi
│   ├── entities/
│   │   ├── Pet.js            # Hayvan sınıfı
│   │   ├── Hazard.js         # Tehlike temel sınıfı
│   │   ├── hazards/
│   │   │   ├── Fire.js
│   │   │   ├── Water.js
│   │   │   ├── Bee.js
│   │   │   ├── Rock.js
│   │   │   ├── Laser.js
│   │   │   ├── Bomb.js
│   │   │   ├── Wind.js
│   │   │   └── Magnet.js
│   │   ├── enemies/          # Gelişmiş düşmanlar
│   │   │   ├── FrostBite.js   # Buz yaratığı (dondurma)
│   │   │   ├── Slime.js       # Asit/Balçık (yapışma + ağırlık)
│   │   │   ├── Digger.js      # Kazıcı (yeraltından gelir)
│   │   │   ├── AntSwarm.js    # Karınca sürüsü (kule kurma)
│   │   │   ├── Bat.js         # Yarasa (sürü halinde)
│   │   │   └── UFO.js         # Mini UFO (çekim kuvveti)
│   │   ├── bosses/           # Boss düşmanlar
│   │   │   ├── Boss.js        # Boss temel sınıfı
│   │   │   ├── FireGiant.js   # Yangın Canavarı (Dünya 1)
│   │   │   ├── TsunamiSerpent.js # Tsunami Yılanı (Dünya 2)
│   │   │   ├── BeeQueen.js    # Arı Kraliçesi (Dünya 3)
│   │   │   ├── RockGolem.js   # Kaya Golemi (Dünya 4)
│   │   │   ├── MechSpider.js  # Mekanik Örümcek (Dünya 5)
│   │   │   ├── SlimeBoss.js   # Deney Canavarı (Dünya 6)
│   │   │   ├── StormDevil.js  # Fırtına Şeytanı (Dünya 7)
│   │   │   └── MagnetLord.js  # Mıknatıs Lordu (Dünya 8)
│   │   ├── events/           # Doğa olayları
│   │   │   ├── Tsunami.js
│   │   │   ├── Earthquake.js
│   │   │   ├── VolcanicRain.js
│   │   │   └── Vortex.js      # Kasırga/Kara delik
│   │   └── Platform.js       # Sabit platformlar
│   ├── screens/
│   │   ├── SplashScreen.js
│   │   ├── MainMenu.js
│   │   ├── WorldSelect.js
│   │   ├── LevelSelect.js
│   │   ├── GameScreen.js
│   │   ├── PauseMenu.js
│   │   ├── ResultPopup.js
│   │   ├── SettingsScreen.js
│   │   └── AchievementsScreen.js
│   ├── managers/
│   │   ├── ScreenManager.js   # Ekran geçişleri
│   │   ├── AudioManager.js    # Ses yönetimi
│   │   ├── SaveManager.js     # LocalStorage kayıt
│   │   ├── ParticleManager.js # Parçacık efektleri
│   │   └── InputManager.js    # Dokunma/mouse girdi
│   ├── data/
│   │   ├── levels/
│   │   │   ├── world1.json    # Ev levelleri
│   │   │   ├── world2.json    # Bahçe levelleri
│   │   │   └── ...
│   │   ├── achievements.json
│   │   └── config.json        # Oyun sabitleri
│   ├── utils/
│   │   ├── Canvas.js          # Canvas yardımcıları
│   │   ├── Math.js            # Matematik fonksiyonları
│   │   └── Color.js           # Renk yardımcıları
│   └── assets/
│       ├── images/
│       │   ├── pets/          # Hayvan spriteları
│       │   ├── hazards/       # Tehlike spriteları
│       │   ├── ui/            # Butonlar, ikonlar
│       │   ├── backgrounds/   # Arka planlar
│       │   └── particles/     # Parçacık görselleri
│       └── audio/
│           ├── music/         # Müzikler (mp3/ogg)
│           └── sfx/           # Ses efektleri (mp3/ogg)
└── public/
    └── favicon.ico
```

### 7.3 Level Data Formatı (JSON)

**Standart Level:**
```json
{
  "id": 1,
  "world": 1,
  "name": "İlk Kurtarma",
  "mode": "classic",
  "inkLimit": 500,
  "timeLimit": null,
  "gravity": { "x": 0, "y": 1 },
  "availablePens": ["normal"],
  "pets": [
    { "type": "cat", "x": 400, "y": 200 }
  ],
  "hazards": [
    { "type": "fire", "x": 400, "y": 500, "width": 100 }
  ],
  "enemies": [],
  "events": [],
  "platforms": [
    { "x": 300, "y": 300, "width": 200, "height": 20, "angle": 0 }
  ],
  "safeZone": { "x": 100, "y": 500, "width": 150, "height": 100 },
  "hints": ["Hayvanın üstüne bir çatı çiz!"],
  "stars": {
    "one": 500,
    "two": 300,
    "three": 150
  }
}
```

**Gelişmiş Level (Elementel düşmanlar + Kalem seçimi):**
```json
{
  "id": 45,
  "world": 3,
  "name": "Buz Fırtınası",
  "mode": "classic",
  "inkLimit": 400,
  "timeLimit": null,
  "gravity": { "x": 0, "y": 1 },
  "availablePens": ["stone", "trampoline"],
  "pets": [
    { "type": "hamster", "x": 400, "y": 200 }
  ],
  "hazards": [
    { "type": "fire", "x": 200, "y": 500, "width": 80 }
  ],
  "enemies": [
    { "type": "frostbite", "x": 600, "y": 100, "count": 3, "spawnDelay": 2 },
    { "type": "ant_swarm", "x": 50, "y": 400, "count": 20 }
  ],
  "events": [
    { "type": "earthquake", "startTime": 5, "duration": 3, "intensity": 0.5 }
  ],
  "platforms": [
    { "x": 300, "y": 300, "width": 200, "height": 20, "angle": 0 }
  ],
  "safeZone": { "x": 100, "y": 500, "width": 150, "height": 100 },
  "hints": ["Taş kalem kullan, buz yaratıkları kalkanı kıramaz!"],
  "stars": { "one": 400, "two": 250, "three": 120 }
}
```

**Boss Level:**
```json
{
  "id": 15,
  "world": 1,
  "name": "Dev Yangın Canavarı",
  "mode": "boss",
  "inkLimit": 800,
  "timeLimit": 60,
  "gravity": { "x": 0, "y": 1 },
  "availablePens": ["normal", "stone"],
  "pets": [
    { "type": "cat", "x": 400, "y": 400 }
  ],
  "boss": {
    "type": "fire_giant",
    "phases": 3,
    "hp": 100,
    "attacks": ["fireball", "flame_wave", "stomp"],
    "weaknesses": ["reflect"]
  },
  "platforms": [
    { "x": 200, "y": 450, "width": 400, "height": 20, "angle": 0 }
  ],
  "hints": ["Ateş toplarını eğimli bir kalkanla geri yansıt!"],
  "rewards": { "gold": 500, "unlockPen": "fire" }
}
```

### 7.4 Kayıt Sistemi (LocalStorage)
```json
{
  "petdraw_save": {
    "levels": {
      "1-1": { "completed": true, "stars": 3, "bestInk": 120 },
      "1-2": { "completed": true, "stars": 2, "bestInk": 340 }
    },
    "settings": {
      "sfxVolume": 0.7,
      "musicVolume": 0.9,
      "language": "tr",
      "vibration": true
    },
    "achievements": ["first_rescue", "ink_miser"],
    "totalStars": 234
  }
}
```

### 7.5 Performans Hedefleri
- **FPS:** 60fps sabit (mobilde 30fps minimum)
- **Yükleme:** İlk açılış < 3 saniye
- **Boyut:** Toplam < 5MB (görseller dahil)
- **Hafıza:** < 100MB RAM kullanımı

---

## 8. BAŞARIMLAR SİSTEMİ

| Başarım | Koşul | İkon |
|---------|-------|------|
| İlk Kurtarma | İlk leveli bitir | 🎖️ |
| Mürekkep Cimrisi | %10 mürekkep ile bitir | 🖊️ |
| Yıldız Avcısı | 50 yıldız topla | ⭐ |
| Süper Yıldız | 200 yıldız topla | 🌟 |
| Hız Şeytanı | 5sn içinde bitir | ⚡ |
| Mükemmeliyetçi | Bir dünyayı 3 yıldızla bitir | 👑 |
| Hayvan Dostu | 50 hayvan kurtar | 🐾 |
| Ev Kahramanı | Dünya 1'i tamamla | 🏠 |
| Bahçıvan | Dünya 2'yi tamamla | 🌿 |
| Dağcı | Dünya 4'ü tamamla | ⛰️ |
| Ustalaşma | Tüm levelleri tamamla | 🏆 |
| Tam Puan | Tüm levelleri 3 yıldızla tamamla | 💎 |

---

## 9. İLERİ AŞAMA ÖZELLİKLER (v2.0+)

Bu özellikler ilk versiyonda **olmayacak**, ama ileride eklenebilir:

1. **Level Editörü** - Oyuncular kendi levellerini yapabilsin
2. **Sosyal Paylaşım** - Çözüm videosunu paylaşma
3. **Günlük Challenge** - Her gün yeni level
4. **Kıyafet Sistemi** - Hayvanlara şapka/gözlük giydirme
5. **Tema Paketi** - Noel, Cadılar Bayramı özel levelleri

---

## 10. GELİŞTİRME AŞAMALARI

### Geliştirme Felsefesi: Whiteboxing (Prototip Önce)
> **Altın Kural:** Hiçbir oyun görselle başlamaz. Önce mekanik, sonra görsel.

Tüm geliştirme süreci boyunca **Whiteboxing** yaklaşımı uygulanır:
- Pet = **Yeşil kutu** (düz kare)
- Düşmanlar = **Kırmızı daireler**
- Tehlikeler = **Renkli basit şekiller** (turuncu=ateş, mavi=su, sarı=lazer)
- Platformlar = **Gri dikdörtgenler**
- Güvenli alan = **Yeşil noktalı dikdörtgen**

Oyunun mekaniği (çizgi çizme + yerçekimi + çarpışma) kusursuz çalışana kadar sadece bu renkli kutularla oynanır. Grafikler en son aşamada "kılıf" gibi giydirilir.

**Grafik Kaynakları (Görsele geçildiğinde):**
- **Kenney.nl:** Ücretsiz, telifsiz, ticari kullanıma açık 2D sprite'lar
- **Itch.io:** Bedava 2D karakter ve ortam paketleri
- **AI üretimi:** Yapay zeka ile özel karakter/arka plan üretimi
- **Derpy Art stratejisi:** Bilerek basit ve komik çizimler (Save the Doge tarzı)

### Aşama 0: Prototip (Whiteboxing) ⭐ EN ÖNEMLİ AŞAMA
> Hedef: Oyunun eğlenceli olup olmadığını renkli kutularla test etmek

0.1. Boş HTML5 Canvas projesi oluştur
0.2. Ekrana yeşil bir kutu (Pet) koy ve Rigidbody (fizik) ekle
0.3. Parmak/fare ile serbest çizgi çizme mekaniğini kodla
0.4. Çizilen çizgiyi anında fiziksel nesneye dönüştür (yerçekimi + çarpışma)
0.5. Kırmızı daireler (düşmanlar) ekle, basit hareket ver
0.6. Test et: **Çizgi çizip kutuyu korumak eğlenceli mi?**

```
Prototip başarı kriterleri:
✅ Çizgi parmak kaldırılınca düşüyor
✅ Çizgi pet'in üstüne kalkan oluyor
✅ Kırmızı daireler çizgiye çarpıp sekiyor
✅ Pet düşmana değince "Game Over" oluyor
✅ Oyun 10 saniye boyunca oynandığında tatmin verici
```

### Aşama 1: Çekirdek Motor (Core)
1. Canvas setup + responsive ekran
2. Çizim mekaniği (mouse/touch input → çizgi)
3. Matter.js fizik entegrasyonu (çizgi → fizik nesnesi)
4. Temel hayvan (yeşil kutu) + ateş tehlikesi (turuncu kutu)
5. Güvenli alan algılama
6. Seviye yükleme sistemi
7. Basit kazanma/kaybetme durumu

### Aşama 2: Oynanış Tamamlama
8. Mürekkep sistemi (çizgi sınırı)
9. Yıldız puanlama (1-3 yıldız)
10. Tüm temel tehlike türleri (su, arı, kaya, lazer, bomba, rüzgar, mıknatıs)
11. Tüm hayvan türleri ve fizik farkları
12. İlk 15 level (Dünya 1)
13. Kalem türleri sistemi (Taş, Trambolin, Yapışkan, Balon)

### Aşama 3: Gelişmiş Mekanikler
14. Elementel düşmanlar (Buz, Slime, Kazıcılar, Karıncalar)
15. Doğa olayları sistemi (Tsunami, Deprem, Volkanik yağmur)
16. Boss savaşları sistemi (çok fazlı, yansıtma mekanikleri)
17. Oyun modları (Escort, Karanlık, Çoklu Hedef, Zamana Karşı)
18. Dünya 2-4 levelleri

### Aşama 4: Menü ve UI
19. Splash screen
20. Ana menü
21. Dünya seçim ekranı
22. Level seçim ekranı
23. Oyun içi UI (pause, sonuç popup)
24. Ayarlar ekranı
25. Başarımlar ekranı

### Aşama 5: Parlatma (Polish)
26. Whiteboxing kutularını gerçek grafiklerle değiştir (sprite'lar)
27. Animasyonlar (hayvan, tehlike, UI geçişleri)
28. Parçacık efektleri (konfeti, kıvılcım, su sıçraması)
29. Ses efektleri ve müzik entegrasyonu
30. Başarımlar sistemi
31. Kayıt/yükleme sistemi (LocalStorage)
32. Dünya 5-8 levelleri

### Aşama 6: Test ve Yayın
33. Mobil uyumluluk testi (dokunmatik, responsive)
34. Performans optimizasyonu (60fps hedefi)
35. Bug fixing ve balans ayarları
36. Deploy (GitHub Pages / Netlify / Vercel)
