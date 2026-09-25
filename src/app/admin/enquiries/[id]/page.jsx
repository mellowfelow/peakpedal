'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Trash2, ArrowLeft } from 'lucide-react';
import { useAdminContextPasscode } from '@/components/admin/AdminPasscodeContext';

export default function EnquiryDetailPage() {
  const passcode = useAdminContextPasscode();
  const params = useParams();
  const router = useRouter();
  const id = decodeURIComponent(String(params.id || ''));

  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/enquiries/${encodeURIComponent(id)}/`, { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => setEnquiry(d.enquiry || null))
      .finally(() => setLoading(false));
  }, [id, passcode]);

  const handleDelete = async () => {
    if (!confirm("Delete this enquiry? This can't be undone.")) return;
    await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}/`, { method: 'DELETE', headers: { 'x-admin-passcode': passcode } });
    router.push('/admin/enquiries/');
  };

  if (loading) return <p className="empty-state">Loading…</p>;
  if (!enquiry) {
    return (
      <div>
        <p className="empty-state" style={{ marginBottom: 16 }}>Enquiry not found.</p>
        <Link href="/admin/enquiries/" className="back-link"><ArrowLeft size={14} /> Back to enquiries</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <Link href="/admin/enquiries/" className="back-link"><ArrowLeft size={14} /> Back to enquiries</Link>

      <div className="detail-head">
        <div>
          <h1 style={{ textTransform: 'capitalize' }}>{enquiry.type} enquiry</h1>
          <div className="detail-meta">
            {new Date(enquiry.createdAt).toLocaleString('en-GB')}
            <span className={`status-badge status-${enquiry.status === 'new' ? 'new' : 'replied'}`}>{enquiry.status}</span>
          </div>
        </div>
        <button onClick={handleDelete} className="icon-btn" aria-label="Delete enquiry">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="detail-card" style={{ marginBottom: 24 }}>
        <div className="detail-label">Contact</div>
        <div className="detail-value-strong">{enquiry.name}</div>
        <div className="detail-value">{enquiry.email}</div>
        {enquiry.phone && <div className="detail-value">{enquiry.phone}</div>}
      </div>

      {enquiry.meta && Object.keys(enquiry.meta).length > 0 && (
        <div className="detail-card" style={{ marginBottom: 24 }}>
          <div className="detail-label">Details</div>
          {Object.entries(enquiry.meta).map(([k, v]) => (
            <div key={k} style={{ display: 'flex', justifyContent: 'space-between', gap: 16, fontSize: 14, marginTop: 6 }}>
              <span className="row-meta" style={{ textTransform: 'capitalize' }}>{k.replace(/([A-Z])/g, ' $1')}</span>
              <span>{v}</span>
            </div>
          ))}
        </div>
      )}

      <div style={{ marginBottom: 24 }}>
        <div className="detail-label" style={{ marginBottom: 8 }}>Message</div>
        <div className="detail-card" style={{ whiteSpace: 'pre-wrap' }}>{enquiry.message}</div>
      </div>

      <Link href={`/admin/reply-enquiry/?id=${encodeURIComponent(enquiry.id)}`} className="btn-primary">
        {enquiry.status === 'replied' ? 'Send another reply' : 'Reply'}
      </Link>
    </div>
  );
}
