'use client';

import { useState } from 'react';
import Link from 'next/link';
import QtyStepper from './QtyStepper';
import { CONTACT } from '@/config/site';

export default function ProductCardHome({ product, eager = false }) {
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function addToCart(e) {
    e.preventDefault();
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem('mm-cart') || '[]');
    const existing = cart.find((item) => item.slug === product.slug);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({ slug: product.slug, name: product.name, priceLow: product.priceLow, qty });
    }
    localStorage.setItem('mm-cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('mm-cart-updated'));
    setAdded(true);
    setQty(1);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="product-card">
      {product.badge && <span className="product-card-badge">{product.badge}</span>}
      <Link href={`/products/${product.slug}/`} className="product-card-link">
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
            {product.category && <span className="tag">{product.category}</span>}
            {product.type && <span className="tag">{product.type}</span>}
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
      <div className="product-card-actions" onClick={(e) => e.stopPropagation()}>
        <QtyStepper qty={qty} onChange={setQty} />
        <button type="button" className="btn btn-primary btn-sm" onClick={addToCart}>
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
