/* ══════════════════════════════════════════════════════════════════
   REGALO PARA MAMÁ — LÓGICA PRINCIPAL
   ══════════════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

/* ══════════════════════════════════════════════════════════════════
   ⚙️  CONFIGURACIÓN — ✏️ EDITA SOLO ESTE BLOQUE
   ══════════════════════════════════════════════════════════════════ */
const CONFIG = {
  PASSWORD: "amor",   // ← CAMBIA ESTO
  WARNING_MSG: "¡Ey! No hagas trampa, esto es solo para mamá 😄",
  TIMINGS: { UNLOCK: 700, CONFETTI_DELAY: 420, SHAKE: 850, TOAST: 3200 }
};

/* ══════════════════════════════════════════════════════════════════
   🖼️  ÁLBUM — FOTOS POR CATEGORÍA
   ──────────────────────────────────────────────────────────────────
   • Agrega o quita rutas en cada array.
   • Para más fotos simplemente añade líneas siguiendo el patrón.
   • Formatos soportados: .jpg .jpeg .png .webp .gif
   ══════════════════════════════════════════════════════════════════ */

const CATEGORY_META = {
  mami:       { emoji: '👩',        label: 'Mamá'       },
  mamita:     { emoji: '💕',        label: 'Mamita'     },
  hermanitos: { emoji: '👨‍👩‍👧‍👦', label: 'Hermanitos' },
  lostres:    { emoji: '👨‍👩‍👧',  label: 'Los Tres'   },
  tin:        { emoji: '🎭',        label: 'Tin'        },
  tita:       { emoji: '✨',        label: 'Tita'       }
};

const ALBUM_PHOTOS = {

  mami: [
    'fotos/mami1.jpg',  'fotos/mami2.jpg',  'fotos/mami3.jpg',
    'fotos/mami4.jpg',  'fotos/mami5.jpg',  'fotos/mami6.jpg',
    'fotos/mami7.jpg',  'fotos/mami8.jpg',  'fotos/mami9.jpg',
    'fotos/mami10.jpg', 'fotos/mami11.jpg', 'fotos/mami12.jpg',
    'fotos/mami13.jpg', 'fotos/mami14.jpg', 'fotos/mami15.jpg'
  ],

  mamita: [
    'fotos/mamita1.jpg', 'fotos/mamita2.jpg'
  ],

  hermanitos: [
    'fotos/hermanitos1.jpg',  'fotos/hermanitos2.jpg',  'fotos/hermanitos3.jpg',
    'fotos/hermanitos4.jpg',  'fotos/hermanitos5.jpg',  'fotos/hermanitos6.jpg',
    'fotos/hermanitos7.jpg',  'fotos/hermanitos8.jpg',  'fotos/hermanitos9.jpg',
    'fotos/hermanitos10.jpg', 'fotos/hermanitos11.jpg', 'fotos/hermanitos12.jpg',
    'fotos/hermanitos13.jpg', 'fotos/hermanitos14.jpg', 'fotos/hermanitos15.jpg'
  ],

  lostres: [
    'fotos/lostres1.webp', 'fotos/lostres2.jpg',  'fotos/lostres3.jpg',
    'fotos/lostres4.jpg',  'fotos/lostres5.jpg',  'fotos/lostres6.jpg',
    'fotos/lostres7.jpg',  'fotos/lostres8.jpg',  'fotos/lostres9.jpg',
    'fotos/lostres10.jpg', 'fotos/lostres11.jpg', 'fotos/lostres12.jpg'
  ],

  tin: [
    'fotos/tin1.jpg', 'fotos/tin2.jpg', 'fotos/tin3.jpg',
    'fotos/tin4.jpg', 'fotos/tin5.jpg'
  ],

  tita: [
    'fotos/tita1.jpg', 'fotos/tita2.jpg', 'fotos/tita3.jpg',
    'fotos/tita4.jpg', 'fotos/tita5.jpg'
  ]

};

