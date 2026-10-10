import React from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import SkyClouds from "./SkyClouds";

interface HeroSectionProps {
  onOpenEnquiry: (roomTitle: string) => void;
  onWhatsAppBooking: (roomTitle?: string) => void;
  onOpenLightbox?: (index: number) => void;
}

export default function HeroSection({
  onOpenEnquiry,
  onWhatsAppBooking,
}: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-white border-b border-stone-200/90 pt-7 pb-6 sm:py-7 lg:py-10">
      {/* Living Atmospheric Snowy-Blue Clouds Drifting Right to Left */}
      <SkyClouds />

      <div className="relative z-10 w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid md:grid-cols-12 gap-2 sm:gap-3 md:gap-6 lg:gap-10 xl:gap-12 items-center">
          
          {/* Mobile Only Top Image (Hidden on Tablet & Desktop) with Calm Green Grass Lawn */}
          <div className="md:hidden flex items-center justify-center pt-4 pb-1 sm:p-0 select-none w-full">
            <Image
              src="/images/buddha-monasteries-grass-mobile.webp"
              alt="Sacred 80 Feet Great Buddha Statue flanked by Bodhgaya Monasteries with calm green grass lawn"
              width={1376}
              height={635}
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 90vw, 600px"
              className="w-full h-auto max-w-[480px] sm:max-w-[580px] object-contain pointer-events-none drop-shadow-xs"
            />
          </div>

          {/* Content Column: Texts & Actions */}
          <ScrollReveal variant="fade" delayMs={0} className="md:col-span-6 space-y-3.5 sm:space-y-4 mt-1 md:mt-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="hidden sm:inline">24/7 Open • Airport &amp; Station Pick &amp; Drop • Tours &amp; Travels • 5 Mins to Mahabodhi</span>
              <span className="sm:hidden">24/7 Open • 5 Mins to Temple</span>
            </div>

            {/* Single targeted H1 */}
            <h1 className="font-serif text-2xl sm:text-3xl lg:text-[2.2rem] xl:text-[2.45rem] font-bold tracking-tight text-stone-900 leading-[1.2]">
              Maa Annapurna Home Stay in Bodhgaya Near Mahabodhi Temple
            </h1>

            <p className="hidden sm:block text-stone-600 text-xs sm:text-sm lg:text-[14.5px] leading-relaxed max-w-xl">
              Experience the warmth of family-run homestay hospitality with modern comfort at <strong className="text-stone-800 font-semibold">Maa Annapurna Home Stay</strong>. Clean AC rooms, private attached hot-water bathrooms, in-room kitchenette suites, 24/7 front desk, and prompt airport/station pick &amp; drop service.
            </p>
            <p className="sm:hidden text-stone-600 text-xs leading-relaxed">
              Peaceful homestay just 5 mins from Mahabodhi Temple with 24/7 front desk, clean AC rooms &amp; travel service.
            </p>

            {/* Highlights Pill Row */}
            <div className="flex flex-wrap gap-2 text-[11px] sm:text-xs text-stone-700 font-medium">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-50/90 border border-amber-200 text-amber-950 font-semibold shadow-2xs">
                <span>🏡</span> Homestay Hospitality
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> 24 Hours Open (24/7)
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> Pick &amp; Drop Service
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> Tours &amp; Travels Desk
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> Split AC in All Rooms
              </span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> 24/7 Geyser Hot Water
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-50 border border-stone-200/90 shadow-2xs">
                <span className="text-emerald-600 font-bold">✓</span> Kitchenette Suites
              </span>
            </div>

            {/* Actions (Hidden on mobile as sticky bottom bar provides quick actions) */}
            <div className="hidden sm:flex flex-wrap items-center gap-2.5 pt-1">
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
          </ScrollReveal>

          {/* Tablet & Desktop Landmark Artwork: Transparent Mahabodhi, 80ft Buddha & Monasteries with Calm Green Grass Lawn */}
          <ScrollReveal variant="fade" delayMs={80} className="hidden md:flex md:col-span-6 items-center justify-center relative select-none">
            <Image
              src="/images/bodhgaya-landmarks-hero.webp"
              alt="Sacred Mahabodhi Temple, 80 Feet Great Buddha statue, and monasteries with green lawn in Bodhgaya"
              width={1200}
              height={896}
              priority
              sizes="(max-width: 1024px) 50vw, 45vw"
              className="w-full h-auto max-w-[540px] xl:max-w-[600px] object-contain pointer-events-none drop-shadow-xs"
            />
          </ScrollReveal>

        </div>
      </div>
    </section>
  );
}
