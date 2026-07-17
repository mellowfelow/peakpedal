import Link from 'next/link';
import { notFound } from 'next/navigation';
import ShopGrid from '@/components/ShopGrid';
import Breadcrumbs, { breadcrumbSchema } from '@/components/Breadcrumbs';
import { SITE, CONTACT, CATEGORY_PAGES, PRODUCTS, findCategoryPage } from '@/config/site';

export function generateStaticParams() {
  return CATEGORY_PAGES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const page = findCategoryPage(slug);
  if (!page) return {};
  return {
    title: page.metaTitle,
    description: page.metaDescription,
    alternates: { canonical: `https://${SITE.domain}/${page.slug}/` },
    openGraph: { url: `https://${SITE.domain}/${page.slug}/`, images: ['/images/placeholder.svg'] },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const page = findCategoryPage(slug);
  if (!page) notFound();

  let products = PRODUCTS.filter(page.filter);
  if (page.sort === 'price-asc') {
    products = [...products].sort((a, b) => a.priceLow - b.priceLow);
  }

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Shop', href: '/electric-mountain-bikes/' },
    { label: page.h1 },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema(breadcrumbItems, SITE.domain)],
  };

  const isInfoPage = page.kind === 'info' || page.kind === 'guidance-no-stock';

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs items={breadcrumbItems} />
      <section className="section container">
        <h1>{page.h1}</h1>
        <p style={{ maxWidth: 720 }}>{page.intro}</p>

        {isInfoPage ? (
          <div className="card" style={{ maxWidth: 480, marginTop: '1.5rem' }}>
            <p style={{ marginBottom: '1rem' }}>Get in touch and we'll talk you through the details for the bike you're interested in.</p>
            <div className="hero-cta">
              <a href={`https://wa.me/${CONTACT.whatsapp}`} className="btn btn-primary">
                Ask on WhatsApp
              </a>
              <Link href="/contact/" className="btn btn-outline">
                Contact Form
              </Link>
            </div>
          </div>
        ) : products.length > 0 ? (
          <ShopGrid products={products} defaultSort={page.sort === 'price-asc' ? 'price-asc' : 'featured'} />
        ) : (
          <p className="muted">No bikes currently match this page — check back soon or browse the full range.</p>
        )}
      </section>
    </>
  );
}
