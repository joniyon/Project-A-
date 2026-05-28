"use client";

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { revenueData } from "@/data/analytics";
import { Sparkles } from "lucide-react";

function formatY(value: number) {
  if (value >= 1000) return `${value / 1000}k`;
  return `${value}`;
}

export default function RevenueChart() {
  return (
    <div className="bg-white rounded-lg p-6" style={{ border: "1px solid #E2E4E9" }}>
      <p className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase mb-4">
        Revenue Growth
      </p>

      <div className="flex gap-8">
        {/* Left — fixed to stat card width */}
        <div className="w-[363px] shrink-0 flex flex-col justify-between">
          <div>
            <p className="text-[28px] font-semibold text-foreground tracking-tight leading-none mb-1">
              $1,098,872
            </p>
            <p className="text-xs text-muted-foreground mb-4">Total 12 months Revenue</p>
            <div className="w-7 h-7 flex items-center justify-center rounded-md text-muted-foreground mb-4"
              style={{ border: "1px solid #E2E4E9" }}>
              <Sparkles size={14} strokeWidth={1.5} />
            </div>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            The strong growth between November and December{" "}
            <span className="text-emerald-600 font-medium">[+8.3%]</span>{" "}
            is a good indicator. AI recommends scaling online campaigns mostly
            this period for Kiddies fashion.
          </p>
        </div>

        {/* Right — chart */}
        <div className="flex-1 h-[240px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 8, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#000000" stopOpacity={0.06} />
                  <stop offset="95%" stopColor="#000000" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid vertical={false} stroke="#E2E4E9" strokeDasharray="0" />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "var(--font-sans)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={formatY}
                tick={{ fontSize: 11, fill: "#9CA3AF", fontFamily: "var(--font-sans)" }}
                axisLine={false}
                tickLine={false}
                width={36}
              />
              <Tooltip
                contentStyle={{
                  background: "#fff",
                  border: "1px solid #E2E4E9",
                  borderRadius: 8,
                  fontSize: 12,
                  fontFamily: "var(--font-sans)",
                }}
                formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                cursor={{ stroke: "#E2E4E9", strokeWidth: 1 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#000000"
                strokeWidth={1.5}
                fill="url(#revenueGrad)"
                dot={false}
                activeDot={{ r: 4, fill: "#000000", strokeWidth: 0 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
