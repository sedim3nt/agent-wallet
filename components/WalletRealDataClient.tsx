"use client";
import dynamic from "next/dynamic";

const WalletRealDataLoader = dynamic(
  () => import("./WalletRealDataLoader"),
  { ssr: false }
);

export default function WalletRealDataClient() {
  return <WalletRealDataLoader />;
}
