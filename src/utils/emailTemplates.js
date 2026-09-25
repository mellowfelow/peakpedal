import { SITE, CONTACT } from '@/config/site';
import { paymentTermsHtml, paymentTermsLines } from '@/lib/order';
import { waPaymentConfirmationLink } from '@/lib/whatsapp';

/**
 * Reply Portal customer-facing emails (payment details, enquiry reply).
 *
 * Table + inline-style layout — the subset that renders consistently in
 * Zoho Mail, Gmail (web + app), and Apple Mail (macOS + iOS). Light-mode
 * locked (every surface sets an explicit background) so a client's dark
 * mode can't wash the letterhead out. No web fonts, no background images,
 * no <style> block — everything is inlined.
 */

const C = {
  page: '#F2F4F0', // matches the site bg
  card: '#FFFFFF',
  head: SITE.colors.dark, // near-black letterhead band
  gold: SITE.colors.accent, // lime — for the dark band + accent rule
  goldInk: '#0D3320', // deep green that holds contrast on white (links)
  cream: '#F7F8F5',
  headMeta: '#8A9A90',
  ink: '#1B2320',
  soft: '#6A746E',
  faint: '#9AA39D',
  rule: '#E2E5DF',
  panel: '#EEF2EA',
  good: SITE.colors.primary,
};

const SANS = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
const SERIF = "Georgia, 'Times New Roman', serif";

export const escapeHtml = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
const esc = escapeHtml;

const money = (n) => `${CONTACT.currencySymbol}${Number(n || 0).toLocaleString('en-GB')}`;

const stamp = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date());

function shell({ eyebrow, title, meta, body }) {
  return `<!doctype html>
<html lang="en"><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>${esc(eyebrow)}</title>
</head>
<body style="margin:0;padding:0;background:${C.page};-webkit-text-size-adjust:100%;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${C.page};">
<tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;border:1px solid ${C.rule};border-radius:12px;overflow:hidden;">

  <tr><td style="background:${C.head};padding:27px 34px 24px;">
    <div style="font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:2.5px;text-transform:uppercase;color:${C.gold};">${esc(eyebrow)}</div>
    <div style="font-family:${SANS};font-size:22px;font-weight:800;line-height:1.22;color:#fff;margin-top:10px;">${esc(title)}</div>
    <div style="font-family:${SANS};font-size:12px;line-height:1.5;color:${C.headMeta};margin-top:9px;">${esc(meta)}</div>
  </td></tr>
  <tr><td style="height:3px;background:${C.gold};font-size:0;line-height:0;">&nbsp;</td></tr>

  <tr><td style="background:${C.card};padding:26px 34px 30px;font-family:${SANS};color:${C.ink};">
    ${body}
  </td></tr>

  <tr><td style="background:${C.page};padding:15px 34px;border-top:1px solid ${C.rule};font-family:${SANS};font-size:11px;line-height:1.6;color:${C.faint};">
    ${esc(SITE.name)} &middot; ${esc(SITE.domain)}
  </td></tr>

</table>
</td></tr></table>
</body></html>`;
}

const label = (t) =>
  `<div style="font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${C.faint};margin-bottom:5px;">${esc(t)}</div>`;

function field(l, valueHtml, marginBottom = 18) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 ${marginBottom}px;"><tr><td>
    ${label(l)}
    <div style="font-family:${SANS};font-size:14px;line-height:1.6;color:${C.ink};">${valueHtml}</div>
  </td></tr></table>`;
}

const divider = `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:4px 0 18px;"><tr><td style="border-top:1px solid ${C.rule};font-size:0;line-height:0;">&nbsp;</td></tr></table>`;

function callout(innerHtml) {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin:0 0 24px;"><tr>
    <td style="background:${C.panel};border:1px solid ${C.rule};border-left:3px solid ${C.goldInk};border-radius:6px;padding:16px 18px;font-family:${SANS};font-size:13px;line-height:1.6;color:${C.ink};">
      ${innerHtml}
    </td></tr></table>`;
}

function button(href, text) {
  return `<a href="${esc(href)}" style="display:inline-block;background:${C.head};color:#fff;font-family:${SANS};font-size:13px;font-weight:600;line-height:1;text-decoration:none;padding:11px 22px;border-radius:8px;">${esc(text)} &rarr;</a>`;
}

const mailLink = (e) => `<a href="mailto:${esc(e)}" style="color:${C.goldInk};text-decoration:none;font-weight:600;">${esc(e)}</a>`;

/* -------------------------- PAYMENT DETAILS (Reply Portal, customer-facing) -------------------------- */

export function paymentDetailsEmail({ orderNumber, amountDue, customerName, instructionsHtml }) {
  const ts = stamp();

  const body = `
  ${field('Order', `<strong>${esc(orderNumber)}</strong>`, 14)}
  ${field('Amount due', `<span style="font-family:${SERIF};font-size:20px;color:${C.goldInk};">${money(amountDue)}</span>`, 20)}
  ${divider}
  <div style="font-family:${SANS};font-size:14px;line-height:1.7;color:${C.ink};margin-bottom:20px;">${instructionsHtml}</div>
  ${callout(
    `<strong style="font-family:${SANS};">Before your order ships</strong>
     <ul style="margin:10px 0 0;padding-left:18px;">${paymentTermsHtml(orderNumber)}</ul>`
  )}
  <div>${button(
    `https://${SITE.domain}/order/confirm-payment/?id=${encodeURIComponent(orderNumber)}`,
    "I've Paid — Upload Confirmation"
  )} ${button(waPaymentConfirmationLink(orderNumber), 'Confirm via WhatsApp')} ${button(
    `mailto:${CONTACT.email}?subject=${encodeURIComponent(`Re: Payment for ${orderNumber}`)}`,
    'Reply to us'
  )}</div>
  `;

  const text =
    `PAYMENT DETAILS — ${orderNumber}\n${ts}\n\n` +
    `Amount due: ${money(amountDue)}\n\n` +
    `${instructionsHtml.replace(/<[^>]+>/g, '')}\n\n` +
    paymentTermsLines(orderNumber)
      .map((l) => `- ${l}`)
      .join('\n') +
    `\nPaid already? Upload a screenshot: https://${SITE.domain}/order/confirm-payment/?id=${orderNumber}\n` +
    `Or confirm on WhatsApp: ${waPaymentConfirmationLink(orderNumber)}\n`;

  return {
    subject: `Payment details for order ${orderNumber} — ${money(amountDue)} due`,
    text,
    html: shell({ eyebrow: 'Payment details', title: `Hi ${customerName || 'there'}`, meta: ts, body }),
  };
}

