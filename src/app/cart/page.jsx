import CartClient from '@/components/CartClient';

export const metadata = {
  title: 'Your Cart',
  robots: { index: false, follow: true },
};

export default function CartPage() {
  return <CartClient />;
}
