import { SITE, FAQS } from '@/config/site';

export const metadata = {
  title: 'FAQ',
  description: 'Answers to common questions about buying an electric mountain bike from Peak Pedal — legality, motors, finance and checkout.',
  alternates: { canonical: `https://${SITE.domain}/faq/` },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="section container" style={{ maxWidth: 720 }}>
        <h1>Frequently Asked Questions</h1>
        <div className="stack">
          {FAQS.map((f) => (
            <div key={f.q} className="card">
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{f.q}</h2>
              <p style={{ marginBottom: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
