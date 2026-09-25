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

// The fixed set of bank-transfer fields the admin fills in per order. Kept
// as a function (not static data) so a future second payment method can
// define its own field set without touching the composer/email code that
// consumes it — everything downstream just iterates `fields`.
export function paymentFieldsFor(methodId) {
  if (methodId === 'bank-transfer') {
    return [
      { key: 'accountName', label: 'Account name' },
      { key: 'sortCode', label: 'Sort code' },
      { key: 'accountNumber', label: 'Account number' },
      { key: 'reference', label: 'Reference' },
    ];
  }
  return [];
}

// values: { accountName, sortCode, accountNumber, reference } -> [{label,value}]
// dropping any the admin left blank, so an unused field never shows as empty.
export function resolvePaymentFields(methodId, values) {
  return paymentFieldsFor(methodId)
    .map((f) => ({ label: f.label, value: String(values?.[f.key] || '').trim() }))
    .filter((f) => f.value);
}
