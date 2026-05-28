"use client";

import { ArrowRight } from "lucide-react";
import { Boost } from "@/data/boosts";
import LabelTag from "@/components/ui/LabelTag";
import { cn } from "@/lib/utils";

interface BoostCardProps {
  boost: Boost;
}

export default function BoostCard({ boost }: BoostCardProps) {
  const isCompleted = boost.status === "Completed";

  return (
    <div
      className="bg-white rounded-lg overflow-hidden flex flex-col cursor-pointer group"
      style={{ border: "1px solid #E2E4E9" }}
    >
      {/* Gradient image area */}
      <div
        className="w-full h-[180px] shrink-0 transition-transform duration-300 group-hover:scale-[1.02]"
        style={{ background: boost.gradient }}
      />

      {/* Content */}
      <div className="px-4 pt-3 pb-4 flex flex-col gap-2 flex-1">
        {/* Title */}
        <p className="text-sm font-normal text-foreground line-clamp-1 leading-snug">
          {boost.title}
        </p>

        {/* Labels */}
        <div className="flex flex-wrap gap-1.5">
          {boost.labels.map((label) => (
            <LabelTag key={label} label={label as any} />
          ))}
        </div>

        {/* Status row */}
        <div className="flex items-center justify-between mt-auto pt-2"
          style={{ borderTop: "1px solid #E2E4E9" }}>
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "w-[6px] h-[6px] rounded-full shrink-0",
                isCompleted ? "bg-emerald-500" : "bg-amber-500"
              )}
            />
            <span
              className={cn(
                "text-xs font-normal",
                isCompleted ? "text-emerald-700" : "text-amber-700"
              )}
            >
              {isCompleted ? "See Results" : `${boost.daysLeft} Days Left`}
            </span>
          </div>
          <button className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground hover:bg-[#F7F7F7] hover:text-foreground transition-colors">
            <ArrowRight size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </div>
  );
}
