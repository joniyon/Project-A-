"use client";

import { Search, Download, Plus, Bell } from "lucide-react";
import { useState } from "react";

export default function TopBar() {
  const [query, setQuery] = useState("");

  return (
    <header className="h-[60px] shrink-0 bg-background border-b border-border px-8 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative w-64">
        <Search size={20} strokeWidth={1.75} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search campaigns..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-10 pr-16 py-2 text-sm bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring/30 focus:bg-background placeholder-muted-foreground transition-all"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center gap-1 text-[10px] text-muted-foreground font-mono bg-background border border-border rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <button className="relative w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <Bell size={20} strokeWidth={1.75} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-destructive rounded-full" />
        </button>

        <div className="w-px h-5 bg-border mx-1" />

        <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-foreground border border-input rounded-md hover:bg-accent transition-colors font-medium">
          <Download size={20} strokeWidth={1.75} />
          Download Reports
        </button>
        <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-primary-foreground bg-primary rounded-md hover:opacity-90 active:scale-95 transition-all font-medium">
          <Plus size={20} strokeWidth={1.75} />
          New Campaign
        </button>
      </div>
    </header>
  );
}
