"use client";

import React, { useState, useEffect } from "react";
import {
  Navigation,
  MapPin,
  Layers,
  ZoomIn,
  ZoomOut,
  Crosshair,
  Compass,
  Radio,
  Car,
  Bike,
  Zap,
} from "lucide-react";

interface LiveRideMapProps {
  pickupLocation: string;
  dropLocation: string;
  distanceKm: number;
  etaMinutes: number;
  selectedVehicleName: string;
}

export const LiveRideMap: React.FC<LiveRideMapProps> = ({
  pickupLocation,
  dropLocation,
  distanceKm,
  etaMinutes,
  selectedVehicleName,
}) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [trafficMode, setTrafficMode] = useState<"normal" | "live">("live");
  const [nearbyDriversCount, setNearbyDriversCount] = useState(18);

  // Periodic driver count fluctuation to give live simulation feel
  useEffect(() => {
    const interval = setInterval(() => {
      setNearbyDriversCount((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.min(28, Math.max(12, prev + delta));
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full min-h-[460px] lg:min-h-[580px] w-full overflow-hidden rounded-2xl border border-slate-800 bg-[#0a0f1d] shadow-2xl">
      {/* Dynamic SVG Vector Map */}
      <svg
        viewBox="0 0 800 600"
        className="h-full w-full object-cover transition-transform duration-500 ease-out"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <defs>
          {/* Radial gradient for map lighting */}
          <radialGradient id="mapGlow" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#1e293b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#0a0f1d" stopOpacity="0.9" />
          </radialGradient>

          {/* Glowing filter for route line */}
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          {/* Linear gradient for route polyline */}
          <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="60%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Water body pattern */}
          <linearGradient id="waterGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0f2b48" />
            <stop offset="100%" stopColor="#081726" />
          </linearGradient>
        </defs>

        {/* Map Background */}
        <rect width="800" height="600" fill="#080e1a" />
        <rect width="800" height="600" fill="url(#mapGlow)" />

        {/* City Parks / Green zones */}
        <path
          d="M 60,80 Q 140,50 200,110 T 260,220 Q 180,260 110,210 Z"
          fill="#064e3b"
          opacity="0.3"
        />
        <path
          d="M 520,380 Q 640,350 720,410 T 760,540 Q 660,570 560,510 Z"
          fill="#064e3b"
          opacity="0.25"
        />
        <path
          d="M 380,40 Q 480,20 540,80 T 520,170 Q 430,160 360,110 Z"
          fill="#064e3b"
          opacity="0.2"
        />

        {/* Water Lake / River */}
        <path
          d="M 0,280 C 150,290 220,380 340,360 C 460,340 550,420 800,390 L 800,430 C 550,460 450,380 330,400 C 210,420 140,330 0,320 Z"
          fill="url(#waterGradient)"
          opacity="0.8"
        />

        {/* Secondary Street Grid Network */}
        <g stroke="#1e293b" strokeWidth="1.5" opacity="0.65">
          {/* Vertical streets */}
          <line x1="80" y1="0" x2="80" y2="600" />
          <line x1="150" y1="0" x2="150" y2="600" />
          <line x1="220" y1="0" x2="220" y2="600" />
          <line x1="300" y1="0" x2="300" y2="600" />
          <line x1="380" y1="0" x2="380" y2="600" />
          <line x1="460" y1="0" x2="460" y2="600" />
          <line x1="530" y1="0" x2="530" y2="600" />
          <line x1="610" y1="0" x2="610" y2="600" />
          <line x1="690" y1="0" x2="690" y2="600" />
          <line x1="750" y1="0" x2="750" y2="600" />

          {/* Horizontal streets */}
          <line x1="0" y1="70" x2="800" y2="70" />
          <line x1="0" y1="140" x2="800" y2="140" />
          <line x1="0" y1="210" x2="800" y2="210" />
          <line x1="0" y1="280" x2="800" y2="280" />
          <line x1="0" y1="350" x2="800" y2="350" />
          <line x1="0" y1="420" x2="800" y2="420" />
          <line x1="0" y1="490" x2="800" y2="490" />
          <line x1="0" y1="550" x2="800" y2="550" />
        </g>

        {/* Primary Arterial Expressways / Ring Roads */}
        <g stroke="#334155" strokeWidth="4" strokeLinecap="round" opacity="0.9">
          <path d="M 0,110 Q 240,160 400,240 T 800,180" fill="none" />
          <path d="M 120,600 Q 280,450 380,310 T 680,0" fill="none" />
          <path d="M 0,520 Q 320,490 560,340 T 800,480" fill="none" />
        </g>

        {/* Outer Ring Road High-speed Flyover */}
        <path
          d="M 50,40 C 250,90 550,90 740,320 C 800,400 680,560 420,540 C 220,520 80,410 50,40 Z"
          fill="none"
          stroke="#475569"
          strokeWidth="6"
          opacity="0.4"
        />

        {/* Traffic Density Indicators (Live overlay) */}
        {trafficMode === "live" && (
          <g opacity="0.7">
            {/* Green smooth traffic segments */}
            <path d="M 150,210 L 300,210" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 460,70 L 610,70" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 220,350 L 220,490" stroke="#10b981" strokeWidth="3.5" strokeLinecap="round" />

            {/* Orange moderate traffic */}
            <path d="M 300,210 L 460,210" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />
            <path d="M 380,140 L 380,280" stroke="#f59e0b" strokeWidth="3.5" strokeLinecap="round" />

            {/* Red heavy peak traffic spots */}
            <path d="M 460,210 L 530,210" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {/* ACTIVE TRIP ROUTE: Smooth Bezier from Pickup (180, 420) to Drop (620, 160) */}
        {/* Glow halo */}
        <path
          d="M 190,430 Q 260,320 380,290 T 630,160"
          fill="none"
          stroke="#00d26a"
          strokeWidth="10"
          opacity="0.25"
          filter="url(#glow)"
        />
        {/* Base line */}
        <path
          d="M 190,430 Q 260,320 380,290 T 630,160"
          fill="none"
          stroke="url(#routeGradient)"
          strokeWidth="5"
          strokeLinecap="round"
        />
        {/* Animated flow dots */}
        <path
          d="M 190,430 Q 260,320 380,290 T 630,160"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          className="animate-dash-route"
          strokeLinecap="round"
          opacity="0.9"
        />

        {/* NEARBY DRIVERS (Animated Roaming Icons) */}
        {/* Driver 1: Rapido Bike near pickup */}
        <g transform="translate(230, 390)" className="animate-vehicle">
          <circle r="14" fill="#ffc107" fillOpacity="0.2" />
          <circle r="8" fill="#ffc107" />
          <path
            d="M -3,-3 L 3,0 L -3,3 Z"
            fill="#000000"
            transform="rotate(45)"
          />
        </g>

        {/* Driver 2: Auto Rickshaw */}
        <g transform="translate(150, 470)" className="animate-vehicle">
          <circle r="15" fill="#10b981" fillOpacity="0.2" />
          <circle r="9" fill="#10b981" />
          <rect x="-4" y="-4" width="8" height="8" rx="2" fill="#ffffff" />
        </g>

        {/* Driver 3: Uber Cab */}
        <g transform="translate(340, 310)" className="animate-vehicle">
          <circle r="16" fill="#38bdf8" fillOpacity="0.2" />
          <circle r="10" fill="#0284c7" />
          <rect x="-5" y="-3" width="10" height="6" rx="2" fill="#ffffff" />
        </g>

        {/* Driver 4: Ola Electric EV */}
        <g transform="translate(480, 240)" className="animate-vehicle">
          <circle r="16" fill="#2dd4bf" fillOpacity="0.25" />
          <circle r="9" fill="#14b8a6" />
          <circle r="3" fill="#ffffff" />
        </g>

        {/* Driver 5: Prime SUV near destination */}
        <g transform="translate(580, 210)" className="animate-vehicle">
          <circle r="16" fill="#a855f7" fillOpacity="0.2" />
          <circle r="9" fill="#9333ea" />
          <rect x="-5" y="-4" width="10" height="8" rx="2" fill="#ffffff" />
        </g>

        {/* PICKUP POINT PIN (190, 430) */}
        <g transform="translate(190, 430)">
          {/* Pulsing beacon circles */}
          <circle r="22" fill="#10b981" opacity="0.3" className="animate-ping" />
          <circle r="14" fill="#10b981" opacity="0.5" />
          <circle r="9" fill="#047857" stroke="#ffffff" strokeWidth="2.5" />

          {/* Pickup Label Callout */}
          <g transform="translate(16, -24)">
            <rect
              width="135"
              height="36"
              rx="8"
              fill="#0f172a"
              stroke="#10b981"
              strokeWidth="1.5"
              filter="url(#glow)"
            />
            <circle cx="14" cy="18" r="4" fill="#10b981" />
            <text x="24" y="16" fill="#10b981" fontSize="10" fontWeight="bold">
              PICKUP POINT
            </text>
            <text x="24" y="28" fill="#cbd5e1" fontSize="9" fontWeight="medium">
              3 mins away • Ready
            </text>
          </g>
        </g>

        {/* DROP-OFF POINT PIN (630, 160) */}
        <g transform="translate(630, 160)">
          {/* Target circle */}
          <circle r="14" fill="#ef4444" opacity="0.3" />
          <circle r="9" fill="#dc2626" stroke="#ffffff" strokeWidth="2.5" />

          {/* Destination Pin Flag */}
          <path
            d="M 0,0 L 0,-24 L 14,-18 L 0,-12 Z"
            fill="#ef4444"
            stroke="#ffffff"
            strokeWidth="1"
          />

          {/* Drop-off Label Callout */}
          <g transform="translate(-145, -34)">
            <rect
              width="135"
              height="36"
              rx="8"
              fill="#0f172a"
              stroke="#ef4444"
              strokeWidth="1.5"
            />
            <text x="12" y="16" fill="#f87171" fontSize="10" fontWeight="bold">
              DROP DESTINATION
            </text>
            <text x="12" y="28" fill="#cbd5e1" fontSize="9" fontWeight="medium">
              Est. Arrival {etaMinutes} mins
            </text>
          </g>
        </g>

        {/* Live Route Navigation Badge in the middle of the route */}
        <g transform="translate(360, 240)">
          <rect
            width="120"
            height="32"
            rx="16"
            fill="#020617"
            stroke="#38bdf8"
            strokeWidth="1.5"
            filter="url(#glow)"
          />
          <text x="16" y="20" fill="#38bdf8" fontSize="11" fontWeight="bold">
            ⚡ {distanceKm} km • {etaMinutes} min
          </text>
        </g>
      </svg>

      {/* TOP OVERLAY: Route & Location HUD */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto z-20 max-w-md rounded-xl bg-slate-950/85 p-3 backdrop-blur-md border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-slate-800/80 pb-2">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-slate-200">
              Live Route Simulator
            </span>
          </div>
          <span className="rounded-full bg-slate-800/90 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            {nearbyDriversCount} Captains Nearby
          </span>
        </div>

        <div className="mt-2 space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-emerald-400"></div>
            <span className="text-slate-400 truncate font-medium">From:</span>
            <span className="text-white font-medium truncate">{pickupLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-sm bg-rose-400"></div>
            <span className="text-slate-400 truncate font-medium">To:</span>
            <span className="text-white font-medium truncate">{dropLocation}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM-LEFT: Vehicle Status Pill */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-2 rounded-xl bg-slate-950/85 px-3 py-2 backdrop-blur-md border border-slate-800 shadow-lg">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400">
          <Navigation className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
            Selected Tier
          </div>
          <div className="text-xs font-bold text-white flex items-center gap-1.5">
            {selectedVehicleName}
            <span className="text-emerald-400">• Arriving in ~{etaMinutes}m</span>
          </div>
        </div>
      </div>

      {/* RIGHT CONTROLS: Zoom, Traffic Layer, Center */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        <button
          onClick={() => setTrafficMode(trafficMode === "live" ? "normal" : "live")}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border backdrop-blur-md transition shadow-md ${
            trafficMode === "live"
              ? "bg-emerald-500 text-slate-950 border-emerald-400 font-bold"
              : "bg-slate-900/90 text-slate-300 border-slate-700 hover:text-white"
          }`}
          title="Toggle Live Traffic Heatmap"
        >
          <Layers className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoomLevel((prev) => Math.min(1.4, prev + 0.1))}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/90 text-slate-300 hover:text-white backdrop-blur-md shadow-md transition"
          title="Zoom In"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoomLevel((prev) => Math.max(0.9, prev - 0.1))}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/90 text-slate-300 hover:text-white backdrop-blur-md shadow-md transition"
          title="Zoom Out"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-700 bg-slate-900/90 text-slate-300 hover:text-white backdrop-blur-md shadow-md transition"
          title="Reset View"
        >
          <Crosshair className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};
