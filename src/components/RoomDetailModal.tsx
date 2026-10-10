"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { RoomItem } from "@/types/hotel";
import { getRoomExtendedData, RoomGalleryPhoto } from "@/data/roomGalleries";

interface RoomDetailModalProps {
  room: RoomItem | null;
  allRooms: RoomItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherRoom: (room: RoomItem) => void;
  onOpenEnquiry: (roomTitle: string) => void;
  onWhatsAppBooking: (roomTitle?: string) => void;
}

export default function RoomDetailModal({
  room,
  allRooms,
  isOpen,
  onClose,
  onSelectAnotherRoom,
  onOpenEnquiry,
  onWhatsAppBooking,
}: RoomDetailModalProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "amenities" | "rules">("overview");
  const [copiedShare, setCopiedShare] = useState(false);

  // Reset active photo when room changes
  useEffect(() => {
    setActivePhotoIndex(0);
    setActiveTab("overview");
  }, [room?.id]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // Keyboard navigation (Escape to close, Left/Right for photos)
  useEffect(() => {
    if (!isOpen || !room) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLightboxOpen, onClose, room]);

  if (!isOpen || !room) return null;

  const extData = getRoomExtendedData(room.id);
  const photos: RoomGalleryPhoto[] = extData.photos.length > 0
    ? extData.photos
    : [{ src: room.image, alt: room.alt, caption: room.name, tag: "Room Photo" }];

  const activePhoto = photos[activePhotoIndex] || photos[0];

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const shareUrl = `${window.location.origin}/#room-${room.id}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(shareUrl);
        setCopiedShare(true);
        setTimeout(() => setCopiedShare(false), 2500);
      }
    }
  };

  const isSoldOut =
    Number(room.availableUnits) === 0 ||
    room.statusType === "sold_out" ||
    room.isAvailable === false;

  const otherRooms = allRooms.filter((r) => r.id !== room.id && r.isActive !== false);

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <div className="min-h-full flex items-center justify-center p-2 sm:p-4 md:p-6 lg:p-8">
          {/* Main Modal Card (Clean E-Commerce Style White Container) */}
          <div
            className="w-full max-w-6xl bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col relative my-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Navigation & Breadcrumbs Bar */}
            <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3.5 border-b border-stone-200 flex items-center justify-between gap-3">
              <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-stone-500 overflow-x-auto whitespace-nowrap py-0.5">
                <button
                  onClick={onClose}
                  className="hover:text-stone-900 transition-colors font-medium cursor-pointer"
                >
                  Home
                </button>
                <span>/</span>
                <button
                  onClick={onClose}
                  className="hover:text-stone-900 transition-colors font-medium cursor-pointer"
                >
                  Rooms &amp; Suites
                </button>
                <span>/</span>
                <span className="font-semibold text-stone-900 truncate max-w-[180px] sm:max-w-none">
                  {room.name}
                </span>
              </nav>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleShare}
                  className="px-2.5 sm:px-3 py-1.5 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Share room link"
                >
                  <span>🔗</span>
                  <span className="hidden sm:inline">{copiedShare ? "Copied Link!" : "Share Room"}</span>
                </button>

                <button
                  onClick={onClose}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Close room details"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body: Two-Column Product View (Gallery on Left, Specs & Booking on Right) */}
            <div className="p-4 sm:p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 xl:gap-10">
              
              {/* ========================================================= */}
              {/* LEFT COLUMN (6 Cols): Full Interactive Photo Gallery      */}
              {/* ========================================================= */}
              <div className="lg:col-span-6 xl:col-span-7 flex flex-col space-y-3.5">
                
                {/* Main Hero Viewer Container */}
                <div className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-2xl overflow-hidden bg-stone-100 border border-stone-200/90 shadow-sm group select-none">
                  <Image
                    src={activePhoto.src}
                    alt={activePhoto.alt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 55vw"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                  />

                  {/* Gradient overlays for readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-stone-950/30 pointer-events-none" />

                  {/* Top-Left Category / Status Badge */}
                  <div className="absolute top-3 left-3 flex items-center gap-2 z-10">
                    <span className="bg-white/95 text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs backdrop-blur-xs">
                      {room.badge}
                    </span>
                    {activePhoto.tag && (
                      <span className="bg-amber-900/90 text-amber-200 text-[10.5px] font-semibold px-2.5 py-1 rounded-full backdrop-blur-xs border border-amber-600/40">
                        {activePhoto.tag}
                      </span>
                    )}
                  </div>

                  {/* Top-Right Lightbox & Fullscreen Button */}
                  <button
                    onClick={() => setIsLightboxOpen(true)}
                    className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition-transform hover:scale-110 cursor-pointer"
                    title="View fullscreen image"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                    </svg>
                  </button>

                  {/* Previous / Next Arrow Overlays */}
                  {photos.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevPhoto}
                        className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-lg flex items-center justify-center transition hover:scale-105 cursor-pointer"
                        aria-label="Previous photo"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextPhoto}
                        className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-lg flex items-center justify-center transition hover:scale-105 cursor-pointer"
                        aria-label="Next photo"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </>
                  )}

                  {/* Bottom Bar: Photo Counter & Live Caption */}
                  <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-white text-xs gap-2">
                    <p className="truncate text-xs text-stone-200 font-medium">
                      {activePhoto.caption}
                    </p>
                    <span className="bg-stone-900/80 px-2.5 py-0.5 rounded-full font-mono text-[11px] shrink-0 border border-stone-700/60">
                      {activePhotoIndex + 1} / {photos.length}
                    </span>
                  </div>
                </div>

                {/* Thumbnails Row (E-commerce Gallery Strip) */}
                {photos.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-thin">
                    {photos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-20 sm:w-24 aspect-[16/10] rounded-xl overflow-hidden shrink-0 border-2 transition-all cursor-pointer ${
                          activePhotoIndex === idx
                            ? "border-amber-700 ring-2 ring-amber-500/30 scale-102 shadow-xs"
                            : "border-stone-200 hover:border-stone-400 opacity-75 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="96px"
                          className="w-full h-full object-cover"
                        />
                        {activePhotoIndex === idx && (
                          <div className="absolute inset-0 bg-amber-900/10" />
                        )}
                      </button>
                    ))}
                  </div>
                )}

                {/* Photo Guarantee Pill */}
                <div className="bg-stone-50 border border-stone-200/90 rounded-xl p-3 flex items-center justify-between text-xs text-stone-600">
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-600 font-bold">✓</span>
                    <span>100% Genuine Photos of Maa Annapurna Home Stay</span>
                  </div>
                  <span className="text-[11px] text-amber-900 font-semibold bg-amber-100/80 px-2 py-0.5 rounded-full">
                    Verified Stay
                  </span>
                </div>

                {/* Highlights List on Left for Desktop balance */}
                <div className="hidden lg:block bg-stone-50/70 rounded-2xl border border-stone-200 p-4 space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700">
                    Why Guests Love This Room
                  </h4>
                  <ul className="space-y-1.5 text-xs text-stone-600">
                    {extData.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-amber-700 mt-0.5 shrink-0 font-bold">✦</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* ========================================================= */}
              {/* RIGHT COLUMN (6 Cols): Product Specs, Pricing & CTA       */}
              {/* ========================================================= */}
              <div className="lg:col-span-6 xl:col-span-5 flex flex-col justify-between space-y-5">
                <div>
                  
                  {/* Status & Category Tag Row */}
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-bold uppercase tracking-wider">
                      <span>🏡</span> {room.badge}
                    </span>

                    <span
                      className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        isSoldOut
                          ? "bg-rose-100 text-rose-800"
                          : room.statusType === "available"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isSoldOut
                            ? "bg-rose-500"
                            : room.statusType === "available"
                            ? "bg-emerald-500 animate-pulse"
                            : "bg-amber-500 animate-pulse"
                        }`}
                      />
                      <span>
                        {isSoldOut ? "0 Available Today" : `${room.availableUnits} Available Today`}
                      </span>
                    </span>
                  </div>

                  {/* Main Room Title */}
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 tracking-tight leading-snug">
                    {room.name}
                  </h2>

                  {/* Rating & Review summary */}
                  <div className="flex items-center gap-2 mt-1.5 text-xs text-stone-600">
                    <span className="inline-flex items-center gap-1 font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-md">
                      <span>★ 4.9</span>
                    </span>
                    <span className="text-stone-400">•</span>
                    <span className="font-medium">14 Verified Pilgrim Reviews</span>
                    <span className="text-stone-400">•</span>
                    <span className="text-emerald-700 font-semibold">Bodhgaya Host Verified</span>
                  </div>

                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed mt-3">
                    {extData.tagline}
                  </p>

                  {/* E-Commerce Style Pricing Box */}
                  <div className="mt-4 p-4 rounded-2xl bg-stone-50 border border-stone-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-stone-400 line-through text-sm sm:text-base font-medium">
                          ₹{room.originalPrice.toLocaleString("en-IN")}
                        </span>
                        <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                          ₹{room.price.toLocaleString("en-IN")}
                        </span>
                        <span className="text-xs text-stone-500 font-normal">/ night</span>
                        <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                          {room.discount}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-500 mt-1 font-medium">
                        ✓ Direct Host Deal • Zero Platform Commission • No Hidden Fees
                      </p>
                    </div>

                    <div className="sm:text-right shrink-0">
                      <span className="text-[11px] text-amber-900 bg-amber-50 border border-amber-200/80 px-2.5 py-1 rounded-full font-semibold block sm:inline-block">
                        ⚡ Instant Host Confirmation
                      </span>
                    </div>
                  </div>

                  {/* Specifications Grid (Product Specs) */}
                  <div className="mt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                      Room Specifications
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                        <span className="text-stone-400 block text-[10.5px] uppercase font-semibold">Bed Arrangement</span>
                        <span className="font-semibold text-stone-800 mt-0.5 block">{extData.specs.bedSetup}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                        <span className="text-stone-400 block text-[10.5px] uppercase font-semibold">Max Guests</span>
                        <span className="font-semibold text-stone-800 mt-0.5 block">{extData.specs.maxGuests}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                        <span className="text-stone-400 block text-[10.5px] uppercase font-semibold">Cooling</span>
                        <span className="font-semibold text-stone-800 mt-0.5 block">{extData.specs.cooling}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                        <span className="text-stone-400 block text-[10.5px] uppercase font-semibold">Private Bath</span>
                        <span className="font-semibold text-stone-800 mt-0.5 block">{extData.specs.bathroom}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                        <span className="text-stone-400 block text-[10.5px] uppercase font-semibold">Room Size</span>
                        <span className="font-semibold text-stone-800 mt-0.5 block">{extData.specs.roomSize}</span>
                      </div>
                      <div className="p-2.5 rounded-xl bg-white border border-stone-200">
                        <span className="text-stone-400 block text-[10.5px] uppercase font-semibold">Internet</span>
                        <span className="font-semibold text-stone-800 mt-0.5 block">{extData.specs.wifi}</span>
                      </div>
                    </div>
                  </div>

                  {/* Tabs: Amenities / Rules / Details */}
                  <div className="mt-5">
                    <div className="flex border-b border-stone-200 gap-4 text-xs font-semibold">
                      <button
                        onClick={() => setActiveTab("overview")}
                        className={`pb-2 border-b-2 cursor-pointer transition ${
                          activeTab === "overview"
                            ? "border-amber-800 text-amber-900"
                            : "border-transparent text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        All Amenities ({extData.amenities.length})
                      </button>
                      <button
                        onClick={() => setActiveTab("rules")}
                        className={`pb-2 border-b-2 cursor-pointer transition ${
                          activeTab === "rules"
                            ? "border-amber-800 text-amber-900"
                            : "border-transparent text-stone-500 hover:text-stone-800"
                        }`}
                      >
                        Check-in &amp; Policies
                      </button>
                    </div>

                    <div className="pt-3">
                      {activeTab === "overview" && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {extData.amenities.map((amenity, idx) => (
                            <div key={idx} className="flex items-start gap-2 p-2 rounded-lg bg-stone-50/50">
                              <span className="text-base shrink-0">{amenity.icon}</span>
                              <div>
                                <span className="font-bold text-stone-800 block text-[11.5px]">{amenity.name}</span>
                                <span className="text-[10.5px] text-stone-500 leading-tight block">{amenity.desc}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}

                      {activeTab === "rules" && (
                        <div className="space-y-2 text-xs text-stone-600 bg-stone-50 p-3 rounded-xl border border-stone-200">
                          {extData.houseRules.map((r, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <span className="text-emerald-600 font-bold shrink-0">✓</span>
                              <span>{r}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                </div>

                {/* Direct Action Buttons / CTAs */}
                <div className="pt-4 border-t border-stone-200 flex flex-col sm:flex-row items-center gap-2.5">
                  {isSoldOut ? (
                    <div className="w-full p-3 rounded-xl bg-stone-100 text-stone-500 font-bold text-xs text-center border border-stone-300">
                      🚫 Currently Sold Out for Today — Please check other rooms below
                    </div>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          onClose();
                          onOpenEnquiry(room.name);
                        }}
                        className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm butter-touch shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>Book Room Online</span>
                        <span className="text-amber-300">₹{room.price.toLocaleString("en-IN")}</span>
                      </button>

                      <button
                        onClick={() => {
                          onClose();
                          onWhatsAppBooking(room.name);
                        }}
                        className="w-full sm:flex-1 h-11 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm butter-touch shadow-xs flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
                        </svg>
                        <span>WhatsApp Host Direct</span>
                      </button>

                      <a
                        href="tel:+919931924027"
                        className="h-11 px-3.5 rounded-xl border border-stone-300 hover:bg-stone-50 text-stone-700 font-semibold text-xs flex items-center justify-center gap-1.5 butter-touch shrink-0"
                        title="Call Host"
                      >
                        <span>📞</span>
                        <span className="hidden sm:inline">Call</span>
                      </a>
                    </>
                  )}
                </div>

              </div>
            </div>

            {/* ========================================================= */}
            {/* BOTTOM SECTION: "Explore Other Rooms" Quick Switcher Row */}
            {/* ========================================================= */}
            {otherRooms.length > 0 && (
              <div className="bg-stone-50/80 border-t border-stone-200 p-4 sm:p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-serif text-base sm:text-lg font-bold text-stone-900">
                    Explore Other Rooms in Maa Annapurna Home Stay
                  </h3>
                  <span className="text-xs text-stone-500 font-medium">Click to view photos &amp; details</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {otherRooms.map((other) => (
                    <button
                      key={other.id}
                      onClick={() => onSelectAnotherRoom(other)}
                      className="bg-white p-3 rounded-xl border border-stone-200 hover:border-amber-600/50 hover:shadow-md transition text-left flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                        <Image
                          src={other.image}
                          alt={other.alt}
                          fill
                          sizes="64px"
                          className="w-full h-full object-cover group-hover:scale-105 transition"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <span className="font-semibold text-stone-900 text-xs truncate block group-hover:text-amber-800 transition">
                            {other.name}
                          </span>
                        </div>
                        <div className="flex items-baseline gap-1 mt-0.5 text-xs">
                          <span className="font-bold text-stone-900">₹{other.price.toLocaleString("en-IN")}</span>
                          <span className="text-[10px] text-stone-500">/ night</span>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      </div>

      {/* Fullscreen High-Resolution Lightbox for Room Gallery */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-60 bg-stone-950/95 flex flex-col justify-between p-4 sm:p-6 animate-in fade-in duration-150 select-none"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white z-10" onClick={(e) => e.stopPropagation()}>
            <div>
              <h3 className="font-serif text-base sm:text-lg font-bold">{room.name}</h3>
              <p className="text-xs text-stone-400">{activePhoto.caption}</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-stone-400">
                {activePhotoIndex + 1} / {photos.length}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-9 h-9 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close fullscreen"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Lightbox Main Image */}
          <div className="relative flex-1 flex items-center justify-center my-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
              <Image
                src={activePhoto.src}
                alt={activePhoto.alt}
                fill
                sizes="100vw"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Lightbox Arrow Buttons */}
            {photos.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                  aria-label="Previous photo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                  aria-label="Next photo"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails */}
          <div className="flex justify-center gap-2 overflow-x-auto py-2 z-10" onClick={(e) => e.stopPropagation()}>
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePhotoIndex(i)}
                className={`relative w-16 h-12 rounded-lg overflow-hidden border-2 transition cursor-pointer ${
                  activePhotoIndex === i ? "border-amber-400 scale-105" : "border-transparent opacity-60 hover:opacity-100"
                }`}
              >
                <Image src={p.src} alt={p.alt} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
