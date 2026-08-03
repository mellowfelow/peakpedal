import { SITE } from '@/config/site';

const SEARCH_BOTS = [
  'Googlebot',
  'Bingbot',
  'DuckDuckBot',
  'Slurp',
  'ia_archiver',
  'Applebot',
  'Amazonbot',
  'FacebookBot',
];

const AI_BOTS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'YouBot',
  'Bytespider',
  'CCBot',
  'Google-Extended',
  'GoogleOther',
  'Meta-ExternalAgent',
  'Meta-ExternalFetcher',
  'cohere-ai',
];

const NOINDEX_PATHS = [
  '/cart/',
  '/search/',
  '/thank-you-contact/',
  '/thank-you-order/',
  '/order/',
  '/api/',
  '/_next/',
];

export default function robots() {
  const base = `https://${SITE.domain}`;
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: NOINDEX_PATHS },
      ...[...SEARCH_BOTS, ...AI_BOTS].map((agent) => ({
        userAgent: agent,
        allow: '/',
        disallow: NOINDEX_PATHS,
      })),
    ],
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
