// One-off batch import for the Part 5 accessories catalog. Matches
// assets/accessory-photos/*.* to ACCESSORIES by an explicit slug->filename
// map (fuzzy name-matching wasn't reliable here — too many filenames use
// shortened or reordered wording versus the product name), processes each
// onto a white 4:3 canvas per the existing image pipeline, and writes
// public/images/<slug>.webp.
//
// Also fixes the 2 bike product photos that failed in the original Part 2
// import (corrupt AVIF source files) — the client re-supplied both as .webp
// in this same folder.
import { mkdir } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const SRC = path.resolve('assets/accessory-photos');
const OUT = path.resolve('public/images');
const CANVAS_W = 1600;
const CANVAS_H = 1200;
const FILL = 0.96;

const ACCESSORY_FILES = {
  'bosch-powertube-750-battery': 'Bosch PowerTube 750.jpg',
  'bosch-powertube-500-battery': 'Bosch PowerTube 500.jpg',
  'shimano-bt-e8036-630wh-battery': 'Shimano BT-E8036 630Wh Battery.jpg',
  'dji-avinox-800wh-battery': 'DJI Avinox 800Wh Battery.png',
  'fazua-ride-60-battery': 'Fazua Ride 60 Battery.jpg',
  'bosch-4a-fast-charger': 'Bosch 4A Fast Charger.jpg',
  'bosch-2a-compact-charger': 'Bosch 2A Compact Charger.jpg',
  'shimano-steps-charger-ec-e6002': 'Shimano STEPS Charger EC-E6002.webp',
  'dji-avinox-fast-charger': 'DJI Avinox Fast Charger.jpg',
  'bosch-purion-200-display': 'Bosch Purion 200 Display.webp',
  'shimano-sc-em800-display': 'Shimano SC-EM800 Display.jpg',
  'bosch-performance-line-cx-motor-unit': 'Bosch Performance Line CX Motor Unit.png',
  'ebike-torque-arm-kit': 'Torque Arm Kit (Bosch or Shimano compatible).jpg',
  'mtb-full-face-helmet': 'MTB Full-Face Helmet (Trail or Enduro rated).webp',
  'mtb-trail-helmet': 'MTB Open-Face Trail Helmet.jpg',
  'mtb-knee-elbow-pad-set': 'Knee & Elbow Pad Set.jpg',
  'mtb-gloves': 'MTB Gloves.webp',
  'ebike-rated-lock': 'Battery or Frame Lock.jpg',
  'torque-wrench-set': 'Torque Wrench Set (carbon frame safe).jpg',
  'chain-wear-indicator-tool': 'Chain Wear Indicator Tool.jpg',
  'emtb-cleaning-kit': 'eMTB-Specific Cleaning Kit.webp',
  'mtb-puncture-repair-kit': 'Puncture Repair Kit (eMTB tyre rated).webp',
  'schwalbe-magic-mary-evo': 'Schwalbe Magic Mary Evo (E-Bike rated).jpg',
  'schwalbe-nobby-nic-evo': 'Schwalbe Nobby Nic Evo (E-Bike rated).jpg',
  'maxxis-minion-dhf-dhr': 'Maxxis Minion DHF or DHR (E-Bike rated).jpg',
  'emtb-rated-bike-rack': 'eMTB-Rated Bike Rack (Thule Saris).webp',
  'waterproof-emtb-bike-cover': 'Bike Cover (Waterproof.webp',
  'frame-top-tube-bag': 'Frame Bag  Top Tube Bag.webp',
  'front-rear-light-set': 'Front + Rear Light Set (trail-rated).jpg',
  'emtb-baggy-shorts': 'eMTB-Specific Baggy Shorts.jpg',
  'mtb-jersey': 'fox MTB Jersey.jpg',
};

// bosch-powermore-250-range-extender and bosch-kiox-300-display were already
// processed in Part 2 (as PRODUCTS) — reprocessed here from the same source
// folder used back then, just under the accessory's (possibly renamed) slug.
const CARRYOVER_FILES = {
  'bosch-powermore-250-range-extender': path.resolve('assets/product-photos', 'Bosch PowerMore 250Wh Range Extender.webp'),
  'bosch-kiox-300-display': path.resolve('assets/product-photos', 'Bosch Kiox 300 Display Unit.jpg'),
};

// The 2 bike photos that failed Part 2's import (corrupt AVIF) — re-supplied
// as .webp in this same accessories folder.
const BONUS_PRODUCT_FIXES = {
  'canyon-grand-canyon-on-cf-7': 'Canyon Grand Canyon ON CF 7.webp',
  'haibike-nduro-6': 'haibike-nduro-6.webp',
};

async function processOne(slug, srcPath) {
  const out = path.join(OUT, `${slug}.webp`);
  const trimmed = await sharp(srcPath).trim().toBuffer();
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
}

async function main() {
  await mkdir(OUT, { recursive: true });

  console.log('Processing accessory images...');
  const results = {};
  for (const [slug, file] of Object.entries(ACCESSORY_FILES)) {
    try {
      await processOne(slug, path.join(SRC, file));
      results[slug] = `/images/${slug}.webp`;
      console.log(`  OK: ${slug} <- ${file}`);
    } catch (e) {
      console.log(`  FAILED: ${slug} (${file}) - ${e.message}`);
    }
  }

  console.log('\nReprocessing carried-over accessories (previously PRODUCTS)...');
  for (const [slug, srcPath] of Object.entries(CARRYOVER_FILES)) {
    try {
      await processOne(slug, srcPath);
      results[slug] = `/images/${slug}.webp`;
      console.log(`  OK: ${slug} <- ${path.basename(srcPath)}`);
    } catch (e) {
      console.log(`  FAILED: ${slug} - ${e.message}`);
    }
  }

  console.log('\nFixing 2 bonus product photos (Part 2 corrupt-AVIF replacements)...');
  const bonusResults = {};
  for (const [slug, file] of Object.entries(BONUS_PRODUCT_FIXES)) {
    try {
      await processOne(slug, path.join(SRC, file));
      bonusResults[slug] = `/images/${slug}.webp`;
      console.log(`  OK: ${slug} <- ${file}`);
    } catch (e) {
      console.log(`  FAILED: ${slug} (${file}) - ${e.message}`);
    }
  }

  console.log(`\nProcessed ${Object.keys(results).length}/${Object.keys(ACCESSORY_FILES).length + Object.keys(CARRYOVER_FILES).length} accessory images.`);
  console.log('--- Paste into site.js ACCESSORY_IMAGES ---');
  console.log(JSON.stringify(results, null, 2));

  console.log(`\nProcessed ${Object.keys(bonusResults).length}/${Object.keys(BONUS_PRODUCT_FIXES).length} bonus product images.`);
  console.log('--- Paste into site.js PRODUCT_IMAGES ---');
  console.log(JSON.stringify(bonusResults, null, 2));
}

main();
