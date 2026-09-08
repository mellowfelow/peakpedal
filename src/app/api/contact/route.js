import nodemailer from 'nodemailer';
import { FORMS, CONTACT, SITE } from '@/config/site';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// SMTP form handler. Credentials come from Vercel Project Environment Variables —
// never the repo:
//   SMTP_HOST   e.g. smtp.zoho.eu / smtp.gmail.com / mail.yourhost.com
//   SMTP_PORT   465 (SSL) or 587 (STARTTLS)
//   SMTP_USER   the mailbox login
//   SMTP_PASS   an APP-SPECIFIC password (not the main account password)
// Optional:
//   SMTP_FROM   overrides FORMS.resendFrom as the visible "From" address
//
// The form posts same-origin JSON here, so none of the Web3Forms CORS rules apply.

const FIELD_LABELS = {
  name: 'Name',
  email: 'Email',
  phone: 'Phone',
  bike: 'Bike(s)',
  address: 'Delivery address',
  payment: 'Preferred payment',
  message: 'Message',
  notes: 'Notes',
};

function transporter() {
  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

function formatBody(fields, formName) {
  const lines = Object.entries(fields)
    .filter(([k, v]) => v && k !== 'botcheck' && k !== 'subject' && k !== 'formName')
    .map(([k, v]) => `${FIELD_LABELS[k] || k}: ${v}`);
  return `New ${formName || 'website'} enquiry from ${SITE.name}\n\n${lines.join('\n')}\n`;
}

export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return Response.json({ success: false, message: 'Invalid request.' }, { status: 400 });
  }

  // Honeypot — pretend success so bots don't retry.
  if (body.botcheck) return Response.json({ success: true });

  if (!body.email || (!body.message && !body.bike)) {
    return Response.json({ success: false, message: 'Please fill in the required fields.' }, { status: 400 });
  }

  if (!process.env.SMTP_HOST || !process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return Response.json(
      {
        success: false,
        message: `Email delivery isn't configured yet. Please message us on WhatsApp instead.`,
        code: 'not_configured',
      },
      { status: 503 }
    );
  }

  const formName = body.formName || 'contact';
  const to = FORMS.destinations[formName] || FORMS.destinations.contact || CONTACT.email;
  const from = process.env.SMTP_FROM || FORMS.resendFrom || process.env.SMTP_USER;

  try {
    await transporter().sendMail({
      from: `${SITE.name} website <${from}>`,
      to,
      replyTo: body.email,
      subject: body.subject || `New ${formName} enquiry — ${SITE.name}`,
      text: formatBody(body, formName),
    });
    return Response.json({ success: true });
  } catch (err) {
    console.error('SMTP send failed:', err?.message);
    return Response.json(
      { success: false, message: `Something went wrong sending your message. Please message us on WhatsApp.` },
      { status: 502 }
    );
  }
}
