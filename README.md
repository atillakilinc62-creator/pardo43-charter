# Pardo 43 — Yat Kiralama Web Sitesi

İki dilli (Türkçe / İngilizce), tek sayfa, **tamamen statik** bir tanıtım sitesi.
Build adımı, framework veya bağımlılık yoktur — `index.html`'i çift tıklayıp açabilirsiniz.

## Dosya Yapısı
```
WEBSITEM/
├── index.html          # Tüm bölümler tek sayfada
├── css/style.css       # Tasarım (responsive dahil)
├── js/i18n.js          # TR/EN metinler + dil değiştirme
├── js/main.js          # WhatsApp, menü, galeri, animasyon + AYARLAR
├── assets/img/         # Placeholder görseller (SVG)
├── favicon.svg
└── README.md
```

## 🔧 Yayınlamadan Önce Mutlaka Güncelleyin

### 1) WhatsApp numarası ve telefon
`js/main.js` dosyasının en üstündeki `CONFIG` bölümünü düzenleyin:
```js
var CONFIG = {
  whatsappNumber: "905555555555",   // Ülke kodu dahil, SADECE rakam (+, boşluk, parantez YOK)
  phoneDisplay:   "+90 555 555 55 55",
  phoneHref:      "+905555555555",
  instagram:      "https://instagram.com/KULLANICI_ADINIZ"
};
```
> Örnek: `0555 123 45 67` numarası → `whatsappNumber: "905551234567"`
> Tüm WhatsApp butonları bu tek numarayı kullanır.

### 2) Fotoğraflar
`assets/img/` içindeki placeholder SVG'leri kendi fotoğraflarınızla değiştirin.
En kolay yöntem: kendi görsellerinizi **aynı isimlerle** koymak
(`hero`, `gallery-1` … `gallery-6`). Dosya uzantısı `.jpg`/`.webp` ise,
`index.html` içinde ilgili `src="...svg"` yollarını yeni uzantıyla güncelleyin
(örn. `assets/img/gallery-1.jpg`). `hero` için yol `css/style.css` içindeki
`.hero { background: url(...) }` satırındadır.

### 3) Metinler, özellikler ve fiyatlar
- **Teknik özellikler** ve görünen tüm metinler `js/i18n.js` içindedir
  (`tr` ve `en` blokları). İki dili de güncellemeyi unutmayın.
- Teknik değerler (boy, motor, hız vb.) **örnek/placeholder**'dır —
  kendi teknenizin gerçek bilgileriyle değiştirin.
- Fiyatlar şu an "Talep Üzerine / On Request" olarak ayarlı; sabit fiyat
  göstermek isterseniz `pricing.onrequest` ve kart metinlerini düzenleyin.

### 4) Lokasyon ve harita
- Konum metni: `js/i18n.js` → `contact.location`.
- Harita: `index.html` içindeki `<iframe ... openstreetmap ...>` bağlantısını
  kendi limanınızın konumuyla değiştirin (OpenStreetMap veya Google Maps "Yer
  paylaş → Harita yerleştir" embed kodu).

## 👀 Yerelde Önizleme
- **En basit:** `index.html`'e çift tıklayın.
- **Yerel sunucu (önerilir):** klasörde terminal açıp:
  ```
  python -m http.server 8000
  ```
  Tarayıcıda `http://localhost:8000` adresini açın.

## 🚀 Yayına Alma (Hosting)
Statik olduğu için herhangi bir yere yüklenebilir:
- **Netlify / Vercel / Cloudflare Pages:** klasörü sürükle-bırak ya da Git'e bağla.
- **GitHub Pages:** repoya yükleyip Pages'i `main` dalına açın.
- **Klasik hosting (cPanel/FTP):** tüm dosyaları `public_html` içine kopyalayın.

## ✅ Hızlı Kontrol Listesi
- [ ] `CONFIG` içindeki WhatsApp ve telefon numarası gerçek mi?
- [ ] Fotoğraflar değiştirildi mi?
- [ ] Teknik özellikler doğru mu (TR + EN)?
- [ ] Konum ve harita güncel mi?
- [ ] TR/EN butonu tüm metinleri çeviriyor mu?
- [ ] Mobilde menü, galeri ve WhatsApp butonu çalışıyor mu?

---
Sorun veya geliştirme isteği olursa metinler `i18n.js`, davranışlar `main.js`,
görünüm `style.css` dosyalarındadır.
