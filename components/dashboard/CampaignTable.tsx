"use client";

import { useState, useMemo } from "react";
import { MoreHorizontal, ChevronDown } from "lucide-react";
import { campaigns } from "@/data/campaigns";
import { Campaign, CampaignStatus, TabKey } from "@/types/campaign";
import StatusBadge from "@/components/ui/StatusBadge";
import LabelTag from "@/components/ui/LabelTag";
import Pagination from "@/components/ui/Pagination";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */

const TABS: { key: TabKey; label: string; filter?: CampaignStatus }[] = [
  { key: "all",         label: "All Campaigns" },
  { key: "in-progress", label: "In Progress",  filter: "In Progress" },
  { key: "inactive",    label: "Inactive",      filter: "Inactive"    },
  { key: "completed",   label: "Completed",     filter: "Completed"   },
];

function getCounts(data: Campaign[]) {
  return {
    all:           data.length,
    "in-progress": data.filter((c) => c.status === "In Progress").length,
    inactive:      data.filter((c) => c.status === "Inactive").length,
    completed:     data.filter((c) => c.status === "Completed").length,
  };
}

/* ------------------------------------------------------------------ */

export default function CampaignTable() {
  const [activeTab, setActiveTab]     = useState<TabKey>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(8);

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
    <div className="bg-card rounded-lg border border-border shadow-card overflow-hidden">

      {/* ── Tab bar ── */}
      <div className="flex items-center justify-between border-b border-border px-1">
        <div className="flex items-center">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={cn(
                "relative px-4 py-3.5 text-sm transition-colors whitespace-nowrap select-none",
                activeTab === tab.key
                  ? "text-foreground font-semibold"
                  : "text-muted-foreground font-medium hover:text-foreground"
              )}
            >
              {tab.label}
              <span className={cn(
                "ml-1.5 text-xs",
                activeTab === tab.key ? "text-muted-foreground" : "text-muted-foreground/50"
              )}>
                [{counts[tab.key]}]
              </span>
              {/* Active underline */}
              {activeTab === tab.key && (
                <span className="tab-indicator absolute bottom-0 left-4 right-4 h-[2px] bg-foreground rounded-full" />
              )}
            </button>
          ))}
        </div>

        {/* Date picker */}
        <div className="pr-4">
          <button className="flex items-center gap-1.5 text-xs text-foreground border border-input rounded-md px-3 py-1.5 hover:bg-accent transition-colors font-medium">
            This week
            <ChevronDown size={14} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto">
        <table className="w-full">
          {/* Header */}
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left pl-5 pr-3 py-3 text-xs font-medium text-muted-foreground w-12">
                #
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Title
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">
                Labels
              </th>
              <th className="text-right px-4 py-3 text-xs font-medium text-muted-foreground w-28">
                Reward [$]
              </th>
              <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground w-36">
                Status
              </th>
              <th className="w-12" />
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {paginated.map((campaign, index) => {
              const rowNumber = (currentPage - 1) * rowsPerPage + index + 1;
              const isLast    = index === paginated.length - 1;
              return (
                <tr
                  key={campaign.id}
                  className={cn(
                    "campaign-row group",
                    !isLast && "border-b border-border"
                  )}
                >
                  {/* # */}
                  <td className="pl-5 pr-3 py-4 text-xs font-medium text-muted-foreground">
                    {rowNumber}
                  </td>

                  {/* Title */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      {/* Gradient thumbnail */}
                      <div
                        className={cn(
                          "w-8 h-8 rounded-md shrink-0 bg-gradient-to-br",
                          campaign.gradient
                        )}
                      />
                      <span className="text-sm font-medium text-foreground line-clamp-1 leading-snug">
                        {campaign.title}
                      </span>
                    </div>
                  </td>

                  {/* Labels */}
                  <td className="px-4 py-4">
                    <div className="flex flex-wrap gap-1.5">
                      {campaign.labels.map((label) => (
                        <LabelTag key={label} label={label} />
                      ))}
                    </div>
                  </td>

                  {/* Reward */}
                  <td className="px-4 py-4 text-right text-sm font-semibold text-foreground tabular-nums">
                    ${campaign.reward}
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <StatusBadge status={campaign.status} />
                  </td>

                  {/* Actions */}
                  <td className="px-3 py-4">
                    <button className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground opacity-0 group-hover:opacity-100 hover:bg-accent hover:text-foreground transition-all">
                      <MoreHorizontal size={16} strokeWidth={1.75} />
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
