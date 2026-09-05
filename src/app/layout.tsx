import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "NexRide | Enterprise Urban Mobility & Multi-Tier Cab Booking",
  description:
    "Book verified city cabs, hourly rentals, intercity outstation rides, and rapid bike taxis with transparent rates, real-time tracking, and certified safety.",
  keywords: [
    "cab booking",
    "taxi service",
    "bike taxi",
    "hourly car rental",
    "outstation cabs",
    "urban mobility",
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
      className={`${geistSans.variable} ${geistMono.variable} dark h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#09090b] text-zinc-100 selection:bg-emerald-500/30 selection:text-emerald-200">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
