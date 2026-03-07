/* ═══════════════════════════════════════════════
   cta-buttons.js  — living canvas behind each CTA
   
   Each button gets its own tiny canvas that renders
   a unique ambient animation:
   - Flowing orange particle stream
   - Sine-wave pulse lines
   - Soft radial glow that breathes
═══════════════════════════════════════════════ */
(function () {
  'use strict';

  /* Run after DOM is ready */
  document.addEventListener('DOMContentLoaded', function () {
    var btns = document.querySelectorAll('.sec-cta-btn');
    btns.forEach(function (btn, idx) {
      attachCanvas(btn, idx);
    });
  });

  function attachCanvas(btn, seed) {
    /* Create canvas and prepend into the button */
    var cv = document.createElement('canvas');
    btn.prepend(cv);

    var ctx  = cv.getContext('2d');
    var W, H;

    function resize() {
      var r = btn.getBoundingClientRect();
      W = cv.width  = r.width  || 300;
      H = cv.height = r.height || 52;
    }
    resize();
    /* Debounced resize */
    window.addEventListener('resize', function () {
      clearTimeout(cv._rt);
      cv._rt = setTimeout(resize, 120);
    }, { passive: true });

    /* ── Particles ── */
    var NPAR  = 18;
    var pars  = [];
    for (var i = 0; i < NPAR; i++) {
      pars.push(mkPar(W, H, seed, true));
    }

    function mkPar(W, H, seed, init) {
      return {
        x:   init ? Math.random() * W : -4,
        y:   H * (.15 + Math.random() * .7),
        vx:  .35 + Math.random() * .55,
        vy:  (Math.random() - .5) * .25,
        r:   .9 + Math.random() * 1.6,
        o:   .15 + Math.random() * .45,
        life: Math.random()          /* stagger */
      };
    }

    /* ── Sine wave lines ── */
    var NWAV = 3;
    var waves = [];
    for (var w = 0; w < NWAV; w++) {
      waves.push({
        amp:   H * (.06 + w * .04),
        freq:  .012 + w * .005 + seed * .002,
        speed: .018 + w * .006,
        phase: w * 1.1,
        op:    .06 + w * .04
      });
    }

    var T = seed * 12.7;  /* phase offset per button */
    var hovered = false;

    btn.addEventListener('mouseenter', function () { hovered = true;  });
    btn.addEventListener('mouseleave', function () { hovered = false; });

    /* ── RAF loop ── */
    (function loop() {
      ctx.clearRect(0, 0, W, H);
      T += hovered ? .028 : .016;

      /* Radial glow — breathes */
      var breathe = .5 + .5 * Math.sin(T * .8);
      var cx = W * .5, cy = H * .5;
      var gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * .55);
      gr.addColorStop(0,   'rgba(255,77,0,' + (.045 + breathe * .06) + ')');
      gr.addColorStop(.55, 'rgba(255,77,0,' + (.012 + breathe * .02) + ')');
      gr.addColorStop(1,   'rgba(255,77,0,0)');
      ctx.fillStyle = gr;
      ctx.fillRect(0, 0, W, H);

      /* Sine wave lines */
      waves.forEach(function (wv) {
        ctx.beginPath();
        for (var px = 0; px <= W; px += 2) {
          var py = cy + Math.sin(px * wv.freq + T * wv.speed + wv.phase) * wv.amp;
          px === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = 'rgba(255,77,0,' + wv.op * (hovered ? 1.6 : 1) + ')';
        ctx.lineWidth   = .8;
        ctx.stroke();
      });

      /* Particles flowing left → right */
      pars.forEach(function (p) {
        p.x  += p.vx * (hovered ? 1.7 : 1);
        p.y  += p.vy;
        p.life += .008;
        if (p.life > 1) p.life = 0;

        var alpha = p.o * Math.sin(p.life * Math.PI);  /* fade in/out */
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,77,0,' + alpha + ')';
        ctx.fill();

        if (p.x > W + 4) {
          /* reset to left edge */
          var np = mkPar(W, H, seed, false);
          p.x = np.x; p.y = np.y; p.vx = np.vx; p.vy = np.vy;
          p.r = np.r; p.o = np.o; p.life = 0;
        }
      });

      requestAnimationFrame(loop);
    })();
  }

})();
