// Order storage over Upstash Redis. Value at pp:order:{ref}; a sorted set
// pp:orders:index scored by createdAt drives the newest-first dashboard list.
// All functions are best-effort — when Redis is unconfigured they no-op so
// checkout still emails and redirects.
import { redisSet, redisGet, redisDel, redisZAdd, redisZRem, redisZRangeRev, isRedisConfigured } from './redis';

export { isRedisConfigured as isOrderStoreConfigured };

const KEY = (ref) => `pp:order:${ref}`;
const INDEX = 'pp:orders:index';

// StoredOrder: { orderNumber, customerName, customerEmail?, customerPhone?,
//   address?, notes?, items:[{name,qty,priceLow}], amountDue, status:'pending'|'payment-sent',
//   channel:'whatsapp'|'email', createdAt }
export async function saveOrder(order) {
  if (!isRedisConfigured()) return null;
  const record = {
    status: 'pending',
    channel: order.channel === 'whatsapp' ? 'whatsapp' : 'email',
    createdAt: Date.now(),
    ...order,
    items: Array.isArray(order.items) ? order.items : [],
    amountDue: Number(order.amountDue) || 0,
  };
  await redisSet(KEY(record.orderNumber), record);
  await redisZAdd(INDEX, record.createdAt, record.orderNumber);
  return record;
}

export async function listOrders() {
  if (!isRedisConfigured()) return [];
  const refs = await redisZRangeRev(INDEX);
  const orders = await Promise.all(refs.map((r) => redisGet(KEY(r))));
  return orders.filter(Boolean);
}

export async function getOrder(orderNumber) {
  if (!isRedisConfigured()) return null;
  return redisGet(KEY(orderNumber));
}

export async function markOrderSent(orderNumber) {
  const order = await getOrder(orderNumber);
  if (!order) return null;
  order.status = 'payment-sent';
  order.paymentSentAt = Date.now();
  await redisSet(KEY(orderNumber), order);
  return order;
}

export async function deleteOrder(orderNumber) {
  if (!isRedisConfigured()) return;
  await redisDel(KEY(orderNumber));
  await redisZRem(INDEX, orderNumber);
}
