import React from 'react';

const WEATHER_PALETTES = {
  clear: [
    [0,  ['#0a0e2a', '#1a1d3a', '#2a2845'], '#fff5d4'],
    [5,  ['#3d3a5e', '#7a5d6e', '#d49a7e'], '#ffe0a8'],
    [7,  ['#7ab8d9', '#f4c987', '#ffe5b4'], '#ffd97a'],
    [10, ['#5fa3d6', '#a3d4f5', '#e8f4fb'], '#fff5b8'],
    [13, ['#4a92d4', '#8cc6ee', '#d8ecf7'], '#ffeb88'],
    [16, ['#5494c8', '#a3c8e8', '#e0d4c0'], '#ffd478'],
    [18, ['#6e6597', '#d97a5e', '#ffb88a'], '#ff9a4d'],
    [20, ['#1d2150', '#4a3a6e', '#8a5a7e'], '#ffd4a8'],
    [22, ['#0d1240', '#1a1d3a', '#2a2845'], '#fff5d4'],
  ],
  partly: [
    [0,  ['#0c1030', '#1c1f3c', '#2c2a47'], '#fff5d4'],
    [7,  ['#7ab8d9', '#e4b987', '#f5dab4'], '#ffd97a'],
    [13, ['#5a9ad4', '#9cc6ee', '#dce8f7'], '#fff088'],
    [18, ['#7e6597', '#c97a5e', '#f5a88a'], '#ff9a4d'],
    [22, ['#0f1338', '#1c1f3c', '#2c2a47'], '#fff5d4'],
  ],
  cloudy: [
    [0,  ['#1a1d35', '#2a2c45', '#3a3a55'], '#aab0c0'],
    [7,  ['#8090a8', '#a0a8b8', '#c0c4cc'], '#d0c8b0'],
    [13, ['#7888a0', '#98a4b0', '#b8bec4'], '#c8c0b0'],
    [18, ['#605870', '#807888', '#a098a0'], '#a89888'],
    [22, ['#1c1f37', '#2a2c45', '#3a3a55'], '#aab0c0'],
  ],
  rain: [
    [0,  ['#15182e', '#22253a', '#2e3045'], '#7080a0'],
    [7,  ['#5a6878', '#788490', '#9098a0'], '#a0a8a8'],
    [13, ['#54627a', '#728090', '#8c95a0'], '#a8b0b0'],
    [18, ['#3e4458', '#585e72', '#787888'], '#888080'],
    [22, ['#171a30', '#22253a', '#2e3045'], '#7080a0'],
  ],
  snow: [
    [0,  ['#1c2038', '#2c3048', '#3c3e55'], '#c8d0e0'],
    [7,  ['#a0b0c0', '#c0c8d0', '#d8dde0'], '#e8ecf0'],
    [13, ['#8ca0b8', '#b4c4d0', '#d0d8dc'], '#dce0e4'],
    [18, ['#605c78', '#807c90', '#a09ca8'], '#b8b0b8'],
    [22, ['#1e2238', '#2c3048', '#3c3e55'], '#c8d0e0'],
  ],
  fog: [
    [0,  ['#22252e', '#32353c', '#44464e'], '#888c92'],
    [7,  ['#b0b4b8', '#c8ccce', '#dcdedc'], '#d8d0c0'],
    [13, ['#a8b0b4', '#c0c8c8', '#d4d8d4'], '#d0c8b8'],
    [18, ['#787478', '#908c90', '#a8a4a4'], '#988880'],
    [22, ['#22252e', '#32353c', '#44464e'], '#888c92'],
  ],
  storm: [
    [0,  ['#0a0c1c', '#1a1c2c', '#2a2a3a'], '#5a6080'],
    [7,  ['#3a4054', '#4e5468', '#62687a'], '#888090'],
    [13, ['#383e52', '#4c5266', '#606678'], '#807888'],
    [18, ['#28293c', '#3a3a4e', '#4c4c5e'], '#605870'],
    [22, ['#0a0c1c', '#1a1c2c', '#2a2a3a'], '#5a6080'],
  ],
};

