"use client";

import React, { useState } from "react";
import {
  Bike,
  Car,
  TrendingUp,
  ChevronRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

export const DriverPartnerBanner: React.FC = () => {
  const [vehicleType, setVehicleType] = useState<"bike" | "auto" | "cab">("cab");
  const [dailyHours, setDailyHours] = useState<number>(7);
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
    <section className="py-16 border-t border-zinc-800/80 bg-zinc-950/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Earnings Calculator */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-md bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300 mb-3">
              <TrendingUp className="h-3.5 w-3.5 text-emerald-400" />
              <span>Partner Fleet Program • Flexible Operating Hours</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
              Drive with NexRide. Build sustainable earnings on your schedule.
            </h2>

            <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
              Connect your commercial vehicle, auto rickshaw, or two-wheeler to India&apos;s most efficient urban transit network with transparent commission structures and same-day payouts.
            </p>

            {/* Earnings Widget */}
            <div className="mt-6 rounded-2xl bg-zinc-900/80 border border-zinc-800 p-5 max-w-lg">
              <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-3">
                Estimated Earning Potential
              </div>

              {/* Vehicle Type buttons */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={() => setVehicleType("bike")}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition ${
                    vehicleType === "bike"
                      ? "bg-zinc-800 text-zinc-100 border-zinc-600 shadow-sm"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Bike className="h-4 w-4" />
                  Bike Partner
                </button>
                <button
                  onClick={() => setVehicleType("auto")}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition ${
                    vehicleType === "auto"
                      ? "bg-zinc-800 text-zinc-100 border-zinc-600 shadow-sm"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Zap className="h-4 w-4" />
                  Auto Driver
                </button>
                <button
                  onClick={() => setVehicleType("cab")}
                  className={`py-2 px-3 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition ${
                    vehicleType === "cab"
                      ? "bg-zinc-800 text-zinc-100 border-zinc-600 shadow-sm"
                      : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Car className="h-4 w-4" />
                  Cab Partner
                </button>
              </div>

              {/* Daily Hours Slider */}
              <div className="mb-4">
                <div className="flex justify-between text-xs font-medium text-zinc-300 mb-1.5">
                  <span>Planned daily operating hours:</span>
                  <span className="text-zinc-100 font-semibold">{dailyHours} hours/day</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(parseInt(e.target.value))}
                  className="w-full accent-zinc-200 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
                />
              </div>

              {/* Monthly Income Result */}
              <div className="flex items-center justify-between pt-3 border-t border-zinc-800">
                <div>
                  <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">
                    Estimated Monthly Gross Take-Home
                  </span>
                  <div className="text-xl sm:text-2xl font-bold text-zinc-100">
                    ₹{estimatedMonthlyIncome.toLocaleString("en-IN")}
                    <span className="text-xs text-zinc-400 font-normal"> / month</span>
                  </div>
                </div>
                <span className="text-[11px] text-zinc-300 font-medium bg-zinc-800 px-3 py-1 rounded-md border border-zinc-700">
                  Daily Direct Settlements
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Registration Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-xl">
              <h3 className="text-lg font-bold text-zinc-100 mb-1">
                Fast-Track Partner Onboarding
              </h3>
              <p className="text-xs text-zinc-400 mb-5">
                Paperless digital setup. Submit your mobile number to receive the registration kit.
              </p>

              {registered ? (
                <div className="py-8 text-center space-y-3">
                  <div className="flex h-11 w-11 mx-auto items-center justify-center rounded-full bg-emerald-950 border border-emerald-700 text-emerald-400">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <h4 className="text-sm font-semibold text-zinc-100">
                    Application Received
                  </h4>
                  <p className="text-xs text-zinc-400 max-w-xs mx-auto">
                    An SMS onboarding link has been sent to <strong>+91 {phone}</strong>. Our fleet relationship team will reach out within 2 hours.
                  </p>
                  <button
                    onClick={() => setRegistered(false)}
                    className="text-xs text-zinc-300 hover:text-white underline"
                  >
                    Submit another number
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-3.5">
                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                      Registered Mobile Number
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
                        placeholder="Enter 10-digit phone"
                        className="w-full bg-transparent px-3 py-2 text-xs font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-1">
                      Operating City
                    </label>
                    <select className="w-full rounded-xl bg-zinc-950 border border-zinc-800 px-3 py-2 text-xs font-medium text-zinc-100 focus:outline-none focus:border-zinc-600">
                      <option>Bengaluru</option>
                      <option>Delhi NCR</option>
                      <option>Mumbai</option>
                      <option>Hyderabad</option>
                      <option>Pune</option>
                    </select>
                  </div>

                  <div className="space-y-2 pt-2 text-[11px] text-zinc-400">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Zero partner registration or onboarding fee</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Accidental transit insurance policy included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                      <span>Regular peak performance incentive bonuses</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-semibold text-xs transition duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer mt-4"
                  >
                    <span>Register as Fleet Partner</span>
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
