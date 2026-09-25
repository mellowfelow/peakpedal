'use client';

import React, { useState } from 'react';
import { MessageCircle, Copy, Check } from 'lucide-react';
import { waMessageText } from '@/lib/whatsapp';

export function WhatsAppSendPanel({ phone, link, messageLines }) {
  const [copied, setCopied] = useState(false);

  const copyMessage = async () => {
    try {
      await navigator.clipboard.writeText(waMessageText(messageLines));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="wa-panel">
      <div className="wa-panel-title">
        <MessageCircle size={16} /> WhatsApp reply — {phone}
      </div>
      <p className="wa-panel-sub">Opens WhatsApp with the message pre-filled — just press Send.</p>
      <div className="wa-panel-actions">
        <a href={link} target="_blank" rel="noopener noreferrer" className="btn-primary">Open in WhatsApp</a>
        <button type="button" onClick={copyMessage} className="btn-sm">
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy message'}
        </button>
      </div>
    </div>
  );
}
