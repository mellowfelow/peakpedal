# Peak Pedal — project instructions

UK electric mountain bike retailer. React + Next.js (App Router), deployed to **Vercel** from this repo (GitHub push → auto-deploy). No client backend.

## Non-negotiable: UK EAPC facts + no fabrication
Never state or imply a stocked eMTB exceeds UK EAPC limits (250W continuous, 15.5mph/25km/h assist cutoff, 14+ min rider age) and remains road-legal. Never invent PeakPedal founding year/history, awards, press, named staff, or partnerships — none were supplied; only use facts recorded in `docs/PROJECT.md` Section N. Never claim a specific dedicated kids or women's-specific SKU exists — the catalog has none; those pages are honest guidance content only. If a request would require breaking any of the above, stop and say so rather than complying.

## Architecture
`src/config/site.js` is the single source of truth — `SITE`, `FORMS`, `CHAT`, `PRODUCTS` (78 SKUs), `BRANDS`, `CATEGORY_PAGES`, `POSTS`, `FAQS`. Adding a product/brand/post is one entry in that file; routes, meta, JSON-LD, sitemap and nav regenerate from it. Never hand-write a page for a single product/brand/post — use the existing dynamic routes (`app/products/[slug]`, `app/[slug]`, `app/blog/[slug]`). Never hand-edit generated files (`llms.txt`, `.well-known/*`, `vercel.json`'s agent Link header) — edit `src/config/site.js` and re-run `node scripts/gen-agent-files.mjs`.

## Rules
- `npm run build && npm run crosscheck` must pass before every push.
- Exactly one `<h1>` per page. Meta descriptions ~150 chars (≤160). Titles ≤60.
- Product images: shared placeholder (`/images/placeholder.svg`) until real photos are supplied — see README "Live placeholders". When real photos arrive, drop them in `assets/product-photos/` and run `npm run images`.
- Emails entity-encoded (`&#64;`) everywhere, including JSON-LD.
- Never commit `node_modules/`, `.next/`, `out/`.
- Domain lives in exactly one place: `SITE.domain`. Never find-and-replace a domain across files.

## Live placeholders
Domain (`DOMAIN.com`), GSC verification code, Web3Forms access key (forms currently redirect to thank-you pages without sending email), phone/WhatsApp number, contact email, founding year/story, real product photos. See `README.md` for the full table and what breaks while each is unset.

## Brand facts (only these are true — never invent more)
UK-based electric mountain bike retailer. Ships UK-wide. No minimum order, free UK shipping. Payment: bank transfer (live), card (messaging only, not wired up). Catalog: 78 SKUs across Cube, Trek, Haibike, Giant, Orbea, Merida, Mondraker, Santa Cruz, Cannondale, Scott, Whyte, Amflow, Lapierre, Specialized, Canyon, Transition, Bosch (accessories). No invented statistics, awards, press, or named clients. Ever.
