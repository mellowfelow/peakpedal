import { SITE, FAQ_PAGE_FAQS } from '@/config/site';

export const metadata = {
  title: { absolute: `Electric Mountain Bike FAQ — ${SITE.name}` },
  description: 'Common questions about buying an electric mountain bike in the UK — legality, cost, motors, battery range and delivery, answered by Peak Pedal.',
  alternates: { canonical: `https://${SITE.domain}/faq/` },
  openGraph: { url: `https://${SITE.domain}/faq/`, images: ['/images/placeholder.svg'] },
  twitter: { card: 'summary_large_image', images: ['/images/placeholder.svg'] },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_PAGE_FAQS.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

const speakableSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  speakable: {
    '@type': 'SpeakableSpecification',
    cssSelector: ['.faq-answer-speakable'],
  },
  url: `https://${SITE.domain}/faq/`,
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
      <section className="section container" style={{ maxWidth: 720 }}>
        <h1>Electric Mountain Bike FAQs</h1>
        <div className="stack">
          {FAQ_PAGE_FAQS.map((f) => (
            <div key={f.q} className="card">
              <h2 style={{ fontSize: '1.1rem', marginBottom: '0.4rem' }}>{f.q}</h2>
              <p className={f.speakable ? 'faq-answer-speakable' : undefined} style={{ marginBottom: 0 }}>
                {f.a}
              </p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
