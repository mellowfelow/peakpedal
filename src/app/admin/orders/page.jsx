'use client';

import { useEffect, useState } from 'react';
import { useAdminPasscode } from '@/lib/useAdminPasscode';
import { CONTACT } from '@/config/site';

const money = (n) => `${CONTACT.currencySymbol}${Number(n || 0).toLocaleString('en-GB')}`;

export default function OrdersPage() {
  const { passcode } = useAdminPasscode();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!passcode) return;
    fetch('/api/admin/orders/', { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => {
        setOrders(d.orders || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [passcode]);

  async function handleDelete(ref) {
    if (!confirm(`Delete order ${ref}?`)) return;
    await fetch(`/api/admin/orders/${encodeURIComponent(ref)}/`, { method: 'DELETE', headers: { 'x-admin-passcode': passcode } });
    setOrders((prev) => prev.filter((o) => o.orderNumber !== ref));
  }

  if (loading) return <p style={{ padding: 24, color: '#888' }}>Loading orders…</p>;

  return (
    <div>
      <h1 className="admin-page-title">Orders</h1>
      {orders.length === 0 ? (
        <div className="empty-state"><p>No orders yet.</p></div>
      ) : (
        <div>
          {orders.map((o) => {
            const date = o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-GB', { month: 'short', day: 'numeric', year: 'numeric' }) : '—';
            return (
              <div key={o.orderNumber} className="item-card">
                <div className="item-card-header">
                  <a href={`/admin/orders/${encodeURIComponent(o.orderNumber)}/`} className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary, #14432a)', textDecoration: 'none' }}>
                    {o.orderNumber}
                  </a>
                  <span className={`status-badge status-${o.status}`}>{o.status === 'payment-sent' ? 'Sent' : 'Pending'}</span>
                  <span className={`status-badge status-${o.channel}`}>{o.channel}</span>
                </div>
                <div className="item-card-name">{o.customerName}</div>
                <div className="item-card-meta">{o.customerEmail || o.customerPhone || 'No contact'} · {date}</div>
                <div className="item-card-footer">
                  <span className="item-card-amount">{money(o.amountDue)}</span>
                  <div className="action-row">
                    <a href={`/admin/orders/${encodeURIComponent(o.orderNumber)}/`} className="btn-sm">View</a>
                    <button onClick={() => handleDelete(o.orderNumber)} className="btn-danger">Delete</button>
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
