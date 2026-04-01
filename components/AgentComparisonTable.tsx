"use client";
import { AGENTS, COST_PER_OUTCOME, formatUSDC } from "@/lib/mockData";

export default function AgentComparisonTable() {
  const statusColors: Record<string, string> = {
    active: "#3DD68C",
    paused: "#F5A524",
    frozen: "#F56565",
  };

  return (
    <table style={{ width: "100%", borderCollapse: "collapse" }}>
      <thead>
        <tr style={{ borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          {["Agent", "Balance", "Daily Spend", "Daily Cap", "Status", "Cost/Task", "Tasks Done", "Efficiency"].map((col) => (
            <th key={col} style={{
              padding: "12px 20px",
              textAlign: "left",
              fontSize: "11px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "rgba(238,238,238,0.35)",
              fontWeight: 600,
            }}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {AGENTS.map((agent, i) => {
          const stats = COST_PER_OUTCOME.find((c) =>
            c.agent.toLowerCase().startsWith(agent.name.toLowerCase())
          );
          const statusColor = statusColors[agent.status];

          return (
            <tr
              key={agent.id}
              style={{ borderBottom: i < AGENTS.length - 1 ? "1px solid rgba(255,255,255,0.04)" : "none" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.02)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "transparent")}
            >
              <td style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span style={{ fontSize: "16px" }}>{agent.emoji}</span>
                  <span style={{ fontSize: "14px", fontWeight: 500, color: "#EEEEEE" }}>{agent.name}</span>
                </div>
              </td>
              <td style={{ padding: "16px 20px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#EEEEEE" }}>
                {formatUSDC(agent.balance)}
              </td>
              <td style={{ padding: "16px 20px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#F56565" }}>
                {formatUSDC(agent.dailySpend)}
              </td>
              <td style={{ padding: "16px 20px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "rgba(238,238,238,0.5)" }}>
                {formatUSDC(agent.dailyCap)}
              </td>
              <td style={{ padding: "16px 20px" }}>
                <span style={{
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  color: statusColor,
                  background: `${statusColor}15`,
                }}>
                  {agent.status}
                </span>
              </td>
              <td style={{ padding: "16px 20px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "#5E6AD2" }}>
                {stats ? formatUSDC(stats.costPerTask) : "—"}
              </td>
              <td style={{ padding: "16px 20px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "rgba(238,238,238,0.65)" }}>
                {stats?.tasksCompleted ?? "—"}
              </td>
              <td style={{ padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <div style={{ flex: 1, height: "3px", background: "rgba(255,255,255,0.06)", borderRadius: "2px", overflow: "hidden", minWidth: "60px" }}>
                    <div style={{
                      height: "100%",
                      width: `${stats?.efficiency ?? 0}%`,
                      background: "#5E6AD2",
                      borderRadius: "2px",
                    }} />
                  </div>
                  <span style={{ fontSize: "12px", color: "rgba(238,238,238,0.55)", fontFamily: "var(--font-mono)", minWidth: "35px" }}>
                    {stats?.efficiency ?? "—"}%
                  </span>
                </div>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
