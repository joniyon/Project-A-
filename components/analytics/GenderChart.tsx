"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { genderData } from "@/data/analytics";

const COLORS = ["#0f172a", "#64748b", "#cbd5e1"];

export default function GenderChart() {
  return (
    <div className="bg-white rounded-lg p-6 flex flex-col" style={{ border: "1px solid #E2E4E9" }}>
      <p className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase mb-6">
        Gender
      </p>

      <div className="flex items-center gap-8 flex-1">
        {/* Donut */}
        <div className="w-[160px] h-[160px] shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                innerRadius={52}
                outerRadius={78}
                dataKey="percentage"
                strokeWidth={2}
                stroke="#ffffff"
              >
                {genderData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-5 flex-1">
          {genderData.map((item, i) => (
            <div key={item.label}>
              <div className="flex items-center gap-2 mb-0.5">
                <span
                  className="w-2 h-2 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[i] }}
                />
                <span className="text-xs text-muted-foreground">{item.label}</span>
              </div>
              <p className="text-base font-semibold text-foreground pl-4">
                {item.value.toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
