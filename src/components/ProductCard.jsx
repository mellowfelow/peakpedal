import Link from 'next/link';
import { CONTACT } from '@/config/site';

export default function ProductCard({ product, eager = false }) {
  return (
    <Link href={`/products/${product.slug}/`} className="product-card">
      <div className="product-frame">
        <img
          src={product.images[0]}
          alt={product.imageAlt}
          width={400}
          height={300}
          loading={eager ? 'eager' : 'lazy'}
        />
      </div>
      <div className="product-card-body">
        <span className="product-brand">{product.brand}</span>
        <strong>{product.name}</strong>
        {product.badge && <span className="badge" style={{ width: 'fit-content' }}>{product.badge}</span>}
        <span className="product-spec">
          {product.category} &middot; {product.type}
          {product.motor ? ` · ${product.motor}` : ''}
        </span>
        <span className="product-price">
          From {CONTACT.currencySymbol}
          {product.priceLow.toLocaleString('en-GB')}
        </span>
      </div>
    </Link>
  );
}
