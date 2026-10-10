"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { RoomItem } from "@/types/hotel";
import { getRoomExtendedData, RoomGalleryPhoto } from "@/data/roomGalleries";
import Room360Viewer from "@/components/Room360Viewer";

interface RoomDetailModalProps {
  room: RoomItem | null;
  allRooms?: RoomItem[];
  isOpen: boolean;
  onClose: () => void;
  onSelectAnotherRoom?: (room: RoomItem) => void;
  onOpenEnquiry: (roomTitle: string) => void;
  onWhatsAppBooking: (roomTitle?: string) => void;
}

export default function RoomDetailModal({
  room,
  isOpen,
  onClose,
  onOpenEnquiry,
  onWhatsAppBooking,
}: RoomDetailModalProps) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Reset active photo when room changes
  useEffect(() => {
    setActivePhotoIndex(0);
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

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen || !room) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft") {
        setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : prev));
      } else if (e.key === "ArrowRight") {
        const ext = getRoomExtendedData(room.id);
        const total = ext.photos.length || 1;
        setActivePhotoIndex((prev) => (prev < total - 1 ? prev + 1 : prev));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, isLightboxOpen, onClose, room]);

  if (!isOpen || !room) return null;

  const extData = getRoomExtendedData(room.id);
  const photos: RoomGalleryPhoto[] =
    extData.photos.length > 0
      ? extData.photos
      : [{ src: room.image, alt: room.alt, caption: room.name }];

  const activePhoto = photos[activePhotoIndex] || photos[0];

  const handlePrevPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev > 0 ? prev - 1 : photos.length - 1));
  };

  const handleNextPhoto = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActivePhotoIndex((prev) => (prev < photos.length - 1 ? prev + 1 : 0));
  };

  // Touch swipe support for mobile (only when not in 360 viewer, as 360 uses touch for rotation)
  const handleTouchStart = (e: React.TouchEvent) => {
    if (activePhoto.is360) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (activePhoto.is360 || touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        handleNextPhoto();
      } else {
        handlePrevPhoto();
      }
    }
    touchStartX.current = null;
  };

  const isSoldOut =
    Number(room.availableUnits) === 0 ||
    room.statusType === "sold_out" ||
    room.isAvailable === false;

  const idx360 = photos.findIndex((p) => p.is360);

  return (
    <>
      {/* Modal Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-stone-950/75 backdrop-blur-xs overflow-y-auto flex items-end sm:items-center justify-center p-0 sm:p-4 md:p-6 animate-in fade-in duration-200"
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        {/* Main Modal Card */}
        <div
          className="w-full max-w-4xl bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl border border-stone-200 overflow-hidden flex flex-col max-h-[92vh] sm:max-h-[90vh] relative animate-in slide-in-from-bottom-4 sm:zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 z-20 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-stone-200 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <h2 className="font-serif text-base sm:text-xl font-bold text-stone-900 truncate">
                  {room.name}
                </h2>
                {room.badge && (
                  <span className="hidden sm:inline-block bg-amber-50 text-amber-900 border border-amber-200 text-[11px] font-bold px-2 py-0.5 rounded-full shrink-0">
                    {room.badge}
                  </span>
                )}
                {idx360 !== -1 && (
                  <span className="bg-amber-100 text-amber-950 border border-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full shrink-0 hidden sm:inline-flex items-center gap-1">
                    <span>🔄</span>
                    <span>360° Available</span>
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-500 truncate sm:hidden">
                {room.beds} • {room.guests}
              </p>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-900 flex items-center justify-center transition-colors cursor-pointer shrink-0"
              aria-label="Close"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Modal Scrollable Body */}
          <div className="overflow-y-auto overscroll-contain p-4 sm:p-6 flex-1">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
              
              {/* LEFT: Photo Gallery & 360 Viewer (7 cols on lg) */}
              <div className="lg:col-span-7 flex flex-col space-y-3">
                {/* Main Hero Container */}
                <div
                  className="relative aspect-[16/10] sm:aspect-[16/9.5] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-stone-900 border border-stone-200 select-none group"
                  onTouchStart={handleTouchStart}
                  onTouchEnd={handleTouchEnd}
                >
                  {/* If active photo is 360, render interactive 360 Three.js viewer */}
                  {activePhoto.is360 ? (
                    <Room360Viewer
                      imageSrc={activePhoto.src}
                      roomName={room.name}
                      onExit360={() => setActivePhotoIndex(0)}
                    />
                  ) : (
                    <>
                      <Image
                        src={activePhoto.src}
                        alt={activePhoto.alt}
                        fill
                        priority
                        sizes="(max-width: 1024px) 100vw, 55vw"
                        className="w-full h-full object-cover"
                      />

                      {/* Photo Counter */}
                      <span className="absolute bottom-2.5 right-2.5 z-10 bg-stone-950/75 text-white px-2.5 py-0.5 rounded-full font-mono text-[11px] backdrop-blur-xs">
                        {activePhotoIndex + 1} / {photos.length}
                      </span>

                      {/* Direct 360 Tour Launcher Pill - Desktop only */}
                      {idx360 !== -1 && (
                        <button
                          onClick={() => setActivePhotoIndex(idx360)}
                          className="hidden sm:flex absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-stone-900/85 hover:bg-stone-900 text-amber-300 border border-amber-400/40 text-[11px] font-bold shadow-md backdrop-blur-xs items-center gap-1.5 transition cursor-pointer"
                          title="View 360 degree interactive room tour"
                        >
                          <span className="animate-spin text-xs" style={{ animationDuration: "5s" }}>🔄</span>
                          <span>360° Virtual Tour</span>
                        </button>
                      )}

                      {/* Fullscreen Expand Icon */}
                      <button
                        onClick={() => setIsLightboxOpen(true)}
                        className="absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full bg-stone-950/60 hover:bg-stone-950/80 text-white flex items-center justify-center transition cursor-pointer backdrop-blur-xs"
                        title="Fullscreen"
                        aria-label="View fullscreen photo"
                      >
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                      </button>

                      {/* Previous / Next Arrows */}
                      {photos.length > 1 && (
                        <>
                          <button
                            onClick={handlePrevPhoto}
                            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition cursor-pointer"
                            aria-label="Previous photo"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                            </svg>
                          </button>
                          <button
                            onClick={handleNextPhoto}
                            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-stone-800 shadow-md flex items-center justify-center transition cursor-pointer"
                            aria-label="Next photo"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        </>
                      )}
                    </>
                  )}
                </div>

                {/* Thumbnails Strip */}
                {photos.length > 1 && (
                  <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                    {photos.map((photo, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActivePhotoIndex(idx)}
                        className={`relative w-16 sm:w-20 aspect-[16/10] rounded-lg overflow-hidden shrink-0 border-2 transition cursor-pointer ${
                          activePhotoIndex === idx
                            ? "border-amber-600 ring-2 ring-amber-500/25 shadow-xs"
                            : "border-stone-200 opacity-70 hover:opacity-100"
                        }`}
                      >
                        <Image
                          src={photo.src}
                          alt={photo.alt}
                          fill
                          sizes="80px"
                          className="w-full h-full object-cover"
                        />
                        {/* 360 Overlay Badge on Thumbnail */}
                        {photo.is360 && (
                          <div className="absolute inset-0 bg-stone-950/45 flex items-center justify-center">
                            <span className="bg-amber-400 text-stone-950 font-black text-[9px] px-1.5 py-0.5 rounded-full shadow-xs flex items-center gap-0.5 tracking-tight">
                              <span>🔄</span>
                              <span>360°</span>
                            </span>
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* RIGHT: Room Details & Specs (5 cols on lg) */}
              <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
                <div>
                  {/* Price Row */}
                  <div className="flex items-baseline justify-between gap-2 pb-3 border-b border-stone-200">
                    <div className="flex items-baseline gap-2">
                      <span className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
                        ₹{room.price.toLocaleString("en-IN")}
                      </span>
                      {room.originalPrice > room.price && (
                        <span className="text-stone-400 line-through text-xs sm:text-sm">
                          ₹{room.originalPrice.toLocaleString("en-IN")}
                        </span>
                      )}
                      <span className="text-xs text-stone-500 font-normal">/ night</span>
                    </div>

                    {room.discount && (
                      <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md shrink-0">
                        {room.discount}
                      </span>
                    )}
                  </div>

                  {/* Room Description */}
                  <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed mt-3">
                    {room.description}
                  </p>

                  {/* Key Specs Pills (Bed, Guests, Cooling, Bath) */}
                  <div className="grid grid-cols-2 gap-2 mt-4">
                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Beds</span>
                      <span className="font-semibold text-stone-800 text-xs truncate block mt-0.5">
                        {extData.specs.bedSetup || room.beds}
                      </span>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Guests</span>
                      <span className="font-semibold text-stone-800 text-xs truncate block mt-0.5">
                        {room.guests}
                      </span>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Cooling</span>
                      <span className="font-semibold text-stone-800 text-xs truncate block mt-0.5">
                        {extData.specs.cooling}
                      </span>
                    </div>

                    <div className="p-2 sm:p-2.5 rounded-xl bg-stone-50 border border-stone-200/80">
                      <span className="text-stone-400 block text-[10px] uppercase font-semibold">Bathroom</span>
                      <span className="font-semibold text-stone-800 text-xs truncate block mt-0.5">
                        {extData.specs.bathroom}
                      </span>
                    </div>
                  </div>

                  {/* Amenities List */}
                  <div className="mt-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                      Included Amenities
                    </h3>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {room.features.slice(0, 6).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-stone-700">
                          <span className="text-emerald-600 font-bold text-xs">✓</span>
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Availability status */}
                <div className="pt-2">
                  <div className="flex items-center gap-2 text-xs">
                    <span
                      className={`w-2 h-2 rounded-full ${
                        isSoldOut
                          ? "bg-rose-500"
                          : room.statusType === "available"
                          ? "bg-emerald-500"
                          : "bg-amber-500"
                      }`}
                    />
                    <span className="font-medium text-stone-600">
                      {isSoldOut ? "Sold Out for Today" : `${room.availableUnits || 1} Room(s) Available Today`}
                    </span>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Sticky Bottom Actions Bar (Fully Mobile Responsive) */}
          <div className="bg-white border-t border-stone-200 px-4 sm:px-6 py-3 flex items-center gap-2.5 sm:gap-3">
            {isSoldOut ? (
              <div className="w-full p-2.5 rounded-xl bg-stone-100 text-stone-500 font-semibold text-xs text-center border border-stone-300">
                🚫 Currently Sold Out for Today
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onOpenEnquiry(room.name);
                  }}
                  className="flex-1 h-11 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm butter-touch shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book Online</span>
                  <span className="text-amber-300 font-normal">₹{room.price.toLocaleString("en-IN")}</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onWhatsAppBooking(room.name);
                  }}
                  className="flex-1 h-11 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs sm:text-sm butter-touch shadow-xs flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
                  </svg>
                  <span>WhatsApp</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-60 bg-stone-950/95 flex flex-col justify-between p-3 sm:p-5 select-none animate-in fade-in duration-150"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Lightbox Header */}
          <div className="flex items-center justify-between text-white z-10" onClick={(e) => e.stopPropagation()}>
            <div className="min-w-0 pr-3 flex items-center gap-2">
              <h3 className="font-serif text-sm sm:text-base font-bold truncate">{room.name}</h3>
              {activePhoto.is360 && (
                <span className="bg-amber-500 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded-full">
                  360° Panorama
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <span className="text-xs font-mono text-stone-400">
                {activePhotoIndex + 1} / {photos.length}
              </span>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-white flex items-center justify-center transition cursor-pointer"
                aria-label="Close fullscreen"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Lightbox Image or 360 Viewer */}
          <div
            className="relative flex-1 flex items-center justify-center my-3"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          >
            {activePhoto.is360 ? (
              <div className="w-full h-full max-w-5xl max-h-[78vh] rounded-2xl overflow-hidden border border-stone-800 shadow-2xl">
                <Room360Viewer
                  imageSrc={activePhoto.src}
                  roomName={room.name}
                />
              </div>
            ) : (
              <div className="relative w-full h-full max-w-4xl max-h-[75vh]">
                <Image
                  src={activePhoto.src}
                  alt={activePhoto.alt}
                  fill
                  sizes="100vw"
                  className="w-full h-full object-contain"
                />
              </div>
            )}

            {!activePhoto.is360 && photos.length > 1 && (
              <>
                <button
                  onClick={handlePrevPhoto}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                  aria-label="Previous photo"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextPhoto}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-stone-900/80 hover:bg-stone-800 text-white flex items-center justify-center shadow-lg transition cursor-pointer"
                  aria-label="Next photo"
                >
                  <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}
          </div>

          {/* Lightbox Thumbnails */}
          <div className="flex justify-center gap-1.5 overflow-x-auto py-1 z-10" onClick={(e) => e.stopPropagation()}>
            {photos.map((p, i) => (
              <button
                key={i}
                onClick={() => setActivePhotoIndex(i)}
                className={`relative w-12 sm:w-16 aspect-[16/10] rounded-md overflow-hidden border-2 transition cursor-pointer ${
                  activePhotoIndex === i ? "border-amber-400 scale-105" : "border-transparent opacity-50 hover:opacity-100"
                }`}
              >
                <Image src={p.src} alt={p.alt} fill sizes="64px" className="object-cover" />
                {p.is360 && (
                  <div className="absolute inset-0 bg-stone-950/45 flex items-center justify-center">
                    <span className="text-[8px] bg-amber-400 text-black px-1 rounded font-black">360°</span>
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