const clampByte = (v) => Math.max(0, Math.min(255, Math.round(v)));

function lerpColor(a, b, t) {
  const ar = parseInt(a.slice(1,3),16), ag = parseInt(a.slice(3,5),16), ab = parseInt(a.slice(5,7),16);
  const br = parseInt(b.slice(1,3),16), bg = parseInt(b.slice(3,5),16), bb = parseInt(b.slice(5,7),16);
  return `rgb(${clampByte(ar+(br-ar)*t)},${clampByte(ag+(bg-ag)*t)},${clampByte(ab+(bb-ab)*t)})`;
}

function hexToRgb(c) {
  if (c[0] === '#') return { r: parseInt(c.slice(1,3),16), g: parseInt(c.slice(3,5),16), b: parseInt(c.slice(5,7),16) };
  const m = c.match(/rgba?\(([^)]+)\)/);
  if (m) { const p = m[1].split(',').map(Number); return { r: p[0]|0, g: p[1]|0, b: p[2]|0 }; }
  return { r: 255, g: 255, b: 255 };
}

// Lerp between two colors given as hex or rgb() strings, returning an rgb() string.
function lerpRgb(a, b, t) {
  const A = hexToRgb(a), B = hexToRgb(b);
  return `rgb(${clampByte(A.r+(B.r-A.r)*t)},${clampByte(A.g+(B.g-A.g)*t)},${clampByte(A.b+(B.b-A.b)*t)})`;
}

// Sample the sky gradient color at vertical fraction f (0 = top, 1 = bottom).
// Mirrors the gradient stops used when painting the sky (top@0, mid@0.55, bot@1).
function sampleSky(pal, f) {
  const c = Math.max(0, Math.min(1, f));
  return c <= 0.55
    ? lerpRgb(pal.top, pal.mid, c / 0.55)
    : lerpRgb(pal.mid, pal.bot, (c - 0.55) / 0.45);
}

function getPalette(weather, hour) {
  const stops = WEATHER_PALETTES[weather] || WEATHER_PALETTES.clear;
  const last = stops.length - 1;
  let i, h0, h1, j;
  if (hour >= stops[last][0]) {
    // Past the final stop: wrap cyclically toward the first stop (treated as +24h)
    // so 22:00→24:00 interpolates back to the midnight colors instead of extrapolating.
    i = last; j = 0;
    h0 = stops[last][0]; h1 = stops[0][0] + 24;
  } else {
    i = 0;
    for (let k = 0; k < last; k++) {
      if (hour >= stops[k][0] && hour <= stops[k+1][0]) { i = k; break; }
    }
    j = i + 1;
    h0 = stops[i][0]; h1 = stops[j][0];
  }
  const [, c0, s0] = stops[i];
  const [, c1, s1] = stops[j];
  const t = Math.max(0, Math.min(1, (hour - h0) / (h1 - h0 || 1)));
  return {
    top: lerpColor(c0[0], c1[0], t),
    mid: lerpColor(c0[1], c1[1], t),
    bot: lerpColor(c0[2], c1[2], t),
    sun: lerpColor(s0, s1, t),
  };
}

function celestial(hour) {
  const sunriseH = 6.5, sunsetH = 18.5;
  const isDay = hour >= sunriseH && hour <= sunsetH;
  const fracDay = (hour - sunriseH) / (sunsetH - sunriseH);
  const fracNight = hour < sunriseH
    ? (hour + 24 - sunsetH) / (24 - (sunsetH - sunriseH))
    : (hour - sunsetH) / (24 - (sunsetH - sunriseH));
  if (isDay) return { kind: 'sun', alt: Math.sin(fracDay * Math.PI), az: fracDay };
  return { kind: 'moon', alt: Math.sin(fracNight * Math.PI), az: fracNight };
}

