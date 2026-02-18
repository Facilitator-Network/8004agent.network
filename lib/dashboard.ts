import { ethers } from 'ethers'
import { CONTRACTS, REPUTATION_REGISTRY_ABI, USDC_ADDRESS, USDC_ABI } from './deploy-constants'

// ---- Types ----
export interface FeedbackEntry {
  clientAddress: string
  index: number
  value: number
  tag1: string
  tag2: string
}

// ---- Fetch USDC balance for a single agent wallet (on Fuji) ----
export async function fetchAgentUsdcBalance(agentWalletAddress: string): Promise<number> {
  if (!agentWalletAddress || agentWalletAddress === '') return 0
  try {
    const provider = new ethers.JsonRpcProvider(CONTRACTS.fuji.rpc)
    const usdc = new ethers.Contract(USDC_ADDRESS, USDC_ABI, provider)
    const raw = await usdc.balanceOf(agentWalletAddress)
    return Number(raw) / 1e6
  } catch {
    return 0
  }
}

// ---- Fetch reputation summary for an agent on one network ----
export async function fetchAgentReputation(
  network: string,
  agentId: string
): Promise<{ count: number; avg: number }> {
  const netConfig = CONTRACTS[network]
  if (!netConfig || !agentId || agentId === 'pending') return { count: 0, avg: 0 }

  try {
    const provider = new ethers.JsonRpcProvider(netConfig.rpc)
    const contract = new ethers.Contract(
      netConfig.reputationRegistry,
      REPUTATION_REGISTRY_ABI,
      provider
    )
    const clients: string[] = await contract.getClients(agentId)
    if (clients.length === 0) return { count: 0, avg: 0 }

    const [count, summaryValue, summaryDecimals] = await contract.getSummary(
      agentId,
      clients,
      '',
      ''
    )
    const countNum = Number(count)
    const avg =
      countNum > 0 ? Number(summaryValue) / Math.pow(10, Number(summaryDecimals)) : 0
    return { count: countNum, avg }
  } catch {
    return { count: 0, avg: 0 }
  }
}

// ---- Fetch detailed feedback entries for an agent ----
export async function fetchAgentFeedbacks(
  network: string,
  agentId: string
): Promise<FeedbackEntry[]> {
  const netConfig = CONTRACTS[network]
  if (!netConfig || !agentId || agentId === 'pending') return []

  try {
    const provider = new ethers.JsonRpcProvider(netConfig.rpc)
    const contract = new ethers.Contract(
      netConfig.reputationRegistry,
      REPUTATION_REGISTRY_ABI,
      provider
    )
    const clients: string[] = await contract.getClients(agentId)
    const entries: FeedbackEntry[] = []

    for (const client of clients) {
      const lastIndex = Number(await contract.getLastIndex(agentId, client))
      for (let i = 1; i <= lastIndex; i++) {
        try {
          const [value, , tag1, tag2, isRevoked] = await contract.readFeedback(
            agentId,
            client,
            i
          )
          if (!isRevoked) {
            entries.push({
              clientAddress: client,
              index: i,
              value: Number(value),
              tag1,
              tag2,
            })
          }
        } catch {
          /* skip failed reads */
        }
      }
    }
    return entries
  } catch {
    return []
  }
}
