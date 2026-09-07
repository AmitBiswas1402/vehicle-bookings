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
    const stepTimer = setTimeout(() => setSearchStep(2), 1200);
    const matchTimer = setTimeout(() => { setSearchStep(3); setPhase("confirmed"); }, 2800);
    return () => { clearTimeout(stepTimer); clearTimeout(matchTimer); };
  }, [booking]);

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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-slide-up">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-gray-200 p-6 shadow-2xl text-slate-900 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <Navigation className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                {phase === "searching" ? "Finding your ride..." : "Captain assigned"}
              </h3>
              <p className="text-xs text-slate-500">ID: #{booking.id.slice(0, 8).toUpperCase()}</p>
            </div>
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-gray-100 hover:text-slate-700 transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Searching Phase */}
        {phase === "searching" && (
          <div className="py-8 text-center flex flex-col items-center">
            <div className="relative flex h-20 w-20 items-center justify-center mb-5">
              <div className="absolute h-20 w-20 rounded-full border-2 border-emerald-200 animate-ping opacity-25"></div>
              <div className="h-12 w-12 rounded-full bg-emerald-50 border-2 border-emerald-200 flex items-center justify-center">
                <Navigation className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <h4 className="text-base font-bold text-slate-900">Matching with nearest {booking.vehicle.name}</h4>
            <p className="mt-1 text-sm text-slate-500 max-w-xs">Contacting verified drivers near your pickup...</p>

            <div className="w-full max-w-sm mt-5 space-y-2 text-left text-sm">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <div className="h-2 w-2 rounded-full bg-emerald-500"></div>
                <span className="text-slate-700">Route analyzed</span>
              </div>
              <div className="flex items-center gap-2.5 p-2.5 rounded-xl bg-gray-50 border border-gray-200">
                <div className={`h-2 w-2 rounded-full ${searchStep >= 2 ? "bg-emerald-500" : "bg-gray-300 animate-pulse"}`}></div>
                <span className={searchStep >= 2 ? "text-slate-700" : "text-slate-400"}>Broadcasting to drivers</span>
              </div>
            </div>

            <div className="mt-5 w-full rounded-xl bg-gray-50 p-3.5 border border-gray-200 text-left text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Pickup:</span>
                <span className="text-slate-900 font-medium truncate max-w-[240px]">{booking.pickup}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Dropoff:</span>
                <span className="text-slate-900 font-medium truncate max-w-[240px]">{booking.drop}</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-gray-200">
                <span className="text-slate-500">Fare:</span>
                <span className="text-slate-900 font-bold">₹{booking.totalFare}</span>
              </div>
            </div>

            <button onClick={onCancelBooking} className="mt-5 text-sm text-slate-400 hover:text-red-500 transition font-medium">
              Cancel Request
            </button>
          </div>
        )}

        {/* Confirmed Phase */}
        {phase === "confirmed" && booking.driver && (
          <div className="mt-4 space-y-4">
            {/* OTP Card */}
            <div className="flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-100 p-3.5">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
                  <KeyRound className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[10px] uppercase font-semibold tracking-wider text-emerald-600">Start OTP</div>
                  <div className="text-xl font-bold tracking-widest text-slate-900">{booking.driver.otp}</div>
                </div>
              </div>
              <button onClick={copyOtp} className="px-3 py-1.5 rounded-lg bg-white hover:bg-gray-50 border border-gray-200 text-slate-700 text-sm font-semibold transition">
                {copiedOtp ? "Copied" : "Copy"}
              </button>
            </div>

            {/* Driver Card */}
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 space-y-3">
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white font-bold text-sm">
                    {booking.driver.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-sm">{booking.driver.name}</h4>
                      <span className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-[11px] font-semibold text-amber-700">
                        <Star className="h-2.5 w-2.5 fill-amber-500" /> {booking.driver.rating}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">{booking.driver.totalTrips}+ trips • Certified</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded border border-gray-200 inline-block">
                    {booking.driver.vehiclePlate}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">{booking.driver.vehicleColor} {booking.driver.vehicleModel}</div>
                </div>
              </div>

              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 text-sm border border-gray-200">
                <div className="flex items-center gap-2 text-slate-600">
                  <Clock className="h-3.5 w-3.5 text-emerald-500" />
                  <span>Arriving in</span>
                </div>
                <span className="font-mono font-bold text-slate-900">~{etaFormatted} min</span>
              </div>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-3 gap-2">
              <a href={`tel:${booking.driver.phone}`} className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-50 hover:bg-gray-100 p-3 text-slate-700 text-sm font-medium border border-gray-200 transition">
                <Phone className="h-4 w-4 text-slate-500" />
                <span>Call</span>
              </a>
              <button onClick={handleShareTrip} className="flex flex-col items-center justify-center gap-1 rounded-xl bg-gray-50 hover:bg-gray-100 p-3 text-slate-700 text-sm font-medium border border-gray-200 transition relative">
                <Share2 className="h-4 w-4 text-slate-500" />
                <span>Share</span>
                {shareToast && <span className="absolute -top-7 rounded-full bg-slate-900 text-white text-[10px] px-2 py-0.5">Copied!</span>}
              </button>
              <button
                onClick={() => setSosActive(!sosActive)}
                className={`flex flex-col items-center justify-center gap-1 rounded-xl p-3 text-sm font-medium border transition ${
                  sosActive ? "bg-red-50 border-red-200 text-red-700" : "bg-gray-50 hover:bg-gray-100 border-gray-200 text-slate-700"
                }`}
              >
                <Shield className="h-4 w-4 text-red-500" />
                <span>{sosActive ? "Armed" : "SOS"}</span>
              </button>
            </div>

            {sosActive && (
              <div className="rounded-xl bg-red-50 border border-red-200 p-3 text-sm text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />
                <span>Safety Command alerted. Live GPS streaming.</span>
              </div>
            )}

            <div className="flex items-center justify-between border-t border-gray-200 pt-3 text-sm">
              <span className="text-slate-500">Payment: <strong className="text-slate-700 capitalize">{booking.paymentMethod}</strong></span>
              <div className="flex items-center gap-3">
                <span className="text-lg font-bold text-slate-900">₹{booking.totalFare}</span>
                <button onClick={onCancelBooking} className="text-sm text-slate-400 hover:text-red-500 transition">Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
