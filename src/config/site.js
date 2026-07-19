// Single source of truth for Peak Pedal. Routes, meta, JSON-LD, sitemap and nav all derive from this file.
// Never hand-edit generated output (llms.txt, .well-known/*, vercel.json Link header) — edit this file and
// re-run `node scripts/gen-agent-files.mjs`.

export const SITE = {
  name: 'Peak Pedal',
  tagline: 'Ride Further. Climb Harder.',
  description:
    'UK electric mountain bike specialists — 78 eMTBs from 15+ leading brands, expert advice, UK-wide delivery.',
  domain: 'DOMAIN.com', // PENDING — change this ONE line, rebuild, push. Never find-and-replace.
  target: 'vercel',
  colors: { primary: '#14432A', accent: '#A8FF3E', dark: '#14181C', bg: '#F7F8F5' },
  founding: {
    // Not supplied by client this session — left blank rather than fabricated. Fill in only with real facts.
    year: null,
    location: 'United Kingdom',
    hq: 'United Kingdom',
  },
  gscCode: 'PENDING-GSC-VERIFICATION-CODE',
  indexNowKey: 'pending-indexnow-key-00000000000000000000000000000000',
  social: {
    // No real profiles supplied — omit sameAs entries until real ones exist (never fabricate).
    sameAs: [],
  },
};

// Homepage hero slider. Rule: <h1> lives on slide 1 only — other slides use styled
// text, never a second <h1> (see HeroSlider.jsx). Images live in public/images/.
export const HERO_SLIDES = [
  {
    image: '/images/hero-1.webp',
    tag: 'UK eMTB Specialists',
    heading: 'Electric Mountain Bikes for Every Trail',
    body: `${SITE.description} From entry-level hardtails to premium enduro full-suspension builds — we'll help you find the right motor, travel and geometry for where you ride.`,
  },
  {
    image: '/images/hero-2.webp',
    tag: 'Ride With Confidence',
    heading: 'Built For Every Rider, Every Trail',
    body: `From first-timers to seasoned riders — 78 eMTBs across 15+ brands, matched to how and where you ride.`,
  },
];

export const CONTACT = {
  email: 'info@DOMAIN.com', // placeholder — entity-encode wherever rendered
  phone: '+44 0000 000000', // placeholder
  whatsapp: '440000000000', // placeholder, digits only for wa.me links
  country: 'United Kingdom',
  currency: 'GBP',
  currencySymbol: '£',
};

export const ORDER_RULES = {
  minimumOrder: 0,
  freeShippingThreshold: 0, // free UK shipping on everything
  flatShippingFee: 0,
  cryptoDiscountPct: 0, // crypto not offered this build
  shipsTo: 'United Kingdom',
};

export const FORMS = {
  provider: 'web3forms', // works on Vercel + Cloudflare, needs only an email address
  web3formsKey: '', // PENDING — empty triggers the key-pending fallback (redirect only, no email sent)
  resendFrom: '',
  turnstileSiteKey: '',
  destinations: {
    contact: 'info@DOMAIN.com',
    order: 'info@DOMAIN.com',
  },
};

export const CHAT = {
  channels: [{ type: 'whatsapp', value: '440000000000' }],
};

export const COMPLIANCE = {
  eapc: {
    maxPowerWatts: 250,
    maxAssistSpeedMph: 15.5,
    minRiderAge: 14,
    statute: 'Electrically Assisted Pedal Cycles Regulations 1983 (as amended 2015)',
  },
};

// ---------------------------------------------------------------------------
// BRANDS — 14 with a dedicated landing page (client's Phase 1 keyword plan).
// Scott, Canyon and Bosch (accessories) exist in the catalog but have no
// dedicated page yet — see docs/keyword-map.md Phase 2.
// ---------------------------------------------------------------------------
export const BRANDS = [
  { slug: 'cube', name: 'Cube', keyword: 'cube electric bike', description: 'Cube is a German bicycle manufacturer whose Stereo Hybrid and Reaction Hybrid ranges pair full-suspension and hardtail eMTB frames with Bosch Performance CX motors.' },
  { slug: 'trek', name: 'Trek', keyword: 'trek electric mountain bike', description: 'Trek is one of the world’s largest bike manufacturers, building its Rail, Fuel EXe and Marlin+ eMTB ranges around Bosch and Shimano motor platforms.' },
  { slug: 'orbea', name: 'Orbea', keyword: 'orbea wild', description: 'Orbea is a Spanish bicycle co-operative known for the Wild enduro eMTB and the Rise lightweight SL platform, plus the Urrun electric hardtail.' },
  { slug: 'whyte', name: 'Whyte', keyword: 'whyte electric bicycle', description: 'Whyte is a UK-designed bike brand producing the Kado trail eMTB range, the E-Lyte lightweight SL platform, and the Karve electric hardtail.' },
  { slug: 'haibike', name: 'Haibike', keyword: 'haibike e bike', description: 'Haibike is a German brand widely credited as an early pioneer of the eMTB category, with AllMtn, AllTrack, AllTrail and NDURO ranges spanning Yamaha, Bosch and Pinion motor systems.' },
  { slug: 'giant', name: 'Giant', keyword: 'giant electric bike', description: 'Giant is a Taiwanese manufacturer and one of the largest bike makers globally, with the Stance E+, Reign E+, Fathom E+ and Talon E+ ranges built on Yamaha SyncDrive motors.' },
  { slug: 'mondraker', name: 'Mondraker', keyword: 'mondraker e bike', description: 'Mondraker is a Spanish brand known for its Forward Geometry design philosophy, applied across the Crafty enduro eMTB range and the Prime hardtail.' },
  { slug: 'merida', name: 'Merida', keyword: 'merida electric bicycle', description: 'Merida is a Taiwanese manufacturer producing the eOne-Sixty and eOne-Eighty eMTB ranges, both built around Shimano EP8-series motors.' },
  { slug: 'santa-cruz', name: 'Santa Cruz', keyword: 'santa cruz vala', description: 'Santa Cruz is a California-based brand known for premium full-suspension engineering, with the Vala trail eMTB, Bullit enduro eMTB and Heckler SL lightweight platform.' },
  { slug: 'amflow', name: 'Amflow', keyword: 'amflow bikes', description: 'Amflow is an eMTB brand built around DJI’s Avinox motor system, offering the PL Carbon lightweight platform and the PX Carbon enduro platform.' },
  { slug: 'cannondale', name: 'Cannondale', keyword: 'cannondale electric bike', description: 'Cannondale is a US bike brand producing the Moterra Neo full-power eMTB and the Moterra Neo SL lightweight platform, both on Bosch and Shimano motors respectively.' },
  { slug: 'specialized', name: 'Specialized', keyword: 'specialized mountain bike', description: 'Specialized is a US bike brand and developer of the Turbo Levo, one of the best-known eMTB platforms, alongside the lighter-weight Turbo Levo SL.' },
  { slug: 'lapierre', name: 'Lapierre', keyword: 'lapierre electric bike', description: 'Lapierre is a French bike brand producing the Overvolt AM all-mountain eMTB and the E-Zesty trail eMTB, both built on Bosch and Shimano motors.' },
  { slug: 'transition', name: 'Transition', keyword: 'transition e bike', description: 'Transition is a US brand known for aggressive trail and enduro geometry, applied to its carbon Relay eMTB built around the Bosch Performance CX motor.' },
];

