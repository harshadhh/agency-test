window.buildHeroLetters = function () {
  var WORD = 'PEAKMEDIA';
  var hw   = document.getElementById('hero-word');
  var lets = [];

  WORD.split('').forEach(function (ch) {
    var w = document.createElement('div');
    w.className   = 'hero-letter';
    w.textContent = ch;
    hw.appendChild(w);
    lets.push(w);
  });

  /* Hidden above screen — no opacity animation (prevents blur on large text) */
  gsap.set(lets, { y: '-120vh', opacity: 1 });

  return lets;
};

window.fireHero = function (lets) {
  gsap.to('#hero-eyebrow', {
    opacity: 1, y: 0, duration: 0.7, delay: 0.1, ease: 'power3.out'
  });

  lets.forEach(function (el, i) {
    var delay = 0.12 + i * 0.08 + Math.random() * 0.12;

    gsap.to(el, {
      y: 0,
      force3D: true,
      duration: 1.05,
      delay: delay,
      ease: 'expo.out',
      onComplete: function () {
        /* Shockwave ring */
        var r  = el.getBoundingClientRect();
        var sw = document.createElement('div');
        sw.className  = 'shockwave';
        sw.style.left   = (r.left + r.width  / 2) + 'px';
        sw.style.top    = (r.top  + r.height / 2) + 'px';
        sw.style.width  = (r.width  * 0.7) + 'px';
        sw.style.height = (r.height * 0.7) + 'px';
        document.body.appendChild(sw);
        setTimeout(function () { sw.remove(); }, 900);

        /* Solid fill after landing — simple color swap, no clip-path */
        gsap.to(el, {
          color: 'var(--cream)',
          webkitTextStroke: '0px transparent',
          duration: 0.3,
          ease: 'power2.out'
        });

        if (i === lets.length - 1) {
          setTimeout(function () { window.startBreathing(lets); }, 800);
        }
      }
    });
  });

  gsap.to('#hero-subtitle', {
    opacity: 1, y: 0, duration: 0.9, delay: 1.7, ease: 'power3.out'
  });
  gsap.to('#hero-cta', {
    opacity: 1, y: 0, duration: 0.9, delay: 2.0, ease: 'power3.out'
  });
};

window.startBreathing = function (lets) {
  lets.forEach(function (el, i) {
    el.style.setProperty('--bd',  (2.2 + Math.random() * 0.6) + 's');
    el.style.setProperty('--del', (i * 0.11) + 's');
    el.classList.add('breathe');
  });
};

window.initHeroScrollCollapse = function (lets) {
  ScrollTrigger.create({
    trigger: '#hero',
    start: 'bottom 72%',
    onEnter: function () {
      lets.forEach(function (el) { el.classList.remove('breathe'); });
      gsap.to(lets, {
        scale: 0.05, opacity: 0,
        x: function () { return (Math.random() - 0.5) * 160; },
        y: function () { return (Math.random() - 0.5) * 160; },
        duration: 0.42,
        stagger: { each: 0.035, from: 'center' },
        ease: 'expo.in'
      });
    },
    onLeaveBack: function () {
      gsap.to(lets, {
        scale: 1, opacity: 1, x: 0, y: 0,
        duration: 0.55, stagger: 0.04, ease: 'expo.out',
        onComplete: function () { window.startBreathing(lets); }
      });
    }
  });
};
