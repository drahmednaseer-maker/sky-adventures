import sharp from '/Users/cmpostudio/Skyadventures/web/node_modules/sharp/lib/index.js';
import fs from 'node:fs';
import path from 'node:path';

const SRC = 'scrape/raw';
const OUT = 'web/public/img';
fs.mkdirSync(OUT, { recursive: true });

const files = fs.readdirSync(SRC).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
const manifest = {};
let totalIn = 0, totalOut = 0;

// slugify original upload path -> stable short name
function nameOf(f) {
  return f.replace(/\.(jpe?g|png|webp)$/i, '')
          .replace(/^\d{4}_\d{2}_/, '')
          .replace(/[^a-zA-Z0-9]+/g, '-')
          .replace(/^-|-$/g, '')
          .toLowerCase().slice(0, 60);
}

const used = new Set();
for (const f of files) {
  const inPath = path.join(SRC, f);
  const stat = fs.statSync(inPath);
  totalIn += stat.size;
  let base = nameOf(f);
  let n = base, i = 2;
  while (used.has(n)) n = `${base}-${i++}`;
  used.add(n);

  try {
    const img = sharp(inPath, { failOn: 'none' });
    const meta = await img.metadata();
    const w = meta.width || 1600;
    // cap at 1600 wide; produce single high-quality webp (next/image handles resizing)
    const target = Math.min(w, 1600);
    const buf = await sharp(inPath, { failOn: 'none' })
      .rotate()
      .resize({ width: target, withoutEnlargement: true })
      .webp({ quality: 76, effort: 5 })
      .toBuffer();
    const outFile = `${n}.webp`;
    fs.writeFileSync(path.join(OUT, outFile), buf);
    totalOut += buf.length;
    // tiny blur placeholder
    const blur = await sharp(inPath, { failOn: 'none' })
      .rotate().resize({ width: 16 }).webp({ quality: 30 }).toBuffer();
    manifest[f] = {
      src: `/img/${outFile}`,
      w: target,
      h: Math.round((meta.height || target) * (target / w)),
      blur: `data:image/webp;base64,${blur.toString('base64')}`,
    };
  } catch (e) {
    console.error('FAIL', f, e.message);
  }
}
fs.writeFileSync('scrape/img-manifest.json', JSON.stringify(manifest, null, 1));
console.log(`images: ${Object.keys(manifest).length}`);
console.log(`in:  ${(totalIn/1048576).toFixed(1)} MB`);
console.log(`out: ${(totalOut/1048576).toFixed(1)} MB  (${(100 - totalOut/totalIn*100).toFixed(0)}% smaller)`);
