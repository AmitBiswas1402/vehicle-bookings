"use client";

import React, { useState } from "react";
import { Navbar } from "./Navbar";
import { HeroBooking } from "./HeroBooking";
import { ServiceCategories } from "./ServiceCategories";
import { FareEstimator } from "./FareEstimator";
import { SafetyFeatures } from "./SafetyFeatures";
import { DriverPartnerBanner } from "./DriverPartnerBanner";
import { AppDownloadBanner } from "./AppDownloadBanner";
import { Footer } from "./Footer";
import { RideSimulationModal } from "./RideSimulationModal";
import { HelpModal } from "./HelpModal";
import { DriverModal } from "./DriverModal";
import { ServiceMode, ActiveBooking } from "@/types/ride";
import type { User } from "@/lib/authorization";

interface HomeClientProps {
  user?: User | null;
}

export function HomeClient({ user }: HomeClientProps) {
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
    <div className="min-h-screen bg-white text-slate-900 flex flex-col">
      {/* Sticky Global Navigation */}
      <Navbar
        selectedCity={selectedCity}
        onSelectCity={(city) => setSelectedCity(city)}
        onOpenHelpModal={() => setIsHelpOpen(true)}
        onOpenDriverModal={() => setIsDriverOpen(true)}
        currentUser={user}
      />

      {/* Main Content */}
      <main className="flex-1">
        <HeroBooking
          activeMode={activeMode}
          onSelectMode={(mode) => setActiveMode(mode)}
          onBookRide={handleBookRide}
        />

        {/* Service Categories */}
        <ServiceCategories
          onSelectCategory={(mode) => {
            setActiveMode(mode);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        {/* Fare Estimator */}
        <FareEstimator />

        {/* Safety Features */}
        <SafetyFeatures />

        {/* Driver Partner Banner */}
        <DriverPartnerBanner />

        {/* App Download Banner */}
        <AppDownloadBanner />
      </main>

      {/* Footer */}
      <Footer />

      {/* Active Booking Simulation Modal */}
      {activeBooking && (
        <RideSimulationModal
          booking={activeBooking}
          onClose={() => setActiveBooking(null)}
          onCancelBooking={handleCancelBooking}
        />
      )}

      {/* Help Center Modal */}
      <HelpModal isOpen={isHelpOpen} onClose={() => setIsHelpOpen(false)} />

      {/* Driver Onboarding Modal */}
      <DriverModal isOpen={isDriverOpen} onClose={() => setIsDriverOpen(false)} />
    </div>
  );
}
