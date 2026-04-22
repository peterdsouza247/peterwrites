import { useState, useEffect, useRef } from "react";

const GFONTS = `@import url('https://fonts.googleapis.com/css2?family=Cormorant+Upright:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Cormorant+SC:wght@300;400;500;600;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400;1,600&family=Raleway:wght@300;400;500;600&display=swap');`;

const CSS = `
${GFONTS}
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --void:#04060a; --deep:#0a0e14; --shadow:#111720;
  --ash:#9aaabb; --smoke:#d0d8e0;
  --ember:#bf3f10; --flame:#e06020; --flare:#f09040;
  --gold:#c09040; --gilt:#ddb860; --parch:#f0e8d4;
  --font-myth:'Cormorant Upright',serif;
  --font-head:'Cormorant SC',serif;
  --font-body:'Crimson Pro',serif;
  --font-label:'Raleway',sans-serif;
}
html{scroll-behavior:smooth;}
body{background:var(--void);color:var(--smoke);font-family:var(--font-body);font-size:21px;line-height:1.85;overflow-x:hidden;cursor:none;}
body::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E");pointer-events:none;z-index:9998;opacity:0.4;}

/* CURSOR */
.cur-o{position:fixed;width:32px;height:32px;border:1px solid rgba(224,96,32,0.45);border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);transition:width .2s,height .2s,border-color .2s;mix-blend-mode:screen;}
.cur-i{position:fixed;width:5px;height:5px;background:var(--flare);border-radius:50%;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);box-shadow:0 0 8px var(--flame),0 0 16px var(--ember);}
@media(hover:none){.cur-o,.cur-i{display:none;}body{cursor:auto;}}

#ec{position:fixed;inset:0;pointer-events:none;z-index:10;}

/* NAV */
nav{position:fixed;top:0;left:0;right:0;z-index:1000;padding:1.5rem 3.5rem;display:flex;justify-content:space-between;align-items:center;}
nav::before{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,rgba(4,6,10,.9) 0%,transparent 100%);backdrop-filter:blur(4px);-webkit-mask:linear-gradient(to bottom,black 60%,transparent);mask:linear-gradient(to bottom,black 60%,transparent);}
.nav-brand{font-family:var(--font-head);font-size:1.1rem;font-weight:500;letter-spacing:.25em;color:var(--gilt);position:relative;text-shadow:0 0 20px rgba(192,144,64,.4);cursor:pointer;background:none;border:none;}
.nav-links{display:flex;gap:2.5rem;list-style:none;position:relative;}
.nav-links button{font-family:var(--font-label);font-size:.6rem;letter-spacing:.35em;font-weight:500;text-transform:uppercase;color:var(--ash);background:none;border:none;cursor:pointer;transition:color .3s;position:relative;padding:0;}
.nav-links button::after{content:'';position:absolute;bottom:-3px;left:0;right:0;height:1px;background:var(--ember);transform:scaleX(0);transition:transform .3s;}
.nav-links button:hover{color:var(--gilt);}
.nav-links button:hover::after{transform:scaleX(1);}

/* HERO */
.hero{position:relative;min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:8rem 2rem 5rem;overflow:hidden;}
.hero-bg{position:absolute;inset:0;background:radial-gradient(ellipse 50% 40% at 50% 100%,rgba(191,63,16,.35) 0%,transparent 70%),radial-gradient(ellipse 80% 60% at 30% 60%,rgba(191,63,16,.05) 0%,transparent 60%),linear-gradient(to bottom,var(--void) 0%,#070b10 60%,#0e0808 100%);}
.hero-vignette{position:absolute;inset:0;background:radial-gradient(ellipse 100% 100% at 50% 50%,transparent 40%,rgba(4,6,10,.7) 100%);}
.hero-horizon{position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(to right,transparent 0%,var(--ember) 30%,var(--flare) 50%,var(--ember) 70%,transparent 100%);opacity:.6;filter:blur(1px);box-shadow:0 0 20px var(--ember),0 0 60px rgba(191,63,16,.3);}
.hero-eyebrow{font-family:var(--font-label);font-size:.55rem;letter-spacing:.6em;font-weight:400;text-transform:uppercase;color:var(--ember);margin-bottom:2rem;position:relative;display:flex;align-items:center;gap:1rem;animation:rise 1s ease both;}
.hero-eyebrow::before{content:'';display:block;width:50px;height:1px;background:linear-gradient(to right,transparent,var(--ember));opacity:.7;}
.hero-eyebrow::after{content:'';display:block;width:50px;height:1px;background:linear-gradient(to left,transparent,var(--ember));opacity:.7;}
.hero-name{font-family:var(--font-myth);font-size:clamp(3.5rem,9vw,8.5rem);font-weight:300;line-height:.88;color:transparent;background:linear-gradient(160deg,var(--parch) 0%,var(--gilt) 40%,var(--flare) 65%,var(--ember) 100%);-webkit-background-clip:text;background-clip:text;filter:drop-shadow(0 0 40px rgba(224,96,32,.3));animation:rise 1.2s ease .2s both;letter-spacing:.06em;}
.hero-rule{width:120px;height:1px;background:linear-gradient(to right,transparent,var(--gold),transparent);margin:1.2rem auto;opacity:.5;}
.hero-tagline{font-family:var(--font-body);font-style:italic;font-size:clamp(1.1rem,2.2vw,1.45rem);font-weight:400;color:var(--ash);max-width:520px;margin:0 auto 2.5rem;line-height:1.65;animation:rise 1.2s ease .7s both;}
.hero-btns{display:flex;gap:1rem;justify-content:center;flex-wrap:wrap;animation:rise 1.2s ease .9s both;}
.btn-fire{padding:.9rem 2.4rem;background:linear-gradient(135deg,rgba(191,63,16,.2),rgba(191,63,16,.05));border:1px solid rgba(191,63,16,.5);color:var(--flare);font-family:var(--font-label);font-size:.58rem;letter-spacing:.35em;font-weight:500;text-transform:uppercase;cursor:pointer;transition:all .35s;display:inline-block;position:relative;}
.btn-fire:hover{box-shadow:0 0 30px rgba(191,63,16,.25),inset 0 0 20px rgba(191,63,16,.05);border-color:var(--flame);}
.btn-gilt{padding:.9rem 2.4rem;background:transparent;border:1px solid rgba(192,144,64,.25);color:var(--gold);font-family:var(--font-label);font-size:.58rem;letter-spacing:.35em;font-weight:500;text-transform:uppercase;cursor:pointer;transition:all .35s;}
.btn-gilt:hover{border-color:var(--gilt);color:var(--gilt);background:rgba(192,144,64,.05);}
.scroll-down{position:absolute;bottom:2.5rem;left:50%;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;gap:.5rem;animation:rise 1s ease 1.5s both;}
.scroll-down span{font-family:var(--font-head);font-size:.5rem;letter-spacing:.4em;text-transform:uppercase;color:var(--ash);opacity:.4;}
.scroll-chevron{animation:bob 2s ease-in-out infinite;color:var(--ember);opacity:.5;font-size:.8rem;cursor:pointer;background:none;border:none;}
@keyframes bob{0%,100%{transform:translateY(0);}50%{transform:translateY(5px);}}
@keyframes rise{from{opacity:0;transform:translateY(20px);}to{opacity:1;transform:translateY(0);}}

.smoke-divide{position:relative;height:100px;overflow:hidden;pointer-events:none;}
.smoke-divide::before{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 0%,rgba(10,14,20,.95) 100%);}
.smoke-divide::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 60% 100% at 50% 100%,rgba(191,63,16,.07) 0%,transparent 70%);}

section{padding:8rem 2rem;position:relative;}
.si{max-width:1200px;margin:0 auto;}
.slabel{display:inline-flex;align-items:center;gap:.75rem;font-family:var(--font-label);font-size:.52rem;letter-spacing:.55em;font-weight:500;text-transform:uppercase;color:var(--ember);margin-bottom:1.2rem;}
.slabel-line{width:40px;height:1px;background:var(--ember);opacity:.5;}
.stitle{font-family:var(--font-head);font-size:clamp(2rem,4.5vw,3.8rem);font-weight:600;color:var(--parch);line-height:1.05;margin-bottom:1.5rem;letter-spacing:.02em;}

/* BOOKS */
#books{background:var(--deep);}
#books::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(to right,transparent,rgba(191,63,16,.3),transparent);}
.books-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:0;margin-top:5rem;position:relative;}
.books-grid::before{content:'';position:absolute;inset:0;border:1px solid rgba(192,144,64,.07);pointer-events:none;z-index:1;}
.bcard{position:relative;padding:3rem 2.2rem 2.5rem;background:var(--shadow);border-right:1px solid rgba(192,144,64,.06);overflow:hidden;transition:background .5s;}
.bcard:last-child{border-right:none;}
.bcard::before{content:'';position:absolute;top:0;left:-100%;right:-100%;height:2px;background:linear-gradient(90deg,transparent 0%,var(--ember) 40%,var(--flare) 50%,var(--ember) 60%,transparent 100%);animation:scan 3s linear infinite;opacity:0;transition:opacity .4s;}
.bcard::after{content:'';position:absolute;inset:0;background:radial-gradient(ellipse 80% 60% at 50% 0%,rgba(191,63,16,.09) 0%,transparent 70%);opacity:0;transition:opacity .5s;}
.bcard:hover{background:#141c26;}
.bcard:hover::before{opacity:1;}
.bcard:hover::after{opacity:1;}
@keyframes scan{from{transform:translateX(-30%);}to{transform:translateX(30%);}}
.bnum{font-family:var(--font-myth);font-size:5rem;color:rgba(192,144,64,.06);position:absolute;top:1rem;right:1.5rem;line-height:1;user-select:none;transition:color .4s;}
.bcard:hover .bnum{color:rgba(192,144,64,.1);}
.bgenre{font-family:var(--font-label);font-size:.5rem;letter-spacing:.4em;font-weight:500;text-transform:uppercase;color:var(--ember);margin-bottom:1.5rem;display:flex;align-items:center;gap:.5rem;}
.bdot{width:3px;height:3px;border-radius:50%;background:var(--ember);}
.bicon{font-size:2.2rem;margin-bottom:1rem;display:block;filter:drop-shadow(0 0 12px rgba(224,96,32,.4));}
.btitle{font-family:var(--font-myth);font-size:1.6rem;font-weight:500;color:var(--parch);margin-bottom:.3rem;line-height:1.1;letter-spacing:.03em;}
.bsub{font-family:var(--font-body);font-style:italic;color:var(--gold);font-size:1rem;font-weight:400;margin-bottom:1.2rem;}
.bblurb{font-size:1rem;color:var(--smoke);line-height:1.8;margin-bottom:1.5rem;}
.bbadge{display:block;width:fit-content;padding:.28rem .8rem;border:1px solid rgba(138,154,170,.15);font-family:var(--font-label);font-size:.48rem;letter-spacing:.25em;font-weight:500;text-transform:uppercase;color:var(--ash);margin-bottom:1.5rem;}

/* BOOK LINKS */
.book-links{display:flex;gap:.6rem;margin-bottom:1.2rem;flex-wrap:wrap;}
.book-link{display:inline-flex;align-items:center;gap:.4rem;padding:.35rem .9rem;font-family:var(--font-label);font-size:.52rem;letter-spacing:.22em;font-weight:500;text-transform:uppercase;text-decoration:none;cursor:pointer;transition:all .25s;}
.book-link.amazon{background:rgba(255,153,0,.1);border:1px solid rgba(255,153,0,.25);color:#f90;}
.book-link.amazon:hover{background:rgba(255,153,0,.2);border-color:rgba(255,153,0,.5);}
.book-link.goodreads{background:rgba(57,110,63,.1);border:1px solid rgba(57,110,63,.3);color:#7cc47e;}
.book-link.goodreads:hover{background:rgba(57,110,63,.2);border-color:rgba(57,110,63,.5);}

/* FEEDBACK */
.feedback-toggle{display:inline-flex;align-items:center;gap:.4rem;padding:.35rem .9rem;font-family:var(--font-label);font-size:.52rem;letter-spacing:.22em;font-weight:500;text-transform:uppercase;cursor:pointer;transition:all .25s;border:1px solid rgba(192,144,64,.2);background:transparent;color:var(--gold);}
.feedback-toggle:hover{background:rgba(192,144,64,.08);border-color:var(--gold);}
.feedback-panel{margin-top:1.2rem;background:rgba(0,0,0,.3);border:1px solid rgba(192,144,64,.1);padding:1.2rem;animation:rise .3s ease both;}
.feedback-panel h4{font-family:var(--font-label);font-size:.65rem;letter-spacing:.25em;font-weight:600;text-transform:uppercase;color:var(--gilt);margin-bottom:1rem;}
.stars{display:flex;gap:.3rem;margin-bottom:.8rem;}
.star{font-size:1.2rem;cursor:pointer;transition:transform .15s;line-height:1;background:none;border:none;}
.star:hover{transform:scale(1.2);}
.feedback-input{width:100%;background:rgba(0,0,0,.4);border:1px solid rgba(138,154,170,.15);padding:.6rem .8rem;color:var(--smoke);font-family:var(--font-body);font-size:1rem;outline:none;resize:none;margin-bottom:.6rem;transition:border-color .3s;}
.feedback-input:focus{border-color:rgba(192,144,64,.35);}
.feedback-name-input{width:100%;background:rgba(0,0,0,.4);border:1px solid rgba(138,154,170,.15);padding:.5rem .8rem;color:var(--smoke);font-family:var(--font-body);font-size:1rem;outline:none;margin-bottom:.6rem;transition:border-color .3s;}
.feedback-name-input:focus{border-color:rgba(192,144,64,.35);}
.feedback-submit{padding:.5rem 1.2rem;background:rgba(191,63,16,.15);border:1px solid rgba(191,63,16,.35);color:var(--flare);font-family:var(--font-label);font-size:.52rem;letter-spacing:.22em;font-weight:500;text-transform:uppercase;cursor:pointer;transition:all .25s;}
.feedback-submit:hover{background:rgba(191,63,16,.28);}
.feedback-submit:disabled{opacity:.4;cursor:not-allowed;}
.feedback-thanks{font-style:italic;color:var(--gold);font-size:1rem;padding:.5rem 0;}
.reviews-list{margin-top:1rem;border-top:1px solid rgba(192,144,64,.1);padding-top:1rem;display:flex;flex-direction:column;gap:.8rem;max-height:200px;overflow-y:auto;}
.review-item{padding:.6rem .8rem;background:rgba(0,0,0,.2);border-left:2px solid rgba(192,144,64,.2);}
.review-meta{display:flex;align-items:center;gap:.6rem;margin-bottom:.3rem;flex-wrap:wrap;}
.review-name{font-family:var(--font-head);font-size:.6rem;letter-spacing:.1em;color:var(--gilt);}
.review-stars{font-size:.75rem;}
.review-date{font-size:.65rem;color:var(--ash);opacity:.5;margin-left:auto;}
.review-text{font-size:.85rem;color:var(--ash);font-style:italic;line-height:1.5;}
.no-reviews{font-style:italic;color:var(--ash);font-size:.85rem;opacity:.6;margin-top:.8rem;}

/* ORACLE */
#oracle{background:var(--void);}
#oracle::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(to right,transparent,rgba(192,144,64,.2),transparent);}
.oracle-layout{display:grid;grid-template-columns:1fr 1.8fr;gap:6rem;align-items:start;margin-top:3rem;}
.oracle-lore{position:sticky;top:6rem;}
.oracle-lore p{font-style:italic;color:var(--ash);font-size:.95rem;line-height:1.8;margin-bottom:1.2rem;}
.osigil{width:80px;height:80px;border:1px solid rgba(192,144,64,.2);border-radius:50%;display:flex;align-items:center;justify-content:center;margin-bottom:2rem;position:relative;}
.osigil::before{content:'';position:absolute;inset:-4px;border:1px solid rgba(192,144,64,.08);border-radius:50%;}
.osigil-icon{font-size:2rem;filter:drop-shadow(0 0 10px rgba(192,144,64,.4));}
.obox{background:var(--shadow);border:1px solid rgba(192,144,64,.1);position:relative;}
.obox::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(to right,transparent,var(--gold),transparent);opacity:.3;}
.obox-inner{padding:2.5rem;}
.oquiz-q{font-family:var(--font-body);font-style:italic;color:var(--parch);font-size:1.15rem;margin-bottom:1.2rem;padding-left:1rem;border-left:2px solid rgba(192,144,64,.25);line-height:1.75;animation:rise .4s ease both;}
.oquiz-progress{font-family:var(--font-label);font-size:.5rem;letter-spacing:.5em;font-weight:500;text-transform:uppercase;color:var(--ash);opacity:.5;margin-bottom:1rem;}
.oquiz-choices{display:flex;flex-direction:column;gap:.5rem;animation:rise .4s ease .1s both;}
.oquiz-choice{padding:.7rem 1.2rem;border:1px solid rgba(192,144,64,.2);background:transparent;color:var(--gilt);font-family:var(--font-body);font-style:italic;font-size:1rem;cursor:pointer;transition:all .25s;text-align:left;line-height:1.5;}
.oquiz-choice:hover{background:rgba(192,144,64,.08);border-color:var(--gold);padding-left:1.7rem;}
.oresult{animation:rise .5s ease both;}
.oresult-eyebrow{font-family:var(--font-label);font-size:.52rem;letter-spacing:.5em;font-weight:500;text-transform:uppercase;color:var(--ember);margin-bottom:.8rem;}
.oresult-book{font-family:var(--font-myth);font-size:1.7rem;font-weight:400;color:var(--gilt);margin-bottom:.7rem;text-shadow:0 0 20px rgba(192,144,64,.3);letter-spacing:.04em;}
.oresult-text{font-style:italic;color:var(--parch);font-size:1.05rem;line-height:1.75;margin-bottom:.6rem;padding-left:1rem;border-left:2px solid rgba(191,63,16,.35);}
.oresult-also{font-style:italic;color:var(--ash);font-size:.95rem;margin-bottom:1.5rem;}
.oquiz-restart{font-family:var(--font-label);font-size:.5rem;letter-spacing:.35em;font-weight:500;text-transform:uppercase;color:var(--ash);opacity:.5;cursor:pointer;background:none;border:none;transition:opacity .2s;display:block;}
.oquiz-restart:hover{opacity:1;}
.ostart-text{font-style:italic;color:var(--ash);font-size:1.05rem;margin-bottom:2rem;line-height:1.75;text-align:center;}

/* ABOUT */
#about{background:var(--deep);}
#about::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(to right,transparent,rgba(191,63,16,.2),transparent);}
.about-layout{display:grid;grid-template-columns:1.6fr 1fr;gap:6rem;align-items:center;margin-top:3rem;}
.about-text p{color:var(--smoke);font-size:1.1rem;margin-bottom:1.3rem;line-height:1.85;}
.about-text p:first-child{font-size:1.2rem;color:var(--parch);}
.about-art{aspect-ratio:.8;background:var(--shadow);border:1px solid rgba(192,144,64,.08);display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;}
.about-art::before{content:'';position:absolute;inset:0;background:radial-gradient(ellipse at 50% 80%,rgba(191,63,16,.15) 0%,transparent 70%);}
.about-art::after{content:'';position:absolute;bottom:0;left:0;right:0;height:2px;background:linear-gradient(to right,transparent,var(--ember),transparent);opacity:.5;}
.monogram{font-family:var(--font-myth);font-size:9rem;font-weight:300;color:rgba(192,144,64,.08);line-height:1;user-select:none;position:relative;}

footer{padding:4rem 2rem;text-align:center;border-top:1px solid rgba(192,144,64,.06);background:var(--void);position:relative;}
footer::before{content:'';position:absolute;top:0;left:25%;right:25%;height:1px;background:linear-gradient(to right,transparent,rgba(192,144,64,.2),transparent);}
.footer-name{font-family:var(--font-myth);font-size:2rem;font-weight:300;color:rgba(192,144,64,.15);margin-bottom:1rem;letter-spacing:.06em;}
.footer-copy{font-family:var(--font-label);font-size:.5rem;letter-spacing:.4em;font-weight:400;text-transform:uppercase;color:var(--ash);opacity:.3;}

@media(max-width:900px){
  .books-grid{grid-template-columns:1fr;}
  .bcard{border-right:none;border-bottom:1px solid rgba(192,144,64,.06);}
  .oracle-layout{grid-template-columns:1fr;gap:3rem;}
  .oracle-lore{position:static;}
  .about-layout{grid-template-columns:1fr;gap:3rem;}
  .about-art{display:none;}
  nav{padding:1.2rem 1.5rem;}
  .nav-links{gap:1.5rem;}
}
@media(max-width:480px){
  .hero-name{font-size:2.8rem;}
  .hero-btns{flex-direction:column;align-items:center;}
  .book-links{flex-direction:column;}
}
`;

