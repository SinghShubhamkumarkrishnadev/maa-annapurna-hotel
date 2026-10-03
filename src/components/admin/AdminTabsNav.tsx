import React from "react";
import { AdminTab } from "@/types/admin";

interface AdminTabsNavProps {
  activeTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  roomsCount: number;
  photosCount: number;
  reviewsCount: number;
  onOpenAddRoom?: () => void;
  onOpenAddPhoto?: () => void;
}

export default function AdminTabsNav({
  activeTab,
  onTabChange,
  roomsCount,
  photosCount,
  reviewsCount,
  onOpenAddRoom,
  onOpenAddPhoto,
}: AdminTabsNavProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-stone-200 pb-3">
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => onTabChange("rooms")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "rooms"
              ? "bg-stone-900 text-white shadow-xs"
              : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
          }`}
        >
          <span>🛏️ Rooms &amp; Suites</span>
          <span className="text-[10px] bg-stone-800 text-stone-300 px-1.5 py-0.2 rounded-full">
            {roomsCount}
          </span>
        </button>

        <button
          onClick={() => onTabChange("quick-pricing")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "quick-pricing"
              ? "bg-stone-900 text-white shadow-xs"
              : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
          }`}
        >
          <span>⚡ Fast Rate &amp; Inventory Editor</span>
        </button>

        <button
          onClick={() => onTabChange("photos")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "photos"
              ? "bg-stone-900 text-white shadow-xs"
              : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
          }`}
        >
          <span>📸 Photos &amp; Gallery</span>
          <span className="text-[10px] bg-stone-800 text-stone-300 px-1.5 py-0.2 rounded-full">
            {photosCount}
          </span>
        </button>

        <button
          onClick={() => onTabChange("reviews")}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer ${
            activeTab === "reviews"
              ? "bg-stone-900 text-white shadow-xs"
              : "bg-white text-stone-600 hover:text-stone-900 border border-stone-200"
          }`}
        >
          <span>⭐ Guest Reviews</span>
          <span className="text-[10px] bg-amber-600 text-white px-1.5 py-0.2 rounded-full font-bold">
            {reviewsCount}
          </span>
        </button>
      </div>

      <div className="flex items-center gap-2">
        {activeTab === "rooms" && onOpenAddRoom && (
          <button
            onClick={onOpenAddRoom}
            className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Add New Room</span>
          </button>
        )}

        {activeTab === "photos" && onOpenAddPhoto && (
          <button
            onClick={onOpenAddPhoto}
            className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <span>+ Add Gallery Photo</span>
          </button>
        )}
      </div>
    </div>
  );
}
