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
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState<"normal" | "reverse">("normal");
  const [speedMultiplier, setSpeedMultiplier] = useState<number>(1);
  const [isHovered, setIsHovered] = useState(false);

  // Base duration is 32 seconds at 1x speed
  const durationSeconds = Math.round(32 / speedMultiplier);

  const togglePlay = () => {
    setIsPlaying((prev) => !prev);
  };

  const toggleDirection = () => {
    setDirection((prev) => (prev === "normal" ? "reverse" : "normal"));
  };

  const cycleSpeed = () => {
    // Cycles: 1x -> 1.5x -> 2x -> 0.6x -> 1x
    setSpeedMultiplier((prev) => {
      if (prev === 1) return 1.5;
      if (prev === 1.5) return 2;
      if (prev === 2) return 0.6;
      return 1;
    });
  };

  const playState = !isPlaying || isHovered ? "paused" : "running";

  return (
    <div className="bg-stone-950 text-stone-300 text-[11px] sm:text-xs py-1.5 px-3 sm:px-6 lg:px-8 xl:px-10 border-b border-stone-800 select-none">
      <div className="w-full max-w-[1536px] mx-auto flex items-center justify-between gap-3">
        {/* Left Live Badge */}
        <div className="flex items-center gap-1.5 shrink-0 pr-2 border-r border-stone-800/80">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            Live
          </span>
        </div>

        {/* Marquee Viewport with subtle edge masks */}
        <div
          className="flex-1 overflow-hidden relative group cursor-grab active:cursor-grabbing mask-radial"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          onTouchEnd={() => setIsHovered(false)}
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          }}
          title="Hover or touch to pause. Use controls to stop or reverse rotation."
        >
          <div
            className="marquee-track flex items-center gap-6 sm:gap-8 whitespace-nowrap"
            style={
              {
                "--marquee-duration": `${durationSeconds}s`,
                "--marquee-direction": direction,
                "--marquee-play-state": playState,
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

        {/* User Marquee Controls Bar - Desktop Large Screens Only */}
        <div className="hidden lg:flex items-center gap-1.5 pl-2 border-l border-stone-800/80 shrink-0">
          {/* Pause / Play button */}
          <button
            onClick={togglePlay}
            className="h-6 w-6 sm:h-6 sm:w-6 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white flex items-center justify-center transition border border-stone-800 cursor-pointer butter-touch"
            aria-label={isPlaying ? "Pause marquee rotation" : "Play marquee rotation"}
            title={isPlaying ? "Stop / Pause rotation" : "Play / Resume rotation"}
          >
            {isPlaying ? (
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>

          {/* Rotate Direction toggle (Right to Left vs Left to Right) */}
          <button
            onClick={toggleDirection}
            className={`h-6 px-1.5 rounded-md text-[10px] sm:text-[11px] font-semibold flex items-center gap-1 border transition cursor-pointer butter-touch ${
              direction === "reverse"
                ? "bg-amber-900/60 text-amber-300 border-amber-700"
                : "bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white border-stone-800"
            }`}
            aria-label="Reverse rotation direction"
            title={`Click to reverse direction (currently ${
              direction === "normal" ? "Right to Left ◄" : "Left to Right ►"
            })`}
          >
            <span className="text-[11px]">{direction === "normal" ? "◄" : "►"}</span>
            <span className="hidden md:inline">Rotate</span>
          </button>

          {/* Speed Toggle */}
          <button
            onClick={cycleSpeed}
            className="h-6 px-1.5 rounded-md bg-stone-900 hover:bg-stone-800 text-stone-300 hover:text-white text-[10px] font-mono border border-stone-800 flex items-center justify-center transition cursor-pointer butter-touch"
            title="Click to change scroll speed (1x, 1.5x, 2x, 0.6x)"
            aria-label={`Scroll speed: ${speedMultiplier}x`}
          >
            <span>{speedMultiplier}x</span>
          </button>

          {/* Direct Phone Call Link on Desktop */}
          <div className="hidden lg:flex items-center pl-2 ml-1 border-l border-stone-800">
            <a
              href="tel:+919931924027"
              className="text-stone-300 hover:text-white transition-colors flex items-center gap-1.5 font-medium butter-touch text-[11px]"
            >
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 99319 24027</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
