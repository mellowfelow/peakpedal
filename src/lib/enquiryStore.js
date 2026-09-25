import { getRedis, isStoreConfigured } from './redis';

// StoredEnquiry: { id, type:'contact'|'wholesale', name, email, phone?,
//   message, meta?:{}, status:'new'|'replied', createdAt }

const KEY = 'pp:enquiries';

export const isEnquiryStoreConfigured = isStoreConfigured;

export function generateEnquiryId() {
  return `ENQ-${Date.now().toString(36)}${Math.random().toString(36).slice(2, 6)}`.toUpperCase();
}

export async function saveEnquiry(enquiry) {
  const redis = getRedis();
  if (!redis) return;
  await redis.hset(KEY, { [enquiry.id]: JSON.stringify(enquiry) });
}

export async function listEnquiries() {
  const redis = getRedis();
  if (!redis) return [];
  const all = await redis.hgetall(KEY);
  if (!all) return [];
  return Object.values(all)
    .map((v) => (typeof v === 'string' ? JSON.parse(v) : v))
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getEnquiry(id) {
  const redis = getRedis();
  if (!redis) return null;
  const raw = await redis.hget(KEY, id);
  if (!raw) return null;
  return typeof raw === 'string' ? JSON.parse(raw) : raw;
}

export async function markEnquiryReplied(id) {
  const enquiry = await getEnquiry(id);
  if (!enquiry) return;
  enquiry.status = 'replied';
  await saveEnquiry(enquiry);
}

export async function deleteEnquiry(id) {
  const redis = getRedis();
  if (!redis) return;
  await redis.hdel(KEY, id);
}
