// Processes two one-off raw asset drops into public/images/:
//   assets/brand-logos/<brand-slug>.(jpg|png|webp)      -> public/images/brands/<brand-slug>.webp
//     trimmed, letterboxed onto a white 400x200 (2:1) canvas at 90% fill — logos keep their own
//     aspect ratio (never stretched/cropped the way product photos are).
//   assets/category-photos/<category-slug>.(avif|jpg|png|webp) -> public/images/categories/<category-slug>.webp
//     cover-cropped to 1600x1200 (4:3) — these are real lifestyle/trail photos, not product
//     cutouts, so they fill the frame edge-to-edge instead of sitting on white.
// Run after dropping raw files in either folder: npm run images:brand-assets
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const LOGO_SRC = path.join(ROOT, 'assets', 'brand-logos');
const LOGO_OUT = path.join(ROOT, 'public', 'images', 'brands');
const CATEGORY_SRC = path.join(ROOT, 'assets', 'category-photos');
const CATEGORY_OUT = path.join(ROOT, 'public', 'images', 'categories');

async function listImages(dir) {
  try {
    return (await readdir(dir)).filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f));
  } catch {
    return null;
  }
}

async function processLogos() {
  const files = await listImages(LOGO_SRC);
  if (!files) return console.log('No assets/brand-logos directory found — skipping brand logos.');
  if (files.length === 0) return console.log('assets/brand-logos/ is empty — skipping brand logos.');

  await mkdir(LOGO_OUT, { recursive: true });
  const CANVAS_W = 400;
  const CANVAS_H = 200;
  const FILL = 0.9;

  for (const file of files) {
    const slug = path.basename(file, path.extname(file));
    const src = path.join(LOGO_SRC, file);
    const trimmed = await sharp(src).trim().toBuffer();
    const meta = await sharp(trimmed).metadata();

    const targetW = Math.round(CANVAS_W * FILL);
    const targetH = Math.round(CANVAS_H * FILL);
    const scale = Math.min(targetW / meta.width, targetH / meta.height, 1);
    const resizedW = Math.round(meta.width * scale);
    const resizedH = Math.round(meta.height * scale);

    const out = path.join(LOGO_OUT, `${slug}.webp`);
    await sharp({
      create: { width: CANVAS_W, height: CANVAS_H, channels: 4, background: { r: 255, g: 255, b: 255, alpha: 0 } },
    })
      .composite([{ input: await sharp(trimmed).resize(resizedW, resizedH).toBuffer(), gravity: 'center' }])
      .webp({ quality: 90 })
      .toFile(out);

    console.log(`  brand-logos/${file} -> images/brands/${slug}.webp`);
  }
}

// Per-slug crop anchor for cover-fitting portrait source photos onto the 4:3 tile canvas.
// 'attention' (sharp's saliency auto-crop) works for close-up/detail shots but guesses wrong on
// wide action shots where the rider/bike sits low in a tall frame — 'south' anchors to the
// bottom there instead so the bike isn't cropped out. Checked visually per image; not a formula.
const CATEGORY_CROP_POSITION = {
  'full-suspension-electric-mountain-bikes': 'attention',
  'hardtail-electric-mountain-bikes': 'attention',
  'lightweight-electric-mountain-bikes': 'south',
  'enduro-electric-mountain-bikes': 'south',
};

async function processCategoryPhotos() {
  const files = await listImages(CATEGORY_SRC);
  if (!files) return console.log('No assets/category-photos directory found — skipping category photos.');
  if (files.length === 0) return console.log('assets/category-photos/ is empty — skipping category photos.');

  await mkdir(CATEGORY_OUT, { recursive: true });
  const CANVAS_W = 1600;
  const CANVAS_H = 1200;

  for (const file of files) {
    const slug = path.basename(file, path.extname(file));
    const src = path.join(CATEGORY_SRC, file);
    const out = path.join(CATEGORY_OUT, `${slug}.webp`);
    const position = CATEGORY_CROP_POSITION[slug] || 'attention';
    await sharp(src).resize(CANVAS_W, CANVAS_H, { fit: 'cover', position }).webp({ quality: 82 }).toFile(out);
    console.log(`  category-photos/${file} -> images/categories/${slug}.webp (${position})`);
  }
}

async function main() {
  await processLogos();
  await processCategoryPhotos();
  console.log('\nDone. Brand logos and category photos are wired in automatically by slug — no config changes needed.');
}

main();
