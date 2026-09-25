import { REPLY } from '@/config/site';

// GBP whole-pound formatting (matches how prices render everywhere else on
// the site) rather than forcing cents — the aged & amber original uses
// toFixed(2) for USD spirits pricing, not appropriate for £-thousands bikes.
export function money(n) {
  const { symbol } = REPLY.currency;
  return `${symbol}${Number(n || 0).toLocaleString('en-GB')}`;
}

export function findMethod(methodId) {
  return REPLY.paymentMethods.find((m) => m.id === methodId) || REPLY.paymentMethods[0];
}

function fill(tpl, amount, ref) {
  return String(tpl || '')
    .replace(/\{amount\}/g, money(amount))
    .replace(/\{ref\}/g, ref || '');
}

// { method, opening, closing } with {amount}/{ref} tokens resolved.
export function paymentMethodParts(methodId, amount, ref) {
  const method = findMethod(methodId);
  return {
    method,
    opening: fill(method.opening, amount, ref),
    closing: fill(method.closing, amount, ref),
  };
}

/**
 * Standing terms appended to every payment-details email and WA message.
 * Single source — the email, the WA text, and the composer preview all read
 * from this function so the three render paths can never drift apart.
 */
export function paymentTermsLines(ref) {
  return [
    'This order is confirmed once payment is received — it is not yet final.',
    ref ? `Use your order number — ${ref} — as the payment reference.` : 'Use your order number as the payment reference.',
    REPLY.dispatchLine,
  ].filter(Boolean);
}

function escapeHtmlLocal(s) {
  return String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export function paymentTermsHtml(ref) {
  return paymentTermsLines(ref)
    .map(
      (line) =>
        `<li style="margin:0 0 8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;font-size:13px;line-height:1.6;color:#1B2320;">${escapeHtmlLocal(line)}</li>`
    )
    .join('');
}

// Common payment-detail label words, covering every method the site
// currently offers plus the obvious ones a future method would add (crypto,
// PayPal, a payment link) — used only as a fallback for lines with no colon,
// so the copy button never carries the label baked into the value. Longest
// phrases first so e.g. "account number" wins over a bare "account".
const KNOWN_LABELS = [
  'account name',
  'account number',
  'sort code',
  'bank name',
  'branch code',
  'routing number',
  'beneficiary name',
  'beneficiary',
  'swift code',
  'swift',
  'bic code',
  'bic',
  'iban',
  'wallet address',
  'wallet',
  'network',
  'memo',
  'destination tag',
  'tag',
  'paypal email',
  'paypal.me',
  'paypal',
  'payment link',
  'reference',
].sort((a, b) => b.length - a.length);

const LABEL_PATTERN = new RegExp(
  `^(${KNOWN_LABELS.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*[:\\-]?\\s+(.+)$`,
  'i'
);

function titleCase(s) {
  return s.replace(/\S+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());
}

/**
 * Splits one pasted payment-detail blob into individually-copyable fields —
 * this is what lets the admin keep pasting one block of text (works for any
 * payment method: bank transfer, a crypto wallet address, a PayPal.me link,
 * anything, current or future) while the customer still gets each real
 * component as its own copy button, carrying only the value, not the label.
 *
 * Three tiers, in order:
 *  1. "Label: value" on a line — the fully general case. Any label works
 *     here, including ones not in KNOWN_LABELS, so a brand-new payment
 *     method needs no code change as long as the admin uses a colon.
 *  2. No colon, but the line starts with a recognised label word (e.g.
 *     "Sort code 00-00-00") — split there so the value alone gets copied.
 *  3. No colon and no recognised label — the whole line becomes one field
 *     labelled "Detail" (numbered if there's more than one), so a bare
 *     wallet address with nothing else still gets a working copy button.
 */
export function parsePaymentDetail(text) {
  const lines = String(text || '')
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  let unlabeled = 0;
  return lines.map((line) => {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0 && colonIdx < line.length - 1) {
      return { label: line.slice(0, colonIdx).trim(), value: line.slice(colonIdx + 1).trim() };
    }
    const match = line.match(LABEL_PATTERN);
    if (match) {
      return { label: titleCase(match[1]), value: match[2].trim() };
    }
    unlabeled += 1;
    return { label: unlabeled > 1 ? `Detail ${unlabeled}` : 'Detail', value: line };
  });
}
