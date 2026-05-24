"use client";

import { useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { countriesData, mapMarkers } from "@/data/analytics";

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const FLAG_MAP: Record<string, string> = {
  US: "🇺🇸", IN: "🇮🇳", GB: "🇬🇧", AU: "🇦🇺", CA: "🇨🇦",
};

export default function WorldMap() {
  const [tooltip, setTooltip] = useState<{
    name: string; users: number; x: number; y: number;
  } | null>(null);

  const totalUsers = 15654;

  return (
    <div className="bg-white rounded-lg p-6" style={{ border: "1px solid #E2E4E9" }}>
      <div className="flex gap-6">
        {/* Map */}
        <div className="flex-1 relative">
          <p className="text-[10px] font-medium text-muted-foreground tracking-widest uppercase mb-4">
            Top Countries
          </p>
          <div className="relative">
            <ComposableMap
              projectionConfig={{ scale: 140, center: [10, 10] }}
              style={{ width: "100%", height: "280px" }}
            >
              <Geographies geography={GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill="#F7F7F7"
                      stroke="#E2E4E9"
                      strokeWidth={0.5}
                      style={{
                        default:  { outline: "none" },
                        hover:    { outline: "none", fill: "#e2e4e9" },
                        pressed:  { outline: "none" },
                      }}
                    />
                  ))
                }
              </Geographies>

              {mapMarkers.map((marker) => (
                <Marker
                  key={marker.name}
                  coordinates={marker.coordinates}
                  onMouseEnter={(e) => {
                    const rect = (e.target as SVGElement)
                      .closest("svg")
                      ?.getBoundingClientRect();
                    if (rect) {
                      setTooltip({
                        name: marker.name,
                        users: marker.users,
                        x: e.clientX - rect.left,
                        y: e.clientY - rect.top,
                      });
                    }
                  }}
                  onMouseLeave={() => setTooltip(null)}
                >
                  {/* Ripple rings */}
                  <circle r={12} fill="#0f172a" fillOpacity={0.05} />
                  <circle r={7}  fill="#0f172a" fillOpacity={0.10} />
                  <circle r={3}  fill="#0f172a" fillOpacity={0.80} />
                </Marker>
              ))}
            </ComposableMap>

            {/* Tooltip */}
            {tooltip && (
              <div
                className="absolute z-10 bg-white rounded-lg px-3 py-2 text-xs shadow-md pointer-events-none"
                style={{
                  border: "1px solid #E2E4E9",
                  left: tooltip.x + 12,
                  top:  tooltip.y - 40,
                  fontFamily: "var(--font-sans)",
                }}
              >
                <p className="font-medium text-foreground">{tooltip.name}</p>
                <p className="text-muted-foreground">{tooltip.users.toLocaleString()} Users</p>
              </div>
            )}
          </div>
        </div>

        {/* Country list */}
        <div className="w-[200px] shrink-0 flex flex-col">
          <div className="mb-4">
            <p className="text-[26px] font-semibold text-foreground tracking-tight leading-none">
              {totalUsers.toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Users</p>
          </div>

          <div className="flex flex-col gap-4">
            {countriesData.map((country) => (
              <div key={country.code}>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="text-base leading-none">
                      {FLAG_MAP[country.code]}
                    </span>
                    <span className="text-xs font-normal text-foreground">
                      {country.name}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {String(country.percentage).padStart(2, "0")}%
                  </span>
                </div>
                {/* Progress bar */}
                <div className="h-1 w-full rounded-full bg-[#F7F7F7]" style={{ border: "none" }}>
                  <div
                    className="h-1 rounded-full bg-foreground"
                    style={{ width: `${country.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
