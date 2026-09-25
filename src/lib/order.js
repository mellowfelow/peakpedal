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

/**
 * Wraps a pasted payment-detail snippet with the standard opening/closing
 * framing for the chosen payment method, so the admin only ever types the
 * one real, order-specific thing: the bank transfer details.
 */
export function instructionsParts(methodId, amount, ref, pastedDetail) {
  const { opening, closing } = paymentMethodParts(methodId, amount, ref);
  return [opening, '', pastedDetail.trim(), '', closing].join('\n');
}
