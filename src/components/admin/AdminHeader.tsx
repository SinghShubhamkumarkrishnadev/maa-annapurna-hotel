import React from "react";
import Link from "next/link";

interface AdminHeaderProps {
  onLogout: () => void;
}

export default function AdminHeader({ onLogout }: AdminHeaderProps) {
  return (
    <header className="sticky top-0 z-40 bg-white border-b border-stone-200 shadow-2xs">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-serif font-bold text-sm">
            MA
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-lg font-bold text-stone-900 leading-none">
                Maa Annapurna Hotel
              </h1>
              <span className="text-[10px] bg-amber-100 text-amber-900 font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Host Admin
              </span>
            </div>
            <p className="text-[11px] text-stone-500 mt-0.5">
              Bodhgaya Live Inventory &amp; Tariff Management
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-xs font-semibold text-stone-700 hover:text-stone-950 bg-stone-100 hover:bg-stone-200 px-3 py-1.5 rounded-lg transition flex items-center gap-1.5"
          >
            <span>View Live Website</span>
            <svg className="w-3.5 h-3.5 text-stone-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          <button
            onClick={onLogout}
            className="text-xs font-semibold text-rose-700 hover:text-rose-900 hover:bg-rose-50 px-3 py-1.5 rounded-lg transition border border-rose-200 cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      </div>
    </header>
  );
}
