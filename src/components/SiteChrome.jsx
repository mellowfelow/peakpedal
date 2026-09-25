'use client';

import { usePathname } from 'next/navigation';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ChatHub from '@/components/ChatHub';
import CartDrawer from '@/components/CartDrawer';

// The admin dashboard is an internal tool, not a storefront page — it gets
// its own nav (PasscodeGate) and skips the public announce bar, main nav,
// footer, cart drawer and chat widget entirely.
export default function SiteChrome({ children }) {
  const pathname = usePathname();
  // The admin dashboard and its standalone customer-facing payment-confirmation
  // page are internal-tool pages, not storefront pages — they get their own
  // dark shell and skip the public announce bar, main nav, footer, cart
  // drawer and chat widget entirely.
  const isStandalone = pathname?.startsWith('/admin') || pathname?.startsWith('/order/confirm-payment');

  if (isStandalone) return <main id="main">{children}</main>;

  return (
    <>
      <div className="announce-bar">
        Free UK-wide delivery on every eMTB &middot; No minimum order &middot; Message us on WhatsApp for fast advice
      </div>
      <Nav />
      <main id="main">{children}</main>
      <Footer />
      <CartDrawer />
      <ChatHub />
    </>
  );
}
