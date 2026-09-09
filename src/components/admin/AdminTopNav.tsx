"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  Search,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Flame,
} from "lucide-react";
import { ADMIN_EMAIL } from "@/db/adminData";

interface AdminTopNavProps {
  onToggleSidebar: () => void;
}

export const AdminTopNav: React.FC<AdminTopNavProps> = ({ onToggleSidebar }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: "n1",
      title: "New Driver Registration",
      desc: "Subhash Mondal uploaded vehicle RC and Commercial License.",
      time: "10 mins ago",
      type: "driver",
    },
    {
      id: "n2",
      title: "Critical Safety Complaint",
      desc: "Priyanka Roy reported overspeeding against WB 02 Z 7731.",
      time: "45 mins ago",
      type: "alert",
    },
    {
      id: "n3",
      title: "Surge Triggered",
      desc: "Sector V demand peak: 1.2x multiplier automatically activated.",
      time: "1 hour ago",
      type: "surge",
    },
  ];

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
      {/* Left items */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="lg:hidden p-2 rounded-xl text-slate-600 hover:bg-slate-100 transition"
          aria-label="Toggle menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="hidden sm:flex items-center gap-2 text-xs text-slate-500 font-medium">
          <span className="font-semibold text-slate-900">NexRide Admin</span>
          <span>/</span>
          <span className="text-slate-500">Kolkata Operations Control</span>
        </div>
      </div>

      {/* Center Search */}
      <div className="hidden md:flex items-center flex-1 max-w-md mx-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search booking (e.g. BK00123), driver, vehicle plate..."
            className="w-full pl-9 pr-4 py-1.5 text-xs rounded-full bg-slate-100/80 border border-transparent focus:border-slate-300 focus:bg-white focus:outline-none transition"
          />
        </div>
      </div>

      {/* Right Tools */}
      <div className="flex items-center gap-3">
        {/* Live status badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>342 Rides Live</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition"
            aria-label="Notifications"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
          </button>

          {showNotifications && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifications(false)}
              />
              <div className="absolute right-0 mt-2 w-80 rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-50 animate-slide-up">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-bold text-slate-900">Platform Notifications</span>
                  <span className="text-[10px] font-semibold text-emerald-600">3 unread</span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 transition text-left cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-semibold text-slate-800 flex items-center gap-1.5">
                          {n.type === "alert" && <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />}
                          {n.type === "driver" && <CheckCircle2 className="h-3.5 w-3.5 text-amber-500" />}
                          {n.type === "surge" && <Flame className="h-3.5 w-3.5 text-orange-500" />}
                          {n.title}
                        </span>
                        <span className="text-[10px] text-slate-400">{n.time}</span>
                      </div>
                      <p className="text-[11px] text-slate-600 leading-relaxed">{n.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="pt-2 mt-2 border-t border-slate-100 text-center">
                  <Link
                    href="/admin/reviews"
                    onClick={() => setShowNotifications(false)}
                    className="text-[11px] font-semibold text-slate-900 hover:underline"
                  >
                    View All Safety & Review Alerts →
                  </Link>
                </div>
              </div>
            </>
          )}
        </div>

        {/* View Customer App */}
        <Link
          href="/"
          target="_blank"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition"
        >
          <span>Passenger App</span>
          <ExternalLink className="h-3 w-3 text-slate-400" />
        </Link>

        {/* Super Admin Badge / Profile */}
        <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
          <div className="h-8 w-8 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold text-xs shadow-xs">
            A
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-xs font-bold text-slate-900 leading-none flex items-center gap-1">
              <span>Amit Biswas</span>
              <ShieldCheck className="h-3 w-3 text-purple-600" />
            </div>
            <div className="text-[10px] text-slate-500 font-medium truncate max-w-[130px]">
              {ADMIN_EMAIL}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
