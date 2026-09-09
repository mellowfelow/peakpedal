'use client';

import { useEffect, useState } from 'react';

// Reads the order reference stashed by CheckoutClient just before the redirect.
// sessionStorage (not a query param) keeps it out of the URL, history and referrer.
export default function OrderRef() {
  const [ref, setRef] = useState(null);

  useEffect(() => {
    try {
      setRef(sessionStorage.getItem('pp-last-order'));
    } catch {
      setRef(null);
    }
  }, []);

  if (!ref) return null;

  return (
    <p className="order-ref">
      Your order reference is <strong>{ref}</strong> — quote it if you get in touch.
    </p>
  );
}
