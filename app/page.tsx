"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import { AGENTS, TRANSACTIONS, formatUSDC } from "@/lib/mockData";
import StatusBadge from "@/components/StatusBadge";
import SpendBar from "@/components/SpendBar";

const SmartWalletSection = dynamic(
  () => import("@/components/SmartWalletSection"),
  { ssr: false, loading: () => null }
);

export default function FleetPage() {
  const totalBalance = AGENTS.reduce((sum, a) => sum + a.balance, 0);
  const totalSpend = AGENTS.reduce((sum, a) => sum + a.dailySpend, 0);
  const activeCount = AGENTS.filter((a) => a.status === "active").length;
  const recentTxCount = TRANSACTIONS.filter((tx) => {
    const ageMs = Date.now() - new Date(tx.timestamp).getTime();
    return ageMs < 24 * 60 * 60 * 1000;
  }).length;

  return (
    <div style={{ padding: "40px 32px", maxWidth: "1300px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{
          fontSize: "28px",
          fontWeight: 700,
          letterSpacing: "-0.03em",
          marginBottom: "8px",
          color: "#EEEEEE",
        }}>
          Fleet Overview
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(238,238,238,0.45)" }}>
          Managing {AGENTS.length} agent wallets · Base Mainnet · USDC
        </p>
      </div>

      {/* Smart Wallet Section */}
      <SmartWalletSection />

      {/* Stats Bar */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: "16px",
        marginBottom: "32px",
      }}>
        {[
          { label: "Total Balance", value: formatUSDC(totalBalance), mono: true, color: "#EEEEEE" },
          { label: "Today's Spend", value: formatUSDC(totalSpend), mono: true, color: "#F56565" },
          { label: "Active Agents", value: `${activeCount} / ${AGENTS.length}`, mono: false, color: "#3DD68C" },
          { label: "24h Transactions", value: String(recentTxCount), mono: false, color: "#5E6AD2" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "20px 24px",
          }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(238,238,238,0.4)", marginBottom: "8px" }}>
              {stat.label}
            </div>
            <div style={{
              fontSize: "28px",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: stat.color,
              fontFamily: stat.mono ? "var(--font-mono)" : "inherit",
            }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Agent Cards Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
        {AGENTS.map((agent) => (
          <Link
            key={agent.id}
            href={`/wallet/${agent.id}`}
            style={{ textDecoration: "none" }}
          >
            <div style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "24px",
              cursor: "pointer",
              transition: "background 200ms ease, border-color 200ms ease, transform 200ms ease",
              position: "relative",
              overflow: "hidden",
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.14)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              {/* Accent glow for active agents */}
              {agent.status === "active" && (
                <div style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(94,106,210,0.5), transparent)",
                }} />
              )}

              {/* Header Row */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <div style={{
                    width: 44,
                    height: 44,
                    borderRadius: "10px",
                    background: "rgba(94,106,210,0.12)",
                    border: "1px solid rgba(94,106,210,0.25)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}>
                    {agent.emoji}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: "16px", letterSpacing: "-0.01em", color: "#EEEEEE" }}>
                      {agent.name}
                    </div>
                    <div style={{ fontSize: "12px", color: "rgba(238,238,238,0.4)", marginTop: "2px" }}>
                      {agent.model}
                    </div>
                  </div>
                </div>
                <StatusBadge status={agent.status} />
              </div>

              {/* Balance */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ fontSize: "11px", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(238,238,238,0.35)", marginBottom: "4px" }}>
                  USDC Balance
                </div>
                <div style={{
                  fontSize: "32px",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  fontFamily: "var(--font-mono)",
                  color: "#EEEEEE",
                }}>
                  {formatUSDC(agent.balance)}
                </div>
              </div>

              {/* Spend Bar */}
              <SpendBar spent={agent.dailySpend} cap={agent.dailyCap} />

              {/* Footer */}
              <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ fontSize: "12px", color: "rgba(238,238,238,0.35)", fontFamily: "var(--font-mono)" }}>
                  {agent.walletAddress}
                </div>
                <span style={{ fontSize: "12px", color: "#5E6AD2" }}>
                  View wallet →
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Recent Transactions Preview */}
      <div style={{ marginTop: "40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <h2 style={{ fontSize: "16px", fontWeight: 600, letterSpacing: "-0.01em" }}>Recent Transactions</h2>
          <span style={{ fontSize: "13px", color: "rgba(238,238,238,0.4)" }}>Fleet-wide</span>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.02)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: "10px",
          overflow: "hidden",
        }}>
          {TRANSACTIONS.slice(0, 8).map((tx, i) => {
            const agent = AGENTS.find((a) => a.id === tx.agentId);
            return (
              <div key={tx.id} style={{
                display: "flex",
                alignItems: "center",
                padding: "12px 20px",
                borderBottom: i < 7 ? "1px solid rgba(255,255,255,0.04)" : "none",
                gap: "16px",
              }}>
                <span style={{ fontSize: "14px", width: "24px", textAlign: "center" }}>{agent?.emoji}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: "13px", color: "#EEEEEE", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {tx.description}
                  </div>
                  <div style={{ fontSize: "11px", color: "rgba(238,238,238,0.35)", marginTop: "1px" }}>
                    {tx.recipient} · {agent?.name}
                  </div>
                </div>
                <div style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  fontWeight: 600,
                  color: tx.type === "income" ? "#3DD68C" : "#F56565",
                  minWidth: "70px",
                  textAlign: "right",
                }}>
                  {tx.type === "income" ? "+" : "-"}{formatUSDC(tx.amount)}
                </div>
                <div style={{ fontSize: "11px", color: "rgba(238,238,238,0.3)", minWidth: "60px", textAlign: "right", fontFamily: "var(--font-mono)" }}>
                  {new Date(tx.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
                <div style={{
                  width: "6px",
                  height: "6px",
                  borderRadius: "50%",
                  background: tx.status === "confirmed" ? "#3DD68C" : tx.status === "failed" ? "#F56565" : "#F5A524",
                }} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
