import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://maa-annapurna-hotel.vercel.app";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        `${baseUrl}/images/rooms/deluxe-double-main.jpg`,
        `${baseUrl}/images/rooms/triple-room-main.jpg`,
        `${baseUrl}/images/rooms/twin-room-main.jpg`,
        `${baseUrl}/images/rooms/family-suite-main.jpg`,
        `${baseUrl}/images/rooms/bathroom-modern.jpg`,
        `${baseUrl}/images/bodhgaya-landmarks-hero.webp`,
        `${baseUrl}/images/logo.png`,
      ],
    },
  ];
}
