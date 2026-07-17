import { NextResponse } from 'next/server';
import { SITE, findProduct } from '@/config/site';

export async function GET(request, { params }) {
  const { slug } = await params;
  const product = findProduct(slug);
  if (!product) {
    return NextResponse.json({ error: 'Not found' }, { status: 404, headers: { 'Access-Control-Allow-Origin': '*' } });
  }
  return NextResponse.json(
    {
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      category: product.category,
      type: product.type,
      motor: product.motor,
      travel: product.travel,
      priceFrom: product.priceLow,
      priceTo: product.priceHigh,
      currency: 'GBP',
      description: product.description,
      url: `https://${SITE.domain}/products/${product.slug}/`,
      image: `https://${SITE.domain}${product.images[0]}`,
    },
    { headers: { 'Access-Control-Allow-Origin': '*', 'Cache-Control': 'public, max-age=300' } }
  );
}