/* ══════════════════════════════════════════════════════════════════
   💌  CARTAS — ✏️ EDITA LOS MENSAJES AQUÍ
   ══════════════════════════════════════════════════════════════════ */
const cartas = [
  {
    icono: "💌", nombre: "De tu hijo/a mayor", pista: "Una carta desde el corazón",
    titulo: "Querida Mamá",
    cuerpo: `Hay personas que no necesitan haber visto el mundo para entenderlo. Tú eres una de esas personas. Desde niño/a supe que eras diferente: tenías una forma de ver las cosas que hacía que todo pareciera posible.

Recuerdo cuando me caí de la bicicleta por primera vez y corriste hacia mí antes de que pudiera llorar. No dijiste "te lo dije". Solo me abrazaste y me dijiste: "Los valientes también se caen".

Hoy, con los años que tengo, sigo escuchando esa frase cuando las cosas se ponen difíciles. Esa eres tú: la voz que me sostiene aún cuando no estás.

Gracias por enseñarme que el amor no se dice, se demuestra.`,
    firma: "Con todo mi amor, tu hijo/a 🌸"
  },
  {
    icono: "🌹", nombre: "Una promesa para ti", pista: "Algo que siempre quisimos decirte",
    titulo: "Nuestra Promesa",
    cuerpo: `Mamá,

Prometemos nunca olvidar el sacrificio silencioso que has hecho por nosotros. Esas noches que no dormiste, esas renuncias que nunca nombraste, esos sueños que pausaste para que los nuestros pudieran crecer.

Prometemos llamarte más seguido, no solo cuando necesitamos algo, sino para preguntarte cómo estás tú.

Prometemos cuidarte como tú nos has cuidado. Con paciencia, con ternura.

Y sobre todo, prometemos decirte "te quiero" más veces. La vida es corta y tú mereces escucharlo todos los días.`,
    firma: "Tus hijos, para siempre 💛"
  },
  {
    icono: "⭐", nombre: "Lo que el mundo ve en ti", pista: "Cosas que quizás no sabes de ti misma",
    titulo: "Lo Que Tú No Ves",
    cuerpo: `Mamá, probablemente no lo sabes, pero…

Cuando entras a una habitación, la temperatura sube un par de grados. Hay algo en tu presencia que hace que todo se sienta más seguro, más cálido, más en su lugar.

La gente habla de ti con una sonrisa involuntaria. "Tu mamá es increíble", nos dicen. Y nosotros solo respondemos: "Lo sabemos".

Pero lo más increíble de todo es que con todo lo extraordinaria que eres, sigues siendo simplemente… mamá. Nuestra mamá. El centro de nuestra historia.

Feliz cumpleaños a la persona más especial de nuestro universo.`,
    firma: "Con admiración infinita 🌟"
  }
];

/* ══════════════════════════════════════════════════════════════════
   🌧️  LLUVIA DE FOTOS EN CANVAS
   Toma muestras al azar del álbum y las hace caer suavemente
   ══════════════════════════════════════════════════════════════════ */
