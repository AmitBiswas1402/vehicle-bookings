import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: "NexRide | Book City Cabs, Autos & Bike Taxis",
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
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        <ClerkProvider>{children}</ClerkProvider>
      </body>
    </html>
  );
}
