"use client";

import React, { useState } from "react";
import {
  MapPin,
  ChevronDown,
  User,
  Menu,
  X,
  PhoneCall,
} from "lucide-react";
import { MOCK_CITIES } from "@/db/mockData";
import {
  Show,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import type { User as DbUser } from "@/lib/authorization";

interface NavbarProps {
  selectedCity: string;
  onSelectCity: (city: string) => void;
  onOpenHelpModal: () => void;
  onOpenDriverModal: () => void;
  currentUser?: DbUser | null;
}

export const Navbar: React.FC<NavbarProps> = ({
  selectedCity,
  onSelectCity,
  onOpenHelpModal,
  onOpenDriverModal,
  currentUser,
}) => {
  const [isCityOpen, setIsCityOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-lg border-b border-gray-100 shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div className="flex items-center gap-8">
          <a href="#" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Nex<span className="text-emerald-600">Ride</span>
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            <a href="#" className="px-3 py-2 text-sm font-medium text-slate-900 hover:bg-gray-50 rounded-lg transition">Ride</a>
            <button
              onClick={onOpenDriverModal}
              className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-gray-50 rounded-lg transition"
            >
              Drive
            </button>
            <a href="#safety" className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-gray-50 rounded-lg transition">Safety</a>
            <button
              onClick={onOpenHelpModal}
              className="px-3 py-2 text-sm font-medium text-slate-500 hover:text-slate-900 hover:bg-gray-50 rounded-lg transition"
            >
              Help
            </button>
          </nav>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2">
          {/* City Selector */}
          <div className="relative">
            <button
              onClick={() => setIsCityOpen(!isCityOpen)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-slate-700 hover:bg-gray-100 transition"
            >
              <MapPin className="h-3.5 w-3.5 text-slate-400" />
              <span>{selectedCity}</span>
              <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
            </button>

            {isCityOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setIsCityOpen(false)} />
                <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-white border border-gray-200 shadow-xl p-2 z-50 animate-slide-up">
                  <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    Select City
                  </div>
                  {MOCK_CITIES.map((city) => (
                    <button
                      key={city}
                      onClick={() => {
                        onSelectCity(city);
                        setIsCityOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-sm font-medium transition flex items-center justify-between ${
                        selectedCity === city
                          ? "bg-gray-100 text-slate-900 font-semibold"
                          : "text-slate-600 hover:bg-gray-50 hover:text-slate-900"
                      }`}
                    >
                      <span>{city}</span>
                      {selectedCity === city && (
                        <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
                      )}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Help button (mobile) */}
          <button
            onClick={onOpenHelpModal}
            className="flex md:hidden items-center p-2 rounded-full text-slate-500 hover:bg-gray-100 transition"
            title="Help"
          >
            <PhoneCall className="h-4 w-4" />
          </button>

          {/* Clerk Auth */}
          <Show when="signed-in">
            <div className="flex items-center gap-2.5">
              {currentUser?.role && (
                <span
                  className={`hidden sm:inline-flex items-center px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    currentUser.role === "ADMIN"
                      ? "bg-purple-50 text-purple-700"
                      : currentUser.role === "DRIVER"
                      ? "bg-sky-50 text-sky-700"
                      : "bg-emerald-50 text-emerald-700"
                  }`}
                >
                  {currentUser.role}
                </span>
              )}
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 rounded-full ring-2 ring-gray-100",
                  },
                }}
              />
            </div>
          </Show>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-black text-white hover:bg-gray-800 text-sm font-semibold transition cursor-pointer">
                <User className="h-3.5 w-3.5" />
                <span>Sign in</span>
              </button>
            </SignInButton>
            <SignInButton mode="modal">
              <button className="sm:hidden flex items-center p-2 rounded-full bg-black text-white hover:bg-gray-800 transition cursor-pointer">
                <User className="h-4 w-4" />
              </button>
            </SignInButton>
          </Show>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex md:hidden p-2 rounded-full text-slate-500 hover:bg-gray-100 transition"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 pt-3 pb-5 space-y-1 animate-slide-up">
          <a href="#" className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-900 bg-gray-50">Ride</a>
          <button
            onClick={() => { onOpenDriverModal(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-gray-50 transition"
          >
            Drive with Us
          </button>
          <a href="#safety" className="block px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-gray-50 transition">Safety</a>
          <button
            onClick={() => { onOpenHelpModal(); setMobileMenuOpen(false); }}
            className="w-full text-left px-3 py-2.5 rounded-xl text-sm font-medium text-slate-600 hover:bg-gray-50 transition"
          >
            24×7 Help
          </button>
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <span className="text-xs text-slate-400">Current City</span>
            <span className="text-xs font-semibold text-slate-700">{selectedCity}</span>
          </div>
        </div>
      )}
    </header>
  );
};
