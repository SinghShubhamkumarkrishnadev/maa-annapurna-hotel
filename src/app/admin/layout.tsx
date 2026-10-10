import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Portal | Maa Annapurna Home Stay",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