// ---------------------------------------------------------------------------
// PRODUCTS — all 78 SKUs from the client's final products file. Each is data;
// adding a SKU costs one entry here, never a hand-coded page.
// ---------------------------------------------------------------------------
const RAW_PRODUCTS = [
  ['Cube Stereo Hybrid ONE44 Race', 'Cube', 'Full Suspension', 'Trail', 3200, 3800, 'Bosch Performance CX', '140/140mm', 'cube-stereo-hybrid-one44-race', 'Vol seller'],
  ['Cube Stereo Hybrid ONE44 SLX', 'Cube', 'Full Suspension', 'Trail', 4200, 5000, 'Bosch Performance CX', '140/140mm', 'cube-stereo-hybrid-one44-slx', null],
  ['Cube Stereo Hybrid 160 HPC Race', 'Cube', 'Full Suspension', 'Enduro', 3800, 4500, 'Bosch Performance CX', '160/160mm', 'cube-stereo-hybrid-160-hpc-race', 'Vol seller'],
  ['Cube Stereo Hybrid 160 HPC SLX', 'Cube', 'Full Suspension', 'Enduro', 5000, 6000, 'Bosch Performance CX', '160/160mm', 'cube-stereo-hybrid-160-hpc-slx', null],
  ['Cube AMS Hybrid Carbon', 'Cube', 'Full Suspension', 'Lightweight', 5500, 7000, 'Bosch Performance CX', '150/140mm', 'cube-ams-hybrid-carbon', null],
  ['Trek Rail 5', 'Trek', 'Full Suspension', 'Enduro', 3500, 4000, 'Bosch Performance CX', '160/150mm', 'trek-rail-5', 'Entry'],
  ['Trek Rail 7', 'Trek', 'Full Suspension', 'Enduro', 4500, 5500, 'Bosch Performance CX', '160/150mm', 'trek-rail-7', null],
  ['Trek Rail 9 GX', 'Trek', 'Full Suspension', 'Enduro', 6000, 7500, 'Bosch Performance CX', '160/150mm', 'trek-rail-9-gx', null],
  ['Trek Rail+ 9.9 XTR', 'Trek', 'Full Suspension', 'Enduro', 9000, 11000, 'Bosch Performance CX', '160/150mm', 'trek-rail-plus-9-9-xtr', null],
  ['Trek Fuel EXe 9.9', 'Trek', 'Lightweight SL', 'Trail', 8000, 10000, 'Shimano EP801', '140/130mm', 'trek-fuel-exe-9-9', null],
  ['Haibike AllMtn 7', 'Haibike', 'Full Suspension', 'All-Mountain', 3200, 3800, 'Yamaha PW-X3', '150/140mm', 'haibike-allmtn-7', 'Value'],
  ['Haibike AllMtn 9', 'Haibike', 'Full Suspension', 'All-Mountain', 4500, 5500, 'Yamaha PW-X3', '160/150mm', 'haibike-allmtn-9', null],
  ['Haibike AllMtn 6', 'Haibike', 'Full Suspension', 'All-Mountain', 3500, 4000, 'Yamaha PW-X3', '150/140mm', 'haibike-allmtn-6', null],
  ['Haibike AllMtn CF 11', 'Haibike', 'Full Suspension', 'All-Mountain', 5500, 6500, 'Pinion MGU', '160/160mm', 'haibike-allmtn-cf-11', null],
  ['Haibike NDURO 8', 'Haibike', 'Full Suspension', 'Enduro', 4000, 5000, 'Bosch Performance CX', '160mm', 'haibike-nduro-8', null],
  ['Giant Stance E+ 2', 'Giant', 'Full Suspension', 'Trail', 2800, 3200, 'Yamaha SyncDrive Sport', '140/130mm', 'giant-stance-e-plus-2', 'Entry'],
  ['Giant Stance E+ 1', 'Giant', 'Full Suspension', 'Trail', 3800, 4500, 'Yamaha SyncDrive Pro', '140/130mm', 'giant-stance-e-plus-1', null],
  ['Giant Reign E+ 0 Elite', 'Giant', 'Full Suspension', 'Enduro', 5000, 6000, 'Yamaha SyncDrive Pro2', '150/140mm', 'giant-reign-e-plus-0-elite', null],
  ['Giant Reign E+ Pro', 'Giant', 'Full Suspension', 'Enduro', 7000, 8500, 'Yamaha SyncDrive Pro2', '150/140mm', 'giant-reign-e-plus-pro', null],
  ['Orbea Wild M10', 'Orbea', 'Full Suspension', 'Enduro', 5000, 6000, 'Bosch Performance CX', '160/150mm', 'orbea-wild-m10', null],
  ['Orbea Wild H10', 'Orbea', 'Full Suspension', 'Enduro', 3500, 4200, 'Bosch Performance CX', '160/150mm', 'orbea-wild-h10', 'Entry'],
  ['Orbea Wild M20', 'Orbea', 'Full Suspension', 'Enduro', 4000, 4800, 'Bosch Performance CX', '160/150mm', 'orbea-wild-m20', null],
  ['Orbea Wild H20', 'Orbea', 'Full Suspension', 'Enduro', 3000, 3600, 'Bosch Performance CX', '160/150mm', 'orbea-wild-h20', null],
  ['Merida eOne-Sixty 875 Lite', 'Merida', 'Full Suspension', 'Enduro', 3200, 3800, 'Shimano EP801', '174/150mm', 'merida-eone-sixty-875-lite', 'Value'],
  ['Merida eOne-Sixty SL 7000', 'Merida', 'Full Suspension', 'Trail', 4500, 5500, 'Shimano EP801', '160/150mm', 'merida-eone-sixty-sl-7000', null],
  ['Merida eOne-Eighty 8000', 'Merida', 'Full Suspension', 'Enduro', 4000, 5000, 'Shimano EP801', '180/165mm', 'merida-eone-eighty-8000', null],
  ['Mondraker Crafty', 'Mondraker', 'Full Suspension', 'Enduro', 3200, 4000, 'Bosch Performance CX', '150/140mm', 'mondraker-crafty', null],
  ['Mondraker Crafty R', 'Mondraker', 'Full Suspension', 'Enduro', 4000, 5000, 'Bosch Performance CX', '150/140mm', 'mondraker-crafty-r', null],
  ['Mondraker Crafty RR', 'Mondraker', 'Full Suspension', 'Enduro', 5500, 7000, 'Bosch Performance CX', '170/160mm', 'mondraker-crafty-rr', null],
  ['Mondraker Crafty Carbon R', 'Mondraker', 'Full Suspension', 'Enduro', 5000, 6500, 'Bosch Performance CX', '170/160mm', 'mondraker-crafty-carbon-r', null],
  ['Santa Cruz Vala S', 'Santa Cruz', 'Full Suspension', 'Trail', 5000, 6000, 'Bosch Performance CX', '150/160mm', 'santa-cruz-vala-s', null],
  ['Santa Cruz Vala R', 'Santa Cruz', 'Full Suspension', 'Trail', 6000, 7500, 'Bosch Performance CX', '150/160mm', 'santa-cruz-vala-r', null],
  ['Santa Cruz Bullit 3 R', 'Santa Cruz', 'Full Suspension', 'Enduro', 6500, 8000, 'Bosch Performance CX', '175/165mm', 'santa-cruz-bullit-3-r', null],
  ['Cannondale Moterra Neo 3', 'Cannondale', 'Full Suspension', 'Trail', 4000, 5000, 'Bosch Performance CX', '150/140mm', 'cannondale-moterra-3', 'Entry'],
  ['Scott Patron ST 920', 'Scott', 'Full Suspension', 'Enduro', 4500, 5500, 'Bosch Performance CX', '160/145mm', 'scott-patron-st-920', null],
  ['Whyte E-Lyte 150 Works', 'Whyte', 'Full Suspension', 'Trail', 6000, 7500, 'Bosch Performance CX', '150/142mm', 'whyte-e-lyte-150-works', null],
  ['Whyte Kado S', 'Whyte', 'Full Suspension', 'Trail', 3500, 4200, 'Bosch Performance CX', '140/130mm', 'whyte-kado-s', 'UK brand'],
  ['Whyte Kado R', 'Whyte', 'Full Suspension', 'Trail', 4500, 5500, 'Bosch Performance CX', '140/130mm', 'whyte-kado-r', null],
  ['Whyte Kado RSX', 'Whyte', 'Full Suspension', 'Trail', 5500, 6500, 'Bosch Performance CX', '140/130mm', 'whyte-kado-rsx', null],
  ['Amflow PL Carbon', 'Amflow', 'Full Suspension', 'Lightweight', 5500, 6500, 'DJI Avinox M1', '140/130mm', 'amflow-pl-carbon', null],
  ['Amflow PX Carbon', 'Amflow', 'Full Suspension', 'Enduro', 7500, 9000, 'DJI Avinox M2S', '150/160mm', 'amflow-px-carbon', null],
  ['Lapierre Overvolt AM 4.6 Gen 5', 'Lapierre', 'Full Suspension', 'All-Mountain', 3500, 4200, 'Bosch Performance CX', '150/140mm', 'lapierre-overvolt-am-4-6', 'Vol seller'],
  ['Lapierre E-Zesty 4.9', 'Lapierre', 'Full Suspension', 'Trail', 3800, 4500, 'Shimano EP801', '150/140mm', 'lapierre-e-zesty-4-9', null],
  ['Specialized Turbo Levo 4 Comp Alloy', 'Specialized', 'Full Suspension', 'Trail', 4500, 5500, 'Specialized S3 Full Power', '150/160mm', 'specialized-turbo-levo-4-comp-alloy', 'Best seller'],
  ['Specialized Turbo Levo 4 Expert Carbon', 'Specialized', 'Full Suspension', 'Trail', 7000, 9000, 'Specialized S3 Full Power', '150/160mm', 'specialized-turbo-levo-4-expert-carbon', null],
  ['Canyon Spectral:ON CF 7', 'Canyon', 'Full Suspension', 'Trail', 3500, 4500, 'Shimano EP801', '150/140mm', 'canyon-spectral-on-cf-7', 'D2C brand'],
  ['Canyon Torque:ON CF 7', 'Canyon', 'Full Suspension', 'Enduro', 4500, 5500, 'Shimano EP801', '170/160mm', 'canyon-torque-on-cf-7', null],
  ['Transition Relay Carbon', 'Transition', 'Full Suspension', 'Trail', 5500, 7000, 'Bosch Performance CX', '150/140mm', 'transition-relay-carbon', null],
  ['Orbea Rise LT H10', 'Orbea', 'Lightweight SL', 'Trail', 3500, 4200, 'Shimano EP801-RS', '140/150mm', 'orbea-rise-lt-h10', 'Vol seller'],
  ['Orbea Rise LT H20', 'Orbea', 'Lightweight SL', 'Trail', 2800, 3400, 'Shimano EP801-RS', '140/150mm', 'orbea-rise-lt-h20', 'Entry SL'],
  ['Orbea Rise LT H30', 'Orbea', 'Lightweight SL', 'Trail', 2400, 2900, 'Shimano EP801-RS', '140/150mm', 'orbea-rise-lt-h30', 'Budget SL'],
  ['Orbea Rise LT M10', 'Orbea', 'Lightweight SL', 'Trail', 5500, 6500, 'Shimano EP801-RS', '140/150mm', 'orbea-rise-lt-m10', null],
  ['Trek Fuel EXe 5', 'Trek', 'Lightweight SL', 'Trail', 3800, 4500, 'Shimano EP801', '140/130mm', 'trek-fuel-exe-5', 'Entry'],
  ['Trek Fuel EXe 9.8', 'Trek', 'Lightweight SL', 'Trail', 6000, 7500, 'Shimano EP801', '140/130mm', 'trek-fuel-exe-9-8', null],
  ['Whyte E-Lyte 150 RSX', 'Whyte', 'Lightweight SL', 'Trail', 5000, 6000, 'Bosch Performance SX', '150/142mm', 'whyte-e-lyte-150-rsx', 'Award winner'],
  ['Scott Lumen eRide 910', 'Scott', 'Lightweight SL', 'XC-Trail', 4500, 5500, 'TQ HPR50', '130/120mm', 'scott-lumen-eride-910', null],
  ['Cannondale Moterra Neo SL 2', 'Cannondale', 'Lightweight SL', 'Trail', 5000, 6000, 'Shimano EP801', '140/130mm', 'cannondale-moterra-sl-2', null],
  ['Santa Cruz Heckler SL R', 'Santa Cruz', 'Lightweight SL', 'Trail', 7500, 9000, 'Shimano EP801', '150/160mm', 'santa-cruz-heckler-sl-r', null],
  ['Santa Cruz Heckler SL X0', 'Santa Cruz', 'Lightweight SL', 'Trail', 9000, 11000, 'Shimano EP801', '150/160mm', 'santa-cruz-heckler-sl-x0', null],
  ['Specialized Turbo Levo SL Expert', 'Specialized', 'Lightweight SL', 'Trail', 6500, 8000, 'Specialized SL 1.1', '150/160mm', 'specialized-turbo-levo-sl-expert', null],
  ['Cube Reaction Hybrid Pro 625', 'Cube', 'Hardtail', 'Trail', 2500, 3000, 'Bosch Performance CX', '120mm front', 'cube-reaction-hybrid-pro-625', 'Best value'],
  ['Cube Reaction Hybrid EX 750', 'Cube', 'Hardtail', 'Trail', 3200, 3800, 'Bosch Performance CX', '120mm front', 'cube-reaction-hybrid-ex-750', 'Vol seller'],
  ['Cube Reaction Hybrid Race 800', 'Cube', 'Hardtail', 'Trail', 3800, 4500, 'Bosch Performance CX', '120mm front', 'cube-reaction-hybrid-race-800', null],
  ['Trek Marlin+ 6', 'Trek', 'Hardtail', 'Trail', 2100, 2500, 'Bosch Active Line Plus', '100mm front', 'trek-marlin-plus-6', 'Entry'],
  ['Trek Marlin+ 7', 'Trek', 'Hardtail', 'Trail', 2800, 3200, 'Bosch Performance Line', '120mm front', 'trek-marlin-plus-7', null],
  ['Giant Fathom E+ 2', 'Giant', 'Hardtail', 'Trail', 2800, 3400, 'Yamaha SyncDrive Sport', '130mm front', 'giant-fathom-e-plus-2', null],
  ['Giant Fathom E+ 1', 'Giant', 'Hardtail', 'Trail', 3500, 4200, 'Yamaha SyncDrive Pro', '130mm front', 'giant-fathom-e-plus-1', null],
  ['Giant Talon E+ 1', 'Giant', 'Hardtail', 'Trail', 3000, 3600, 'Yamaha SyncDrive Sport', '120mm front', 'giant-talon-e-plus-1', null],
  ['Giant Talon E+ 2', 'Giant', 'Hardtail', 'Trail', 2500, 3000, 'Yamaha SyncDrive Sport', '120mm front', 'giant-talon-e-plus-2', 'Entry'],
  ['Orbea Urrun 50', 'Orbea', 'Hardtail', 'Trail', 2800, 3200, 'Shimano EP8', '120mm front', 'orbea-urrun-50', null],
  ['Orbea Urrun 30', 'Orbea', 'Hardtail', 'Trail', 2200, 2600, 'Shimano EP8', '120mm front', 'orbea-urrun-30', 'Entry'],
  ['Haibike AllTrack 4', 'Haibike', 'Hardtail', 'Trail', 2800, 3400, 'Bosch Active Line Plus', '120mm front', 'haibike-alltrack-4', null],
  ['Haibike AllTrail 3', 'Haibike', 'Hardtail', 'Trail', 2500, 3000, 'Yamaha PW-TE', '120mm front', 'haibike-alltrail-3', 'Entry'],
  ['Mondraker Prime R', 'Mondraker', 'Hardtail', 'Trail', 3000, 3600, 'Bosch Performance CX', '120mm front', 'mondraker-prime-r', null],
  ['Canyon Grand Canyon:ON CF 7', 'Canyon', 'Hardtail', 'XC-Trail', 2800, 3500, 'Shimano EP801', '120mm front', 'canyon-grand-canyon-on-cf-7', 'D2C brand'],
  ['Whyte Karve 150', 'Whyte', 'Hardtail', 'Trail', 2500, 3000, 'Bosch Performance CX', '120mm front', 'whyte-karve-150', 'UK brand'],
  ['Bosch PowerMore 250Wh Range Extender', 'Bosch', 'Accessory', 'Range Extender', 350, 450, null, null, 'bosch-powermore-range-extender', null],
  ['Bosch Kiox 300 Display Unit', 'Bosch', 'Accessory', 'Display', 80, 120, null, null, 'bosch-kiox-300-display', null],

  // --- Added in second content pass (98-SKU catalog) ---
  ['Trek Fuel EXe 9.5', 'Trek', 'Lightweight SL', 'Trail', 6500, 7200, 'TQ HPR50', '140/130mm', 'trek-fuel-exe-9-5', null],
  ['Trek Fuel EXe 9.7', 'Trek', 'Lightweight SL', 'Trail', 7500, 8200, 'TQ HPR50', '140/130mm', 'trek-fuel-exe-9-7', null],
  ['Trek Fuel EXe 8', 'Trek', 'Lightweight SL', 'Trail', 5800, 6400, 'TQ HPR50', '140/130mm', 'trek-fuel-exe-8', null],
  ['Trek Powerfly 5', 'Trek', 'Full Suspension', 'Trail', 3800, 4400, 'Bosch Performance Line', '140/130mm', 'trek-powerfly-5', null],
  ['Trek Powerfly 7', 'Trek', 'Full Suspension', 'Trail', 4800, 5400, 'Bosch Performance Line CX', '150/140mm', 'trek-powerfly-7', null],
  ['Trek Rail+', 'Trek', 'Full Suspension', 'Enduro', 6200, 6800, 'Bosch Performance Line CX', '160/150mm', 'trek-rail-plus', null],
  ['Trek Marlin+ 8', 'Trek', 'Hardtail', 'Trail', 3200, 3600, 'Bosch Performance Line', '100mm front', 'trek-marlin-plus-8', null],
  ['Haibike AllMtn 4', 'Haibike', 'Full Suspension', 'All-Mountain', 4200, 4800, 'Bosch Performance Line CX', '160/150mm', 'haibike-allmtn-4', null],
  ['Haibike AllMtn 10', 'Haibike', 'Full Suspension', 'All-Mountain', 6800, 7500, 'Bosch Performance Line CX', '160/150mm', 'haibike-allmtn-10', null],
  ['Haibike AllTrack 5', 'Haibike', 'Hardtail', 'Trail', 2800, 3200, 'Bosch Performance Line', '120mm front', 'haibike-alltrack-5', null],
  ['Haibike AllTrail 5', 'Haibike', 'Hardtail', 'Trail', 3000, 3400, 'Bosch Performance Line', '130mm front', 'haibike-alltrail-5', null],
  ['Haibike AllTrail 7', 'Haibike', 'Hardtail', 'Trail', 3600, 4000, 'Bosch Performance Line CX', '130mm front', 'haibike-alltrail-7', null],
  ['Haibike NDURO 6', 'Haibike', 'Full Suspension', 'Enduro', 5200, 5800, 'Bosch Performance Line CX', '170/160mm', 'haibike-nduro-6', null],
  ['Haibike NDURO 7', 'Haibike', 'Full Suspension', 'Enduro', 6000, 6600, 'Bosch Performance Line CX', '170/160mm', 'haibike-nduro-7', null],
  ['Giant Reign E+ 1', 'Giant', 'Full Suspension', 'Enduro', 6200, 6800, 'Yamaha SyncDrive Pro', '160/160mm', 'giant-reign-e-plus-1', null],
  ['Whyte Rheo 1', 'Whyte', 'Full Suspension', 'Trail', 5800, 6400, 'Bosch Performance Line CX', '150/140mm', 'whyte-rheo-1', null],
  ['Whyte E-160 RSX', 'Whyte', 'Full Suspension', 'Enduro', 6800, 7500, 'Bosch Performance Line CX', '160/160mm', 'whyte-e-160-rsx', null],
  ['Mondraker Level R', 'Mondraker', 'Full Suspension', 'Trail', 5200, 5800, 'Bosch Performance Line CX', '150/150mm', 'mondraker-level-r', null],
  ['Mondraker Level XR', 'Mondraker', 'Full Suspension', 'Trail', 6800, 7400, 'Bosch Performance Line CX', '150/150mm', 'mondraker-level-xr', null],
  ['Mondraker Neat R', 'Mondraker', 'Hardtail', 'Trail', 3200, 3600, 'Mahle X20', '130mm front', 'mondraker-neat-r', null],
];

