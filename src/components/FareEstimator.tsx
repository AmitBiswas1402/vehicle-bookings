"use client";

import React, { useState } from "react";
import {
  IndianRupee,
  Sliders,
  Check,
  Bike,
  Zap,
  Car,
  CarFront,
  Truck,
  Leaf,
} from "lucide-react";

export const FareEstimator: React.FC = () => {
  const [selectedDistance, setSelectedDistance] = useState<number>(10);

  const vehicleTiers = [
    {
      name: "Rapido Bike Taxi",
      category: "bike",
      icon: Bike,
      base: 29,
      perKm: 9,
      perMin: 1.2,
      timeMins: Math.round(selectedDistance * 2.2),
      capacity: 1,
      tag: "Cheapest & Quickest",
      tagColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    },
    {
      name: "Auto Rickshaw",
      category: "auto",
      icon: Zap,
      base: 40,
      perKm: 14,
      perMin: 1.5,
      timeMins: Math.round(selectedDistance * 2.5),
      capacity: 3,
      tag: "Everyday Local",
      tagColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    },
    {
      name: "Economy Mini (Uber Go)",
      category: "mini",
      icon: Car,
      base: 80,
      perKm: 17,
      perMin: 2,
      timeMins: Math.round(selectedDistance * 2.8),
      capacity: 4,
      tag: "AC Value Cab",
      tagColor: "text-blue-400 bg-blue-400/10 border-blue-400/20",
    },
    {
      name: "Prime Sedan (Ola Prime)",
      category: "sedan",
      icon: CarFront,
      base: 110,
      perKm: 21,
      perMin: 2.5,
      timeMins: Math.round(selectedDistance * 2.7),
      capacity: 4,
      tag: "Executive Comfort",
      tagColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    },
    {
      name: "Nex Electric EV",
      category: "ev",
      icon: Leaf,
      base: 95,
      perKm: 19,
      perMin: 2.2,
      timeMins: Math.round(selectedDistance * 2.6),
      capacity: 4,
      tag: "Zero Emission",
      tagColor: "text-teal-400 bg-teal-400/10 border-teal-400/20",
    },
    {
      name: "Prime SUV / XL",
      category: "suv",
      icon: Truck,
      base: 160,
      perKm: 27,
      perMin: 3,
      timeMins: Math.round(selectedDistance * 3.0),
      capacity: 6,
      tag: "6-Seater Large",
      tagColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    },
  ];

  return (
    <section className="py-16 border-t border-slate-800 bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              100% Transparent Fares
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
              Instant Fare Calculator
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              No hidden fees, no surge surprises. Slide distance to compare prices side by side.
            </p>
          </div>

          {/* Interactive Distance Slider */}
          <div className="rounded-xl bg-slate-900 border border-slate-800 p-4 min-w-[280px]">
            <div className="flex justify-between items-center text-xs font-bold mb-2">
              <span className="text-slate-400">Trip Distance:</span>
              <span className="text-emerald-400 text-sm font-black">
                {selectedDistance} km
              </span>
            </div>
            <input
              type="range"
              min="2"
              max="50"
              step="1"
              value={selectedDistance}
              onChange={(e) => setSelectedDistance(parseInt(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-semibold">
              <span>2 km (Local)</span>
              <span>15 km (City)</span>
              <span>50 km (Airport/Outer)</span>
            </div>
          </div>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vehicleTiers.map((tier) => {
            const Icon = tier.icon;
            const fare = Math.round(
              tier.base + selectedDistance * tier.perKm + tier.timeMins * tier.perMin
            );

            return (
              <div
                key={tier.name}
                className="rounded-xl bg-slate-900/80 border border-slate-800 p-4 hover:border-slate-700 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-emerald-400">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{tier.name}</h4>
                      <span className="text-[11px] text-slate-400">
                        {tier.capacity} {tier.capacity === 1 ? "seat" : "seats"} • ~{tier.timeMins} mins
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-lg font-black text-white">₹{fare}</div>
                    <span className="text-[10px] text-slate-500">Estimated</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-[11px]">
                  <span className={`px-2 py-0.5 rounded-full border font-semibold ${tier.tagColor}`}>
                    {tier.tag}
                  </span>
                  <span className="text-slate-400">
                    ₹{tier.perKm}/km + ₹{tier.perMin}/min
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
