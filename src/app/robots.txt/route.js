import { SITE } from '@/config/site';

const SEARCH_BOTS = [
  'Googlebot', 'Bingbot', 'DuckDuckBot', 'Slurp',
  'ia_archiver', 'Applebot', 'Amazonbot', 'FacebookBot',
];

const AI_BOTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-Web', 'anthropic-ai',
  'PerplexityBot', 'YouBot', 'Bytespider', 'CCBot',
  'Google-Extended', 'GoogleOther',
  'Meta-ExternalAgent', 'Meta-ExternalFetcher', 'cohere-ai',
];

const DISALLOW = [
  '/cart/', '/search/', '/thank-you-contact/', '/thank-you-order/',
  '/order/', '/api/', '/_next/',
];

export function GET() {
  const base = `https://${SITE.domain}`;
  const disallowBlock = DISALLOW.map((p) => `Disallow: ${p}`).join('\n');

  const lines = [
    'User-agent: *',
    'Allow: /',
    disallowBlock,
    '',
    'Content-Signal: search=yes, ai-input=yes, ai-train=no',
    '',
    '# Search engine crawlers',
    ...SEARCH_BOTS.map((bot) => [`User-agent: ${bot}`, 'Allow: /', disallowBlock, ''].flat()).flat(),
    '# AI crawlers — welcome to index product & content pages',
    ...AI_BOTS.map((bot) => [`User-agent: ${bot}`, 'Allow: /', disallowBlock, ''].flat()).flat(),
    '# Agent-readable resources',
    `# llms.txt: ${base}/llms.txt`,
    `# API Catalog: ${base}/.well-known/api-catalog`,
    `# Agent Skills: ${base}/.well-known/agent-skills/index.json`,
    `# MCP Server Card: ${base}/.well-known/mcp/server-card.json`,
    `# Auth: ${base}/auth.md`,
    '',
    `Host: ${base}`,
    `Sitemap: ${base}/sitemap.xml`,
    '',
  ];

  return new Response(lines.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
