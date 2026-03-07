window.buildTicker = function () {
  var phrases = [
    'Custom Code',
    'Zero Templates',
    'Scroll Animations',
    'Hand-Built Websites',
    'Motion & Interactions',
    'Performance-First',
    'No Page Builders',
    'Built in the Browser',
    'Custom Front-End',
    '100% Bespoke'
  ];

  function buildRow(id, arr, reversed) {
    var el  = document.getElementById(id);
    var src = reversed ? arr.slice().reverse() : arr;

    // Double the array so the loop is seamless
    var doubled = src.concat(src);
    var html = '';
    doubled.forEach(function (p) {
      html += '<span class="ticker-item">' + p + '</span>';
      html += '<span class="ticker-sep"></span>';
    });

    el.innerHTML = html;
  }

  buildRow('ticker-top',    phrases, false);
  buildRow('ticker-bottom', phrases, true);
};
