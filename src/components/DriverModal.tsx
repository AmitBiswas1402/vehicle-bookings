"use client";

import React, { useState } from "react";
import {
  X,
  Bike,
  Car,
  TrendingUp,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

interface DriverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DriverModal: React.FC<DriverModalProps> = ({ isOpen, onClose }) => {
  const [vehicle, setVehicle] = useState<"bike" | "auto" | "cab">("bike");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-md rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-400 text-slate-950 font-bold">
              <Bike className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                Partner with NexRide
              </h3>
              <p className="text-xs text-amber-400 font-semibold">
                0% Commission for 30 Days
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-white">Application Received!</h4>
            <p className="text-xs text-slate-300">
              We will contact you on <strong>+91 {phone}</strong> with the partner registration kit.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="text-xs text-slate-400">
              Choose the vehicle you want to drive and earn with:
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setVehicle("bike")}
                className={`py-2 px-2 rounded-lg text-xs font-bold border flex flex-col items-center gap-1 transition ${
                  vehicle === "bike"
                    ? "bg-amber-400 text-slate-950 border-amber-400"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <Bike className="h-4 w-4" />
                <span>Bike Taxi</span>
              </button>
              <button
                type="button"
                onClick={() => setVehicle("auto")}
                className={`py-2 px-2 rounded-lg text-xs font-bold border flex flex-col items-center gap-1 transition ${
                  vehicle === "auto"
                    ? "bg-amber-400 text-slate-950 border-amber-400"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <Car className="h-4 w-4" />
                <span>Auto</span>
              </button>
              <button
                type="button"
                onClick={() => setVehicle("cab")}
                className={`py-2 px-2 rounded-lg text-xs font-bold border flex flex-col items-center gap-1 transition ${
                  vehicle === "cab"
                    ? "bg-amber-400 text-slate-950 border-amber-400"
                    : "bg-slate-950 border-slate-800 text-slate-400"
                }`}
              >
                <Car className="h-4 w-4" />
                <span>Cab / Taxi</span>
              </button>
            </div>

            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Your Mobile Number
              </label>
              <div className="flex rounded-xl bg-slate-950 border border-slate-800 overflow-hidden focus-within:border-amber-400">
                <span className="px-3 py-2 text-xs font-bold text-slate-400 bg-slate-800/80 border-r border-slate-800 flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10-digit number"
                  className="w-full bg-transparent px-3 py-2 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-xl bg-slate-950 border border-slate-800/80 p-3 space-y-1.5 text-[11px] text-slate-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                <span>Zero registration fee & instant verification</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
                <span>Earn up to ₹38,000/month with daily bank deposits</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition duration-200 shadow-lg shadow-amber-400/20 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Submit Application</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
