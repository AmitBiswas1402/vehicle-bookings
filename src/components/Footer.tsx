"use client";

import React from "react";
import {
  Globe,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          {/* Col 1: Brand */}
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white">
                <span className="text-slate-900 text-sm font-bold">N</span>
              </div>
              <span className="text-lg font-extrabold tracking-tight text-white">
                Nex<span className="text-emerald-400">Ride</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed mb-4">
              Transparent point-to-point city transit, hourly rentals, and certified highway routes with upfront pricing.
            </p>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="flex items-center gap-1.5 text-xs font-medium bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
                <Globe className="h-3.5 w-3.5 text-emerald-400" /> 8+ cities in India
              </span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {["Bike Taxi", "Auto Rickshaw", "Mini Cabs", "Executive Sedan", "Electric EV", "Premier SUV", "Hourly Rentals", "Outstation"].map((item) => (
                <li key={item}><a href="#" className="text-slate-400 hover:text-white transition">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 3: Partners */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Partners
            </h4>
            <ul className="space-y-2.5">
              {["Attach Vehicle", "Become a Captain", "Auto Driver Program", "Fleet Owners", "Settlement Desk", "Driver Insurance"].map((item) => (
                <li key={item}><a href="#" className="text-slate-400 hover:text-white transition">{item}</a></li>
              ))}
            </ul>
          </div>

          {/* Col 4: Safety */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">
              Safety
            </h4>
            <ul className="space-y-2.5">
              {["Start OTP", "24×7 Helpline", "Background Checks", "Lost & Found", "Corporate Safety", "Security Policy"].map((item) => (
                <li key={item}><a href="#safety" className="text-slate-400 hover:text-white transition">{item}</a></li>
              ))}
            </ul>
          </div>
        </div>

        {/* Cities */}
        <div className="py-5 border-t border-b border-slate-800 text-sm text-slate-400">
          <strong className="text-slate-300 mr-2 font-semibold">Cities:</strong>
          <span>Bengaluru • Delhi NCR • Mumbai • Hyderabad • Chennai • Kolkata • Pune • Ahmedabad • Jaipur • Chandigarh</span>
        </div>

        {/* Legal */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <div>
            © {new Date().getFullYear()} NexRide Technologies. All rights reserved.
          </div>
          <div className="flex items-center gap-5">
            <a href="#" className="hover:text-slate-300 transition">Privacy</a>
            <a href="#" className="hover:text-slate-300 transition">Terms</a>
            <a href="#" className="hover:text-slate-300 transition">Compliance</a>
            <a href="#" className="hover:text-slate-300 transition">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
