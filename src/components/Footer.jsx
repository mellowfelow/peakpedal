import Link from 'next/link';
import { SITE, CONTACT } from '@/config/site';

function encodeEmail(email) {
  return email
    .split('')
    .map((c) => `&#${c.charCodeAt(0)};`)
    .join('');
}

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-col footer-brand-col">
            <span className="footer-logo">
              <FooterLogoMark /> {SITE.name}
            </span>
            <p className="muted" style={{ color: '#b7bdb2', fontSize: '0.9rem' }}>{SITE.tagline}</p>
            <p style={{ fontSize: '0.85rem' }}>
              <span dangerouslySetInnerHTML={{ __html: encodeEmail(CONTACT.email) }} />
              <br />
              WhatsApp: <a href={`https://wa.me/${CONTACT.whatsapp}`} style={{ color: '#b7bdb2' }}>Message us</a>
            </p>
            <div className="footer-payments">
              <span className="footer-payment-chip">Bank Transfer</span>
              <span className="footer-payment-chip footer-payment-chip-soon">Card (Coming Soon)</span>
            </div>
          </div>
          <div className="footer-col">
            <h4>Shop</h4>
            <Link href="/electric-mountain-bikes/">All Electric Mountain Bikes</Link>
            <Link href="/full-suspension-electric-mountain-bikes/">Full Suspension</Link>
            <Link href="/hardtail-electric-mountain-bikes/">Hardtail</Link>
            <Link href="/lightweight-electric-mountain-bikes/">Lightweight SL</Link>
            <Link href="/womens-electric-mountain-bikes/">Women's</Link>
            <Link href="/kids-electric-mountain-bike/">Kids & Teens</Link>
            <Link href="/electric-mountain-bike-deals/">Deals</Link>
            <Link href="/accessories/">Accessories</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/about/">About</Link>
            <Link href="/blog/">Blog</Link>
            <Link href="/finance/">Finance</Link>
            <Link href="/cycle-to-work/">Cycle to Work</Link>
            <Link href="/contact/">Contact</Link>
            <Link href="/faq/">FAQ</Link>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <Link href="/shipping/">Shipping</Link>
            <Link href="/refund/">Returns</Link>
            <Link href="/privacy/">Privacy Policy</Link>
            <Link href="/terms/">Terms & Conditions</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} {SITE.name}. All rights reserved.</span>
          <span>UK-wide delivery &middot; EAPC-compliant electric mountain bikes</span>
        </div>
      </div>
    </footer>
  );
}

function FooterLogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" aria-hidden="true">
      <circle cx="16" cy="16" r="16" fill="#A8FF3E" />
      <path d="M6 22 L13 10 L17 17 L21 10 L27 22" stroke="#14432A" strokeWidth="2.4" fill="none" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx="10" cy="23" r="2.6" fill="#14432A" />
      <circle cx="23" cy="23" r="2.6" fill="#14432A" />
    </svg>
  );
}
