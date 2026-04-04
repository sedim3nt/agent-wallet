# Agent Wallet

Smart wallet management for AI agent fleets — budgets, spending, and on-chain transactions.

**Live:** [agentwallet.spirittree.dev](https://agentwallet.spirittree.dev)
**Stack:** Next.js, TailwindCSS, RainbowKit, wagmi, viem, Recharts
**Status:** Active

## What This Is

Agent Wallet is a prototype dashboard for managing smart wallets attached to AI agents. It visualizes per-agent balances, daily spend limits, transaction history, and fleet-wide financial health. Built with real Web3 infrastructure (RainbowKit, wagmi, viem) to explore what autonomous agent treasury management looks like.

This is one of the more forward-looking SpiritTree projects — exploring the intersection of AI agents and on-chain finance. How do you give agents spending authority without giving them the keys? How do you set budgets and monitor burn rates across a fleet?

## Features

- 💰 **Fleet Overview** — total balance, daily spend, and active agent count
- 🤖 **Per-Agent Cards** — individual balance, status, and spend bars
- 📊 **Transaction History** — recent on-chain activity across the fleet
- 🔗 **Smart Wallet Connect** — RainbowKit wallet connection
- 📈 **Spend Visualization** — Recharts-powered budget tracking

## AI Integration

None yet — this manages agent wallets but doesn't use AI directly. Future: automated budget adjustment based on agent task priority.

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Styling:** TailwindCSS
- **Web3:** RainbowKit, wagmi, viem, permissionless
- **Charts:** Recharts
- **Database:** None (mock data + on-chain reads)
- **AI:** None
- **Hosting:** Vercel

## Local Development

```bash
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID` | WalletConnect project ID |

## Part of SpiritTree

This project is part of the [SpiritTree](https://spirittree.dev) ecosystem — an autonomous AI operation building tools for the agent economy and displaced workers.

## License

MIT
