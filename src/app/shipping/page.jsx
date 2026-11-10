import Link from 'next/link';
import { SITE } from '@/config/site';

export const metadata = {
  title: 'Free UK Delivery & Shipping',
  description: 'Free UK delivery on every Peak Pedal electric mountain bike, with no minimum order. How part-built bike delivery works and what to check on arrival.',
  alternates: { canonical: `https://${SITE.domain}/shipping/` },
  openGraph: { url: `https://${SITE.domain}/shipping/`, images: ['/images/og-default.png'] },
  twitter: { card: 'summary_large_image', images: ['/images/og-default.png'] },
};

export default function ShippingPage() {
  return (
    <section className="section container" style={{ maxWidth: 720 }}>
      <h1>Shipping</h1>
      <p>We offer free delivery across the UK on every electric mountain bike, with no minimum order value.</p>

      <h2>How your bike arrives</h2>
      <p>
        Bikes are shipped part-built by a specialist bike courier — final assembly steps (pedals, handlebar/seat position, brake
        check) are detailed in the setup guide included with your order. Delivery timescales vary by model and stock availability;
        we'll confirm an estimated delivery window when you order.
      </p>

      <h2>When it arrives</h2>
      <p>
        Check the packaging before you sign. If the box has been damaged in transit, note it on the courier's paperwork, take a few
        photos and get in touch with us straight away so we can sort it out with the courier. Our{' '}
        <Link href="/refund/">returns and refunds page</Link> explains your statutory cancellation rights and what to do if a bike
        arrives faulty or not as described.
      </p>

      <h2>Accessories</h2>
      <p>
        Delivery is free across the UK on accessories too. If an accessory is ordered alongside a bike, ask us whether it can ship
        in the same delivery — and for any battery, charger or display, check compatibility with your bike before ordering.
      </p>

      <h2>Questions about delivery</h2>
      <p>
        Not sure how long a particular model will take, or need to arrange a delivery around your availability? Use our{' '}
        <Link href="/contact/">contact form</Link> or message us on WhatsApp and we'll confirm details for the bike you have in mind.
        You can also browse the <Link href="/electric-mountain-bikes/">full electric mountain bike range</Link>.
      </p>
    </section>
  );
}