// Real product photos, processed (trim + white 4:3 canvas + WebP) from client-
// supplied images. Slugs not listed here still use the shared placeholder.
// 2 uploads (canyon-grand-canyon-on-cf-7, haibike-nduro-6) were corrupt AVIF
// files our image pipeline couldn't decode — see docs/PROJECT.md.
const PRODUCT_IMAGES = {
  'cube-stereo-hybrid-one44-race': '/images/cube-stereo-hybrid-one44-race.webp',
  'cube-stereo-hybrid-one44-slx': '/images/cube-stereo-hybrid-one44-slx.webp',
  'cube-stereo-hybrid-160-hpc-race': '/images/cube-stereo-hybrid-160-hpc-race.webp',
  'cube-stereo-hybrid-160-hpc-slx': '/images/cube-stereo-hybrid-160-hpc-slx.webp',
  'cube-ams-hybrid-carbon': '/images/cube-ams-hybrid-carbon.webp',
  'trek-rail-5': '/images/trek-rail-5.webp',
  'trek-rail-7': '/images/trek-rail-7.webp',
  'trek-rail-9-gx': '/images/trek-rail-9-gx.webp',
  'trek-rail-plus-9-9-xtr': '/images/trek-rail-plus-9-9-xtr.webp',
  'trek-fuel-exe-9-9': '/images/trek-fuel-exe-9-9.webp',
  'haibike-allmtn-7': '/images/haibike-allmtn-7.webp',
  'haibike-allmtn-9': '/images/haibike-allmtn-9.webp',
  'haibike-allmtn-6': '/images/haibike-allmtn-6.webp',
  'haibike-allmtn-cf-11': '/images/haibike-allmtn-cf-11.webp',
  'haibike-nduro-8': '/images/haibike-nduro-8.webp',
  'giant-stance-e-plus-2': '/images/giant-stance-e-plus-2.webp',
  'giant-stance-e-plus-1': '/images/giant-stance-e-plus-1.webp',
  'giant-reign-e-plus-0-elite': '/images/giant-reign-e-plus-0-elite.webp',
  'giant-reign-e-plus-pro': '/images/giant-reign-e-plus-pro.webp',
  'orbea-wild-m10': '/images/orbea-wild-m10.webp',
  'orbea-wild-h10': '/images/orbea-wild-h10.webp',
  'orbea-wild-m20': '/images/orbea-wild-m20.webp',
  'orbea-wild-h20': '/images/orbea-wild-h20.webp',
  'merida-eone-sixty-875-lite': '/images/merida-eone-sixty-875-lite.webp',
  'merida-eone-sixty-sl-7000': '/images/merida-eone-sixty-sl-7000.webp',
  'merida-eone-eighty-8000': '/images/merida-eone-eighty-8000.webp',
  'mondraker-crafty': '/images/mondraker-crafty.webp',
  'mondraker-crafty-r': '/images/mondraker-crafty-r.webp',
  'mondraker-crafty-rr': '/images/mondraker-crafty-rr.webp',
  'mondraker-crafty-carbon-r': '/images/mondraker-crafty-carbon-r.webp',
  'santa-cruz-vala-s': '/images/santa-cruz-vala-s.webp',
  'santa-cruz-vala-r': '/images/santa-cruz-vala-r.webp',
  'santa-cruz-bullit-3-r': '/images/santa-cruz-bullit-3-r.webp',
  'cannondale-moterra-3': '/images/cannondale-moterra-3.webp',
  'scott-patron-st-920': '/images/scott-patron-st-920.webp',
  'whyte-e-lyte-150-works': '/images/whyte-e-lyte-150-works.webp',
  'whyte-kado-s': '/images/whyte-kado-s.webp',
  'whyte-kado-r': '/images/whyte-kado-r.webp',
  'whyte-kado-rsx': '/images/whyte-kado-rsx.webp',
  'amflow-pl-carbon': '/images/amflow-pl-carbon.webp',
  'amflow-px-carbon': '/images/amflow-px-carbon.webp',
  'lapierre-overvolt-am-4-6': '/images/lapierre-overvolt-am-4-6.webp',
  'lapierre-e-zesty-4-9': '/images/lapierre-e-zesty-4-9.webp',
  'specialized-turbo-levo-4-comp-alloy': '/images/specialized-turbo-levo-4-comp-alloy.webp',
  'specialized-turbo-levo-4-expert-carbon': '/images/specialized-turbo-levo-4-expert-carbon.webp',
  'canyon-spectral-on-cf-7': '/images/canyon-spectral-on-cf-7.webp',
  'canyon-torque-on-cf-7': '/images/canyon-torque-on-cf-7.webp',
  'transition-relay-carbon': '/images/transition-relay-carbon.webp',
  'orbea-rise-lt-h10': '/images/orbea-rise-lt-h10.webp',
  'orbea-rise-lt-h20': '/images/orbea-rise-lt-h20.webp',
  'orbea-rise-lt-h30': '/images/orbea-rise-lt-h30.webp',
  'orbea-rise-lt-m10': '/images/orbea-rise-lt-m10.webp',
  'trek-fuel-exe-5': '/images/trek-fuel-exe-5.webp',
  'trek-fuel-exe-9-8': '/images/trek-fuel-exe-9-8.webp',
  'whyte-e-lyte-150-rsx': '/images/whyte-e-lyte-150-rsx.webp',
  'scott-lumen-eride-910': '/images/scott-lumen-eride-910.webp',
  'cannondale-moterra-sl-2': '/images/cannondale-moterra-sl-2.webp',
  'santa-cruz-heckler-sl-r': '/images/santa-cruz-heckler-sl-r.webp',
  'santa-cruz-heckler-sl-x0': '/images/santa-cruz-heckler-sl-x0.webp',
  'specialized-turbo-levo-sl-expert': '/images/specialized-turbo-levo-sl-expert.webp',
  'cube-reaction-hybrid-pro-625': '/images/cube-reaction-hybrid-pro-625.webp',
  'cube-reaction-hybrid-ex-750': '/images/cube-reaction-hybrid-ex-750.webp',
  'cube-reaction-hybrid-race-800': '/images/cube-reaction-hybrid-race-800.webp',
  'trek-marlin-plus-6': '/images/trek-marlin-plus-6.webp',
  'trek-marlin-plus-7': '/images/trek-marlin-plus-7.webp',
  'giant-fathom-e-plus-2': '/images/giant-fathom-e-plus-2.webp',
  'giant-fathom-e-plus-1': '/images/giant-fathom-e-plus-1.webp',
  'giant-talon-e-plus-1': '/images/giant-talon-e-plus-1.webp',
  'giant-talon-e-plus-2': '/images/giant-talon-e-plus-2.webp',
  'orbea-urrun-50': '/images/orbea-urrun-50.webp',
  'orbea-urrun-30': '/images/orbea-urrun-30.webp',
  'haibike-alltrack-4': '/images/haibike-alltrack-4.webp',
  'haibike-alltrail-3': '/images/haibike-alltrail-3.webp',
  'mondraker-prime-r': '/images/mondraker-prime-r.webp',
  'whyte-karve-150': '/images/whyte-karve-150.webp',
  'bosch-powermore-range-extender': '/images/bosch-powermore-range-extender.webp',
  'bosch-kiox-300-display': '/images/bosch-kiox-300-display.webp',
  'trek-fuel-exe-9-5': '/images/trek-fuel-exe-9-5.webp',
  'trek-fuel-exe-9-7': '/images/trek-fuel-exe-9-7.webp',
  'trek-fuel-exe-8': '/images/trek-fuel-exe-8.webp',
  'trek-powerfly-5': '/images/trek-powerfly-5.webp',
  'trek-powerfly-7': '/images/trek-powerfly-7.webp',
  'trek-rail-plus': '/images/trek-rail-plus.webp',
  'trek-marlin-plus-8': '/images/trek-marlin-plus-8.webp',
  'haibike-allmtn-4': '/images/haibike-allmtn-4.webp',
  'haibike-allmtn-10': '/images/haibike-allmtn-10.webp',
  'haibike-alltrack-5': '/images/haibike-alltrack-5.webp',
  'haibike-alltrail-5': '/images/haibike-alltrail-5.webp',
  'haibike-alltrail-7': '/images/haibike-alltrail-7.webp',
  'haibike-nduro-7': '/images/haibike-nduro-7.webp',
  'giant-reign-e-plus-1': '/images/giant-reign-e-plus-1.webp',
  'whyte-rheo-1': '/images/whyte-rheo-1.webp',
  'whyte-e-160-rsx': '/images/whyte-e-160-rsx.webp',
  'mondraker-level-r': '/images/mondraker-level-r.webp',
  'mondraker-level-xr': '/images/mondraker-level-xr.webp',
  'mondraker-neat-r': '/images/mondraker-neat-r.webp',
};

