"use client";

import React, { useState } from "react";
import {
  X,
  PhoneCall,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [chatConnected, setChatConnected] = useState(false);

  if (!isOpen) return null;

  const faqs = [
    {
      q: "How does the 4-digit Start OTP verification work?",
      a: "Once a Captain is assigned to your ride, a secure 4-digit code is generated on your screen. Provide this code to the driver only after verifying the vehicle's registration number and boarding. The trip meter begins only upon successful OTP validation.",
    },
    {
      q: "What should I do if I left personal belongings in the vehicle?",
      a: "Contact our 24x7 incident support desk immediately at 1800-200-RIDE with your Booking Reference ID. Our team will coordinate directly with the assigned Captain and arrange safe return.",
    },
    {
      q: "How are metered fares determined?",
      a: "Fares are calculated strictly based on standard base fare, actual route distance in kilometers, and trip duration in minutes. Applicable GST and parking or toll charges are transparently itemized without hidden surge multipliers.",
    },
    {
      q: "What is the cancellation policy?",
      a: "You may cancel any ride booking within 3 minutes of Captain assignment at zero fee. If canceled after 3 minutes while the driver is in transit, a nominal arrival compensation fee is charged.",
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg rounded-2xl bg-zinc-900 border border-zinc-800 p-6 shadow-2xl text-zinc-100">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-100">
              <PhoneCall className="h-4 w-4 text-emerald-400" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">
                24x7 Transit Support & Help Desk
              </h3>
              <p className="text-xs text-zinc-400">
                Direct rider & partner assistance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Quick Contact Buttons */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <a
            href="tel:18002008888"
            className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
              <PhoneCall className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-xs font-semibold text-zinc-200">Call Dispatch</div>
              <div className="text-[10px] text-zinc-400">
                1800-200-RIDE
              </div>
            </div>
          </a>

          <button
            onClick={() => setChatConnected(true)}
            className="flex items-center gap-3 p-3 rounded-xl bg-zinc-950 border border-zinc-800 hover:border-zinc-700 transition text-left"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <div className="text-xs font-semibold text-zinc-200">Live Support Chat</div>
              <div className="text-[10px] text-zinc-400">
                {chatConnected ? "Connected (Agent Active)" : "Avg. wait &lt; 1 min"}
              </div>
            </div>
          </button>
        </div>

        {chatConnected && (
          <div className="p-3 mb-4 rounded-xl bg-zinc-950 border border-zinc-800 text-xs text-zinc-300">
            <span className="font-semibold text-emerald-400">Support Specialist Connected:</span> How may we assist you with your booking or driver assignment today?
          </div>
        )}

        {/* Frequently Asked Questions */}
        <div className="space-y-2">
          <div className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider mb-1">
            Common Support Queries
          </div>
          {faqs.map((f, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div
                key={i}
                className="rounded-xl bg-zinc-950 border border-zinc-800/80 overflow-hidden text-xs"
              >
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-3 text-left font-medium text-zinc-200 hover:text-white"
                >
                  <span>{f.q}</span>
                  {isOpen ? (
                    <ChevronUp className="h-3.5 w-3.5 text-zinc-400 shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="h-3.5 w-3.5 text-zinc-400 shrink-0 ml-2" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-3 pb-3 pt-0 text-zinc-400 leading-relaxed border-t border-zinc-800/50 pt-2">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full py-2.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-semibold transition"
        >
          Dismiss Help Desk
        </button>
      </div>
    </div>
  );
};
