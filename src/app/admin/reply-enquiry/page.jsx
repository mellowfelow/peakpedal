'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAdminPasscode } from '@/lib/useAdminPasscode';

function ReplyEnquiryInner() {
  const { passcode } = useAdminPasscode();
  const searchParams = useSearchParams();
  const enquiryId = searchParams.get('id') || '';

  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!passcode || !enquiryId) {
      setLoading(false);
      return;
    }
    fetch(`/api/admin/enquiries/${encodeURIComponent(enquiryId)}/`, { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => {
        setEnquiry(d.enquiry || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [passcode, enquiryId]);

  async function handleSend(e) {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/reply-enquiry/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-passcode': passcode },
        body: JSON.stringify({ enquiryId, subject, message }),
      });
      const data = await res.json();
      if (data.ok && data.sent) setResult({ type: 'success', text: 'Reply sent.' });
      else if (data.ok) setResult({ type: 'warning', text: `Not emailed: ${data.reason || 'SMTP not configured'}` });
      else setResult({ type: 'error', text: data.error || 'Failed to send.' });
    } catch {
      setResult({ type: 'error', text: 'Network error — try again.' });
    }
    setSending(false);
  }

  if (loading) return <p style={{ padding: 24, color: '#888' }}>Loading enquiry…</p>;
  if (!enquiry) {
    return (
      <div className="empty-state">
        <p>Enquiry not found.</p>
        <a href="/admin/enquiries/" className="btn-sm" style={{ marginTop: 12, display: 'inline-block' }}>Back to enquiries</a>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="detail-header">
        <h1>Reply to enquiry</h1>
        <p className="detail-meta">{enquiry.name} ({enquiry.email}) — {enquiry.type}</p>
      </div>

      <div className="detail-card">{enquiry.message}</div>

      <form onSubmit={handleSend}>
        <div className="form-group">
          <label className="form-label">Subject (optional)</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Re: Your enquiry" className="form-input" />
        </div>

        <div className="form-group">
          <label className="form-label">Reply message</label>
          <textarea value={message} onChange={(e) => setMessage(e.target.value)} required rows={8} placeholder="Type your reply…" className="form-textarea" />
        </div>

        {message && (
          <div className="detail-card" style={{ marginBottom: 20 }}>
            <div className="detail-card-label">Preview</div>
            {message}
          </div>
        )}

        {result && <div className={`alert alert-${result.type}`}>{result.text}</div>}

        <button type="submit" disabled={sending || !enquiry.email} className="btn-primary">
          {sending ? 'Sending…' : `Email ${enquiry.email || '(no email on file)'}`}
        </button>
      </form>
    </div>
  );
}

export default function ReplyEnquiryPage() {
  return (
    <Suspense fallback={<p style={{ padding: 24, color: '#888' }}>Loading…</p>}>
      <ReplyEnquiryInner />
    </Suspense>
  );
}
