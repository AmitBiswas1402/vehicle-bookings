"use client";

import React from "react";
import {
  Car,
  Globe,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-zinc-800/80 bg-zinc-950 text-zinc-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Col 1: Brand & Bio */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-100">
                <Car className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-lg font-bold tracking-tight text-zinc-100">
                NEX<span className="text-emerald-400">RIDE</span>
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed mb-4">
              A unified urban mobility platform providing transparent point-to-point daily transit, hourly chauffeur rentals, and certified intercity highway routes with 100% upfront pricing.
            </p>
            <div className="flex items-center gap-3 text-zinc-400">
              <span className="flex items-center gap-1.5 text-[11px] text-zinc-300 font-medium bg-zinc-900 px-2.5 py-1 rounded-md border border-zinc-800">
                <Globe className="h-3.5 w-3.5 text-emerald-400" /> Operational across 8+ Metro Hubs in India
              </span>
            </div>
          </div>

          {/* Col 2: Ride Solutions */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">
              Mobility Services
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-zinc-200 transition">Bike Taxi Express</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">City Auto Rickshaw</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Comfort Mini Cabs</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Executive Prime Sedan</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Nex Electric EV</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Premier SUV / XL (6 Seats)</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Hourly Chauffeur Rentals</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Intercity Outstation</a></li>
            </ul>
          </div>

          {/* Col 3: Fleet & Partners */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">
              Fleet & Partners
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#" className="hover:text-zinc-200 transition">Attach Commercial Vehicle</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Become a Bike Captain</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Auto Rickshaw Attachment</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Enterprise Fleet Owners</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Partner Settlement Desk</a></li>
              <li><a href="#" className="hover:text-zinc-200 transition">Driver Safety Insurance</a></li>
            </ul>
          </div>

          {/* Col 4: Safety & Support */}
          <div>
            <h4 className="text-xs font-semibold text-zinc-200 uppercase tracking-wider mb-3">
              Trust & Safety
            </h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#safety" className="hover:text-zinc-200 transition">4-Digit Start OTP Policy</a></li>
              <li><a href="#safety" className="hover:text-zinc-200 transition">24x7 Safety Helpline</a></li>
              <li><a href="#safety" className="hover:text-zinc-200 transition">Background Verification</a></li>
              <li><a href="#safety" className="hover:text-zinc-200 transition">Zero Surge Charter</a></li>
              <li><a href="#safety" className="hover:text-zinc-200 transition">Lost & Found Incident Support</a></li>
              <li><a href="#safety" className="hover:text-zinc-200 transition">Corporate Transit Safety</a></li>
            </ul>
          </div>
        </div>

        {/* Operational Cities Row */}
        <div className="py-5 border-t border-b border-zinc-800/80 text-[11px] text-zinc-400">
          <strong className="text-zinc-300 mr-2 font-semibold">Active Operating Hubs:</strong>
          <span>Bengaluru • Delhi NCR • Mumbai • Hyderabad • Chennai • Kolkata • Pune • Ahmedabad • Jaipur • Chandigarh</span>
        </div>

        {/* Legal & Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} NexRide Technologies Inc. Enterprise Urban Mobility Systems. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-300 transition">Privacy Charter</a>
            <a href="#" className="hover:text-zinc-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-zinc-300 transition">Driver Compliance Guidelines</a>
            <a href="#" className="hover:text-zinc-300 transition">Security Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
