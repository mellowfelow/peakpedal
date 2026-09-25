import { Redis } from '@upstash/redis';

/**
 * Upstash Redis REST client for the Reply Portal (orders + enquiries store).
 * Checks the common env var prefixes so whichever name Vercel's Storage tab
 * assigns (Upstash marketplace vs. the generic Vercel KV rename) just works.
 */
const CREDENTIAL_CANDIDATES = [
  ['UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN'],
  ['KV_REST_API_URL', 'KV_REST_API_TOKEN'],
  ['STORAGE_REST_API_URL', 'STORAGE_REST_API_TOKEN'],
  ['STORAGE_KV_REST_API_URL', 'STORAGE_KV_REST_API_TOKEN'],
  // Actual pair Vercel's Storage tab generates for an Upstash Redis connection
  // with Custom Environment Variable Prefix = "UPSTASH_REDIS" — Vercel inserts
  // its own "_KV_" segment, so this does NOT match the "UPSTASH_REDIS_REST_URL"
  // pattern above despite the identical prefix.
  ['UPSTASH_REDIS_KV_REST_API_URL', 'UPSTASH_REDIS_KV_REST_API_TOKEN'],
];

let cached;

export function getRedis() {
  if (cached !== undefined) return cached;
  for (const [urlKey, tokenKey] of CREDENTIAL_CANDIDATES) {
    const url = process.env[urlKey];
    const token = process.env[tokenKey];
    if (url && token) {
      cached = new Redis({ url, token });
      return cached;
    }
  }
  cached = null;
  return null;
}

export function isStoreConfigured() {
  return getRedis() !== null;
}
