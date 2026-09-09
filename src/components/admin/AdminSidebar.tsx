"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Car,
  Tag,
  Package,
  CreditCard,
  UserCheck,
  Star,
  ArrowLeft,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface AdminSidebarProps {
  isOpen: boolean;
  onClose?: () => void;
}

const NAV_ITEMS = [
  {
    label: "Overview",
    href: "/admin",
    icon: LayoutDashboard,
    badge: null,
  },
  {
    label: "Driver Management",
    href: "/admin/drivers",
    icon: Users,
    badge: "1 Pending",
    badgeColor: "bg-amber-100 text-amber-800",
  },
  {
    label: "Vehicle Management",
    href: "/admin/vehicles",
    icon: Car,
    badge: null,
  },
  {
    label: "Types & Pricing",
    href: "/admin/pricing",
    icon: Tag,
    badge: "5 Active",
    badgeColor: "bg-emerald-100 text-emerald-800",
  },
  {
    label: "Booking Management",
    href: "/admin/bookings",
    icon: Package,
    badge: "342 Live",
    badgeColor: "bg-blue-100 text-blue-800",
  },
  {
    label: "Payments & Revenue",
    href: "/admin/payments",
    icon: CreditCard,
    badge: "₹4.82L",
    badgeColor: "bg-purple-100 text-purple-800",
  },
  {
    label: "Traveller Management",
    href: "/admin/travellers",
    icon: UserCheck,
    badge: null,
  },
  {
    label: "Reviews & Complaints",
    href: "/admin/reviews",
    icon: Star,
    badge: "2 Alerts",
    badgeColor: "bg-rose-100 text-rose-800",
  },
];

export const AdminSidebar: React.FC<AdminSidebarProps> = ({ isOpen, onClose }) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/30 backdrop-blur-sm lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-white border-r border-slate-200/80 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-6 border-b border-slate-100 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="h-9 w-9 rounded-xl bg-black flex items-center justify-center shadow-sm">
              <span className="text-white font-black text-base">N</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-slate-900 tracking-tight text-base">NexRide</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
                  ADMIN
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium">Platform Super Console</p>
            </div>
          </Link>
        </div>

        {/* Status banner */}
        <div className="mx-4 my-3 px-3 py-2 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-medium text-emerald-800">
            Kolkata Operations Live • 99.9% SLA
          </span>
        </div>

        {/* Navigation List */}
        <div className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Core Operations
          </div>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-900 text-white shadow-sm shadow-slate-900/10 font-semibold"
                    : "text-slate-600 hover:bg-slate-100/80 hover:text-slate-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 transition-colors ${
                      isActive ? "text-white" : "text-slate-400 group-hover:text-slate-700"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive ? "bg-white/20 text-white" : item.badgeColor
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 space-y-2">
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition shadow-xs"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Exit to Passenger App</span>
          </Link>

          <div className="flex items-center justify-between px-2 pt-1 text-[11px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5 text-slate-500" />
              RBAC Authorized
            </span>
            <span className="font-mono text-[10px]">v2.4.0</span>
          </div>
        </div>
      </aside>
    </>
  );
};
