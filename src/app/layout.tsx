import type { Metadata, Viewport } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maa-annapurna-hotel.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Maa Annapurna Home Stay | 24/7 Open • Pick & Drop • Best AC Homestay in Bodhgaya",
    template: "%s | Maa Annapurna Home Stay Bodhgaya",
  },
  description:
    "Looking for the best homestay & hotel in Bodhgaya? 24/7 Open Maa Annapurna Home Stay offers clean AC rooms, family suites with kitchenette, attached modern baths, free Wi-Fi, airport/railway pick & drop service, and tours & travels packages. 5 mins from Mahabodhi Temple. Book direct!",
  applicationName: "Maa Annapurna Home Stay Bodhgaya",
  authors: [{ name: "Maa Annapurna Home Stay", url: siteUrl }],
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
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
      { url: "/apple-icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    title: "Maa Annapurna Home Stay | 24/7 Open • Pick & Drop • Near Mahabodhi Temple Bodhgaya",
    description:
      "24/7 Open hotel & AC homestay in Bodhgaya with airport/railway pick & drop service, tours & travels desk, clean rooms, kitchenette suites, Wi-Fi & attached baths. 5 mins to Mahabodhi Temple.",
    url: siteUrl,
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
        alt: "Deluxe AC Bedroom at Maa Annapurna Home Stay & Hotel Bodhgaya",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maa Annapurna Home Stay | 24/7 Open • Pick & Drop • Bodhgaya",
    description:
      "24 Hours Open hotel & homestay in Bodhgaya with airport & railway pick & drop, tours and travels packages, clean AC rooms, and kitchenette suites near Mahabodhi Temple. Book direct!",
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
    <html lang="en" className={`${outfit.variable} ${inter.variable}`}>
      <body className="font-sans bg-white text-stone-900 antialiased selection:bg-amber-100 selection:text-amber-900">
        {children}
      </body>
    </html>
  );
}

