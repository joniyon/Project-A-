"use client";

import { useMemo } from "react";
import Sidebar from "@/components/layout/Sidebar";
import StatCard from "@/components/dashboard/StatCard";
import RevenueChart from "@/components/analytics/RevenueChart";
import GenderChart from "@/components/analytics/GenderChart";
import DevicesChart from "@/components/analytics/DevicesChart";
import WorldMap from "@/components/analytics/WorldMap";
import { analyticsStats } from "@/data/analytics";
import { Search, Download, GitCompare, ChevronDown } from "lucide-react";
import { useState } from "react";

const MONTHS = [
  "Jan 2025","Feb 2025","Mar 2025","Apr 2025",
  "May 2025","Jun 2025","Jul 2025","Aug 2025",
  "Sep 2025","Oct 2025","Nov 2025","Dec 2025",
];

const PERIODS = ["This Month", "Last Month", "Last 3 Months", "This Year"];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Analytics";
  if (hour < 17) return "Analytics";
  return "Analytics";
}

export default function AnalyticsPage() {
  const [period, setPeriod]     = useState("This Month");
  const [month, setMonth]       = useState("Feb 2025");
  const [query, setQuery]       = useState("");
  const greeting                = useMemo(() => getGreeting(), []);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* ── Top Bar ── */}
        <header className="h-[64px] shrink-0 bg-white border-b flex items-center justify-between gap-4 px-8"
          style={{ borderColor: "#E2E4E9" }}>
          {/* Search */}
          <div className="relative w-64">
            <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-white rounded-md focus:outline-none placeholder-muted-foreground"
              style={{ border: "1px solid #E2E4E9", fontFamily: "var(--font-sans)" }}
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-foreground rounded-md font-normal transition-colors hover:bg-[#F7F7F7]"
              style={{ border: "1px solid #E2E4E9" }}>
              <Download size={16} strokeWidth={1.5} />
              Download Reports
            </button>
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-white bg-foreground rounded-md font-normal transition-colors hover:opacity-90">
              <GitCompare size={16} strokeWidth={1.5} />
              Make Comparisons
            </button>
          </div>
        </header>

        {/* ── Main content ── */}
        <main className="flex-1 overflow-y-auto px-8 py-7">

          {/* Greeting + date filters */}
          <div className="flex items-start justify-between mb-6">
            <div>
              <h1 className="text-xl font-normal text-muted-foreground">
                {greeting},{" "}
                <span className="font-semibold text-foreground">joniyon.</span>
              </h1>
            </div>

            {/* Dual date filter */}
            <div className="flex items-center gap-2">
              <div className="relative">
                <select
                  value={period}
                  onChange={(e) => setPeriod(e.target.value)}
                  className="appearance-none text-xs text-foreground font-normal rounded-md pl-3 pr-8 py-2 bg-white hover:bg-[#F7F7F7] transition-colors cursor-pointer focus:outline-none"
                  style={{ border: "1px solid #E2E4E9", fontFamily: "var(--font-sans)" }}
                >
                  {PERIODS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown size={12} strokeWidth={1.5} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>

              <div className="relative">
                <select
                  value={month}
                  onChange={(e) => setMonth(e.target.value)}
                  className="appearance-none text-xs text-foreground font-normal rounded-md pl-3 pr-8 py-2 bg-white hover:bg-[#F7F7F7] transition-colors cursor-pointer focus:outline-none"
                  style={{ border: "1px solid #E2E4E9", fontFamily: "var(--font-sans)" }}
                >
                  {MONTHS.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
                <ChevronDown size={12} strokeWidth={1.5} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Stat Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {analyticsStats.map((card) => (
              <StatCard key={card.label} {...card} />
            ))}
          </div>

          {/* Revenue Growth */}
          <div className="mb-6">
            <RevenueChart />
          </div>

          {/* Gender + Devices */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <GenderChart />
            <DevicesChart />
          </div>

          {/* World Map */}
          <WorldMap />
        </main>
      </div>
    </div>
  );
}
