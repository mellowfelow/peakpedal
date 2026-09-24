'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useAdminPasscode } from '@/lib/useAdminPasscode';
import { REPLY, CONTACT } from '@/config/site';
import { waPaymentDetailsLink, waPaymentDetailsMessage, waMessageText } from '@/lib/whatsapp';
import WhatsAppSendPanel from '@/components/admin/WhatsAppSendPanel';

const money = (n) => `${CONTACT.currencySymbol}${Number(n || 0).toLocaleString('en-GB')}`;

function SendPaymentEmailInner() {
  const { passcode } = useAdminPasscode();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('id') || '';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [methodId, setMethodId] = useState(REPLY.paymentMethods[0]?.id || '');
  const [detail, setDetail] = useState('');
  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  useEffect(() => {
    if (!passcode || !orderId) {
      setLoading(false);
      return;
    }
    fetch(`/api/admin/orders/${encodeURIComponent(orderId)}/`, { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => {
        setOrder(d.order || null);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [passcode, orderId]);

  async function handleSend(e) {
    e.preventDefault();
    setSending(true);
    setResult(null);
    try {
      const res = await fetch('/api/admin/send-payment-email/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-passcode': passcode },
        body: JSON.stringify({ orderId, methodId, detail }),
      });
      const data = await res.json();
      if (data.ok && data.sent) setResult({ type: 'success', text: 'Payment email sent.' });
      else if (data.ok) setResult({ type: 'warning', text: `Not emailed: ${data.reason || 'SMTP not configured'} — use WhatsApp instead.` });
      else setResult({ type: 'error', text: data.error || 'Failed to send.' });
    } catch {
      setResult({ type: 'error', text: 'Network error — try again.' });
    }
    setSending(false);
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

  const waLink = order.customerPhone
    ? waPaymentDetailsLink(order.customerPhone, { orderNumber: order.orderNumber, amountDue: order.amountDue, methodId, detail })
    : '';
  const waText = waMessageText(
    waPaymentDetailsMessage({ orderNumber: order.orderNumber, amountDue: order.amountDue, methodId, detail })
  );

  return (
    <div style={{ maxWidth: 640 }}>
      <div className="detail-header">
        <h1>Send payment details</h1>
        <p className="detail-meta">
          Order <strong>{order.orderNumber}</strong> — {order.customerName} ({order.customerEmail || 'no email'}) — {money(order.amountDue)}
        </p>
      </div>

      <form onSubmit={handleSend}>
        <div className="form-group">
          <label className="form-label">Payment method</label>
          <select value={methodId} onChange={(e) => setMethodId(e.target.value)} className="form-select">
            {REPLY.paymentMethods.map((m) => (
              <option key={m.id} value={m.id}>{m.label}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label className="form-label">Payment details</label>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            required
            rows={6}
            placeholder="Paste the bank transfer details for this order here."
            className="form-textarea mono"
          />
        </div>

        {result && <div className={`alert alert-${result.type}`}>{result.text}</div>}

        <button type="submit" disabled={sending || !order.customerEmail} className="btn-primary">
          {sending ? 'Sending…' : `Email ${order.customerEmail || '(no email on file)'}`}
        </button>
      </form>

      {waLink && <WhatsAppSendPanel link={waLink} messageText={waText} />}

      <div className="item-list">
        <h2 className="section-title">Order items</h2>
        {(order.items || []).map((item, i) => (
          <div key={i} className="item-row">
            <span>{item.qty} × {item.name}</span>
            <span>{money(item.priceLow * (item.qty || 1))}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SendPaymentEmailPage() {
  return (
    <Suspense fallback={<p style={{ padding: 24, color: '#888' }}>Loading…</p>}>
      <SendPaymentEmailInner />
    </Suspense>
  );
}
