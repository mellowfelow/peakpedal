'use client';

import { useEffect, useState } from 'react';
import { useAdminPasscode } from '@/lib/useAdminPasscode';
import { CONTACT } from '@/config/site';

const money = (n) => `${CONTACT.currencySymbol}${Number(n || 0).toLocaleString('en-GB')}`;

function useFetch(url, passcode) {
  const [data, setData] = useState(null);
  useEffect(() => {
    if (!passcode) return;
    fetch(url, { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then(setData)
      .catch(() => {});
  }, [url, passcode]);
  return data;
}

export default function AdminDashboard() {
  const { passcode } = useAdminPasscode();
  const [orders, setOrders] = useState([]);
  const [enquiries, setEnquiries] = useState([]);
  const ordersData = useFetch('/api/admin/orders/', passcode);
  const enquiriesData = useFetch('/api/admin/enquiries/', passcode);

  useEffect(() => {
    if (ordersData?.orders) setOrders(ordersData.orders);
  }, [ordersData]);
  useEffect(() => {
    if (enquiriesData?.enquiries) setEnquiries(enquiriesData.enquiries);
  }, [enquiriesData]);

  const pendingOrders = orders.filter((o) => o.status === 'pending').length;
  const newEnquiries = enquiries.filter((e) => e.status === 'new').length;

  async function deleteOrder(ref) {
    if (!confirm(`Delete order ${ref}?`)) return;
    await fetch(`/api/admin/orders/${encodeURIComponent(ref)}/`, { method: 'DELETE', headers: { 'x-admin-passcode': passcode } });
    setOrders((prev) => prev.filter((o) => o.orderNumber !== ref));
  }

  async function deleteEnquiry(id) {
    if (!confirm(`Delete enquiry ${id}?`)) return;
    await fetch(`/api/admin/enquiries/${encodeURIComponent(id)}/`, { method: 'DELETE', headers: { 'x-admin-passcode': passcode } });
    setEnquiries((prev) => prev.filter((e) => e.id !== id));
  }

  return (
    <div>
      <h1 className="admin-page-title">Dashboard</h1>

      <div className="stat-grid">
        <a href="/admin/orders/" className="stat-card">
          <div className="number">{orders.length}</div>
          <div className="label">Total orders</div>
          {pendingOrders > 0 && <span className="status-badge status-pending" style={{ marginTop: 8, display: 'inline-block' }}>{pendingOrders} pending</span>}
        </a>
        <a href="/admin/enquiries/" className="stat-card">
          <div className="number">{enquiries.length}</div>
          <div className="label">Total enquiries</div>
          {newEnquiries > 0 && <span className="status-badge status-new" style={{ marginTop: 8, display: 'inline-block' }}>{newEnquiries} new</span>}
        </a>
      </div>

      <h2 className="section-title">Recent orders</h2>
      {orders.length === 0 ? (
        <div className="empty-state"><p>No orders yet — they'll appear here once customers check out.</p></div>
      ) : (
        <div>
          {orders.slice(0, 5).map((o) => {
            const date = o.createdAt ? new Date(o.createdAt).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }) : '—';
            return (
              <div key={o.orderNumber} className="item-card">
                <div className="item-card-header">
                  <a href={`/admin/orders/${encodeURIComponent(o.orderNumber)}/`} className="mono" style={{ fontSize: 13, fontWeight: 700, color: 'var(--color-primary, #14432a)', textDecoration: 'none' }}>
                    {o.orderNumber}
                  </a>
                  <span className={`status-badge status-${o.status}`}>{o.status === 'payment-sent' ? 'Sent' : 'Pending'}</span>
                </div>
                <div className="item-card-name">{o.customerName}</div>
                <div className="item-card-footer">
                  <span className="item-card-amount">{money(o.amountDue)}</span>
                  <div className="action-row">
                    <span style={{ fontSize: 12, color: '#aaa' }}>{date}</span>
                    <button onClick={() => deleteOrder(o.orderNumber)} className="btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
          {orders.length > 5 && (
            <a href="/admin/orders/" style={{ display: 'block', textAlign: 'center', fontSize: 13, color: 'var(--color-primary, #14432a)', marginTop: 8 }}>
              View all {orders.length} orders →
            </a>
          )}
        </div>
      )}

      <h2 className="section-title" style={{ marginTop: 32 }}>Recent enquiries</h2>
      {enquiries.length === 0 ? (
        <div className="empty-state"><p>No enquiries yet — contact and wholesale form submissions appear here.</p></div>
      ) : (
        <div>
          {enquiries.slice(0, 5).map((e) => {
            const date = e.createdAt ? new Date(e.createdAt).toLocaleDateString('en-GB', { month: 'short', day: 'numeric' }) : '—';
            return (
              <div key={e.id} className="item-card">
                <div className="item-card-header">
                  <span className="status-badge status-email" style={{ textTransform: 'capitalize' }}>{e.type}</span>
                  <span className={`status-badge status-${e.status}`}>{e.status}</span>
                </div>
                <div className="item-card-name">{e.name}</div>
                {e.message && <p className="item-card-preview">{e.message}</p>}
                <div className="item-card-footer">
                  <a href={`/admin/enquiries/${encodeURIComponent(e.id)}/`} className="btn-sm">View</a>
                  <div className="action-row">
                    <span style={{ fontSize: 12, color: '#aaa' }}>{date}</span>
                    <button onClick={() => deleteEnquiry(e.id)} className="btn-danger">Delete</button>
                  </div>
                </div>
              </div>
            );
          })}
          {enquiries.length > 5 && (
            <a href="/admin/enquiries/" style={{ display: 'block', textAlign: 'center', fontSize: 13, color: 'var(--color-primary, #14432a)', marginTop: 8 }}>
              View all {enquiries.length} enquiries →
            </a>
          )}
        </div>
      )}
    </div>
  );
}
