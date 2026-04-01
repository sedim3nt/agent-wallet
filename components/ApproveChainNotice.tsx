"use client";
import { useAccount } from "wagmi";
import { PIMLICO_BUNDLER_URL } from "@/lib/smart-wallet";

export default function ApproveChainNotice() {
  const { isConnected } = useAccount();

  return (
    <div style={{
      background: "rgba(94,106,210,0.04)",
      border: "1px solid rgba(94,106,210,0.15)",
      borderRadius: "10px",
      padding: "14px 18px",
      marginBottom: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "16px",
      flexWrap: "wrap",
    }}>
      <div style={{ fontSize: "13px", color: "rgba(238,238,238,0.55)" }}>
        {isConnected ? (
          <>
            ✅ <strong style={{ color: "#8B95E9" }}>Wallet connected</strong> — approved transactions will be submitted as ERC-4337 UserOperations via Pimlico bundler
          </>
        ) : (
          <>
            ⚡ Connect your wallet to submit approved transactions as{" "}
            <strong style={{ color: "rgba(238,238,238,0.8)" }}>ERC-4337 UserOperations</strong> on Base
          </>
        )}
      </div>
      <div style={{
        fontSize: "11px",
        fontFamily: "var(--font-mono)",
        color: "rgba(238,238,238,0.25)",
        wordBreak: "break-all",
        maxWidth: "300px",
      }}>
        {PIMLICO_BUNDLER_URL.replace("?apikey=public", "")}
      </div>
    </div>
  );
}
