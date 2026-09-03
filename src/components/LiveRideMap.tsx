"use client";

import React, { useState, useEffect } from "react";
import {
  Navigation,
  Layers,
  ZoomIn,
  ZoomOut,
  Crosshair,
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
  const [showTraffic, setShowTraffic] = useState(true);
  const [captainsCount, setCaptainsCount] = useState(24);

  // Subtle real-time fleet fluctuation
  useEffect(() => {
    const timer = setInterval(() => {
      setCaptainsCount((prev) => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.min(32, Math.max(18, prev + delta));
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-full min-h-[480px] lg:min-h-[640px] w-full overflow-hidden rounded-2xl border border-zinc-800/80 bg-[#090b10] shadow-xl">
      {/* Precision Cartographic Vector Canvas */}
      <svg
        viewBox="0 0 800 600"
        className="h-full w-full object-cover transition-transform duration-500 ease-out select-none"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <defs>
          {/* Subtle vignette */}
          <radialGradient id="cartoVignette" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#0e131d" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#07090e" stopOpacity="0.95" />
          </radialGradient>

          {/* Clean high-contrast route gradient */}
          <linearGradient id="execRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#10b981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>

          {/* Land use zone fill */}
          <pattern id="landGrid" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="#090c13" />
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#101522" strokeWidth="0.75" />
          </pattern>
        </defs>

        {/* Base Map Canvas */}
        <rect width="800" height="600" fill="url(#landGrid)" />

        {/* Urban District Blocks */}
        <rect x="70" y="40" width="180" height="120" rx="6" fill="#0d111a" stroke="#161c29" strokeWidth="1" />
        <rect x="290" y="30" width="220" height="140" rx="6" fill="#0d111a" stroke="#161c29" strokeWidth="1" />
        <rect x="540" y="60" width="210" height="120" rx="6" fill="#0d111a" stroke="#161c29" strokeWidth="1" />
        <rect x="50" y="210" width="160" height="170" rx="6" fill="#0d111a" stroke="#161c29" strokeWidth="1" />
        <rect x="250" y="220" width="260" height="160" rx="6" fill="#0d111a" stroke="#161c29" strokeWidth="1" />
        <rect x="550" y="230" width="200" height="150" rx="6" fill="#0d111a" stroke="#161c29" strokeWidth="1" />
        <rect x="80" y="430" width="200" height="130" rx="6" fill="#0d111a" stroke="#161c29" strokeWidth="1" />
        <rect x="330" y="430" width="220" height="130" rx="6" fill="#0d111a" stroke="#161c29" strokeWidth="1" />
        <rect x="590" y="420" width="170" height="140" rx="6" fill="#0d111a" stroke="#161c29" strokeWidth="1" />

        {/* Quiet Geographic Zones: Urban Parkland */}
        <path
          d="M 90,60 C 130,50 180,70 200,110 C 170,140 120,135 90,110 Z"
          fill="#061f18"
          stroke="#093126"
          strokeWidth="1"
          opacity="0.6"
        />
        <text x="110" y="95" fill="#0f513e" fontSize="9" fontWeight="600" letterSpacing="0.05em">
          CUBBON PARK
        </text>

        <path
          d="M 580,250 C 630,240 680,260 700,310 C 670,340 610,335 580,300 Z"
          fill="#061f18"
          stroke="#093126"
          strokeWidth="1"
          opacity="0.5"
        />
        <text x="600" y="285" fill="#0f513e" fontSize="9" fontWeight="600" letterSpacing="0.05em">
          DEFENCE ENCLAVE
        </text>

        {/* Quiet Water Reservoir */}
        <path
          d="M 0,330 C 120,335 180,390 300,380 C 440,370 520,430 800,410 L 800,435 C 520,455 430,395 290,405 C 170,415 110,360 0,355 Z"
          fill="#091624"
          stroke="#10253d"
          strokeWidth="1"
        />
        <text x="210" y="400" fill="#1b395e" fontSize="9" fontWeight="600" letterSpacing="0.05em">
          ULSOOR LAKE BASIN
        </text>

        {/* Secondary Street Grid Network */}
        <g stroke="#1a2333" strokeWidth="1.2" opacity="0.8">
          <line x1="80" y1="0" x2="80" y2="600" />
          <line x1="150" y1="0" x2="150" y2="600" />
          <line x1="230" y1="0" x2="230" y2="600" />
          <line x1="310" y1="0" x2="310" y2="600" />
          <line x1="390" y1="0" x2="390" y2="600" />
          <line x1="470" y1="0" x2="470" y2="600" />
          <line x1="550" y1="0" x2="550" y2="600" />
          <line x1="630" y1="0" x2="630" y2="600" />
          <line x1="710" y1="0" x2="710" y2="600" />

          <line x1="0" y1="60" x2="800" y2="60" />
          <line x1="0" y1="130" x2="800" y2="130" />
          <line x1="0" y1="200" x2="800" y2="200" />
          <line x1="0" y1="270" x2="800" y2="270" />
          <line x1="0" y1="340" x2="800" y2="340" />
          <line x1="0" y1="410" x2="800" y2="410" />
          <line x1="0" y1="480" x2="800" y2="480" />
          <line x1="0" y1="550" x2="800" y2="550" />
        </g>

        {/* Primary Arterial Expressways */}
        <g stroke="#26354a" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
          {/* North-South Expressway */}
          <path d="M 120,600 Q 250,460 360,320 T 670,0" fill="none" />
          {/* East-West Corridor */}
          <path d="M 0,140 Q 260,170 420,230 T 800,160" fill="none" />
          {/* Ring Flyover */}
          <path d="M 0,490 Q 300,470 540,320 T 800,440" fill="none" />
        </g>
        {/* Highway Casing overlay */}
        <g stroke="#3a4f6d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
          <path d="M 120,600 Q 250,460 360,320 T 670,0" fill="none" />
          <path d="M 0,140 Q 260,170 420,230 T 800,160" fill="none" />
          <path d="M 0,490 Q 300,470 540,320 T 800,440" fill="none" />
        </g>

        {/* Road Shield Labels */}
        <g fontSize="8" fontWeight="700" fill="#7d91ad">
          <text x="28" y="132">OLD AIRPORT RD</text>
          <text x="690" y="152">NH 44 AIRPORT EXPWY</text>
          <text x="24" y="482">OUTER RING ROAD</text>
          <text x="490" y="275" transform="rotate(-36 490 275)">INNER RING ROAD</text>
        </g>

        {/* Real-time Traffic Overlay */}
        {showTraffic && (
          <g strokeLinecap="round" opacity="0.85">
            {/* Flowing Traffic (Green) */}
            <path d="M 150,200 L 310,200" stroke="#10b981" strokeWidth="2.5" />
            <path d="M 470,60 L 630,60" stroke="#10b981" strokeWidth="2.5" />
            <path d="M 230,340 L 230,480" stroke="#10b981" strokeWidth="2.5" />
            <path d="M 390,340 L 390,440" stroke="#10b981" strokeWidth="2.5" />
            <path d="M 550,480 L 710,480" stroke="#10b981" strokeWidth="2.5" />

            {/* Moderate Flow (Amber) */}
            <path d="M 310,200 L 440,200" stroke="#f59e0b" strokeWidth="2.5" />
            <path d="M 390,130 L 390,270" stroke="#f59e0b" strokeWidth="2.5" />

            {/* Congested Bottleneck (Subdued Red) */}
            <path d="M 440,200 L 520,200" stroke="#ef4444" strokeWidth="3" />
          </g>
        )}

        {/* ACTIVE NAVIGATION ROUTE: Pickup (190, 420) -> Drop (620, 160) */}
        {/* Soft precision casing */}
        <path
          d="M 190,425 Q 260,330 380,290 T 620,165"
          fill="none"
          stroke="#059669"
          strokeWidth="8"
          opacity="0.35"
          strokeLinecap="round"
        />
        {/* Solid Route Line */}
        <path
          d="M 190,425 Q 260,330 380,290 T 620,165"
          fill="none"
          stroke="url(#execRouteGradient)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        {/* Animated Directional Flow Markers */}
        <path
          d="M 190,425 Q 260,330 380,290 T 620,165"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-route-flow"
          opacity="0.75"
        />

        {/* NEARBY VERIFIED FLEET (Realistic top-down markers) */}
        {/* Fleet 1: Executive Sedan */}
        <g transform="translate(340, 310)" className="cursor-pointer">
          <circle r="13" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <rect x="-4" y="-7" width="8" height="14" rx="2" fill="#10b981" />
          <rect x="-3" y="-3" width="6" height="6" rx="1" fill="#09090b" />
          {/* Driver Tag */}
          <g transform="translate(18, -8)">
            <rect width="64" height="18" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
            <text x="6" y="12" fill="#e4e4e7" fontSize="8.5" fontWeight="600">Sedan 4.9★</text>
          </g>
        </g>

        {/* Fleet 2: Bike Taxi */}
        <g transform="translate(230, 380)">
          <circle r="12" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <rect x="-2" y="-6" width="4" height="12" rx="1.5" fill="#f59e0b" />
          <circle cx="0" cy="0" r="1.5" fill="#09090b" />
          <g transform="translate(16, -6)">
            <rect width="52" height="16" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
            <text x="6" y="11" fill="#e4e4e7" fontSize="8" fontWeight="600">Bike 2m</text>
          </g>
        </g>

        {/* Fleet 3: Auto Rickshaw */}
        <g transform="translate(140, 460)">
          <circle r="13" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <path d="M -4,5 L 0,-6 L 4,5 Z" fill="#10b981" />
          <g transform="translate(16, -6)">
            <rect width="52" height="16" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
            <text x="6" y="11" fill="#e4e4e7" fontSize="8" fontWeight="600">Auto 3m</text>
          </g>
        </g>

        {/* Fleet 4: Nex Electric EV */}
        <g transform="translate(480, 240)">
          <circle r="13" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <rect x="-4" y="-7" width="8" height="14" rx="2" fill="#14b8a6" />
          <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
          <g transform="translate(18, -8)">
            <rect width="56" height="18" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
            <text x="6" y="12" fill="#14b8a6" fontSize="8.5" fontWeight="600">EV Quiet</text>
          </g>
        </g>

        {/* Fleet 5: Premier SUV */}
        <g transform="translate(560, 220)">
          <circle r="14" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
          <rect x="-5" y="-8" width="10" height="16" rx="2" fill="#71717a" />
          <rect x="-3" y="-3" width="6" height="7" rx="1" fill="#09090b" />
          <g transform="translate(18, -8)">
            <rect width="58" height="18" rx="4" fill="#18181b" stroke="#27272a" strokeWidth="1" />
            <text x="6" y="12" fill="#e4e4e7" fontSize="8.5" fontWeight="600">SUV 6-Seat</text>
          </g>
        </g>

        {/* ORIGIN PICKUP PIN (190, 425) */}
        <g transform="translate(190, 425)">
          {/* Subtle radar circle */}
          <circle r="18" fill="#10b981" fillOpacity="0.15" />
          <circle r="9" fill="#09090b" stroke="#10b981" strokeWidth="3" />
          <circle r="3.5" fill="#10b981" />

          {/* Clean Origin Callout Card */}
          <g transform="translate(16, -26)">
            <rect
              width="142"
              height="34"
              rx="6"
              fill="#09090b"
              stroke="#27272a"
              strokeWidth="1.2"
              filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))"
            />
            <circle cx="12" cy="17" r="3" fill="#10b981" />
            <text x="20" y="15" fill="#a1a1aa" fontSize="8" fontWeight="700" letterSpacing="0.06em">
              PICKUP LOCATION
            </text>
            <text x="20" y="27" fill="#f4f4f5" fontSize="9.5" fontWeight="600">
              Pickup in ~{etaMinutes > 5 ? 3 : 2} mins
            </text>
          </g>
        </g>

        {/* DESTINATION PIN (620, 165) */}
        <g transform="translate(620, 165)">
          <circle r="18" fill="#f4f4f5" fillOpacity="0.1" />
          <circle r="8" fill="#09090b" stroke="#f4f4f5" strokeWidth="3" />
          <rect x="-2" y="-2" width="4" height="4" fill="#f4f4f5" />

          {/* Destination Callout Card */}
          <g transform="translate(-154, -28)">
            <rect
              width="144"
              height="34"
              rx="6"
              fill="#09090b"
              stroke="#27272a"
              strokeWidth="1.2"
              filter="drop-shadow(0 4px 6px rgba(0, 0, 0, 0.4))"
            />
            <rect x="9" y="14" width="6" height="6" fill="#f4f4f5" />
            <text x="20" y="15" fill="#a1a1aa" fontSize="8" fontWeight="700" letterSpacing="0.06em">
              DESTINATION
            </text>
            <text x="20" y="27" fill="#f4f4f5" fontSize="9.5" fontWeight="600">
              Est. Arrival {etaMinutes} mins
            </text>
          </g>
        </g>

        {/* Waypoint Telemetry Tag along route */}
        <g transform="translate(370, 245)">
          <rect
            width="106"
            height="26"
            rx="13"
            fill="#09090b"
            stroke="#27272a"
            strokeWidth="1.2"
            filter="drop-shadow(0 2px 4px rgba(0, 0, 0, 0.5))"
          />
          <text x="14" y="17" fill="#f4f4f5" fontSize="10" fontWeight="600">
            {distanceKm} km • {etaMinutes} min
          </text>
        </g>

        {/* Vignette Boundary */}
        <rect width="800" height="600" fill="url(#cartoVignette)" pointerEvents="none" />
      </svg>

      {/* TOP FLOATING HUD: Clean Route Summary */}
      <div className="absolute top-4 left-4 right-4 sm:right-auto z-20 max-w-sm rounded-xl bg-zinc-950/90 p-3.5 backdrop-blur-md border border-zinc-800 shadow-xl">
        <div className="flex items-center justify-between gap-3 border-b border-zinc-800/80 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-semibold text-zinc-200">
              Live Transit Telemetry
            </span>
          </div>
          <span className="rounded-md bg-zinc-900 px-2 py-0.5 text-[11px] font-medium text-zinc-300 border border-zinc-800">
            {captainsCount} Captains Active
          </span>
        </div>

        <div className="mt-2.5 space-y-1.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0"></div>
            <span className="text-zinc-400 font-medium">From:</span>
            <span className="text-zinc-100 font-medium truncate">{pickupLocation}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1.5 w-1.5 rounded-sm bg-zinc-300 shrink-0"></div>
            <span className="text-zinc-400 font-medium">To:</span>
            <span className="text-zinc-100 font-medium truncate">{dropLocation}</span>
          </div>
        </div>
      </div>

      {/* BOTTOM-LEFT: Selected Tier Card */}
      <div className="absolute bottom-4 left-4 z-20 hidden sm:flex items-center gap-3 rounded-xl bg-zinc-950/90 px-3.5 py-2.5 backdrop-blur-md border border-zinc-800 shadow-lg">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 border border-zinc-800 text-emerald-400">
          <Navigation className="h-4 w-4" />
        </div>
        <div>
          <div className="text-[10px] uppercase font-semibold tracking-wider text-zinc-400">
            Active Selection
          </div>
          <div className="text-xs font-semibold text-zinc-100 flex items-center gap-2">
            {selectedVehicleName}
            <span className="text-emerald-400 font-medium">• Pickup in ~{etaMinutes > 5 ? 3 : 2} min</span>
          </div>
        </div>
      </div>

      {/* RIGHT CONTROLS: Traffic Layer, Zoom, Recenter */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-1.5">
        <button
          onClick={() => setShowTraffic(!showTraffic)}
          className={`flex h-8 w-8 items-center justify-center rounded-lg border backdrop-blur-md transition shadow-md ${
            showTraffic
              ? "bg-zinc-100 text-zinc-950 border-zinc-200 font-semibold"
              : "bg-zinc-900/90 text-zinc-400 border-zinc-800 hover:text-zinc-200 hover:bg-zinc-800"
          }`}
          title="Toggle Traffic Conditions"
        >
          <Layers className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel((prev) => Math.min(1.3, prev + 0.1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 backdrop-blur-md shadow-md transition"
          title="Zoom In"
        >
          <ZoomIn className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel((prev) => Math.max(0.9, prev - 0.1))}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 backdrop-blur-md shadow-md transition"
          title="Zoom Out"
        >
          <ZoomOut className="h-3.5 w-3.5" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-800 bg-zinc-900/90 text-zinc-300 hover:text-white hover:bg-zinc-800 backdrop-blur-md shadow-md transition"
          title="Recenter Map"
        >
          <Crosshair className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
