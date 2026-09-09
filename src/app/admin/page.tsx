"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  Car,
  Navigation,
  CheckCircle,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  XCircle,
  MapPin,
  RefreshCw,
  Phone,
  Eye,
  Sliders,
  Sparkles,
  PieChart,
} from "lucide-react";
import {
  INITIAL_ADMIN_KPIS,
  INITIAL_ACTIVE_RIDES,
  INITIAL_BOOKINGS,
  AdminActiveRide,
  BookingRecord,
} from "@/db/adminData";

export default function AdminDashboardOverview() {
  const [activeRides, setActiveRides] = useState<AdminActiveRide[]>(INITIAL_ACTIVE_RIDES);
  const [selectedRide, setSelectedRide] = useState<AdminActiveRide | null>(INITIAL_ACTIVE_RIDES[0]);
  const [selectedBookingForModal, setSelectedBookingForModal] = useState<BookingRecord | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live simulation tick to simulate vehicles moving
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveRides((prev) =>
        prev.map((r) => {
          const nextProgress = (r.progressPercent + 2) % 100;
          return {
            ...r,
            progressPercent: nextProgress,
            currentEtaMinutes: Math.max(1, Math.round(15 * (1 - nextProgress / 100))),
          };
        })
      );
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 600);
  };

  const cancelledBookings = INITIAL_BOOKINGS.filter((b) => b.status === "cancelled");
  const recentBookings = INITIAL_BOOKINGS.slice(0, 5);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Page Title & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Platform Command Center
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
              LIVE
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time fleet operations, city metrics, revenue and booking stream.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={handleRefresh}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition shadow-xs ${
              isRefreshing ? "opacity-75" : ""
            }`}
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-emerald-600" : ""}`} />
            <span>Sync Live Telemetry</span>
          </button>

          <Link
            href="/admin/pricing"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition shadow-xs"
          >
            <Sliders className="h-3.5 w-3.5" />
            <span>Adjust Pricing & Surge</span>
          </Link>
        </div>
      </div>

      {/* 5 Primary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Travellers */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Travellers
            </span>
            <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Users className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {INITIAL_ADMIN_KPIS.totalTravellers.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+148 registered today</span>
          </div>
        </div>

        {/* Active Drivers */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Drivers
            </span>
            <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Car className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {INITIAL_ADMIN_KPIS.activeDrivers.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            <span>890 Online • 342 On-Trip</span>
          </div>
        </div>

        {/* Active Rides */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Active Rides
            </span>
            <div className="h-8 w-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <Navigation className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {INITIAL_ADMIN_KPIS.activeRides}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-amber-600 font-semibold">
            <Clock className="h-3.5 w-3.5" />
            <span>Avg dispatch ETA 3.2m</span>
          </div>
        </div>

        {/* Completed Rides */}
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs relative overflow-hidden group hover:border-slate-300 transition">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Completed Rides
            </span>
            <div className="h-8 w-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <CheckCircle className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {INITIAL_ADMIN_KPIS.completedRides.toLocaleString()}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-[11px] text-indigo-600 font-semibold">
            <Sparkles className="h-3.5 w-3.5" />
            <span>98.6% trip fulfillment</span>
          </div>
        </div>

        {/* Today's Revenue */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 text-white border border-slate-800 shadow-md relative overflow-hidden group">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
              Today's Revenue
            </span>
            <div className="h-8 w-8 rounded-xl bg-white/10 text-emerald-400 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-white tracking-tight">
            {INITIAL_ADMIN_KPIS.todayRevenueFormatted}
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-emerald-400 font-bold">
            <ArrowUpRight className="h-3.5 w-3.5" />
            <span>+14.2% vs yesterday</span>
          </div>
        </div>
      </div>

      {/* Active Rides Map & Real-Time Telemetry */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Live Simulation Map */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs p-5 flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold text-slate-900">Active Rides Map & Fleet GPS</h2>
                <span className="text-xs text-slate-400 font-medium">(Kolkata Metro Grid)</span>
              </div>
              <p className="text-xs text-slate-500">
                Click any active vehicle marker below to track route, rider, and trip telemetry.
              </p>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-600">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-emerald-500" /> Cab
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-blue-500" /> Bike
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-500" /> Scooty
              </span>
            </div>
          </div>

          {/* Interactive Map Canvas Container */}
          <div className="relative w-full h-80 rounded-xl bg-slate-900 overflow-hidden border border-slate-800 flex items-center justify-center">
            {/* Background Grid Pattern */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage:
                  "radial-gradient(#94a3b8 1px, transparent 1px), radial-gradient(#94a3b8 1px, #0f172a 1px)",
                backgroundSize: "28px 28px",
                backgroundPosition: "0 0, 14px 14px",
              }}
            />

            {/* Stylized River Hooghly Line */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
              <path
                d="M 120 0 Q 140 100 130 180 T 150 320"
                stroke="#38bdf8"
                strokeWidth="14"
                fill="none"
              />
              <text x="70" y="80" fill="#38bdf8" fontSize="10" fontWeight="bold">
                Hooghly River
              </text>
              <text x="170" y="140" fill="#94a3b8" fontSize="10" fontWeight="bold">
                Howrah Bridge
              </text>
              <text x="340" y="60" fill="#94a3b8" fontSize="10" fontWeight="bold">
                Salt Lake Tech Hub
              </text>
              <text x="300" y="240" fill="#94a3b8" fontSize="10" fontWeight="bold">
                Park Street & Victoria
              </text>
            </svg>

            {/* Simulated Live Route Polyline for Selected Ride */}
            {selectedRide && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <line
                  x1="180"
                  y1="230"
                  x2="350"
                  y2="90"
                  stroke="#10b981"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </svg>
            )}

            {/* Vehicle Markers */}
            {activeRides.map((ride, idx) => {
              const positions = [
                { top: "35%", left: "65%" },
                { top: "20%", left: "45%" },
                { top: "70%", left: "55%" },
              ];
              const pos = positions[idx % positions.length];
              const isSelected = selectedRide?.id === ride.id;

              return (
                <button
                  key={ride.id}
                  onClick={() => setSelectedRide(ride)}
                  style={{ top: pos.top, left: pos.left }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 z-20 group transition-all duration-300 ${
                    isSelected ? "scale-115 z-30" : "hover:scale-105"
                  }`}
                >
                  <div
                    className={`relative p-2 rounded-xl flex items-center gap-1.5 shadow-lg border text-white font-bold text-xs ${
                      ride.vehicleType === "cab"
                        ? "bg-emerald-600 border-emerald-400"
                        : ride.vehicleType === "bike"
                        ? "bg-blue-600 border-blue-400"
                        : "bg-amber-600 border-amber-400"
                    }`}
                  >
                    <span className="text-sm">
                      {ride.vehicleType === "cab" ? "🚕" : ride.vehicleType === "bike" ? "🏍️" : "🛵"}
                    </span>
                    <span className="hidden sm:inline-block text-[10px] font-mono">
                      {ride.bookingRef}
                    </span>
                    <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                  </div>

                  <div className="absolute top-full left-1/2 -translate-x-1/2 mt-1 px-2 py-0.5 rounded bg-slate-900/90 text-[9px] text-slate-300 whitespace-nowrap shadow-sm border border-slate-700">
                    {ride.driverName} • {ride.currentEtaMinutes}m ETA
                  </div>
                </button>
              );
            })}

            {/* Floating Quick Legend */}
            <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-2 rounded-xl text-[11px] text-slate-300 space-y-1">
              <div className="font-semibold text-white flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Live Dispatch Telemetry Active
              </div>
              <div className="text-[10px] text-slate-400">Showing top live trips in high-density corridors</div>
            </div>
          </div>

          {/* Selected Ride Quick Telemetry Bar */}
          {selectedRide && (
            <div className="mt-4 p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <img
                  src={selectedRide.driverAvatar}
                  alt={selectedRide.driverName}
                  className="h-10 w-10 rounded-xl object-cover border border-slate-300"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{selectedRide.driverName}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-mono bg-slate-200 text-slate-800 font-semibold">
                      {selectedRide.plateNumber}
                    </span>
                    <span className="text-[10px] text-slate-500">Ref: {selectedRide.bookingRef}</span>
                  </div>
                  <div className="text-xs text-slate-600 flex items-center gap-1 mt-0.5">
                    <span className="font-medium text-slate-800">{selectedRide.pickup}</span>
                    <span>→</span>
                    <span className="font-medium text-slate-800">{selectedRide.drop}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Passenger</div>
                  <div className="text-xs font-bold text-slate-800">{selectedRide.riderName}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 font-medium">Trip Fare</div>
                  <div className="text-sm font-extrabold text-emerald-600">₹{selectedRide.fare}</div>
                </div>
                <Link
                  href="/admin/bookings"
                  className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-black transition"
                >
                  Inspect
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Right Col: Driver Availability & Fleet Breakdown */}
        <div className="space-y-6">
          {/* Driver Availability */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Driver Availability</h3>
              <Link
                href="/admin/drivers"
                className="text-xs font-semibold text-emerald-600 hover:underline"
              >
                Manage Drivers →
              </Link>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" /> Online & Available
                  </span>
                  <span className="text-slate-900 font-mono">890 (69.3%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: "69.3%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-amber-500" /> On Trip (Busy)
                  </span>
                  <span className="text-slate-900 font-mono">342 (26.6%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: "26.6%" }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-xs font-semibold mb-1">
                  <span className="flex items-center gap-1.5 text-slate-700">
                    <span className="h-2 w-2 rounded-full bg-slate-400" /> Offline / Break
                  </span>
                  <span className="text-slate-900 font-mono">52 (4.1%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div className="h-full bg-slate-400 rounded-full" style={{ width: "4.1%" }} />
                </div>
              </div>
            </div>

            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-500 font-medium">Avg Pickup Time</div>
                <div className="text-sm font-extrabold text-slate-900">3.4 mins</div>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                <div className="text-[10px] text-slate-500 font-medium">Driver Acceptance</div>
                <div className="text-sm font-extrabold text-emerald-600">94.8%</div>
              </div>
            </div>
          </div>

          {/* Popular Vehicle Types */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-bold text-slate-900">Popular Vehicle Types</h3>
              <Link
                href="/admin/vehicles"
                className="text-xs font-semibold text-emerald-600 hover:underline"
              >
                Fleet View →
              </Link>
            </div>

            <div className="space-y-2.5">
              {[
                { name: "Cabs & Sedans", share: "38%", trips: "10,980 trips", icon: "🚕", color: "bg-emerald-500" },
                { name: "Bikes Taxi", share: "32%", trips: "9,250 trips", icon: "🏍️", color: "bg-blue-500" },
                { name: "Scooty", share: "16%", trips: "4,620 trips", icon: "🛵", color: "bg-amber-500" },
                { name: "City Taxis", share: "10%", trips: "2,890 trips", icon: "🚖", color: "bg-orange-500" },
                { name: "Commuter Shuttles", share: "4%", trips: "1,180 trips", icon: "🚌", color: "bg-purple-500" },
              ].map((v) => (
                <div key={v.name} className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{v.icon}</span>
                    <span className="font-semibold text-slate-800">{v.name}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span className="text-slate-400 text-[11px]">{v.trips}</span>
                    <span className="font-bold text-slate-900 w-10 text-right">{v.share}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Bookings Feed & Cancelled Rides Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Bookings Feed (2 cols) */}
        <div className="lg:col-span-2 rounded-2xl bg-white border border-slate-200/80 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Bookings Stream</h3>
              <p className="text-xs text-slate-500">Live booking activity across vehicle categories.</p>
            </div>
            <Link
              href="/admin/bookings"
              className="text-xs font-bold text-slate-900 hover:text-emerald-600 transition"
            >
              View All Bookings →
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="pb-3">Booking Ref</th>
                  <th className="pb-3">Passenger & Driver</th>
                  <th className="pb-3">Route</th>
                  <th className="pb-3">Vehicle</th>
                  <th className="pb-3">Fare</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentBookings.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50/80 transition">
                    <td className="py-3 font-mono font-bold text-slate-900">
                      {b.bookingRef}
                    </td>
                    <td className="py-3">
                      <div className="font-semibold text-slate-900">{b.travellerName}</div>
                      <div className="text-[11px] text-slate-500">→ {b.driverName}</div>
                    </td>
                    <td className="py-3 max-w-[180px] truncate">
                      <div className="text-slate-800 truncate">{b.pickupLocation}</div>
                      <div className="text-slate-400 text-[11px] truncate">to {b.dropLocation}</div>
                    </td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {b.vehicleType}
                      </span>
                    </td>
                    <td className="py-3 font-bold text-slate-900">
                      ₹{b.fare}
                    </td>
                    <td className="py-3">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          b.status === "completed"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : b.status === "active"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : b.status === "searching"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {b.status.toUpperCase()}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={() => setSelectedBookingForModal(b)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                        title="View Timeline"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Cancelled Rides Watchdog */}
        <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-slate-900">Cancelled Rides Log</h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                {INITIAL_ADMIN_KPIS.cancelledRidesToday} Today
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-500 mb-3">
            Real-time audit of cancelled requests and dispute flags.
          </p>

          <div className="space-y-3">
            {cancelledBookings.map((c) => (
              <div
                key={c.id}
                className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-rose-900">
                    {c.bookingRef}
                  </span>
                  <span className="text-[10px] font-semibold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
                    By {c.cancelledBy?.toUpperCase()}
                  </span>
                </div>
                <div className="text-xs text-slate-700">
                  <span className="font-semibold">{c.travellerName}</span> vs {c.driverName}
                </div>
                <div className="text-[11px] text-rose-800 font-medium leading-relaxed bg-white/80 p-2 rounded-lg border border-rose-200/60">
                  "{c.cancellationReason}"
                </div>
                <div className="text-[10px] text-slate-400 flex justify-between pt-1">
                  <span>{c.createdAt}</span>
                  <span className="font-semibold text-slate-600">{c.vehicleType}</span>
                </div>
              </div>
            ))}

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-center">
              <div className="text-xs font-semibold text-slate-700">Cancellation Rate: 0.8%</div>
              <div className="text-[11px] text-slate-400">Well below platform 2.5% threshold</div>
            </div>
          </div>
        </div>
      </div>

      {/* Booking Timeline Modal (Reusable) */}
      {selectedBookingForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">Booking Timeline</h3>
                  <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">
                    {selectedBookingForModal.bookingRef}
                  </span>
                </div>
                <p className="text-xs text-slate-500">
                  {selectedBookingForModal.vehicleType} • {selectedBookingForModal.createdAt}
                </p>
              </div>
              <button
                onClick={() => setSelectedBookingForModal(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            {/* Parties info */}
            <div className="my-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Passenger</span>
                <span className="font-bold text-slate-900">{selectedBookingForModal.travellerName}</span>
                <span className="text-slate-500 block">{selectedBookingForModal.travellerPhone}</span>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Driver & Car</span>
                <span className="font-bold text-slate-900">{selectedBookingForModal.driverName}</span>
                <span className="text-slate-500 block">{selectedBookingForModal.plateNumber}</span>
              </div>
            </div>

            {/* Timeline Steps */}
            <div className="space-y-4 my-4 max-h-60 overflow-y-auto pr-2">
              {selectedBookingForModal.timeline.map((step, idx) => (
                <div key={step.step} className="flex gap-3 text-xs">
                  <div className="flex flex-col items-center">
                    <div
                      className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                        step.completed
                          ? "bg-emerald-500 text-white"
                          : "bg-slate-200 text-slate-500"
                      }`}
                    >
                      {step.completed ? "✓" : idx + 1}
                    </div>
                    {idx < selectedBookingForModal.timeline.length - 1 && (
                      <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                    )}
                  </div>
                  <div className="flex-1 pb-2">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{step.title}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{step.timestamp}</span>
                    </div>
                    <p className="text-slate-600 text-[11px] mt-0.5">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="text-xs">
                <span className="text-slate-500">Total Charged: </span>
                <span className="text-sm font-extrabold text-slate-900">
                  ₹{selectedBookingForModal.fare}
                </span>
                <span className="text-[10px] text-slate-400 ml-1">
                  ({selectedBookingForModal.paymentMethod})
                </span>
              </div>
              <button
                onClick={() => setSelectedBookingForModal(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition"
              >
                Close Audit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
