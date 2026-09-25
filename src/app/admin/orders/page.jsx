'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, MessageCircle, Mail } from 'lucide-react';
import { useAdminContextPasscode } from '@/components/admin/AdminPasscodeContext';
import { OrderStatusBadge } from '@/components/admin/StatusBadge';
import { money } from '@/lib/order';

export default function OrdersPage() {
  const passcode = useAdminContextPasscode();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    fetch('/api/admin/orders/', { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []))
      .finally(() => setLoading(false));
  };

  useEffect(load, [passcode]);

  const deleteOrder = async (orderNumber, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!confirm(`Delete order ${orderNumber}? This can't be undone.`)) return;
    await fetch(`/api/admin/orders/${encodeURIComponent(orderNumber)}/`, {
      method: 'DELETE',
      headers: { 'x-admin-passcode': passcode },
    });
    load();
  };

  const deleteAll = async () => {
    if (!confirm(`Delete all ${orders.length} orders? This can't be undone.`)) return;
    await Promise.all(
      orders.map((o) =>
        fetch(`/api/admin/orders/${encodeURIComponent(o.orderNumber)}/`, {
          method: 'DELETE',
          headers: { 'x-admin-passcode': passcode },
        })
      )
    );
    load();
  };

  return (
    <div>
      <h1 className="admin-page-title">Orders</h1>

      {loading ? (
        <p className="empty-state">Loading…</p>
      ) : orders.length === 0 ? (
        <p className="empty-state">No orders yet.</p>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 12 }}>
            <button onClick={deleteAll} className="btn-danger">
              <Trash2 size={14} /> Delete all
            </button>
          </div>
          <div className="list-rows">
            {orders.map((o) => (
              <div key={o.orderNumber} className="list-row">
                <Link href={`/admin/orders/${encodeURIComponent(o.orderNumber)}/`} className="list-row-link">
                  <div>
                    <div className="row-title">{o.orderNumber}</div>
                    <div className="row-meta">{new Date(o.createdAt).toLocaleString('en-GB')}</div>
                  </div>
                  <div className="row-truncate">
                    {o.customerName}
                    <div className="row-meta row-truncate">{o.customerEmail}</div>
                  </div>
                  <div className="row-amount">{money(o.amountDue)}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <OrderStatusBadge status={o.status} />
                    <span className="row-channel" title={o.channel}>
                      {o.channel === 'whatsapp' ? <MessageCircle size={14} /> : <Mail size={14} />}
                    </span>
                  </div>
                </Link>
                <button onClick={(e) => deleteOrder(o.orderNumber, e)} className="icon-btn" aria-label={`Delete order ${o.orderNumber}`}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
