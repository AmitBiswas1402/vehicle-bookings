"use client";

import React, { useState } from "react";
import {
  Smartphone,
  Star,
} from "lucide-react";

export const AppDownloadBanner: React.FC = () => {
  const [smsPhone, setSmsPhone] = useState("");
  const [sent, setSent] = useState(false);

  const handleSendLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (smsPhone.length >= 10) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <section className="py-16 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-slate-900 p-8 sm:p-12 overflow-hidden shadow-xl">
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pointer-events-none" />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left content */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white/90 mb-4">
                <Smartphone className="h-4 w-4" />
                <span>NexRide App</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
                Book rides from your pocket
              </h2>
              <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-xl">
                Live tracking, instant OTP dispatch, ride history, and corporate billing — all in one app.
              </p>

              {/* SMS input */}
              <form onSubmit={handleSendLink} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md">
                <div className="flex-1 flex rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 overflow-hidden focus-within:ring-2 focus-within:ring-white/50">
                  <span className="px-3 py-2.5 text-sm font-semibold text-slate-300 border-r border-white/20 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={smsPhone}
                    onChange={(e) => setSmsPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter mobile number"
                    className="w-full bg-transparent px-3 py-2.5 text-sm font-medium text-white placeholder-slate-400 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-white hover:bg-gray-100 text-slate-900 text-sm font-bold transition whitespace-nowrap cursor-pointer"
                >
                  {sent ? "✓ Link Sent!" : "Send App Link"}
                </button>
              </form>

              {/* App store buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#download-apple"
                  className="flex items-center gap-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 hover:bg-white/20 transition"
                >
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                      Download on
                    </div>
                    <div className="text-sm font-bold text-white">App Store</div>
                  </div>
                </a>

                <a
                  href="#download-google"
                  className="flex items-center gap-2.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2.5 hover:bg-white/20 transition"
                >
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400 font-semibold">
                      Get it on
                    </div>
                    <div className="text-sm font-bold text-white">Google Play</div>
                  </div>
                </a>

                <div className="flex items-center gap-1.5 text-sm text-slate-300 sm:ml-4">
                  <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                  <span><strong className="text-white">4.8</strong> (1.4M+ reviews)</span>
                </div>
              </div>
            </div>

            {/* Right — QR Code */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6 text-center max-w-[240px]">
                <div className="relative mx-auto h-36 w-36 rounded-xl bg-white p-2.5 shadow-lg flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    <rect x="5" y="5" width="26" height="26" fill="#0f172a" rx="2" />
                    <rect x="9" y="9" width="18" height="18" fill="#ffffff" rx="1" />
                    <rect x="13" y="13" width="10" height="10" fill="#0f172a" />
                    <rect x="69" y="5" width="26" height="26" fill="#0f172a" rx="2" />
                    <rect x="73" y="9" width="18" height="18" fill="#ffffff" rx="1" />
                    <rect x="77" y="13" width="10" height="10" fill="#0f172a" />
                    <rect x="5" y="69" width="26" height="26" fill="#0f172a" rx="2" />
                    <rect x="9" y="73" width="18" height="18" fill="#ffffff" rx="1" />
                    <rect x="13" y="77" width="10" height="10" fill="#0f172a" />
                    <rect x="36" y="8" width="6" height="6" fill="#0f172a" />
                    <rect x="46" y="8" width="8" height="6" fill="#0f172a" />
                    <rect x="58" y="8" width="6" height="6" fill="#0f172a" />
                    <rect x="36" y="20" width="12" height="6" fill="#0f172a" />
                    <rect x="52" y="20" width="8" height="6" fill="#0f172a" />
                    <rect x="8" y="38" width="8" height="8" fill="#0f172a" />
                    <rect x="22" y="38" width="14" height="8" fill="#0f172a" />
                    <rect x="42" y="38" width="14" height="8" fill="#0f172a" />
                    <rect x="62" y="38" width="8" height="8" fill="#0f172a" />
                    <rect x="76" y="38" width="16" height="8" fill="#0f172a" />
                    <rect x="36" y="52" width="8" height="8" fill="#0f172a" />
                    <rect x="50" y="52" width="14" height="8" fill="#0f172a" />
                    <rect x="72" y="52" width="16" height="8" fill="#0f172a" />
                    <rect x="36" y="68" width="12" height="8" fill="#0f172a" />
                    <rect x="54" y="68" width="8" height="18" fill="#0f172a" />
                    <rect x="68" y="72" width="16" height="8" fill="#0f172a" />
                    <rect x="88" y="72" width="6" height="16" fill="#0f172a" />
                    <rect x="36" y="82" width="14" height="8" fill="#0f172a" />
                  </svg>
                </div>
                <div className="mt-3 text-sm font-bold text-white">Scan to Install</div>
                <div className="text-xs text-slate-400 mt-0.5">iOS 15+ & Android 9+</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
