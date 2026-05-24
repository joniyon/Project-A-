"use client";

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import { devicesData } from "@/data/analytics";

function formatY(value: number) {
  if (value >= 1000) return `${value / 1000}k`;
  return `${value}`;
}

export default function DevicesChart() {
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col" style={{ border: "1px solid #E2E4E9" }}>
      <p className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase mb-6">
        Devices
      </p>

      <div className="flex-1 h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={devicesData}
            barCategoryGap="30%"
            barGap={2}
            margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          >
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
              width={32}
            />
            <Tooltip
              contentStyle={{
                background: "#fff",
                border: "1px solid #E2E4E9",
                borderRadius: 8,
                fontSize: 12,
                fontFamily: "var(--font-sans)",
              }}
              cursor={{ fill: "#F7F7F7" }}
            />
            <Bar dataKey="mobile"  fill="#0f172a" radius={[2, 2, 0, 0]} name="Mobile"  />
            <Bar dataKey="desktop" fill="#64748b" radius={[2, 2, 0, 0]} name="Desktop" />
            <Bar dataKey="tablet"  fill="#cbd5e1" radius={[2, 2, 0, 0]} name="Tablet"  />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-6 mt-4">
        {[
          { label: "Mobile",  color: "#0f172a" },
          { label: "Desktop", color: "#64748b" },
          { label: "Tablet",  color: "#cbd5e1" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm shrink-0" style={{ backgroundColor: color }} />
            <span className="text-xs text-muted-foreground">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
