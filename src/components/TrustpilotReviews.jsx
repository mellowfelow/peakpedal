'use client';

import { useState, useEffect, useRef } from 'react';
import { REVIEW_STATS, REVIEWS } from '@/content/reviews';

export default function TrustpilotReviews() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedStar, setSelectedStar] = useState('all');
  const [viewMode, setViewMode] = useState('slider'); // 'slider' | 'grid'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isPaused, setIsPaused] = useState(false);
  const [helpfulLiked, setHelpfulLiked] = useState({});
  const [modalReview, setModalReview] = useState(null);
  const [mounted, setMounted] = useState(false);

  const sliderRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Determine responsive items per view
  useEffect(() => {
    setMounted(true);
    const updateItems = () => {
      const w = window.innerWidth;
      if (w < 640) {
        setItemsPerView(1);
      } else if (w < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };
    updateItems();
    window.addEventListener('resize', updateItems);
    return () => window.removeEventListener('resize', updateItems);
  }, []);

  // Filter reviews
  const filteredReviews = REVIEWS.filter((r) => {
    const matchesCategory = activeCategory === 'all' || r.category === activeCategory;
    const matchesStar = selectedStar === 'all' || r.stars === Number(selectedStar);
    return matchesCategory && matchesStar;
  });

  const totalItems = filteredReviews.length;
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  // Auto slide revolution timer
  useEffect(() => {
    if (viewMode !== 'slider' || isPaused || maxIndex <= 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [viewMode, isPaused, maxIndex]);

  // Adjust index if out of bounds after filter change
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(0);
    }
  }, [maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const diff = touchStartX.current - touchEndX.current;
    if (diff > 45) handleNext();
    if (diff < -45) handlePrev();
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const toggleHelpful = (id) => {
    setHelpfulLiked((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <section className="section tp-reviews-section" id="reviews">
      <div className="container">
        <div style={{ marginBottom: '1.75rem' }}>
          <span className="section-eyebrow">Customer Feedback &amp; Ratings</span>
          <h2>Rated Excellent on Trustpilot</h2>
        </div>

        {/* Trustpilot Brand Header */}
        <div className="tp-header-card">
          <div className="tp-header-left">
            <div className="tp-logo-line">
              <span className="tp-star-icon">
                <TrustpilotStarIcon />
              </span>
              <span className="tp-logo-text">Trustpilot</span>
            </div>
            <div className="tp-score-row">
              <span className="tp-score-label">{REVIEW_STATS.ratingLabel}</span>
              <div className="tp-stars-group">
                <TrustpilotStarBoxes stars={5} size={28} />
              </div>
            </div>
            <p className="tp-score-detail">
              TrustScore <strong>{REVIEW_STATS.trustScore}</strong> out of 5 &nbsp;|&nbsp; Based on{' '}
              <strong>{REVIEW_STATS.totalReviews.toLocaleString()} reviews</strong>
            </p>
            <div className="tp-badge-row">
              <span className="tp-verified-badge">
                <CheckIcon /> Verified UK Retailer
              </span>
              <span className="tp-badge-pill">100% Genuine Customer Feedback</span>
            </div>
          </div>

          {/* Star Distribution Bars */}
          <div className="tp-rating-bars">
            <div className="tp-bars-header">
              <span>Rating Breakdown</span>
              <button
                type="button"
                onClick={() => {
                  setSelectedStar('all');
                  setActiveCategory('all');
                }}
                className="tp-reset-filter"
              >
                Reset filters
              </button>
            </div>
            {REVIEW_STATS.distribution.map((d) => (
              <button
                key={d.stars}
                type="button"
                className={`tp-bar-row ${selectedStar === String(d.stars) ? 'active' : ''}`}
                onClick={() => {
                  setSelectedStar(selectedStar === String(d.stars) ? 'all' : String(d.stars));
                  setCurrentIndex(0);
                }}
                aria-label={`Filter by ${d.stars} star reviews (${d.count})`}
              >
                <span className="tp-bar-label">{d.stars} star</span>
                <div className="tp-bar-track">
                  <div
                    className="tp-bar-fill"
                    style={{
                      width: `${d.percentage}%`,
                      backgroundColor: d.stars >= 4 ? '#00b67a' : d.stars === 3 ? '#ffce00' : '#ff8622',
                    }}
                  />
                </div>
                <span className="tp-bar-pct">{d.percentage}%</span>
              </button>
            ))}
          </div>
        </div>

        {/* Filters & Carousel Controls Bar */}
        <div className="tp-controls-bar">
          <div className="tp-category-filters" role="tablist" aria-label="Review Categories">
            {REVIEW_STATS.categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat.id}
                className={`tp-filter-pill ${activeCategory === cat.id ? 'active' : ''}`}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setCurrentIndex(0);
                }}
              >
                {cat.label}
                <span className="tp-pill-count">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="tp-view-toggle">
            <button
              type="button"
              className={`tp-view-btn ${viewMode === 'slider' ? 'active' : ''}`}
              onClick={() => setViewMode('slider')}
              title="Slider Revolution View"
              aria-label="Slider Revolution View"
            >
              <SliderIcon /> Slider
            </button>
            <button
              type="button"
              className={`tp-view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              onClick={() => setViewMode('grid')}
              title="Full Grid View"
              aria-label="Full Grid View"
            >
              <GridIcon /> Grid
            </button>
          </div>
        </div>

        {/* Active Filters Display */}
        {(selectedStar !== 'all' || activeCategory !== 'all') && (
          <div className="tp-active-filter-banner">
            <span>
              Showing {filteredReviews.length} reviews{' '}
              {selectedStar !== 'all' ? `with ${selectedStar} Stars` : ''}{' '}
              {activeCategory !== 'all' ? `in ${REVIEW_STATS.categories.find((c) => c.id === activeCategory)?.label}` : ''}
            </span>
            <button
              type="button"
              className="tp-clear-btn"
              onClick={() => {
                setSelectedStar('all');
                setActiveCategory('all');
                setCurrentIndex(0);
              }}
            >
              Clear All &times;
            </button>
          </div>
        )}

        {/* Slider Revolution Carousel or Grid */}
        {filteredReviews.length === 0 ? (
          <div className="tp-no-reviews">
            <p>No reviews match your selected filter criteria.</p>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setSelectedStar('all');
                setActiveCategory('all');
                setCurrentIndex(0);
              }}
            >
              Show All Reviews
            </button>
          </div>
        ) : viewMode === 'slider' ? (
          <div
            className="tp-slider-revolution-wrap"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            ref={sliderRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Nav Arrows */}
            {maxIndex > 0 && (
              <>
                <button
                  type="button"
                  className="tp-nav-arrow tp-nav-prev"
                  onClick={handlePrev}
                  aria-label="Previous reviews"
                >
                  &#10094;
                </button>
                <button
                  type="button"
                  className="tp-nav-arrow tp-nav-next"
                  onClick={handleNext}
                  aria-label="Next reviews"
                >
                  &#10095;
                </button>
              </>
            )}

            {/* Slider Track with multi-item responsive offset */}
            <div className="tp-slider-track-container">
              <div
                className="tp-slider-track"
                style={{
                  transform: `translateX(-${currentIndex * (100 / (mounted ? itemsPerView : 3))}%)`,
                  transition: 'transform 0.45s cubic-bezier(0.25, 1, 0.5, 1)',
                }}
              >
                {filteredReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="tp-slide-item"
                    style={{
                      flex: `0 0 ${100 / (mounted ? itemsPerView : 3)}%`,
                      maxWidth: `${100 / (mounted ? itemsPerView : 3)}%`,
                    }}
                  >
                    <ReviewCard
                      review={rev}
                      isLiked={helpfulLiked[rev.id]}
                      onToggleHelpful={() => toggleHelpful(rev.id)}
                      onExpand={() => setModalReview(rev)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Pagination & Indicator */}
            {maxIndex > 0 && (
              <div className="tp-slider-pagination">
                <div className="tp-dots">
                  {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      className={`tp-dot ${idx === currentIndex ? 'active' : ''}`}
                      onClick={() => setCurrentIndex(idx)}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
                <span className="tp-slide-counter">
                  {currentIndex + 1} / {maxIndex + 1}
                </span>
              </div>
            )}
          </div>
        ) : (
          <div className="tp-grid-view">
            {filteredReviews.map((rev) => (
              <ReviewCard
                key={rev.id}
                review={rev}
                isLiked={helpfulLiked[rev.id]}
                onToggleHelpful={() => toggleHelpful(rev.id)}
                onExpand={() => setModalReview(rev)}
              />
            ))}
          </div>
        )}

        {/* Footer Guarantee Trust Box */}
        <div className="tp-footer-trust-strip">
          <div className="tp-strip-item">
            <span className="tp-strip-icon">&#10003;</span>
            <div>
              <strong>100% Genuine UK Riders</strong>
              <p>Verified purchase orders tracked by serial number</p>
            </div>
          </div>
          <div className="tp-strip-item">
            <span className="tp-strip-icon">&#9874;</span>
            <div>
              <strong>Pre-Delivery Inspection (PDI)</strong>
              <p>Every eMTB unpacked, torqued &amp; tested before dispatch</p>
            </div>
          </div>
          <div className="tp-strip-item">
            <span className="tp-strip-icon">&#9742;</span>
            <div>
              <strong>Direct WhatsApp Support</strong>
              <p>Rider-to-rider technical advice within 15 minutes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Full Review Modal */}
      {modalReview && (
        <div className="tp-modal-backdrop" onClick={() => setModalReview(null)}>
          <div className="tp-modal-content" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="tp-modal-close"
              onClick={() => setModalReview(null)}
              aria-label="Close review dialog"
            >
              &times;
            </button>
            <div className="tp-modal-header">
              <div className="tp-modal-author-avatar">
                {modalReview.author.charAt(0)}
              </div>
              <div>
                <h4 className="tp-modal-author">{modalReview.author}</h4>
                <span className="tp-author-location">{modalReview.location}</span>
              </div>
            </div>

            <div className="tp-card-rating-line" style={{ marginTop: '0.75rem' }}>
              <TrustpilotStarBoxes stars={modalReview.stars} size={22} />
              <span className="tp-verified-badge-sm">
                <CheckIcon /> Verified Order
              </span>
              <span className="tp-card-date">{modalReview.date}</span>
            </div>

            {modalReview.product && (
              <div className="tp-card-product" style={{ marginTop: '0.75rem' }}>
                <span className="tp-product-label">Item:</span> {modalReview.product}
              </div>
            )}

            <h3 className="tp-modal-title">{modalReview.title}</h3>
            <p className="tp-modal-body">{modalReview.body}</p>

            {modalReview.response && (
              <div className="tp-card-response" style={{ marginTop: '1.25rem' }}>
                <div className="tp-response-header">
                  <strong>{modalReview.response.author}</strong>
                  <span>{modalReview.response.date}</span>
                </div>
                <p className="tp-response-text">{modalReview.response.body}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
}

function ReviewCard({ review, isLiked, onToggleHelpful, onExpand }) {
  return (
    <div className="tp-review-card">
      {/* Author Bar */}
      <div className="tp-card-author-row">
        <div className="tp-card-author-info">
          <div className="tp-avatar">{review.author.charAt(0)}</div>
          <div>
            <div className="tp-author-name">{review.author}</div>
            <div className="tp-author-meta">
              <span className="tp-author-loc">{review.location}</span>
            </div>
          </div>
        </div>
        {review.verified && (
          <span className="tp-verified-badge-sm" title="Verified Customer Purchase">
            <CheckIcon /> Verified
          </span>
        )}
      </div>

      {/* Star Rating & Date */}
      <div className="tp-card-rating-line">
        <TrustpilotStarBoxes stars={review.stars} size={20} />
        <span className="tp-card-date">{review.date}</span>
      </div>

      {/* Product Tag */}
      {review.product && (
        <div className="tp-card-product">
          <span className="tp-product-label">Item:</span> {review.product}
        </div>
      )}

      {/* Review Content */}
      <h3 className="tp-card-title" onClick={onExpand}>
        {review.title}
      </h3>
      <p className="tp-card-body">{review.body}</p>

      {/* Response Box (if any) */}
      {review.response && (
        <div className="tp-card-response">
          <div className="tp-response-header">
            <strong>Response from {review.response.author}</strong>
            <span className="tp-response-date">{review.response.date}</span>
          </div>
          <p className="tp-response-text">{review.response.body}</p>
        </div>
      )}

      {/* Helpful Action Bar */}
      <div className="tp-card-footer">
        <button
          type="button"
          className={`tp-helpful-btn ${isLiked ? 'liked' : ''}`}
          onClick={onToggleHelpful}
          aria-label="Mark review as helpful"
        >
          <ThumbsUpIcon />
          <span>Helpful ({review.helpfulCount + (isLiked ? 1 : 0)})</span>
        </button>
        <button type="button" className="tp-read-more" onClick={onExpand}>
          Read details &rarr;
        </button>
      </div>
    </div>
  );
}

// 5-Square Trustpilot Star Visual
function TrustpilotStarBoxes({ stars = 5, size = 20 }) {
  const total = 5;
  const starColors = {
    5: '#00b67a',
    4: '#00b67a',
    3: '#ffce00',
    2: '#ff8622',
    1: '#ff3722',
  };

  const activeColor = starColors[stars] || '#00b67a';

  return (
    <div className="tp-stars-container" aria-label={`${stars} out of 5 stars`}>
      {Array.from({ length: total }).map((_, i) => {
        const isFilled = i < stars;
        return (
          <div
            key={i}
            className="tp-star-box"
            style={{
              width: size,
              height: size,
              backgroundColor: isFilled ? activeColor : '#dcdce6',
            }}
          >
            <svg
              width={size * 0.65}
              height={size * 0.65}
              viewBox="0 0 24 24"
              fill="#ffffff"
              aria-hidden="true"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
          </div>
        );
      })}
    </div>
  );
}

function TrustpilotStarIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="#00b67a" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function ThumbsUpIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
    </svg>
  );
}

function SliderIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <line x1="8" y1="7" x2="8" y2="17" />
    </svg>
  );
}

function GridIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </svg>
  );
}
