window.initManifesto = function () {
  var man = document.getElementById('manifesto');
  if (!man) return;

  // Split text into individual word spans
  var words = man.textContent.trim().split(/\s+/);
  man.innerHTML = words.map(function (w) {
    return '<span class="mword">' + w + '</span>';
  }).join(' ');

  var wordEls = man.querySelectorAll('.mword');

  // Light up each word as it enters the viewport
  function reveal() {
    wordEls.forEach(function (el) {
      if (el.getBoundingClientRect().top < window.innerHeight * 0.88) {
        el.classList.add('lit');
      }
    });
  }

  window.addEventListener('scroll', reveal, { passive: true });
  reveal(); // run once on init in case already in view
};
