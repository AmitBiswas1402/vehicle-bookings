"use client";

import React, { useState } from "react";
import {
  Package,
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  Car,
  User,
  MapPin,
  Calendar,
  CreditCard,
  ChevronRight,
  Phone,
  ArrowRight,
  AlertCircle,
} from "lucide-react";
import {
  INITIAL_BOOKINGS,
  BookingRecord,
  BookingStatus,
} from "@/db/adminData";

export default function AdminBookingManagement() {
  const [bookings, setBookings] = useState<BookingRecord[]>(INITIAL_BOOKINGS);
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<BookingRecord | null>(null);

  const filteredBookings = bookings.filter((b) => {
    const matchesStatus =
      statusFilter === "ALL" ? true : b.status === statusFilter;
    const matchesVehicle =
      vehicleTypeFilter === "ALL" ? true : b.vehicleType === vehicleTypeFilter;
    const matchesSearch =
      b.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.travellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.pickupLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.dropLocation.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesStatus && matchesVehicle && matchesSearch;
  });

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case "completed":
        return "bg-emerald-50 text-emerald-700 border border-emerald-200";
      case "active":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "searching":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      case "cancelled":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      default:
        return "bg-slate-100 text-slate-700 border border-slate-200";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Booking Management
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {bookings.length} Tracked
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Real-time ride audit trail, lifecycle timeline tracking, driver dispatch, and cancellation disputes.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Ref (BK00123), rider, driver, route..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-slate-400 shadow-xs"
          />
        </div>
      </div>

      {/* Filter Tabs & Selectors */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {[
            { key: "ALL", label: "All Bookings", count: bookings.length },
            { key: "active", label: "🟢 Active", count: bookings.filter((b) => b.status === "active").length },
            { key: "searching", label: "🟡 Searching", count: bookings.filter((b) => b.status === "searching").length },
            { key: "completed", label: "🔵 Completed", count: bookings.filter((b) => b.status === "completed").length },
            { key: "cancelled", label: "🔴 Cancelled", count: bookings.filter((b) => b.status === "cancelled").length },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setStatusFilter(tab.key)}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
                statusFilter === tab.key
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  statusFilter === tab.key ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Vehicle Type Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-500 font-medium">Vehicle:</span>
          <select
            value={vehicleTypeFilter}
            onChange={(e) => setVehicleTypeFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800"
          >
            <option value="ALL">All Categories</option>
            <option value="Bike">Bike</option>
            <option value="Scooty">Scooty</option>
            <option value="Cab">Cab</option>
            <option value="Taxi">Taxi</option>
            <option value="Bus">Bus</option>
          </select>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Booking Ref</th>
                <th className="py-3.5 px-4">Traveller → Driver</th>
                <th className="py-3.5 px-4">Vehicle</th>
                <th className="py-3.5 px-4">Route & Distance</th>
                <th className="py-3.5 px-4">Fare & Payment</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-50/80 transition">
                  {/* Ref */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-slate-900 text-sm">
                      {b.bookingRef}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium">{b.createdAt}</span>
                  </td>

                  {/* Traveller -> Driver */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-1.5 font-semibold text-slate-900">
                      <span>{b.travellerName}</span>
                      <ArrowRight className="h-3 w-3 text-slate-400" />
                      <span className={b.driverName === "Unassigned" ? "text-amber-600 italic" : "text-slate-900"}>
                        {b.driverName}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {b.travellerPhone}
                    </div>
                  </td>

                  {/* Vehicle */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {b.vehicleType}
                    </span>
                    <div className="text-[11px] font-mono text-slate-600 mt-0.5">
                      {b.plateNumber}
                    </div>
                  </td>

                  {/* Route */}
                  <td className="py-3.5 px-4 max-w-[220px]">
                    <div className="text-slate-800 font-medium truncate">{b.pickupLocation}</div>
                    <div className="text-slate-400 text-[11px] truncate">to {b.dropLocation}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">
                      {b.distanceKm} km • ~{b.durationMinutes} mins
                    </div>
                  </td>

                  {/* Fare */}
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-slate-900 text-sm">₹{b.fare}</div>
                    <div className="text-[10px] text-slate-500 font-medium">
                      {b.paymentMethod} •{" "}
                      <span
                        className={
                          b.paymentStatus === "paid"
                            ? "text-emerald-600 font-semibold"
                            : b.paymentStatus === "refunded"
                            ? "text-purple-600 font-semibold"
                            : "text-amber-600 font-semibold"
                        }
                      >
                        {b.paymentStatus.toUpperCase()}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${getStatusBadge(
                        b.status
                      )}`}
                    >
                      {b.status.toUpperCase()}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setSelectedBooking(b)}
                      className="px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-black transition shadow-xs cursor-pointer inline-flex items-center gap-1"
                    >
                      <Eye className="h-3.5 w-3.5" />
                      <span>Audit</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking Timeline Audit Modal */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">Booking Lifecycle Timeline</h3>
                  <span className="font-mono text-xs px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-800 font-bold">
                    {selectedBooking.bookingRef}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Full GPS milestone audit log and settlement ledger
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            {/* Traveller & Driver info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Traveller Information
                </span>
                <div className="font-bold text-slate-900 text-sm">
                  {selectedBooking.travellerName}
                </div>
                <div className="text-slate-500">{selectedBooking.travellerPhone}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="text-[10px] text-slate-400 font-bold uppercase block">
                  Driver & Vehicle
                </span>
                <div className="font-bold text-slate-900 text-sm">{selectedBooking.driverName}</div>
                <div className="text-slate-500 font-mono">
                  {selectedBooking.vehicleModel} ({selectedBooking.plateNumber})
                </div>
              </div>
            </div>

            {/* Route Box */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-2">
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 mt-1" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Pickup</span>
                  <div className="font-bold text-slate-900">{selectedBooking.pickupLocation}</div>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <span className="h-2 w-2 rounded-full bg-rose-500 mt-1" />
                <div>
                  <span className="text-[10px] text-slate-400 uppercase font-semibold">Drop-off</span>
                  <div className="font-bold text-slate-900">{selectedBooking.dropLocation}</div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Timeline */}
            <div className="my-5">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
                Event Milestones
              </h4>
              <div className="space-y-4">
                {selectedBooking.timeline.map((item, idx) => (
                  <div key={item.step} className="flex gap-3 text-xs">
                    <div className="flex flex-col items-center">
                      <div
                        className={`h-6 w-6 rounded-full flex items-center justify-center font-bold text-[11px] ${
                          item.completed
                            ? "bg-emerald-500 text-white"
                            : "bg-slate-200 text-slate-500"
                        }`}
                      >
                        {item.completed ? "✓" : idx + 1}
                      </div>
                      {idx < selectedBooking.timeline.length - 1 && (
                        <div className="w-0.5 flex-1 bg-slate-200 my-1" />
                      )}
                    </div>
                    <div className="flex-1 pb-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{item.title}</span>
                        <span className="text-[10px] font-mono text-slate-400">
                          {item.timestamp}
                        </span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financial Settlement Breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 text-xs space-y-1.5">
              <span className="text-[10px] text-slate-400 font-bold uppercase block mb-1">
                Fare & Settlement Breakup
              </span>
              <div className="flex justify-between text-slate-600">
                <span>Trip Fare:</span>
                <span className="font-semibold text-slate-900">₹{selectedBooking.fare}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Platform Commission (18%):</span>
                <span className="font-semibold text-slate-900">₹{selectedBooking.platformFee}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Driver Net Payout:</span>
                <span className="font-bold text-emerald-700">₹{selectedBooking.driverEarning}</span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedBooking(null)}
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
