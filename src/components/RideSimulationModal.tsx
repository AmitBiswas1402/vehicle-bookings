"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  Phone,
  Shield,
  Share2,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Car,
  Bike,
  Star,
  Clock,
  KeyRound,
  RotateCcw,
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
  const [phase, setPhase] = useState<"searching" | "confirmed" | "started">(
    "searching"
  );
  const [etaSeconds, setEtaSeconds] = useState(180);
  const [copiedOtp, setCopiedOtp] = useState(false);
  const [sosActive, setSosActive] = useState(false);
  const [shareToast, setShareToast] = useState(false);

  useEffect(() => {
    if (!booking) return;

    // Simulate finding a driver within 2.5 seconds
    setPhase("searching");
    const timer = setTimeout(() => {
      setPhase("confirmed");
    }, 2500);

    return () => clearTimeout(timer);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100 overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <Navigation className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                {phase === "searching" ? "Finding Nearby Captain..." : "Captain On The Way"}
              </h3>
              <p className="text-xs text-slate-400">
                Booking ID: #{booking.id.slice(0, 8).toUpperCase()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-800 hover:text-white transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Phase 1: Radar Search State */}
        {phase === "searching" && (
          <div className="py-10 text-center flex flex-col items-center">
            {/* Animated Radar Pulse graphic */}
            <div className="relative flex h-36 w-36 items-center justify-center">
              <div className="absolute h-full w-full rounded-full border border-emerald-500/30 animate-ping opacity-60"></div>
              <div className="absolute h-28 w-28 rounded-full border border-emerald-500/40"></div>
              <div className="absolute h-20 w-20 rounded-full border border-emerald-500/60"></div>
              {/* Radar sweep */}
              <div className="absolute h-36 w-36 rounded-full border border-emerald-500/50 bg-gradient-to-tr from-emerald-500/20 to-transparent animate-radar pointer-events-none"></div>
              <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-slate-950 font-bold shadow-lg shadow-emerald-500/40">
                {booking.vehicle.category === "bike" ? (
                  <Bike className="h-7 w-7" />
                ) : (
                  <Car className="h-7 w-7" />
                )}
              </div>
            </div>

            <h4 className="mt-6 text-lg font-bold text-white">
              Broadcasting request to top-rated Captains...
            </h4>
            <p className="mt-1 text-xs text-slate-400 max-w-xs">
              Matching you with the nearest {booking.vehicle.name} in {booking.pickup}
            </p>

            {/* Quick Trip details summary */}
            <div className="mt-6 w-full rounded-xl bg-slate-950/80 p-3.5 border border-slate-800/80 text-left text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Pickup:</span>
                <span className="text-white font-medium truncate max-w-[240px]">
                  {booking.pickup}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Destination:</span>
                <span className="text-white font-medium truncate max-w-[240px]">
                  {booking.drop}
                </span>
              </div>
              <div className="flex justify-between pt-2 border-t border-slate-800">
                <span className="text-slate-400">Estimated Fare:</span>
                <span className="text-emerald-400 font-bold text-sm">
                  ₹{booking.totalFare}
                </span>
              </div>
            </div>

            <button
              onClick={onCancelBooking}
              className="mt-6 text-xs text-rose-400 hover:text-rose-300 font-semibold underline underline-offset-4"
            >
              Cancel Search
            </button>
          </div>
        )}

        {/* Phase 2: Driver Assigned & ETA Countdown */}
        {phase === "confirmed" && booking.driver && (
          <div className="mt-4 space-y-5">
            {/* OTP Banner (Ola & Rapido Signature Safety Feature) */}
            <div className="flex items-center justify-between rounded-xl bg-emerald-500/15 border border-emerald-500/30 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500 text-slate-950 font-bold">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                    Start Ride OTP (Share with Captain)
                  </div>
                  <div className="text-2xl font-black tracking-widest text-white">
                    {booking.driver.otp}
                  </div>
                </div>
              </div>
              <button
                onClick={copyOtp}
                className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-sm"
              >
                {copiedOtp ? "Copied!" : "Copy OTP"}
              </button>
            </div>

            {/* Captain & Vehicle Details */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-800 border-2 border-emerald-500 text-slate-200 font-bold text-lg">
                    {booking.driver.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-white text-base">
                        {booking.driver.name}
                      </h4>
                      <span className="flex items-center gap-1 rounded bg-amber-400/20 px-1.5 py-0.5 text-[11px] font-bold text-amber-300">
                        <Star className="h-3 w-3 fill-amber-400" />
                        {booking.driver.rating}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {booking.driver.totalTrips}+ completed rides • Top Rated Partner
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-bold text-emerald-400">
                    {booking.driver.vehiclePlate}
                  </div>
                  <div className="text-xs text-slate-300">
                    {booking.driver.vehicleColor} {booking.driver.vehicleModel}
                  </div>
                </div>
              </div>

              {/* Arrival ETA bar */}
              <div className="flex items-center justify-between rounded-lg bg-slate-900 px-3 py-2 text-xs">
                <div className="flex items-center gap-2 text-slate-300">
                  <Clock className="h-4 w-4 text-emerald-400" />
                  <span>Captain is arriving in:</span>
                </div>
                <span className="font-mono font-bold text-white text-sm">
                  {etaFormatted} mins
                </span>
              </div>
            </div>

            {/* Action Tools: Call, Share, SOS */}
            <div className="grid grid-cols-3 gap-2">
              <a
                href={`tel:${booking.driver.phone}`}
                className="flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-800/80 hover:bg-slate-800 p-2.5 text-slate-200 text-xs font-medium border border-slate-700/80 transition"
              >
                <Phone className="h-4 w-4 text-emerald-400" />
                <span>Call Driver</span>
              </a>

              <button
                onClick={handleShareTrip}
                className="flex flex-col items-center justify-center gap-1 rounded-xl bg-slate-800/80 hover:bg-slate-800 p-2.5 text-slate-200 text-xs font-medium border border-slate-700/80 transition relative"
              >
                <Share2 className="h-4 w-4 text-blue-400" />
                <span>Share Ride</span>
                {shareToast && (
                  <span className="absolute -top-7 rounded bg-blue-500 text-white text-[10px] px-2 py-0.5">
                    Link Copied!
                  </span>
                )}
              </button>

              <button
                onClick={() => setSosActive(!sosActive)}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl p-2.5 text-xs font-bold border transition ${
                  sosActive
                    ? "bg-rose-500/20 border-rose-500 text-rose-300"
                    : "bg-slate-800/80 hover:bg-slate-800 border-slate-700/80 text-slate-200"
                }`}
              >
                <Shield className="h-4 w-4 text-rose-400" />
                <span>{sosActive ? "SOS Armed" : "Emergency SOS"}</span>
              </button>
            </div>

            {sosActive && (
              <div className="rounded-lg bg-rose-500/15 border border-rose-500/30 p-2.5 text-xs text-rose-200 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-rose-400 shrink-0" />
                <span>
                  Emergency Response 24x7 Team notified. Live GPS coordinates are being streamed.
                </span>
              </div>
            )}

            {/* Fare and Payment Info */}
            <div className="flex items-center justify-between border-t border-slate-800 pt-3 text-xs">
              <span className="text-slate-400">
                Payment: <strong className="text-white capitalize">{booking.paymentMethod}</strong>
              </span>
              <div className="flex items-center gap-3">
                <span className="text-base font-bold text-emerald-400">
                  ₹{booking.totalFare}
                </span>
                <button
                  onClick={onCancelBooking}
                  className="text-xs text-slate-400 hover:text-rose-400 transition"
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
