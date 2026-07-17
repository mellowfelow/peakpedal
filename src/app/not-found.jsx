import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section container text-center">
      <h1>Page Not Found</h1>
      <p className="muted">The page you're looking for doesn't exist or has moved.</p>
      <Link href="/electric-mountain-bikes/" className="btn btn-primary">Shop Electric Mountain Bikes</Link>
    </section>
  );
}
