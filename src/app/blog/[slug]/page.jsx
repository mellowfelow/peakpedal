import { notFound } from 'next/navigation';
import Breadcrumbs, { breadcrumbSchema } from '@/components/Breadcrumbs';
import PostBody, { postFaqSchema } from '@/components/PostBody';
import { SITE, POSTS, findPost, POST_PUBLISHED_DEFAULT, POST_MODIFIED_DEFAULT } from '@/config/site';
import { POST_BODIES } from '@/content/posts';

const LONG_DATE = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  const published = post.datePublished || POST_PUBLISHED_DEFAULT;
  const modified = post.dateModified || POST_MODIFIED_DEFAULT;
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://${SITE.domain}/blog/${post.slug}/` },
    openGraph: {
      url: `https://${SITE.domain}/blog/${post.slug}/`,
      type: 'article',
      images: ['/images/og-default.png'],
      publishedTime: published,
      modifiedTime: modified,
    },
    twitter: { card: 'summary_large_image', images: ['/images/og-default.png'] },
    other: { 'og:updated_time': modified },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const body = POST_BODIES[post.slug];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: post.title },
  ];

  const faqSchema = postFaqSchema(body?.faqs);
  const published = post.datePublished || POST_PUBLISHED_DEFAULT;
  const modified = post.dateModified || POST_MODIFIED_DEFAULT;

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema(breadcrumbItems, SITE.domain),
      {
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription,
        image: `https://${SITE.domain}/images/og-default.png`,
        datePublished: published,
        dateModified: modified,
        author: { '@type': 'Organization', name: SITE.name, url: `https://${SITE.domain}` },
        publisher: {
          '@type': 'Organization',
          name: SITE.name,
          logo: { '@type': 'ImageObject', url: `https://${SITE.domain}/images/logo.png` },
        },
        mainEntityOfPage: `https://${SITE.domain}/blog/${post.slug}/`,
      },
      ...(faqSchema ? [faqSchema] : []),
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs items={breadcrumbItems} />
      <article className="section container" style={{ maxWidth: 760 }}>
        <h1>{post.title}</h1>
        <p className="post-meta muted">
          Published <time dateTime={published}>{LONG_DATE.format(new Date(published))}</time>
          {modified !== published && (
            <> · Updated <time dateTime={modified}>{LONG_DATE.format(new Date(modified))}</time></>
          )}
        </p>
        <PostBody body={body} />
      </article>
    </>
  );
}
