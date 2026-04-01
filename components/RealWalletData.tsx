"use client";

import { useEffect, useState } from "react";
import { getEthBalance, getRecentActivity } from "@/lib/smart-wallet";
import type { Address } from "viem";

interface Props {
  address: Address;
}

export default function RealWalletData({ address }: Props) {
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [blockNumber, setBlockNumber] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    Promise.all([getEthBalance(address), getRecentActivity(address)])
      .then(([bal, activity]) => {
        setEthBalance(bal);
        setBlockNumber(activity.blockNumber.toString());
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [address]);

  return (
    <div style={{
      background: "rgba(94,106,210,0.06)",
      border: "1px solid rgba(94,106,210,0.2)",
      borderRadius: "10px",
      padding: "20px",
      marginTop: "16px",
    }}>
      <div style={{
        fontSize: "11px",
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: "rgba(238,238,238,0.4)",
        marginBottom: "12px",
      }}>
        Live Chain Data · Base Mainnet
      </div>
      {loading ? (
        <div style={{ fontSize: "13px", color: "rgba(238,238,238,0.35)" }}>Fetching...</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
            <span style={{ color: "rgba(238,238,238,0.55)" }}>ETH Balance</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "#EEEEEE" }}>{ethBalance} ETH</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
            <span style={{ color: "rgba(238,238,238,0.55)" }}>Current Block</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "#5E6AD2" }}>#{blockNumber}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px" }}>
            <span style={{ color: "rgba(238,238,238,0.55)" }}>Address</span>
            <span style={{ fontFamily: "var(--font-mono)", color: "rgba(238,238,238,0.6)", fontSize: "11px" }}>
              {address.slice(0, 12)}...{address.slice(-8)}
            </span>
          </div>
          <div style={{
            marginTop: "4px",
            padding: "8px 10px",
            background: "rgba(255,255,255,0.02)",
            borderRadius: "6px",
            fontSize: "11px",
            color: "rgba(238,238,238,0.3)",
          }}>
            Full tx history requires an indexer (Alchemy/Moralis). Wired in v2.
          </div>
        </div>
      )}
    </div>
  );
}
