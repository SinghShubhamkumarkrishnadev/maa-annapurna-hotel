import React from "react";
import { AmenityItem } from "@/types/hotel";

interface AmenityCardProps {
  amenity: AmenityItem;
}

export default function AmenityCard({ amenity }: AmenityCardProps) {
  return (
    <div className="p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 hover:border-amber-200 transition-all flex items-start gap-3 sm:gap-4 shadow-2xs butter-touch">
      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0 mt-0.5">
        {amenity.icon}
      </div>
      <div className="min-w-0">
        <h3 className="text-xs sm:text-base font-bold text-stone-900 leading-snug">{amenity.title}</h3>
        <p className="text-stone-600 text-[11px] sm:text-sm mt-0.5 sm:mt-1 leading-relaxed">
          {amenity.desc}
        </p>
      </div>
    </div>
  );
}
