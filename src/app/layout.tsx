import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexRide | Instant Cabs, Auto & Bike Rides (Ola, Uber & Rapido Inspired)",
  description: "Book city rides, hourly car rentals, intercity outstation cabs, and instant bike taxis with transparent fares, live driver tracking, and verified safety.",
  keywords: ["cab booking", "taxi service", "rapido bike", "uber ride", "ola cabs", "auto rickshaw", "hourly rental", "outstation"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0b0f17] text-slate-100 selection:bg-emerald-500 selection:text-white">
        {children}
      </body>
    </html>
  );
}
