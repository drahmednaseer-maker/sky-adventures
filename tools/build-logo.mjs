/* Build the header emblem from the source logo.

   The source is a wide JPEG on white: a hiker-and-sun emblem on the left, the
   "sky adventures" wordmark on the right. The two overlap horizontally — the sun
   disc runs to x=325 while the italic wordmark starts around x=250 — so no
   rectangular crop can separate them. Cropping short of the sun (as the first
   attempt did) slices the circle, which reads as a clipped logo.

   Instead: crop wide enough to keep the whole disc, then drop the wordmark by
   connected-component analysis — dark blobs that live only on the right are
   letters; the hiker and pole are one blob anchored on the left. */
import sharp from 'sharp';
import fs from 'node:fs';

const SRC = '/tmp/imgcheck/logo-for-header.jpg';
const CROP_W = 332;          // full sun disc (ends x=325) plus a little air
const PAD = 14;              // transparent breathing room so nothing touches the edge

const trimmed = await sharp(SRC).trim({ threshold: 18 }).png().toBuffer();
const meta = await sharp(trimmed).metadata();
const H = meta.height;

const { data, info } = await sharp(trimmed)
  .extract({ left: 0, top: 0, width: CROP_W, height: H })
  .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const W = info.width, C = 4;

const idx = (x, y) => (y * W + x) * C;
const isDark = (x, y) => {
  const i = idx(x, y);
  return data[i] < 115 && data[i + 1] < 115 && data[i + 2] < 115;
};

/* --- label connected dark regions (4-connectivity, iterative flood fill) --- */
const label = new Int32Array(W * H).fill(-1);
const comps = [];
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    if (!isDark(x, y) || label[y * W + x] !== -1) continue;
    const id = comps.length;
    const comp = { id, size: 0, minX: W, maxX: 0, px: [] };
    const stack = [[x, y]];
    label[y * W + x] = id;
    while (stack.length) {
      const [cx, cy] = stack.pop();
      comp.size++; comp.px.push(cy * W + cx);
      if (cx < comp.minX) comp.minX = cx;
      if (cx > comp.maxX) comp.maxX = cx;
      for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
        const nx = cx + dx, ny = cy + dy;
        if (nx < 0 || ny < 0 || nx >= W || ny >= H) continue;
        if (label[ny * W + nx] !== -1 || !isDark(nx, ny)) continue;
        label[ny * W + nx] = id;
        stack.push([nx, ny]);
      }
    }
    comps.push(comp);
  }
}
comps.sort((a, b) => b.size - a.size);
const keep = new Set(comps.filter((c) => c.size > 150 && c.minX < 240).map((c) => c.id));
const dropped = comps.filter((c) => !keep.has(c.id));
console.log(`dark components: ${comps.length}  kept: ${keep.size}  dropped: ${dropped.length}` +
            `  (largest dropped ${dropped[0]?.size ?? 0}px at x${dropped[0]?.minX ?? '-'})`);

/* --- erase dropped glyphs: sun yellow inside the disc, transparent outside --- */
const CX = 163, CY = 220, R = 162;                 // measured sun disc
const GLYPH_X = 240;                               // hiker never reaches past this inside the disc
const sunAt = (x, y) => {
  // sample the disc's own colour from a mirrored point so the gradient is respected
  const mx = Math.max(0, Math.min(W - 1, CX - (x - CX)));
  const i = idx(mx, y);
  return [data[i], data[i + 1], data[i + 2]];
};
let repaired = 0;
for (const c of dropped) {
  for (const p of c.px) {
    const x = p % W, y = (p / W) | 0;
    const i = p * C;
    const inSun = (x - CX) ** 2 + (y - CY) ** 2 <= R * R;
    if (inSun) {
      const [r, g, b] = sunAt(x, y);
      data[i] = r; data[i + 1] = g; data[i + 2] = b; data[i + 3] = 255;
    } else {
      data[i] = 255; data[i + 1] = 255; data[i + 2] = 255; data[i + 3] = 255;
    }
    repaired++;
  }
}
console.log(`glyph pixels repainted: ${repaired}`);

