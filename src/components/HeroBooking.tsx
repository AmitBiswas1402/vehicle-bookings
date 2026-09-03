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
} from "@/data/mockData";
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
  // Booking form states
  const [scheduleType, setScheduleType] = useState<"now" | "later">("now");
  const [pickup, setPickup] = useState("Indiranagar 100ft Road Metro");
  const [drop, setDrop] = useState("Kempegowda Int'l Airport (BLR T1 & T2)");
  const [scheduleTime] = useState("Today, in 30 mins");

  // Selection & Dropdown states
  const [isPickupFocused, setIsPickupFocused] = useState(false);
  const [isDropFocused, setIsDropFocused] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState<string>("uber-go");
  const [selectedRentalPkg, setSelectedRentalPkg] = useState<string>("pkg-3");
  const [outstationTripType, setOutstationTripType] = useState<"oneway" | "round">("oneway");
  const [selectedOutstationRoute, setSelectedOutstationRoute] = useState(0);
  const [showFareBreakdown, setShowFareBreakdown] = useState(false);

  // Promo code & Payment states
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>("MOBILITY50");
  const [couponFeedback, setCouponFeedback] = useState<string | null>(
    "50% off applied on current trip (MOBILITY50)"
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
      VEHICLE_OPTIONS.find((v) => v.id === selectedVehicleId) || VEHICLE_OPTIONS[2]
    );
  }, [selectedVehicleId]);

  // Compute live fare
  const { totalFare, discountAmount, perKmCost, timeCost } = useMemo(() => {
    if (activeMode === "rental") {
      const pkg = RENTAL_PACKAGES.find((p) => p.id === selectedRentalPkg);
      const base = pkg ? pkg.price : 999;
      return {
        totalFare: base,
        baseGrossFare: base,
        discountAmount: 0,
        perKmCost: 0,
        timeCost: 0,
      };
    }

    if (activeMode === "outstation") {
      const route = OUTSTATION_ROUTES[selectedOutstationRoute];
      const base =
        selectedVehicle.category === "suv" ? route.suvPrice : route.sedanPrice;
      const multiplier = outstationTripType === "round" ? 1.8 : 1;
      const total = Math.round(base * multiplier);
      return {
        totalFare: total,
        baseGrossFare: total,
        discountAmount: 0,
        perKmCost: 0,
        timeCost: 0,
      };
    }

    // Daily Ride calculation
    const calculatedKmCost = Math.round(tripDistance * selectedVehicle.perKmRate);
    const calculatedTimeCost = Math.round(selectedVehicle.etaMinutes * selectedVehicle.perMinuteRate);
    const rawFare = selectedVehicle.baseFare + calculatedKmCost + calculatedTimeCost;

    let discount = 0;
    if (appliedCoupon === "MOBILITY50") {
      discount = Math.min(60, Math.round(rawFare * 0.5));
    } else if (appliedCoupon === "FIRST30") {
      discount = Math.min(100, Math.round(rawFare * 0.3));
    } else if (appliedCoupon === "CORP20") {
      discount = Math.min(80, Math.round(rawFare * 0.2));
    }

    return {
      baseGrossFare: rawFare,
      discountAmount: discount,
      totalFare: Math.max(25, rawFare - discount),
      perKmCost: calculatedKmCost,
      timeCost: calculatedTimeCost,
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
    setPickup("Current Location (Koramangala 4th Block)");
  };

  // Apply promo code
  const handleApplyCoupon = () => {
    const cleanCode = couponCode.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === cleanCode);
    if (found) {
      setAppliedCoupon(found.code);
      setCouponFeedback(`Applied! ${found.desc}`);
    } else {
      setCouponFeedback("Invalid promo code. Available: MOBILITY50, FIRST30, CORP20");
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
        rating: 4.92,
        totalTrips: 4210,
        vehicleModel:
          selectedVehicle.category === "bike"
            ? "Honda Activa 6G"
            : selectedVehicle.category === "auto"
            ? "Bajaj Compact RE"
            : selectedVehicle.category === "ev"
            ? "Tata Nexon EV Max"
            : selectedVehicle.category === "suv"
            ? "Toyota Innova Crysta"
            : "Maruti Dzire VXi",
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
      <div className="mx-auto max-w-7xl">
        {/* Editorial Sub-Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end md:justify-between gap-4 border-b border-zinc-800/80 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 rounded-md bg-zinc-900 border border-zinc-800 px-2.5 py-1 text-xs font-medium text-zinc-300 mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
              <span>Enterprise Urban Mobility System</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-100">
              Reliable city transit, rentals & outstation travel
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-zinc-400">
              Transparent, metered pricing across verified mini cabs, executive sedans, autos, and bike taxis.
            </p>
          </div>

          {/* Key Assurance Indicators */}
          <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-400">
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              <span>Avg. Pickup: <strong className="text-zinc-200">2.8 mins</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-300" />
              <span>Certified Captains: <strong className="text-zinc-200">100%</strong></span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-zinc-400"></span>
              <span>Price Transparency: <strong className="text-zinc-200">Zero Surprises</strong></span>
            </div>
          </div>
        </div>

        {/* Main Grid: Left Booking Console, Right Cartographic Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* LEFT CONSOLE (Cols 1-6 lg) */}
          <div className="lg:col-span-6 rounded-2xl bg-zinc-950/90 border border-zinc-800 p-5 sm:p-6 shadow-xl">
            {/* Segmented Mode Selector */}
            <div className="grid grid-cols-3 gap-1 rounded-xl bg-zinc-900 p-1 border border-zinc-800/80 mb-5">
              <button
                onClick={() => onSelectMode("daily")}
                className={`py-2 px-2 text-center text-xs font-semibold rounded-lg transition-all ${
                  activeMode === "daily"
                    ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Daily Commute
              </button>
              <button
                onClick={() => onSelectMode("rental")}
                className={`py-2 px-2 text-center text-xs font-semibold rounded-lg transition-all ${
                  activeMode === "rental"
                    ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Hourly Rentals
              </button>
              <button
                onClick={() => onSelectMode("outstation")}
                className={`py-2 px-2 text-center text-xs font-semibold rounded-lg transition-all ${
                  activeMode === "outstation"
                    ? "bg-zinc-800 text-zinc-100 shadow-sm border border-zinc-700/60"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Intercity Outstation
              </button>
            </div>

            {/* Schedule Toggle */}
            <div className="flex items-center justify-between mb-4">
              <div className="inline-flex rounded-lg bg-zinc-900 p-1 border border-zinc-800/80">
                <button
                  onClick={() => setScheduleType("now")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    scheduleType === "now"
                      ? "bg-zinc-800 text-zinc-100 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  Ride Now
                </button>
                <button
                  onClick={() => setScheduleType("later")}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition ${
                    scheduleType === "later"
                      ? "bg-zinc-800 text-zinc-100 shadow-sm"
                      : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Calendar className="h-3.5 w-3.5 text-zinc-300" />
                  Reserve Ahead
                </button>
              </div>

              {scheduleType === "later" && (
                <div className="text-xs font-medium text-zinc-300 flex items-center gap-1.5 bg-zinc-900 px-3 py-1 rounded-md border border-zinc-800">
                  <Clock className="h-3.5 w-3.5 text-emerald-400" />
                  <span>{scheduleTime}</span>
                </div>
              )}
            </div>

            {/* LOCATION INPUTS (Precision stacked card) */}
            <div className="relative rounded-xl bg-zinc-900/90 border border-zinc-800 p-3.5 mb-5">
              {/* Vertical connector line */}
              <div className="absolute left-[24px] top-[28px] bottom-[28px] w-0.5 bg-zinc-700 flex flex-col justify-between items-center pointer-events-none">
                <div className="h-2 w-2 rounded-full bg-emerald-500 -mt-1 ring-4 ring-emerald-500/20"></div>
                <div className="h-2 w-2 rounded-sm bg-zinc-300 -mb-1 ring-4 ring-zinc-500/20"></div>
              </div>

              {/* Pickup Input Row */}
              <div className="relative pl-8 pr-10 pb-3 border-b border-zinc-800/80">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-0.5">
                  Pickup Location
                </label>
                <input
                  type="text"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  onFocus={() => setIsPickupFocused(true)}
                  onBlur={() => setTimeout(() => setIsPickupFocused(false), 200)}
                  placeholder="Enter pickup point or landmark"
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={handleUseCurrentLocation}
                  title="Use Current Location"
                  className="absolute right-0 top-3 p-1.5 text-zinc-400 hover:text-emerald-400 hover:bg-zinc-800 rounded-md transition"
                >
                  <Crosshair className="h-4 w-4" />
                </button>

                {/* Pickup Suggestions Dropdown */}
                {isPickupFocused && (
                  <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl p-2 z-40">
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 px-2.5 py-1">
                      Frequent Hubs in City
                    </div>
                    {POPULAR_LOCATIONS.slice(0, 4).map((loc) => (
                      <button
                        key={loc.id}
                        onMouseDown={() => setPickup(loc.name)}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-zinc-800 text-xs text-zinc-200 hover:text-white flex items-center justify-between transition"
                      >
                        <div className="flex items-center gap-2 truncate">
                          {loc.type === "airport" ? (
                            <Plane className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                          ) : loc.type === "transit" ? (
                            <Train className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                          ) : (
                            <Building2 className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                          )}
                          <span className="font-medium truncate">{loc.name}</span>
                        </div>
                        <span className="text-[10px] text-zinc-400 shrink-0">{loc.distanceKm} km</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Swap Locations Button */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10">
                <button
                  onClick={handleSwapLocations}
                  className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 hover:text-white transition shadow-sm"
                  title="Swap Pickup and Drop"
                >
                  <ArrowDownUp className="h-3 w-3" />
                </button>
              </div>

              {/* Drop Destination Input Row */}
              <div className="relative pl-8 pr-10 pt-3">
                <label className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400 block mb-0.5">
                  Destination
                </label>
                <input
                  type="text"
                  value={drop}
                  onChange={(e) => setDrop(e.target.value)}
                  onFocus={() => setIsDropFocused(true)}
                  onBlur={() => setTimeout(() => setIsDropFocused(false), 200)}
                  placeholder="Where would you like to go?"
                  className="w-full bg-transparent text-xs sm:text-sm font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none"
                />

                {/* Drop Suggestions Dropdown */}
                {isDropFocused && (
                  <div className="absolute left-0 right-0 top-full mt-2 rounded-xl bg-zinc-900 border border-zinc-700 shadow-2xl p-2 z-40">
                    <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400 px-2.5 py-1">
                      Quick Select Destination
                    </div>
                    {POPULAR_LOCATIONS.map((loc) => (
                      <button
                        key={loc.id}
                        onMouseDown={() => setDrop(loc.name)}
                        className="w-full text-left px-2.5 py-2 rounded-lg hover:bg-zinc-800 text-xs text-zinc-200 hover:text-white flex items-center justify-between transition"
                      >
                        <div className="flex items-center gap-2 truncate">
                          {loc.type === "airport" ? (
                            <Plane className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                          ) : loc.type === "transit" ? (
                            <Train className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                          ) : (
                            <Building2 className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
                          )}
                          <span className="font-medium truncate">{loc.name}</span>
                        </div>
                        <span className="text-[11px] text-zinc-400 font-medium shrink-0">
                          ~{loc.distanceKm} km
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* RENTAL MODE PACKAGES */}
            {activeMode === "rental" && (
              <div className="mb-5 space-y-2">
                <div className="text-xs font-semibold text-zinc-300 flex items-center justify-between">
                  <span>Select Hourly Rental Package:</span>
                  <span className="text-zinc-400">Multiple stops included</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {RENTAL_PACKAGES.map((pkg) => (
                    <button
                      key={pkg.id}
                      onClick={() => setSelectedRentalPkg(pkg.id)}
                      className={`p-3 rounded-xl border text-left transition ${
                        selectedRentalPkg === pkg.id
                          ? "bg-zinc-800 border-zinc-600 text-zinc-100 shadow-sm"
                          : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200"
                      }`}
                    >
                      <div className="text-xs font-semibold text-zinc-200">{pkg.duration}</div>
                      <div className="text-[11px] text-zinc-400">{pkg.distance}</div>
                      <div className="mt-1 text-sm font-bold text-zinc-100">
                        ₹{pkg.price}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* OUTSTATION MODE ROUTES */}
            {activeMode === "outstation" && (
              <div className="mb-5 space-y-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => setOutstationTripType("oneway")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition ${
                      outstationTripType === "oneway"
                        ? "bg-zinc-800 text-zinc-100 border-zinc-700"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400"
                    }`}
                  >
                    One-Way Trip
                  </button>
                  <button
                    onClick={() => setOutstationTripType("round")}
                    className={`flex-1 py-1.5 rounded-lg text-xs font-medium border transition ${
                      outstationTripType === "round"
                        ? "bg-zinc-800 text-zinc-100 border-zinc-700"
                        : "bg-zinc-900 border-zinc-800 text-zinc-400"
                    }`}
                  >
                    Round Trip (Return)
                  </button>
                </div>

                <div className="space-y-1.5">
                  <div className="text-xs font-medium text-zinc-400">Popular Corridors:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {OUTSTATION_ROUTES.map((route, idx) => (
                      <button
                        key={route.to}
                        onClick={() => setSelectedOutstationRoute(idx)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition ${
                          selectedOutstationRoute === idx
                            ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                            : "bg-zinc-900/60 border-zinc-800 text-zinc-400 hover:border-zinc-700"
                        }`}
                      >
                        <div className="font-semibold text-zinc-200 truncate">{route.to}</div>
                        <div className="text-[10px] text-zinc-400">
                          {route.distance} • {route.time}
                        </div>
                        <div className="mt-1 font-bold text-zinc-200">
                          ₹{route.sedanPrice} (Sedan)
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* VEHICLE TIER SELECTOR */}
            <div className="mb-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-zinc-200">
                  Select Ride Tier:
                </span>
                <button
                  onClick={() => setShowFareBreakdown(!showFareBreakdown)}
                  className="text-zinc-400 hover:text-zinc-200 flex items-center gap-1 text-[11px]"
                >
                  <Info className="h-3 w-3" />
                  <span>{showFareBreakdown ? "Hide Breakdown" : "View Breakdown"}</span>
                </button>
              </div>

              {/* Fare Breakdown Drawer */}
              {showFareBreakdown && (
                <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs space-y-1.5 animate-in fade-in duration-150">
                  <div className="flex justify-between text-zinc-400">
                    <span>Base Fare:</span>
                    <span className="text-zinc-200">₹{selectedVehicle.baseFare}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Distance Charge ({tripDistance} km @ ₹{selectedVehicle.perKmRate}/km):</span>
                    <span className="text-zinc-200">₹{perKmCost}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Estimated Time Cost:</span>
                    <span className="text-zinc-200">₹{timeCost}</span>
                  </div>
                  {discountAmount > 0 && (
                    <div className="flex justify-between text-emerald-400 font-medium">
                      <span>Promo Discount ({appliedCoupon}):</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-2 border-t border-zinc-800 font-semibold text-zinc-100">
                    <span>Total Estimated Fare:</span>
                    <span className="text-sm">₹{totalFare}</span>
                  </div>
                </div>
              )}

              {/* Vehicle Options List */}
              <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
                {VEHICLE_OPTIONS.map((veh) => {
                  const isSelected = selectedVehicleId === veh.id;
                  const calculatedVehicleFare = Math.round(
                    veh.baseFare +
                      tripDistance * veh.perKmRate +
                      veh.etaMinutes * veh.perMinuteRate
                  );

                  return (
                    <button
                      key={veh.id}
                      onClick={() => setSelectedVehicleId(veh.id)}
                      className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                        isSelected
                          ? "bg-zinc-900 border-zinc-600 shadow-sm ring-1 ring-zinc-600/50"
                          : "bg-zinc-900/40 border-zinc-800/80 hover:border-zinc-700 text-zinc-400"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-xl transition ${
                            isSelected
                              ? "bg-zinc-100 text-zinc-950 font-bold"
                              : "bg-zinc-800 text-zinc-300"
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
                            <span className="text-sm font-semibold text-zinc-100">
                              {veh.name}
                            </span>
                            <span
                              className={`rounded px-1.5 py-0.2 text-[10px] font-medium border ${veh.tagBg} ${veh.tagColor}`}
                            >
                              {veh.brandTag}
                            </span>
                            <span className="text-[11px] text-zinc-400 flex items-center gap-0.5">
                              <Users className="h-3 w-3 text-zinc-500" />
                              {veh.capacity}
                            </span>
                          </div>
                          <p className="text-xs text-zinc-400 line-clamp-1">
                            {veh.description}
                          </p>
                          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-zinc-400">
                            <span className="text-emerald-400 font-medium">
                              ~{veh.etaMinutes} mins away
                            </span>
                            {veh.badge && (
                              <span>• {veh.badge}</span>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Price Tag */}
                      <div className="text-right">
                        <div className="text-base font-bold text-zinc-100">
                          ₹{calculatedVehicleFare}
                        </div>
                        <span className="text-[10px] text-zinc-500">
                          Metered
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* PROMO CODE & PAYMENT METHODS */}
            <div className="rounded-xl bg-zinc-900/90 border border-zinc-800 p-3.5 mb-5 space-y-3">
              {/* Coupon Row */}
              <div>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Promo Code (e.g. MOBILITY50)"
                      className="w-full rounded-lg bg-zinc-950 border border-zinc-800 pl-8 pr-3 py-1.5 text-xs uppercase font-medium text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-zinc-600"
                    />
                  </div>
                  <button
                    onClick={handleApplyCoupon}
                    className="px-3.5 py-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-xs font-semibold text-zinc-200 border border-zinc-700 transition"
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
              <div className="pt-2 border-t border-zinc-800/80">
                <div className="text-[11px] font-semibold text-zinc-400 mb-2">
                  Payment Method:
                </div>
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <button
                    onClick={() => setPaymentMethod("upi")}
                    className={`py-1.5 px-2 rounded-lg border text-center font-medium transition ${
                      paymentMethod === "upi"
                        ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    UPI / GPay
                  </button>
                  <button
                    onClick={() => setPaymentMethod("card")}
                    className={`py-1.5 px-2 rounded-lg border text-center font-medium transition ${
                      paymentMethod === "card"
                        ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Card
                  </button>
                  <button
                    onClick={() => setPaymentMethod("corporate")}
                    className={`py-1.5 px-2 rounded-lg border text-center font-medium transition ${
                      paymentMethod === "corporate"
                        ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
                    }`}
                  >
                    Corporate
                  </button>
                  <button
                    onClick={() => setPaymentMethod("cash")}
                    className={`py-1.5 px-2 rounded-lg border text-center font-medium transition ${
                      paymentMethod === "cash"
                        ? "bg-zinc-800 border-zinc-600 text-zinc-100"
                        : "bg-zinc-950 border-zinc-800 text-zinc-400 hover:text-zinc-200"
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
              className="w-full py-3.5 rounded-xl bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-sm sm:text-base transition duration-200 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-[0.99]"
            >
              <span>Book {selectedVehicle.name}</span>
              <span className="h-1 w-1 rounded-full bg-zinc-950/60"></span>
              <span>₹{totalFare}</span>
              <ChevronRight className="h-4 w-4" />
            </button>

            <div className="mt-3 flex items-center justify-between text-[11px] text-zinc-400 px-1">
              <span>Free cancellation within 3 minutes of driver assignment</span>
              <span className="flex items-center gap-1 text-zinc-300">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
                Transit Insurance Covered
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
