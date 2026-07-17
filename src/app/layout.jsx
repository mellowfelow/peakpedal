import '../styles/globals.css';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import ChatHub from '@/components/ChatHub';
import { SITE } from '@/config/site';

export const metadata = {
  metadataBase: new URL(`https://${SITE.domain}`),
  title: {
    default: `${SITE.name} | ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  verification: { google: SITE.gscCode },
  openGraph: {
    type: 'website',
    siteName: SITE.name,
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
    url: `https://${SITE.domain}`,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} | ${SITE.tagline}`,
    description: SITE.description,
  },
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: SITE.name,
  url: `https://${SITE.domain}`,
  potentialAction: {
    '@type': 'SearchAction',
    target: `https://${SITE.domain}/search/?q={search_term_string}`,
    'query-input': 'required name=search_term_string',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-GB">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="indexnow-key" content={SITE.indexNowKey} />
        <script src="/js/webmcp.js" defer />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body>
        <div className="announce-bar">
          Free UK-wide delivery on every eMTB &middot; No minimum order &middot; Message us on WhatsApp for fast advice
        </div>
        <Nav />
        <main>{children}</main>
        <Footer />
        <ChatHub />
      </body>
    </html>
  );
}
