import { getRedis, isStoreConfigured } from './redis';

// StoredOrder: { orderNumber, customerName, customerEmail, customerPhone,
//   items:[{name,quantity,lineTotal}], amountDue, paymentMethod,
//   status:'pending'|'payment-sent'|'payment-confirmed', channel:'whatsapp'|'email', createdAt }

const KEY = 'pp:orders';

export const isOrderStoreConfigured = isStoreConfigured;

export async function saveOrder(order) {
  const redis = getRedis();
  if (!redis) return;
  await redis.hset(KEY, { [order.orderNumber]: JSON.stringify(order) });
}

export async function listOrders() {
  const redis = getRedis();
  if (!redis) return [];
  const all = await redis.hgetall(KEY);
  if (!all) return [];
  return Object.values(all)
    .map((v) => (typeof v === 'string' ? JSON.parse(v) : v))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getOrder(orderNumber) {
  const redis = getRedis();
  if (!redis) return null;
  const raw = await redis.hget(KEY, orderNumber);
  if (!raw) return null;
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

// paymentDetails: { methodId, fields: [{label, value}], sentAt } — stored so
// the customer's payment-details link (/order/payment-details/?id=) can
// still render the same fields if they come back to it later.
export async function markOrderSent(orderNumber, paymentDetails) {
  const order = await getOrder(orderNumber);
  if (!order) return;
  order.status = 'payment-sent';
  if (paymentDetails) order.paymentDetails = paymentDetails;
  await saveOrder(order);
}

export async function markPaymentConfirmed(orderNumber) {
  const order = await getOrder(orderNumber);
  if (!order) return;
  order.status = 'payment-confirmed';
  await saveOrder(order);
}

export async function deleteOrder(orderNumber) {
  const redis = getRedis();
  if (!redis) return;
  await redis.hdel(KEY, orderNumber);
}
