import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markOrderSent } from '@/lib/orderStore';
import { sendMail } from '@/lib/mailer';
import { buildEmailHtml, escapeHtml } from '@/lib/emailTemplate';
import { money, paymentMethodParts, paymentTermsHtml } from '@/lib/order';
import { SITE, FORMS } from '@/config/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  if (!body || !body.orderId || !body.detail) {
    return Response.json({ ok: false, error: 'orderId and detail are required' }, { status: 400 });
  }

  const order = await getOrder(body.orderId);
  if (!order) return Response.json({ ok: false, error: 'not-found' }, { status: 404 });
  if (!order.customerEmail) {
    return Response.json({ ok: false, error: 'This order has no customer email on file.' }, { status: 400 });
  }

  const { opening, closing } = paymentMethodParts(body.methodId, order.amountDue, order.orderNumber);
  const termsHtml = paymentTermsHtml(order.orderNumber);

  const html = buildEmailHtml({
    title: 'Payment details',
    refBadge: order.orderNumber,
    intro: `Hi ${escapeHtml(order.customerName || 'there')} — here are the payment details for your order.`,
    rows: [{ label: 'Amount due', value: money(order.amountDue), highlight: true }],
    afterRows: [
      `<div style="padding:12px 0;font:400 14px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#1b2320;white-space:pre-wrap">${opening ? escapeHtml(opening) + '\n\n' : ''}${escapeHtml(body.detail)}${closing ? '\n\n' + escapeHtml(closing) : ''}</div>`,
      termsHtml,
    ].join(''),
    footer: undefined,
  });

  const from = `${SITE.name} <${process.env.SMTP_FROM || FORMS.resendFrom || process.env.SMTP_USER}>`;
  const result = await sendMail({
    from,
    to: order.customerEmail,
    subject: `Payment details — ${order.orderNumber} — ${money(order.amountDue)} — ${SITE.name}`,
    html,
    text: `Payment details for ${order.orderNumber} (${money(order.amountDue)}):\n\n${opening}\n\n${body.detail}\n\n${closing}`,
  });

  if (result.sent) await markOrderSent(order.orderNumber);

  return Response.json({ ok: true, sent: result.sent, reason: result.reason || null });
}
