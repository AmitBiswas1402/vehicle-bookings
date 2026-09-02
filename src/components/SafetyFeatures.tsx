"use client";

import React from "react";
import {
  ShieldCheck,
  KeyRound,
  PhoneCall,
  Share2,
  UserCheck,
  AlertCircle,
  Award,
  CheckCircle,
} from "lucide-react";

export const SafetyFeatures: React.FC = () => {
  const safetyPillars = [
    {
      icon: KeyRound,
      title: "4-Digit Start OTP",
      description:
        "Never step into the wrong vehicle. Trip only starts once your Captain enters your secret one-time password.",
      tag: "Verification",
      tagColor: "text-emerald-400 bg-emerald-400/10 border-emerald-500/20",
    },
    {
      icon: PhoneCall,
      title: "24x7 In-App SOS & Emergency Desk",
      description:
        "One-tap SOS immediately connects to our safety command centre and streams live telemetry to local law enforcement.",
      tag: "Immediate Response",
      tagColor: "text-rose-400 bg-rose-400/10 border-rose-500/20",
    },
    {
      icon: Share2,
      title: "Live GPS Trip Sharing",
      description:
        "Share real-time tracking, vehicle registration, and driver details with family so they can follow your journey end-to-end.",
      tag: "Family Safety",
      tagColor: "text-blue-400 bg-blue-400/10 border-blue-500/20",
    },
    {
      icon: UserCheck,
      title: "100% Verified Captains",
      description:
        "Comprehensive police background verification, commercial driving license checks, and continuous rating audits.",
      tag: "Verified Partners",
      tagColor: "text-amber-400 bg-amber-400/10 border-amber-500/20",
    },
  ];

  return (
    <section id="safety" className="py-16 border-t border-slate-800 bg-[#070b12] relative overflow-hidden">
      {/* Background soft glow */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-3">
            <ShieldCheck className="h-4 w-4" />
            <span>NexRide Safety Shield</span>
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Your safety comes before every kilometer
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Engineered with multi-layered safety protocols inspired by the highest industry benchmarks of Ola Guardian, Uber Safety Center, and Rapido Captain verification.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {safetyPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition duration-300"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 border border-slate-800 text-white">
                      <Icon className="h-6 w-6 text-emerald-400" />
                    </div>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[11px] font-semibold text-slate-300">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                  <span>Always active on every ride</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* SOS Emergency Callout banner */}
        <div className="mt-10 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-slate-950 border border-slate-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
              <AlertCircle className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-base font-bold text-white">
                Emergency Hotline & Incident Support Desk
              </h4>
              <p className="text-xs text-slate-400">
                Direct hotline available in 8 regional languages 24 hours a day, 365 days a year.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:18002008888"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition"
            >
              <PhoneCall className="h-4 w-4 text-emerald-400" />
              <span>1800-200-RIDE</span>
            </a>
            <span className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-2 rounded-xl border border-emerald-500/20">
              Avg. Response: 8 secs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
