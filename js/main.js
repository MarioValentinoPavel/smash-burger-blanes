/* Smash Burger — plano técnico: despiece → la prensa aplasta la carne → montaje → listo para servir */
gsap.registerPlugin(ScrollTrigger);
const $ = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const NS = 'http://www.w3.org/2000/svg';

const layers = $$('.layer'), patty = $('.patty'), press = $('#press'), splat = $('#splat');
const labels = $$('.layer .lead, .layer .lab, .layer .dim');
const others = layers.filter(l => l !== patty);
const ASSEMBLE = [150, 128, 92, 50, 12, -44, -80, -124];

// salpicaduras (deterministas para que el scroll sea reversible)
const drops = Array.from({ length: 16 }, (_, i) => {
  const c = document.createElementNS(NS, 'circle');
  c.setAttribute('cx', 330); c.setAttribute('cy', 462); c.setAttribute('r', 4 + (i % 4) * 2);
  c.setAttribute('fill', i % 3 ? '#6b3a22' : '#ffb400'); c.setAttribute('opacity', 0);
  splat.appendChild(c);
  const a = (i / 16) * Math.PI * 2 + (i % 2) * .2, d = 120 + (i * 37) % 110;
  return { c, x: Math.cos(a) * d * 1.6, y: Math.sin(a) * d * .7 };
});

gsap.set(press, { y: -220 });
const step = t => () => { $('#step').textContent = t; };
const tl = gsap.timeline({ scrollTrigger: { trigger: '.plano__pin', start: 'top top', end: '+=260%', scrub: 1, pin: true } });
tl.add(step('01 · Despiece'))
  .to(others, { opacity: .22, duration: .6 }, .3)
  .to(labels, { opacity: .15, duration: .6 }, .3)
  .add(step('02 · Smash en la plancha'), .9)
  .to(press, { y: 422, duration: .7, ease: 'power4.in' }, .9)
  .to(patty, { scaleX: 1.2, scaleY: .6, transformOrigin: '50% 100%', duration: .15, ease: 'power2.out' }, 1.6)
  .to('#burger', { x: 12, duration: .05, yoyo: true, repeat: 5, ease: 'none' }, 1.6)
  .fromTo('#boom', { scale: 0, rotation: -12 }, { scale: 1, rotation: -6, duration: .3, ease: 'back.out(3)' }, 1.6)
  .to('#boom', { opacity: 0, duration: .3 }, 2.2);
drops.forEach(d => tl.fromTo(d.c, { attr: { opacity: 1 }, x: 0, y: 0 }, { x: d.x, y: d.y, attr: { opacity: 0 }, duration: .6, ease: 'power2.out' }, 1.62));
tl.to(press, { y: -300, duration: .6, ease: 'power2.in' }, 2.1)
  .add(step('03 · Montaje'), 2.5)
  .to(others, { opacity: 1, duration: .4 }, 2.5)
  .to(layers, { y: i => ASSEMBLE[i], duration: 1, ease: 'power3.inOut' }, 2.6)
  .to(labels, { opacity: 0, duration: .4 }, 2.6)
  .add(step('04 · Listo para servir'), 3.6)
  .to('#burger', { scale: 1.12, transformOrigin: '50% 60%', duration: .6, ease: 'back.out(1.6)' }, 3.6);

/* ---------- entrada ---------- */
gsap.timeline({ delay: .2 })
  .from('.hero__title', { y: 80, opacity: 0, duration: 1, ease: 'expo.out' })
  .from(['.hero .tag', '.hero__lead', '.hero__row'], { y: 24, opacity: 0, duration: .7, stagger: .08 }, '<.2')
  .from('.hero__img', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'expo.inOut' }, '<')
  .from('.titleblock', { opacity: 0, x: 30, duration: .6 }, '-=.4');

$$('.head, .sheet, .drinks__col, .terraza__txt, .reviews blockquote, .visita > *').forEach(n => gsap.from(n, { y: 50, opacity: 0, duration: 1, ease: 'expo.out', clearProps: 'transform,opacity', scrollTrigger: { trigger: n, start: 'top 88%', once: true } }));
