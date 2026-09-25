'use client';

import React from 'react';
import { PasscodeGate } from '@/components/admin/PasscodeGate';
import { AdminNav } from '@/components/admin/AdminNav';
import { AdminPasscodeProvider } from '@/components/admin/AdminPasscodeContext';
import './admin.css';

export default function AdminLayout({ children }) {
  return (
    <PasscodeGate>
      {(passcode, signOut) => (
        <div className="admin-shell">
          <AdminNav onSignOut={signOut} />
          <div className="admin-content">
            <AdminPasscodeProvider passcode={passcode}>{children}</AdminPasscodeProvider>
          </div>
        </div>
      )}
    </PasscodeGate>
  );
}
