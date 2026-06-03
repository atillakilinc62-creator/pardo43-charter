/* =========================================================
   main.js — Etkileşimler
   • WhatsApp / telefon / Instagram bağlantıları (tek yerden ayar)
   • Sabit header, mobil hamburger menü
   • Galeri lightbox
   • Scroll ile beliren animasyon
   ========================================================= */
(function () {
  "use strict";

  /* -----------------------------------------------------------
     AYARLAR — Buradaki bilgileri kendinizinkiyle değiştirin.
     whatsappNumber: ülke kodu dahil, SADECE rakam (+, boşluk, ( ) yok)
     Örn. Türkiye 0555 123 45 67  ->  "905551234567"
     ----------------------------------------------------------- */
  var CONFIG = {
    whatsappNumber: "905555555555",
    phoneDisplay:   "+90 555 555 55 55",
    phoneHref:      "+905555555555",
    instagram:      "https://instagram.com/"
  };

  document.addEventListener("DOMContentLoaded", function () {
    setupContactLinks();
    setupHeader();
    setupMenu();
    setupLightbox();
    setupReveal();
  });

  /* ---------- İletişim bağlantıları ---------- */
  function buildWhatsAppLink() {
    var msg = (window.PardoI18n && window.PardoI18n.t("wa.message")) || "";
    return "https://wa.me/" + CONFIG.whatsappNumber + "?text=" + encodeURIComponent(msg);
  }

  function setupContactLinks() {
    refreshWhatsApp();

    document.querySelectorAll(".js-phone").forEach(function (a) {
      a.setAttribute("href", "tel:" + CONFIG.phoneHref);
      a.textContent = CONFIG.phoneDisplay;
    });
    document.querySelectorAll(".js-instagram").forEach(function (a) {
      a.setAttribute("href", CONFIG.instagram);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });

    // Dil değişince WhatsApp mesajı da güncellensin
    document.addEventListener("langchange", refreshWhatsApp);
  }

  function refreshWhatsApp() {
    var link = buildWhatsAppLink();
    document.querySelectorAll(".js-whatsapp").forEach(function (a) {
      a.setAttribute("href", link);
      a.setAttribute("target", "_blank");
      a.setAttribute("rel", "noopener");
    });
  }

  /* ---------- Sabit header gölgesi ---------- */
  function setupHeader() {
    var header = document.getElementById("siteHeader");
    if (!header) return;
    var onScroll = function () {
      header.classList.toggle("scrolled", window.scrollY > 30);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /* ---------- Mobil menü ---------- */
  function setupMenu() {
    var btn = document.getElementById("hamburger");
    var links = document.getElementById("navLinks");
    if (!btn || !links) return;

    function close() {
      links.classList.remove("open");
      btn.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    }

    btn.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      btn.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", close);
    });
  }

  /* ---------- Galeri Lightbox ---------- */
  function setupLightbox() {
    var box = document.getElementById("lightbox");
    var imgEl = document.getElementById("lbImg");
    if (!box || !imgEl) return;

    var figures = Array.prototype.slice.call(document.querySelectorAll(".gallery-item img"));
    if (!figures.length) return;

    var index = 0;

    function show(i) {
      index = (i + figures.length) % figures.length;
      var src = figures[index].getAttribute("src");
      imgEl.setAttribute("src", src);
      imgEl.setAttribute("alt", figures[index].getAttribute("alt") || "");
    }
    function open(i) {
      show(i);
      box.classList.add("open");
      box.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
    function close() {
      box.classList.remove("open");
      box.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }

    figures.forEach(function (img, i) {
      img.addEventListener("click", function () { open(i); });
    });

    document.getElementById("lbClose").addEventListener("click", close);
    document.getElementById("lbPrev").addEventListener("click", function (e) { e.stopPropagation(); show(index - 1); });
    document.getElementById("lbNext").addEventListener("click", function (e) { e.stopPropagation(); show(index + 1); });

    // Arka plana tıklayınca kapat (resmin kendisine değil)
    box.addEventListener("click", function (e) { if (e.target === box) close(); });

    // Klavye
    document.addEventListener("keydown", function (e) {
      if (!box.classList.contains("open")) return;
      if (e.key === "Escape") close();
      else if (e.key === "ArrowLeft") show(index - 1);
      else if (e.key === "ArrowRight") show(index + 1);
    });
  }

  /* ---------- Scroll ile beliren animasyon ---------- */
  function setupReveal() {
    var items = document.querySelectorAll(".reveal");
    if (!items.length) return;

    if (!("IntersectionObserver" in window)) {
      items.forEach(function (el) { el.classList.add("visible"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    items.forEach(function (el) { io.observe(el); });
  }
})();
