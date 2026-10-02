"use client";

import React, { useState } from "react";
import Image from "next/image";

// Image dataset from the property with SEO-optimized alt and captions
const HOTEL_IMAGES = [
  {
    id: 1,
    title: "Triple Bed AC Room with Kitchenette - Maa Annapurna Bodhgaya",
    category: "rooms",
    src: "/images/room-triple-kitchenette.jpg",
    width: 1600,
    height: 738,
    alt: "Spacious triple bed AC room with kitchenette counter and sink at Maa Annapurna Home Stay Bodhgaya",
    caption: "Spacious triple occupancy bedroom with attached kitchenette counter & sink in Bodhgaya",
  },
  {
    id: 2,
    title: "Deluxe AC Bedroom with Dressing Table - Bodhgaya Hotel",
    category: "rooms",
    src: "/images/deluxe-room-dressing-table.jpg",
    width: 1600,
    height: 738,
    alt: "Deluxe AC room with dressing table and mirror at Maa Annapurna Hotel near Mahabodhi Temple",
    caption: "Private room featuring vanity mirror, large wooden wardrobe, and split AC",
  },
  {
    id: 3,
    title: "Classic Twin Bed Room - Maa Annapurna Guest House",
    category: "rooms",
    src: "/images/room-twin-wooden-paneling.jpg",
    width: 1600,
    height: 738,
    alt: "Twin single beds with wooden accent paneling at Maa Annapurna Home Stay Bodhgaya",
    caption: "Twin single beds with warm wooden paneling and quiet courtyard view",
  },
  {
    id: 4,
    title: "Guest Room with Bedside Table & AC - Hotel in Bodhgaya",
    category: "rooms",
    src: "/images/room-bedside-table-ac.jpg",
    width: 1600,
    height: 738,
    alt: "Clean double bedroom with bedside table and split air conditioner in Bodhgaya",
    caption: "Comfortable double room with nightstand, split air conditioner and soft lighting",
  },
  {
    id: 5,
    title: "Double Single-Bed Room - Bodhgaya Pilgrimage Stay",
    category: "rooms",
    src: "/images/room-double-single-beds.jpg",
    width: 1600,
    height: 738,
    alt: "Tiled floor room with two single beds at Maa Annapurna Hotel Bodhgaya",
    caption: "Clean, tiled floor room with two single beds, ideal for friends or pilgrims",
  },
  {
    id: 6,
    title: "Spacious Family Suite - Best Family Hotel in Bodhgaya",
    category: "rooms",
    src: "/images/family-suite-blue-linens.jpg",
    width: 1600,
    height: 738,
    alt: "Spacious family room with blue bedding for pilgrimage groups at Maa Annapurna Home Stay",
    caption: "Generous room layout with fresh blue linens, perfect for pilgrimage groups and families",
  },
  {
    id: 7,
    title: "Room Window & Split AC Cooling - Maa Annapurna Bodhgaya",
    category: "rooms",
    src: "/images/room-window-ac.jpg",
    width: 1600,
    height: 738,
    alt: "Bedroom window with curtains and split AC at Maa Annapurna Hotel Bodhgaya",
    caption: "Large window with natural light, privacy curtains, and wall-mounted split AC",
  },
  {
    id: 8,
    title: "Attached Bathroom with Overhead Shower - Bodhgaya Hotel",
    category: "bathrooms",
    src: "/images/bathroom-shower-tiled.jpg",
    width: 1600,
    height: 738,
    alt: "Clean attached bathroom with tiled wall and overhead shower at Maa Annapurna Home Stay",
    caption: "Modern tiled bathroom with high-pressure overhead shower and geyser connection",
  },
  {
    id: 9,
    title: "Bathroom Full View with 24/7 Geyser - Maa Annapurna",
    category: "bathrooms",
    src: "/images/bathroom-full-view.jpg",
    width: 738,
    height: 1600,
    alt: "Spotless bathroom with Western toilet and water heater geyser in Bodhgaya homestay",
    caption: "Spotless private bathroom equipped with Western commode and 24/7 hot water geyser",
  },
  {
    id: 10,
    title: "Modern Bathroom Wash Basin & Vanity - Hotel Bodhgaya",
    category: "bathrooms",
    src: "/images/bathroom-wash-basin.jpg",
    width: 738,
    height: 1600,
    alt: "Wash basin with glass shelf and mirror in bathroom at Maa Annapurna Hotel Bodhgaya",
    caption: "Clean wash basin with glass shelf, toiletries space, and mirror",
  },
];

