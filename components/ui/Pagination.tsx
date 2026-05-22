"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  rowsPerPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  onRowsPerPageChange: (rows: number) => void;
}

const ROWS_OPTIONS = [8, 16, 32];

export default function Pagination({
  currentPage,
  totalPages,
  rowsPerPage,
  totalItems,
  onPageChange,
  onRowsPerPageChange,
}: PaginationProps) {
  const getPages = (): (number | "...")[] => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (currentPage <= 3) return [1, 2, 3, "...", totalPages];
    if (currentPage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", currentPage - 1, currentPage, currentPage + 1, "...", totalPages];
  };

  const pages = getPages();
  const startItem = (currentPage - 1) * rowsPerPage + 1;
  const endItem   = Math.min(currentPage * rowsPerPage, totalItems);

  return (
    <div className="flex items-center justify-between px-5 py-3.5 border-t border-border bg-card">
      {/* Rows per page */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span className="text-xs">Rows per Page</span>
        <div className="relative">
          <select
            value={rowsPerPage}
            onChange={(e) => onRowsPerPageChange(Number(e.target.value))}
            className="appearance-none pl-2.5 pr-7 py-1 text-xs text-foreground border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring/30 cursor-pointer"
          >
            {ROWS_OPTIONS.map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
          <ChevronRight size={12} className="absolute right-2 top-1/2 -translate-y-1/2 rotate-90 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {/* Page numbers */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ChevronLeft size={14} />
          Prev
        </button>

        {pages.map((page, i) =>
          page === "..." ? (
            <span key={`e-${i}`} className="w-8 text-center text-xs text-muted-foreground">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => onPageChange(page as number)}
              className={cn(
                "w-8 h-8 rounded-md text-xs font-medium transition-colors",
                currentPage === page
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-2.5 py-1.5 text-xs text-muted-foreground rounded-md hover:bg-accent hover:text-accent-foreground disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Count */}
      <span className="text-xs text-muted-foreground">
        Showing {startItem}–{endItem} of {totalItems}
      </span>
    </div>
  );
}
