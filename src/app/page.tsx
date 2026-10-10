"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RoomsSection from "@/components/RoomsSection";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/AmenitiesSection";
import ReviewSection from "@/components/ReviewSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import LightboxModal from "@/components/LightboxModal";
import RoomEnquiryModal from "@/components/RoomEnquiryModal";
import RoomDetailModal from "@/components/RoomDetailModal";
import InstallAppModal from "@/components/InstallAppModal";

import {
  AMENITIES,
  FAQS,
} from "@/data/hotelData";
import {
  getHotelSchema,
  getFaqSchema,
  getBreadcrumbSchema,
  getWebSiteSchema,
  getOrganizationSchema,
} from "@/lib/seoSchemas";
import { BookingDetails, RoomItem, PhotoItem } from "@/types/hotel";

export default function HomePage() {
  // Booking inquiry state
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    checkIn: "",
    checkOut: "",
    guests: "2 Guests",
    roomName: "Deluxe AC Double Room",
    guestName: "",
    guestPhone: "",
    needPickDrop: false,
    needTours: false,
  });

  const updateBookingDetails = (updates: Partial<BookingDetails>) => {
    setBookingDetails((prev) => ({ ...prev, ...updates }));
  };

  // Dynamic rooms & gallery state synced 100% with Supabase database API
  const [rooms, setRooms] = useState<RoomItem[]>([]);
  const [isLoadingRooms, setIsLoadingRooms] = useState(true);
  const [hotelImages, setHotelImages] = useState<PhotoItem[]>([]);
  const [isLoadingImages, setIsLoadingImages] = useState(true);

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.rooms)) {
          setRooms(data.rooms);
          if (data.rooms.length > 0 && !bookingDetails.roomName) {
            setBookingDetails((prev) => ({ ...prev, roomName: data.rooms[0].name }));
          }
        }
      })
      .catch((err) => console.error("Error loading rooms:", err))
      .finally(() => setIsLoadingRooms(false));

    fetch("/api/admin/photos")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.photos)) {
          setHotelImages(data.photos);
        }
      })
      .catch((err) => console.error("Error loading photos:", err))
      .finally(() => setIsLoadingImages(false));
  }, []);

  // Modal & Lightbox states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [modalRoomTitle, setModalRoomTitle] = useState("Deluxe AC Double Room");
  const [selectedRoomForVisit, setSelectedRoomForVisit] = useState<RoomItem | null>(null);

  const openRoomVisit = (room: RoomItem) => {
    setSelectedRoomForVisit(room);
    if (typeof window !== "undefined") {
      window.history.replaceState(null, "", `#room-${room.id}`);
    }
  };

  const closeRoomVisit = () => {
    setSelectedRoomForVisit(null);
    if (typeof window !== "undefined" && window.location.hash.startsWith("#room-")) {
      window.history.replaceState(null, "", window.location.pathname);
    }
  };

  // URL hash navigation listener for direct room visit links (e.g. #room-deluxe-double)
  useEffect(() => {
    const handleHash = () => {
      if (typeof window !== "undefined" && window.location.hash.startsWith("#room-")) {
        const roomId = window.location.hash.replace("#room-", "");
        const matched = rooms.find((r) => r.id === roomId);
        if (matched) {
          setSelectedRoomForVisit(matched);
        }
      }
    };
    if (rooms.length > 0) {
      handleHash();
    }
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, [rooms]);

  const openRoomEnquiry = (roomTitle: string) => {
    const roomObj = rooms.find((r) => r.name === roomTitle);
    if (roomObj && (Number(roomObj.availableUnits) === 0 || roomObj.statusType === "sold_out")) {
      return;
    }
    setModalRoomTitle(roomTitle);
    updateBookingDetails({ roomName: roomTitle });
    setIsEnquiryModalOpen(true);
  };

  // Direct WhatsApp booking handler
  const handleWhatsAppBooking = (roomNameOverride?: string) => {
    const targetRoom = roomNameOverride || bookingDetails.roomName;
    const roomObj = rooms.find((r) => r.name === targetRoom);
    if (roomObj && (Number(roomObj.availableUnits) === 0 || roomObj.statusType === "sold_out")) {
      return;
    }
    const phone = "919931924027";

    let text = `Hello Maa Annapurna Home Stay! I would like to enquire about room availability & booking:\n\n`;
    text += `• Room: ${targetRoom}`;
    if (roomObj) {
      text += ` (Special Rate: ₹${roomObj.price.toLocaleString("en-IN")}/night)\n`;
      text += `• Current Status: ${roomObj.status} (${roomObj.availabilityText})\n`;
    } else {
      text += `\n`;
    }
    if (bookingDetails.checkIn) text += `• Check-in: ${bookingDetails.checkIn}\n`;
    if (bookingDetails.checkOut) text += `• Check-out: ${bookingDetails.checkOut}\n`;
    text += `• Guests: ${bookingDetails.guests}\n`;
    if (bookingDetails.needPickDrop) text += `• Pick & Drop Service: Yes (Airport / Railway Station - may cost additional charges)\n`;
    if (bookingDetails.needTours) text += `• Tours & Travels Facility: Yes (Bodhgaya / Rajgir / Nalanda)\n`;
    if (bookingDetails.guestName) text += `• Name: ${bookingDetails.guestName}\n`;
    if (bookingDetails.guestPhone) text += `• Phone: ${bookingDetails.guestPhone}\n`;
    text += `\nPlease confirm availability and lock the direct booking. Thank you!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  };

  // Structured Data (JSON-LD) for Local Business, Hotel, Organization & WebSite
  const hotelSchema = getHotelSchema(hotelImages, rooms);
  const faqSchema = getFaqSchema(FAQS);
  const breadcrumbSchema = getBreadcrumbSchema();
  const websiteSchema = getWebSiteSchema();
  const organizationSchema = getOrganizationSchema();

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-950">
      {/* JSON-LD Structured Data for 100% SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Sticky Header with Announcement Banner */}
      <Header onOpenEnquiry={openRoomEnquiry} />

      <main className="flex-1">
        {/* Hero Section */}
        <HeroSection
          onOpenEnquiry={openRoomEnquiry}
          onWhatsAppBooking={handleWhatsAppBooking}
          onOpenLightbox={setLightboxIndex}
        />

        {/* Room Showcase Section */}
        <RoomsSection
          rooms={rooms}
          isLoading={isLoadingRooms}
          onOpenEnquiry={openRoomEnquiry}
          onWhatsAppBooking={handleWhatsAppBooking}
          onViewRoom={openRoomVisit}
        />

        {/* Photo Gallery Section */}
        <GallerySection
          images={hotelImages}
          isLoading={isLoadingImages}
          onSelectImage={setLightboxIndex}
        />


        {/* Hotel Amenities Section */}
        <AmenitiesSection amenities={AMENITIES} />


        {/* Guest Reviews & Ratings Section */}
        <ReviewSection />

        {/* Frequently Asked Questions Section */}
        <FaqSection faqs={FAQS} />

        {/* Direct Contact & Booking Inquiry Form */}
        <ContactSection
          rooms={rooms}
          bookingDetails={bookingDetails}
          onUpdateBookingDetails={updateBookingDetails}
          onSubmit={() => handleWhatsAppBooking()}
        />
      </main>

      {/* Footer with Local NAP Consistency */}
      <Footer />

      {/* Sticky Mobile Bottom Booking Bar */}
      <StickyMobileBar onWhatsAppBooking={() => handleWhatsAppBooking()} />

      {/* Lightbox Modal for HD Photos */}
      <LightboxModal
        images={hotelImages}
        currentIndex={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />

      {/* Room Enquiry Modal */}
      <RoomEnquiryModal
        isOpen={isEnquiryModalOpen}
        roomTitle={modalRoomTitle}
        rooms={rooms}
        bookingDetails={bookingDetails}
        onUpdateBookingDetails={updateBookingDetails}
        onClose={() => setIsEnquiryModalOpen(false)}
        onWhatsAppBooking={handleWhatsAppBooking}
      />

      {/* Room Detail & Visit Modal (E-Commerce Product Page & Full Gallery) */}
      <RoomDetailModal
        room={selectedRoomForVisit}
        allRooms={rooms}
        isOpen={!!selectedRoomForVisit}
        onClose={closeRoomVisit}
        onSelectAnotherRoom={openRoomVisit}
        onOpenEnquiry={openRoomEnquiry}
        onWhatsAppBooking={handleWhatsAppBooking}
      />

      {/* PWA Install App Popup */}
      <InstallAppModal />
    </div>
  );
}