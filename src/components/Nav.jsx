'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SITE, BRANDS } from '@/config/site';

const TYPE_LINKS = [
  ['Full Suspension', '/full-suspension-electric-mountain-bikes/'],
  ['Hardtail', '/hardtail-electric-mountain-bikes/'],
  ['Lightweight SL', '/lightweight-electric-mountain-bikes/'],
  ['Enduro', '/enduro-electric-mountain-bikes/'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    function readCart() {
      try {
        const cart = JSON.parse(localStorage.getItem('mm-cart') || '[]');
        setCartCount(cart.reduce((sum, item) => sum + (item.qty || 1), 0));
      } catch {
        setCartCount(0);
      }
    }
    readCart();
    window.addEventListener('storage', readCart);
    window.addEventListener('mm-cart-updated', readCart);
    return () => {
      window.removeEventListener('storage', readCart);
      window.removeEventListener('mm-cart-updated', readCart);
    };
  }, []);

  return (
    <header className="nav">
      <div className="nav-bar">
        <Link href="/" className="nav-logo">
          <LogoMark /> {SITE.name}
        </Link>

        <nav className="nav-links" aria-label="Primary">
          <div className="mega-dropdown">
            <Link href="/electric-mountain-bikes/">Shop</Link>
            <div className="mega-panel">
              <div>
                <strong style={{ display: 'block', marginBottom: 4, fontSize: '0.75rem', textTransform: 'uppercase', color: '#8b9186' }}>
                  By Type
                </strong>
                {TYPE_LINKS.map(([label, href]) => (
                  <Link key={href} href={href} style={{ display: 'block', padding: '0.3rem 0', textDecoration: 'none' }}>
                    {label}
                  </Link>
                ))}
              </div>
              <div>
                <strong style={{ display: 'block', marginBottom: 4, fontSize: '0.75rem', textTransform: 'uppercase', color: '#8b9186' }}>
                  By Brand
                </strong>
                {BRANDS.slice(0, 6).map((b) => (
                  <Link key={b.slug} href={`/${b.slug}-electric-mountain-bikes/`} style={{ display: 'block', padding: '0.3rem 0', textDecoration: 'none' }}>
                    {b.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <Link href="/electric-mountain-bike-deals/">Deals</Link>
          <Link href="/finance/">Finance</Link>
          <Link href="/blog/">Blog</Link>
          <Link href="/about/">About</Link>
          <Link href="/contact/">Contact</Link>
        </nav>

        <div className="nav-actions">
          <Link href="/search/" className="nav-icon-btn" aria-label="Search">
            <SearchIcon />
          </Link>
          <Link href="/cart/" className="nav-icon-btn" aria-label={`Cart, ${cartCount} items`}>
            <CartIcon />
            {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
          </Link>
          <button
            className="nav-icon-btn hamburger"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <MenuIcon />
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        <Link href="/electric-mountain-bikes/" onClick={() => setOpen(false)}>Shop All Bikes</Link>
        {TYPE_LINKS.map(([label, href]) => (
          <Link key={href} href={href} onClick={() => setOpen(false)}>{label}</Link>
        ))}
        <Link href="/electric-mountain-bike-deals/" onClick={() => setOpen(false)}>Deals</Link>
        <Link href="/finance/" onClick={() => setOpen(false)}>Finance</Link>
        <Link href="/cycle-to-work/" onClick={() => setOpen(false)}>Cycle to Work</Link>
        <Link href="/blog/" onClick={() => setOpen(false)}>Blog</Link>
        <Link href="/about/" onClick={() => setOpen(false)}>About</Link>
        <Link href="/contact/" onClick={() => setOpen(false)}>Contact</Link>
      </div>
    </header>
  );
}

function LogoMark() {
  return (
    <svg width="28" height="28" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#14432A" />
      <path d="M6 22 L13 10 L17 17 L21 10 L27 22" stroke="#A8FF3E" strokeWidth="2.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="10" cy="23" r="2.6" fill="#A8FF3E" />
      <circle cx="23" cy="23" r="2.6" fill="#A8FF3E" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="9" cy="21" r="1" />
      <circle cx="20" cy="21" r="1" />
      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}