// ── Ember Canvas ──────────────────────────────────────────────────────────────
function EmberCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W, H, raf;
    const particles = [];
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    const spawn = () => particles.push({
      x: Math.random() * W, y: H + 10,
      vx: (Math.random() - .5) * .8,
      vy: -(0.4 + Math.random() * .8),
      life: 1, decay: .003 + Math.random() * .004,
      size: 1 + Math.random() * 1.5,
      flicker: Math.random() * Math.PI * 2,
    });
    let t = 0;
    const loop = () => {
      ctx.clearRect(0, 0, W, H);
      if (++t % 4 === 0) spawn();
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx + Math.sin(p.flicker) * .3;
        p.y += p.vy;
        p.life -= p.decay;
        p.flicker += .08;
        if (p.life <= 0) { particles.splice(i, 1); continue; }
        const a = p.life * .8;
        const r = p.size * (.8 + Math.sin(p.flicker) * .2);
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 3);
        g.addColorStop(0, `rgba(240,144,64,${a})`);
        g.addColorStop(.4, `rgba(224,96,32,${a * .6})`);
        g.addColorStop(1, `rgba(191,63,16,0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);
  return <canvas ref={ref} id="ec" />;
}

// ── Custom Cursor ─────────────────────────────────────────────────────────────
function Cursor() {
  const outer = useRef(null), inner = useRef(null);
  const pos = useRef({ x: 0, y: 0 }), target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const mv = e => { target.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener("mousemove", mv);
    let raf;
    const tick = () => {
      pos.current.x += (target.current.x - pos.current.x) * .15;
      pos.current.y += (target.current.y - pos.current.y) * .15;
      if (outer.current) {
        outer.current.style.left = pos.current.x + "px";
        outer.current.style.top = pos.current.y + "px";
      }
      if (inner.current) {
        inner.current.style.left = target.current.x + "px";
        inner.current.style.top = target.current.y + "px";
      }
      raf = requestAnimationFrame(tick);
    };
    tick();
    return () => {
      window.removeEventListener("mousemove", mv);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (<><div ref={outer} className="cur-o" /><div ref={inner} className="cur-i" /></>);
}

// ── Scroll helper ─────────────────────────────────────────────────────────────
const scrollTo = (id) =>
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

// ── Books ─────────────────────────────────────────────────────────────────────
const BOOKS = [
  {
    id: "scoot",
    num: "I",
    genre: "YA · Dark Fantasy",
    icon: "⚔️",
    title: "Scoot & the Death Knight",
    sub: "An Ongoing Series",
    blurb: "A young hero, a cursed warrior, a world where death is not the end — only the beginning of harder questions. Dark, funny, and full of heart.",
    badge: "YA · Teen & Up",
    amazon: "https://www.amazon.com/dp/B0G3QMYYH8",
    goodreads: "https://www.goodreads.com/book/show/250808437-scoot-and-the-death-knight-volume-one",
  },
  {
    id: "legacy",
    num: "II",
    genre: "Dark Fantasy · Greek Myth",
    icon: "⚡",
    title: "Legacy of the Storm",
    sub: "A Perseus Retelling",
    blurb: "A brutal reimagining of the Perseus myth. Monsters are not born in the sea — they are made by gods, by pride, and by the silence of those who could have spoken.",
    badge: "Adult Readers",
    amazon: "https://www.amazon.com/dp/B0G2JX1X5H",
    goodreads: "https://www.goodreads.com/book/show/250810191-legacy-of-the-storm-book-one",
  },
  {
    id: "ash",
    num: "III",
    genre: "Dark Fantasy · Short Fiction",
    icon: "🔥",
    title: "Ash & Ember",
    sub: "A Chronicle of a Dying Age",
    blurb: "Five stories bound by a mythology of Four Fires. The Scribe of Cinders writes from the wreckage. Every tale burns differently — but all of them leave a mark.",
    badge: "Adult Readers",
    amazon: "https://www.amazon.com/dp/B0D7P3FR2F",
    goodreads: "https://www.goodreads.com/book/show/250811317-ash-ember-a-chronicle-of-a-dying-age-volume-one",
  },
];

// ── Feedback ──────────────────────────────────────────────────────────────────
const getReviews = (bookId) => {
  try {
    const stored = localStorage.getItem(`pb_reviews_${bookId}`);
    return stored ? JSON.parse(stored) : [];
  } catch { return []; }
};

const saveReviews = (bookId, reviews) => {
  try {
    localStorage.setItem(`pb_reviews_${bookId}`, JSON.stringify(reviews));
    return true;
  } catch { return false; }
};

function FeedbackPanel({ bookId }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);

  const handleOpen = () => {
    if (!open) setReviews(getReviews(bookId));
    setOpen(o => !o);
  };

  const submit = () => {
    if (!rating || !text.trim()) return;
    const entry = {
      name: name.trim() || "A Reader",
      rating,
      text: text.trim(),
      date: new Date().toLocaleDateString("en-GB", { month: "short", year: "numeric" }),
    };
    const updated = [entry, ...reviews];
    saveReviews(bookId, updated);
    setReviews(updated);
    setSubmitted(true);
    setName(""); setRating(0); setText("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <>
      <button className="feedback-toggle" onClick={handleOpen}>
        ✦ {open ? "Close" : "Leave Feedback"}
      </button>
      {open && (
        <div className="feedback-panel">
          <h4>Share Your Thoughts</h4>
          {submitted ? (
            <div className="feedback-thanks">Thank you — your words have been received.</div>
          ) : (
            <>
              <input
                className="feedback-name-input"
                placeholder="Your name (optional)"
                value={name}
                onChange={e => setName(e.target.value)}
              />
              <div className="stars">
                {[1, 2, 3, 4, 5].map(n => (
                  <button
                    key={n} className="star"
                    onMouseEnter={() => setHover(n)}
                    onMouseLeave={() => setHover(0)}
                    onClick={() => setRating(n)}
                  >
                    {n <= (hover || rating) ? "★" : "☆"}
                  </button>
                ))}
              </div>
              <textarea
                className="feedback-input"
                rows={3}
                placeholder="What did you think? Read it, want to read it, or just have thoughts…"
                value={text}
                onChange={e => setText(e.target.value)}
              />
              <button
                className="feedback-submit"
                onClick={submit}
                disabled={!rating || !text.trim()}
              >
                Submit
              </button>
            </>
          )}
          {reviews.length > 0 && (
            <div className="reviews-list">
              {reviews.map((r, i) => (
                <div key={i} className="review-item">
                  <div className="review-meta">
                    <span className="review-name">{r.name}</span>
                    <span className="review-stars">{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</span>
                    <span className="review-date">{r.date}</span>
                  </div>
                  <div className="review-text">{r.text}</div>
                </div>
              ))}
            </div>
          )}
          {reviews.length === 0 && !submitted && (
            <div className="no-reviews">No entries yet — be the first.</div>
          )}
        </div>
      )}
    </>
  );
}

// ── Oracle Quiz ───────────────────────────────────────────────────────────────
const QUIZ = [
  {
    q: "When you imagine the perfect opening scene, where does it begin?",
    choices: [
      { label: "A storm-struck sea, a monster rising", score: { legacy: 3, ash: 1, scoot: 1 } },
      { label: "A fire dying at the edge of a ruined world", score: { legacy: 1, ash: 3, scoot: 0 } },
      { label: "A crossroads, a young stranger, a wrong turn", score: { legacy: 0, ash: 1, scoot: 3 } },
      { label: "Somewhere ancient — gods, myths, old debts", score: { legacy: 3, ash: 2, scoot: 0 } },
    ],
  },
  {
    q: "What do you want most from a dark story?",
    choices: [
      { label: "Epic scale — myth, fate, the weight of destiny", score: { legacy: 3, ash: 1, scoot: 0 } },
      { label: "Strange worlds with deep, unusual rules", score: { legacy: 1, ash: 3, scoot: 1 } },
      { label: "A hero I can root for against impossible odds", score: { legacy: 1, ash: 0, scoot: 3 } },
      { label: "Something short, sharp, and unforgettable", score: { legacy: 0, ash: 3, scoot: 1 } },
    ],
  },
  {
    q: "How long are you willing to linger in the dark?",
    choices: [
      { label: "As long as it takes — give me the full epic", score: { legacy: 3, ash: 0, scoot: 1 } },
      { label: "A few hours — I like my darkness in doses", score: { legacy: 0, ash: 3, scoot: 1 } },
      { label: "Long enough to care, short enough to want more", score: { legacy: 1, ash: 1, scoot: 3 } },
    ],
  },
];

const RESULTS = {
  legacy: {
    title: "Legacy of the Storm",
    blurb: "You want myth with weight — gods who wound and heroes who bleed. Begin with the Perseus retelling.",
    also: "If you want a second world: Ash & Ember.",
  },
  ash: {
    title: "Ash & Ember",
    blurb: "You're drawn to strange, dying worlds and prose that burns. The anthology is where you belong.",
    also: "If you want a second world: Legacy of the Storm.",
  },
  scoot: {
    title: "Scoot & the Death Knight",
    blurb: "You want a hero to believe in and a journey with heart beneath the dark. Start with Scoot.",
    also: "If you want a second world: Ash & Ember.",
  },
};

function OracleQuiz() {
  const [step, setStep] = useState(-1);
  const [scores, setScores] = useState({ legacy: 0, ash: 0, scoot: 0 });
  const [result, setResult] = useState(null);

  const choose = (choice) => {
    const s = {
      legacy: scores.legacy + choice.score.legacy,
      ash: scores.ash + choice.score.ash,
      scoot: scores.scoot + choice.score.scoot,
    };
    setScores(s);
    const next = step + 1;
    if (next >= QUIZ.length) {
      const winner = Object.entries(s).sort((a, b) => b[1] - a[1])[0][0];
      setResult(winner);
    } else {
      setStep(next);
    }
  };

  const reset = () => {
    setStep(-1);
    setScores({ legacy: 0, ash: 0, scoot: 0 });
    setResult(null);
  };

  if (result) {
    const r = RESULTS[result];
    return (
      <div className="obox">
        <div className="obox-inner">
          <div className="oresult">
            <div className="oresult-eyebrow">The Oracle speaks</div>
            <div className="oresult-book">{r.title}</div>
            <p className="oresult-text">{r.blurb}</p>
            <p className="oresult-also">{r.also}</p>
            <button className="oquiz-restart" onClick={reset}>↺ Consult Again</button>
          </div>
        </div>
      </div>
    );
  }

  if (step === -1) {
    return (
      <div className="obox">
        <div className="obox-inner">
          <p className="ostart-text">
            Three worlds. Three doors.<br />
            Answer three questions and the Oracle will find yours.
          </p>
          <div style={{ textAlign: "center" }}>
            <button className="btn-fire" onClick={() => setStep(0)}>✦ Consult the Oracle</button>
          </div>
        </div>
      </div>
    );
  }

  const q = QUIZ[step];
  return (
    <div className="obox">
      <div className="obox-inner">
        <div className="oquiz-progress">Question {step + 1} of {QUIZ.length}</div>
        <div className="oquiz-q">{q.q}</div>
        <div className="oquiz-choices">
          {q.choices.map((c, i) => (
            <button key={i} className="oquiz-choice" onClick={() => choose(c)}>
              {c.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  return (
    <>
      <style>{CSS}</style>
      <EmberCanvas />
      <Cursor />

      <nav>
        <button className="nav-brand" onClick={() => scrollTo("hero")}>Peter Brendan</button>
        <ul className="nav-links">
          <li><button onClick={() => scrollTo("books")}>Works</button></li>
          <li><button onClick={() => scrollTo("oracle")}>Oracle</button></li>
          <li><button onClick={() => scrollTo("about")}>About</button></li>
        </ul>
      </nav>

      {/* HERO */}
      <div className="hero" id="hero">
        <div className="hero-bg" />
        <div className="hero-vignette" />
        <div className="hero-horizon" />
        <div className="hero-eyebrow"><span>Dark Fantasy · Myth · Fire</span></div>
        <h1 className="hero-name">Peter Brendan</h1>
        <div className="hero-rule" />
        <p className="hero-tagline">
          Stories forged at the edge of myth and shadow.<br />
          Some worlds must burn before they can be understood.
        </p>
        <div className="hero-btns">
          <button className="btn-fire" onClick={() => scrollTo("books")}>✦ The Works</button>
          <button className="btn-gilt" onClick={() => scrollTo("oracle")}>Find Your Story</button>
        </div>
        <div className="scroll-down">
          <span>Descend</span>
          <button className="scroll-chevron" onClick={() => scrollTo("books")}>▾</button>
        </div>
      </div>

      <div className="smoke-divide" />

      {/* BOOKS */}
      <section id="books">
        <div className="si">
          <div className="slabel"><div className="slabel-line" />The Works</div>
          <h2 className="stitle">Three Worlds.<br />One Burning Thread.</h2>
          <div className="books-grid">
            {BOOKS.map(b => (
              <div key={b.id} className="bcard">
                <div className="bnum">{b.num}</div>
                <div className="bgenre"><span className="bdot" />{b.genre}</div>
                <span className="bicon">{b.icon}</span>
                <h3 className="btitle">{b.title}</h3>
                <div className="bsub">{b.sub}</div>
                <p className="bblurb">{b.blurb}</p>
                <span className="bbadge">{b.badge}</span>
                <div className="book-links">
                  <a className="book-link amazon" href={b.amazon} target="_blank" rel="noopener noreferrer">
                    📦 Amazon
                  </a>
                  <a className="book-link goodreads" href={b.goodreads} target="_blank" rel="noopener noreferrer">
                    📗 Goodreads
                  </a>
                </div>
                <FeedbackPanel bookId={b.id} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ORACLE */}
      <section id="oracle">
        <div className="si">
          <div className="oracle-layout">
            <div className="oracle-lore">
              <div className="slabel"><div className="slabel-line" />The Oracle</div>
              <h2 className="stitle">Where Does<br />Your Journey Begin?</h2>
              <div className="osigil"><span className="osigil-icon">🔮</span></div>
              <p>Three questions. Three doors. The Oracle finds the world that was waiting for you.</p>
              <p>No matter which door you enter, the ember burns at the end.</p>
            </div>
            <OracleQuiz />
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about">
        <div className="si">
          <div className="about-layout">
            <div className="about-text">
              <div className="slabel"><div className="slabel-line" />The Author</div>
              <h2 className="stitle">Writing at the Edge<br />of Myth & Shadow</h2>
              <p>
                Peter Brendan was born in Zimbabwe and came home to Goa, where he lives with his
                extremely patient wife, their highly inquisitive young son, and are looked after
                by two dogs and two cats of irreconcilably different temperaments.
              </p>
              <p>
                Shaped by Le Guin, Zelazny, and the lore of Warcraft and Warhammer, he writes dark
                fantasy believing that no matter how grim the journey, there is always a sliver of
                hope to pull us through.
              </p>
            </div>
            <div className="about-art">
              <div className="monogram">PB</div>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-name">Peter Brendan</div>
        <p className="footer-copy">© {new Date().getFullYear()} · All Rights Reserved · Forged in Fire</p>
      </footer>
    </>
  );
}
