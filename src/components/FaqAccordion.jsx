'use client';

import { useState } from 'react';

export default function FaqAccordion({ items }) {
  const [openIndex, setOpenIndex] = useState(null);

  function toggle(i) {
    setOpenIndex(openIndex === i ? null : i);
  }

  return (
    <div className="faq-accordion">
      {items.map((f, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={f.q} className={`faq-item${isOpen ? ' faq-item-open' : ''}`}>
            <button
              type="button"
              className="faq-trigger"
              aria-expanded={isOpen}
              onClick={() => toggle(i)}
            >
              <span>{f.q}</span>
              <svg
                className={`faq-chevron${isOpen ? ' faq-chevron-open' : ''}`}
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                aria-hidden="true"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
            <div className={`faq-panel${isOpen ? ' faq-panel-open' : ''}`}>
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
