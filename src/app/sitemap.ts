import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://maaannapurnahotel.com";
  const lastModified = new Date();

  return [
    {
      url: baseUrl,
      lastModified,
      changeFrequency: "daily",
      priority: 1.0,
      images: [
        `${baseUrl}/images/room-triple-kitchenette.jpg`,
        `${baseUrl}/images/deluxe-room-dressing-table.jpg`,
        `${baseUrl}/images/family-suite-blue-linens.jpg`,
        `${baseUrl}/images/room-twin-wooden-paneling.jpg`,
        `${baseUrl}/images/bathroom-full-view.jpg`,
      ],
    },
    {
      url: `${baseUrl}/#rooms`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#gallery`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#amenities`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#location`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#contact`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];
}
