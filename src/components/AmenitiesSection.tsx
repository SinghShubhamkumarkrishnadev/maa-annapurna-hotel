import React from "react";
import { AmenityItem } from "@/types/hotel";
import AmenityCard from "./AmenityCard";
import ScrollReveal from "./ScrollReveal";

interface AmenitiesSectionProps {
  amenities: AmenityItem[];
}

export default function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  return (
    <section id="amenities" className="py-12 sm:py-20 bg-white">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <ScrollReveal variant="up">
          <div className="text-center max-w-xl mx-auto mb-6 sm:mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Homestay Warmth &amp; Modern Comforts
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 mt-1">
              Home Stay Amenities in Bodhgaya
            </h2>
            <p className="hidden sm:block text-stone-500 text-sm mt-2">
              Combining heartfelt family-run homestay care with modern AC comforts to ensure every pilgrim and traveler feels at home.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {amenities.map((item, idx) => (
            <ScrollReveal key={idx} variant="up" delayMs={(idx % 3) * 90}>
              <AmenityCard amenity={item} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
