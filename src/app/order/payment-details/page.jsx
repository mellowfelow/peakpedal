'use client';

import React, { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { CONTACT } from '@/config/site';
import { money } from '@/lib/order';
import CopyField from '@/components/CopyField';
import '../../admin/admin.css';

function PaymentDetailsView() {
  const params = useSearchParams();
  const orderNumber = params.get('id') || '';

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!orderNumber) {
      setLoading(false);
      setError('This link is missing your order number — please use the link from your payment-details email.');
      return;
    }
    fetch(`/api/order/payment-details/?id=${encodeURIComponent(orderNumber)}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.ok) setData(d);
        else setError(d.error || 'Payment details not found.');
      })
      .catch(() => setError('Could not load payment details — check your connection and try again.'))
      .finally(() => setLoading(false));
  }, [orderNumber]);

  return (
    <div className="confirm-payment-shell">
      <div className="confirm-payment-card">
        <span className="confirm-payment-brand">Peak Pedal</span>
        <h1>Payment Details</h1>

        {loading && <p style={{ textAlign: 'center', color: 'var(--admin-text-faint)' }}>Loading…</p>}

        {!loading && error && <p className="error-text" style={{ textAlign: 'center' }}>{error}</p>}

        {!loading && data && (
          <>
            <p style={{ textAlign: 'center', fontSize: 14, color: 'var(--admin-text-soft)', marginBottom: 4 }}>
              Order <strong style={{ color: 'var(--admin-text)' }}>{data.orderNumber}</strong>
            </p>
            <p style={{ textAlign: 'center', fontSize: 28, fontWeight: 800, color: 'var(--admin-accent)', margin: '0 0 20px' }}>
              {money(data.amountDue)}
            </p>

            {data.paymentDetails?.opening && (
              <p style={{ fontSize: 14, color: 'var(--admin-text-soft)', marginBottom: 8 }}>{data.paymentDetails.opening}</p>
            )}

            <div className="payment-fields-list">
              {(data.paymentDetails?.fields || []).map((f) => (
                <CopyField key={f.label} label={f.label} value={f.value} />
              ))}
            </div>

            {data.paymentDetails?.closing && (
              <p style={{ fontSize: 14, color: 'var(--admin-text-soft)', marginTop: 8 }}>{data.paymentDetails.closing}</p>
            )}

            <p style={{ textAlign: 'center', fontSize: 11, color: 'var(--admin-text-faint)', marginTop: 24 }}>
              Tap any row above to copy it. Having trouble? Email{' '}
              <a href={`mailto:${CONTACT.email}`} style={{ color: 'var(--admin-accent)' }}>{CONTACT.email}</a> or WhatsApp {CONTACT.phone}.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default function PaymentDetailsPage() {
  return (
    <Suspense fallback={<div className="confirm-payment-shell" />}>
      <PaymentDetailsView />
    </Suspense>
  );
}
