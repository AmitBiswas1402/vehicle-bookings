"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Car,
  Power,
  Star,
  TrendingUp,
  MapPin,
  Phone,
  CheckCircle,
  XCircle,
  Navigation,
  Shield,
  Clock,
  ArrowRight,
  Wallet,
  Building2,
  Calendar,
  User,
  FileText,
  AlertCircle,
  RefreshCw,
  Zap,
  ChevronRight,
  Check,
  RotateCcw,
  Sparkles,
  Layers,
} from "lucide-react";
import {
  INITIAL_DRIVER_STATE,
  SAMPLE_INCOMING_REQUEST,
  DriverStateData,
  IncomingRideRequest,
  DriverRideHistoryItem,
} from "@/db/driverData";

export default function DriverDashboard() {
  const [driver, setDriver] = useState<DriverStateData>(INITIAL_DRIVER_STATE);
  const [activeTab, setActiveTab] = useState<"home" | "earnings" | "history" | "profile">("home");

  // Ride Request state
  const [incomingRequest, setIncomingRequest] = useState<IncomingRideRequest | null>(null);
  const [requestCountdown, setRequestCountdown] = useState<number>(15);

  // Active Ride state: null | "accepted" | "arrived" | "in_progress" | "completed_summary"
  const [activeRideStep, setActiveRideStep] = useState<
    null | "accepted" | "arrived" | "in_progress" | "completed_summary"
  >(null);
  const [activeRideData, setActiveRideData] = useState<IncomingRideRequest | null>(null);
  const [enteredOtp, setEnteredOtp] = useState<string>("");
  const [otpError, setOtpError] = useState<boolean>(false);

  // Profile edit form state
  const [profileForm, setProfileForm] = useState({
    name: driver.name,
    phone: driver.phone,
    email: driver.email,
    vehicleModel: driver.vehicle.makeModel,
    registrationNumber: driver.vehicle.registrationNumber,
    bankName: driver.bankAccount.bankName,
    upiId: driver.bankAccount.upiId,
  });

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Dynamic greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  // Countdown timer when incoming request is active
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (incomingRequest && requestCountdown > 0) {
      timer = setInterval(() => {
        setRequestCountdown((prev) => {
          if (prev <= 1) {
            setIncomingRequest(null);
            showToast("Ride request expired.");
            return 15;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [incomingRequest, requestCountdown]);

  // Online / Offline toggle
  const handleToggleOnline = () => {
    const next = !driver.isOnline;
    setDriver((prev) => ({ ...prev, isOnline: next }));
    if (!next) {
      setIncomingRequest(null);
      showToast("You are now Offline. No ride requests will be dispatched.");
    } else {
      showToast("You are now Online. Searching for nearby rides...");
    }
  };

  // Trigger Incoming Request simulation
  const handleSimulateRequest = () => {
    if (!driver.isOnline) {
      setDriver((prev) => ({ ...prev, isOnline: true }));
    }
    setRequestCountdown(15);
    setIncomingRequest(SAMPLE_INCOMING_REQUEST);
  };

  // Accept Ride Request
  const handleAcceptRequest = () => {
    if (!incomingRequest) return;
    setActiveRideData(incomingRequest);
    setActiveRideStep("accepted");
    setIncomingRequest(null);
    setEnteredOtp(incomingRequest.otp);
    showToast(`Ride accepted! Navigate to pickup at ${incomingRequest.pickup}`);
  };

  // Reject Ride Request
  const handleRejectRequest = () => {
    setIncomingRequest(null);
    showToast("Ride request declined.");
  };

  // Active Ride Step 1: Arrived at Pickup
  const handleDriverArrived = () => {
    setActiveRideStep("arrived");
    showToast("Arrival signal sent to passenger. Verify OTP to begin ride.");
  };

  // Active Ride Step 2: Start Ride (Verify OTP)
  const handleStartRide = () => {
    if (activeRideData && enteredOtp.trim() !== activeRideData.otp) {
      setOtpError(true);
      return;
    }
    setOtpError(false);
    setActiveRideStep("in_progress");
    showToast("OTP verified. Ride in progress to Howrah!");
  };

  // Active Ride Step 3: Complete Ride
  const handleCompleteRide = () => {
    if (!activeRideData) return;

    const earned = activeRideData.estimatedEarnings;
    const newHistoryItem: DriverRideHistoryItem = {
      id: `hist-${Date.now()}`,
      bookingRef: activeRideData.bookingRef,
      pickup: activeRideData.pickup,
      drop: activeRideData.drop,
      vehicleType: activeRideData.vehicleType,
      fare: earned,
      status: "Completed",
      completedAt: "Just now",
      distanceKm: activeRideData.distanceKm,
      durationMins: activeRideData.durationMins,
    };

    setDriver((prev) => ({
      ...prev,
      earnings: {
        ...prev.earnings,
        today: prev.earnings.today + earned,
        thisWeek: prev.earnings.thisWeek + earned,
        thisMonth: prev.earnings.thisMonth + earned,
        todayRidesCount: prev.earnings.todayRidesCount + 1,
        todayGross: prev.earnings.todayGross + Math.round(earned * 1.15),
        todayPlatformFee: prev.earnings.todayPlatformFee + Math.round(earned * 0.15),
      },
      history: [newHistoryItem, ...prev.history],
    }));

    setActiveRideStep("completed_summary");
    showToast(`Ride completed! ₹${earned} added to your today's earnings.`);
  };

  const handleFinishRideSummary = () => {
    setActiveRideStep(null);
    setActiveRideData(null);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setDriver((prev) => ({
      ...prev,
      name: profileForm.name,
      firstName: profileForm.name.split(" ")[0] || prev.firstName,
      phone: profileForm.phone,
      email: profileForm.email,
      vehicle: {
        ...prev.vehicle,
        makeModel: profileForm.vehicleModel,
        registrationNumber: profileForm.registrationNumber,
      },
      bankAccount: {
        ...prev.bankAccount,
        bankName: profileForm.bankName,
        upiId: profileForm.upiId,
      },
    }));
    showToast("Profile and payout details updated successfully!");
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-12">
      {/* Toast Feedback */}
      {toastMessage && (
        <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 rounded-full bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-slide-up">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Landscape Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/driver" className="flex items-center gap-2.5">
              <div className="h-9 w-9 rounded-xl bg-black text-white flex items-center justify-center font-black text-base shadow-sm">
                N
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-base tracking-tight text-slate-900">NexRide</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-200">
                    DRIVER CONSOLE
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-medium">Kolkata Operations</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-slate-200">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
                  driver.isOnline
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-slate-100 text-slate-600 border border-slate-200"
                }`}
              >
                <span
                  className={`h-2 w-2 rounded-full ${
                    driver.isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                  }`}
                />
                {driver.isOnline ? "You're Online" : "You're Offline"}
              </span>
              <span className="text-xs text-slate-400">• GPS Lock Active</span>
            </div>
          </div>

          {/* Right Links & Driver Badge */}
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition"
            >
              Passenger App
            </Link>
            <Link
              href="/admin"
              className="text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 px-3 py-1.5 rounded-lg transition"
            >
              Admin
            </Link>

            <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
              <img
                src={driver.avatar}
                alt={driver.name}
                className="h-8 w-8 rounded-full object-cover border border-slate-300 shadow-xs"
              />
              <div className="hidden sm:block text-left leading-tight">
                <div className="text-xs font-bold text-slate-900">{driver.name}</div>
                <div className="text-[10px] text-slate-500 font-medium">⭐ {driver.rating} Rating</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Wide Landscape Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Horizontal Segmented Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-2">
          <div className="flex items-center gap-2 overflow-x-auto">
            {[
              { key: "home", label: "Driver Home", icon: Car },
              { key: "earnings", label: "Driver Earnings", icon: Wallet },
              { key: "history", label: "Ride History", icon: Clock },
              { key: "profile", label: "Driver Profile & Fleet", icon: User },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition whitespace-nowrap cursor-pointer ${
                    isActive
                      ? "bg-slate-900 text-white shadow-sm"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 ${isActive ? "text-white" : "text-slate-500"}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:flex items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Vehicle:</span>
            <span className="font-mono text-slate-900 font-bold bg-slate-100 px-2 py-0.5 rounded">
              {driver.vehicle.registrationNumber}
            </span>
          </div>
        </div>

        {/* ----------------- TAB 1: DRIVER HOME (LANDSCAPE SPLIT VIEW) ----------------- */}
        {activeTab === "home" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT COLUMN: Controls, KPIs & Actions (5 cols) */}
            <div className="lg:col-span-5 space-y-5">
              {/* Driver Greeting Card */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-black text-slate-900 tracking-tight">
                      {getGreeting()}, {driver.firstName} 👋
                    </h1>
                    <div className="mt-1 flex items-center gap-2">
                      <span className="text-xs text-slate-500 font-medium">Status:</span>
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          driver.isOnline
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-600 border border-slate-200"
                        }`}
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${
                            driver.isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-400"
                          }`}
                        />
                        {driver.isOnline ? "You're Online" : "You're Offline"}
                      </span>
                    </div>
                  </div>

                  <img
                    src={driver.avatar}
                    alt={driver.name}
                    className="h-14 w-14 rounded-2xl object-cover border border-slate-200 shadow-xs"
                  />
                </div>

                {/* 3 Main KPI Metrics from prompt */}
                <div className="grid grid-cols-3 gap-3 pt-2">
                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                      Today&apos;s Earnings
                    </span>
                    <div className="text-xl font-black text-slate-900 mt-0.5">
                      ₹{driver.earnings.today.toLocaleString()}
                    </div>
                    <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">
                      +{driver.earnings.todayRidesCount} rides
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                      Today&apos;s Rides
                    </span>
                    <div className="text-xl font-black text-slate-900 mt-0.5">
                      {driver.earnings.todayRidesCount}
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                      Completed
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-center">
                    <span className="text-[10px] text-slate-500 uppercase font-semibold block">
                      Rating
                    </span>
                    <div className="text-xl font-black text-slate-900 mt-0.5 flex items-center justify-center gap-1">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span>{driver.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                      1,248 trips
                    </span>
                  </div>
                </div>

                {/* MAIN BIG ACTION BUTTON FROM PROMPT */}
                <button
                  onClick={handleToggleOnline}
                  className={`w-full py-4 rounded-2xl text-base font-extrabold transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                    driver.isOnline
                      ? "bg-rose-50 text-rose-700 border-2 border-rose-300 hover:bg-rose-100"
                      : "bg-emerald-600 text-white hover:bg-emerald-700"
                  }`}
                >
                  <Power className="h-5 w-5" />
                  <span>{driver.isOnline ? "🔴 GO OFFLINE" : "🟢 GO ONLINE"}</span>
                </button>

                {/* Quick Simulation Trigger */}
                {driver.isOnline && !incomingRequest && !activeRideStep && (
                  <button
                    onClick={handleSimulateRequest}
                    className="w-full py-2.5 rounded-xl bg-amber-50 text-amber-900 border border-amber-200 text-xs font-bold hover:bg-amber-100 transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Zap className="h-4 w-4 text-amber-600" />
                    <span>Simulate Incoming Ride Request</span>
                  </button>
                )}
              </div>

              {/* Vehicle & Quick Dispatch Info */}
              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Car className="h-4 w-4 text-slate-500" />
                    <span>Registered Vehicle</span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                    ACTIVE
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Model:</span>
                    <span className="font-bold text-slate-900">{driver.vehicle.makeModel}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Plate Number:</span>
                    <span className="font-mono font-bold text-slate-900">
                      {driver.vehicle.registrationNumber}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500 font-medium">Color / Year:</span>
                    <span className="font-bold text-slate-700">
                      {driver.vehicle.color} ({driver.vehicle.year})
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT COLUMN: Map, Request & Active Ride Panel (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              {/* ---------------- INCOMING RIDE REQUEST POPUP (LANDSCAPE) ---------------- */}
              {incomingRequest && !activeRideStep && (
                <div className="rounded-2xl border-2 border-emerald-500 bg-white p-6 shadow-2xl space-y-5 animate-slide-up">
                  {/* Countdown bar */}
                  <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 transition-all duration-1000"
                      style={{ width: `${(requestCountdown / 15) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl shadow-xs">
                        🚕
                      </div>
                      <div>
                        <h3 className="text-lg font-black text-slate-900">New Ride Request</h3>
                        <span className="text-xs text-slate-500">
                          Passenger: {incomingRequest.passengerName} (⭐ {incomingRequest.passengerRating})
                        </span>
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                      {requestCountdown}s remaining
                    </span>
                  </div>

                  {/* Pickup & Drop from prompt */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Pickup Location
                      </span>
                      <span className="font-bold text-slate-900 text-sm">
                        {incomingRequest.pickup}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block mb-0.5">
                        Drop Location
                      </span>
                      <span className="font-bold text-slate-900 text-sm">
                        {incomingRequest.drop}
                      </span>
                    </div>
                  </div>

                  {/* Distance & Estimated Earnings */}
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                      <span className="text-xs text-slate-500 font-medium block">Distance</span>
                      <span className="text-lg font-black text-slate-900">
                        {incomingRequest.distanceKm} km
                      </span>
                    </div>
                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <span className="text-xs text-emerald-800 font-medium block">
                        Estimated Earnings
                      </span>
                      <span className="text-2xl font-black text-emerald-700">
                        ₹{incomingRequest.estimatedEarnings}
                      </span>
                    </div>
                  </div>

                  {/* Accept & Reject Action Buttons */}
                  <div className="grid grid-cols-2 gap-4 pt-1">
                    <button
                      onClick={handleRejectRequest}
                      className="py-3.5 rounded-xl bg-slate-100 text-slate-700 text-sm font-bold hover:bg-slate-200 transition cursor-pointer"
                    >
                      Reject
                    </button>
                    <button
                      onClick={handleAcceptRequest}
                      className="py-3.5 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition shadow-lg shadow-emerald-600/20 cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Check className="h-5 w-5" />
                      <span>Accept Request</span>
                    </button>
                  </div>
                </div>
              )}

              {/* ---------------- ACTIVE RIDE WORKFLOW (LANDSCAPE) ---------------- */}
              {activeRideStep && activeRideData && (
                <div className="rounded-2xl border-2 border-slate-900 bg-white p-6 shadow-xl space-y-5 animate-slide-up">
                  {/* Active Header */}
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-full bg-emerald-500 animate-ping" />
                      <span className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                        Active Ride: {activeRideData.bookingRef}
                      </span>
                    </div>
                    <span className="font-black text-lg text-emerald-600">
                      ₹{activeRideData.estimatedEarnings}
                    </span>
                  </div>

                  {/* Wide Stylized Map from prompt */}
                  <div className="relative w-full h-64 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 flex flex-col justify-between p-5">
                    {/* Grid background */}
                    <div
                      className="absolute inset-0 opacity-15 pointer-events-none"
                      style={{
                        backgroundImage:
                          "radial-gradient(#94a3b8 1px, transparent 1px), radial-gradient(#94a3b8 1px, #0f172a 1px)",
                        backgroundSize: "24px 24px",
                      }}
                    />

                    {/* Polyline */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <path
                        d="M 120 0 Q 140 100 130 180 T 150 320"
                        stroke="#0284c7"
                        strokeWidth="12"
                        fill="none"
                        opacity="0.3"
                      />
                      <line
                        x1="80"
                        y1="60"
                        x2="480"
                        y2="190"
                        stroke="#10b981"
                        strokeWidth="4"
                        strokeDasharray="8 6"
                        className="animate-pulse"
                      />
                    </svg>

                    {/* Pickup Pin */}
                    <div className="relative z-10 flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                        📍
                      </div>
                      <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl">
                        <span className="text-[10px] text-emerald-400 font-bold block uppercase">
                          📍 PICKUP
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {activeRideData.pickup}
                        </span>
                      </div>
                    </div>

                    {/* Animated moving vehicle status */}
                    <div className="relative z-10 self-center bg-amber-500 text-slate-900 px-4 py-1.5 rounded-full text-xs font-bold shadow-lg flex items-center gap-2 animate-pulse">
                      <span>🚕</span>
                      <span>
                        {activeRideStep === "arrived"
                          ? "Arrived at Pickup"
                          : activeRideStep === "in_progress"
                          ? "En Route to Howrah (3 mins)"
                          : "Approaching Pickup (2 mins)"}
                      </span>
                    </div>

                    {/* Drop Pin */}
                    <div className="relative z-10 flex items-center gap-3 self-end">
                      <div className="bg-slate-900/90 border border-slate-700 px-3 py-1.5 rounded-xl text-right">
                        <span className="text-[10px] text-rose-400 font-bold block uppercase">
                          📍 DROP
                        </span>
                        <span className="text-xs font-semibold text-white">
                          {activeRideData.drop}
                        </span>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold text-sm shadow-md">
                        🏁
                      </div>
                    </div>
                  </div>

                  {/* Passenger Info & Call */}
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                    <div className="flex items-center gap-3.5">
                      <img
                        src={activeRideData.passengerAvatar}
                        alt={activeRideData.passengerName}
                        className="h-12 w-12 rounded-full object-cover border border-slate-300"
                      />
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {activeRideData.passengerName}
                        </div>
                        <div className="text-xs text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                          <span>{activeRideData.passengerRating} Rating</span>
                          <span>•</span>
                          <span>{activeRideData.distanceKm} km</span>
                        </div>
                      </div>
                    </div>

                    <a
                      href={`tel:${activeRideData.passengerPhone}`}
                      className="h-10 w-10 rounded-xl bg-slate-900 text-white flex items-center justify-center hover:bg-black transition shadow-xs"
                      title="Call Passenger"
                    >
                      <Phone className="h-4 w-4" />
                    </a>
                  </div>

                  {/* Workflow Progression: [ Arrived ] -> [ Start Ride ] -> [ Complete Ride ] */}
                  {activeRideStep === "accepted" && (
                    <button
                      onClick={handleDriverArrived}
                      className="w-full py-4 rounded-xl bg-slate-900 text-white text-sm font-bold hover:bg-black transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Navigation className="h-4 w-4 text-emerald-400" />
                      <span>Arrived at Pickup</span>
                    </button>
                  )}

                  {activeRideStep === "arrived" && (
                    <div className="space-y-3">
                      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div>
                          <span className="font-bold block">Enter Passenger 4-Digit OTP:</span>
                          <span className="text-[11px] text-slate-600">
                            Ask passenger for OTP displayed on their app. (OTP: {activeRideData.otp})
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            maxLength={4}
                            value={enteredOtp}
                            onChange={(e) => {
                              setEnteredOtp(e.target.value);
                              setOtpError(false);
                            }}
                            placeholder="e.g. 4892"
                            className="px-3 py-2 rounded-lg bg-white border border-amber-300 font-mono font-bold text-center text-sm tracking-widest text-slate-900 w-32 focus:outline-none"
                          />
                        </div>
                      </div>
                      {otpError && (
                        <p className="text-rose-600 text-xs font-semibold">
                          Incorrect OTP. Please enter {activeRideData.otp}.
                        </p>
                      )}

                      <button
                        onClick={handleStartRide}
                        className="w-full py-4 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Check className="h-4 w-4" />
                        <span>Start Ride</span>
                      </button>
                    </div>
                  )}

                  {activeRideStep === "in_progress" && (
                    <button
                      onClick={handleCompleteRide}
                      className="w-full py-4 rounded-xl bg-emerald-600 text-white text-sm font-bold hover:bg-emerald-700 transition shadow-md flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <CheckCircle className="h-4 w-4" />
                      <span>Complete Ride</span>
                    </button>
                  )}

                  {activeRideStep === "completed_summary" && (
                    <div className="text-center py-4 space-y-3 bg-emerald-50/50 p-6 rounded-2xl border border-emerald-100">
                      <div className="h-12 w-12 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
                        <CheckCircle className="h-7 w-7" />
                      </div>
                      <div>
                        <h4 className="text-lg font-bold text-slate-900">Ride Completed!</h4>
                        <p className="text-xs text-slate-600">
                          You earned{" "}
                          <strong className="text-emerald-700 text-base">
                            ₹{activeRideData.estimatedEarnings}
                          </strong>{" "}
                          for this trip. Auto-credited to today&apos;s earnings.
                        </p>
                      </div>
                      <button
                        onClick={handleFinishRideSummary}
                        className="px-6 py-3 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black transition"
                      >
                        Return to Duty
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Landscape Idle Map Container (When waiting for requests) */}
              {!incomingRequest && !activeRideStep && (
                <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-slate-100 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">
                        Kolkata Metro Live Dispatch Radar
                      </h3>
                      <p className="text-xs text-slate-500">
                        {driver.isOnline
                          ? "Scanning Park Street, Salt Lake & Howrah demand corridors..."
                          : "You are offline. Turn online on the left to receive ride dispatches."}
                      </p>
                    </div>
                    {driver.isOnline && (
                      <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-bold text-emerald-700">
                        <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
                        Radar Active
                      </span>
                    )}
                  </div>

                  {/* Wide Map Canvas */}
                  <div className="relative w-full h-80 bg-slate-900 flex items-center justify-center overflow-hidden">
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage:
                          "radial-gradient(#94a3b8 1px, transparent 1px), radial-gradient(#94a3b8 1px, #0f172a 1px)",
                        backgroundSize: "28px 28px",
                      }}
                    />

                    {/* River & Bridges SVG */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40">
                      <path
                        d="M 160 0 Q 190 120 170 200 T 210 360"
                        stroke="#38bdf8"
                        strokeWidth="16"
                        fill="none"
                      />
                      <text x="80" y="90" fill="#38bdf8" fontSize="11" fontWeight="bold">
                        Hooghly River
                      </text>
                      <text x="220" y="160" fill="#94a3b8" fontSize="11" fontWeight="bold">
                        Howrah
                      </text>
                      <text x="440" y="80" fill="#94a3b8" fontSize="11" fontWeight="bold">
                        Salt Lake IT Hub
                      </text>
                      <text x="360" y="240" fill="#94a3b8" fontSize="11" fontWeight="bold">
                        Park Street
                      </text>
                    </svg>

                    {/* Driver Current Location Marker */}
                    <div className="relative z-10 flex flex-col items-center">
                      <div className="h-10 w-10 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-base shadow-xl ring-4 ring-emerald-500/20 animate-bounce">
                        🚗
                      </div>
                      <span className="mt-1 px-3 py-0.5 rounded-full bg-slate-900/90 text-white text-[10px] font-bold border border-slate-700 shadow-sm">
                        You (Rahul Sharma)
                      </span>
                    </div>

                    {/* Demand Heatspots */}
                    <div className="absolute top-1/4 right-1/4 h-16 w-16 rounded-full bg-amber-500/20 border border-amber-400/40 animate-ping" />
                    <div className="absolute bottom-1/4 right-1/3 h-20 w-20 rounded-full bg-emerald-500/20 border border-emerald-400/40 animate-ping" />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ----------------- TAB 2: DRIVER EARNINGS (LANDSCAPE) ----------------- */}
        {activeTab === "earnings" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Driver Earnings & Settlement</h2>
                <p className="text-xs text-slate-500">
                  Transparent breakdown of gross fares, platform fee, and daily automated payouts.
                </p>
              </div>
              <button
                onClick={() => showToast("Instant Cashout initiated! ₹" + driver.earnings.today + " sent to your UPI.")}
                className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-black transition flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <Wallet className="h-4 w-4 text-emerald-400" />
                <span>Instant Cashout</span>
              </button>
            </div>

            {/* 3 Full-Width KPI Cards from prompt */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div className="p-5 rounded-2xl bg-emerald-50/70 border border-emerald-200">
                <span className="text-xs text-emerald-800 font-bold uppercase block">
                  Today&apos;s Earnings
                </span>
                <div className="text-3xl font-black text-emerald-900 mt-1">
                  ₹{driver.earnings.today.toLocaleString()}
                </div>
                <span className="text-xs text-emerald-700 font-semibold block mt-1">
                  {driver.earnings.todayRidesCount} rides completed
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-bold uppercase block">
                  This Week
                </span>
                <div className="text-3xl font-black text-slate-900 mt-1">
                  ₹{driver.earnings.thisWeek.toLocaleString()}
                </div>
                <span className="text-xs text-slate-500 font-medium block mt-1">
                  64 total trips
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <span className="text-xs text-slate-500 font-bold uppercase block">
                  This Month
                </span>
                <div className="text-3xl font-black text-slate-900 mt-1">
                  ₹{driver.earnings.thisMonth.toLocaleString()}
                </div>
                <span className="text-xs text-slate-500 font-medium block mt-1">
                  248 total trips
                </span>
              </div>
            </div>

            {/* Split Grid: Fare Breakdown & Payout Account */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Fare Breakdown Box from prompt */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
                <h3 className="font-bold text-slate-900 text-sm pb-2 border-b border-slate-100">
                  Today&apos;s Fare Breakdown
                </h3>

                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Completed Rides:</span>
                  <span className="font-bold text-slate-900">{driver.earnings.todayRidesCount} rides</span>
                </div>

                <div className="flex justify-between text-slate-600 text-sm">
                  <span>Gross Passenger Fares:</span>
                  <span className="font-bold text-slate-900">
                    ₹{driver.earnings.todayGross.toLocaleString()}
                  </span>
                </div>

                <div className="flex justify-between text-rose-600 text-sm">
                  <span>Platform Service Fee:</span>
                  <span className="font-bold">-₹{driver.earnings.todayPlatformFee.toLocaleString()}</span>
                </div>

                <div className="pt-3 border-t border-slate-200 flex justify-between text-base">
                  <span className="font-bold text-slate-900">Net Driver Earnings:</span>
                  <span className="font-black text-emerald-600">
                    ₹{driver.earnings.today.toLocaleString()}
                  </span>
                </div>
              </div>

              {/* Payout Details */}
              <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-slate-500" />
                    <span className="font-bold text-slate-900 text-sm">Bank & Payout Account</span>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full">
                    VERIFIED
                  </span>
                </div>

                <div className="space-y-2 text-slate-700 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Bank Name:</span>
                    <span className="font-bold text-slate-900">{driver.bankAccount.bankName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Account Number:</span>
                    <span className="font-mono font-bold text-slate-900">{driver.bankAccount.accountNumberMasked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">IFSC Code:</span>
                    <span className="font-mono font-bold text-slate-900">{driver.bankAccount.ifsc}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">UPI VPA:</span>
                    <span className="font-mono font-bold text-slate-900">{driver.bankAccount.upiId}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600">
                  Scheduled Auto-Payout: Daily at 11:59 PM via UPI instant bank settlement.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB 3: RIDE HISTORY (LANDSCAPE TABLE) ----------------- */}
        {activeTab === "history" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Today&apos;s Ride History</h2>
                <p className="text-xs text-slate-500">Chronological list of all completed trips.</p>
              </div>
              <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full">
                {driver.history.length} Trips Logged
              </span>
            </div>

            <div className="rounded-2xl bg-white border border-slate-200 shadow-xs overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3.5 px-5">Route (Pickup → Drop)</th>
                      <th className="py-3.5 px-5">Vehicle Type</th>
                      <th className="py-3.5 px-5">Distance & Duration</th>
                      <th className="py-3.5 px-5">Net Earnings</th>
                      <th className="py-3.5 px-5">Status</th>
                      <th className="py-3.5 px-5 text-right">Time</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {driver.history.map((ride) => (
                      <tr key={ride.id} className="hover:bg-slate-50/80 transition">
                        <td className="py-3.5 px-5">
                          <div className="font-bold text-slate-900 text-sm flex items-center gap-2">
                            <span>{ride.pickup}</span>
                            <ArrowRight className="h-3.5 w-3.5 text-slate-400" />
                            <span>{ride.drop}</span>
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">
                            Ref: {ride.bookingRef}
                          </span>
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700">
                            {ride.vehicleType}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-slate-600">
                          {ride.distanceKm} km • ~{ride.durationMins} mins
                        </td>
                        <td className="py-3.5 px-5 font-black text-emerald-600 text-sm">
                          ₹{ride.fare}
                        </td>
                        <td className="py-3.5 px-5">
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                            {ride.status}
                          </span>
                        </td>
                        <td className="py-3.5 px-5 text-right text-slate-500">
                          {ride.completedAt}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- TAB 4: DRIVER PROFILE (LANDSCAPE MULTI-COLUMN) ----------------- */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Driver Profile & Fleet Settings</h2>
                <p className="text-xs text-slate-500">Manage identity, assigned vehicle, and bank credentials.</p>
              </div>
              <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-3 py-1 rounded-full">
                ✓ Verified Partner
              </span>
            </div>

            {/* Profile Banner */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img
                  src={driver.avatar}
                  alt={driver.name}
                  className="h-16 w-16 rounded-2xl object-cover border border-slate-200 shadow-sm"
                />
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{driver.name}</h3>
                  <div className="text-xs text-slate-500">{driver.phone} • {driver.email}</div>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-amber-600 mt-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span>{driver.rating} Rating</span>
                    <span className="text-slate-400 font-normal">({driver.totalTrips} Total Trips)</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700 font-mono">
                  {driver.vehicle.registrationNumber}
                </span>
              </div>
            </div>

            {/* Landscape 3-Column Edit Form Grid */}
            <form onSubmit={handleSaveProfile} className="space-y-6 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1: Personal Details */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Personal Information
                  </h4>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      value={profileForm.name}
                      onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Phone Number</label>
                    <input
                      type="text"
                      value={profileForm.phone}
                      onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Email Address</label>
                    <input
                      type="email"
                      value={profileForm.email}
                      onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* Column 2: Vehicle & Registration */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Vehicle Specification
                  </h4>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Make & Model</label>
                    <input
                      type="text"
                      value={profileForm.vehicleModel}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, vehicleModel: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">
                      Registration Plate Number
                    </label>
                    <input
                      type="text"
                      value={profileForm.registrationNumber}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, registrationNumber: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-mono font-bold focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <span className="text-[10px] text-slate-400 font-medium block">
                      Category: {driver.vehicle.type} • Year: {driver.vehicle.year}
                    </span>
                  </div>
                </div>

                {/* Column 3: Bank & Verified Documents */}
                <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Bank Payout & Documents
                  </h4>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">Bank Name</label>
                    <input
                      type="text"
                      value={profileForm.bankName}
                      onChange={(e) =>
                        setProfileForm({ ...profileForm, bankName: e.target.value })
                      }
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-600 font-medium mb-1">UPI ID for Payout</label>
                    <input
                      type="text"
                      value={profileForm.upiId}
                      onChange={(e) => setProfileForm({ ...profileForm, upiId: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 font-semibold focus:bg-white focus:outline-none"
                    />
                  </div>

                  {/* Documents mini list */}
                  <div className="space-y-1.5 pt-2">
                    {driver.documents.map((doc) => (
                      <div
                        key={doc.name}
                        className="flex items-center justify-between text-[11px] p-2 rounded-lg bg-slate-50 border border-slate-100"
                      >
                        <span className="font-semibold text-slate-800 truncate max-w-[170px]">
                          {doc.name}
                        </span>
                        <span className="text-emerald-700 font-bold text-[10px]">✓ VERIFIED</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="text-right">
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-slate-900 text-white font-bold hover:bg-black transition text-xs shadow-md cursor-pointer"
                >
                  Save Profile Changes
                </button>
              </div>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
