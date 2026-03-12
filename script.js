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
  PASSWORD: "Champa",// ← CAMBIA ESTO
  WARNING_MSG: "¡Ey! No hagas trampa, esto es solo para mi mami 😄",
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
  mami:       { emoji: '💚',        label: 'Mami'       },
  mamita:     { emoji: '💕',        label: 'Mamita'     },
  hermanitos: { emoji: '💛❤️', label: 'Hermanitos' },
  lostres:    { emoji: '💚💛❤️',  label: 'Los Tres'   },
  tin:        { emoji: '💛',        label: 'Tin'        },
  tita:       { emoji: '❤️',        label: 'Tita'       }
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
    'fotos/hermanitos10.jpg'
  ],

  lostres: [
    'fotos/lostres1.jpg', 'fotos/lostres2.jpg',  'fotos/lostres3.jpg',
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
    icono: "💌", nombre: "De tu hijo mayor", pista: "Una carta desde el corazón",
    titulo: "Querida Mamá",
    cuerpo: `carta martin`,
    firma: "Con todo mi amor, tu hijo 💛"
  },
  {
    icono: "💌", nombre: "De tu hijo menor", pista: "Una carta desde el corazón",
    titulo: "Querida Mamá",
    cuerpo: `carta jota`,
    firma: "Con todo mi amor, tu hijo ❤️"
  },
  {
    icono: "⭐", nombre: "Lo que el mundo ve en ti", pista: "Cosas que quizás no sabes de ti misma",
    titulo: "Lo Que Tú No Ves",
    cuerpo: `cosas onitas de mi mami`,
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
    lockScreen.classList.add('unlocking');
    setTimeout(revelarContenido, CONFIG.TIMINGS.UNLOCK);
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

document.getElementById('lockBtn').addEventListener('click', validar);
lockInput.addEventListener('keydown', e => { if (e.key === 'Enter') validar(); });

/* ══════════════════════════════════════════════════════════════════
   🎉  REVELAR CONTENIDO
   ══════════════════════════════════════════════════════════════════ */
function revelarContenido() {
  lockScreen.style.display = 'none';

  const content = document.getElementById('content');
  content.style.display = 'block';

  // Construir secciones
  buildAlbum();
  buildAccordion();
  initReveal();

  // Arrancar lluvia de fotos en el canvas de fondo
  const allSources = Object.values(ALBUM_PHOTOS).flat();
  PhotoRain.start(allSources);

  // Confeti de celebración
  lanzarConfeti();
}

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
