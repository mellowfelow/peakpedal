'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { CONTACT } from '@/config/site';

export default function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useState([]);

  const readCart = useCallback(() => {
    try {
      return JSON.parse(localStorage.getItem('mm-cart') || '[]');
    } catch {
      return [];
    }
  }, []);

  useEffect(() => {
    function onCartUpdated() {
      setCart(readCart());
      setOpen(true);
    }
    window.addEventListener('mm-cart-updated', onCartUpdated);
    return () => window.removeEventListener('mm-cart-updated', onCartUpdated);
  }, [readCart]);

  function remove(slug) {
    const next = cart.filter((item) => item.slug !== slug);
    localStorage.setItem('mm-cart', JSON.stringify(next));
    setCart(next);
    window.dispatchEvent(new Event('mm-cart-updated-silent'));
    if (next.length === 0) setOpen(false);
  }

  const subtotal = cart.reduce((sum, item) => sum + item.priceLow * (item.qty || 1), 0);

  return (
    <>
      {open && <div className="cart-drawer-backdrop" onClick={() => setOpen(false)} />}
      <aside className={`cart-drawer ${open ? 'cart-drawer-open' : ''}`}>
        <div className="cart-drawer-header">
          <strong>Cart ({cart.reduce((s, i) => s + (i.qty || 1), 0)})</strong>
          <button type="button" className="cart-drawer-close" onClick={() => setOpen(false)} aria-label="Close cart">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="cart-drawer-items">
          {cart.map((item) => (
            <div key={item.slug} className="cart-drawer-item">
              <div>
                <strong>{item.name}</strong>
                <p className="muted" style={{ margin: 0, fontSize: '0.85rem' }}>
                  Qty: {item.qty || 1} &middot; From {CONTACT.currencySymbol}{item.priceLow.toLocaleString('en-GB')}
                </p>
              </div>
              <button type="button" className="cart-drawer-remove" onClick={() => remove(item.slug)} aria-label={`Remove ${item.name}`}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <div className="cart-drawer-footer">
          <p style={{ fontWeight: 700, marginBottom: '0.5rem' }}>
            Subtotal (from): {CONTACT.currencySymbol}{subtotal.toLocaleString('en-GB')}
          </p>
          <Link href="/cart/" className="btn btn-primary btn-block" onClick={() => setOpen(false)}>
            View Cart
          </Link>
        </div>
      </aside>
    </>
  );
}
