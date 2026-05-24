import { CampaignLabel } from "@/types/campaign";

interface LabelTagProps {
  label: CampaignLabel;
}

export default function LabelTag({ label }: LabelTagProps) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 rounded-[6px] border border-border bg-transparent text-xs text-foreground font-normal whitespace-nowrap">
      {label}
    </span>
  );
}
