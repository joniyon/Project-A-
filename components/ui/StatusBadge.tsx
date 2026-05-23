import { CampaignStatus } from "@/types/campaign";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: CampaignStatus;
}

const statusConfig: Record<
  CampaignStatus,
  { dot: string; text: string; pill: string }
> = {
  Completed: {
    dot:  "bg-emerald-500",
    text: "text-emerald-700",
    pill: "bg-emerald-50 border border-emerald-100",
  },
  "In Progress": {
    dot:  "bg-amber-500",
    text: "text-amber-700",
    pill: "bg-amber-50 border border-amber-100",
  },
  Inactive: {
    dot:  "bg-red-500",
    text: "text-red-700",
    pill: "bg-red-50 border border-red-100",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const { dot, text, pill } = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-normal",
        pill,
        text
      )}
    >
      <span className={cn("w-[5px] h-[5px] rounded-full shrink-0", dot)} />
      {status}
    </span>
  );
}
