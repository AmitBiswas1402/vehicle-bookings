"use client";

import React from "react";
import {
  Car,
  Clock,
  Compass,
  Plane,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { ServiceMode } from "@/types/ride";

interface ServiceCategoriesProps {
  onSelectCategory: (mode: ServiceMode) => void;
}

export const ServiceCategories: React.FC<ServiceCategoriesProps> = ({
  onSelectCategory,
}) => {
  const categories = [
    {
      id: "daily",
      title: "Daily City Commute",
      tagline: "Bike Taxi, Auto & Pocket-friendly Cabs",
      description: "Beat traffic on a Rapido Bike or ride comfortably in an AC cab. Quickest doorstep pickup in under 3 minutes.",
      startingPrice: "₹29",
      icon: Zap,
      accent: "from-emerald-500/20 to-emerald-500/5",
      border: "border-emerald-500/30",
      textColor: "text-emerald-400",
      badge: "Fastest Pickup",
      mode: "daily" as ServiceMode,
    },
    {
      id: "rentals",
      title: "Hourly Car Rentals",
      tagline: "Keep one car for multiple stops",
      description: "Book by the hour from 1 hr to 12 hrs. Unlimited stops for business meetings, shopping sprees, or doctor visits.",
      startingPrice: "₹299",
      icon: Clock,
      accent: "from-amber-500/20 to-amber-500/5",
      border: "border-amber-500/30",
      textColor: "text-amber-400",
      badge: "Multiple Stops",
      mode: "rental" as ServiceMode,
    },
    {
      id: "outstation",
      title: "Intercity Outstation",
      tagline: "One-way and round-trip highway getaways",
      description: "Chauffeur-driven Sedans and SUVs for weekend trips, hill station retreats, and pilgrimage tours with verified highway drivers.",
      startingPrice: "₹12/km",
      icon: Compass,
      accent: "from-cyan-500/20 to-cyan-500/5",
      border: "border-cyan-500/30",
      textColor: "text-cyan-400",
      badge: "Top Chauffeurs",
      mode: "outstation" as ServiceMode,
    },
    {
      id: "airport",
      title: "Airport Transfers",
      tagline: "Guaranteed pickups & ample luggage space",
      description: "Pre-book with flight number tracking. Zero surge on pre-bookings, dedicated airport taxi lanes, and courteous assistance.",
      startingPrice: "Flat Rates",
      icon: Plane,
      accent: "from-purple-500/20 to-purple-500/5",
      border: "border-purple-500/30",
      textColor: "text-purple-400",
      badge: "Flight Tracking",
      mode: "daily" as ServiceMode,
    },
  ];

  return (
    <section className="py-12 border-t border-slate-800/80 bg-slate-950/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Versatile Mobility Services
            </span>
            <h2 className="mt-1 text-2xl sm:text-3xl font-extrabold text-white">
              Every ride for every need
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md">
            Whether it is an agile bike taxi to zip through peak rush or a spacious 6-seater SUV for an outstation holiday, we have you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.mode)}
                className={`group relative rounded-2xl bg-gradient-to-b ${cat.accent} border ${cat.border} p-6 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-white shadow-md">
                      <Icon className={`h-5 w-5 ${cat.textColor}`} />
                    </div>
                    <span className="rounded-full bg-slate-900/90 border border-slate-800 px-2.5 py-0.5 text-[10px] font-bold text-slate-300">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-semibold text-slate-300 mt-1">
                    {cat.tagline}
                  </p>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-wider block font-semibold">
                      Starting From
                    </span>
                    <span className={`text-base font-black ${cat.textColor}`}>
                      {cat.startingPrice}
                    </span>
                  </div>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 group-hover:bg-white group-hover:text-slate-950 text-slate-400 transition-colors">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
