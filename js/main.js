/* ============================================================
   Anthony Renard — interactions
   - Bascule de langue FR / EN (mémorisée)
   - Menu mobile
   - Animations au défilement
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Bascule de langue ---------- */
  var STORAGE_KEY = "ar-lang";
  var supported = ["fr", "en"];

  function detectLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported.indexOf(saved) !== -1) return saved;
    var nav = (navigator.language || "fr").slice(0, 2).toLowerCase();
    return nav === "en" ? "en" : "fr";
  }

  function applyLang(lang) {
    document.documentElement.setAttribute("lang", lang);

    // Éléments de contenu traduisibles
    document.querySelectorAll(".t, title, meta[name='description']").forEach(function (el) {
      var val = el.getAttribute("data-" + lang);
      if (val === null) return;
      if (el.tagName === "TITLE") {
        el.textContent = val;
      } else if (el.tagName === "META") {
        el.setAttribute("content", val);
      } else {
        el.innerHTML = val;
      }
    });

    // État visuel du sélecteur
    document.querySelectorAll(".lang-opt").forEach(function (opt) {
      opt.classList.toggle("active", opt.getAttribute("data-lang") === lang);
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  var currentLang = detectLang();
  applyLang(currentLang);

  var langToggle = document.getElementById("langToggle");
  if (langToggle) {
    langToggle.addEventListener("click", function () {
      currentLang = currentLang === "fr" ? "en" : "fr";
      applyLang(currentLang);
    });
  }

  /* ---------- Menu mobile ---------- */
  var menuToggle = document.getElementById("menuToggle");
  var nav = document.getElementById("nav");
  if (menuToggle && nav) {
    menuToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      menuToggle.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
    });
    // Referme le menu après un clic sur un lien
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        nav.classList.remove("open");
        menuToggle.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Afficher plus de projets ---------- */
  var moreBtn = document.getElementById("moreProjects");
  var grid = document.getElementById("projectsGrid");
  if (moreBtn && grid) {
    moreBtn.addEventListener("click", function () {
      grid.classList.add("expanded");
      moreBtn.style.display = "none";
    });
  }

  /* ---------- Animations au défilement ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("visible"); });
  }
})();
