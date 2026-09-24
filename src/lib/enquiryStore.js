// Enquiry storage — identical pattern to orderStore. Value at pp:enquiry:{id};
// sorted set pp:enquiries:index scored by createdAt.
import { redisSet, redisGet, redisDel, redisZAdd, redisZRem, redisZRangeRev, isRedisConfigured } from './redis';

export { isRedisConfigured as isEnquiryStoreConfigured };

const KEY = (id) => `pp:enquiry:${id}`;
const INDEX = 'pp:enquiries:index';

export function generateEnquiryId() {
  const t = Date.now().toString(36);
  const r = Math.random().toString(36).slice(2, 8);
  return `enq-${t}${r}`;
}

// StoredEnquiry: { id, type:'contact'|'wholesale', name, email?, phone?,
//   message, meta:{}, status:'new'|'replied', createdAt }
export async function saveEnquiry(enquiry) {
  if (!isRedisConfigured()) return null;
  const record = {
    id: enquiry.id || generateEnquiryId(),
    status: 'new',
    createdAt: Date.now(),
    meta: {},
    ...enquiry,
  };
  await redisSet(KEY(record.id), record);
  await redisZAdd(INDEX, record.createdAt, record.id);
  return record;
}

export async function listEnquiries() {
  if (!isRedisConfigured()) return [];
  const ids = await redisZRangeRev(INDEX);
  const rows = await Promise.all(ids.map((id) => redisGet(KEY(id))));
  return rows.filter(Boolean);
}

export async function getEnquiry(id) {
  if (!isRedisConfigured()) return null;
  return redisGet(KEY(id));
}

export async function markEnquiryReplied(id) {
  const enquiry = await getEnquiry(id);
  if (!enquiry) return null;
  enquiry.status = 'replied';
  enquiry.repliedAt = Date.now();
  await redisSet(KEY(id), enquiry);
  return enquiry;
}

export async function deleteEnquiry(id) {
  if (!isRedisConfigured()) return;
  await redisDel(KEY(id));
  await redisZRem(INDEX, id);
}