/* -------------------------- ORDER CONFIRMATION (checkout, customer-facing) -------------------------- */

/**
 * Sent immediately on checkout, alongside (not instead of) the shop's
 * internal notification. Carries no payment routing details — those go out
 * separately once the shop confirms the order via the Reply Portal — it
 * exists so the customer has an immediate receipt instead of no record at
 * all that the order was received.
 */
export function orderConfirmationEmail({ orderNumber, items, subtotal, customerName }) {
  const ts = stamp();
  const units = items.reduce((n, i) => n + (i.quantity || 1), 0);

  const rows = items
    .map(
      (i) => `<tr>
      <td style="padding:12px 0;border-bottom:1px solid ${C.rule};font-family:${SANS};font-size:14px;line-height:1.4;color:${C.ink};">${esc(i.name)}</td>
      <td align="center" style="padding:12px 10px;border-bottom:1px solid ${C.rule};font-family:${SANS};font-size:13px;color:${C.soft};white-space:nowrap;">&times;${i.quantity}</td>
      <td align="right" style="padding:12px 0;border-bottom:1px solid ${C.rule};font-family:${SERIF};font-size:14px;color:${C.ink};white-space:nowrap;">${money(i.lineTotal)}</td>
    </tr>`
    )
    .join('');

  const body = `
  ${callout(
    `<strong style="font-family:${SANS};">Thanks, ${esc(customerName || 'there')} — we've received your order.</strong> Keep this email as your reference. You'll receive a second email shortly with payment details; once that's confirmed we'll finalise your order for dispatch.`
  )}

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
    ${rows}
  </table>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:10px;">
    <tr>
      <td align="right" style="padding:13px 16px 4px 0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:1.6px;text-transform:uppercase;color:${C.soft};border-top:2px solid ${C.head};">Total</td>
      <td align="right" width="118" style="padding:13px 0 4px;font-family:${SERIF};font-size:20px;color:${C.goldInk};white-space:nowrap;border-top:2px solid ${C.head};">${money(subtotal)}</td>
    </tr>
  </table>

  ${divider}

  ${callout(
    `<strong style="font-family:${SANS};">Before delivery</strong>
     <ul style="margin:10px 0 0;padding-left:18px;">${paymentTermsHtml(orderNumber)}</ul>`
  )}

  <div>${button(`mailto:${CONTACT.email}?subject=${encodeURIComponent(`Question about order ${orderNumber}`)}`, 'Contact us')}</div>
  `;

  const text =
    `ORDER RECEIVED — ${orderNumber}\n${ts}\n\n` +
    `Thanks, ${customerName || 'there'} — we've received your order. You'll get a second email shortly with payment details.\n\n` +
    `ITEMS\n${items.map((i) => `  ${i.name}  x${i.quantity}  ${money(i.lineTotal)}`).join('\n')}\n\n` +
    `TOTAL  ${money(subtotal)}\n\n` +
    paymentTermsLines(orderNumber)
      .map((l) => `- ${l}`)
      .join('\n') +
    '\n';

  return {
    subject: `Order received — ${orderNumber} · ${money(subtotal)} · ${SITE.name}`,
    text,
    html: shell({
      eyebrow: 'Order received',
      title: `Hi ${customerName || 'there'}`,
      meta: `${ts} · ${units} unit${units === 1 ? '' : 's'} · ${orderNumber}`,
      body,
    }),
  };
}

/* -------------------------- ENQUIRY REPLY (Reply Portal, customer-facing) -------------------------- */

export function enquiryReplyEmail({ customerName, originalSubject, replyHtml }) {
  const ts = stamp();

  const body = `
  <div style="font-family:${SANS};font-size:14px;line-height:1.7;color:${C.ink};">${replyHtml}</div>
  <div style="margin-top:22px;">${button(`mailto:${CONTACT.email}`, 'Reply to us')}</div>
  `;

  const text = `${replyHtml.replace(/<[^>]+>/g, '')}\n\n— ${SITE.name}\n${CONTACT.email}\n`;

  return {
    subject: `Re: ${originalSubject}`,
    text,
    html: shell({ eyebrow: SITE.name, title: `Hi ${customerName || 'there'}`, meta: ts, body }),
  };
}
