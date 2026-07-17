import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import HeroSlider from '@/components/HeroSlider';
import { SITE, CONTACT, PRODUCTS, BRANDS, FAQS, COMPLIANCE, HERO_SLIDES } from '@/config/site';

export const metadata = {
  title: `Electric Mountain Bikes UK | eMTB Specialists | ${SITE.name}`,
  description: `Shop ${PRODUCTS.length} electric mountain bikes from 15+ leading brands. Full suspension, hardtail and lightweight SL eMTBs, UK-wide delivery.`,
  alternates: { canonical: `https://${SITE.domain}/` },
  openGraph: { url: `https://${SITE.domain}/`, images: ['/images/placeholder.svg'] },
};

const TYPE_TILES = [
  ['Full Suspension', '/full-suspension-electric-mountain-bikes/'],
  ['Hardtail', '/hardtail-electric-mountain-bikes/'],
  ['Lightweight SL', '/lightweight-electric-mountain-bikes/'],
  ['Enduro', '/enduro-electric-mountain-bikes/'],
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
        <div>🚚 Free UK Delivery</div>
        <div>⚙️ 15+ Leading Brands</div>
        <div>💬 WhatsApp Expert Advice</div>
        <div>🏦 Finance & Cycle to Work</div>
      </section>

      <section className="section container">
        <h2>Shop by Type</h2>
        <div className="grid grid-4">
          {TYPE_TILES.map(([label, href]) => (
            <Link key={href} href={href} className="card" style={{ textDecoration: 'none', textAlign: 'center' }}>
              <strong>{label}</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
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
        <h2>Shop by Brand</h2>
        <div className="grid grid-4">
          {BRANDS.map((b) => (
            <Link
              key={b.slug}
              href={`/${b.slug}-electric-mountain-bikes/`}
              className="card"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              {b.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="section container" style={{ maxWidth: 820 }}>
        <h2>About Peak Pedal</h2>
        <p>
          Peak Pedal is a UK-based electric mountain bike retailer offering a curated range of {PRODUCTS.length} eMTBs from leading
          brands including Cube, Trek, Orbea, Santa Cruz, Whyte and Amflow. We ship UK-wide and specialise in full-suspension,
          hardtail and lightweight SL electric mountain bikes built around Bosch, Shimano, Yamaha and DJI Avinox motor platforms.
        </p>
        <p>
          Our focus is matching each rider to the right motor, travel and geometry for their terrain — whether that's an entry-level
          hardtail for trail-centre laps or a long-travel enduro full-suspension build for demanding descents. Every bike we stock is
          a legal electrically assisted pedal cycle (EAPC) under UK law: motor power capped at {COMPLIANCE.eapc.maxPowerWatts}W,
          assistance cutting out at {COMPLIANCE.eapc.maxAssistSpeedMph}mph.
        </p>
        <p>
          <Link href="/about/">Read more about Peak Pedal &rarr;</Link>
        </p>
      </section>

      <section className="section container" style={{ maxWidth: 820 }}>
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
