import { AgentStatus } from "@/lib/mockData";

export default function StatusBadge({ status }: { status: AgentStatus }) {
  const map = {
    active: { color: "#3DD68C", bg: "rgba(61,214,140,0.10)", border: "rgba(61,214,140,0.25)", label: "Active" },
    paused: { color: "#F5A524", bg: "rgba(245,165,36,0.10)", border: "rgba(245,165,36,0.25)", label: "Paused" },
    frozen: { color: "#F56565", bg: "rgba(245,101,101,0.10)", border: "rgba(245,101,101,0.25)", label: "Frozen" },
  };
  const s = map[status];
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "5px",
      padding: "3px 8px",
      fontSize: "11px",
      fontWeight: 600,
      color: s.color,
      background: s.bg,
      border: `1px solid ${s.border}`,
      borderRadius: "4px",
      letterSpacing: "0.04em",
      textTransform: "uppercase",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.color, display: "inline-block" }} />
      {s.label}
    </span>
  );
}
