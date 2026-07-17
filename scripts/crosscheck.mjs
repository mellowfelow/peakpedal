// Pre-ship crosscheck. Run via `npm run crosscheck` after `npm run build`.
// Exits non-zero on any FAIL. WARN items don't block but should be resolved before real launch.
import { readFile, readdir, stat, access } from 'node:fs/promises';
import path from 'node:path';
import {
  SITE,
  PRODUCTS,
  CATEGORY_PAGES,
  FORMS,
} from '../src/config/site.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const failures = [];
const warnings = [];
const passes = [];

function fail(msg) {
  failures.push(msg);
}
function warn(msg) {
  warnings.push(msg);
}
function pass(msg) {
  passes.push(msg);
}

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function readJson(relPath) {
  const full = path.join(ROOT, relPath);
  const raw = await readFile(full, 'utf8');
  return JSON.parse(raw);
}

// ---------------------------------------------------------------------------
// 1. Config sanity
// ---------------------------------------------------------------------------
async function checkConfig() {
  const productSlugs = PRODUCTS.map((p) => p.slug);
  const dupProducts = productSlugs.filter((s, i) => productSlugs.indexOf(s) !== i);
  if (dupProducts.length) fail(`Duplicate product slugs: ${[...new Set(dupProducts)].join(', ')}`);
  else pass(`${PRODUCTS.length} product slugs are unique`);

  const catSlugs = CATEGORY_PAGES.map((c) => c.slug);
  const dupCats = catSlugs.filter((s, i) => catSlugs.indexOf(s) !== i);
  if (dupCats.length) fail(`Duplicate category-page slugs: ${[...new Set(dupCats)].join(', ')}`);
  else pass(`${CATEGORY_PAGES.length} category-page slugs are unique`);

  const RESERVED = ['about', 'contact', 'faq', 'cart', 'order', 'blog', 'search', 'thank-you-contact', 'thank-you-order', 'shipping', 'refund', 'privacy', 'terms', 'products', 'api'];
  const collisions = catSlugs.filter((s) => RESERVED.includes(s));
  if (collisions.length) fail(`Category-page slug(s) collide with a reserved static route: ${collisions.join(', ')}`);
  else pass('No category-page slug collides with a reserved static route');

  const noImage = PRODUCTS.filter((p) => !p.images || p.images.length === 0);
  if (noImage.length) fail(`${noImage.length} product(s) have no image entry: ${noImage.map((p) => p.slug).join(', ')}`);
  else pass('Every product has at least one image entry');

  for (const p of PRODUCTS) {
    for (const img of p.images) {
      if (img.startsWith('/')) {
        const full = path.join(ROOT, 'public', img);
        if (!(await exists(full))) fail(`Product "${p.slug}" references missing image file: public${img}`);
      }
    }
  }
  pass('All referenced product image files exist on disk');

  if (FORMS.provider === 'resend') {
    fail('FORMS.provider is "resend" but this build has no static-export constraint check — confirm /api/contact exists (Vercel only).');
  } else {
    pass(`Forms provider is "${FORMS.provider}"`);
  }

  if (!FORMS.web3formsKey || FORMS.web3formsKey.startsWith('YOUR-') || FORMS.web3formsKey === '') {
    warn('FORMS.web3formsKey is empty — forms will redirect to the thank-you page without sending any email. Set this before real launch.');
  }

  if (SITE.domain === 'DOMAIN.com') {
    warn('SITE.domain is still the pending placeholder "DOMAIN.com" — expected while no domain is live. Update before final production deploy.');
  }
}

