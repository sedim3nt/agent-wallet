export type AgentStatus = "active" | "paused" | "frozen";

export interface Agent {
  id: string;
  name: string;
  emoji: string;
  balance: number;
  dailySpend: number;
  dailyCap: number;
  status: AgentStatus;
  walletAddress: string;
  model: string;
  purpose: string;
  createdAt: string;
}

export interface Transaction {
  id: string;
  agentId: string;
  timestamp: string;
  amount: number;
  type: "spend" | "income";
  recipient: string;
  description: string;
  status: "confirmed" | "pending" | "failed";
  txHash: string;
}

export interface PendingApproval {
  id: string;
  agentId: string;
  agentName: string;
  timestamp: string;
  amount: number;
  recipient: string;
  description: string;
  exceedsRule: string;
}

export const AGENTS: Agent[] = [
  {
    id: "orchard",
    name: "Orchard",
    emoji: "🌳",
    balance: 142.85,
    dailySpend: 18.42,
    dailyCap: 50.00,
    status: "active",
    walletAddress: "0x4a8b...f2c1",
    model: "claude-opus-4-6",
    purpose: "Orchestration & fleet management",
    createdAt: "2026-01-15",
  },
  {
    id: "rowan",
    name: "Rowan",
    emoji: "🌿",
    balance: 67.20,
    dailySpend: 34.10,
    dailyCap: 40.00,
    status: "active",
    walletAddress: "0x7c2d...a3e8",
    model: "claude-sonnet-4-6",
    purpose: "Research & data retrieval",
    createdAt: "2026-01-22",
  },
  {
    id: "forrest",
    name: "Forrest",
    emoji: "🌲",
    balance: 23.50,
    dailySpend: 0,
    dailyCap: 30.00,
    status: "paused",
    walletAddress: "0x9e1f...b7d4",
    model: "claude-sonnet-4-6",
    purpose: "Content generation & publishing",
    createdAt: "2026-02-03",
  },
  {
    id: "sage",
    name: "Sage",
    emoji: "🌱",
    balance: 5.12,
    dailySpend: 0,
    dailyCap: 25.00,
    status: "frozen",
    walletAddress: "0x3b6a...c9f2",
    model: "claude-sonnet-4-6",
    purpose: "Ops & journal automation",
    createdAt: "2026-02-18",
  },
];

const now = new Date("2026-04-01T00:47:00-06:00");
const ts = (minutesAgo: number) => {
  const d = new Date(now.getTime() - minutesAgo * 60 * 1000);
  return d.toISOString();
};

export const TRANSACTIONS: Transaction[] = [
  { id: "tx001", agentId: "orchard", timestamp: ts(12), amount: 0.45, type: "spend", recipient: "Perplexity API", description: "Research API call", status: "confirmed", txHash: "0xab12...cd34" },
  { id: "tx002", agentId: "rowan", timestamp: ts(18), amount: 1.20, type: "spend", recipient: "OpenAI Embeddings", description: "Vector embedding batch", status: "confirmed", txHash: "0xef56...gh78" },
  { id: "tx003", agentId: "orchard", timestamp: ts(34), amount: 5.00, type: "income", recipient: "Treasury", description: "Budget allocation", status: "confirmed", txHash: "0xij90...kl12" },
  { id: "tx004", agentId: "rowan", timestamp: ts(45), amount: 2.80, type: "spend", recipient: "Tavily Search", description: "Web search queries", status: "confirmed", txHash: "0xmn34...op56" },
  { id: "tx005", agentId: "orchard", timestamp: ts(67), amount: 0.12, type: "spend", recipient: "Pinecone", description: "Vector DB query", status: "confirmed", txHash: "0xqr78...st90" },
  { id: "tx006", agentId: "rowan", timestamp: ts(89), amount: 3.50, type: "spend", recipient: "Anthropic API", description: "Content generation", status: "confirmed", txHash: "0xuv12...wx34" },
  { id: "tx007", agentId: "orchard", timestamp: ts(102), amount: 0.08, type: "spend", recipient: "Cloudflare R2", description: "Data storage write", status: "confirmed", txHash: "0xyz56...ab78" },
  { id: "tx008", agentId: "forrest", timestamp: ts(120), amount: 4.20, type: "spend", recipient: "Anthropic API", description: "Blog post draft", status: "confirmed", txHash: "0xcd90...ef12" },
  { id: "tx009", agentId: "rowan", timestamp: ts(145), amount: 0.95, type: "spend", recipient: "Exa AI", description: "Neural search", status: "confirmed", txHash: "0xgh34...ij56" },
  { id: "tx010", agentId: "orchard", timestamp: ts(167), amount: 12.00, type: "income", recipient: "Treasury", description: "Daily budget top-up", status: "confirmed", txHash: "0xkl78...mn90" },
  { id: "tx011", agentId: "rowan", timestamp: ts(189), amount: 1.75, type: "spend", recipient: "Firecrawl", description: "Web scrape job", status: "confirmed", txHash: "0xop12...qr34" },
  { id: "tx012", agentId: "orchard", timestamp: ts(210), amount: 0.30, type: "spend", recipient: "Upstash Redis", description: "Cache operations", status: "confirmed", txHash: "0xst56...uv78" },
  { id: "tx013", agentId: "rowan", timestamp: ts(234), amount: 6.40, type: "spend", recipient: "Anthropic API", description: "Report synthesis", status: "confirmed", txHash: "0xwx90...yz12" },
  { id: "tx014", agentId: "sage", timestamp: ts(260), amount: 0.55, type: "spend", recipient: "Notion API", description: "Journal entry write", status: "failed", txHash: "0xab34...cd56" },
  { id: "tx015", agentId: "orchard", timestamp: ts(280), amount: 2.10, type: "spend", recipient: "Perplexity API", description: "Market research query", status: "confirmed", txHash: "0xef78...gh90" },
  { id: "tx016", agentId: "rowan", timestamp: ts(310), amount: 0.22, type: "spend", recipient: "Pinecone", description: "Similarity search", status: "confirmed", txHash: "0xij12...kl34" },
  { id: "tx017", agentId: "forrest", timestamp: ts(340), amount: 8.90, type: "spend", recipient: "Anthropic API", description: "Newsletter generation", status: "confirmed", txHash: "0xmn56...op78" },
  { id: "tx018", agentId: "orchard", timestamp: ts(360), amount: 0.75, type: "spend", recipient: "Tavily Search", description: "Competitor research", status: "confirmed", txHash: "0xqr90...st12" },
  { id: "tx019", agentId: "rowan", timestamp: ts(390), amount: 3.15, type: "spend", recipient: "Anthropic API", description: "Data analysis", status: "confirmed", txHash: "0xuv34...wx56" },
  { id: "tx020", agentId: "orchard", timestamp: ts(420), amount: 25.00, type: "income", recipient: "Treasury", description: "Weekly budget allocation", status: "confirmed", txHash: "0xyz78...ab90" },
];

