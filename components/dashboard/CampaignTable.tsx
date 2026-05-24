"use client";

import { useState, useMemo } from "react";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import { campaigns } from "@/data/campaigns";
import { Campaign, CampaignStatus, TabKey } from "@/types/campaign";
import StatusBadge from "@/components/ui/StatusBadge";
import LabelTag from "@/components/ui/LabelTag";
import Pagination from "@/components/ui/Pagination";
import { cn } from "@/lib/utils";

const TABS: { key: TabKey; label: string; filter?: CampaignStatus }[] = [
  { key: "all",         label: "All Campaigns" },
  { key: "in-progress", label: "In Progress",  filter: "In Progress" },
  { key: "inactive",    label: "Inactive",      filter: "Inactive"    },
  { key: "completed",   label: "Completed",     filter: "Completed"   },
];

const DATE_OPTIONS = [
  "This week", "Last week", "This month",
  "Last month", "Last 3 months", "All time",
];

function getCounts(data: Campaign[]) {
  return {
    all:           data.length,
    "in-progress": data.filter((c) => c.status === "In Progress").length,
    inactive:      data.filter((c) => c.status === "Inactive").length,
    completed:     data.filter((c) => c.status === "Completed").length,
  };
}

export default function CampaignTable() {
  const [activeTab, setActiveTab]     = useState<TabKey>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [dateFilter, setDateFilter]   = useState("This week");

  const counts = getCounts(campaigns);

  const filtered = useMemo(() => {
    const tab = TABS.find((t) => t.key === activeTab);
    if (!tab?.filter) return campaigns;
    return campaigns.filter((c) => c.status === tab.filter);
  }, [activeTab]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / rowsPerPage));
  const paginated  = filtered.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  function handleTabChange(key: TabKey) {
    setActiveTab(key);
    setCurrentPage(1);
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
              <span className={cn(
                "ml-1 text-xs",
                activeTab === tab.key ? "text-muted-foreground" : "text-muted-foreground/40"
              )}>
                [{counts[tab.key]}]
              </span>
              {activeTab === tab.key && (
                <span className="tab-indicator absolute bottom-0 left-4 right-4 h-[2px] bg-foreground rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Date filter */}
        <div className="pr-4 relative">
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="appearance-none text-xs text-foreground font-normal rounded-md pl-3 pr-8 py-2 bg-white hover:bg-[#F7F7F7] transition-colors cursor-pointer focus:outline-none"
            style={{ border: "1px solid #E2E4E9", fontFamily: "var(--font-sans)" }}
          >
            {DATE_OPTIONS.map((opt) => (
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
              <th className="text-left pl-4 pr-4 py-3 text-xs font-medium text-muted-foreground w-12">#</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Title</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Labels</th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground w-32">Reward [$]</th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground w-36">Status</th>
              <th className="w-12" />
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginated.map((campaign, index) => {
              const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
              const isEven    = index % 2 === 0;
              return (
                <tr
                  key={campaign.id}
                  className="campaign-row"
                  style={{
                    backgroundColor: isEven ? "#ffffff" : "#F7F7F7",
                    borderBottom: "1px solid #E2E4E9",
                  }}
                >
                  <td className="pl-4 pr-4 py-4 text-xs text-muted-foreground tabular-nums">
                    {rowNumber}
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={cn("w-8 h-8 rounded-md shrink-0 bg-gradient-to-br", campaign.gradient)}
                      />
                      <span className="text-sm font-normal text-foreground line-clamp-1 leading-snug">
                        {campaign.title}
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-2">
                      {campaign.labels.map((label) => (
                        <LabelTag key={label} label={label} />
                      ))}
                    </div>
                  </td>

                  <td className="px-4 py-4 text-right text-sm font-normal text-foreground tabular-nums">
                    ${campaign.reward}
                  </td>

                  <td className="px-4 py-4">
                    <StatusBadge status={campaign.status} />
                  </td>

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
            No campaigns found.
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
