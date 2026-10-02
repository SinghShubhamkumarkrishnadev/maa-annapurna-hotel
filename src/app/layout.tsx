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
    default: "Maa Annapurna Home Stay & Hotel | Best AC Hotel in Bodhgaya Near Mahabodhi Temple",
    template: "%s | Maa Annapurna Home Stay & Hotel Bodhgaya",
  },
  description:
    "Looking for the best hotel in Bodhgaya? Maa Annapurna Home Stay offers clean, peaceful AC rooms, family suites with kitchenette, attached modern baths with geyser & free Wi-Fi, just 5 minutes from Mahabodhi Temple. Book direct for best rates!",
  applicationName: "Maa Annapurna Home Stay Bodhgaya",
  authors: [{ name: "Maa Annapurna Home Stay", url: "https://maaannapurnahotel.com" }],
  generator: "Next.js",
  keywords: [
    "hotel in bodhgaya",
    "hotels in bodhgaya",
    "best hotel in bodhgaya",
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
    title: "Maa Annapurna Home Stay & Hotel | Best AC Hotel Near Mahabodhi Temple, Bodhgaya",
    description:
      "Comfortable, peaceful AC rooms & family suites in Bodhgaya with attached baths, kitchenette, Wi-Fi, and 24/7 hot water. 5 mins to Mahabodhi Temple. Direct booking available.",
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
    title: "Maa Annapurna Home Stay & Hotel | Best Stay in Bodhgaya",
    description:
      "Peaceful AC rooms & family suites near Mahabodhi Temple with 24/7 hot water geyser, kitchenette, and free Wi-Fi in Bodhgaya. Book direct for best rates.",
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

