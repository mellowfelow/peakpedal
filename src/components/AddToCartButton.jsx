'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import QtyStepper from './QtyStepper';

export default function AddToCartButton({ product }) {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  function addToCart() {
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
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="stack" style={{ gap: '0.75rem' }}>
      <QtyStepper qty={qty} onChange={setQty} />
      <button type="button" className="btn btn-primary btn-block" onClick={addToCart}>
        {added ? 'Added to cart ✓' : 'Add to Cart'}
      </button>
      <button type="button" className="btn btn-outline btn-block" onClick={() => { addToCart(); router.push('/cart/'); }}>
        Buy Now
      </button>
    </div>
  );
}
