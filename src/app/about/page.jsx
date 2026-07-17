import Link from 'next/link';
import { SITE, PRODUCTS, BRANDS, COMPLIANCE, CONTACT } from '@/config/site';

export const metadata = {
  title: 'About — UK eMTB Specialists',
  description: 'Peak Pedal is a UK-based electric mountain bike specialist stocking 78 eMTBs across 15+ brands, with expert buying advice and UK-wide delivery.',
  alternates: { canonical: `https://${SITE.domain}/about/` },
};

const orgSchema = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  about: {
    '@type': 'Organization',
    name: SITE.name,
    url: `https://${SITE.domain}`,
    areaServed: 'GB',
  },
};

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <section className="section container" style={{ maxWidth: 780 }}>
        <h1>About Peak Pedal</h1>

        <p>
          Peak Pedal is a UK-based online retailer specialising exclusively in electric mountain bikes. We stock {PRODUCTS.length}{' '}
          models across {BRANDS.length}+ established brands — including Cube, Trek, Orbea, Santa Cruz, Whyte, Haibike, Giant,
          Mondraker, Merida, Amflow, Cannondale, Specialized, Lapierre and Transition — spanning full-suspension, hardtail and
          lightweight SL platforms. We ship UK-wide.
        </p>

        <h2>What we do differently</h2>
        <p>
          Rather than trying to be a general bike shop, we focus entirely on one category: electric mountain bikes. That focus means
          every product page on this site carries the actual motor platform, suspension travel and category for that bike, not just
          a marketing description — so you can compare a Bosch Performance CX enduro build against a Shimano EP801-RS lightweight SL
          bike on the specs that actually matter for how it rides.
        </p>
        <p>
          We deliberately don't fabricate test reports we haven't run, invented awards, or a company history we don't have. Where we
          don't have first-hand experience with a bike or motor platform, our buying guides say so and point you to what we do know:
          the manufacturer's own published specifications.
        </p>

        <h2>How we help you choose</h2>
        <p>
          Electric mountain bikes span a wide range of motor systems (Bosch, Shimano, Yamaha, DJI Avinox, TQ, Pinion), suspension
          travel (from rigid hardtail to 175mm enduro), and price (from around £2,100 to £11,000 in our current range). Message us
          on WhatsApp or use our contact form, tell us how and where you ride, and we'll help you narrow that down to the right
          motor, travel and frame size — rather than just pointing you at the most expensive option.
        </p>

        <h2>UK legal compliance</h2>
        <p>
          Every electric mountain bike we sell is a legal electrically assisted pedal cycle (EAPC) under the {COMPLIANCE.eapc.statute}:
          motor power capped at {COMPLIANCE.eapc.maxPowerWatts}W continuous output, pedal assistance cutting out at{' '}
          {COMPLIANCE.eapc.maxAssistSpeedMph}mph, and a minimum rider age of {COMPLIANCE.eapc.minRiderAge}. That means no licence, road
          tax, MOT or insurance requirement to ride one on public roads or bridleways where cycling is otherwise permitted.
        </p>

        <h2>Delivery, payment and finance</h2>
        <p>
          We offer free delivery across the UK with no minimum order. Payment is currently by bank transfer, with card payment
          coming soon. We can also talk you through finance options and Cycle to Work scheme eligibility for any bike in our range —
          see our <Link href="/finance/">Finance</Link> and <Link href="/cycle-to-work/">Cycle to Work</Link> pages for details.
        </p>

        <h2>Get in touch</h2>
        <p>
          Have a question about a specific bike, motor platform, or which frame size is right for your height? Message us on{' '}
          <a href={`https://wa.me/${CONTACT.whatsapp}`}>WhatsApp</a> or use our <Link href="/contact/">contact form</Link> — we're
          happy to talk through the options before you buy.
        </p>
      </section>
    </>
  );
}
