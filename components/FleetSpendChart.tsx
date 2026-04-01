"use client";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { WEEKLY_SPEND } from "@/lib/mockData";

const COLORS = {
  orchard: "#7C5CFC",
  rowan: "#4EA8DE",
  forrest: "#3DD68C",
  sage: "#F5A524",
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(22,22,22,0.95)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "8px",
      padding: "12px 16px",
      backdropFilter: "blur(8px)",
    }}>
      <div style={{ fontSize: "12px", color: "rgba(238,238,238,0.5)", marginBottom: "8px", fontWeight: 600 }}>{label}</div>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} style={{ display: "flex", justifyContent: "space-between", gap: "20px", marginBottom: "4px" }}>
          <span style={{ fontSize: "13px", color: entry.color, textTransform: "capitalize" }}>{entry.dataKey}</span>
          <span style={{ fontSize: "13px", color: "#EEEEEE", fontFamily: "var(--font-mono)" }}>${entry.value.toFixed(2)}</span>
        </div>
      ))}
    </div>
  );
};

export default function FleetSpendChart() {
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={WEEKLY_SPEND} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
        <defs>
          {Object.entries(COLORS).map(([key, color]) => (
            <linearGradient key={key} id={`grad-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.2} />
              <stop offset="95%" stopColor={color} stopOpacity={0.02} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="day"
          tick={{ fill: "rgba(238,238,238,0.35)", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "rgba(238,238,238,0.35)", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          tickFormatter={(v) => `$${v}`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Legend
          wrapperStyle={{ fontSize: "12px", color: "rgba(238,238,238,0.55)", paddingTop: "12px" }}
          formatter={(value) => <span style={{ color: "rgba(238,238,238,0.65)", textTransform: "capitalize" }}>{value}</span>}
        />
        {Object.entries(COLORS).map(([key, color]) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={color}
            strokeWidth={2}
            fill={`url(#grad-${key})`}
            dot={false}
            activeDot={{ r: 4, fill: color, stroke: "none" }}
          />
        ))}
      </AreaChart>
    </ResponsiveContainer>
  );
}
