"use client";
import dynamic from "next/dynamic";

const FleetSpendChart = dynamic(() => import("@/components/FleetSpendChart"), { ssr: false });
const CostPerOutcomeChart = dynamic(() => import("@/components/CostPerOutcomeChart"), { ssr: false });
import { COST_PER_OUTCOME } from "@/lib/mockData";

export function FleetChartWrapper() {
  return <FleetSpendChart />;
}

export function CostChartWrapper() {
  return <CostPerOutcomeChart />;
}

export function EfficiencyBars() {
  const COLORS = ["#7C5CFC", "#4EA8DE", "#3DD68C", "#F5A524"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
      {COST_PER_OUTCOME.map((a, i) => {
        const color = COLORS[i];
        return (
          <div key={a.agent}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
              <span style={{ fontSize: "13px", color: "rgba(238,238,238,0.75)" }}>{a.agent}</span>
              <span style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color }}>{a.efficiency}%</span>
            </div>
            <div style={{ height: "4px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden" }}>
              <div style={{
                height: "100%",
                width: `${a.efficiency}%`,
                background: color,
                borderRadius: "2px",
                boxShadow: `0 0 8px ${color}55`,
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
