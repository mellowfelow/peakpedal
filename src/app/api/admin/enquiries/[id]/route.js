import { checkAdminPasscode } from '@/lib/adminAuth';
import { getEnquiry, deleteEnquiry } from '@/lib/enquiryStore';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  const enquiry = await getEnquiry(id);
  if (!enquiry) return Response.json({ ok: false, error: 'not-found' }, { status: 404 });
  return Response.json({ ok: true, enquiry });
}

export async function DELETE(request, { params }) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;
  const { id } = await params;
  await deleteEnquiry(id);
  return Response.json({ ok: true });
}