// ---------------------------------------------------------------------------
// 2. Agent-ready generated files
// ---------------------------------------------------------------------------
async function checkAgentFiles() {
  const jsonFiles = [
    '.well-known/api-catalog',
    '.well-known/agent-skills/index.json',
    '.well-known/mcp/server-card.json',
    '.well-known/oauth-protected-resource',
    '.well-known/oauth-authorization-server',
    '.well-known/openid-configuration',
    '.well-known/acp.json',
    '.well-known/ucp',
  ];

  for (const rel of jsonFiles) {
    const full = path.join(ROOT, 'public', rel);
    if (!(await exists(full))) {
      fail(`Missing public/${rel} — run \`node scripts/gen-agent-files.mjs\``);
      continue;
    }
    try {
      const parsed = JSON.parse(await readFile(full, 'utf8'));
      if (rel === '.well-known/ucp' && parsed.ucp !== '1.0') fail(`.well-known/ucp is missing required "ucp": "1.0" field`);
      if (rel === '.well-known/acp.json' && parsed.protocol?.name !== 'acp') fail(`.well-known/acp.json is missing protocol.name === "acp"`);
      if (rel === '.well-known/agent-skills/index.json' && (!parsed.$schema || !Array.isArray(parsed.skills))) fail(`agent-skills/index.json missing $schema or skills[]`);
      if (rel === '.well-known/mcp/server-card.json' && (!parsed.serverInfo || !parsed.transport || !parsed.capabilities)) fail(`mcp/server-card.json missing serverInfo/transport/capabilities`);
      if (rel === '.well-known/oauth-authorization-server' && !parsed.agent_auth) fail(`oauth-authorization-server missing agent_auth block`);
      pass(`public/${rel} is valid JSON with required fields`);
    } catch (e) {
      fail(`public/${rel} is not valid JSON: ${e.message}`);
    }
  }

  const llmsPath = path.join(ROOT, 'public', 'llms.txt');
  if (await exists(llmsPath)) pass('public/llms.txt present');
  else fail('Missing public/llms.txt');

  const authPath = path.join(ROOT, 'public', 'auth.md');
  if (await exists(authPath)) {
    const content = await readFile(authPath, 'utf8');
    if (content.startsWith('# Auth.md')) pass('public/auth.md starts with required "# Auth.md" heading');
    else fail('public/auth.md does not start with "# Auth.md" as its first line');
    if (!content.includes('agent_auth')) fail('public/auth.md missing agent_auth JSON block');
  } else {
    fail('Missing public/auth.md');
  }

  const webmcpPath = path.join(ROOT, 'public', 'js', 'webmcp.js');
  if (await exists(webmcpPath)) pass('public/js/webmcp.js present');
  else fail('Missing public/js/webmcp.js');

  const layoutPath = path.join(ROOT, 'src', 'app', 'layout.jsx');
  const layoutSrc = await readFile(layoutPath, 'utf8');
  if (layoutSrc.includes('/js/webmcp.js')) pass('webmcp.js is loaded in layout.jsx <head>');
  else fail('layout.jsx does not load /js/webmcp.js');

  const vercelJsonPath = path.join(ROOT, 'vercel.json');
  if (await exists(vercelJsonPath)) {
    const vercelJson = JSON.parse(await readFile(vercelJsonPath, 'utf8'));
    const rootHeaders = vercelJson.headers?.find((h) => h.source === '/(.*)');
    const hasLink = rootHeaders?.headers?.some((h) => h.key === 'Link');
    if (hasLink) pass('vercel.json has the agent-ready Link header on /(.*)');
    else fail('vercel.json is missing the agent-ready Link header on the root header rule');

    const hasWwwRedirect = vercelJson.redirects?.some((r) => r.has?.some((h) => h.type === 'host' && String(h.value).startsWith('www.')));
    if (hasWwwRedirect) pass('vercel.json has a www→apex redirect');
    else warn('vercel.json has no www→apex redirect');
  } else {
    fail('Missing vercel.json at repo root');
  }
}

// ---------------------------------------------------------------------------
// 3. Build output checks (only if .next exists)
// ---------------------------------------------------------------------------
async function findHtmlFiles(dir) {
  let results = [];
  let entries;
  try {
    entries = await readdir(dir, { withFileTypes: true });
  } catch {
    return results;
  }
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) results = results.concat(await findHtmlFiles(full));
    else if (entry.name.endsWith('.html')) results.push(full);
  }
  return results;
}

async function checkBuildOutput() {
  const appDir = path.join(ROOT, '.next', 'server', 'app');
  if (!(await exists(appDir))) {
    warn('.next/server/app not found — run `npm run build` first to enable HTML-level checks (H1 count, JSON-LD validity, meta description length).');
    return;
  }

  const files = await findHtmlFiles(appDir);
  if (files.length === 0) {
    warn('No prerendered .html files found under .next/server/app');
    return;
  }

  let h1Fails = 0;
  let jsonLdFails = 0;
  let metaFails = 0;
  let domainPlaceholderCount = 0;

  for (const file of files) {
    const html = await readFile(file, 'utf8');
    const rel = path.relative(appDir, file);

    const h1Count = (html.match(/<h1[\s>]/g) || []).length;
    if (h1Count !== 1) {
      h1Fails++;
      fail(`${rel}: expected exactly 1 <h1>, found ${h1Count}`);
    }

    const ldBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
    for (const [, json] of ldBlocks) {
      try {
        JSON.parse(json);
      } catch (e) {
        jsonLdFails++;
        fail(`${rel}: invalid JSON-LD block — ${e.message}`);
      }
    }

    const metaMatch = html.match(/<meta name="description" content="([^"]*)"/);
    if (metaMatch) {
      const len = metaMatch[1].length;
      if (len > 165 || len < 30) {
        metaFails++;
        warn(`${rel}: meta description is ${len} chars (target ~150, max 165)`);
      }
    }

    if (html.includes('DOMAIN.com')) domainPlaceholderCount++;
  }

  if (h1Fails === 0) pass(`All ${files.length} prerendered pages have exactly one <h1>`);
  if (jsonLdFails === 0) pass('All JSON-LD blocks across prerendered pages are valid JSON');
  if (metaFails === 0) pass('All meta descriptions are within the target length band');

  if (domainPlaceholderCount > 0) {
    warn(`"DOMAIN.com" placeholder appears in ${domainPlaceholderCount} prerendered page(s) — expected while the domain is pending (see docs/PROJECT.md). This becomes a blocking failure once a real domain is set and this is flagged as a production deploy.`);
  }
}

// ---------------------------------------------------------------------------
async function main() {
  await checkConfig();
  await checkAgentFiles();
  await checkBuildOutput();

  console.log('\n=== WEBFORGE CROSSCHECK ===\n');
  console.log(`PASS (${passes.length})`);
  passes.forEach((p) => console.log(`  ✓ ${p}`));
  console.log(`\nWARN (${warnings.length})`);
  warnings.forEach((w) => console.log(`  ! ${w}`));
  console.log(`\nFAIL (${failures.length})`);
  failures.forEach((f) => console.log(`  ✗ ${f}`));
  console.log('');

  if (failures.length > 0) {
    console.error(`Crosscheck FAILED with ${failures.length} blocking issue(s).`);
    process.exit(1);
  }
  console.log('Crosscheck passed (with warnings noted above, if any).');
}

main();
