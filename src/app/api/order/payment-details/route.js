import { getOrder } from '@/lib/orderStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Public, no-auth endpoint — reachable from the "View & Copy Payment Details"
 * link in the payment-details email. Order numbers work as the access token
 * here, same as /api/order/confirm-payment already does. Returns only what
 * the customer-facing page needs to render copy buttons — never the
 * customer's phone/address or anything not already in the email they got.
 */
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const orderNumber = String(searchParams.get('id') || '').trim();
  if (!orderNumber) {
    return Response.json({ ok: false, error: 'Missing order number' }, { status: 400 });
  }

  const order = await getOrder(orderNumber);
  if (!order || !order.paymentDetails) {
    return Response.json({ ok: false, error: 'No payment details found for this order yet.' }, { status: 404 });
  }

  return Response.json({
    ok: true,
    orderNumber: order.orderNumber,
    amountDue: order.amountDue,
    customerName: order.customerName,
    status: order.status,
    paymentDetails: order.paymentDetails,
  });
}
