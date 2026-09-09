'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FORMS, CONTACT } from '@/config/site';

const PROVIDER = FORMS.provider; // 'smtp' (Vercel env vars) | 'web3forms'
const WEB3FORMS_KEY_PENDING =
  PROVIDER === 'web3forms' && (!FORMS.web3formsKey || FORMS.web3formsKey.startsWith('YOUR-'));

export default function WebForm({
  formName,
  subject,
  thankYouPath,
  children,
  extraFields, // object merged into the POST payload (smtp provider) — e.g. the cart
  onSuccess, // called right before redirect (e.g. to clear the cart)
  submitLabel = 'Send',
}) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleInput(e) {
    if (e.target.name === 'email') {
      const replyto = e.target.form.elements.namedItem('replyto');
      if (replyto) replyto.value = e.target.value;
    }
  }

  function fail(message) {
    setError(message || 'Something went wrong sending your message. Please message us directly on WhatsApp.');
  }

  function done() {
    onSuccess?.();
    router.push(thankYouPath);
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');
    const form = e.target;

    if (WEB3FORMS_KEY_PENDING) {
      done();
      return;
    }

    setSubmitting(true);
    try {
      if (PROVIDER === 'smtp') {
        const fields = Object.fromEntries(new FormData(form).entries());
        const res = await fetch('/api/contact/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...fields, ...extraFields, formName, subject }),
        });
        const data = await res.json().catch(() => ({}));
        if (res.ok && data.success) done();
        else fail(data.message);
      } else {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(form),
        });
        const data = await res.json();
        if (res.status === 200 && data.success) done();
        else fail(data.message);
      }
    } catch {
      fail();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} onInput={handleInput} noValidate>
      {error && (
        <div className="form-error">
          {error}{' '}
          <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noopener noreferrer">
            Open WhatsApp
          </a>
        </div>
      )}
      {PROVIDER === 'web3forms' && (
        <>
          <input type="hidden" name="access_key" value={FORMS.web3formsKey} />
          <input type="hidden" name="from_name" value="Peak Pedal website" />
        </>
      )}
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="replyto" value="" />
      <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      {children}
      <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? 'Sending…' : submitLabel}
      </button>
      {WEB3FORMS_KEY_PENDING && (
        <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Note: email delivery isn’t configured yet — for a guaranteed reply, message us on WhatsApp instead.
        </p>
      )}
    </form>
  );
}
