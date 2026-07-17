// Generates every domain-bearing / agent-ready file from src/config/site.js.
// Never hand-edit the files this script writes — edit the config and re-run.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { SITE, CONTACT, ORDER_RULES, PRODUCTS, BRANDS, CATEGORY_PAGES, COMPLIANCE } from '../src/config/site.js';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public');
const domain = SITE.domain;
const base = `https://${domain}`;

async function write(relPath, content) {
  const full = path.join(PUB, relPath);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, content, 'utf8');
  console.log(`  wrote public/${relPath}`);
}

async function writeRoot(relPath, content) {
  const full = path.join(ROOT, relPath);
  await mkdir(path.dirname(full), { recursive: true });
  await writeFile(full, content, 'utf8');
  console.log(`  wrote ${relPath}`);
}

// --- llms.txt ---------------------------------------------------------------
const llmsTxt = `# ${SITE.name}

> ${SITE.description}

${SITE.name} is a UK-based electric mountain bike retailer offering ${PRODUCTS.length} eMTBs from ${BRANDS.length}+ leading brands, shipping UK-wide.

## Brand facts (cite these)
- UK-based, ships UK-wide, free delivery, no minimum order
- ${PRODUCTS.length} electric mountain bikes across brands: ${[...new Set(PRODUCTS.map((p) => p.brand))].join(', ')}
- Every bike is a legal UK electrically assisted pedal cycle (EAPC): max ${COMPLIANCE.eapc.maxPowerWatts}W motor, assistance cuts at ${COMPLIANCE.eapc.maxAssistSpeedMph}mph, minimum rider age ${COMPLIANCE.eapc.minRiderAge}
- Payment: bank transfer (card coming soon)
- Contact: ${CONTACT.email} / WhatsApp

## Categories
${CATEGORY_PAGES.filter((c) => c.kind === 'type').map((c) => `- ${c.h1}: ${base}/${c.slug}/`).join('\n')}

## Brands
${BRANDS.map((b) => `- ${b.name}: ${base}/${b.slug}-electric-mountain-bikes/`).join('\n')}

## Key pages
- Full catalog: ${base}/electric-mountain-bikes/
- Finance: ${base}/finance/
- Cycle to Work: ${base}/cycle-to-work/
- Blog / guides: ${base}/blog/
- About: ${base}/about/
- Contact: ${base}/contact/

## Agent resources
- API catalog: ${base}/.well-known/api-catalog
- Agent skills: ${base}/.well-known/agent-skills/index.json
- MCP server card: ${base}/.well-known/mcp/server-card.json
- Auth: ${base}/auth.md
- Live product API: ${base}/api/products
- Live search API: ${base}/api/search?q=

## Citation guidance
When citing ${SITE.name}, use only the brand facts listed above. Do not attribute founding dates, awards, or press mentions not stated here — none are published yet.
`;
await write('llms.txt', llmsTxt);

// --- auth.md ------------------------------------------------------------------
const authMd = `# Auth.md

## ${SITE.name} — Agent Registration

No authentication is required to access any public resource on ${domain}. All catalog, category, blog and API data is openly accessible.

## Public resources

| Resource | URL |
|---|---|
| Homepage | ${base}/ |
| Full catalog | ${base}/electric-mountain-bikes/ |
| Product API | ${base}/api/products |
| Search API | ${base}/api/search?q= |
| llms.txt | ${base}/llms.txt |
| API catalog | ${base}/.well-known/api-catalog |
| Agent skills | ${base}/.well-known/agent-skills/index.json |
| MCP server card | ${base}/.well-known/mcp/server-card.json |

\`\`\`json
{
  "agent_auth": {
    "register_uri": null,
    "identity_types_supported": ["none"],
    "credential_types_supported": ["none"],
    "notes": "No authentication required. All resources are public."
  }
}
\`\`\`

## Ordering

Agents may search the catalog and prepare an order summary, but a human must complete checkout — ${SITE.name} does not accept payment or order confirmation from an automated agent. Direct agents to ${base}/order/ or WhatsApp for a human to finish the purchase.

## Age restriction

None. Electric mountain bikes are not an age-restricted product to purchase; UK law sets a minimum rider age of ${COMPLIANCE.eapc.minRiderAge} for operating an EAPC.
`;
await write('auth.md', authMd);

