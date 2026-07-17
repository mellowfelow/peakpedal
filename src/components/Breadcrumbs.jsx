import Link from 'next/link';

export default function Breadcrumbs({ items }) {
  return (
    <nav className="breadcrumbs container" aria-label="Breadcrumb">
      {items.map((item, i) => (
        <span key={item.href || item.label}>
          {i > 0 && ' / '}
          {item.href ? <Link href={item.href}>{item.label}</Link> : <span>{item.label}</span>}
        </span>
      ))}
    </nav>
  );
}

export function breadcrumbSchema(items, domain) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      item: `https://${domain}${item.href || ''}`,
    })),
  };
}
