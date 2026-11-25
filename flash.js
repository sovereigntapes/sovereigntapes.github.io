// SovereignTapes "flash" layer: sparkles, 3D tilt, gold bursts, click ripples, count-ups and scroll reveals.
// Everything is decorative and switches off for people who ask their device for reduced motion.
(() => {
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches, fine = matchMedia('(pointer: fine)').matches;
  const GOLD = ['#ffe566', '#ffd60a', '#ffe14d', '#ffffff', '#f2f2f2'];
  const app = document.getElementById('app');

  // ---- twinkling sparkle field behind everything ----
  if (!calm) {
    const c = document.createElement('canvas'), x = c.getContext('2d');
    c.id = 'sparkles'; c.setAttribute('aria-hidden', 'true'); document.body.prepend(c);
    let W, H, dots = [], last = 0, rs = 0;
    const R = Math.min(devicePixelRatio || 1, 1.5); // sharp enough, far less work on phones
    const size = () => {
      W = c.width = innerWidth * R; H = c.height = innerHeight * R;
      const n = Math.min(innerWidth < 700 ? 45 : 90, Math.round(innerWidth * innerHeight / 16000));
      dots = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, r: (Math.random() * 1.6 + .4) * R,
        v: (Math.random() * .5 + .1) * R, t: Math.random() * 6.28, s: Math.random() * .06 + .02, col: GOLD[Math.random() * GOLD.length | 0] }));
    };
    size(); addEventListener('resize', () => { clearTimeout(rs); rs = setTimeout(size, 150); }, { passive: true });
    const tick = now => {
      if (!document.hidden && now - last > 32) { // ~30 fps is plenty for a slow drift
        last = now;
        x.clearRect(0, 0, W, H);
        for (const d of dots) {
          d.y -= d.v; d.t += d.s; if (d.y < -10) { d.y = H + 10; d.x = Math.random() * W; }
          const a = .25 + .75 * Math.abs(Math.sin(d.t));
          x.globalAlpha = a; x.fillStyle = d.col; x.beginPath(); x.arc(d.x, d.y, d.r, 0, 6.28); x.fill();
          if (d.r > 1.4 * R && a > .85) { // star glint
            x.globalAlpha = a * .6; x.fillRect(d.x - d.r * 4, d.y - .5, d.r * 8, 1); x.fillRect(d.x - .5, d.y - d.r * 4, 1, d.r * 8);
          }
        }
      }
      requestAnimationFrame(tick);
    };
    tick();
  }

  // ---- gold burst (likes, follows, tips, purchases, drops) ----
  function burst(px, py, n = 26) {
    if (calm) return;
    for (let i = 0; i < n; i++) {
      const p = document.createElement('i'); p.className = 'confetti';
      const ang = Math.random() * 6.28, dist = 60 + Math.random() * 110;
      p.style.cssText = `left:${px}px;top:${py}px;background:${GOLD[i % GOLD.length]};--dx:${Math.cos(ang) * dist}px;--dy:${Math.sin(ang) * dist - 40}px;--rot:${Math.random() * 720 - 360}deg;animation-delay:${Math.random() * 60}ms`;
      if (i % 3 === 0) p.classList.add('star');
      document.body.appendChild(p); setTimeout(() => p.remove(), 1100);
    }
  }
  window.stBurst = burst;
  const centre = el => { const r = el.getBoundingClientRect(); return [r.left + r.width / 2, r.top + r.height / 2]; };

  // ---- click ripple on every button, bursts on the feel-good ones ----
  document.addEventListener('pointerdown', e => {
    const b = e.target.closest('.btn,.chip,.ib,.bn,.rbtn');
    if (!b || calm) return;
    const r = b.getBoundingClientRect(), s = document.createElement('span');
    s.className = 'ripple'; s.style.cssText = `left:${e.clientX - r.left}px;top:${e.clientY - r.top}px`;
    b.appendChild(s); setTimeout(() => s.remove(), 650);
  }, { passive: true });
  document.addEventListener('click', e => {
    const b = e.target.closest('[data-like],[data-follow],[data-tip],[data-join],[data-rem],[data-rate]');
    if (b) burst(...centre(b), b.matches('[data-rate]') ? 12 : 26);
  });

  // ---- toasts that celebrate get a burst too ----
  const toast = document.getElementById('toast');
  if (toast) new MutationObserver(() => {
    if (toast.classList.contains('show') && /thank|live|dropped|unlocked|member|welcome|boost paid|saved offline|purchase/i.test(toast.textContent)) {
      const r = toast.getBoundingClientRect(); burst(r.left + r.width / 2, r.top, 34);
    }
  }).observe(toast, { attributes: true, attributeFilter: ['class'], childList: true, characterData: true, subtree: true });

  // ---- 3D tilt + glare on covers and tiles ----
  if (fine && !calm) {
    let cur = null;
    document.addEventListener('pointermove', e => {
      const t = e.target.closest('.tile,.ft,.cv,.dj,.kpi,.perks .panel');
      if (cur && cur !== t) { cur.style.transform = ''; cur.style.removeProperty('--gx'); cur = null; }
      if (!t) return; cur = t;
      const r = t.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      t.style.transform = `perspective(700px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateY(-4px) scale(1.02)`;
      t.style.setProperty('--gx', `${(px + .5) * 100}%`); t.style.setProperty('--gy', `${(py + .5) * 100}%`);
    }, { passive: true });
  }

  // ---- spinning cassette in the player (reels turn while music plays) ----
  const cassette = big => `<div class="cassette${big ? ' big' : ''}" aria-hidden="true"><svg viewBox="0 0 120 76"><rect x="2" y="2" width="116" height="72" rx="8" class="cs-body"/>
    <rect x="12" y="10" width="96" height="40" rx="5" class="cs-label"/><text x="60" y="22" text-anchor="middle" class="cs-t">SOVEREIGNTAPES</text>
    <rect x="30" y="27" width="60" height="18" rx="9" class="cs-win"/><g class="reel" style="transform-origin:42px 36px"><circle cx="42" cy="36" r="7" class="cs-reel"/><path d="M42 30v12M36 36h12M38 32l8 8M46 32l-8 8" class="cs-sp"/></g>
    <g class="reel" style="transform-origin:78px 36px"><circle cx="78" cy="36" r="7" class="cs-reel"/><path d="M78 30v12M72 36h12M74 32l8 8M82 32l-8 8" class="cs-sp"/></g>
    <path d="M28 74l8-14h48l8 14" class="cs-foot"/><circle cx="14" cy="64" r="2.5" class="cs-hole"/><circle cx="106" cy="64" r="2.5" class="cs-hole"/></svg></div>`;
  document.querySelectorAll('.npc').forEach(n => n.insertAdjacentHTML('afterend', cassette(true)));
  const mini = [...document.querySelectorAll('.js-cover')].find(i => !i.closest('.npc'));
  if (mini) mini.parentElement.insertAdjacentHTML('afterend', cassette(false));
  document.addEventListener('play', () => document.body.classList.add('playing'), true);
  ['pause', 'ended', 'emptied'].forEach(ev => document.addEventListener(ev, () => document.body.classList.remove('playing'), true));

  // ---- count-up numbers and scroll-in reveals, re-applied whenever a screen renders ----
  const countUp = el => {
    const txt = el.textContent.trim(), m = txt.match(/^([^\d]*)([\d.,]+)(.*)$/);
    if (!m || el.dataset.counted) return; el.dataset.counted = 1;
    const target = parseFloat(m[2].replace(/,/g, '')), dec = (m[2].split('.')[1] || '').length, t0 = performance.now(), dur = 900;
    if (!target || calm) return;
    const step = now => {
      const k = Math.min(1, (now - t0) / dur), v = target * (1 - Math.pow(1 - k, 3));
      el.textContent = m[1] + v.toLocaleString(undefined, { minimumFractionDigits: dec, maximumFractionDigits: dec }) + m[3];
      if (k < 1) requestAnimationFrame(step); else el.textContent = txt;
    };
    requestAnimationFrame(step);
  };
  const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(en => {
    if (!en.isIntersecting) return; en.target.classList.add('in'); io.unobserve(en.target);
    if (en.target.matches('.stats,.kpi')) en.target.querySelectorAll('b').forEach(countUp);
  }), { threshold: .12 }) : null;
  const dress = () => {
    if (!io) return;
    app.querySelectorAll('.tile,.ft,.dj,.panel,.kpi,.stats,.tr,.cm,.promo').forEach((el, i) => {
      if (el.dataset.rv) return; el.dataset.rv = 1; el.classList.add('rv'); el.style.setProperty('--d', `${(i % 12) * 45}ms`); io.observe(el);
    });
  };
  let q = 0; if (app) new MutationObserver(() => { if (!q) q = requestAnimationFrame(() => { q = 0; dress(); }); }).observe(app, { childList: true, subtree: true });
  dress();
})();
