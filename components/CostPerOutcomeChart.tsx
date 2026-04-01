"use client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { COST_PER_OUTCOME } from "@/lib/mockData";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(22,22,22,0.95)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: "8px",
      padding: "12px 16px",
    }}>
      <div style={{ fontSize: "12px", color: "rgba(238,238,238,0.5)", marginBottom: "6px" }}>{label}</div>
      <div style={{ fontSize: "14px", color: "#EEEEEE", fontFamily: "var(--font-mono)" }}>
        ${payload[0]?.value?.toFixed(2)} / task
      </div>
    </div>
  );
};

const COLORS = ["#7C5CFC", "#4EA8DE", "#3DD68C", "#F5A524"];

export default function CostPerOutcomeChart() {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={COST_PER_OUTCOME} margin={{ top: 5, right: 10, left: -15, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
        <XAxis
          dataKey="agent"
          tick={{ fill: "rgba(238,238,238,0.35)", fontSize: 11 }}
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
        <Bar dataKey="costPerTask" radius={[4, 4, 0, 0]}>
          {COST_PER_OUTCOME.map((_, index) => (
            <Cell key={index} fill={COLORS[index % COLORS.length]} opacity={0.85} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
