// One-off batch import: matches assets/product-photos/*.* (friendly names) to
// PRODUCTS by name, processes each onto a white 4:3 canvas per skill spec, and
// writes public/images/<slug>.webp. Prints a mapping to paste into site.js and
// flags anything that couldn't be confidently matched.
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { PRODUCTS } from '../src/config/site.js';

const SRC = path.resolve('assets/product-photos');
const OUT = path.resolve('public/images');
const CANVAS_W = 1600;
const CANVAS_H = 1200;
const FILL = 0.96;

// Manual overrides for files saved under a name that predates a product rename.
const MANUAL_OVERRIDES = {
  'cannondale-moterra-sl-2': 'Cannondale Moterra SL 2.webp',
};

function normName(s) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '');
}
function normFile(f) {
  const noExt = f.replace(/\.(jpe?g|png|webp|avif)$/i, '');
  const noCopy = noExt.replace(/\s*\(\d+\)$/, '');
  return normName(noCopy);
}

async function main() {
  await mkdir(OUT, { recursive: true });
  const files = await readdir(SRC);

  const fileMap = {};
  for (const f of files) {
    const key = normFile(f);
    fileMap[key] = fileMap[key] || [];
    fileMap[key].push(f);
  }

  const mapping = {}; // slug -> filename
  const unmatchedProducts = [];
  const usedFiles = new Set();

  for (const p of PRODUCTS) {
    if (MANUAL_OVERRIDES[p.slug]) {
      mapping[p.slug] = MANUAL_OVERRIDES[p.slug];
      usedFiles.add(MANUAL_OVERRIDES[p.slug]);
      continue;
    }
    const key = normName(p.name);
    const candidates = fileMap[key];
    if (candidates && candidates.length) {
      // Prefer the filename without a " (1)" duplicate suffix.
      const chosen = candidates.find((f) => !/\(\d+\)/.test(f)) || candidates[0];
      mapping[p.slug] = chosen;
      candidates.forEach((f) => usedFiles.add(f));
    } else {
      unmatchedProducts.push(p.name);
    }
  }

  const unusedFiles = files.filter((f) => !usedFiles.has(f));

  console.log(`Matched ${Object.keys(mapping).length}/${PRODUCTS.length} products.\n`);

  if (unmatchedProducts.length) {
    console.log('PRODUCTS WITH NO PHOTO (still on placeholder):');
    unmatchedProducts.forEach((n) => console.log('  -', n));
    console.log('');
  }
  if (unusedFiles.length) {
    console.log('UPLOADED FILES NOT USED (no matching product, or duplicate):');
    unusedFiles.forEach((f) => console.log('  -', f));
    console.log('');
  }

  console.log('Processing images...');
  const results = {};
  for (const [slug, file] of Object.entries(mapping)) {
    const src = path.join(SRC, file);
    const out = path.join(OUT, `${slug}.webp`);
    try {
      const trimmed = await sharp(src).trim().toBuffer();
      const meta = await sharp(trimmed).metadata();
      const targetW = Math.round(CANVAS_W * FILL);
      const targetH = Math.round(CANVAS_H * FILL);
      const scale = Math.min(targetW / meta.width, targetH / meta.height);
      const resizedW = Math.round(meta.width * scale);
      const resizedH = Math.round(meta.height * scale);

      await sharp({ create: { width: CANVAS_W, height: CANVAS_H, channels: 3, background: '#ffffff' } })
        .composite([{ input: await sharp(trimmed).resize(resizedW, resizedH).toBuffer(), gravity: 'center' }])
        .webp({ quality: 86 })
        .toFile(out);

      results[slug] = `/images/${slug}.webp`;
    } catch (e) {
      console.log(`  FAILED: ${slug} (${file}) - ${e.message}`);
    }
  }

  console.log(`\nProcessed ${Object.keys(results).length} images into public/images/.`);
  console.log('\n--- Paste this into site.js REAL_IMAGES ---');
  console.log(JSON.stringify(results, null, 2));
}

main();
