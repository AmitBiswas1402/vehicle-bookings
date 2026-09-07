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
      title: "Daily City Rides",
      tagline: "Bike, Auto & Cab",
      description: "Point-to-point urban transport with metered pricing and doorstep pickup under 3 minutes.",
      startingPrice: "₹29",
      icon: Zap,
      badge: "Express",
      mode: "daily" as ServiceMode,
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      id: "rentals",
      title: "Hourly Rentals",
      tagline: "One car, multiple stops",
      description: "Book from 1–12 hours for meetings, shopping, appointments — unlimited stops included.",
      startingPrice: "₹299",
      icon: Clock,
      badge: "Flexible",
      mode: "rental" as ServiceMode,
      color: "bg-amber-50 text-amber-600",
    },
    {
      id: "outstation",
      title: "Intercity Outstation",
      tagline: "Highway travel",
      description: "Comfortable sedans and SUVs for weekend getaways and business trips with verified highway drivers.",
      startingPrice: "₹12/km",
      icon: Compass,
      badge: "Highway",
      mode: "outstation" as ServiceMode,
      color: "bg-blue-50 text-blue-600",
    },
    {
      id: "airport",
      title: "Airport Transfers",
      tagline: "Guaranteed pickups",
      description: "Pre-book with flight tracking, terminal pickup lanes, luggage handling, and zero surge pricing.",
      startingPrice: "Fixed Rate",
      icon: Plane,
      badge: "Flight Sync",
      mode: "daily" as ServiceMode,
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
              Our Services
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Choose the right ride for every occasion
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.mode)}
                className="group relative rounded-2xl bg-white border border-gray-200 p-6 flex flex-col justify-between transition-all duration-200 hover:shadow-lg hover:-translate-y-1 cursor-pointer"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${cat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                      {cat.badge}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-black transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">
                    {cat.tagline}
                  </p>
                  <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                    {cat.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-400 uppercase tracking-wider block font-medium">
                      From
                    </span>
                    <span className="text-lg font-bold text-slate-900">
                      {cat.startingPrice}
                    </span>
                  </div>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100 text-slate-400 group-hover:bg-black group-hover:text-white transition-all">
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
