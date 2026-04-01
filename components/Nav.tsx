"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

// Dynamically import wallet components to avoid SSR issues
const ConnectButton = dynamic(
  () => import("@rainbow-me/rainbowkit").then((m) => m.ConnectButton),
  { ssr: false }
);

const navLinks = [
  { href: "/", label: "Fleet" },
  { href: "/approve", label: "Approve" },
  { href: "/rules", label: "Rules" },
  { href: "/analytics", label: "Analytics" },
];

export default function Nav() {
  const pathname = usePathname();

  return (
    <nav
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "var(--nav-height)",
        background: "rgba(10,10,10,0.85)",
        backdropFilter: "blur(16px) saturate(160%)",
        WebkitBackdropFilter: "blur(16px) saturate(160%)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        padding: "0 32px",
        gap: "0",
      }}
    >
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px", textDecoration: "none", marginRight: "40px" }}>
        <span style={{ fontSize: "18px" }}>⛓️</span>
        <span style={{
          fontWeight: 700,
          fontSize: "15px",
          letterSpacing: "-0.02em",
          background: "linear-gradient(90deg, #7C5CFC 0%, #4EA8DE 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>
          AgentWallet
        </span>
      </Link>

      <div style={{ display: "flex", alignItems: "center", gap: "4px", flex: 1 }}>
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "6px 12px",
                fontSize: "14px",
                fontWeight: 500,
                color: isActive ? "#EEEEEE" : "rgba(238,238,238,0.55)",
                textDecoration: "none",
                borderRadius: "6px",
                background: isActive ? "rgba(255,255,255,0.06)" : "transparent",
                transition: "color 150ms ease, background 150ms ease",
              }}
            >
              {link.label}
              {link.href === "/approve" && (
                <span style={{
                  marginLeft: "6px",
                  fontSize: "11px",
                  fontWeight: 600,
                  background: "rgba(245,101,101,0.15)",
                  color: "#F56565",
                  border: "1px solid rgba(245,101,101,0.3)",
                  borderRadius: "4px",
                  padding: "1px 5px",
                }}>5</span>
              )}
            </Link>
          );
        })}
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "6px",
          padding: "5px 10px",
          background: "rgba(61,214,140,0.08)",
          border: "1px solid rgba(61,214,140,0.2)",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#3DD68C",
          fontFamily: "var(--font-mono)",
        }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#3DD68C", display: "inline-block" }} />
          Base Mainnet
        </div>
        <ConnectButton
          accountStatus="avatar"
          chainStatus="none"
          showBalance={false}
        />
      </div>
    </nav>
  );
}
