import { NextResponse } from 'next/server';

// Content negotiation for AI agents: a request that genuinely prefers text/markdown over
// text/html gets a plain-markdown rendering of the page (see /api/md). Everything else —
// browsers, search crawlers, anything that accepts HTML at equal or higher priority — is
// untouched and receives the normal HTML.
export const config = {
  // [.] instead of an escaped dot: Next copies the raw matcher text into its manifest.
  matcher: ['/((?!api/|_next/|images/|fonts/|[.]well-known/|.*[.].*).*)'],
};

// Never a substring check: "text/html, text/markdown;q=0.9" must stay HTML. Parse q-values
// (default 1) and only choose markdown when its q is strictly higher than text/html's.
function prefersMarkdownOverHtml(accept) {
  let md = -1;
  let html = -1;
  for (const part of accept.split(',')) {
    const [type, ...params] = part.trim().split(';').map((s) => s.trim());
    let q = 1;
    for (const p of params) {
      const m = /^q=([\d.]+)$/.exec(p);
      if (m) q = parseFloat(m[1]);
    }
    if (type === 'text/markdown') md = Math.max(md, q);
    if (type === 'text/html') html = Math.max(html, q);
  }
  return md > -1 && md > html;
}

export function middleware(request) {
  if (request.method !== 'GET') return NextResponse.next();
  const accept = request.headers.get('accept') || '';
  if (!accept.includes('markdown') || !prefersMarkdownOverHtml(accept)) return NextResponse.next();
  const url = request.nextUrl.clone();
  const path = url.pathname;
  url.pathname = '/api/md/';
  url.search = '';
  url.searchParams.set('path', path);
  // Route handlers see the original request URL after a rewrite, so pass the page path in a header too.
  const headers = new Headers(request.headers);
  headers.set('x-md-path', path);
  return NextResponse.rewrite(url, { request: { headers } });
}
