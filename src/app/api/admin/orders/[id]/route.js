import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, markOrderSent, deleteOrder } from '@/lib/orderStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  const order = await getOrder(id);
  if (!order) return Response.json({ ok: false, error: 'not-found' }, { status: 404 });
  return Response.json({ ok: true, order });
}

export async function PATCH(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  const order = await markOrderSent(id);
  if (!order) return Response.json({ ok: false, error: 'not-found' }, { status: 404 });
  return Response.json({ ok: true, order });
}

export async function DELETE(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  await deleteOrder(id);
  return Response.json({ ok: true });
}
