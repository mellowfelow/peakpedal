import { SITE, ORDER_RULES } from '@/config/site';

export const metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and conditions for purchasing an electric mountain bike from Peak Pedal.',
  alternates: { canonical: `https://${SITE.domain}/terms/` },
};

export default function TermsPage() {
  return (
    <section className="section container" style={{ maxWidth: 720 }}>
      <h1>Terms & Conditions</h1>
      <p>By placing an order with {SITE.name}, you agree to the following terms.</p>
      <h2>Orders and payment</h2>
      <p>
        Orders are confirmed once payment is received in full, currently by bank transfer. There is no minimum order value.
        Prices are shown in {ORDER_RULES.shipsTo === 'United Kingdom' ? 'GBP' : ''} and include VAT where applicable.
      </p>
      <h2>Delivery</h2>
      <p>We offer free delivery across the UK. See our <a href="/shipping/">Shipping</a> page for details.</p>
      <h2>Returns</h2>
      <p>See our <a href="/refund/">Returns & Refunds</a> page for your cancellation rights under UK consumer law.</p>
      <h2>Product information</h2>
      <p>
        Every eMTB we sell meets the UK's electrically assisted pedal cycle (EAPC) requirements. Specifications are provided by
        the manufacturer and may be updated between model years without notice.
      </p>
      <p className="muted" style={{ fontSize: '0.85rem' }}>
        This page is a general starting-point template and should be reviewed against your specific business and UK consumer law
        by a solicitor before relying on it commercially.
      </p>
    </section>
  );
}
