# Peak Pedal — Project Record

## A — Identity
- Domain: PENDING (placeholder `DOMAIN.com` used throughout; change `SITE.domain` in `src/config/site.js` once live)
- Site name: Peak Pedal
- Tagline: "Ride Further. Climb Harder."
- Favicon/logo: generated mark — mountain peak + wheel motif, forest green / volt lime (niche-appropriate, no client asset supplied)
- Primary color: Forest Green `#14432A` · Accent: Volt Lime `#A8FF3E`
- GSC verification code: PENDING (placeholder meta tag in layout)

## B — Contact & Business
- Email: placeholder `info@DOMAIN.com` (entity-encoded on site)
- Phone/WhatsApp: placeholder `+44 0000 000000`
- Country: United Kingdom
- Currency: GBP (£)
- VAT: prices shown inc. VAT (standard UK retail convention)
- HQ/region: United Kingdom (national, ships UK-wide)

## C — Order Rules
- No minimum order
- Free UK shipping on all bikes (standard for this price bracket)
- No crypto discount (crypto not offered this build)

## D — Menu
Home · Shop (Electric Mountain Bikes) · Type categories · Brands · Deals · Finance · Cycle to Work · Blog · About · Contact · FAQ

## E — Checkout & Payment
- WhatsApp checkout: Yes
- Email/order-form checkout: Yes
- Payment methods: Bank transfer (live), Card (messaging only — "card payment coming soon", no processor wired up yet per client instruction "just card, not set up")

## F — Live Chat
- WhatsApp link only (placeholder number) — link channel, zero JS cost, no widget

## G — Optional Pages
- Finance (0% APR — generic informational, no named partner confirmed)
- Cycle to Work scheme (generic informational, no named scheme partner confirmed)
- No wholesale, no account, no compare, no tracking page this build

## H — Compliance
- No age gate (bikes are not an age-restricted product category generally, though EAPC law sets a 14+ minimum rider age — stated as information, not a purchase gate)
- **UK EAPC facts (truthful, publicly regulated — Electrically Assisted Pedal Cycles Regulations 1983, as amended 2015):** max continuous rated power 250W, pedal assistance cuts at 15.5 mph (25 km/h), minimum rider age 14. Never state or imply any stocked eMTB exceeds these limits and remains road-legal without a clear disclaimer.
- No dedicated kids eMTB in the current 78-SKU catalog — the kids landing page is honest buying-advice content, not a fabricated product listing.
- No "women's specific" SKU in the catalog (no product data field for this) — the women's landing page is genuine sizing/fit guidance across the existing range, not a fabricated filtered subset.

## I — Shop Structure
Structure type: flat, SEO-siloed top-level category + brand pages (per client's existing keyword-cluster URL plan) plus `/products/[slug]/` product pages. Not nested under `/shop/`.
- Type categories: Full Suspension, Hardtail, Lightweight SL, Enduro (sub-filter), Off-Road (general), Women's (guidance), Kids (guidance, no stock)
- Brand pages (14, per keyword file phase 1): Cube, Trek, Orbea, Whyte, Haibike, Giant, Mondraker, Merida, Santa Cruz, Amflow, Cannondale, Specialized, Lapierre, Transition
- Brands present in catalog but WITHOUT a dedicated landing page yet (phase 2 opportunity, still purchasable via main shop): Scott, Canyon, Bosch (accessories)

## J — Keywords
Full keyword cluster supplied by client: `peakpedal-keyword-cluster-master.csv` (163 rows, phased 1–3). Primary keyword: "electric mountain bike" (12,100/mo). See `docs/keyword-map.md` for the page-by-page assignment and what's built vs. deferred.

## K — Initial Products
Full 78-SKU catalog supplied by client: `peakpedal-final-products.csv`, used verbatim as the authoritative spec source (brand, category, type, price range, motor, travel, slug). All 78 are live in `PRODUCTS` in `src/config/site.js` — as data, adding SKUs has near-zero marginal cost once the template exists.
- **Images:** no photos supplied this session. Every product uses a shared generated placeholder (`/images/placeholder.svg`) with descriptive per-product alt text. Real photos should be dropped in `assets/product-photos/` (2000px+, white background, product filling frame) and run through `npm run images` before launch — see README.

## L — Forms
- Provider: `web3forms` (default), key PENDING — key-pending fallback active (forms redirect straight to thank-you page, no email sent yet). **Warn: no order/contact email will be delivered until a Web3Forms access key is set.**
- Destination emails: placeholder `info@DOMAIN.com` for all three forms
- No Turnstile configured yet

## M — Hosting / Deploy Target
**Vercel** (client's explicit choice). GitHub repo → auto-deploy on push. No backend.

## N — Brand Authority Facts (truthful only)
- Founding year/location: not supplied — omitted rather than fabricated. Placeholder note left in `CLAUDE.md` for the client to fill in.
- Differentiator: curated range across 15+ established eMTB brands with a UK focus, WhatsApp-first buying help.
- No named individuals, awards, or partnerships claimed — none were supplied.

## O — Client Backend
**No.** Pure static Next.js site, no `/admin`, no D1/R2.

## Brand entity statement
"Peak Pedal is a UK-based electric mountain bike retailer offering a curated range of eMTBs from leading brands including Cube, Trek, Orbea, Santa Cruz, Whyte and Amflow. Peak Pedal ships UK-wide and specializes in full-suspension, hardtail and lightweight SL electric mountain bikes built around Bosch, Shimano, Yamaha and DJI Avinox motor platforms. Peak Pedal's focus is matching each rider to the right motor, travel and geometry for their terrain."

## Build notes / open items for next session
- Domain, GSC code, Web3Forms key, real phone/WhatsApp number, real email, founding year/story, and real product photos are all placeholders — see `README.md` "Live placeholders" table.
- Deferred to Phase 2 (per client's own keyword-cluster phasing): budget-bracket filter pages (£2000–3500, £3500–5000), carbon filter page, men's filter page, Scott/Canyon/Bosch-accessory brand pages, and blog posts 8+ in `docs/keyword-map.md`.
