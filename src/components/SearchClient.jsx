'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import ProductCard from './ProductCard';
import { PRODUCTS, POSTS } from '@/config/site';

export default function SearchClient() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');

  const q = query.trim().toLowerCase();
  const matchedProducts = q
    ? PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q)
      )
    : [];
  const matchedPosts = q ? POSTS.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)) : [];

  return (
    <section className="section container">
      <h1>Search</h1>
      <div className="form-field" style={{ maxWidth: 480 }}>
        <label htmlFor="search-input">Search bikes and guides</label>
        <input
          id="search-input"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Bosch hardtail, Orbea Wild, under 3000"
        />
      </div>

      {q && (
        <p className="muted">
          {matchedProducts.length + matchedPosts.length} result{matchedProducts.length + matchedPosts.length === 1 ? '' : 's'} for
          &ldquo;{query}&rdquo;
        </p>
      )}

      {matchedProducts.length > 0 && (
        <div className="grid grid-4" style={{ marginTop: '1rem' }}>
          {matchedProducts.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}

      {matchedPosts.length > 0 && (
        <div className="stack" style={{ marginTop: '1.5rem' }}>
          <h2>Guides</h2>
          {matchedPosts.map((p) => (
            <Link key={p.slug} href={`/blog/${p.slug}/`} className="card" style={{ textDecoration: 'none' }}>
              <strong>{p.title}</strong>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
