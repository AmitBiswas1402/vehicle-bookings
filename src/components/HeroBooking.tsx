"use client";

import React, { useState, useMemo } from "react";
import {
  ArrowDownUp,
  Clock,
  Calendar,
  Crosshair,
  Tag,
  Check,
  ChevronRight,
  ShieldCheck,
  Car,
  Bike,
  Zap,
  Leaf,
  Users,
  Info,
  Building2,
  Plane,
  Train,
} from "lucide-react";
import {
  VEHICLE_OPTIONS,
  POPULAR_LOCATIONS,
  AVAILABLE_COUPONS,
  RENTAL_PACKAGES,
  OUTSTATION_ROUTES,
} from "@/db/mockData";
import { ServiceMode, ActiveBooking } from "@/types/ride";
import { LiveRideMap } from "./LiveRideMap";

interface HeroBookingProps {
  activeMode: ServiceMode;
  onSelectMode: (mode: ServiceMode) => void;
  onBookRide: (booking: ActiveBooking) => void;
}

export const HeroBooking: React.FC<HeroBookingProps> = ({
  activeMode,
  onSelectMode,
  onBookRide,
}) => {
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [pickup, setPickup] = useState("Indiranagar 100ft Road Metro");
  const [drop, setDrop] = useState("Kempegowda Int'l Airport (BLR T1 & T2)");
  const [scheduleTime] = useState("Today, in 30 mins");

  const [isPickupFocused, setIsPickupFocused] = useState(false);
  const [isDropFocused, setIsDropFocused] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("uber-go");
  const [selectedRentalPkg, setSelectedRentalPkg] = useState<string>("pkg-3");
  const [outstationTripType, setOutstationTripType] = useState<"oneway" | "round">("oneway");
  const [selectedOutstationRoute, setSelectedOutstationRoute] = useState(0);
  const [showFareBreakdown, setShowFareBreakdown] = useState(false);

  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("MOBILITY50");
  const [couponFeedback, setCouponFeedback] = useState<string | null>(
    "50% off applied on current trip (MOBILITY50)"
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");

  const tripDistance = useMemo(() => {
    if (activeMode === "rental") {
      const pkg = RENTAL_PACKAGES.find((p) => p.id === selectedRentalPkg);
      return parseInt(pkg?.distance || "40");
    }
    if (activeMode === "outstation") {
      return parseInt(OUTSTATION_ROUTES[selectedOutstationRoute].distance);
    }
    const matched = POPULAR_LOCATIONS.find((l) => l.name === drop);
    return matched ? matched.distanceKm : 14.6;
  }, [drop, activeMode, selectedRentalPkg, selectedOutstationRoute]);

  const selectedVehicle = useMemo(() => {
    return (
      VEHICLE_OPTIONS.find((v) => v.id === selectedVehicleId) || VEHICLE_OPTIONS[2]
    );
  }, [selectedVehicleId]);

  const { totalFare, discountAmount, perKmCost, timeCost } = useMemo(() => {
    if (activeMode === "rental") {
      const pkg = RENTAL_PACKAGES.find((p) => p.id === selectedRentalPkg);
      const base = pkg ? pkg.price : 999;
      return { totalFare: base, baseGrossFare: base, discountAmount: 0, perKmCost: 0, timeCost: 0 };
    }
    if (activeMode === "outstation") {
      const route = OUTSTATION_ROUTES[selectedOutstationRoute];
      const base = selectedVehicle.category === "suv" ? route.suvPrice : route.sedanPrice;
      const multiplier = outstationTripType === "round" ? 1.8 : 1;
      const total = Math.round(base * multiplier);
      return { totalFare: total, baseGrossFare: total, discountAmount: 0, perKmCost: 0, timeCost: 0 };
    }
    const calculatedKmCost = Math.round(tripDistance * selectedVehicle.perKmRate);
    const calculatedTimeCost = Math.round(selectedVehicle.etaMinutes * selectedVehicle.perMinuteRate);
    const rawFare = selectedVehicle.baseFare + calculatedKmCost + calculatedTimeCost;
    let discount = 0;
    if (appliedCoupon === "MOBILITY50") discount = Math.min(60, Math.round(rawFare * 0.5));
    else if (appliedCoupon === "FIRST30") discount = Math.min(100, Math.round(rawFare * 0.3));
    else if (appliedCoupon === "CORP20") discount = Math.min(80, Math.round(rawFare * 0.2));
    return {
      baseGrossFare: rawFare, discountAmount: discount,
      totalFare: Math.max(25, rawFare - discount), perKmCost: calculatedKmCost, timeCost: calculatedTimeCost,
    };
  }, [activeMode, selectedVehicle, tripDistance, appliedCoupon, selectedRentalPkg, selectedOutstationRoute, outstationTripType]);

  const handleSwapLocations = () => { const temp = pickup; setPickup(drop); setDrop(temp); };
  const handleUseCurrentLocation = () => { setPickup("Current Location (Koramangala 4th Block)"); };

  const handleApplyCoupon = () => {
    const cleanCode = couponCode.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);
    if (found) { setAppliedCoupon(found.code); setCouponFeedback(`Applied! ${found.desc}`); }
    else { setCouponFeedback("Invalid promo code. Available: MOBILITY50, FIRST30, CORP20"); }
  };

  const handleConfirmBooking = () => {
    const newBooking: ActiveBooking = {
      id: Math.random().toString(36).substring(2, 10),
      serviceMode: activeMode,
      pickup: pickup || "Pickup Point",
      drop: drop || "Destination",
      vehicle: selectedVehicle,
      totalFare,
      discount: discountAmount,
      couponApplied: appliedCoupon || undefined,
      paymentMethod,
      status: "searching",
      bookingTime: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      driver: {
        name: "Rajesh Sharma", rating: 4.92, totalTrips: 4210,
        vehicleModel: selectedVehicle.category === "bike" ? "Honda Activa 6G" : selectedVehicle.category === "auto" ? "Bajaj Compact RE" : selectedVehicle.category === "ev" ? "Tata Nexon EV Max" : selectedVehicle.category === "suv" ? "Toyota Innova Crysta" : "Maruti Dzire VXi",
        vehiclePlate: "KA 05 MN 4829", vehicleColor: "Silver Metallic", otp: "4829", phone: "+91 98450 12345", eta: "3 mins",
      },
    };
    onBookRide(newBooking);
  };

  return (
    <section className="relative bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Compact Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900">
            Get a ride
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Transparent pricing • Verified drivers • Real-time tracking
          </p>
        </div>

        {/* Main Grid: Left Booking + Right Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT — Booking Form */}
          <div className="lg:col-span-5 space-y-5">
            {/* Mode Tabs */}
            <div className="flex gap-1 p-1 rounded-xl bg-gray-100">
              {[
                { key: "daily" as ServiceMode, label: "Daily Rides" },
                { key: "rental" as ServiceMode, label: "Rentals" },
                { key: "outstation" as ServiceMode, label: "Outstation" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => onSelectMode(tab.key)}
                  className={`flex-1 py-2.5 px-3 text-center text-sm font-semibold rounded-lg transition-all ${
                    activeMode === tab.key
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Schedule Toggle */}
            <div className="flex items-center gap-2">
              <div className="inline-flex rounded-full bg-gray-100 p-1">
                <button
                  onClick={() => setScheduleType("now")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition ${
                    scheduleType === "now"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5" />
                  Now
                </button>
                <button
                  onClick={() => setScheduleType("later")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-sm font-medium transition ${
                    scheduleType === "later"
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700"
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5" />
                  Schedule
                </button>
              </div>
              {scheduleType === "later" && (
                <span className="text-xs font-medium text-slate-500 bg-gray-50 px-3 py-1.5 rounded-full border border-gray-200">
                  {scheduleTime}
                </span>
              )}
            </div>

            {/* Location Input Card — Uber-style */}
            <div className="relative rounded-2xl bg-gray-50 border border-gray-200 p-4">
              {/* Vertical connector */}
              <div className="absolute left-[30px] top-[36px] bottom-[36px] w-[2px] bg-gray-300 flex flex-col justify-between items-center pointer-events-none">
                <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 -mt-1 ring-[3px] ring-emerald-100"></div>
                <div className="h-2.5 w-2.5 rounded-sm bg-slate-900 -mb-1 ring-[3px] ring-slate-200"></div>
              </div>

              {/* Pickup */}
              <div className="relative pl-10 pr-10 pb-3.5 border-b border-gray-200">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Pickup
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => setIsPickupFocused(true)}
                  onBlur={() => setTimeout(() => setIsPickupFocused(false), 200)}
                  placeholder="Enter pickup location"
                  className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  title="Use Current Location"
                  className="absolute right-0 top-3 p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                >
                  <Crosshair className="h-4 w-4" />
                </button>

                {isPickupFocused && (
                  <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-white border border-gray-200 shadow-lg p-2 z-40">
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 px-2.5 py-1">
                      Popular Locations
                    </div>
                    {POPULAR_LOCATIONS.slice(0, 4).map((loc) => (
                      <button
                        key={loc.id}
                        onMouseDown={() => setPickup(loc.name)}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-gray-50 text-sm text-slate-700 hover:text-slate-900 flex items-center justify-between transition"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {loc.type === "airport" ? <Plane className="h-3.5 w-3.5 text-slate-400 shrink-0" /> : loc.type === "transit" ? <Train className="h-3.5 w-3.5 text-slate-400 shrink-0" /> : <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />}
                          <span className="font-medium truncate">{loc.name}</span>
                        </div>
                        <span className="text-xs text-slate-400 shrink-0">{loc.distanceKm} km</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Button */}
              <div className="absolute right-4 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={handleSwapLocations}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-gray-100 border border-gray-200 text-slate-500 hover:text-slate-700 transition shadow-sm"
                  title="Swap"
                >
                  <ArrowDownUp className="h-3.5 w-3.5" />
                </button>
              </div>

              {/* Dropoff */}
              <div className="relative pl-10 pr-10 pt-3.5">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Dropoff
                </label>
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  onFocus={() => setIsDropFocused(true)}
                  onBlur={() => setTimeout(() => setIsDropFocused(false), 200)}
                  placeholder="Where to?"
                  className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none"
                />
                {isDropFocused && (
                  <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-white border border-gray-200 shadow-lg p-2 z-40">
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-slate-400 px-2.5 py-1">
                      Suggested Destinations
                    </div>
                    {POPULAR_LOCATIONS.map((loc) => (
                      <button
                        key={loc.id}
                        onMouseDown={() => setDrop(loc.name)}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-gray-50 text-sm text-slate-700 hover:text-slate-900 flex items-center justify-between transition"
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          {loc.type === "airport" ? <Plane className="h-3.5 w-3.5 text-slate-400 shrink-0" /> : loc.type === "transit" ? <Train className="h-3.5 w-3.5 text-slate-400 shrink-0" /> : <Building2 className="h-3.5 w-3.5 text-slate-400 shrink-0" />}
                          <span className="font-medium truncate">{loc.name}</span>
                        </div>
                        <span className="text-xs text-slate-400 shrink-0">~{loc.distanceKm} km</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RENTAL PACKAGES */}
            {activeMode === "rental" && (
              <div className="space-y-2">
                <div className="text-sm font-semibold text-slate-700">Select Package</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {RENTAL_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedRentalPkg(pkg.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        selectedRentalPkg === pkg.id
                          ? "bg-gray-900 border-gray-900 text-white shadow-sm"
                          : "bg-white border-gray-200 text-slate-700 hover:border-gray-300"
                      }`}
                    >
                      <div className={`text-sm font-semibold ${selectedRentalPkg === pkg.id ? "text-white" : "text-slate-900"}`}>{pkg.duration}</div>
                      <div className={`text-xs ${selectedRentalPkg === pkg.id ? "text-gray-300" : "text-slate-400"}`}>{pkg.distance}</div>
                      <div className={`mt-1 text-base font-bold ${selectedRentalPkg === pkg.id ? "text-white" : "text-slate-900"}`}>₹{pkg.price}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* OUTSTATION ROUTES */}
            {activeMode === "outstation" && (
              <div className="space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setOutstationTripType("oneway")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                      outstationTripType === "oneway"
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white border-gray-200 text-slate-600 hover:border-gray-300"
                    }`}
                  >One-Way</button>
                  <button
                    onClick={() => setOutstationTripType("round")}
                    className={`flex-1 py-2 rounded-lg text-sm font-medium border transition ${
                      outstationTripType === "round"
                        ? "bg-slate-900 text-white border-slate-900"
                        : "bg-white border-gray-200 text-slate-600 hover:border-gray-300"
                    }`}
                  >Round Trip</button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {OUTSTATION_ROUTES.map((route, idx) => (
                    <button
                      key={route.to}
                      onClick={() => setSelectedOutstationRoute(idx)}
                      className={`p-3 rounded-xl border text-left text-sm transition ${
                        selectedOutstationRoute === idx
                          ? "bg-gray-900 border-gray-900 text-white"
                          : "bg-white border-gray-200 text-slate-700 hover:border-gray-300"
                      }`}
                    >
                      <div className={`font-semibold truncate ${selectedOutstationRoute === idx ? "text-white" : "text-slate-900"}`}>{route.to}</div>
                      <div className={`text-xs ${selectedOutstationRoute === idx ? "text-gray-300" : "text-slate-400"}`}>{route.distance} • {route.time}</div>
                      <div className={`mt-1 font-bold ${selectedOutstationRoute === idx ? "text-white" : "text-slate-900"}`}>₹{route.sedanPrice}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* VEHICLE OPTIONS */}
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-slate-900">Choose a ride</span>
                <button
                  onClick={() => setShowFareBreakdown(!showFareBreakdown)}
                  className="text-slate-500 hover:text-slate-700 flex items-center gap-1 text-xs font-medium"
                >
                  <Info className="h-3.5 w-3.5" />
                  {showFareBreakdown ? "Hide breakdown" : "Fare breakdown"}
                </button>
              </div>

              {showFareBreakdown && (
                <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-200 text-sm space-y-2">
                  <div className="flex justify-between text-slate-500">
                    <span>Base fare</span>
                    <span className="text-slate-800 font-medium">₹{selectedVehicle.baseFare}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Distance ({tripDistance} km × ₹{selectedVehicle.perKmRate})</span>
                    <span className="text-slate-800 font-medium">₹{perKmCost}</span>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Time cost</span>
                    <span className="text-slate-800 font-medium">₹{timeCost}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-600 font-medium">
                      <span>Promo ({appliedCoupon})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-gray-200 font-bold text-slate-900">
                    <span>Total</span>
                    <span>₹{totalFare}</span>
                  </div>
                </div>
              )}

              <div className="space-y-2 max-h-72 overflow-y-auto">
                {VEHICLE_OPTIONS.map((veh) => {
                  const isSelected = selectedVehicleId === veh.id;
                  const calculatedVehicleFare = Math.round(
                    veh.baseFare + tripDistance * veh.perKmRate + veh.etaMinutes * veh.perMinuteRate
                  );
                  return (
                    <button
                      key={veh.id}
                      onClick={() => setSelectedVehicleId(veh.id)}
                      className={`w-full flex items-center justify-between p-3.5 rounded-xl border transition-all text-left ${
                        isSelected
                          ? "bg-gray-50 border-slate-900 shadow-sm ring-1 ring-slate-900/10"
                          : "bg-white border-gray-200 hover:border-gray-300 hover:bg-gray-50/50"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                          isSelected ? "bg-slate-900 text-white" : "bg-gray-100 text-slate-600"
                        }`}>
                          {veh.category === "bike" ? <Bike className="h-5 w-5" /> : veh.category === "auto" ? <Zap className="h-5 w-5" /> : veh.category === "ev" ? <Leaf className="h-5 w-5" /> : <Car className="h-5 w-5" />}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-slate-900">{veh.name}</span>
                            <span className="text-xs text-slate-400 flex items-center gap-0.5">
                              <Users className="h-3 w-3" /> {veh.capacity}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-500">
                            <span className="text-emerald-600 font-medium">~{veh.etaMinutes} min</span>
                            {veh.badge && <span>• {veh.badge}</span>}
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-base font-bold text-slate-900">₹{calculatedVehicleFare}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PROMO & PAYMENT */}
            <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 space-y-3">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Promo code"
                    className="w-full rounded-lg bg-white border border-gray-200 pl-9 pr-3 py-2 text-sm font-medium text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent"
                  />
                </div>
                <button
                  onClick={handleApplyCoupon}
                  className="px-4 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-sm font-semibold text-white transition"
                >
                  Apply
                </button>
              </div>
              {couponFeedback && (
                <p className="text-xs font-medium text-emerald-600 flex items-center gap-1">
                  <Check className="h-3.5 w-3.5" /> {couponFeedback}
                </p>
              )}

              <div className="pt-2.5 border-t border-gray-200">
                <div className="text-xs font-semibold text-slate-500 mb-2">Payment</div>
                <div className="grid grid-cols-4 gap-2 text-sm">
                  {[
                    { key: "upi", label: "UPI" },
                    { key: "card", label: "Card" },
                    { key: "corporate", label: "Corporate" },
                    { key: "cash", label: "Cash" },
                  ].map((pm) => (
                    <button
                      key={pm.key}
                      onClick={() => setPaymentMethod(pm.key)}
                      className={`py-2 px-2 rounded-lg border text-center font-medium transition ${
                        paymentMethod === pm.key
                          ? "bg-slate-900 border-slate-900 text-white"
                          : "bg-white border-gray-200 text-slate-600 hover:border-gray-300"
                      }`}
                    >
                      {pm.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* CONFIRM CTA */}
            <button
              onClick={handleConfirmBooking}
              className="w-full py-4 rounded-xl bg-black hover:bg-gray-900 text-white font-bold text-base transition-all duration-200 shadow-lg shadow-black/10 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>Book {selectedVehicle.name}</span>
              <span className="h-1 w-1 rounded-full bg-white/50"></span>
              <span>₹{totalFare}</span>
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="flex items-center justify-between text-xs text-slate-400 px-1">
              <span>Free cancellation within 3 min</span>
              <span className="flex items-center gap-1 text-slate-500">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
                Insurance covered
              </span>
            </div>
          </div>

          {/* RIGHT — Live Map */}
          <div className="lg:col-span-7 sticky top-24">
            <LiveRideMap
              pickupLocation={pickup}
              dropLocation={drop}
              distanceKm={tripDistance}
              etaMinutes={selectedVehicle.etaMinutes + Math.round(tripDistance * 1.4)}
              selectedVehicleName={selectedVehicle.name}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
