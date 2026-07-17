import Link from 'next/link';

export const metadata = {
  title: 'Message Sent',
  robots: { index: false, follow: true },
};

export default function ThankYouContact() {
  return (
    <section className="section container text-center">
      <h1>Thanks — we've got your message</h1>
      <p className="muted">We'll get back to you as soon as we can. For a faster reply, message us on WhatsApp.</p>
      <Link href="/" className="btn btn-primary">Back to Home</Link>
    </section>
  );
}
