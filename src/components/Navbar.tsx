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
  Sparkles,
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
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0b0f17]/90 backdrop-blur-md">
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-tr from-emerald-500 via-amber-400 to-cyan-500 p-0.5 shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <div className="flex h-full w-full items-center justify-center rounded-[10px] bg-[#0b0f17]">
                <Car className="h-5 w-5 text-emerald-400 group-hover:rotate-6 transition-transform" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight text-white font-sans">
                  NEX<span className="text-emerald-400">RIDE</span>
                </span>
                <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 text-[10px] font-semibold text-emerald-300 border border-emerald-500/30">
                  LIVE
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block font-medium">
                Ola • Uber • Rapido in one tap
              </p>
            </div>
          </a>

          {/* Service Mode Switchers in Header */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-slate-900/90 p-1 border border-slate-800">
            <button
              onClick={() => onSelectMode("daily")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeMode === "daily"
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Zap className="h-3.5 w-3.5" />
              Daily City Ride
            </button>
            <button
              onClick={() => onSelectMode("rental")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeMode === "rental"
                  ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <Car className="h-3.5 w-3.5" />
              Hourly Rentals
            </button>
            <button
              onClick={() => onSelectMode("outstation")}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeMode === "outstation"
                  ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/30"
                  : "text-slate-300 hover:text-white hover:bg-slate-800/60"
              }`}
            >
              <MapPin className="h-3.5 w-3.5" />
              Intercity Outstation
            </button>
          </nav>
        </div>

        {/* Right Tools: City, Driver Partner, Help & Login */}
        <div className="flex items-center gap-3">
          {/* City Selector */}
          <div className="relative">
            <button
              onClick={() => setIsCityOpen(!isCityOpen)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-700 transition"
            >
              <MapPin className="h-3.5 w-3.5 text-emerald-400" />
              <span>{selectedCity}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {isCityOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-2.5 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Select Operating City
                </div>
                {MOCK_CITIES.map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      onSelectCity(city);
                      setIsCityOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition flex items-center justify-between ${
                      selectedCity === city
                        ? "bg-emerald-500/20 text-emerald-300 font-semibold"
                        : "text-slate-300 hover:bg-slate-800 hover:text-white"
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
            className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-400/10 border border-amber-400/30 text-amber-300 hover:bg-amber-400/20 text-xs font-semibold transition"
          >
            <Bike className="h-3.5 w-3.5 text-amber-400" />
            <span>Drive & Earn</span>
            <span className="rounded bg-amber-400 text-slate-950 px-1 py-0.2 text-[9px] font-bold">
              0% Comm
            </span>
          </button>

          {/* Safety SOS Quick Button */}
          <a
            href="#safety"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 text-xs font-medium transition"
          >
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span>Safety</span>
          </a>

          {/* Help button */}
          <button
            onClick={onOpenHelpModal}
            className="flex items-center gap-1 p-2 sm:px-3 sm:py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition"
            title="Customer Support 24x7"
          >
            <PhoneCall className="h-3.5 w-3.5 text-cyan-400" />
            <span className="hidden sm:inline">24x7 Help</span>
          </button>

          {/* Sign In / User Profile */}
          <button
            onClick={() => setIsLoggedIn(!isLoggedIn)}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white text-slate-950 hover:bg-slate-200 text-xs font-bold transition shadow-sm"
          >
            <User className="h-3.5 w-3.5" />
            <span>{isLoggedIn ? "Arjun K." : "Sign In"}</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drop menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-4 pt-3 pb-5 space-y-3">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
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
                  ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                  : "bg-slate-900 border-slate-800 text-slate-300"
              }`}
            >
              Daily Ride
            </button>
            <button
              onClick={() => {
                onSelectMode("rental");
                setMobileMenuOpen(false);
              }}
              className={`p-2.5 rounded-lg text-xs font-medium text-center border ${
                activeMode === "rental"
                  ? "bg-amber-400/20 border-amber-400 text-amber-300"
                  : "bg-slate-900 border-slate-800 text-slate-300"
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
                  ? "bg-cyan-400/20 border-cyan-400 text-cyan-300"
                  : "bg-slate-900 border-slate-800 text-slate-300"
              }`}
            >
              Outstation
            </button>
          </div>

          <div className="pt-2 border-t border-slate-800 flex justify-between items-center">
            <span className="text-xs text-slate-400">Current City:</span>
            <span className="text-xs font-semibold text-emerald-400">{selectedCity}</span>
          </div>

          <button
            onClick={() => {
              onOpenDriverModal();
              setMobileMenuOpen(false);
            }}
            className="w-full py-2.5 rounded-lg bg-amber-400 text-slate-950 text-xs font-bold flex items-center justify-center gap-2"
          >
            <Bike className="h-4 w-4" /> Become a Captain / Driver
          </button>
        </div>
      )}
    </header>
  );
};
