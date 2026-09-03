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
    <section className="py-16 border-t border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl bg-zinc-900/80 border border-zinc-800 p-8 sm:p-12 overflow-hidden shadow-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left side: Heading, SMS input, Badges */}
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-md bg-zinc-800 border border-zinc-700 px-3 py-1 text-xs font-medium text-zinc-300 mb-3">
                <Smartphone className="h-3.5 w-3.5 text-emerald-400" />
                <span>NexRide Mobile Companion</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-zinc-100 tracking-tight">
                Complete transit control from your pocket
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xl">
                Real-time Captain tracking on live satellite maps, instant 4-digit OTP dispatch, offline ride history, and direct corporate billing vouchers.
              </p>

              {/* SMS download link input */}
              <form onSubmit={handleSendLink} className="mt-6 flex flex-col sm:flex-row gap-2 max-w-md">
                <div className="flex-1 flex rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden focus-within:border-zinc-600">
                  <span className="px-3 py-2 text-xs font-semibold text-zinc-400 bg-zinc-900 border-r border-zinc-800 flex items-center">
                    +91
                  </span>
                  <input
                    type="tel"
                    maxLength={10}
                    value={smsPhone}
                    onChange={(e) => setSmsPhone(e.target.value.replace(/\D/g, ""))}
                    placeholder="Enter mobile for install link"
                    className="w-full bg-transparent px-3 py-2 text-xs font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition shadow-sm whitespace-nowrap cursor-pointer"
                >
                  {sent ? "Link Sent!" : "Send App Link"}
                </button>
              </form>

              {/* App store buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#download-apple"
                  className="flex items-center gap-2.5 rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2 hover:border-zinc-700 transition"
                >
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold">
                      Download on
                    </div>
                    <div className="text-xs font-bold text-zinc-100">
                      Apple App Store
                    </div>
                  </div>
                </a>

                <a
                  href="#download-google"
                  className="flex items-center gap-2.5 rounded-xl bg-zinc-950 border border-zinc-800 px-4 py-2 hover:border-zinc-700 transition"
                >
                  <div className="text-left">
                    <div className="text-[9px] uppercase tracking-wider text-zinc-400 font-semibold">
                      Get it on
                    </div>
                    <div className="text-xs font-bold text-zinc-100">
                      Google Play Store
                    </div>
                  </div>
                </a>

                <div className="flex items-center gap-1.5 text-xs text-zinc-400 sm:ml-4">
                  <Star className="h-3.5 w-3.5 fill-zinc-200 text-zinc-200" />
                  <span><strong>4.8</strong> Rating (1.4M+ Reviews)</span>
                </div>
              </div>
            </div>

            {/* Right side: QR Code Scanner Card */}
            <div className="lg:col-span-4 flex justify-center">
              <div className="rounded-2xl bg-zinc-950 border border-zinc-800 p-6 text-center shadow-xl max-w-[240px]">
                <div className="relative mx-auto h-36 w-36 rounded-xl bg-white p-2.5 shadow-inner flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="h-full w-full">
                    {/* Top Left Corner */}
                    <rect x="5" y="5" width="26" height="26" fill="#09090b" rx="2" />
                    <rect x="9" y="9" width="18" height="18" fill="#ffffff" rx="1" />
                    <rect x="13" y="13" width="10" height="10" fill="#09090b" />

                    {/* Top Right Corner */}
                    <rect x="69" y="5" width="26" height="26" fill="#09090b" rx="2" />
                    <rect x="73" y="9" width="18" height="18" fill="#ffffff" rx="1" />
                    <rect x="77" y="13" width="10" height="10" fill="#09090b" />

                    {/* Bottom Left Corner */}
                    <rect x="5" y="69" width="26" height="26" fill="#09090b" rx="2" />
                    <rect x="9" y="73" width="18" height="18" fill="#ffffff" rx="1" />
                    <rect x="13" y="77" width="10" height="10" fill="#09090b" />

                    {/* Precision QR Matrix */}
                    <rect x="36" y="8" width="6" height="6" fill="#09090b" />
                    <rect x="46" y="8" width="8" height="6" fill="#09090b" />
                    <rect x="58" y="8" width="6" height="6" fill="#09090b" />

                    <rect x="36" y="20" width="12" height="6" fill="#09090b" />
                    <rect x="52" y="20" width="8" height="6" fill="#09090b" />

                    <rect x="8" y="38" width="8" height="8" fill="#09090b" />
                    <rect x="22" y="38" width="14" height="8" fill="#09090b" />
                    <rect x="42" y="38" width="14" height="8" fill="#09090b" />
                    <rect x="62" y="38" width="8" height="8" fill="#09090b" />
                    <rect x="76" y="38" width="16" height="8" fill="#09090b" />

                    <rect x="36" y="52" width="8" height="8" fill="#09090b" />
                    <rect x="50" y="52" width="14" height="8" fill="#09090b" />
                    <rect x="72" y="52" width="16" height="8" fill="#09090b" />

                    <rect x="36" y="68" width="12" height="8" fill="#09090b" />
                    <rect x="54" y="68" width="8" height="18" fill="#09090b" />
                    <rect x="68" y="72" width="16" height="8" fill="#09090b" />
                    <rect x="88" y="72" width="6" height="16" fill="#09090b" />
                    <rect x="36" y="82" width="14" height="8" fill="#09090b" />
                  </svg>
                </div>

                <div className="mt-3 text-xs font-semibold text-zinc-100">
                  Scan to Install App
                </div>
                <div className="text-[10px] text-zinc-400 mt-0.5">
                  Compatible with iOS 15+ & Android 9+
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
