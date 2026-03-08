# Bilinen Hatalar ve Düzeltmeler

Bu dosya geliştirme sırasında karşılaşılan hataları ve çözümlerini kaydeder.
Aynı hataların tekrarlanmaması için referans olarak kullanılır.

---

## BUG-001: Çizim gövdesi düşüyor, pet'i eziyor
- **Tarih:** 2026-02-24
- **Versiyon:** v0.1 → v0.2
- **Belirti:** İlk bölümde düşman değmemesine rağmen oyuncu kaybediyor
- **Sebep:** `createDrawnBody()` dinamik (non-static) body oluşturuyordu. Yerçekimi çizilen şekli aşağı çekiyor, pet'in üstüne düşüyor, pet platformdan kayıp ateş tehlikesine düşüyordu.
- **Çözüm:** Compound body'ye `isStatic: true` eklendi. Çizimler artık çizildikleri yerde sabit kalıyor.
- **Dosya:** `src/game/Physics.js` → `createDrawnBody()`
- **Kural:** Çizim gövdeleri HER ZAMAN statik olmalı. Dinamik yapılırsa pet'le etkileşim kaçınılmaz.

## BUG-002: Vite base path GitHub Pages'te 404 veriyor
- **Tarih:** 2026-02-24
- **Versiyon:** v0.1
- **Belirti:** GitHub Pages'te sayfa yükleniyor ama JS çalışmıyor (küçük krem dikdörtgen)
- **Sebep:** `vite.config.js`'te `base: '/Geunius/'` hardcoded idi. Deploy path farklıysa JS dosyası 404 veriyordu.
- **Çözüm:** `base: './'` yapıldı (relative path). Her ortamda çalışır.
- **Dosya:** `vite.config.js`
- **Kural:** Vite base path her zaman `'./'` (relative) olmalı, absolute path kullanma.

## BUG-003: Physics reset bodies dizisini direkt değiştiriyordu
- **Tarih:** 2026-02-24
- **Versiyon:** v0.1 → v0.2
- **Belirti:** Level geçişlerinde fizik engine bozulabiliyor
- **Sebep:** `_loadLevel()` içinde `this.physics.engine.world.bodies = []` ile diziyi direkt değiştiriyordu. Matter.js internal state bozuluyordu.
- **Çözüm:** `Physics.reset()` metodu eklendi, `Composite.allBodies()` ile dolaşıp `World.remove()` ile tek tek siliniyor.
- **Dosya:** `src/game/Physics.js` → `reset()`
- **Kural:** Matter.js internal dizilerini ASLA direkt değiştirme. Her zaman API metodlarını kullan (World.add, World.remove, Composite.*).

## BUG-004: Compound body convex hull pet'e çarpıyor
- **Tarih:** 2026-02-24
- **Versiyon:** v0.4 → v0.5
- **Belirti:** Düşman değmemesine rağmen oyuncu kaybediyor
- **Sebep:** `Body.create({ parts: [...] })` kullanınca Matter.js tüm parçaların convex hull'ünü oluşturuyor. Örneğin "V" çizildiğinde aradaki boşluk da fiziksel gövde oluyordu. Bu görünmez gövde pet'e çarpıyordu.
- **Çözüm:** Compound body KULLANMA. Her segmenti ayrı body olarak world'e ekle. `createDrawnBodies()` artık array döndürüyor.
- **Dosya:** `src/game/Physics.js`, `src/game/Drawing.js`
- **Kural:** Matter.js'te compound body (Body.create parts) KULLANMA. Her zaman ayrı body'ler kullan. Compound body görünmez convex hull oluşturur.

---

## CHANGELOG: v0.7.0 - Punch & Dünya Sistemi
- **Tarih:** 2026-02-24
- **Ana karakter değişti:** Cat/Dog/Hamster/Rabbit → Punch the Monkey (maymun)
- **Oyun adı değişti:** PetDraw Rescue → Save Punch!
- **Dünya sistemi eklendi:** 20 dünya planlandı, her dünyada 15 bölüm
- **Dünya seçim ekranı:** Kartlarla dünya seçimi, yıldız bazlı kilit açma
- **Dünya temaları:** Her dünya farklı renk/arkaplan/mekanik
- **İlk 4 dünya:** Yeşil Orman, Yanardağ, Buz Dağı, Uzay İstasyonu
- **Kayıt sistemi güncellendi:** Dünya bazlı ilerleme (SAVE_KEY v2)
- **Punch'a ithaf:** Hayvanat bahçesinde zorbalanan Punch maymununa ithaf edildi

---

## Genel Kurallar (Tekrarlanmaması Gereken Hatalar)

1. **COMPOUND BODY ASLA KULLANMA** - Body.create({ parts }) convex hull oluşturur. Yay/U/L gibi konkav şekillerde iç kısım görünmez solid olur, düşmanları/pet'i iter. ÇÖZÜM: Her segment ayrı static body olarak ekle. Compound body KULLANMA, constraint KULLANMA.
2. **Vite base path relative olmalı** (`'./'`) - Absolute path deploy sorunlarına yol açar
3. **Matter.js internal state'i direkt değiştirme** - Her zaman API kullan
4. **Collision handler'da return kullan** - Bir pet öldüğünde ikinci kontrol yapma, hemen çık
5. **Module script defer** - `<script type="module">` otomatik defer olur, DOM hazır olur, ekstra DOMContentLoaded gerekmez
6. **Canvas default boyut 300x150** - JS çalışmazsa canvas bu boyutta görünür, bu bir ipucu: JS yüklenmemiş demektir
7. **Çizim = static ayrı segmentler** - Her segment ayrı isStatic:true body. Düşmez, kırılmaz, convex hull yok, ghost collision yok. Çizdiğin yerde kalır. ASLA compound body veya constraint kullanma.
8. **parts[0].collisionFilter hack çalışmaz** - Compound body'nin parent filter'ını değiştirmek TÜM parçaların collision'ını öldürür. Bu yaklaşımı DENEME.
