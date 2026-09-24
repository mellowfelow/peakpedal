// Payment-method framing + standing terms — one source, rendered to email
// HTML, WhatsApp text and JSX preview. Everything reads from REPLY (site.js).
import { REPLY } from '@/config/site';
import { escapeHtml } from '@/lib/emailTemplate';

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

// Standing terms appended to every payment email + WhatsApp message.
export function paymentTermsLines(ref) {
  const wa = REPLY.channels.whatsapp;
  return [
    `Complete payment within ${REPLY.deadlineHours}h to hold this price.`,
    `Use your order number — ${ref} — as the payment reference.`,
    REPLY.dispatchLine,
    `Once paid, let us know at ${REPLY.channels.email}${wa ? ` or WhatsApp` : ''} so we can confirm your order.`,
  ].filter(Boolean);
}

export function paymentTermsHtml(ref) {
  const items = paymentTermsLines(ref)
    .map((l) => `<li style="margin:0 0 6px;">${escapeHtml(l)}</li>`)
    .join('');
  return `<ul style="margin:6px 0 0;padding-left:18px;">${items}</ul>`;
}

// opening + admin's pasted variable detail + closing, blank-line joined.
export function instructionsParts(opening, detail, closing) {
  return [opening, detail, closing].filter(Boolean).join('\n\n');
}
