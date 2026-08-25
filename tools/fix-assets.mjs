import sharp from 'sharp';
import fs from 'node:fs';

const OUT = 'public/img';
const manifest = JSON.parse(fs.readFileSync('tools/data/img-manifest.json', 'utf8'));

const blurOf = async (buf) => {
  const b = await sharp(buf).resize({ width: 16 }).webp({ quality: 30 }).toBuffer();
  return `data:image/webp;base64,${b.toString('base64')}`;
};

/* ---------------- 1. Logo emblem ----------------
   Superseded by tools/build-logo.mjs — this script's crop sliced the sun disc.
   ------------------------------------------------------------------------- */

/* ---------------- 2. Full-bleed images re-encoded at 2560px ---------------- */
// These are used edge-to-edge, so the old 1600px cap left them soft on wide and retina screens.
const BIG = [
  ['/tmp/hires/Rakaposhi-Base-Camp-Trek-2.jpg', 'hero-rakaposhi.webp', 2560],
  ['/tmp/hires/Spantik4.jpg',                   'hero-spantik.webp',   2560],
  ['/tmp/hires/tirich-mip2.jpg',                'hero-tirich.webp',    2560],
  ['/tmp/hires/Batura-Glacier-Yak-Trek-2.jpg',  'hero-batura.webp',    2560],
  ['/tmp/hires/Laila-peak-6096M-Expedition.jpg','hero-laila.webp',     1844],
];
const big = {};
for (const [src, name, cap] of BIG) {
  const m = await sharp(src).metadata();
  const w = Math.min(m.width, cap);
  const buf = await sharp(src).rotate().resize({ width: w, withoutEnlargement: true, kernel: 'lanczos3' })
    .webp({ quality: 80, effort: 6 }).toBuffer();
  fs.writeFileSync(`${OUT}/${name}`, buf);
  const om = await sharp(buf).metadata();
  big[name] = { src: `/img/${name}`, w: om.width, h: om.height, blur: await blurOf(buf) };
  console.log(`${name.padEnd(22)}${om.width}x${om.height}  ${(buf.length / 1024).toFixed(0)}KB  (was ${m.width}x${m.height})`);
}

/* ---------------- 3. Portrait crop for the "why us" panel ---------------- */
// The old image here was only 467x623 and rendered ~520px wide.
const portraitBuf = await sharp('/tmp/hires/Spantik4.jpg').rotate()
  .resize({ width: 1200, height: 1500, fit: 'cover', position: 'attention', kernel: 'lanczos3' })
  .webp({ quality: 82, effort: 6 }).toBuffer();
fs.writeFileSync(`${OUT}/why-karakoram.webp`, portraitBuf);
big['why-karakoram.webp'] = { src: '/img/why-karakoram.webp', w: 1200, h: 1500, blur: await blurOf(portraitBuf) };
console.log(`why-karakoram.webp    1200x1500  ${(portraitBuf.length / 1024).toFixed(0)}KB`);

fs.writeFileSync('tools/data/new-assets.json', JSON.stringify({ big }, null, 1));
console.log('\nwrote tools/data/new-assets.json');
