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
