import React from "react";
import { RoomItem } from "@/types/hotel";
import RoomCard from "./RoomCard";
import ScrollReveal from "./ScrollReveal";

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
        <ScrollReveal variant="up">
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
        </ScrollReveal>

        {/* Live Room Inventory & Availability Dashboard */}
        <ScrollReveal variant="scale" delayMs={80}>
          <div className="mb-6 sm:mb-8 p-3.5 sm:p-5 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 sm:gap-4">
            <div className="flex items-center gap-2.5 sm:gap-3 w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-emerald-500 animate-pulse shrink-0"></span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-stone-900 truncate">
                      <span className="hidden sm:inline">Live Today&apos;s Room Inventory &amp; Tariff</span>
                      <span className="sm:hidden">Today&apos;s Room Inventory</span>
                    </span>
                    <span className="hidden sm:inline-flex text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shrink-0">
                      Live Updates
                    </span>
                  </div>
                  <p className="hidden sm:block text-xs text-stone-500 mt-0.5">
                    Direct host pricing • 25%–35% lower than online travel portals • No booking commission
                  </p>
                </div>
              </div>

              {/* Mobile-only Live badge cleanly aligned to the right */}
              <span className="sm:hidden text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider whitespace-nowrap shrink-0">
                Live
              </span>
            </div>

            <div className="flex items-center justify-between sm:justify-start w-full md:w-auto gap-2 text-xs pt-1.5 sm:pt-0 border-t border-stone-200/60 sm:border-0">
              <span className="inline-flex items-center gap-1.5 px-2.5 sm:px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 font-medium shadow-2xs text-[11px] sm:text-xs shrink-0">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></span>
                <span>7 Rooms Available</span>
                <span className="hidden sm:inline">Today</span>
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-stone-700 font-medium shadow-2xs">
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                5 Rooms Booked
              </span>
              <a
                href="tel:+919931924027"
                className="inline-flex items-center gap-1 text-amber-800 hover:text-amber-900 font-semibold text-xs px-2.5 py-1 rounded-full bg-amber-50 sm:bg-transparent border border-amber-200/80 sm:border-0 butter-touch shrink-0"
              >
                <span>Instant Call 📞</span>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Room Cards Grid with staggered reveals */}
        <div className="grid md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {activeRooms.map((room, idx) => (
            <ScrollReveal key={room.id} variant="up" delayMs={idx * 100}>
              <RoomCard
                room={room}
                onOpenEnquiry={onOpenEnquiry}
                onWhatsAppBooking={onWhatsAppBooking}
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
