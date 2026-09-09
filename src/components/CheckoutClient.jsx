'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import WebForm from './WebForm';
import { SITE, CONTACT, ORDER_RULES } from '@/config/site';

const money = (n) => `${CONTACT.currencySymbol}${Number(n).toLocaleString('en-GB')}`;

export default function CheckoutClient() {
  const [cart, setCart] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      setCart(JSON.parse(localStorage.getItem('mm-cart') || '[]'));
    } catch {
      setCart([]);
    }
    setLoaded(true);
  }, []);

  function clearCart() {
    try {
      localStorage.setItem('mm-cart', '[]');
    } catch {}
    window.dispatchEvent(new Event('mm-cart-updated-silent'));
  }

  if (!loaded) {
    return (
      <section className="section container" style={{ maxWidth: 640 }}>
        <h1>Checkout</h1>
        <p className="muted">Loading your cart…</p>
      </section>
    );
  }

  if (cart.length === 0) {
    return (
      <section className="section container" style={{ maxWidth: 640 }}>
        <h1>Checkout</h1>
        <p className="muted">Your cart is empty — add a bike before checking out.</p>
        <div className="hero-cta">
          <Link href="/electric-mountain-bikes/" className="btn btn-primary">Shop Electric Mountain Bikes</Link>
          <Link href="/contact/" className="btn btn-outline">Ask us for help choosing</Link>
        </div>
      </section>
    );
  }

  const subtotal = cart.reduce((sum, i) => sum + i.priceLow * (i.qty || 1), 0);
  const itemCount = cart.reduce((sum, i) => sum + (i.qty || 1), 0);

  return (
    <section className="section container" style={{ maxWidth: 640 }}>
      <h1>Checkout</h1>
      <p className="muted">
        Your cart is carried over below. Fill in your details and we’ll confirm spec, final price and payment by email —
        or <a href={`https://wa.me/${CONTACT.whatsapp}`}>order on WhatsApp</a> for a faster reply.
      </p>

      <div className="card checkout-summary">
        <div className="checkout-summary-head">
          <strong>Your order ({itemCount} {itemCount === 1 ? 'item' : 'items'})</strong>
          <Link href="/cart/" className="checkout-edit">Edit cart</Link>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Model</th><th>Qty</th><th style={{ textAlign: 'right' }}>Price</th></tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.slug}>
                  <td>{item.name}</td>
                  <td>{item.qty || 1}</td>
                  <td style={{ textAlign: 'right' }}>{money(item.priceLow * (item.qty || 1))}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={2}>Order total</th>
                <th style={{ textAlign: 'right' }}>{money(subtotal)}</th>
              </tr>
            </tfoot>
          </table>
        </div>
        <p className="muted" style={{ fontSize: '0.8rem', margin: '0.5rem 0 0' }}>
          Prices are a guide — we’ll confirm final spec, colour and price by email before payment.
          {ORDER_RULES.freeShippingThreshold === 0 ? ' Free UK delivery.' : ''}
        </p>
      </div>

      <h2 style={{ marginTop: '2rem' }}>Your details</h2>
      <WebForm
        formName="order"
        subject={`New order — ${SITE.name}`}
        thankYouPath="/thank-you-order/"
        submitLabel="Place order"
        extraFields={{ cart }}
        onSuccess={clearCart}
      >
        <div className="form-field">
          <label htmlFor="name">Full name</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="form-field">
          <label htmlFor="address">Delivery address</label>
          <textarea id="address" name="address" rows={3} required autoComplete="street-address" />
        </div>
        <div className="form-field">
          <label htmlFor="payment">Preferred payment method</label>
          <select id="payment" name="payment" defaultValue="Bank transfer">
            <option>Bank transfer</option>
            <option>Card (coming soon — we’ll be in touch about alternatives)</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="notes">Notes (frame size, colour, questions)</label>
          <textarea id="notes" name="notes" rows={3} />
        </div>
      </WebForm>
    </section>
  );
}
