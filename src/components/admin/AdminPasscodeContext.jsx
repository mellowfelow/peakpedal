'use client';

import React, { createContext, useContext } from 'react';

const AdminPasscodeContext = createContext(null);

export function AdminPasscodeProvider({ passcode, children }) {
  return <AdminPasscodeContext.Provider value={passcode}>{children}</AdminPasscodeContext.Provider>;
}

/** The verified admin passcode — only ever rendered inside app/admin/layout.jsx's unlocked branch. */
export function useAdminContextPasscode() {
  const passcode = useContext(AdminPasscodeContext);
  if (!passcode) throw new Error('useAdminContextPasscode() used outside AdminPasscodeProvider');
  return passcode;
}
