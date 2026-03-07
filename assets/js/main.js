// ─────────────────────────────────────────────
// main.js — boot sequence
// This file runs last. It calls every init
// function in the correct order.
// ─────────────────────────────────────────────

function initNav() {
  window.addEventListener('scroll', function () {
    var nav = document.getElementById('nav');
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }, { passive: true });
}

function initScrollReveal() {
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.14 });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    observer.observe(el);
  });
}

function applyReducedMotion() {
  var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReduced) return;

  document.querySelectorAll('.hero-letter').forEach(function (el) {
    el.style.color             = 'var(--cream)';
    el.style.webkitTextStroke  = '0';
    el.style.transform         = 'none';
    el.style.opacity           = '1';
    var fill = el.querySelector('.fill');
    if (fill) fill.style.clipPath = 'inset(0% 0% 0% 0%)';
  });

  document.querySelectorAll('.mword').forEach(function (el) {
    el.classList.add('lit');
  });

  document.querySelectorAll('[data-reveal]').forEach(function (el) {
    el.classList.add('visible');
  });
}

// ── DOMContentLoaded ──────────────────────────
// Runs as soon as the HTML is parsed.
// Everything except the hero animation fires here.
document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger);

  initCursor();
  initNav();
  buildTicker();
  initMagnetic();
  initTilt();
  initAscii();
  initManifesto();
  initProcess();
  initTestimonials();
  initCta();
  initFooterRain();
  initScrollReveal();
  applyReducedMotion();

  // Build the hero letters now so the layout is stable,
  // but hold the drop animation until fonts are loaded.
  window._heroLetters = buildHeroLetters();
  initHeroScrollCollapse(window._heroLetters);
});

// ── window load ───────────────────────────────
// Fires after fonts, images and stylesheets are
// all fully loaded — safe to start the hero drop.
window.addEventListener('load', function () {
  setTimeout(function () {
    fireHero(window._heroLetters);
  }, 100);
});