/* Component removal takes the solid glyph bodies but leaves their anti-aliased
   edges as grey ghosts over the sun. Those are mid-luminance and, unlike the
   hiker's pole, have no solid black nearby — so clear only mid-grey pixels that
   sit at least a few pixels away from any real ink. */
const isYellowish = (r, g, b) => r > 150 && g > 100 && r - b > 55;
const solid = (x, y) => {
  const i = idx(x, y);
  return data[i] < 90 && data[i + 1] < 90 && data[i + 2] < 90 && data[i + 3] > 200;
};
const nearInk = (x, y, rad = 5) => {
  for (let dy = -rad; dy <= rad; dy++) {
    const ny = y + dy;
    if (ny < 0 || ny >= H) continue;
    for (let dx = -rad; dx <= rad; dx++) {
      const nx = x + dx;
      if (nx < 0 || nx >= W) continue;
      if (solid(nx, ny)) return true;
    }
  }
  return false;
};
let ghosts = 0;
for (let y = 0; y < Math.round(H * 0.66); y++) {
  for (let x = GLYPH_X; x < W; x++) {
    const i = idx(x, y);
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    if (lum < 110 || lum > 236) continue;      // real ink, or clean paper
    if (isYellowish(r, g, b)) continue;        // the sun itself
    if (nearInk(x, y)) continue;               // keep the pole's own soft edge
    if ((x - CX) ** 2 + (y - CY) ** 2 <= R * R) {
      const [sr, sg, sb] = sunAt(x, y);
      data[i] = sr; data[i + 1] = sg; data[i + 2] = sb; data[i + 3] = 255;
    } else {
      data[i] = 255; data[i + 1] = 255; data[i + 2] = 255; data[i + 3] = 255;
    }
    ghosts++;
  }
}
console.log(`glyph ghost pixels cleared: ${ghosts}`);

/* --- white -> transparent, and fade the swoosh where the crop cuts it --- */
for (let y = 0; y < H; y++) {
  for (let x = 0; x < W; x++) {
    const i = idx(x, y);
    const [r, g, b] = [data[i], data[i + 1], data[i + 2]];
    if (r > 238 && g > 238 && b > 238) data[i + 3] = 0;
    else if (r > 216 && g > 216 && b > 216) data[i + 3] = 90;
    // the ground ribbon runs off past the crop; ramp it out instead of chopping it
    if (y > H * 0.68 && x > W - 46) {
      const t = (x - (W - 46)) / 46;
      data[i + 3] = Math.round(data[i + 3] * (1 - t));
    }
  }
}

const flat = await sharp(data, { raw: { width: W, height: H, channels: 4 } }).png().toBuffer();
const out = await sharp(flat)
  .trim({ threshold: 1 })
  .extend({ top: PAD, bottom: PAD, left: PAD, right: PAD, background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .resize({ height: 440, kernel: 'lanczos3' })
  .webp({ quality: 92, alphaQuality: 100, effort: 6 })
  .toBuffer();
fs.writeFileSync('public/img/logo-mark-2.webp', out);
const om = await sharp(out).metadata();
console.log(`logo-mark-2.webp: ${om.width}x${om.height}  ${(out.length / 1024).toFixed(0)}KB`);

// refresh the app icons from the same mark
const icon = await sharp({ create: { width: 512, height: 512, channels: 4, background: { r: 11, g: 18, b: 32, alpha: 1 } } })
  .composite([{ input: await sharp(out).resize({ height: 380 }).toBuffer(), gravity: 'center' }])
  .png().toBuffer();
fs.writeFileSync('src/app/icon.png', icon);
fs.writeFileSync('src/app/apple-icon.png', await sharp(icon).resize(180, 180).png().toBuffer());

await sharp(out).resize({ height: 340 }).flatten({ background: '#ffffff' }).jpeg({ quality: 95 }).toFile('/tmp/logo-check.jpg');
console.log(JSON.stringify({ src: '/img/logo-mark-2.webp', w: om.width, h: om.height }));