const PhotoRain = (() => {
  const canvas  = document.getElementById('photoRain');
  const ctx     = canvas.getContext('2d');
  let   drops   = [];
  let   images  = [];       // HTMLImageElement cargadas
  let   running = false;
  let   raf;

  // Recoge todas las rutas únicas del álbum
  function collectSources() {
    const all = [];
    Object.values(ALBUM_PHOTOS).forEach(arr => arr.forEach(s => all.push(s)));
    // Mezclar y tomar máx. 30 para no saturar memoria
    return shuffle(all).slice(0, 30);
  }

  // Pre-carga las imágenes; resuelve cuando todas terminan (o fallan)
  function preloadImages(sources) {
    return Promise.all(
      sources.map(src => new Promise(resolve => {
        const img = new Image();
        img.onload  = () => resolve(img);
        img.onerror = () => resolve(null);   // imagen rota: ignorar
        img.src = src;
      }))
    ).then(imgs => imgs.filter(Boolean));    // quitar nulos
  }

  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Crea una gota nueva en posición aleatoria sobre la pantalla
  function makeDrop() {
    if (!images.length) return null;
    const img  = images[Math.floor(Math.random() * images.length)];
    const size = 55 + Math.random() * 65;          // 55–120 px
    return {
      img,
      x:       Math.random() * (canvas.width + 80) - 40,
      y:       -size - Math.random() * canvas.height,
      size,
      speed:   0.35 + Math.random() * 0.55,        // px por frame
      opacity: 0.12 + Math.random() * 0.22,
      rot:     (Math.random() - .5) * 0.28,        // rad
      angle:   0,
      drift:   (Math.random() - .5) * 0.4          // movimiento lateral suave
    };
  }

  function init(imgs) {
    images = imgs;
    resize();
    window.addEventListener('resize', resize);

    // Poblar con gotas escalonadas
    const total = Math.min(22, Math.max(8, Math.floor(canvas.width / 90)));
    for (let i = 0; i < total; i++) {
      const d = makeDrop();
      if (d) { d.y = Math.random() * canvas.height; drops.push(d); }
    }
    running = true;
    loop();
  }

  function loop() {
    if (!running) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drops.forEach((d, idx) => {
      d.y     += d.speed;
      d.x     += d.drift;
      d.angle += d.rot * 0.01;

      ctx.save();
      ctx.globalAlpha = d.opacity;
      ctx.translate(d.x + d.size / 2, d.y + d.size / 2);
      ctx.rotate(d.angle);

      // Clip redondeado — aspecto de polaroid
      const r = 8;
      const s = d.size;
      ctx.beginPath();
      ctx.roundRect(-s/2, -s/2, s, s, r);
      ctx.clip();

      // Sombra suave
      ctx.shadowColor   = 'rgba(0,0,0,.18)';
      ctx.shadowBlur    = 10;
      ctx.shadowOffsetY = 4;

      ctx.drawImage(d.img, -s/2, -s/2, s, s);
      ctx.restore();

      // Reciclar gota cuando sale por abajo
      if (d.y > canvas.height + d.size + 20) {
        drops[idx] = makeDrop() || d;
      }
    });

    raf = requestAnimationFrame(loop);
  }

  // API pública
  return {
    start(sources) {
      preloadImages(sources).then(imgs => {
        if (imgs.length) init(imgs);
      });
    },
    stop() {
      running = false;
      cancelAnimationFrame(raf);
    }
  };
})();

/* ══════════════════════════════════════════════════════════════════
   🔒  DESBLOQUEO
   ══════════════════════════════════════════════════════════════════ */
const lockInput  = document.getElementById('lockInput');
const lockError  = document.getElementById('lockError');
const lockScreen = document.getElementById('lockScreen');

function validar() {
  if (lockInput.value.trim().toLowerCase() === CONFIG.PASSWORD.toLowerCase()) {
    iniciarTransicion();
  } else {
    lockError.textContent = "Eso no suena bien… ¡inténtalo de nuevo! 💫";
    lockInput.classList.add('shake');
    lockInput.select();
    setTimeout(() => {
      lockInput.classList.remove('shake');
      lockError.textContent = '';
    }, CONFIG.TIMINGS.SHAKE);
  }
}

/* ══════════════════════════════════════════════════════════════════
   🎁  TRANSICIÓN ESPECTACULAR DE APERTURA
   ──────────────────────────────────────────────────────────────────
   Secuencia:
   0 ms  — El botón pulsa, el regalo tiembla con expectativa
   300ms — La tarjeta "vuela" hacia arriba y desaparece
   600ms — Flash de luz dorada llena la pantalla
   900ms — El overlay de transición se despliega desde el centro
             mostrando el emoji 🎁 → 🎀 animado con texto
  1800ms — El contenido aparece con un "unfold" tipo carta
  2400ms — Los pétalos / partículas explotan desde el centro
  3200ms — El overlay se disuelve, la página queda visible
   ══════════════════════════════════════════════════════════════════ */
