"use client";

import React, { useState } from "react";
import {
  Tag,
  Plus,
  CheckCircle,
  XCircle,
  Sliders,
  Flame,
  DollarSign,
  TrendingUp,
  Clock,
  Shield,
  Edit3,
  ToggleLeft,
  ToggleRight,
  Info,
} from "lucide-react";
import {
  INITIAL_VEHICLE_PRICING,
  VehiclePricing,
} from "@/db/adminData";

export default function AdminVehicleTypesPricing() {
  const [pricingList, setPricingList] = useState<VehiclePricing[]>(INITIAL_VEHICLE_PRICING);
  const [editingPricing, setEditingPricing] = useState<VehiclePricing | null>(null);
  const [globalSurgeMultiplier, setGlobalSurgeMultiplier] = useState<number>(1.2);
  const [surgeActive, setSurgeActive] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [showAddTypeModal, setShowAddTypeModal] = useState(false);

  // New type modal state
  const [newType, setNewType] = useState({
    name: "",
    category: "cab" as any,
    icon: "🚗",
    tagline: "",
    baseFare: 40,
    perKmRate: 12,
    perMinuteRate: 1.5,
    minimumFare: 50,
    capacity: 4,
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleEnable = (id: string) => {
    setPricingList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const next = !p.isEnabled;
          showToast(`${p.name} category ${next ? "enabled" : "disabled"} for bookings.`);
          return { ...p, isEnabled: next };
        }
        return p;
      })
    );
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPricing) return;

    setPricingList((prev) =>
      prev.map((p) => (p.id === editingPricing.id ? editingPricing : p))
    );
    showToast(`Updated pricing configuration for ${editingPricing.name}`);
    setEditingPricing(null);
  };

  const handleCreateType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newType.name) return;

    const created: VehiclePricing = {
      id: `vp-${Date.now().toString().slice(-4)}`,
      category: newType.category,
      name: newType.name,
      icon: newType.icon,
      tagline: newType.tagline || "Standard fleet vehicle",
      baseFare: Number(newType.baseFare),
      perKmRate: Number(newType.perKmRate),
      perMinuteRate: Number(newType.perMinuteRate),
      minimumFare: Number(newType.minimumFare),
      capacity: Number(newType.capacity),
      isEnabled: true,
      peakSurgeMultiplier: 1.0,
      cancellationFee: 30,
    };

    setPricingList([...pricingList, created]);
    setShowAddTypeModal(false);
    showToast(`Added vehicle category ${created.name} successfully!`);
    setNewType({
      name: "",
      category: "cab",
      icon: "🚗",
      tagline: "",
      baseFare: 40,
      perKmRate: 12,
      perMinuteRate: 1.5,
      minimumFare: 50,
      capacity: 4,
    });
  };

  // Sample trip estimator calculation for 8 km, 20 mins
  const calculateSampleFare = (p: VehiclePricing) => {
    const surge = surgeActive ? globalSurgeMultiplier : 1.0;
    const raw = p.baseFare + 8 * p.perKmRate + 20 * p.perMinuteRate;
    return Math.max(p.minimumFare, Math.round(raw * surge));
  };

  return (
    <div className="space-y-8 animate-fade-in relative">
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
              Vehicle Types & Pricing Engine
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
              Fare Structure Matrix
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Configure base fares, distance per-km rates, per-minute duration charges, and surge multipliers.
          </p>
        </div>

        <button
          onClick={() => setShowAddTypeModal(true)}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition shadow-xs cursor-pointer w-fit"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Add Vehicle Type</span>
        </button>
      </div>

      {/* Peak Surge Controller Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-rose-500/10 border border-orange-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-orange-500 text-white flex items-center justify-center shadow-xs">
            <Flame className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">Dynamic Peak & Surge Controller</h2>
              <span
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  surgeActive
                    ? "bg-orange-100 text-orange-800 border border-orange-300"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {surgeActive ? `SURGE ACTIVE (${globalSurgeMultiplier}x)` : "SURGE OFF (1.0x)"}
              </span>
            </div>
            <p className="text-xs text-slate-600 mt-0.5">
              Automatically inflates fares during peak commuter windows (08:30–11:30 AM & 05:30–08:30 PM) across Kolkata.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-white/80 backdrop-blur-xs p-3 rounded-xl border border-orange-200 shadow-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setSurgeActive(!surgeActive);
                showToast(`Dynamic Surge Pricing ${!surgeActive ? "Activated" : "Deactivated"}`);
              }}
              className="text-xs font-semibold text-slate-700 flex items-center gap-1.5"
            >
              {surgeActive ? (
                <ToggleRight className="h-6 w-6 text-orange-600" />
              ) : (
                <ToggleLeft className="h-6 w-6 text-slate-400" />
              )}
              <span>{surgeActive ? "Enabled" : "Disabled"}</span>
            </button>
          </div>

          <div className="h-6 w-px bg-slate-200" />

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-medium">Multiplier:</span>
            <input
              type="range"
              min="1.0"
              max="2.5"
              step="0.1"
              disabled={!surgeActive}
              value={globalSurgeMultiplier}
              onChange={(e) => setGlobalSurgeMultiplier(parseFloat(e.target.value))}
              className="w-24 accent-orange-600 cursor-pointer"
            />
            <span className="font-mono font-bold text-slate-900 text-xs w-8">
              {globalSurgeMultiplier.toFixed(1)}x
            </span>
          </div>
        </div>
      </div>

      {/* Vehicle Rate Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {pricingList.map((p) => {
          const sampleFare = calculateSampleFare(p);

          return (
            <div
              key={p.id}
              className={`rounded-2xl bg-white border transition flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-md ${
                p.isEnabled ? "border-slate-200/80" : "border-slate-200 opacity-60 bg-slate-50/50"
              }`}
            >
              <div className="p-5">
                {/* Top Info */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span className="text-2xl">{p.icon}</span>
                    <div>
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {p.name}
                      </h3>
                      <span className="text-[11px] text-slate-500 font-medium">{p.tagline}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleToggleEnable(p.id)}
                    className="p-1 text-slate-400 hover:text-slate-900 transition"
                    title={p.isEnabled ? "Disable Category" : "Enable Category"}
                  >
                    {p.isEnabled ? (
                      <ToggleRight className="h-6 w-6 text-emerald-600" />
                    ) : (
                      <ToggleLeft className="h-6 w-6 text-slate-400" />
                    )}
                  </button>
                </div>

                {/* Pricing Breakdown Matrix */}
                <div className="my-4 p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Base Fare:</span>
                    <span className="font-bold text-slate-900 text-sm">₹{p.baseFare}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Per Kilometer Rate:</span>
                    <span className="font-bold text-slate-900 text-sm">₹{p.perKmRate} / km</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Per Minute Rate:</span>
                    <span className="font-bold text-slate-900 text-sm">
                      ₹{p.perMinuteRate} / min
                    </span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-200/60">
                    <span className="text-slate-500 font-medium">Minimum Fare Floor:</span>
                    <span className="font-bold text-slate-900">₹{p.minimumFare}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-medium">Capacity:</span>
                    <span className="font-bold text-slate-900">{p.capacity} Passenger(s)</span>
                  </div>
                </div>

                {/* Sample Calculated Fare Indicator */}
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-emerald-900 font-bold block">
                      Sample 8 km Commute
                    </span>
                    <span className="text-emerald-700 text-[10px]">
                      (8 km, 20 mins {surgeActive ? `• ${globalSurgeMultiplier}x surge` : ""})
                    </span>
                  </div>
                  <span className="text-base font-black text-emerald-900">
                    ₹{sampleFare}
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    p.isEnabled
                      ? "bg-emerald-100 text-emerald-800"
                      : "bg-slate-200 text-slate-600"
                  }`}
                >
                  {p.isEnabled ? "ACTIVE BOOKINGS" : "SUSPENDED"}
                </span>

                <button
                  onClick={() => setEditingPricing(p)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-800 hover:bg-slate-100 transition shadow-xs"
                >
                  <Edit3 className="h-3.5 w-3.5 text-slate-500" />
                  <span>Configure Rates</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Pricing Modal */}
      {editingPricing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{editingPricing.icon}</span>
                <h3 className="text-base font-bold text-slate-900">
                  Edit Pricing: {editingPricing.name}
                </h3>
              </div>
              <button
                onClick={() => setEditingPricing(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4 my-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Base Fare (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  step="1"
                  required
                  value={editingPricing.baseFare}
                  onChange={(e) =>
                    setEditingPricing({
                      ...editingPricing,
                      baseFare: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Per KM Rate (₹ / km)
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.5"
                  required
                  value={editingPricing.perKmRate}
                  onChange={(e) =>
                    setEditingPricing({
                      ...editingPricing,
                      perKmRate: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Per Minute Rate (₹ / min)
                </label>
                <input
                  type="number"
                  min={0}
                  step="0.1"
                  required
                  value={editingPricing.perMinuteRate}
                  onChange={(e) =>
                    setEditingPricing({
                      ...editingPricing,
                      perMinuteRate: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Minimum Fare Floor (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  step="1"
                  required
                  value={editingPricing.minimumFare}
                  onChange={(e) =>
                    setEditingPricing({
                      ...editingPricing,
                      minimumFare: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Cancellation Fee (₹)
                </label>
                <input
                  type="number"
                  min={0}
                  step="5"
                  required
                  value={editingPricing.cancellationFee}
                  onChange={(e) =>
                    setEditingPricing({
                      ...editingPricing,
                      cancellationFee: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold text-slate-900"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingPricing(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black transition"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add New Vehicle Type Modal */}
      {showAddTypeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-base font-bold text-slate-900">Add New Vehicle Type</h3>
              <button
                onClick={() => setShowAddTypeModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateType} className="space-y-4 my-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Display Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Electric Sedan / Premium SUV"
                  value={newType.name}
                  onChange={(e) => setNewType({ ...newType, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Icon Emoji</label>
                  <input
                    type="text"
                    required
                    value={newType.icon}
                    onChange={(e) => setNewType({ ...newType, icon: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-center text-lg"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Seating</label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={newType.capacity}
                    onChange={(e) =>
                      setNewType({ ...newType, capacity: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Base Fare (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={newType.baseFare}
                    onChange={(e) =>
                      setNewType({ ...newType, baseFare: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Per KM Rate (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={newType.perKmRate}
                    onChange={(e) =>
                      setNewType({ ...newType, perKmRate: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddTypeModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black transition"
                >
                  Add Type
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
