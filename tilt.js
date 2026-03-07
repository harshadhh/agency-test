/* ═══════════════════════════════════════════════════
   page-enter.js  v2
   
   Call:  initPageEnter(label)
   label = big text shown in centre during intro
           e.g. "THE WORK", "STUDIO", "JOURNAL"
   
   Sequence:
   1. Full-screen canvas — particles + flowing lines +
      dual radial glow + vertical crack
   2. Label text slides up from below, orange rule draws
   3. After 1300ms canvas fades out (500ms)
   4. Content revealed — title lines slide up staggered
═══════════════════════════════════════════════════ */
function initPageEnter(label) {

  /* ── 1. OVERLAY CANVAS ────────────────────────── */
  var ov = document.createElement('canvas');
  ov.style.cssText = 'position:fixed;inset:0;width:100%;height:100%;z-index:8500;pointer-events:none;background:#0D0D0D';
  document.body.prepend(ov);
  var c = ov.getContext('2d');
  var W, H;
  function rsz(){ W = ov.width = innerWidth; H = ov.height = innerHeight; }
  rsz(); window.addEventListener('resize', rsz, {passive:true});

  /* particles */
  var P = [], T = 0;
  var n = Math.max(30, Math.floor(innerWidth * innerHeight / 5500));
  for(var i = 0; i < n; i++) P.push({
    x: Math.random()*innerWidth,  y: Math.random()*innerHeight,
    vx:(Math.random()-.5)*1.5,   vy:(Math.random()-.5)*1.5,
    r: .4+Math.random()*1.9,     o: .06+Math.random()*.42
  });

  /* flowing lines */
  var FL = [];
  for(var j = 0; j < 9; j++) FL.push({
    pts:[{x:Math.random()*innerWidth, y:Math.random()*innerHeight}],
    spd:.5+Math.random()*.85, ph:j*1.1
  });

  var alpha = 1, stopped = false, raf2;
  function draw(){
    c.clearRect(0,0,W,H);
    c.fillStyle = 'rgba(13,13,13,'+alpha+')'; c.fillRect(0,0,W,H);
    T += .018;

    /* flowing lines */
    FL.forEach(function(ln, li){
      var last = ln.pts[ln.pts.length-1];
      ln.pts.push({ x:last.x+Math.sin(T*ln.spd+ln.ph)*2.8, y:last.y+Math.cos(T*ln.spd*.78+ln.ph)*2.8 });
      if(ln.pts.length > 70) ln.pts.shift();
      if(last.x<0||last.x>W||last.y<0||last.y>H) ln.pts=[{x:Math.random()*W,y:Math.random()*H}];
      if(ln.pts.length > 1){
        c.beginPath(); c.moveTo(ln.pts[0].x, ln.pts[0].y);
        ln.pts.forEach(function(p){ c.lineTo(p.x,p.y); });
        c.strokeStyle = 'rgba(255,77,0,'+(0.04*alpha)+')';
        c.lineWidth = 1; c.stroke();
      }
    });

    /* particles */
    P.forEach(function(p){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      c.beginPath(); c.arc(p.x,p.y,p.r,0,Math.PI*2);
      c.fillStyle = 'rgba(255,77,0,'+(p.o*alpha)+')'; c.fill();
    });

    /* dual radial glows */
    [[W*.25,H*.5,'rgba(60,40,220,'],[W*.75,H*.5,'rgba(255,77,0,']].forEach(function(g){
      var gr=c.createRadialGradient(g[0],g[1],0,g[0],g[1],H*.52);
      gr.addColorStop(0, g[2]+(0.07*alpha)+')');
      gr.addColorStop(1, g[2]+'0)');
      c.beginPath(); c.arc(g[0],g[1],H*.52,0,Math.PI*2); c.fillStyle=gr; c.fill();
    });

    /* central vertical crack */
    var cv = c.createLinearGradient(W/2,0,W/2,H);
    cv.addColorStop(0,  'rgba(255,77,0,0)');
    cv.addColorStop(.18,'rgba(255,77,0,'+(0.4*alpha)+')');
    cv.addColorStop(.82,'rgba(255,77,0,'+(0.4*alpha)+')');
    cv.addColorStop(1,  'rgba(255,77,0,0)');
    c.strokeStyle=cv; c.lineWidth=1;
    c.beginPath(); c.moveTo(W/2,0); c.lineTo(W/2,H); c.stroke();

    if(!stopped) raf2 = requestAnimationFrame(draw);
  }
  raf2 = requestAnimationFrame(draw);

  /* ── 2. LABEL ELEMENT ─────────────────────────── */
  var wrap = document.createElement('div');
  wrap.style.cssText = [
    'position:fixed','top:50%','left:50%',
    'transform:translate(-50%,-50%)',
    'z-index:8600','pointer-events:none',
    'text-align:center'
  ].join(';');

  var words = (label || 'PEAKMEDIA').split(' ');
  var mainHtml = words.map(function(w){
    var accent = (w === words[words.length-1]);
    return '<span style="display:inline-block;overflow:hidden">'
      +'<span class="_pe_inner" style="display:inline-block;transform:translateY(108%);transition:transform .78s cubic-bezier(.77,0,.175,1);'
      +(accent?'color:#FF4D00;':'')+'">'
      + w
      +'</span></span>&nbsp;';
  }).join('');

  wrap.innerHTML =
    '<div style="font-family:\'Clash Display\',sans-serif;font-size:.6rem;letter-spacing:.5em;text-transform:uppercase;color:rgba(245,240,232,.28);margin-bottom:1rem;opacity:0;transform:translateY(8px);transition:opacity .6s ease,transform .6s ease" id="_pe_sub">PEAKMEDIA</div>'
   +'<div style="font-family:\'Clash Display\',sans-serif;font-weight:700;font-size:clamp(2rem,6vw,7rem);letter-spacing:-.04em;line-height:.88;color:#F5F0E8">'
   + mainHtml
   +'</div>'
   +'<div id="_pe_rule" style="width:0;height:2px;background:#FF4D00;margin:1.1rem auto 0;transition:width .85s cubic-bezier(.77,0,.175,1) .55s"></div>';

  document.body.appendChild(wrap);

  /* animate in */
  requestAnimationFrame(function(){
    var sub = document.getElementById('_pe_sub');
    if(sub){ sub.style.opacity='1'; sub.style.transform='none'; }
    setTimeout(function(){
      wrap.querySelectorAll('._pe_inner').forEach(function(el,i){
        setTimeout(function(){ el.style.transform='translateY(0)'; }, i*110);
      });
      var rule = document.getElementById('_pe_rule');
      if(rule) rule.style.width = '4.5rem';
    }, 150);
  });

  /* ── 3. FADE OUT after 1300ms ─────────────────── */
  function fadeOut(ts){
    if(!fadeOut.start) fadeOut.start = ts;
    var p = Math.min(1,(ts-fadeOut.start)/550);
    alpha = 1-p;
    ov.style.opacity = 1-p;
    wrap.style.opacity = 1-p;
    if(p < 1){ requestAnimationFrame(fadeOut); }
    else {
      stopped = true;
      cancelAnimationFrame(raf2);
      ov.remove(); wrap.remove();
      /* ── 4. ANIMATE PAGE CONTENT IN ── */
      animatePageContent();
    }
  }
  setTimeout(function(){ requestAnimationFrame(fadeOut); }, 1300);

  /* ── 4. PAGE CONTENT ANIMATIONS ──────────────── */
  function animatePageContent(){
    /* title lines */
    document.querySelectorAll('.title-inner').forEach(function(el,i){
      el.style.transform = 'translateY(110%)';
      el.style.transition = 'none';
      requestAnimationFrame(function(){
        setTimeout(function(){
          el.style.transition = 'transform .82s cubic-bezier(.77,0,.175,1)';
          el.style.transform  = 'translateY(0)';
        }, i*130);
      });
    });
    /* eyebrow */
    var eye = document.querySelector('.page-eye, .page-label');
    if(eye){
      eye.style.opacity='0'; eye.style.transform='translateY(14px)';
      eye.style.transition='opacity .65s ease,transform .65s cubic-bezier(.23,1,.32,1)';
      setTimeout(function(){ eye.style.opacity='1'; eye.style.transform='none'; }, 80);
    }
    /* data-enter elements */
    document.querySelectorAll('[data-enter]').forEach(function(el,i){
      var d = parseInt(el.getAttribute('data-enter'))||i*80;
      el.style.opacity='0'; el.style.transform='translateY(16px)';
      el.style.transition='opacity .6s ease,transform .6s cubic-bezier(.23,1,.32,1)';
      setTimeout(function(){ el.style.opacity='1'; el.style.transform='none'; }, 200+d);
    });
  }
}
