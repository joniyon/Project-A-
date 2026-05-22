import { DollarSign, Eye, RefreshCw, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  icon: string;
  label: string;
  value: string;
  change: number;
}

const iconMap: Record<string, React.ReactNode> = {
  revenue:    <DollarSign  size={20} strokeWidth={1.75} />,
  reach:      <Eye         size={20} strokeWidth={1.75} />,
  conversion: <RefreshCw   size={20} strokeWidth={1.75} />,
  visitors:   <Users       size={20} strokeWidth={1.75} />,
};

export default function StatCard({ icon, label, value, change }: StatCardProps) {
  const isPositive = change > 0;

  return (
    <div className="bg-card text-card-foreground rounded-lg border border-border p-5 shadow-card stat-card cursor-default">
      {/* Icon */}
      <div className="w-9 h-9 flex items-center justify-center rounded-md border border-border text-foreground mb-4">
        {iconMap[icon]}
      </div>

      {/* Label */}
      <p className="text-sm text-muted-foreground mb-2">{label}</p>

      {/* Value + change */}
      <div className="flex items-end justify-between">
        <span className="text-[28px] font-bold text-foreground tracking-tight leading-none">
          {value}
        </span>
        <span
          className={cn(
            "flex items-center gap-1 text-xs font-semibold mb-0.5",
            isPositive ? "text-emerald-600" : "text-destructive"
          )}
        >
          <svg
            width="12" height="12" viewBox="0 0 12 12" fill="none"
            className={cn("shrink-0", !isPositive && "rotate-180")}
          >
            <path d="M6 2L10 7H2L6 2Z" fill="currentColor" />
          </svg>
          {Math.abs(change)}%
        </span>
      </div>
    </div>
  );
}
