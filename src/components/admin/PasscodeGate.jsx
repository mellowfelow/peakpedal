'use client';

import React, { useEffect, useState } from 'react';
import { Lock } from 'lucide-react';

const STORAGE_KEY = 'pp-admin-passcode';

/** Reads the stored passcode from localStorage without triggering a network call. */
export function useAdminPasscode() {
  const [passcode, setPasscodeState] = useState(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setPasscodeState(stored);
    } catch {
      /* localStorage unavailable */
    }
  }, []);

  const setPasscode = (p) => {
    setPasscodeState(p);
    try {
      localStorage.setItem(STORAGE_KEY, p);
    } catch {
      /* ignore */
    }
  };

  const clearPasscode = () => {
    setPasscodeState(null);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  };

  return [passcode, setPasscode, clearPasscode];
}

export function PasscodeGate({ children }) {
  const [passcode, setPasscode, clearPasscode] = useAdminPasscode();
  const [input, setInput] = useState('');
  const [unlocked, setUnlocked] = useState(false);
  const [checking, setChecking] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    if (!passcode) return;
    setChecking(true);
    setServerError('');
    fetch('/api/admin/orders/', { headers: { 'x-admin-passcode': passcode } })
      .then((r) => {
        setUnlocked(r.ok);
        if (r.status === 503) setServerError('ADMIN_PASSCODE is not set on the server yet.');
      })
      .catch(() => setUnlocked(false))
      .finally(() => setChecking(false));
  }, [passcode]);

  if (passcode && checking) {
    return <div className="admin-checking">Checking passcode…</div>;
  }

  if (passcode && unlocked) {
    return children(passcode, clearPasscode);
  }

  return (
    <div className="admin-lock-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setPasscode(input);
        }}
        className="admin-gate"
      >
        <div className="admin-gate-icon">
          <Lock size={20} />
        </div>
        <h1>Admin Passcode</h1>
        <input
          type="password"
          required
          autoFocus
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter passcode"
          aria-label="Admin passcode"
        />
        {passcode && !unlocked && !checking && <p className="error">{serverError || 'Incorrect passcode.'}</p>}
        <button type="submit" className="btn-primary">Unlock</button>
      </form>
    </div>
  );
}
