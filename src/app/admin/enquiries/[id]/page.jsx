'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdminPasscode } from '@/lib/useAdminPasscode';

export default function EnquiryDetailPage() {
  const { passcode } = useAdminPasscode();
  const { id } = useParams();
  const router = useRouter();
  const [enquiry, setEnquiry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!passcode || !id) {
      setLoading(false);
      return;
    }
    fetch(`/api/admin/enquiries/${encodeURIComponent(id)}/`, { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => {
        setEnquiry(d.enquiry || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [passcode, id]);

  async function handleDelete() {
    if (!confirm(`Delete enquiry ${id}? This cannot be undone.`)) return;
    await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}/`, { method: 'DELETE', headers: { 'x-admin-passcode': passcode } });
    router.push('/admin/enquiries/');
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

  const created = enquiry.createdAt ? new Date(enquiry.createdAt) : null;

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="admin-page-title" style={{ marginBottom: 4 }}>Enquiry from {enquiry.name || enquiry.email}</h1>
          <p className="detail-meta">
            {created ? created.toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
            {' · '}
            <span className={`status-badge status-${enquiry.status}`}>{enquiry.status}</span>
          </p>
        </div>
        <button onClick={handleDelete} className="btn-danger" style={{ fontSize: 14 }}>Delete enquiry</button>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-card-label">Contact</div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{enquiry.name}</div>
          <div style={{ marginBottom: 4 }}>{enquiry.email}</div>
          {enquiry.phone && <div>{enquiry.phone}</div>}
        </div>
        <div className="detail-card">
          <div className="detail-card-label">Type</div>
          <div style={{ fontWeight: 600, textTransform: 'capitalize' }}>{enquiry.type}</div>
        </div>
      </div>

      <h2 className="section-title">Message</h2>
      <div className="detail-card">{enquiry.message}</div>

      <div className="action-row" style={{ marginTop: 24 }}>
        <a href={`/admin/reply-enquiry/?id=${encodeURIComponent(enquiry.id)}`} className="btn-primary">
          {enquiry.status === 'replied' ? 'Send another reply' : 'Reply'}
        </a>
        <a href="/admin/enquiries/" className="btn-sm">Back to enquiries</a>
      </div>
    </div>
  );
}
