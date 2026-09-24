'use client';

import { useState } from 'react';

// Pre-filled wa.me link the admin clicks to open WhatsApp with the message
// ready to send — plus a "copy message" fallback for desktop/manual paste.
export default function WhatsAppSendPanel({ link, messageText }) {
  const [copied, setCopied] = useState(false);

  async function copyMessage() {
    try {
      await navigator.clipboard.writeText(messageText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  }

  return (
    <div className="wa-panel">
      <strong>Or reply on WhatsApp</strong>
      <p style={{ fontSize: '0.85rem', color: '#166534', margin: '4px 0 12px' }}>
        Opens WhatsApp with the message pre-filled — just press send.
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-primary">Open WhatsApp</a>
        <button type="button" className="btn-sm" onClick={copyMessage}>{copied ? 'Copied!' : 'Copy message'}</button>
      </div>
    </div>
  );
}
