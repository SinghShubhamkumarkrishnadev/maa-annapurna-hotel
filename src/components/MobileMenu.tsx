import React from "react";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenEnquiry: (roomTitle: string) => void;
}

export default function MobileMenu({ isOpen, onClose, onOpenEnquiry }: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <div className="lg:hidden border-t border-stone-200/90 bg-white/98 backdrop-blur-md px-4 pt-3 pb-5 space-y-1.5 shadow-xl animate-in fade-in slide-in-from-top-2 duration-200">
      <a
        href="#rooms"
        onClick={onClose}
        className="block py-2.5 px-3 rounded-xl text-stone-800 text-sm font-medium hover:text-amber-800 hover:bg-stone-50 butter-touch"
      >
        Rooms &amp; Family Suites
      </a>
      <a
        href="#tour360"
        onClick={onClose}
        className="py-2.5 px-3 rounded-xl text-amber-900 text-sm font-semibold hover:bg-amber-50/70 flex items-center justify-between butter-touch"
      >
        <span>360° Panoramic Tour</span>
        <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full font-bold">New</span>
      </a>
      <a
        href="#gallery"
        onClick={onClose}
        className="block py-2.5 px-3 rounded-xl text-stone-800 text-sm font-medium hover:text-amber-800 hover:bg-stone-50 butter-touch"
      >
        HD Photo Tour
      </a>
      <a
        href="#amenities"
        onClick={onClose}
        className="block py-2.5 px-3 rounded-xl text-stone-800 text-sm font-medium hover:text-amber-800 hover:bg-stone-50 butter-touch"
      >
        Hotel Amenities
      </a>
      <a
        href="#location"
        onClick={onClose}
        className="block py-2.5 px-3 rounded-xl text-stone-800 text-sm font-medium hover:text-amber-800 hover:bg-stone-50 butter-touch"
      >
        Location &amp; Vicinity
      </a>
      <a
        href="#reviews"
        onClick={onClose}
        className="py-2.5 px-3 rounded-xl text-amber-950 text-sm font-semibold hover:bg-amber-50/70 flex items-center justify-between butter-touch"
      >
        <span>Guest Reviews &amp; Ratings</span>
        <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full font-bold">4.9 ★</span>
      </a>
      <a
        href="#faq"
        onClick={onClose}
        className="block py-2.5 px-3 rounded-xl text-stone-800 text-sm font-medium hover:text-amber-800 hover:bg-stone-50 butter-touch"
      >
        Bodhgaya FAQs
      </a>
      <div className="pt-2 flex flex-col gap-2">
        <a
          href="tel:+919931924027"
          className="w-full py-2.5 text-center text-xs font-semibold text-stone-800 border border-stone-300 rounded-xl bg-stone-50 butter-touch"
        >
          📞 Call: +91 99319 24027
        </a>
        <button
          onClick={() => {
            onClose();
            onOpenEnquiry("Deluxe AC Double Room");
          }}
          className="w-full py-2.5 text-center text-xs font-semibold text-white bg-stone-900 rounded-xl shadow-xs butter-touch cursor-pointer"
        >
          Instant Room Enquiry
        </button>
      </div>
    </div>
  );
}
