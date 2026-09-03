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
      title: "Mandatory 4-Digit Start OTP",
      description:
        "Guaranteed vehicle verification. Trips cannot commence until your Captain enters your unique 4-digit code.",
      tag: "Verification",
      tagColor: "text-zinc-300 bg-zinc-800 border-zinc-700",
    },
    {
      icon: PhoneCall,
      title: "24x7 Safety Response Command",
      description:
        "Immediate one-touch SOS escalation connected directly to dedicated dispatch coordinators and regional authorities.",
      tag: "Immediate Assist",
      tagColor: "text-zinc-300 bg-zinc-800 border-zinc-700",
    },
    {
      icon: Share2,
      title: "End-to-End Live Telematics",
      description:
        "Share real-time GPS coordinates, vehicle registration number, and route status with designated emergency contacts.",
      tag: "Family Telemetry",
      tagColor: "text-zinc-300 bg-zinc-800 border-zinc-700",
    },
    {
      icon: UserCheck,
      title: "Comprehensive Captain Vetting",
      description:
        "Stringent multi-tier background screening, commercial driver's license audits, and periodic roadworthiness checks.",
      tag: "Certified Fleet",
      tagColor: "text-zinc-300 bg-zinc-800 border-zinc-700",
    },
  ];

  return (
    <section id="safety" className="py-16 border-t border-zinc-800/80 bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 rounded-md bg-zinc-900 border border-zinc-800 px-3 py-1 text-xs font-medium text-zinc-300 mb-3">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span>NexRide Trust & Safety Protocols</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-100">
            Enterprise-grade safety across every kilometer
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-zinc-400">
            Built upon rigorous transit safety benchmarks, real-time vehicle telematics, and 24x7 rapid incident response desks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {safetyPillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="rounded-2xl bg-zinc-900/60 border border-zinc-800/80 p-5 flex flex-col justify-between hover:border-zinc-700 transition"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    <span
                      className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${item.tagColor}`}
                    >
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-sm font-semibold text-zinc-100 mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-2 text-[11px] font-medium text-zinc-400 pt-3 border-t border-zinc-800/60">
                  <CheckCircle className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
                  <span>Always active on all trips</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Assistance Desk Banner */}
        <div className="mt-8 rounded-2xl bg-zinc-900/90 border border-zinc-800 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-zinc-800 border border-zinc-700 text-zinc-200">
              <AlertCircle className="h-5 w-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-100">
                24x7 Rapid Incident Assistance Hotline
              </h4>
              <p className="text-xs text-zinc-400 mt-0.5">
                Direct telephonic support available 365 days a year across all operational metro regions.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="tel:18002008888"
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition"
            >
              <PhoneCall className="h-3.5 w-3.5" />
              <span>1800-200-RIDE</span>
            </a>
            <span className="text-xs text-zinc-300 font-medium bg-zinc-800 px-3 py-2 rounded-xl border border-zinc-700">
              Avg. Response: &lt; 10 secs
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
