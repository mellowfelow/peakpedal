'use client';

import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

// One payment-detail row with its own click-to-copy button. This is what a
// button inside the email itself can't be — email clients strip all
// JavaScript, so this only works on a real page (which is exactly why the
// email links here instead of trying to embed a button that wouldn't work).
export default function CopyField({ label, value }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <button type="button" onClick={copy} className="copy-field">
      <span className="copy-field-label">{label}</span>
      <span className="copy-field-value">{value}</span>
      <span className="copy-field-icon">{copied ? <Check size={16} /> : <Copy size={16} />}</span>
    </button>
  );
}
