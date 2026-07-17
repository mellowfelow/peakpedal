'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FORMS, CONTACT } from '@/config/site';

const KEY_PENDING = !FORMS.web3formsKey || FORMS.web3formsKey.startsWith('YOUR-');

export default function WebForm({ formName, subject, thankYouPath, destination, children }) {
  const router = useRouter();
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  function handleInput(e) {
    if (e.target.name === 'email') {
      const form = e.target.form;
      const replyto = form.elements.namedItem('replyto');
      if (replyto) replyto.value = e.target.value;
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setError('');

    if (KEY_PENDING) {
      router.push(thankYouPath);
      return;
    }

    setSubmitting(true);
    const form = e.target;
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      });
      const data = await res.json();
      if (res.status === 200 && data.success) {
        router.push(thankYouPath);
      } else {
        throw new Error(data.message || 'Submission failed');
      }
    } catch {
      setError(
        `Something went wrong sending your message. Please try again, or message us directly on WhatsApp.`
      );
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
      <input type="hidden" name="access_key" value={FORMS.web3formsKey} />
      <input type="hidden" name="subject" value={subject} />
      <input type="hidden" name="from_name" value="Peak Pedal website" />
      <input type="hidden" name="replyto" value="" />
      <input type="checkbox" name="botcheck" className="sr-only" tabIndex={-1} autoComplete="off" />
      {children}
      <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
        {submitting ? 'Sending…' : 'Send'}
      </button>
      {KEY_PENDING && (
        <p className="muted" style={{ fontSize: '0.8rem', marginTop: '0.5rem' }}>
          Note: email delivery isn’t configured yet — for a guaranteed reply, message us on WhatsApp instead.
        </p>
      )}
    </form>
  );
}
