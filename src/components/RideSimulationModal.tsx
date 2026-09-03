"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Shield,
  Share2,
  AlertTriangle,
  Navigation,
  Star,
  Clock,
  KeyRound,
} from "lucide-react";
import { ActiveBooking } from "@/types/ride";

interface RideSimulationModalProps {
  booking: ActiveBooking | null;
  onClose: () => void;
  onCancelBooking: () => void;
}

export const RideSimulationModal: React.FC<RideSimulationModalProps> = ({
  booking,
  onClose,
  onCancelBooking,
}) => {
  const [phase, setPhase] = useState<"searching" | "confirmed">("searching");
  const [etaSeconds, setEtaSeconds] = useState(180);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const [searchStep, setSearchStep] = useState(1);

  useEffect(() => {
    if (!booking) return;

    const stepTimer = setTimeout(() => {
      setSearchStep(2);
    }, 1200);

    const matchTimer = setTimeout(() => {
      setSearchStep(3);
      setPhase("confirmed");
    }, 2800);

    return () => {
      clearTimeout(stepTimer);
      clearTimeout(matchTimer);
    };
  }, [booking]);

  // ETA countdown
  useEffect(() => {
    if (phase !== "confirmed") return;
    const interval = setInterval(() => {
      setEtaSeconds((prev) => (prev > 10 ? prev - 1 : 10));
    }, 1000);
    return () => clearInterval(interval);
  }, [phase]);

  if (!booking) return null;

  const minutes = Math.floor(etaSeconds / 60);
  const seconds = etaSeconds % 60;
  const etaFormatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const copyOtp = () => {
    if (booking.driver?.otp) {
      navigator.clipboard?.writeText(booking.driver.otp);
      setCopiedOtp(true);
      setTimeout(() => setCopiedOtp(false), 2000);
    }
  };

  const handleShareTrip = () => {
    setShareToast(true);
    setTimeout(() => setShareToast(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl text-zinc-100 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
              <Navigation className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                {phase === "searching" ? "Dispatching Nearby Vehicle..." : "Captain Assigned & En Route"}
              </h3>
              <p className="text-[11px] text-zinc-400">
                Reference ID: #{booking.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Phase 1: Clean Dispatch Progress State */}
        {phase === "searching" && (
          <div className="py-8 text-center flex flex-col items-center">
            {/* Subtle Telemetry Beacon */}
            <div className="relative flex h-24 w-24 items-center justify-center mb-5">
              <div className="absolute h-24 w-24 rounded-full border border-zinc-700/60 animate-ping opacity-25"></div>
              <div className="absolute h-18 w-18 rounded-full border border-zinc-700"></div>
              <div className="h-10 w-10 rounded-full bg-zinc-800 border border-zinc-600 flex items-center justify-center shadow-md">
                <Navigation className="h-5 w-5 text-emerald-400" />
              </div>
            </div>

            <h4 className="text-base font-semibold text-zinc-100">
              Matching with nearest {booking.vehicle.name}
            </h4>
            <p className="mt-1 text-xs text-zinc-400 max-w-xs">
              Contacting verified drivers within 2.5 km of your pickup point...
            </p>

            {/* Step progress pills */}
            <div className="w-full max-w-sm mt-5 space-y-2 text-left text-xs">
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-zinc-300">Route & telemetry analyzed</span>
              </div>
              <div className="flex items-center gap-2.5 p-2 rounded-lg bg-zinc-950 border border-zinc-800">
                <div className={`h-2 w-2 rounded-full ${searchStep >= 2 ? "bg-emerald-500" : "bg-zinc-600 animate-pulse"}`}></div>
                <span className={searchStep >= 2 ? "text-zinc-300" : "text-zinc-500"}>
                  Broadcasting request to active drivers
                </span>
              </div>
            </div>

            {/* Trip details summary */}
            <div className="mt-5 w-full rounded-xl bg-zinc-950 p-3.5 border border-zinc-800 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-zinc-400">Pickup:</span>
                <span className="text-zinc-200 font-medium truncate max-w-[240px]">
                  {booking.pickup}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-400">Destination:</span>
                <span className="text-zinc-200 font-medium truncate max-w-[240px]">
                  {booking.drop}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-zinc-800">
                <span className="text-zinc-400">Metered Fare:</span>
                <span className="text-zinc-100 font-bold">
                  ₹{booking.totalFare}
                </span>
              </div>
            </div>

            <button
              onClick={onCancelBooking}
              className="mt-5 text-xs text-zinc-400 hover:text-rose-400 transition font-medium"
            >
              Cancel Dispatch Request
            </button>
          </div>
        )}

        {/* Phase 2: Driver Assigned & Live ETA */}
        {phase === "confirmed" && booking.driver && (
          <div className="mt-4 space-y-4">
            {/* Start OTP Card */}
            <div className="flex items-center justify-between rounded-xl bg-zinc-950 border border-zinc-800 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
                  <KeyRound className="h-4 w-4 text-emerald-400" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400">
                    Start Ride OTP (Share upon boarding)
                  </div>
                  <div className="text-xl font-bold tracking-widest text-zinc-100">
                    {booking.driver.otp}
                  </div>
                </div>
              </div>
              <button
                onClick={copyOtp}
                className="px-3 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-200 text-xs font-semibold transition"
              >
                {copiedOtp ? "Copied" : "Copy OTP"}
              </button>
            </div>

            {/* Captain & Vehicle Card */}
            <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700 text-zinc-100 font-bold text-sm">
                    {booking.driver.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold text-zinc-100 text-sm">
                        {booking.driver.name}
                      </h4>
                      <span className="flex items-center gap-1 rounded bg-zinc-800 border border-zinc-700 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-200">
                        <Star className="h-2.5 w-2.5 fill-zinc-200" />
                        {booking.driver.rating}
                      </span>
                    </div>
                    <p className="text-xs text-zinc-400">
                      {booking.driver.totalTrips}+ trips completed • Certified Partner
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-zinc-100 bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800 inline-block">
                    {booking.driver.vehiclePlate}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-0.5">
                    {booking.driver.vehicleColor} {booking.driver.vehicleModel}
                  </div>
                </div>
              </div>

              {/* Arrival Countdown Bar */}
              <div className="flex items-center justify-between rounded-lg bg-zinc-900 px-3 py-2 text-xs border border-zinc-800/80">
                <div className="flex items-center gap-2 text-zinc-300">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Captain is arriving at pickup in:</span>
                </div>
                <span className="font-mono font-bold text-zinc-100 text-xs">
                  ~{etaFormatted} mins
                </span>
              </div>
            </div>

            {/* Action Tools: Call, Share, SOS */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`tel:${booking.driver.phone}`}
                className="flex flex-col items-center justify-center gap-1 rounded-xl bg-zinc-950 hover:bg-zinc-800 p-2.5 text-zinc-200 text-xs font-medium border border-zinc-800 transition"
              >
                <Phone className="h-3.5 w-3.5 text-zinc-300" />
                <span>Call Captain</span>
              </a>

              <button
                onClick={handleShareTrip}
                className="flex flex-col items-center justify-center gap-1 rounded-xl bg-zinc-950 hover:bg-zinc-800 p-2.5 text-zinc-200 text-xs font-medium border border-zinc-800 transition relative"
              >
                <Share2 className="h-3.5 w-3.5 text-zinc-300" />
                <span>Share Ride</span>
                {shareToast && (
                  <span className="absolute -top-7 rounded bg-zinc-800 text-zinc-100 text-[10px] px-2 py-0.5 border border-zinc-700">
                    Link Copied!
                  </span>
                )}
              </button>

              <button
                onClick={() => setSosActive(!sosActive)}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2.5 text-xs font-medium border transition ${
                  sosActive
                    ? "bg-rose-950/60 border-rose-800 text-rose-200"
                    : "bg-zinc-950 hover:bg-zinc-800 border-zinc-800 text-zinc-200"
                }`}
              >
                <Shield className="h-3.5 w-3.5 text-rose-400" />
                <span>{sosActive ? "SOS Armed" : "Emergency SOS"}</span>
              </button>
            </div>

            {sosActive && (
              <div className="rounded-lg bg-rose-950/50 border border-rose-800/80 p-2.5 text-xs text-rose-200 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                <span>
                  Safety Command Center alerted. Live GPS coordinates are streaming.
                </span>
              </div>
            )}

            {/* Fare and Payment Info */}
            <div className="flex items-center justify-between border-t border-zinc-800 pt-3 text-xs">
              <span className="text-zinc-400">
                Payment: <strong className="text-zinc-200 capitalize">{booking.paymentMethod}</strong>
              </span>
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-zinc-100">
                  ₹{booking.totalFare}
                </span>
                <button
                  onClick={onCancelBooking}
                  className="text-xs text-zinc-400 hover:text-rose-400 transition"
                >
                  Cancel Ride
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
