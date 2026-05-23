import { DollarSign, Eye, RefreshCw, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  change: number;
}

const iconMap: Record<string, React.ReactNode> = {
  revenue:    <DollarSign size={20} strokeWidth={1.5} />,
  reach:      <Eye        size={20} strokeWidth={1.5} />,
  conversion: <RefreshCw  size={20} strokeWidth={1.5} />,
  visitors:   <Users      size={20} strokeWidth={1.5} />,
};

export default function StatCard({ icon, label, value, change }: StatCardProps) {
  const isPositive = change > 0;

  return (
    <div className="stat-card bg-card text-card-foreground rounded-lg border border-border p-5 shadow-card cursor-default">
      {/* Icon — bordered square box, no color fill */}
      <div className="w-9 h-9 flex items-center justify-center rounded-md border border-border text-foreground mb-4">
        {iconMap[icon]}
      </div>

      {/* Label */}
      <p className="text-sm text-muted-foreground font-normal mb-3">{label}</p>

      {/* Value + change on same row */}
      <div className="flex items-end justify-between">
        <span className="text-[26px] font-semibold text-foreground tracking-tight leading-none">
          {value}
        </span>
        <span
          className={cn(
            "flex items-center gap-1 text-xs font-medium mb-0.5",
            isPositive ? "text-emerald-600" : "text-destructive"
          )}
        >
          {/* Filled triangle arrow — matches screenshot */}
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
            className={cn("shrink-0", !isPositive && "rotate-180")}
          >
            <path d="M5 1L9.5 8.5H0.5L5 1Z" fill="currentColor" />
          </svg>
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
}
