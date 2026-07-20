'use client';

import { useMemo, useState } from 'react';
import ProductCard from './ProductCard';

const BIKE_PRICE_BANDS = [
  { label: 'Any price', test: () => true },
  { label: 'Under £2,500', test: (p) => p.priceLow < 2500 },
  { label: '£2,500 – £4,000', test: (p) => p.priceLow >= 2500 && p.priceLow < 4000 },
  { label: '£4,000 – £6,000', test: (p) => p.priceLow >= 4000 && p.priceLow < 6000 },
  { label: '£6,000+', test: (p) => p.priceLow >= 6000 },
];

const ACCESSORY_PRICE_BANDS = [
  { label: 'Any price', test: () => true },
  { label: 'Under £50', test: (p) => p.priceLow < 50 },
  { label: '£50 – £150', test: (p) => p.priceLow >= 50 && p.priceLow < 150 },
  { label: '£150 – £400', test: (p) => p.priceLow >= 150 && p.priceLow < 400 },
  { label: '£400+', test: (p) => p.priceLow >= 400 },
];

const SORTS = {
  featured: { label: 'Featured', fn: (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) },
  'price-asc': { label: 'Price: Low to High', fn: (a, b) => a.priceLow - b.priceLow },
  'price-desc': { label: 'Price: High to Low', fn: (a, b) => b.priceLow - a.priceLow },
  name: { label: 'Name: A to Z', fn: (a, b) => a.name.localeCompare(b.name) },
};

export default function ShopGrid({ products, defaultSort = 'featured', itemLabel = 'bike', itemLabelPlural, basePath = '/products' }) {
  const plural = itemLabelPlural || `${itemLabel}s`;
  const PRICE_BANDS = itemLabel === 'accessory' ? ACCESSORY_PRICE_BANDS : BIKE_PRICE_BANDS;
  const [brand, setBrand] = useState('all');
  const [category, setCategory] = useState('all');
  const [motor, setMotor] = useState('all');
  const [priceBand, setPriceBand] = useState(0);
  const [sort, setSort] = useState(defaultSort);

  const brands = useMemo(() => [...new Set(products.map((p) => p.brand))].sort(), [products]);
  const categories = useMemo(() => [...new Set(products.map((p) => p.category))].sort(), [products]);
  const motors = useMemo(() => [...new Set(products.map((p) => p.motor).filter(Boolean))].sort(), [products]);

  const filtered = useMemo(() => {
    let result = products.filter(
      (p) =>
        (brand === 'all' || p.brand === brand) &&
        (category === 'all' || p.category === category) &&
        (motor === 'all' || p.motor === motor) &&
        PRICE_BANDS[priceBand].test(p)
    );
    result = [...result].sort(SORTS[sort].fn);
    return result;
  }, [products, brand, category, motor, priceBand, sort]);

  const filtersActive = brand !== 'all' || category !== 'all' || motor !== 'all' || priceBand !== 0;

  function clearFilters() {
    setBrand('all');
    setCategory('all');
    setMotor('all');
    setPriceBand(0);
  }

  const showBrandFilter = brands.length > 1;
  const showCategoryFilter = categories.length > 1;
  const showMotorFilter = motors.length > 1;

  return (
    <div>
      {(showBrandFilter || showCategoryFilter || showMotorFilter || products.length > 1) && (
        <div className="filter-bar">
          {showCategoryFilter && (
            <div className="filter-field">
              <label htmlFor="filter-category">Type</label>
              <select id="filter-category" value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="all">All types</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
          )}
          {showBrandFilter && (
            <div className="filter-field">
              <label htmlFor="filter-brand">Brand</label>
              <select id="filter-brand" value={brand} onChange={(e) => setBrand(e.target.value)}>
                <option value="all">All brands</option>
                {brands.map((b) => (
                  <option key={b} value={b}>{b}</option>
                ))}
              </select>
            </div>
          )}
          {showMotorFilter && (
            <div className="filter-field">
              <label htmlFor="filter-motor">Motor</label>
              <select id="filter-motor" value={motor} onChange={(e) => setMotor(e.target.value)}>
                <option value="all">All motors</option>
                {motors.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>
          )}
          <div className="filter-field">
            <label htmlFor="filter-price">Price</label>
            <select id="filter-price" value={priceBand} onChange={(e) => setPriceBand(Number(e.target.value))}>
              {PRICE_BANDS.map((b, i) => (
                <option key={b.label} value={i}>{b.label}</option>
              ))}
            </select>
          </div>
          <div className="filter-field">
            <label htmlFor="filter-sort">Sort by</label>
            <select id="filter-sort" value={sort} onChange={(e) => setSort(e.target.value)}>
              {Object.entries(SORTS).map(([key, s]) => (
                <option key={key} value={key}>{s.label}</option>
              ))}
            </select>
          </div>
          {filtersActive && (
            <button type="button" className="btn btn-outline filter-clear" onClick={clearFilters}>
              Clear filters
            </button>
          )}
        </div>
      )}

      <p className="muted" style={{ marginTop: filtersActive || products.length > 1 ? '1rem' : 0 }}>
        {filtered.length} {filtered.length === 1 ? itemLabel : plural}
      </p>

      {filtered.length > 0 ? (
        <div className="grid grid-4">
          {filtered.map((p, i) => (
            <ProductCard key={p.slug} product={p} eager={i === 0} basePath={basePath} />
          ))}
        </div>
      ) : (
        <div className="card text-center">
          <p style={{ marginBottom: '1rem' }}>No {plural} match these filters.</p>
          <button type="button" className="btn btn-primary" onClick={clearFilters}>
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
