import nodemailer from 'nodemailer';
import { FORMS, CONTACT, SITE, ORDER_RULES } from '@/config/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// SMTP form handler. Credentials come from Vercel Project Environment Variables —
// never the repo:
//   SMTP_HOST, SMTP_PORT (465 SSL / 587 STARTTLS), SMTP_USER, SMTP_PASS (app password)
//   SMTP_FROM (optional) — overrides FORMS.resendFrom as the visible "From"
//
// The form posts same-origin JSON here, so none of the Web3Forms CORS rules apply.

const CUSTOMER_FIELDS = [
  ['name', 'Name'],
  ['email', 'Email'],
  ['phone', 'Phone'],
  ['address', 'Delivery address'],
  ['payment', 'Payment method'],
  ['message', 'Message'],
  ['notes', 'Notes'],
];

const money = (n) => `${CONTACT.currencySymbol}${Number(n || 0).toLocaleString('en-GB')}`;
const esc = (s) =>
  String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function transporter() {
  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

function cartLines(cart) {
  return cart
    .filter((i) => i && i.name)
    .map((i) => ({
      name: String(i.name),
      qty: Math.max(1, parseInt(i.qty, 10) || 1),
      each: Number(i.priceLow) || 0,
    }));
}

// ---- plain-text version (deliverability + non-HTML clients) -----------------
function textBody({ isOrder, fields, items, subtotal, when, orderNo }) {
  const out = [];
  out.push(isOrder ? `NEW ORDER — ${SITE.name}` : `NEW ENQUIRY — ${SITE.name}`);
  if (isOrder && orderNo) out.push(`Order ref: ${orderNo}`);
  out.push(when);
  out.push('');
  if (items.length) {
    out.push('ORDER');
    out.push('-----');
    for (const it of items) out.push(`  ${it.qty} x ${it.name}  —  ${money(it.each * it.qty)}`);
    out.push(`  Order total: ${money(subtotal)}`);
    out.push('  (Prices are a guide — confirm final spec, colour and price with the customer. Free UK delivery.)');
    out.push('');
  }
  out.push('CUSTOMER');
  out.push('--------');
  for (const [key, label] of CUSTOMER_FIELDS) {
    if (fields[key]) out.push(`  ${label}: ${String(fields[key]).replace(/\s*\n\s*/g, ', ')}`);
  }
  out.push('');
  out.push('Reply to this email to respond — the customer address is set as Reply-To.');
  return out.join('\n');
}

// ---- HTML version ----------------------------------------------------------
function htmlBody({ isOrder, fields, items, subtotal, when, orderNo }) {
  const GREEN = SITE.colors.primary;
  const LIME = SITE.colors.accent;
  const INK = '#1b2320';
  const MUTED = '#6a746e';
  const BORDER = '#e2e5df';

  const rows = CUSTOMER_FIELDS.filter(([k]) => fields[k])
    .map(([key, label]) => {
      const raw = String(fields[key]);
      const value =
        key === 'email'
          ? `<a href="mailto:${esc(raw)}" style="color:${GREEN};">${esc(raw)}</a>`
          : key === 'phone'
            ? `<a href="tel:${esc(raw.replace(/[^\d+]/g, ''))}" style="color:${GREEN};">${esc(raw)}</a>`
            : esc(raw).replace(/\n/g, '<br>');
      return `<tr>
        <td style="padding:8px 12px;border-bottom:1px solid ${BORDER};color:${MUTED};white-space:nowrap;vertical-align:top;font-size:13px;">${label}</td>
        <td style="padding:8px 12px;border-bottom:1px solid ${BORDER};color:${INK};font-size:14px;">${value}</td>
      </tr>`;
    })
    .join('');

  const orderTable = items.length
    ? `<h2 style="margin:24px 0 8px;font-size:15px;color:${INK};">Order summary</h2>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
      <tr style="background:${GREEN};color:#fff;">
        <th align="left" style="padding:10px 12px;font-size:12px;letter-spacing:.04em;text-transform:uppercase;">Model</th>
        <th align="center" style="padding:10px 12px;font-size:12px;letter-spacing:.04em;text-transform:uppercase;">Qty</th>
        <th align="right" style="padding:10px 12px;font-size:12px;letter-spacing:.04em;text-transform:uppercase;">Price</th>
      </tr>
      ${items
        .map(
          (it, idx) => `<tr style="background:${idx % 2 ? '#f7f8f5' : '#fff'};">
        <td style="padding:10px 12px;font-size:14px;color:${INK};">${esc(it.name)}</td>
        <td align="center" style="padding:10px 12px;font-size:14px;color:${INK};">${it.qty}</td>
        <td align="right" style="padding:10px 12px;font-size:14px;color:${INK};">${money(it.each * it.qty)}</td>
      </tr>`
        )
        .join('')}
      <tr style="background:#eef2ea;">
        <td colspan="2" style="padding:10px 12px;font-size:14px;font-weight:700;color:${INK};">Order total</td>
        <td align="right" style="padding:10px 12px;font-size:14px;font-weight:700;color:${INK};">${money(subtotal)}</td>
      </tr>
    </table>
    <p style="margin:8px 0 0;font-size:12px;color:${MUTED};">Prices are a guide — confirm final spec, colour and price with the customer.${ORDER_RULES.freeShippingThreshold === 0 ? ' Free UK delivery.' : ''}</p>`
    : '';

  return `<!doctype html><html><body style="margin:0;background:#f2f4f0;padding:24px 12px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" align="center" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;border-collapse:collapse;">
    <tr><td style="background:${GREEN};padding:22px 28px;border-radius:12px 12px 0 0;">
      <span style="color:#fff;font-size:20px;font-weight:800;">${esc(SITE.name)}</span>
      <span style="display:block;color:${LIME};font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-top:2px;">
        ${isOrder ? 'New order' : 'New website enquiry'}${isOrder && orderNo ? ` &nbsp;·&nbsp; ${esc(orderNo)}` : ''}
      </span>
    </td></tr>
    <tr><td style="background:#fff;padding:24px 28px;border:1px solid ${BORDER};border-top:0;border-radius:0 0 12px 12px;">
      <p style="margin:0 0 4px;font-size:13px;color:${MUTED};">${esc(when)}</p>
      ${isOrder && orderNo ? `<p style="margin:0 0 12px;font-size:15px;color:${INK};">Order reference <strong>${esc(orderNo)}</strong></p>` : ''}
      ${orderTable}
      <h2 style="margin:24px 0 8px;font-size:15px;color:${INK};">Customer details</h2>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid ${BORDER};border-radius:8px;overflow:hidden;">
        ${rows}
      </table>
      <p style="margin:20px 0 0;font-size:13px;color:${MUTED};">
        Reply directly to this email to respond — the customer’s address is set as <strong>Reply-To</strong>.
      </p>
    </td></tr>
    <tr><td style="padding:16px 28px;text-align:center;color:${MUTED};font-size:11px;">
      Sent by the ${esc(SITE.name)} website · ${esc(SITE.domain)}
    </td></tr>
  </table>
</body></html>`;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot — pretend success so bots don't retry.
  if (body.botcheck) return Response.json({ success: true });

  const items = Array.isArray(body.cart) ? cartLines(body.cart) : [];
  const isOrder = (body.formName || 'contact') === 'order';

  if (!body.email || (!body.message && items.length === 0)) {
    return Response.json({ success: false, message: 'Please fill in the required fields.' }, { status: 400 });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return Response.json(
      {
        success: false,
        message: `Email delivery isn't configured yet. Please message us on WhatsApp instead.`,
        code: 'not_configured',
      },
      { status: 503 }
    );
  }

  const subtotal = items.reduce((s, it) => s + it.each * it.qty, 0);
  const when = new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'full',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  }).format(new Date());

  const to = FORMS.destinations[isOrder ? 'order' : 'contact'] || FORMS.destinations.contact || CONTACT.email;
  const from = process.env.SMTP_FROM || FORMS.resendFrom || process.env.SMTP_USER;
  const name = String(body.name || '').trim();
  const orderNo = String(body.orderNo || '').trim().slice(0, 20);
  const subject = isOrder
    ? `New order${orderNo ? ` ${orderNo}` : ''} — ${money(subtotal)}${name ? ` — ${name}` : ''}`
    : body.subject || `New enquiry — ${SITE.name}`;

  const payload = { isOrder, fields: body, items, subtotal, when, orderNo };

  try {
    await transporter().sendMail({
      from: `${SITE.name} website <${from}>`,
      to,
      replyTo: body.email,
      subject,
      text: textBody(payload),
      html: htmlBody(payload),
    });
    return Response.json({ success: true });
  } catch (err) {
    console.error('SMTP send failed:', err?.message);
    return Response.json(
      { success: false, message: `Something went wrong sending your message. Please message us on WhatsApp.` },
      { status: 502 }
    );
  }
}
