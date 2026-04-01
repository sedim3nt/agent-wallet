"use client";
import { useState } from "react";
import { SPENDING_RULES, formatUSDC } from "@/lib/mockData";

export default function RulesPage() {
  const [dailyCap, setDailyCap] = useState(SPENDING_RULES.dailyCap);
  const [perTxLimit, setPerTxLimit] = useState(SPENDING_RULES.perTxLimit);
  const [timeEnabled, setTimeEnabled] = useState(SPENDING_RULES.timeRestrictions.enabled);
  const [startHour, setStartHour] = useState(SPENDING_RULES.timeRestrictions.startHour);
  const [endHour, setEndHour] = useState(SPENDING_RULES.timeRestrictions.endHour);
  const [recipients, setRecipients] = useState<string[]>(SPENDING_RULES.approvedRecipients);
  const [newRecipient, setNewRecipient] = useState("");
  const [saved, setSaved] = useState(false);

  const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const [activeDays, setActiveDays] = useState(SPENDING_RULES.timeRestrictions.daysAllowed);

  const toggleDay = (day: string) => {
    setActiveDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const addRecipient = () => {
    if (newRecipient.trim() && !recipients.includes(newRecipient.trim())) {
      setRecipients([...recipients, newRecipient.trim()]);
      setNewRecipient("");
    }
  };

  const removeRecipient = (r: string) => {
    setRecipients(recipients.filter((x) => x !== r));
  };

  const handleSave = () => {
    // Persist rules to localStorage (on-chain enforcement is v2)
    const rules = { dailyCap, perTxLimit, timeEnabled, startHour, endHour, activeDays, recipients };
    if (typeof window !== "undefined") {
      localStorage.setItem("agentWalletRules", JSON.stringify(rules));
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.10)",
    borderRadius: "8px",
    fontFamily: "var(--font-sans)",
    fontSize: "14px",
    color: "#EEEEEE",
    outline: "none",
  };

  const labelStyle = {
    display: "block",
    fontSize: "11px",
    fontWeight: 600,
    color: "rgba(238,238,238,0.45)",
    marginBottom: "8px",
    letterSpacing: "0.08em",
    textTransform: "uppercase" as const,
  };

  const sectionStyle = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "12px",
    padding: "28px",
    marginBottom: "20px",
  };

  return (
    <div style={{ padding: "40px 32px", maxWidth: "800px", margin: "0 auto" }}>
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ fontSize: "24px", fontWeight: 700, letterSpacing: "-0.02em", marginBottom: "8px" }}>
          Spending Rules
        </h1>
        <p style={{ fontSize: "14px", color: "rgba(238,238,238,0.45)" }}>
          Configure fleet-wide spending rules
        </p>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          marginTop: "8px",
          padding: "5px 10px",
          background: "rgba(94,106,210,0.08)",
          border: "1px solid rgba(94,106,210,0.2)",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#8B95E9",
        }}>
          ⛓️ Rules will be enforced on-chain via SpendingGuard.sol in v2 · Currently stored in localStorage
        </div>
      </div>

      {/* Daily Cap */}
      <div style={sectionStyle}>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={labelStyle}>Daily Spending Cap</label>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: 700, color: "#EEEEEE" }}>
              {formatUSDC(dailyCap)}
            </span>
          </div>
          <input
            type="range"
            min={5}
            max={500}
            step={5}
            value={dailyCap}
            onChange={(e) => setDailyCap(Number(e.target.value))}
            style={{
              width: "100%",
              accentColor: "#5E6AD2",
              height: "4px",
              cursor: "pointer",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "11px", color: "rgba(238,238,238,0.3)", fontFamily: "var(--font-mono)" }}>
            <span>$5.00</span>
            <span>$500.00</span>
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "rgba(238,238,238,0.4)", margin: 0 }}>
          Agent wallets will auto-pause when daily spend reaches this limit. Resets at midnight UTC.
        </p>
      </div>

      {/* Per-Transaction Limit */}
      <div style={sectionStyle}>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
            <label style={labelStyle}>Per-Transaction Limit</label>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "20px", fontWeight: 700, color: "#EEEEEE" }}>
              {formatUSDC(perTxLimit)}
            </span>
          </div>
          <input
            type="range"
            min={0.5}
            max={50}
            step={0.5}
            value={perTxLimit}
            onChange={(e) => setPerTxLimit(Number(e.target.value))}
            style={{
              width: "100%",
              accentColor: "#5E6AD2",
              cursor: "pointer",
            }}
          />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: "6px", fontSize: "11px", color: "rgba(238,238,238,0.3)", fontFamily: "var(--font-mono)" }}>
            <span>$0.50</span>
            <span>$50.00</span>
          </div>
        </div>
        <p style={{ fontSize: "12px", color: "rgba(238,238,238,0.4)", margin: 0 }}>
          Transactions above this amount are queued for manual approval.
        </p>
      </div>

      {/* Approved Recipients */}
      <div style={sectionStyle}>
        <label style={labelStyle}>Approved Recipients</label>
        <p style={{ fontSize: "12px", color: "rgba(238,238,238,0.4)", marginBottom: "16px" }}>
          Only these recipients can receive funds without approval.
        </p>
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: "8px", marginBottom: "16px" }}>
          {recipients.map((r) => (
            <div key={r} style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "4px 10px",
              background: "rgba(94,106,210,0.08)",
              border: "1px solid rgba(94,106,210,0.2)",
              borderRadius: "20px",
              fontSize: "12px",
              color: "rgba(238,238,238,0.8)",
            }}>
              {r}
              <button
                onClick={() => removeRecipient(r)}
                style={{
                  background: "none",
                  border: "none",
                  color: "rgba(238,238,238,0.4)",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "14px",
                  lineHeight: 1,
                  display: "flex",
                  alignItems: "center",
                }}
              >×</button>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <input
            type="text"
            placeholder="Add recipient..."
            value={newRecipient}
            onChange={(e) => setNewRecipient(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addRecipient()}
            style={{ ...inputStyle, flex: 1 }}
          />
          <button
            onClick={addRecipient}
            style={{
              padding: "10px 18px",
              background: "rgba(94,106,210,0.12)",
              border: "1px solid rgba(94,106,210,0.3)",
              borderRadius: "8px",
              color: "#8B95E9",
              fontSize: "13px",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            + Add
          </button>
        </div>
      </div>

      {/* Time Restrictions */}
      <div style={sectionStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <label style={{ ...labelStyle, margin: 0 }}>Time Restrictions</label>
            <p style={{ fontSize: "12px", color: "rgba(238,238,238,0.4)", margin: "4px 0 0 0" }}>
              Restrict agent spending to certain hours
            </p>
          </div>
          <button
            onClick={() => setTimeEnabled(!timeEnabled)}
            style={{
              width: 40,
              height: 22,
              borderRadius: 11,
              background: timeEnabled ? "#5E6AD2" : "rgba(255,255,255,0.1)",
              border: "none",
              cursor: "pointer",
              position: "relative",
              transition: "background 200ms ease",
            }}
          >
            <span style={{
              position: "absolute",
              top: 3,
              left: timeEnabled ? 21 : 3,
              width: 16,
              height: 16,
              borderRadius: "50%",
              background: "#fff",
              transition: "left 200ms ease",
              display: "block",
            }} />
          </button>
        </div>

        {timeEnabled && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Start Hour (UTC)</label>
                <select
                  value={startHour}
                  onChange={(e) => setStartHour(Number(e.target.value))}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i} style={{ background: "#1A1A1A" }}>
                      {String(i).padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label style={labelStyle}>End Hour (UTC)</label>
                <select
                  value={endHour}
                  onChange={(e) => setEndHour(Number(e.target.value))}
                  style={{ ...inputStyle, cursor: "pointer" }}
                >
                  {Array.from({ length: 24 }, (_, i) => (
                    <option key={i} value={i} style={{ background: "#1A1A1A" }}>
                      {String(i).padStart(2, "0")}:00
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label style={labelStyle}>Allowed Days</label>
              <div style={{ display: "flex", gap: "8px" }}>
                {DAYS.map((day) => (
                  <button
                    key={day}
                    onClick={() => toggleDay(day)}
                    style={{
                      padding: "6px 10px",
                      borderRadius: "6px",
                      fontSize: "12px",
                      fontWeight: 600,
                      cursor: "pointer",
                      background: activeDays.includes(day) ? "rgba(94,106,210,0.15)" : "rgba(255,255,255,0.04)",
                      border: activeDays.includes(day) ? "1px solid rgba(94,106,210,0.4)" : "1px solid rgba(255,255,255,0.08)",
                      color: activeDays.includes(day) ? "#8B95E9" : "rgba(238,238,238,0.4)",
                      transition: "all 150ms ease",
                    }}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px" }}>
        <button style={{
          padding: "10px 20px",
          background: "transparent",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "6px",
          color: "rgba(238,238,238,0.6)",
          fontSize: "14px",
          fontWeight: 500,
          cursor: "pointer",
        }}>
          Reset to defaults
        </button>
        <button
          onClick={handleSave}
          style={{
            padding: "10px 24px",
            background: saved ? "rgba(61,214,140,0.12)" : "linear-gradient(135deg, #7C5CFC 0%, #5E6AD2 50%, #4EA8DE 100%)",
            border: saved ? "1px solid rgba(61,214,140,0.3)" : "none",
            borderRadius: "6px",
            color: saved ? "#3DD68C" : "#FFFFFF",
            fontSize: "14px",
            fontWeight: 600,
            cursor: "pointer",
            transition: "all 200ms ease",
            boxShadow: saved ? "none" : "0 0 20px rgba(124,92,252,0.3)",
          }}
        >
          {saved ? "✓ Saved" : "Save Rules"}
        </button>
      </div>
    </div>
  );
}
