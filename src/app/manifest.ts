import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Maa Annapurna Home Stay & Hotel Bodhgaya",
    short_name: "Maa Annapurna Hotel",
    description: "Comfortable AC rooms & family suites near Mahabodhi Temple, Bodhgaya.",
    start_url: "/",
    display: "standalone",
    background_color: "#FFFFFF",
    theme_color: "#1C1917",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
