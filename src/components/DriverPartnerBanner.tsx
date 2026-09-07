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
    if (phone.length >= 10) setRegistered(true);
  };

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left — Earnings Calculator */}
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-sm font-semibold text-amber-700 mb-4">
              <TrendingUp className="h-4 w-4" />
              <span>Partner Program</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Drive with NexRide
            </h2>
            <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xl">
              Attach your vehicle and earn on your schedule with transparent commissions and daily payouts.
            </p>

            {/* Earnings Widget */}
            <div className="mt-6 rounded-2xl bg-gray-50 border border-gray-200 p-6 max-w-lg">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Earning Estimate
              </div>

              <div className="grid grid-cols-3 gap-2 mb-5">
                {[
                  { key: "bike" as const, icon: Bike, label: "Bike" },
                  { key: "auto" as const, icon: Zap, label: "Auto" },
                  { key: "cab" as const, icon: Car, label: "Cab" },
                ].map((v) => (
                  <button
                    key={v.key}
                    onClick={() => setVehicleType(v.key)}
                    className={`py-2.5 px-3 rounded-xl text-sm font-medium border flex items-center justify-center gap-2 transition ${
                      vehicleType === v.key
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white border-gray-200 text-slate-600 hover:border-gray-300"
                    }`}
                  >
                    <v.icon className="h-4 w-4" />
                    {v.label}
                  </button>
                ))}
              </div>

              <div className="mb-5">
                <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                  <span>Daily hours</span>
                  <span className="font-bold text-slate-900">{dailyHours} hrs/day</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="12"
                  step="1"
                  value={dailyHours}
                  onChange={(e) => setDailyHours(parseInt(e.target.value))}
                  className="w-full cursor-pointer"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <div>
                  <span className="text-xs text-slate-400 uppercase tracking-wider block font-medium">
                    Monthly Earnings
                  </span>
                  <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                    ₹{estimatedMonthlyIncome.toLocaleString("en-IN")}
                    <span className="text-sm text-slate-400 font-normal ml-1">/ month</span>
                  </div>
                </div>
                <span className="text-xs text-slate-600 font-semibold bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full">
                  Daily Payouts
                </span>
              </div>
            </div>
          </div>

          {/* Right — Registration Card */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl bg-white border border-gray-200 p-6 shadow-lg">
              <h3 className="text-lg font-bold text-slate-900 mb-1">
                Start earning today
              </h3>
              <p className="text-sm text-slate-500 mb-5">
                Paperless digital setup — get started in minutes
              </p>

              {registered ? (
                <div className="py-8 text-center space-y-3">
                  <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">Application Received</h4>
                  <p className="text-sm text-slate-500">
                    We&apos;ll reach out on <strong>+91 {phone}</strong> within 2 hours.
                  </p>
                  <button onClick={() => setRegistered(false)} className="text-sm text-slate-500 hover:text-slate-700 underline">
                    Submit another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleRegister} className="space-y-4">
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

                  <div>
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1.5">
                      City
                    </label>
                    <select className="w-full rounded-xl bg-gray-50 border border-gray-200 px-3 py-2.5 text-sm font-medium text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent appearance-none">
                      <option>Bengaluru</option>
                      <option>Delhi NCR</option>
                      <option>Mumbai</option>
                      <option>Hyderabad</option>
                      <option>Pune</option>
                    </select>
                  </div>

                  <div className="space-y-2 pt-2 text-sm text-slate-500">
                    {["Zero registration fee", "Insurance included", "Incentive bonuses"].map((item) => (
                      <div key={item} className="flex items-center gap-2">
                        <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-black hover:bg-gray-900 text-white font-semibold text-sm transition shadow-lg shadow-black/10 flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    <span>Register as Partner</span>
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
