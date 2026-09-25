'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut } from 'lucide-react';

const LINKS = [
  { href: '/admin/', label: 'Dashboard' },
  { href: '/admin/orders/', label: 'Orders' },
  { href: '/admin/enquiries/', label: 'Enquiries' },
];

export function AdminNav({ onSignOut }) {
  const pathname = usePathname();
  return (
    <nav className="admin-nav">
      <div className="admin-nav-top">
        <span className="admin-nav-brand">Peak Pedal</span>
        <button onClick={onSignOut} className="admin-nav-signout">
          <LogOut size={14} /> Sign out
        </button>
      </div>
      <div className="admin-nav-links">
        {LINKS.map((l) => {
          const active = pathname === l.href;
          return (
            <Link key={l.href} href={l.href} className={`admin-nav-link ${active ? 'active' : ''}`}>
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
