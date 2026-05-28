"use client";

import { useState, useMemo } from "react";
import Sidebar from "@/components/layout/Sidebar";
import BoostCard from "@/components/boosts/BoostCard";
import { boosts, BoostStatus } from "@/data/boosts";
import { Search, Plus, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type TabKey = "all" | "ongoing" | "completed";

const TABS: { key: TabKey; label: string; filter?: BoostStatus }[] = [
  { key: "all",       label: "All"       },
  { key: "ongoing",   label: "Ongoing",   filter: "Ongoing"   },
  { key: "completed", label: "Completed", filter: "Completed" },
];

function getCounts() {
  return {
    all:       boosts.length,
    ongoing:   boosts.filter((b) => b.status === "Ongoing").length,
    completed: boosts.filter((b) => b.status === "Completed").length,
  };
}

export default function BoostsPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [query, setQuery]         = useState("");
  const counts                    = getCounts();

  const filtered = useMemo(() => {
    const tab = TABS.find((t) => t.key === activeTab);
    let data   = tab?.filter ? boosts.filter((b) => b.status === tab.filter) : boosts;
    if (query.trim()) {
      data = data.filter((b) =>
        b.title.toLowerCase().includes(query.toLowerCase())
      );
    }
    return data;
  }, [activeTab, query]);

  return (
    <div className="flex h-screen bg-white overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* ── Top Bar ── */}
        <header
          className="h-[60px] shrink-0 bg-white flex items-center justify-between gap-4 px-8"
          style={{ borderBottom: "1px solid #E2E4E9" }}
        >
          <h1 className="text-xl font-semibold text-foreground tracking-tight">Boosts</h1>

          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="relative w-56">
              <Search size={14} strokeWidth={1.5} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="w-full pl-8 pr-4 py-2 text-sm bg-white rounded-md focus:outline-none placeholder-muted-foreground"
                style={{ border: "1px solid #E2E4E9", fontFamily: "var(--font-sans)" }}
              />
            </div>

            {/* Boost Campaign */}
            <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-white bg-foreground rounded-md hover:opacity-90 active:scale-[0.98] transition-all font-normal">
              <Plus size={16} strokeWidth={1.5} />
              Boost Campaign
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto px-8 py-6">

          {/* ── Upgrade Banner ── */}
          <div
            className="flex items-center justify-between rounded-lg px-5 py-4 mb-6 bg-white"
            style={{ border: "1px solid #E2E4E9" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground shrink-0"
                style={{ border: "1px solid #E2E4E9" }}
              >
                <Zap size={16} strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">Upgrade to Pro</p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Boosted campaigns are a perfect way to get some extra attention on your posts and appear on other pages on Cube Studios.
                </p>
              </div>
            </div>
            <button
              className="shrink-0 ml-8 px-4 py-2 text-sm font-normal text-foreground rounded-md hover:bg-[#F7F7F7] transition-colors whitespace-nowrap"
              style={{ border: "1px solid #E2E4E9" }}
            >
              Upgrade Now!
            </button>
          </div>

          {/* ── Tab bar ── */}
          <div
            className="flex items-center mb-6"
            style={{ borderBottom: "1px solid #E2E4E9" }}
          >
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "relative px-4 py-3 text-sm transition-colors whitespace-nowrap select-none",
                  activeTab === tab.key
                    ? "text-foreground font-medium"
                    : "text-muted-foreground font-normal hover:text-foreground"
                )}
              >
                {tab.label}
                <span className={cn(
                  "ml-1 text-xs",
                  activeTab === tab.key ? "text-muted-foreground" : "text-muted-foreground/40"
                )}>
                  [{counts[tab.key]}]
                </span>
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-4 right-4 h-[2px] bg-foreground rounded-full" />
                )}
              </button>
            ))}
          </div>

          {/* ── Card Grid ── */}
          {filtered.length > 0 ? (
            <div className="grid grid-cols-4 gap-4">
              {filtered.map((boost) => (
                <BoostCard key={boost.id} boost={boost} />
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-muted-foreground text-sm">
              No boosts found.
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
