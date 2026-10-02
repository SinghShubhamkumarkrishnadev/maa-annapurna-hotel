import React from "react";
import { FaqItem } from "@/types/hotel";

interface FaqAccordionItemProps {
  faq: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}

export default function FaqAccordionItem({
  faq,
  isOpen,
  onToggle,
}: FaqAccordionItemProps) {
  return (
    <div
      className={`rounded-2xl border transition-all duration-300 ease-in-out overflow-hidden group ${
        isOpen
          ? "bg-white border-amber-300/80 shadow-md shadow-amber-900/5 ring-1 ring-amber-200/50"
          : "bg-stone-50/60 hover:bg-stone-50/90 border-stone-200/90 shadow-2xs hover:border-stone-300"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full text-left p-3.5 sm:p-5 flex items-center justify-between gap-3 sm:gap-4 transition-colors cursor-pointer select-none butter-touch"
        aria-expanded={isOpen}
      >
        <span
          className={`text-xs sm:text-base transition-colors duration-200 ${
            isOpen ? "font-bold text-amber-950" : "font-semibold text-stone-900 group-hover:text-amber-900"
          }`}
        >
          {faq.q}
        </span>
        <span
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-in-out ${
            isOpen
              ? "bg-amber-100 text-amber-900 rotate-180 shadow-2xs"
              : "bg-white text-stone-400 border border-stone-200/80 group-hover:text-stone-700 group-hover:border-stone-300"
          }`}
        >
          <svg
            className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Smooth Grid-Template-Rows Expand / Collapse Animation */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5 pt-1 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100/90">
            {faq.a}
          </div>
        </div>
      </div>
    </div>
  );
}
