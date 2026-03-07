#testimonials {
  padding: 8rem 3rem;
  text-align: center;
  position: relative;
  overflow: hidden;
}

#testimonials::before {
  content: '';
  position: absolute;
  inset: 0;
  background-image:
    linear-gradient(rgba(255,77,0,.03) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,77,0,.03) 1px, transparent 1px);
  background-size: 60px 60px;
  pointer-events: none;
}

.testi-inner {
  max-width: 1380px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.orbit-stage {
  position: relative;
  width: 480px;
  height: 480px;
  margin: 4rem auto 0;
  perspective: 1000px;
}

.orbit-ring {
  position: absolute;
  inset: 0;
  transform-style: preserve-3d;
  animation: orbitSpin 22s linear infinite;
}

@keyframes orbitSpin {
  from { transform: rotateY(0deg); }
  to   { transform: rotateY(360deg); }
}

.orbit-ring.paused { animation-play-state: paused; }

.orbit-node {
  position: absolute;
  top: 50%; left: 50%;
  width: 110px; height: 48px;
  margin: -24px -55px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Clash Display', sans-serif;
  font-weight: 600;
  font-size: .72rem;
  letter-spacing: .1em;
  color: var(--muted);
  border: 1px solid rgba(107,101,96,.18);
  border-radius: 3rem;
  background: rgba(26,26,26,.95);
  backdrop-filter: blur(4px);
  cursor: none;
  backface-visibility: hidden;
  transition: color .35s, border-color .35s;
  transform-style: preserve-3d;
}

.orbit-node:hover { color: var(--orange); border-color: rgba(255,77,0,.4); }
.orbit-node.open  { color: var(--cream);  border-color: rgba(255,77,0,.5); background: rgba(255,77,0,.08); }

/* Modal — fixed center of screen */
.testi-modal-backdrop {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,.75);
  backdrop-filter: blur(8px);
  z-index: 1000;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}
.testi-modal-backdrop.open {
  display: flex;
  animation: fadeIn .25s ease both;
}
@keyframes fadeIn { from{opacity:0} to{opacity:1} }

.testi-modal {
  background: #1e1e1e;
  border: 1px solid rgba(255,77,0,.2);
  border-radius: 16px;
  padding: 3rem 3.5rem;
  max-width: 560px;
  width: 100%;
  position: relative;
  animation: modalIn .35s cubic-bezier(.23,1,.32,1) both;
  text-align: left;
}
@keyframes modalIn {
  from { opacity:0; transform:scale(.88) translateY(20px); }
  to   { opacity:1; transform:scale(1)   translateY(0); }
}

.testi-modal::before {
  content: '';
  position: absolute;
  left: 0; top: 2rem; bottom: 2rem;
  width: 3px;
  background: var(--orange);
  border-radius: 0 2px 2px 0;
}

.tmodal-close {
  position: absolute;
  top: 1.2rem; right: 1.4rem;
  background: none;
  border: none;
  color: var(--muted);
  font-size: 1.1rem;
  cursor: none;
  transition: color .2s;
  font-family: 'Clash Display', sans-serif;
}
.tmodal-close:hover { color: var(--cream); }

.tmodal-stars { color: var(--orange); font-size: .85rem; letter-spacing: .2em; margin-bottom: 1.4rem; }

.tmodal-quote {
  font-family: 'Clash Display', sans-serif;
  font-size: clamp(1.1rem, 1.8vw, 1.4rem);
  font-weight: 400;
  line-height: 1.6;
  color: var(--cream);
  margin-bottom: 2rem;
}
.tmodal-quote::before {
  content: '"';
  color: var(--orange);
  font-size: 2em;
  line-height: .4;
  vertical-align: -.3em;
  margin-right: .1em;
}

.tmodal-divider { width: 2.5rem; height: 1px; background: var(--orange); opacity:.5; margin-bottom:1.2rem; }
.tmodal-name { font-family:'Clash Display',sans-serif; font-weight:600; font-size:.88rem; color:var(--cream); margin-bottom:.25rem; }
.tmodal-role { font-size:.72rem; font-weight:500; letter-spacing:.18em; text-transform:uppercase; color:var(--orange); }

.testi-hint { font-size:.65rem; letter-spacing:.25em; text-transform:uppercase; color:var(--muted); margin-top:2rem; opacity:.5; }

/* ── QUOTE CARD GRID (replaces orbit) ──────────── */
.tquote-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1px;
  background: rgba(245,240,232,.05);
  margin-top: 4rem;
}

.tquote-card {
  background: #0D0D0D;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  transition: background .3s;
  position: relative;
  overflow: hidden;
}
.tquote-card::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(to right, transparent, rgba(255,77,0,.3), transparent);
  opacity: 0; transition: opacity .4s;
}
.tquote-card:hover { background: #111; }
.tquote-card:hover::before { opacity: 1; }

.tquote-stars {
  font-size: .75rem;
  color: #FF4D00;
  letter-spacing: .15em;
}
.tquote-text {
  font-family: 'Cabinet Grotesk', sans-serif;
  font-size: .9rem;
  line-height: 1.72;
  color: rgba(245,240,232,.62);
  flex: 1;
}
.tquote-meta {
  display: flex;
  flex-direction: column;
  gap: .18rem;
  padding-top: 1.2rem;
  border-top: 1px solid rgba(245,240,232,.06);
}
.tquote-name {
  font-family: 'Clash Display', sans-serif;
  font-size: .58rem;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(245,240,232,.45);
}
.tquote-co {
  font-family: 'Clash Display', sans-serif;
  font-size: .72rem;
  font-weight: 600;
  color: #F5F0E8;
}

@media (max-width: 900px) {
  .tquote-grid { grid-template-columns: 1fr 1fr; }
}
@media (max-width: 600px) {
  .tquote-grid { grid-template-columns: 1fr; }
}