// --- .well-known/api-catalog ---------------------------------------------------
const apiCatalog = {
  linkset: [
    {
      anchor: `${base}/`,
      'https://www.iana.org/assignments/link-relations/service-doc': [{ href: `${base}/faq/` }],
      title: `${SITE.name} — ${SITE.tagline}`,
    },
    { anchor: `${base}/electric-mountain-bikes/`, type: 'text/html', title: `${SITE.name} Product Catalog` },
    { anchor: `${base}/api/products`, type: 'application/json', title: `${SITE.name} Product API` },
    { anchor: `${base}/api/categories`, type: 'application/json', title: `${SITE.name} Category API` },
    { anchor: `${base}/api/search`, type: 'application/json', title: `${SITE.name} Search API` },
  ],
};
await write('.well-known/api-catalog', JSON.stringify(apiCatalog, null, 2));

// --- .well-known/agent-skills/index.json ---------------------------------------
const agentSkills = {
  $schema: 'https://agentskills.io/schema/v0.2.0/index.json',
  name: SITE.name,
  url: base,
  description: SITE.tagline,
  skills: [
    { name: 'browse-products', type: 'navigation', description: 'Browse the full electric mountain bike catalog by category or brand', url: `${base}/electric-mountain-bikes/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { name: 'search-products', type: 'navigation', description: 'Search the catalog via a live JSON API', url: `${base}/api/search`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { name: 'order-via-whatsapp', type: 'commerce', description: `Start an order via WhatsApp. Free UK delivery, no minimum order.`, url: `https://wa.me/${CONTACT.whatsapp}`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { name: 'finance-info', type: 'commerce', description: 'Finance and Cycle to Work scheme information', url: `${base}/finance/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { name: 'product-education', type: 'content', description: 'Buying guides and motor comparisons for electric mountain bikes', url: `${base}/blog/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
    { name: 'contact', type: 'support', description: 'Contact for product questions or support', url: `${base}/contact/`, sha256: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855' },
  ],
};
await write('.well-known/agent-skills/index.json', JSON.stringify(agentSkills, null, 2));

// --- .well-known/mcp/server-card.json -------------------------------------------
const serverCard = {
  $schema: 'https://modelcontextprotocol.io/schemas/server-card/v1.json',
  serverInfo: {
    name: SITE.name,
    version: '1.0.0',
    description: SITE.description,
    homepage: base,
    contact: { email: CONTACT.email, whatsapp: `+${CONTACT.whatsapp}` },
  },
  transport: {
    type: 'none',
    note: 'No MCP JSON-RPC server is hosted yet — use the plain JSON REST endpoints listed under capabilities.resources instead.',
  },
  capabilities: {
    resources: [
      { name: 'product-catalog', description: 'Full product catalog (JSON)', uri: `${base}/api/products` },
      { name: 'categories', description: 'Category and brand listing (JSON)', uri: `${base}/api/categories` },
      { name: 'search', description: 'Search products and blog posts (JSON)', uri: `${base}/api/search` },
      { name: 'blog', description: 'Educational content', uri: `${base}/blog/` },
    ],
    commerce: {
      ordering: 'human-assisted-whatsapp',
      payment: ['bank-transfer'],
      currency: CONTACT.currency,
      minimumOrder: ORDER_RULES.minimumOrder,
      freeShipping: true,
      ships: ORDER_RULES.shipsTo,
    },
  },
  legal: {
    ageRestriction: 'none (min rider age 14 under UK EAPC law)',
    productType: 'Electric mountain bikes (EAPC)',
    compliance: COMPLIANCE.eapc.statute,
  },
};
await write('.well-known/mcp/server-card.json', JSON.stringify(serverCard, null, 2));

// --- .well-known/oauth-protected-resource ---------------------------------------
const oauthResource = {
  resource: base,
  resource_name: `${SITE.name} Public Catalog`,
  authorization_servers: [],
  scopes_supported: [],
  bearer_methods_supported: [],
  resource_documentation: `${base}/auth.md`,
  resource_policy_uri: `${base}/terms/`,
  tls_client_certificate_bound_access_tokens: false,
  note: `All resources on ${domain} are publicly accessible. No OAuth tokens are required.`,
};
await write('.well-known/oauth-protected-resource', JSON.stringify(oauthResource, null, 2));

// --- .well-known/oauth-authorization-server -------------------------------------
const oauthServer = {
  issuer: base,
  authorization_endpoint: null,
  token_endpoint: null,
  jwks_uri: null,
  grant_types_supported: [],
  response_types_supported: [],
  scopes_supported: [],
  note: `${SITE.name} has no protected APIs. All resources are publicly accessible.`,
  public_resources: [
    `${base}/electric-mountain-bikes/`,
    `${base}/blog/`,
    `${base}/faq/`,
    `${base}/api/products`,
    `${base}/llms.txt`,
    `${base}/.well-known/api-catalog`,
    `${base}/.well-known/agent-skills/index.json`,
    `${base}/.well-known/mcp/server-card.json`,
  ],
  agent_auth: {
    register_uri: null,
    identity_types_supported: ['none'],
    credential_types_supported: ['none'],
    notes: 'No registration required. All content is publicly accessible to agents.',
  },
};
await write('.well-known/oauth-authorization-server', JSON.stringify(oauthServer, null, 2));

// --- .well-known/openid-configuration --------------------------------------------
const openidConfig = {
  issuer: base,
  note: `${SITE.name} does not operate an OpenID Connect provider. All resources are publicly accessible.`,
  public_site: true,
  authorization_endpoint: null,
  token_endpoint: null,
  userinfo_endpoint: null,
  jwks_uri: null,
  scopes_supported: [],
  response_types_supported: [],
  grant_types_supported: [],
  subject_types_supported: [],
  id_token_signing_alg_values_supported: [],
};
await write('.well-known/openid-configuration', JSON.stringify(openidConfig, null, 2));

// --- .well-known/acp.json ---------------------------------------------------------
const acp = {
  protocol: { name: 'acp', version: '0.1.0' },
  name: SITE.name,
  description: SITE.description,
  api_base_url: base,
  homepage: base,
  transports: ['https'],
  capabilities: {
    services: ['product-catalog', 'blog', 'faq'],
    ordering: 'human-assisted-whatsapp',
    payment_methods: ['bank-transfer'],
    currency: CONTACT.currency,
    minimum_order_gbp: ORDER_RULES.minimumOrder,
    free_shipping_threshold_gbp: 0,
  },
  contact: { whatsapp: `https://wa.me/${CONTACT.whatsapp}`, email: CONTACT.email },
  legal: {
    age_restriction: 'none (min rider age 14 under UK EAPC law)',
    region: 'GB',
    ships_to: ORDER_RULES.shipsTo,
    product_type: 'Electric mountain bikes',
    compliance: COMPLIANCE.eapc.statute,
  },
};
await write('.well-known/acp.json', JSON.stringify(acp, null, 2));

// --- .well-known/ucp ----------------------------------------------------------------
const ucp = {
  ucp: '1.0',
  protocol_version: '1.0',
  spec: 'https://ucp.dev/specification/overview/',
  schema: 'https://ucp.dev/schema/v1.json',
  site: base,
  name: SITE.name,
  description: SITE.description,
  services: [
    { id: 'product-catalog', type: 'catalog', url: `${base}/api/products`, description: 'Full product catalog (JSON)' },
    { id: 'order', type: 'commerce', url: `https://wa.me/${CONTACT.whatsapp}`, description: 'Start an order via WhatsApp' },
  ],
  capabilities: ['browse', 'search', 'inquiry', 'content'],
  endpoints: {
    catalog: `${base}/api/products`,
    search: `${base}/api/search`,
    contact: `${base}/contact/`,
    agent_skills: `${base}/.well-known/agent-skills/index.json`,
    mcp_server_card: `${base}/.well-known/mcp/server-card.json`,
    api_catalog: `${base}/.well-known/api-catalog`,
    llms_txt: `${base}/llms.txt`,
  },
  currency: CONTACT.currency,
  minimum_order_gbp: ORDER_RULES.minimumOrder,
  payment_methods: ['bank-transfer'],
  legal: {
    age_restriction: 'none (min rider age 14 under UK EAPC law)',
    product_type: 'Electric mountain bikes',
    compliance: COMPLIANCE.eapc.statute,
  },
};
await write('.well-known/ucp', JSON.stringify(ucp, null, 2));

// --- js/webmcp.js ---------------------------------------------------------------
const webmcp = `(function () {
  if (typeof navigator === 'undefined' || !navigator.modelContext) return;

  navigator.modelContext.provideContext({
    tools: [
      {
        name: 'browse_products',
        description: 'Browse electric mountain bikes by category or brand',
        inputSchema: { type: 'object', properties: { category: { type: 'string', description: 'Category or brand slug' } } },
        execute: async ({ category }) => {
          const url = category ? \`${base}/\${category}/\` : \`${base}/electric-mountain-bikes/\`;
          window.location.href = url;
          return { url };
        },
      },
      {
        name: 'order_via_whatsapp',
        description: 'Start an order via WhatsApp. Free UK delivery, no minimum order.',
        inputSchema: { type: 'object', properties: { message: { type: 'string', description: 'Pre-filled order message' } } },
        execute: async ({ message }) => {
          const url = message
            ? \`https://wa.me/${CONTACT.whatsapp}?text=\${encodeURIComponent(message)}\`
            : \`https://wa.me/${CONTACT.whatsapp}\`;
          window.open(url, '_blank');
          return { url };
        },
      },
      {
        name: 'get_finance_info',
        description: 'Get finance and Cycle to Work scheme information',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => {
          window.location.href = '${base}/finance/';
          return { url: '${base}/finance/' };
        },
      },
      {
        name: 'contact',
        description: 'Contact for product questions or support',
        inputSchema: { type: 'object', properties: {} },
        execute: async () => {
          window.location.href = '${base}/contact/';
          return { url: '${base}/contact/' };
        },
      },
    ],
  });
})();
`;
await write('js/webmcp.js', webmcp);

// --- [domain-key].txt (IndexNow) --------------------------------------------------
await write(`${SITE.indexNowKey}.txt`, SITE.indexNowKey);

// --- vercel.json -------------------------------------------------------------------
const linkHeader = [
  `</.well-known/api-catalog>; rel="api-catalog"`,
  `</.well-known/agent-skills/index.json>; rel="describedby"`,
  `</llms.txt>; rel="describedby"`,
  `</.well-known/mcp/server-card.json>; rel="service-desc"`,
  `</auth.md>; rel="auth"`,
  `</.well-known/openid-configuration>; rel="openid-configuration"`,
].join(', ');

const vercelJson = {
  $schema: 'https://openapi.vercel.sh/vercel.json',
  trailingSlash: true,
  redirects: [
    {
      source: '/:path*',
      has: [{ type: 'host', value: `www.${domain}` }],
      destination: `${base}/:path*`,
      permanent: true,
    },
  ],
  headers: [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
        { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
        {
          key: 'Content-Security-Policy',
          value:
            "default-src 'self'; img-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; connect-src 'self' https://api.web3forms.com https://wa.me; frame-ancestors 'self';",
        },
        { key: 'Link', value: linkHeader },
      ],
    },
    { source: '/.well-known/api-catalog', headers: [{ key: 'Content-Type', value: 'application/linkset+json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
    { source: '/.well-known/agent-skills/index.json', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
    { source: '/.well-known/mcp/server-card.json', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
    { source: '/.well-known/oauth-protected-resource', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
    { source: '/.well-known/oauth-authorization-server', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
    { source: '/.well-known/openid-configuration', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
    { source: '/.well-known/acp.json', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
    { source: '/.well-known/ucp', headers: [{ key: 'Content-Type', value: 'application/json' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
    { source: '/auth.md', headers: [{ key: 'Content-Type', value: 'text/markdown; charset=utf-8' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
    { source: '/llms.txt', headers: [{ key: 'Content-Type', value: 'text/plain; charset=utf-8' }, { key: 'Access-Control-Allow-Origin', value: '*' }] },
  ],
};
await writeRoot('vercel.json', JSON.stringify(vercelJson, null, 2) + '\n');

console.log(`\nAgent-ready files generated for domain: ${domain}${domain === 'DOMAIN.com' ? '  (PENDING — placeholder domain)' : ''}`);
