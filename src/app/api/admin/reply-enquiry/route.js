import { checkAdminPasscode } from '@/lib/adminAuth';
import { getEnquiry, markEnquiryReplied } from '@/lib/enquiryStore';
import { sendMail } from '@/lib/mailer';
import { buildEmailHtml, escapeHtml } from '@/lib/emailTemplate';
import { SITE, FORMS } from '@/config/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;

  const body = await request.json().catch(() => null);
  if (!body || !body.enquiryId || !body.message) {
    return Response.json({ ok: false, error: 'enquiryId and message are required' }, { status: 400 });
  }

  const enquiry = await getEnquiry(body.enquiryId);
  if (!enquiry) return Response.json({ ok: false, error: 'not-found' }, { status: 404 });
  if (!enquiry.email) {
    return Response.json({ ok: false, error: 'This enquiry has no email on file.' }, { status: 400 });
  }

  const html = buildEmailHtml({
    title: body.subject || 'Reply to your enquiry',
    intro: `Hi ${escapeHtml(enquiry.name || 'there')},`,
    afterRows: `<div style="padding:6px 0;font:400 14px/1.6 -apple-system,Segoe UI,Arial,sans-serif;color:#1b2320;white-space:pre-wrap">${escapeHtml(body.message)}</div>`,
  });

  const from = `${SITE.name} <${process.env.SMTP_FROM || FORMS.resendFrom || process.env.SMTP_USER}>`;
  const result = await sendMail({
    from,
    to: enquiry.email,
    subject: body.subject || `Re: your enquiry to ${SITE.name}`,
    html,
    text: body.message,
  });

  if (result.sent) await markEnquiryReplied(enquiry.id);

  return Response.json({ ok: true, sent: result.sent, reason: result.reason || null });
}
