import React from "react";
import { PhotoItem, RoomItem, AmenityItem, NearbyPlace, FaqItem } from "@/types/hotel";

// Dynamic datasets are loaded directly from Supabase PostgreSQL database
export const HOTEL_IMAGES: PhotoItem[] = [];
export const DEFAULT_ROOM_CATEGORIES: RoomItem[] = [
  {
    id: "deluxe-double",
    name: "Deluxe AC Double Room",
    badge: "Most Popular",
    image: "/images/rooms/deluxe-double-main.jpg",
    beds: "1 Queen / Double Bed",
    guests: "2 Guests",
    price: 1299,
    originalPrice: 1899,
    discount: "32% OFF",
    priceNote: "Direct Host Deal • Zero Commission",
    status: "Available Today",
    statusType: "available",
    availableUnits: 3,
    totalUnits: 4,
    bookedToday: 1,
    availabilityText: "3 Rooms Available Today",
    isAvailable: true,
    isActive: true,
    features: [
      "Split Air Conditioner",
      "Attached Modern Bath",
      "Dressing Table & Mirror",
      "24/7 Hot Water Geyser",
      "High-Speed Wi-Fi",
    ],
    description: "Quiet, well-ventilated AC room in Bodhgaya with dressing area, split AC, and a spotlessly clean private attached bathroom. Perfect for couples and pilgrims.",
    alt: "Deluxe AC double room at Maa Annapurna Home Stay Bodhgaya",
  },
  {
    id: "triple-kitchenette",
    name: "Triple Bed Room with Kitchenette",
    badge: "Family Choice",
    image: "/images/rooms/triple-room-main.jpg",
    beds: "3 Comfortable Beds",
    guests: "3 - 4 Guests",
    price: 1899,
    originalPrice: 2699,
    discount: "30% OFF",
    priceNote: "Includes Private Kitchenette & Sink",
    status: "High Demand",
    statusType: "limited",
    availableUnits: 1,
    totalUnits: 3,
    bookedToday: 2,
    availabilityText: "Only 1 Room Left for Today",
    isAvailable: true,
    isActive: true,
    features: [
      "In-room Kitchenette Sink",
      "Split Air Conditioner",
      "Attached Bathroom",
      "24/7 Hot Water",
      "Spacious Floor Area",
    ],
    description: "Ideal for families or longer pilgrimage stays in Bodhgaya. Includes a dedicated kitchenette counter and sink for pantry convenience and multiple beds.",
    alt: "Triple bed AC room with private kitchenette at Maa Annapurna Home Stay Bodhgaya",
  },
  {
    id: "classic-twin",
    name: "Twin Bed Room",
    badge: "Pilgrimage Friendly",
    image: "/images/rooms/twin-room-main.jpg",
    beds: "2 Single Beds",
    guests: "2 Guests",
    price: 1199,
    originalPrice: 1699,
    discount: "29% OFF",
    priceNote: "Best Budget AC Comfort in Bodhgaya",
    status: "Available Today",
    statusType: "available",
    availableUnits: 2,
    totalUnits: 3,
    bookedToday: 1,
    availabilityText: "2 Rooms Available Today",
    isAvailable: true,
    isActive: true,
    features: [
      "Two Separate Beds",
      "Wooden Accent Paneling",
      "Air Conditioner",
      "Attached Bathroom",
      "Tiled Flooring",
    ],
    description: "Features two separate single beds with warm wooden paneling. Perfect for fellow pilgrims, friends, or traveling companions seeking peaceful comfort.",
    alt: "Classic twin single bed room at Maa Annapurna Home Stay Bodhgaya",
  },
  {
    id: "family-suite",
    name: "Executive Family Suite",
    badge: "Spacious",
    image: "/images/rooms/family-suite-main.jpg",
    beds: "Multi-Bed Setup (4-6 Guests)",
    guests: "4 - 6 Guests",
    price: 2499,
    originalPrice: 3499,
    discount: "29% OFF",
    priceNote: "Great for Yatras & Families (4-6 Guests)",
    status: "Limited Availability",
    statusType: "limited",
    availableUnits: 1,
    totalUnits: 2,
    bookedToday: 1,
    availabilityText: "Only 1 Suite Left for Today",
    isAvailable: true,
    isActive: true,
    features: [
      "Multiple Beds & Linens",
      "Split Air Conditioner",
      "Attached Western Bathroom",
      "Geyser Hot Water",
      "Daily Housekeeping",
    ],
    description: "Extra-large suite designed for family groups and pilgrimage yatras visiting Bodhgaya together with generous space, fresh linens, and full AC cooling.",
    alt: "Executive family suite at Maa Annapurna Home Stay Bodhgaya",
  },
];

