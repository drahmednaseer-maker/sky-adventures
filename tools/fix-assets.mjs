import sharp from 'sharp';
import fs from 'node:fs';

const OUT = 'public/img';
const manifest = JSON.parse(fs.readFileSync('tools/data/img-manifest.json', 'utf8'));

const blurOf = async (buf) => {
  const b = await sharp(buf).resize({ width: 16 }).webp({ quality: 30 }).toBuffer();
  return `data:image/webp;base64,${b.toString('base64')}`;
};

/* ---------------- 1. Logo emblem: crop, drop the white box, keep it sharp ---------------- */
// The source logo is a 1042x625 JPEG on solid white: a hiker-and-sun emblem on the left,
// the "sky adventures" wordmark on the right. The header pairs the emblem with live text,
// so crop to the emblem only (measured gap between artwork and wordmark is at x=282
// once the surrounding whitespace is trimmed) and make the white ground transparent.
const trimmed = await sharp('/tmp/imgcheck/logo-for-header.jpg').trim({ threshold: 18 }).png().toBuffer();
const emblem = await sharp(trimmed).extract({ left: 0, top: 0, width: 282, height: 600 }).toBuffer();

const { data, info } = await sharp(emblem).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
for (let i = 0; i < data.length; i += 4) {
  const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
  if (r > 238 && g > 238 && b > 238) data[i + 3] = 0;              // white ground -> transparent
  else if (r > 216 && g > 216 && b > 216) data[i + 3] = 90;        // soften the JPEG halo
}
const logoBuf = await sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
  .resize({ height: 400, withoutEnlargement: false, kernel: 'lanczos3' })
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toBuffer();
fs.writeFileSync(`${OUT}/logo-mark.webp`, logoBuf);
const lm = await sharp(logoBuf).metadata();
const logoEntry = { src: '/img/logo-mark.webp', w: lm.width, h: lm.height, blur: await blurOf(logoBuf) };
console.log(`logo-mark.webp        ${lm.width}x${lm.height}  ${(logoBuf.length / 1024).toFixed(0)}KB (transparent)`);

// favicon / apple-touch icon from the same emblem, on brand ground
const iconBuf = await sharp({
  create: { width: 512, height: 512, channels: 4, background: { r: 11, g: 18, b: 32, alpha: 1 } },
}).composite([{
  input: await sharp(logoBuf).resize({ height: 400 }).toBuffer(),
  gravity: 'center',
}]).png().toBuffer();
fs.writeFileSync('src/app/icon.png', iconBuf);
fs.writeFileSync('src/app/apple-icon.png', await sharp(iconBuf).resize(180, 180).png().toBuffer());
console.log('icon.png / apple-icon.png written');

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

fs.writeFileSync('tools/data/new-assets.json', JSON.stringify({ logo: logoEntry, big }, null, 1));
console.log('\nwrote tools/data/new-assets.json');
