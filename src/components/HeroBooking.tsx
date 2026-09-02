"use client";

import React, { useState, useMemo } from "react";
import {
  MapPin,
  ArrowDownUp,
  Clock,
  Calendar,
  Crosshair,
  Tag,
  CreditCard,
  Wallet,
  IndianRupee,
  Check,
  ChevronRight,
  ShieldCheck,
  Car,
  Bike,
  Sparkles,
  Zap,
  Leaf,
  Users,
  Info,
} from "lucide-react";
import {
  VEHICLE_OPTIONS,
  POPULAR_LOCATIONS,
  AVAILABLE_COUPONS,
  RENTAL_PACKAGES,
  OUTSTATION_ROUTES,
} from "@/data/mockData";
import { VehicleOption, ServiceMode, ActiveBooking } from "@/types/ride";
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
  // Booking form states
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [pickup, setPickup] = useState("Indiranagar 100ft Road Metro");
  const [drop, setDrop] = useState("Kempegowda Int'l Airport (BLR T1 & T2)");
  const [scheduleDate, setScheduleDate] = useState("Today, 10:30 PM");

  // Selection & Dropdown states
  const [isPickupFocused, setIsPickupFocused] = useState(false);
  const [isDropFocused, setIsDropFocused] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("rapido-bike");
  const [selectedRentalPkg, setSelectedRentalPkg] = useState<string>("pkg-3");
  const [outstationTripType, setOutstationTripType] = useState<"oneway" | "round">("oneway");
  const [selectedOutstationRoute, setSelectedOutstationRoute] = useState(0);

  // Promo code & Payment states
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("RAPIDO50");
  const [couponFeedback, setCouponFeedback] = useState<string | null>(
    "50% off applied! (RAPIDO50)"
  );
  const [paymentMethod, setPaymentMethod] = useState<string>("upi");

  // Computed trip distance (based on destinations)
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
      VEHICLE_OPTIONS.find((v) => v.id === selectedVehicleId) || VEHICLE_OPTIONS[0]
    );
  }, [selectedVehicleId]);

  // Compute live fare
  const { totalFare, baseGrossFare, discountAmount } = useMemo(() => {
    if (activeMode === "rental") {
      const pkg = RENTAL_PACKAGES.find((p) => p.id === selectedRentalPkg);
      const base = pkg ? pkg.price : 999;
      return { totalFare: base, baseGrossFare: base, discountAmount: 0 };
    }

    if (activeMode === "outstation") {
      const route = OUTSTATION_ROUTES[selectedOutstationRoute];
      const base =
        selectedVehicle.category === "suv" ? route.suvPrice : route.sedanPrice;
      const multiplier = outstationTripType === "round" ? 1.8 : 1;
      const total = Math.round(base * multiplier);
      return { totalFare: total, baseGrossFare: total, discountAmount: 0 };
    }

    // Daily Ride calculation
    const rawFare = Math.round(
      selectedVehicle.baseFare +
        tripDistance * selectedVehicle.perKmRate +
        selectedVehicle.etaMinutes * selectedVehicle.perMinuteRate
    );

    let discount = 0;
    if (appliedCoupon === "RAPIDO50") {
      discount = Math.min(60, Math.round(rawFare * 0.5));
    } else if (appliedCoupon === "UBERFIRST") {
      discount = Math.min(100, Math.round(rawFare * 0.3));
    } else if (appliedCoupon === "OLAPLUS") {
      discount = Math.min(80, Math.round(rawFare * 0.2));
    }

    return {
      baseGrossFare: rawFare,
      discountAmount: discount,
      totalFare: Math.max(25, rawFare - discount),
    };
  }, [
    activeMode,
    selectedVehicle,
    tripDistance,
    appliedCoupon,
    selectedRentalPkg,
    selectedOutstationRoute,
    outstationTripType,
  ]);

  // Swap pickup and drop
  const handleSwapLocations = () => {
    const temp = pickup;
    setPickup(drop);
    setDrop(temp);
  };

  // Use current GPS location
  const handleUseCurrentLocation = () => {
    setPickup("Current GPS Location (Koramangala 4th Block)");
  };

  // Apply promo code
  const handleApplyCoupon = () => {
    const cleanCode = couponCode.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);
    if (found) {
      setAppliedCoupon(found.code);
      setCouponFeedback(`Applied! ${found.desc}`);
    } else {
      setCouponFeedback("Invalid promo code. Try RAPIDO50, UBERFIRST or OLAPLUS");
    }
  };

  // Submit booking
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
      bookingTime: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      driver: {
        name: "Rajesh Sharma",
        rating: 4.89,
        totalTrips: 3840,
        vehicleModel:
          selectedVehicle.category === "bike"
            ? "Honda Activa 6G"
            : selectedVehicle.category === "auto"
            ? "Bajaj Compact RE"
            : selectedVehicle.category === "ev"
            ? "Tata Nexon EV"
            : "Swift Dzire VXi",
        vehiclePlate: "KA 05 MN 4829",
        vehicleColor: "Silver Metallic",
        otp: "4829",
        phone: "+91 98450 12345",
        eta: "3 mins",
      },
    };

    onBookRide(newBooking);
  };

  return (
    <section className="relative px-4 sm:px-6 lg:px-8 pt-6 pb-12">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none -z-10"></div>

      <div className="mx-auto max-w-7xl">
        {/* Sub-header headline */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 border border-slate-800 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>India's Smartest Multi-Cab Booking Engine</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
              Where to today? <span className="text-emerald-400">Ride in minutes.</span>
            </h1>
            <p className="mt-1 text-sm text-slate-400">
              Compare fares across Bike Taxi, Auto, Mini, Prime Sedan, and EV silently.
            </p>
          </div>

          {/* Quick Stats Banner */}
          <div className="flex items-center gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              <span>Fastest pickup: <strong>2 mins</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-amber-400"></span>
              <span>Fares from: <strong>₹29</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-cyan-400" />
              <span>100% Verified Partners</span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Booking Console, Right Live Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT CONSOLE (Cols 1-6 lg) */}
          <div className="lg:col-span-6 rounded-2xl bg-slate-900/90 border border-slate-800 p-5 sm:p-6 shadow-2xl backdrop-blur-xl">
            {/* Service Mode Tabs (Daily vs Rentals vs Outstation) */}
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-slate-950 p-1 border border-slate-800 mb-5">
              <button
                onClick={() => onSelectMode("daily")}
                className={`py-2 px-2 text-center text-xs font-bold rounded-lg transition ${
                  activeMode === "daily"
                    ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Daily Rides
              </button>
              <button
                onClick={() => onSelectMode("rental")}
                className={`py-2 px-2 text-center text-xs font-bold rounded-lg transition ${
                  activeMode === "rental"
                    ? "bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Hourly Rentals
              </button>
              <button
                onClick={() => onSelectMode("outstation")}
                className={`py-2 px-2 text-center text-xs font-bold rounded-lg transition ${
                  activeMode === "outstation"
                    ? "bg-cyan-400 text-slate-950 shadow-md shadow-cyan-400/20"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                Outstation
              </button>
            </div>

            {/* Ride Now vs Schedule Later */}
            <div className="flex items-center justify-between mb-5">
              <div className="inline-flex rounded-lg bg-slate-950 p-1 border border-slate-800">
                <button
                  onClick={() => setScheduleType("now")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${
                    scheduleType === "now"
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  Ride Now
                </button>
                <button
                  onClick={() => setScheduleType("later")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${
                    scheduleType === "later"
                      ? "bg-slate-800 text-white shadow-sm"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  Schedule Later
                </button>
              </div>

              {scheduleType === "later" && (
                <div className="text-xs font-semibold text-amber-300 flex items-center gap-1 bg-amber-400/10 px-2.5 py-1 rounded-md border border-amber-400/20">
                  <Clock className="h-3 w-3" />
                  <span>Reserve up to 7 days ahead</span>
                </div>
              )}
            </div>

            {/* LOCATION INPUTS (Uber/Ola iconic stacked input card) */}
            <div className="relative rounded-xl bg-slate-950 border border-slate-800 p-3.5 mb-5">
              {/* Vertical connector line */}
              <div className="absolute left-[26px] top-[30px] bottom-[30px] w-0.5 bg-slate-700 flex flex-col justify-between items-center pointer-events-none">
                <div className="h-2 w-2 rounded-full bg-emerald-400 -mt-1 ring-4 ring-emerald-500/20"></div>
                <div className="h-2 w-2 rounded-sm bg-rose-400 -mb-1 ring-4 ring-rose-500/20"></div>
              </div>

              {/* Pickup Input Row */}
              <div className="relative pl-8 pr-10 pb-3 border-b border-slate-800/80">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Pickup Point
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => setIsPickupFocused(true)}
                  onBlur={() => setTimeout(() => setIsPickupFocused(false), 200)}
                  placeholder="Enter pickup location or airport"
                  className="w-full bg-transparent text-sm font-semibold text-white placeholder-slate-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  title="Use Current GPS Location"
                  className="absolute right-0 top-3 p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-slate-800 rounded-md transition"
                >
                  <Crosshair className="h-4 w-4" />
                </button>

                {/* Pickup Suggestions dropdown */}
                {isPickupFocused && (
                  <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-40">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1">
                      Popular Hubs in City
                    </div>
                    {POPULAR_LOCATIONS.slice(0, 4).map((loc) => (
                      <button
                        key={loc.id}
                        onMouseDown={() => setPickup(loc.name)}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 hover:text-white flex items-center justify-between"
                      >
                        <span className="font-medium truncate">{loc.name}</span>
                        <span className="text-[10px] text-slate-400">{loc.distanceKm} km</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Locations Button in between */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={handleSwapLocations}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 hover:text-white transition shadow-sm group"
                  title="Swap Pickup and Drop"
                >
                  <ArrowDownUp className="h-3.5 w-3.5 group-hover:rotate-180 transition-transform duration-300" />
                </button>
              </div>

              {/* Drop Destination Input Row */}
              <div className="relative pl-8 pr-10 pt-3">
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-0.5">
                  Drop Destination
                </label>
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  onFocus={() => setIsDropFocused(true)}
                  onBlur={() => setTimeout(() => setIsDropFocused(false), 200)}
                  placeholder="Where are you heading?"
                  className="w-full bg-transparent text-sm font-semibold text-white placeholder-slate-500 focus:outline-none"
                />

                {/* Drop Suggestions dropdown */}
                {isDropFocused && (
                  <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-40">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 px-2 py-1">
                      Quick Select Destination
                    </div>
                    {POPULAR_LOCATIONS.map((loc) => (
                      <button
                        key={loc.id}
                        onMouseDown={() => setDrop(loc.name)}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-slate-800 text-xs text-slate-200 hover:text-white flex items-center justify-between"
                      >
                        <span className="font-medium truncate">{loc.name}</span>
                        <span className="text-[10px] text-emerald-400 font-semibold">
                          ~{loc.distanceKm} km
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* MODE SPECIFIC OPTIONS */}
            {activeMode === "rental" && (
              <div className="mb-5 space-y-2">
                <div className="text-xs font-bold text-slate-300 flex items-center justify-between">
                  <span>Select Hourly Rental Package:</span>
                  <span className="text-amber-400">Keep driver for multiple stops</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {RENTAL_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedRentalPkg(pkg.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        selectedRentalPkg === pkg.id
                          ? "bg-amber-400/15 border-amber-400 text-white shadow-lg"
                          : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                      }`}
                    >
                      <div className="text-xs font-bold">{pkg.duration}</div>
                      <div className="text-[11px] text-slate-400">{pkg.distance}</div>
                      <div className="mt-1 text-sm font-black text-amber-400">
                        ₹{pkg.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeMode === "outstation" && (
              <div className="mb-5 space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setOutstationTripType("oneway")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition ${
                      outstationTripType === "oneway"
                        ? "bg-cyan-400 text-slate-950 border-cyan-400"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    One-Way Trip
                  </button>
                  <button
                    onClick={() => setOutstationTripType("round")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-bold border transition ${
                      outstationTripType === "round"
                        ? "bg-cyan-400 text-slate-950 border-cyan-400"
                        : "bg-slate-950 border-slate-800 text-slate-400"
                    }`}
                  >
                    Round Trip (Return)
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-semibold text-slate-400">Popular Getaways:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {OUTSTATION_ROUTES.map((route, idx) => (
                      <button
                        key={route.to}
                        onClick={() => setSelectedOutstationRoute(idx)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition ${
                          selectedOutstationRoute === idx
                            ? "bg-cyan-400/15 border-cyan-400 text-white"
                            : "bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700"
                        }`}
                      >
                        <div className="font-bold truncate">{route.to}</div>
                        <div className="text-[10px] text-slate-400">
                          {route.distance} • {route.time}
                        </div>
                        <div className="mt-1 font-bold text-cyan-400">
                          ₹{route.sedanPrice} (Sedan)
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VEHICLE TIER SELECTOR (Ola / Uber / Rapido vehicle grid) */}
            <div className="mb-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-200">
                  Select Ride Category:
                </span>
                <span className="text-emerald-400 font-semibold">
                  {VEHICLE_OPTIONS.length} vehicle types ready
                </span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                {VEHICLE_OPTIONS.map((veh) => {
                  const isSelected = selectedVehicleId === veh.id;
                  // Dynamic fare for this vehicle
                  const calculatedVehicleFare = Math.round(
                    veh.baseFare +
                      tripDistance * veh.perKmRate +
                      veh.etaMinutes * veh.perMinuteRate
                  );

                  return (
                    <button
                      key={veh.id}
                      onClick={() => setSelectedVehicleId(veh.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left group ${
                        isSelected
                          ? "bg-gradient-to-r from-slate-900 to-slate-800/90 border-emerald-500 shadow-lg ring-1 ring-emerald-500/50"
                          : "bg-slate-950/70 border-slate-800 hover:border-slate-700 text-slate-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Vehicle Icon representation */}
                        <div
                          className={`flex h-11 w-11 items-center justify-center rounded-xl transition ${
                            isSelected
                              ? "bg-emerald-500 text-slate-950 font-bold"
                              : "bg-slate-800 text-slate-300 group-hover:text-white"
                          }`}
                        >
                          {veh.category === "bike" ? (
                            <Bike className="h-5 w-5" />
                          ) : veh.category === "auto" ? (
                            <Zap className="h-5 w-5" />
                          ) : veh.category === "ev" ? (
                            <Leaf className="h-5 w-5" />
                          ) : (
                            <Car className="h-5 w-5" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">
                              {veh.name}
                            </span>
                            <span
                              className={`rounded px-1.5 py-0.2 text-[10px] font-bold border ${veh.tagBg} ${veh.tagColor}`}
                            >
                              {veh.brandTag}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-0.5">
                              <Users className="h-3 w-3 text-slate-500" />
                              {veh.capacity}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 line-clamp-1">
                            {veh.description}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px]">
                            <span className="text-emerald-400 font-medium">
                              ~{veh.etaMinutes} mins away
                            </span>
                            {veh.badge && (
                              <span className="text-amber-400 font-semibold">
                                • {veh.badge}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Pricing Tag */}
                      <div className="text-right">
                        <div className="text-base font-black text-white">
                          ₹{calculatedVehicleFare}
                        </div>
                        <span className="text-[10px] text-slate-500">
                          Est. fare
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PROMO CODE & PAYMENT METHODS */}
            <div className="rounded-xl bg-slate-950 border border-slate-800 p-3.5 mb-5 space-y-3">
              {/* Coupon Row */}
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-slate-500" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter Promo (e.g. RAPIDO50)"
                      className="w-full rounded-lg bg-slate-900 border border-slate-800 pl-8 pr-3 py-1.5 text-xs uppercase font-bold text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-bold text-emerald-400 border border-slate-700 transition"
                  >
                    Apply
                  </button>
                </div>

                {couponFeedback && (
                  <p className="mt-1.5 text-[11px] font-medium text-emerald-400 flex items-center gap-1">
                    <Check className="h-3 w-3" />
                    {couponFeedback}
                  </p>
                )}
              </div>

              {/* Payment Method Switcher */}
              <div className="pt-2 border-t border-slate-800/80">
                <div className="text-[11px] font-bold text-slate-400 mb-2">
                  Payment Method:
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`py-1.5 px-2 rounded-lg border text-center font-semibold transition ${
                      paymentMethod === "upi"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    UPI / GPay
                  </button>
                  <button
                    onClick={() => setPaymentMethod("wallet")}
                    className={`py-1.5 px-2 rounded-lg border text-center font-semibold transition ${
                      paymentMethod === "wallet"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    Ola / Uber Cash
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`py-1.5 px-2 rounded-lg border text-center font-semibold transition ${
                      paymentMethod === "card"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod("cash")}
                    className={`py-1.5 px-2 rounded-lg border text-center font-semibold transition ${
                      paymentMethod === "cash"
                        ? "bg-emerald-500/20 border-emerald-500 text-emerald-300"
                        : "bg-slate-900 border-slate-800 text-slate-400"
                    }`}
                  >
                    Cash
                  </button>
                </div>
              </div>
            </div>

            {/* CONFIRM BOOKING CTA BUTTON */}
            <button
              onClick={handleConfirmBooking}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 text-slate-950 hover:brightness-110 font-extrabold text-base transition duration-200 shadow-xl shadow-emerald-500/25 flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
            >
              <span>Book {selectedVehicle.name}</span>
              <span className="h-1.5 w-1.5 rounded-full bg-slate-950/60"></span>
              <span>₹{totalFare}</span>
              <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 px-1">
              <span>No cancellation fee within 3 mins</span>
              <span className="flex items-center gap-1 text-slate-400">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Insurance included
              </span>
            </div>
          </div>

          {/* RIGHT LIVE MAP (Cols 7-12 lg) */}
          <div className="lg:col-span-6 sticky top-24">
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