export const AMENITIES: AmenityItem[] = [
  {
    icon: (
      <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "24 Hours Open (24/7 Front Desk)",
    desc: "Round-the-clock reception, seamless late-night check-in, and 24/7 on-call guest assistance",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
      </svg>
    ),
    title: "Pick & Drop Service",
    desc: "Prompt pickup and drop facility for Gaya International Airport & Gaya Junction Railway Station (may cost additional charges)",
  },
  {
    icon: (
      <svg className="w-5 h-5 text-amber-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Tours & Travels Facility",
    desc: "Pilgrimage tours across Bodhgaya, Rajgir, Nalanda, and Dungeshwari Caves with trusted private vehicles",
  },
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

export const NEARBY_PLACES: NearbyPlace[] = [
  { name: "Mahabodhi Temple (UNESCO World Heritage)", distance: "5-7 mins drive (~2.2 km)", icon: "🛕" },
  { name: "Great Buddha Statue (80ft Daijokyo)", distance: "6 mins (~2.5 km)", icon: "☸️" },
  { name: "Thai, Japanese, Bhutanese & Tibetan Monasteries", distance: "5 mins (~2 km)", icon: "🌸" },
  { name: "Bodhgaya Main Market & Pilgrim Cafes", distance: "4 mins (~1.5 km)", icon: "🛍️" },
  { name: "Gaya International Airport", distance: "15-18 mins (~9 km)", icon: "✈️" },
  { name: "Gaya Junction Railway Station", distance: "25-30 mins (~14 km)", icon: "🚆" },
];

export const FAQS: FaqItem[] = [
  {
    q: "How far is Maa Annapurna Home Stay from the Mahabodhi Temple in Bodhgaya?",
    a: "Maa Annapurna Home Stay is located approximately 2.2 km from the UNESCO World Heritage Mahabodhi Temple, which is just a 5 to 7 minute drive or quick e-rickshaw ride away. It offers the perfect quiet retreat away from bustling traffic while remaining easily accessible to all major shrines.",
  },
  {
    q: "Do you offer airport/railway station pick and drop service and tour packages?",
    a: "Yes! We provide dedicated 24/7 pick and drop service for Gaya International Airport and Gaya Junction Railway Station (may cost additional charges depending on vehicle and timing). We also provide a full tours and travels facility organizing local Bodhgaya temple visits as well as day trips to Rajgir, Nalanda, and Dungeshwari Cave temples.",
  },
  {
    q: "Is Maa Annapurna Home Stay open 24 hours (24/7) for check-in and assistance?",
    a: "Yes, Maa Annapurna Home Stay is open 24 hours (24/7 front desk). Our host and team are available round-the-clock to assist with late-night check-ins, early-morning departures, travel guidance, and any guest requirements.",
  },
  {
    q: "What amenities are included in the rooms at Maa Annapurna Home Stay?",
    a: "Every room at Maa Annapurna Home Stay is equipped with split air conditioning (AC), an attached private bathroom with 24/7 hot water geyser, high-speed Wi-Fi, clean sanitized linens, and dressing furniture. Select rooms also feature a convenient in-room kitchenette counter and sink.",
  },
  {
    q: "Are family rooms and kitchenette suites available for groups?",
    a: "Yes! We specialize in comfortable accommodations for families and pilgrimage groups with spacious Triple Bed Rooms with kitchenette and Executive Family Suites accommodating 3 to 6 guests comfortably.",
  },
  {
    q: "How can I book a room directly at Maa Annapurna Home Stay for the best rate?",
    a: "You can book directly by sending a WhatsApp message or calling our host directly at +91 99319 24027. Direct bookings enjoy zero platform commissions, instant confirmation, and flexible check-in assistance.",
  },
  {
    q: "Is vehicle parking available at Maa Annapurna Home Stay Bodhgaya?",
    a: "Yes, safe vehicle parking space is available for guests traveling by car or private tourist taxi to Bodhgaya.",
  },
  {
    q: "What are the room tariffs and prices at Maa Annapurna Home Stay Bodhgaya?",
    a: "Direct booking tariffs start from ₹1,199/night for Classic Twin AC Rooms, ₹1,299/night for Deluxe AC Double Rooms, ₹1,899/night for Triple Bed Rooms with Kitchenette, and ₹2,499/night for Executive Family Suites (4 to 6 guests). Direct booking guarantees 25% to 35% savings compared to standard OTAs with no hidden commissions.",
  },
  {
    q: "What are the check-in and check-out timings?",
    a: "Standard check-in is from 12:00 PM onwards and check-out is by 11:00 AM. Because our front desk is open 24/7, early check-in or late check-out is readily accommodated subject to room availability upon prior request.",
  },
];
