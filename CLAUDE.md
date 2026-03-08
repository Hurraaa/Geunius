# Geunius - Pet Rescue Game

## Kurallar
- Her iyileştirme ve geliştirmede versiyon numarası (Game.js > VERSION) güncellenmeli
- Versiyon formatı: major.minor.patch (semver)
- Bug fix = patch artır, yeni özellik = minor artır, büyük değişiklik = major artır

## Level Tasarım Kuralları (ANAYASA)
Her bölümde şu kurallar ZORUNLU:

1. **Her objenin fiziksel gerekçesi olmalı** - Bölüme koyduğun her hazard, spawner, fan, portal, platform oyuncunun çizmesi gereken çözümü doğrudan etkilemeli. Dekoratif/gereksiz obje KOYMA.

2. **Fiziksel çözümü comment olarak yaz** - Her level'ın üstüne:
   - Fizik: Neler oluyor (hangi kuvvetler, hangi tehlikeler)
   - Çözüm: Oyuncunun ne çizmesi gerekiyor ve NEDEN

3. **Obje yerleşimi mantıklı olmalı** - Pet'in düşeceği yerde platform/trambolin olmalı. Hazard ulaşılabilir mesafede olmalı (ekranın diğer ucuna koymak gereksiz). Pet'in başlangıç pozisyonu bir platformun üstünde veya tramboline düşecek şekilde olmalı.

4. **Her hazard ulaşılabilir tehdit olmalı** - Ateş/lav/diken sadece pet'in düşebileceği/itilebileceği yerde olmalı. 300px uzakta kimsenin ulaşamayacağı ateş = gereksiz obje.

5. **Spawner pozisyonu çözümü zorlaştırmalı** - Düşmanlar pet'e ulaşabilecek açıdan gelmeli. Çözümün ink limiti ile yapılabilir olmalı.

6. **Ink limiti çözüme uygun** - Bölümün çözümü için yeterli ama savurgan çizime izin vermeyecek miktarda ink ver.
