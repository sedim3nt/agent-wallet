import { AGENTS, COST_PER_OUTCOME, WEEKLY_SPEND, formatUSDC } from "@/lib/mockData";
import { FleetChartWrapper, CostChartWrapper, EfficiencyBars } from "@/components/AnalyticsCharts";
import AgentComparisonTable from "@/components/AgentComparisonTable";

export default function AnalyticsPage() {
  const totalWeeklySpend = WEEKLY_SPEND.reduce((sum, day) => {
    return sum + day.orchard + day.rowan + day.forrest + day.sage;
  }, 0);

  const avgCostPerTask = COST_PER_OUTCOME.reduce((sum, a) => sum + a.costPerTask, 0) / COST_PER_OUTCOME.length;

  const totalTasksCompleted = COST_PER_OUTCOME.reduce((sum, a) => sum + a.tasksCompleted, 0);

  const bestAgent = COST_PER_OUTCOME.reduce((best, a) => a.costPerTask < best.costPerTask ? a : best);

  return (
    <div style={{ padding: "40px 32px", maxWidth: "1300px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "8px" }}>
          Analytics
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(238,238,238,0.45)" }}>
          Fleet spending patterns · 7-day window · All agents
        </p>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {[
          { label: "7-Day Fleet Spend", value: formatUSDC(totalWeeklySpend), color: "#EEEEEE" },
          { label: "Avg Cost / Task", value: formatUSDC(avgCostPerTask), color: "#5E6AD2" },
          { label: "Tasks Completed", value: String(totalTasksCompleted), color: "#4EA8DE" },
          { label: "Most Efficient", value: bestAgent.agent, color: "#3DD68C" },
        ].map((kpi) => (
          <div key={kpi.label} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "20px 24px",
          }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(238,238,238,0.35)", marginBottom: "8px" }}>
              {kpi.label}
            </div>
            <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.01em", color: kpi.color, fontFamily: "var(--font-mono)" }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* Fleet Spend Chart */}
      <div style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "12px",
        padding: "28px",
        marginBottom: "24px",
      }}>
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em", color: "#EEEEEE", marginBottom: "4px" }}>
            Fleet Daily Spend
          </h2>
          <p style={{ fontSize: "12px", color: "rgba(238,238,238,0.4)" }}>USDC spent per agent over 7 days</p>
        </div>
        <FleetChartWrapper />
      </div>

      {/* Lower Charts + Table */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "24px" }}>
        {/* Cost Per Outcome */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "28px",
        }}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em", color: "#EEEEEE", marginBottom: "4px" }}>
              Cost Per Task
            </h2>
            <p style={{ fontSize: "12px", color: "rgba(238,238,238,0.4)" }}>Average USDC per completed task</p>
          </div>
          <CostChartWrapper />
        </div>

        {/* Efficiency Breakdown */}
        <div style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.08)",
          borderRadius: "12px",
          padding: "28px",
        }}>
          <div style={{ marginBottom: "20px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em", color: "#EEEEEE", marginBottom: "4px" }}>
              Agent Efficiency
            </h2>
            <p style={{ fontSize: "12px", color: "rgba(238,238,238,0.4)" }}>Success rate for completed tasks</p>
          </div>
          <EfficiencyBars />
        </div>
      </div>

      {/* Agent Comparison Table */}
      <div style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: "12px",
        overflow: "hidden",
      }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "-0.01em", color: "#EEEEEE" }}>
            Agent Comparison
          </h2>
        </div>
        <AgentComparisonTable />
      </div>
    </div>
  );
}
