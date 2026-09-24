import PasscodeGate from '@/components/admin/PasscodeGate';
import './admin.css';

export const metadata = { title: 'Admin — Peak Pedal', robots: { index: false, follow: false } };

export default function AdminLayout({ children }) {
  return <PasscodeGate>{children}</PasscodeGate>;
}
