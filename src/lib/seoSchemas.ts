import { PhotoItem, RoomItem, FaqItem } from "@/types/hotel";

export function getHotelSchema(hotelImages: PhotoItem[] = [], rooms: RoomItem[] = []) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maa-annapurna-hotel.vercel.app";

  const defaultImages = [
    `${siteUrl}/images/rooms/deluxe-double-main.jpg`,
    `${siteUrl}/images/rooms/triple-room-main.jpg`,
    `${siteUrl}/images/rooms/twin-room-main.jpg`,
    `${siteUrl}/images/rooms/family-suite-main.jpg`,
    `${siteUrl}/images/rooms/bathroom-modern.jpg`,
    `${siteUrl}/images/logo.png`,
  ];

  const dynamicImages = hotelImages.length > 0
    ? hotelImages.map((img) => (img.src.startsWith("http") ? img.src : `${siteUrl}${img.src}`))
    : defaultImages;

  return {
    "@context": "https://schema.org",
    "@type": ["Hotel", "BedAndBreakfast", "LodgingBusiness"],
    "name": "Maa Annapurna Home Stay Bodhgaya",
    "alternateName": [
      "Maa Annapurna Home Stay & Hotel Bodhgaya",
      "Maa Annapurna Hotel Bodhgaya",
      "Maa Annapurna Hotel",
      "Maa Annapurna Home Stay",
      "Maa Annapurna Guest House Bodhgaya",
      "Hotel Maa Annapurna Bodhgaya",
    ],
    "description":
      "Peaceful, clean AC home stay and hotel in Bodhgaya open 24 hours (24/7) near Mahabodhi Temple. Offering airport/railway pick & drop service, customized tours and travels packages, private attached bathrooms, kitchenette options, 24/7 hot water geyser, and high-speed Wi-Fi.",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
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
      "addressCountry": "IN",
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 24.7022,
      "longitude": 84.9759,
    },
    "hasMap": "https://share.google/u28zYVIFglv8XWTyZ",
    "image": dynamicImages,
    "checkinTime": "12:00:00",
    "checkoutTime": "11:00:00",
    "numberOfRooms": 10,
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        "opens": "00:00",
        "closes": "23:59",
      },
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919931924027",
      "contactType": "reservations",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"],
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "14",
    },
    "petsAllowed": false,
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "1199",
      "highPrice": "2499",
      "offerCount": "10",
    },
    "amenityFeature": [
      { "@type": "LocationFeatureSpecification", "name": "24-Hour Front Desk (24/7 Open)", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Airport & Railway Pick and Drop Service", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Tours & Travels Facility", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Split Air Conditioning", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "24/7 Hot Water Geyser", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Free High-Speed Wi-Fi", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Kitchenette Facility", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Attached Private Modern Bathroom", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Daily Housekeeping", "value": true },
      { "@type": "LocationFeatureSpecification", "name": "Free Parking", "value": true },
    ],
    "containsPlace": (rooms.length > 0 ? rooms : [
      {
        id: "deluxe-double",
        name: "Deluxe AC Double Room",
        description: "Quiet, well-ventilated AC room in Bodhgaya with dressing area and modern attached bath.",
        guests: "2 Guests",
        beds: "1 Queen / Double Bed",
        price: 1299,
      },
      {
        id: "triple-kitchenette",
        name: "Triple Bed Room with Kitchenette",
        description: "Ideal for families or longer pilgrimage stays in Bodhgaya with dedicated kitchenette sink.",
        guests: "3 - 4 Guests",
        beds: "3 Comfortable Beds",
        price: 1899,
      },
      {
        id: "classic-twin",
        name: "Twin Bed Room",
        description: "Features two separate single beds with wooden paneling for pilgrims and friends.",
        guests: "2 Guests",
        beds: "2 Single Beds",
        price: 1199,
      },
      {
        id: "family-suite",
        name: "Executive Family Suite",
        description: "Extra-large suite designed for family groups and pilgrimage yatras visiting Bodhgaya.",
        guests: "4 - 6 Guests",
        beds: "Multi-Bed Setup (4-6 Guests)",
        price: 2499,
      },
    ]).map((room) => ({
      "@type": "HotelRoom",
      "name": room.name,
      "description": room.description,
      "occupancy": {
        "@type": "QuantitativeValue",
        "name": room.guests,
      },
      "bed": {
        "@type": "BedDetails",
        "typeOfBed": room.beds,
      },
      "offers": {
        "@type": "Offer",
        "price": room.price.toString(),
        "priceCurrency": "INR",
        "availability": "https://schema.org/InStock",
        "priceValidUntil": "2027-12-31",
      },
    })),
  };
}

export function getWebSiteSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maa-annapurna-hotel.vercel.app";
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Maa Annapurna Home Stay Bodhgaya",
    "alternateName": "Maa Annapurna Hotel Bodhgaya",
    "url": siteUrl,
  };
}

export function getOrganizationSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maa-annapurna-hotel.vercel.app";
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Maa Annapurna Home Stay",
    "alternateName": "Maa Annapurna Hotel Bodhgaya",
    "url": siteUrl,
    "logo": `${siteUrl}/images/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+919931924027",
      "contactType": "reservations",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"],
    },
    "sameAs": [
      "https://share.google/u28zYVIFglv8XWTyZ",
    ],
  };
}

export function getFaqSchema(faqs: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a,
      },
    })),
  };
}

export function getBreadcrumbSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maa-annapurna-hotel.vercel.app";
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": siteUrl,
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Rooms & Suites in Bodhgaya",
        "item": `${siteUrl}/#rooms`,
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Maa Annapurna Home Stay",
        "item": siteUrl,
      },
    ],
  };
}
