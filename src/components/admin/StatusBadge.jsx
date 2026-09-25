import React from 'react';

const STYLES = {
  pending: 'status-pending',
  'payment-sent': 'status-sent',
  'payment-confirmed': 'status-confirmed',
};

const LABELS = {
  pending: 'Pending',
  'payment-sent': 'Details sent',
  'payment-confirmed': 'Confirmed',
};

export function OrderStatusBadge({ status, className = '' }) {
  return <span className={`status-badge ${STYLES[status]} ${className}`}>{LABELS[status]}</span>;
}
