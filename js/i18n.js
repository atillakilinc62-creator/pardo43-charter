/* =========================================================
   i18n — Türkçe / English metin sözlüğü ve dil değiştirme
   Kullanım: HTML'de data-i18n="anahtar"
   Dil seçimi localStorage'da "pardo_lang" altında saklanır.
   ========================================================= */
(function () {
  "use strict";

  var STORAGE_KEY = "pardo_lang";
  var DEFAULT_LANG = "tr";

  var I18N = {
    tr: {
      "meta.title": "Pardo 43 — Lüks Yat Kiralama",
      "meta.desc": "Pardo 43 ile unutulmaz bir deniz deneyimi. Rezervasyon için WhatsApp'tan ulaşın.",

      "nav.boat": "Tekne",
      "nav.gallery": "Galeri",
      "nav.specs": "Özellikler",
      "nav.pricing": "Fiyatlar",
      "nav.contact": "İletişim",
      "nav.reserve": "Rezervasyon",

      "hero.eyebrow": "LÜKS YAT KİRALAMA",
      "hero.title": "Pardo 43 ile Eşsiz Bir Deniz Deneyimi",
      "hero.subtitle": "İtalyan tasarımı, zarif hatları ve geniş güvertesiyle Pardo 43; mavi yolculuklar, gün batımı turları ve özel günler için sizi bekliyor.",
      "hero.cta1": "WhatsApp'tan Rezervasyon",
      "hero.cta2": "Tekneyi Keşfet",

      "about.tag": "TEKNE",
      "about.title": "Pardo 43",
      "about.lead": "Pardo 43, Cantiere del Pardo imzasını taşıyan, walkaround konseptiyle öne çıkan bir lüks day-cruiser. Sportif performansı konforla birleştirir.",
      "about.p1": "Geniş kıç güvertesi, kapalı salonu ve alt kattaki kabinleriyle hem gün boyu denizin tadını çıkarmak hem de konaklamak için idealdir. Sessiz seyir, ferah yaşam alanları ve şık iç tasarım ön plandadır.",
      "about.badge1": "Gündüz Misafir",
      "about.badge2": "Maksimum Hız",
      "about.badge3": "Kabin",
      "about.badge4": "Profesyonel Kaptan",

      "gallery.tag": "GALERİ",
      "gallery.title": "Fotoğraf Galerisi",
      "gallery.subtitle": "Tekneden kareler. Görsele tıklayarak büyütebilirsiniz.",
      "gallery.cap1": "Genel Görünüm",
      "gallery.cap2": "Güverte",
      "gallery.cap3": "İç Mekan",
      "gallery.cap4": "Kabin",
      "gallery.cap5": "Güneşlenme Alanı",
      "gallery.cap6": "Denizde",

      "specs.tag": "TEKNİK",
      "specs.title": "Teknik Özellikler",
      "specs.subtitle": "Aşağıdaki değerler örnek amaçlıdır; lütfen kendi teknenizin bilgileriyle güncelleyin.",
      "specs.brand": "Marka / Model",
      "specs.loa": "Boy (LOA)",
      "specs.beam": "En (Beam)",
      "specs.engine": "Motorlar",
      "specs.topspeed": "Maksimum Hız",
      "specs.topspeed.v": "~38 knot",
      "specs.cruise": "Seyir Hızı",
      "specs.cruise.v": "~28 knot",
      "specs.fuel": "Yakıt Kapasitesi",
      "specs.cabins": "Kabin",
      "specs.berths": "Yatak",
      "specs.daycap": "Gündüz Kapasitesi",
      "specs.daycap.v": "12 kişi",
      "specs.year": "Yıl",
      "specs.flag": "Bayrak / Liman",

      "features.tag": "DAHİL OLANLAR",
      "features.title": "Kiralamaya Dahil",
      "features.f1.t": "Profesyonel Kaptan",
      "features.f1.d": "Deneyimli kaptanımız tüm gün sizinle.",
      "features.f2.t": "Yakıt (anlaşmaya göre)",
      "features.f2.d": "Rota ve süreye göre yakıt seçenekleri.",
      "features.f3.t": "Güvenlik Ekipmanı",
      "features.f3.d": "Can yelekleri ve tam güvenlik donanımı.",
      "features.f4.t": "Müzik & Ses Sistemi",
      "features.f4.d": "Bluetooth bağlantılı premium ses sistemi.",
      "features.f5.t": "Yüzme & Şnorkel",
      "features.f5.d": "Denize girmek için ekipman ve merdiven.",
      "features.f6.t": "Soğuk İçecek & Buz",
      "features.f6.d": "Buzdolabı ve soğutucu standart.",

      "pricing.tag": "FİYATLAR",
      "pricing.title": "Kiralama Seçenekleri",
      "pricing.subtitle": "Net fiyat için tarih ve kişi sayısıyla bize WhatsApp'tan yazın.",
      "pricing.onrequest": "Talep Üzerine",
      "pricing.popular": "En Popüler",
      "pricing.cta": "Teklif Al",
      "pricing.note": "* Fiyatlar sezona, rotaya ve süreye göre değişir. Kesin teklif için lütfen iletişime geçin.",
      "pricing.c1.t": "Gün Batımı Turu",
      "pricing.c1.per": "~3 saat",
      "pricing.c1.l1": "Akşam saatleri",
      "pricing.c1.l2": "Kaptan dahil",
      "pricing.c1.l3": "Romantik rota",
      "pricing.c2.t": "Günlük Tur",
      "pricing.c2.per": "~8 saat / gün",
      "pricing.c2.l1": "Tam gün deniz keyfi",
      "pricing.c2.l2": "Koylarda yüzme molası",
      "pricing.c2.l3": "Kaptan & güvenlik dahil",
      "pricing.c3.t": "Haftalık Kiralama",
      "pricing.c3.per": "3+ gün",
      "pricing.c3.l1": "Mavi yolculuk planı",
      "pricing.c3.l2": "Esnek rota",
      "pricing.c3.l3": "Özel fiyat avantajı",

      "contact.tag": "İLETİŞİM",
      "contact.title": "Rezervasyon & İletişim",
      "contact.lead": "Müsaitlik ve fiyat için en hızlı yol WhatsApp. Tarihinizi ve kişi sayınızı yazın, hemen dönüş yapalım.",
      "contact.waBtn": "WhatsApp'tan Yazın",
      "contact.phoneLabel": "Telefon",
      "contact.locationLabel": "Lokasyon",
      "contact.location": "Bodrum / Göcek, Türkiye",
      "contact.hoursLabel": "Saatler",
      "contact.hours": "Her gün 08:00 – 22:00",

      "footer.tagline": "Lüks yat kiralama — unutulmaz deniz anıları.",
      "footer.top": "Başa Dön",
      "footer.rights": "© 2026 Pardo 43 Charter. Tüm hakları saklıdır.",

      "wa.message": "Merhaba, Pardo 43 kiralama hakkında bilgi almak istiyorum."
    },

    en: {
      "meta.title": "Pardo 43 — Luxury Yacht Charter",
      "meta.desc": "An unforgettable day at sea aboard the Pardo 43. Contact us on WhatsApp to book.",

      "nav.boat": "The Boat",
      "nav.gallery": "Gallery",
      "nav.specs": "Specs",
      "nav.pricing": "Pricing",
      "nav.contact": "Contact",
      "nav.reserve": "Book Now",

      "hero.eyebrow": "LUXURY YACHT CHARTER",
      "hero.title": "An Unforgettable Sea Experience aboard the Pardo 43",
      "hero.subtitle": "With Italian design, elegant lines and a spacious deck, the Pardo 43 awaits you for blue cruises, sunset tours and special occasions.",
      "hero.cta1": "Book via WhatsApp",
      "hero.cta2": "Explore the Boat",

      "about.tag": "THE BOAT",
      "about.title": "Pardo 43",
      "about.lead": "The Pardo 43 is a luxury day-cruiser by Cantiere del Pardo, standing out with its walkaround concept. It blends sporty performance with comfort.",
      "about.p1": "With its generous aft deck, enclosed saloon and lower-deck cabins, it is ideal both for enjoying the sea all day and for overnight stays. Quiet cruising, airy living spaces and a refined interior take centre stage.",
      "about.badge1": "Day Guests",
      "about.badge2": "Top Speed",
      "about.badge3": "Cabins",
      "about.badge4": "Professional Captain",

      "gallery.tag": "GALLERY",
      "gallery.title": "Photo Gallery",
      "gallery.subtitle": "Shots from the boat. Click an image to enlarge.",
      "gallery.cap1": "Exterior",
      "gallery.cap2": "Deck",
      "gallery.cap3": "Interior",
      "gallery.cap4": "Cabin",
      "gallery.cap5": "Sunbed Area",
      "gallery.cap6": "At Sea",

      "specs.tag": "SPECS",
      "specs.title": "Technical Specifications",
      "specs.subtitle": "The values below are placeholders; please update them with your own boat's details.",
      "specs.brand": "Brand / Model",
      "specs.loa": "Length (LOA)",
      "specs.beam": "Beam",
      "specs.engine": "Engines",
      "specs.topspeed": "Top Speed",
      "specs.topspeed.v": "~38 knots",
      "specs.cruise": "Cruising Speed",
      "specs.cruise.v": "~28 knots",
      "specs.fuel": "Fuel Capacity",
      "specs.cabins": "Cabins",
      "specs.berths": "Berths",
      "specs.daycap": "Day Capacity",
      "specs.daycap.v": "12 persons",
      "specs.year": "Year",
      "specs.flag": "Flag / Port",

      "features.tag": "WHAT'S INCLUDED",
      "features.title": "Included in Your Charter",
      "features.f1.t": "Professional Captain",
      "features.f1.d": "Our experienced captain is with you all day.",
      "features.f2.t": "Fuel (as agreed)",
      "features.f2.d": "Fuel options based on route and duration.",
      "features.f3.t": "Safety Equipment",
      "features.f3.d": "Life jackets and full safety gear.",
      "features.f4.t": "Music & Sound System",
      "features.f4.d": "Premium sound system with Bluetooth.",
      "features.f5.t": "Swim & Snorkel",
      "features.f5.d": "Gear and ladder for swimming.",
      "features.f6.t": "Cold Drinks & Ice",
      "features.f6.d": "Fridge and cooler as standard.",

      "pricing.tag": "PRICING",
      "pricing.title": "Charter Options",
      "pricing.subtitle": "For an exact price, message us on WhatsApp with your date and number of guests.",
      "pricing.onrequest": "On Request",
      "pricing.popular": "Most Popular",
      "pricing.cta": "Get a Quote",
      "pricing.note": "* Prices vary by season, route and duration. Please contact us for an exact quote.",
      "pricing.c1.t": "Sunset Cruise",
      "pricing.c1.per": "~3 hours",
      "pricing.c1.l1": "Evening hours",
      "pricing.c1.l2": "Captain included",
      "pricing.c1.l3": "Romantic route",
      "pricing.c2.t": "Day Charter",
      "pricing.c2.per": "~8 hours / day",
      "pricing.c2.l1": "Full day at sea",
      "pricing.c2.l2": "Swim stops in bays",
      "pricing.c2.l3": "Captain & safety included",
      "pricing.c3.t": "Weekly Charter",
      "pricing.c3.per": "3+ days",
      "pricing.c3.l1": "Blue cruise itinerary",
      "pricing.c3.l2": "Flexible route",
      "pricing.c3.l3": "Special rate advantage",

      "contact.tag": "CONTACT",
      "contact.title": "Booking & Contact",
      "contact.lead": "The fastest way to check availability and pricing is WhatsApp. Send us your date and number of guests and we'll get right back to you.",
      "contact.waBtn": "Message on WhatsApp",
      "contact.phoneLabel": "Phone",
      "contact.locationLabel": "Location",
      "contact.location": "Bodrum / Göcek, Türkiye",
      "contact.hoursLabel": "Hours",
      "contact.hours": "Daily 8:00 – 22:00",

      "footer.tagline": "Luxury yacht charter — unforgettable memories at sea.",
      "footer.top": "Back to Top",
      "footer.rights": "© 2026 Pardo 43 Charter. All rights reserved.",

      "wa.message": "Hello, I'd like to get information about chartering the Pardo 43."
    }
  };

  function getStoredLang() {
    var saved;
    try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { saved = null; }
    return (saved === "tr" || saved === "en") ? saved : DEFAULT_LANG;
  }

  function t(key) {
    var dict = I18N[current] || I18N[DEFAULT_LANG];
    return dict[key];
  }

  var current = getStoredLang();

  function apply(lang) {
    if (lang !== "tr" && lang !== "en") lang = DEFAULT_LANG;
    current = lang;
    var dict = I18N[lang];

    document.documentElement.lang = lang;

    // Tüm data-i18n elemanlarını çevir
    var nodes = document.querySelectorAll("[data-i18n]");
    nodes.forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // Sayfa başlığı ve açıklaması
    if (dict["meta.title"]) document.title = dict["meta.title"];
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && dict["meta.desc"]) metaDesc.setAttribute("content", dict["meta.desc"]);

    // Dil butonu karşı dili gösterir
    var toggle = document.getElementById("langToggle");
    if (toggle) {
      toggle.textContent = (lang === "tr") ? "EN" : "TR";
      toggle.setAttribute("aria-label", (lang === "tr") ? "Switch to English" : "Türkçe'ye geç");
    }

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}

    // Diğer scriptlere haber ver (WhatsApp mesajı vb.)
    document.dispatchEvent(new CustomEvent("langchange", { detail: { lang: lang } }));
  }

  function toggleLang() { apply(current === "tr" ? "en" : "tr"); }

  // Dışa açılan API
  window.PardoI18n = {
    apply: apply,
    toggle: toggleLang,
    t: t,
    get current() { return current; }
  };

  // Başlangıç
  document.addEventListener("DOMContentLoaded", function () {
    apply(current);
    var toggle = document.getElementById("langToggle");
    if (toggle) toggle.addEventListener("click", toggleLang);
  });
})();
