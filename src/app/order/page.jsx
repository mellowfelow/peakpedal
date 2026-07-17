import WebForm from '@/components/WebForm';
import { SITE, CONTACT } from '@/config/site';

export const metadata = {
  title: 'Order',
  description: 'Place an order for your electric mountain bike by form, or message us on WhatsApp for a faster response.',
  alternates: { canonical: `https://${SITE.domain}/order/` },
};

export default function OrderPage() {
  return (
    <section className="section container" style={{ maxWidth: 560 }}>
      <h1>Order</h1>
      <p className="muted">
        Prefer a faster response? <a href={`https://wa.me/${CONTACT.whatsapp}`}>Order via WhatsApp</a> instead. Otherwise, fill in
        the form below and we'll confirm your order and payment details by email.
      </p>
      <WebForm formName="order" subject="New order enquiry — Peak Pedal" thankYouPath="/thank-you-order/">
        <div className="form-field">
          <label htmlFor="name">Name</label>
          <input id="name" name="name" type="text" required autoComplete="name" />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoComplete="email" />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" />
        </div>
        <div className="form-field">
          <label htmlFor="bike">Bike(s) you're interested in</label>
          <input id="bike" name="bike" type="text" placeholder="e.g. Cube Reaction Hybrid Pro 625" required />
        </div>
        <div className="form-field">
          <label htmlFor="address">Delivery address</label>
          <textarea id="address" name="address" required />
        </div>
        <div className="form-field">
          <label htmlFor="payment">Preferred payment method</label>
          <select id="payment" name="payment">
            <option>Bank transfer</option>
            <option>Card (coming soon — we'll be in touch about alternatives)</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="notes">Notes (frame size, colour, questions)</label>
          <textarea id="notes" name="notes" />
        </div>
      </WebForm>
    </section>
  );
}
