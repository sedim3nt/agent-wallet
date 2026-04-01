"use client";
import { useState } from "react";
import { PENDING_APPROVALS, AGENTS, formatUSDC, timeAgo } from "@/lib/mockData";

type Decision = "approved" | "denied";

export default function ApprovePage() {
  const [decisions, setDecisions] = useState<Record<string, Decision>>({});

  const decide = (id: string, decision: Decision) => {
    setDecisions((prev) => ({ ...prev, [id]: decision }));
  };

  const pendingCount = PENDING_APPROVALS.filter((p) => !decisions[p.id]).length;

  return (
    <div style={{ padding: "40px 32px", maxWidth: "900px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "8px" }}>
            Approval Queue
          </h1>
          <p style={{ fontSize: "14px", color: "rgba(238,238,238,0.45)" }}>
            Transactions that exceed spending rules require manual authorization
          </p>
        </div>
        {pendingCount > 0 && (
          <div style={{
            padding: "6px 14px",
            background: "rgba(245,101,101,0.08)",
            border: "1px solid rgba(245,101,101,0.25)",
            borderRadius: "6px",
            fontSize: "14px",
            fontWeight: 600,
            color: "#F56565",
          }}>
            {pendingCount} pending
          </div>
        )}
      </div>

      {pendingCount === 0 && (
        <div style={{
          textAlign: "center",
          padding: "80px 40px",
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "12px",
        }}>
          <div style={{ fontSize: "40px", marginBottom: "16px" }}>✅</div>
          <div style={{ fontSize: "18px", fontWeight: 600, marginBottom: "8px" }}>All clear</div>
          <div style={{ fontSize: "14px", color: "rgba(238,238,238,0.4)" }}>No pending approvals</div>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
        {PENDING_APPROVALS.map((approval) => {
          const agent = AGENTS.find((a) => a.id === approval.agentId);
          const decision = decisions[approval.id];

          return (
            <div key={approval.id} style={{
              background: decision
                ? decision === "approved"
                  ? "rgba(61,214,140,0.04)"
                  : "rgba(245,101,101,0.04)"
                : "rgba(255,255,255,0.03)",
              border: `1px solid ${decision
                ? decision === "approved"
                  ? "rgba(61,214,140,0.2)"
                  : "rgba(245,101,101,0.15)"
                : "rgba(255,255,255,0.08)"}`,
              borderRadius: "12px",
              padding: "24px",
              transition: "all 200ms ease",
              opacity: decision ? 0.7 : 1,
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div style={{ display: "flex", gap: "14px", flex: 1 }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "10px",
                    background: "rgba(245,165,36,0.08)",
                    border: "1px solid rgba(245,165,36,0.2)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                    flexShrink: 0,
                  }}>
                    {agent?.emoji}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                      <span style={{ fontWeight: 600, fontSize: "15px", color: "#EEEEEE" }}>
                        {approval.description}
                      </span>
                    </div>
                    <div style={{ fontSize: "13px", color: "rgba(238,238,238,0.5)", marginBottom: "10px" }}>
                      {agent?.emoji} {approval.agentName} → {approval.recipient}
                      <span style={{ marginLeft: "10px", fontFamily: "var(--font-mono)", color: "rgba(238,238,238,0.35)" }}>
                        {timeAgo(approval.timestamp)}
                      </span>
                    </div>
                    <div style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "6px",
                      padding: "4px 10px",
                      background: "rgba(245,165,36,0.08)",
                      border: "1px solid rgba(245,165,36,0.2)",
                      borderRadius: "6px",
                      fontSize: "12px",
                      color: "#F5A524",
                    }}>
                      ⚠️ {approval.exceedsRule}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px", marginLeft: "20px" }}>
                  <div style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "24px",
                    fontWeight: 700,
                    color: "#EEEEEE",
                  }}>
                    {formatUSDC(approval.amount)}
                  </div>
                  {decision ? (
                    <div style={{
                      padding: "6px 14px",
                      borderRadius: "6px",
                      fontSize: "13px",
                      fontWeight: 600,
                      background: decision === "approved" ? "rgba(61,214,140,0.1)" : "rgba(245,101,101,0.1)",
                      color: decision === "approved" ? "#3DD68C" : "#F56565",
                      border: `1px solid ${decision === "approved" ? "rgba(61,214,140,0.25)" : "rgba(245,101,101,0.25)"}`,
                    }}>
                      {decision === "approved" ? "✓ Approved" : "✕ Denied"}
                    </div>
                  ) : (
                    <div style={{ display: "flex", gap: "8px" }}>
                      <button
                        onClick={() => decide(approval.id, "denied")}
                        style={{
                          padding: "8px 16px",
                          background: "rgba(245,101,101,0.08)",
                          border: "1px solid rgba(245,101,101,0.25)",
                          borderRadius: "6px",
                          color: "#F56565",
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 150ms ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,101,101,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(245,101,101,0.08)";
                        }}
                      >
                        Deny
                      </button>
                      <button
                        onClick={() => decide(approval.id, "approved")}
                        style={{
                          padding: "8px 16px",
                          background: "rgba(61,214,140,0.08)",
                          border: "1px solid rgba(61,214,140,0.25)",
                          borderRadius: "6px",
                          color: "#3DD68C",
                          fontSize: "13px",
                          fontWeight: 500,
                          cursor: "pointer",
                          transition: "all 150ms ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(61,214,140,0.15)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLButtonElement).style.background = "rgba(61,214,140,0.08)";
                        }}
                      >
                        Approve
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bulk actions */}
      {pendingCount > 1 && (
        <div style={{
          marginTop: "24px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "10px",
          paddingTop: "24px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <button
            onClick={() => {
              PENDING_APPROVALS.filter((p) => !decisions[p.id]).forEach((p) => decide(p.id, "denied"));
            }}
            style={{
              padding: "8px 18px",
              background: "rgba(245,101,101,0.06)",
              border: "1px solid rgba(245,101,101,0.2)",
              borderRadius: "6px",
              color: "#F56565",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Deny all pending
          </button>
          <button
            onClick={() => {
              PENDING_APPROVALS.filter((p) => !decisions[p.id]).forEach((p) => decide(p.id, "approved"));
            }}
            style={{
              padding: "8px 18px",
              background: "rgba(61,214,140,0.06)",
              border: "1px solid rgba(61,214,140,0.2)",
              borderRadius: "6px",
              color: "#3DD68C",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
            }}
          >
            Approve all pending
          </button>
        </div>
      )}
    </div>
  );
}
