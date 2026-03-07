var initTestimonials = function() {
  var clients = [
    { name: 'Zestify',   quote: "Our old site was an embarrassment. PEAKMEDIA built something we show off at every pitch. Conversions went up 280% in 60 days.",         role: 'CEO, Zestify Foods' },
    { name: 'Inkraft',   quote: "They said our brief was too safe. They were right. The site they built has won us clients we had no business winning.",                 role: 'Founder, Inkraft Studio' },
    { name: 'Vaultex',   quote: "Every founder who visits our site asks who built it. That question alone has been worth ten times what we paid.",                      role: 'Co-Founder, Vaultex' },
    { name: 'Kratos',    quote: "We've worked with three agencies before. None of them understood that a website is a product, not a brochure. PEAKMEDIA did.",          role: 'CPO, Kratos Ventures' },
    { name: 'Lumenary',  quote: "They pushed back on two of our ideas and were right both times. That honesty is rare. The website is rarer.",                          role: 'Brand Director, Lumenary' },
    { name: 'Orion',     quote: "PEAKMEDIA doesn't make websites. They build digital reputations. Ours has never been stronger.",                                        role: 'MD, Orion Capital' }
  ];

  var ring  = document.getElementById('orbit-ring');
  if(!ring) return;
  var backdrop = document.createElement('div');
  backdrop.className = 'testi-modal-backdrop';
  backdrop.id = 'testi-backdrop';
  var modal = document.createElement('div');
  modal.className = 'testi-modal';
  var closeBtn = document.createElement('button');
  closeBtn.className   = 'tmodal-close';
  closeBtn.textContent = '✕';
  closeBtn.setAttribute('aria-label','Close');
  var stars  = document.createElement('div'); stars.className = 'tmodal-stars';
  var quote  = document.createElement('p');   quote.className = 'tmodal-quote';
  var name   = document.createElement('div'); name.className  = 'tmodal-name';
  var role   = document.createElement('div'); role.className  = 'tmodal-role';
  modal.appendChild(closeBtn); modal.appendChild(stars);
  modal.appendChild(quote);    modal.appendChild(name); modal.appendChild(role);
  backdrop.appendChild(modal);
  document.body.appendChild(backdrop);

  var paused = false;
  clients.forEach(function(c, i){
    var node = document.createElement('div');
    node.className = 'orbit-node';
    node.style.setProperty('--i', i);
    node.style.setProperty('--total', clients.length);
    node.textContent = c.name;
    node.addEventListener('click', function(){
      stars.textContent   = '★★★★★';
      quote.textContent   = c.quote;
      var parts = c.role.split(',');
      name.textContent    = parts[1] ? parts[1].trim() : c.name;
      role.textContent    = parts[0].trim();
      backdrop.classList.add('active');
      paused = true;
      ring.style.animationPlayState = 'paused';
    });
    ring.appendChild(node);
  });

  function close(){ backdrop.classList.remove('active'); paused=false; ring.style.animationPlayState='running'; }
  closeBtn.addEventListener('click', close);
  backdrop.addEventListener('click', function(e){ if(e.target===backdrop) close(); });
  document.addEventListener('keydown', function(e){ if(e.key==='Escape') close(); });
};