function iniciarTransicion() {
  // ── Fase 1: el botón pulsa y el regalo salta ──────────────────
  const card = lockScreen.querySelector('.lock-card');
  card.style.animation = 'none';
  card.style.transform = 'scale(1.05)';
  card.style.transition = 'transform .15s ease';

  setTimeout(() => {
    // ── Fase 2: la tarjeta sube y desvanece ──────────────────────
    card.style.transition = 'transform .5s cubic-bezier(.4,0,.2,1), opacity .5s ease';
    card.style.transform  = 'translateY(-60px) scale(.92)';
    card.style.opacity    = '0';
  }, 150);

  setTimeout(() => {
    // ── Fase 3: flash dorado ─────────────────────────────────────
    const flash = document.createElement('div');
    flash.id = 'transFlash';
    flash.style.cssText = `
      position:fixed;inset:0;z-index:800;pointer-events:none;
      background:radial-gradient(circle at 50% 50%, #fff9e6 0%, #f0c84a 40%, transparent 70%);
      opacity:0;transition:opacity .25s ease;`;
    document.body.appendChild(flash);
    requestAnimationFrame(() => { flash.style.opacity = '1'; });
    setTimeout(() => { flash.style.opacity = '0'; }, 350);
    setTimeout(() => { flash.remove(); }, 650);

    // ── Fase 4: overlay de apertura ──────────────────────────────
    construirOverlay();
  }, 500);
}

function construirOverlay() {
  // Paneles que se abren como una caja de regalo
  const ov = document.createElement('div');
  ov.id = 'giftOverlay';
  ov.innerHTML = `
    <div class="go-panel go-top"></div>
    <div class="go-panel go-bottom"></div>
    <div class="go-panel go-left"></div>
    <div class="go-panel go-right"></div>
    <div class="go-center">
      <div class="go-gift" id="goGift">🎁</div>
      <p class="go-msg" id="goMsg"></p>
      <div class="go-sparkles" id="goSparkles"></div>
    </div>`;
  document.body.appendChild(ov);

  // Asegurar que los estilos del overlay estén inyectados
  if (!document.getElementById('giftOverlayStyles')) {
    const s = document.createElement('style');
    s.id = 'giftOverlayStyles';
    s.textContent = OVERLAY_CSS;
    document.head.appendChild(s);
  }

  // Animar entrada de paneles
  requestAnimationFrame(() => {
    ov.classList.add('go-opening');
  });

  // Texto que se escribe letra a letra
  const mensajes = [
    { t: 600,  txt: '¡Con todo el amor del mundo…', cls: 'go-msg--small' },
    { t: 1800, txt: '🎀 Feliz Cumpleaños Mamá 🎀',  cls: 'go-msg--big'   },
  ];

  mensajes.forEach(({ t, txt, cls }) => {
    setTimeout(() => {
      typewriterEl(document.getElementById('goMsg'), txt, cls);
    }, t);
  });

  // Cambio emoji regalo → lazo
  setTimeout(() => {
    const g = document.getElementById('goGift');
    if (g) { g.textContent = '🎀'; g.classList.add('go-gift--open'); }
  }, 900);

  // Explosión de sparkles desde el centro
  setTimeout(() => spawnSparkles(document.getElementById('goSparkles')), 1100);

  // ── Fase final: disolver overlay y mostrar página ─────────────
  setTimeout(() => {
    lockScreen.style.display = 'none';

    // Revelar contenido detrás del overlay
    const content = document.getElementById('content');
    content.style.display   = 'block';
    content.style.opacity   = '0';
    content.style.transform = 'scale(.97)';
    content.style.transition = 'opacity 1s ease, transform 1s ease';

    requestAnimationFrame(() => {
      content.style.opacity   = '1';
      content.style.transform = 'scale(1)';
    });

    // Disolver paneles hacia afuera
    ov.classList.add('go-closing');

    setTimeout(() => {
      ov.remove();
      content.style.transition = '';
      content.style.transform  = '';
      content.style.opacity    = '';

      // Iniciar el resto de la página
      buildAlbum();
      buildAccordion();
      initReveal();
      PhotoRain.start(Object.values(ALBUM_PHOTOS).flat());
      lanzarConfeti();
    }, 900);

  }, 3000);
}

