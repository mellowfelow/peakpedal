// Pings IndexNow (Bing, Yandex, Seznam, …) with the full URL list after a
// PRODUCTION build, so new/changed pages are picked up in minutes instead of
// waiting for the next organic crawl. Runs as `postbuild`.
//
// No-op unless VERCEL_ENV === 'production' (so local + preview builds do nothing).
// Force a manual re-submit from any machine:  npm run indexnow
//
// Never fails the build — any error just logs and exits 0.
import {
  SITE,
  CATEGORY_PAGES,
  PRODUCTS,
  POSTS,
  ACCESSORIES,
} from '../src/config/site.js';

const done = (msg) => {
  console.log(`IndexNow: ${msg}`);
  process.exit(0);
};

const forced = process.argv.includes('--force') || process.env.INDEXNOW_FORCE === '1';
const isProd = process.env.VERCEL_ENV === 'production' || forced;
if (!isProd) done('skipped (not a production build).');

const key = SITE.indexNowKey;
if (!key || key.startsWith('pending') || key.startsWith('YOUR')) done('skipped (no IndexNow key set).');

const base = `https://${SITE.domain}`;
const STATIC = ['/', '/about/', '/contact/', '/faq/', '/blog/', '/accessories/', '/shipping/', '/refund/', '/privacy/', '/terms/'];

const urlList = [
  ...STATIC.map((p) => base + p),
  ...CATEGORY_PAGES.map((c) => `${base}/${c.slug}/`),
  ...PRODUCTS.map((p) => `${base}/products/${p.slug}/`),
  ...POSTS.map((p) => `${base}/blog/${p.slug}/`),
  ...ACCESSORIES.map((a) => `${base}/accessories/${a.slug}/`),
];

try {
  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: SITE.domain,
      key,
      keyLocation: `${base}/${key}.txt`,
      urlList,
    }),
  });
  done(`submitted ${urlList.length} URLs — HTTP ${res.status}`);
} catch (err) {
  done(`request failed (non-fatal): ${err.message}`);
}
