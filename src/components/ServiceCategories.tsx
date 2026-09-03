"use client";

import React from "react";
import {
  Clock,
  Compass,
  Plane,
  ArrowUpRight,
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
      tagline: "Bike Taxi, Auto & Compact Cabs",
      description: "Quickest point-to-point urban transport with metered pricing and typical doorstep arrival under 3 minutes.",
      startingPrice: "₹29",
      icon: Zap,
      badge: "Express Transit",
      capacity: "1 - 4 seats",
      mode: "daily" as ServiceMode,
    },
    {
      id: "rentals",
      title: "Hourly Chauffeur Rentals",
      tagline: "One dedicated car for multi-stop days",
      description: "Book packages from 1 to 12 hours. Make unlimited stops for executive client meetings, shopping rounds, or appointments.",
      startingPrice: "₹299",
      icon: Clock,
      badge: "Flexible Stops",
      capacity: "Sedans & SUVs",
      mode: "rental" as ServiceMode,
    },
    {
      id: "outstation",
      title: "Intercity Outstation",
      tagline: "Chauffeur-driven highway travel",
      description: "Comfortable sedans and SUVs for weekend getaways, hill stations, and business trips with verified highway captains.",
      startingPrice: "₹12/km",
      icon: Compass,
      badge: "Highway Certified",
      capacity: "Sedan / SUV",
      mode: "outstation" as ServiceMode,
    },
    {
      id: "airport",
      title: "Airport Transfers",
      tagline: "Guaranteed pickups & luggage capacity",
      description: "Pre-book with live flight tracking. Direct terminal pickup lanes, assisted luggage handling, and zero surge pricing.",
      startingPrice: "Fixed Rates",
      icon: Plane,
      badge: "Flight Tracking",
      capacity: "Ample Luggage",
      mode: "daily" as ServiceMode,
    },
  ];

  return (
    <section className="py-14 border-t border-zinc-800/80 bg-zinc-950/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              Mobility Architecture
            </span>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-zinc-100">
              Tailored services for every transit requirement
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-md">
            From agile single-passenger bike taxis to spacious executive SUVs, choose the exact tier suited for your schedule and route.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.mode)}
                className="group relative rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 flex flex-col justify-between transition-all duration-200 hover:border-zinc-700 hover:bg-zinc-900/90 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-100 shadow-sm">
                      <Icon className="h-5 w-5 text-emerald-400" />
                    </div>
                    <span className="rounded-md bg-zinc-950 border border-zinc-800 px-2 py-0.5 text-[10px] font-medium text-zinc-400">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-zinc-100 group-hover:text-white transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs font-medium text-zinc-400 mt-1">
                    {cat.tagline}
                  </p>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-zinc-800/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider block font-medium">
                      Rates From
                    </span>
                    <span className="text-sm font-bold text-zinc-100">
                      {cat.startingPrice}
                    </span>
                  </div>
                  <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 text-zinc-400 group-hover:bg-zinc-100 group-hover:text-zinc-950 transition-colors">
                    <ArrowUpRight className="h-3.5 w-3.5" />
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