function describe(name, brand, category, type, motor, travel) {
  if (category === 'Accessory') {
    return type === 'Range Extender'
      ? `The ${name} adds extra on-bike battery capacity for longer rides without needing to plan around a single charge.`
      : `The ${name} is a handlebar-mounted display for real-time ride data — speed, assistance level and remaining range.`;
  }
  const travelText = travel ? ` with ${travel} of travel` : '';
  const categoryText = category === 'Hardtail' ? 'hardtail' : category === 'Lightweight SL' ? 'lightweight SL' : 'full-suspension';
  return `The ${name} is a ${categoryText} ${type.toLowerCase()} eMTB from ${brand}, running a ${motor} motor${travelText}.`;
}

export const PRODUCTS = RAW_PRODUCTS.map(
  ([name, brand, category, type, priceLow, priceHigh, motor, travel, slug, badge]) => ({
    name,
    brand,
    category,
    type,
    priceLow,
    priceHigh,
    motor,
    travel,
    slug,
    featured: Boolean(badge),
    badge,
    description: describe(name, brand, category, type, motor, travel),
    imageAlt: `${name} electric mountain bike${motor ? ` — ${motor}` : ''}`,
    images: [PRODUCT_IMAGES[slug] || '/images/placeholder.svg'],
  })
);

