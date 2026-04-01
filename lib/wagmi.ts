import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { base } from "wagmi/chains";
import { cookieStorage, createStorage } from "wagmi";

export const wagmiConfig = getDefaultConfig({
  appName: "AgentWallet",
  projectId: "agentwalletdemo",
  chains: [base],
  ssr: true,
  storage: createStorage({
    storage: cookieStorage,
  }),
});
