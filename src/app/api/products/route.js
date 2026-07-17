import { NextResponse } from 'next/server';
import { SITE, PRODUCTS } from '@/config/site';

function toApiProduct(p) {
  return {
    slug: p.slug,
    name: p.name,
    brand: p.brand,
    category: p.category,
    type: p.type,
    motor: p.motor,
    travel: p.travel,
    priceFrom: p.priceLow,
    priceTo: p.priceHigh,
    currency: 'GBP',
    description: p.description,
    url: `https://${SITE.domain}/products/${p.slug}/`,
    image: `https://${SITE.domain}${p.images[0]}`,
  };
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const q = searchParams.get('q')?.toLowerCase();
  const limit = Number(searchParams.get('limit')) || undefined;

  let results = PRODUCTS;
  if (category) results = results.filter((p) => p.category.toLowerCase() === category.toLowerCase() || p.brand.toLowerCase() === category.toLowerCase());
  if (q) results = results.filter((p) => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
  if (limit) results = results.slice(0, limit);

  return NextResponse.json(
    { count: results.length, products: results.map(toApiProduct) },
    { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' } }
  );
}
