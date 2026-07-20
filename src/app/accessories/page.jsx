import ShopGrid from '@/components/ShopGrid';
import Breadcrumbs, { breadcrumbSchema } from '@/components/Breadcrumbs';
import { SITE, ACCESSORIES, ACCESSORY_CATEGORIES } from '@/config/site';

export const metadata = {
  title: 'eMTB Accessories UK | Batteries, Displays, Protection & More',
  description: `Shop ${ACCESSORIES.length} electric mountain bike accessories — batteries, chargers, displays, motor spares, protection, tools, tyres, storage, lighting and apparel.`,
  alternates: { canonical: `https://${SITE.domain}/accessories/` },
  openGraph: { url: `https://${SITE.domain}/accessories/`, images: ['/images/placeholder.svg'] },
};

export default function AccessoriesHub() {
  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Accessories' },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [breadcrumbSchema(breadcrumbItems, SITE.domain)],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs items={breadcrumbItems} />
      <section className="section container">
        <h1>eMTB Accessories</h1>
        <p style={{ maxWidth: 720 }}>
          {ACCESSORIES.length} electric mountain bike accessories across {ACCESSORY_CATEGORIES.length} categories —
          batteries and range extenders, chargers, displays, motor spares, protective gear, maintenance tools, tyres,
          storage and transport, lighting and apparel. Filter by category, brand or price below.
        </p>

        <ShopGrid products={ACCESSORIES} itemLabel="accessory" itemLabelPlural="accessories" basePath="/accessories" />
      </section>
    </>
  );
}
