import React from "react";
import { RoomItem } from "@/types/hotel";
import RoomCard from "./RoomCard";

interface RoomsSectionProps {
  rooms: RoomItem[];
  onOpenEnquiry: (roomTitle: string) => void;
  onWhatsAppBooking: (roomTitle?: string) => void;
}

export default function RoomsSection({
  rooms,
  onOpenEnquiry,
  onWhatsAppBooking,
}: RoomsSectionProps) {
  const activeRooms = rooms.filter((r) => r.isActive !== false);

  return (
    <section id="rooms" className="py-12 sm:py-20 bg-white">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Accommodation in Bodhgaya
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 mt-1 sm:mt-1.5">
              AC Rooms &amp; Family Suites Near Mahabodhi Temple
            </h2>
            <p className="hidden sm:block text-stone-500 text-sm sm:text-base mt-2 max-w-xl">
              Every room at Maa Annapurna Hotel is equipped with a private attached bathroom, hot water geyser, and split air conditioning.
            </p>
          </div>
          <div className="hidden sm:block mt-4 md:mt-0">
            <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full font-medium">
              ✓ 100% Genuine Photos of Hotel
            </span>
          </div>
        </div>

        {/* Live Room Inventory & Availability Dashboard */}
        <div className="mb-6 sm:mb-8 p-3.5 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-bold text-stone-900">
                  Live Today&apos;s Room Inventory &amp; Tariff
                </span>
                <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Live Updates
                </span>
              </div>
              <p className="hidden sm:block text-xs text-stone-500 mt-0.5">
                Direct host pricing • 25%–35% lower than online travel portals • No booking commission
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 font-medium shadow-2xs text-[11px] sm:text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              7 Rooms Available Today
            </span>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 font-medium shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              5 Rooms Booked
            </span>
            <a
              href="tel:+919931924027"
              className="inline-flex items-center gap-1 text-amber-800 font-semibold hover:underline ml-1 text-xs butter-touch"
            >
              <span>Instant Call 📞</span>
            </a>
          </div>
        </div>

        {/* Room Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {activeRooms.map((room) => (
            <RoomCard
              key={room.id}
              room={room}
              onOpenEnquiry={onOpenEnquiry}
              onWhatsAppBooking={onWhatsAppBooking}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
