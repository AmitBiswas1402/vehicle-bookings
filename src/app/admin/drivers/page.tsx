"use client";

import React, { useState } from "react";
import {
  Users,
  Search,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Star,
  Car,
  DollarSign,
  Phone,
  Mail,
  Shield,
  Clock,
  ExternalLink,
  ChevronRight,
  Filter,
  UserX,
  UserCheck,
  Ban,
  Trash2,
} from "lucide-react";
import {
  INITIAL_DRIVERS,
  DriverRecord,
  DriverStatus,
} from "@/db/adminData";

export default function AdminDriverManagement() {
  const [drivers, setDrivers] = useState<DriverRecord[]>(INITIAL_DRIVERS);
  const [activeTab, setActiveTab] = useState<"ALL" | DriverStatus>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDriver, setSelectedDriver] = useState<DriverRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Status updates
  const handleUpdateStatus = (driverId: string, newStatus: DriverStatus, message: string) => {
    setDrivers((prev) =>
      prev.map((d) => (d.id === driverId ? { ...d, status: newStatus } : d))
    );
    if (selectedDriver && selectedDriver.id === driverId) {
      setSelectedDriver((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(message);
  };

  const handleDelistDriver = (driverId: string, driverName: string) => {
    if (confirm(`Are you sure you want to permanently delist ${driverName} from the NexRide platform?`)) {
      setDrivers((prev) => prev.filter((d) => d.id !== driverId));
      if (selectedDriver?.id === driverId) {
        setSelectedDriver(null);
      }
      showToast(`${driverName} has been delisted from the platform.`);
    }
  };

  // Filtered list
  const filteredDrivers = drivers.filter((d) => {
    const matchesTab =
      activeTab === "ALL" ? true : d.status === activeTab;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.phone.includes(searchQuery) ||
      d.vehicle.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const getStatusCount = (status: "ALL" | DriverStatus) => {
    if (status === "ALL") return drivers.length;
    return drivers.filter((d) => d.status === status).length;
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
      {/* Feedback Toast */}
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
              Driver Management
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {drivers.length} Registered
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Onboard, verify KYC documents, monitor ratings, track earnings, and regulate compliance.
          </p>
        </div>

        {/* Quick Search */}
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search driver, phone, plate..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-slate-400 shadow-xs"
          />
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { key: "ALL", label: "All Drivers" },
          { key: "PENDING", label: "Pending Verification" },
          { key: "ACTIVE", label: "Active Drivers" },
          { key: "OFFLINE", label: "Offline Drivers" },
          { key: "SUSPENDED", label: "Suspended Drivers" },
          { key: "REJECTED", label: "Rejected Applications" },
        ].map((tab) => {
          const count = getStatusCount(tab.key as "ALL" | DriverStatus);
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as "ALL" | DriverStatus)}
              className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Driver Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredDrivers.map((driver) => {
          const isPending = driver.status === "PENDING";
          const isActive = driver.status === "ACTIVE";
          const isSuspended = driver.status === "SUSPENDED";
          const isOffline = driver.status === "OFFLINE";
          const isRejected = driver.status === "REJECTED";

          return (
            <div
              key={driver.id}
              className="rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:shadow-md hover:border-slate-300 transition flex flex-col justify-between overflow-hidden"
            >
              <div className="p-5">
                {/* Top status bar */}
                <div className="flex items-center justify-between mb-3">
                  <span
                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      isActive
                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        : isPending
                        ? "bg-amber-50 text-amber-700 border border-amber-200"
                        : isSuspended
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : isRejected
                        ? "bg-red-100 text-red-800 border border-red-300"
                        : "bg-slate-100 text-slate-600 border border-slate-200"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isActive
                          ? "bg-emerald-500"
                          : isPending
                          ? "bg-amber-500"
                          : isSuspended
                          ? "bg-rose-500"
                          : "bg-slate-400"
                      }`}
                    />
                    {driver.status}
                  </span>

                  <div className="flex items-center gap-1 text-xs font-bold text-slate-800">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span>{driver.rating > 0 ? driver.rating.toFixed(1) : "New"}</span>
                    <span className="text-slate-400 font-normal">({driver.totalRides} rides)</span>
                  </div>
                </div>

                {/* Driver Info */}
                <div className="flex items-center gap-3.5 mb-4">
                  <img
                    src={driver.avatar}
                    alt={driver.name}
                    className="h-12 w-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 leading-snug">
                      {driver.name}
                    </h3>
                    <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                      <span>{driver.phone}</span>
                      <span>•</span>
                      <span>{driver.city}</span>
                    </div>
                  </div>
                </div>

                {/* Vehicle details box */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Vehicle:</span>
                    <span className="font-bold text-slate-900">{driver.vehicle.model}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Type / Plate:</span>
                    <div className="flex items-center gap-1.5">
                      <span className="px-1.5 py-0.2 rounded bg-slate-200/80 text-[10px] font-semibold text-slate-700">
                        {driver.vehicle.type}
                      </span>
                      <span className="font-mono font-bold text-slate-800 text-[11px]">
                        {driver.vehicle.registrationNumber}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Performance Mini Stats */}
                <div className="grid grid-cols-2 gap-2 mt-3 text-center text-xs">
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100/60">
                    <div className="text-[10px] text-slate-400 font-medium">Today's Earnings</div>
                    <div className="font-extrabold text-slate-900 text-xs">₹{driver.earnings.today}</div>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 border border-slate-100/60">
                    <div className="text-[10px] text-slate-400 font-medium">Complaints</div>
                    <div
                      className={`font-extrabold text-xs ${
                        driver.complaintsCount > 0 ? "text-rose-600" : "text-emerald-600"
                      }`}
                    >
                      {driver.complaintsCount} {driver.complaintsCount === 1 ? "Issue" : "Issues"}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-3 bg-slate-50/60 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedDriver(driver)}
                  className="flex-1 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition shadow-xs"
                >
                  View Profile
                </button>

                {isPending && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(driver.id, "ACTIVE", `${driver.name} application approved & activated!`)
                    }
                    className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
                  >
                    Approve
                  </button>
                )}

                {isActive && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(driver.id, "SUSPENDED", `${driver.name} has been suspended.`)
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition"
                  >
                    Suspend
                  </button>
                )}

                {isSuspended && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(driver.id, "ACTIVE", `${driver.name} suspension revoked!`)
                    }
                    className="px-2.5 py-1.5 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold hover:bg-emerald-100 transition"
                  >
                    Activate
                  </button>
                )}

                <button
                  onClick={() => handleDelistDriver(driver.id, driver.name)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                  title="Delist Driver"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Driver Full Profile & Documents Modal */}
      {selectedDriver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <img
                  src={selectedDriver.avatar}
                  alt={selectedDriver.name}
                  className="h-14 w-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-bold text-slate-900">{selectedDriver.name}</h2>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        selectedDriver.status === "ACTIVE"
                          ? "bg-emerald-100 text-emerald-800"
                          : selectedDriver.status === "PENDING"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-rose-100 text-rose-800"
                      }`}
                    >
                      {selectedDriver.status}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-2 mt-0.5">
                    <span>ID: {selectedDriver.id}</span>
                    <span>•</span>
                    <span>Joined: {selectedDriver.joinedDate}</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setSelectedDriver(null)}
                className="p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            {/* Content Tabs / Sections */}
            <div className="space-y-6 my-5">
              {/* Contact & Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Phone</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <Phone className="h-3 w-3 text-slate-500" />
                    {selectedDriver.phone}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Email</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5 truncate">
                    <Mail className="h-3 w-3 text-slate-500" />
                    {selectedDriver.email}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">Live Availability</span>
                  <span className="font-bold text-slate-800 flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`h-2 w-2 rounded-full ${
                        selectedDriver.availability === "online"
                          ? "bg-emerald-500"
                          : selectedDriver.availability === "on_trip"
                          ? "bg-amber-500"
                          : "bg-slate-400"
                      }`}
                    />
                    {selectedDriver.availability.toUpperCase()}
                  </span>
                </div>
              </div>

              {/* Vehicle Registered */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Car className="h-4 w-4 text-slate-500" />
                  Assigned Vehicle Specification
                </h4>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block text-[10px]">Model</span>
                    <span className="font-bold text-slate-900">{selectedDriver.vehicle.model}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Vehicle Type</span>
                    <span className="font-bold text-slate-900">{selectedDriver.vehicle.type}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Registration Plate</span>
                    <span className="font-mono font-bold text-slate-900">
                      {selectedDriver.vehicle.registrationNumber}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">Color / Fuel</span>
                    <span className="font-bold text-slate-900">
                      {selectedDriver.vehicle.color} ({selectedDriver.vehicle.fuelType})
                    </span>
                  </div>
                </div>
              </div>

              {/* Earnings Breakdown */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <DollarSign className="h-4 w-4 text-emerald-600" />
                  Driver Earnings & Settlement
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                    <span className="text-emerald-700 text-[10px] block font-medium">Today</span>
                    <span className="text-base font-black text-emerald-900">
                      ₹{selectedDriver.earnings.today}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block font-medium">This Week</span>
                    <span className="text-base font-black text-slate-900">
                      ₹{selectedDriver.earnings.thisWeek.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block font-medium">This Month</span>
                    <span className="text-base font-black text-slate-900">
                      ₹{selectedDriver.earnings.thisMonth.toLocaleString()}
                    </span>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                    <span className="text-slate-400 text-[10px] block font-medium">Lifetime Gross</span>
                    <span className="text-base font-black text-slate-900">
                      ₹{selectedDriver.earnings.lifetime.toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Driver KYC Documents */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-slate-500" />
                  Verification & KYC Documents ({selectedDriver.documents.length})
                </h4>

                {selectedDriver.documents.length === 0 ? (
                  <div className="p-4 rounded-xl bg-slate-50 border border-dashed border-slate-200 text-center text-xs text-slate-400">
                    No documents uploaded yet.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedDriver.documents.map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3 rounded-xl bg-white border border-slate-200 flex items-center justify-between text-xs hover:bg-slate-50 transition"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
                            <Shield className="h-4 w-4" />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900">{doc.name}</div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              Doc #: {doc.documentNumber} • Expires: {doc.expiryDate}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              doc.status === "verified"
                                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                                : doc.status === "pending"
                                ? "bg-amber-50 text-amber-700 border border-amber-200"
                                : "bg-rose-50 text-rose-700 border border-rose-200"
                            }`}
                          >
                            {doc.status.toUpperCase()}
                          </span>
                          <span className="text-slate-400 text-xs cursor-pointer hover:text-slate-900 font-semibold">
                            Preview
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Customer Complaints Log */}
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <AlertTriangle className="h-4 w-4 text-rose-500" />
                  Passenger Complaints Log ({selectedDriver.complaints.length})
                </h4>

                {selectedDriver.complaints.length === 0 ? (
                  <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-100 text-xs text-emerald-800 font-medium flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-600" />
                    Clean track record. No complaints filed against this driver.
                  </div>
                ) : (
                  <div className="space-y-2">
                    {selectedDriver.complaints.map((c) => (
                      <div
                        key={c.id}
                        className="p-3 rounded-xl bg-rose-50/50 border border-rose-100 text-xs space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-rose-900">{c.category}</span>
                          <span className="text-[10px] text-slate-500">{c.date}</span>
                        </div>
                        <p className="text-slate-700 text-[11px] leading-relaxed">
                          "{c.description}"
                        </p>
                        <div className="text-[10px] text-slate-500 flex items-center justify-between pt-1">
                          <span>Reported by: {c.riderName}</span>
                          <span className="font-semibold text-emerald-700">Status: {c.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                {selectedDriver.status !== "ACTIVE" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(
                        selectedDriver.id,
                        "ACTIVE",
                        `${selectedDriver.name} activated!`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition"
                  >
                    Activate Driver
                  </button>
                )}

                {selectedDriver.status !== "SUSPENDED" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(
                        selectedDriver.id,
                        "SUSPENDED",
                        `${selectedDriver.name} suspended!`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-rose-50 text-rose-700 border border-rose-200 text-xs font-semibold hover:bg-rose-100 transition"
                  >
                    Suspend Driver
                  </button>
                )}

                {selectedDriver.status === "PENDING" && (
                  <button
                    onClick={() =>
                      handleUpdateStatus(
                        selectedDriver.id,
                        "REJECTED",
                        `${selectedDriver.name} application rejected!`
                      )
                    }
                    className="px-3.5 py-2 rounded-xl bg-red-600 text-white text-xs font-semibold hover:bg-red-700 transition"
                  >
                    Reject Application
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleDelistDriver(selectedDriver.id, selectedDriver.name)}
                  className="px-3 py-2 rounded-xl bg-slate-100 text-rose-700 text-xs font-semibold hover:bg-rose-50 transition"
                >
                  Delist Driver
                </button>
                <button
                  onClick={() => setSelectedDriver(null)}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