// ---------------------------------------------------------------------------
// CATEGORY_PAGES — every non-product, non-brand landing page. One dynamic
// route (`app/[slug]/page.jsx`) serves all of these from this single array.
// ---------------------------------------------------------------------------
export const CATEGORY_PAGES = [
  {
    slug: 'electric-mountain-bikes',
    kind: 'main',
    keyword: 'electric mountain bikes',
    metaTitle: 'Electric Mountain Bikes UK | Shop the Full Range',
    metaDescription: 'Shop 78 electric mountain bikes from 15+ leading brands. Full suspension, hardtail and lightweight SL eMTBs, UK-wide delivery.',
    h1: 'Electric Mountain Bikes',
    intro: `Browse Peak Pedal's full range of ${PRODUCTS.length} electric mountain bikes — full suspension, hardtail and lightweight SL, from Bosch, Shimano, Yamaha and DJI Avinox-powered platforms.`,
    filter: () => true,
  },
  {
    slug: 'full-suspension-electric-mountain-bikes',
    kind: 'type',
    keyword: 'full suspension electric mountain bike',
    metaTitle: 'Full Suspension Electric Mountain Bikes UK',
    metaDescription: 'Full suspension electric mountain bikes for trail, enduro and all-mountain riding. Compare travel, motor and price across every brand we stock.',
    h1: 'Full Suspension Electric Mountain Bikes',
    intro: 'Full suspension eMTBs pair rear travel with a mid-drive motor for control over rough, technical trails. Compare travel, motor platform and price across our full-suspension range.',
    filter: (p) => p.category === 'Full Suspension',
  },
  {
    slug: 'hardtail-electric-mountain-bikes',
    kind: 'type',
    keyword: 'electric hardtail mountain bike',
    metaTitle: 'Hardtail Electric Mountain Bikes UK',
    metaDescription: 'Electric hardtail mountain bikes — simpler, lighter and typically more affordable than full suspension, ideal for trail centres and fire roads.',
    h1: 'Hardtail Electric Mountain Bikes',
    intro: 'Hardtail eMTBs skip rear suspension for a lighter, lower-maintenance bike that’s typically more affordable than full suspension — a strong entry point into electric mountain biking.',
    filter: (p) => p.category === 'Hardtail',
  },
  {
    slug: 'lightweight-electric-mountain-bikes',
    kind: 'type',
    keyword: 'lightweight electric mountain bike',
    metaTitle: 'Lightweight Electric Mountain Bikes UK — SL eMTBs',
    metaDescription: 'Lightweight SL electric mountain bikes with smaller, lighter motor systems for a more natural ride feel — from Orbea Rise to Specialized Turbo Levo SL.',
    h1: 'Lightweight Electric Mountain Bikes (SL)',
    intro: 'Lightweight SL eMTBs use smaller, lighter motor and battery systems for a ride feel closer to an unassisted mountain bike, while still giving you assistance on the climbs.',
    filter: (p) => p.category === 'Lightweight SL',
  },
  {
    slug: 'enduro-electric-mountain-bikes',
    kind: 'type',
    keyword: 'enduro ebike',
    metaTitle: 'Enduro Electric Mountain Bikes UK',
    metaDescription: 'Enduro electric mountain bikes with long travel and aggressive geometry for demanding descents — from Orbea Wild to Santa Cruz Bullit.',
    h1: 'Enduro Electric Mountain Bikes',
    intro: 'Enduro eMTBs bring long-travel suspension and descent-focused geometry to electric mountain biking, for riders who prioritise capability on demanding terrain.',
    filter: (p) => p.type === 'Enduro',
  },
  {
    slug: 'off-road-electric-bikes',
    kind: 'type',
    keyword: 'off road ebike',
    metaTitle: 'Off-Road Electric Bikes UK',
    metaDescription: 'Off-road electric bikes built for trails, not tarmac — browse our full range of electric mountain bikes for every terrain.',
    h1: 'Off-Road Electric Bikes',
    intro: 'Every bike Peak Pedal stocks is built for the trail, not the commute. Browse the full range below by travel, motor and price.',
    filter: () => true,
  },
  {
    slug: 'womens-electric-mountain-bikes',
    kind: 'guidance',
    keyword: 'womens electric mountain bikes',
    metaTitle: "Women's Electric Mountain Bikes UK — Sizing & Fit Guide",
    metaDescription: "Buying an electric mountain bike as a woman? Our range is unisex with adjustable geometry — here's how to get the frame size and fit right.",
    h1: "Electric Mountain Bikes for Women",
    intro: 'Our eMTB range is unisex — every model is available across multiple frame sizes, and several (Orbea, Whyte, Trek) offer a smaller-frame option down to XS. The right size comes down to standover height and reach rather than a separate "women’s" model — get in touch and we’ll help you match a frame to your height.',
    filter: () => true,
  },
  {
    slug: 'kids-electric-mountain-bike',
    kind: 'guidance-no-stock',
    keyword: 'kids electric mountain bike',
    metaTitle: 'Kids Electric Mountain Bikes UK — Buying Advice',
    metaDescription: "We don't currently stock a dedicated kids eMTB range. Here's what UK law requires and which of our smaller-frame, entry-level bikes suit teen riders.",
    h1: 'Electric Mountain Bikes for Kids & Teens',
    intro: `Peak Pedal doesn't currently stock a dedicated kids electric mountain bike range. Under UK law (${COMPLIANCE.eapc.statute}), the minimum rider age for a pedal-assist eMTB is ${COMPLIANCE.eapc.minRiderAge}. For teen riders at or above that age, our entry-level hardtails with the smallest available frame sizes are the best starting point — contact us and we'll help you find the right fit.`,
    filter: () => false,
  },
  {
    slug: 'electric-mountain-bike-deals',
    kind: 'value',
    keyword: 'electric mountain bike deals',
    metaTitle: 'Electric Mountain Bike Deals & Best-Value Picks UK',
    metaDescription: 'Our best-value electric mountain bikes right now, ranked by price-to-spec — no gimmicks, just the strongest picks in the range.',
    h1: 'Electric Mountain Bike Deals — Best-Value Picks',
    intro: 'Rather than a rotating "sale" of arbitrary discounts, this page lists the strongest price-to-spec picks currently in our range — get in touch for the latest availability.',
    filter: (p) => Boolean(p.featured),
  },
  {
    slug: 'electric-mountain-bike-sale',
    kind: 'value',
    keyword: 'electric mountain bike sale',
    metaTitle: 'Electric Mountain Bike Sale — Best-Value Prices UK',
    metaDescription: 'Browse our current best-value electric mountain bikes, ordered by price. Entry-level hardtails from under £2,200.',
    h1: 'Electric Mountain Bike Sale',
    intro: 'These are our lowest-priced, best-value electric mountain bikes right now — sorted from most to least affordable.',
    filter: () => true,
    sort: 'price-asc',
  },
  {
    slug: 'electric-mountain-bikes-under-2000',
    kind: 'budget',
    keyword: 'best electric mountain bike under 2000',
    metaTitle: 'Electric Mountain Bikes Under £2000 UK',
    metaDescription: 'The most affordable electric mountain bikes in our range, starting under £2,200 — entry-level hardtails from Trek and Orbea.',
    h1: 'Electric Mountain Bikes Under £2,000',
    intro: 'Our most affordable entry point is the Trek Marlin+ 6 at around £2,100. Here’s everything in our range at or near the £2,000 mark.',
    filter: (p) => p.priceLow < 2200,
  },
  {
    slug: 'electric-mountain-bikes-under-3000',
    kind: 'budget',
    keyword: 'best electric mountain bike under 3000 uk',
    metaTitle: 'Best Electric Mountain Bikes Under £3000 UK',
    metaDescription: 'Electric mountain bikes under £3,000 — the sweet spot for a first full-suspension or well-specced hardtail eMTB.',
    h1: 'Electric Mountain Bikes Under £3,000',
    intro: 'Under £3,000 covers most of our hardtail range and a handful of entry-level full-suspension and lightweight SL options.',
    filter: (p) => p.priceLow < 3000,
  },
  {
    slug: 'finance',
    kind: 'info',
    keyword: 'electric mountain bike finance',
    metaTitle: 'Electric Mountain Bike Finance UK',
    metaDescription: 'Spread the cost of your electric mountain bike. Get in touch to discuss finance options for any bike in our range.',
    h1: 'Electric Mountain Bike Finance',
    intro: 'We know an eMTB is a significant purchase. Get in touch and our team will talk you through the finance options available for the bike you’re interested in — we’ll confirm exact rates and terms directly, as these depend on the specific bike and provider at the time.',
    filter: () => false,
  },
  {
    slug: 'cycle-to-work',
    kind: 'info',
    keyword: 'electric mountain bike cycle to work scheme',
    metaTitle: 'Cycle to Work Scheme — Electric Mountain Bikes',
    metaDescription: 'Buy an electric mountain bike through your employer’s Cycle to Work scheme. Get in touch to check eligibility and current scheme partners.',
    h1: 'Cycle to Work Scheme',
    intro: 'Many UK employers run a Cycle to Work scheme that lets you buy a bike — including eMTBs — through salary sacrifice. Scheme rules, price caps and provider lists vary by employer, so get in touch and we’ll help you check what’s possible with yours.',
    filter: () => false,
  },
  {
    slug: 'bosch-electric-mountain-bikes',
    kind: 'motor',
    keyword: 'bosch e mountain bike',
    metaTitle: 'Bosch Electric Mountain Bikes UK',
    metaDescription: 'Electric mountain bikes powered by Bosch Performance CX and Active Line motors — our largest motor category by SKU count.',
    h1: 'Bosch Electric Mountain Bikes',
    intro: 'The Bosch Performance CX is the most widely used mid-drive motor in our range, found across full-suspension, hardtail and enduro models.',
    filter: (p) => Boolean(p.motor) && p.motor.includes('Bosch'),
  },
  {
    slug: 'shimano-electric-mountain-bikes',
    kind: 'motor',
    keyword: 'shimano electric bike',
    metaTitle: 'Shimano Electric Mountain Bikes UK',
    metaDescription: 'Electric mountain bikes powered by Shimano EP8 and EP801 motors, including the EP801-RS lightweight variant used in the Orbea Rise.',
    h1: 'Shimano Electric Mountain Bikes',
    intro: 'Shimano’s EP8-series motors power a wide spread of our range, from full-power enduro bikes to the lightweight EP801-RS in the Orbea Rise.',
    filter: (p) => Boolean(p.motor) && p.motor.includes('Shimano'),
  },
  {
    slug: 'dji-avinox-electric-mountain-bikes',
    kind: 'motor',
    keyword: 'dji electric bike',
    metaTitle: 'DJI Avinox Electric Mountain Bikes UK — Amflow',
    metaDescription: 'Electric mountain bikes powered by DJI’s Avinox motor system, currently exclusive to the Amflow PL Carbon and PX Carbon.',
    h1: 'DJI Avinox Electric Mountain Bikes',
    intro: 'DJI’s Avinox motor system is a newer entrant to the eMTB motor market, currently available in our range through Amflow’s PL Carbon and PX Carbon.',
    filter: (p) => Boolean(p.motor) && p.motor.includes('DJI'),
  },
  ...BRANDS.map((brand) => ({
    slug: `${brand.slug}-electric-mountain-bikes`,
    kind: 'brand',
    keyword: brand.keyword,
    metaTitle: `${brand.name} Electric Mountain Bikes UK — Full Range`,
    metaDescription: `Shop the full ${brand.name} electric mountain bike range at Peak Pedal, with UK-wide delivery and expert buying advice.`,
    h1: `${brand.name} Electric Mountain Bikes`,
    intro: brand.description,
    filter: (p) => p.brand === brand.name,
  })),
];