export default function WeatherSky({ time, weather = 'clear', intensity = 0.7, style = {}, showStars = true }) {
  const canvasRef = React.useRef(null);
  const [now, setNow] = React.useState(() =>
    time != null ? time : (new Date().getHours() + new Date().getMinutes() / 60)
  );

  React.useEffect(() => {
    if (time != null) { setNow(time); return; }
    const id = setInterval(() => {
      const d = new Date();
      setNow(d.getHours() + d.getMinutes() / 60);
    }, 30000);
    return () => clearInterval(id);
  }, [time]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let t0 = performance.now();

    const fit = () => {
      const dpr = Math.min(2, window.devicePixelRatio || 1);
      const w = canvas.parentElement.offsetWidth;
      const h = canvas.parentElement.offsetHeight;
      canvas.width = w * dpr; canvas.height = h * dpr;
      canvas.style.width = w + 'px'; canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(canvas.parentElement);

    let clouds = [], drops = [], flakes = [], stars = [], lastSeed = '';
    const seed = (w, h) => {
      const key = weather + '|' + Math.round(w) + 'x' + Math.round(h);
      if (key === lastSeed) return;
      lastSeed = key;
      stars = Array.from({ length: 80 }, () => ({
        x: Math.random() * w, y: Math.random() * h * 0.55,
        r: Math.random() * 1.2 + 0.2, tw: Math.random() * Math.PI * 2,
      }));
      const cloudCounts = { clear: 0, partly: 4, cloudy: 9, rain: 8, snow: 7, fog: 12, storm: 9 };
      clouds = Array.from({ length: cloudCounts[weather] ?? 3 }, () => ({
        x: Math.random() * w, y: 30 + Math.random() * h * 0.55,
        r: 50 + Math.random() * 90, v: 0.05 + Math.random() * 0.12,
        a: 0.18 + Math.random() * 0.35,
      }));
      const dropCount = (weather === 'rain' || weather === 'storm') ? Math.round(180 * intensity) : 0;
      drops = Array.from({ length: dropCount }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        v: 6 + Math.random() * 5, len: 10 + Math.random() * 14,
      }));
      const flakeCount = weather === 'snow' ? Math.round(120 * intensity) : 0;
      flakes = Array.from({ length: flakeCount }, () => ({
        x: Math.random() * w, y: Math.random() * h,
        v: 0.6 + Math.random() * 1.2, r: 1 + Math.random() * 2.5,
        sw: Math.random() * Math.PI * 2,
      }));
    };

    let lightningFlash = 0;
    let nextLightning = 4000 + Math.random() * 6000;

    const draw = (ts) => {
      const w = canvas.parentElement.offsetWidth;
      const h = canvas.parentElement.offsetHeight;
      seed(w, h);
      const dt = ts - t0; t0 = ts;

      const pal = getPalette(weather, now);
      const cel = celestial(now);

      const grad = ctx.createLinearGradient(0, 0, 0, h);
      grad.addColorStop(0, pal.top);
      grad.addColorStop(0.55, pal.mid);
      grad.addColorStop(1, pal.bot);
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      const isNight = now < 6 || now > 19.5;
      if (showStars && isNight && weather !== 'fog' && weather !== 'storm') {
        ctx.save();
        for (const s of stars) {
          s.tw += dt * 0.002;
          ctx.fillStyle = `rgba(255,255,255,${0.4 + 0.4 * Math.sin(s.tw)})`;
          ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }

      if (weather !== 'fog' && weather !== 'storm' && cel.alt > 0) {
        const cx = w * cel.az;
        const cy = h * (0.85 - cel.alt * 0.6);
        const sunR = cel.kind === 'sun' ? 50 : 36;
        const sun = hexToRgb(pal.sun);
        const halo = ctx.createRadialGradient(cx, cy, sunR * 0.6, cx, cy, sunR * 4);
        halo.addColorStop(0, `rgba(${sun.r},${sun.g},${sun.b},0.7)`);
        halo.addColorStop(0.4, `rgba(${sun.r},${sun.g},${sun.b},0.18)`);
        halo.addColorStop(1, `rgba(${sun.r},${sun.g},${sun.b},0)`);
        ctx.fillStyle = halo;
        ctx.beginPath(); ctx.arc(cx, cy, sunR * 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = pal.sun;
        ctx.beginPath(); ctx.arc(cx, cy, sunR, 0, Math.PI * 2); ctx.fill();
        if (cel.kind === 'moon') {
          // Carve the crescent by overpainting an offset disk in the local sky color,
          // not destination-out (which would punch a transparent hole through the canvas
          // and reveal the page background behind it).
          ctx.fillStyle = sampleSky(pal, cy / h);
          ctx.beginPath(); ctx.arc(cx - sunR * 0.35, cy - sunR * 0.05, sunR * 0.92, 0, Math.PI * 2); ctx.fill();
        }
      }

      if (clouds.length) {
        ctx.save();
        const cloudTint = weather === 'rain' || weather === 'storm' ? '#3a3e4a'
          : weather === 'snow' ? '#e0e6ec'
          : weather === 'fog' ? '#cdd0d4'
          : isNight ? '#3a3e58'
          : (now < 8 || now > 17.5) ? '#f5c8a4'
          : '#ffffff';
        const ct = hexToRgb(cloudTint);
        for (const c of clouds) {
          c.x += c.v;
          if (c.x - c.r > w) c.x = -c.r;
          for (let p = -1; p <= 1; p++) {
            const px = c.x + p * c.r * 0.45;
            const pr = c.r * (1 - Math.abs(p) * 0.18);
            const g = ctx.createRadialGradient(px, c.y, pr * 0.2, px, c.y, pr);
            g.addColorStop(0, `rgba(${ct.r},${ct.g},${ct.b},${c.a})`);
            g.addColorStop(1, `rgba(${ct.r},${ct.g},${ct.b},0)`);
            ctx.fillStyle = g;
            ctx.beginPath(); ctx.arc(px, c.y, pr, 0, Math.PI * 2); ctx.fill();
          }
        }
        ctx.restore();
      }

      if (drops.length) {
        ctx.save();
        ctx.strokeStyle = 'rgba(180,200,220,0.55)';
        ctx.lineWidth = 1.1; ctx.lineCap = 'round';
        ctx.beginPath();
        for (const d of drops) {
          d.y += d.v; d.x -= 1.2;
          if (d.y > h) { d.y = -10; d.x = Math.random() * w + 30; }
          ctx.moveTo(d.x, d.y); ctx.lineTo(d.x - 2, d.y + d.len);
        }
        ctx.stroke(); ctx.restore();
      }

      if (flakes.length) {
        ctx.save(); ctx.fillStyle = 'rgba(255,255,255,0.85)';
        for (const f of flakes) {
          f.sw += dt * 0.002; f.y += f.v; f.x += Math.sin(f.sw) * 0.4;
          if (f.y > h) { f.y = -5; f.x = Math.random() * w; }
          ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
      }

      if (weather === 'fog') {
        const fg = ctx.createLinearGradient(0, 0, 0, h);
        fg.addColorStop(0, 'rgba(220,220,222,0.05)');
        fg.addColorStop(0.5, 'rgba(220,220,222,0.35)');
        fg.addColorStop(1, 'rgba(220,220,222,0.55)');
        ctx.fillStyle = fg; ctx.fillRect(0, 0, w, h);
      }

      if (weather === 'storm') {
        nextLightning -= dt;
        if (nextLightning <= 0) { lightningFlash = 1; nextLightning = 5000 + Math.random() * 8000; }
        if (lightningFlash > 0) {
          ctx.fillStyle = `rgba(255,255,250,${lightningFlash * 0.55})`;
          ctx.fillRect(0, 0, w, h);
          lightningFlash -= dt * 0.003;
          if (lightningFlash < 0) lightningFlash = 0;
        }
      }

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [now, weather, intensity, showStars]);

  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, display: 'block', ...style }} />;
}
