"use client";

import React, { useState } from "react";
import {
  Bike,
  Car,
  TrendingUp,
  Clock,
  ShieldCheck,
  IndianRupee,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";

export const DriverPartnerBanner: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<"bike" | "auto" | "cab">("bike");
  const [dailyHours, setDailyHours] = useState<number>(6);
  const [registered, setRegistered] = useState(false);
  const [phone, setPhone] = useState("");

  const estimatedMonthlyIncome =
    vehicleType === "bike"
      ? Math.round(dailyHours * 160 * 26)
      : vehicleType === "auto"
      ? Math.round(dailyHours * 220 * 26)
      : Math.round(dailyHours * 320 * 26);

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) {
      setRegistered(true);
    }
  };

  return (
    <section className="py-16 border-t border-slate-800 bg-gradient-to-b from-[#090e17] to-[#0d1522]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Offer & Earnings Calculator */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-400/10 border border-amber-400/30 px-3.5 py-1 text-xs font-bold text-amber-300 mb-3">
              <TrendingUp className="h-3.5 w-3.5 text-amber-400" />
              <span>Drive with NexRide • Zero Commission for 30 Days</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Turn your wheels into daily earnings.{" "}
              <span className="text-amber-400">Be your own boss.</span>
            </h2>

            <p className="mt-3 text-sm text-slate-300 leading-relaxed max-w-xl">
              Join over 250,000+ happy Captains & Driver Partners. Earn with two-wheelers, auto rickshaws, or commercial cabs with guaranteed daily payouts and accidental coverage.
            </p>

            {/* Interactive Earnings Widget */}
            <div className="mt-6 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 max-w-lg">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                Calculate Your Potential Earnings:
              </div>

              {/* Vehicle Type buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={() => setVehicleType("bike")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
                    vehicleType === "bike"
                      ? "bg-amber-400 text-slate-950 border-amber-400"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Bike className="h-4 w-4" />
                  Bike Captain
                </button>
                <button
                  onClick={() => setVehicleType("auto")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
                    vehicleType === "auto"
                      ? "bg-amber-400 text-slate-950 border-amber-400"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  Auto Driver
                </button>
                <button
                  onClick={() => setVehicleType("cab")}
                  className={`py-2 px-3 rounded-lg text-xs font-bold border flex items-center justify-center gap-1.5 transition ${
                    vehicleType === "cab"
                      ? "bg-amber-400 text-slate-950 border-amber-400"
                      : "bg-slate-950 border-slate-800 text-slate-400 hover:text-white"
                  }`}
                >
                  <Car className="h-4 w-4" />
                  Cab Partner
                </button>
              </div>

              {/* Daily Hours Slider */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-semibold text-slate-300 mb-1">
                  <span>Hours you want to drive daily:</span>
                  <span className="text-amber-400 font-bold">{dailyHours} hours/day</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(parseInt(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
              </div>

              {/* Monthly Income Result */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <div>
                  <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                    Estimated Monthly Take-Home
                  </span>
                  <div className="text-2xl font-black text-amber-400">
                    ₹{estimatedMonthlyIncome.toLocaleString("en-IN")}
                    <span className="text-xs text-slate-400 font-normal"> / month</span>
                  </div>
                </div>
                <span className="text-[11px] text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                  Daily Direct Payouts
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Instant Registration Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl">
              <h3 className="text-xl font-bold text-white mb-1">
                Start Earning in 24 Hours
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Simple paperless onboarding. Upload Driving License & RC to begin.
              </p>

              {registered ? (
                <div className="py-8 text-center space-y-3">
                  <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-white">
                    Application Initiated!
                  </h4>
                  <p className="text-xs text-slate-300 max-w-xs mx-auto">
                    We sent an SMS onboarding link to <strong>+91 {phone}</strong>. Our partner agent will call you within 2 hours.
                  </p>
                  <button
                    onClick={() => setRegistered(false)}
                    className="text-xs text-amber-400 font-bold underline"
                  >
                    Submit another number
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Your Mobile Number
                    </label>
                    <div className="flex rounded-xl bg-slate-950 border border-slate-800 overflow-hidden focus-within:border-amber-400">
                      <span className="px-3 py-2.5 bg-slate-800/80 text-xs font-bold text-slate-300 border-r border-slate-800 flex items-center">
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        maxLength={10}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
                        placeholder="Enter 10-digit mobile"
                        className="w-full bg-transparent px-3 py-2.5 text-xs font-semibold text-white placeholder-slate-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                      Operating City
                    </label>
                    <select className="w-full rounded-xl bg-slate-950 border border-slate-800 px-3 py-2.5 text-xs font-medium text-white focus:outline-none focus:border-amber-400">
                      <option>Bengaluru</option>
                      <option>Delhi NCR</option>
                      <option>Mumbai</option>
                      <option>Hyderabad</option>
                      <option>Pune</option>
                    </select>
                  </div>

                  <div className="space-y-2 pt-2 text-[11px] text-slate-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Zero registration fees</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>₹5,00,000 accidental insurance covered</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Daily incentive bonuses for peak hours</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-extrabold text-xs uppercase tracking-wider transition duration-200 shadow-lg shadow-amber-400/20 flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Register as Captain</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
