'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import QtyStepper from './QtyStepper';
import { CONTACT, ORDER_RULES } from '@/config/site';

export default function CartClient() {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setCart(JSON.parse(localStorage.getItem('mm-cart') || '[]'));
    setLoaded(true);
  }, []);

  function persist(next) {
    setCart(next);
    localStorage.setItem('mm-cart', JSON.stringify(next));
    window.dispatchEvent(new Event('mm-cart-updated'));
  }

  function updateQty(slug, qty) {
    persist(cart.map((item) => (item.slug === slug ? { ...item, qty } : item)));
  }

  function remove(slug) {
    persist(cart.filter((item) => item.slug !== slug));
  }

  const subtotal = cart.reduce((sum, item) => sum + item.priceLow * item.qty, 0);

  if (!loaded || cart.length === 0) {
    return (
      <section className="section container">
        <h1>Your Cart</h1>
        <p className="muted">{loaded ? 'Your cart is empty.' : 'Loading your cart…'}</p>
        <Link href="/electric-mountain-bikes/" className="btn btn-primary">
          Shop Electric Mountain Bikes
        </Link>
      </section>
    );
  }

  return (
    <section className="section container" style={{ maxWidth: 720 }}>
      <h1>Your Cart</h1>
      <div className="stack">
        {cart.map((item) => (
          <div key={item.slug} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div>
              <strong>{item.name}</strong>
              <p className="muted" style={{ marginBottom: 0 }}>
                From {CONTACT.currencySymbol}
                {item.priceLow.toLocaleString('en-GB')} each
              </p>
            </div>
            <QtyStepper qty={item.qty} onChange={(q) => updateQty(item.slug, q)} />
            <button type="button" className="btn btn-outline" onClick={() => remove(item.slug)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      <div className="card" style={{ marginTop: '1.5rem' }}>
        <p style={{ fontWeight: 700, fontSize: '1.2rem' }}>
          Subtotal (from): {CONTACT.currencySymbol}
          {subtotal.toLocaleString('en-GB')}
        </p>
        <p className="muted" style={{ fontSize: '0.85rem' }}>
          Prices shown are starting prices per model — final price depends on spec/colour chosen.
          {ORDER_RULES.freeShippingThreshold === 0 ? ' Free UK delivery on every order.' : ''}
        </p>
        <Link href="/order/" className="btn btn-primary btn-block">
          Proceed to Order
        </Link>
      </div>
    </section>
  );
}
