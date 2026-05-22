import { CampaignStatus } from "@/types/campaign";
import { cn } from "@/lib/utils";
import { CheckCircle2, Clock, XCircle } from "lucide-react";

interface StatusBadgeProps {
  status: CampaignStatus;
}

const statusConfig: Record<
  CampaignStatus,
  { icon: React.ReactNode; text: string; classes: string }
> = {
  Completed: {
    icon: <CheckCircle2 size={13} strokeWidth={2} />,
    text: "Completed",
    classes: "text-emerald-700 bg-emerald-50 border-emerald-100",
  },
  "In Progress": {
    icon: <Clock size={13} strokeWidth={2} />,
    text: "In Progress",
    classes: "text-amber-700 bg-amber-50 border-amber-100",
  },
  Inactive: {
    icon: <XCircle size={13} strokeWidth={2} />,
    text: "Inactive",
    classes: "text-red-700 bg-red-50 border-red-100",
  },
};

export default function StatusBadge({ status }: StatusBadgeProps) {
  const config = statusConfig[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border",
        config.classes
      )}
    >
      {config.icon}
      {config.text}
    </span>
  );
}
