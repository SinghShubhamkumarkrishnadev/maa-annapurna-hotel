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
  const isSoldOut =
    Number(room.availableUnits) === 0 ||
    room.statusType === "sold_out" ||
    room.isAvailable === false;

  const displayStatus = isSoldOut
    ? "Sold Out: All Units Booked Today"
    : room.availableUnits === 1
    ? "High Demand: Only 1 Room Left for Today"
    : `${room.status || "Available Today"}: ${room.availableUnits} Rooms Available Today`;

  return (
    <article
      className={`rounded-2xl overflow-hidden border transition-all duration-300 flex flex-col group ${
        isSoldOut
          ? "bg-gray-200 border-gray-300 shadow-sm"
          : "bg-white border-stone-200/90 shadow-md hover:shadow-xl"
      }`}
    >
      {/* Room Image Container - Grayscaled with no button on top so image is 100% visible */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-300">
        <Image
          src={room.image}
          alt={room.alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className={`w-full h-full object-cover transition duration-500 ${
            isSoldOut ? "grayscale contrast-90 brightness-95" : "group-hover:scale-105"
          }`}
        />

        {/* Zomato Top Tag: Currently Sold Out when closed/empty, or room badge when available */}
        {isSoldOut ? (
          <div className="absolute top-4 left-4 z-20 bg-gray-900/90 text-white backdrop-blur-md px-3 py-1.5 rounded-md text-xs font-bold tracking-wide uppercase flex items-center shadow-lg border border-gray-700 select-none">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse mr-2"></span>
            Currently Sold Out
          </div>
        ) : (
          <div className="absolute top-4 left-4 z-20 bg-white/95 backdrop-blur text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
            {room.badge}
          </div>
        )}

        {/* Live Room Status Pill on Image */}
        <div
          className={`absolute top-4 right-4 z-20 backdrop-blur-md text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-md flex items-center gap-1.5 border select-none ${
            isSoldOut
              ? "bg-gray-900/80 text-gray-300 border-gray-700"
              : room.statusType === "available"
              ? "bg-emerald-950/90 text-emerald-300 border-emerald-500/40"
              : "bg-amber-950/90 text-amber-300 border-amber-500/40"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isSoldOut
                ? "bg-red-500"
                : room.statusType === "available"
                ? "bg-emerald-400 animate-pulse"
                : "bg-amber-400 animate-pulse"
            }`}
          ></span>
          <span>{isSoldOut ? "0 Available" : `${room.availableUnits} Available`}</span>
        </div>

        <div className="absolute bottom-4 right-4 z-20 bg-stone-900/80 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">
          {room.guests}
        </div>
      </div>

      {/* Room Details Body */}
      <div className={`p-5 sm:p-6 flex-1 flex flex-col justify-between ${isSoldOut ? "bg-gray-200" : "bg-white"}`}>
        <div>
          {/* Title and Pricing Header */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3
                  className={`font-serif text-lg sm:text-2xl font-bold leading-snug ${
                    isSoldOut ? "text-gray-700" : "text-stone-900"
                  }`}
                >
                  {room.name}
                </h3>
                {isSoldOut && (
                  <span className="bg-gray-300 text-gray-700 text-[10.5px] font-bold px-2 py-0.5 rounded border border-gray-400 uppercase tracking-wide">
                    Sold Out
                  </span>
                )}
              </div>
              <div className={`flex items-center gap-2 mt-1 text-xs ${isSoldOut ? "text-gray-500" : "text-stone-500"}`}>
                <span>🛏️ {room.beds}</span>
                <span>•</span>
                <span>👥 {room.guests}</span>
              </div>
            </div>

            {/* Actual Price & Discount */}
            <div className="text-right shrink-0">
              <div className="flex items-baseline gap-1.5 justify-end">
                <span className={`text-xs line-through ${isSoldOut ? "text-gray-400" : "text-stone-400"}`}>
                  ₹{room.originalPrice.toLocaleString("en-IN")}
                </span>
                <span
                  className={`font-serif text-xl sm:text-2xl font-bold ${
                    isSoldOut ? "text-gray-600" : "text-stone-900"
                  }`}
                >
                  ₹{room.price.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center gap-1 justify-end mt-0.5">
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                    isSoldOut
                      ? "bg-gray-300 text-gray-600 border-gray-400"
                      : "text-emerald-700 bg-emerald-50 border-emerald-200"
                  }`}
                >
                  {room.discount}
                </span>
                <span className={`text-[10.5px] ${isSoldOut ? "text-gray-500" : "text-stone-500"}`}>/ night</span>
              </div>
            </div>
          </div>

          <p className={`hidden sm:block text-xs sm:text-sm leading-relaxed mb-4 ${isSoldOut ? "text-gray-600" : "text-stone-600"}`}>
            {room.description}
          </p>

          {/* Currently Available / Booked Section */}
          <div
            className={`p-2.5 sm:p-3 rounded-xl border mb-3 sm:mb-4 ${
              isSoldOut
                ? "bg-gray-100 border-gray-300 text-gray-700"
                : room.statusType === "available"
                ? "bg-emerald-50/70 border-emerald-200/90 text-emerald-950"
                : "bg-amber-50/70 border-amber-200/90 text-amber-950"
            }`}
          >
            <div className="flex items-center justify-between text-xs font-semibold">
              <div className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    isSoldOut
                      ? "bg-red-500"
                      : room.statusType === "available"
                      ? "bg-emerald-500 animate-pulse"
                      : "bg-amber-500 animate-pulse"
                  }`}
                ></span>
                <span
                  className={
                    isSoldOut
                      ? "text-gray-800 font-bold"
                      : room.statusType === "available"
                      ? "text-emerald-900 font-bold"
                      : "text-amber-950 font-bold"
                  }
                >
                  {displayStatus}
                </span>
              </div>
              <span
                className={`text-[11px] px-2 py-0.5 rounded-md border font-medium ${
                  isSoldOut
                    ? "bg-gray-200 border-gray-300 text-gray-600"
                    : "bg-white/90 border-stone-200/80 text-stone-700 shadow-2xs"
                }`}
              >
                {room.bookedToday || (isSoldOut ? room.totalUnits : 0)} Booked Today
              </span>
            </div>

            {/* Visual Capacity Progress Bar */}
            <div
              className={`mt-2 sm:mt-2.5 w-full border h-2 rounded-full overflow-hidden flex ${
                isSoldOut ? "bg-gray-300 border-gray-300" : "bg-white/80 border-stone-200/60"
              }`}
            >
              <div
                className={`h-full transition-all duration-500 ${
                  isSoldOut
                    ? "bg-gray-400"
                    : room.statusType === "available"
                    ? "bg-emerald-500"
                    : "bg-amber-500"
                }`}
                style={{ width: `${isSoldOut ? 0 : Math.min(100, (room.availableUnits / room.totalUnits) * 100)}%` }}
              ></div>
            </div>

            <div className={`flex justify-between items-center text-[10.5px] mt-1.5 font-medium ${isSoldOut ? "text-gray-500" : "text-stone-600"}`}>
              <span>
                <strong className={isSoldOut ? "text-gray-700" : "text-stone-900"}>{room.availableUnits}</strong> of {room.totalUnits} units available
              </span>
              {isSoldOut ? (
                <span className="text-red-600 font-semibold flex items-center gap-1">
                  ✕ Not Accepting Bookings Today
                </span>
              ) : (
                <span className="hidden sm:flex items-center gap-1 text-emerald-700 font-semibold">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                  Instant Host Confirmation
                </span>
              )}
            </div>
          </div>

          {/* Features Badges */}
          <div className="flex flex-wrap gap-1.5 mb-4 sm:mb-5">
            {room.features.map((feat, idx) => (
              <span
                key={idx}
                className={`${idx >= 3 ? "hidden sm:inline-flex" : "inline-flex"} items-center text-[11px] font-medium px-2 py-0.5 rounded-md border ${
                  isSoldOut
                    ? "bg-gray-300 text-gray-700 border-gray-400/50"
                    : "bg-stone-100 text-stone-700 border-stone-200/60"
                }`}
              >
                <svg
                  className={`w-3 h-3 mr-1 ${isSoldOut ? "text-gray-500" : "text-amber-700"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Actions Row */}
        <div className={`pt-3 border-t flex items-center gap-2.5 sm:gap-3 ${isSoldOut ? "border-gray-300" : "border-stone-200/80"}`}>
          {isSoldOut ? (
            <div className="flex-1 flex items-center gap-2.5 select-none">
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="flex-1 py-2.5 px-3 sm:px-4 rounded-xl bg-gray-300 text-gray-500 font-bold text-xs sm:text-sm text-center cursor-not-allowed border border-gray-400 shadow-none flex items-center justify-center gap-1.5"
              >
                <span>🚫 Sold Out for Today</span>
              </button>
              <button
                type="button"
                disabled
                aria-disabled="true"
                className="py-2.5 px-3.5 sm:px-4 rounded-xl bg-gray-300 text-gray-500 border border-gray-400 font-semibold text-xs sm:text-sm cursor-not-allowed flex items-center justify-center gap-1.5 shrink-0"
                title="Booking is locked for this room"
              >
                <span className="bg-gray-400 text-gray-800 text-[10px] px-1.5 py-0.5 rounded uppercase font-bold">Locked</span>
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </article>
  );
}
