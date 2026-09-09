"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  Star,
  Ban,
  UserX,
  UserCheck,
  Phone,
  Mail,
  Wallet,
  AlertTriangle,
  Clock,
  History,
  Shield,
  CreditCard,
} from "lucide-react";
import {
  INITIAL_TRAVELLERS,
  TravellerRecord,
  INITIAL_BOOKINGS,
} from "@/db/adminData";

export default function AdminTravellerManagement() {
  const [travellers, setTravellers] = useState<TravellerRecord[]>(INITIAL_TRAVELLERS);
  const [activeTab, setActiveTab] = useState<"ALL" | "active" | "suspended" | "blocked">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTraveller, setSelectedTraveller] = useState<TravellerRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleUpdateStatus = (id: string, newStatus: "active" | "suspended" | "blocked") => {
    setTravellers((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: newStatus } : t))
    );
    if (selectedTraveller?.id === id) {
      setSelectedTraveller((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Traveller account status set to ${newStatus.toUpperCase()}`);
  };

  const filteredTravellers = travellers.filter((t) => {
    const matchesTab = activeTab === "ALL" ? true : t.status === activeTab;
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.phone.includes(searchQuery);
    return matchesTab && matchesSearch;
  });

  // Associated bookings for the selected traveller in modal
  const travellerBookings = selectedTraveller
    ? INITIAL_BOOKINGS.filter(
        (b) =>
          b.travellerName.toLowerCase() === selectedTraveller.name.toLowerCase() ||
          b.travellerPhone === selectedTraveller.phone
      )
    : [];

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Toast */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-slide-up">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Traveller Management
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              12,450 Total Registered
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Monitor customer ride frequency, review feedback, handle cancellations, and regulate account access.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search passenger by name, email, phone..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-slate-400 shadow-xs"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { key: "ALL", label: "All Travellers", count: travellers.length },
          {
            key: "active",
            label: "Active",
            count: travellers.filter((t) => t.status === "active").length,
          },
          {
            key: "suspended",
            label: "Suspended",
            count: travellers.filter((t) => t.status === "suspended").length,
          },
          {
            key: "blocked",
            label: "Blocked",
            count: travellers.filter((t) => t.status === "blocked").length,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.key
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === tab.key ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredTravellers.map((traveller) => (
          <div
            key={traveller.id}
            className="rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md transition flex flex-col justify-between overflow-hidden"
          >
            <div className="p-5">
              {/* Top status */}
              <div className="flex items-center justify-between mb-3">
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                    traveller.status === "active"
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : traveller.status === "suspended"
                      ? "bg-amber-50 text-amber-700 border border-amber-200"
                      : "bg-rose-100 text-rose-800 border border-rose-300"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      traveller.status === "active"
                        ? "bg-emerald-500"
                        : traveller.status === "suspended"
                        ? "bg-amber-500"
                        : "bg-rose-600"
                    }`}
                  />
                  {traveller.status.toUpperCase()}
                </span>

                <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                  <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{traveller.rating.toFixed(2)}</span>
                </div>
              </div>

              {/* Avatar & Name */}
              <div className="flex items-center gap-3.5 mb-4">
                <img
                  src={traveller.avatar}
                  alt={traveller.name}
                  className="h-12 w-12 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {traveller.name}
                  </h3>
                  <div className="text-xs text-slate-500 mt-0.5">{traveller.phone}</div>
                </div>
              </div>

              {/* Stats Box */}
              <div className="grid grid-cols-3 gap-2 text-center text-xs p-2.5 rounded-xl bg-slate-50 border border-slate-100 mb-3">
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">Total Rides</div>
                  <div className="font-extrabold text-slate-900">{traveller.totalRides}</div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">Cancellations</div>
                  <div
                    className={`font-extrabold ${
                      traveller.cancelledRides > 5 ? "text-rose-600" : "text-slate-700"
                    }`}
                  >
                    {traveller.cancelledRides}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-medium">Total Spent</div>
                  <div className="font-extrabold text-slate-900">
                    ₹{traveller.totalSpent.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Wallet & Strikes */}
              <div className="flex items-center justify-between text-xs text-slate-600">
                <span className="flex items-center gap-1">
                  <Wallet className="h-3 w-3 text-slate-400" />
                  NexWallet: ₹{traveller.walletBalance}
                </span>
                {traveller.strikes > 0 && (
                  <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                    {traveller.strikes} Policy Strikes
                  </span>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-2">
              <button
                onClick={() => setSelectedTraveller(traveller)}
                className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition shadow-xs"
              >
                View History & Profile
              </button>

              {traveller.status !== "active" ? (
                <button
                  onClick={() => handleUpdateStatus(traveller.id, "active")}
                  className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition"
                >
                  Unblock
                </button>
              ) : (
                <button
                  onClick={() => handleUpdateStatus(traveller.id, "suspended")}
                  className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition"
                >
                  Suspend
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Traveller Detail Modal */}
      {selectedTraveller && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedTraveller.avatar}
                  alt={selectedTraveller.name}
                  className="h-12 w-12 rounded-full object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">
                      {selectedTraveller.name}
                    </h3>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        selectedTraveller.status === "active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {selectedTraveller.status.toUpperCase()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Joined: {selectedTraveller.joinedDate}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedTraveller(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 my-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">
                    Email Address
                  </span>
                  <span className="font-semibold text-slate-900">{selectedTraveller.email}</span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-[10px] text-slate-400 font-bold block uppercase">
                    Phone Number
                  </span>
                  <span className="font-semibold text-slate-900">{selectedTraveller.phone}</span>
                </div>
              </div>

              {/* Ride History */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Recent Rides & Bookings ({travellerBookings.length})
                </h4>
                {travellerBookings.length === 0 ? (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 text-center">
                    No recent booking history found in current session.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {travellerBookings.map((b) => (
                      <div
                        key={b.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between"
                      >
                        <div>
                          <div className="font-bold text-slate-900 flex items-center gap-2">
                            <span>{b.bookingRef}</span>
                            <span className="font-normal text-slate-500">({b.vehicleType})</span>
                          </div>
                          <div className="text-[11px] text-slate-600 mt-0.5">
                            {b.pickupLocation} → {b.dropLocation}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-slate-900">₹{b.fare}</div>
                          <span className="text-[10px] font-semibold text-emerald-700">
                            {b.status.toUpperCase()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {selectedTraveller.status !== "blocked" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedTraveller.id, "blocked")}
                    className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition cursor-pointer"
                  >
                    Block Account
                  </button>
                )}
                {selectedTraveller.status !== "active" && (
                  <button
                    onClick={() => handleUpdateStatus(selectedTraveller.id, "active")}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition cursor-pointer"
                  >
                    Restore / Activate
                  </button>
                )}
              </div>

              <button
                onClick={() => setSelectedTraveller(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
