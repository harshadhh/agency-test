window.initTilt = function () {
  var cards = document.querySelectorAll('[data-tilt]');

  cards.forEach(function (card) {
    // Tilt toward mouse position inside the card
    card.addEventListener('mousemove', function (e) {
      var r = card.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width  - 0.5;
      var y = (e.clientY - r.top)  / r.height - 0.5;

      card.style.transform  = 'perspective(700px) rotateX(' + (-y * 10) + 'deg) rotateY(' + (x * 10) + 'deg) translateZ(6px)';
      card.style.transition = 'none';
    });

    // Reset to flat when mouse leaves
    card.addEventListener('mouseleave', function () {
      card.style.transform  = '';
      card.style.transition = 'transform .6s cubic-bezier(.23,1,.32,1)';
    });
  });
};
