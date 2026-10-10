"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import AvatarIcon from "./AvatarIcon";
import ReviewModal from "./ReviewModal";
import ScrollReveal from "./ScrollReveal";
import { ReviewItem } from "@/types/hotel";
import { reviewService } from "@/services/reviewService";
import { useToast } from "@/hooks/useToast";

interface ReviewSectionProps {
  initialReviews?: ReviewItem[];
}

interface ResponsiveMetrics {
  cardWidth: number;
  step: number;
  cardHeight: number;
}

export default function ReviewSection({ initialReviews = [] }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isWriteModalOpen, setIsWriteModalOpen] = useState(false);
  const [selectedReviewForModal, setSelectedReviewForModal] = useState<ReviewItem | null>(null);

  // Drag & Swipe gesture state
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const pointerDownPos = useRef<{ x: number; y: number } | null>(null);
  const isHorizontalGesture = useRef<boolean | null>(null);
  const hasDraggedFar = useRef(false);
  const lastWheelTime = useRef(0);

  // Responsive stage measurement
  const stageRef = useRef<HTMLDivElement>(null);
  const [metrics, setMetrics] = useState<ResponsiveMetrics>({
    cardWidth: 360,
    step: 260,
    cardHeight: 225,
  });

  // Hook for user feedback toast
  const { toast, showToast } = useToast();

  // Fetch reviews from service layer on mount
  const fetchReviews = useCallback(async () => {
    try {
      setIsLoading(true);
      const data = await reviewService.getReviews();
      if (Array.isArray(data.reviews) && data.reviews.length > 0) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  // Compute responsive layout metrics to keep everything compact and scale according to screen size
  const updateMetrics = useCallback(() => {
    if (!stageRef.current) return;
    const width = stageRef.current.clientWidth;

    if (width < 360) {
      // Small mobile (320px - 359px): card takes ~68% of screen, leaving ~51px on each side for stack cards
      const cardWidth = Math.round(width * 0.68);
      setMetrics({
        cardWidth,
        step: Math.round(cardWidth * 0.70),
        cardHeight: 225,
      });
    } else if (width < 440) {
      // Standard mobile (360px - 439px): card takes ~65% of screen, leaving ~65px on each side for stack cards
      const cardWidth = Math.round(width * 0.65);
      setMetrics({
        cardWidth,
        step: Math.round(cardWidth * 0.72),
        cardHeight: 228,
      });
    } else if (width < 640) {
      // Large mobile (440px - 639px)
      const cardWidth = Math.round(width * 0.60);
      setMetrics({
        cardWidth,
        step: Math.round(cardWidth * 0.74),
        cardHeight: 228,
      });
    } else if (width < 768) {
      // Phablet (640px - 767px)
      const cardWidth = 315;
      setMetrics({
        cardWidth,
        step: 230,
        cardHeight: 225,
      });
    } else if (width < 1024) {
      // Tablet (768px - 1023px)
      const cardWidth = 345;
      setMetrics({
        cardWidth,
        step: 255,
        cardHeight: 225,
      });
    } else if (width < 1440) {
      // Laptop & Desktop (1024px - 1439px)
      const cardWidth = 365;
      setMetrics({
        cardWidth,
        step: 270,
        cardHeight: 225,
      });
    } else {
      // Wide Screen (1440px+)
      const cardWidth = 380;
      setMetrics({
        cardWidth,
        step: 280,
        cardHeight: 230,
      });
    }
  }, []);

  useEffect(() => {
    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, [updateMetrics]);

  // Navigation handlers
  const numReviews = reviews.length;

  const navigatePrev = useCallback(() => {
    if (numReviews <= 1) return;
    setActiveIndex((prev) => (prev - 1 + numReviews) % numReviews);
  }, [numReviews]);

  const navigateNext = useCallback(() => {
    if (numReviews <= 1) return;
    setActiveIndex((prev) => (prev + 1) % numReviews);
  }, [numReviews]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigatePrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateNext();
      } else if (e.key === "Home") {
        e.preventDefault();
        setActiveIndex(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setActiveIndex(numReviews - 1);
      }
    },
    [navigatePrev, navigateNext, numReviews]
  );

  // Trackpad / Horizontal wheel navigation
  const handleWheel = useCallback(
    (e: React.WheelEvent) => {
      if (numReviews <= 1) return;
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 20) {
        const now = Date.now();
        if (now - lastWheelTime.current > 360) {
          lastWheelTime.current = now;
          if (e.deltaX > 0) {
            navigateNext();
          } else {
            navigatePrev();
          }
        }
      }
    },
    [numReviews, navigateNext, navigatePrev]
  );

  // Unified Pointer & Drag gestures
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;

    pointerDownPos.current = { x: e.clientX, y: e.clientY };
    isHorizontalGesture.current = null;
    hasDraggedFar.current = false;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointerDownPos.current) return;

    const deltaX = e.clientX - pointerDownPos.current.x;
    const deltaY = e.clientY - pointerDownPos.current.y;

    if (isHorizontalGesture.current === null) {
      const absX = Math.abs(deltaX);
      const absY = Math.abs(deltaY);

      if (absX > 6 || absY > 6) {
        if (absY > absX * 1.3) {
          // Vertical page scroll detected: cancel horizontal drag
          pointerDownPos.current = null;
          setIsDragging(false);
          setDragOffset(0);
          return;
        } else {
          // Horizontal gesture confirmed
          isHorizontalGesture.current = true;
          hasDraggedFar.current = true;
          setIsDragging(true);
        }
      }
    }

    if (isHorizontalGesture.current) {
      setDragOffset(deltaX);
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!pointerDownPos.current) return;

    if (hasDraggedFar.current && metrics.step > 0) {
      const deltaX = e.clientX - pointerDownPos.current.x;
      const threshold = Math.min(45, metrics.cardWidth * 0.15);
      if (deltaX > threshold) {
        navigatePrev();
      } else if (deltaX < -threshold) {
        navigateNext();
      }
    }

    pointerDownPos.current = null;
    isHorizontalGesture.current = null;
    setIsDragging(false);
    setDragOffset(0);

    // Keep hasDraggedFar true briefly to prevent accidental click on card after drag
    setTimeout(() => {
      hasDraggedFar.current = false;
    }, 100);
  };

  const handlePointerCancel = () => {
    pointerDownPos.current = null;
    isHorizontalGesture.current = null;
    setIsDragging(false);
    setDragOffset(0);
    hasDraggedFar.current = false;
  };

  // Click card to bring it to center
  const handleCardClick = (index: number) => {
    if (hasDraggedFar.current) return;
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  // Handle new review submission from ReviewModal
  const handleReviewSubmitted = (newReview: ReviewItem) => {
    setReviews((prev) => [newReview, ...prev]);
    setActiveIndex(0);
    showToast("Thank you! Your review has been added.");
  };

  // Lock body scroll when review detail modal is active
  useEffect(() => {
    if (selectedReviewForModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedReviewForModal]);

  return (
    <section
      id="reviews"
      className="py-7 sm:py-9 bg-stone-50/70 border-t border-b border-stone-200/80 relative overflow-hidden select-none"
    >
      {/* Toast Notification */}
      {toast && (
        <div
          role="status"
          aria-live="polite"
          className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 border animate-in slide-in-from-bottom-2 duration-200 ${
            toast.type === "error"
              ? "bg-rose-900 text-white border-rose-700"
              : "bg-stone-900 text-white border-stone-800"
          }`}
        >
          <span>{toast.type === "error" ? "⚠️" : "✅"}</span>
          <span>{toast.text}</span>
        </div>
      )}

      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        {/* Compact Header: Title + Rating Tag on left, Actions & Arrow Controls on right */}
        <ScrollReveal variant="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-5">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-[10.5px] font-bold tracking-wider uppercase">
                  <span>⭐</span>
                  <span>Home Stay Reviews</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span>★ 4.9</span>
                  <span>• Highly Rated</span>
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight">
                Loved by Pilgrims &amp; Homestay Guests
              </h2>
            </div>

            {/* Action Row: Write Review Button */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
              <button
                type="button"
                onClick={() => setIsWriteModalOpen(true)}
                className="px-4 py-2 rounded-full bg-stone-900 hover:bg-amber-900 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer butter-touch"
              >
                <span>✍️ Write a Review</span>
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Carousel Container */}
        {isLoading && reviews.length === 0 ? (
          /* Compact Skeleton Loader */
          <div className="relative w-full h-[240px] flex items-center justify-center py-2">
            <div className="w-[320px] sm:w-[350px] h-[220px] bg-white rounded-2xl border border-stone-200 shadow-xs animate-pulse p-4 space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-stone-200"></div>
                <div className="space-y-1.5 flex-1">
                  <div className="h-3.5 bg-stone-200 rounded w-2/3"></div>
                  <div className="h-2.5 bg-stone-100 rounded w-1/3"></div>
                </div>
              </div>
              <div className="h-3 bg-stone-100 rounded w-full"></div>
              <div className="h-3 bg-stone-100 rounded w-4/5"></div>
            </div>
          </div>
        ) : reviews.length === 0 ? (
          /* Empty state */
          <div className="bg-white rounded-2xl p-6 text-center border border-stone-200 space-y-2 max-w-md mx-auto my-3 shadow-2xs">
            <div className="text-2xl">🌸</div>
            <h3 className="font-serif text-sm font-bold text-stone-800">
              Be the first to share your experience
            </h3>
            <button
              type="button"
              onClick={() => setIsWriteModalOpen(true)}
              className="mt-1 px-4 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition cursor-pointer"
            >
              Write First Review
            </button>
          </div>
        ) : (
          /* Stacked Layered Card Carousel with Left-Right Movement */
          <div className="relative w-full">
            {/* Interactive Carousel Stage */}
            <div
              ref={stageRef}
              tabIndex={0}
              role="region"
              aria-roledescription="carousel"
              aria-label="Guest reviews carousel"
              onKeyDown={handleKeyDown}
              onWheel={handleWheel}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              className={`relative w-full overflow-hidden py-2 touch-pan-y focus:outline-hidden focus-visible:ring-2 focus-visible:ring-amber-800/40 rounded-2xl ${
                isDragging ? "cursor-grabbing" : "cursor-grab"
              }`}
            >
              {/* Floating Left Arrow (Desktop) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigatePrev();
                }}
                disabled={numReviews <= 1}
                aria-label="Previous review"
                className="hidden lg:flex absolute left-2 xl:left-4 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-white/95 text-stone-800 shadow-md border border-stone-200/90 hover:bg-amber-50 hover:text-amber-950 hover:border-amber-300 hover:scale-105 active:scale-95 transition-all duration-200 items-center justify-center cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              {/* Floating Right Arrow (Desktop) */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateNext();
                }}
                disabled={numReviews <= 1}
                aria-label="Next review"
                className="hidden lg:flex absolute right-2 xl:right-4 top-1/2 -translate-y-1/2 z-40 w-9 h-9 rounded-full bg-white/95 text-stone-800 shadow-md border border-stone-200/90 hover:bg-amber-50 hover:text-amber-950 hover:border-amber-300 hover:scale-105 active:scale-95 transition-all duration-200 items-center justify-center cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Centered Cards Stage */}
              <div
                className="relative w-full flex items-center justify-center"
                style={{ height: metrics.cardHeight + 14 }}
              >
                {reviews.map((review, index) => {
                  // Continuous virtual position during drag
                  const virtualPosition =
                    activeIndex - (metrics.step > 0 ? dragOffset / metrics.step : 0);

                  let diff = (index - virtualPosition) % numReviews;
                  if (numReviews >= 3) {
                    if (diff > numReviews / 2) diff -= numReviews;
                    if (diff < -numReviews / 2) diff += numReviews;
                  }

                  const absDiff = Math.abs(diff);

                  // Visible card range
                  const isVisible = absDiff <= 2.3;
                  if (!isVisible && !isDragging) return null;

                  // Transform calculations
                  const translateX = diff * metrics.step;
                  const scale = Math.max(0.86, 1 - Math.min(absDiff, 2) * 0.065);

                  // Opacity fade: Center card 1.0, adjacent 0.65, outer 0.28
                  let opacity = 0;
                  if (absDiff < 0.25) {
                    opacity = 1;
                  } else if (absDiff <= 1) {
                    opacity = 1 - (absDiff - 0.25) * 0.44;
                  } else if (absDiff <= 2) {
                    opacity = 0.67 - (absDiff - 1) * 0.44;
                  } else if (absDiff <= 2.3) {
                    opacity = Math.max(0, 0.23 - (absDiff - 2) * 0.76);
                  }

                  // Z-index: Active card on top (30), sides layered behind (20, 10)
                  const zIndex = Math.max(1, Math.round(30 - Math.min(absDiff, 3) * 10));

                  const isActive = absDiff < 0.45;
                  const numRating = Number(review.rating) || 5;

                  return (
                    <article
                      key={review.id}
                      onClick={() => handleCardClick(index)}
                      aria-current={isActive ? "true" : undefined}
                      aria-label={`Review by ${review.name}`}
                      style={{
                        position: "absolute",
                        width: metrics.cardWidth,
                        height: metrics.cardHeight,
                        left: "50%",
                        top: "50%",
                        transform: `translate3d(calc(-50% + ${translateX}px), -50%, 0) scale(${scale})`,
                        zIndex,
                        opacity,
                        pointerEvents: isVisible ? "auto" : "none",
                        transition: isDragging
                          ? "none"
                          : "transform 420ms cubic-bezier(0.22, 1, 0.36, 1), opacity 420ms ease, box-shadow 420ms ease",
                      }}
                      className={`rounded-2xl p-3.5 sm:p-5 flex flex-col justify-between transition-colors duration-200 ${
                        isActive
                          ? "bg-white border border-stone-200/90 shadow-[0_14px_34px_-10px_rgba(28,25,23,0.12),0_4px_12px_-4px_rgba(28,25,23,0.06)] ring-1 ring-amber-900/5 cursor-default"
                          : "bg-white/95 border border-stone-200/70 shadow-2xs hover:border-amber-400/60 cursor-pointer"
                      }`}
                    >
                      <div className="min-w-0">
                        {/* Top: Avatar, Name, Verified Badge & Date */}
                        <div className="flex items-start gap-2.5 sm:gap-3 mb-2 sm:mb-2.5">
                          <AvatarIcon avatarId={review.avatar} size="sm" showBadge={false} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1 sm:gap-1.5 flex-wrap">
                              <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 truncate">
                                {review.name}
                              </h4>
                              {review.verified !== false && (
                                <span
                                  className="inline-flex items-center gap-0.5 text-[9px] sm:text-[9.5px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200 shrink-0"
                                  title="Verified Guest Stay"
                                >
                                  <span>✓</span>
                                  <span>Verified</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1 sm:gap-1.5 text-[9.5px] sm:text-[10.5px] text-stone-500 mt-0.5 truncate">
                              <span>{review.date}</span>
                              {review.stayType && (
                                <>
                                  <span>•</span>
                                  <span className="text-amber-800 font-medium truncate">
                                    {review.stayType}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Rating Stars */}
                        <div className="flex items-center gap-0.5 sm:gap-1 text-amber-500 text-[11px] sm:text-xs mb-1.5 sm:mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={i < numRating ? "text-amber-500" : "text-stone-200"}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-[10px] sm:text-[10.5px] font-bold text-stone-700 ml-1">
                            {numRating}.0
                          </span>
                        </div>

                        {/* Comment Message */}
                        {review.comment ? (
                          <p className="text-[11px] sm:text-xs text-stone-700 leading-snug sm:leading-relaxed italic pl-2 sm:pl-2.5 border-l-2 border-amber-200 line-clamp-3">
                            &ldquo;{review.comment}&rdquo;
                          </p>
                        ) : (
                          <p className="text-[11px] sm:text-xs text-stone-400 italic pl-2 sm:pl-2.5 border-l-2 border-amber-100">
                            Rating submitted with 5-star host recommendation.
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-2 pt-1.5 sm:mt-2.5 sm:pt-2 border-t border-stone-100 flex items-center justify-between text-[9.5px] sm:text-[10.5px] text-stone-400">
                        <span className="flex items-center gap-1 truncate">
                          <span>📍</span> Bodhgaya
                        </span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-amber-800 font-medium truncate">
                            Maa Annapurna
                          </span>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedReviewForModal(review);
                            }}
                            className="text-amber-800 hover:text-amber-950 font-semibold text-[9.5px] sm:text-[10px] uppercase tracking-wider flex items-center gap-0.5 cursor-pointer"
                          >
                            <span>Full</span>
                            <span>↗</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            {/* Compact Pagination Controls */}
            <div className="flex items-center justify-between gap-3 mt-3 px-1 text-[11px] text-stone-400">
              <div className="hidden sm:inline">
                <span>Swipe or tap side cards to explore • </span>
                <span className="font-semibold text-stone-600">
                  {activeIndex + 1} of {numReviews}
                </span>
              </div>

              {/* Mobile Arrows & Pagination Dots */}
              <div className="flex items-center gap-2 mx-auto sm:mx-0">
                <button
                  type="button"
                  onClick={navigatePrev}
                  aria-label="Previous review"
                  className="sm:hidden w-7 h-7 rounded-full bg-white border border-stone-200 text-stone-700 flex items-center justify-center text-xs shadow-2xs hover:bg-amber-50 active:scale-95 cursor-pointer"
                >
                  ←
                </button>

                <div
                  className="flex items-center gap-1.5"
                  role="tablist"
                  aria-label="Review pagination"
                >
                  {reviews.map((r, idx) => (
                    <button
                      key={r.id}
                      type="button"
                      role="tab"
                      aria-selected={idx === activeIndex}
                      aria-label={`Go to review ${idx + 1}: ${r.name}`}
                      onClick={() => setActiveIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                        idx === activeIndex
                          ? "w-6 bg-amber-800"
                          : "w-1.5 bg-stone-300 hover:bg-stone-400"
                      }`}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={navigateNext}
                  aria-label="Next review"
                  className="sm:hidden w-7 h-7 rounded-full bg-white border border-stone-200 text-stone-700 flex items-center justify-center text-xs shadow-2xs hover:bg-amber-50 active:scale-95 cursor-pointer"
                >
                  →
                </button>
              </div>

              <div className="hidden sm:block text-[11px] text-stone-500">
                {activeIndex + 1} of {numReviews} reviews
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Review Detail Modal (Full Unclipped Review View) */}
      {selectedReviewForModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="review-detail-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedReviewForModal(null)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 shadow-2xl border border-stone-200 space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-3 border-b border-stone-100 pb-3">
              <div className="flex items-center gap-3">
                <AvatarIcon
                  avatarId={selectedReviewForModal.avatar}
                  size="md"
                  showBadge={true}
                />
                <div>
                  <h3
                    id="review-detail-title"
                    className="font-serif text-base sm:text-lg font-bold text-stone-900"
                  >
                    {selectedReviewForModal.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-0.5">
                    <span>{selectedReviewForModal.date}</span>
                    {selectedReviewForModal.stayType && (
                      <>
                        <span>•</span>
                        <span className="text-amber-800 font-medium">
                          {selectedReviewForModal.stayType}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedReviewForModal(null)}
                aria-label="Close review details"
                className="w-7 h-7 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 hover:text-stone-800 flex items-center justify-center transition-colors cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Rating Stars & Verification Tag */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-1 text-amber-500 text-xs sm:text-sm">
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={
                      i < (Number(selectedReviewForModal.rating) || 5)
                        ? "text-amber-500"
                        : "text-stone-200"
                    }
                  >
                    ★
                  </span>
                ))}
                <span className="text-xs font-bold text-stone-800 ml-1.5">
                  {(Number(selectedReviewForModal.rating) || 5).toFixed(1)} / 5.0
                </span>
              </div>

              {selectedReviewForModal.verified !== false && (
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                  <span>✓</span>
                  <span>Verified Guest Stay</span>
                </span>
              )}
            </div>

            {/* Complete Review Text */}
            <div className="py-2">
              <p className="text-sm text-stone-700 leading-relaxed italic pl-3 border-l-2 border-amber-300 whitespace-pre-line">
                &ldquo;
                {selectedReviewForModal.comment ||
                  "Clean AC accommodation in Bodhgaya near Mahabodhi Temple with 24/7 hot water and hospitable family service."}
                &rdquo;
              </p>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-400">
              <span>📍 Maa Annapurna Home Stay, Bodhgaya</span>
              <button
                type="button"
                onClick={() => setSelectedReviewForModal(null)}
                className="px-4 py-1.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Review Submission Modal (Create New Review) */}
      <ReviewModal
        isOpen={isWriteModalOpen}
        onClose={() => setIsWriteModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  );
}
