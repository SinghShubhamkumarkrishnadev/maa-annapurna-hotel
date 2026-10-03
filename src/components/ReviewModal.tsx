import React, { useState } from "react";
import AvatarIcon, { AVATAR_OPTIONS } from "./AvatarIcon";
import { ReviewItem } from "@/types/hotel";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewSubmitted: (newReview: ReviewItem) => void;
}

const STAY_TYPES = [
  "Family Pilgrimage",
  "Mahabodhi Temple Darshan",
  "Solo Traveler",
  "Couple Stay",
  "Group Pilgrimage",
  "Buddhist Monk / Spiritual Retreat",
  "Business & Leisure",
];

export default function ReviewModal({
  isOpen,
  onClose,
  onReviewSubmitted,
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [avatar, setAvatar] = useState("zen");
  const [stayType, setStayType] = useState(STAY_TYPES[0]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState(false);

  if (!isOpen) return null;

  const currentActiveRating = hoverRating !== null ? hoverRating : rating;

  const ratingLabels: Record<number, { text: string; color: string; desc: string }> = {
    5: { text: "Exceptional", color: "text-amber-600", desc: "Exceeded all expectations! उत्कृष्ट" },
    4: { text: "Very Good", color: "text-amber-700", desc: "Pleasant & comfortable stay" },
    3: { text: "Good", color: "text-yellow-700", desc: "Satisfactory experience" },
    2: { text: "Fair", color: "text-orange-700", desc: "Average stay with room for improvement" },
    1: { text: "Poor", color: "text-rose-700", desc: "Disappointing experience" },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }

    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          comment: comment.trim(),
          avatar,
          stayType,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success && data.review) {
        setSuccessMsg(true);
        onReviewSubmitted(data.review);
        setTimeout(() => {
          setSuccessMsg(false);
          setName("");
          setComment("");
          setRating(5);
          setAvatar("zen");
          onClose();
        }, 1800);
      } else {
        setErrorMsg(data.error || "Failed to submit review. Please try again.");
      }
    } catch {
      setErrorMsg("Connection error. Please check your internet and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-stone-950/75 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="w-full max-w-xl max-h-[92vh] overflow-y-auto no-scrollbar bg-white rounded-3xl shadow-2xl border border-stone-200 flex flex-col relative animate-in zoom-in-95 duration-200"
        role="dialog"
        aria-modal="true"
        aria-labelledby="review-modal-title"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-sm font-bold shadow-2xs">
              ⭐
            </div>
            <div>
              <h2 id="review-modal-title" className="font-serif text-lg sm:text-xl font-bold text-stone-900 leading-tight">
                Rate Your Experience
              </h2>
              <p className="text-[11px] text-stone-500">
                Maa Annapurna Home Stay &amp; Hotel • Bodhgaya
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition cursor-pointer"
            aria-label="Close review dialog"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Success View */}
        {successMsg ? (
          <div className="p-8 sm:p-12 text-center flex flex-col items-center justify-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-3xl animate-bounce">
              ✓
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Thank You, {name}!
            </h3>
            <p className="text-sm text-stone-600 max-w-sm">
              Your valuable review and rating have been published. We are honored to host you in holy Bodhgaya!
            </p>
            <div className="flex items-center gap-1 text-amber-500 text-xl pt-1">
              {Array.from({ length: rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
        ) : (
          /* Form View */
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <span className="shrink-0 text-base">⚠️</span>
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Star Rating Section */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-4 text-center">
              <span className="text-xs font-semibold text-amber-950 uppercase tracking-wider block mb-2">
                Tap Stars to Rate Your Stay
              </span>

              <div
                className="flex items-center justify-center gap-2 sm:gap-3 py-1"
                onMouseLeave={() => setHoverRating(null)}
              >
                {[1, 2, 3, 4, 5].map((star) => {
                  const isFilled = star <= currentActiveRating;
                  return (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      className="p-1 text-3xl sm:text-4xl transition-transform duration-150 hover:scale-125 focus:outline-none cursor-pointer butter-touch"
                      aria-label={`Rate ${star} out of 5 stars`}
                    >
                      <span
                        className={
                          isFilled
                            ? "text-amber-500 drop-shadow-sm transition-colors"
                            : "text-stone-300 transition-colors"
                        }
                      >
                        ★
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-1">
                <span className={`text-sm font-bold ${ratingLabels[currentActiveRating].color}`}>
                  {ratingLabels[currentActiveRating].text} ({currentActiveRating} / 5)
                </span>
                <p className="text-[11px] text-stone-500 mt-0.5">
                  {ratingLabels[currentActiveRating].desc}
                </p>
              </div>
            </div>

            {/* Profile Avatar Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold text-stone-800 uppercase tracking-wider">
                  Select Your Profile Avatar
                </label>
                <span className="text-[11px] text-amber-800 font-medium">
                  {AVATAR_OPTIONS.find((a) => a.id === avatar)?.name}
                </span>
              </div>

              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 p-2.5 bg-stone-50 rounded-2xl border border-stone-200">
                {AVATAR_OPTIONS.map((opt) => {
                  const isSelected = avatar === opt.id;
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setAvatar(opt.id)}
                      className={`flex flex-col items-center justify-center p-1.5 rounded-xl transition duration-150 cursor-pointer relative ${
                        isSelected
                          ? "bg-white shadow-sm ring-2 ring-amber-600 scale-105"
                          : "hover:bg-white/60 opacity-80 hover:opacity-100"
                      }`}
                      title={`${opt.name} - ${opt.subtitle}`}
                    >
                      <AvatarIcon avatarId={opt.id} size="sm" />
                      <span className="text-[10px] font-medium text-stone-700 mt-1 truncate max-w-full text-center">
                        {opt.name.split(" ")[0]}
                      </span>
                      {isSelected && (
                        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-amber-600 text-white rounded-full text-[8px] flex items-center justify-center font-bold">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Guest Name Input */}
            <div>
              <label htmlFor="review-name" className="block text-xs font-bold text-stone-800 mb-1.5">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="review-name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar, Sunita Verma"
                  maxLength={60}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600 transition"
                />
                <span className="absolute left-3.5 top-2.5 text-stone-400">👤</span>
              </div>
            </div>

            {/* Stay Type Category */}
            <div>
              <label htmlFor="review-stay-type" className="block text-xs font-bold text-stone-800 mb-1.5">
                Type of Visit <span className="text-stone-400 font-normal">(Optional)</span>
              </label>
              <select
                id="review-stay-type"
                value={stayType}
                onChange={(e) => setStayType(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-800 bg-white focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600 transition"
              >
                {STAY_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            {/* Optional Comment / Text Message */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="review-comment" className="block text-xs font-bold text-stone-800">
                  Your Review Message <span className="text-stone-400 font-normal">(Optional)</span>
                </label>
                <span className="text-[10px] text-stone-400">
                  {comment.length}/1000 characters
                </span>
              </div>
              <textarea
                id="review-comment"
                rows={3}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                maxLength={1000}
                placeholder="Share your stay experience, room comfort, hot water, host hospitality, or temple proximity..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-600/50 focus:border-amber-600 transition resize-none"
              />
            </div>

            {/* Submit & Cancel Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                disabled={isSubmitting}
                className="flex-1 py-2.5 px-4 rounded-xl border border-stone-300 text-stone-700 text-xs font-semibold hover:bg-stone-50 transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-2 py-2.5 px-5 rounded-xl bg-gradient-to-r from-amber-700 via-amber-800 to-amber-900 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer butter-touch disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Publishing Review...</span>
                  </>
                ) : (
                  <>
                    <span>Submit Guest Review</span>
                    <span>★</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
