import { notFound } from "next/navigation";
import Link from "next/link";
import { AGENTS, TRANSACTIONS, SPENDING_RULES, formatUSDC, timeAgo } from "@/lib/mockData";
import StatusBadge from "@/components/StatusBadge";
import SpendBar from "@/components/SpendBar";
import WalletRealDataClient from "@/components/WalletRealDataClient";

export default async function WalletPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const agent = AGENTS.find((a) => a.id === id);
  if (!agent) notFound();

  const txs = TRANSACTIONS.filter((tx) => tx.agentId === id);
  const allTxs = TRANSACTIONS.filter((tx) => tx.agentId === id || true).slice(0, 20);
  const agentTxs = TRANSACTIONS.filter((tx) => tx.agentId === id);

  const totalSpent = agentTxs
    .filter((tx) => tx.type === "spend" && tx.status === "confirmed")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const totalReceived = agentTxs
    .filter((tx) => tx.type === "income")
    .reduce((sum, tx) => sum + tx.amount, 0);

  const ATTESTATIONS = [
    { label: "Creator", value: "Landon / SpiritTree", icon: "🔐" },
    { label: "Purpose", value: agent.purpose, icon: "🎯" },
    { label: "Model", value: agent.model, icon: "🤖" },
    { label: "Created", value: agent.createdAt, icon: "📅" },
    { label: "Success Rate", value: "98.2%", icon: "✅" },
    { label: "Dispute Count", value: "0", icon: "🚨" },
  ];

  return (
    <div style={{ padding: "40px 32px", maxWidth: "1300px", margin: "0 auto" }}>
      {/* Breadcrumb */}
      <div style={{ marginBottom: "24px", fontSize: "13px", color: "rgba(238,238,238,0.4)" }}>
        <Link href="/" style={{ color: "rgba(238,238,238,0.4)", textDecoration: "none" }}>Fleet</Link>
        <span style={{ margin: "0 8px" }}>→</span>
        <span style={{ color: "#EEEEEE" }}>{agent.emoji} {agent.name}</span>
      </div>

      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{
            width: 56,
            height: 56,
            borderRadius: "12px",
            background: "rgba(94,106,210,0.12)",
            border: "1px solid rgba(94,106,210,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "26px",
          }}>
            {agent.emoji}
          </div>
          <div>
            <h1 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", color: "#EEEEEE", marginBottom: "4px" }}>
              {agent.name} Wallet
            </h1>
            <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "rgba(238,238,238,0.4)" }}>
              {agent.walletAddress}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
          <StatusBadge status={agent.status} />
          <button style={{
            padding: "8px 16px",
            background: "rgba(245,101,101,0.08)",
            border: "1px solid rgba(245,101,101,0.25)",
            borderRadius: "6px",
            color: "#F56565",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
          }}>
            🧊 Freeze
          </button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {[
          { label: "USDC Balance", value: formatUSDC(agent.balance), color: "#EEEEEE" },
          { label: "Total Spent", value: formatUSDC(totalSpent), color: "#F56565" },
          { label: "Total Received", value: formatUSDC(totalReceived), color: "#3DD68C" },
          { label: "Transactions", value: String(agentTxs.length), color: "#5E6AD2" },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "20px",
          }}>
            <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(238,238,238,0.35)", marginBottom: "8px" }}>
              {stat.label}
            </div>
            <div style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", color: stat.color, fontFamily: "var(--font-mono)" }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: "24px" }}>
        {/* Transaction Feed */}
        <div>
          <h2 style={{ fontSize: "15px", fontWeight: 600, marginBottom: "16px", color: "#EEEEEE" }}>Transaction Feed</h2>
          <div style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            borderRadius: "10px",
            overflow: "hidden",
          }}>
            {TRANSACTIONS.slice(0, 20).map((tx, i) => {
              const txAgent = AGENTS.find((a) => a.id === tx.agentId);
              return (
                <div key={tx.id} style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "14px 20px",
                  borderBottom: i < 19 ? "1px solid rgba(255,255,255,0.04)" : "none",
                  gap: "14px",
                }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: "8px",
                    background: tx.type === "income" ? "rgba(61,214,140,0.08)" : "rgba(245,101,101,0.08)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "14px",
                    flexShrink: 0,
                  }}>
                    {tx.type === "income" ? "↓" : "↑"}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: "13px", color: "#EEEEEE", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {tx.description}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(238,238,238,0.35)", marginTop: "2px", display: "flex", gap: "8px" }}>
                      <span>{tx.recipient}</span>
                      <span>·</span>
                      <span style={{ fontFamily: "var(--font-mono)" }}>{tx.txHash}</span>
                      <span>·</span>
                      <span>{txAgent?.emoji} {txAgent?.name}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <div style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      fontWeight: 600,
                      color: tx.type === "income" ? "#3DD68C" : "#F56565",
                    }}>
                      {tx.type === "income" ? "+" : "-"}{formatUSDC(tx.amount)}
                    </div>
                    <div style={{ fontSize: "11px", color: "rgba(238,238,238,0.3)", marginTop: "2px", fontFamily: "var(--font-mono)" }}>
                      {timeAgo(tx.timestamp)}
                    </div>
                  </div>
                  <div style={{
                    padding: "2px 7px",
                    borderRadius: "4px",
                    fontSize: "10px",
                    fontWeight: 600,
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                    background: tx.status === "confirmed" ? "rgba(61,214,140,0.08)" : tx.status === "failed" ? "rgba(245,101,101,0.08)" : "rgba(245,165,36,0.08)",
                    color: tx.status === "confirmed" ? "#3DD68C" : tx.status === "failed" ? "#F56565" : "#F5A524",
                    border: `1px solid ${tx.status === "confirmed" ? "rgba(61,214,140,0.2)" : tx.status === "failed" ? "rgba(245,101,101,0.2)" : "rgba(245,165,36,0.2)"}`,
                    flexShrink: 0,
                  }}>
                    {tx.status}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Side Panel */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {/* Budget Gauge */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "24px",
          }}>
            <h3 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(238,238,238,0.5)", marginBottom: "20px" }}>
              Budget Gauge
            </h3>
            <SpendBar spent={agent.dailySpend} cap={agent.dailyCap} />
            <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px" }}>
                <span style={{ color: "rgba(238,238,238,0.4)" }}>Remaining today</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "#3DD68C" }}>{formatUSDC(agent.dailyCap - agent.dailySpend)}</span>
              </div>
            </div>
          </div>

          {/* Spending Rules */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "24px",
          }}>
            <h3 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(238,238,238,0.5)", marginBottom: "20px" }}>
              Spending Rules
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "rgba(238,238,238,0.55)" }}>Daily cap</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "#EEEEEE" }}>{formatUSDC(SPENDING_RULES.dailyCap)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "rgba(238,238,238,0.55)" }}>Per-tx limit</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "#EEEEEE" }}>{formatUSDC(SPENDING_RULES.perTxLimit)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "rgba(238,238,238,0.55)" }}>Approved tokens</span>
                <span style={{ fontFamily: "var(--font-mono)", color: "#EEEEEE" }}>USDC only</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
                <span style={{ color: "rgba(238,238,238,0.55)" }}>Time restrictions</span>
                <span style={{ color: "rgba(238,238,238,0.4)" }}>None</span>
              </div>
            </div>
            <Link href="/rules" style={{
              display: "block",
              marginTop: "16px",
              padding: "8px 0",
              textAlign: "center",
              fontSize: "13px",
              color: "#5E6AD2",
              textDecoration: "none",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              paddingTop: "16px",
            }}>
              Edit rules →
            </Link>
          </div>

          {/* Real Chain Data (connected wallet) */}
          <WalletRealDataClient />

          {/* Identity Attestations */}
          <div style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "12px",
            padding: "24px",
          }}>
            <h3 style={{ fontSize: "13px", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", color: "rgba(238,238,238,0.5)", marginBottom: "20px" }}>
              Identity Attestations
            </h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
              {ATTESTATIONS.map((att) => (
                <div key={att.label} style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "10px",
                  padding: "10px 12px",
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.05)",
                  borderRadius: "8px",
                }}>
                  <span style={{ fontSize: "14px", marginTop: "1px" }}>{att.icon}</span>
                  <div>
                    <div style={{ fontSize: "10px", letterSpacing: "0.06em", textTransform: "uppercase", color: "rgba(238,238,238,0.35)", marginBottom: "2px" }}>
                      {att.label}
                    </div>
                    <div style={{ fontSize: "12px", color: "#EEEEEE" }}>{att.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: "16px",
              padding: "8px 12px",
              background: "rgba(94,106,210,0.06)",
              border: "1px solid rgba(94,106,210,0.2)",
              borderRadius: "8px",
              fontSize: "11px",
              color: "rgba(94,106,210,0.9)",
            }}>
              🔗 Attested on-chain via EAS · Schema #0x9c...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
