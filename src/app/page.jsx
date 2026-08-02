import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import HeroSlider from '@/components/HeroSlider';
import { SITE, CONTACT, PRODUCTS, BRANDS, FAQS, COMPLIANCE, HERO_SLIDES, CATEGORY_PAGES } from '@/config/site';

const brandCount = new Set(PRODUCTS.map((p) => p.brand)).size;

export const metadata = {
  title: `Electric Mountain Bike Specialists UK — ${SITE.name} | ${PRODUCTS.length} eMTBs, ${brandCount} Brands`,
  description: `Peak Pedal — UK electric mountain bike specialists stocking ${PRODUCTS.length} eMTBs from Cube, Trek, Orbea, Santa Cruz, Specialized, Canyon + 10 more brands. UK-wide delivery.`,
  alternates: { canonical: `https://${SITE.domain}/` },
  openGraph: { url: `https://${SITE.domain}/`, images: ['/images/placeholder.svg'] },
};

// Real category lifestyle photos, supplied by the client and processed via
// `npm run images:brand-assets` into public/images/categories/<slug>.webp.
const TYPE_TILES = [
  ['Full Suspension', '/full-suspension-electric-mountain-bikes/', 'Front & rear travel for rough terrain', <FullSuspensionIcon key="fs" />, '/images/categories/full-suspension-electric-mountain-bikes.webp'],
  ['Hardtail', '/hardtail-electric-mountain-bikes/', 'Efficient climbing, lower maintenance', <HardtailIcon key="ht" />, '/images/categories/hardtail-electric-mountain-bikes.webp'],
  ['Lightweight SL', '/lightweight-electric-mountain-bikes/', 'Natural ride feel, less bulk', <LightweightIcon key="lw" />, '/images/categories/lightweight-electric-mountain-bikes.webp'],
  ['Enduro', '/enduro-electric-mountain-bikes/', 'Built for demanding descents', <EnduroIcon key="en" />, '/images/categories/enduro-electric-mountain-bikes.webp'],
];

