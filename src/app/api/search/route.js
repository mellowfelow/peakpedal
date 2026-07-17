import { NextResponse } from 'next/server';
import { SITE, PRODUCTS, POSTS } from '@/config/site';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = (searchParams.get('q') || '').toLowerCase();

  if (!q) {
    return NextResponse.json(
      { products: [], posts: [] },
      { headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }

  const products = PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q) || p.description.toLowerCase().includes(q)
  ).map((p) => ({ slug: p.slug, name: p.name, url: `https://${SITE.domain}/products/${p.slug}/` }));

  const posts = POSTS.filter((p) => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q)).map((p) => ({
    slug: p.slug,
    title: p.title,
    url: `https://${SITE.domain}/blog/${p.slug}/`,
  }));

  return NextResponse.json(
    { query: q, products, posts },
    { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' } }
  );
}
