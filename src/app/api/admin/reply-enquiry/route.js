import { checkAdminPasscode } from '@/lib/adminAuth';
import { getEnquiry, markEnquiryReplied } from '@/lib/enquiryStore';
import { sendMail } from '@/lib/mailer';
import { enquiryReplyEmail, escapeHtml } from '@/utils/emailTemplates';
import { CONTACT, SITE, FORMS } from '@/config/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(request) {
  const denied = checkAdminPasscode(request);
  if (denied) return denied;

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: 'Invalid body' }, { status: 400 });
  }

  if (!body.id || !body.reply) {
    return Response.json({ ok: false, error: 'Missing id or reply' }, { status: 400 });
  }

  const enquiry = await getEnquiry(body.id);
  if (!enquiry) return Response.json({ ok: false, error: 'Enquiry not found' }, { status: 404 });
  if (!enquiry.email) {
    return Response.json({ ok: false, error: 'This enquiry has no email on file.' }, { status: 400 });
  }

  const replyHtml = body.replyIsHtml ? body.reply : escapeHtml(body.reply).replace(/\n/g, '<br>');

  const mail = enquiryReplyEmail({
    customerName: enquiry.name,
    originalSubject: enquiry.type === 'wholesale' ? 'Your wholesale enquiry' : 'Your enquiry',
    replyHtml,
  });

  const from = `${SITE.name} <${process.env.SMTP_FROM || FORMS.resendFrom || process.env.SMTP_USER}>`;
  const result = await sendMail({
    from,
    to: enquiry.email,
    subject: mail.subject,
    text: mail.text,
    html: mail.html,
    replyTo: CONTACT.email,
  });

  await markEnquiryReplied(enquiry.id);

  return Response.json({ ok: true, sent: result.sent, reason: result.reason || null });
}
