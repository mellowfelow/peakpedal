'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAdminPasscode } from '@/lib/useAdminPasscode';
import { CONTACT } from '@/config/site';

const money = (n) => `${CONTACT.currencySymbol}${Number(n || 0).toLocaleString('en-GB')}`;

export default function OrderDetailPage() {
  const { passcode } = useAdminPasscode();
  const { id } = useParams();
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!passcode || !id) {
      setLoading(false);
      return;
    }
    fetch(`/api/admin/orders/${encodeURIComponent(id)}/`, { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => {
        setOrder(d.order || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [passcode, id]);

  async function handleDelete() {
    if (!confirm(`Delete order ${id}? This cannot be undone.`)) return;
    await fetch(`/api/admin/orders/${encodeURIComponent(id)}/`, { method: 'DELETE', headers: { 'x-admin-passcode': passcode } });
    router.push('/admin/orders/');
  }

  if (loading) return <p style={{ padding: 24, color: '#888' }}>Loading order…</p>;
  if (!order) {
    return (
      <div className="empty-state">
        <p>Order not found.</p>
        <a href="/admin/orders/" className="btn-sm" style={{ marginTop: 12, display: 'inline-block' }}>Back to orders</a>
      </div>
    );
  }

  const created = order.createdAt ? new Date(order.createdAt) : null;

  return (
    <div style={{ maxWidth: 720 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 8 }}>
        <div>
          <h1 className="admin-page-title" style={{ marginBottom: 4 }}>Order {order.orderNumber}</h1>
          <p className="detail-meta">
            {created ? created.toLocaleDateString('en-GB', { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—'}
            {' · '}
            <span className={`status-badge status-${order.status}`}>{order.status === 'payment-sent' ? 'Payment sent' : 'Pending'}</span>
            {' · '}
            <span className={`status-badge status-${order.channel}`}>{order.channel}</span>
          </p>
        </div>
        <button onClick={handleDelete} className="btn-danger" style={{ fontSize: 14 }}>Delete order</button>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-card-label">Customer</div>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>{order.customerName}</div>
          <div style={{ marginBottom: 4 }}>{order.customerEmail}</div>
          {order.customerPhone && <div style={{ marginBottom: 4 }}>{order.customerPhone}</div>}
          {order.address && <div style={{ color: '#666', marginTop: 8 }}>{order.address}</div>}
        </div>
        <div className="detail-card">
          <div className="detail-card-label">Total</div>
          <div style={{ fontSize: 24, fontWeight: 800 }}>{money(order.amountDue)}</div>
        </div>
      </div>

      <h2 className="section-title">Items</h2>
      <table className="admin-table" style={{ marginBottom: 24 }}>
        <thead>
          <tr>
            <th>Model</th>
            <th style={{ textAlign: 'right' }}>Qty</th>
            <th style={{ textAlign: 'right' }}>Price</th>
          </tr>
        </thead>
        <tbody>
          {(order.items || []).map((item, i) => (
            <tr key={i}>
              <td>{item.name}</td>
              <td style={{ textAlign: 'right' }}>{item.qty}</td>
              <td style={{ textAlign: 'right' }}>{money(item.priceLow * (item.qty || 1))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {order.notes && (
        <>
          <h2 className="section-title">Notes</h2>
          <div className="detail-card">{order.notes}</div>
        </>
      )}

      <div className="action-row" style={{ marginTop: 24 }}>
        <a href={`/admin/send-payment-email/?id=${encodeURIComponent(order.orderNumber)}`} className="btn-primary">
          {order.status === 'payment-sent' ? 'Resend payment email' : 'Send payment email'}
        </a>
        <a href="/admin/orders/" className="btn-sm">Back to orders</a>
      </div>
    </div>
  );
}
