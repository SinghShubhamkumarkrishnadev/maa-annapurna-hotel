import React from "react";
import Image from "next/image";

interface HeroSectionProps {
  onOpenEnquiry: (roomTitle: string) => void;
  onWhatsAppBooking: (roomTitle?: string) => void;
  onOpenLightbox: (index: number) => void;
}

export default function HeroSection({
  onOpenEnquiry,
  onWhatsAppBooking,
  onOpenLightbox,
}: HeroSectionProps) {
  return (
    <section className="relative bg-gradient-to-b from-stone-50/80 via-white to-stone-50/40 border-b border-stone-200/90 py-5 sm:py-6 lg:py-6 xl:py-7">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10 items-center">
          {/* Left Content Column */}
          <div className="lg:col-span-6 space-y-3.5 sm:space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">24/7 Open • Airport &amp; Station Pick &amp; Drop • Tours &amp; Travels • 5 Mins to Mahabodhi</span>
              <span className="sm:hidden">24/7 Open • 5 Mins to Temple</span>
            </div>

            {/* Single targeted H1 */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-[2.1rem] xl:text-[2.35rem] font-bold tracking-tight text-stone-900 leading-[1.2]">
              Peaceful Hotel &amp; Home Stay in Bodhgaya Near Mahabodhi Temple
            </h1>

            <p className="hidden sm:block text-stone-600 text-xs sm:text-sm lg:text-[14px] leading-relaxed max-w-xl">
              Authentic pilgrimage hospitality at Maa Annapurna Home Stay. Clean AC rooms, private attached hot-water bathrooms, in-room kitchenette options, 24/7 front desk, and prompt airport/station pick &amp; drop service.
            </p>
            <p className="sm:hidden text-stone-600 text-xs leading-relaxed">
              Clean AC rooms &amp; family suites just 5 mins from Mahabodhi Temple with 24/7 front desk &amp; travel service.
            </p>

            {/* Highlights Pill Row */}
            <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs text-stone-700 font-medium">
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> 24 Hours Open (24/7)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> Pick &amp; Drop Service
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> Tours &amp; Travels Desk
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> Split AC in All Rooms
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> 24/7 Geyser Hot Water
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> Kitchenette Suites
              </span>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-2.5 pt-0.5">
              <button
                onClick={() => onOpenEnquiry("Deluxe AC Double Room")}
                className="h-10 px-5 sm:px-5.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-[13px] butter-touch shadow-xs hover:shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Book / Check Availability</span>
                <svg className="w-3.5 h-3.5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>

              <button
                onClick={() => onWhatsAppBooking("General Inquiry")}
                className="h-10 px-4.5 sm:px-5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-[13px] butter-touch shadow-xs hover:shadow flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
                </svg>
                <span>WhatsApp Inquiry</span>
              </button>
            </div>
          </div>

          {/* Right Photo Showcase */}
          <div className="lg:col-span-6 h-[250px] sm:h-[280px] lg:h-[320px] xl:h-[340px]">
            <div className="grid grid-cols-12 gap-2.5 sm:gap-3 h-full">
              {/* Large Featured Photo */}
              <div
                onClick={() => onOpenLightbox(0)}
                className="col-span-7 relative h-full rounded-2xl overflow-hidden shadow-sm hover:shadow-md group cursor-pointer border border-stone-200/80 bg-stone-100"
              >
                <Image
                  src="/images/room-triple-kitchenette.jpg"
                  alt="Triple Bed Room with Kitchenette at Maa Annapurna Home Stay Bodhgaya"
                  fill
                  sizes="(max-width: 768px) 60vw, 30vw"
                  className="object-cover group-hover:scale-103 transition duration-500"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/75 via-stone-950/20 to-transparent flex items-end p-3 sm:p-4">
                  <div className="text-white">
                    <span className="text-[10px] font-semibold tracking-wider uppercase bg-stone-900/80 backdrop-blur-xs px-2 py-0.5 rounded">
                      Triple Room + Kitchenette
                    </span>
                    <p className="hidden sm:block text-[11px] sm:text-xs text-stone-200 mt-1 font-medium line-clamp-1">
                      Spacious layout with split AC &amp; private bathroom
                    </p>
                  </div>
                </div>
                <div className="absolute top-2.5 right-2.5 bg-white/90 backdrop-blur-xs text-stone-800 text-[10px] font-semibold px-2 py-0.5 rounded-full shadow-2xs">
                  HD Photo
                </div>
              </div>

              {/* Right Stack of Two Proportional Supporting Images */}
              <div className="col-span-5 flex flex-col gap-2.5 sm:gap-3 h-full">
                <div
                  onClick={() => onOpenLightbox(1)}
                  className="relative flex-1 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs group cursor-pointer border border-stone-200/80 bg-stone-100"
                >
                  <Image
                    src="/images/deluxe-room-dressing-table.jpg"
                    alt="Deluxe AC Bedroom at Maa Annapurna Hotel Bodhgaya"
                    fill
                    sizes="(max-width: 768px) 40vw, 20vw"
                    className="object-cover group-hover:scale-103 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-semibold text-white">Deluxe AC Room</span>
                  </div>
                </div>

                <div
                  onClick={() => onOpenLightbox(7)}
                  className="relative flex-1 rounded-xl overflow-hidden shadow-2xs hover:shadow-xs group cursor-pointer border border-stone-200/80 bg-stone-100"
                >
                  <Image
                    src="/images/bathroom-shower-tiled.jpg"
                    alt="Clean Attached Bathroom with Geyser at Hotel in Bodhgaya"
                    fill
                    sizes="(max-width: 768px) 40vw, 20vw"
                    className="object-cover group-hover:scale-103 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 to-transparent flex items-end p-2.5">
                    <span className="text-[11px] font-semibold text-white">Attached Modern Bath</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
