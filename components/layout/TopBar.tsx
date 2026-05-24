"use client";

import { Search, Download, Plus, Bell } from "lucide-react";
import { useState } from "react";

export default function TopBar() {
  const [query, setQuery] = useState("");

  return (
    <header className="h-16 shrink-0 bg-background border-b border-border px-8 flex items-center justify-between gap-4">
      {/* Search */}
      <div className="relative w-64">
        <Search
          size={16}
          strokeWidth={1.75}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        />
        <input
          type="text"
          placeholder="Search campaigns..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-16 py-2 text-sm bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring/20 focus:bg-background placeholder:text-muted-foreground transition-all font-normal"
        />
        <kbd className="absolute right-3 top-1/2 -translate-y-1/2 hidden sm:inline-flex items-center text-[10px] text-muted-foreground font-mono bg-background border border-border rounded px-1.5 py-0.5 tracking-wide">
          ⌘K
        </kbd>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {/* Bell */}
        <button className="relative w-9 h-9 flex items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
          <Bell size={20} strokeWidth={1.75} />
          <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-destructive rounded-full" />
        </button>

        <div className="w-px h-5 bg-border mx-1" />

        <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-foreground border border-input rounded-md hover:bg-muted transition-colors font-medium">
          <Download size={16} strokeWidth={1.75} />
          Download Reports
        </button>

        <button className="flex items-center gap-2 px-3.5 py-2 text-sm text-primary-foreground bg-primary rounded-md hover:opacity-90 active:scale-[0.98] transition-all font-medium">
          <Plus size={16} strokeWidth={2} />
          New Campaign
        </button>
      </div>
    </header>
  );
}