// Room packages for easy booking & SEO structured data
const ROOM_CATEGORIES = [
  {
    id: "deluxe-double",
    name: "Deluxe AC Double Room",
    badge: "Most Popular",
    image: "/images/deluxe-room-dressing-table.jpg",
    beds: "1 Queen / Double Bed",
    guests: "2 Guests",
    features: [
      "Split Air Conditioner",
      "Attached Modern Bath",
      "Dressing Table & Mirror",
      "24/7 Hot Water Geyser",
      "High-Speed Wi-Fi",
    ],
    description:
      "Quiet, well-ventilated AC room in Bodhgaya with dressing area, split AC, and a spotlessly clean private attached bathroom. Perfect for couples and pilgrims.",
    alt: "Deluxe AC double room at Maa Annapurna Hotel Bodhgaya",
  },
  {
    id: "triple-kitchenette",
    name: "Triple Bed Room with Kitchenette",
    badge: "Family Choice",
    image: "/images/room-triple-kitchenette.jpg",
    beds: "3 Comfortable Beds",
    guests: "3 - 4 Guests",
    features: [
      "In-room Kitchenette Sink",
      "Split Air Conditioner",
      "Attached Bathroom",
      "24/7 Hot Water",
      "Spacious Floor Area",
    ],
    description:
      "Ideal for families or longer pilgrimage stays in Bodhgaya. Includes a dedicated kitchenette counter and sink for pantry convenience and multiple beds.",
    alt: "Triple bed AC room with private kitchenette at Maa Annapurna Home Stay Bodhgaya",
  },
  {
    id: "classic-twin",
    name: "Classic Twin Bed Room",
    badge: "Pilgrimage Friendly",
    image: "/images/room-twin-wooden-paneling.jpg",
    beds: "2 Single Beds",
    guests: "2 Guests",
    features: [
      "Two Separate Beds",
      "Wooden Accent Paneling",
      "Split Air Conditioner",
      "Attached Bathroom",
      "Tiled Flooring",
    ],
    description:
      "Features two separate single beds with warm wooden paneling. Perfect for fellow pilgrims, friends, or traveling companions seeking peaceful comfort.",
    alt: "Classic twin single bed room at Maa Annapurna Hotel Bodhgaya",
  },
  {
    id: "family-suite",
    name: "Executive Family Suite",
    badge: "Spacious",
    image: "/images/family-suite-blue-linens.jpg",
    beds: "Multi-Bed Setup",
    guests: "4 - 6 Guests",
    features: [
      "Multiple Beds & Linens",
      "Split Air Conditioner",
      "Attached Western Bathroom",
      "Geyser Hot Water",
      "Daily Housekeeping",
    ],
    description:
      "Extra-large suite designed for family groups and pilgrimage yatras visiting Bodhgaya together with generous space, fresh linens, and full AC cooling.",
    alt: "Executive family suite at Maa Annapurna Home Stay Bodhgaya",
  },
];

const AMENITIES = [
  {
    icon: (
      <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: "Split Air Conditioning (AC)",
    desc: "Individual cooling in all rooms for peaceful rest after visiting the Mahabodhi Temple",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "24/7 Hot Water Geyser",
    desc: "Attached modern Western bathrooms with instant hot water supply at all times",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
      </svg>
    ),
    title: "Free High-Speed Wi-Fi",
    desc: "Fast, reliable wireless internet across all rooms and common areas",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
    title: "Kitchenette Facility",
    desc: "In-room sink & preparation area available for family convenience & long stays",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Clean & Sanitized Rooms",
    desc: "Fresh laundered linens, sanitized tiled floors, and clean bathrooms daily",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Quiet Bodhgaya Vicinity",
    desc: "Peaceful environment away from street noise, yet minutes to sacred temples",
  },
];

const NEARBY_PLACES = [
  { name: "Mahabodhi Temple (UNESCO World Heritage)", distance: "5-7 mins drive (~2.2 km)", icon: "🛕" },
  { name: "Great Buddha Statue (80ft Daijokyo)", distance: "6 mins (~2.5 km)", icon: "☸️" },
  { name: "Thai, Japanese, Bhutanese & Tibetan Monasteries", distance: "5 mins (~2 km)", icon: "🌸" },
  { name: "Bodhgaya Main Market & Pilgrim Cafes", distance: "4 mins (~1.5 km)", icon: "🛍️" },
  { name: "Gaya International Airport (GAY)", distance: "15-18 mins (~9 km)", icon: "✈️" },
  { name: "Gaya Junction Railway Station", distance: "25-30 mins (~14 km)", icon: "🚆" },
];

