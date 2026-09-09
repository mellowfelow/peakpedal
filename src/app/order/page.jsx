import CheckoutClient from '@/components/CheckoutClient';

export const metadata = {
  title: 'Checkout',
  description: 'Complete your electric mountain bike order — we confirm spec, final price and payment by email.',
  robots: { index: false, follow: true },
};

export default function OrderPage() {
  return <CheckoutClient />;
}
