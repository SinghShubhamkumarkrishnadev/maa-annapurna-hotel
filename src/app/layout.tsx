import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://maaannapurnahotel.com"),
  title: {
    default: "Maa Annapurna Home Stay & Hotel | 24/7 Open • Pick & Drop • Best AC Hotel in Bodhgaya",
    template: "%s | Maa Annapurna Home Stay & Hotel Bodhgaya",
  },
  description:
    "Looking for the best hotel in Bodhgaya? 24/7 Open Maa Annapurna Home Stay offers clean AC rooms, family suites with kitchenette, attached modern baths, free Wi-Fi, airport/railway pick & drop service, and tours & travels packages. 5 mins from Mahabodhi Temple. Book direct!",
  applicationName: "Maa Annapurna Home Stay Bodhgaya",
  authors: [{ name: "Maa Annapurna Home Stay", url: "https://maaannapurnahotel.com" }],
  generator: "Next.js",
  keywords: [
    "hotel in bodhgaya",
    "hotels in bodhgaya",
    "best hotel in bodhgaya",
    "24 hours open hotel in bodhgaya",
    "24/7 open hotel in bodhgaya",
    "hotel in bodhgaya 24 hours open",
    "hotel in bodhgaya with pick and drop",
    "bodhgaya hotel pick and drop service",
    "bodhgaya tours and travels hotel",
    "tours and travels in bodhgaya",
    "gaya airport pick and drop hotel",
    "gaya junction railway station pick and drop hotel",
    "maa annapurna hotel bodhgaya",
    "maa annapurna home stay bodhgaya",
    "maa annapurna hotel",
    "homestay in bodhgaya",
    "hotel near mahabodhi temple",
    "rooms in bodhgaya",
    "family hotel in bodhgaya",
    "hotel in bodhgaya with kitchenette",
    "budget hotel in bodhgaya",
    "guest house in bodhgaya",
    "ac hotel near mahabodhi temple bodhgaya",
    "bodhgaya hotel booking",
    "bodhgaya pilgrimage stay",
    "hotel in bodhgaya price",
    "hotel in bodhgaya room tariff",
    "cheap and best hotel in bodhgaya",
    "ac room in bodhgaya price",
    "budget hotel in bodhgaya with tariffs",
    "bodhgaya hotel low price",
  ],
  creator: "Maa Annapurna Home Stay",
  publisher: "Maa Annapurna Home Stay",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Maa Annapurna Home Stay & Hotel | 24/7 Open • Pick & Drop • Near Mahabodhi Temple Bodhgaya",
    description:
      "24/7 Open hotel in Bodhgaya with airport/railway pick & drop service, tours & travels desk, clean AC rooms, kitchenette suites, Wi-Fi & attached baths. 5 mins to Mahabodhi Temple.",
    url: "https://maaannapurnahotel.com",
    siteName: "Maa Annapurna Home Stay Bodhgaya",
    images: [
      {
        url: "/images/room-triple-kitchenette.jpg",
        width: 1600,
        height: 738,
        alt: "Triple Bed Room with Kitchenette at Maa Annapurna Home Stay Bodhgaya",
      },
      {
        url: "/images/deluxe-room-dressing-table.jpg",
        width: 1600,
        height: 738,
        alt: "Deluxe AC Bedroom at Maa Annapurna Hotel Bodhgaya",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maa Annapurna Home Stay & Hotel | 24/7 Open • Pick & Drop • Bodhgaya",
    description:
      "24 Hours Open hotel in Bodhgaya with airport & railway pick & drop, tours and travels packages, clean AC rooms, and kitchenette suites near Mahabodhi Temple. Book direct!",
    images: ["/images/room-triple-kitchenette.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="font-sans bg-white text-stone-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}

