"use client";

import React from "react";
import {
  ShieldCheck,
  KeyRound,
  PhoneCall,
  Share2,
  UserCheck,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export const SafetyFeatures: React.FC = () => {
  const safetyPillars = [
    {
      icon: KeyRound,
      title: "4-Digit Start OTP",
      description: "Trips cannot start until the captain enters your unique code — guaranteed vehicle verification.",
      tag: "Verification",
      color: "bg-emerald-50 text-emerald-600",
    },
    {
      icon: PhoneCall,
      title: "24×7 Safety Helpline",
      description: "One-touch SOS escalation connected to dedicated dispatch coordinators and local authorities.",
      tag: "Emergency",
      color: "bg-red-50 text-red-600",
    },
    {
      icon: Share2,
      title: "Live Trip Sharing",
      description: "Share real-time GPS coordinates, vehicle info, and route status with your emergency contacts.",
      tag: "Tracking",
      color: "bg-blue-50 text-blue-600",
    },
    {
      icon: UserCheck,
      title: "Verified Drivers",
      description: "Multi-tier background checks, license audits, and periodic vehicle roadworthiness inspections.",
      tag: "Certified",
      color: "bg-purple-50 text-purple-600",
    },
  ];

  return (
    <section id="safety" className="py-16 bg-gray-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700 mb-4">
            <ShieldCheck className="h-4 w-4" />
            <span>Safety First</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Your safety, our priority
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Every ride is backed by real-time tracking, verified drivers, and 24×7 safety response
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-white border border-gray-200 p-6 flex flex-col justify-between hover:shadow-md transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-slate-500">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-emerald-600 pt-3 border-t border-gray-100">
                  <CheckCircle className="h-3.5 w-3.5 shrink-0" />
                  <span>Active on every trip</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Banner */}
        <div className="mt-8 rounded-2xl bg-white border border-gray-200 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-slate-900">
                Emergency Assistance
              </h4>
              <p className="text-sm text-slate-500 mt-0.5">
                24×7 helpline available 365 days across all cities
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:18002008888"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-black hover:bg-gray-900 text-white text-sm font-semibold transition"
            >
              <PhoneCall className="h-4 w-4" />
              <span>1800-200-RIDE</span>
            </a>
            <span className="text-xs text-slate-500 font-medium bg-gray-50 px-3.5 py-2.5 rounded-xl border border-gray-200">
              Avg. response &lt; 10s
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
