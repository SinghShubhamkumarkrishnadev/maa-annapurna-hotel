"use client";

import React, { useState } from "react";

const MARQUEE_ITEMS = [
  { text: "24/7 Open", highlight: true, icon: "🟢" },
  { text: "Airport & Railway Pick & Drop", highlight: false, icon: "✈️" },
  { text: "Tours & Travels Desk", highlight: false, icon: "🚕" },
  { text: "Direct Booking Guarantee", highlight: true, icon: "⚡" },
  { text: "5 Mins to Mahabodhi Temple", highlight: false, icon: "🛕" },
  { text: "Split AC in All Rooms", highlight: false, icon: "❄️" },
  { text: "24/7 Hot Water Geyser", highlight: false, icon: "🚿" },
  { text: "Kitchenette Suites Available", highlight: false, icon: "🍳" },
];

export default function TopBanner() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="bg-stone-950 text-stone-300 text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 lg:px-8 xl:px-10 border-b border-stone-800 select-none">
      <div className="w-full max-w-[1536px] mx-auto flex items-center justify-between gap-3">
        {/* Left Live Pulse Badge */}
        <div className="flex items-center gap-1.5 shrink-0 pr-2.5 border-r border-stone-800/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            24/7 Live
          </span>
        </div>

        {/* Infinite Marquee Viewport with subtle edge gradient fades */}
        <div
          className="flex-1 overflow-hidden relative cursor-default"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 3%, black 97%, transparent)",
          }}
          title="Hover or touch to pause marquee"
        >
          <div
            className="marquee-track flex items-center gap-6 sm:gap-8 whitespace-nowrap"
            style={
              {
                "--marquee-duration": "30s",
                "--marquee-direction": "normal",
                "--marquee-play-state": isHovered ? "paused" : "running",
              } as React.CSSProperties
            }
          >
            {/* Set 1 */}
            <div className="flex items-center gap-6 sm:gap-8 shrink-0">
              {MARQUEE_ITEMS.map((item, idx) => (
                <div key={`set1-${idx}`} className="inline-flex items-center gap-1.5 shrink-0">
                  <span className="text-xs">{item.icon}</span>
                  <span
                    className={
                      item.highlight
                        ? "text-emerald-400 font-bold"
                        : "text-stone-200 font-medium"
                    }
                  >
                    {item.text}
                  </span>
                  <span className="text-stone-700 ml-2 font-bold">•</span>
                </div>
              ))}
            </div>

            {/* Set 2 (Identical duplicate for seamless continuous infinite loop) */}
            <div className="flex items-center gap-6 sm:gap-8 shrink-0" aria-hidden="true">
              {MARQUEE_ITEMS.map((item, idx) => (
                <div key={`set2-${idx}`} className="inline-flex items-center gap-1.5 shrink-0">
                  <span className="text-xs">{item.icon}</span>
                  <span
                    className={
                      item.highlight
                        ? "text-emerald-400 font-bold"
                        : "text-stone-200 font-medium"
                    }
                  >
                    {item.text}
                  </span>
                  <span className="text-stone-700 ml-2 font-bold">•</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Direct Phone & Location link for desktop */}
        <div className="hidden sm:flex items-center gap-3 pl-3 border-l border-stone-800 shrink-0">
          <a
            href="tel:+919931924027"
            className="text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium butter-touch text-[11px]"
          >
            <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span>+91 99319 24027</span>
          </a>
          <span className="text-stone-700 hidden lg:inline">|</span>
          <span className="text-amber-400 font-medium hidden lg:inline text-[11px]">
            5 Mins to Mahabodhi Temple
          </span>
        </div>
      </div>
    </div>
  );
}
