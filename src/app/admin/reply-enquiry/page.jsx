'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAdminContextPasscode } from '@/components/admin/AdminPasscodeContext';

function Composer() {
  const passcode = useAdminContextPasscode();
  const params = useSearchParams();
  const id = params.get('id') || '';

  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/admin/enquiries/${encodeURIComponent(id)}/`, { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => setEnquiry(d.enquiry || null))
      .finally(() => setLoading(false));
  }, [id, passcode]);

  const send = async () => {
    if (!enquiry || !reply.trim()) {
      setError('Write a reply before sending.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/admin/reply-enquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-passcode': passcode },
        body: JSON.stringify({ id: enquiry.id, reply, replyIsHtml: false }),
      });
      const data = await res.json();
      if (data.ok) setSent(true);
      else setError(data.error || 'Send failed.');
    } catch {
      setError('Send failed — check your connection and try again.');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="empty-state">Loading…</p>;
  if (!enquiry) {
    return (
      <div>
        <p className="empty-state" style={{ marginBottom: 16 }}>
          {id ? `Enquiry ${id} not found.` : 'Open this page from a row in Enquiries.'}
        </p>
        <Link href="/admin/enquiries/" className="back-link"><ArrowLeft size={14} /> Back to enquiries</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <Link href={`/admin/enquiries/${encodeURIComponent(enquiry.id)}/`} className="back-link"><ArrowLeft size={14} /> Back to enquiry</Link>

      <h1 className="admin-page-title">Reply to Enquiry</h1>

      <div className="detail-card" style={{ marginBottom: 24 }}>
        <div className="detail-value-strong" style={{ textTransform: 'capitalize' }}>{enquiry.type} · {enquiry.name}</div>
        <div className="detail-value">{enquiry.email}</div>
        <p style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid var(--admin-border)', whiteSpace: 'pre-wrap', fontSize: 14 }}>{enquiry.message}</p>
      </div>

      {sent ? (
        <div className="success-box">
          <CheckCircle2 size={32} />
          <p>Reply sent to {enquiry.email}.</p>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label>Your reply</label>
            <textarea value={reply} onChange={(e) => setReply(e.target.value)} rows={7} placeholder="Write your reply…" />
          </div>

          {reply && (
            <div className="email-preview" style={{ whiteSpace: 'pre-wrap' }}>{reply}</div>
          )}

          {error && <p className="error-text">{error}</p>}

          <button onClick={send} disabled={sending} className="btn-primary" style={{ width: '100%' }}>
            {sending ? 'Sending…' : `Send reply to ${enquiry.email}`}
          </button>
        </div>
      )}
    </div>
  );
}

export default function ReplyEnquiryPage() {
  return (
    <Suspense fallback={<p className="empty-state">Loading…</p>}>
      <Composer />
    </Suspense>
  );
}
