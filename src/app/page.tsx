"use client";

import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import RoomsSection from "@/components/RoomsSection";
import GallerySection from "@/components/GallerySection";
import AmenitiesSection from "@/components/AmenitiesSection";
import LocationSection from "@/components/LocationSection";
import ReviewSection from "@/components/ReviewSection";
import FaqSection from "@/components/FaqSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import StickyMobileBar from "@/components/StickyMobileBar";
import LightboxModal from "@/components/LightboxModal";
import RoomEnquiryModal from "@/components/RoomEnquiryModal";

import {
  DEFAULT_ROOM_CATEGORIES,
  HOTEL_IMAGES,
  AMENITIES,
  NEARBY_PLACES,
  FAQS,
} from "@/data/hotelData";
import {
  getHotelSchema,
  getFaqSchema,
  getBreadcrumbSchema,
} from "@/lib/seoSchemas";
import { BookingDetails } from "@/types/hotel";

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

  // Dynamic rooms & gallery state synced with admin API updates
  const [rooms, setRooms] = useState(DEFAULT_ROOM_CATEGORIES);
  const [hotelImages, setHotelImages] = useState(HOTEL_IMAGES);

  useEffect(() => {
    fetch("/api/rooms")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.rooms) && data.rooms.length > 0) {
          setRooms(data.rooms);
        }
      })
      .catch(() => {});

    fetch("/api/admin/photos")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.photos) && data.photos.length > 0) {
          setHotelImages(data.photos);
        }
      })
      .catch(() => {});
  }, []);

  // Modal & Lightbox states
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [modalRoomTitle, setModalRoomTitle] = useState("Deluxe AC Double Room");

  const openRoomEnquiry = (roomTitle: string) => {
    setModalRoomTitle(roomTitle);
    updateBookingDetails({ roomName: roomTitle });
    setIsEnquiryModalOpen(true);
  };

  // Direct WhatsApp booking handler
  const handleWhatsAppBooking = (roomNameOverride?: string) => {
    const targetRoom = roomNameOverride || bookingDetails.roomName;
    const roomObj = rooms.find((r) => r.name === targetRoom);
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
    if (bookingDetails.needPickDrop) text += `• Pick & Drop Service: Yes (Airport / Railway Station)\n`;
    if (bookingDetails.needTours) text += `• Tours & Travels Facility: Yes (Bodhgaya / Rajgir / Nalanda)\n`;
    if (bookingDetails.guestName) text += `• Name: ${bookingDetails.guestName}\n`;
    if (bookingDetails.guestPhone) text += `• Phone: ${bookingDetails.guestPhone}\n`;
    text += `\nPlease confirm availability and lock the direct booking. Thank you!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  };

  // Structured Data (JSON-LD) for Local Business & Hotel
  const hotelSchema = getHotelSchema(hotelImages, rooms);
  const faqSchema = getFaqSchema(FAQS);
  const breadcrumbSchema = getBreadcrumbSchema();

  return (
    <div className="min-h-screen bg-white text-stone-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-950">
      {/* JSON-LD Structured Data for 100% SEO Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(hotelSchema) }}
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
          onOpenEnquiry={openRoomEnquiry}
          onWhatsAppBooking={handleWhatsAppBooking}
        />

        {/* Photo Gallery Section */}
        <GallerySection
          images={hotelImages}
          onSelectImage={setLightboxIndex}
        />


        {/* Hotel Amenities Section */}
        <AmenitiesSection amenities={AMENITIES} />

        {/* Location & Pilgrimage Vicinity */}
        <LocationSection
          nearbyPlaces={NEARBY_PLACES}
          onOpenEnquiry={openRoomEnquiry}
        />

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
    </div>
  );
}