/* ── Escribe texto letra a letra ──────────────────────────────── */
function typewriterEl(el, text, cls) {
  if (!el) return;
  el.textContent = '';
  el.className   = `go-msg ${cls}`;
  let i = 0;
  const iv = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) clearInterval(iv);
  }, 42);
}

/* ── Genera partículas/sparkles desde el centro ──────────────── */
function spawnSparkles(container) {
  if (!container) return;
  const symbols = ['✨','🌸','💚','🌿','💕','⭐','🎀','✦','🌟','💛'];
  for (let i = 0; i < 28; i++) {
    const sp  = document.createElement('span');
    sp.textContent  = symbols[Math.floor(Math.random() * symbols.length)];
    const angle     = (i / 28) * 360;
    const dist      = 80 + Math.random() * 120;
    const tx        = Math.cos(angle * Math.PI / 180) * dist;
    const ty        = Math.sin(angle * Math.PI / 180) * dist;
    const delay     = Math.random() * 400;
    const size      = .9 + Math.random() * 1.1;
    sp.style.cssText = `
      position:absolute;top:50%;left:50%;
      font-size:${size}rem;opacity:0;
      transform:translate(-50%,-50%);
      animation: sparkle-fly .9s ${delay}ms ease forwards;
      --tx:${tx}px;--ty:${ty}px;`;
    container.appendChild(sp);
  }
}

