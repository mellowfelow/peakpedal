'use client';

import { useEffect, useMemo, useState } from 'react';
import { useAdminPasscode } from '@/lib/useAdminPasscode';

const TABS = ['all', 'contact', 'wholesale', 'new', 'replied'];

export default function EnquiriesPage() {
  const { passcode } = useAdminPasscode();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState('all');

  useEffect(() => {
    if (!passcode) return;
    fetch('/api/admin/enquiries/', { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => {
        setEnquiries(d.enquiries || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [passcode]);

  const filtered = useMemo(() => {
    if (tab === 'all') return enquiries;
    if (tab === 'new' || tab === 'replied') return enquiries.filter((e) => e.status === tab);
    return enquiries.filter((e) => e.type === tab);
  }, [enquiries, tab]);

  async function handleDelete(id) {
    if (!confirm(`Delete enquiry ${id}?`)) return;
    await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}/`, { method: 'DELETE', headers: { 'x-admin-passcode': passcode } });
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  }

  if (loading) return <p style={{ padding: 24, color: '#888' }}>Loading enquiries…</p>;

  return (
    <div>
      <h1 className="admin-page-title">Enquiries</h1>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 20 }}>
        {TABS.map((t) => (
          <button key={t} type="button" className={`btn-sm ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
            {t[0].toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      {filtered.length === 0 ? (
        <div className="empty-state"><p>No enquiries here.</p></div>
      ) : (
        <div>
          {filtered.map((e) => {
            const date = e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
            return (
              <div key={e.id} className="item-card">
                <div className="item-card-header">
                  <span className="status-badge status-email" style={{ textTransform: 'capitalize' }}>{e.type}</span>
                  <span className={`status-badge status-${e.status}`}>{e.status}</span>
                </div>
                <div className="item-card-name">{e.name || e.email}</div>
                <div className="item-card-meta">{e.email} · {date}</div>
                {e.message && <p className="item-card-preview">{e.message}</p>}
                <div className="item-card-footer">
                  <a href={`/admin/enquiries/${encodeURIComponent(e.id)}/`} className="btn-sm">View</a>
                  <div className="action-row">
                    <button onClick={() => handleDelete(e.id)} className="btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