// ---------------------------------------------------------------------------
// FAQS — homepage + /faq/, direct-answer format for AI-visibility.
// ---------------------------------------------------------------------------
export const FAQS = [
  {
    q: 'What is Peak Pedal?',
    a: 'Peak Pedal is a UK-based online retailer of electric mountain bikes, stocking 78 models across 15+ brands including Cube, Trek, Orbea, Santa Cruz, Whyte and Amflow, with UK-wide delivery.',
  },
  {
    q: 'Are electric mountain bikes legal in the UK?',
    a: `Yes. An electrically assisted pedal cycle (EAPC) is legal to ride without a licence, tax or insurance in the UK provided the motor is rated at no more than ${COMPLIANCE.eapc.maxPowerWatts}W continuous power, assistance cuts out at ${COMPLIANCE.eapc.maxAssistSpeedMph}mph, and the rider is at least ${COMPLIANCE.eapc.minRiderAge} years old.`,
  },
  {
    q: 'What motor brands do Peak Pedal’s bikes use?',
    a: 'Our range spans Bosch Performance CX and Active Line motors, Shimano EP8 and EP801-series motors, Yamaha SyncDrive and PW-X3 motors, DJI’s Avinox system, plus TQ and Pinion motors on select lightweight models.',
  },
  {
    q: 'Do you offer finance or Cycle to Work?',
    a: 'We can discuss finance options and Cycle to Work scheme eligibility for any bike in our range — contact us and we’ll confirm what’s available for the specific model and your employer’s scheme.',
  },
  {
    q: 'How do I check out?',
    a: 'You can order via WhatsApp for a fast, direct response, or use our online order form. We accept payment by bank transfer, with card payment coming soon.',
  },
];

