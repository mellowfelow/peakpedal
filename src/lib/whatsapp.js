import { SITE, REPLY } from '@/config/site';
import { paymentMethodParts, paymentTermsLines, instructionsParts } from '@/lib/order';

export const WA_HEADER = `*${SITE.name}*`;

export function toWhatsAppNumber(phone) {
  return String(phone || '').replace(/[^\d]/g, '');
}

function text(body) {
  const lines = Array.isArray(body) ? body : [body];
  return [WA_HEADER, '', ...lines].join('\n');
}

export function waMessageText(body) {
  return text(body);
}

export function waLink(body) {
  const to = toWhatsAppNumber(REPLY.channels.whatsapp);
  if (!to) return '';
  return `https://wa.me/${to}?text=${encodeURIComponent(text(body))}`;
}

export function waLinkTo(phone, body) {
  const to = toWhatsAppNumber(phone);
  if (!to) return '';
  return `https://wa.me/${to}?text=${encodeURIComponent(text(body))}`;
}

// Admin → customer: payment details, mirroring the payment-details email.
export function waPaymentDetailsMessage({ orderNumber, amountDue, methodId, detail }) {
  const { opening, closing } = paymentMethodParts(methodId, amountDue, orderNumber);
  const terms = paymentTermsLines(orderNumber).map((l) => `✅ ${l}`);
  return [
    `Payment details for order ${orderNumber}`,
    '',
    instructionsParts(opening, detail, closing),
    '',
    ...terms,
  ];
}

export function waPaymentDetailsLink(phone, opts) {
  return waLinkTo(phone, waPaymentDetailsMessage(opts));
}
