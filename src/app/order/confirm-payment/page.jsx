'use client';

import React, { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, Upload } from 'lucide-react';
import { CONTACT } from '@/config/site';
import '../../admin/admin.css';

function ConfirmPaymentForm() {
  const params = useSearchParams();
  const orderNumber = params.get('id') || '';

  const [file, setFile] = useState(null);
  const [note, setNote] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    if (!orderNumber) {
      setError('This link is missing your order number — please use the link from your payment-details email.');
      return;
    }
    if (!file) {
      setError('Choose a screenshot of your completed payment first.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const form = new FormData();
      form.set('orderNumber', orderNumber);
      form.set('note', note);
      form.set('file', file);
      const res = await fetch('/api/order/confirm-payment/', { method: 'POST', body: form });
      const data = await res.json();
      if (data.ok) setSent(true);
      else setError(data.error || 'Upload failed — please try again.');
    } catch {
      setError('Upload failed — check your connection and try again.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="confirm-payment-shell">
      <div className="confirm-payment-card">
        <span className="confirm-payment-brand">Peak Pedal</span>
        <h1>Confirm Your Payment</h1>

        {sent ? (
          <div className="success-box">
            <CheckCircle2 size={32} />
            <p>Thanks — we've received your confirmation.</p>
            <p className="sub">We'll verify the payment and follow up shortly.</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            {orderNumber && (
              <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--admin-text-soft)', marginBottom: 16 }}>
                Order <strong style={{ color: 'var(--admin-text)' }}>{orderNumber}</strong>
              </p>
            )}

            <div className="form-group">
              <label htmlFor="screenshot">Payment screenshot</label>
              <label htmlFor="screenshot" className="upload-drop">
                <Upload size={22} />
                <span className="filename">{file ? file.name : 'Tap to choose a screenshot'}</span>
                <span className="hint">JPG, PNG, WebP, or HEIC — up to 4MB</span>
              </label>
              <input
                id="screenshot"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/heic,image/heif"
                required
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="sr-only"
              />
            </div>

            <div className="form-group">
              <label htmlFor="note">Note (optional)</label>
              <textarea id="note" value={note} onChange={(e) => setNote(e.target.value)} rows={3} placeholder="Anything we should know…" />
            </div>

            {error && <p className="error-text" style={{ textAlign: 'center' }}>{error}</p>}

            <button type="submit" disabled={sending} className="btn-primary" style={{ width: '100%' }}>
              {sending ? 'Uploading…' : 'Send Payment Confirmation'}
            </button>

            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--admin-text-faint)', marginTop: 16 }}>
              Having trouble? Email{' '}
              <a href={`mailto:${CONTACT.email}`} style={{ color: 'var(--admin-accent)' }}>{CONTACT.email}</a> or WhatsApp {CONTACT.phone}.
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ConfirmPaymentPage() {
  return (
    <Suspense fallback={<div className="confirm-payment-shell" />}>
      <ConfirmPaymentForm />
    </Suspense>
  );
}
