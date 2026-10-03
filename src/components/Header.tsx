import React, { useState } from "react";
import Image from "next/image";
import TopBanner from "./TopBanner";
import MobileMenu from "./MobileMenu";

interface HeaderProps {
  onOpenEnquiry: (roomTitle: string) => void;
}

export default function Header({ onOpenEnquiry }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <TopBanner />
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/90 shadow-2xs">
        <div className="w-full max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-10 h-16 lg:h-[68px] flex items-center justify-between gap-4 lg:gap-6">
          {/* Logo with Emblem Icon & Generous Breathing Space */}
          <a
            href="#"
            className="flex items-center gap-2.5 shrink-0 group py-1 pr-4 lg:pr-6"
            title="Maa Annapurna Home Stay & Hotel Bodhgaya"
          >
            <div className="relative w-8 h-8 sm:w-9 sm:h-9 rounded-xl overflow-hidden shrink-0 shadow-2xs border border-amber-900/10 group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/icon.svg"
                alt="Maa Annapurna Hotel Emblem"
                width={36}
                height={36}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <span className="font-serif text-lg sm:text-[21px] font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition-colors leading-tight whitespace-nowrap">
                Maa Annapurna
              </span>
              <span className="text-[9px] sm:text-[9.5px] tracking-[0.2em] uppercase font-semibold text-amber-800/80 leading-none mt-0.5 whitespace-nowrap">
                Home Stay &amp; Hotel • Bodhgaya
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[13px] font-medium text-stone-600 whitespace-nowrap shrink-0">
            <a
              href="#rooms"
              className="px-3 py-1.5 rounded-full hover:text-stone-950 hover:bg-stone-100/70 transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
            >
              Rooms &amp; Suites
            </a>
            <a
              href="#gallery"
              className="px-3 py-1.5 rounded-full hover:text-stone-950 hover:bg-stone-100/70 transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
            >
              Photo Tour
            </a>
            <a
              href="#amenities"
              className="px-3 py-1.5 rounded-full hover:text-stone-950 hover:bg-stone-100/70 transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
            >
              Amenities
            </a>
            <a
              href="#location"
              className="px-3 py-1.5 rounded-full hover:text-stone-950 hover:bg-stone-100/70 transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
            >
              Location
            </a>
            <a
              href="#reviews"
              className="px-3 py-1.5 rounded-full hover:text-stone-950 hover:bg-stone-100/70 transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
            >
              Reviews
            </a>
            <a
              href="#faq"
              className="px-3 py-1.5 rounded-full hover:text-stone-950 hover:bg-stone-100/70 transition-colors whitespace-nowrap shrink-0 inline-flex items-center hidden xl:inline-flex"
            >
              FAQs
            </a>
            <a
              href="#contact"
              className="px-3 py-1.5 rounded-full hover:text-stone-950 hover:bg-stone-100/70 transition-colors whitespace-nowrap shrink-0 inline-flex items-center"
            >
              Contact
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5 shrink-0">
            <a
              href="tel:+919931924027"
              className="h-9 px-3.5 sm:px-4 text-xs font-semibold text-stone-700 bg-white hover:bg-stone-50 border border-stone-300 rounded-full butter-touch flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
            >
              <svg className="w-3.5 h-3.5 text-stone-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Host</span>
            </a>

            <button
              onClick={() => onOpenEnquiry("Deluxe AC Double Room")}
              className="h-9 px-4 sm:px-4.5 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-full butter-touch flex items-center gap-1.5 shadow-xs cursor-pointer whitespace-nowrap"
            >
              <span>Book / Enquire</span>
              <svg className="w-3.5 h-3.5 text-amber-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        <MobileMenu
          isOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
          onOpenEnquiry={onOpenEnquiry}
        />
      </header>
    </>
  );
}
