import { Suspense } from 'react';
import SearchClient from '@/components/SearchClient';
import { SITE } from '@/config/site';

export const metadata = {
  title: 'Search',
  description: 'Search electric mountain bikes and buying guides at Peak Pedal.',
  alternates: { canonical: `https://${SITE.domain}/search/` },
};

export default function SearchPage() {
  return (
    <Suspense fallback={<section className="section container"><h1>Search</h1></section>}>
      <SearchClient />
    </Suspense>
  );
}
