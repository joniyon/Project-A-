import { DollarSign, Eye, RefreshCw, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  change: number;
  context?: string; // e.g. "vs Last month"
}

const iconMap: Record<string, React.ReactNode> = {
  revenue:    <DollarSign size={20} strokeWidth={1.5} />,
  reach:      <Eye        size={20} strokeWidth={1.5} />,
  conversion: <RefreshCw  size={20} strokeWidth={1.5} />,
  visitors:   <Users      size={20} strokeWidth={1.5} />,
  male:       <Users      size={20} strokeWidth={1.5} />,
  female:     <Users      size={20} strokeWidth={1.5} />,
};

export default function StatCard({ icon, label, value, change, context }: StatCardProps) {
  const isPositive = change > 0;

  return (
    <div className="stat-card bg-white rounded-lg p-5 cursor-default"
      style={{ border: "1px solid #E2E4E9" }}
    >
      {/* Icon */}
      <div className="w-9 h-9 flex items-center justify-center rounded-md text-foreground mb-4"
        style={{ border: "1px solid #E2E4E9" }}
      >
        {iconMap[icon]}
      </div>

      {/* Label */}
      <p className="text-sm text-muted-foreground font-normal mb-3">{label}</p>

      {/* Value + change */}
      <div className="flex items-end justify-between">
        <span className="text-[26px] font-semibold text-foreground tracking-tight leading-none">
          {value}
        </span>
        <div className="flex items-center gap-1 mb-0.5">
          <span className={cn(
            "flex items-center gap-1 text-xs font-medium",
            isPositive ? "text-emerald-600" : "text-destructive"
          )}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
              className={cn("shrink-0", !isPositive && "rotate-180")}
            >
              <path d="M5 1L9.5 8.5H0.5L5 1Z" fill="currentColor" />
            </svg>
            {Math.abs(change)}%
          </span>
          {context && (
            <span className="text-xs text-muted-foreground font-normal">{context}</span>
          )}
        </div>
      </div>
    </div>
  );
}
