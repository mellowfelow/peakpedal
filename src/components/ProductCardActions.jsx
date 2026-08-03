'use client';

import { useState } from 'react';
import QtyStepper from './QtyStepper';

// Shared add-to-cart control used by every product card across the site
// (homepage, shop grids, search, related products, accessories). Firing
// `mm-cart-updated` both refreshes the nav count and opens the CartDrawer.
export default function ProductCardActions({ product }) {
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
    <div className="product-card-actions" onClick={(e) => e.stopPropagation()}>
      <QtyStepper qty={qty} onChange={setQty} />
      <button type="button" className="btn btn-primary btn-sm" onClick={addToCart}>
        {added ? 'Added ✓' : 'Add to Cart'}
      </button>
    </div>
  );
}
