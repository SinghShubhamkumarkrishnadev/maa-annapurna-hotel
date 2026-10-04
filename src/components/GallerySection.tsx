"use client";

import React, { useState } from "react";
import Image from "next/image";
import { PhotoItem } from "@/types/hotel";
import ScrollReveal from "./ScrollReveal";

interface GallerySectionProps {
  images: PhotoItem[];
  isLoading?: boolean;
  onSelectImage: (index: number) => void;
}

export default function GallerySection({ images, isLoading = false, onSelectImage }: GallerySectionProps) {
  const [filter, setFilter] = useState<"all" | "rooms" | "bathrooms">("all");

  const filteredImages = images.filter((img) =>
    filter === "all" ? true : img.category === filter
  );

  return (
    <section id="gallery" className="py-12 sm:py-20 bg-stone-50/80 border-y border-stone-200">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <ScrollReveal variant="up">
          <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Visual Tour
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 mt-1">
              Inside Maa Annapurna Home Stay &amp; Hotel Bodhgaya
            </h2>
            <p className="hidden sm:block text-stone-500 text-sm mt-2">
              Browse authentic photographs of our AC bedrooms, attached modern bathrooms, kitchenette facilities, and clean interiors.
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-1.5 sm:gap-2 mt-4 sm:mt-6">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold butter-touch cursor-pointer ${
                  filter === "all"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <span className="hidden sm:inline">All Photos</span>
                <span className="sm:hidden">All</span> ({images.length})
              </button>
              <button
                onClick={() => setFilter("rooms")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold butter-touch cursor-pointer ${
                  filter === "rooms"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <span className="hidden sm:inline">Bedrooms &amp; AC</span>
                <span className="sm:hidden">Rooms</span> ({images.filter((i) => i.category === "rooms").length})
              </button>
              <button
                onClick={() => setFilter("bathrooms")}
                className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-semibold butter-touch cursor-pointer ${
                  filter === "bathrooms"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                <span className="hidden sm:inline">Bathrooms &amp; Geyser</span>
                <span className="sm:hidden">Baths</span> ({images.filter((i) => i.category === "bathrooms").length})
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Gallery Bento Grid with smooth staggered scale reveals */}
        {isLoading || filteredImages.length === 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className={`rounded-xl bg-stone-200 ${
                  i % 3 === 0 ? "aspect-[9/16] row-span-2" : "aspect-[16/10]"
                }`}
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredImages.map((image, idx) => (
              <ScrollReveal
                as="figure"
                key={image.id}
                variant="scale"
                delayMs={(idx % 4) * 75}
                onClick={() => {
                  const originalIndex = images.findIndex((img) => img.id === image.id);
                  onSelectImage(originalIndex >= 0 ? originalIndex : 0);
                }}
                className={`relative rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer border border-stone-200 bg-stone-100 butter-touch ${
                  image.height > image.width ? "aspect-[9/16] row-span-2" : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                  <figcaption className="text-xs font-semibold line-clamp-1">{image.title}</figcaption>
                  <span className="text-[10px] text-stone-300">Tap to expand HD</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
