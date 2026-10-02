import React from "react";
import { NearbyPlace } from "@/types/hotel";

interface LocationSectionProps {
  nearbyPlaces: NearbyPlace[];
  onOpenEnquiry: (roomTitle: string) => void;
}

export default function LocationSection({
  nearbyPlaces,
  onOpenEnquiry,
}: LocationSectionProps) {
  return (
    <section id="location" className="py-12 sm:py-20 bg-stone-50/70 border-t border-stone-200">
      <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Vicinity Details */}
          <div className="lg:col-span-6 space-y-4 sm:space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Strategic Bodhgaya Location
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 mt-1">
                Minutes from Sacred Shrines &amp; Monasteries
              </h2>
              <p className="hidden sm:block text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
                Located in a serene Bodhgaya neighborhood away from street traffic, yet conveniently close to the UNESCO Mahabodhi Temple and International Monasteries.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3">
              {nearbyPlaces.map((place, idx) => (
                <div
                  key={idx}
                  className="p-3 sm:p-3.5 rounded-xl bg-white border border-stone-200 flex items-center gap-3 shadow-2xs butter-touch"
                >
                  <span className="text-lg sm:text-xl shrink-0">{place.icon}</span>
                  <div className="min-w-0">
                    <h4 className="text-xs font-bold text-stone-900 truncate">{place.name}</h4>
                    <p className="text-[11px] text-stone-500 font-medium">{place.distance}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-1 sm:pt-2">
              <a
                href="https://share.google/u28zYVIFglv8XWTyZ"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-full bg-white border border-stone-300 text-stone-800 font-semibold text-xs hover:bg-stone-100 transition shadow-2xs butter-touch"
              >
                <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <span>Open Maa Annapurna on Google Maps</span>
                <svg className="w-3.5 h-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Map & NAP Card */}
          <div className="lg:col-span-6">
            <div className="bg-white p-5 sm:p-8 rounded-2xl sm:rounded-3xl border border-stone-200 shadow-lg">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-bold shrink-0">
                  📍
                </div>
                <div>
                  <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    Maa Annapurna Home Stay &amp; Hotel
                  </h3>
                  <p className="hidden sm:block text-xs text-stone-500">Sujata Rd, opposite Nagina Palace and Hotel Star, Bodh Gaya, Bihar 824231</p>
                  <p className="sm:hidden text-[11px] text-stone-500">Sujata Rd, Bodh Gaya, Bihar 824231</p>
                </div>
              </div>

              <div className="space-y-2 sm:space-y-2.5 text-xs text-stone-600 border-t border-stone-100 pt-3 sm:pt-4">
                <div className="flex justify-between py-1 border-b border-stone-50">
                  <span className="font-medium text-stone-500">Front Desk:</span>
                  <span className="font-semibold text-emerald-700 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    24 Hours Open (24/7 Assistance)
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-50">
                  <span className="font-medium text-stone-500">Pick &amp; Drop:</span>
                  <span className="font-semibold text-stone-800">Airport (GAY) &amp; Railway Station</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-50">
                  <span className="font-medium text-stone-500">Tours &amp; Travels:</span>
                  <span className="font-semibold text-stone-800">Bodhgaya, Rajgir, Nalanda &amp; Caves</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-50">
                  <span className="font-medium text-stone-500">Check-In Time:</span>
                  <span className="font-semibold text-stone-800">12:00 PM (24/7 Flexible check-in)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-50">
                  <span className="font-medium text-stone-500">Check-Out Time:</span>
                  <span className="font-semibold text-stone-800">11:00 AM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-50">
                  <span className="font-medium text-stone-500">Direct Phone:</span>
                  <a href="tel:+919931924027" className="font-semibold text-amber-800 hover:underline butter-touch">
                    +91 99319 24027
                  </a>
                </div>
                <div className="hidden sm:flex justify-between py-1">
                  <span className="font-medium text-stone-500">Spoken Languages:</span>
                  <span className="font-semibold text-stone-800">Hindi, English</span>
                </div>
              </div>

              <div className="mt-5 sm:mt-6 pt-3 sm:pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-2.5">
                <button
                  onClick={() => onOpenEnquiry("Deluxe AC Double Room")}
                  className="flex-1 py-2.5 sm:py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs text-center butter-touch cursor-pointer"
                >
                  Direct Room Booking
                </button>
                <a
                  href="tel:+919931924027"
                  className="py-2.5 sm:py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs text-center butter-touch flex items-center justify-center gap-1.5"
                >
                  📞 Call Host
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
