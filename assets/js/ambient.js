/* ═══════════════════════════════════════════════
   AMBIENT — Full-page living ember field
   Fixed canvas behind all content, all pages.
   Subtle rising sparks + slow breathing grid.
   Content always wins. This just breathes.
═══════════════════════════════════════════════ */

(function () {

  /* ── CANVAS SETUP ────────────────────────── */
  var canvas = document.createElement('canvas');
  canvas.id  = 'ambient-canvas';
  canvas.style.cssText = [
    'position:fixed',
    'inset:0',
    'width:100%',
    'height:100%',
    'pointer-events:none',
    'z-index:-1',
    'opacity:1',
  ].join(';');
  document.body.insertBefore(canvas, document.body.firstChild);

  var ctx = canvas.getContext('2d');
  var W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* ── EMBERS ──────────────────────────────── */
  var EMBER_COUNT = 55;
  var embers = [];

  function Ember() { this.reset(true); }

  Ember.prototype.reset = function (initial) {
    this.x     = Math.random() * W;
    this.y     = initial ? Math.random() * H : H + 8;
    this.size  = 0.6 + Math.random() * 1.6;
    this.speedY= 0.18 + Math.random() * 0.42;   // rises upward
    this.speedX= (Math.random() - 0.5) * 0.22;  // gentle sway
    this.life  = 0;
    this.maxLife = 180 + Math.random() * 260;
    this.wobble = Math.random() * Math.PI * 2;
    this.wobbleSpeed = 0.012 + Math.random() * 0.018;
    // depth: far embers smaller + dimmer
    this.depth = 0.25 + Math.random() * 0.75;
  };

  Ember.prototype.update = function () {
    this.life++;
    this.wobble += this.wobbleSpeed;
    this.x += this.speedX + Math.sin(this.wobble) * 0.28;
    this.y -= this.speedY * this.depth;

    if (this.y < -10 || this.life > this.maxLife) this.reset(false);
  };

  Ember.prototype.draw = function () {
    var progress = this.life / this.maxLife;
    // Fade in fast, hold, fade out slowly
    var alpha;
    if (progress < 0.08) {
      alpha = (progress / 0.08);
    } else if (progress < 0.75) {
      alpha = 1;
    } else {
      alpha = 1 - ((progress - 0.75) / 0.25);
    }
    alpha *= 0.13 * this.depth; // keep very subtle

    var r = this.size * this.depth;

    // Soft glow
    var g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, r * 5);
    g.addColorStop(0,   'rgba(255,90,10,' + (alpha * 1.8).toFixed(3) + ')');
    g.addColorStop(0.3, 'rgba(255,60,0,'  + (alpha * 0.7).toFixed(3) + ')');
    g.addColorStop(1,   'rgba(255,40,0,0)');
    ctx.beginPath();
    ctx.arc(this.x, this.y, r * 5, 0, Math.PI * 2);
    ctx.fillStyle = g;
    ctx.fill();

    // Core
    ctx.beginPath();
    ctx.arc(this.x, this.y, r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,120,40,' + (alpha * 3.5).toFixed(3) + ')';
    ctx.fill();
  };

  for (var i = 0; i < EMBER_COUNT; i++) embers.push(new Ember());

  /* ── GRID ────────────────────────────────── */
  // Slow-breathing dot grid — barely visible
  var gridPhase = 0;

  function drawGrid() {
    gridPhase += 0.004;
    var spacing = 72;
    var cols = Math.ceil(W / spacing) + 1;
    var rows = Math.ceil(H / spacing) + 1;
    var scrollY = window.scrollY || 0;
    var offsetY = scrollY * 0.08; // parallax drift

    for (var row = 0; row < rows; row++) {
      for (var col = 0; col < cols; col++) {
        var x = col * spacing;
        var y = (row * spacing - (offsetY % spacing));

        // Each dot pulses at slightly different phase
        var phase = gridPhase + col * 0.18 + row * 0.22;
        var pulse = 0.5 + 0.5 * Math.sin(phase);

        // Distance from centre brightens dots
        var dcx = (x - W * 0.5) / W;
        var dcy = (y - H * 0.5) / H;
        var dist = Math.sqrt(dcx * dcx + dcy * dcy);
        var centreFade = Math.max(0, 1 - dist * 1.8);

        var alpha = pulse * centreFade * 0.045;
        if (alpha < 0.004) continue;

        ctx.beginPath();
        ctx.arc(x, y, 1, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(245,240,232,' + alpha.toFixed(3) + ')';
        ctx.fill();
      }
    }
  }

  /* ── HORIZONTAL SCAN LINE ────────────────── */
  // One slow glowing line that scrolls down the page infinitely
  var scanY = 0;

  function drawScan() {
    scanY += 0.4;
    if (scanY > H) scanY = -80;

    var sg = ctx.createLinearGradient(0, scanY - 40, 0, scanY + 40);
    sg.addColorStop(0,   'rgba(255,77,0,0)');
    sg.addColorStop(0.5, 'rgba(255,77,0,0.018)');
    sg.addColorStop(1,   'rgba(255,77,0,0)');
    ctx.fillStyle = sg;
    ctx.fillRect(0, scanY - 40, W, 80);
  }

  /* ── VIGNETTE ────────────────────────────── */
  function drawVignette() {
    var vg = ctx.createRadialGradient(W*0.5, H*0.5, H*0.05, W*0.5, H*0.5, H*0.9);
    vg.addColorStop(0,   'rgba(13,13,13,0)');
    vg.addColorStop(0.55,'rgba(13,13,13,0)');
    vg.addColorStop(1,   'rgba(13,13,13,0.55)');
    ctx.fillStyle = vg;
    ctx.fillRect(0, 0, W, H);
  }

  /* ── RENDER LOOP ─────────────────────────── */
  function render() {
    requestAnimationFrame(render);

    ctx.clearRect(0, 0, W, H);

    drawGrid();
    drawScan();

    for (var i = 0; i < embers.length; i++) {
      embers[i].update();
      embers[i].draw();
    }

    drawVignette();
  }

  render();

})();
