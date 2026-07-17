import { notFound } from 'next/navigation';
import Breadcrumbs, { breadcrumbSchema } from '@/components/Breadcrumbs';
import { SITE, POSTS, findPost } from '@/config/site';
import { POST_BODIES } from '@/content/posts';

export function generateStaticParams() {
  return POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  return {
    title: post.metaTitle,
    description: post.metaDescription,
    alternates: { canonical: `https://${SITE.domain}/blog/${post.slug}/` },
    openGraph: { url: `https://${SITE.domain}/blog/${post.slug}/`, type: 'article' },
  };
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();
  const sections = POST_BODIES[post.slug] || [];

  const breadcrumbItems = [
    { label: 'Home', href: '/' },
    { label: 'Blog', href: '/blog/' },
    { label: post.title },
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      breadcrumbSchema(breadcrumbItems, SITE.domain),
      {
        '@type': 'Article',
        headline: post.title,
        description: post.metaDescription,
        author: { '@type': 'Organization', name: SITE.name },
        publisher: { '@type': 'Organization', name: SITE.name },
        mainEntityOfPage: `https://${SITE.domain}/blog/${post.slug}/`,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumbs items={breadcrumbItems} />
      <article className="section container" style={{ maxWidth: 760 }}>
        <h1>{post.title}</h1>
        {sections.map((section) => (
          <div key={section.heading}>
            <h2>{section.heading}</h2>
            {section.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        ))}
      </article>
    </>
  );
}
