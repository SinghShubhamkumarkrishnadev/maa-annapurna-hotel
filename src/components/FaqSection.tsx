"use client";

import React, { useState } from "react";
import { FaqItem } from "@/types/hotel";
import FaqAccordionItem from "./FaqAccordionItem";

interface FaqSectionProps {
  faqs: FaqItem[];
}

export default function FaqSection({ faqs }: FaqSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-12 sm:py-20 bg-white border-t border-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-6 sm:mb-10">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
            Helpful Travel Information
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-stone-900 mt-1">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="hidden sm:block text-stone-500 text-sm mt-2">
            Common questions answered for visitors planning their pilgrimage and stay in Bodhgaya.
          </p>
        </div>

        <div className="space-y-2.5 sm:space-y-3">
          {faqs.map((faq, index) => (
            <FaqAccordionItem
              key={index}
              faq={faq}
              isOpen={openFaqIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
