import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import AddToCartButton from '@/components/AddToCartButton';
import Breadcrumbs, { breadcrumbSchema } from '@/components/Breadcrumbs';
import { renderInline } from '@/components/PostBody';
import { SITE, CONTACT, PRODUCTS, findProduct, relatedProducts } from '@/config/site';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  // product.name already leads with the brand ("Trek Rail 5"), so no separate brand clause —
  // the root layout template appends " | Peak Pedal". Keeps titles ~30–55 chars, under 60.
  const title = `${product.name} eMTB`;
  const price = `${CONTACT.currencySymbol}${product.priceLow.toLocaleString('en-GB')}`;
  // Two candidate lengths (short/long delivery phrasing) — pick whichever lands closest to
  // the 130-155 char target. Model names/motors vary too widely for one fixed template to fit.
  const shortDesc = `${product.name} — ${product.travel} ${product.type} eMTB with ${product.motor}. From ${price} with UK-wide delivery from Peak Pedal.`;
  const longDesc = `${product.name} — ${product.travel} ${product.type} eMTB with ${product.motor}. From ${price}, with UK-wide delivery and expert buying advice from Peak Pedal.`;
  const inBand = (s) => s.length >= 130 && s.length <= 155;
  const description = inBand(longDesc)
    ? longDesc
    : inBand(shortDesc)
      ? shortDesc
      : Math.abs(longDesc.length - 142) < Math.abs(shortDesc.length - 142)
        ? longDesc
        : shortDesc;
  return {
    title,
    description,
    alternates: { canonical: `https://${SITE.domain}/products/${product.slug}/` },
    openGraph: { url: `https://${SITE.domain}/products/${product.slug}/`, images: [product.images[0]] },
    twitter: { card: 'summary_large_image', images: [product.images[0]] },
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) notFound();
  const related = relatedProducts(product);

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/electric-mountain-bikes/' },
    { label: product.brand, href: `/${product.brand.toLowerCase().replace(/\s+/g, '-')}-electric-mountain-bikes/` },
    { label: product.name },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema(breadcrumbItems, SITE.domain),
      {
        '@type': 'Product',
        name: product.name,
        description: product.description,
        image: product.images.map((img) => `https://${SITE.domain}${img}`),
        sku: product.slug,
        mpn: product.slug,
        brand: { '@type': 'Brand', name: product.brand },
        category: product.category,
        offers: {
          '@type': 'Offer',
          url: `https://${SITE.domain}/products/${product.slug}/`,
          priceCurrency: CONTACT.currency,
          price: product.priceLow,
          priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
          availability: 'https://schema.org/InStock',
          itemCondition: 'https://schema.org/NewCondition',
          // Free UK shipping is a stated brand fact (ORDER_RULES). Delivery time is
          // confirmed per-order, so it's deliberately not asserted here.
          shippingDetails: {
            '@type': 'OfferShippingDetails',
            shippingRate: { '@type': 'MonetaryAmount', value: 0, currency: CONTACT.currency },
            shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'GB' },
          },
          // Mirrors /refund/: 14-day cancellation under the Consumer Contracts
          // Regulations 2013; change-of-mind return postage is the customer's.
          hasMerchantReturnPolicy: {
            '@type': 'MerchantReturnPolicy',
            applicableCountry: 'GB',
            returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
            merchantReturnDays: 14,
            returnMethod: 'https://schema.org/ReturnByMail',
            returnFees: 'https://schema.org/ReturnShippingFees',
          },
        },
      },
      ...(product.faqs?.length
        ? [
            {
              '@type': 'FAQPage',
              mainEntity: product.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs items={breadcrumbItems} />
      <section className="section container">
        <div className="grid product-detail-grid">
          <div>
            <div className="gallery-main">
              {product.images[0].endsWith('.svg') ? (
                <img src={product.images[0]} alt={product.imageAlt} width={800} height={600} loading="eager" />
              ) : (
                <Image
                  src={product.images[0]}
                  alt={product.imageAlt}
                  width={800}
                  height={600}
                  priority
                  sizes="(max-width: 900px) 100vw, 460px"
                />
              )}
            </div>
          </div>
          <div>
            <span className="product-brand">{product.brand}</span>
            <h1>{product.name}</h1>
            {product.badge && <span className="badge">{product.badge}</span>}
            <p className="product-detail-price">
              {product.priceLow === product.priceHigh ? (
                <>
                  {CONTACT.currencySymbol}
                  {product.priceLow.toLocaleString('en-GB')}
                </>
              ) : (
                <>
                  From {CONTACT.currencySymbol}
                  {product.priceLow.toLocaleString('en-GB')}–{CONTACT.currencySymbol}
                  {product.priceHigh.toLocaleString('en-GB')}
                </>
              )}
            </p>
            <p>{product.longCopy[0]}</p>

            <div className="table-wrap product-spec-table">
              <table>
                <tbody>
                  <tr><th>Category</th><td>{product.category}</td></tr>
                  <tr><th>Type</th><td>{product.type}</td></tr>
                  {product.motor && <tr><th>Motor</th><td>{product.motor}</td></tr>}
                  {product.travel && <tr><th>Travel</th><td>{product.travel}</td></tr>}
                </tbody>
              </table>
            </div>

            <AddToCartButton product={product} />

            <div className="hero-cta">
              <a
                href={`https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(`Hi, I'm interested in the ${product.name}`)}`}
                className="btn btn-outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Ask on WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 760, marginTop: '2.5rem' }}>
          <h2>About the {product.name}</h2>
          {product.longCopy.slice(1).map((para, i) => (
            <p key={i}>{renderInline(para)}</p>
          ))}
        </div>

        {product.faqs?.length > 0 && (
          <div style={{ maxWidth: 760, marginTop: '2rem' }}>
            <h2>{product.name} — Common Questions</h2>
            <div className="stack">
              {product.faqs.map((f) => (
                <div key={f.q} className="card">
                  <h3 style={{ fontSize: '1rem', marginBottom: '0.4rem' }}>{f.q}</h3>
                  <p style={{ marginBottom: 0 }}>{f.a}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      {related.length > 0 && (
        <section className="section container">
          <h2>You Might Also Like</h2>
          <div className="grid grid-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}
