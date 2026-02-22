// Lightweight Facinet client using fetch() directly.
// The facinet npm package's "browser" export is an IIFE bundle that Turbopack
// cannot resolve as ESM. Instead of fighting the bundler, we call the same
// REST endpoints the SDK uses internally.

const FACINET_API = process.env.NEXT_PUBLIC_FACINET_API || 'https://facinet.vercel.app'

interface Facilitator {
  id: string
  name: string
  facilitatorWallet: string
  status: string
  network?: string
  chainId?: number
}

export interface FacinetExecuteParams {
  contractAddress: `0x${string}`
  functionName: string
  functionArgs: unknown[]
  abi: unknown[]
}

export interface FacinetExecuteResult {
  success: boolean
  txHash: string
  facilitator: { id: string; name: string; wallet: string }
  contract: { address: string; functionName: string; network: string }
  gasUsed?: string
  gasSpent?: string
}

export interface FacinetClientConfig {
  network: string
  chainId: number
}

/** Selected facilitator info returned by selectFacilitator */
export interface SelectedFacilitator {
  id: string
  name: string
  wallet: string
}

async function getFacilitators(network: string, chainId: number): Promise<Facilitator[]> {
  const res = await fetch(
    `${FACINET_API}/api/facilitator/list?network=${encodeURIComponent(network)}&chainId=${chainId}`,
    { headers: { 'User-Agent': 'Facinet-Web/1.0' } }
  )
  const data = await res.json()
  if (!data.success || !Array.isArray(data.facilitators)) return []
  return data.facilitators.filter((f: Facilitator) => {
    if (f.status !== 'active') return false
    if (f.network && f.network !== network) return false
    if (f.chainId !== undefined && f.chainId !== chainId) return false
    if (!f.network && f.chainId === undefined) return false
    return true
  })
}

/**
 * Select a facilitator for a network upfront.
 * Use the returned facilitator for ALL calls on that network so the same
 * wallet handles register + transferFrom (owns the NFT it minted).
 */
export async function selectFacilitator(
  config: FacinetClientConfig,
): Promise<SelectedFacilitator> {
  const facilitators = await getFacilitators(config.network, config.chainId)
  if (facilitators.length === 0) {
    throw new Error(
      `No active facilitators for ${config.network} (chainId ${config.chainId}). ` +
      `Check https://facinet.vercel.app for available facilitators.`
    )
  }
  const f = facilitators[Math.floor(Math.random() * facilitators.length)]
  return {
    id: f.id,
    name: f.name || `Facilitator ${f.id.slice(0, 8)}`,
    wallet: f.facilitatorWallet,
  }
}

/**
 * Execute a contract call using a specific facilitator.
 * Pass the facilitator returned by selectFacilitator() to guarantee
 * the same wallet is used across register → transfer flows.
 */
export async function facinetExecuteContract(
  config: FacinetClientConfig,
  params: FacinetExecuteParams,
  facilitator: SelectedFacilitator,
): Promise<FacinetExecuteResult> {
  if (!params.contractAddress || !params.functionName) {
    throw new Error('contractAddress and functionName are required')
  }
  if (!params.abi || params.abi.length === 0) {
    throw new Error('ABI is required for contract execution')
  }

  const payload = {
    facilitatorId: facilitator.id,
    network: config.network,
    chainId: config.chainId,
    contractAddress: params.contractAddress,
    functionName: params.functionName,
    functionArgs: params.functionArgs,
    abi: params.abi,
  }

  const res = await fetch(`${FACINET_API}/api/x402/execute-contract`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Network': config.network,
      'X-Chain-Id': config.chainId.toString(),
    },
    body: JSON.stringify(payload),
  })

  const data = await res.json().catch(() => ({}))
  if (!res.ok || !data.success) {
    throw new Error(data.error || data.message || data.reason || `Execute failed (HTTP ${res.status})`)
  }

  return {
    success: true,
    txHash: data.txHash,
    facilitator: {
      id: facilitator.id,
      name: facilitator.name,
      wallet: facilitator.wallet,
    },
    contract: {
      address: params.contractAddress,
      functionName: params.functionName,
      network: config.network,
    },
    gasUsed: data.gasUsed,
    gasSpent: data.gasSpent,
  }
}