/* CSS del overlay — inyectado una sola vez en el <head> */
const OVERLAY_CSS = `
#giftOverlay {
  position: fixed; inset: 0; z-index: 700;
  display: flex; align-items: center; justify-content: center;
  pointer-events: none;
}

/* Paneles que forman la "caja" */
.go-panel {
  position: absolute;
  background: linear-gradient(145deg, #1e4d29 0%, #3d7a4a 50%, #7dba8a 100%);
  transition: transform 1.1s cubic-bezier(.77,0,.18,1);
}
.go-top    { top:0;    left:0; right:0;  height:52%; transform:translateY(0);   transform-origin:top; }
.go-bottom { bottom:0; left:0; right:0;  height:52%; transform:translateY(0);   transform-origin:bottom; }
.go-left   { left:0;   top:0;  bottom:0; width:52%;  transform:translateX(0);   transform-origin:left; }
.go-right  { right:0;  top:0;  bottom:0; width:52%;  transform:translateX(0);   transform-origin:right; }

/* Textura de cinta sobre los paneles */
.go-top::after, .go-bottom::after {
  content:'';position:absolute;left:0;right:0;height:8px;
  background:linear-gradient(90deg,#c9a84c,#f0d97a,#c9a84c);
  opacity:.8;
}
.go-top::after    { bottom:0; }
.go-bottom::after { top:0; }
.go-left::after, .go-right::after {
  content:'';position:absolute;top:0;bottom:0;width:8px;
  background:linear-gradient(180deg,#c9a84c,#f0d97a,#c9a84c);
  opacity:.8;
}
.go-left::after  { right:0; }
.go-right::after { left:0;  }

/* Estado ABIERTO: paneles vuelan hacia afuera */
#giftOverlay.go-opening .go-top    { transform: translateY(-102%); }
#giftOverlay.go-opening .go-bottom { transform: translateY(102%);  }
#giftOverlay.go-opening .go-left   { transform: translateX(-102%); }
#giftOverlay.go-opening .go-right  { transform: translateX(102%);  }

/* Estado CERRANDO: desvanece toda la capa */
#giftOverlay.go-closing { opacity:0; transition: opacity .8s ease; }

/* Centro con el emoji y texto */
.go-center {
  position: relative; z-index: 2;
  display: flex; flex-direction: column;
  align-items: center; justify-content: center;
  gap: 1.2rem; text-align: center; padding: 1rem;
}

.go-gift {
  font-size: clamp(5rem, 15vw, 9rem);
  animation: gift-appear .6s cubic-bezier(.34,1.56,.64,1) both;
  display: block; line-height: 1;
  filter: drop-shadow(0 8px 24px rgba(0,0,0,.25));
}
.go-gift--open {
  animation: gift-pop .5s cubic-bezier(.34,1.56,.64,1) both !important;
}

.go-msg {
  font-family: 'Cormorant Garamond', Georgia, serif;
  color: white;
  text-shadow: 0 2px 12px rgba(0,0,0,.4);
  min-height: 2.5rem;
  transition: all .3s ease;
}
.go-msg--small { font-size: clamp(1rem, 3vw, 1.4rem); font-weight: 300; font-style: italic; }
.go-msg--big   { font-size: clamp(1.5rem, 5vw, 2.6rem); font-weight: 600; letter-spacing:.03em; }

.go-sparkles {
  position: absolute; inset: 0;
  pointer-events: none; overflow: visible;
}

@keyframes gift-appear {
  from { opacity:0; transform: scale(0) rotate(-20deg); }
  to   { opacity:1; transform: scale(1) rotate(0deg);   }
}
@keyframes gift-pop {
  0%   { transform: scale(1)    rotate(0deg);   }
  40%  { transform: scale(1.35) rotate(12deg);  }
  70%  { transform: scale(.9)   rotate(-6deg);  }
  100% { transform: scale(1.1)  rotate(0deg);   }
}
@keyframes sparkle-fly {
  0%   { opacity:0; transform:translate(-50%,-50%) scale(.3); }
  40%  { opacity:1; }
  100% { opacity:0; transform:translate(calc(-50% + var(--tx)), calc(-50% + var(--ty))) scale(1.2) rotate(360deg); }
}
`;

document.getElementById('lockBtn').addEventListener('click', validar);
lockInput.addEventListener('keydown', e => { if (e.key === 'Enter') validar(); });

/* ══════════════════════════════════════════════════════════════════
   🎊  CONFETI
   ══════════════════════════════════════════════════════════════════ */
function lanzarConfeti() {
  if (typeof confetti === 'undefined') { setTimeout(lanzarConfeti, 200); return; }
  const c = ['#3d7a4a', '#7dba8a', '#c9e8cc', '#e8a0a0', '#c9a84c', '#fff'];
  confetti({ particleCount: 120, spread: 80, origin: { y: .5 }, colors: c, scalar: 1.1 });
  setTimeout(() => {
    confetti({ particleCount: 70, angle: 60,  spread: 60, origin: { x: 0 }, colors: c });
    confetti({ particleCount: 70, angle: 120, spread: 60, origin: { x: 1 }, colors: c });
  }, CONFIG.TIMINGS.CONFETTI_DELAY);
}

/* ══════════════════════════════════════════════════════════════════
   🖼️  ÁLBUM — mezcla aleatoria + filtros por categoría
   ══════════════════════════════════════════════════════════════════ */

