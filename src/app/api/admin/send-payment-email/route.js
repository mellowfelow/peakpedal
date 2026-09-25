import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markOrderSent } from '@/lib/orderStore';
import { sendMail } from '@/lib/mailer';
import { paymentDetailsEmail } from '@/utils/emailTemplates';
import { paymentMethodParts, resolvePaymentFields } from '@/lib/order';
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

  if (!body.orderNumber || !body.methodId) {
    return Response.json({ ok: false, error: 'Missing orderNumber or methodId' }, { status: 400 });
  }

  const order = await getOrder(body.orderNumber);
  if (!order) return Response.json({ ok: false, error: 'Order not found' }, { status: 404 });
  if (!order.customerEmail) {
    return Response.json({ ok: false, error: 'This order has no customer email on file.' }, { status: 400 });
  }

  const fields = resolvePaymentFields(body.methodId, body.fields);
  if (fields.length === 0) {
    return Response.json({ ok: false, error: 'Fill in at least one payment field before sending.' }, { status: 400 });
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
