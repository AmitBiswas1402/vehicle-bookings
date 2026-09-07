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
    { q: "How does the 4-digit Start OTP work?", a: "A secure 4-digit code appears on your screen once a captain is assigned. Share it only after verifying the vehicle. The trip starts upon OTP validation." },
    { q: "What if I left belongings in the vehicle?", a: "Contact our 24×7 support at 1800-200-RIDE with your booking reference. We'll coordinate with the captain for safe return." },
    { q: "How are fares calculated?", a: "Fares = base fare + distance (km) + time (min). GST included. Toll and parking are itemized separately. No hidden surge." },
    { q: "What is the cancellation policy?", a: "Free cancellation within 3 minutes of driver assignment. After that, a small arrival compensation fee applies." },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-slide-up">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-gray-200 p-6 shadow-2xl text-slate-900">
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <PhoneCall className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Help & Support</h3>
              <p className="text-xs text-slate-500">Available 24×7</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-gray-100 transition">
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-3 my-4">
          <a href="tel:18002008888" className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <PhoneCall className="h-4 w-4" />
            </div>
            <div className="text-left">
              <div className="text-sm font-semibold text-slate-900">Call</div>
              <div className="text-xs text-slate-500">1800-200-RIDE</div>
            </div>
          </a>
          <button onClick={() => setChatConnected(true)} className="flex items-center gap-3 p-3.5 rounded-xl bg-gray-50 border border-gray-200 hover:bg-gray-100 transition text-left">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <MessageSquare className="h-4 w-4" />
            </div>
            <div>
              <div className="text-sm font-semibold text-slate-900">Chat</div>
              <div className="text-xs text-slate-500">{chatConnected ? "Connected" : "< 1 min wait"}</div>
            </div>
          </button>
        </div>

        {chatConnected && (
          <div className="p-3 mb-4 rounded-xl bg-emerald-50 border border-emerald-100 text-sm text-slate-700">
            <span className="font-semibold text-emerald-700">Agent connected:</span> How can we help you today?
          </div>
        )}

        {/* FAQs */}
        <div className="space-y-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">
            Frequently Asked
          </div>
          {faqs.map((f, i) => {
            const isOpen = openFaqIndex === i;
            return (
              <div key={i} className="rounded-xl bg-gray-50 border border-gray-200 overflow-hidden text-sm">
                <button
                  onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between p-3.5 text-left font-medium text-slate-700 hover:text-slate-900"
                >
                  <span>{f.q}</span>
                  {isOpen ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0 ml-2" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0 ml-2" />}
                </button>
                {isOpen && (
                  <div className="px-3.5 pb-3.5 text-slate-500 leading-relaxed border-t border-gray-200 pt-2.5">
                    {f.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <button onClick={onClose} className="mt-5 w-full py-3 rounded-xl bg-black hover:bg-gray-900 text-white text-sm font-semibold transition">
          Close
        </button>
      </div>
    </div>
  );
};
