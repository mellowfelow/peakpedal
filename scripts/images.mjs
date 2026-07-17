// Processes assets/product-photos/<slug>[-N].(jpg|png|webp) into public/images/<slug>[-N].webp:
// trims uniform borders, contain-fits onto a white 1600x1200 (4:3) canvas at 96% fill, WebP q86.
// Run after dropping real product photos in: npm run images
import { readdir, mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const SRC = path.join(ROOT, 'assets', 'product-photos');
const OUT = path.join(ROOT, 'public', 'images');
const CANVAS_W = 1600;
const CANVAS_H = 1200;
const FILL = 0.96;

async function main() {
  await mkdir(OUT, { recursive: true });
  let files;
  try {
    files = (await readdir(SRC)).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));
  } catch {
    console.log('No assets/product-photos directory found — nothing to process yet.');
    return;
  }

  if (files.length === 0) {
    console.log('assets/product-photos/ is empty — every product will keep using /images/placeholder.svg until real photos are added.');
    return;
  }

  for (const file of files) {
    const slug = path.basename(file, path.extname(file));
    const src = path.join(SRC, file);
    const trimmed = await sharp(src).trim().toBuffer();
    const meta = await sharp(trimmed).metadata();

    const targetW = Math.round(CANVAS_W * FILL);
    const targetH = Math.round(CANVAS_H * FILL);
    const scale = Math.min(targetW / meta.width, targetH / meta.height);
    const resizedW = Math.round(meta.width * scale);
    const resizedH = Math.round(meta.height * scale);

    const out = path.join(OUT, `${slug}.webp`);
    await sharp({
      create: { width: CANVAS_W, height: CANVAS_H, channels: 3, background: '#ffffff' },
    })
      .composite([{ input: await sharp(trimmed).resize(resizedW, resizedH).toBuffer(), gravity: 'center' }])
      .webp({ quality: 86 })
      .toFile(out);

    console.log(`  ${file} -> images/${slug}.webp (${CANVAS_W}x${CANVAS_H}, contain-fit ${Math.round(FILL * 100)}%)`);
  }

  console.log(`\nProcessed ${files.length} photo(s). Update each product's \`images\` array in src/config/site.js to point at /images/<slug>.webp.`);
}

main();
