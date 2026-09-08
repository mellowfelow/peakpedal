import { SITE, CATEGORY_PAGES, PRODUCTS, POSTS, ACCESSORIES, POST_MODIFIED_DEFAULT } from '@/config/site';

// Single sitemap at /sitemap.xml (217 URLs — well under the 50k split threshold).
// Product + accessory entries carry <image:image> via the `images` field.
export default function sitemap() {
  const base = `https://${SITE.domain}`;
  const now = new Date();

  const staticPages = [
    { url: `${base}/`, lastModified: now, changeFrequency: 'daily', priority: 1 },
    { url: `${base}/about/`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contact/`, lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: `${base}/faq/`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${base}/blog/`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/accessories/`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/shipping/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/refund/`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/privacy/`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
    { url: `${base}/terms/`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const categoryPages = CATEGORY_PAGES.map((c) => ({
    url: `${base}/${c.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: c.kind === 'main' ? 0.9 : 0.7,
  }));

  const productPages = PRODUCTS.map((p) => ({
    url: `${base}/products/${p.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
    images: p.images.filter((i) => !i.endsWith('.svg')).map((i) => `${base}${i}`),
  }));

  const postPages = POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}/`,
    lastModified: new Date(p.dateModified || POST_MODIFIED_DEFAULT),
    changeFrequency: 'monthly',
    priority: 0.6,
  }));

  const accessoryPages = ACCESSORIES.map((a) => ({
    url: `${base}/accessories/${a.slug}/`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.6,
    images: a.images.filter((i) => !i.endsWith('.svg')).map((i) => `${base}${i}`),
  }));

  return [...staticPages, ...categoryPages, ...productPages, ...postPages, ...accessoryPages];
}
