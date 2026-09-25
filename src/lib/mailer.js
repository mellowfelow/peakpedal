import nodemailer from 'nodemailer';

// Shared SMTP transporter — same env vars /api/contact uses. Returns
// {sent:false} when unconfigured instead of throwing, so admin routes can
// degrade gracefully (e.g. still mark an order as sent isn't appropriate,
// but the route can report a clear error rather than a 500).
export function isMailerConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function transporter() {
  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

export async function sendMail({ to, subject, html, text, replyTo, from, attachments }) {
  if (!isMailerConfigured()) return { sent: false, reason: 'not-configured' };
  await transporter().sendMail({
    from,
    to,
    replyTo,
    subject,
    text,
    html,
    ...(attachments ? { attachments } : {}),
  });
  return { sent: true };
}
