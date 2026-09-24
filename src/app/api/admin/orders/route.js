import { checkAdminPasscode } from '@/lib/adminAuth';
import { listOrders } from '@/lib/orderStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const orders = await listOrders();
  return Response.json({ ok: true, orders });
}
