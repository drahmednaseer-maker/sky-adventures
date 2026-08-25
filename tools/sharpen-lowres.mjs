/* The source site has no higher-resolution version of some photos (636x426 is the original
   upload). A lanczos upscale plus a light unsharp mask reads noticeably better than letting
   the browser bilinear-scale them on a 2x display. It adds no detail — it just stops them
   looking mushy. */
import sharp from 'sharp';
import fs from 'node:fs';
import https from 'node:https';

const manifest = JSON.parse(fs.readFileSync('tools/data/img-manifest.json', 'utf8'));
const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0 Safari/537.36';
const get = (url) => new Promise((res, rej) => {
  https.get(url, { headers: { 'User-Agent': UA } }, (r) => {
    if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) return get(r.headers.location).then(res, rej);
    if (r.statusCode !== 200) return rej(new Error(String(r.statusCode)));
    const c = []; r.on('data', d => c.push(d)); r.on('end', () => res(Buffer.concat(c)));
  }).on('error', rej);
});

const targets = [];
for (const [key, v] of Object.entries(manifest)) {
  const p = 'public' + v.src;
  if (!fs.existsSync(p)) continue;
  const m = await sharp(p).metadata();
  if (m.width < 800) targets.push({ key, v, w: m.width, h: m.height });
}
console.log(`${targets.length} images below 800px wide\n`);

let done = 0, gained = 0;
for (const t of targets) {
  const url = 'https://skyadventures.com.pk/wp-content/uploads/' + t.key.replace(/_/g, '/').replace(/^(\d{4})\/(\d{2})\//, '$1/$2/');
  let src;
  try { src = await get(url); } catch { console.log(`  skip (fetch ${t.key})`); continue; }
  let m;
  try { m = await sharp(src).metadata(); } catch { continue; }

  // upscale to ~1.6x (capped at 1100px) then unsharp
  const target = Math.min(Math.round(m.width * 1.6), 1100);
  const buf = await sharp(src).rotate()
    .resize({ width: target, kernel: 'lanczos3' })
    .sharpen({ sigma: 0.9, m1: 0.6, m2: 2.4 })
    .webp({ quality: 84, effort: 6 })
    .toBuffer();
  const out = 'public' + t.v.src;
  const before = fs.statSync(out).size;
  fs.writeFileSync(out, buf);
  const om = await sharp(buf).metadata();
  manifest[t.key] = { ...t.v, w: om.width, h: om.height };
  done++; gained += buf.length - before;
  if (done <= 8) console.log(`  ${t.v.src.split('/').pop().padEnd(34)} ${t.w}x${t.h} -> ${om.width}x${om.height}`);
}
fs.writeFileSync('tools/data/img-manifest.json', JSON.stringify(manifest, null, 1));
console.log(`\nre-encoded ${done} images (+${(gained / 1048576).toFixed(1)} MB)`);
