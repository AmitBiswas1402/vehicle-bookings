"use client";

import React, { useState } from "react";
import {
  Car,
  Bike,
  Shield,
  MapPin,
  ChevronDown,
  User,
  PhoneCall,
  Menu,
  X,
  Zap,
} from "lucide-react";
import { MOCK_CITIES } from "@/data/mockData";

interface NavbarProps {
  activeMode: "daily" | "rental" | "outstation";
  onSelectMode: (mode: "daily" | "rental" | "outstation") => void;
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onOpenHelpModal: () => void;
  onOpenDriverModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeMode,
  onSelectMode,
  selectedCity,
  onSelectCity,
  onOpenHelpModal,
  onOpenDriverModal,
}) => {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-sm">
              <Car className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-100">
                  NEX<span className="text-emerald-400">RIDE</span>
                </span>
                <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 hidden sm:block font-medium">
                Unified Urban Transit Network
              </p>
            </div>
          </a>

          {/* Service Mode Switchers in Header */}
          <nav className="hidden lg:flex items-center gap-1 rounded-full bg-zinc-900/90 p-1 border border-zinc-800">
            <button
              onClick={() => onSelectMode("daily")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeMode === "daily"
                  ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Zap className="h-3 w-3 text-emerald-400" />
              Daily Commute
            </button>
            <button
              onClick={() => onSelectMode("rental")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeMode === "rental"
                  ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <Car className="h-3 w-3 text-zinc-300" />
              Hourly Rentals
            </button>
            <button
              onClick={() => onSelectMode("outstation")}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                activeMode === "outstation"
                  ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60"
                  : "text-zinc-400 hover:text-zinc-200"
              }`}
            >
              <MapPin className="h-3 w-3 text-zinc-300" />
              Outstation
            </button>
          </nav>
        </div>

        {/* Right Tools: City, Driver Partner, Help & Login */}
        <div className="flex items-center gap-2.5">
          {/* City Selector */}
          <div className="relative">
            <button
              onClick={() => setIsCityOpen(!isCityOpen)}
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300 hover:text-white hover:border-zinc-700 transition"
            >
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              <span>{selectedCity}</span>
              <ChevronDown className="h-3 w-3 text-zinc-400" />
            </button>

            {isCityOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl p-1.5 z-50 animate-in fade-in duration-100">
                <div className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                  Select Operating Region
                </div>
                {MOCK_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      onSelectCity(city);
                      setIsCityOpen(false);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                      selectedCity === city
                        ? "bg-zinc-800 text-zinc-100 font-semibold"
                        : "text-zinc-400 hover:bg-zinc-800/80 hover:text-zinc-100"
                    }`}
                  >
                    <span>{city}</span>
                    {selectedCity === city && (
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Drive / Captain Onboarding button */}
          <button
            onClick={onOpenDriverModal}
            className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-200 text-xs font-medium transition"
          >
            <Bike className="h-3.5 w-3.5 text-zinc-300" />
            <span>Drive with Us</span>
          </button>

          {/* Safety Quick Link */}
          <a
            href="#safety"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 text-xs font-medium transition"
          >
            <Shield className="h-3.5 w-3.5 text-zinc-300" />
            <span>Safety</span>
          </a>

          {/* Help button */}
          <button
            onClick={onOpenHelpModal}
            className="flex items-center gap-1 p-2 sm:px-2.5 sm:py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white text-xs font-medium transition"
            title="Customer Support 24x7"
          >
            <PhoneCall className="h-3.5 w-3.5 text-zinc-400" />
            <span className="hidden sm:inline">24x7 Help</span>
          </button>

          {/* Sign In / User Profile */}
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-semibold transition shadow-sm"
          >
            <User className="h-3.5 w-3.5" />
            <span>{isLoggedIn ? "Arjun K." : "Sign In"}</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-zinc-800 bg-zinc-950 px-4 pt-3 pb-5 space-y-3">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
            Ride Category
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => {
                onSelectMode("daily");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-xs font-medium text-center border ${
                activeMode === "daily"
                  ? "bg-zinc-800 border-zinc-700 text-zinc-100"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400"
              }`}
            >
              Daily Commute
            </button>
            <button
              onClick={() => {
                onSelectMode("rental");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-xs font-medium text-center border ${
                activeMode === "rental"
                  ? "bg-zinc-800 border-zinc-700 text-zinc-100"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400"
              }`}
            >
              Rentals
            </button>
            <button
              onClick={() => {
                onSelectMode("outstation");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-xs font-medium text-center border ${
                activeMode === "outstation"
                  ? "bg-zinc-800 border-zinc-700 text-zinc-100"
                  : "bg-zinc-900 border-zinc-800 text-zinc-400"
              }`}
            >
              Outstation
            </button>
          </div>

          <div className="pt-2 border-t border-zinc-800 flex justify-between items-center">
            <span className="text-xs text-zinc-400">Current City:</span>
            <span className="text-xs font-semibold text-zinc-200">{selectedCity}</span>
          </div>

          <button
            onClick={() => {
              onOpenDriverModal();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-100 text-xs font-semibold flex items-center justify-center gap-2 border border-zinc-700"
          >
            <Bike className="h-4 w-4 text-emerald-400" /> Partner Fleet / Drive
          </button>
        </div>
      )}
    </header>
  );
};
