import React from "react";
import PanoramicViewer360 from "./PanoramicViewer360";

export default function Tour360Section() {
  return (
    <section id="tour360" className="py-10 sm:py-16 bg-stone-50/80 border-b border-stone-200 relative">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-5 sm:mb-8 gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-100/70 border border-amber-200 text-amber-900 text-[11px] font-semibold mb-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-pulse"></span>
              <span>360° Rooftop Terrace Experience</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900">
              Stand On Our Rooftop Terrace
            </h2>
            <p className="hidden sm:block text-stone-600 text-xs sm:text-sm mt-1 max-w-xl">
              Scroll around 360° directly from our open hotel terrace overlooking Bodhgaya and the sacred Mahabodhi Temple spire in the near distance.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href="https://share.google/u28zYVIFglv8XWTyZ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 px-4 py-2 rounded-full butter-touch shadow-xs flex items-center gap-1.5"
            >
              <span>Open in Google Maps</span>
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>

        {/* Interactive 360 Panoramic Viewer Component */}
        <div className="bg-white p-2 sm:p-3 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-sm">
          <PanoramicViewer360 />
        </div>

        {/* Key Distance & Connectivity Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-4 mt-5 sm:mt-8">
          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-1.5 sm:gap-2 text-stone-900 text-xs sm:text-sm font-bold">
              <span className="text-base sm:text-lg">📍</span>
              <span className="truncate">Maa Annapurna</span>
            </div>
            <p className="hidden sm:block text-xs text-stone-600 mt-1">Sujata Rd, opp. Nagina Palace</p>
            <span className="text-[10.5px] sm:text-[11px] text-emerald-700 font-semibold block mt-1 sm:mt-1.5">Quiet Stay • You Are Here</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-1.5 sm:gap-2 text-stone-900 text-xs sm:text-sm font-bold">
              <span className="text-base sm:text-lg">🛕</span>
              <span className="truncate">Mahabodhi Temple</span>
            </div>
            <p className="hidden sm:block text-xs text-stone-600 mt-1">UNESCO World Heritage Site</p>
            <span className="text-[10.5px] sm:text-[11px] text-amber-800 font-semibold block mt-1 sm:mt-1.5">~2.2 km • 5-7 mins drive</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-1.5 sm:gap-2 text-stone-900 text-xs sm:text-sm font-bold">
              <span className="text-base sm:text-lg">☸️</span>
              <span className="truncate">Great Buddha</span>
            </div>
            <p className="hidden sm:block text-xs text-stone-600 mt-1">80ft Daijokyo Buddhist Statue</p>
            <span className="text-[10.5px] sm:text-[11px] text-amber-800 font-semibold block mt-1 sm:mt-1.5">~2.5 km • 6 mins drive</span>
          </div>

          <div className="p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-stone-200 shadow-2xs">
            <div className="flex items-center gap-1.5 sm:gap-2 text-stone-900 text-xs sm:text-sm font-bold">
              <span className="text-base sm:text-lg">🛺</span>
              <span className="truncate">Local Transport</span>
            </div>
            <p className="hidden sm:block text-xs text-stone-600 mt-1">E-Rickshaws & Taxis 24/7</p>
            <span className="text-[10.5px] sm:text-[11px] text-emerald-700 font-semibold block mt-1 sm:mt-1.5">E-Rickshaws & Cabs 24/7</span>
          </div>
        </div>
      </div>
    </section>
  );
}
