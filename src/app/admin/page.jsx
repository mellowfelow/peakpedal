'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { PackageCheck, MessagesSquare, ArrowRight, MessageCircle, Mail } from 'lucide-react';
import { useAdminContextPasscode } from '@/components/admin/AdminPasscodeContext';
import { OrderStatusBadge } from '@/components/admin/StatusBadge';
import { money } from '@/lib/order';

export default function AdminHubPage() {
  const passcode = useAdminContextPasscode();
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const headers = { 'x-admin-passcode': passcode };
    Promise.all([
      fetch('/api/admin/orders/', { headers }).then((r) => r.json()),
      fetch('/api/admin/enquiries/', { headers }).then((r) => r.json()),
    ])
      .then(([o, e]) => {
        setOrders(o.orders || []);
        setEnquiries(e.enquiries || []);
      })
      .finally(() => setLoading(false));
  }, [passcode]);

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length;

  if (loading) return <p className="empty-state">Loading…</p>;

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="stat-grid">
        <Link href="/admin/orders/" className="stat-card">
          <div className="stat-card-head">
            <PackageCheck size={22} />
            <ArrowRight size={16} />
          </div>
          <div className="stat-number">{orders.length}</div>
          <div className="stat-label">
            Orders {pendingOrders > 0 && <span className="highlight"> · {pendingOrders} pending</span>}
          </div>
        </Link>

        <Link href="/admin/enquiries/" className="stat-card">
          <div className="stat-card-head">
            <MessagesSquare size={22} />
            <ArrowRight size={16} />
          </div>
          <div className="stat-number">{enquiries.length}</div>
          <div className="stat-label">
            Enquiries {newEnquiries > 0 && <span className="highlight"> · {newEnquiries} new</span>}
          </div>
        </Link>
      </div>

      <section style={{ marginBottom: 32 }}>
        <div className="section-title">
          <span>Recent orders</span>
          {orders.length > 5 && <Link href="/admin/orders/">View all {orders.length} →</Link>}
        </div>
        {orders.length === 0 ? (
          <p className="empty-state">No orders yet — they'll appear here once customers check out.</p>
        ) : (
          <div className="list-rows">
            {orders.slice(0, 5).map((o) => (
              <Link key={o.orderNumber} href={`/admin/orders/${encodeURIComponent(o.orderNumber)}/`} className="list-row">
                <div className="list-row-link">
                  <span className="row-title">{o.orderNumber}</span>
                  <span className="row-truncate">{o.customerName}</span>
                  <span className="row-amount">{money(o.amountDue)}</span>
                  <span className="row-channel" title={o.channel}>
                    {o.channel === 'whatsapp' ? <MessageCircle size={14} /> : <Mail size={14} />}
                  </span>
                </div>
                <OrderStatusBadge status={o.status} />
              </Link>
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="section-title">
          <span>Recent enquiries</span>
          {enquiries.length > 5 && <Link href="/admin/enquiries/">View all {enquiries.length} →</Link>}
        </div>
        {enquiries.length === 0 ? (
          <p className="empty-state">No enquiries yet — contact and wholesale submissions appear here.</p>
        ) : (
          <div className="list-rows">
            {enquiries.slice(0, 5).map((e) => (
              <Link key={e.id} href={`/admin/enquiries/${encodeURIComponent(e.id)}/`} className="list-row">
                <div className="list-row-link">
                  <span className="row-title" style={{ textTransform: 'capitalize' }}>{e.type}</span>
                  <span className="row-truncate">{e.name}</span>
                </div>
                <span className={`status-badge status-${e.status === 'new' ? 'new' : 'replied'}`}>{e.status}</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
