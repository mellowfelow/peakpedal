# Peak Pedal — Keyword → Page Map

Source: `peakpedal-keyword-cluster-master.csv` (client-supplied, Semrush-verified volumes). This file tracks what's BUILT vs DEFERRED so future sessions pick the next unused cluster instead of duplicating content.

## Built this session (Phase 1 core)

| Page | URL | Primary keyword | Vol/mo |
|---|---|---|---|
| Homepage | `/` | electric mountain bike | 12,100 |
| Main shop | `/electric-mountain-bikes/` | electric mountain bikes | 1,900 |
| Full suspension | `/full-suspension-electric-mountain-bikes/` | full suspension electric mountain bike | 2,400 |
| Hardtail | `/hardtail-electric-mountain-bikes/` | electric hardtail mountain bike | 320 |
| Lightweight SL | `/lightweight-electric-mountain-bikes/` | lightweight electric mountain bike | 170 |
| Enduro | `/enduro-electric-mountain-bikes/` | enduro ebike | 480 |
| Women's | `/womens-electric-mountain-bikes/` | womens electric mountain bikes | 210 |
| Kids | `/kids-electric-mountain-bike/` | kids electric mountain bike | 320 |
| Off-road | `/off-road-electric-bikes/` | off road ebike | 1,000 |
| Deals | `/electric-mountain-bike-deals/` | electric mountain bike deals | 140 |
| Sale | `/electric-mountain-bike-sale/` | electric mountain bike sale | 320 |
| Under £2000 | `/electric-mountain-bikes-under-2000/` | best electric mountain bike under 2000 | 390 |
| Under £3000 | `/electric-mountain-bikes-under-3000/` | best electric mountain bike under 3000 uk | 110 |
| Finance | `/finance/` | electric mountain bike finance | 210 |
| Cycle to Work | `/cycle-to-work/` | electric mountain bike cycle to work scheme | UNVERIFIED |
| Bosch | `/bosch-electric-mountain-bikes/` | bosch e mountain bike | 140 |
| Shimano | `/shimano-electric-mountain-bikes/` | shimano electric bike | 260 |
| DJI Avinox | `/dji-avinox-electric-mountain-bikes/` | dji electric bike | 320 |
| 14 brand pages | `/{brand}-electric-mountain-bikes/` | see cluster file rows 32–45 | — |
| 78 product pages | `/products/{slug}/` | see cluster file rows 48–87 + products.csv | — |
| About | `/about/` | peakpedal emtb uk | — |
| Contact | `/contact/` | — | — |
| Blog hub | `/blog/` | electric mountain bike guides | — |
| Best eMTBs UK | `/blog/best-electric-mountain-bikes-uk/` | best electric mountain bikes uk | 170 |
| Buying guide | `/blog/electric-mountain-bike-buying-guide/` | electric mountain bike buying guide uk | UNVERIFIED |
| Best under £3000 | `/blog/best-electric-mountain-bikes-under-3000/` | best electric mountain bike under 3000 uk | 110 |
| Best under £2000 | `/blog/best-electric-mountain-bikes-under-2000/` | best electric mountain bike under 2000 | 390 |
| Bosch vs Shimano | `/blog/bosch-vs-shimano-emtb-motor/` | bosch vs shimano emtb motor | UNVERIFIED |
| Cycle to Work guide | `/blog/cycle-to-work-scheme-emtb/` | cycle to work scheme emtb | UNVERIFIED |
| Amflow/DJI review | `/blog/amflow-dji-avinox-review/` | amflow pl carbon review | 170 |

**Note on product/keyword-file slug drift:** the keyword file's product-page list (rows 48–87) and the final products file don't match 1:1 on every slug (e.g. keyword file has `/products/amflow-pl-carbon-pro/`, products.csv has `amflow-px-carbon` as the distinct higher-spec model instead). Where they diverged, `products.csv` was treated as authoritative since it's the later, "final" file — the keyword file's intent (rank for that product's terms) is still captured because the real SKU with the closest matching name carries the keyword in its own page copy.

## Catalog built beyond Phase 1 (all 78 SKUs, since it's config data, not hand-coded pages)

Every product in `peakpedal-final-products.csv` is live in `PRODUCTS`, including brands without a dedicated landing page yet: **Scott, Canyon, Bosch (accessories)**. These show in the main shop and search but don't yet have their own `/scott-electric-mountain-bikes/`-style page — see Phase 2 below.

## Deferred — Phase 2 (client's own file marks these `NO — Phase 2`)

- Filter pages: carbon, men's, £5000+, £2000–3500, £3500–5000
- Brand pages for Scott, Canyon, Bosch accessories
- ~35 additional product pages already flagged `NO — Phase 2` in the cluster file (Cube AMS Hybrid Carbon, Trek Fuel EXe range, Giant Reign, several Whyte/Orbea/Cannondale/Merida variants, Canyon range, Scott range) — these ARE already live as data/product pages in this build (see above), so this line item is effectively done early; only the matching category filter pages remain.

## Deferred — Phase 3 (future blog calendar, use next unused cluster per post)

Best hardtail eMTB UK · Best lightweight eMTB UK · eMTB vs mountain bike · Battery range guide · Are eMTBs legal in the UK · Best UK trail centres for eMTB · Best eMTB for beginners UK · DJI Avinox motor guide · Mondraker Crafty review · Orbea Wild review · Santa Cruz Vala review · Whyte Kado review · Haibike AllMtn vs AllTrack · Turbo Levo vs Trek Rail · Maintenance guide · Best full-sus eMTB under £4000 · Cube Reaction Hybrid review · Giant eMTB guide · Amflow vs Cube vs Trek · Orbea Rise vs Trek Fuel EXe

Full detail (volumes, KD, supporting terms) lives in the client's original `peakpedal-keyword-cluster-master.csv` — keep that file for reference when picking the next post.
