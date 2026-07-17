'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { CONTACT } from '@/config/site';

export default function HeroSlider({ slides }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section className="hero hero-has-image">
      {slides.map((slide, i) => (
        <img
          key={slide.image}
          src={slide.image}
          alt=""
          className={`hero-bg ${i === active ? 'is-active' : ''}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          fetchPriority={i === 0 ? 'high' : 'auto'}
          aria-hidden="true"
        />
      ))}
      <div className="hero-overlay" />
      <div className="container hero-inner">
        <div>
          {slides.map((slide, i) => (
            <div key={slide.heading} className={`hero-slide-text ${i === active ? 'is-active' : ''}`} aria-hidden={i !== active}>
              <span className="hero-tag">{slide.tag}</span>
              {i === 0 ? <h1>{slide.heading}</h1> : <p className="hero-heading-fake">{slide.heading}</p>}
              <p style={{ fontSize: '1.1rem', maxWidth: 640 }}>{slide.body}</p>
            </div>
          ))}
          <div className="hero-cta">
            <Link href="/electric-mountain-bikes/" className="btn btn-accent">
              Shop All Bikes
            </Link>
            <a
              href={`https://wa.me/${CONTACT.whatsapp}`}
              className="btn btn-outline"
              style={{ borderColor: '#fff', color: '#fff' }}
            >
              Ask on WhatsApp
            </a>
          </div>
          {slides.length > 1 && (
            <div className="hero-dots" role="tablist" aria-label="Hero slides">
              {slides.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Show slide ${i + 1}`}
                  className={`hero-dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
