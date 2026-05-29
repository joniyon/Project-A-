"use client";

import { Boost } from "@/data/boosts";
import { cn } from "@/lib/utils";

interface BoostCardProps {
  boost: Boost;
}

// Label tag with exact 5.5px border radius
function Tag({ label }: { label: string }) {
  return (
    <span
      className="inline-flex items-center px-2.5 text-xs text-[#5C5C5C] font-normal bg-white whitespace-nowrap"
      style={{
        border: "1px solid #E2E4E9",
        borderRadius: "5.5px",
        height: "23px",
      }}
    >
      {label}
    </span>
  );
}

export default function BoostCard({ boost }: BoostCardProps) {
  const isCompleted = boost.status === "Completed";

  return (
    <div
      className="bg-white flex flex-col overflow-hidden cursor-pointer group"
      style={{
        borderRadius: "16px",
        border: "1px solid #EBEBEB",
        width: "100%",
      }}
    >
      {/* ── Gradient image — 4px inset on all sides ── */}
      <div className="relative mx-1 mt-1 overflow-hidden" style={{ borderRadius: "13px" }}>
        {/* Base gradient */}
        <div
          className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
          style={{
            height: "182px",
            background: boost.gradient,
            borderRadius: "13px",
          }}
        />

        {/* White radial shine — top-left glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "13px",
            background:
              "radial-gradient(ellipse at 75% -10%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0) 65%)",
          }}
        />

        {/* White linear border fade — top to bottom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            borderRadius: "13px",
            border: "2px solid transparent",
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.53), rgba(255,255,255,0)) border-box",
            WebkitMask:
              "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "destination-out",
            maskComposite: "exclude",
          }}
        />
      </div>

      {/* ── Title ── */}
      <div className="px-3 pt-3 pb-0">
        <p className="text-sm font-normal text-[#171717] line-clamp-1 leading-snug">
          {boost.title}
        </p>
      </div>

      {/* ── Label tags ── */}
      <div className="px-3 pt-2 pb-3 flex flex-wrap gap-1.5">
        {boost.labels.map((label) => (
          <Tag key={label} label={label} />
        ))}
      </div>

      {/* ── Status bar — #FAFAFA background ── */}
      <div
        className="flex items-center justify-between px-3 mt-auto"
        style={{
          backgroundColor: "#FAFAFA",
          height: "48px",
        }}
      >
        {/* Status dot + text */}
        <div className="flex items-center gap-2">
          {/* Dot pill */}
          <div
            className="w-[11.2px] h-[11.2px] rounded-full flex items-center justify-center"
            style={{
              backgroundColor: isCompleted ? "#EBFDF3" : "#FFF3EB",
              border: `0.8px solid ${isCompleted ? "#22C55E" : "#FA7319"}`,
            }}
          >
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: isCompleted ? "#22C55E" : "#FA7319" }}
            />
          </div>
          <span
            className="text-xs font-normal"
            style={{ color: "#5C5C5C" }}
          >
            {isCompleted ? "See Results" : `${boost.daysLeft} Days Left`}
          </span>
        </div>

        {/* Arrow button */}
        <button
          className="flex items-center justify-center bg-white hover:bg-[#F7F7F7] transition-colors"
          style={{
            width: "31px",
            height: "23px",
            borderRadius: "5.5px",
            border: "1px solid #E2E4E9",
          }}
        >
          {/* Arrow → SVG matching the exact SVG path */}
          <svg width="13" height="10" viewBox="0 0 13 10" fill="none">
            <path
              d="M8.303 0.4L7.485 1.218L10.003 3.6H2.7V4.8H10.003L7.485 7.182L8.3 8L12.3 4L8.303 0.4Z"
              fill="#171717"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
