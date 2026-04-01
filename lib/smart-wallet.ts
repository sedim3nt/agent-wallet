import {
  createPublicClient,
  http,
  type Address,
  type Hex,
} from "viem";
import { base } from "viem/chains";

// ─── Public client for Base ───────────────────────────────────────────────────
export const publicClient = createPublicClient({
  chain: base,
  transport: http("https://mainnet.base.org"),
});

// ─── Pimlico bundler endpoint ─────────────────────────────────────────────────
export const PIMLICO_BUNDLER_URL =
  "https://api.pimlico.io/v2/base/rpc?apikey=public";

// ─── SimpleAccountFactory on Base ────────────────────────────────────────────
// EIP-4337 canonical SimpleAccountFactory v0.6
export const SIMPLE_ACCOUNT_FACTORY_ADDRESS: Address =
  "0x9406Cc6185a346906296840746125a0E44976454";

const SIMPLE_ACCOUNT_FACTORY_ABI = [
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "salt", type: "uint256" },
    ],
    name: "getAddress",
    outputs: [{ internalType: "address", name: "", type: "address" }],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      { internalType: "address", name: "owner", type: "address" },
      { internalType: "uint256", name: "salt", type: "uint256" },
    ],
    name: "createAccount",
    outputs: [
      { internalType: "contract SimpleAccount", name: "ret", type: "address" },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
] as const;

/**
 * Compute the counterfactual smart-account address for a given EOA owner.
 * Salt 0 = "the" account for that owner on this chain.
 */
export async function getSmartAccountAddress(owner: Address): Promise<Address> {
  const address = await publicClient.readContract({
    address: SIMPLE_ACCOUNT_FACTORY_ADDRESS,
    abi: SIMPLE_ACCOUNT_FACTORY_ABI,
    functionName: "getAddress",
    args: [owner, BigInt(0)],
  });
  return address;
}

/**
 * Fetch ETH balance of any address on Base.
 */
export async function getEthBalance(address: Address): Promise<string> {
  const balance = await publicClient.getBalance({ address });
  const eth = Number(balance) / 1e18;
  return eth.toFixed(6);
}

/**
 * Fetch the last N transactions for an address via the public Base RPC.
 * NOTE: full tx history requires an indexer (Alchemy, etc.). This returns
 * the most-recent block number and a placeholder until a real indexer is wired.
 */
export async function getRecentActivity(address: Address): Promise<{
  blockNumber: bigint;
  message: string;
}> {
  const blockNumber = await publicClient.getBlockNumber();
  return {
    blockNumber,
    message: `Full history available via Base indexer. Current block: #${blockNumber.toString()}`,
  };
}

/** Build a minimal UserOperation call payload for submission via bundler. */
export function buildUserOpCallData(
  to: Address,
  value: bigint,
  data: Hex = "0x"
): Hex {
  // SimpleAccount.execute(address dest, uint256 value, bytes calldata func)
  const iface =
    "0xb61d27f6" + // keccak4("execute(address,uint256,bytes)")
    to.slice(2).padStart(64, "0") +
    value.toString(16).padStart(64, "0") +
    "0000000000000000000000000000000000000000000000000000000000000060" + // offset for bytes
    "0000000000000000000000000000000000000000000000000000000000000000"; // empty bytes len
  return iface as Hex;
}
