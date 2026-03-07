window.initCursor = function () {
  const cursor = document.getElementById('cursor');

  // Mouse target position
  let mx = innerWidth / 2;
  let my = innerHeight / 2;

  // Cursor's current interpolated position
  let cx = mx;
  let cy = my;

  // Track real mouse position
  document.addEventListener('mousemove', function (e) {
    mx = e.clientX;
    my = e.clientY;
  });

  // Spring-physics loop — cursor chases mouse with lag
  function loop() {
    cx += (mx - cx) * 0.155;
    cy += (my - cy) * 0.155;
    cursor.style.left = cx + 'px';
    cursor.style.top  = cy + 'px';
    requestAnimationFrame(loop);
  }
  loop();

  // Grow cursor on hoverable elements
  var hoverEls = document.querySelectorAll(
    'a, button, [data-tilt], [data-mag], .scard, .orbit-node, .fsoc'
  );
  hoverEls.forEach(function (el) {
    el.addEventListener('mouseenter', function () { cursor.classList.add('hover'); });
    el.addEventListener('mouseleave', function () { cursor.classList.remove('hover'); });
  });

  // Swallow state + room temperature shift on primary CTAs
  var ctaIds = ['nav-cta-btn', 'hero-cta', 'main-cta'];
  ctaIds.forEach(function (id) {
    var el = document.getElementById(id);
    if (!el) return;

    el.addEventListener('mouseenter', function () {
      cursor.classList.remove('hover');
      cursor.classList.add('swallow');
      document.body.classList.add('cta-active');
    });
    el.addEventListener('mouseleave', function () {
      cursor.classList.remove('swallow');
      document.body.classList.remove('cta-active');
    });
  });
};
