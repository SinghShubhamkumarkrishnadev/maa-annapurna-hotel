export interface RoomGalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  tag?: string;
  is360?: boolean;
}

export interface RoomDetailSpec {
  bedSetup: string;
  maxGuests: string;
  cooling: string;
  bathroom: string;
  wifi: string;
  roomSize: string;
  pantry?: string;
  floor: string;
}

export interface RoomExtendedData {
  id: string;
  title: string;
  tagline: string;
  panorama360?: string;
  photos: RoomGalleryPhoto[];
  specs: RoomDetailSpec;
  amenities: { icon: string; name: string; desc: string }[];
  highlights: string[];
  houseRules: string[];
}

export const ROOM_GALLERIES: Record<string, RoomExtendedData> = {
  "deluxe-double": {
    id: "deluxe-double",
    title: "Deluxe AC Double Room",
    tagline: "Serene, well-ventilated private room with wooden fluted headboard, split AC & modern attached bath",
    panorama360: "/images/rooms/deluxe-double-360.jpg",
    photos: [
      {
        src: "/images/rooms/deluxe-double-main.jpg",
        alt: "Deluxe AC Double Room with wooden paneling and cozy bedding at Maa Annapurna Home Stay",
        caption: "Master Double Bed with fluted wooden headboard, sanitized white linens, and wooden flooring.",
        tag: "Real Guest Room Photo",
      },
      {
        src: "/images/rooms/deluxe-double-360.jpg",
        alt: "Deluxe AC Double Room 360 Degree Virtual Panorama Tour",
        caption: "Interactive 360° View: Full room perspective with double bed, AC, and dressing vanity",
        tag: "360° Virtual Tour",
        is360: true,
      },
      {
        src: "/images/rooms/deluxe-detail.jpg",
        alt: "Deluxe bedroom view with split AC and ambient lighting",
        caption: "Individual split air conditioning, bedside nightstand with charging ports, and warm soothing lights.",
        tag: "Bedroom Details",
      },
      {
        src: "/images/rooms/bathroom-modern.jpg",
        alt: "Spotless attached modern bathroom with hot water geyser and shower",
        caption: "Private ensuite bathroom with 24/7 hot water geyser, Western commode, shower, and fresh towels.",
        tag: "Attached Bathroom",
      },
      {
        src: "/images/deluxe-room-dressing-table.jpg",
        alt: "Dressing table with mirror and room vanity at Maa Annapurna Home Stay",
        caption: "Dedicated dressing mirror, vanity table, and luggage storage space.",
        tag: "Dressing Vanity",
      },
      {
        src: "/images/room-bedside-table-ac.jpg",
        alt: "Bedside table and room interior at Maa Annapurna Home Stay",
        caption: "Well-ventilated space ensuring peaceful sleep after spiritual visits to Mahabodhi Temple.",
        tag: "Room Corner",
      },
    ],
    specs: {
      bedSetup: "1 Queen / Double Bed",
      maxGuests: "2 Adults (+ 1 Child under 5)",
      cooling: "Split Air Conditioner with Remote Control",
      bathroom: "Attached Western Bath with 24/7 Hot Water Geyser",
      wifi: "High-Speed Free Wi-Fi (Fiber)",
      roomSize: "Approx. 200 sq. ft.",
      floor: "Vitrified Clean Tiled & Wood-Finish Flooring",
    },
    amenities: [
      { icon: "❄️", name: "Split Air Conditioning", desc: "Individual remote-controlled cooling for quiet and peaceful rest" },
      { icon: "🚿", name: "24/7 Hot Water Geyser", desc: "Instant high-capacity electric water heater in attached bathroom" },
      { icon: "📶", name: "Free High-Speed Wi-Fi", desc: "Fast broadband connection across the entire bedroom" },
      { icon: "🪞", name: "Dressing Table & Mirror", desc: "Dedicated mirror with shelf for cosmetics and grooming" },
      { icon: "🔌", name: "Bedside Charging Sockets", desc: "Convenient plug points next to the bed for phones and devices" },
      { icon: "🧽", name: "Daily Housekeeping", desc: "Fresh laundered linens, sanitization, and daily trash clearance" },
      { icon: "🚖", name: "Pick & Drop Facility", desc: "Pickup/drop for Gaya Airport & Gaya Junction Railway Station (on request)" },
      { icon: "🛎️", name: "24/7 Front Desk Host", desc: "Round-the-clock host assistance for late check-in or early departure" },
    ],
    highlights: [
      "Peaceful residential atmosphere away from temple loudspeaker & traffic noise",
      "Just 5 to 7 minutes (2.2 km) drive / e-rickshaw ride to Mahabodhi Temple",
      "Attached sparkling clean bathroom with Western commode & instant geyser",
      "Direct host booking guarantees zero middleman platform commissions",
    ],
    houseRules: [
      "Check-in: 12:00 PM onwards • Flexible 24/7 check-in with advance notice",
      "Check-out: 11:00 AM",
      "Government-issued Photo ID (Aadhaar / Passport) required at check-in",
      "Strictly no smoking inside the air-conditioned room",
    ],
  },

  "triple-kitchenette": {
    id: "triple-kitchenette",
    title: "Triple Bed Room with Kitchenette",
    tagline: "Spacious 3-bed family suite with in-room pantry sink, split AC & ensuite hot water bath",
    panorama360: "/images/rooms/triple-room-360.jpg",
    photos: [
      {
        src: "/images/rooms/triple-room-main.jpg",
        alt: "Triple Bed Room with three beds in a row at Maa Annapurna Home Stay Bodhgaya",
        caption: "Spacious layout with three comfortable beds in a row, wooden headboard, and split air conditioning.",
        tag: "Real Guest Room Photo",
      },
      {
        src: "/images/rooms/triple-room-360.jpg",
        alt: "Triple Bed Room with Kitchenette 360 Degree Virtual Panorama Tour",
        caption: "Interactive 360° View: Full room perspective with 3 beds and kitchenette pantry",
        tag: "360° Virtual Tour",
        is360: true,
      },
      {
        src: "/images/rooms/triple-kitchenette.jpg",
        alt: "Private in-room kitchenette counter and sink at Maa Annapurna Home Stay",
        caption: "Dedicated in-room kitchenette counter with sink, water tap, and pantry preparation area.",
        tag: "Kitchenette Pantry",
      },
      {
        src: "/images/rooms/bathroom-modern.jpg",
        alt: "Clean ensuite bathroom with shower and hot water geyser",
        caption: "Attached modern tiled bathroom equipped with 24/7 hot water geyser, mirror, and toiletries.",
        tag: "Attached Bathroom",
      },
      {
        src: "/images/room-triple-kitchenette.jpg",
        alt: "Spacious bedroom area for family pilgrimages in Bodhgaya",
        caption: "Ample room for families, pilgrims, or group travelers staying together comfortably.",
        tag: "Suite Perspective",
      },
    ],
    specs: {
      bedSetup: "3 Separate Single Beds (or Joined on Request)",
      maxGuests: "3 - 4 Guests",
      cooling: "Split Air Conditioning with Remote Control",
      bathroom: "Private Attached Bathroom with 24/7 Hot Water Geyser",
      wifi: "High-Speed Free Wi-Fi (Fiber)",
      roomSize: "Approx. 260 sq. ft.",
      pantry: "In-Room Stainless Steel Sink & Granite Countertop",
      floor: "Sanitized Ceramic Tiled Flooring",
    },
    amenities: [
      { icon: "🍳", name: "In-Room Kitchenette & Sink", desc: "Private washing sink and pantry counter for family tea, fruits & snacks" },
      { icon: "❄️", name: "Split Air Conditioning", desc: "Powerful cooling unit designed for spacious group comfort" },
      { icon: "🚿", name: "24/7 Hot Water Geyser", desc: "Instant geyser providing uninterrupted hot water supply" },
      { icon: "🛏️", name: "3 Comfortable Clean Beds", desc: "Three separate sleeping arrangements with clean linens and blankets" },
      { icon: "📶", name: "Free High-Speed Wi-Fi", desc: "Strong signal across all beds for work, calls, or browsing" },
      { icon: "🪞", name: "Dressing Area & Mirror", desc: "Convenient dressing mirror and vanity storage" },
      { icon: "🧳", name: "Generous Luggage Space", desc: "Plenty of room for multiple bags, pilgrimage items, and footwear" },
      { icon: "🛎️", name: "24/7 On-Call Assistance", desc: "Host available round-the-clock for tour guidance and help" },
    ],
    highlights: [
      "In-room kitchenette sink makes it the most popular choice for families with elders or kids",
      "Accommodates up to 3 to 4 guests without needing to book multiple separate rooms",
      "Only 5 minutes drive from UNESCO Mahabodhi Temple and international monasteries",
      "25% to 35% lower tariff than online travel portals via direct host booking",
    ],
    houseRules: [
      "Check-in: 12:00 PM onwards (24/7 front desk available)",
      "Check-out: 11:00 AM",
      "Keep kitchenette counter and sink tidy after personal pantry preparation",
      "Government-issued ID required for all adult guests",
    ],
  },

  "classic-twin": {
    id: "classic-twin",
    title: "Twin Bed Room",
    tagline: "Two separate single beds with warm wooden paneling, split cooling & ensuite bathroom",
    panorama360: "/images/rooms/twin-room-360.jpg",
    photos: [
      {
        src: "/images/rooms/twin-room-main.jpg",
        alt: "Twin Bed AC Room with two single beds at Maa Annapurna Home Stay Bodhgaya",
        caption: "Two separate single beds with wooden fluted headboard paneling, red blankets, and window AC.",
        tag: "Real Guest Room Photo",
      },
      {
        src: "/images/rooms/twin-room-360.jpg",
        alt: "Twin Bed Room 360 Degree Virtual Panorama Tour",
        caption: "Interactive 360° View: Full room perspective with twin beds, tea table, and vanity",
        tag: "360° Virtual Tour",
        is360: true,
      },
      {
        src: "/images/rooms/twin-room-angle2.jpg",
        alt: "Twin single beds room angle showing vanity mirror at Maa Annapurna Home Stay",
        caption: "Clean tiled flooring, wall-mounted dressing mirror with shelf, and natural window lighting.",
        tag: "Alternate View",
      },
      {
        src: "/images/rooms/bathroom-modern.jpg",
        alt: "Clean ensuite bathroom with shower and instant geyser",
        caption: "Ensuite private Western bathroom with instant hot water geyser and hygienic fittings.",
        tag: "Attached Bathroom",
      },
      {
        src: "/images/room-twin-wooden-paneling.jpg",
        alt: "Twin room wooden accent paneling and clean linens",
        caption: "Warm wooden textures and clean cotton bedding create an inviting ambiance for pilgrims.",
        tag: "Wooden Accents",
      },
    ],
    specs: {
      bedSetup: "2 Separate Single Beds",
      maxGuests: "2 Guests",
      cooling: "Air Conditioning with Individual Control",
      bathroom: "Private Attached Bathroom with 24/7 Geyser",
      wifi: "High-Speed Free Wi-Fi",
      roomSize: "Approx. 180 sq. ft.",
      floor: "Clean Polished Ceramic Tile Flooring",
    },
    amenities: [
      { icon: "🛏️", name: "Two Separate Beds", desc: "Ideal for friends, co-travelers, or yatris wanting separate beds" },
      { icon: "❄️", name: "Air Conditioning (AC)", desc: "Effective cooling to beat the afternoon Bodhgaya heat" },
      { icon: "🚿", name: "24/7 Hot Water Geyser", desc: "Instant hot water available at any hour of the day or night" },
      { icon: "📶", name: "Free High-Speed Wi-Fi", desc: "Reliable wireless internet for seamless connectivity" },
      { icon: "🪞", name: "Wall Dressing Mirror", desc: "Convenient mirror and shelf mounted on the wall" },
      { icon: "🧹", name: "Fresh Sanitized Linens", desc: "Clean bedsheets, pillows, and cozy blankets provided" },
      { icon: "🚗", name: "Safe Vehicle Parking", desc: "Free parking space available for cars and tourist taxis" },
      { icon: "🚖", name: "Tours & Travels Desk", desc: "Guided taxi booking for Rajgir, Nalanda, and Dungeshwari Caves" },
    ],
    highlights: [
      "Perfect for pairs traveling together who prefer two distinct, comfortable single beds",
      "Pocket-friendly tariff with all prime AC homestay conveniences included",
      "Located in a tranquil Bodhgaya neighborhood away from street traffic",
      "24/7 front desk check-in for hassle-free late-night arrivals",
    ],
    houseRules: [
      "Check-in: 12:00 PM onwards • 24/7 reception support",
      "Check-out: 11:00 AM",
      "Valid Government Photo ID required upon check-in",
      "Quiet hours observed after 10:00 PM to ensure all guests rest peacefully",
    ],
  },

  "family-suite": {
    id: "family-suite",
    title: "Executive Family Suite",
    tagline: "Extra-large multi-bed suite with rich maroon drapes, split AC, dressing lounge & attached modern bath",
    panorama360: "/images/rooms/family-suite-360.jpg",
    photos: [
      {
        src: "/images/rooms/family-suite-main.jpg",
        alt: "Executive Family Suite with two large double beds at Maa Annapurna Home Stay Bodhgaya",
        caption: "Spacious layout featuring two large double beds, maroon window curtains, and split air conditioning.",
        tag: "Real Guest Room Photo",
      },
      {
        src: "/images/rooms/family-suite-360.jpg",
        alt: "Executive Family Suite 360 Degree Virtual Panorama Tour",
        caption: "Interactive 360° View: Full suite perspective with multi-bed setup, AC, and living space",
        tag: "360° Virtual Tour",
        is360: true,
      },
      {
        src: "/images/rooms/family-suite-wide.jpg",
        alt: "Wide angle view of Executive Family Suite with dressing table and multiple beds",
        caption: "Expansive suite arrangement with dressing vanity, coffee seating, and natural daylight.",
        tag: "Suite Overview",
      },
      {
        src: "/images/rooms/bathroom-modern.jpg",
        alt: "Large clean attached bathroom with hot water geyser and shower",
        caption: "Attached Western bathroom with 24/7 hot water geyser, mirror, and modern sanitaryware.",
        tag: "Attached Bathroom",
      },
      {
        src: "/images/family-suite-blue-linens.jpg",
        alt: "Multiple bed setups for large families and pilgrimage yatras in Bodhgaya",
        caption: "Comfortably accommodates 4 to 6 family members or yatris with ample moving space.",
        tag: "Family Comfort",
      },
    ],
    specs: {
      bedSetup: "2 Large Double Beds (Accommodates 4 to 6 Guests)",
      maxGuests: "4 - 6 Guests",
      cooling: "High-Capacity Split Air Conditioner",
      bathroom: "Attached Western Bathroom with 24/7 Geyser",
      wifi: "High-Speed Free Wi-Fi across the suite",
      roomSize: "Approx. 340 sq. ft.",
      floor: "Rich Wood-Pattern Floor & Vitrified Tiles",
    },
    amenities: [
      { icon: "👨‍👩‍👧‍👦", name: "Large Family Capacity", desc: "Easily hosts 4 to 6 guests in one cohesive, secure family space" },
      { icon: "❄️", name: "High-Capacity Split AC", desc: "Rapid cooling ensures even temperature across the large suite" },
      { icon: "🚿", name: "24/7 Hot Water Geyser", desc: "Continuous hot water supply for morning holy dips and baths" },
      { icon: "🪞", name: "Dressing Vanity & Mirror", desc: "Full-width dressing counter with seating stool and mirror" },
      { icon: "📶", name: "Fast Wi-Fi Connection", desc: "High bandwidth connection for all family devices simultaneously" },
      { icon: "🧳", name: "Ample Luggage Storage", desc: "Separate luggage racks and floor space for multiple large suitcases" },
      { icon: "🚖", name: "Airport / Station Pickup", desc: "Private taxi pickup for Gaya Airport or Railway Station" },
      { icon: "🛕", name: "Temple Tour Assistance", desc: "Tailored private cab packages for Bodhgaya shrines, Rajgir & Nalanda" },
    ],
    highlights: [
      "The premier accommodation in Bodhgaya for pilgrimage groups, yatras, and large families",
      "Keep everyone together in comfort while saving on booking multiple separate hotel rooms",
      "Equipped with modern comforts, attached hot-water bath, and round-the-clock host care",
      "Unmatched direct booking rate of only ₹2,499/night with zero platform fees",
    ],
    houseRules: [
      "Check-in: 12:00 PM onwards (24/7 check-in accommodated)",
      "Check-out: 11:00 AM",
      "Government Photo ID required for all adult family members",
      "Please respect fellow pilgrim guests in common corridors",
    ],
  },
};

export function getRoomExtendedData(roomId: string): RoomExtendedData {
  return ROOM_GALLERIES[roomId] || ROOM_GALLERIES["deluxe-double"];
}
