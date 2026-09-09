'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { CONTACT } from '@/config/site';

export default function HeroSlider({ slides }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || paused) return;
    // Respect the OS "reduce motion" setting — no auto-advancing carousel.
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)');
    if (reduce?.matches) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(id);
  }, [slides.length, paused]);

  return (
    <section className="hero hero-has-image">
      {slides.map((slide, i) => (
        <Image
          key={slide.image}
          src={slide.image}
          alt={slide.alt || ''}
          fill
          sizes="100vw"
          // Small pre-optimised webp (~250KB, sits behind a heavy scrim) — served
          // straight from the CDN with no on-request transform, which was the
          // source of the slow first paint on the low-traffic Hobby plan.
          unoptimized
          priority={i === 0}
          className={`hero-bg ${i === active ? 'is-active' : ''}`}
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
            <div className="hero-dots" role="group" aria-label="Hero slides">
              {slides.map((slide, i) => (
                <button
                  key={slide.image}
                  type="button"
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={i === active}
                  className={`hero-dot ${i === active ? 'is-active' : ''}`}
                  onClick={() => setActive(i)}
                />
              ))}
              <button
                type="button"
                className="hero-dot hero-dot-pause"
                aria-pressed={paused}
                aria-label={paused ? 'Resume slideshow' : 'Pause slideshow'}
                onClick={() => setPaused((v) => !v)}
              >
                {paused ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5v14l11-7z" /></svg>
                ) : (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M6 5h4v14H6zM14 5h4v14h-4z" /></svg>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
