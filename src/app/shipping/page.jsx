import { SITE } from '@/config/site';

export const metadata = {
  title: 'Shipping',
  description: 'Delivery information for electric mountain bike orders from Peak Pedal.',
  alternates: { canonical: `https://${SITE.domain}/shipping/` },
};

export default function ShippingPage() {
  return (
    <section className="section container" style={{ maxWidth: 720 }}>
      <h1>Shipping</h1>
      <p>We offer free delivery across the UK on every electric mountain bike, with no minimum order value.</p>
      <p>
        Bikes are shipped part-built by a specialist bike courier — final assembly steps (pedals, handlebar/seat position, brake
        check) are detailed in the setup guide included with your order. Delivery timescales vary by model and stock availability;
        we'll confirm an estimated delivery window when you order.
      </p>
    </section>
  );
}
