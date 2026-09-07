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
    <div className="relative h-full min-h-[480px] lg:min-h-[640px] w-full overflow-hidden rounded-2xl border border-gray-200 bg-[#EEF2F7] shadow-sm">
      {/* SVG Map Canvas */}
      <svg
        viewBox="0 0 800 600"
        className="h-full w-full object-cover transition-transform duration-500 ease-out select-none"
        style={{ transform: `scale(${zoomLevel})` }}
      >
        <defs>
          <radialGradient id="cartoVignette" cx="50%" cy="50%" r="65%">
            <stop offset="0%" stopColor="#EEF2F7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#dde4ee" stopOpacity="0.4" />
          </radialGradient>
          <linearGradient id="execRouteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#111111" />
            <stop offset="100%" stopColor="#333333" />
          </linearGradient>
          <filter id="softGlow">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Base Map Canvas */}
        <rect width="800" height="600" fill="#EEF2F7" />

        {/* Grid Streets */}
        {[100, 160, 220, 280, 340, 400, 460, 520].map((y) => (
          <line key={`h-${y}`} x1="0" y1={y} x2="800" y2={y} stroke="#dde4ee" strokeWidth="1" />
        ))}
        {[120, 200, 280, 360, 440, 520, 600, 680].map((x) => (
          <line key={`v-${x}`} x1={x} y1="0" x2={x} y2="600" stroke="#dde4ee" strokeWidth="1" />
        ))}

        {/* Major Roads */}
        <line x1="0" y1="300" x2="800" y2="300" stroke="#c8d0dc" strokeWidth="4" />
        <line x1="400" y1="0" x2="400" y2="600" stroke="#c8d0dc" strokeWidth="4" />
        <line x1="0" y1="180" x2="800" y2="180" stroke="#c8d0dc" strokeWidth="3" />
        <line x1="0" y1="420" x2="800" y2="420" stroke="#c8d0dc" strokeWidth="3" />
        <line x1="200" y1="0" x2="200" y2="600" stroke="#c8d0dc" strokeWidth="3" />
        <line x1="600" y1="0" x2="600" y2="600" stroke="#c8d0dc" strokeWidth="3" />

        {/* Diagonal arterials */}
        <line x1="80" y1="100" x2="720" y2="500" stroke="#c8d0dc" strokeWidth="2.5" />
        <line x1="100" y1="500" x2="700" y2="100" stroke="#c8d0dc" strokeWidth="2.5" />

        {/* Green zones (parks) */}
        <rect x="50" y="350" width="100" height="70" rx="8" fill="#d1e7dd" />
        <rect x="550" y="120" width="120" height="80" rx="8" fill="#d1e7dd" />
        <rect x="300" y="430" width="90" height="60" rx="8" fill="#d1e7dd" />
        <circle cx="650" cy="400" r="35" fill="#d1e7dd" />

        {/* Water body */}
        <path d="M 620 480 Q 700 460 780 500 Q 800 540 780 580 L 620 600 Z" fill="#bfdbfe" opacity="0.5" />

        {/* Traffic overlay */}
        {showTraffic && (
          <g opacity="0.25">
            <line x1="200" y1="180" x2="400" y2="180" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" />
            <line x1="400" y1="300" x2="600" y2="300" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />
            <line x1="200" y1="300" x2="200" y2="420" stroke="#f59e0b" strokeWidth="4" strokeLinecap="round" />
          </g>
        )}

        {/* Route Polyline — Solid black (Uber-style) */}
        <path
          d="M 210 200 C 250 200 280 230 300 260 S 350 310 400 320 S 480 310 520 330 S 580 370 610 390"
          fill="none"
          stroke="#111111"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Animated dashed overlay */}
        <path
          d="M 210 200 C 250 200 280 230 300 260 S 350 310 400 320 S 480 310 520 330 S 580 370 610 390"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          className="animate-route-flow"
          opacity="0.6"
        />

        {/* Nearby vehicles */}
        {[
          { x: 260, y: 240, r: 12 }, { x: 350, y: 180, r: 15 }, { x: 450, y: 350, r: 20 },
          { x: 520, y: 250, r: 18 }, { x: 170, y: 320, r: 14 }, { x: 380, y: 440, r: 16 },
        ].map((car, i) => (
          <g key={`car-${i}`} opacity={0.4 + i * 0.08}>
            <circle cx={car.x} cy={car.y} r="4" fill="#111111" />
          </g>
        ))}

        {/* ORIGIN PIN — Green dot with white card */}
        <g>
          <circle cx="210" cy="200" r="8" fill="#10b981" />
          <circle cx="210" cy="200" r="4" fill="white" />
          <rect x="140" y="165" width="140" height="26" rx="13" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <text x="155" y="183" fontSize="10" fontWeight="600" fill="#0f172a" fontFamily="Inter, sans-serif">
            {pickupLocation.length > 18 ? pickupLocation.slice(0, 18) + "…" : pickupLocation}
          </text>
        </g>

        {/* DESTINATION PIN — Black square with white card */}
        <g>
          <rect x="604" y="384" width="12" height="12" rx="2" fill="#111111" />
          <rect x="540" y="355" width="140" height="26" rx="13" fill="white" stroke="#e2e8f0" strokeWidth="1" />
          <text x="555" y="373" fontSize="10" fontWeight="600" fill="#0f172a" fontFamily="Inter, sans-serif">
            {dropLocation.length > 18 ? dropLocation.slice(0, 18) + "…" : dropLocation}
          </text>
        </g>
      </svg>

      {/* Route Info Banner */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <div className="flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm border border-gray-100">
          <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-dot"></div>
          <span className="text-sm font-semibold text-slate-900">{distanceKm} km</span>
          <span className="text-slate-300">•</span>
          <span className="text-sm text-slate-600">~{etaMinutes} min</span>
        </div>
        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm border border-gray-100">
          <span className="text-xs font-medium text-slate-500">{captainsCount} drivers nearby</span>
        </div>
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 bottom-4 flex flex-col gap-1.5">
        <button
          onClick={() => setZoomLevel((z) => Math.min(1.5, z + 0.1))}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm text-slate-600 hover:bg-gray-50 transition"
        >
          <ZoomIn className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoomLevel((z) => Math.max(0.7, z - 0.1))}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm text-slate-600 hover:bg-gray-50 transition"
        >
          <ZoomOut className="h-4 w-4" />
        </button>
        <button
          onClick={() => setZoomLevel(1)}
          className="flex h-9 w-9 items-center justify-center rounded-lg bg-white border border-gray-200 shadow-sm text-slate-600 hover:bg-gray-50 transition"
        >
          <Crosshair className="h-4 w-4" />
        </button>
        <button
          onClick={() => setShowTraffic(!showTraffic)}
          className={`flex h-9 w-9 items-center justify-center rounded-lg border shadow-sm transition ${
            showTraffic ? "bg-slate-900 text-white border-slate-900" : "bg-white text-slate-600 border-gray-200 hover:bg-gray-50"
          }`}
        >
          <Layers className="h-4 w-4" />
        </button>
      </div>

      {/* Vehicle tag */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm border border-gray-100">
        <div className="flex items-center gap-2">
          <Navigation className="h-3.5 w-3.5 text-slate-500" />
          <span className="text-xs font-medium text-slate-700">{selectedVehicleName}</span>
        </div>
      </div>
    </div>
  );
};
