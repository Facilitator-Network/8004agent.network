"use client"

import { createContext, useContext, useEffect, useState, useCallback, useMemo, type ReactNode } from "react"
import { BrowserProvider, type JsonRpcSigner } from "ethers"
import { createBrowserSignerClient, type Erc8128Client } from "@/lib/erc8128Client"

type SignedFetchFn = (input: RequestInfo, init?: RequestInit) => Promise<Response>

interface WalletContextType {
  walletAddress: string | null
  signer: JsonRpcSigner | null
  chainId: number | null
  isConnecting: boolean
  signedFetch: SignedFetchFn | null
  connect: () => Promise<void>
  disconnect: () => void
}

const WalletContext = createContext<WalletContextType>({
  walletAddress: null,
  signer: null,
  chainId: null,
  isConnecting: false,
  signedFetch: null,
  connect: async () => {},
  disconnect: () => {},
})

export function useWallet() {
  return useContext(WalletContext)
}

declare global {
  interface Window {
    ethereum?: {
      request: (args: { method: string; params?: unknown[] }) => Promise<unknown>
      on: (event: string, handler: (...args: unknown[]) => void) => void
      removeListener: (event: string, handler: (...args: unknown[]) => void) => void
    }
  }
}

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletAddress, setWalletAddress] = useState<string | null>(null)
  const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
  const [chainId, setChainId] = useState<number | null>(null)
  const [isConnecting, setIsConnecting] = useState(false)
  const [erc8128Client, setErc8128Client] = useState<Erc8128Client | null>(null)

  const updateSigner = useCallback(async () => {
    if (!window.ethereum) return
    try {
      const provider = new BrowserProvider(window.ethereum)
      const s = await provider.getSigner()
      const address = await s.getAddress()
      const network = await provider.getNetwork()
      const cid = Number(network.chainId)
      setSigner(s)
      setWalletAddress(address)
      setChainId(cid)

      // Create ERC-8128 signer client
      const client = createBrowserSignerClient(s, address, cid)
      setErc8128Client(client)
    } catch {
      setSigner(null)
      setWalletAddress(null)
      setChainId(null)
      setErc8128Client(null)
    }
  }, [])

  const connect = useCallback(async () => {
    if (!window.ethereum) {
      window.open('https://metamask.io/download/', '_blank')
      return
    }
    setIsConnecting(true)
    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' })
      await updateSigner()
    } catch {
      // user rejected
    } finally {
      setIsConnecting(false)
    }
  }, [updateSigner])

  const disconnect = useCallback(() => {
    setWalletAddress(null)
    setSigner(null)
    setChainId(null)
    setErc8128Client(null)
  }, [])

  // Memoize signedFetch so consumers get a stable reference
  const signedFetch = useMemo<SignedFetchFn | null>(() => {
    if (!erc8128Client) return null
    return (input: RequestInfo, init?: RequestInit) => erc8128Client.fetch(input, init)
  }, [erc8128Client])

  // Listen for account/chain changes
  useEffect(() => {
    if (!window.ethereum) return

    const handleAccountsChanged = (accounts: unknown) => {
      const accs = accounts as string[]
      if (accs.length === 0) {
        disconnect()
      } else {
        updateSigner()
      }
    }

    const handleChainChanged = () => {
      updateSigner()
    }

    window.ethereum.on('accountsChanged', handleAccountsChanged)
    window.ethereum.on('chainChanged', handleChainChanged)

    // Check if already connected
    window.ethereum.request({ method: 'eth_accounts' }).then((accounts) => {
      const accs = accounts as string[]
      if (accs.length > 0) {
        updateSigner()
      }
    })

    return () => {
      window.ethereum?.removeListener('accountsChanged', handleAccountsChanged)
      window.ethereum?.removeListener('chainChanged', handleChainChanged)
    }
  }, [updateSigner, disconnect])

  return (
    <WalletContext.Provider value={{ walletAddress, signer, chainId, isConnecting, signedFetch, connect, disconnect }}>
      {children}
    </WalletContext.Provider>
  )
}
