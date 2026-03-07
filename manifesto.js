window.initMagnetic = function () {
  var cards = document.querySelectorAll('[data-mag]');

  cards.forEach(function (card) {
    var tx = 0; // target x offset
    var ty = 0; // target y offset
    var lx = 0; // current lerped x
    var ly = 0; // current lerped y

    // Update target when mouse moves over card
    card.addEventListener('mousemove', function (e) {
      var r  = card.getBoundingClientRect();
      tx = (e.clientX - r.left - r.width  / 2) * 0.25;
      ty = (e.clientY - r.top  - r.height / 2) * 0.25;
    });

    // Snap back when mouse leaves
    card.addEventListener('mouseleave', function () {
      tx = 0;
      ty = 0;
    });

    // Lerp loop — card smoothly chases target
    function loop() {
      lx += (tx - lx) * 0.1;
      ly += (ty - ly) * 0.1;
      card.style.transform = 'translate(' + lx + 'px, ' + ly + 'px)';
      requestAnimationFrame(loop);
    }
    loop();
  });
};
