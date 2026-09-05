"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Car,
  Compass,
  Bike,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Zap,
  TrendingUp,
  Clock,
  Loader2,
} from "lucide-react";
import type { UserRole } from "@/lib/authorization";

interface RoleSelectorClientProps {
  userEmail: string;
  userName?: string | null;
  userAvatar?: string | null;
}

export const RoleSelectorClient: React.FC<RoleSelectorClientProps> = ({
  userEmail,
  userName,
  userAvatar,
}) => {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole>("TRAVELLER");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConfirmRole = async () => {
    if (!selectedRole || (selectedRole !== "TRAVELLER" && selectedRole !== "DRIVER")) {
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ role: selectedRole }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to update role");
      }

      // Role updated successfully, redirect to dashboard / home
      router.push("/");
      router.refresh();
    } catch (err: any) {
      console.error("Error setting role:", err);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-zinc-100 flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-500/10 via-emerald-500/5 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 right-1/4 w-[600px] h-[400px] bg-gradient-to-t from-cyan-500/10 to-transparent blur-3xl" />

      {/* Header / Brand */}
      <header className="w-full max-w-5xl flex items-center justify-between pt-2 pb-6 border-b border-zinc-800/60 z-10">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-100 shadow-sm">
            <Car className="h-4 w-4 text-emerald-400" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-base sm:text-lg font-bold tracking-tight text-zinc-100">
                NEX<span className="text-emerald-400">RIDE</span>
              </span>
              <span className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[10px] font-medium bg-zinc-900 border border-zinc-800 text-zinc-300">
                ONBOARDING
              </span>
            </div>
            <p className="text-[10px] text-zinc-400 hidden sm:block font-medium">
              Role-Based Access Configuration
            </p>
          </div>
        </div>

        {/* User preview */}
        <div className="flex items-center gap-3 bg-zinc-900/80 border border-zinc-800 rounded-full px-3 py-1.5">
          {userAvatar ? (
            <img
              src={userAvatar}
              alt={userName || userEmail}
              className="w-6 h-6 rounded-full border border-zinc-700 object-cover"
            />
          ) : (
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold">
              {(userName || userEmail).charAt(0).toUpperCase()}
            </div>
          )}
          <div className="text-left hidden sm:block">
            <div className="text-xs font-semibold text-zinc-200 truncate max-w-[140px]">
              {userName || "NexRide Member"}
            </div>
            <div className="text-[10px] text-zinc-400 truncate max-w-[140px]">
              {userEmail}
            </div>
          </div>
        </div>
      </header>

      {/* Main Card Selection Container */}
      <main className="w-full max-w-4xl py-10 flex flex-col items-center z-10">
        {/* Step Badge & Titles */}
        <div className="text-center space-y-3 max-w-xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Select Your Journey</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            How will you use NexRide?
          </h1>
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed">
            Choose whether you are booking rides across city and intercity routes,
            or joining our partner fleet to drive and earn.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="w-full max-w-2xl mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs sm:text-sm flex items-center gap-2">
            <span>⚠️ {errorMessage}</span>
          </div>
        )}

        {/* Dual Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-3xl">
          {/* Card 1: TRAVELLER */}
          <div
            onClick={() => setSelectedRole("TRAVELLER")}
            className={`group relative rounded-2xl p-6 sm:p-7 cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
              selectedRole === "TRAVELLER"
                ? "bg-zinc-900/95 border-emerald-500/80 shadow-2xl shadow-emerald-500/10 ring-2 ring-emerald-500/40"
                : "bg-zinc-950/60 border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900/50"
            }`}
          >
            {/* Active Pill Badge */}
            <div className="flex items-center justify-between mb-5">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  selectedRole === "TRAVELLER"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/40"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 group-hover:text-zinc-200"
                }`}
              >
                <Compass className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  selectedRole === "TRAVELLER"
                    ? "bg-emerald-500 text-zinc-950 scale-105"
                    : "border-2 border-zinc-700 text-transparent"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 fill-current" />
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 uppercase tracking-wider">
                <Zap className="w-3 h-3" /> Commuter & Rider
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-emerald-300 transition-colors">
                I am a Traveller
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Book instant city cabs, auto-rickshaws, bike taxis, hourly rentals,
                and intercity rides with real-time GPS tracking.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-2.5 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Instant dispatch across 6 vehicle classes</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>24x7 Safety SOS & Start OTP security</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                <span>Transparent fixed and meter rates</span>
              </div>
            </div>
          </div>

          {/* Card 2: DRIVER */}
          <div
            onClick={() => setSelectedRole("DRIVER")}
            className={`group relative rounded-2xl p-6 sm:p-7 cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
              selectedRole === "DRIVER"
                ? "bg-zinc-900/95 border-cyan-500/80 shadow-2xl shadow-cyan-500/10 ring-2 ring-cyan-500/40"
                : "bg-zinc-950/60 border-zinc-800/90 hover:border-zinc-700 hover:bg-zinc-900/50"
            }`}
          >
            {/* Active Pill Badge */}
            <div className="flex items-center justify-between mb-5">
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                  selectedRole === "DRIVER"
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/40"
                    : "bg-zinc-900 text-zinc-400 border border-zinc-800 group-hover:text-zinc-200"
                }`}
              >
                <Bike className="w-6 h-6" />
              </div>
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-all ${
                  selectedRole === "DRIVER"
                    ? "bg-cyan-500 text-zinc-950 scale-105"
                    : "border-2 border-zinc-700 text-transparent"
                }`}
              >
                <CheckCircle2 className="w-4 h-4 fill-current" />
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-cyan-400 uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" /> Fleet Partner & Captain
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                I am a Driver / Partner
              </h2>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Drive your car, bike, or auto on your own schedule. Receive daily
                payouts, surge bonuses, and certified fleet benefits.
              </p>
            </div>

            {/* Feature Highlights */}
            <div className="space-y-2.5 pt-4 border-t border-zinc-800/80">
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Zero commission surge hours & daily withdrawal</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Complimentary commercial transit insurance</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-zinc-300">
                <Clock className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0" />
                <span>Flexible hours & 24x7 captain assistance</span>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Action Button */}
        <div className="mt-10 w-full max-w-md flex flex-col items-center gap-3">
          <button
            onClick={handleConfirmRole}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg ${
              selectedRole === "TRAVELLER"
                ? "bg-emerald-500 hover:bg-emerald-400 text-zinc-950 shadow-emerald-500/20"
                : "bg-cyan-500 hover:bg-cyan-400 text-zinc-950 shadow-cyan-500/20"
            } ${isLoading ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99]"}`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Configuring your profile...</span>
              </>
            ) : (
              <>
                <span>
                  Continue as {selectedRole === "TRAVELLER" ? "Traveller" : "Driver Partner"}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

          <p className="text-[11px] text-zinc-400 text-center">
            You can modify your profile preferences anytime from your account settings.
          </p>
        </div>
      </main>

      {/* Footer info */}
      <footer className="w-full max-w-5xl py-4 border-t border-zinc-900 text-center text-xs text-zinc-400 z-10">
        © {new Date().getFullYear()} NexRide Urban Transit Network. Enterprise RBAC Enforced.
      </footer>
    </div>
  );
};
