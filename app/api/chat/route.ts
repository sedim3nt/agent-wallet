import { streamText } from 'ai';
import { defaultModel } from '@/lib/ai-provider';

const rateLimiter = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 10;
const RATE_WINDOW = 60 * 60 * 1000;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimiter.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimiter.set(ip, { count: 1, resetAt: now + RATE_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

const SYSTEM_PROMPT = `You are The Treasurer — an expert AI assistant for Agent Wallet, a smart wallet infrastructure platform for autonomous AI agents on Base (Ethereum L2).

Your expertise:
- ERC-4337 account abstraction: how smart accounts, bundlers, paymasters, and UserOperations work
- USDC payments on Base: gas-efficient stablecoin transactions for agent-to-agent and agent-to-service payments
- Agent spending rules: how to configure daily limits, per-transaction caps, allowlists, and approval workflows
- Fleet wallet management: managing wallets across multiple AI agents with unified oversight
- Safe multisig treasury: how the Safe treasury contract governs agent wallet funding

Be concise, technical when appropriate, and always ground explanations in practical agent economics.
If someone asks about something outside wallet/payment infrastructure, politely redirect to the topic.`;

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'unknown';
  if (!checkRateLimit(ip)) {
    return new Response('Rate limit exceeded. Try again later.', { status: 429 });
  }

  const { messages } = await req.json();

  const result = streamText({
    model: defaultModel,
    system: SYSTEM_PROMPT,
    messages,
    maxTokens: 1024,
  });

  return result.toDataStreamResponse();
}
