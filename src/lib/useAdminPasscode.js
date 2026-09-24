'use client';

// Client hook: verifies a passcode via /api/admin/verify, persists it in
// localStorage, auto-re-verifies on load, clears on logout.
import { useCallback, useEffect, useState } from 'react';

const LS_KEY = 'pp-admin-passcode';

export function useAdminPasscode() {
  const [passcode, setPasscode] = useState('');
  const [status, setStatus] = useState('checking'); // 'checking' | 'locked' | 'unlocked'
  const [error, setError] = useState('');

  const verify = useCallback(async (code) => {
    setError('');
    try {
      const res = await fetch('/api/admin/verify/', { headers: { 'x-admin-passcode': code } });
      if (res.ok) {
        setPasscode(code);
        setStatus('unlocked');
        try {
          localStorage.setItem(LS_KEY, code);
        } catch {}
        return true;
      }
      setError(res.status === 503 ? 'Admin dashboard is not configured yet.' : 'Incorrect passcode.');
      setStatus('locked');
      return false;
    } catch {
      setError('Could not reach the server. Try again.');
      setStatus('locked');
      return false;
    }
  }, []);

  const logout = useCallback(() => {
    setPasscode('');
    setStatus('locked');
    try {
      localStorage.removeItem(LS_KEY);
    } catch {}
  }, []);

  useEffect(() => {
    let saved = '';
    try {
      saved = localStorage.getItem(LS_KEY) || '';
    } catch {}
    if (saved) verify(saved);
    else setStatus('locked');
  }, [verify]);

  return { passcode, status, error, verify, logout };
}
