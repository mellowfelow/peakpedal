import Link from 'next/link';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/ProductCard';
import AddToCartButton from '@/components/AddToCartButton';
import Breadcrumbs, { breadcrumbSchema } from '@/components/Breadcrumbs';
import { SITE, CONTACT, PRODUCTS, findProduct, relatedProducts } from '@/config/site';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) return {};
  const title = `${product.name} | ${product.brand} Electric Mountain Bike`;
  const spec = product.motor || product.type;
  const description = `${product.name} — ${spec} eMTB, from ${CONTACT.currencySymbol}${product.priceLow.toLocaleString('en-GB')}. UK-wide delivery, expert advice.`;
  return {
    title,
    description,
    alternates: { canonical: `https://${SITE.domain}/products/${product.slug}/` },
    openGraph: { url: `https://${SITE.domain}/products/${product.slug}/`, images: [product.images[0]] },
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
        brand: { '@type': 'Brand', name: product.brand },
        category: product.category,
        offers: {
          '@type': 'Offer',
          url: `https://${SITE.domain}/products/${product.slug}/`,
          priceCurrency: CONTACT.currency,
          price: product.priceLow,
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
              <img src={product.images[0]} alt={product.imageAlt} width={800} height={600} loading="eager" />
            </div>
          </div>
          <div>
            <span className="product-brand">{product.brand}</span>
            <h1>{product.name}</h1>
            {product.badge && <span className="badge">{product.badge}</span>}
            <p style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--color-primary)', margin: '0.5rem 0' }}>
              From {CONTACT.currencySymbol}
              {product.priceLow.toLocaleString('en-GB')}–{CONTACT.currencySymbol}
              {product.priceHigh.toLocaleString('en-GB')}
            </p>
            <p>{product.description}</p>

            <div className="table-wrap" style={{ margin: '1rem 0' }}>
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
