import { SITE, CONTACT } from '@/config/site';

export const metadata = {
  title: 'Privacy Policy',
  description: 'How Peak Pedal collects, uses and protects your personal data.',
  alternates: { canonical: `https://${SITE.domain}/privacy/` },
};

export default function PrivacyPage() {
  return (
    <section className="section container" style={{ maxWidth: 720 }}>
      <h1>Privacy Policy</h1>
      <p>
        Peak Pedal collects the personal information you provide through our contact and order forms (name, email, phone, delivery
        address) solely to respond to your enquiry or fulfil your order. We do not sell your data to third parties.
      </p>
      <p>
        Form submissions are processed via Web3Forms, a third-party form-delivery service, and delivered to our email inbox. We
        retain order and enquiry information only as long as needed to fulfil the order and meet our accounting obligations.
      </p>
      <p>
        Under UK GDPR, you have the right to request access to, correction of, or deletion of your personal data. Contact us at{' '}
        <span dangerouslySetInnerHTML={{ __html: CONTACT.email.split('').map((c) => `&#${c.charCodeAt(0)};`).join('') }} /> to make
        a request.
      </p>
      <p className="muted" style={{ fontSize: '0.85rem' }}>
        This page is a general summary and not a substitute for a full UK GDPR-compliant privacy policy reviewed against your
        actual data processing activities.
      </p>
    </section>
  );
}
