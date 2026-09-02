"use client";

import React from "react";
import {
  X,
  PhoneCall,
  MessageSquare,
  FileQuestion,
  Shield,
  RotateCcw,
  CheckCircle2,
} from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const faqs = [
    {
      q: "How does the 4-digit start OTP work?",
      a: "Once a Captain is assigned to your booking, an exclusive 4-digit numeric code is generated on your screen. Share this code with the driver only after boarding to commence the trip.",
    },
    {
      q: "What if I left an item behind in the vehicle?",
      a: "Go to your Trip History in the app or call our 24x7 incident hotline with your Booking ID. We connect you directly with the Captain or safe-deposit hub within 15 minutes.",
    },
    {
      q: "How are the ride fares calculated?",
      a: "Fares are calculated completely transparently using base fare + per kilometer rate + trip duration in minutes. Taxes and road tolls are transparently itemized without surge surprises.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-2xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-slate-100">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
              <PhoneCall className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">
                24x7 Customer Support & Help Desk
              </h3>
              <p className="text-xs text-slate-400">
                Instant resolution for riders & drivers
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Quick Contact Buttons */}
        <div className="grid grid-cols-2 gap-3 my-5">
          <a
            href="tel:18002008888"
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
              <PhoneCall className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white">Call Support</div>
              <div className="text-[10px] text-emerald-400 font-semibold">
                Toll Free: 1800-200-RIDE
              </div>
            </div>
          </a>

          <button
            onClick={() => alert("Live Chat Agent connected. How can we assist you today?")}
            className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800 hover:border-slate-700 transition text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-white">Live Chat</div>
              <div className="text-[10px] text-cyan-400 font-semibold">
                Avg wait: ~1 min
              </div>
            </div>
          </button>
        </div>

        {/* Frequently Asked Questions */}
        <div className="space-y-3">
          <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Quick Answers
          </div>
          {faqs.map((f, i) => (
            <div key={i} className="rounded-xl bg-slate-950/80 border border-slate-800/80 p-3 text-xs">
              <div className="font-bold text-white mb-1">{f.q}</div>
              <div className="text-slate-400 leading-relaxed">{f.a}</div>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition"
        >
          Close Help Center
        </button>
      </div>
    </div>
  );
};
