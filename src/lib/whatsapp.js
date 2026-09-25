import { SITE, REPLY } from '@/config/site';
import { paymentTermsLines } from './order';

export const WA_HEADER = `*${SITE.name}*`;

export function toWhatsAppNumber(phone) {
  return String(phone || '').replace(/[^\d]/g, '');
}

function buildText(body) {
  const lines = Array.isArray(body) ? body : [body];
  return [WA_HEADER, '', ...lines].join('\n');
}

export function waMessageText(body) {
  return buildText(body);
}

export function waLink(body) {
  const number = toWhatsAppNumber(REPLY.channels.whatsapp);
  return `https://wa.me/${number}?text=${encodeURIComponent(buildText(body))}`;
}

export function waLinkTo(phone, body) {
  const number = toWhatsAppNumber(phone);
  return `https://wa.me/${number}?text=${encodeURIComponent(buildText(body))}`;
}

// Admin -> customer: pre-filled payment-details message for the WA reply
// panel. `fields` is [{label,value}] — WhatsApp has no copy buttons either,
// but each field on its own line is still easy to long-press-copy in the app.
export function waPaymentDetailsMessage({ orderNumber, amountDue, fields = [], opening, closing }) {
  const { symbol } = REPLY.currency;
  const terms = paymentTermsLines(orderNumber).map((l) => `✅ ${l}`);
  return [
    `Payment details for order ${orderNumber} — ${symbol}${Number(amountDue).toLocaleString('en-GB')} due.`,
    '',
    ...(opening ? [opening, ''] : []),
    ...fields.map((f) => `${f.label}: ${f.value}`),
    ...(closing ? ['', closing] : []),
    '',
    ...terms,
  ];
}

export function waPaymentDetailsLink(phone, opts) {
  return waLinkTo(phone, waPaymentDetailsMessage(opts));
}

// Customer checkout -> business: new WhatsApp order notification.
export function waOrderLink(order, customer) {
  const { symbol } = REPLY.currency;
  const lines = [
    `New order request ${order.orderNumber}`,
    '',
    ...order.items.map((i) => `${i.quantity}x ${i.name}`),
    '',
    `Total: ${symbol}${Number(order.total).toLocaleString('en-GB')}`,
    `Payment method: ${order.paymentMethod}`,
    '',
    `Name: ${customer.name}`,
    `Email: ${customer.email}`,
    `Phone: ${customer.phone}`,
  ];
  return waLink(lines);
}

export function waPaymentConfirmationLink(orderNumber) {
  return waLink([`I've completed payment for order ${orderNumber}.`]);
}
