import WebForm from '@/components/WebForm';
import { SITE, CONTACT } from '@/config/site';

export const metadata = {
  title: 'Contact — Expert eMTB Advice',
  description: 'Get in touch with Peak Pedal for expert advice on choosing an electric mountain bike, or to ask about a specific model.',
  alternates: { canonical: `https://${SITE.domain}/contact/` },
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
    </section>
  );
}
