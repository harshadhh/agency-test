window.initFooterRain = function () {
  var canvas = document.getElementById('footer-canvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');

  // Code fragments that rain down
  var snippets = [
    'border-radius:', 'transform:', 'const lerp =', 'ease: expo.out',
    'perspective(900px)', 'clip-path:', 'requestAnimationFrame', 'ScrollTrigger',
    'overflow: hidden', 'will-change: transform', 'rotateY(', 'translate3d(',
    'filter: blur()', 'mix-blend-mode:', 'cubic-bezier(', '@keyframes',
    'position: fixed;', 'z-index: 9999', 'var(--orange)', 'gsap.to(',
    'display: grid', 'letter-spacing:', 'aspect-ratio:', 'font-family:'
  ];

  var drops = [];

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    // Recreate drops to fill the new size
    drops = [];
    for (var i = 0; i < 42; i++) {
      drops.push({
        x:   Math.random() * canvas.width,
        y:   Math.random() * canvas.height,
        spd: 0.3  + Math.random() * 0.65,
        txt: snippets[Math.floor(Math.random() * snippets.length)],
        op:  0.022 + Math.random() * 0.055
      });
    }
  }

  resize();
  window.addEventListener('resize', resize, { passive: true });

  function rain() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '10px Courier New';

    drops.forEach(function (d) {
      ctx.fillStyle = 'rgba(255,77,0,' + d.op + ')';
      ctx.fillText(d.txt, d.x, d.y);
      d.y += d.spd;

      // Reset to top when a drop falls off the bottom
      if (d.y > canvas.height + 20) {
        d.y   = -14;
        d.x   = Math.random() * canvas.width;
        d.txt = snippets[Math.floor(Math.random() * snippets.length)];
      }
    });

    requestAnimationFrame(rain);
  }

  rain();
};
