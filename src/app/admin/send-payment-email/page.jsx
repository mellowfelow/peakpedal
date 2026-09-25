'use client';

import React, { Suspense, useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { CheckCircle2, ArrowLeft } from 'lucide-react';
import { useAdminContextPasscode } from '@/components/admin/AdminPasscodeContext';
import { WhatsAppSendPanel } from '@/components/admin/WhatsAppSendPanel';
import { REPLY } from '@/config/site';
import { money, paymentMethodParts, paymentTermsLines, paymentFieldsFor, resolvePaymentFields } from '@/lib/order';
import { waPaymentDetailsLink, waPaymentDetailsMessage } from '@/lib/whatsapp';

function Composer() {
  const passcode = useAdminContextPasscode();
  const params = useSearchParams();
  const id = params.get('id') || '';

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [methodId, setMethodId] = useState(REPLY.paymentMethods[0]?.id || '');
  const [values, setValues] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) {
      setLoading(false);
      return;
    }
    fetch(`/api/admin/orders/${encodeURIComponent(id)}/`, { headers: { 'x-admin-passcode': passcode } })
      .then((r) => r.json())
      .then((d) => {
        setOrder(d.order || null);
        const matched = REPLY.paymentMethods.find((m) => m.label === d.order?.paymentMethod);
        if (matched) setMethodId(matched.id);
      })
      .finally(() => setLoading(false));
  }, [id, passcode]);

  // Reference field defaults to the order number — the admin can override it,
  // but shouldn't have to type it every time.
  useEffect(() => {
    if (order) setValues((v) => ({ ...v, reference: v.reference ?? order.orderNumber }));
  }, [order]);

  const fieldDefs = paymentFieldsFor(methodId);
  const resolvedFields = resolvePaymentFields(methodId, values);

  const send = async () => {
    if (resolvedFields.length === 0) {
      setError('Fill in at least one payment field before sending.');
      return;
    }
    setSending(true);
    setError('');
    try {
      const res = await fetch('/api/admin/send-payment-email/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-admin-passcode': passcode },
        body: JSON.stringify({ orderNumber: order.orderNumber, methodId, fields: values }),
      });
      const data = await res.json();
      if (data.ok) setSent(true);
      else setError(data.error || 'Send failed.');
    } catch {
      setError('Send failed — check your connection and try again.');
    } finally {
      setSending(false);
    }
  };

  if (loading) return <p className="empty-state">Loading…</p>;
  if (!order) {
    return (
      <div>
        <p className="empty-state" style={{ marginBottom: 16 }}>{id ? `Order ${id} not found.` : 'Open this page from an order.'}</p>
        <Link href="/admin/orders/" className="back-link"><ArrowLeft size={14} /> Back to orders</Link>
      </div>
    );
  }

  const { opening, closing } = paymentMethodParts(methodId, order.amountDue, order.orderNumber);

  return (
    <div style={{ maxWidth: 640 }}>
      <Link href={`/admin/orders/${encodeURIComponent(order.orderNumber)}/`} className="back-link"><ArrowLeft size={14} /> Back to order</Link>

      <h1 className="admin-page-title" style={{ marginBottom: 4 }}>Send Payment Details</h1>
      <p className="detail-meta" style={{ marginBottom: 24 }}>
        {order.orderNumber} · {order.customerName} · {order.customerEmail} · <strong style={{ color: 'var(--admin-accent)' }}>{money(order.amountDue)}</strong>
      </p>

      {sent ? (
        <div className="success-box">
          <CheckCircle2 size={32} />
          <p>Payment details sent to {order.customerEmail}.</p>
          <p className="sub">They'll see each field with its own copy button at the link in the email.</p>
        </div>
      ) : (
        <div>
          <div className="form-group">
            <label>Payment method</label>
            <select value={methodId} onChange={(e) => setMethodId(e.target.value)}>
              {REPLY.paymentMethods.map((m) => (
                <option key={m.id} value={m.id}>{m.label}</option>
              ))}
            </select>
          </div>

          {fieldDefs.map((f) => (
            <div className="form-group" key={f.key}>
              <label htmlFor={f.key}>{f.label}</label>
              <input
                id={f.key}
                type="text"
                className="mono"
                value={values[f.key] || ''}
                onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))}
                placeholder={`This order's real ${f.label.toLowerCase()}…`}
              />
            </div>
          ))}

          <div className="email-preview">
            <div className="email-preview-label">Email + copy-link preview</div>
            <p>{opening}</p>
            {resolvedFields.length === 0 ? (
              <pre>(fill in the fields above to preview)</pre>
            ) : (
              <div className="payment-fields-list" style={{ margin: '8px 0' }}>
                {resolvedFields.map((f) => (
                  <div key={f.label} style={{ display: 'flex', justifyContent: 'space-between', gap: 12, fontSize: 13, padding: '6px 0', borderBottom: '1px solid #e2e5df' }}>
                    <span style={{ color: '#6a746e', fontWeight: 700 }}>{f.label}</span>
                    <span style={{ fontFamily: "'SF Mono','Fira Code',monospace" }}>{f.value}</span>
                  </div>
                ))}
              </div>
            )}
            <p>{closing}</p>
            <ul style={{ margin: '8px 0 0', paddingLeft: 18, fontSize: 12 }}>
              {paymentTermsLines(order.orderNumber).map((l, i) => (
                <li key={i}>{l}</li>
              ))}
            </ul>
          </div>

          {error && <p className="error-text">{error}</p>}

          <button onClick={send} disabled={sending} className="btn-primary" style={{ width: '100%' }}>
            {sending ? 'Sending…' : `Email payment details to ${order.customerEmail}`}
          </button>
        </div>
      )}

      <div style={{ paddingTop: 24, marginTop: 24, borderTop: '1px solid var(--admin-border)' }}>
        <WhatsAppSendPanel
          phone={order.customerPhone}
          link={waPaymentDetailsLink(order.customerPhone, {
            orderNumber: order.orderNumber,
            amountDue: order.amountDue,
            fields: resolvedFields,
            opening,
            closing,
          })}
          messageLines={waPaymentDetailsMessage({
            orderNumber: order.orderNumber,
            amountDue: order.amountDue,
            fields: resolvedFields,
            opening,
            closing,
          })}
        />
      </div>
    </div>
  );
}

export default function SendPaymentEmailPage() {
  return (
    <Suspense fallback={<p className="empty-state">Loading…</p>}>
      <Composer />
    </Suspense>
  );
}