// Rich FAQ for Search Engine Snippets & FAQPage Schema
const FAQS = [
  {
    q: "How far is Maa Annapurna Home Stay from the Mahabodhi Temple in Bodhgaya?",
    a: "Maa Annapurna Home Stay is located approximately 2.2 km from the UNESCO World Heritage Mahabodhi Temple, which is just a 5 to 7 minute drive or quick e-rickshaw ride away. It offers the perfect quiet retreat away from bustling traffic while remaining easily accessible to all major shrines.",
  },
  {
    q: "What amenities are included in the rooms at Maa Annapurna Hotel?",
    a: "Every room at Maa Annapurna Home Stay is equipped with split air conditioning (AC), an attached private bathroom with 24/7 hot water geyser, high-speed Wi-Fi, clean sanitized linens, and dressing furniture. Select rooms also feature a convenient in-room kitchenette counter and sink.",
  },
  {
    q: "Are family rooms and kitchenette suites available for groups?",
    a: "Yes! We specialize in comfortable accommodations for families and pilgrimage groups with spacious Triple Bed Rooms with kitchenette and Executive Family Suites accommodating 3 to 6 guests comfortably.",
  },
  {
    q: "How can I book a room directly at Maa Annapurna Hotel for the best rate?",
    a: "You can book directly by sending a WhatsApp message or calling our host directly at +91 99319 24027. Direct bookings enjoy zero platform commissions, instant confirmation, and flexible check-in assistance.",
  },
  {
    q: "Is vehicle parking available at Maa Annapurna Home Stay Bodhgaya?",
    a: "Yes, safe vehicle parking space is available for guests traveling by car or private tourist taxi to Bodhgaya.",
  },
  {
    q: "What are the check-in and check-out timings?",
    a: "Standard check-in is from 12:00 PM onwards and check-out is by 11:00 AM. Early check-in or late check-out is readily accommodated subject to room availability upon prior request.",
  },
];

