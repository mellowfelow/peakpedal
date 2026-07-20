import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import AddToCartButton from '@/components/AddToCartButton';
import Breadcrumbs, { breadcrumbSchema } from '@/components/Breadcrumbs';
import { SITE, CONTACT, ACCESSORIES, findAccessory, relatedAccessories } from '@/config/site';
import { ACCESSORY_BODIES } from '@/content/accessories';

export function generateStaticParams() {
  return ACCESSORIES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const accessory = findAccessory(slug);
  if (!accessory) return {};
  const description = `${accessory.name} — ${accessory.keyword}, from ${CONTACT.currencySymbol}${accessory.price.toLocaleString('en-GB')}. UK-wide delivery, expert advice.`;
  return {
    title: `${accessory.name} | ${accessory.category}`,
    description,
    alternates: { canonical: `https://${SITE.domain}/accessories/${accessory.slug}/` },
    openGraph: { url: `https://${SITE.domain}/accessories/${accessory.slug}/`, images: [accessory.images[0]] },
  };
}

export default async function AccessoryPage({ params }) {
  const { slug } = await params;
  const accessory = findAccessory(slug);
  if (!accessory) notFound();
  const related = relatedAccessories(accessory);
  const body = ACCESSORY_BODIES[accessory.slug];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Accessories', href: '/accessories/' },
    { label: accessory.name },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema(breadcrumbItems, SITE.domain),
      {
        '@type': 'Product',
        name: accessory.name,
        description: body || accessory.description,
        image: accessory.images.map((img) => `https://${SITE.domain}${img}`),
        category: accessory.category,
        offers: {
          '@type': 'Offer',
          url: `https://${SITE.domain}/accessories/${accessory.slug}/`,
          priceCurrency: CONTACT.currency,
          price: accessory.price,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs items={breadcrumbItems} />
      <section className="section container">
        <div className="grid two-col" style={{ gridTemplateColumns: '1fr 1fr', alignItems: 'start' }}>
          <div>
            <div className="gallery-main">
              <img src={accessory.images[0]} alt={accessory.imageAlt} width={800} height={600} loading="eager" />
            </div>
          </div>
          <div>
            <span className="product-brand">{accessory.category}</span>
            <h1>{accessory.name}</h1>
            <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-primary)', margin: '0.5rem 0' }}>
              {CONTACT.currencySymbol}
              {accessory.price.toLocaleString('en-GB')}
            </p>
            <p>{body || accessory.description}</p>

            <div className="table-wrap" style={{ margin: '1rem 0' }}>
              <table>
                <tbody>
                  <tr><th>Category</th><td>{accessory.category}</td></tr>
                  <tr><th>Compatibility</th><td>{accessory.compatibility}</td></tr>
                </tbody>
              </table>
            </div>

            <AddToCartButton product={accessory} />

            <div className="hero-cta">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in the ${accessory.name}`)}`}
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {accessory.compatibleWith.length > 0 ? (
          <div style={{ maxWidth: 760, marginTop: '2rem' }}>
            <h2>Compatible With</h2>
            <p>
              The {accessory.name} is compatible with {accessory.compatibility}-powered bikes in our range, including:
            </p>
            <ul>
              {accessory.compatibleWith.map((p) => (
                <li key={p.slug}>
                  <Link href={`/products/${p.slug}/`}>{p.name}</Link>
                </li>
              ))}
            </ul>
            <p className="muted">
              Not sure if this fits your specific bike? <a href={`https://wa.me/${CONTACT.whatsapp}`}>Ask us on WhatsApp</a> before ordering.
            </p>
          </div>
        ) : accessory.compatibility === 'Universal' ? (
          <div style={{ maxWidth: 760, marginTop: '2rem' }}>
            <h2>Fits Any Mountain Bike</h2>
            <p>
              The {accessory.name} is a universal-fit accessory, not tied to a specific motor or bike brand — see our{' '}
              <Link href="/electric-mountain-bikes/">full electric mountain bike range</Link> to shop bikes alongside it.
            </p>
          </div>
        ) : (
          <div style={{ maxWidth: 760, marginTop: '2rem' }}>
            <h2>Compatibility</h2>
            <p>
              No bike in our current range uses a {accessory.compatibility} motor — this listing is here for riders
              who already own a compatible bike bought elsewhere.{' '}
              <a href={`https://wa.me/${CONTACT.whatsapp}`}>Ask us on WhatsApp</a> to confirm fitment before ordering.
            </p>
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="section container">
          <h2>You Might Also Like</h2>
          <div className="grid grid-4">
            {related.map((a) => (
              <ProductCard key={a.slug} product={a} basePath="/accessories" />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
