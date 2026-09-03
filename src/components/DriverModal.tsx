"use client";

import React, { useState } from "react";
import {
  X,
  Bike,
  Car,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface DriverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DriverModal: React.FC<DriverModalProps> = ({ isOpen, onClose }) => {
  const [vehicle, setVehicle] = useState<"bike" | "auto" | "cab">("cab");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl text-zinc-100">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100">
              <Car className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                Partner Fleet Registration
              </h3>
              <p className="text-xs text-zinc-400">
                Direct bank settlements & transparent commissions
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="flex h-11 w-11 mx-auto items-center justify-center rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <h4 className="text-sm font-semibold text-zinc-100">Application Received</h4>
            <p className="text-xs text-zinc-400">
              Our onboarding manager will reach out on <strong>+91 {phone}</strong> with documentation requirements.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className="mt-4 w-full py-2.5 rounded-xl bg-zinc-100 text-zinc-950 hover:bg-white text-xs font-semibold"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="text-xs text-zinc-400 font-medium">
              Select vehicle tier you intend to attach:
            </div>

            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setVehicle("bike")}
                className={`py-2.5 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1.5 transition ${
                  vehicle === "bike"
                    ? "bg-zinc-800 border-zinc-600 text-zinc-100 shadow-sm"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Bike className="h-4 w-4" />
                <span>Bike Taxi</span>
              </button>
              <button
                type="button"
                onClick={() => setVehicle("auto")}
                className={`py-2.5 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1.5 transition ${
                  vehicle === "auto"
                    ? "bg-zinc-800 border-zinc-600 text-zinc-100 shadow-sm"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Zap className="h-4 w-4" />
                <span>Auto</span>
              </button>
              <button
                type="button"
                onClick={() => setVehicle("cab")}
                className={`py-2.5 px-2 rounded-xl text-xs font-medium border flex flex-col items-center gap-1.5 transition ${
                  vehicle === "cab"
                    ? "bg-zinc-800 border-zinc-600 text-zinc-100 shadow-sm"
                    : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Car className="h-4 w-4" />
                <span>Cab / Sedan</span>
              </button>
            </div>

            <div>
              <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                Mobile Number
              </label>
              <div className="flex rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden focus-within:border-zinc-600">
                <span className="px-3 py-2 text-xs font-semibold text-zinc-400 bg-zinc-900 border-r border-zinc-800 flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10-digit number"
                  className="w-full bg-transparent px-3 py-2 text-xs font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-xl bg-zinc-950 border border-zinc-800 p-3 space-y-1.5 text-[11px] text-zinc-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Zero registration fee & digital vehicle verification</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                <span>Accidental transit insurance policy included</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition duration-200 shadow-sm flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Submit Partner Application</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
