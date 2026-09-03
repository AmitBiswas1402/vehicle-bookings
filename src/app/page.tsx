"use client";

import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { HeroBooking } from "../components/HeroBooking";
import { ServiceCategories } from "../components/ServiceCategories";
import { FareEstimator } from "../components/FareEstimator";
import { SafetyFeatures } from "../components/SafetyFeatures";
import { DriverPartnerBanner } from "../components/DriverPartnerBanner";
import { AppDownloadBanner } from "../components/AppDownloadBanner";
import { Footer } from "../components/Footer";
import { RideSimulationModal } from "../components/RideSimulationModal";
import { HelpModal } from "../components/HelpModal";
import { DriverModal } from "../components/DriverModal";
import { ServiceMode, ActiveBooking } from "../types/ride";

export default function Home() {
  const [activeMode, setActiveMode] = useState<ServiceMode>("daily");
  const [selectedCity, setSelectedCity] = useState<string>("Bengaluru");
  const [activeBooking, setActiveBooking] = useState<ActiveBooking | null>(null);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isDriverOpen, setIsDriverOpen] = useState(false);

  const handleBookRide = (booking: ActiveBooking) => {
    setActiveBooking(booking);
  };

  const handleCancelBooking = () => {
    setActiveBooking(null);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col font-sans">
      {/* Sticky Global Navigation */}
      <Navbar
        activeMode={activeMode}
        onSelectMode={(mode) => setActiveMode(mode)}
        selectedCity={selectedCity}
        onSelectCity={(city) => setSelectedCity(city)}
        onOpenHelpModal={() => setIsHelpOpen(true)}
        onOpenDriverModal={() => setIsDriverOpen(true)}
      />

      {/* Main Booking Stage: Left Booking Console + Right Vector Map */}
      <main className="flex-1">
        <HeroBooking
          activeMode={activeMode}
          onSelectMode={(mode) => setActiveMode(mode)}
          onBookRide={handleBookRide}
        />

        {/* 4 Core Pillars: City Commute, Hourly Rentals, Outstation, Airport */}
        <ServiceCategories
          onSelectCategory={(mode) => {
            setActiveMode(mode);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        {/* Transparent Fare Estimator & Distance Slider */}
        <FareEstimator />

        {/* Safety Pillars: Start OTP, 24x7 SOS, Live Tracking, Verified Captains */}
        <SafetyFeatures />

        {/* Driver Partner / Captain Recruitment & Earnings Calculator */}
        <DriverPartnerBanner />

        {/* Mobile App QR & Download Section */}
        <AppDownloadBanner />
      </main>

      {/* Modern Footer */}
      <Footer />

      {/* Active Booking Simulation Modal */}
      {activeBooking && (
        <RideSimulationModal
          booking={activeBooking}
          onClose={() => setActiveBooking(null)}
          onCancelBooking={handleCancelBooking}
        />
      )}

      {/* 24x7 Help Center Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Captain / Driver Onboarding Modal */}
      <DriverModal isOpen={isDriverOpen} onClose={() => setIsDriverOpen(false)} />
    </div>
  );
}
