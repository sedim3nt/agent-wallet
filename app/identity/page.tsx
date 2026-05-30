import {
  AGENTS,
  AGENT_IDENTITIES,
  IDENTITY_SCHEMA_UID,
  type AgentIdentity,
} from "@/lib/mockData";

function reputationColor(score: number): string {
  if (score >= 850) return "#3DD68C";
  if (score >= 700) return "#4EA8DE";
  if (score >= 600) return "#E2B33D";
  return "#F56565";
}

function reputationLabel(score: number): string {
  if (score >= 850) return "Trusted";
  if (score >= 700) return "Established";
  if (score >= 600) return "Emerging";
  return "Unproven";
}

export default function IdentityPage() {
  const verifiedCount = AGENT_IDENTITIES.filter((i) => i.verified).length;
  const totalAttestations = AGENT_IDENTITIES.length;
  const avgReputation = Math.round(
    AGENT_IDENTITIES.reduce((s, i) => s + i.reputationScore, 0) / totalAttestations
  );
  const totalDisputes = AGENT_IDENTITIES.reduce((s, i) => s + i.disputeCount, 0);

  const labelStyle = {
    fontSize: "11px",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
    color: "rgba(238,238,238,0.35)",
  };

  const getAgent = (id: string) => AGENTS.find((a) => a.id === id);

  return (
    <div style={{ padding: "40px 32px", maxWidth: "1100px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "8px" }}>
          Agent Identity
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(238,238,238,0.45)" }}>
          On-chain attestations & reputation · Verified via EAS
        </p>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "12px",
          padding: "5px 10px",
          background: "rgba(94,106,210,0.08)",
          border: "1px solid rgba(94,106,210,0.2)",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#8B95E9",
          fontFamily: "var(--font-mono)",
        }}>
          Schema {IDENTITY_SCHEMA_UID} · creator · purpose · model · reputation · verified
        </div>
      </div>

      {/* KPI Row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "32px" }}>
        {[
          { label: "Attested Agents", value: String(totalAttestations), color: "#EEEEEE" },
          { label: "Verified", value: `${verifiedCount}/${totalAttestations}`, color: "#3DD68C" },
          { label: "Avg Reputation", value: String(avgReputation), color: "#5E6AD2" },
          { label: "Open Disputes", value: String(totalDisputes), color: totalDisputes > 0 ? "#E2B33D" : "#3DD68C" },
        ].map((kpi) => (
          <div key={kpi.label} style={{
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: "10px",
            padding: "20px 24px",
          }}>
            <div style={{ ...labelStyle, marginBottom: "8px" }}>{kpi.label}</div>
            <div style={{ fontSize: "22px", fontWeight: 700, letterSpacing: "-0.01em", color: kpi.color, fontFamily: "var(--font-mono)" }}>
              {kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* Identity cards */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {AGENT_IDENTITIES.map((identity: AgentIdentity) => {
          const agent = getAgent(identity.agentId);
          const repColor = reputationColor(identity.reputationScore);
          return (
            <div
              key={identity.agentId}
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
                padding: "24px 28px",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: "20px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
                  <span style={{
                    fontSize: "28px",
                    width: 48,
                    height: 48,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255,255,255,0.04)",
                    borderRadius: "12px",
                    border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    {agent?.emoji ?? "🤖"}
                  </span>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "17px", fontWeight: 700, letterSpacing: "-0.01em" }}>
                        {agent?.name ?? identity.agentId}
                      </span>
                      {identity.verified ? (
                        <span style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px",
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#3DD68C",
                          background: "rgba(61,214,140,0.1)",
                          border: "1px solid rgba(61,214,140,0.25)",
                          borderRadius: "5px",
                          padding: "2px 7px",
                        }}>
                          ✓ Verified
                        </span>
                      ) : (
                        <span style={{
                          fontSize: "11px",
                          fontWeight: 600,
                          color: "#E2B33D",
                          background: "rgba(226,179,61,0.1)",
                          border: "1px solid rgba(226,179,61,0.25)",
                          borderRadius: "5px",
                          padding: "2px 7px",
                        }}>
                          Pending verification
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: "13px", color: "rgba(238,238,238,0.5)", marginTop: "3px" }}>
                      {identity.purpose}
                    </div>
                  </div>
                </div>

                {/* Reputation */}
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: "26px", fontWeight: 700, fontFamily: "var(--font-mono)", color: repColor, lineHeight: 1 }}>
                    {identity.reputationScore}
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: repColor, marginTop: "4px", letterSpacing: "0.04em" }}>
                    {reputationLabel(identity.reputationScore)}
                  </div>
                </div>
              </div>

              {/* Reputation bar */}
              <div style={{ marginBottom: "20px" }}>
                <div style={{ height: 6, background: "rgba(255,255,255,0.06)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{
                    width: `${(identity.reputationScore / 1000) * 100}%`,
                    height: "100%",
                    background: repColor,
                    borderRadius: 3,
                  }} />
                </div>
              </div>

              {/* Attestation grid */}
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
                gap: "16px",
                paddingTop: "20px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
              }}>
                <div>
                  <div style={{ ...labelStyle, marginBottom: "5px" }}>Creator</div>
                  <div style={{ fontSize: "13px", color: "#EEEEEE" }}>{identity.creator}</div>
                  <div style={{ fontSize: "11px", color: "rgba(238,238,238,0.4)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
                    {identity.creatorAddress}
                  </div>
                </div>
                <div>
                  <div style={{ ...labelStyle, marginBottom: "5px" }}>Model</div>
                  <div style={{ fontSize: "13px", color: "#EEEEEE", fontFamily: "var(--font-mono)" }}>{identity.model}</div>
                </div>
                <div>
                  <div style={{ ...labelStyle, marginBottom: "5px" }}>Success Rate</div>
                  <div style={{ fontSize: "13px", color: "#EEEEEE", fontFamily: "var(--font-mono)" }}>
                    {identity.successRate.toFixed(1)}%
                  </div>
                </div>
                <div>
                  <div style={{ ...labelStyle, marginBottom: "5px" }}>Transactions</div>
                  <div style={{ fontSize: "13px", color: "#EEEEEE", fontFamily: "var(--font-mono)" }}>
                    {identity.totalTransactions.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div style={{ ...labelStyle, marginBottom: "5px" }}>Disputes</div>
                  <div style={{
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                    color: identity.disputeCount > 0 ? "#E2B33D" : "#3DD68C",
                  }}>
                    {identity.disputeCount}
                  </div>
                </div>
                <div>
                  <div style={{ ...labelStyle, marginBottom: "5px" }}>Attested</div>
                  <div style={{ fontSize: "13px", color: "#EEEEEE", fontFamily: "var(--font-mono)" }}>{identity.attestedAt}</div>
                </div>
              </div>

              {/* Attestation UID footer */}
              <div style={{
                marginTop: "16px",
                paddingTop: "14px",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "11px",
                color: "rgba(238,238,238,0.4)",
                fontFamily: "var(--font-mono)",
              }}>
                <span style={{ color: "rgba(238,238,238,0.3)" }}>EAS UID</span>
                <span style={{ color: "#8B95E9" }}>{identity.attestationUid}</span>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ fontSize: "12px", color: "rgba(238,238,238,0.3)", marginTop: "24px", textAlign: "center" }}>
        Attestations shown are read-only in v0.1. Issuing & revoking on-chain credentials via EAS ships in v2.
      </p>
    </div>
  );
}
