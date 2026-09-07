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
    { name: "Bike Taxi", category: "bike", icon: Bike, base: 29, perKm: 9, perMin: 1.2, timeMins: Math.round(selectedDistance * 2.2), capacity: 1, tag: "Fastest", tagColor: "bg-emerald-50 text-emerald-700" },
    { name: "Auto Rickshaw", category: "auto", icon: Zap, base: 40, perKm: 14, perMin: 1.5, timeMins: Math.round(selectedDistance * 2.8), capacity: 3, tag: "Budget", tagColor: "bg-amber-50 text-amber-700" },
    { name: "Comfort Mini", category: "mini", icon: Car, base: 80, perKm: 17, perMin: 2, timeMins: Math.round(selectedDistance * 3), capacity: 4, tag: "Popular", tagColor: "bg-blue-50 text-blue-700" },
    { name: "Executive Sedan", category: "sedan", icon: CarFront, base: 110, perKm: 21, perMin: 2.5, timeMins: Math.round(selectedDistance * 3.2), capacity: 4, tag: "Premium", tagColor: "bg-purple-50 text-purple-700" },
    { name: "Nex Electric EV", category: "ev", icon: Leaf, base: 95, perKm: 19, perMin: 2.2, timeMins: Math.round(selectedDistance * 3.1), capacity: 4, tag: "Eco", tagColor: "bg-teal-50 text-teal-700" },
    { name: "Premier SUV", category: "suv", icon: Truck, base: 160, perKm: 27, perMin: 3, timeMins: Math.round(selectedDistance * 3.5), capacity: 6, tag: "Spacious", tagColor: "bg-rose-50 text-rose-700" },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Transparent fare estimates
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            See upfront pricing across all vehicle categories before you book
          </p>
        </div>

        {/* Distance Slider */}
        <div className="max-w-md mx-auto mb-10 bg-gray-50 rounded-2xl p-6 border border-gray-200">
          <div className="flex justify-between text-sm font-medium text-slate-700 mb-3">
            <span>Trip distance</span>
            <span className="text-slate-900 font-bold text-base">{selectedDistance} km</span>
          </div>
          <input
            type="range"
            min="2"
            max="50"
            step="1"
            value={selectedDistance}
            onChange={(e) => setSelectedDistance(parseInt(e.target.value))}
            className="w-full cursor-pointer"
          />
          <div className="flex justify-between text-xs text-slate-400 mt-1">
            <span>2 km</span>
            <span>50 km</span>
          </div>
        </div>

        {/* Fare Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {vehicleTiers.map((tier) => {
            const Icon = tier.icon;
            const totalFare = Math.round(tier.base + tier.perKm * selectedDistance + tier.perMin * tier.timeMins);
            return (
              <div
                key={tier.category}
                className="rounded-2xl bg-white border border-gray-200 p-4 text-center hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-xl ${tier.tagColor} mb-3`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">{tier.name}</h4>
                <span className={`inline-block mt-1 rounded-full px-2 py-0.5 text-[10px] font-semibold ${tier.tagColor}`}>
                  {tier.tag}
                </span>
                <div className="mt-3 text-2xl font-extrabold text-slate-900">
                  ₹{totalFare}
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  ~{tier.timeMins} min • <Users className="h-3 w-3 inline" /> {tier.capacity}
                </div>
              </div>
            );
          })}
        </div>

        {/* Trust badges */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-500">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>No hidden charges</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>GST inclusive</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-500" />
            <span>Toll charges extra</span>
          </div>
        </div>
      </div>
    </section>
  );
};
