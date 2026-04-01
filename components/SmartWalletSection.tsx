"use client";

import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import {
  getSmartAccountAddress,
  getEthBalance,
  SIMPLE_ACCOUNT_FACTORY_ADDRESS,
} from "@/lib/smart-wallet";
import type { Address } from "viem";

export default function SmartWalletSection() {
  const { address, isConnected } = useAccount();
  const [smartAddress, setSmartAddress] = useState<Address | null>(null);
  const [ethBalance, setEthBalance] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isConnected || !address) {
      setSmartAddress(null);
      setEthBalance(null);
      return;
    }
    setError(null);
    getSmartAccountAddress(address)
      .then((sa) => {
        setSmartAddress(sa);
        return getEthBalance(sa);
      })
      .then(setEthBalance)
      .catch((e) => {
        console.error("Smart wallet fetch error:", e);
        setError("Could not fetch smart wallet address from Base.");
      });
  }, [address, isConnected]);

  if (!isConnected) {
    return (
      <div style={{
        background: "rgba(94,106,210,0.04)",
        border: "1px solid rgba(94,106,210,0.15)",
        borderRadius: "12px",
        padding: "24px",
        marginBottom: "32px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}>
        <div>
          <div style={{ fontSize: "14px", fontWeight: 600, color: "#EEEEEE", marginBottom: "4px" }}>
            Connect your wallet to create agent wallets on Base
          </div>
          <div style={{ fontSize: "13px", color: "rgba(238,238,238,0.4)" }}>
            ERC-4337 smart accounts · Pimlico bundler · Gas-free via paymaster
          </div>
        </div>
        <div style={{
          fontSize: "12px",
          color: "rgba(238,238,238,0.3)",
          fontFamily: "var(--font-mono)",
        }}>
          Not connected
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: "rgba(94,106,210,0.06)",
      border: "1px solid rgba(94,106,210,0.2)",
      borderRadius: "12px",
      padding: "24px",
      marginBottom: "32px",
    }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px" }}>
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(238,238,238,0.4)", marginBottom: "6px" }}>
            Your Smart Wallet (ERC-4337)
          </div>
          <div style={{ fontSize: "13px", fontFamily: "var(--font-mono)", color: "#8B95E9", wordBreak: "break-all" }}>
            {smartAddress ?? "Computing..."}
          </div>
        </div>
        <div style={{ textAlign: "right" }}>
          <div style={{ fontSize: "11px", letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(238,238,238,0.4)", marginBottom: "6px" }}>
            ETH Balance
          </div>
          <div style={{ fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-mono)", color: "#EEEEEE" }}>
            {ethBalance !== null ? `${ethBalance} ETH` : "—"}
          </div>
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
        <div style={{
          fontSize: "11px",
          color: "rgba(238,238,238,0.35)",
          fontFamily: "var(--font-mono)",
        }}>
          EOA: {address?.slice(0, 10)}...{address?.slice(-8)}
        </div>
        <div style={{ height: "12px", width: "1px", background: "rgba(255,255,255,0.1)" }} />
        <div style={{
          fontSize: "11px",
          color: "rgba(61,214,140,0.7)",
          display: "flex",
          alignItems: "center",
          gap: "4px",
        }}>
          <span style={{ width: 5, height: 5, borderRadius: "50%", background: "#3DD68C", display: "inline-block" }} />
          Base Mainnet
        </div>
        <div style={{ height: "12px", width: "1px", background: "rgba(255,255,255,0.1)" }} />
        <div style={{ fontSize: "11px", color: "rgba(238,238,238,0.35)" }}>
          Factory: {SIMPLE_ACCOUNT_FACTORY_ADDRESS.slice(0, 10)}...
        </div>
      </div>

      {error && (
        <div style={{
          marginTop: "12px",
          padding: "8px 12px",
          background: "rgba(245,101,101,0.08)",
          border: "1px solid rgba(245,101,101,0.2)",
          borderRadius: "6px",
          fontSize: "12px",
          color: "#F56565",
        }}>
          ⚠️ {error}
        </div>
      )}

      <div style={{ marginTop: "16px", paddingTop: "16px", borderTop: "1px solid rgba(94,106,210,0.15)" }}>
        <button
          disabled={creating}
          onClick={() => {
            setCreating(true);
            setTimeout(() => setCreating(false), 2000);
          }}
          style={{
            padding: "9px 18px",
            background: creating ? "rgba(94,106,210,0.06)" : "linear-gradient(135deg, #7C5CFC 0%, #5E6AD2 50%, #4EA8DE 100%)",
            border: creating ? "1px solid rgba(94,106,210,0.3)" : "none",
            borderRadius: "6px",
            color: creating ? "#8B95E9" : "#FFFFFF",
            fontSize: "13px",
            fontWeight: 600,
            cursor: creating ? "not-allowed" : "pointer",
            boxShadow: creating ? "none" : "0 0 16px rgba(124,92,252,0.25)",
            transition: "all 200ms ease",
          }}
        >
          {creating ? "⏳ Deploying..." : "+ Create Agent Wallet"}
        </button>
        <span style={{ marginLeft: "12px", fontSize: "12px", color: "rgba(238,238,238,0.35)" }}>
          Deploys a new SimpleAccount via ERC-4337 factory
        </span>
      </div>
    </div>
  );
}
