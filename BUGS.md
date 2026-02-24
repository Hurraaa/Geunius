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

## Genel Kurallar (Tekrarlanmaması Gereken Hatalar)

1. **Compound body KULLANMA** - Convex hull görünmez çarpışma yaratır. Ayrı body'ler kullan
2. **Vite base path relative olmalı** (`'./'`) - Absolute path deploy sorunlarına yol açar
3. **Matter.js internal state'i direkt değiştirme** - Her zaman API kullan
4. **Compound body convex hull'e dikkat** - Parts birleşince parent body büyük convex hull oluşturur, beklenmeyen çarpışmalara yol açabilir
5. **Collision handler'da return kullan** - Bir pet öldüğünde ikinci kontrol yapma, hemen çık
6. **Module script defer** - `<script type="module">` otomatik defer olur, DOM hazır olur, ekstra DOMContentLoaded gerekmez
7. **Canvas default boyut 300x150** - JS çalışmazsa canvas bu boyutta görünür, bu bir ipucu: JS yüklenmemiş demektir
8. **Çizim statik yapma** - Kullanıcı dinamik fiziği tercih ediyor, statik çizim oyunu sıkıcı yapar. Bunun yerine: density artır, segment overlap artır, engine iteration artır
9. **Tunneling düzeltmesi** - Düşman çizimden geçiyorsa: positionIterations/velocityIterations artır, segment overlap (len+6), kalın çizgi (10px), yüksek density (0.01)
