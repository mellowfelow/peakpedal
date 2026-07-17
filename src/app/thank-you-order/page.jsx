import Link from 'next/link';

export const metadata = {
  title: 'Order Received',
  robots: { index: false, follow: true },
};

export default function ThankYouOrder() {
  return (
    <section className="section container text-center">
      <h1>Thanks — we've received your order</h1>
      <p className="muted">We'll confirm your order and payment details by email shortly. For a faster response, message us on WhatsApp.</p>
      <Link href="/" className="btn btn-primary">Back to Home</Link>
    </section>
  );
}
