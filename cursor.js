window.initAscii = function () {
  var pre = document.getElementById('ascii-pre');
  if (!pre) return;

  var CHARS = '█▓▒░#@&%*+=-:. ';
  var CL = CHARS.length - 1;
  var W = 90, H = 28;
  var t = 0;

  function ch(v) { return CHARS[Math.max(0, Math.min(CL, Math.floor(v * CL))) | 0]; }
  function sn(x, y, spd, sc) {
    sc = sc||0.4;
    return Math.sin(x*sc + t*spd) * Math.cos(y*sc*1.3 + t*spd*0.7) * 0.5 + 0.5;
  }

  /* ── pixel buffer ── */
  var buf = new Float32Array(W * H);
  function clr() { for (var i=0;i<buf.length;i++) buf[i]=0; }
  function px(c,r,v) { if(c>=0&&c<W&&r>=0&&r<H){ var i=r*W+c; if(v>buf[i]) buf[i]=v; } }
  function hline(r,x0,x1,v){ for(var c=x0;c<=x1;c++) px(c,r,v); }
  function vline(c,r0,r1,v){ for(var r=r0;r<=r1;r++) px(c,r,v); }
  function rect(x,y,w,h,v){ hline(y,x,x+w-1,v);hline(y+h-1,x,x+w-1,v);vline(x,y,y+h-1,v);vline(x+w-1,y,y+h-1,v); }
  function fill(x,y,w,h,v){ for(var r=y;r<y+h;r++) hline(r,x,x+w-1,v); }

  /* ── PERSON: cx,cy=chest centre, f=facing (1=right,-1=left) ── */
  function person(cx,cy,f) {
    /* head */
    for(var r=cy-8;r<=cy-3;r++) for(var c=cx-3;c<=cx+3;c++){
      var dx=c-cx,dy=r-(cy-5.5),d=dx*dx*0.35+dy*dy*0.85;
      if(d<5.5) px(c,r, 0.6+sn(c,r,0.5,0.7)*0.3);
    }
    vline(cx,cy-3,cy-2,0.7); /* neck */
    hline(cy-1,cx-5,cx+5,0.72); /* shoulders */
    /* torso */
    for(var tr=cy;tr<=cy+5;tr++){
      var tw=Math.max(1,3-Math.floor((tr-cy)*0.4));
      for(var tc=cx-tw;tc<=cx+tw;tc++) px(tc,tr,0.6+sn(tc,tr,0.3,0.5)*0.15);
    }
    /* typing arm toward monitor */
    for(var a=1;a<=6;a++) px(cx+f*(2+a), cy+1+Math.floor(a*0.4), 0.65+sn(a,t,2,1)*0.1);
    /* other arm down */
    for(var a2=1;a2<=3;a2++) px(cx-f*(1+a2), cy+2+a2, 0.52);
    /* hands */
    hline(cy+2, cx+f*6, cx+f*9, 0.62);
  }

  /* ── DESK ── */
  function desk(x,y,w) {
    hline(y,   x,x+w-1,1.0);
    hline(y+1, x,x+w-1,0.55);
    vline(x+2,    y+1,y+4,0.8);
    vline(x+w-3,  y+1,y+4,0.8);
    hline(y+4, x+2,x+w-3,0.3);
  }

  /* ── MONITOR ── */
  function monitor(x,y) {
    var MW=16,MH=10;
    rect(x,y,MW,MH,1.0);
    fill(x+1,y+1,MW-2,MH-2,0.07);
    /* stand */
    vline(x+Math.floor(MW/2), y+MH, y+MH+1, 0.85);
    hline(y+MH+1, x+Math.floor(MW/2)-2, x+Math.floor(MW/2)+2, 0.65);
    /* scrolling code lines */
    var scroll = Math.floor(t*3)%(MH-2);
    for(var row=1;row<MH-1;row++){
      var li=(row+scroll)%(MH-2);
      var bright = li%3===0?0.75:li%3===1?0.42:0.22;
      var len=5+(li*3)%8;
      for(var col=2;col<2+len&&col<MW-2;col++) px(x+col,y+row,bright+sn(col,row,0.8,1.1)*0.12);
    }
    /* cursor blink */
    if(Math.floor(t*4)%2===0) px(x+2+Math.floor((t*6)%(MW-5)), y+MH-3, 1.0);
  }

  /* ── KEYBOARD ── */
  function keyboard(x,y){
    rect(x,y,13,3,0.85);
    for(var k=1;k<12;k+=2) px(x+k,y+1,0.75);
    hline(y+2,x+2,x+10,0.6);
    /* typing flash */
    px(x+1+Math.floor((t*9)%11), y+1, 1.0);
  }

  /* ── WEBSITE WIREFRAME in centre ── */
  function website(x,y){
    var PW=18,PH=16;
    rect(x,y,PW,PH,0.8);
    fill(x+1,y+1,PW-2,PH-2,0.05);
    fill(x+1,y+1,PW-2,2,0.4);       /* nav */
    px(x+2,y+1,1.0); px(x+2,y+2,1.0); /* logo dot */
    /* hero headline pulses */
    var p=0.4+Math.abs(Math.sin(t*1.8))*0.6;
    hline(y+4,x+2,x+12,p);
    hline(y+5,x+2,x+9, p*0.65);
    /* content rows */
    for(var cl=0;cl<3;cl++){
      hline(y+7+cl,x+2,x+7,  0.3+sn(cl,t,0.3,0.2)*0.15);
      hline(y+7+cl,x+10,x+15,0.3+sn(cl,t,0.4,0.3)*0.15);
    }
    /* CTA button blinks */
    var b=0.35+Math.abs(Math.sin(t*2.3))*0.55;
    rect(x+5,y+12,8,2,b);
    /* progress bar */
    var prog=Math.abs(Math.sin(t*0.35));
    hline(y+PH-2,x+1,x+1+Math.floor((PW-3)*prog),0.45);
  }

  /* ── HIGH FIVE ── */
  function highfive(cx,cy){
    var prog=(Math.sin(t*0.8)+1)*0.5;
    var gap=Math.round((1-prog)*4);
    /* left palm + fingers */
    fill(cx-gap-4,cy-1,4,3,0.7+prog*0.25);
    for(var f=0;f<5;f++){var fh=f===2?3:f===1||f===3?2:1;vline(cx-gap-5-f,cy-1-fh,cy-1,0.68);}
    /* right palm + fingers */
    fill(cx+gap,cy-1,4,3,0.7+prog*0.25);
    for(var f2=0;f2<5;f2++){var fh2=f2===2?3:f2===1||f2===3?2:1;vline(cx+gap+4+f2,cy-1-fh2,cy-1,0.68);}
    /* impact flash */
    if(prog>0.84){
      var intensity=(prog-0.84)/0.16;
      for(var bx=-5;bx<=5;bx++) for(var by=-3;by<=3;by++){
        var bd=Math.sqrt(bx*bx*0.6+by*by*1.2);
        if(bd<4) px(cx+bx,cy+by,Math.min(1,intensity*(1-bd/4)*1.3));
      }
      [[1,-1,3],[2,-2,1],[-1,-1,3],[-2,-2,1],[0,-2,2]].forEach(function(sp){
        px(Math.round(cx+sp[0]*3*intensity),Math.round(cy+sp[1]*2*intensity),0.9*intensity);
      });
    }
  }

  /* ── MATRIX RAIN (background) ── */
  var RAIN=[];
  for(var i=0;i<18;i++) RAIN.push({x:Math.floor(Math.random()*W),spd:0.2+Math.random()*0.4,ph:Math.random()*H,len:3+Math.floor(Math.random()*5)});
  function rain(){
    RAIN.forEach(function(r){
      var head=((t*r.spd*5+r.ph)%(H+r.len)+H+r.len)%(H+r.len);
      for(var d=0;d<r.len;d++){
        var row=Math.floor(head-d);
        if(row<0||row>=H) continue;
        if((buf[row*W+r.x]||0)<0.12) px(r.x,row,(1-d/r.len)*0.45);
      }
    });
  }

  /* ── SCENE POSITIONS ── W=90
     PersonL: cx=12  DeskL: x=3,y=21,w=20  MonL: x=17,y=10  KbL: x=7,y=22
     Website: x=36,y=6   HighFive: cx=45,cy=13
     MonR: x=57,y=10  DeskR: x=55,y=21,w=20  KbR: x=60,y=22  PersonR: cx=72
  ── */
  /* ── Auto-fit font so 90×28 chars fill the box exactly ── */
  function fitFont() {
    var box = pre.getBoundingClientRect();
    if (!box.width) return;
    /* Size purely by width so the pre wraps tightly around the scene */
    var charW = box.width / W;
    var fs = charW / 0.62;
    pre.style.fontSize = fs + 'px';
    pre.style.lineHeight = '1.08';
  }
  fitFont();
  window.addEventListener('resize', fitFont, {passive: true});

  function draw(){
    clr();
    rain();
    desk(3,21,20);  monitor(17,10); keyboard(7,22);  person(12,19,1);
    website(36,6);
    highfive(45,13);
    desk(55,21,20); monitor(57,10); keyboard(60,22); person(72,19,-1);
    hline(H-1,0,W-1,0.1); /* floor */

    var out='';
    for(var r=0;r<H;r++){
      for(var c=0;c<W;c++) out+=ch(buf[r*W+c]);
      out+='\n';
    }
    pre.textContent=out;
    t+=0.042;
    setTimeout(draw,1000/14);
  }
  draw();
};
