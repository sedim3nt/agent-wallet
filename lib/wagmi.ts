import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";
import { cookieStorage, createStorage } from "wagmi";

export const wagmiConfig = getDefaultConfig({
  appName: "AgentWallet",
  // WalletConnect Cloud project ID. Set NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID
  // in the environment; falls back to a demo id for local/preview builds.
  projectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "agentwalletdemo",
  chains: [base],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
