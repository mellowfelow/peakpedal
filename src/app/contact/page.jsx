import Link from 'next/link';
import WebForm from '@/components/WebForm';
import { SITE, CONTACT } from '@/config/site';

export const metadata = {
  title: 'Contact — Expert eMTB Advice',
  description: 'Get in touch with Peak Pedal for expert advice on choosing an electric mountain bike, finance or Cycle to Work questions, or to ask about a specific model.',
  alternates: { canonical: `https://${SITE.domain}/contact/` },
  openGraph: { url: `https://${SITE.domain}/contact/`, images: ['/images/og-default.png'] },
  twitter: { card: 'summary_large_image', images: ['/images/og-default.png'] },
};

export default function ContactPage() {
  return (
    <section className="section container" style={{ maxWidth: 560 }}>
      <h1>Contact Peak Pedal</h1>
      <p className="muted">
        Message us on <a href={`https://wa.me/${CONTACT.whatsapp}`}>WhatsApp</a> for the fastest reply, or use the form below.
      </p>
      <WebForm formName="contact" subject="New contact form enquiry — Peak Pedal" thankYouPath="/thank-you-contact/">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="form-field">
          <label htmlFor="message">Message</label>
          <textarea id="message" name="message" required />
        </div>
      </WebForm>

      <h2 style={{ marginTop: '2.5rem' }}>What we can help with</h2>
      <ul>
        <li>
          Choosing between a <Link href="/hardtail-electric-mountain-bikes/">hardtail</Link> and a{' '}
          <Link href="/full-suspension-electric-mountain-bikes/">full-suspension</Link> eMTB for the trails you ride.
        </li>
        <li>Matching a motor, frame size and travel to your height, weight and riding style.</li>
        <li>
          Questions about <Link href="/finance/">finance</Link> or the <Link href="/cycle-to-work/">Cycle to Work scheme</Link>.
        </li>
        <li>
          Checking that a battery, charger or display from our <Link href="/accessories/">accessories range</Link> fits your bike.
        </li>
        <li>
          Delivery timings — see our <Link href="/shipping/">shipping page</Link> — or the answers on our{' '}
          <Link href="/faq/">FAQ</Link>.
        </li>
      </ul>
      <p className="muted">
        Tell us the bike or budget you have in mind and we'll point you to the right model from our range.
      </p>
    </section>
  );
}
