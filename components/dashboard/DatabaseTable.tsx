"use client";

import { useState, useMemo } from "react";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import { visitors, Visitor } from "@/data/visitors";
import Pagination from "@/components/ui/Pagination";
import { cn } from "@/lib/utils";

type TabKey = "all" | "male" | "female";

const TABS: { key: TabKey; label: string }[] = [
  { key: "all",    label: "All Visitors" },
  { key: "male",   label: "Male"         },
  { key: "female", label: "Females"      },
];

const SORT_OPTIONS = ["Default", "Name A-Z", "Name Z-A", "Age ↑", "Age ↓"];

const avatarColors: Record<string, string> = {
  A: "#7C3AED", B: "#2563EB", C: "#059669", D: "#D97706",
  E: "#DC2626", F: "#7C3AED", G: "#2563EB", H: "#059669",
  I: "#D97706", J: "#DC2626", K: "#7C3AED", L: "#2563EB",
  M: "#059669", N: "#D97706", O: "#DC2626", P: "#7C3AED",
  Q: "#2563EB", R: "#059669", S: "#D97706", T: "#DC2626",
  U: "#7C3AED", V: "#2563EB", W: "#059669", X: "#D97706",
  Y: "#DC2626", Z: "#7C3AED",
};

function AvatarBox({ initials }: { initials: string }) {
  const letter = initials[0]?.toUpperCase() ?? "?";
  const bg     = avatarColors[letter] ?? "#6B7280";
  return (
    <div
      className="shrink-0 flex items-center justify-center rounded-md text-white text-xs font-medium"
      style={{ width: 32, height: 32, backgroundColor: bg }}
    >
      {initials}
    </div>
  );
}

function sortVisitors(data: Visitor[], sort: string): Visitor[] {
  switch (sort) {
    case "Name A-Z": return [...data].sort((a, b) => a.name.localeCompare(b.name));
    case "Name Z-A": return [...data].sort((a, b) => b.name.localeCompare(a.name));
    case "Age ↑":    return [...data].sort((a, b) => a.age - b.age);
    case "Age ↓":    return [...data].sort((a, b) => b.age - a.age);
    default:         return data;
  }
}

export default function DatabaseTable() {
  const [activeTab, setActiveTab]     = useState<TabKey>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [sortOption, setSortOption]   = useState("Default");
  const [checked, setChecked]         = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    let data = visitors;
    if (activeTab === "male")   data = visitors.filter((v) => v.gender === "Male");
    if (activeTab === "female") data = visitors.filter((v) => v.gender === "Female");
    return sortVisitors(data, sortOption);
  }, [activeTab, sortOption]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated  = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  function handleTabChange(key: TabKey) {
    setActiveTab(key);
    setCurrentPage(1);
    setChecked(new Set());
  }

  function toggleCheck(id: number) {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  return (
    <div className="bg-white rounded-lg overflow-hidden" style={{ border: "1px solid #E2E4E9" }}>

      {/* ── Tab bar ── */}
      <div className="flex items-center justify-between px-1" style={{ borderBottom: "1px solid #E2E4E9" }}>
        <div className="flex items-center">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={cn(
                "relative px-4 py-4 text-sm transition-colors whitespace-nowrap select-none",
                activeTab === tab.key
                  ? "text-foreground font-medium"
                  : "text-muted-foreground font-normal hover:text-foreground"
              )}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="tab-indicator absolute bottom-0 left-4 right-4 h-[2px] bg-foreground rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div className="pr-4 relative">
          <select
            value={sortOption}
            onChange={(e) => { setSortOption(e.target.value); setCurrentPage(1); }}
            className="appearance-none text-xs text-foreground font-normal rounded-md pl-3 pr-8 py-2 bg-white hover:bg-[#F7F7F7] transition-colors cursor-pointer focus:outline-none"
            style={{ border: "1px solid #E2E4E9", fontFamily: "var(--font-sans)" }}
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
          <ChevronDown size={12} strokeWidth={1.5} className="absolute right-6 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full">

          {/* Header */}
          <thead>
            <tr style={{ borderBottom: "1px solid #E2E4E9" }}>
              {/* Checkbox col */}
              <th className="pl-4 pr-2 py-3 w-10">
                <div className="w-4 h-4 rounded border border-[#E2E4E9] bg-white" />
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Name</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Emails</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Country</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Gender</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground w-28">Age [Yrs]</th>
              <th className="w-12" />
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginated.map((visitor, index) => {
              const isEven     = index % 2 === 0;
              const isChecked  = checked.has(visitor.id);
              return (
                <tr
                  key={visitor.id}
                  className="campaign-row"
                  style={{
                    backgroundColor: isEven ? "#ffffff" : "#F7F7F7",
                    borderBottom: "1px solid #E2E4E9",
                  }}
                >
                  {/* Checkbox */}
                  <td className="pl-4 pr-2 py-4">
                    <button
                      onClick={() => toggleCheck(visitor.id)}
                      className="w-4 h-4 rounded flex items-center justify-center transition-colors"
                      style={{
                        border: "1px solid #E2E4E9",
                        backgroundColor: isChecked ? "#0f172a" : "#ffffff",
                      }}
                    >
                      {isChecked && (
                        <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                          <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      )}
                    </button>
                  </td>

                  {/* Name + avatar */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <AvatarBox initials={visitor.avatar} />
                      <span className="text-sm font-normal text-foreground whitespace-nowrap">
                        {visitor.name}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td className="px-4 py-4 text-sm font-normal text-muted-foreground">
                    {visitor.email}
                  </td>

                  {/* Country */}
                  <td className="px-4 py-4 text-sm font-normal text-foreground">
                    {visitor.country}
                  </td>

                  {/* Gender */}
                  <td className="px-4 py-4 text-sm font-normal text-foreground">
                    {visitor.gender}
                  </td>

                  {/* Age */}
                  <td className="px-4 py-4 text-right text-sm font-normal text-foreground tabular-nums">
                    {visitor.age}
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <button className="w-8 h-8 flex items-center justify-center rounded-md text-muted-foreground hover:bg-[#F7F7F7] hover:text-foreground transition-colors">
                      <MoreHorizontal size={16} strokeWidth={1.5} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {paginated.length === 0 && (
          <div className="py-20 text-center text-muted-foreground text-sm">
            No visitors found.
          </div>
        )}
      </div>

      {/* ── Pagination ── */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        rowsPerPage={rowsPerPage}
        totalItems={filtered.length}
        onPageChange={setCurrentPage}
        onRowsPerPageChange={(r) => { setRowsPerPage(r); setCurrentPage(1); }}
      />
    </div>
  );
}