export const PENDING_APPROVALS: PendingApproval[] = [
  { id: "pa001", agentId: "rowan", agentName: "Rowan", timestamp: ts(5), amount: 47.50, recipient: "Anthropic API", description: "Large model inference batch — 500 calls", exceedsRule: "Exceeds per-tx limit of $5.00" },
  { id: "pa002", agentId: "orchard", agentName: "Orchard", timestamp: ts(11), amount: 12.80, recipient: "Firecrawl Pro", description: "Full site crawl — 1,000 pages", exceedsRule: "Exceeds daily cap ($18.42 + $12.80 > $50.00)" },
  { id: "pa003", agentId: "forrest", agentName: "Forrest", timestamp: ts(22), amount: 29.99, recipient: "ElevenLabs API", description: "Audio generation — podcast episode", exceedsRule: "Recipient not on allowlist" },
  { id: "pa004", agentId: "rowan", agentName: "Rowan", timestamp: ts(38), amount: 8.40, recipient: "Perplexity Pro", description: "Deep research — 20 queries", exceedsRule: "Exceeds per-tx limit of $5.00" },
  { id: "pa005", agentId: "orchard", agentName: "Orchard", timestamp: ts(54), amount: 6.25, recipient: "Replicate API", description: "Image generation — 50 samples", exceedsRule: "Recipient not on allowlist" },
];

export const SPENDING_RULES = {
  dailyCap: 50.00,
  perTxLimit: 5.00,
  approvedRecipients: [
    "Perplexity API",
    "Anthropic API",
    "Tavily Search",
    "Pinecone",
    "Cloudflare R2",
    "Upstash Redis",
    "Exa AI",
    "OpenAI Embeddings",
    "Firecrawl",
    "Notion API",
  ],
  timeRestrictions: {
    enabled: false,
    startHour: 8,
    endHour: 22,
    daysAllowed: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  },
};

export const WEEKLY_SPEND = [
  { day: "Mon", orchard: 12.4, rowan: 18.2, forrest: 9.8, sage: 3.2 },
  { day: "Tue", orchard: 15.6, rowan: 22.1, forrest: 0, sage: 0 },
  { day: "Wed", orchard: 8.9, rowan: 31.4, forrest: 14.2, sage: 0 },
  { day: "Thu", orchard: 21.3, rowan: 19.7, forrest: 0, sage: 0 },
  { day: "Fri", orchard: 11.8, rowan: 27.3, forrest: 7.5, sage: 0 },
  { day: "Sat", orchard: 6.2, rowan: 8.9, forrest: 0, sage: 0 },
  { day: "Sun", orchard: 18.4, rowan: 34.1, forrest: 0, sage: 0 },
];

export const COST_PER_OUTCOME = [
  { agent: "Orchard 🌳", costPerTask: 0.82, tasksCompleted: 142, efficiency: 94 },
  { agent: "Rowan 🌿", costPerTask: 1.47, tasksCompleted: 89, efficiency: 87 },
  { agent: "Forrest 🌲", costPerTask: 2.10, tasksCompleted: 23, efficiency: 71 },
  { agent: "Sage 🌱", costPerTask: 0.55, tasksCompleted: 8, efficiency: 62 },
];

export function formatUSDC(amount: number): string {
  return `$${amount.toFixed(2)}`;
}

export function timeAgo(isoString: string): string {
  const diff = Date.now() - new Date(isoString).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hours = Math.floor(mins / 60);
  if (hours < 24) return `${hours}h ago`;
  return `${Math.floor(hours / 24)}d ago`;
}
