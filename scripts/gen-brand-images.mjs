// Generates the brand raster assets that need to be real PNG (not SVG):
//   public/images/og-default.png  — 1200x630 social share card (homepage, category,
//                                   brand, blog index, legal pages — anywhere without
//                                   its own photo). SVG is not a valid OG image format.
//   public/images/logo.png        — 512x512 square logo for Organization JSON-LD
//                                   (Google Search does not support SVG logos).
// Deterministic — derived from SITE config. Regenerate after a brand colour / name /
// tagline / catalogue-size change:  node scripts/gen-brand-images.mjs
// Deliberately NOT in `prebuild`: a font-rendering hiccup must never break a deploy.
import path from 'node:path';
import sharp from 'sharp';
import { SITE, PRODUCTS } from '../src/config/site.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT = path.join(ROOT, 'public', 'images');

const FOREST = SITE.colors.primary; // #14432A
const LIME = SITE.colors.accent; // #A8FF3E
const brandCount = new Set(PRODUCTS.map((p) => p.brand)).size;
const FONT = 'Arial, Helvetica, sans-serif';

// The favicon mark (peak + two wheels) as a flat <path>+<circle> string at a given translate/scale.
const markAt = (tx, ty, s, stroke, opacity = 1) =>
  `<g transform="translate(${tx} ${ty}) scale(${s})" opacity="${opacity}"><path d="M6 22 L13 10 L17 17 L21 10 L27 22" stroke="${stroke}" stroke-width="2.6" fill="none" stroke-linejoin="round" stroke-linecap="round"/><circle cx="10" cy="23" r="2.8" fill="${stroke}"/><circle cx="23" cy="23" r="2.8" fill="${stroke}"/></g>`;

const og = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">',
  `<rect width="1200" height="630" fill="${FOREST}"/>`,
  markAt(700, 180, 22, LIME, 0.13),
  `<rect x="0" y="0" width="1200" height="8" fill="${LIME}"/>`,
  markAt(88, 74, 2.4, LIME),
  `<text x="176" y="118" font-family="${FONT}" font-size="42" font-weight="700" fill="#ffffff">${SITE.name}</text>`,
  `<text x="90" y="322" font-family="${FONT}" font-size="74" font-weight="700" fill="#ffffff">Electric Mountain</text>`,
  `<text x="90" y="406" font-family="${FONT}" font-size="74" font-weight="700" fill="#ffffff">Bike Specialists</text>`,
  `<text x="92" y="462" font-family="${FONT}" font-size="30" font-weight="700" fill="${LIME}">${SITE.tagline}</text>`,
  `<text x="90" y="560" font-family="${FONT}" font-size="25" fill="#cdd8cc">${PRODUCTS.length} eMTBs&#160;&#160;&#8226;&#160;&#160;${brandCount} brands&#160;&#160;&#8226;&#160;&#160;Free UK delivery</text>`,
  '</svg>',
].join('');

const logo = [
  '<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">',
  `<rect width="512" height="512" rx="96" fill="${FOREST}"/>`,
  markAt(70, 70, 12, LIME),
  '</svg>',
].join('');

async function main() {
  await sharp(Buffer.from(og)).png().toFile(path.join(OUT, 'og-default.png'));
  await sharp(Buffer.from(logo)).png().toFile(path.join(OUT, 'logo.png'));
  console.log('Wrote public/images/og-default.png (1200x630) and public/images/logo.png (512x512).');
}

main();
