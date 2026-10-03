import React, { useState } from "react";
import AvatarIcon from "@/components/AvatarIcon";
import { ReviewItem } from "@/types/admin";

interface AdminReviewsTabProps {
  reviews: ReviewItem[];
  isLoading: boolean;
  onRequestDeleteReview: (review: ReviewItem) => void;
}

export default function AdminReviewsTab({
  reviews,
  isLoading,
  onRequestDeleteReview,
}: AdminReviewsTabProps) {
  const [filterRating, setFilterRating] = useState<number | "all">("all");

  const filteredReviews =
    filterRating === "all"
      ? reviews
      : reviews.filter((r) => Number(r.rating) === filterRating);

  return (
    <div className="space-y-5">
      {/* Reviews Header & Quick Stats */}
      <div className="bg-white rounded-2xl p-5 border border-stone-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="font-serif text-lg font-bold text-stone-900">
              Guest Reviews &amp; Ratings Management
            </h3>
            <span className="text-xs bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full">
              {reviews.length} Total
            </span>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Manage ratings and feedback submitted by guests. You can delete spam, inappropriate, or outdated reviews anytime.
          </p>
        </div>

        {/* Review Filter Tabs */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <button
            onClick={() => setFilterRating("all")}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
              filterRating === "all"
                ? "bg-stone-900 text-white shadow-xs"
                : "bg-stone-100 text-stone-600 hover:text-stone-900"
            }`}
          >
            All ({reviews.length})
          </button>
          {[5, 4, 3, 2, 1].map((star) => {
            const starCount = reviews.filter((r) => Number(r.rating) === star).length;
            return (
              <button
                key={star}
                onClick={() => setFilterRating(star)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1 ${
                  filterRating === star
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-stone-100 text-stone-600 hover:text-stone-900"
                }`}
              >
                <span>{star} ★</span>
                <span className="text-[10px] opacity-75">({starCount})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Reviews List */}
      {isLoading ? (
        <div className="py-12 text-center text-xs text-stone-500">
          Loading reviews...
        </div>
      ) : reviews.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 space-y-2">
          <span className="text-3xl">⭐</span>
          <h4 className="font-serif text-base font-bold text-stone-800">
            No guest reviews yet
          </h4>
          <p className="text-xs text-stone-500">
            Reviews submitted from the website will appear here for host review and moderation.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredReviews.map((review) => {
            const numRating = Number(review.rating) || 5;

            return (
              <div
                key={review.id}
                className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-2xs flex flex-col justify-between hover:border-stone-300 transition"
              >
                <div>
                  {/* Top: Avatar, Name, Delete Button */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <AvatarIcon avatarId={review.avatar} size="sm" showBadge={true} />
                      <div>
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <h4 className="font-serif font-bold text-sm text-stone-900 leading-tight">
                            {review.name}
                          </h4>
                          {review.verified !== false && (
                            <span className="text-[9.5px] bg-emerald-50 text-emerald-800 border border-emerald-200 font-semibold px-1.5 py-0.2 rounded-full">
                              ✓ Verified
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-stone-500">
                          {review.date} {review.stayType ? `• ${review.stayType}` : ""}
                        </span>
                      </div>
                    </div>

                    {/* Delete Action Button */}
                    <button
                      onClick={() => onRequestDeleteReview(review)}
                      className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 text-xs font-semibold flex items-center gap-1 transition cursor-pointer shadow-2xs shrink-0"
                      title="Delete this review permanently"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Delete</span>
                    </button>
                  </div>

                  {/* Star Rating Display */}
                  <div className="flex items-center gap-1 text-amber-500 text-xs mb-2.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span key={i} className={i < numRating ? "text-amber-500" : "text-stone-200"}>
                        ★
                      </span>
                    ))}
                    <span className="text-stone-700 font-bold ml-1 text-xs">
                      {numRating}.0 / 5
                    </span>
                  </div>

                  {/* Comment Text */}
                  {review.comment ? (
                    <p className="text-xs text-stone-700 leading-relaxed bg-stone-50 p-2.5 rounded-xl border border-stone-100 italic">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                  ) : (
                    <p className="text-xs text-stone-400 italic">
                      Star rating only (no written comment).
                    </p>
                  )}
                </div>

                {/* Footer ID & Date */}
                <div className="mt-3 pt-2.5 border-t border-stone-100 flex items-center justify-between text-[10px] text-stone-400">
                  <span>ID: {review.id}</span>
                  <span>Avatar: {review.avatar || "star"}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
