"use client";

import React, { useState } from "react";
import {
  Smartphone,
  QrCode,
  Download,
  Star,
  Check,
  Shield,
  Zap,
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
    <section className="py-16 border-t border-slate-800 bg-[#090e17] relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-gradient-to-r from-slate-900 via-[#0f172a] to-slate-900 border border-slate-800 p-8 sm:p-12 overflow-hidden shadow-2xl">
          {/* Ambient light ring */}
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side: Heading, SMS input, Badges */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 text-xs font-bold text-emerald-400 mb-3">
                <Smartphone className="h-3.5 w-3.5" />
                <span>Download the Mobile App</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                There is more to love in the app
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl">
                Real-time Captain tracking on live radar, instant SOS alert triggers, offline booking fallback, and exclusive app-only 50% discount vouchers.
              </p>

              {/* SMS download link input */}
              <form onSubmit={handleSendLink} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md">
                <div className="flex-1 flex rounded-xl bg-slate-950 border border-slate-700 overflow-hidden focus-within:border-emerald-400">
                  <span className="px-3 py-2.5 text-xs font-bold text-slate-400 bg-slate-800/80 border-r border-slate-800 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={smsPhone}
                    onChange={(e) => setSmsPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter mobile for app link"
                    className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition shadow-md shadow-emerald-500/20 whitespace-nowrap cursor-pointer"
                >
                  {sent ? "Link Sent!" : "Get Link"}
                </button>
              </form>

              {/* App store buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#download-apple"
                  className="flex items-center gap-2.5 rounded-xl bg-slate-950 border border-slate-700 px-4 py-2 hover:border-slate-500 transition"
                >
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">
                      Download on the
                    </div>
                    <div className="text-xs font-extrabold text-white">
                      Apple App Store
                    </div>
                  </div>
                </a>

                <a
                  href="#download-google"
                  className="flex items-center gap-2.5 rounded-xl bg-slate-950 border border-slate-700 px-4 py-2 hover:border-slate-500 transition"
                >
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-slate-400">
                      Get it on
                    </div>
                    <div className="text-xs font-extrabold text-white">
                      Google Play
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 sm:ml-4">
                  <div className="flex text-amber-400">
                    <Star className="h-3.5 w-3.5 fill-amber-400" />
                  </div>
                  <span><strong>4.8</strong> Rating (1.4M+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Right side: QR Code Scanner Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="rounded-2xl bg-slate-950 border border-slate-800 p-6 text-center shadow-xl max-w-[240px]">
                {/* Visual QR Code mock with styling */}
                <div className="relative mx-auto h-40 w-40 rounded-xl bg-white p-3 shadow-inner flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    {/* Corners */}
                    <rect x="5" y="5" width="25" height="25" fill="#0b0f17" rx="3" />
                    <rect x="9" y="9" width="17" height="17" fill="#ffffff" rx="2" />
                    <rect x="13" y="13" width="9" height="9" fill="#0b0f17" />

                    <rect x="70" y="5" width="25" height="25" fill="#0b0f17" rx="3" />
                    <rect x="74" y="9" width="17" height="17" fill="#ffffff" rx="2" />
                    <rect x="78" y="13" width="9" height="9" fill="#0b0f17" />

                    <rect x="5" y="70" width="25" height="25" fill="#0b0f17" rx="3" />
                    <rect x="9" y="74" width="17" height="17" fill="#ffffff" rx="2" />
                    <rect x="13" y="78" width="9" height="9" fill="#0b0f17" />

                    {/* QR grid details */}
                    <rect x="35" y="10" width="8" height="8" fill="#0b0f17" />
                    <rect x="48" y="10" width="8" height="8" fill="#0b0f17" />
                    <rect x="35" y="24" width="12" height="6" fill="#0b0f17" />
                    <rect x="52" y="24" width="8" height="8" fill="#0b0f17" />

                    <rect x="10" y="38" width="8" height="12" fill="#0b0f17" />
                    <rect x="24" y="38" width="14" height="8" fill="#0b0f17" />
                    <rect x="45" y="38" width="10" height="10" fill="#10b981" />
                    <rect x="62" y="38" width="8" height="14" fill="#0b0f17" />
                    <rect x="76" y="38" width="14" height="6" fill="#0b0f17" />

                    <rect x="36" y="54" width="8" height="8" fill="#0b0f17" />
                    <rect x="50" y="54" width="18" height="8" fill="#0b0f17" />
                    <rect x="74" y="54" width="14" height="8" fill="#0b0f17" />

                    <rect x="36" y="70" width="14" height="10" fill="#0b0f17" />
                    <rect x="56" y="70" width="8" height="18" fill="#0b0f17" />
                    <rect x="70" y="74" width="18" height="8" fill="#0b0f17" />
                    <rect x="80" y="86" width="10" height="8" fill="#0b0f17" />
                  </svg>
                </div>

                <div className="mt-3 text-xs font-bold text-white">
                  Scan to Install App
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5">
                  Point phone camera to install instantly
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
