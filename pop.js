// Motion + colour for the "Pop" look: page entrance animations and a glow that matches the cover art.
(() => {
  const app = document.getElementById('app'), root = document.documentElement;
  let lastHash = null;
  const cache = new Map();
  function tint(src) {
    if (!src) return;
    if (cache.has(src)) return root.style.setProperty('--glow', cache.get(src));
    const img = new Image(); img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const c = document.createElement('canvas'); c.width = c.height = 16;
        const x = c.getContext('2d', { willReadFrequently: true }); x.drawImage(img, 0, 0, 16, 16);
        const d = x.getImageData(0, 0, 16, 16).data; let r = 0, g = 0, b = 0, w = 0;
        for (let i = 0; i < d.length; i += 4) { // weight vivid pixels so the glow picks the cover's accent colour
          const mx = Math.max(d[i], d[i + 1], d[i + 2]), mn = Math.min(d[i], d[i + 1], d[i + 2]), s = (mx - mn) / 255 + .05;
          r += d[i] * s; g += d[i + 1] * s; b += d[i + 2] * s; w += s;
        }
        let v = [r / w, g / w, b / w]; const m = Math.max(...v) || 1; v = v.map(n => Math.round(Math.min(255, n * (200 / m)))); // brighten
        const val = v.join(','); cache.set(src, val); root.style.setProperty('--glow', val);
      } catch { /* cover served without CORS: keep default glow */ }
    };
    img.src = src;
  }
  new MutationObserver(() => {
    const h = location.hash;
    if (h !== lastHash) {
      lastHash = h;
      app.querySelectorAll('.hs>.tile,.grid>.tile').forEach((t, i) => t.style.setProperty('--i', i % 14));
      app.classList.remove('enter'); void app.offsetWidth; app.classList.add('enter');
      clearTimeout(app._t); app._t = setTimeout(() => app.classList.remove('enter'), 1400);
      if (!h.startsWith('#tape-')) root.style.removeProperty('--glow');
    }
    if (h.startsWith('#tape-')) tint(app.querySelector('.tp .cv img, .cdhero .cv img, .hero .cv img')?.src);
  }).observe(app, { childList: true });
  const np = document.getElementById('np');
  if (np) new MutationObserver(() => { if (np.classList.contains('open')) tint(np.querySelector('img')?.src); }).observe(np, { attributes: true, attributeFilter: ['class'] });
})();
