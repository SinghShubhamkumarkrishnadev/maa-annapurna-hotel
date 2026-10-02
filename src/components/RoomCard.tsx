import React from "react";
import Image from "next/image";
import { RoomItem } from "@/types/hotel";

interface RoomCardProps {
  room: RoomItem;
  onOpenEnquiry: (roomTitle: string) => void;
  onWhatsAppBooking: (roomTitle?: string) => void;
}

export default function RoomCard({
  room,
  onOpenEnquiry,
  onWhatsAppBooking,
}: RoomCardProps) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
      {/* Room Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
        <Image
          src={room.image}
          alt={room.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
          {room.badge}
        </div>
        {/* Live Room Status Pill on Image */}
        <div
          className={`absolute top-4 right-4 backdrop-blur-md text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border ${
            room.statusType === "available"
              ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/40"
              : "bg-amber-950/90 text-amber-300 border-amber-500/40"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              room.statusType === "available" ? "bg-emerald-400 animate-pulse" : "bg-amber-400 animate-pulse"
            }`}
          ></span>
          <span>{room.availableUnits} Available</span>
        </div>
        <div className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">
          {room.guests}
        </div>
      </div>

      {/* Room Details */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Title and Pricing Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <h3 className="font-serif text-lg sm:text-2xl font-bold text-stone-900 leading-snug">
                {room.name}
              </h3>
              <div className="flex items-center gap-2 mt-1 text-xs text-stone-500">
                <span>🛏️ {room.beds}</span>
                <span>•</span>
                <span>👥 {room.guests}</span>
              </div>
            </div>

            {/* Actual Price & Discount */}
            <div className="text-right shrink-0">
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className="text-xs text-stone-400 line-through">
                  ₹{room.originalPrice.toLocaleString("en-IN")}
                </span>
                <span className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                  ₹{room.price.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                  {room.discount}
                </span>
                <span className="text-[10.5px] text-stone-500">/ night</span>
              </div>
            </div>
          </div>

          <p className="hidden sm:block text-stone-600 text-xs sm:text-sm leading-relaxed mb-4">
            {room.description}
          </p>

          {/* Dedicated Currently Available / Booked Section */}
          <div
            className={`p-2.5 sm:p-3 rounded-xl border mb-3 sm:mb-4 ${
              room.statusType === "available"
                ? "bg-emerald-50/70 border-emerald-200/90 text-emerald-950"
                : "bg-amber-50/70 border-amber-200/90 text-amber-950"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    room.statusType === "available"
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-amber-500 animate-pulse"
                  }`}
                ></span>
                <span
                  className={
                    room.statusType === "available"
                      ? "text-emerald-900 font-bold"
                      : "text-amber-950 font-bold"
                  }
                >
                  {room.status}: {room.availabilityText}
                </span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/90 border border-stone-200/80 font-medium text-stone-700 shadow-2xs">
                {room.bookedToday} Booked Today
              </span>
            </div>

            {/* Visual Capacity Progress Bar */}
            <div className="mt-2 sm:mt-2.5 w-full bg-white/80 border border-stone-200/60 h-2 rounded-full overflow-hidden flex">
              <div
                className={`h-full transition-all duration-500 ${
                  room.statusType === "available" ? "bg-emerald-500" : "bg-amber-500"
                }`}
                style={{ width: `${(room.availableUnits / room.totalUnits) * 100}%` }}
              ></div>
            </div>

            <div className="flex justify-between items-center text-[10.5px] text-stone-600 mt-1.5 font-medium">
              <span>
                <strong className="text-stone-900">{room.availableUnits}</strong> of {room.totalUnits} units available
              </span>
              <span className="hidden sm:flex items-center gap-1 text-emerald-700 font-semibold">
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                Instant Host Confirmation
              </span>
            </div>
          </div>

          {/* Features Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
            {room.features.map((feat, idx) => (
              <span
                key={idx}
                className={`${idx >= 3 ? "hidden sm:inline-flex" : "inline-flex"} items-center text-[11px] font-medium text-stone-700 bg-stone-100 px-2 py-0.5 rounded-md`}
              >
                <svg className="w-3 h-3 text-amber-700 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="pt-3 border-t border-stone-100 flex items-center gap-2.5 sm:gap-3">
          <button
            onClick={() => onOpenEnquiry(room.name)}
            className="flex-1 py-2.5 px-3 sm:px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm text-center butter-touch cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
          >
            <span>Book at ₹{room.price.toLocaleString("en-IN")}</span>
            <span className="text-[10px] text-amber-300 font-normal">/ night</span>
          </button>
          <button
            onClick={() => onWhatsAppBooking(room.name)}
            className="py-2.5 px-3.5 sm:px-4 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-xs sm:text-sm butter-touch flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            title="Enquire on WhatsApp"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
            </svg>
            <span>WhatsApp</span>
          </button>
        </div>
      </div>
    </article>
  );
}
