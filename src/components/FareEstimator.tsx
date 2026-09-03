"use client";

import React, { useState } from "react";
import {
  Bike,
  Zap,
  Car,
  CarFront,
  Truck,
  Leaf,
  Users,
  ShieldCheck,
} from "lucide-react";

export const FareEstimator: React.FC = () => {
  const [selectedDistance, setSelectedDistance] = useState<number>(12);

  const vehicleTiers = [
    {
      name: "Bike Taxi",
      category: "bike",
      icon: Bike,
      base: 29,
      perKm: 9,
      perMin: 1.2,
      timeMins: Math.round(selectedDistance * 2.2),
      capacity: 1,
      tag: "Fastest Solo",
      tagColor: "text-zinc-300 bg-zinc-800 border-zinc-700",
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
      tag: "City Metered",
      tagColor: "text-zinc-300 bg-zinc-800 border-zinc-700",
    },
    {
      name: "Comfort Mini",
      category: "mini",
      icon: Car,
      base: 80,
      perKm: 17,
      perMin: 2,
      timeMins: Math.round(selectedDistance * 2.8),
      capacity: 4,
      tag: "AC Hatchback",
      tagColor: "text-zinc-300 bg-zinc-800 border-zinc-700",
    },
    {
      name: "Executive Sedan",
      category: "sedan",
      icon: CarFront,
      base: 110,
      perKm: 21,
      perMin: 2.5,
      timeMins: Math.round(selectedDistance * 2.7),
      capacity: 4,
      tag: "Chauffeur Comfort",
      tagColor: "text-emerald-300 bg-emerald-950/50 border-emerald-800/60",
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
      tagColor: "text-emerald-300 bg-emerald-950/50 border-emerald-800/60",
    },
    {
      name: "Premier SUV / XL",
      category: "suv",
      icon: Truck,
      base: 160,
      perKm: 27,
      perMin: 3,
      timeMins: Math.round(selectedDistance * 3.0),
      capacity: 6,
      tag: "6-Seater Large",
      tagColor: "text-zinc-300 bg-zinc-800 border-zinc-700",
    },
  ];

  return (
    <section className="py-14 border-t border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Pricing Transparency
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
              Instant Fare Comparison Matrix
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Zero surge surprises. Slide distance to inspect real-time rate structures side by side.
            </p>
          </div>

          {/* Precision Distance Slider */}
          <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-4 min-w-[280px]">
            <div className="flex justify-between items-center text-xs font-medium mb-2">
              <span className="text-zinc-400">Estimated Distance:</span>
              <span className="text-zinc-100 text-sm font-bold">
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
              className="w-full accent-zinc-200 cursor-pointer h-1.5 bg-zinc-800 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 mt-1 font-medium">
              <span>2 km (Local)</span>
              <span>15 km (City)</span>
              <span>50 km (Airport)</span>
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
                className="rounded-xl bg-zinc-900/60 border border-zinc-800/80 p-4 hover:border-zinc-700 transition"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-zinc-100">{tier.name}</h4>
                      <span className="text-[11px] text-zinc-400 flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {tier.capacity} {tier.capacity === 1 ? "seat" : "seats"} • ~{tier.timeMins} mins
                      </span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-zinc-100">₹{fare}</div>
                    <span className="text-[10px] text-zinc-400">Est. Metered</span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-zinc-800/80 text-[11px]">
                  <span className={`px-2 py-0.5 rounded-md border font-medium ${tier.tagColor}`}>
                    {tier.tag}
                  </span>
                  <span className="text-zinc-400">
                    ₹{tier.perKm}/km + ₹{tier.perMin}/min
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center justify-between text-[11px] text-zinc-400 pt-3 border-t border-zinc-800/80">
          <span>Standard fares include driver allowance, fuel, and regulatory GST.</span>
          <span className="flex items-center gap-1 text-zinc-300">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            No hidden charges or unexpected peak surge multipliers
          </span>
        </div>
      </div>
    </section>
  );
};
