import React from "react";
import { RoomItem, ReviewItem } from "@/types/admin";

interface AdminStatsProps {
  rooms: RoomItem[];
  reviews: ReviewItem[];
}

export default function AdminStats({ rooms, reviews }: AdminStatsProps) {
  const activeRoomsCount = rooms.filter((r) => r.isActive !== false).length;
  const totalAvailableUnits = rooms.reduce((acc, r) => acc + (r.availableUnits || 0), 0);
  const totalBookedToday = rooms.reduce((acc, r) => acc + (r.bookedToday || 0), 0);
  const averageReviewRating =
    reviews.length > 0
      ? (reviews.reduce((acc, r) => acc + Number(r.rating || 5), 0) / reviews.length).toFixed(1)
      : "5.0";

  return (
    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 sm:gap-4">
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
          Total Categories
        </span>
        <div className="flex items-baseline justify-between mt-1">
          <span className="font-serif text-2xl font-bold text-stone-900">{rooms.length}</span>
          <span className="text-xs text-emerald-700 font-semibold">{activeRoomsCount} Live</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
          Rooms Available Today
        </span>
        <div className="flex items-baseline justify-between mt-1">
          <span className="font-serif text-2xl font-bold text-emerald-700">
            {totalAvailableUnits}
          </span>
          <span className="text-xs text-stone-500 font-medium">Ready for guests</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
          Booked Today
        </span>
        <div className="flex items-baseline justify-between mt-1">
          <span className="font-serif text-2xl font-bold text-amber-700">
            {totalBookedToday}
          </span>
          <span className="text-xs text-amber-800 font-medium">Reserved</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
          Tariff Range
        </span>
        <div className="flex items-baseline justify-between mt-1">
          <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
            ₹1,199 – ₹2,499
          </span>
          <span className="text-xs text-stone-500">per night</span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs col-span-2 sm:col-span-1">
        <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
          Guest Rating
        </span>
        <div className="flex items-baseline justify-between mt-1">
          <span className="font-serif text-2xl font-bold text-amber-600">
            {averageReviewRating} ★
          </span>
          <span className="text-xs text-stone-500 font-medium">{reviews.length} Reviews</span>
        </div>
      </div>
    </div>
  );
}
