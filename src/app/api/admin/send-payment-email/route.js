import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markOrderSent } from '@/lib/orderStore';
import { sendMail } from '@/lib/mailer';
import { paymentDetailsEmail } from '@/utils/emailTemplates';
import { paymentMethodParts, parsePaymentDetail } from '@/lib/order';
import { CONTACT, SITE, FORMS } from '@/config/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid body' }, { status: 400 });
  }

  if (!body.orderNumber || !body.methodId || !body.detail) {
    return Response.json({ ok: false, error: 'Missing orderNumber, methodId, or detail' }, { status: 400 });
  }

  const order = await getOrder(body.orderNumber);
  if (!order) return Response.json({ ok: false, error: 'Order not found' }, { status: 404 });
  if (!order.customerEmail) {
    return Response.json({ ok: false, error: 'This order has no customer email on file.' }, { status: 400 });
  }

  // The admin pastes one blob (works for any payment method); this splits it
  // into the individually-copyable fields the customer sees — see
  // parsePaymentDetail's doc comment for the "Label: value" convention.
  const fields = parsePaymentDetail(body.detail);
  if (fields.length === 0) {
    return Response.json({ ok: false, error: 'Paste at least one payment detail before sending.' }, { status: 400 });
  }

  const { opening, closing } = paymentMethodParts(body.methodId, order.amountDue, order.orderNumber);

  const mail = paymentDetailsEmail({
    orderNumber: order.orderNumber,
    amountDue: order.amountDue,
    customerName: order.customerName,
    opening,
    closing,
    fields,
  });

  const from = `${SITE.name} <${process.env.SMTP_FROM || FORMS.resendFrom || process.env.SMTP_USER}>`;
  const result = await sendMail({
    from,
    to: order.customerEmail,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    replyTo: CONTACT.email,
  });

  await markOrderSent(order.orderNumber, { methodId: body.methodId, fields, opening, closing });

  return Response.json({ ok: true, sent: result.sent, reason: result.reason || null });
}
