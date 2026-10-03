"use client";

import React, { useState, useEffect } from "react";
import AvatarIcon from "./AvatarIcon";
import ReviewModal from "./ReviewModal";
import ScrollReveal from "./ScrollReveal";
import { ReviewItem } from "@/types/hotel";
import { reviewService } from "@/services/reviewService";
import { useCarousel } from "@/hooks/useCarousel";
import { useToast } from "@/hooks/useToast";

interface ReviewSectionProps {
  initialReviews?: ReviewItem[];
}

export default function ReviewSection({ initialReviews = [] }: ReviewSectionProps) {
  const [reviews, setReviews] = useState<ReviewItem[]>(initialReviews);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Hook for decoupled swiper & drag-to-scroll gesture logic (SRP)
  const {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    isDragging,
    scroll,
    scrollToStart,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
  } = useCarousel([reviews]);

  // Hook for feedback toast (SRP)
  const { toast, showToast } = useToast();

  // Fetch live reviews from service layer (DIP)
  const fetchReviews = async () => {
    try {
      setIsLoading(true);
      const data = await reviewService.getReviews();
      if (Array.isArray(data.reviews)) {
        setReviews(data.reviews);
      }
    } catch (err) {
      console.error("Failed to load reviews:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // Add newly created review optimistically
  const handleReviewSubmitted = (newReview: ReviewItem) => {
    setReviews((prev) => [newReview, ...prev]);
    showToast("Thank you! Your review has been added.");
    // Smooth scroll back to front so new review is visible
    setTimeout(() => {
      scrollToStart();
    }, 100);
  };

  return (
    <section id="reviews" className="py-8 sm:py-12 bg-stone-50/70 border-t border-b border-stone-200/80 relative overflow-hidden">
      {/* Toast Notification */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 px-4 py-3 rounded-2xl shadow-xl text-xs font-semibold flex items-center gap-2 border animate-in slide-in-from-bottom-2 duration-200 ${
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
        {/* Compact Header: Title + Rating Tag on left, Actions & Swipe Arrows on right */}
        <ScrollReveal variant="up">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5 sm:mb-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-100/90 border border-amber-300 text-amber-900 text-[10.5px] font-bold tracking-wider uppercase">
                  <span>⭐</span>
                  <span>Guest Experiences</span>
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <span>★ 4.9</span>
                  <span>• Highly Rated</span>
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-stone-900 tracking-tight">
                Loved by Pilgrims &amp; Travelers
              </h2>
            </div>

            {/* Action Row: Write Review Button + Swipe Arrow Controls */}
            <div className="flex items-center gap-2.5 self-start sm:self-auto shrink-0">
              <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 rounded-full bg-stone-900 hover:bg-amber-900 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all duration-200 flex items-center gap-1.5 cursor-pointer butter-touch"
              >
                <span>✍️ Write a Review</span>
              </button>

              {/* Previous / Next Arrow Controls */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => scroll("left")}
                  disabled={!canScrollLeft}
                  aria-label="Scroll reviews left"
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    canScrollLeft
                      ? "bg-white text-stone-800 border-stone-300 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-900 shadow-2xs"
                      : "bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => scroll("right")}
                  disabled={!canScrollRight}
                  aria-label="Scroll reviews right"
                  className={`w-8 h-8 rounded-full flex items-center justify-center border transition-all cursor-pointer ${
                    canScrollRight
                      ? "bg-white text-stone-800 border-stone-300 hover:bg-amber-50 hover:border-amber-400 hover:text-amber-900 shadow-2xs"
                      : "bg-stone-100 text-stone-300 border-stone-200 cursor-not-allowed"
                  }`}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Horizontal Swipeable Card Track */}
        {isLoading && reviews.length === 0 ? (
          <div className="flex gap-4 overflow-hidden py-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="w-[280px] sm:w-[340px] shrink-0 h-44 bg-white rounded-2xl border border-stone-200 animate-pulse p-4 space-y-3"
              >
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
            ))}
          </div>
        ) : reviews.length === 0 ? (
          <div className="bg-white rounded-2xl p-6 text-center border border-stone-200 space-y-2 max-w-md mx-auto">
            <div className="text-2xl">🌸</div>
            <h3 className="font-serif text-sm font-bold text-stone-800">
              Be the first to share your experience
            </h3>
            <button
              onClick={() => setIsModalOpen(true)}
              className="mt-1 px-4 py-1.5 rounded-xl bg-amber-800 hover:bg-amber-900 text-white text-xs font-bold transition cursor-pointer"
            >
              Write First Review
            </button>
          </div>
        ) : (
          <ScrollReveal variant="fade" delayMs={60}>
            <div className="relative group">
              {/* Scrollable Container with Snap and Drag */}
              <div
                ref={scrollRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={handleMouseLeave}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
                className={`overflow-x-auto flex gap-4 sm:gap-5 pb-3 pt-1 px-1 scroll-smooth snap-x snap-mandatory no-scrollbar select-none ${
                  isDragging ? "cursor-grabbing" : "cursor-grab"
                }`}
                style={{
                  WebkitOverflowScrolling: "touch",
                  scrollbarWidth: "none",
                  msOverflowStyle: "none",
                }}
              >
                {reviews.map((review) => {
                  const numRating = Number(review.rating) || 5;

                  return (
                    <div
                      key={review.id}
                      className="w-[285px] sm:w-[335px] md:w-[365px] shrink-0 snap-start bg-white rounded-2xl p-4 sm:p-5 border border-stone-200/90 hover:border-amber-400/70 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
                    >
                      <div>
                        {/* Top: Avatar, Name, Verified Badge & Date */}
                        <div className="flex items-start gap-3 mb-3">
                          <AvatarIcon avatarId={review.avatar} size="sm" showBadge={false} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 truncate">
                                {review.name}
                              </h4>
                              {review.verified !== false && (
                                <span
                                  className="inline-flex items-center gap-0.5 text-[9.5px] font-semibold text-emerald-800 bg-emerald-50 px-1.5 py-0.2 rounded-full border border-emerald-200 shrink-0"
                                  title="Verified Guest Stay"
                                >
                                  <span>✓</span>
                                  <span>Verified</span>
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10.5px] text-stone-500 mt-0.5 truncate">
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
                        <div className="flex items-center gap-1 text-amber-500 text-xs mb-2.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={i < numRating ? "text-amber-500" : "text-stone-200"}
                            >
                              ★
                            </span>
                          ))}
                          <span className="text-[10px] font-bold text-stone-700 ml-1">
                            {numRating}.0
                          </span>
                        </div>

                        {/* Comment Message */}
                        {review.comment ? (
                          <p className="text-xs text-stone-700 leading-relaxed italic pl-2.5 border-l-2 border-amber-200 line-clamp-4">
                            &ldquo;{review.comment}&rdquo;
                          </p>
                        ) : (
                          <p className="text-xs text-stone-400 italic pl-2.5 border-l-2 border-amber-100">
                            Rating submitted with 5-star host recommendation.
                          </p>
                        )}
                      </div>

                      {/* Card Footer */}
                      <div className="mt-3.5 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[10.5px] text-stone-400">
                        <span className="flex items-center gap-1 truncate">
                          <span>📍</span> Bodhgaya
                        </span>
                        <span className="text-amber-800 font-medium truncate">
                          Maa Annapurna
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Subtle swipe cue on mobile */}
              <div className="flex items-center justify-center gap-1.5 mt-2 sm:hidden text-[10.5px] text-stone-400 font-medium">
                <span>←</span>
                <span>Swipe left or right to explore reviews</span>
                <span>→</span>
              </div>
            </div>
          </ScrollReveal>
        )}
      </div>

      {/* Review Submission Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onReviewSubmitted={handleReviewSubmitted}
      />
    </section>
  );
}
