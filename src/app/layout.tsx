import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Cartelle",
    template: "%s | Cartelle",
  },
  description:
    "Cartelle is a mock luxury clothing store featuring curated fashion, premium essentials, and designer-inspired collections.",
  applicationName: "Cartelle",
  keywords: [
    "mock store",
    "luxury clothing",
    "fashion",
    "designer",
    "premium apparel",
    "cartelle",
  ],
  metadataBase: new URL("https://cartelle.example"),
  openGraph: {
    title: "Cartelle",
    description:
      "A mock luxury clothing store with curated fashion and premium essentials.",
    type: "website",
    siteName: "Cartelle",
    images: [
      {
        url: "/assets/logo.png",
        width: 1200,
        height: 630,
        alt: "Cartelle",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cartelle",
    description:
      "A mock luxury clothing store with curated fashion and premium essentials.",
    images: ["/assets/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased relative`}>
        {children}
      </body>
    </html>
  );
}
