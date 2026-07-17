'use client';

export default function QtyStepper({ qty, onChange, min = 1, max = 10 }) {
  return (
    <div className="qty-stepper">
      <button type="button" aria-label="Decrease quantity" onClick={() => onChange(Math.max(min, qty - 1))}>
        −
      </button>
      <span>{qty}</span>
      <button type="button" aria-label="Increase quantity" onClick={() => onChange(Math.min(max, qty + 1))}>
        +
      </button>
    </div>
  );
}
