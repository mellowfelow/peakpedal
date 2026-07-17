import { NextResponse } from 'next/server';
import { SITE, CATEGORY_PAGES, PRODUCTS } from '@/config/site';

export async function GET() {
  const categories = CATEGORY_PAGES.filter((c) => c.kind === 'type' || c.kind === 'brand' || c.kind === 'motor').map((c) => ({
    slug: c.slug,
    name: c.h1,
    kind: c.kind,
    productCount: PRODUCTS.filter(c.filter).length,
    url: `https://${SITE.domain}/${c.slug}/`,
  }));

  return NextResponse.json(
    { count: categories.length, categories },
    { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' } }
  );
}
