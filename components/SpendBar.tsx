"use client";
import { formatUSDC } from "@/lib/mockData";

interface SpendBarProps {
  spent: number;
  cap: number;
}

export default function SpendBar({ spent, cap }: SpendBarProps) {
  const pct = Math.min((spent / cap) * 100, 100);
  const isHigh = pct > 75;
  const isMed = pct > 50;
  const barColor = isHigh ? "#F56565" : isMed ? "#F5A524" : "#5E6AD2";

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
        <span style={{ fontSize: "11px", color: "rgba(238,238,238,0.4)", letterSpacing: "0.05em", textTransform: "uppercase" }}>Daily Spend</span>
        <span style={{ fontSize: "12px", color: "rgba(238,238,238,0.65)", fontFamily: "var(--font-mono)" }}>
          {formatUSDC(spent)} <span style={{ color: "rgba(238,238,238,0.3)" }}>/ {formatUSDC(cap)}</span>
        </span>
      </div>
      <div style={{
        height: "4px",
        background: "rgba(255,255,255,0.06)",
        borderRadius: "2px",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          width: `${pct}%`,
          background: barColor,
          borderRadius: "2px",
          transition: "width 600ms cubic-bezier(0,0,0.2,1)",
          boxShadow: `0 0 8px ${barColor}66`,
        }} />
      </div>
      <div style={{ textAlign: "right", marginTop: "4px", fontSize: "11px", color: "rgba(238,238,238,0.3)" }}>
        {pct.toFixed(0)}% utilized
      </div>
    </div>
  );
}
