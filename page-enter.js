window.initProcess = function () {
  var track   = document.getElementById('process-track');
  var wrapper = document.getElementById('process-wrapper');
  var sticky  = document.getElementById('process-sticky');
  if (!track || !wrapper) return;

  /* ── MOBILE: vertical stack ── */
  if (window.innerWidth <= 640) {
    wrapper.style.height = 'auto';
    sticky.style.cssText = 'position:relative;height:auto;overflow:visible;display:block;';
    track.style.cssText  = 'display:flex;flex-direction:column;width:100%;transform:none;will-change:auto;gap:.9rem;padding:0 1.1rem 2.8rem;';
    track.querySelectorAll('.pstep').forEach(function(s){
      /* Only override width/min-width — keep all other styles from CSS */
      s.style.width    = '100%';
      s.style.minWidth = 'unset';
      s.classList.add('active');
    });
    track.querySelectorAll('.arc-circle').forEach(function(a){ a.style.strokeDashoffset = '0'; });
    track.querySelectorAll('.pstep-progress').forEach(function(b){ b.style.width = '100%'; });
    return;
  }

  /* ── DESKTOP: horizontal scroll ── */
  function totalW() { return track.scrollWidth - window.innerWidth; }
  function setHeight() { wrapper.style.height = (totalW() + window.innerHeight) + 'px'; }
  setHeight();
  window.addEventListener('resize', function () { setHeight(); ScrollTrigger.refresh(); });

  ScrollTrigger.create({
    trigger: wrapper,
    start: 'top top',
    end: function () { return '+=' + totalW(); },
    pin: sticky,
    scrub: 1.2,
    onUpdate: function (self) {
      gsap.set(track, { x: -self.progress * totalW() });
      var steps = track.querySelectorAll('.pstep');
      var arcs  = track.querySelectorAll('.arc-circle');
      var bars  = track.querySelectorAll('.pstep-progress');
      arcs.forEach(function (arc, i) {
        var p = Math.max(0, Math.min(1, self.progress * steps.length - i));
        arc.style.strokeDashoffset = 144.5 * (1 - p);
        steps[i].classList.toggle('active', p > 0.05 && p < 0.98);
        bars[i].style.width = (p * 100) + '%';
      });
    }
  });
};
