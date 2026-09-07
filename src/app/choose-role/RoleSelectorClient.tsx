"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Compass,
  Bike,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
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
    if (!selectedRole || (selectedRole !== "TRAVELLER" && selectedRole !== "DRIVER")) return;
    setIsLoading(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: selectedRole }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update role");
      router.push("/");
      router.refresh();
    } catch (err: any) {
      console.error("Error setting role:", err);
      setErrorMessage(err.message || "An unexpected error occurred.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center justify-between p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-emerald-50 via-emerald-50/30 to-transparent blur-3xl" />

      {/* Header */}
      <header className="w-full max-w-5xl flex items-center justify-between pt-2 pb-6 border-b border-gray-100 z-10">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black">
            <span className="text-white text-sm font-bold">N</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-lg font-extrabold tracking-tight text-slate-900">
                Nex<span className="text-emerald-600">Ride</span>
              </span>
              <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold bg-gray-100 text-slate-500">
                ONBOARDING
              </span>
            </div>
          </div>
        </div>

        {/* User preview */}
        <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-full px-3.5 py-2">
          {userAvatar ? (
            <img src={userAvatar} alt={userName || userEmail} className="w-7 h-7 rounded-full border border-gray-200 object-cover" />
          ) : (
            <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center text-xs font-bold">
              {(userName || userEmail).charAt(0).toUpperCase()}
            </div>
          )}
          <div className="text-left hidden sm:block">
            <div className="text-sm font-semibold text-slate-900 truncate max-w-[140px]">{userName || "NexRide Member"}</div>
            <div className="text-xs text-slate-500 truncate max-w-[140px]">{userEmail}</div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="w-full max-w-4xl py-10 flex flex-col items-center z-10">
        <div className="text-center space-y-3 max-w-xl mx-auto mb-10">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
            How will you use NexRide?
          </h1>
          <p className="text-base text-slate-500 leading-relaxed">
            Choose whether you&apos;re booking rides or joining our driver fleet.
          </p>
        </div>

        {errorMessage && (
          <div className="w-full max-w-2xl mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
            <span>⚠️ {errorMessage}</span>
          </div>
        )}

        {/* Choice Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 w-full max-w-3xl">
          {/* TRAVELLER */}
          <div
            onClick={() => setSelectedRole("TRAVELLER")}
            className={`group relative rounded-2xl p-6 sm:p-7 cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
              selectedRole === "TRAVELLER"
                ? "bg-white border-emerald-400 shadow-xl shadow-emerald-500/5 ring-2 ring-emerald-400"
                : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
                selectedRole === "TRAVELLER"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-gray-100 text-slate-400 group-hover:text-slate-600"
              }`}>
                <Compass className="w-6 h-6" />
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
                selectedRole === "TRAVELLER"
                  ? "bg-emerald-500 text-white scale-105"
                  : "border-2 border-gray-300 text-transparent"
              }`}>
                <CheckCircle2 className="w-4 h-4 fill-current" />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 uppercase tracking-wider">
                <Zap className="w-3 h-3" /> Rider
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">I am a Traveller</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Book city cabs, autos, bike taxis, hourly rentals, and intercity rides.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-gray-100">
              {["6 vehicle classes", "24×7 Safety SOS", "Transparent pricing"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* DRIVER */}
          <div
            onClick={() => setSelectedRole("DRIVER")}
            className={`group relative rounded-2xl p-6 sm:p-7 cursor-pointer transition-all duration-300 border flex flex-col justify-between ${
              selectedRole === "DRIVER"
                ? "bg-white border-sky-400 shadow-xl shadow-sky-500/5 ring-2 ring-sky-400"
                : "bg-white border-gray-200 hover:border-gray-300 hover:shadow-md"
            }`}
          >
            <div className="flex items-center justify-between mb-5">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${
                selectedRole === "DRIVER"
                  ? "bg-sky-50 text-sky-600"
                  : "bg-gray-100 text-slate-400 group-hover:text-slate-600"
              }`}>
                <Bike className="w-6 h-6" />
              </div>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center transition ${
                selectedRole === "DRIVER"
                  ? "bg-sky-500 text-white scale-105"
                  : "border-2 border-gray-300 text-transparent"
              }`}>
                <CheckCircle2 className="w-4 h-4 fill-current" />
              </div>
            </div>

            <div className="space-y-2 mb-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-sky-600 uppercase tracking-wider">
                <TrendingUp className="w-3 h-3" /> Captain
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">I am a Driver</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                Drive your vehicle on your schedule. Daily payouts and fleet benefits.
              </p>
            </div>

            <div className="space-y-2.5 pt-4 border-t border-gray-100">
              {["Zero commission surge hours", "Transit insurance included", "Flexible hours"].map((item) => (
                <div key={item} className="flex items-center gap-2 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Confirm Button */}
        <div className="mt-10 w-full max-w-md flex flex-col items-center gap-3">
          <button
            onClick={handleConfirmRole}
            disabled={isLoading}
            className={`w-full py-4 px-6 rounded-xl font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2 shadow-lg cursor-pointer ${
              isLoading ? "opacity-75 cursor-not-allowed" : "hover:scale-[1.01] active:scale-[0.99]"
            } bg-black hover:bg-gray-900 text-white shadow-black/10`}
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Setting up...</span>
              </>
            ) : (
              <>
                <span>Continue as {selectedRole === "TRAVELLER" ? "Traveller" : "Driver"}</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
          <p className="text-xs text-slate-400 text-center">
            You can change this anytime from your account settings.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full max-w-5xl py-4 border-t border-gray-100 text-center text-xs text-slate-400 z-10">
        © {new Date().getFullYear()} NexRide Technologies. All rights reserved.
      </footer>
    </div>
  );
};
