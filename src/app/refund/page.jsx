import { SITE, CONTACT } from '@/config/site';

export const metadata = {
  title: 'Returns & Refunds',
  description: 'Returns and refund policy for electric mountain bike orders from Peak Pedal, including your UK statutory cooling-off rights.',
  alternates: { canonical: `https://${SITE.domain}/refund/` },
};

export default function RefundPage() {
  return (
    <section className="section container" style={{ maxWidth: 720 }}>
      <h1>Returns & Refunds</h1>
      <p>
        As a UK online retailer, we honour your statutory right under the Consumer Contracts Regulations 2013 to cancel an online
        order within 14 days of delivery without giving a reason, and to a refund once the item is returned in its original,
        unused condition.
      </p>
      <p>
        Because our bikes are shipped part-built, please contact us before returning a bike that has been assembled or ridden — we
        can advise on the best way to return it. Return shipping costs for change-of-mind cancellations are the customer's
        responsibility unless the bike arrived faulty or not as described.
      </p>
      <p>
        To start a return, contact us at{' '}
        <span dangerouslySetInnerHTML={{ __html: CONTACT.email.split('').map((c) => `&#${c.charCodeAt(0)};`).join('') }} />{' '}
        or via WhatsApp with your order details.
      </p>
      <p className="muted" style={{ fontSize: '0.85rem' }}>
        This page is a general summary and not a substitute for the full terms provided at checkout or for independent legal
        advice on UK consumer law as it applies to your specific business.
      </p>
    </section>
  );
}
