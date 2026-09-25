'use client';

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { useAdminContextPasscode } from '@/components/admin/AdminPasscodeContext';

const FILTERS = ['all', 'contact', 'wholesale', 'new', 'replied'];

export default function EnquiriesPage() {
  const passcode = useAdminContextPasscode();
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const load = () => {
    setLoading(true);
    fetch('/api/admin/enquiries/', { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => setEnquiries(d.enquiries || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, [passcode]);

  const filtered = useMemo(() => {
    if (filter === 'all') return enquiries;
    if (filter === 'new' || filter === 'replied') return enquiries.filter((e) => e.status === filter);
    return enquiries.filter((e) => e.type === filter);
  }, [enquiries, filter]);

  const deleteEnquiry = async (id, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm("Delete this enquiry? This can't be undone.")) return;
    await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}/`, {
      method: 'DELETE',
      headers: { 'x-admin-passcode': passcode },
    });
    load();
  };

  return (
    <div>
      <h1 className="admin-page-title">Enquiries</h1>

      <div className="filter-pills">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={`filter-pill ${filter === f ? 'active' : ''}`}>
            {f}
          </button>
        ))}
      </div>

      {loading ? (
        <p className="empty-state">Loading…</p>
      ) : filtered.length === 0 ? (
        <p className="empty-state">No enquiries match this filter.</p>
      ) : (
        <div className="list-rows">
          {filtered.map((e) => (
            <div key={e.id} className="list-row">
              <Link href={`/admin/enquiries/${encodeURIComponent(e.id)}/`} className="list-row-link">
                <div>
                  <div className="row-title" style={{ textTransform: 'capitalize' }}>{e.type}</div>
                  <div className="row-meta">{new Date(e.createdAt).toLocaleString('en-GB')}</div>
                </div>
                <div className="row-truncate">
                  {e.name}
                  <div className="row-meta row-truncate">{e.email}</div>
                </div>
                <div className="row-truncate">{e.message}</div>
                <span className={`status-badge status-${e.status === 'new' ? 'new' : 'replied'}`}>{e.status}</span>
              </Link>
              <button onClick={(ev) => deleteEnquiry(e.id, ev)} className="icon-btn" aria-label="Delete enquiry">
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
