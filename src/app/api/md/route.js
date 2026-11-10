// Markdown rendering of a public page, served when a client asks for text/markdown (see
// src/middleware.js). Fetches the page's own HTML and converts its <main> content.
import { SITE } from '@/config/site';

export const dynamic = 'force-dynamic';

const BLOCKED = ['/admin', '/api', '/cart', '/order', '/search', '/thank-you'];

const decode = (s) =>
  s
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;|&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCharCode(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCharCode(Number(d)));

function toMarkdown(html, base) {
  const main = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  let s = main ? main[1] : html;
  s = s.replace(/<(script|style|svg|button|noscript|form|select|textarea|iframe)[\s\S]*?<\/\1>/gi, '');
  s = s.replace(/<a [^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/gi, (_, href, text) => {
    const label = text.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
    if (!label) return '';
    const abs = href.startsWith('/') ? `${base}${href}` : href;
    return /^(https?:|mailto:|tel:)/.test(abs) ? `[${label}](${abs})` : label;
  });
  for (let n = 1; n <= 6; n += 1) {
    s = s.replace(new RegExp(`<h${n}(?:\\s[^>]*)?>([\\s\\S]*?)</h${n}>`, 'gi'), (_, t) => `\n\n${'#'.repeat(n)} ${t.replace(/<[^>]+>/g, '').trim()}\n\n`);
  }
  s = s
    .replace(/<(strong|b)>([\s\S]*?)<\/\1>/gi, '**$2**')
    .replace(/<(em|i)>([\s\S]*?)<\/\1>/gi, '*$2*')
    .replace(/<li[^>]*>/gi, '\n- ')
    .replace(/<\/(p|div|section|ul|ol|table|tr|article|header|footer)>/gi, '\n\n')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/t[dh]>/gi, ' | ')
    .replace(/<[^>]+>/g, '');
  return decode(s)
    .split('\n')
    .map((l) => l.replace(/[ \t]+/g, ' ').trim())
    .join('\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export async function GET(request) {
  const origin = new URL(request.url).origin;
  const path = request.headers.get('x-md-path') || new URL(request.url).searchParams.get('path') || '/';
  if (!path.startsWith('/') || path.startsWith('//') || BLOCKED.some((b) => path === b || path.startsWith(`${b}/`) || path.startsWith(b))) {
    return new Response('Not available as markdown.\n', { status: 404, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const target = new URL(path, origin);
  if (target.origin !== origin) return new Response('Bad request.\n', { status: 400 });

  const res = await fetch(target, { headers: { Accept: 'text/html' }, redirect: 'manual' });
  if (!res.ok) {
    return new Response('Not found.\n', { status: res.status === 404 ? 404 : 502, headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
  }
  const html = await res.text();
  const title = decode((html.match(/<title[^>]*>([^<]*)<\/title>/i) || [])[1] || SITE.name);
  const desc = decode((html.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i) || [])[1] || '');
  const body = `${desc ? `> ${desc}\n\n` : ''}${toMarkdown(html, `https://${SITE.domain}`)}\n\nSource: https://${SITE.domain}${path}\n`;
  return new Response(`<!-- ${title} -->\n${body}`, {
    headers: {
      'Content-Type': 'text/markdown; charset=utf-8',
      Vary: 'Accept',
      'Cache-Control': 'public, max-age=0, must-revalidate',
    },
  });
}
