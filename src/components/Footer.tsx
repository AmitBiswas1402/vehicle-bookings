"use client";

import React from "react";
import {
  Car,
  Bike,
  Shield,
  MapPin,
  Heart,
  Globe,
  ArrowRight,
} from "lucide-react";

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-[#060a10] text-slate-400 text-xs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12">
          {/* Col 1: Brand & Bio */}
          <div className="col-span-2">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-bold">
                <Car className="h-5 w-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                NEX<span className="text-emerald-400">RIDE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed mb-4">
              A unified urban mobility platform bringing together the speed of Rapido Bike Taxis, the local reach of Auto Rickshaws, and the executive comfort of Uber & Ola Cabs with 100% price transparency.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-semibold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">
                <Globe className="h-3.5 w-3.5" /> 8+ Metro Cities Across India
              </span>
            </div>
          </div>

          {/* Col 2: Ride Solutions */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Ride Options
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-emerald-400 transition">Rapido Bike Taxi</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Everyday Auto Rickshaw</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Economy Mini (Uber Go)</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Prime Sedan (Ola Prime)</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Nex Electric EV</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Prime SUV / XL (6 Seater)</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Hourly Car Rentals</a></li>
              <li><a href="#" className="hover:text-emerald-400 transition">Intercity Outstation</a></li>
            </ul>
          </div>

          {/* Col 3: Partner with Us */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Driver Partners
            </h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-amber-400 transition">Become a Bike Captain</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Attach Auto Rickshaw</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Drive Commercial Cab</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Fleet Owner Program</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">0% Commission Offer</a></li>
              <li><a href="#" className="hover:text-amber-400 transition">Partner Insurance Desk</a></li>
            </ul>
          </div>

          {/* Col 4: Safety & Support */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              Safety & Trust
            </h4>
            <ul className="space-y-2">
              <li><a href="#safety" className="hover:text-emerald-400 transition">4-Digit Start OTP</a></li>
              <li><a href="#safety" className="hover:text-emerald-400 transition">24x7 Safety Helpline</a></li>
              <li><a href="#safety" className="hover:text-emerald-400 transition">Driver Background Check</a></li>
              <li><a href="#safety" className="hover:text-emerald-400 transition">Zero Surge Guarantee</a></li>
              <li><a href="#safety" className="hover:text-emerald-400 transition">Lost & Found Support</a></li>
              <li><a href="#safety" className="hover:text-emerald-400 transition">Corporate Mobility</a></li>
            </ul>
          </div>
        </div>

        {/* Popular City Links bar */}
        <div className="py-6 border-t border-b border-slate-800/80 text-[11px] text-slate-500">
          <strong className="text-slate-400 mr-2">Operating In:</strong>
          <span>Bengaluru • Delhi NCR • Mumbai • Hyderabad • Chennai • Kolkata • Pune • Ahmedabad • Jaipur • Chandigarh</span>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} NexRide Technologies Pvt. Ltd. Inspired by Ola, Uber & Rapido.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-slate-300 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-300 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-300 transition">Driver Guidelines</a>
            <a href="#" className="hover:text-slate-300 transition">Security Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
