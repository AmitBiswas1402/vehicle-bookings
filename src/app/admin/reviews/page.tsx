"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Star,
  AlertTriangle,
  ShieldAlert,
  CheckCircle,
  XCircle,
  Trash2,
  Phone,
  User,
  Car,
  Eye,
  ArrowRight,
  MessageSquare,
  AlertCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";
import {
  INITIAL_REVIEWS,
  INITIAL_COMPLAINTS,
  ModerationReview,
  ModerationComplaint,
} from "@/db/adminData";

export default function AdminReviewsComplaints() {
  const [activeTab, setActiveTab] = useState<"reviews" | "complaints" | "reports">("complaints");
  const [reviews, setReviews] = useState<ModerationReview[]>(INITIAL_REVIEWS);
  const [complaints, setComplaints] = useState<ModerationComplaint[]>(INITIAL_COMPLAINTS);
  const [selectedComplaint, setSelectedComplaint] = useState<ModerationComplaint | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleRemoveReview = (reviewId: string) => {
    if (confirm("Remove this inappropriate review from public display?")) {
      setReviews((prev) => prev.filter((r) => r.id !== reviewId));
      showToast("Review removed from public platform.");
    }
  };

  const handleUpdateComplaintStatus = (
    id: string,
    newStatus: "resolved" | "dismissed" | "investigating"
  ) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
    if (selectedComplaint?.id === id) {
      setSelectedComplaint((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
    showToast(`Complaint ticket #${id} marked as ${newStatus.toUpperCase()}`);
  };

  return (
    <div className="space-y-6 animate-fade-in relative">
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
              Reviews & Incident Dispute Moderation
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
              Safety & Compliance
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Investigate customer grievances, side-by-side driver & rider audit, review moderation, and disciplinary actions.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 pb-1 border-b border-slate-200">
        <button
          onClick={() => setActiveTab("complaints")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition cursor-pointer ${
            activeTab === "complaints"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
          <span>Complaints & Disputes</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-rose-500 text-white">
            {complaints.filter((c) => c.status !== "resolved").length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("reviews")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition cursor-pointer ${
            activeTab === "reviews"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Star className="h-3.5 w-3.5 text-amber-500" />
          <span>Customer Reviews</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-slate-200 text-slate-700">
            {reviews.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab("reports")}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition cursor-pointer ${
            activeTab === "reports"
              ? "bg-slate-900 text-white shadow-xs"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <ShieldAlert className="h-3.5 w-3.5 text-purple-500" />
          <span>Safety Reports</span>
          <span className="text-[10px] px-1.5 py-0.2 rounded-full font-bold bg-slate-200 text-slate-700">
            2
          </span>
        </button>
      </div>

      {/* COMPLAINTS TAB */}
      {activeTab === "complaints" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {complaints.map((c) => (
              <div
                key={c.id}
                className="rounded-2xl bg-white border border-slate-200/80 shadow-xs hover:border-slate-300 transition p-5 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {c.complaintRef}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        c.priority === "critical"
                          ? "bg-red-100 text-red-800"
                          : c.priority === "high"
                          ? "bg-rose-100 text-rose-800"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {c.priority.toUpperCase()} PRIORITY
                    </span>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      c.status === "resolved"
                        ? "bg-emerald-100 text-emerald-800"
                        : c.status === "investigating"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {c.status.toUpperCase()}
                  </span>
                </div>

                {/* Complainant & Against */}
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      Complainant ({c.complainantType})
                    </span>
                    <span className="font-bold text-slate-900">{c.complainantName}</span>
                    <span className="text-slate-500 block text-[11px]">{c.complainantPhone}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">
                      Accused ({c.againstRole})
                    </span>
                    <span className="font-bold text-slate-900">{c.againstName}</span>
                    <span className="text-slate-500 block text-[11px]">Ref: {c.bookingRef}</span>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <div className="text-xs font-bold text-slate-900 mb-1 flex items-center gap-1.5">
                    <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
                    <span>Incident: {c.category}</span>
                  </div>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                    "{c.description}"
                  </p>
                </div>

                {c.resolutionNote && (
                  <div className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-100 text-[11px] text-emerald-900">
                    <span className="font-bold block">Resolution Record:</span>
                    {c.resolutionNote}
                  </div>
                )}

                {/* Footer Buttons */}
                <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                  <span className="text-[10px] text-slate-400">{c.timestamp}</span>
                  <button
                    onClick={() => setSelectedComplaint(c)}
                    className="px-3.5 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-semibold hover:bg-black transition cursor-pointer"
                  >
                    Investigate Ticket
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REVIEWS TAB */}
      {activeTab === "reviews" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reviews.map((r) => (
              <div
                key={r.id}
                className={`p-5 rounded-2xl bg-white border transition shadow-xs flex flex-col justify-between ${
                  r.flagged ? "border-rose-200 bg-rose-50/20" : "border-slate-200/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < r.rating
                              ? "fill-amber-400 text-amber-400"
                              : "fill-slate-100 text-slate-200"
                          }`}
                        />
                      ))}
                      <span className="text-xs font-bold text-slate-800 ml-1.5">
                        {r.rating}.0 / 5
                      </span>
                    </div>

                    <span className="font-mono text-xs text-slate-400">{r.bookingRef}</span>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                    "{r.reviewText}"
                  </p>

                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <img
                        src={r.travellerAvatar}
                        alt={r.travellerName}
                        className="h-7 w-7 rounded-full object-cover"
                      />
                      <div>
                        <span className="font-semibold text-slate-900 block leading-tight">
                          {r.travellerName}
                        </span>
                        <span className="text-[10px] text-slate-400">{r.date}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-slate-400 text-[10px] block">Driver</span>
                      <span className="font-semibold text-slate-800">{r.driverName}</span>
                    </div>
                  </div>

                  {r.flagged && (
                    <div className="mt-3 p-2 rounded-lg bg-rose-100 text-rose-800 text-[11px] font-semibold flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                      <span>{r.flagReason}</span>
                    </div>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-semibold uppercase">
                    {r.vehicleType} Commute
                  </span>
                  <button
                    onClick={() => handleRemoveReview(r.id)}
                    className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-rose-600 hover:bg-rose-50 text-xs font-semibold transition"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove Inappropriate</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPORTS TAB */}
      {activeTab === "reports" && (
        <div className="rounded-2xl bg-white border border-slate-200/80 p-6 shadow-xs space-y-4 text-xs">
          <h3 className="text-base font-bold text-slate-900">Platform Safety & Audit Reports</h3>
          <p className="text-slate-500">
            Automated monitoring reports flagged by speed telemetry, SOS triggers, and off-route detection.
          </p>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block text-sm">
                  Monthly Driver Compliance & Speed Telemetry
                </span>
                <span className="text-slate-500 text-[11px]">
                  Generated today • 0 speed violations in past 24 hours
                </span>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-semibold text-slate-800 hover:bg-slate-100 transition shadow-xs">
                Export PDF
              </button>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 block text-sm">
                  Customer SOS & Emergency Trigger Log
                </span>
                <span className="text-slate-500 text-[11px]">
                  All emergency triggers resolved in under 2.4 minutes
                </span>
              </div>
              <button className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 font-semibold text-slate-800 hover:bg-slate-100 transition shadow-xs">
                Export CSV
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Complaint Investigation Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs animate-fade-in overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 relative">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Incident Investigation: {selectedComplaint.complaintRef}
                </h3>
                <span className="text-xs text-slate-500">
                  Booking Ref: {selectedComplaint.bookingRef} • Category: {selectedComplaint.category}
                </span>
              </div>
              <button
                onClick={() => setSelectedComplaint(null)}
                className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 my-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1">
                <span className="font-bold text-slate-800 block">Complainant Statement:</span>
                <p className="text-slate-600 leading-relaxed">"{selectedComplaint.description}"</p>
              </div>

              {/* Action Choices */}
              <div className="space-y-2">
                <span className="font-bold text-slate-800 block">Admin Resolution Actions:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      handleUpdateComplaintStatus(selectedComplaint.id, "resolved");
                      showToast(`Warning sent to ${selectedComplaint.againstName} and ticket resolved.`);
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-800 text-left transition"
                  >
                    Issue Official Warning
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateComplaintStatus(selectedComplaint.id, "resolved");
                      showToast(`24-hour suspension applied to ${selectedComplaint.againstName}.`);
                    }}
                    className="p-2.5 rounded-xl bg-rose-50 hover:bg-rose-100 border border-rose-200 font-semibold text-rose-800 text-left transition"
                  >
                    24h Account Suspension
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateComplaintStatus(selectedComplaint.id, "resolved");
                      showToast("Fare refund initiated to passenger.");
                    }}
                    className="p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 font-semibold text-emerald-800 text-left transition"
                  >
                    Issue Fare Refund
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateComplaintStatus(selectedComplaint.id, "dismissed");
                    }}
                    className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 font-semibold text-slate-500 text-left transition"
                  >
                    Dismiss As False Claim
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 text-right">
              <button
                onClick={() => setSelectedComplaint(null)}
                className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-black transition"
              >
                Close Investigation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
