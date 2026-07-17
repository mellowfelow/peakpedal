import Link from 'next/link';
import { SITE, POSTS } from '@/config/site';

export const metadata = {
  title: 'Electric Mountain Bike Guides & Reviews',
  description: 'Buying guides, motor comparisons and spec breakdowns for electric mountain bikes — from Peak Pedal.',
  alternates: { canonical: `https://${SITE.domain}/blog/` },
};

export default function BlogIndex() {
  return (
    <section className="section container">
      <h1>Electric Mountain Bike Guides & Reviews</h1>
      <p className="muted" style={{ maxWidth: 640 }}>
        Buying guides, motor comparisons and honest spec breakdowns — no fabricated test claims, just what the numbers say.
      </p>
      <div className="grid grid-3">
        {POSTS.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}/`} className="card" style={{ textDecoration: 'none' }}>
            <h3>{post.title}</h3>
            <p className="muted" style={{ marginBottom: 0 }}>{post.excerpt}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
