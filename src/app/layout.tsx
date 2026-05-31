import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Chrome from "@/components/layout/Chrome";

// Fraunces — variable serif with SOFT & WONK axes for the editorial feel.
// `axes` requires the variable weight axis (omit `weight` or use "variable").
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Clay Corner — Handcrafted Art by Dr. Suhrita De Roy",
  description:
    "Handcrafted art by Dr. Suhrita De Roy, a gynaecologist from Lake Town, Kolkata. Portraits, clay figurines, bottle art, texture paintings. Every piece pressed by hand, no moulds, no shortcuts.",
  keywords: [
    "handmade art",
    "portrait drawing",
    "clay art",
    "bottle art",
    "texture painting",
    "Suhrita De Roy",
    "Lake Town Kolkata artist",
    "handcrafted",
    "Clay Corner",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Chrome>{children}</Chrome>
      </body>
    </html>
  );
}
