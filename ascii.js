window.initCta = function () {
  var btn = document.getElementById('main-cta');
  if (!btn) return;

  // Radial fill expands outward from wherever the cursor is on the button
  btn.addEventListener('mousemove', function (e) {
    var r = this.getBoundingClientRect();
    this.style.setProperty('--cx', (e.clientX - r.left) + 'px');
    this.style.setProperty('--cy', (e.clientY - r.top)  + 'px');
  });
};