// Fisher-Yates shuffle sin mutar el original
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildAlbum() {
  const section    = document.getElementById('miniAlbum');
  const tabsEl     = section.querySelector('.album-tabs');
  const carouselEl = section.querySelector('.album-carousel');
  if (!tabsEl || !carouselEl) return;

  tabsEl.innerHTML     = '';
  carouselEl.innerHTML = '';

  // ── Tab "Todas" ──────────────────────────────────────────────────
  const allBtn = document.createElement('button');
  allBtn.className        = 'tab-btn active';
  allBtn.dataset.category = 'all';
  allBtn.textContent      = '🌿 Todas';
  allBtn.addEventListener('click', () => switchCategory('all'));
  tabsEl.appendChild(allBtn);

  // ── Tabs por categoría ───────────────────────────────────────────
  Object.keys(ALBUM_PHOTOS).forEach(cat => {
    const meta = CATEGORY_META[cat] || { emoji: '📷', label: cat };
    const btn  = document.createElement('button');
    btn.className        = 'tab-btn';
    btn.dataset.category = cat;
    btn.textContent      = `${meta.emoji} ${meta.label}`;
    btn.addEventListener('click', () => switchCategory(cat));
    tabsEl.appendChild(btn);
  });

  // ── Aplanar y mezclar TODAS las fotos ───────────────────────────
  const allPhotos = [];
  Object.entries(ALBUM_PHOTOS).forEach(([cat, urls]) => {
    urls.forEach(src => allPhotos.push({ src, cat }));
  });
  const shuffled = shuffle(allPhotos);

  // ── Crear items del grid ─────────────────────────────────────────
  shuffled.forEach(({ src, cat }) => {
    const item  = document.createElement('div');
    item.className        = 'album-item reveal active'; // all visible por defecto
    item.dataset.category = cat;

    const img   = document.createElement('img');
    img.src     = src;
    img.alt     = CATEGORY_META[cat]?.label || cat;
    img.loading = 'lazy';

    const badge = document.createElement('span');
    badge.className   = 'album-badge';
    badge.textContent = `${CATEGORY_META[cat]?.emoji || ''} ${CATEGORY_META[cat]?.label || cat}`;

    item.appendChild(img);
    item.appendChild(badge);
    item.addEventListener('click', () => openPhotoModal(src, cat));
    carouselEl.appendChild(item);
  });
}

function switchCategory(category) {
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.category === category);
  });
  document.querySelectorAll('.album-item').forEach(item => {
    const show = category === 'all' || item.dataset.category === category;
    item.classList.toggle('active', show);
  });
}

/* ══════════════════════════════════════════════════════════════════
   🔍  MODAL DE FOTO con navegación ← →
   ══════════════════════════════════════════════════════════════════ */
let photoModal     = null;
let modalList      = [];    // fotos visibles en el momento de abrir
let modalIndex     = 0;

function buildModalList() {
  modalList = [...document.querySelectorAll('.album-item.active')].map(el => ({
    src: el.querySelector('img').getAttribute('src'),
    cat: el.dataset.category
  }));
}