const storeSchema = {
  '@context': 'https://schema.org',
  '@type': ['Store', 'Organization'],
  name: SITE.name,
  description:
    "Peak Pedal is a UK-based electric mountain bike retailer offering a curated range of eMTBs from leading brands including Cube, Trek, Orbea, Santa Cruz, Whyte and Amflow. Peak Pedal ships UK-wide and specializes in full-suspension, hardtail and lightweight SL electric mountain bikes built around Bosch, Shimano, Yamaha and DJI Avinox motor platforms.",
  url: `https://${SITE.domain}`,
  areaServed: 'GB',
  address: { '@type': 'PostalAddress', addressCountry: 'GB' },
  numberOfItems: PRODUCTS.length,
  knowsAbout: ['Electric mountain bikes', 'eMTB motors', 'Bosch Performance CX', 'Shimano EP8', 'UK EAPC regulations'],
  priceRange: '££-£££',
  sameAs: SITE.social.sameAs,
  makesOffer: {
    '@type': 'AggregateOffer',
    priceCurrency: CONTACT.currency,
    lowPrice: Math.min(...PRODUCTS.map((p) => p.priceLow)),
    highPrice: Math.max(...PRODUCTS.map((p) => p.priceHigh)),
    offerCount: PRODUCTS.length,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function HomePage() {
  const featured = PRODUCTS.filter((p) => p.featured).slice(0, 8);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(storeSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <HeroSlider slides={HERO_SLIDES} />

      <section className="container trust-bar">
        <div className="trust-item"><TruckIcon /> Free UK Delivery</div>
        <div className="trust-item"><BrandsIcon /> 15+ Leading Brands</div>
        <div className="trust-item"><ChatIcon /> WhatsApp Expert Advice</div>
        <div className="trust-item"><FinanceIcon /> Finance &amp; Cycle to Work</div>
      </section>

      <section className="section container">
        <span className="section-eyebrow">Find Your Ride</span>
        <h2>Shop by Type</h2>
        <div className="grid grid-4">
          {TYPE_TILES.map(([label, href, sub, icon, image]) => (
            <Link key={href} href={href} className="tile">
              <span className="tile-photo tile-photo-cover">
                <img src={image} alt={`${label} electric mountain bikes`} width={400} height={300} loading="lazy" />
                <span className="tile-icon-badge">{icon}</span>
              </span>
              <span className="tile-body">
                <strong className="tile-label">{label}</strong>
                <span className="tile-sub">{sub}</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-tint container">
        <span className="section-eyebrow">Best Sellers</span>
        <h2>Featured Electric Mountain Bikes</h2>
        <div className="grid grid-4">
          {featured.map((p, i) => (
            <ProductCard key={p.slug} product={p} eager={i === 0} />
          ))}
        </div>
        <p className="text-center" style={{ marginTop: '1.5rem' }}>
          <Link href="/electric-mountain-bikes/" className="btn btn-primary">
            View All {PRODUCTS.length} Bikes
          </Link>
        </p>
      </section>

      <section className="section container">
        <span className="section-eyebrow">{BRANDS.length}+ Brands Stocked</span>
        <h2>Shop by Brand</h2>
        <div className="brand-carousel">
          {BRANDS.map((b) => (
            <Link key={b.slug} href={`/${b.slug}-electric-mountain-bikes/`} className="tile brand-tile">
              <span className="tile-photo">
                <img src={`/images/brands/${b.slug}.webp`} alt={`${b.name} logo`} width={400} height={200} loading="lazy" />
              </span>
              <span className="tile-body">
                <strong className="tile-label">{b.name}</strong>
                <span className="tile-sub">Shop eMTBs</span>
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="section section-dark">
        <div className="container" style={{ maxWidth: 820 }}>
          <span className="section-eyebrow">About Peak Pedal</span>
          <h2>UK-Based eMTB Specialists</h2>
          <p>
            Peak Pedal is a UK-based electric mountain bike retailer offering a curated range of {PRODUCTS.length} eMTBs from leading
            brands including Cube, Trek, Orbea, Santa Cruz, Whyte and Amflow. We ship UK-wide and specialise in full-suspension,
            hardtail and lightweight SL electric mountain bikes built around Bosch, Shimano, Yamaha and DJI Avinox motor platforms.
          </p>
          <p>
            Our focus is matching each rider to the right motor, travel and geometry for their terrain — whether that's an entry-level
            hardtail for trail-centre laps or a long-travel enduro full-suspension build for demanding descents. Whether you call them
            eMTBs or emtb bikes, every one we stock is a legal electrically assisted pedal cycle (EAPC) under UK law: motor power
            capped at {COMPLIANCE.eapc.maxPowerWatts}W, assistance cutting out at {COMPLIANCE.eapc.maxAssistSpeedMph}mph.
          </p>
          <p>
            <Link href="/about/" style={{ color: 'var(--color-accent)', fontWeight: 700 }}>
              Read more about Peak Pedal &rarr;
            </Link>
          </p>
        </div>
      </section>

      <section className="section container" style={{ maxWidth: 820 }}>
        <span className="section-eyebrow">Got Questions?</span>
        <h2>Frequently Asked Questions</h2>
        <div className="stack">
          {FAQS.map((f) => (
            <div key={f.q} className="card">
              <h3 style={{ marginBottom: '0.4rem' }}>{f.q}</h3>
              <p style={{ marginBottom: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M1 3h13v13H1zM14 8h4l4 4v4h-8V8z" />
      <circle cx="6" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}

function BrandsIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 2l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1L6.6 18.3l1.3-6-4.6-4.1 6.1-.6z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
    </svg>
  );
}

function FinanceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <line x1="2" y1="10" x2="22" y2="10" />
    </svg>
  );
}

function FullSuspensionIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="5.5" cy="18.5" r="3.5" />
      <circle cx="18.5" cy="18.5" r="3.5" />
      <path d="M5.5 18.5L10 8h4l4.5 10.5M10 8L8 5h3M12 12l3 6.5" />
    </svg>
  );
}

function HardtailIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="5.5" cy="18.5" r="3.5" />
      <circle cx="18.5" cy="18.5" r="3.5" />
      <path d="M5.5 18.5L10 6h5l3 12.5M10 6L8 4h3" />
    </svg>
  );
}

function LightweightIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="18" r="3" />
      <path d="M6 18l4-9h4l4 9M10 9L9 6h3" />
      <path d="M3 3l2 1" />
    </svg>
  );
}

function EnduroIcon() {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="5" cy="19" r="3.2" />
      <circle cx="19" cy="19" r="3.2" />
      <path d="M5 19L11 6h4l4.5 13M11 6L9 3h3" />
      <path d="M2 22h4M18 22h4" />
    </svg>
  );
}
