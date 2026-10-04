import React from "react";
import Image from "next/image";
import ScrollReveal from "./ScrollReveal";

export default function Footer() {
  return (
    <footer className="bg-stone-900 text-stone-400 text-xs border-t border-stone-800 pt-10 sm:pt-12 pb-24 md:pb-12">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <ScrollReveal variant="up">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 pb-6 sm:pb-8 border-b border-stone-800">
            <div>
              <div className="flex items-center gap-2.5 mb-2">
                <div className="relative w-8 h-8 rounded-lg overflow-hidden shrink-0 border border-amber-600/30">
                  <Image
                    src="/icon.svg"
                    alt="Maa Annapurna Hotel Emblem"
                    width={32}
                    height={32}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span className="font-serif text-lg font-bold text-white tracking-wide">
                  Maa Annapurna Home Stay &amp; Hotel
                </span>
              </div>
              <p className="hidden sm:block mt-2 text-stone-400 leading-relaxed text-xs">
                A serene family-run home stay and hotel in Bodhgaya open 24 hours (24/7) offering airport &amp; railway station pick &amp; drop service, tours and travels packages, fully air-conditioned rooms, attached modern bathrooms, kitchenette amenities, and heartfelt service for temple pilgrims, yatras, and world travelers.
              </p>
              <p className="sm:hidden mt-2 text-stone-400 leading-relaxed text-xs">
                Peaceful home stay &amp; hotel in Bodhgaya near Mahabodhi Temple with 24/7 front desk &amp; travel service.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5 sm:mb-3">Quick Navigation</h5>
              <div className="grid grid-cols-2 gap-2 text-stone-400">
                <a href="#rooms" className="hover:text-white transition">Rooms &amp; Suites</a>
                <a href="#gallery" className="hover:text-white transition">Photo Tour</a>
                <a href="#amenities" className="hover:text-white transition">Home Stay &amp; Hotel Amenities</a>
                <a href="#reviews" className="hover:text-white transition">Guest Reviews</a>
                <a href="#faq" className="hover:text-white transition">Travel FAQs</a>
                <a href="#contact" className="hover:text-white transition">Direct Booking</a>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-2.5 sm:mb-3">Contact &amp; Address (NAP)</h5>
              <p className="text-stone-400 font-medium">Maa Annapurna Home Stay &amp; Hotel</p>
              <p className="text-stone-400">Sujata Rd, opposite Nagina Palace and Hotel Star, Bodhgaya, Bihar 824231, India</p>
              <p className="mt-2">
                Direct Phone:{" "}
                <a href="tel:+919931924027" className="text-amber-400 hover:underline">
                  +91 99319 24027
                </a>
              </p>
              <p className="mt-1.5 text-emerald-400 font-medium">✓ 24/7 Front Desk • Instant WhatsApp Booking</p>
              <p className="hidden sm:block mt-1 text-stone-300">✓ Airport Pick &amp; Drop • Tours &amp; Travels Desk</p>
            </div>
          </div>

          <div className="pt-5 sm:pt-6 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-2">
            <p>© {new Date().getFullYear()} Maa Annapurna Home Stay &amp; Hotel Bodhgaya. All rights reserved.</p>
            <p className="text-[11px] hidden sm:inline">100% SEO Optimized • Fast &amp; Lightweight Experience</p>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
