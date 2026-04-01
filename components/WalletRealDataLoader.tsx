"use client";

import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { getSmartAccountAddress } from "@/lib/smart-wallet";
import type { Address } from "viem";

const RealWalletData = dynamic(() => import("./RealWalletData"), { ssr: false });

export default function WalletRealDataLoader() {
  const { address, isConnected } = useAccount();
  const [smartAddress, setSmartAddress] = useState<Address | null>(null);

  useEffect(() => {
    if (!isConnected || !address) {
      setSmartAddress(null);
      return;
    }
    getSmartAccountAddress(address)
      .then(setSmartAddress)
      .catch(console.error);
  }, [address, isConnected]);

  if (!isConnected || !smartAddress) return null;

  return (
    <div>
      <div style={{
        fontSize: "13px",
        fontWeight: 600,
        color: "#8B95E9",
        marginBottom: "4px",
        display: "flex",
        alignItems: "center",
        gap: "6px",
      }}>
        <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#7C5CFC", display: "inline-block" }} />
        Your Connected Wallet
      </div>
      <RealWalletData address={smartAddress} />
    </div>
  );
}
