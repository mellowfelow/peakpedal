import Link from 'next/link';
import { CONTACT } from '@/config/site';

export default function ProductCard({ product, eager = false }) {
  return (
    <Link href={`/products/${product.slug}/`} className="product-card">
      {product.badge && <span className="product-card-badge">{product.badge}</span>}
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
        <strong className="product-name">{product.name}</strong>
        <div className="product-tags">
          <span className="tag">{product.category}</span>
          <span className="tag">{product.type}</span>
          {product.motor && <span className="tag tag-motor">{product.motor}</span>}
        </div>
        <div className="product-card-footer">
          <span className="product-price">
            <span className="product-price-label">From</span>
            {CONTACT.currencySymbol}
            {product.priceLow.toLocaleString('en-GB')}
          </span>
          <span className="product-card-cta">
            View Details
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
