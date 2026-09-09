import Link from 'next/link';
import OrderRef from '@/components/OrderRef';

export const metadata = {
  title: 'Order Received',
  robots: { index: false, follow: true },
};

export default function ThankYouOrder() {
  return (
    <section className="section container text-center" style={{ maxWidth: 560 }}>
      <h1>Thanks — we&rsquo;ve received your order</h1>
      <OrderRef />
      <p className="muted">
        We&rsquo;ll confirm your order, final price and payment details by email shortly. For a faster response, message us on WhatsApp.
      </p>
      <Link href="/" className="btn btn-primary">Back to Home</Link>
    </section>
  );
}
