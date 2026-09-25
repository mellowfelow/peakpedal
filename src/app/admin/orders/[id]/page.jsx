'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { Trash2, Mail, MessageCircle, ArrowLeft } from 'lucide-react';
import { useAdminContextPasscode } from '@/components/admin/AdminPasscodeContext';
import { OrderStatusBadge } from '@/components/admin/StatusBadge';
import { money } from '@/lib/order';

export default function OrderDetailPage() {
  const passcode = useAdminContextPasscode();
  const params = useParams();
  const router = useRouter();
  const id = decodeURIComponent(String(params.id || ''));

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    fetch(`/api/admin/orders/${encodeURIComponent(id)}/`, { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => setOrder(d.order || null))
      .finally(() => setLoading(false));
  }, [id, passcode]);

  const handleDelete = async () => {
    if (!confirm(`Delete order ${id}? This can't be undone.`)) return;
    await fetch(`/api/admin/orders/${encodeURIComponent(id)}/`, { method: 'DELETE', headers: { 'x-admin-passcode': passcode } });
    router.push('/admin/orders/');
  };

  if (loading) return <p className="empty-state">Loading…</p>;
  if (!order) {
    return (
      <div>
        <p className="empty-state" style={{ marginBottom: 16 }}>Order {id} not found.</p>
        <Link href="/admin/orders/" className="back-link"><ArrowLeft size={14} /> Back to orders</Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <Link href="/admin/orders/" className="back-link"><ArrowLeft size={14} /> Back to orders</Link>

      <div className="detail-head">
        <div>
          <h1>{order.orderNumber}</h1>
          <div className="detail-meta">
            {new Date(order.createdAt).toLocaleString('en-GB')}
            <OrderStatusBadge status={order.status} />
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
              {order.channel === 'whatsapp' ? <MessageCircle size={12} /> : <Mail size={12} />}
              {order.channel}
            </span>
          </div>
        </div>
        <button onClick={handleDelete} className="icon-btn" aria-label="Delete order">
          <Trash2 size={16} />
        </button>
      </div>

      <div className="detail-grid">
        <div className="detail-card">
          <div className="detail-label">Customer</div>
          <div className="detail-value-strong">{order.customerName}</div>
          <div className="detail-value">{order.customerEmail}</div>
          {order.customerPhone && <div className="detail-value">{order.customerPhone}</div>}
          {order.address && <div className="detail-value" style={{ marginTop: 8 }}>{order.address}</div>}
        </div>
        <div className="detail-card">
          <div className="detail-label">Payment</div>
          <div className="detail-value-strong">{order.paymentMethod || '—'}</div>
          <div className="detail-amount">{money(order.amountDue)}</div>
        </div>
      </div>

      <div style={{ marginBottom: 24 }}>
        <div className="detail-label" style={{ marginBottom: 8 }}>Items</div>
        <table className="admin-table">
          <thead>
            <tr>
              <th>Item</th>
              <th style={{ textAlign: 'right' }}>Qty</th>
              <th style={{ textAlign: 'right' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {(order.items || []).map((item, i) => (
              <tr key={i}>
                <td>{item.name}</td>
                <td style={{ textAlign: 'right' }}>×{item.quantity}</td>
                <td style={{ textAlign: 'right', fontFamily: "'SF Mono','Fira Code',monospace" }}>{money(item.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {order.notes && (
        <div style={{ marginBottom: 24 }}>
          <div className="detail-label" style={{ marginBottom: 8 }}>Notes</div>
          <div className="detail-card">{order.notes}</div>
        </div>
      )}

      <Link href={`/admin/send-payment-email/?id=${encodeURIComponent(order.orderNumber)}`} className="btn-primary">
        {order.status === 'pending' ? 'Send payment details' : 'Resend payment details'}
      </Link>
      {order.status === 'payment-confirmed' && (
        <p style={{ color: '#34d399', fontSize: 12, marginTop: 12 }}>
          ✓ Customer uploaded a payment confirmation screenshot — check your email.
        </p>
      )}
    </div>
  );
}
