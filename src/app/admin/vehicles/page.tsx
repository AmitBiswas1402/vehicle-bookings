"use client";

import React, { useState } from "react";
import {
  Car,
  Search,
  Plus,
  CheckCircle,
  XCircle,
  Shield,
  FileText,
  User,
  Trash2,
  Edit2,
  Calendar,
  Fuel,
  Users as UsersIcon,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import {
  INITIAL_VEHICLES,
  VehicleRecord,
  INITIAL_DRIVERS,
} from "@/db/adminData";

export default function AdminVehicleManagement() {
  const [vehicles, setVehicles] = useState<VehicleRecord[]>(INITIAL_VEHICLES);
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedVehicleForDocs, setSelectedVehicleForDocs] = useState<VehicleRecord | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New vehicle form state
  const [newVehicle, setNewVehicle] = useState({
    registrationNumber: "",
    model: "",
    type: "Cab" as "Bike" | "Scooter" | "Cab" | "Taxi" | "Bus",
    category: "cab" as "bike" | "scooty" | "cab" | "taxi" | "bus",
    seatingCapacity: 4,
    fuelType: "CNG" as "Petrol" | "EV" | "CNG" | "Diesel",
    assignedDriverId: "",
  });

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleStatus = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          const nextStatus = v.status === "active" ? "inactive" : "active";
          showToast(`Vehicle ${v.registrationNumber} status changed to ${nextStatus.toUpperCase()}`);
          return { ...v, status: nextStatus };
        }
        return v;
      })
    );
  };

  const handleVerifyVehicle = (id: string) => {
    setVehicles((prev) =>
      prev.map((v) => {
        if (v.id === id) {
          showToast(`Vehicle ${v.registrationNumber} documents verified & activated!`);
          return { ...v, status: "active" };
        }
        return v;
      })
    );
  };

  const handleRemoveVehicle = (id: string, reg: string) => {
    if (confirm(`Remove vehicle ${reg} from system?`)) {
      setVehicles((prev) => prev.filter((v) => v.id !== id));
      showToast(`Vehicle ${reg} removed successfully.`);
    }
  };

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVehicle.registrationNumber || !newVehicle.model) {
      alert("Please fill all required fields");
      return;
    }

    const assignedDriver = INITIAL_DRIVERS.find((d) => d.id === newVehicle.assignedDriverId);

    const created: VehicleRecord = {
      id: `VEH-${Date.now().toString().slice(-4)}`,
      registrationNumber: newVehicle.registrationNumber.toUpperCase(),
      model: newVehicle.model,
      type: newVehicle.type,
      category: newVehicle.category,
      seatingCapacity: Number(newVehicle.seatingCapacity),
      fuelType: newVehicle.fuelType,
      status: "active",
      assignedDriverId: newVehicle.assignedDriverId || undefined,
      assignedDriverName: assignedDriver?.name || undefined,
      registrationExpiry: "31 Dec 2035",
      insuranceExpiry: "31 Dec 2027",
      fitnessValidUntil: "31 Dec 2030",
      pollutionValidUntil: "31 Dec 2026",
      totalTripsLogged: 0,
      year: 2024,
    };

    setVehicles([created, ...vehicles]);
    setShowAddModal(false);
    showToast(`Vehicle ${created.registrationNumber} added to fleet successfully!`);
    setNewVehicle({
      registrationNumber: "",
      model: "",
      type: "Cab",
      category: "cab",
      seatingCapacity: 4,
      fuelType: "CNG",
      assignedDriverId: "",
    });
  };

  const filteredVehicles = vehicles.filter((v) => {
    const matchesCategory =
      selectedCategory === "ALL"
        ? true
        : selectedCategory === "Bikes"
        ? v.type === "Bike"
        : selectedCategory === "Scooters"
        ? v.type === "Scooter"
        : selectedCategory === "Cabs"
        ? v.type === "Cab"
        : selectedCategory === "Taxis"
        ? v.type === "Taxi"
        : selectedCategory === "Buses"
        ? v.type === "Bus"
        : true;

    const matchesSearch =
      v.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (v.assignedDriverName && v.assignedDriverName.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

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
              Vehicle Fleet Management
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
              {vehicles.length} Vehicles In Fleet
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Manage registrations, driver assignment, road fitness, pollution certs, and fleet status.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search plate, model, driver..."
              className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-slate-400 shadow-xs"
            />
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition shadow-xs whitespace-nowrap cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Vehicle</span>
          </button>
        </div>
      </div>

      {/* Category Tabs: All, Bikes, Scooters, Cabs, Taxis, Buses */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { key: "ALL", label: "All Vehicles", count: vehicles.length },
          { key: "Bikes", label: "🏍️ Bikes", count: vehicles.filter((v) => v.type === "Bike").length },
          { key: "Scooters", label: "🛵 Scooters", count: vehicles.filter((v) => v.type === "Scooter").length },
          { key: "Cabs", label: "🚕 Cabs", count: vehicles.filter((v) => v.type === "Cab").length },
          { key: "Taxis", label: "🚖 Taxis", count: vehicles.filter((v) => v.type === "Taxi").length },
          { key: "Buses", label: "🚌 Buses", count: vehicles.filter((v) => v.type === "Bus").length },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setSelectedCategory(tab.key)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
              selectedCategory === tab.key
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                selectedCategory === tab.key ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Vehicles Table / Grid */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Registration & Model</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Assigned Driver</th>
                <th className="py-3 px-4">Fuel & Specs</th>
                <th className="py-3 px-4">Compliance Status</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredVehicles.map((vehicle) => (
                <tr key={vehicle.id} className="hover:bg-slate-50/80 transition">
                  {/* Reg & Model */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-slate-900 text-sm">
                      {vehicle.registrationNumber}
                    </div>
                    <div className="text-slate-500 text-[11px] font-medium flex items-center gap-1.5 mt-0.5">
                      <span>{vehicle.model}</span>
                      <span>•</span>
                      <span>{vehicle.year}</span>
                    </div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {vehicle.type}
                    </span>
                  </td>

                  {/* Driver */}
                  <td className="py-3.5 px-4">
                    {vehicle.assignedDriverName ? (
                      <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded-full bg-slate-900 text-white flex items-center justify-center font-bold text-[10px]">
                          {vehicle.assignedDriverName.charAt(0)}
                        </div>
                        <span className="font-semibold text-slate-900">
                          {vehicle.assignedDriverName}
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-400 italic">Unassigned</span>
                    )}
                  </td>

                  {/* Fuel & Specs */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2 text-slate-600">
                      <span className="flex items-center gap-1">
                        <Fuel className="h-3 w-3 text-slate-400" />
                        {vehicle.fuelType}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <UsersIcon className="h-3 w-3 text-slate-400" />
                        {vehicle.seatingCapacity} Seats
                      </span>
                    </div>
                  </td>

                  {/* Compliance */}
                  <td className="py-3.5 px-4">
                    <button
                      onClick={() => setSelectedVehicleForDocs(vehicle)}
                      className="text-xs font-semibold text-emerald-600 hover:underline flex items-center gap-1"
                    >
                      <Shield className="h-3.5 w-3.5" />
                      <span>Valid (RC, Ins, PUC)</span>
                    </button>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        vehicle.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : vehicle.status === "unverified"
                          ? "bg-amber-50 text-amber-700 border border-amber-200"
                          : "bg-slate-100 text-slate-600 border border-slate-200"
                      }`}
                    >
                      {vehicle.status.toUpperCase()}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {vehicle.status === "unverified" && (
                        <button
                          onClick={() => handleVerifyVehicle(vehicle.id)}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-semibold hover:bg-emerald-700 transition"
                        >
                          Verify
                        </button>
                      )}

                      <button
                        onClick={() => handleToggleStatus(vehicle.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition"
                        title={vehicle.status === "active" ? "Deactivate" : "Activate"}
                      >
                        {vehicle.status === "active" ? (
                          <ToggleRight className="h-5 w-5 text-emerald-600" />
                        ) : (
                          <ToggleLeft className="h-5 w-5 text-slate-400" />
                        )}
                      </button>

                      <button
                        onClick={() => handleRemoveVehicle(vehicle.id, vehicle.registrationNumber)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition"
                        title="Remove vehicle"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Add Vehicle to Fleet</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateVehicle} className="space-y-4 my-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Registration Plate Number *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WB 02 AX 1234"
                  value={newVehicle.registrationNumber}
                  onChange={(e) =>
                    setNewVehicle({ ...newVehicle, registrationNumber: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white uppercase font-mono font-bold"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Model & Make *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Maruti Suzuki WagonR / Honda Activa"
                  value={newVehicle.model}
                  onChange={(e) => setNewVehicle({ ...newVehicle, model: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Category</label>
                  <select
                    value={newVehicle.type}
                    onChange={(e) => {
                      const t = e.target.value as any;
                      const catMap: Record<string, any> = {
                        Bike: "bike",
                        Scooter: "scooty",
                        Cab: "cab",
                        Taxi: "taxi",
                        Bus: "bus",
                      };
                      setNewVehicle({
                        ...newVehicle,
                        type: t,
                        category: catMap[t] || "cab",
                        seatingCapacity: t === "Bike" || t === "Scooter" ? 2 : t === "Bus" ? 26 : 4,
                      });
                    }}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <option value="Bike">Bike</option>
                    <option value="Scooter">Scooter</option>
                    <option value="Cab">Cab</option>
                    <option value="Taxi">Taxi</option>
                    <option value="Bus">Bus</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Fuel Type</label>
                  <select
                    value={newVehicle.fuelType}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, fuelType: e.target.value as any })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <option value="CNG">CNG</option>
                    <option value="Petrol">Petrol</option>
                    <option value="EV">EV (Electric)</option>
                    <option value="Diesel">Diesel</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Seating Capacity
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={50}
                    value={newVehicle.seatingCapacity}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, seatingCapacity: Number(e.target.value) })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Assign to Driver
                  </label>
                  <select
                    value={newVehicle.assignedDriverId}
                    onChange={(e) =>
                      setNewVehicle({ ...newVehicle, assignedDriverId: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200"
                  >
                    <option value="">Leave unassigned</option>
                    {INITIAL_DRIVERS.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.id})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-slate-900 text-white font-semibold hover:bg-black transition"
                >
                  Add Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Vehicle Documents & Compliance Modal */}
      {selectedVehicleForDocs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Vehicle Compliance & Documents
                </h3>
                <span className="font-mono text-xs font-bold text-slate-500">
                  {selectedVehicleForDocs.registrationNumber} • {selectedVehicleForDocs.model}
                </span>
              </div>
              <button
                onClick={() => setSelectedVehicleForDocs(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3 my-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Registration Certificate (RC)</span>
                  <span className="text-slate-500 text-[11px]">Valid until: {selectedVehicleForDocs.registrationExpiry}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  ACTIVE
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Commercial Motor Insurance</span>
                  <span className="text-slate-500 text-[11px]">Valid until: {selectedVehicleForDocs.insuranceExpiry}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  ACTIVE
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Fitness Certificate</span>
                  <span className="text-slate-500 text-[11px]">Valid until: {selectedVehicleForDocs.fitnessValidUntil}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  ACTIVE
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Pollution Under Control (PUC)</span>
                  <span className="text-slate-500 text-[11px]">Valid until: {selectedVehicleForDocs.pollutionValidUntil}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                  ACTIVE
                </span>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedVehicleForDocs(null)}
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
