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
    default: "Maa Annapurna Home Stay | Best AC Homestay in Bodhgaya",
    template: "%s | Maa Annapurna Home Stay Bodhgaya",
  },
  description:
    "Best homestay in Bodhgaya near Mahabodhi Temple. Clean AC rooms, kitchenette suites, 24/7 front desk, airport pick & drop, and free Wi-Fi. Book direct today!",
  applicationName: "Maa Annapurna Home Stay Bodhgaya",
  authors: [{ name: "Maa Annapurna Home Stay", url: siteUrl }],
  generator: "Next.js",
  keywords: [
    "hotel in bodhgaya",
    "hotels in bodhgaya",
    "best hotel in bodhgaya",
    "homestay in bodhgaya",
    "best homestay in bodhgaya",
    "24 hours open hotel in bodhgaya",
    "24/7 open homestay in bodhgaya",
    "hotel in bodhgaya with pick and drop",
    "bodhgaya hotel pick and drop service",
    "bodhgaya tours and travels hotel",
    "tours and travels in bodhgaya",
    "gaya airport pick and drop hotel",
    "gaya junction railway station pick and drop hotel",
    "maa annapurna hotel bodhgaya",
    "maa annapurna home stay bodhgaya",
    "maa annapurna hotel",
    "hotel near mahabodhi temple",
    "rooms in bodhgaya",
    "family hotel in bodhgaya",
    "hotel in bodhgaya with kitchenette",
    "budget hotel in bodhgaya",
    "guest house in bodhgaya",
    "ac hotel near mahabodhi temple bodhgaya",
    "bodhgaya hotel booking",
    "bodhgaya pilgrimage stay",
    "hotel in bodhgaya room tariff",
    "cheap and best hotel in bodhgaya",
    "ac room in bodhgaya price",
    "budget hotel in bodhgaya with tariffs",
  ],
  creator: "Maa Annapurna Home Stay",
  publisher: "Maa Annapurna Home Stay",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
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
    title: "Maa Annapurna Home Stay | Best AC Homestay in Bodhgaya",
    description:
      "24/7 Open homestay in Bodhgaya near Mahabodhi Temple. Clean AC rooms, kitchenette suites, 24/7 front desk, airport pick & drop, and free Wi-Fi. Book direct!",
    url: siteUrl,
    siteName: "Maa Annapurna Home Stay Bodhgaya",
    images: [
      {
        url: "/images/rooms/deluxe-double-main.jpg",
        width: 1200,
        height: 675,
        alt: "Deluxe AC Double Room at Maa Annapurna Home Stay Bodhgaya",
        type: "image/jpeg",
      },
      {
        url: "/images/rooms/triple-room-main.jpg",
        width: 1200,
        height: 675,
        alt: "Triple Bed Room with Kitchenette at Maa Annapurna Home Stay Bodhgaya",
        type: "image/jpeg",
      },
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Maa Annapurna Home Stay Emblem Logo",
        type: "image/png",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Maa Annapurna Home Stay | Best AC Homestay in Bodhgaya",
    description:
      "Best AC homestay & hotel in Bodhgaya near Mahabodhi Temple with 24/7 front desk, airport pick & drop, clean rooms, and free Wi-Fi. Book direct!",
    images: ["/images/rooms/deluxe-double-main.jpg"],
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