function openPhotoModal(src, cat) {
  if (!photoModal) {
    photoModal = document.createElement('div');
    photoModal.id        = 'photoModal';
    photoModal.className = 'photo-modal';
    photoModal.innerHTML = `
      <div class="photo-modal-backdrop"></div>
      <div class="photo-modal-content">
        <button class="photo-modal-close" aria-label="Cerrar">✕</button>
        <button class="photo-modal-prev"  aria-label="Anterior">‹</button>
        <div class="photo-modal-img-wrap">
          <img id="photoModalImg" src="" alt="Foto ampliada" />
          <span class="photo-modal-label" id="photoModalLabel"></span>
        </div>
        <button class="photo-modal-next"  aria-label="Siguiente">›</button>
      </div>`;
    document.body.appendChild(photoModal);

    photoModal.querySelector('.photo-modal-backdrop').addEventListener('click', closePhotoModal);
    photoModal.querySelector('.photo-modal-close').addEventListener('click', closePhotoModal);
    photoModal.querySelector('.photo-modal-prev').addEventListener('click', () => navModal(-1));
    photoModal.querySelector('.photo-modal-next').addEventListener('click', () => navModal(+1));
  }

  buildModalList();
  // Encontrar índice de la foto clicada (comparar solo nombre de archivo)
  const filename = src.split('/').pop();
  modalIndex = modalList.findIndex(p => p.src.split('/').pop() === filename);
  if (modalIndex === -1) modalIndex = 0;

  renderModal();
  photoModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function renderModal() {
  if (!modalList.length) return;
  const { src, cat }  = modalList[modalIndex];
  const meta          = CATEGORY_META[cat] || { emoji: '📷', label: cat };
  document.getElementById('photoModalImg').src = src;
  document.getElementById('photoModalLabel').textContent =
    `${meta.emoji} ${meta.label}  ·  ${modalIndex + 1} / ${modalList.length}`;

  const prev = photoModal.querySelector('.photo-modal-prev');
  const next = photoModal.querySelector('.photo-modal-next');
  prev.style.visibility = modalIndex === 0                     ? 'hidden' : 'visible';
  next.style.visibility = modalIndex === modalList.length - 1  ? 'hidden' : 'visible';
}

function navModal(dir) {
  const n = modalIndex + dir;
  if (n < 0 || n >= modalList.length) return;
  modalIndex = n;
  renderModal();
}

function closePhotoModal() {
  if (photoModal) photoModal.classList.remove('active');
  document.body.style.overflow = '';
}

// Teclado dentro del modal
document.addEventListener('keydown', e => {
  if (!photoModal?.classList.contains('active')) return;
  if (e.key === 'Escape')     closePhotoModal();
  if (e.key === 'ArrowLeft')  navModal(-1);
  if (e.key === 'ArrowRight') navModal(+1);
});

/* ══════════════════════════════════════════════════════════════════
   💌  ACORDEÓN DE CARTAS
   ══════════════════════════════════════════════════════════════════ */
function buildAccordion() {
  const el = document.getElementById('accordionEl');
  if (!el) return;
  cartas.forEach((c, i) => {
    const item = document.createElement('div');
    item.className = `acc-item reveal d${i + 1}`;
    item.innerHTML = `
      <details>
        <summary class="acc-summary">
          <span class="acc-icon">${c.icono}</span>
          <div class="acc-meta">
            <span class="acc-name">${c.nombre}</span>
            <span class="acc-hint">${c.pista}</span>
          </div>
          <span class="acc-arrow" aria-hidden="true">▾</span>
        </summary>
        <div class="acc-body">
          <p class="acc-letter-head">${c.titulo}</p>
          <p class="acc-letter-body">${c.cuerpo}</p>
          <p class="acc-sig">${c.firma}</p>
        </div>
      </details>`;
    el.appendChild(item);
  });
}

/* ══════════════════════════════════════════════════════════════════
   👁  REVEAL ON SCROLL
   ══════════════════════════════════════════════════════════════════ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target); }
    });
  }, { threshold: 0.08 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════════════════════════
   🍞  TOAST
   ══════════════════════════════════════════════════════════════════ */
let toastTimer;
const toastEl = document.getElementById('toast');
function toast(msg) {
  if (!toastEl) return;
  toastEl.textContent = msg;
  toastEl.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove('show'), CONFIG.TIMINGS.TOAST);
}

/* ══════════════════════════════════════════════════════════════════
   🚫  ANTI-CURIOSEO
   ══════════════════════════════════════════════════════════════════ */
document.addEventListener('contextmenu', e => { e.preventDefault(); toast(CONFIG.WARNING_MSG); });
document.addEventListener('keydown', e => {
  const isDevTools =
    e.key === 'F12' ||
    (e.ctrlKey && e.shiftKey && ['I','J','C'].includes(e.key.toUpperCase())) ||
    (e.ctrlKey && e.key.toUpperCase() === 'U');
  if (isDevTools) { e.preventDefault(); toast(CONFIG.WARNING_MSG); }
});