export default function HomePage() {
  // Booking inquiry state
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2 Guests");
  const [selectedRoom, setSelectedRoom] = useState("Deluxe AC Double Room");
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  // Gallery filter & Lightbox state
  const [galleryFilter, setGalleryFilter] = useState<"all" | "rooms" | "bathrooms">("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Modal states
  const [isEnquiryModalOpen, setIsEnquiryModalOpen] = useState(false);
  const [modalRoomTitle, setModalRoomTitle] = useState("Deluxe AC Double Room");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // FAQ accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  // Filtered gallery items
  const filteredImages = HOTEL_IMAGES.filter((img) =>
    galleryFilter === "all" ? true : img.category === galleryFilter
  );

  // Construct WhatsApp URL
  const handleWhatsAppBooking = (roomName?: string) => {
    const targetRoom = roomName || selectedRoom;
    const phone = "919931924027"; // Direct hotel contact
    let text = `Hello Maa Annapurna Home Stay! I would like to enquire about room availability & booking:\n\n`;
    text += `• Room: ${targetRoom}\n`;
    if (checkIn) text += `• Check-in: ${checkIn}\n`;
    if (checkOut) text += `• Check-out: ${checkOut}\n`;
    text += `• Guests: ${guests}\n`;
    if (guestName) text += `• Name: ${guestName}\n`;
    if (guestPhone) text += `• Phone: ${guestPhone}\n`;
    text += `\nPlease let me know the rates and availability. Thank you!`;

    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${phone}?text=${encoded}`, "_blank");
  };

  const openRoomEnquiry = (roomTitle: string) => {
    setModalRoomTitle(roomTitle);
    setSelectedRoom(roomTitle);
    setIsEnquiryModalOpen(true);
  };

  // Structured Data (JSON-LD) for Local Business & Hotel
  const hotelSchema = {
    "@context": "https://schema.org",
    "@type": ["Hotel", "BedAndBreakfast", "LodgingBusiness"],
    "name": "Maa Annapurna Home Stay & Hotel Bodhgaya",
    "alternateName": [
      "Maa Annapurna Hotel Bodhgaya",
      "Maa Annapurna Home Stay",
      "Maa Annapurna Guest House Bodhgaya",
      "Maa Annapurna Hotel"
    ],
    "description":
      "Peaceful, clean AC hotel and homestay in Bodhgaya near Mahabodhi Temple. Offering private attached bathrooms, kitchenette options, 24/7 hot water geyser, and high-speed Wi-Fi.",
    "url": "https://maaannapurnahotel.com",
    "telephone": "+919931924027",
    "priceRange": "₹₹",
    "currenciesAccepted": "INR",
    "paymentAccepted": "Cash, UPI, Credit Card, Debit Card",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sujata Rd, opposite Nagina Palace and Hotel Star, Bodhgaya",
      "addressLocality": "Bodhgaya",
      "addressRegion": "Bihar",
      "postalCode": "824231",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7022,
      "longitude": 84.9759
    },
    "hasMap": "https://share.google/u28zYVIFglv8XWTyZ",
    "image": HOTEL_IMAGES.map((img) => `https://maaannapurnahotel.com${img.src}`),
    "checkinTime": "12:00:00",
    "checkoutTime": "11:00:00",
    "numberOfRooms": 10,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "14"
    },
    "petsAllowed": false,
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "Split Air Conditioning", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Hot Water Geyser", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Free High-Speed Wi-Fi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Kitchenette Facility", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Attached Private Modern Bathroom", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Daily Housekeeping", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Free Parking", "value": true }
    ],
    "containsPlace": ROOM_CATEGORIES.map((room) => ({
      "@type": "HotelRoom",
      "name": room.name,
      "description": room.description,
      "occupancy": {
        "@type": "QuantitativeValue",
        "name": room.guests
      },
      "bed": {
        "@type": "BedDetails",
        "typeOfBed": room.beds
      }
    }))
  };

  // FAQ Schema for Search Engine Rich Snippets
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQS.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://maaannapurnahotel.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Hotels in Bodhgaya",
        "item": "https://maaannapurnahotel.com/#rooms"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Maa Annapurna Home Stay & Hotel",
        "item": "https://maaannapurnahotel.com"
      }
    ]
  };

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

      {/* Top Banner */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 border-b border-stone-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Best Rated AC Homestay & Hotel in Bodhgaya • Direct Booking Guarantee</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-stone-300">
            <a href="tel:+919931924027" className="hover:text-white transition flex items-center gap-1.5 font-medium">
              <svg className="w-3.5 h-3.5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>+91 99319 24027</span>
            </a>
            <span className="text-stone-700">|</span>
            <span className="text-amber-400 font-medium">5 Mins to Mahabodhi Temple</span>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex flex-col group" title="Maa Annapurna Home Stay & Hotel Bodhgaya">
            <span className="font-serif text-2xl sm:text-2xl font-bold tracking-tight text-stone-900 group-hover:text-amber-800 transition">
              Maa Annapurna
            </span>
            <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-amber-800/80 -mt-0.5">
              Home Stay & Hotel • Bodhgaya
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-stone-600">
            <a href="#rooms" className="hover:text-stone-900 transition">Rooms & Suites</a>
            <a href="#gallery" className="hover:text-stone-900 transition">Photo Tour</a>
            <a href="#amenities" className="hover:text-stone-900 transition">Amenities</a>
            <a href="#location" className="hover:text-stone-900 transition">Location & Temples</a>
            <a href="#faq" className="hover:text-stone-900 transition">FAQs</a>
            <a href="#contact" className="hover:text-stone-900 transition">Contact</a>
          </nav>

          {/* Header Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="tel:+919931924027"
              className="px-4 py-2 text-xs font-semibold text-stone-700 border border-stone-300 rounded-full hover:bg-stone-50 transition flex items-center gap-1.5"
            >
              <svg className="w-3.5 h-3.5 text-stone-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>Call Host</span>
            </a>

            <button
              onClick={() => openRoomEnquiry("Deluxe AC Double Room")}
              className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-amber-900 rounded-full shadow-sm transition flex items-center gap-1.5 cursor-pointer"
            >
              <span>Book / Enquire</span>
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-700 hover:bg-stone-100 transition"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Dropdown Nav */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-stone-200 bg-white px-4 pt-3 pb-6 space-y-3 shadow-lg">
            <a
              href="#rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-800 font-medium hover:text-amber-800"
            >
              Rooms & Family Suites
            </a>
            <a
              href="#gallery"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-800 font-medium hover:text-amber-800"
            >
              HD Photo Tour
            </a>
            <a
              href="#amenities"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-800 font-medium hover:text-amber-800"
            >
              Hotel Amenities
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-800 font-medium hover:text-amber-800"
            >
              Location & Temple Vicinity
            </a>
            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-stone-800 font-medium hover:text-amber-800"
            >
              Bodhgaya Travel FAQs
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <a
                href="tel:+919931924027"
                className="w-full py-2.5 text-center text-xs font-semibold text-stone-800 border border-stone-300 rounded-lg bg-stone-50"
              >
                📞 Call: +91 99319 24027
              </a>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openRoomEnquiry("Deluxe AC Double Room");
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-white bg-stone-900 rounded-lg shadow"
              >
                Instant Room Enquiry
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section with Targeted Primary H1 */}
      <section className="relative bg-stone-50/70 border-b border-stone-200 pt-8 pb-14 lg:pt-14 lg:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200/80 text-amber-900 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-600"></span>
                <span>Bodhgaya, Bihar • 5 Mins to Mahabodhi Temple</span>
              </div>

              {/* Single targeted H1 for Top SEO Ranking */}
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-stone-900 leading-[1.18]">
                Peaceful Hotel & Home Stay in Bodhgaya Near Mahabodhi Temple
              </h1>

              <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
                Experience authentic hospitality at Maa Annapurna Home Stay. Clean, modern AC rooms, private attached hot-water bathrooms, in-room kitchenette options, and tranquil surroundings for your spiritual pilgrimage.
              </p>

              {/* Highlights Pill Row */}
              <div className="flex flex-wrap gap-2.5 pt-1 text-xs text-stone-700 font-medium">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs">
                  <span className="text-emerald-600 font-bold">✓</span> Split AC in Every Room
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs">
                  <span className="text-emerald-600 font-bold">✓</span> 24/7 Geyser Hot Water
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs">
                  <span className="text-emerald-600 font-bold">✓</span> High-Speed Wi-Fi
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-stone-200 shadow-2xs">
                  <span className="text-emerald-600 font-bold">✓</span> Kitchenette Suites Available
                </span>
              </div>

              {/* Direct Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-3">
                <button
                  onClick={() => openRoomEnquiry("Deluxe AC Double Room")}
                  className="px-7 py-3.5 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Book / Check Availability</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>

                <button
                  onClick={() => handleWhatsAppBooking("General Inquiry")}
                  className="px-6 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
                  </svg>
                  <span>WhatsApp Inquiry</span>
                </button>
              </div>
            </div>

            {/* Right Photo Showcase */}
            <div className="lg:col-span-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <div
                  onClick={() => setLightboxIndex(0)}
                  className="col-span-2 relative aspect-[16/9] rounded-2xl overflow-hidden shadow-md group cursor-pointer border border-stone-200/80 bg-stone-100"
                >
                  <Image
                    src="/images/room-triple-kitchenette.jpg"
                    alt="Triple Bed Room with Kitchenette at Maa Annapurna Home Stay Bodhgaya"
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/70 via-transparent to-transparent flex items-end p-4 sm:p-5">
                    <div className="text-white">
                      <span className="text-[11px] font-semibold tracking-wider uppercase bg-stone-900/80 backdrop-blur px-2.5 py-1 rounded">
                        Triple AC Room + Kitchenette
                      </span>
                      <p className="text-xs sm:text-sm text-stone-200 mt-1 font-medium">
                        Spacious layout with dining counter, split AC & private bathroom
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur text-stone-800 text-[11px] font-semibold px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
                    <span>🔍 Tap to view HD</span>
                  </div>
                </div>

                <div
                  onClick={() => setLightboxIndex(1)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm group cursor-pointer border border-stone-200/80 bg-stone-100"
                >
                  <Image
                    src="/images/deluxe-room-dressing-table.jpg"
                    alt="Deluxe AC Bedroom at Maa Annapurna Hotel Bodhgaya"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent flex items-end p-3">
                    <span className="text-xs font-semibold text-white">Deluxe AC Room</span>
                  </div>
                </div>

                <div
                  onClick={() => setLightboxIndex(7)}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-sm group cursor-pointer border border-stone-200/80 bg-stone-100"
                >
                  <Image
                    src="/images/bathroom-shower-tiled.jpg"
                    alt="Clean Attached Bathroom with Geyser at Hotel in Bodhgaya"
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 to-transparent flex items-end p-3">
                    <span className="text-xs font-semibold text-white">Modern Attached Bath</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Booking & Availability Search Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-10">
          <div className="bg-white rounded-2xl p-4 sm:p-6 shadow-xl shadow-stone-200/50 border border-stone-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
              {/* Check-In */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Check-In Date
                </label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                />
              </div>

              {/* Check-Out */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Check-Out Date
                </label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                />
              </div>

              {/* Guests */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Total Guests
                </label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests (Couple / Friends)</option>
                  <option value="3 Guests">3 Guests (Triple Room)</option>
                  <option value="Family / 4+ Guests">Family / Group (4+ Guests)</option>
                </select>
              </div>

              {/* Room Preference */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-stone-500 mb-1.5">
                  Room Category
                </label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-stone-300 text-stone-800 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                >
                  {ROOM_CATEGORIES.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search / Inquire Button */}
              <div>
                <button
                  onClick={() => handleWhatsAppBooking()}
                  className="w-full py-3 px-4 rounded-lg bg-stone-900 hover:bg-amber-900 text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Check Availability</span>
                  <svg className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Room Showcase Section with H2 Keyword Optimization */}
      <section id="rooms" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Accommodation in Bodhgaya
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-1.5">
                AC Rooms & Family Suites Near Mahabodhi Temple
              </h2>
              <p className="text-stone-500 text-sm sm:text-base mt-2 max-w-xl">
                Every room at Maa Annapurna Hotel is equipped with a private attached bathroom, hot water geyser, and split air conditioning.
              </p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="text-xs text-stone-500 bg-stone-100 px-3 py-1.5 rounded-full font-medium">
                ✓ 100% Genuine Photos of Hotel
              </span>
            </div>
          </div>

          {/* Room Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
            {ROOM_CATEGORIES.map((room) => (
              <article
                key={room.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                {/* Room Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-stone-100">
                  <Image
                    src={room.image}
                    alt={room.alt}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur text-stone-900 text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                    {room.badge}
                  </div>
                  <div className="absolute bottom-4 right-4 bg-stone-900/80 backdrop-blur text-white text-xs font-medium px-3 py-1 rounded-full">
                    {room.guests}
                  </div>
                </div>

                {/* Room Details */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-baseline justify-between mb-2">
                      <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                        {room.name}
                      </h3>
                      <span className="text-xs font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded">
                        {room.beds}
                      </span>
                    </div>

                    <p className="text-stone-600 text-sm leading-relaxed mb-5">
                      {room.description}
                    </p>

                    {/* Features Badges */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {room.features.map((feat, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center text-xs font-medium text-stone-700 bg-stone-100 px-2.5 py-1 rounded"
                        >
                          <svg className="w-3.5 h-3.5 text-amber-700 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                          </svg>
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-stone-100 flex items-center gap-3">
                    <button
                      onClick={() => openRoomEnquiry(room.name)}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs sm:text-sm text-center transition cursor-pointer shadow-xs"
                    >
                      Book / Inquire
                    </button>
                    <button
                      onClick={() => handleWhatsAppBooking(room.name)}
                      className="py-2.5 px-4 rounded-xl bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 font-semibold text-xs sm:text-sm transition flex items-center justify-center gap-1.5 cursor-pointer"
                      title="Enquire on WhatsApp"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
                      </svg>
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section id="gallery" className="py-16 sm:py-20 bg-stone-50/80 border-y border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Visual Tour
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-1">
              Inside Maa Annapurna Home Stay Bodhgaya
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              Browse authentic photographs of our AC bedrooms, attached modern bathrooms, kitchenette facilities, and clean interiors.
            </p>

            {/* Filter Tabs */}
            <div className="flex items-center justify-center gap-2 mt-6">
              <button
                onClick={() => setGalleryFilter("all")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  galleryFilter === "all"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                All Photos ({HOTEL_IMAGES.length})
              </button>
              <button
                onClick={() => setGalleryFilter("rooms")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  galleryFilter === "rooms"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                Bedrooms & AC ({HOTEL_IMAGES.filter((i) => i.category === "rooms").length})
              </button>
              <button
                onClick={() => setGalleryFilter("bathrooms")}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition cursor-pointer ${
                  galleryFilter === "bathrooms"
                    ? "bg-stone-900 text-white shadow-xs"
                    : "bg-white text-stone-600 hover:bg-stone-100 border border-stone-200"
                }`}
              >
                Bathrooms & Geyser ({HOTEL_IMAGES.filter((i) => i.category === "bathrooms").length})
              </button>
            </div>
          </div>

          {/* Gallery Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredImages.map((image) => (
              <figure
                key={image.id}
                onClick={() => {
                  const originalIndex = HOTEL_IMAGES.findIndex((img) => img.id === image.id);
                  setLightboxIndex(originalIndex);
                }}
                className={`relative rounded-xl overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group cursor-pointer border border-stone-200 bg-stone-100 ${
                  image.height > image.width ? "aspect-[9/16] row-span-2" : "aspect-[16/10]"
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 text-white">
                  <figcaption className="text-xs font-semibold line-clamp-1">{image.title}</figcaption>
                  <span className="text-[10px] text-stone-300">Tap to expand HD</span>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* Hotel Amenities Section */}
      <section id="amenities" className="py-16 sm:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Thoughtful Comforts
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-1">
              Top Amenities for Bodhgaya Pilgrims & Guests
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              Designed with care to ensure pilgrims, families, and solo travelers feel completely refreshed and safe.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {AMENITIES.map((item, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-stone-200/80 bg-stone-50/50 hover:bg-stone-50 hover:border-amber-200 transition-all flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-base font-bold text-stone-900">{item.title}</h3>
                  <p className="text-stone-600 text-xs sm:text-sm mt-1 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location & Pilgrimage Vicinity */}
      <section id="location" className="py-16 sm:py-20 bg-stone-50/70 border-t border-stone-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            {/* Vicinity Details */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                  Strategic Bodhgaya Location
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-1">
                  Minutes from Sacred Shrines & Monasteries
                </h2>
                <p className="text-stone-600 text-sm sm:text-base mt-3 leading-relaxed">
                  Located in a serene Bodhgaya neighborhood away from street traffic, yet conveniently close to the UNESCO Mahabodhi Temple and International Monasteries.
                </p>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                {NEARBY_PLACES.map((place, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-white border border-stone-200 flex items-center gap-3 shadow-2xs"
                  >
                    <span className="text-xl shrink-0">{place.icon}</span>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900 line-clamp-1">{place.name}</h4>
                      <p className="text-[11px] text-stone-500 font-medium">{place.distance}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2">
                <a
                  href="https://share.google/u28zYVIFglv8XWTyZ"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white border border-stone-300 text-stone-800 font-semibold text-xs hover:bg-stone-100 transition shadow-2xs"
                >
                  <svg className="w-4 h-4 text-rose-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span>Open Maa Annapurna on Google Maps</span>
                  <svg className="w-3.5 h-3.5 text-stone-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Quick Map & NAP Card */}
            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-stone-200 shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-800 font-bold">
                    📍
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-stone-900">
                      Maa Annapurna Home Stay & Hotel
                    </h3>
                    <p className="text-xs text-stone-500">Sujata Rd, opposite Nagina Palace and Hotel Star, Bodh Gaya, Bihar 824231</p>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-stone-600 border-t border-stone-100 pt-4">
                  <div className="flex justify-between py-1 border-b border-stone-50">
                    <span className="font-medium text-stone-500">Check-In Time:</span>
                    <span className="font-semibold text-stone-800">12:00 PM (Flexible upon request)</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-50">
                    <span className="font-medium text-stone-500">Check-Out Time:</span>
                    <span className="font-semibold text-stone-800">11:00 AM</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-stone-50">
                    <span className="font-medium text-stone-500">Direct Phone:</span>
                    <a href="tel:+919931924027" className="font-semibold text-amber-800 hover:underline">
                      +91 99319 24027
                    </a>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="font-medium text-stone-500">Spoken Languages:</span>
                    <span className="font-semibold text-stone-800">Hindi, English</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-100 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => openRoomEnquiry("Deluxe AC Double Room")}
                    className="flex-1 py-3 px-4 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs text-center transition"
                  >
                    Direct Room Booking
                  </button>
                  <a
                    href="tel:+919931924027"
                    className="py-3 px-4 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 font-semibold text-xs text-center transition flex items-center justify-center gap-1.5"
                  >
                    📞 Call Host
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Frequently Asked Questions Section (Google Rich Snippets) */}
      <section id="faq" className="py-16 sm:py-20 bg-white border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
              Helpful Travel Information
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-stone-900 mt-1">
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="text-stone-500 text-sm mt-2">
              Common questions answered for visitors planning their pilgrimage and stay in Bodhgaya.
            </p>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="rounded-2xl border border-stone-200 overflow-hidden bg-stone-50/50 transition"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                    className="w-full text-left p-5 flex items-center justify-between gap-4 font-semibold text-stone-900 text-sm sm:text-base hover:bg-stone-50 transition cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="text-stone-400 font-bold text-lg shrink-0">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-stone-600 text-xs sm:text-sm leading-relaxed border-t border-stone-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Direct Contact & Inquiry Form */}
      <section id="contact" className="py-16 sm:py-20 bg-stone-50/70 border-t border-stone-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-10 shadow-sm">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-800">
                Direct Booking Enquiry
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-stone-900 mt-1">
                Plan Your Stay in Bodhgaya
              </h2>
              <p className="text-stone-500 text-xs sm:text-sm mt-1.5">
                Send us your dates and requirements. We respond immediately with the best direct rates without any platform commission.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rahul Sharma"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  placeholder="+91 98765 43210"
                  value={guestPhone}
                  onChange={(e) => setGuestPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Check-In Date</label>
                <input
                  type="date"
                  value={checkIn}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Check-Out Date</label>
                <input
                  type="date"
                  value={checkOut}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Preferred Room</label>
                <select
                  value={selectedRoom}
                  onChange={(e) => setSelectedRoom(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                >
                  {ROOM_CATEGORIES.map((r) => (
                    <option key={r.id} value={r.name}>
                      {r.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Number of Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900 bg-stone-50/50"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="Family (4+ Guests)">Family (4+ Guests)</option>
                </select>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => handleWhatsAppBooking()}
                className="flex-1 py-3 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
                </svg>
                <span>Send WhatsApp Enquiry</span>
              </button>

              <a
                href="tel:+919931924027"
                className="py-3 px-6 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-semibold text-sm transition text-center flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span>Call Host Directly</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with Local NAP Consistency */}
      <footer className="bg-stone-900 text-stone-400 text-xs border-t border-stone-800 pt-12 pb-24 md:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-stone-800">
            <div>
              <span className="font-serif text-lg font-bold text-white tracking-wide">
                Maa Annapurna Home Stay & Hotel
              </span>
              <p className="mt-2 text-stone-400 leading-relaxed text-xs">
                A serene guest house and hotel in Bodhgaya offering fully air-conditioned rooms, attached modern bathrooms, kitchenette amenities, and heartfelt service for temple pilgrims, yatras, and world travelers.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Quick Navigation</h5>
              <div className="grid grid-cols-2 gap-2 text-stone-400">
                <a href="#rooms" className="hover:text-white transition">Rooms & Suites</a>
                <a href="#gallery" className="hover:text-white transition">Photo Tour</a>
                <a href="#amenities" className="hover:text-white transition">Hotel Amenities</a>
                <a href="#location" className="hover:text-white transition">Temple Distances</a>
                <a href="#faq" className="hover:text-white transition">Travel FAQs</a>
                <a href="#contact" className="hover:text-white transition">Direct Booking</a>
              </div>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-[11px] mb-3">Contact & Address (NAP)</h5>
              <p className="text-stone-400 font-medium">Maa Annapurna Home Stay</p>
              <p className="text-stone-400">Sujata Rd, opposite Nagina Palace and Hotel Star, Bodhgaya, Bihar 824231, India</p>
              <p className="mt-2">
                Direct Phone:{" "}
                <a href="tel:+919931924027" className="text-amber-400 hover:underline">
                  +91 99319 24027
                </a>
              </p>
              <p className="mt-1 text-emerald-400">Instant WhatsApp Booking Available</p>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-stone-500 gap-2">
            <p>© {new Date().getFullYear()} Maa Annapurna Home Stay & Hotel Bodhgaya. All rights reserved.</p>
            <p>100% SEO Optimized • Fast & Lightweight Next.js Experience</p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Booking Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 md:hidden bg-white/95 backdrop-blur-md border-t border-stone-200 px-4 py-2.5 shadow-lg flex items-center gap-2">
        <a
          href="tel:+919931924027"
          className="flex-1 py-2.5 rounded-full bg-stone-100 border border-stone-300 text-stone-800 font-semibold text-xs flex items-center justify-center gap-1.5"
        >
          <svg className="w-3.5 h-3.5 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span>Call Now</span>
        </a>

        <button
          onClick={() => handleWhatsAppBooking()}
          className="flex-1 py-2.5 rounded-full bg-emerald-600 text-white font-semibold text-xs flex items-center justify-center gap-1.5 shadow-xs"
        >
          <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
          </svg>
          <span>WhatsApp Enquiry</span>
        </button>
      </div>

      {/* Lightbox Modal for HD Photos */}
      {lightboxIndex !== null && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-md flex items-center justify-center p-4">
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-5 right-5 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer z-50"
            aria-label="Close photo"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Previous Arrow */}
          <button
            onClick={() =>
              setLightboxIndex((prev) =>
                prev !== null ? (prev === 0 ? HOTEL_IMAGES.length - 1 : prev - 1) : null
              )
            }
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer z-50"
            aria-label="Previous photo"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Next Arrow */}
          <button
            onClick={() =>
              setLightboxIndex((prev) =>
                prev !== null ? (prev === HOTEL_IMAGES.length - 1 ? 0 : prev + 1) : null
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition cursor-pointer z-50"
            aria-label="Next photo"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* Main Photo Container */}
          <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center">
            <div className="relative w-full h-[65vh] sm:h-[75vh]">
              <Image
                src={HOTEL_IMAGES[lightboxIndex].src}
                alt={HOTEL_IMAGES[lightboxIndex].alt}
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="mt-3 text-center text-white">
              <h4 className="font-serif text-lg font-bold">
                {HOTEL_IMAGES[lightboxIndex].title}
              </h4>
              <p className="text-xs text-stone-300 mt-0.5">
                {HOTEL_IMAGES[lightboxIndex].caption} ({lightboxIndex + 1} of {HOTEL_IMAGES.length})
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Room Enquiry Modal */}
      {isEnquiryModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-stone-200 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setIsEnquiryModalOpen(false)}
              className="absolute top-5 right-5 text-stone-400 hover:text-stone-700 p-1.5 rounded-full hover:bg-stone-100 transition cursor-pointer"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
              Direct Hotel Inquiry
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Book {modalRoomTitle}
            </h3>
            <p className="text-stone-500 text-xs mt-1">
              Submit your dates to connect directly with the host on WhatsApp for availability and best rates in Bodhgaya.
            </p>

            <div className="space-y-3.5 mt-5">
              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Your Name</label>
                <input
                  type="text"
                  placeholder="e.g. Anand Kumar"
                  value={guestName}
                  onChange={(e) => setGuestName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Check-In</label>
                  <input
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-stone-700 mb-1">Check-Out</label>
                  <input
                    type="date"
                    value={checkOut}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-stone-700 mb-1">Total Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                >
                  <option value="1 Guest">1 Guest</option>
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 Guests">3 Guests</option>
                  <option value="4+ Guests (Family)">4+ Guests (Family)</option>
                </select>
              </div>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleWhatsAppBooking(modalRoomTitle);
                    setIsEnquiryModalOpen(false);
                  }}
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.288.043.088.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.2.662.591 1.221.774 1.394.86.173.086.275.072.376-.044.101-.116.433-.506.549-.68.116-.173.231-.144.39-.086s1.011.477 1.184.564.289.13.332.202c.043.072.043.419-.101.824z" />
                  </svg>
                  <span>Connect on WhatsApp Now</span>
                </button>

                <a
                  href="tel:+919931924027"
                  className="w-full py-2.5 text-center text-xs font-semibold text-stone-700 bg-stone-100 hover:bg-stone-200 rounded-xl transition"
                >
                  Or Call Host at +91 99319 24027
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}