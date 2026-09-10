"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    if (phone.length >= 10) setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-slide-up">
      <div className="relative w-full max-w-md rounded-2xl bg-white border border-gray-200 p-6 shadow-2xl text-slate-900">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <Car className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Drive with NexRide</h3>
              <p className="text-xs text-slate-500">Daily payouts & transparent commissions</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-gray-100 transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {submitted ? (
          <div className="py-8 text-center space-y-3">
            <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
              <CheckCircle2 className="h-6 w-6" />
            </div>
            <h4 className="text-base font-bold text-slate-900">Application Received</h4>
            <p className="text-sm text-slate-500">
              We&apos;ll contact you on <strong>+91 {phone}</strong> with next steps.
            </p>
            <button
              onClick={() => { setSubmitted(false); onClose(); }}
              className="mt-4 w-full py-3 rounded-xl bg-black text-white hover:bg-gray-900 text-sm font-semibold transition"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div className="text-sm text-slate-600 font-medium">
              Select your vehicle type:
            </div>

            <div className="grid grid-cols-3 gap-2">
              {[
                { key: "bike" as const, icon: Bike, label: "Bike" },
                { key: "auto" as const, icon: Zap, label: "Auto" },
                { key: "cab" as const, icon: Car, label: "Cab" },
              ].map((v) => (
                <button
                  key={v.key}
                  type="button"
                  onClick={() => setVehicle(v.key)}
                  className={`py-3 px-2 rounded-xl text-sm font-medium border flex flex-col items-center gap-1.5 transition ${
                    vehicle === v.key
                      ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                      : "bg-gray-50 border-gray-200 text-slate-600 hover:border-gray-300"
                  }`}
                >
                  <v.icon className="h-4 w-4" />
                  <span>{v.label}</span>
                </button>
              ))}
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                Mobile Number
              </label>
              <div className="flex rounded-xl bg-gray-50 border border-gray-200 overflow-hidden focus-within:ring-2 focus-within:ring-slate-900 focus-within:border-transparent">
                <span className="px-3 py-2.5 text-sm font-semibold text-slate-500 bg-gray-100 border-r border-gray-200 flex items-center">
                  +91
                </span>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                  placeholder="Enter 10-digit number"
                  className="w-full bg-transparent px-3 py-2.5 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
                />
              </div>
            </div>

            <div className="rounded-xl bg-gray-50 border border-gray-200 p-3.5 space-y-2 text-sm text-slate-600">
              {["Zero registration fee", "Insurance included"].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-black hover:bg-gray-900 text-white font-semibold text-sm transition shadow-lg shadow-black/10 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Submit Application</span>
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="pt-2 text-center border-t border-gray-100">
              <Link
                href="/driver"
                onClick={onClose}
                className="text-xs font-semibold text-slate-700 hover:text-slate-900 underline"
              >
                Already an onboarded partner? Open Driver Dashboard →
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