// ---------------------------------------------------------------------------
// POSTS — Phase 1 blog content (docs/keyword-map.md tracks what's deferred).
// Content lives in src/content/posts/*.js as { title, excerpt, body } modules,
// referenced here by slug so this file stays a manageable index.
// ---------------------------------------------------------------------------
export const POSTS = [
  {
    slug: 'best-electric-mountain-bikes-uk',
    title: 'Best Electric Mountain Bikes UK 2025 — Compared by Spec',
    metaTitle: 'Best Electric Mountain Bikes UK 2025 — Compared by Spec',
    metaDescription: 'A spec-by-spec comparison of the strongest electric mountain bikes on the UK market in 2025, across full suspension, hardtail and lightweight SL.',
    keyword: 'best electric mountain bikes uk',
    excerpt: 'We compare the standout eMTBs in our range by motor, travel and price-to-spec — not marketing claims.',
  },
  {
    slug: 'electric-mountain-bike-buying-guide',
    title: 'Electric Mountain Bike Buying Guide UK 2025',
    metaTitle: 'Electric Mountain Bike Buying Guide UK 2025',
    metaDescription: 'Everything to consider before buying an electric mountain bike: motor type, travel, battery range, frame size, and UK legal requirements.',
    keyword: 'electric mountain bike buying guide uk',
    excerpt: 'Motor, travel, battery, frame size and UK law — what actually matters when choosing your first eMTB.',
  },
  {
    slug: 'best-electric-mountain-bikes-under-3000',
    title: 'Best Electric Mountain Bikes Under £3000 UK',
    metaTitle: 'Best Electric Mountain Bikes Under £3000 UK',
    metaDescription: 'The best-specced electric mountain bikes available under £3,000 in the UK — hardtails and a handful of entry-level full-suspension options.',
    keyword: 'best electric mountain bike under 3000 uk',
    excerpt: 'What £3,000 gets you in an eMTB right now, and which models make the most of that budget.',
  },
  {
    slug: 'best-electric-mountain-bikes-under-2000',
    title: 'Best Electric Mountain Bikes Under £2000 UK',
    metaTitle: 'Best Electric Mountain Bikes Under £2000 UK',
    metaDescription: 'What to expect from an electric mountain bike under £2,000, and the closest options in our range to that price point.',
    keyword: 'best electric mountain bike under 2000',
    excerpt: 'Entry-level eMTBs near the £2,000 mark: what you get, and what you trade off versus a pricier bike.',
  },
  {
    slug: 'bosch-vs-shimano-emtb-motor',
    title: 'Bosch vs Shimano eMTB Motor — Which Should You Choose?',
    metaTitle: 'Bosch vs Shimano eMTB Motor — Which to Choose?',
    metaDescription: 'How Bosch Performance CX compares to Shimano EP8/EP801 eMTB motors on power delivery, weight and where each is typically specced.',
    keyword: 'bosch vs shimano emtb motor',
    excerpt: 'Two of the most common eMTB motor platforms in our range, compared on how they’re specced and what that means for you.',
  },
  {
    slug: 'cycle-to-work-scheme-emtb',
    title: 'Cycle to Work Scheme for Electric Mountain Bikes',
    metaTitle: 'Cycle to Work Scheme for Electric Mountain Bikes',
    metaDescription: 'How the UK Cycle to Work scheme works for electric mountain bikes, and how to check what your employer offers.',
    keyword: 'cycle to work scheme emtb',
    excerpt: 'How salary-sacrifice cycle schemes apply to higher-value eMTBs, and what to check with your employer first.',
  },
  {
    slug: 'amflow-dji-avinox-review',
    title: 'Amflow PL Carbon — DJI Avinox eMTB, Spec Breakdown',
    metaTitle: 'Amflow PL Carbon Review — DJI Avinox eMTB Spec Breakdown',
    metaDescription: 'A spec-based look at the Amflow PL Carbon and its DJI Avinox M1 motor — where it sits against Bosch and Shimano-powered lightweight eMTBs.',
    keyword: 'amflow pl carbon review',
    excerpt: 'DJI’s Avinox motor system is new to eMTBs — here’s how the Amflow PL Carbon’s spec sheet compares to the established players.',
  },
];

export function findProduct(slug) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function findCategoryPage(slug) {
  return CATEGORY_PAGES.find((c) => c.slug === slug);
}

export function findBrand(slug) {
  return BRANDS.find((b) => b.slug === slug);
}

export function findPost(slug) {
  return POSTS.find((p) => p.slug === slug);
}

export function relatedProducts(product, limit = 4) {
  return PRODUCTS.filter(
    (p) => p.slug !== product.slug && (p.brand === product.brand || p.category === product.category)
  ).slice(0, limit);
}
