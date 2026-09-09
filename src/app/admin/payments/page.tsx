"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Search,
  CheckCircle,
  XCircle,
  ArrowDownLeft,
  ArrowUpRight,
  RotateCcw,
  DollarSign,
  TrendingUp,
  Wallet,
  Building2,
  Calendar,
} from "lucide-react";
import {
  INITIAL_PAYMENTS,
  PaymentTransaction,
} from "@/db/adminData";

export default function AdminPaymentsRevenue() {
  const [transactions, setTransactions] = useState<PaymentTransaction[]>(INITIAL_PAYMENTS);
  const [activeTab, setActiveTab] = useState<"ALL" | "successful" | "failed" | "refunded">("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleIssueRefund = (txnId: string, amount: number) => {
    if (confirm(`Authorize full refund of ₹${amount} for transaction ${txnId}?`)) {
      setTransactions((prev) =>
        prev.map((t) =>
          t.id === txnId
            ? {
                ...t,
                status: "refunded",
                refundAmount: amount,
                platformCommission: 0,
                driverEarnings: 0,
              }
            : t
        )
      );
      showToast(`Refund of ₹${amount} processed successfully.`);
    }
  };

  const filteredTransactions = transactions.filter((t) => {
    const matchesTab = activeTab === "ALL" ? true : t.status === activeTab;
    const matchesSearch =
      t.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.bookingRef.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.travellerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // Calculate totals
  const totalGross = transactions
    .filter((t) => t.status === "successful")
    .reduce((acc, t) => acc + t.amount, 0);

  const totalCommission = transactions
    .filter((t) => t.status === "successful")
    .reduce((acc, t) => acc + t.platformCommission, 0);

  const totalDriverPayout = transactions
    .filter((t) => t.status === "successful")
    .reduce((acc, t) => acc + t.driverEarnings, 0);

  const totalRefunds = transactions
    .filter((t) => t.status === "refunded")
    .reduce((acc, t) => acc + (t.refundAmount || t.amount), 0);

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
              Payments & Platform Revenue
            </h1>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200">
              ₹4.82L Gross Today
            </span>
          </div>
          <p className="text-sm text-slate-500 mt-0.5">
            Audit gateway transactions, driver payouts, platform commissions, and customer refund claims.
          </p>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search txn ID, booking, user..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-white border border-slate-200 focus:outline-none focus:border-slate-400 shadow-xs"
          />
        </div>
      </div>

      {/* Financial KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Gross Volume</span>
            <div className="h-8 w-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <DollarSign className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">₹{totalGross.toLocaleString()}</div>
          <span className="text-[11px] text-emerald-600 font-semibold mt-1 block">
            Across 28,920 rides today
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Platform Margin (18%)</span>
            <div className="h-8 w-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <TrendingUp className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-purple-900">
            ₹{totalCommission.toLocaleString()}
          </div>
          <span className="text-[11px] text-purple-600 font-semibold mt-1 block">
            Net NexRide platform commission
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Driver Payouts</span>
            <div className="h-8 w-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
              <Wallet className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-slate-900">
            ₹{totalDriverPayout.toLocaleString()}
          </div>
          <span className="text-[11px] text-blue-600 font-semibold mt-1 block">
            Disbursed via UPI instant transfer
          </span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase">Total Refunds</span>
            <div className="h-8 w-8 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
              <RotateCcw className="h-4 w-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-rose-900">₹{totalRefunds.toLocaleString()}</div>
          <span className="text-[11px] text-rose-600 font-semibold mt-1 block">
            Cancellations & dispute resolutions
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-slate-200">
        {[
          { key: "ALL", label: "All Transactions", count: transactions.length },
          {
            key: "successful",
            label: "🟢 Successful",
            count: transactions.filter((t) => t.status === "successful").length,
          },
          {
            key: "failed",
            label: "🔴 Failed",
            count: transactions.filter((t) => t.status === "failed").length,
          },
          {
            key: "refunded",
            label: "🟣 Refunded",
            count: transactions.filter((t) => t.status === "refunded").length,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-lg transition whitespace-nowrap cursor-pointer ${
              activeTab === tab.key
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
            }`}
          >
            <span>{tab.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                activeTab === tab.key ? "bg-white/20 text-white" : "bg-slate-200 text-slate-700"
              }`}
            >
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Transactions Table */}
      <div className="rounded-2xl bg-white border border-slate-200/80 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Transaction ID & Ref</th>
                <th className="py-3.5 px-4">Traveller → Driver</th>
                <th className="py-3.5 px-4">Booking Amount</th>
                <th className="py-3.5 px-4">Payment Method</th>
                <th className="py-3.5 px-4">Platform Fee</th>
                <th className="py-3.5 px-4">Driver Earnings</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50/80 transition">
                  {/* Txn ID */}
                  <td className="py-3.5 px-4">
                    <div className="font-mono font-bold text-slate-900">{t.transactionId}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      Ref: <span className="font-semibold text-slate-700">{t.bookingRef}</span> •{" "}
                      {t.timestamp}
                    </div>
                  </td>

                  {/* Parties */}
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-slate-900">{t.travellerName}</div>
                    <div className="text-[11px] text-slate-500">→ {t.driverName}</div>
                  </td>

                  {/* Amount */}
                  <td className="py-3.5 px-4">
                    <div className="font-extrabold text-slate-900 text-sm">₹{t.amount}</div>
                  </td>

                  {/* Method */}
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-700">
                      {t.paymentMethod}
                    </span>
                  </td>

                  {/* Platform Commission */}
                  <td className="py-3.5 px-4 font-semibold text-purple-700">
                    ₹{t.platformCommission}
                  </td>

                  {/* Driver Earnings */}
                  <td className="py-3.5 px-4 font-bold text-emerald-700">
                    ₹{t.driverEarnings}
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === "successful"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : t.status === "failed"
                          ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-purple-50 text-purple-700 border border-purple-200"
                      }`}
                    >
                      {t.status.toUpperCase()}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    {t.status === "successful" && (
                      <button
                        onClick={() => handleIssueRefund(t.id, t.amount)}
                        className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 text-[11px] font-semibold hover:bg-rose-100 transition cursor-pointer"
                      >
                        Refund
                      </button>
                    )}
                    {t.status === "refunded" && (
                      <span className="text-[11px] text-slate-400 font-semibold italic">
                        Refunded
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
