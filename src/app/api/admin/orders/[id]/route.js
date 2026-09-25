import { checkAdminPasscode } from '@/lib/adminAuth';
import { getOrder, deleteOrder, markOrderSent } from '@/lib/orderStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  const order = await getOrder(decodeURIComponent(id));
  if (!order) return Response.json({ ok: false, error: 'Not found' }, { status: 404 });
  return Response.json({ ok: true, order });
}

export async function DELETE(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  await deleteOrder(decodeURIComponent(id));
  return Response.json({ ok: true });
}

export async function PATCH(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  await markOrderSent(decodeURIComponent(id));
  return Response.json({ ok: true });
}
